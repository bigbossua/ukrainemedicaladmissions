<?php
/**
 * Local stand-in for the production web server, used ONLY by tests/verify-live-selftest.mjs. It lives in tests/fixtures
 * (not in public/), so it is never copied into a build and never deployed.
 *
 *   UMA_PRIVATE_DIR=<temporary directory> php -d expose_php=0 -S 127.0.0.1:<port> -t <built site> tests/fixtures/live-router.php
 *   php tests/fixtures/live-router.php --summary <built site>     prints what it parsed from that site's .htaccess (JSON)
 *
 * On every request it reads the .htaccess of the directory it serves (a build's byte copy of site/public/.htaccess) and
 * applies the directives that file uses, in Apache's order:
 *   1. access control: <FilesMatch>/<Files> with "Require all denied|granted", matched against the last path component
 *      Apache's directory walk produces (so /.git/config is matched as ".git" when there is no .git directory);
 *   2. mod_rewrite: RewriteCond (%{HTTP_HOST}, %{HTTPS} = off, %{REQUEST_URI}; [NC], [OR]) and RewriteRule ([F], [G],
 *      [L], [R=nnn]; the pattern is matched without the leading slash, as in a per-directory context);
 *   3. mod_alias: RedirectMatch (first match wins; 3xx answers with an absolute Location, 404/410 answer with that status);
 *   4. mod_dir: DirectorySlash (301 to the same path with "/"), DirectoryIndex, "Options -Indexes" (403 instead of a listing);
 *   5. ErrorDocument for the error status, served with that status;
 *   6. mod_headers: "Header always set|unset" on every response, "Header set|unset" (the onsuccess table) on 2xx responses
 *      only, applied after the response status is known (so a PHP script's own status counts), values copied verbatim;
 *   7. PHP: a .php file under the served directory is executed in this process (UMA_PRIVATE_DIR is honoured by the
 *      enquiry handler; the self-test points it at a temporary directory whose config.php sets send_mail false).
 * Any directive or section it does not know stops every request with HTTP 500 naming the line, so the emulation cannot
 * silently drift from the real file. Not emulated (verify-live checks these only on the real host): TLS, and therefore the
 * http-to-https and www-to-apex redirects of the production host name; the host's MIME table (standard Apache mime.types
 * values are used, overridden by AddType); module availability (every <IfModule> is treated as present); caching and
 * compression (mod_expires lines are recognised and ignored).
 */
declare(strict_types=1);

namespace UmaLiveRouter;

const DEFAULT_TYPES = [
    'html' => 'text/html', 'htm' => 'text/html', 'css' => 'text/css', 'js' => 'application/javascript', 'mjs' => 'application/javascript',
    'json' => 'application/json', 'xml' => 'application/xml', 'txt' => 'text/plain', 'svg' => 'image/svg+xml', 'png' => 'image/png',
    'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'webp' => 'image/webp', 'avif' => 'image/avif', 'gif' => 'image/gif',
    'ico' => 'image/vnd.microsoft.icon', 'woff2' => 'font/woff2', 'woff' => 'font/woff', 'webmanifest' => 'application/manifest+json',
    'pdf' => 'application/pdf',
];
const KNOWN_MODULES = ['mod_headers.c', 'mod_authz_core.c', 'mod_expires.c', 'mod_rewrite.c', 'mod_alias.c', 'mod_dir.c', 'mod_mime.c',
    'headers_module', 'authz_core_module', 'expires_module', 'rewrite_module', 'alias_module', 'dir_module', 'mime_module'];
const REASONS = [301 => 'Moved Permanently', 302 => 'Found', 303 => 'See Other', 307 => 'Temporary Redirect', 308 => 'Permanent Redirect',
    403 => 'Forbidden', 404 => 'Not Found', 405 => 'Method Not Allowed', 410 => 'Gone', 500 => 'Internal Server Error'];

/** Split directive arguments on white space, honouring double quotes as Apache does: inside quotes only \" is an escape;
 *  every other backslash is kept, so a quoted regular expression such as "^\.|\.json$" reaches the regex engine intact. */
function tokens(string $s): array
{
    preg_match_all('/"((?:[^"\\\\]|\\\\.)*)"|(\S+)/', $s, $m, PREG_SET_ORDER);
    return array_map(static fn(array $x): string => ($x[2] ?? '') !== '' ? $x[2] : str_replace('\\"', '"', $x[1]), $m);
}

/** An Apache (PCRE) pattern as a preg pattern. */
function rx(string $pattern, bool $nocase = false): string
{
    return '#' . str_replace('#', '\\#', $pattern) . '#' . ($nocase ? 'i' : '');
}

/** Parse <docroot>/.htaccess into the rules this router applies. Returns ['error' => ...] for anything unknown. */
function parse(string $docroot): array
{
    $cfg = ['file' => $docroot . '/.htaccess', 'found' => false, 'rewriteEngine' => false, 'rewrite' => [], 'redirects' => [],
        'headers' => [], 'access' => [], 'errorDocuments' => [], 'directoryIndex' => ['index.html'], 'indexes' => true,
        'directorySlash' => true, 'types' => [], 'ignored' => []];
    if (!is_file($cfg['file'])) return $cfg;
    $cfg['found'] = true;
    $stack = [];
    $conds = [];
    $err = static fn(int $n, string $what): array => ['error' => ".htaccess line $n: $what — extend tests/fixtures/live-router.php to emulate it"];
    foreach (preg_split('/\r?\n/', (string)file_get_contents($cfg['file'])) as $i => $line) {
        $n = $i + 1;
        $t = trim($line);
        if ($t === '' || $t[0] === '#') continue;
        $parts = preg_split('/(<\/?(?:IfModule|FilesMatch|Files)\b[^>]*>)/i', $t, -1, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY);
        foreach ($parts as $p) {
            $p = trim($p);
            if ($p === '') continue;
            $active = !in_array(false, array_column($stack, 'active'), true);
            if (preg_match('/^<IfModule\s+(!?)([^>\s]+)\s*>$/i', $p, $m)) {
                if (!in_array($m[2], KNOWN_MODULES, true)) return $err($n, "unknown module in <IfModule {$m[2]}>");
                $stack[] = ['type' => 'ifmodule', 'active' => $m[1] !== '!'];
                continue;
            }
            if (preg_match('/^<(FilesMatch|Files)\s+(.+?)\s*>$/i', $p, $m)) {
                if (in_array('files', array_column($stack, 'type'), true)) return $err($n, 'nested <Files> sections');
                $arg = tokens($m[2])[0] ?? '';
                $stack[] = ['type' => 'files', 'active' => true, 'match' => strtolower($m[1]) === 'filesmatch' ? rx($arg) : null, 'name' => strtolower($m[1]) === 'files' ? $arg : null, 'source' => $p];
                continue;
            }
            if (preg_match('/^<\/(IfModule|FilesMatch|Files)\s*>$/i', $p, $m)) {
                $top = array_pop($stack);
                $want = strtolower($m[1]) === 'ifmodule' ? 'ifmodule' : 'files';
                if (!$top || $top['type'] !== $want) return $err($n, "unbalanced </{$m[1]}>");
                continue;
            }
            if ($p[0] === '<') return $err($n, "unknown section $p");
            [$name, $rest] = array_pad(preg_split('/\s+/', $p, 2), 2, '');
            $args = tokens($rest);
            $dir = strtolower($name);
            if (!$active) continue;
            $files = null;
            foreach ($stack as $f) if ($f['type'] === 'files') $files = $f;
            if ($files !== null) {
                if ($dir !== 'require' || ($args[0] ?? '') !== 'all' || !in_array($args[1] ?? '', ['denied', 'granted'], true)) return $err($n, "unsupported directive inside a <Files> section: $p");
                $cfg['access'][] = ['match' => $files['match'], 'name' => $files['name'], 'decision' => $args[1], 'source' => $files['source']];
                continue;
            }
            switch ($dir) {
                case 'rewriteengine':
                    $cfg['rewriteEngine'] = strtolower($args[0] ?? '') === 'on';
                    break;
                case 'rewritecond':
                    if (count($args) < 2) return $err($n, 'RewriteCond needs a test string and a pattern');
                    $flags = isset($args[2]) ? array_map('strtoupper', explode(',', trim($args[2], '[]'))) : [];
                    foreach ($flags as $f) if (!in_array($f, ['NC', 'OR'], true)) return $err($n, "unsupported RewriteCond flag $f");
                    $neg = str_starts_with($args[1], '!');
                    $conds[] = ['test' => $args[0], 'pattern' => rx($neg ? substr($args[1], 1) : $args[1], in_array('NC', $flags, true)), 'negate' => $neg, 'or' => in_array('OR', $flags, true)];
                    break;
                case 'rewriterule':
                    if (count($args) < 2) return $err($n, 'RewriteRule needs a pattern and a substitution');
                    $flags = isset($args[2]) ? array_map('strtoupper', explode(',', trim($args[2], '[]'))) : [];
                    $rule = ['pattern' => rx($args[0], in_array('NC', $flags, true)), 'source' => $args[0], 'to' => $args[1], 'conds' => $conds, 'last' => false, 'status' => null, 'line' => $n];
                    foreach ($flags as $f) {
                        if ($f === 'L') $rule['last'] = true;
                        elseif ($f === 'NC') continue;
                        elseif ($f === 'F') $rule['status'] = 403;
                        elseif ($f === 'G') $rule['status'] = 410;
                        elseif (preg_match('/^R(?:=(\d{3}))?$/', $f, $r)) $rule['status'] = (int)($r[1] ?? 302);
                        else return $err($n, "unsupported RewriteRule flag $f");
                    }
                    if ($rule['status'] === null && $args[1] !== '-') return $err($n, 'internal rewrites are not emulated');
                    $cfg['rewrite'][] = $rule;
                    $conds = [];
                    break;
                case 'redirectmatch':
                    $status = 302;
                    if (isset($args[0]) && preg_match('/^(\d{3}|permanent|temp|seeother|gone)$/i', $args[0])) {
                        $s = strtolower(array_shift($args));
                        $status = ['permanent' => 301, 'temp' => 302, 'seeother' => 303, 'gone' => 410][$s] ?? (int)$s;
                    }
                    if (!isset($args[0])) return $err($n, 'RedirectMatch without a pattern');
                    $cfg['redirects'][] = ['status' => $status, 'pattern' => rx($args[0]), 'source' => $args[0], 'to' => $args[1] ?? null, 'line' => $n];
                    break;
                case 'options':
                    foreach ($args as $o) {
                        if (preg_match('/^([+-]?)Indexes$/i', $o, $m)) $cfg['indexes'] = $m[1] !== '-';
                        elseif (!preg_match('/^[+-]?(FollowSymLinks|SymLinksIfOwnerMatch|MultiViews|ExecCGI|Includes|IncludesNOEXEC|All|None)$/i', $o)) return $err($n, "unsupported option $o");
                    }
                    break;
                case 'directoryindex':
                    $cfg['directoryIndex'] = $args;
                    break;
                case 'directoryslash':
                    $cfg['directorySlash'] = strtolower($args[0] ?? 'on') !== 'off';
                    break;
                case 'errordocument':
                    if (count($args) < 2) return $err($n, 'ErrorDocument needs a status and a target');
                    $cfg['errorDocuments'][(int)$args[0]] = $args[1];
                    break;
                case 'header':
                    $cond = in_array(strtolower($args[0] ?? ''), ['always', 'onsuccess'], true) ? strtolower(array_shift($args)) : 'onsuccess';
                    $action = strtolower($args[0] ?? '');
                    if ($action === 'set' && count($args) === 3) $cfg['headers'][] = ['always' => $cond === 'always', 'action' => 'set', 'name' => $args[1], 'value' => $args[2]];
                    elseif ($action === 'unset' && count($args) === 2) $cfg['headers'][] = ['always' => $cond === 'always', 'action' => 'unset', 'name' => $args[1], 'value' => null];
                    else return $err($n, "unsupported Header form: $p");
                    break;
                case 'addtype':
                    foreach (array_slice($args, 1) as $ext) $cfg['types'][strtolower(ltrim($ext, '.'))] = $args[0];
                    break;
                case 'expiresactive': case 'expiresbytype': case 'expiresdefault':
                    $cfg['ignored'][] = "line $n: $name (caching is not emulated)";
                    break;
                default:
                    return $err($n, "unknown directive $name");
            }
        }
    }
    if ($stack) return ['error' => '.htaccess: a section is not closed'];
    if ($conds) return ['error' => '.htaccess: RewriteCond without a following RewriteRule'];
    return $cfg;
}

if (PHP_SAPI === 'cli') {
    $root = ($argv[1] ?? '') === '--summary' ? ($argv[2] ?? '.') : '.';
    $cfg = parse(rtrim($root, '/'));
    echo json_encode($cfg, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), "\n";
    exit(isset($cfg['error']) ? 1 : 0);
}

// ------------------------------------------------------------------------------------------------ request handling
$docroot = rtrim((string)$_SERVER['DOCUMENT_ROOT'], '/');
$cfg = parse($docroot);
if (isset($cfg['error'])) {
    http_response_code(500);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'live-router: ', $cfg['error'], "\n";
    return true;
}

// mod_headers: applied once the final status is known (PHP scripts set their own).
header_register_callback(static function () use ($cfg): void {
    $code = http_response_code();
    foreach ($cfg['headers'] as $h) {
        if (!$h['always'] && ($code < 200 || $code > 299)) continue;
        if ($h['action'] === 'set') header($h['name'] . ': ' . $h['value']);
        else header_remove($h['name']);
    }
});

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = (string)($_SERVER['REQUEST_URI'] ?? '/');
$path = rawurldecode((string)(parse_url($uri, PHP_URL_PATH) ?? '/'));
$query = (string)(parse_url($uri, PHP_URL_QUERY) ?? '');
$host = (string)($_SERVER['HTTP_HOST'] ?? '127.0.0.1');
$origin = 'http://' . $host;
$withQuery = static fn(string $target): string => $query !== '' && !str_contains($target, '?') ? $target . '?' . $query : $target;

$typeOf = static function (string $file) use ($cfg): string {
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    return $cfg['types'][$ext] ?? DEFAULT_TYPES[$ext] ?? 'application/octet-stream';
};
$sendFile = static function (string $file, int $status = 200) use ($typeOf, $method): void {
    http_response_code($status);
    header('Content-Type: ' . $typeOf($file));
    header('Content-Length: ' . filesize($file));
    if ($method !== 'HEAD') readfile($file);
};
$runPhp = static function (string $file, string $scriptPath): void {
    $_SERVER['SCRIPT_FILENAME'] = $file;
    $_SERVER['SCRIPT_NAME'] = $_SERVER['PHP_SELF'] = $scriptPath;
    chdir(dirname($file));
    (static function () use ($file): void { require $file; })();
};
$error = static function (int $status) use ($cfg, $docroot, $sendFile, $runPhp): void {
    $doc = $cfg['errorDocuments'][$status] ?? null;
    if (is_string($doc) && str_starts_with($doc, '/') && is_file($docroot . $doc)) {
        if (str_ends_with($doc, '.php')) { http_response_code($status); $runPhp($docroot . $doc, $doc); return; }
        $sendFile($docroot . $doc, $status);
        return;
    }
    http_response_code($status);
    header('Content-Type: text/html; charset=iso-8859-1');
    $reason = REASONS[$status] ?? 'Error';
    echo "<!DOCTYPE HTML PUBLIC \"-//IETF//DTD HTML 2.0//EN\">\n<html><head>\n<title>$status $reason</title>\n</head><body>\n<h1>$reason</h1>\n",
        is_string($doc) && !str_starts_with($doc, '/') ? '<p>' . htmlspecialchars(trim($doc, '"')) . "</p>\n" : '',
        "</body></html>\n";
};
$redirect = static function (int $status, string $target) use ($origin, $withQuery): void {
    $loc = preg_match('#^[a-z][a-z0-9+.-]*://#i', $target) ? $target : $origin . $target;
    http_response_code($status);
    header('Location: ' . $withQuery($loc));
    header('Content-Type: text/html; charset=iso-8859-1');
    echo "<!DOCTYPE HTML PUBLIC \"-//IETF//DTD HTML 2.0//EN\">\n<html><head>\n<title>$status " . (REASONS[$status] ?? '') . "</title>\n</head><body>\n<p>The document has moved <a href=\"" . htmlspecialchars($withQuery($loc)) . "\">here</a>.</p>\n</body></html>\n";
};

// Apache's directory walk: the filename ends at the first path component that does not exist.
$segments = array_values(array_filter(explode('/', $path), static fn(string $s): bool => $s !== ''));
if (in_array('..', $segments, true)) { $error(404); return true; }
$fs = $docroot;
$missing = false;
$last = '';
foreach ($segments as $s) {
    $last = $s;
    $fs .= '/' . $s;
    if (!file_exists($fs)) { $missing = true; break; }
}

// 1. access control (<Files>/<FilesMatch>; the last matching section wins)
$decision = null;
foreach ($cfg['access'] as $a) {
    if ($last === '') break;
    if (($a['match'] !== null && preg_match($a['match'], $last)) || ($a['name'] !== null && $a['name'] === $last)) $decision = $a['decision'];
}
if ($decision === 'denied') { $error(403); return true; }

// 2. mod_rewrite (per-directory: the pattern sees the path without its leading slash)
if ($cfg['rewriteEngine']) {
    $vars = ['HTTP_HOST' => $host, 'HTTPS' => 'off', 'REQUEST_URI' => $path];
    $expand = static fn(string $s): string => (string)preg_replace_callback('/%\{([A-Z_]+)\}/', static fn(array $m): string => $vars[$m[1]] ?? '', $s);
    foreach ($cfg['rewrite'] as $rule) {
        $ok = true;
        $groups = [];
        $current = [];
        foreach ($rule['conds'] as $c) { $current[] = $c; if (!$c['or']) { $groups[] = $current; $current = []; } }
        if ($current) $groups[] = $current;
        foreach ($groups as $g) {
            $any = false;
            foreach ($g as $c) { $hit = (bool)preg_match($c['pattern'], $expand($c['test'])); if ($hit !== $c['negate']) { $any = true; break; } }
            if (!$any) { $ok = false; break; }
        }
        if (!$ok || !preg_match($rule['pattern'], ltrim($path, '/'), $m)) continue;
        if ($rule['status'] === 403 || $rule['status'] === 410) { $error($rule['status']); return true; }
        if ($rule['status'] !== null) {
            $to = (string)preg_replace_callback('/\$(\d)/', static fn(array $x): string => $m[(int)$x[1]] ?? '', $expand($rule['to']));
            $redirect($rule['status'], $to);
            return true;
        }
        if ($rule['last']) break;
    }
}

// 3. mod_alias RedirectMatch (first match wins)
foreach ($cfg['redirects'] as $r) {
    if (!preg_match($r['pattern'], $path, $m)) continue;
    if ($r['status'] >= 300 && $r['status'] <= 399) {
        $to = (string)preg_replace_callback('/\$(\d)/', static fn(array $x): string => $m[(int)$x[1]] ?? '', (string)$r['to']);
        $redirect($r['status'], $to);
    } else {
        $error($r['status']);
    }
    return true;
}

// 4. file mapping, mod_dir
if ($missing) { $error(404); return true; }
if (is_dir($fs)) {
    if (!str_ends_with($path, '/')) {
        if ($cfg['directorySlash']) { $redirect(301, $path . '/'); return true; }
        $error(404);
        return true;
    }
    foreach ($cfg['directoryIndex'] as $index) {
        $candidate = $fs . '/' . $index;
        if (!is_file($candidate)) continue;
        if (str_ends_with($index, '.php')) { $runPhp($candidate, rtrim($path, '/') . '/' . $index); return true; }
        if (!in_array($method, ['GET', 'HEAD'], true)) { header('Allow: GET, HEAD'); $error(405); return true; }
        $sendFile($candidate);
        return true;
    }
    if (!$cfg['indexes']) { $error(403); return true; }
    http_response_code(200);
    header('Content-Type: text/html; charset=utf-8');
    $title = htmlspecialchars('Index of ' . rtrim($path, '/'));
    echo "<html><head><title>$title</title></head><body><h1>$title</h1><ul>";
    foreach (array_diff(scandir($fs) ?: [], ['.', '..']) as $entry) echo '<li><a href="' . htmlspecialchars(rawurlencode($entry)) . '">' . htmlspecialchars($entry) . '</a></li>';
    echo "</ul></body></html>\n";
    return true;
}
if (str_ends_with($fs, '.php')) { $runPhp($fs, $path); return true; }
if (!in_array($method, ['GET', 'HEAD'], true)) { header('Allow: GET, HEAD'); $error(405); return true; }
$sendFile($fs);
return true;
