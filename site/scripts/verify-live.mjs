// Read-only live verification of the DEPLOYED site (run from site/ after "npm run build" so the release manifest exists). Nothing is written to the server; the only POSTs are an
// empty form (expected 422) and a honeypot-filled synthetic form (expected 303, dropped by the handler, never
// stored, never e-mailed). Usage: node verify-live.mjs [https://ukrainemedicaladmissions.com] [out-dir]
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const require = createRequire(new URL('../package.json', import.meta.url));
const { chromium } = require('playwright');
const AxeMod = require('@axe-core/playwright'); const AxeBuilder = AxeMod.default ?? AxeMod.AxeBuilder ?? AxeMod;

const BASE = (process.argv[2] ?? 'https://ukrainemedicaladmissions.com').replace(/\/$/, '');
const U = new URL(BASE); const HOST = U.host; const APEX = HOST.replace(/^www\./, '');
const OUT = process.argv[3] ?? new URL('../tests/output/live', import.meta.url).pathname;
const MANIFEST = new URL('../tests/output/release-manifest.json', import.meta.url).pathname;
const LOCAL_404_TITLE = 'Page not found';
mkdirSync(OUT, { recursive: true });

const findings = [], passes = [];
const FAIL = (check, url, observed, expected, fix, severity = 'FAIL') => findings.push({ severity, check, url, observed, expected, fix });
const WARN = (check, url, observed, expected, fix) => FAIL(check, url, observed, expected, fix, 'WARN');
const PASS = (check, url, observed) => passes.push({ check, url, observed });

// ---- HTTP via curl (honours the environment proxy and CA bundle); no automatic redirect following
let n = 0;
function http(url, { method = 'GET', data = null, contentType = null } = {}) {
  const body = join(OUT, `body-${++n}.bin`), hdr = join(OUT, `hdr-${n}.txt`);
  const args = ['-sS', '--max-time', '40', '-o', body, '-D', hdr, '-w', '%{http_code}\t%{redirect_url}\t%{content_type}\t%{http_version}\t%{time_total}\t%{size_download}', '-X', method, '-A', 'UMA-live-verify/1.0 (read-only check)'];
  if (data !== null) args.push('--data', data);
  if (contentType) args.push('-H', `Content-Type: ${contentType}`);
  args.push(url);
  let meta;
  try { meta = execFileSync('curl', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { return { url, status: 0, error: (e.stderr || e.message).toString().trim().split('\n').pop(), headers: {}, body: Buffer.alloc(0), redirect: '', type: '', version: '', time: 0 }; }
  const [status, redirect, type, version, time, size] = meta.trim().split('\t');
  const headers = {};
  if (existsSync(hdr)) for (const line of readFileSync(hdr, 'utf8').split(/\r?\n/)) { const m = line.match(/^([\w-]+):\s*(.*)$/); if (m) headers[m[1].toLowerCase()] = m[2]; }
  return { url, status: Number(status), redirect, type, version, time: Number(time), size: Number(size), headers, body: existsSync(body) ? readFileSync(body) : Buffer.alloc(0) };
}
const text = (r) => r.body.toString('utf8');
const sha = (b) => createHash('sha256').update(b).digest('hex');
const follow = (url, max = 6) => { const hops = [{ url, status: 0 }]; let cur = url; for (let i = 0; i < max; i++) { const r = http(cur); hops[hops.length - 1].status = r.status; if (![301, 302, 303, 307, 308].includes(r.status)) return { hops, final: r }; if (!r.redirect) { hops.push({ url: '(no Location)', status: 0 }); return { hops, final: r }; } if (hops.some((h) => h.url === r.redirect)) { hops.push({ url: r.redirect, status: 'LOOP' }); return { hops, final: r, loop: true }; } cur = r.redirect; hops.push({ url: cur, status: 0 }); } return { hops, final: null, tooMany: true }; };

console.log(`live verification of ${BASE} — read-only`);

// ---- 1/2. robots.txt and sitemap
const robots = http(`${BASE}/robots.txt`);
if (robots.status !== 200) FAIL('robots.txt', `${BASE}/robots.txt`, `HTTP ${robots.status} ${robots.error ?? ''}`, '200', 'check that robots.txt was deployed to the document root');
else {
  const t = text(robots);
  if (!t.includes(`Sitemap: ${BASE}/sitemap-index.xml`)) FAIL('robots.txt sitemap line', `${BASE}/robots.txt`, t.trim().slice(0, 200), `Sitemap: ${BASE}/sitemap-index.xml`, 'rebuild without STAGING; redeploy');
  else PASS('robots.txt', `${BASE}/robots.txt`, 'production robots with sitemap line');
  if (/STAGING|^Disallow:\s*\/\s*$/m.test(t)) FAIL('robots.txt blocks crawling', `${BASE}/robots.txt`, t.trim().slice(0, 200), 'Allow: / and no STAGING marker', 'staging build deployed by mistake — publish the production build');
}
const smIndex = http(`${BASE}/sitemap-index.xml`);
const locs = (s) => [...s.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
let pageUrls = [];
if (smIndex.status !== 200) FAIL('sitemap index', `${BASE}/sitemap-index.xml`, `HTTP ${smIndex.status}`, '200', 'check deployment of sitemap files');
else {
  const children = locs(text(smIndex));
  for (const c of children) {
    if (!c.startsWith(BASE + '/')) FAIL('sitemap child host', c, c, `starts with ${BASE}/`, 'astro.config site must be the production domain');
    const r = http(c);
    if (r.status !== 200) { FAIL('sitemap file', c, `HTTP ${r.status}`, '200', 'check deployment'); continue; }
    pageUrls.push(...locs(text(r)));
  }
  const offHost = pageUrls.filter((u) => !u.startsWith(BASE + '/'));
  if (offHost.length) FAIL('sitemap URL host', offHost.join(' '), 'URLs on another host', BASE, 'rebuild with the production site URL');
  else PASS('sitemap', `${BASE}/sitemap-index.xml`, `${children.length} sitemap file(s), ${pageUrls.length} URLs, all on ${HOST}`);
}

// ---- 1. every sitemap URL: status, type, canonical, robots meta, title; collect assets
const assets = new Set(); const pages = {};
const addAsset = (u, from) => { try { const abs = new URL(u, from); if (abs.host === HOST) assets.add(abs.href.split('#')[0]); } catch {} };
for (const url of pageUrls) {
  const r = http(url); pages[url] = r;
  if (r.status !== 200) { FAIL('page status', url, `HTTP ${r.status} ${r.error ?? ''}`, '200', 'check the deployed directory for this page'); continue; }
  if (!/text\/html/i.test(r.type)) FAIL('page content-type', url, r.type, 'text/html', 'server MIME configuration');
  const h = text(r);
  const canon = h.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (canon !== url) FAIL('canonical', url, canon ?? '(none)', url, 'canonical must equal the production URL; rebuild if site URL differs');
  const rob = h.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? '';
  if (/noindex/i.test(rob)) FAIL('robots meta', url, rob, 'index, follow', 'a sitemap URL must not be noindex');
  if (!/<title>[^<]+<\/title>/.test(h)) FAIL('title', url, '(missing)', 'a <title>', 'check build');
  if (/<\?php/.test(h)) FAIL('raw PHP in HTML', url, 'contains <?php', 'rendered HTML', 'PHP not executing — check hPanel PHP version');
  for (const m of h.matchAll(/\b(?:href|src)="([^"#]+)"/g)) { const v = m[1]; if (/^(mailto:|tel:|javascript:|data:|https?:\/\/(?!(www\.)?ukrainemedicaladmissions\.com))/i.test(v)) continue; addAsset(v, url); }
  for (const m of h.matchAll(/<link[^>]+rel="[^"]*(?:preload|icon|manifest|apple-touch-icon)[^"]*"[^>]+href="([^"]+)"/g)) addAsset(m[1], url);
  if (!findings.some((f) => f.url === url)) PASS('page', url, `200 text/html canonical ok robots "${rob}"`);
}
// the home page must look like the new site
const home = pages[`${BASE}/`] ?? http(`${BASE}/`);
if (home.status === 200 && !/Apply Online Now/.test(text(home))) FAIL('home content', `${BASE}/`, 'primary CTA text not found', '"Apply Online Now" present', 'wrong files in the document root (legacy site still served?)');

// ---- 3. assets: everything linked from pages + CSS url() + favicons/manifest
const seen = new Set(); const cssFiles = [];
const checkAsset = (u, kind) => {
  if (seen.has(u)) return; seen.add(u);
  const r = http(u);
  if (r.status !== 200) { FAIL(`${kind} status`, u, `HTTP ${r.status}`, '200', 'missing from deploy or blocked by .htaccess'); return r; }
  const t = r.type.toLowerCase();
  if (/\.css($|\?)/.test(u) && !t.startsWith('text/css')) FAIL('CSS MIME (blocked by nosniff)', u, t, 'text/css', 'add AddType text/css .css to .htaccess');
  if (/\.m?js($|\?)/.test(u) && !/javascript/.test(t)) FAIL('JS MIME (blocked by nosniff)', u, t, 'application/javascript', 'add AddType application/javascript .js to .htaccess');
  if (/\.woff2($|\?)/.test(u) && !/font\/woff2|application\/font-woff2|application\/octet-stream/.test(t)) WARN('font MIME', u, t, 'font/woff2', 'add AddType font/woff2 .woff2 to .htaccess');
  if (/\.svg($|\?)/.test(u) && !/image\/svg\+xml/.test(t)) FAIL('SVG MIME', u, t, 'image/svg+xml', 'add AddType image/svg+xml .svg');
  if (/\.webmanifest($|\?)/.test(u) && !/manifest\+json|application\/json/.test(t)) WARN('manifest MIME', u, t, 'application/manifest+json', 'add AddType application/manifest+json .webmanifest');
  if (/\.(png|ico)($|\?)/.test(u) && !/image\//.test(t)) FAIL('image MIME', u, t, 'image/*', 'server MIME configuration');
  if (/\.css($|\?)/.test(u)) cssFiles.push({ u, css: text(r) });
  if (!findings.some((f) => f.url === u)) PASS(kind, u, `200 ${t} ${r.size}B`);
  return r;
};
for (const u of [...assets].filter((u) => !pageUrls.includes(u) && !u.endsWith('/') && !/\.php$/.test(u))) checkAsset(u, 'asset');
for (const { u, css } of cssFiles) for (const m of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) { if (/^data:/.test(m[1])) continue; try { checkAsset(new URL(m[1], u).href, 'css-url'); } catch {} }
for (const f of ['/favicon.ico', '/favicon.svg', '/apple-touch-icon.png', '/site.webmanifest', '/og-default.png', '/brand/uma-logo-horizontal-dark.svg']) checkAsset(`${BASE}${f}`, 'favicon/brand');
// internal links (directories) from pages: all must be 200 after at most one DirectorySlash hop
for (const u of [...assets].filter((u) => u.endsWith('/') && !pageUrls.includes(u))) { const r = follow(u, 3); if (!r.final || r.final.status !== 200) FAIL('internal link', u, `HTTP ${r.final?.status ?? r.hops.map((h) => h.status).join('>')}`, '200', 'broken internal link'); else PASS('internal link', u, `200 (${r.hops.length - 1} hop)`); }

// ---- release integrity: every manifest file byte-identical to the release
if (existsSync(MANIFEST)) {
  const m = JSON.parse(readFileSync(MANIFEST, 'utf8')); let same = 0, diff = [];
  for (const f of m.files) {
    if (f.path === '.htaccess' || f.path === 'api/enquiry.php') continue;
    const r = http(`${BASE}/${f.path}`);
    if (r.status !== 200) { diff.push(`${f.path} HTTP ${r.status}`); continue; }
    if (sha(r.body) === f.sha256) same++; else diff.push(`${f.path} sha differs (${r.size}B vs ${f.bytes}B)`);
  }
  if (diff.length) FAIL('release integrity', BASE, diff.slice(0, 12).join('; '), `every file identical to release ${m.generatedFrom} (${m.fingerprint.slice(0, 12)})`, 'server-side modification (compression is fine, content change is not) or stale deploy — compare sizes; redeploy if stale');
  else PASS('release integrity', BASE, `${same} files byte-identical to release ${m.generatedFrom}, fingerprint ${m.fingerprint.slice(0, 12)}…`);
}

// ---- 4. redirects (legacy, canonical host, DirectorySlash) — no loops, ≤ 2 hops
const redirectCases = [
  [`${BASE}/dentistry-admissions-in-ukraine`, `${BASE}/courses/dentistry/`], [`${BASE}/dentistry-admissions-in-ukraine/`, `${BASE}/courses/dentistry/`],
  [`${BASE}/document-translation-legalisation`, `${BASE}/admissions/`], [`${BASE}/document-translation-legalisation/`, `${BASE}/admissions/`],
  [`http://${APEX}/`, `https://${APEX}/`], [`https://www.${APEX}/`, `https://${APEX}/`], [`http://www.${APEX}/services/`, `https://${APEX}/services/`],
  [`${BASE}/services`, `${BASE}/services/`], [`${BASE}/about`, `${BASE}/about/`],
];
for (const [from, to] of redirectCases) {
  const r = follow(from);
  const chain = r.hops.map((h) => `${h.url} [${h.status}]`).join(' → ');
  if (r.loop) FAIL('redirect loop', from, chain, `→ ${to}`, 'fix .htaccess rule order/anchoring');
  else if (!r.final || r.final.status !== 200) FAIL('redirect target', from, chain, `${to} 200`, 'check RedirectMatch target exists');
  else if (r.final.url !== to && r.hops[r.hops.length - 1].url !== to) FAIL('redirect destination', from, chain, to, 'check .htaccess rule');
  else if (r.hops.length - 1 > 2) WARN('redirect chain length', from, chain, '≤ 2 hops', 'combine rules');
  else if (![301, 308].includes(r.hops[0].status)) WARN('redirect status', from, chain, '301', 'use permanent redirects');
  else PASS('redirect', from, chain);
}

// ---- 5. 404 and sensitive paths
const nf = http(`${BASE}/no-such-page-${Date.now()}/`);
if (nf.status !== 404) FAIL('404 status', nf.url, `HTTP ${nf.status}`, '404', 'ErrorDocument 404 /404.html must be honoured');
else if (!text(nf).includes(LOCAL_404_TITLE)) FAIL('404 page content', nf.url, 'generic server 404', 'custom 404 page', 'check ErrorDocument path');
else PASS('404', nf.url, '404 with custom page');
const nfh = http(`${BASE}/no-such-file-${Date.now()}.html`); if (nfh.status !== 404) FAIL('404 (file)', nfh.url, `HTTP ${nfh.status}`, '404', 'check ErrorDocument');
for (const [p, expect] of [['/.git/config', 'blocked'], ['/.git/HEAD', 'blocked'], ['/.htaccess', 'blocked'], ['/.env', 'blocked'], ['/uma-private/', 'blocked'], ['/api/', 'no listing'], ['/fonts/', 'no listing'], ['/_astro/', 'no listing'], ['/brand/', 'no listing'], ['/.well-known/', 'no listing']]) {
  const r = http(`${BASE}${p}`); const body = text(r);
  const listing = r.status === 200 && /Index of|<title>Index/i.test(body);
  if (expect === 'blocked') { if (r.status === 200) FAIL('sensitive path exposed', r.url, `HTTP 200 (${r.size}B)`, '403/404', 'deny rule in .htaccess'); else PASS('sensitive path', r.url, `HTTP ${r.status}`); }
  else if (listing) FAIL('directory listing', r.url, 'HTTP 200 with index listing', '403/404 or no listing', 'Options -Indexes in .htaccess (or IndexIgnore *)'); else PASS('directory', r.url, `HTTP ${r.status}, no listing`);
}
const sec = http(`${BASE}/.well-known/security.txt`);
if (sec.status !== 200 || !/^Contact:/m.test(text(sec))) FAIL('security.txt', sec.url, `HTTP ${sec.status}`, '200 with Contact line', 'dotfile rule must not block .well-known'); else PASS('security.txt', sec.url, '200');

// security headers on /
const H = home.headers;
for (const [name, re] of [['strict-transport-security', /max-age/], ['x-content-type-options', /nosniff/], ['x-frame-options', /./], ['referrer-policy', /./], ['content-security-policy', /default-src/], ['permissions-policy', /./]]) {
  if (!H[name] || !re.test(H[name])) FAIL('security header', `${BASE}/`, `${name}: ${H[name] ?? '(absent)'}`, 'present', 'mod_headers may be unavailable — check .htaccess Header directives'); else PASS('header', `${BASE}/`, `${name}: ${H[name].slice(0, 60)}`);
}
PASS('server', `${BASE}/`, `HTTP/${home.version}; server: ${H['server'] ?? '?'}; x-powered-by: ${H['x-powered-by'] ?? 'none'}; content-encoding: ${H['content-encoding'] ?? 'none'}`);
if (H['x-powered-by']) WARN('x-powered-by header', `${BASE}/`, H['x-powered-by'], 'absent', 'Header unset X-Powered-By in .htaccess');

// ---- 6. PHP endpoint (no data stored: GET, empty POST, honeypot POST)
const g = http(`${BASE}/api/enquiry.php`);
if (g.status !== 405) FAIL('enquiry GET', g.url, `HTTP ${g.status}${/<\?php/.test(text(g)) ? ' — PHP SOURCE RETURNED' : ''}`, '405', /<\?php/.test(text(g)) ? 'PHP is not executing in this directory — check hPanel PHP configuration' : 'check handler deployment');
else PASS('enquiry GET', g.url, '405 (PHP executes)');
const p0 = http(`${BASE}/api/enquiry.php`, { method: 'POST', data: '', contentType: 'application/x-www-form-urlencoded' });
if (p0.status !== 422) FAIL('enquiry empty POST', p0.url, `HTTP ${p0.status}: ${text(p0).replace(/\s+/g, ' ').slice(0, 160)}`, '422 validation error', 'check handler/PHP version (needs ≥ 8.1)');
else if (/Warning:|Fatal error|Notice:/.test(text(p0))) FAIL('enquiry PHP notices leak', p0.url, text(p0).slice(0, 160), 'no PHP warnings in output', 'display_errors off; fix the notice');
else PASS('enquiry empty POST', p0.url, '422');
const hp = http(`${BASE}/api/enquiry.php`, { method: 'POST', contentType: 'application/x-www-form-urlencoded', data: 'website=bot-filled-honeypot&name=Synthetic+Test&email=test%40example.invalid&course=medicine&message=honeypot+verification+do+not+store' });
if (hp.status !== 303 || !/\/apply\/thank-you\/?$/.test(hp.redirect)) FAIL('enquiry honeypot POST', hp.url, `HTTP ${hp.status} → ${hp.redirect}`, '303 → /apply/thank-you/ (dropped, not stored)', 'check handler');
else PASS('enquiry honeypot POST', hp.url, `303 → ${hp.redirect} (dropped by design)`);
const ty = http(`${BASE}/apply/thank-you/`);
if (ty.status !== 200 || !/noindex/.test(text(ty))) FAIL('thank-you page', ty.url, `HTTP ${ty.status}`, '200 with noindex', 'check deployment'); else PASS('thank-you page', ty.url, '200 noindex');

// ---- 7. browser: console errors, failed requests, overflow, mobile menu, axe
const browser = await chromium.launch({ proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' } : undefined });
const axeReport = [];
for (const [name, width, height, runAxe] of [['mobile', 390, 844, true], ['tablet', 820, 1180, false], ['desktop', 1280, 900, true]]) {
  const ctx = await browser.newContext({ viewport: { width, height }, ignoreHTTPSErrors: true, userAgent: 'UMA-live-verify/1.0 Playwright (read-only check)' });
  for (const url of pageUrls.length ? pageUrls : [`${BASE}/`]) {
    const page = await ctx.newPage(); const errs = [], bad = [];
    page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 160)); });
    page.on('pageerror', (e) => errs.push(`pageerror: ${String(e).slice(0, 160)}`));
    page.on('response', (r) => { if (r.status() >= 400) bad.push(`${r.status()} ${r.url()}`); });
    page.on('requestfailed', (r) => bad.push(`failed ${r.url()} ${r.failure()?.errorText ?? ''}`));
    try { await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }); } catch (e) { FAIL('browser load', url, String(e).slice(0, 120), 'page loads', 'investigate'); await page.close(); continue; }
    const path = new URL(url).pathname;
    if (errs.length) FAIL(`console errors (${name})`, url, errs.slice(0, 3).join(' | '), 'none', 'see message');
    if (bad.length) FAIL(`failed requests (${name})`, url, bad.slice(0, 3).join(' | '), 'none', 'missing asset or CSP block');
    if (name === 'mobile') {
      const overflow = await page.evaluate(() => document.scrollingElement.scrollWidth - window.innerWidth);
      if (overflow > 1) FAIL('horizontal overflow (mobile)', url, `${overflow}px wider than viewport`, 'no horizontal scroll', 'fix the overflowing element');
      if (await page.$('[data-menu-toggle]')) { await page.click('[data-menu-toggle]'); const exp = await page.getAttribute('[data-menu-toggle]', 'aria-expanded'); if (exp !== 'true') FAIL('mobile menu', url, `aria-expanded=${exp}`, 'true after tap', 'check menu script'); }
    }
    if (name !== 'tablet') await page.screenshot({ path: join(OUT, `${name}${path.replace(/\//g, '_') || '_'}.png`), fullPage: name === 'mobile' });
    if (runAxe) {
      try {
        const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze();
        for (const v of res.violations) { const blocking = ['serious', 'critical'].includes(v.impact); axeReport.push({ name, path, id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 3).map((x) => x.target.join(' ')) }); (blocking ? FAIL : WARN)(`axe ${v.impact} (${name})`, url, `${v.id}: ${v.help} ×${v.nodes.length} ${v.nodes[0]?.target.join(' ') ?? ''}`, 'no violation', 'fix markup/contrast'); }
      } catch (e) { WARN('axe', url, String(e).slice(0, 120), 'axe runs', 'retry'); }
    }
    if (!findings.some((f) => f.url === url && /\(${name}\)|mobile/.test(f.check))) PASS(`browser ${name}`, url, 'no console errors, no failed requests' + (runAxe ? ', axe clean' : ''));
    await page.close();
  }
  await ctx.close();
}
await browser.close();
writeFileSync(join(OUT, 'axe.json'), JSON.stringify(axeReport, null, 2));

// ---- report
const fails = findings.filter((f) => f.severity === 'FAIL'), warns = findings.filter((f) => f.severity === 'WARN');
const L = [`# Live verification — ${BASE} — ${new Date().toISOString()}`, '', `Read-only. ${passes.length} checks passed, ${fails.length} failures, ${warns.length} warnings. Pages from sitemap: ${pageUrls.length}. Assets checked: ${seen.size}.`, ''];
if (findings.length) { L.push('## Failures and warnings', '', '| Severity | Check | URL | Observed | Expected | Recommended fix |', '|---|---|---|---|---|---|'); for (const f of findings) L.push(`| ${f.severity} | ${f.check} | ${f.url} | ${String(f.observed).replace(/\|/g, '\\|')} | ${f.expected} | ${f.fix} |`); L.push(''); }
L.push('## Passed', '', '| Check | URL | Observed |', '|---|---|---|'); for (const p of passes) L.push(`| ${p.check} | ${p.url} | ${String(p.observed).replace(/\|/g, '\\|')} |`);
writeFileSync(join(OUT, 'live-report.md'), L.join('\n'));
for (const f of findings) console.log(`${f.severity.padEnd(4)} ${f.check} — ${f.url} — ${f.observed}`);
console.log(`\nlive-verify: ${passes.length} passed, ${fails.length} failed, ${warns.length} warnings → ${join(OUT, 'live-report.md')}`);
process.exit(fails.length ? 1 : 0);
