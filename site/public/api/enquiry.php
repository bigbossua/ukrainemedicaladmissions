<?php
/**
 * Enquiry / candidate-profile handler (Stage 1 of the application journey; APPLICATION_SYSTEM_SPEC.md §2, §8.1, §12.1).
 *
 * Two form types post here:
 *   - enquiry            the contact page (name, email, message, consent)
 *   - application-start  the stepped candidate-profile form at /apply/ (plan, education, documents, contact)
 *
 * - Every field is whitelisted and length-capped; free text is stored as typed (no tag stripping: storage is JSON and
 *   the mail is text/plain); enumerations are checked against allow-lists and an
 *   unknown value is dropped (stored as an empty string), never stored as typed.
 * - Single-line fields have control characters (CR, LF, tab, NUL ...) removed, so nothing can break a mail header.
 * - Bot checks: honeypot field "website"; timing field "ts" (milliseconds the page was open, set by the page script
 *   on both forms). Both forms always send both fields, empty without a script, so a post that leaves either out, or
 *   sends a "ts" that is not a number, did not come from our pages and is dropped. A filled honeypot or a "ts" below
 *   3 seconds is dropped too. Dropped posts get the thank-you redirect; nothing is stored or sent.
 * - Rate limits (429): at most max_per_hour stored submissions in total in the last 60 minutes (counted from the
 *   record file names; nothing extra is stored), and, only when ip_hash_key is configured, at most
 *   per_ip_per_hour per keyed IP code (the code and submission times sit in <storage>/ratelimit; a counter older than an hour is deleted at the next submission).
 * - The notification e-mail is base64-encoded with a folded RFC 2047 subject; when the mail system does not accept
 *   it, the failure is written to error_log and to the stored record ("notification": "failed").
 * - Stores each record as JSON OUTSIDE the web root (never inside public_html) and e-mails a plain-text notification
 *   to the business address. No documents are accepted at this stage.
 * - Every record is state 1 ("enquiry"). This handler never records a submission to a university.
 * - Responses: 405 for anything but POST; 422 when a required field is missing; 303 to /apply/thank-you/ otherwise.
 *
 * Configuration: an optional <storage>/config.php (outside the web root) may return an array overriding
 * notify_to, from and send_mail, setting envelope_from (the Return-Path; off unless set), and setting ip_hash_key (a random secret; without it no IP data is stored). The storage directory defaults to a sibling of the document root and can be set
 * with the UMA_PRIVATE_DIR environment variable. No secrets live in this file.
 */
declare(strict_types=1);
header_remove('X-Powered-By'); // never advertise the PHP version, whatever the host's expose_php setting
ini_set('display_errors', '0'); // never reveal server paths in a response; failures go to error_log

header('X-Robots-Tag: noindex, nofollow');
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit('Method not allowed');
}

// ---- Storage location: a sibling of the document root, not inside it. ----
$docRoot = rtrim((string)($_SERVER['DOCUMENT_ROOT'] ?? __DIR__ . '/..'), '/');
$storage = getenv('UMA_PRIVATE_DIR') ?: dirname($docRoot) . '/uma-private';
$config  = ['notify_to' => 'info@ukrainemedicaladmissions.com', 'from' => 'no-reply@ukrainemedicaladmissions.com', 'send_mail' => true, 'max_per_hour' => 100, 'per_ip_per_hour' => 5, 'envelope_from' => ''];
if (is_file($storage . '/config.php')) {
    $override = include $storage . '/config.php';
    if (is_array($override)) $config = array_merge($config, $override);
}

// ---- Allow-lists (keep in step with the form in src/pages/apply/index.astro) ----
// Field-of-study keys = the keys of FIELDS in src/lib/fields.ts, plus "undecided". tests/enquiry-php.mjs checks this.
const FIELD_KEYS      = ['medicine', 'dentistry', 'pharmacy', 'nursing', 'public_health', 'physical_therapy', 'physical_education', 'preparatory', 'other', 'undecided'];
const LEVEL_KEYS      = ['bachelor', 'master', 'integrated_master', 'preparatory', 'unsure'];
const EDU_LEVELS      = ['secondary', 'foundation', 'diploma', 'bachelor', 'master', 'other'];
const QUAL_STATUSES   = ['achieved', 'expected'];
const SCALE_TYPES     = ['percentage', 'letter', 'points', 'gpa', 'other'];
const RESULT_STATES   = ['achieved', 'predicted', 'pending', 'not_studied'];
const DOCUMENT_TYPES  = ['certificate', 'transcript', 'passport', 'photographs', 'birth_certificate', 'medical_certificate', 'translations', 'legalisation', 'language_certificate', 'other'];
const DOCUMENT_STATES = ['have', 'need', 'not_sure'];
const MAX_SUBJECTS    = 12;
const MIN_ELAPSED_MS  = 3000;

// ---- Sanitisers ----------------------------------------------------------
/** Any posted value as a valid UTF-8 string; arrays and other non-strings become ''. */
function raw(mixed $v): string
{
    if (!is_string($v)) return '';
    return mb_check_encoding($v, 'UTF-8') ? $v : mb_convert_encoding($v, 'UTF-8', 'UTF-8');
}
/** Single-line text: tags and every control character (CR, LF, tab, NUL, C1, U+2028/9) removed, spaces collapsed. */
function line(mixed $v, int $max = 200): string
{
    $s = raw($v); // stored as typed ("<50" is a grade, not markup): storage is JSON, mail is text/plain; escape only when rendered as HTML
    $s = (string)preg_replace('/[\p{Cc}\x{2028}\x{2029}]+/u', ' ', $s);
    $s = (string)preg_replace('/ {2,}/', ' ', $s);
    return mb_substr(trim($s), 0, $max);
}
/** Multi-line text: line breaks kept (normalised to \n), every other control character removed. */
function text(mixed $v, int $max = 4000): string
{
    $s = str_replace(["\r\n", "\r"], "\n", raw($v)); // stored as typed; see line()
    $s = (string)preg_replace('/[^\P{Cc}\n]+|[\x{2028}\x{2029}]+/u', ' ', $s);
    return mb_substr(trim($s), 0, $max);
}
/** An allow-listed value, or '' when the posted value is not on the list. */
function pick(mixed $v, array $allowed): string
{
    return is_string($v) && in_array($v, $allowed, true) ? $v : '';
}
/** A university slug (directory slug or "unlisted"), or ''. */
function slug(mixed $v): string
{
    return is_string($v) && strlen($v) <= 80 && preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $v) ? $v : '';
}
/** A four-digit year within a sane window, or ''. */
function year(mixed $v, int $from, int $to): string
{
    return is_string($v) && preg_match('/^\d{4}$/', $v) && (int)$v >= $from && (int)$v <= $to ? $v : '';
}

$P = $_POST;

// ---- Bot checks --------------------------------------------------------
if (($P['website'] ?? '') !== '') {         // honeypot filled (any value, "0" included; arrays too)
    header('Location: /apply/thank-you/', true, 303);
    exit;
}
// Both forms send "website" and "ts" even without a script ("ts" is then empty): a post without them, or with a "ts" that
// is not a number, was not sent by our pages (for example a script posting here directly). Dropped, not stored.
$ts = $P['ts'] ?? null;
if (!array_key_exists('website', $P) || !is_string($ts) || ($ts !== '' && !preg_match('/^\d{1,10}$/', $ts))) {
    // A fixed line, no submitted data: if one of our own forms ever loses a hidden field, this shows it in the log.
    error_log("UMA enquiry: dropped a post without the form's hidden fields");
    header('Location: /apply/thank-you/', true, 303);
    exit;
}
if ($ts !== '' && (int)$ts < MIN_ELAPSED_MS) {
    header('Location: /apply/thank-you/', true, 303);  // completed faster than a person could: dropped, not stored
    exit;
}

// ---- Common fields -----------------------------------------------------
$type    = pick($P['type'] ?? '', ['enquiry', 'application-start']) ?: 'enquiry';
$name    = line($P['name'] ?? '', 120);
$emailIn = line($P['email'] ?? '', 200);
$email   = filter_var($emailIn, FILTER_VALIDATE_EMAIL) ? $emailIn : '';
$message = text($P['message'] ?? '', 4000);
$consent = ($P['consent'] ?? '') === 'yes';

// ---- Candidate profile (application-start only) -------------------------
$profile = null;
$course  = '';
$univs   = [];
if ($type === 'application-start') {
    $course = pick($P['course'] ?? '', FIELD_KEYS);

    // Up to three preferred universities, de-duplicated, empty choices dropped.
    foreach (['university', 'university2', 'university3'] as $k) {
        $u = slug($P[$k] ?? '');
        if ($u !== '' && !in_array($u, $univs, true)) $univs[] = $u;
    }
    $thisYear = (int)gmdate('Y');
    $intakeIn = $P['intake'] ?? ($P['startYear'] ?? '');   // startYear: field name of the earlier single-page form
    $intake   = $intakeIn === 'later' ? 'later' : year($intakeIn, $thisYear - 1, $thisYear + 6);

    // Subject rows: empty rows dropped, at most MAX_SUBJECTS kept, every cell capped.
    $subjects = [];
    if (is_array($P['subjects'] ?? null)) {
        $scanned = 0;
        foreach ($P['subjects'] as $row) {
            if (++$scanned > 50 || count($subjects) >= MAX_SUBJECTS) break;
            if (!is_array($row)) continue;
            $s = ['name' => line($row['name'] ?? '', 80), 'grade' => line($row['grade'] ?? '', 40), 'result_status' => pick($row['status'] ?? '', RESULT_STATES)];
            if ($s['name'] === '' && $s['grade'] === '') continue;
            $subjects[] = $s;
        }
    }

    // Documents: only the ten known types, only the three known states.
    $documents = [];
    $docsIn = is_array($P['documents'] ?? null) ? $P['documents'] : [];
    foreach (DOCUMENT_TYPES as $d) {
        $state = pick($docsIn[$d] ?? '', DOCUMENT_STATES);
        if ($state !== '') $documents[] = ['type' => $d, 'state' => $state];
    }

    $profile = [
        'intent' => [
            'field'            => $course,
            'level'            => pick($P['level'] ?? '', LEVEL_KEYS),
            'universities'     => $univs,
            'university_other' => line($P['university_other'] ?? '', 200),
            'intake'           => $intake,
        ],
        'education' => [
            'level'            => pick($P['edu_level'] ?? '', EDU_LEVELS),
            'qualification'    => line($P['qualification'] ?? '', 200),
            'awarding_country' => line($P['country'] ?? '', 100),
            'year'             => year($P['qual_year'] ?? '', 1950, $thisYear + 6),
            'year_status'      => pick($P['qual_status'] ?? '', QUAL_STATUSES),
            'scale_type'       => pick($P['scale_type'] ?? '', SCALE_TYPES),
            'scale_max'        => line($P['scale_max'] ?? '', 20),
            'subjects'         => $subjects,    // grades stored exactly as typed; never converted between scales
            'outstanding'      => text($P['outstanding'] ?? '', 2000),
        ],
        'documents'      => $documents,         // self-declared; no file is accepted at Stage 1
        'documents_note' => line($P['documents_note'] ?? '', 200),
        'contact' => [
            'name'        => $name,
            'email'       => $email,
            'residence'   => line($P['residence'] ?? '', 100),
            'nationality' => line($P['nationality'] ?? '', 100),
            'language'    => line($P['language'] ?? '', 60),
            'questions'   => $message,
        ],
    ];
}

// ---- Validation --------------------------------------------------------
$errors = [];
if ($type === 'application-start' && $course === '') $errors[] = 'your field of study';
if ($name === '')  $errors[] = 'your name';
if ($email === '') $errors[] = 'a valid email address';
if ($type === 'enquiry' && $message === '') $errors[] = 'your message';
if (!$consent)     $errors[] = 'your agreement to the privacy notice (tick the box)';
if ($errors) {
    http_response_code(422);
    header('Content-Type: text/html; charset=utf-8');
    $back  = $type === 'application-start' ? '/apply/' : '/contact/';
    $items = implode('', array_map(static fn(string $e): string => '<li>' . htmlspecialchars($e) . '</li>', $errors));
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
        . '<meta name="robots" content="noindex, nofollow"><title>Please check the form</title></head>'
        . '<body><main><h1>Please check the form</h1><p>We could not save your details because these are missing:</p><ul>' . $items . '</ul>'
        . '<p>Use your browser\'s Back button to return to the form. Your other answers are usually still there.</p>'
        . '<p>Or <a href="' . $back . '">open the form again</a>.</p></main></body></html>';
    exit;
}

// ---- Rate limits (after validation, before anything is stored or sent) ----
$tooMany = static function (): never {
    http_response_code(429);
    header('Retry-After: 3600');
    header('Content-Type: text/plain; charset=utf-8');
    exit('Too many submissions in the last hour. Please try again later, or email info@ukrainemedicaladmissions.com.');
};
// The last 60 minutes, not two clock hours: a record counts while its file-name time (UTC) is within the hour.
$recent = 0;
$since  = gmdate('Ymd-His', time() - 3600);
foreach ([gmdate('Ymd-H'), gmdate('Ymd-H', time() - 3600)] as $hourPrefix) {
    foreach (glob($storage . '/enquiries/' . $hourPrefix . '*.json') ?: [] as $f) {
        if (strcmp(substr(basename($f), 0, 15), $since) >= 0) $recent++;
    }
}
if ($recent >= (int)$config['max_per_hour']) $tooMany();
// One IPv6 /64 is normally one household or one server, so it counts as one visitor (otherwise a script could rotate
// addresses inside it). IPv4 addresses are used whole.
$ipAddr = (string)($_SERVER['REMOTE_ADDR'] ?? '');
$ipBin  = @inet_pton($ipAddr);
if (is_string($ipBin) && strlen($ipBin) === 16) $ipAddr = bin2hex(substr($ipBin, 0, 8)) . '::/64';
$ipKey = !empty($config['ip_hash_key']) ? hash_hmac('sha256', $ipAddr . date('Y-m'), (string)$config['ip_hash_key']) : null;
if ($ipKey !== null) {
    $rlDir = $storage . '/ratelimit';
    if (is_dir($rlDir) || @mkdir($rlDir, 0700, true)) {
        // Counters older than an hour are no longer needed for the limit: delete them, so none is kept indefinitely.
        foreach (glob($rlDir . '/*.json') ?: [] as $old) { if ((int)@filemtime($old) < time() - 3600) @unlink($old); }
        $rlFile = $rlDir . '/' . $ipKey . '.json';
        // One exclusive lock across read, check and write, so parallel posts from one visitor cannot all read the
        // counter before any of them has written it (audit SEC-1, 2026-10-29).
        $fh = @fopen($rlFile, 'c+');
        if ($fh !== false && flock($fh, LOCK_EX)) {
            $times = json_decode((string)stream_get_contents($fh), true);
            $times = array_values(array_filter(is_array($times) ? $times : [], static fn($t): bool => is_int($t) && $t > time() - 3600));
            if (count($times) >= (int)$config['per_ip_per_hour']) { flock($fh, LOCK_UN); fclose($fh); $tooMany(); }
            $times[] = time();
            ftruncate($fh, 0);
            rewind($fh);
            fwrite($fh, json_encode($times));
            fflush($fh);
            flock($fh, LOCK_UN);
            fclose($fh);
            @chmod($rlFile, 0600);
        } elseif ($fh !== false) {
            fclose($fh);
        }
    }
}

// ---- Persist (outside web root) ---------------------------------------
$record = [
    'id'          => bin2hex(random_bytes(8)),
    'version'     => 2,
    'type'        => $type,                     // enquiry | application-start  (stage 1 only)
    'stage'       => 'enquiry',                 // always state 1; never a university submission from this handler
    'received'    => gmdate('c'),
    'name'        => $name,
    'email'       => $email,
    'course'      => $course,
    'university'  => $univs[0] ?? '',
    'message'     => $message,
    'consent'     => true,
    'consentText' => $type === 'application-start'
        ? 'Stored to respond to the enquiry, as described in the privacy notice; not an application to a university.'
        : 'Stored to reply by email, as described in the privacy notice.',
    // Keyed hash (HMAC) so the IP cannot be recovered by hashing every IPv4 address; rotates monthly. Without a
    // secret 'ip_hash_key' in the private config.php nothing about the IP is stored.
    'ip_hash'     => !empty($config['ip_hash_key']) ? $ipKey : null,   // nothing about the IP without the secret key
];
if ($profile !== null) $record['profile'] = $profile;

$fail = static function (): never {
    error_log('UMA enquiry: cannot write to the private storage directory');
    http_response_code(500);
    header('Content-Type: text/plain; charset=utf-8');
    exit('Sorry, we could not record your details. Please email info@ukrainemedicaladmissions.com.');
};
$dir = $storage . '/enquiries';
if (!is_dir($dir) && !mkdir($dir, 0700, true) && !is_dir($dir)) $fail();
$file = $dir . '/' . gmdate('Ymd-His') . '-' . $record['id'] . '.json';
$json = json_encode($record, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
if ($json === false || file_put_contents($file, $json, LOCK_EX) === false) $fail();
@chmod($file, 0600);

// ---- Notify (plain text; no documents, no card data) ---------------------
if (!empty($config['send_mail'])) {
    $lines = [];
    $add = static function (string $label, string $value) use (&$lines): void { if ($value !== '') $lines[] = $label . ': ' . $value; };
    $add('Type', $type); $add('Name', $name); $add('Email', $email);
    if ($profile !== null) {
        $i = $profile['intent']; $e = $profile['education']; $c = $profile['contact'];
        $lines[] = '';
        $add('Field of study', $i['field']);
        $add('Level', $i['level']);
        $add('Universities', implode(', ', $i['universities']));
        $add('University not listed', $i['university_other']);
        $add('Intake', $i['intake']);
        $lines[] = '';
        $add('Education level', $e['level']);
        $add('Qualification', $e['qualification']);
        $add('Awarding country', $e['awarding_country']);
        $add('Year', trim($e['year'] . ' ' . $e['year_status']));
        $add('Grading scale', trim($e['scale_type'] . ($e['scale_max'] !== '' ? ' (max ' . $e['scale_max'] . ')' : '')));
        foreach ($e['subjects'] as $s) $lines[] = '  - ' . $s['name'] . ': ' . $s['grade'] . ($s['result_status'] !== '' ? ' (' . $s['result_status'] . ')' : '');
        $add('Outstanding results', $e['outstanding']);
        $lines[] = '';
        foreach (DOCUMENT_STATES as $st) {
            $add('Documents (' . $st . ')', implode(', ', array_column(array_filter($profile['documents'], static fn(array $d): bool => $d['state'] === $st), 'type')));
        }
        $add('Other document', $profile['documents_note']);
        $lines[] = '';
        $add('Residence', $c['residence']); $add('Nationality', $c['nationality']); $add('Language', $c['language']);
    }
    $lines[] = '';
    $lines[] = $message;
    $lines[] = '';
    $lines[] = 'Record: ' . $record['id'] . ' (stage: enquiry; nothing has been sent to any university)';
    // RFC 2047: each encoded word at most 75 characters (45 bytes of UTF-8 per word, never split inside a character),
    // folded onto continuation lines. RFC 5322: body lines at most 998 bytes, so the body is base64 in 76-character lines.
    $words = [];
    foreach (preg_split('//u', '[UMA] New ' . $type . ' from ' . $name, -1, PREG_SPLIT_NO_EMPTY) ?: [] as $ch) {
        $last = count($words) - 1;
        if ($last < 0 || strlen($words[$last] . $ch) > 45) $words[] = $ch; else $words[$last] .= $ch;
    }
    $subject = implode("\r\n ", array_map(static fn(string $w): string => '=?UTF-8?B?' . base64_encode($w) . '?=', $words));
    $headers = 'From: ' . line((string)$config['from'], 200) . "\r\nReply-To: $email\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: base64";
    // Envelope sender (Return-Path, the address SPF checks and bounces go to): left to the host unless config.php sets
    // 'envelope_from' to a plain address; anything else is ignored so nothing reaches the sendmail command line.
    $envelope = line($config['envelope_from'] ?? '', 200);
    $params = preg_match('/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/', $envelope) && filter_var($envelope, FILTER_VALIDATE_EMAIL) ? '-f' . $envelope : '';
    $body = rtrim(chunk_split(base64_encode(implode("\r\n", $lines)), 76, "\r\n"));
    $sent = $params !== ''
        ? @mail(line((string)$config['notify_to'], 200), $subject, $body, $headers, $params)
        : @mail(line((string)$config['notify_to'], 200), $subject, $body, $headers);
    if (!$sent) {
        // The record is stored, so the person still sees the thank-you page; the failure must not go unnoticed.
        error_log('UMA enquiry: the notification e-mail for record ' . $record['id'] . ' was not accepted by the mail system');
        $record['notification'] = 'failed';
        $json = json_encode($record, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
        if ($json !== false) @file_put_contents($file, $json, LOCK_EX);
    }
}

header('Location: /apply/thank-you/', true, 303);
exit;
