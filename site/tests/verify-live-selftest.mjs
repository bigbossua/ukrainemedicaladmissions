// Self-test of scripts/verify-live.mjs, run against the LOCAL production build (dist/) — no network, no live host.
//
// 1. Serves dist/ with PHP's built-in server and tests/fixtures/live-router.php, which applies the build's own .htaccess
//    (a byte copy of public/.htaccess): headers copied verbatim, redirects, file blocks, ErrorDocument 404, mod_dir, and
//    PHP execution with a temporary UMA_PRIVATE_DIR whose config.php sets send_mail false (nothing is ever e-mailed).
// 2. Checks that the stand-in is faithful where it matters: every "Header always set" line of public/.htaccess arrives
//    verbatim on a page and on a 404; the parsed rule counts match the file; the canonical-host rule answers as written
//    when the request carries the production Host header.
// 3. Runs verify-live.mjs against it with --site https://ukrainemedicaladmissions.com (browser pass included unless
//    --no-browser is given) and requires: no FAIL at all, and "not checked" (SKIP) only for the checks in LOCAL_LIMITS,
//    which are impossible without the production DNS and certificate.
// 4. Mutates copies of the served output (inline script, also behind data-src, inline handler, javascript: URL, missing
//    or weakened CSP, CSP only on success, Ternopil page answering 200 or 301 or redirecting elsewhere, a draft card, a link
//    or select option for the unpublished Ternopil profile, a link to another unpublished profile, a missing empty state,
//    a stray profile in the sitemap, the handler answering 200 to GET, private storage reachable, a directory listing,
//    staging URLs, legal placeholders) and requires verify-live to report each one; a positive control (a release that
//    genuinely publishes the Ternopil profile) must pass the profile checks.
// 5. Checks that no run stored a record in the temporary private directory (verify-live's POSTs store nothing).
// Prints "verify-live-selftest: N checks, M failures"; exit code 1 on any failure. Run after "npm run build".
// Usage (from site/): node tests/verify-live-selftest.mjs [--no-browser] [--dist <built site>]   (default dist/)
import { spawn, spawnSync, execFileSync } from 'node:child_process';
import { createServer } from 'node:net';
import { closeSync, cpSync, existsSync, mkdirSync, mkdtempSync, openSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distArg = process.argv.indexOf('--dist');
const DIST = distArg > 0 && process.argv[distArg + 1] ? resolve(process.argv[distArg + 1]) : join(SITE_DIR, 'dist');
const ROUTER = join(SITE_DIR, 'tests', 'fixtures', 'live-router.php');
const VERIFY = join(SITE_DIR, 'scripts', 'verify-live.mjs');
const MANIFEST_SCRIPT = join(SITE_DIR, 'scripts', 'release-manifest.mjs');
const HTACCESS = join(SITE_DIR, 'public', '.htaccess');
const PRODUCTION = 'https://ukrainemedicaladmissions.com';
const TERNOPIL = 'ternopil-national-medical-university';
const EMPTY_STATE = 'No university profile has completed verification yet.';
const BROWSER = !process.argv.includes('--no-browser');

// Checks verify-live cannot make against a local server, each with the reason. Keep this list minimal: anything else
// that verify-live reports as FAIL or SKIP here fails the self-test.
const LOCAL_LIMITS = [
  { check: 'canonical-host redirect', url: 'http://ukrainemedicaladmissions.com/', reason: 'HTTP to HTTPS on the production host name: needs that name to resolve to the server under test (DNS) and a certificate for it; the local server is plain HTTP on 127.0.0.1' },
  { check: 'canonical-host redirect', url: 'https://www.ukrainemedicaladmissions.com/', reason: 'www to apex over HTTPS: needs the production DNS and a TLS certificate for the www name' },
  { check: 'canonical-host redirect', url: 'http://www.ukrainemedicaladmissions.com/services/', reason: 'www over HTTP to the HTTPS apex: needs the production DNS; the final hop is HTTPS' },
  ...(BROWSER ? [] : [{ check: 'browser checks', url: '(base)', reason: '--no-browser given to the self-test' }]),
];

let checks = 0, failures = 0;
const check = (ok, label, detail = '') => { checks++; if (!ok) { failures++; console.log(`FAIL ${label}${detail ? ` — ${detail}` : ''}`); } return ok; };
const done = () => { console.log(`verify-live-selftest: ${checks} checks, ${failures} failures`); process.exit(failures ? 1 : 0); };

if (!existsSync(join(DIST, 'index.html')) || !existsSync(join(DIST, '.htaccess'))) { check(false, 'dist/ with .htaccess exists', 'run "npm run build" first'); done(); }
const php = spawnSync('php', ['-v'], { encoding: 'utf8' });
if (php.status !== 0) { check(false, 'php is installed', php.error?.message ?? php.stderr); done(); }

const TMP = mkdtempSync(join(tmpdir(), 'uma-verify-live-'));
const PRIVATE = join(TMP, 'uma-private');
mkdirSync(PRIVATE, { recursive: true });
writeFileSync(join(PRIVATE, 'config.php'), "<?php return ['send_mail' => false, 'notify_to' => 'nobody@example.invalid'];\n");
const servers = new Set();
const cleanup = () => { for (const s of servers) { try { process.kill(-s.pid, 'SIGTERM'); } catch {} } try { rmSync(TMP, { recursive: true, force: true }); } catch {} };
process.on('exit', cleanup);
process.on('SIGINT', () => process.exit(130));

const freePort = () => new Promise((res, rej) => { const s = createServer(); s.on('error', rej); s.listen(0, '127.0.0.1', () => { const { port } = s.address(); s.close(() => res(port)); }); });
async function serve(docroot) {
  const port = await freePort();
  // The server's request log goes to a file, never to a pipe: verify-live runs synchronously, so nothing would drain a
  // pipe and the server would block once its buffer filled.
  const logFile = join(TMP, `php-${port}.log`); const fd = openSync(logFile, 'w');
  const proc = spawn('php', ['-d', 'expose_php=0', '-S', `127.0.0.1:${port}`, '-t', docroot, ROUTER], {
    env: { ...process.env, UMA_PRIVATE_DIR: PRIVATE, PHP_CLI_SERVER_WORKERS: '4' }, stdio: ['ignore', 'ignore', fd], detached: true,
  });
  closeSync(fd);
  servers.add(proc);
  const base = `http://127.0.0.1:${port}`;
  const stop = () => { try { process.kill(-proc.pid, 'SIGTERM'); } catch {} servers.delete(proc); };
  for (let i = 0; i < 80; i++) { try { await fetch(`${base}/robots.txt`); return { base, stop }; } catch { await new Promise((r) => setTimeout(r, 100)); } }
  stop();
  throw new Error(`php -S did not start on ${port}: ${readFileSync(logFile, 'utf8').slice(0, 300)}`);
}
const manifestFor = (dir, name) => {
  const out = join(TMP, `${name}.manifest.json`);
  execFileSync(process.execPath, [MANIFEST_SCRIPT, '--dist', dir, '--out', out], { cwd: SITE_DIR, stdio: 'ignore' });
  return out;
};
function verify(base, manifest, name, { browser = false } = {}) {
  const out = join(TMP, `out-${name}`);
  const r = spawnSync(process.execPath, [VERIFY, base, '--site', PRODUCTION, '--manifest', manifest, '--out', out, ...(browser ? [] : ['--no-browser'])], { cwd: SITE_DIR, encoding: 'utf8', timeout: 15 * 60 * 1000, maxBuffer: 64 * 1024 * 1024 });
  const file = join(out, 'live-report.json');
  if (!existsSync(file)) { check(false, `${name}: verify-live wrote live-report.json`, (r.stderr || r.stdout || '').slice(-400)); return null; }
  const rep = JSON.parse(readFileSync(file, 'utf8'));
  rep.exit = r.status;
  rep.fails = rep.findings.filter((f) => f.severity === 'FAIL');
  rep.warns = rep.findings.filter((f) => f.severity === 'WARN');
  return rep;
}
const curl = (url, headers = []) => {
  const out = execFileSync('curl', ['-s', '-o', '/dev/null', '-D', '-', ...headers.flatMap((h) => ['-H', h]), url], { encoding: 'utf8' });
  const status = Number(/^HTTP\/\S+\s+(\d{3})/m.exec(out)?.[1] ?? 0);
  const hdrs = {};
  for (const line of out.split(/\r?\n/)) { const m = /^([\w-]+):\s*(.*)$/.exec(line); if (m) hdrs[m[1].toLowerCase()] = m[2]; }
  return { status, headers: hdrs };
};

// ---------------------------------------------------------------------------------------------- 1-2. the stand-in
const htaccess = readFileSync(HTACCESS, 'utf8');
check(readFileSync(join(DIST, '.htaccess'), 'utf8') === htaccess, 'dist/.htaccess is a byte copy of public/.htaccess (rebuild if not)');
const always = [...htaccess.matchAll(/^\s*Header\s+always\s+set\s+(\S+)\s+"([^"]*)"\s*$/gmi)].map((m) => [m[1].toLowerCase(), m[2]]);
check(always.some(([k]) => k === 'content-security-policy'), 'public/.htaccess sets the CSP with "Header always set"');
const summary = spawnSync('php', [ROUTER, '--summary', DIST], { encoding: 'utf8' });
let parsed = {};
try { parsed = JSON.parse(summary.stdout); } catch {}
check(summary.status === 0 && !parsed.error, 'live-router parses the build\'s .htaccess without an unknown directive', parsed.error ?? summary.stderr);
const count = (re) => (htaccess.match(re) ?? []).length;
check((parsed.redirects ?? []).length === count(/^\s*RedirectMatch\b/gmi), 'live-router: every RedirectMatch line parsed', `${(parsed.redirects ?? []).length} vs ${count(/^\s*RedirectMatch\b/gmi)}`);
check((parsed.rewrite ?? []).length === count(/^\s*RewriteRule\b/gmi), 'live-router: every RewriteRule line parsed');
check((parsed.headers ?? []).length === count(/^\s*Header\b/gmi), 'live-router: every Header line parsed');
check(parsed.indexes === !/^\s*Options\s+.*-Indexes/mi.test(htaccess) && parsed.errorDocuments?.['404'] === '/404.html', 'live-router: Options -Indexes and ErrorDocument 404 parsed');

const baseSrv = await serve(DIST);
{
  const home = curl(`${baseSrv.base}/`), missing = curl(`${baseSrv.base}/no-such-page-selftest/`);
  for (const [name, value] of always) {
    check(home.headers[name] === value, `stand-in: "${name}" on a page is copied verbatim from public/.htaccess`, home.headers[name]);
    check(missing.headers[name] === value, `stand-in: "${name}" on a 404 is copied verbatim from public/.htaccess`, missing.headers[name]);
  }
  check(missing.status === 404, 'stand-in: unknown page answers 404');
  // The canonical-host rule itself (exercised on the live host only by verify-live): as written in the file.
  const www = curl(`${baseSrv.base}/services/`, ['Host: www.ukrainemedicaladmissions.com']);
  check(www.status === 301 && www.headers.location === 'https://ukrainemedicaladmissions.com/services/', 'stand-in: Host www → 301 https://ukrainemedicaladmissions.com/services/', `${www.status} ${www.headers.location}`);
  const plain = curl(`${baseSrv.base}/about/`, ['Host: ukrainemedicaladmissions.com']);
  check(plain.status === 301 && plain.headers.location === 'https://ukrainemedicaladmissions.com/about/', 'stand-in: plain HTTP on the apex → 301 to HTTPS', `${plain.status} ${plain.headers.location}`);
}

// ---------------------------------------------------------------------------------------------- 3. baseline
const baseManifest = manifestFor(DIST, 'baseline');
console.log(`baseline: verify-live against ${baseSrv.base} (${DIST})${BROWSER ? ', browser pass included' : ', no browser'} …`);
const base = verify(baseSrv.base, baseManifest, 'baseline', { browser: BROWSER });
baseSrv.stop();
if (base) {
  check(base.fails.length === 0 && base.exit === 0, 'baseline: verify-live reports no FAIL against the local production build', base.fails.map((f) => `${f.check} ${f.url}: ${f.observed}`).slice(0, 8).join(' | '));
  const key = (s) => `${s.check} ${s.url === base.base ? '(base)' : s.url}`;
  const got = base.skips.map(key).sort(), want = LOCAL_LIMITS.map((l) => `${l.check} ${l.url}`).sort();
  check(JSON.stringify(got) === JSON.stringify(want), 'baseline: "not checked" only for the listed local limits', `got ${got.join('; ')}`);
  const passed = (name, n = 1) => check(base.passes.filter((p) => p.check === name).length >= n, `baseline: "${name}" checked and passed${n > 1 ? ` (${n}×)` : ''}`);
  for (const [name, n] of [['Ternopil profile URL', 2], ['directory empty state', 1], ['sitemap profiles', 1], ['CSP header', 1], ['CSP on 404 response', 1], ['inline script', 1], ['unverified draft shown', 1], ['unpublished profile referenced', 1], ['enquiry GET', 1], ['enquiry honeypot POST', 1], ['private storage', 3], ['release integrity', 1], ['robots.txt', 1], ['sitemap', 1], ['404', 1]]) passed(name, n);
  const sitemapLocs = (readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8').match(/<loc>/g) ?? []).length;
  check(base.pages === sitemapLocs, `baseline: every sitemap URL of the build was fetched (${sitemapLocs})`, `${base.pages}`);
  if (BROWSER) check(base.passes.filter((p) => /^browser /.test(p.check)).length === sitemapLocs * 3, 'baseline: browser pass ran on every page at three widths');
  console.log(`baseline: ${base.passes.length} passed, ${base.fails.length} failed, ${base.warns.length} warnings (${[...new Set(base.warns.map((w) => w.check))].join(', ') || 'none'}), ${base.skips.length} not checked:`);
  for (const l of LOCAL_LIMITS) console.log(`  not checked locally: ${l.check} ${l.url} — ${l.reason}`);
}

// ---------------------------------------------------------------------------------------------- 4. mutations
const edit = (dir, name, rel, fn) => {
  const p = join(dir, rel); const before = existsSync(p) ? readFileSync(p, 'utf8') : '';
  const after = fn(before);
  check(after !== before, `${name}: mutation applied to ${rel}`);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, after);
};
const dropLine = (re) => (s) => s.split('\n').filter((l) => !re.test(l)).join('\n');
const cleanLegal = (s) => s.replace(/Draft for legal review/gi, 'Legal page').replace(/\[to be supplied[^\]]*\]/gi, 'supplied').replace(/\[proposed in the draft[^\]]*\]/gi, '').replace(/\sdata-owner-value="[^"]*"/gi, '');
const profilePage = (dir) => readFileSync(join(dir, 'about', 'index.html'), 'utf8').replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${PRODUCTION}/universities/${TERNOPIL}/"`).replace(/<title>[^<]*<\/title>/, '<title>Ternopil test profile</title>');

const MUTATIONS = [
  { name: 'inline script', apply: (d, n) => edit(d, n, 'about/index.html', (s) => s.replace('</body>', '<script>document.title="x"</script></body>')), fails: ['inline script'] },
  { name: 'inline script hidden behind a data-src attribute', apply: (d, n) => edit(d, n, 'services/index.html', (s) => s.replace('</body>', '<script data-src="/_astro/x.js" data-type="application/ld+json">void 0</script></body>')), fails: ['inline script'] },
  { name: 'inline event handler', apply: (d, n) => edit(d, n, 'contact/index.html', (s) => s.replace('<a ', '<a onclick="return false" ')), fails: ['inline event handler'] },
  { name: 'javascript: URL', apply: (d, n) => edit(d, n, 'faq/index.html', (s) => s.replace('<a href="/', '<a href="javascript:void(0)" data-x="/')), fails: ['javascript: URL'] },
  { name: 'CSP header missing', apply: (d, n) => edit(d, n, '.htaccess', dropLine(/Content-Security-Policy/)), fails: ['CSP header', 'CSP on 404 response', 'CSP on handler response', 'security header'] },
  { name: 'CSP sent only on success (Header set, not always)', apply: (d, n) => edit(d, n, '.htaccess', (s) => s.replace('Header always set Content-Security-Policy', 'Header set Content-Security-Policy')), fails: ['CSP on 404 response'], notFails: ['CSP header'] },
  { name: "CSP weakened with 'unsafe-inline'", apply: (d, n) => edit(d, n, '.htaccess', (s) => s.replace("script-src 'self'", "script-src 'self' 'unsafe-inline'")), fails: ['CSP header', 'CSP on 404 response'] },
  { name: "CSP re-enables inline handlers through script-src-attr 'unsafe-inline'", apply: (d, n) => edit(d, n, '.htaccess', (s) => s.replace("script-src 'self';", "script-src 'self'; script-src-attr 'unsafe-inline';")), fails: ['CSP header', 'CSP on 404 response'] },
  // failsAt: [check, URL suffix, observed pattern]: the FAIL must name that URL and that observation, so a mutation cannot
  // count as caught through a side effect (here the no-slash URL's DirectorySlash 301 would hide a lost "never 200" check).
  { name: 'Ternopil page answers 200', manifest: 'original', apply: (d, n) => { edit(d, n, '.htaccess', dropLine(/ternopil-national-medical-university/)); edit(d, n, `universities/${TERNOPIL}/index.html`, () => profilePage(d)); }, fails: ['Ternopil profile URL'], failsAt: [['Ternopil profile URL', `/universities/${TERNOPIL}/`, /^HTTP 200\b/]] },
  { name: 'Ternopil answers 301 instead of 302', apply: (d, n) => edit(d, n, '.htaccess', (s) => s.replace(`RedirectMatch 302 ^/universities/${TERNOPIL}`, `RedirectMatch 301 ^/universities/${TERNOPIL}`)), fails: ['Ternopil profile URL'] },
  { name: 'Ternopil 302 goes to the home page, not /universities/', apply: (d, n) => edit(d, n, '.htaccess', (s) => s.replace(`${TERNOPIL}/?$ /universities/`, `${TERNOPIL}/?$ /`)), fails: ['Ternopil profile URL'], failsAt: [['Ternopil profile URL', `/universities/${TERNOPIL}/`, /^HTTP 302 → https?:\/\/[^/]+\/$/], ['Ternopil profile URL', `/universities/${TERNOPIL}`, /^HTTP 302 → https?:\/\/[^/]+\/$/]] },
  { name: '"Verification in progress" card on /universities/', apply: (d, n) => edit(d, n, 'universities/index.html', (s) => s.replace(/(data-list[^>]*>)/, '$1<article class="card"><span class="badge badge-pending">Draft — verification in progress</span></article>')), fails: ['unverified draft shown', 'directory empty state'] },
  { name: '"Verification in progress" badge on the home page', apply: (d, n) => edit(d, n, 'index.html', (s) => s.replace('</main>', '<span class="badge badge-pending">Verification in progress</span></main>')), fails: ['unverified draft shown'] },
  { name: 'home page links to the unpublished Ternopil profile', apply: (d, n) => edit(d, n, 'index.html', (s) => s.replace('</main>', `<p><a href="${PRODUCTION}/universities/${TERNOPIL}/">Ternopil</a></p></main>`)), fails: ['unpublished profile referenced'] },
  // a relative link to a profile the release does not publish, with a slug other than Ternopil's: only the link check can
  // catch it (the Ternopil name check cannot)
  { name: 'home page links to another unpublished profile (relative link)', apply: (d, n) => edit(d, n, 'index.html', (s) => s.replace('</main>', '<p><a href="/universities/unpublished-test-university/">Test</a></p></main>')), fails: ['unpublished profile referenced'], failsAt: [['unpublished profile referenced', `${PRODUCTION}/`, /^\/universities\/unpublished-test-university\/$/]] },
  { name: '/apply/ offers the unpublished Ternopil university', apply: (d, n) => edit(d, n, 'apply/index.html', (s) => s.replace(/(<select\b[^>]*>)/, `$1<option value="${TERNOPIL}">Ternopil</option>`)), fails: ['unpublished profile referenced'] },
  { name: 'empty-state sentence missing', apply: (d, n) => edit(d, n, 'universities/index.html', (s) => s.replace(EMPTY_STATE, 'Profiles are coming soon.')), fails: ['directory empty state'] },
  { name: 'unpublished profile in the sitemap', apply: (d, n) => edit(d, n, 'sitemap-0.xml', (s) => s.replace('</urlset>', `<url><loc>${PRODUCTION}/universities/${TERNOPIL}/</loc></url></urlset>`)), fails: ['sitemap profile not in release'] },
  { name: 'GET /api/enquiry.php answers 200', apply: (d, n) => edit(d, n, 'api/enquiry.php', () => "<?php echo 'ok';\n"), fails: ['enquiry GET'] },
  { name: 'uma-private reachable over HTTP', apply: (d, n) => { edit(d, n, '.htaccess', dropLine(/uma-private/)); edit(d, n, 'uma-private/index.html', () => '<p>private</p>'); edit(d, n, 'uma-private/config.php', () => "<?php return [];\n"); edit(d, n, 'uma-private/enquiries/index.html', () => '<p>records</p>'); }, fails: ['private storage exposed'] },
  { name: 'directory listing enabled', apply: (d, n) => edit(d, n, '.htaccess', dropLine(/^\s*Options\s+-Indexes/)), fails: ['directory listing'] },
  { name: 'staging host in canonical and robots.txt', apply: (d, n) => { edit(d, n, 'about/index.html', (s) => s.replace(`href="${PRODUCTION}/about/"`, 'href="https://staging.ukrainemedicaladmissions.com/about/"')); edit(d, n, 'robots.txt', (s) => s.replace(`Sitemap: ${PRODUCTION}/`, 'Sitemap: https://staging.ukrainemedicaladmissions.com/')); }, fails: ['canonical', 'robots.txt sitemap line'] },
  {
    name: 'legal placeholder on one page only',
    apply: (d, n) => { for (const p of ['privacy', 'disclosure', 'complaints-policy']) edit(d, n, `${p}/index.html`, cleanLegal); edit(d, n, 'terms/index.html', (s) => cleanLegal(s).replace('</main>', '<p><span class="tbc">[to be supplied by the owner: registered address]</span></p></main>')); },
    warns: [['legal page not final', `${PRODUCTION}/terms/`]], exactWarns: 'legal page not final', fails: [],
  },
  {
    name: 'positive control: a release that publishes the Ternopil profile',
    apply: (d, n) => {
      edit(d, n, '.htaccess', dropLine(/ternopil-national-medical-university/));
      edit(d, n, `universities/${TERNOPIL}/index.html`, () => profilePage(d));
      edit(d, n, 'sitemap-0.xml', (s) => s.replace('</urlset>', `<url><loc>${PRODUCTION}/universities/${TERNOPIL}/</loc></url></urlset>`));
      edit(d, n, 'universities/index.html', (s) => s.replace(EMPTY_STATE, 'One profile is listed.').replace(/(data-list[^>]*>)/, `$1<article class="card"><a href="/universities/${TERNOPIL}/">Ternopil test profile</a></article>`));
    },
    fails: [], noFailsAtAll: true, passes: ['Ternopil profile URL', 'sitemap profiles', 'directory lists published profiles', 'unpublished profile referenced'],
  },
];

for (const [i, m] of MUTATIONS.entries()) {
  const id = `m${String(i + 1).padStart(2, '0')}`;
  const dir = join(TMP, id);
  cpSync(DIST, dir, { recursive: true });
  m.apply(dir, m.name);
  const manifest = m.manifest === 'original' ? baseManifest : manifestFor(dir, id);
  const srv = await serve(dir);
  const rep = verify(srv.base, manifest, id);
  srv.stop();
  if (!rep) continue;
  const failed = new Set(rep.fails.map((f) => f.check));
  let ok = true;
  for (const c of m.fails) ok = check(failed.has(c), `mutation "${m.name}": verify-live reports FAIL "${c}"`, `FAILs: ${[...failed].join(', ') || 'none'}`) && ok;
  for (const [c, suffix, re] of m.failsAt ?? []) ok = check(rep.fails.some((f) => f.check === c && f.url.endsWith(suffix) && re.test(String(f.observed))), `mutation "${m.name}": FAIL "${c}" for …${suffix} matching ${re}`, rep.fails.filter((f) => f.check === c).map((f) => `${f.url}: ${f.observed}`).join(' | ') || 'none') && ok;
  for (const c of m.notFails ?? []) ok = check(!failed.has(c), `mutation "${m.name}": no FAIL "${c}" (the check is precise)`, rep.fails.filter((f) => f.check === c).map((f) => f.url).join(' ')) && ok;
  for (const [c, url] of m.warns ?? []) ok = check(rep.warns.some((w) => w.check === c && w.url === url), `mutation "${m.name}": verify-live reports WARN "${c}" for ${url}`) && ok;
  if (m.exactWarns) ok = check(rep.warns.filter((w) => w.check === m.exactWarns).length === (m.warns ?? []).length, `mutation "${m.name}": no other "${m.exactWarns}" warning (no false positive)`, rep.warns.filter((w) => w.check === m.exactWarns).map((w) => w.url).join(' ')) && ok;
  if (m.fails.length) ok = check(rep.exit === 1, `mutation "${m.name}": verify-live exits 1`) && ok;
  if (m.noFailsAtAll) ok = check(rep.fails.length === 0 && rep.exit === 0, `mutation "${m.name}": no FAIL at all`, rep.fails.map((f) => `${f.check} ${f.url}: ${f.observed}`).slice(0, 6).join(' | ')) && ok;
  for (const c of m.passes ?? []) ok = check(rep.passes.some((p) => p.check === c), `mutation "${m.name}": "${c}" passes`) && ok;
  console.log(`${ok ? 'caught' : 'MISSED'}  ${m.name}${m.fails.length ? ` → ${m.fails.join(', ')}` : ''}`);
}

// ---------------------------------------------------------------------------------------------- 5. read-only
const stored = existsSync(join(PRIVATE, 'enquiries')) ? readdirSync(join(PRIVATE, 'enquiries')) : [];
check(stored.length === 0, `read-only: no record stored by ${MUTATIONS.length + 1} verify-live runs (empty and honeypot POSTs only)`, stored.join(', '));

done();
