// Read-only live verification of the DEPLOYED site (run from site/ after "npm run build && npm run manifest", so the release
// manifest exists). Nothing is written to the server; the only POSTs are an empty form (expected 422) and a honeypot-filled
// synthetic form (expected 303, dropped by the handler, never stored, never e-mailed). The honeypot POST proves only that
// PHP runs the handler: it is NOT a mail-delivery test (EMAIL_DELIVERY_VERIFICATION.md is).
//
// Usage: node scripts/verify-live.mjs [base-url] [out-dir] [--site <url>] [--manifest <file>] [--out <dir>] [--no-browser]
//   base-url    where pages are fetched from (default https://ukrainemedicaladmissions.com)
//   --site      the production origin that canonical, robots and sitemap URLs must use (default
//               https://ukrainemedicaladmissions.com). When it differs from base-url, sitemap URLs are fetched from base-url
//               and the canonical-host redirects (http to https, www to apex) are reported as SKIP: they need the
//               production DNS and certificate (tests/verify-live-selftest.mjs uses this against a local server).
//   --manifest  release manifest (default tests/output/release-manifest.json, written by "npm run manifest"); its file list
//               says which university profiles the release publishes. Without it the profile checks assume none (fail closed).
//   --no-browser  skip the Playwright pass (console errors, failed requests, overflow, mobile menu, axe).
// Release checks (2026-10-12): the old Ternopil profile URL answers 302 to /universities/ (never 200) unless the release
// publishes it; /universities/ shows no draft card and, with no profile in the manifest, the empty-state sentence; no
// sitemap URL or page link names a profile the manifest does not contain; the CSP header carries script-src 'self' on
// pages, on a 404 and on the handler; no executable inline script (JSON-LD allowed), inline handler or javascript: URL;
// GET /api/enquiry.php answers 405; /uma-private/ answers 403 or 404; draft legal pages are reported as WARN.
// tests/verify-live-selftest.mjs proves each of them against a local stand-in for the server.
// Writes live-report.md and live-report.json to the output directory; exit code 1 when any check FAILs.
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
const require = createRequire(new URL('../package.json', import.meta.url));

const PRODUCTION = 'https://ukrainemedicaladmissions.com';
const argv = process.argv.slice(2), positional = [], flags = {};
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--no-browser') flags.noBrowser = true;
  else if (['--site', '--manifest', '--out'].includes(a)) { if (!argv[i + 1]) { console.error(`verify-live: ${a} needs a value`); process.exit(2); } flags[a.slice(2)] = argv[++i]; }
  else if (a.startsWith('--')) { console.error(`verify-live: unknown option ${a}`); process.exit(2); }
  else positional.push(a);
}
const BASE = (positional[0] ?? PRODUCTION).replace(/\/+$/, '');
const SITE = (flags.site ?? PRODUCTION).replace(/\/+$/, '');
const U = new URL(BASE); const HOST = U.host;
const SITE_HOST = new URL(SITE).host; const APEX = SITE_HOST.replace(/^www\./, '');
// The canonical-host redirects can be exercised only where the production host name resolves to the server being checked.
const PRODUCTION_BASE = HOST.replace(/^www\./, '') === APEX;
const OUT = resolve(flags.out ?? positional[1] ?? new URL('../tests/output/live', import.meta.url).pathname);
const MANIFEST = resolve(flags.manifest ?? new URL('../tests/output/release-manifest.json', import.meta.url).pathname);
const LOCAL_404_TITLE = 'Page not found';
const EMPTY_STATE = 'No university profile has completed verification yet.';
const TERNOPIL = 'ternopil-national-medical-university';
const LEGAL_PAGES = ['/privacy/', '/terms/', '/disclosure/', '/complaints-policy/'];
const LEGAL_MARKERS = [['Draft for legal review', /Draft for legal review/gi], ['[to be supplied', /\[to be supplied/gi], ['[proposed in the draft', /\[proposed in the draft/gi], ['data-owner-value', /\bdata-owner-value=/gi]];
mkdirSync(OUT, { recursive: true });

const findings = [], passes = [], skips = [];
const FAIL = (check, url, observed, expected, fix, severity = 'FAIL') => findings.push({ severity, check, url, observed, expected, fix });
const WARN = (check, url, observed, expected, fix) => FAIL(check, url, observed, expected, fix, 'WARN');
const PASS = (check, url, observed) => passes.push({ check, url, observed });
const SKIP = (check, url, reason) => skips.push({ check, url, reason });

// SITE URLs (sitemap, canonical) -> the URLs actually fetched (identical when base-url is the production origin)
const toFetch = (u) => (u === SITE || u.startsWith(SITE + '/') ? BASE + u.slice(SITE.length) : u);

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

// ---- Content-Security-Policy: present, script-src 'self' and nothing that re-enables inline or foreign script
function cspProblem(r) {
  const csp = r.headers['content-security-policy'];
  if (!csp) return { severity: 'FAIL', observed: 'Content-Security-Policy header absent' };
  const dirs = {};
  for (const d of csp.split(';').map((s) => s.trim()).filter(Boolean)) { const [k, ...v] = d.split(/\s+/); dirs[k.toLowerCase()] ??= v; }
  const ss = dirs['script-src'];
  if (!ss) return { severity: 'FAIL', observed: `no script-src directive: ${csp.slice(0, 120)}` };
  if (!ss.includes("'self'")) return { severity: 'FAIL', observed: `script-src ${ss.join(' ')}` };
  const isWeak = (v) => /^'unsafe-(inline|eval|hashes)'$|^'wasm-unsafe-eval'$|^\*$|^(data|blob|https?):?$/i.test(v);
  const weak = ss.filter(isWeak);
  if (weak.length) return { severity: 'FAIL', observed: `script-src ${ss.join(' ')} (weakened by ${weak.join(' ')})` };
  // script-src-elem and script-src-attr override script-src for script elements and event-handler attributes
  for (const k of ['script-src-elem', 'script-src-attr']) {
    const w = (dirs[k] ?? []).filter(isWeak);
    if (w.length) return { severity: 'FAIL', observed: `${k} ${dirs[k].join(' ')} (weakened by ${w.join(' ')})` };
  }
  if (ss.length > 1) return { severity: 'WARN', observed: `script-src ${ss.join(' ')} (extra source)` };
  for (const k of ['script-src-elem', 'script-src-attr']) if (dirs[k] && dirs[k].some((v) => v.toLowerCase() !== "'self'" && v.toLowerCase() !== "'none'")) return { severity: 'WARN', observed: `${k} ${dirs[k].join(' ')} (extra source)` };
  return null;
}
const CSP_EXPECTED = "Content-Security-Policy with script-src 'self' only";
const CSP_FIX = 'public/.htaccess must send the CSP with "Header always set" (mod_headers); any extra script source needs owner approval (ANALYTICS_AND_SEARCH_CONSOLE.md §B)';

// ---- executable inline script, inline event handlers and javascript: URLs (all blocked by script-src 'self')
// Attributes are parsed with their quoting, so a value that merely contains "onclick=" or "src=" (or an attribute such
// as data-src) neither raises nor hides a finding.
const TAG_RE = /<([a-zA-Z][a-zA-Z0-9:-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g;
const ATTR_RE = /([^\s"'>\/=]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s"'=<>`]+))?/g;
const attrsOf = (s) => { const a = new Map(); for (const m of s.matchAll(ATTR_RE)) { const k = m[1].toLowerCase(); if (!a.has(k)) a.set(k, m[2] === undefined ? '' : m[2].replace(/^(["'])([\s\S]*)\1$/, '$2')); } return a; };
const decodeAttr = (v) => v.replace(/&#x([0-9a-f]+);?/gi, (_, x) => String.fromCodePoint(parseInt(x, 16))).replace(/&#(\d+);?/g, (_, d) => String.fromCodePoint(Number(d))).replace(/&colon;/gi, ':').replace(/&tab;|&newline;/gi, '');
function inlineProblems(h) {
  const out = [];
  let scripts = 0;
  const handlers = [];
  let jsUrls = 0;
  const markup = h.replace(/<!--[\s\S]*?-->/g, '');
  // the content of script and style elements is not markup: blank it so its text cannot look like tags
  const tagsOnly = markup.replace(/(<(script|style)\b[^>]*>)[\s\S]*?(<\/\2\s*>)/gi, '$1$3');
  for (const m of tagsOnly.matchAll(TAG_RE)) {
    const name = m[1].toLowerCase(); const attrs = attrsOf(m[2]);
    if (name === 'script' && !attrs.has('src') && (attrs.get('type') ?? '').trim().toLowerCase() !== 'application/ld+json') scripts++;
    for (const k of attrs.keys()) if (/^on[a-z]+$/.test(k)) handlers.push(k);
    for (const k of ['href', 'src', 'action', 'formaction', 'xlink:href']) if (attrs.has(k) && /^javascript:/i.test(decodeAttr(attrs.get(k)).replace(/[\x00-\x20]/g, ''))) jsUrls++;
  }
  if (scripts) out.push(['inline script', `${scripts} executable inline <script> element(s)`]);
  if (handlers.length) out.push(['inline event handler', `${handlers.length} inline handler(s): ${[...new Set(handlers)].join(', ')}`]);
  if (jsUrls) out.push(['javascript: URL', `${jsUrls} javascript: URL(s) in markup`]);
  return out;
}
// ---- university choices offered in forms (home start form, /apply/): option values of the university selects
function universityOptions(h) {
  const out = new Set();
  for (const m of h.matchAll(/<select\b[^>]*\bname="university\d?"[^>]*>([\s\S]*?)<\/select>/gi)) for (const o of m[1].matchAll(/<option\b[^>]*\bvalue="([^"]*)"/gi)) { const v = o[1].trim().toLowerCase(); if (v && v !== 'unlisted') out.add(v); }
  return [...out];
}
// ---- links to university profiles: same-site href values whose path is /universities/<slug>/
function profileLinks(h, hosts) {
  const out = new Set();
  const tagsOnly = h.replace(/<!--[\s\S]*?-->/g, '').replace(/(<(script|style)\b[^>]*>)[\s\S]*?(<\/\2\s*>)/gi, '$1$3');
  for (const m of tagsOnly.matchAll(TAG_RE)) {
    const v = attrsOf(m[2]).get('href');
    if (v === undefined) continue;
    try { const u = new URL(decodeAttr(v).trim(), PRODUCTION); const s = /^\/universities\/([^/]+)\/?$/.exec(u.pathname)?.[1]; if (s && hosts.includes(u.host.toLowerCase())) out.add(decodeURIComponent(s).toLowerCase()); } catch {}
  }
  return [...out];
}
const checkInline = (url, h) => {
  const probs = inlineProblems(h);
  for (const [check, observed] of probs) FAIL(check, url, observed, 'none (JSON-LD allowed)', 'move the code into a bundled /_astro/*.js file; tests/check-meta.mjs should have caught this before release');
  return probs.length === 0;
};

console.log(`live verification of ${BASE}${BASE === SITE ? '' : ` (production origin ${SITE})`} — read-only`);

// ---- release manifest: which university profiles this release publishes
let manifest = null;
if (existsSync(MANIFEST)) { try { manifest = JSON.parse(readFileSync(MANIFEST, 'utf8')); } catch (e) { WARN('release manifest', MANIFEST, `unreadable: ${String(e).slice(0, 80)}`, 'valid JSON from npm run manifest', 'run "npm run build && npm run manifest" for the commit being checked'); } }
else WARN('release manifest', MANIFEST, 'not found', 'tests/output/release-manifest.json for the deployed commit', 'run "npm run build && npm run manifest" on the released commit first; until then the profile checks assume the release publishes no profile');
// N25: a manifest from release-manifest.mjs lists research previews separately; a profile page not listed as a preview
// counts as published (an older manifest without the list therefore treats every profile page as published).
const releasePages = (manifest?.files ?? []).map((f) => /^universities\/([^/]+)\/index\.html$/.exec(f.path)?.[1]).filter(Boolean).sort();
const releasePreviews = (Array.isArray(manifest?.researchPreviews) ? manifest.researchPreviews : []).filter((s) => releasePages.includes(s)).sort();
const releaseProfiles = releasePages.filter((s) => !releasePreviews.includes(s));
const releaseListed = [...releaseProfiles, ...releasePreviews];
PASS('release profiles', MANIFEST, manifest ? `${releaseProfiles.length} published profile(s)${releaseProfiles.length ? `: ${releaseProfiles.join(', ')}` : ''}; ${releasePreviews.length} research preview(s)` : 'no manifest: none assumed');

// ---- 1/2. robots.txt and sitemap
const robots = http(`${BASE}/robots.txt`);
if (robots.status !== 200) FAIL('robots.txt', `${BASE}/robots.txt`, `HTTP ${robots.status} ${robots.error ?? ''}`, '200', 'check that robots.txt was deployed to the document root');
else {
  const t = text(robots);
  if (!t.includes(`Sitemap: ${SITE}/sitemap-index.xml`)) FAIL('robots.txt sitemap line', `${BASE}/robots.txt`, t.trim().slice(0, 200), `Sitemap: ${SITE}/sitemap-index.xml`, 'rebuild without STAGING; redeploy');
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
    if (!c.startsWith(SITE + '/')) FAIL('sitemap child host', c, c, `starts with ${SITE}/`, 'astro.config site must be the production domain');
    const r = http(toFetch(c));
    if (r.status !== 200) { FAIL('sitemap file', c, `HTTP ${r.status}`, '200', 'check deployment'); continue; }
    pageUrls.push(...locs(text(r)));
  }
  const offHost = pageUrls.filter((u) => !u.startsWith(SITE + '/'));
  if (offHost.length) FAIL('sitemap URL host', offHost.join(' '), 'URLs on another host', SITE, 'rebuild with the production site URL');
  else PASS('sitemap', `${BASE}/sitemap-index.xml`, `${children.length} sitemap file(s), ${pageUrls.length} URLs, all on ${SITE_HOST}`);
}
// a profile URL may be listed only when the release publishes that profile
const sitemapProfiles = pageUrls.map((u) => { try { return /^\/universities\/([^/]+)\/$/.exec(new URL(u).pathname)?.[1]; } catch { return null; } }).filter(Boolean);
const strayProfiles = sitemapProfiles.filter((s) => !releaseProfiles.includes(s));
if (strayProfiles.length) FAIL('sitemap profile not in release', `${BASE}/sitemap-index.xml`, strayProfiles.map((s) => `/universities/${s}/`).join(' '), 'only profiles listed in the release manifest', 'an unpublished or unverified profile is advertised: rebuild from the released commit (the sitemap filter in astro.config.mjs) and redeploy');
else PASS('sitemap profiles', `${BASE}/sitemap-index.xml`, `${sitemapProfiles.length} profile URL(s), all published by the release (${releaseProfiles.length})`);

// ---- 1. every sitemap URL: status, type, canonical, robots meta, title, CSP, inline script; collect assets
const assets = new Set(); const pages = {};
const pageFetch = pageUrls.map(toFetch);
const addAsset = (u, from) => { try { const abs = new URL(toFetch(new URL(u, from).href)); if (abs.host === HOST) assets.add(abs.href.split('#')[0]); } catch {} };
const isOffSite = (v) => { const m = /^https?:\/\/([^/?#]+)/i.exec(v); return m ? ![HOST, SITE_HOST, `www.${APEX}`].includes(m[1].toLowerCase()) : false; };
let cspPages = 0, inlineClean = 0, draftFree = 0, profileClean = 0;
const siteHosts = [...new Set([HOST, SITE_HOST, APEX, `www.${APEX}`].map((x) => x.toLowerCase()))];
for (const url of pageUrls) {
  const r = http(toFetch(url)); pages[url] = r;
  if (r.status !== 200) { FAIL('page status', url, `HTTP ${r.status} ${r.error ?? ''}`, '200', 'check the deployed directory for this page'); continue; }
  if (!/text\/html/i.test(r.type)) FAIL('page content-type', url, r.type, 'text/html', 'server MIME configuration');
  const h = text(r);
  const canon = h.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (canon !== url) FAIL('canonical', url, canon ?? '(none)', url, 'canonical must equal the production URL; rebuild if site URL differs');
  const rob = h.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? '';
  if (/noindex/i.test(rob)) FAIL('robots meta', url, rob, 'index, follow', 'a sitemap URL must not be noindex');
  if (!/<title>[^<]+<\/title>/.test(h)) FAIL('title', url, '(missing)', 'a <title>', 'check build');
  if (/<\?php/.test(h)) FAIL('raw PHP in HTML', url, 'contains <?php', 'rendered HTML', 'PHP not executing — check hPanel PHP version');
  const csp = cspProblem(r);
  if (csp) (csp.severity === 'FAIL' ? FAIL : WARN)('CSP header', url, csp.observed, CSP_EXPECTED, CSP_FIX); else cspPages++;
  if (checkInline(url, h)) inlineClean++;
  if (/verification in progress/i.test(h)) FAIL('unverified draft shown', url, '"Verification in progress" badge or card', 'no draft university anywhere on the production site', 'a preview or pre-gate build is deployed: publish the production build of the released commit');
  else draftFree++;
  // a link to a profile the release does not publish, or (while unpublished) the old Ternopil slug anywhere on the page,
  // e.g. as a card, a select option or JSON-LD: the page comes from a pre-gate or preview build
  // (research previews of the release are listed, labelled pages: linking to them is expected)
  const strayLinks = profileLinks(h, siteHosts).filter((s) => !releaseListed.includes(s));
  for (const s of universityOptions(h)) if (!releaseListed.includes(s) && !strayLinks.includes(s)) strayLinks.push(s);
  if (!releaseListed.includes(TERNOPIL) && h.toLowerCase().includes(TERNOPIL) && !strayLinks.includes(TERNOPIL)) strayLinks.push(TERNOPIL);
  if (strayLinks.length) FAIL('unpublished profile referenced', url, strayLinks.map((s) => `/universities/${s}/`).join(' '), 'no link to, option for or mention of a profile the release neither publishes nor lists as a research preview', 'a pre-gate or preview build is deployed: publish the production build of the released commit');
  else profileClean++;
  for (const m of h.matchAll(/\b(?:href|src)="([^"#]+)"/g)) { const v = m[1]; if (/^(mailto:|tel:|javascript:|data:)/i.test(v) || isOffSite(v)) continue; addAsset(v, r.url); }
  for (const m of h.matchAll(/<link[^>]+rel="[^"]*(?:preload|icon|manifest|apple-touch-icon)[^"]*"[^>]+href="([^"]+)"/g)) addAsset(m[1], r.url);
  if (!findings.some((f) => f.url === url)) PASS('page', url, `200 text/html canonical ok robots "${rob}"`);
}
if (pageUrls.length) {
  if (cspPages === pageUrls.length) PASS('CSP header', `${BASE}/`, `script-src 'self' on all ${cspPages} sitemap pages`);
  if (inlineClean === pageUrls.length) PASS('inline script', `${BASE}/`, `no executable inline script, inline handler or javascript: URL on ${inlineClean} pages`);
  if (draftFree === pageUrls.length) PASS('unverified draft shown', `${BASE}/`, `no "Verification in progress" on ${draftFree} pages`);
  if (profileClean === pageUrls.length) PASS('unpublished profile referenced', `${BASE}/`, `no link to an unpublished profile on ${profileClean} pages (${releaseProfiles.length} published)`);
}
// the home page must look like the new site
const home = pages[`${SITE}/`] ?? http(`${BASE}/`);
if (home.status === 200 && !/Apply Online Now/.test(text(home))) FAIL('home content', `${BASE}/`, 'primary CTA text not found', '"Apply Online Now" present', 'wrong files in the document root (legacy site still served?)');

// ---- directory: honest empty state, or exactly the published profiles
{
  const url = `${SITE}/universities/`; const r = pages[url] ?? http(toFetch(url));
  if (r.status !== 200) FAIL('directory page', url, `HTTP ${r.status}`, '200', 'check deployment');
  else {
    const h = text(r);
    if (!pages[url] && /verification in progress/i.test(h)) FAIL('unverified draft shown', url, '"Verification in progress" card', 'no draft card', 'publish the production build of the released commit');
    // every card in the list: a research preview of this release (data-status="preview") or a published profile
    const list = h.split('data-list')[1]?.split('data-no-match')[0] ?? '';
    const cards = [...list.matchAll(/<article\b([^>]*)>/gi)].map((m) => ({ slug: /data-slug="([^"]*)"/.exec(m[1])?.[1] ?? '', status: /data-status="([^"]*)"/.exec(m[1])?.[1] ?? '' }));
    const badCards = cards.filter((c) => !(c.status === 'preview' && releasePreviews.includes(c.slug)) && !(c.status === 'verified' && releaseProfiles.includes(c.slug)));
    const unlistedPreviews = releasePreviews.filter((s) => !cards.some((c) => c.slug === s && c.status === 'preview'));
    if (unlistedPreviews.length) FAIL('directory lists research previews', url, `no "not yet verified" card for ${unlistedPreviews.join(', ')}`, 'a labelled card for every research preview of the release', 'stale directory page: redeploy');
    else if (releasePreviews.length) PASS('directory lists research previews', url, `${releasePreviews.length} research preview card(s), each labelled`);
    if (releaseProfiles.length === 0) {
      if (!h.includes(EMPTY_STATE)) FAIL('directory empty state', url, 'empty-state sentence not found', `"${EMPTY_STATE}"`, 'the release publishes no profile, so the directory must say so: deploy the production build of the released commit');
      else if (badCards.length) FAIL('directory empty state', url, `a card is listed that is neither a research preview of this release nor a published profile (${badCards.map((c) => c.slug || c.status || 'unmarked').join(', ')})`, 'only research-preview cards', 'deploy the production build of the released commit');
      else PASS('directory empty state', url, `no profile published; empty-state sentence shown${releasePreviews.length ? `, ${releasePreviews.length} research preview card(s)` : ''}`);
    } else {
      const missing = releaseProfiles.filter((s) => !h.includes(`href="/universities/${s}/"`));
      if (h.includes(EMPTY_STATE)) FAIL('directory empty state', url, 'empty-state sentence shown although the release publishes profiles', 'the published profiles listed', 'stale directory page: redeploy');
      else if (missing.length) FAIL('directory lists published profiles', url, `no link to ${missing.join(', ')}`, 'a card for every published profile', 'stale directory page: redeploy');
      else PASS('directory lists published profiles', url, `${releaseProfiles.length} published profile(s) linked`);
    }
  }
}

// ---- research previews (N25): each is served, labelled, noindex and without structured data
const previewProblems = (h) => [
  !h.includes('data-research-preview') && 'research-preview marker missing',
  !/<meta name="robots" content="noindex[^"]*"/.test(h) && 'not noindex',
  /application\/ld\+json/i.test(h) && 'structured data present',
  !/Not yet verified/.test(h) && '"Not yet verified" label missing',
].filter(Boolean);
for (const s of releasePreviews) {
  const url = `${BASE}/universities/${s}/`; const r = http(url);
  if (r.status !== 200) { FAIL('research preview page', url, `HTTP ${r.status}${r.redirect ? ` → ${r.redirect}` : ''}`, '200: the labelled research-preview page', 'deploy the production build of the released commit; .htaccess must not redirect a research preview'); continue; }
  const probs = previewProblems(text(r));
  if (probs.length) FAIL('research preview page', url, probs.join('; '), 'labelled "Not yet verified", noindex, no structured data', 'a wrong build is deployed: publish the production build of the released commit');
  else PASS('research preview page', url, 'labelled, noindex, no structured data');
}

// ---- the old Ternopil profile URL: the published profile, its research preview, or a 302 to the directory; never an
// unlabelled page
for (const p of [`/universities/${TERNOPIL}/`, `/universities/${TERNOPIL}`]) {
  const url = `${BASE}${p}`; const r = http(url);
  const loc = r.redirect ? new URL(r.redirect, url).href : '';
  if (releasePreviews.includes(TERNOPIL)) {
    const f = follow(url, 3);
    const probs = f.final && f.final.status === 200 ? previewProblems(text(f.final)) : [];
    if (!f.final || f.final.status !== 200 || f.hops[f.hops.length - 1].url !== `${BASE}/universities/${TERNOPIL}/`) FAIL('Ternopil profile URL', url, f.hops.map((h) => `${h.url} [${h.status}]`).join(' → '), 'the research-preview page (200)', 'the release lists Ternopil as a research preview: .htaccess must not redirect it (tests/publication-gate.mjs)');
    else if (probs.length) FAIL('Ternopil profile URL', url, `HTTP 200 but ${probs.join('; ')}`, 'the labelled, noindex research-preview page', 'a wrong build is deployed: publish the production build of the released commit');
    else PASS('Ternopil profile URL', url, 'research-preview page served (labelled, noindex)');
  } else if (releaseProfiles.includes(TERNOPIL)) {
    const f = follow(url, 3);
    if (!f.final || f.final.status !== 200 || f.hops[f.hops.length - 1].url !== `${BASE}/universities/${TERNOPIL}/`) FAIL('Ternopil profile URL', url, f.hops.map((h) => `${h.url} [${h.status}]`).join(' → '), 'the published profile (200)', 'the release publishes this profile: the .htaccess 302 rule must be gone (tests/publication-gate.mjs)');
    else PASS('Ternopil profile URL', url, 'published profile served (the release lists it)');
  } else if (r.status === 200) FAIL('Ternopil profile URL', url, 'HTTP 200: the unverified profile page is still served', `302 → ${BASE}/universities/`, 'deploy the release built from the working branch (HOSTING_AND_DEPLOYMENT_ASSESSMENT.md §13); public/.htaccess carries the RedirectMatch 302 rule');
  else if (r.status !== 302 || loc !== `${BASE}/universities/`) FAIL('Ternopil profile URL', url, `HTTP ${r.status}${loc ? ` → ${loc}` : ''}`, `302 → ${BASE}/universities/`, 'the temporary 302 (owner decision 7) must stay until the record passes its gates; check the RedirectMatch line in .htaccess');
  else PASS('Ternopil profile URL', url, `302 → ${loc}`);
}

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
for (const u of [...assets].filter((u) => !pageFetch.includes(u) && !u.endsWith('/') && !/\.php$/.test(u))) checkAsset(u, 'asset');
for (const { u, css } of cssFiles) for (const m of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) { if (/^data:/.test(m[1])) continue; try { checkAsset(new URL(m[1], u).href, 'css-url'); } catch {} }
for (const f of ['/favicon.ico', '/favicon.svg', '/apple-touch-icon.png', '/site.webmanifest', '/og-default.png', '/brand/uma-logo-horizontal-dark.svg']) checkAsset(`${BASE}${f}`, 'favicon/brand');
// internal links (directories) from pages: all must be 200 after at most one DirectorySlash hop
for (const u of [...assets].filter((u) => u.endsWith('/') && !pageFetch.includes(u))) { const r = follow(u, 3); if (!r.final || r.final.status !== 200) FAIL('internal link', u, `HTTP ${r.final?.status ?? r.hops.map((h) => h.status).join('>')}`, '200', 'broken internal link'); else PASS('internal link', u, `200 (${r.hops.length - 1} hop)`); }

// ---- release integrity: every manifest file byte-identical to the release
if (manifest) {
  const m = manifest; let same = 0; const diff = [];
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
const redirectCase = (from, to) => {
  const r = follow(from);
  const chain = r.hops.map((h) => `${h.url} [${h.status}]`).join(' → ');
  if (r.loop) FAIL('redirect loop', from, chain, `→ ${to}`, 'fix .htaccess rule order/anchoring');
  else if (!r.final || r.final.status !== 200) FAIL('redirect target', from, chain, `${to} 200`, 'check RedirectMatch target exists');
  else if (r.final.url !== to && r.hops[r.hops.length - 1].url !== to) FAIL('redirect destination', from, chain, to, 'check .htaccess rule');
  else if (r.hops.length - 1 > 2) WARN('redirect chain length', from, chain, '≤ 2 hops', 'combine rules');
  else if (![301, 308].includes(r.hops[0].status)) WARN('redirect status', from, chain, '301', 'use permanent redirects');
  else PASS('redirect', from, chain);
};
for (const [from, to] of [
  [`${BASE}/dentistry-admissions-in-ukraine`, `${BASE}/courses/dentistry/`], [`${BASE}/dentistry-admissions-in-ukraine/`, `${BASE}/courses/dentistry/`],
  [`${BASE}/document-translation-legalisation`, `${BASE}/admissions/`], [`${BASE}/document-translation-legalisation/`, `${BASE}/admissions/`],
  [`${BASE}/services`, `${BASE}/services/`], [`${BASE}/about`, `${BASE}/about/`],
]) redirectCase(from, to);
for (const [from, to] of [[`http://${APEX}/`, `https://${APEX}/`], [`https://www.${APEX}/`, `https://${APEX}/`], [`http://www.${APEX}/services/`, `https://${APEX}/services/`]]) {
  if (PRODUCTION_BASE) redirectCase(from, to);
  else SKIP('canonical-host redirect', from, `needs ${APEX} to resolve to the server under test, with its TLS certificate; ${BASE} is another host. Run against ${SITE} after the release`);
}

// ---- 5. 404 and sensitive paths
const nf = http(`${BASE}/no-such-page-${Date.now()}/`);
if (nf.status !== 404) FAIL('404 status', nf.url, `HTTP ${nf.status}`, '404', 'ErrorDocument 404 /404.html must be honoured');
else if (!text(nf).includes(LOCAL_404_TITLE)) FAIL('404 page content', nf.url, 'generic server 404', 'custom 404 page', 'check ErrorDocument path');
else { PASS('404', nf.url, '404 with custom page'); checkInline(nf.url, text(nf)); }
{
  const csp = cspProblem(nf);
  if (csp) (csp.severity === 'FAIL' ? FAIL : WARN)('CSP on 404 response', nf.url, csp.observed, CSP_EXPECTED, '"Header always set" (not "Header set") so error responses carry the CSP too (backlog N22 n)');
  else PASS('CSP on 404 response', nf.url, "script-src 'self'");
}
const nfh = http(`${BASE}/no-such-file-${Date.now()}.html`); if (nfh.status !== 404) FAIL('404 (file)', nfh.url, `HTTP ${nfh.status}`, '404', 'check ErrorDocument');
for (const [p, expect] of [['/.git/config', 'blocked'], ['/.git/HEAD', 'blocked'], ['/.htaccess', 'blocked'], ['/.env', 'blocked'], ['/api/', 'no listing'], ['/fonts/', 'no listing'], ['/_astro/', 'no listing'], ['/brand/', 'no listing'], ['/.well-known/', 'no listing']]) {
  const r = http(`${BASE}${p}`); const body = text(r);
  const listing = r.status === 200 && /Index of|<title>Index/i.test(body);
  if (expect === 'blocked') { if (r.status === 200) FAIL('sensitive path exposed', r.url, `HTTP 200 (${r.size}B)`, '403/404', 'deny rule in .htaccess'); else PASS('sensitive path', r.url, `HTTP ${r.status}`); }
  else if (listing) FAIL('directory listing', r.url, 'HTTP 200 with index listing', '403/404 or no listing', 'Options -Indexes in .htaccess (or IndexIgnore *)'); else PASS('directory', r.url, `HTTP ${r.status}, no listing`);
}
// private form storage (APPLICATION_SYSTEM_SPEC §14.3): only 403 or 404 is acceptable, never a page or a redirect
for (const p of ['/uma-private/', '/uma-private/config.php', '/uma-private/enquiries/']) {
  const r = http(`${BASE}${p}`);
  if (![403, 404].includes(r.status)) FAIL('private storage exposed', r.url, `HTTP ${r.status}${r.redirect ? ` → ${r.redirect}` : ''}`, '403 or 404', 'keep uma-private/ outside the document root; .htaccess "RedirectMatch 404 ^/uma-private(/.*)?$"');
  else PASS('private storage', r.url, `HTTP ${r.status}`);
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

// ---- legal pages: a draft banner or an owner placeholder is a release blocker (A0, A10), reported as WARN here
for (const p of LEGAL_PAGES) {
  const url = `${SITE}${p}`; const r = pages[url] ?? http(toFetch(url));
  if (r.status !== 200) continue; // reported by the page loop
  const h = text(r);
  const found = LEGAL_MARKERS.map(([label, re]) => [label, (h.match(re) ?? []).length]).filter(([, c]) => c > 0);
  if (found.length) WARN('legal page not final', url, found.map(([l, c]) => `"${l}" ×${c}`).join(', '), 'no draft banner, placeholder or proposal marker', 'complete LEGAL_COMPLETION_CHECKLIST.md and the legal review (SECURITY_AND_RELEASE_CHECKLIST.md A0, A10) before the release');
  else PASS('legal page', url, 'no draft banner or placeholder');
}

// ---- 6. PHP endpoint (no data stored: GET, empty POST, honeypot POST)
const g = http(`${BASE}/api/enquiry.php`);
if (g.status !== 405) FAIL('enquiry GET', g.url, `HTTP ${g.status}${/<\?php/.test(text(g)) ? ' — PHP SOURCE RETURNED' : ''}`, '405', /<\?php/.test(text(g)) ? 'PHP is not executing in this directory — check hPanel PHP configuration' : 'check handler deployment');
else PASS('enquiry GET', g.url, '405 (PHP executes)');
{ const csp = cspProblem(g); if (g.status && csp) (csp.severity === 'FAIL' ? FAIL : WARN)('CSP on handler response', g.url, csp.observed, CSP_EXPECTED, CSP_FIX); }
const p0 = http(`${BASE}/api/enquiry.php`, { method: 'POST', data: '', contentType: 'application/x-www-form-urlencoded' });
if (p0.status !== 422) FAIL('enquiry empty POST', p0.url, `HTTP ${p0.status}: ${text(p0).replace(/\s+/g, ' ').slice(0, 160)}`, '422 validation error', 'check handler/PHP version (needs ≥ 8.1)');
else if (/Warning:|Fatal error|Notice:/.test(text(p0))) FAIL('enquiry PHP notices leak', p0.url, text(p0).slice(0, 160), 'no PHP warnings in output', 'display_errors off; fix the notice');
else PASS('enquiry empty POST', p0.url, '422');
// Honeypot POST: proves PHP runs the handler and drops a bot. It stores nothing and sends no mail, so it says NOTHING
// about mail delivery (EMAIL_DELIVERY_VERIFICATION.md).
const hp = http(`${BASE}/api/enquiry.php`, { method: 'POST', contentType: 'application/x-www-form-urlencoded', data: 'website=bot-filled-honeypot&name=Synthetic+Test&email=test%40example.invalid&course=medicine&message=honeypot+verification+do+not+store' });
if (hp.status !== 303 || !/\/apply\/thank-you\/?$/.test(hp.redirect)) FAIL('enquiry honeypot POST', hp.url, `HTTP ${hp.status} → ${hp.redirect}`, '303 → /apply/thank-you/ (dropped, not stored)', 'check handler');
else PASS('enquiry honeypot POST', hp.url, `303 → ${hp.redirect} (dropped by design; not a mail-delivery test)`);
const ty = http(`${BASE}/apply/thank-you/`);
if (ty.status !== 200 || !/noindex/.test(text(ty))) FAIL('thank-you page', ty.url, `HTTP ${ty.status}`, '200 with noindex', 'check deployment'); else { PASS('thank-you page', ty.url, '200 noindex'); checkInline(ty.url, text(ty)); }

// ---- 7. browser: console errors, failed requests, overflow, mobile menu, axe
const axeReport = [];
if (flags.noBrowser) SKIP('browser checks', BASE, '--no-browser given: console errors, failed requests, overflow, mobile menu and axe not checked');
else {
  const { chromium } = require('playwright');
  const AxeMod = require('@axe-core/playwright'); const AxeBuilder = AxeMod.default ?? AxeMod.AxeBuilder ?? AxeMod;
  // A loopback base (the self-test's local server) is reached directly: Playwright adds "<-loopback>" to Chromium's bypass
  // list, so with a proxy configured even 127.0.0.1 would be sent to the proxy.
  const loopback = /^(localhost|127\.\d+\.\d+\.\d+|\[::1\])(:\d+)?$/i.test(HOST);
  const browser = await chromium.launch({ proxy: process.env.HTTPS_PROXY && !loopback ? { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' } : undefined });
  for (const [name, width, height, runAxe] of [['mobile', 390, 844, true], ['tablet', 820, 1180, false], ['desktop', 1280, 900, true]]) {
    const ctx = await browser.newContext({ viewport: { width, height }, ignoreHTTPSErrors: true, userAgent: 'UMA-live-verify/1.0 Playwright (read-only check)' });
    for (const url of pageFetch.length ? pageFetch : [`${BASE}/`]) {
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
      if (!findings.some((f) => f.url === url && (f.check.includes(`(${name})`) || /mobile/.test(f.check)))) PASS(`browser ${name}`, url, 'no console errors, no failed requests' + (runAxe ? ', axe clean' : ''));
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
}
writeFileSync(join(OUT, 'axe.json'), JSON.stringify(axeReport, null, 2));

// ---- report
const fails = findings.filter((f) => f.severity === 'FAIL'), warns = findings.filter((f) => f.severity === 'WARN');
const esc = (s) => String(s).replace(/\|/g, '\\|');
const L = [`# Live verification — ${BASE} — ${new Date().toISOString()}`, '', `Read-only. Production origin compared against: ${SITE}. ${passes.length} checks passed, ${fails.length} failures, ${warns.length} warnings, ${skips.length} not checked. Pages from sitemap: ${pageUrls.length}. Assets checked: ${seen.size}. Release manifest: ${manifest ? `${MANIFEST} (${manifest.generatedFrom}, ${releaseProfiles.length} profile(s))` : 'none'}.`, '', 'The honeypot POST is not a mail-delivery test: delivery is verified only by EMAIL_DELIVERY_VERIFICATION.md on the real host.', ''];
if (findings.length) { L.push('## Failures and warnings', '', '| Severity | Check | URL | Observed | Expected | Recommended fix |', '|---|---|---|---|---|---|'); for (const f of findings) L.push(`| ${f.severity} | ${f.check} | ${f.url} | ${esc(f.observed)} | ${esc(f.expected)} | ${esc(f.fix)} |`); L.push(''); }
if (skips.length) { L.push('## Not checked against this base URL', '', '| Check | URL | Reason |', '|---|---|---|'); for (const s of skips) L.push(`| ${s.check} | ${s.url} | ${esc(s.reason)} |`); L.push(''); }
L.push('## Passed', '', '| Check | URL | Observed |', '|---|---|---|'); for (const p of passes) L.push(`| ${p.check} | ${p.url} | ${esc(p.observed)} |`);
writeFileSync(join(OUT, 'live-report.md'), L.join('\n'));
writeFileSync(join(OUT, 'live-report.json'), JSON.stringify({ base: BASE, site: SITE, generated: new Date().toISOString(), manifest: manifest ? MANIFEST : null, releaseProfiles, pages: pageUrls.length, findings, skips, passes }, null, 2));
for (const f of findings) console.log(`${f.severity.padEnd(4)} ${f.check} — ${f.url} — ${f.observed}`);
for (const s of skips) console.log(`SKIP ${s.check} — ${s.url} — ${s.reason}`);
console.log(`\nlive-verify: ${passes.length} passed, ${fails.length} failed, ${warns.length} warnings, ${skips.length} not checked → ${join(OUT, 'live-report.md')}`);
process.exit(fails.length ? 1 : 0);
