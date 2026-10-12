#!/usr/bin/env node
// Google-readiness audit of the PRODUCTION build (site/dist). Local only: no live host, no Search Console, no indexing data.
//
// Builds nothing. Serves dist/ with PHP's built-in server and tests/fixtures/live-router.php, which applies the build's own
// .htaccess (headers, RewriteRule, RedirectMatch, DirectorySlash, ErrorDocument 404, file blocks, PHP), and requests every
// URL with redirect following disabled (each hop is requested and recorded). Then it checks, per page: status and final URL,
// content type, canonical, robots meta and X-Robots-Tag, robots.txt, the sitemap contract (indexable <=> in sitemap),
// title, meta description, H1, heading outline, <main> word count, internal links out and in (orphans), near-duplicate
// <main> text (5-word shingle Jaccard), JSON-LD (parses, @type, FAQPage and BreadcrumbList against the visible text,
// Organization and WebSite fields, none on research previews), lang, viewport, Open Graph, images (alt, dimensions, format,
// weight, oversizing, lazy loading), forms (honeypot, required fields), click depth from the home page, query-parameter
// URLs (canonical to the clean URL), 410 rules, security headers
// against the .htaccess; an exposure scan of EVERY output file; mobile checks with Playwright at 360 and 390 px (horizontal
// overflow, tap targets >= 24 px with the WCAG 2.5.8 inline and spacing exceptions, < 44 px advisory); and Lighthouse
// (mobile emulation, default throttling, as tests/perf.mjs) for every indexable URL plus one research-preview page.
//
// Usage (from site/):  npm run audit:seo [-- --no-lighthouse] [-- --no-mobile] [-- --out <file>] [-- --dist <built copy>]
// Build first when dist/ is missing or older than its sources:  UMA_CACHE_DIR=$(mktemp -d) npm run build
// Writes tests/output/seo-audit.json and prints a summary. Exit 0: no "high" issue; 1: at least one "high" issue;
// 2: the audit could not run (no build, stale build, no PHP, router cannot parse the .htaccess).
import http from 'node:http';
import { createServer } from 'node:net';
import { spawn, spawnSync, execFileSync } from 'node:child_process';
import { closeSync, existsSync, mkdirSync, mkdtempSync, openSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO_DIR = resolve(SITE_DIR, '..');
const ROUTER = join(SITE_DIR, 'tests', 'fixtures', 'live-router.php');
const PRODUCTION = 'https://ukrainemedicaladmissions.com';
const PROD_HOST = 'ukrainemedicaladmissions.com';
const ALLOWED_EMAIL = 'info@ukrainemedicaladmissions.com';
const args = process.argv.slice(2);
// --dist <dir> audits another built copy (used to prove the checks on mutated copies); the default is the production dist/.
const DIST = resolve(args.includes('--dist') ? args[args.indexOf('--dist') + 1] : join(SITE_DIR, 'dist'));
const OUT_FILE = resolve(args.includes('--out') ? args[args.indexOf('--out') + 1] : join(SITE_DIR, 'tests', 'output', 'seo-audit.json'));
const RUN_LH = !args.includes('--no-lighthouse');
const RUN_MOBILE = !args.includes('--no-mobile');

const MOBILE_WIDTHS = [360, 390];
const LEGAL = new Set(['/privacy/', '/terms/', '/disclosure/', '/complaints-policy/']);
const THIN_EXEMPT = new Set([...LEGAL, '/apply/']); // noted, not failed
const THIN_WORDS = 300;
const DUP_MEDIUM = 0.5; // highest 5-word-shingle Jaccard against another INDEXABLE page
const DUP_LOW = 0.3;
const TITLE_IDEAL = 60, TITLE_MAX = 70, DESC_MIN = 50, DESC_MAX = 160;
const TAP_MIN = 24, TAP_ADVISORY = 44;
const IMG_MODERN_BYTES = 100 * 1024, IMG_HEAVY_BYTES = 300 * 1024, FOLD_PX = 900; // image checks (desktop 1280x900 extraction)
const DEPTH_MAX = 3; // clicks from the home page to an indexable page
const PARAM_PROBES = ['/universities/?q=odessa', '/?utm_source=audit&utm_medium=test', '/faq/?ref=audit']; // query parameters a visitor or campaign may add
const LH_CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];
const SEVERITY_ORDER = { high: 0, medium: 1, low: 2 };

const die = (msg) => { console.error(`seo-audit: ${msg}`); process.exit(2); };
const rel = (p) => relative(SITE_DIR, p);

// ------------------------------------------------------------------------------------------------ preconditions
const BUILD_HINT = 'cd site && UMA_CACHE_DIR=$(mktemp -d) npm run build';
if (!existsSync(join(DIST, 'index.html')) || !existsSync(join(DIST, '.htaccess'))) die(`dist/ (with .htaccess) is missing. Build it first: ${BUILD_HINT}`);
function newestFile(p) {
  if (!existsSync(p)) return 0;
  const s = statSync(p);
  if (!s.isDirectory()) return s.mtimeMs;
  let m = 0;
  for (const f of readdirSync(p)) if (f !== 'node_modules' && f !== '.astro') m = Math.max(m, newestFile(join(p, f)));
  return m;
}
// package.json is left out: its scripts (this audit's own entry among them) do not change the built output.
const builtAt = statSync(join(DIST, 'index.html')).mtimeMs;
const sourcesAt = Math.max(...['src', 'public', 'data', 'astro.config.mjs'].map((p) => newestFile(join(SITE_DIR, p))));
if (sourcesAt > builtAt) die(`dist/ is older than its sources (newest source ${new Date(sourcesAt).toISOString()}, build ${new Date(builtAt).toISOString()}). Rebuild: ${BUILD_HINT}`);
const HTACCESS = readFileSync(join(DIST, '.htaccess'), 'utf8');
if (existsSync(join(SITE_DIR, 'public', '.htaccess')) && readFileSync(join(SITE_DIR, 'public', '.htaccess'), 'utf8') !== HTACCESS) die(`dist/.htaccess differs from public/.htaccess. Rebuild: ${BUILD_HINT}`);
if (spawnSync('php', ['-v']).status !== 0) die('php is not installed (needed for tests/fixtures/live-router.php)');
const summaryRun = spawnSync('php', [ROUTER, '--summary', DIST], { encoding: 'utf8' });
let routerCfg = {};
try { routerCfg = JSON.parse(summaryRun.stdout); } catch { die(`live-router --summary failed: ${(summaryRun.stderr || summaryRun.stdout).slice(0, 300)}`); }
if (routerCfg.error) die(`live-router cannot emulate dist/.htaccess: ${routerCfg.error}`);

const git = (...a) => { try { return execFileSync('git', a, { cwd: REPO_DIR, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return null; } };
const COMMIT = git('rev-parse', 'HEAD');
const BRANCH = git('rev-parse', '--abbrev-ref', 'HEAD');
const DIRTY = (git('status', '--porcelain') ?? '').split('\n').filter(Boolean);

// ------------------------------------------------------------------------------------------------ local server
const TMP = mkdtempSync(join(tmpdir(), 'uma-seo-audit-'));
const PRIVATE = join(TMP, 'uma-private');
mkdirSync(PRIVATE, { recursive: true });
writeFileSync(join(PRIVATE, 'config.php'), "<?php return ['send_mail' => false, 'notify_to' => 'nobody@example.invalid'];\n");
let serverProc = null;
const cleanup = () => {
  if (serverProc) { try { process.kill(-serverProc.pid, 'SIGTERM'); } catch {} serverProc = null; }
  try { rmSync(TMP, { recursive: true, force: true }); } catch {}
};
process.on('exit', cleanup);
process.on('SIGINT', () => process.exit(130));
const freePort = () => new Promise((res, rej) => { const s = createServer(); s.on('error', rej); s.listen(0, '127.0.0.1', () => { const { port } = s.address(); s.close(() => res(port)); }); });
const PORT = await freePort();
const HOSTPORT = `127.0.0.1:${PORT}`;
const BASE = `http://${HOSTPORT}`;
{
  // The request log goes to a file, never a pipe, so the server can never block on a full pipe buffer.
  const fd = openSync(join(TMP, 'php.log'), 'w');
  serverProc = spawn('php', ['-d', 'expose_php=0', '-S', HOSTPORT, '-t', DIST, ROUTER], {
    env: { ...process.env, UMA_PRIVATE_DIR: PRIVATE, PHP_CLI_SERVER_WORKERS: '4' }, stdio: ['ignore', 'ignore', fd], detached: true,
  });
  closeSync(fd);
  let up = false;
  for (let i = 0; i < 100 && !up; i++) { try { await fetch(`${BASE}/robots.txt`); up = true; } catch { await new Promise((r) => setTimeout(r, 100)); } }
  if (!up) die(`php -S did not start: ${readFileSync(join(TMP, 'php.log'), 'utf8').slice(0, 300)}`);
}

/** One HTTP request to the local stand-in, redirects NOT followed. `host` sets the Host header (default 127.0.0.1:port). */
function rawRequest(path, { host = HOSTPORT, method = 'GET' } = {}) {
  return new Promise((res, rej) => {
    const req = http.request({ hostname: '127.0.0.1', port: PORT, path, method, agent: false, headers: { host, 'user-agent': 'Mozilla/5.0 (compatible; uma-seo-audit/1.0)', accept: '*/*' } }, (r) => {
      const chunks = [];
      r.on('data', (c) => chunks.push(c));
      r.on('end', () => res({ status: r.statusCode, headers: r.headers, body: Buffer.concat(chunks) }));
    });
    req.on('error', rej);
    req.setTimeout(30000, () => req.destroy(new Error(`timeout ${path}`)));
    req.end();
  });
}
const responseCache = new Map();
const get = (path, opts = {}) => {
  const key = `${opts.method ?? 'GET'} ${opts.host ?? HOSTPORT} ${path}`;
  if (!responseCache.has(key)) responseCache.set(key, rawRequest(path, opts));
  return responseCache.get(key);
};
/** Map a Location header onto the local server. HTTPS on the production apex is served by the same stand-in (it cannot
 *  terminate TLS), so such a hop continues locally with the default Host header. */
function localise(location) {
  let u;
  try { u = new URL(location, BASE); } catch { return { invalid: location }; }
  if (u.host === HOSTPORT) return { path: u.pathname + u.search };
  if (u.protocol === 'https:' && u.hostname === PROD_HOST) return { path: u.pathname + u.search, tlsHop: true };
  return { external: u.href };
}
const shown = (path, host) => (host && host !== HOSTPORT ? `http://${host}${path}` : path);
async function follow(path, host) {
  const chain = [];
  let cur = { path, host };
  for (let hop = 0; hop < 8; hop++) {
    const r = await get(cur.path, { host: cur.host });
    const location = r.headers.location ?? null;
    chain.push({ url: shown(cur.path, cur.host), status: r.status, location });
    if (r.status >= 300 && r.status < 400 && location) {
      const next = localise(location);
      if (next.external || next.invalid) return { chain, final: null, finalUrl: next.external ?? next.invalid, external: true };
      cur = { path: next.path, host: undefined };
      continue;
    }
    return { chain, final: r, finalUrl: cur.path, hops: chain.length - 1 };
  }
  return { chain, final: null, finalUrl: null, loop: true };
}

// ------------------------------------------------------------------------------------------------ helpers
const norm = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
const canonText = (s) => norm(String(s ?? '').replace(/<[^>]+>/g, ' ')).toLowerCase()
  .replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-').replace(/ /g, ' ')
  .replace(/&amp;/g, '&').replace(/\s+([.,;:!?)])/g, '$1').replace(/\s+/g, ' ').trim();
const chars = (s) => [...String(s ?? '')].length;
const words = (s) => norm(s).split(' ').filter((w) => /[\p{L}\p{N}]/u.test(w));
const shingles = (s) => {
  const t = String(s ?? '').toLowerCase().replace(/[^\p{L}\p{N}\s']/gu, ' ').split(/\s+/).filter(Boolean);
  const set = new Set();
  for (let i = 0; i + 5 <= t.length; i++) set.add(t.slice(i, i + 5).join(' '));
  return set;
};
const jaccard = (a, b) => { if (!a.size || !b.size) return 0; let n = 0; for (const x of a) if (b.has(x)) n++; return n / (a.size + b.size - n); };
const contentType = (r) => String(r?.headers?.['content-type'] ?? '');
const isHtml = (r) => /^text\/html\b/i.test(contentType(r));
const pct = (x) => Math.round(x * 100);
const sameUrl = (a, b) => { try { return new URL(a).href === new URL(b).href; } catch { return false; } };
function walk(dir, out = []) { for (const f of readdirSync(dir)) { const p = join(dir, f); statSync(p).isDirectory() ? walk(p, out) : out.push(p); } return out; }

/** The source file of a built page and the line of a pattern in it (for "proposed fix" hints). */
function sourceOf(path) {
  const p = path.replace(/^\/|\/$/g, '');
  if (p === '') return 'src/pages/index.astro';
  if (/^universities\/[^/]+$/.test(p)) return 'src/pages/universities/[slug].astro';
  if (/^courses\/[^/]+$/.test(p)) return 'src/pages/courses/[course].astro';
  if (p === '404' || path === '(404 probe)') return 'src/pages/404.astro';
  for (const c of [`src/pages/${p}/index.astro`, `src/pages/${p}.astro`]) if (existsSync(join(SITE_DIR, c))) return c;
  return null;
}
function locate(file, re) {
  if (!file || !existsSync(join(SITE_DIR, file))) return file ?? '(source not found)';
  const lines = readFileSync(join(SITE_DIR, file), 'utf8').split('\n');
  const i = lines.findIndex((l) => re.test(l));
  return `site/${file}${i >= 0 ? `:${i + 1}` : ''}`;
}

// ------------------------------------------------------------------------------------------------ findings
const findings = []; // { check, severity, url, evidence, fix }
const notes = [];    // observations that are not issues (exemptions, local limits, allowed exposure)
const finding = (check, severity, url, evidence, fix) => findings.push({ check, severity, url, evidence, fix });
const note = (check, url, text) => notes.push({ check, url, text });

// ------------------------------------------------------------------------------------------------ .htaccess rules
const alwaysHeaders = [...HTACCESS.matchAll(/^\s*Header\s+always\s+set\s+(\S+)\s+"([^"]*)"\s*$/gmi)].map((m) => ({ name: m[1].toLowerCase(), value: m[2] }));
const redirectRules = [...HTACCESS.matchAll(/^\s*RedirectMatch\s+(\d{3})\s+(\S+)(?:\s+(\S+))?\s*$/gmi)].map((m) => ({ status: Number(m[1]), pattern: m[2], target: m[3] ?? null, re: new RegExp(m[2]) }));
const rewriteRules = [...HTACCESS.matchAll(/^\s*RewriteRule\s+(\S+)\s+(\S+)(?:\s+\[([^\]]+)\])?\s*$/gmi)].map((m) => ({ pattern: m[1], target: m[2], flags: m[3] ?? '', re: new RegExp(m[1]) }));
/** Concrete paths that a RedirectMatch / RewriteRule pattern matches (common constructs only), each verified against it. */
function instantiate(pattern, { leadingSlash }) {
  let variants = [pattern.replace(/^\^/, '').replace(/\$$/, '')];
  const expand = (re, options) => {
    for (let guard = 0; guard < 6 && variants.some((v) => re.test(v)); guard++) variants = variants.flatMap((v) => (re.test(v) ? options.map((o) => v.replace(re, o)) : [v]));
  };
  expand(/\(\/\.\*\)\?/, ['', '/', '/seo-audit-probe']);
  expand(/\(\^\|\/\)/, ['', 'seo-audit-dir/']);
  expand(/\(\/\|\$\)/, ['', '/', '/config']);
  expand(/\/\?/, ['', '/']);
  variants = variants.map((v) => v.replace(/\\\./g, '.').replace(/\.\*/g, 'seo-audit-probe').replace(/\\\//g, '/'));
  const re = new RegExp(pattern);
  return [...new Set(variants)]
    .filter((v) => !/[()[\]|*+?^$\\]/.test(v))
    .map((v) => (leadingSlash ? (v.startsWith('/') ? v : `/${v}`) : `/${v}`))
    .filter((v) => re.test(leadingSlash ? v : v.slice(1)));
}

// ------------------------------------------------------------------------------------------------ URL inventory
const urls = new Map(); // key -> record
function addUrl(path, source, { host, expect, label } = {}) {
  const key = `${host ?? ''} ${path}`;
  if (!urls.has(key)) urls.set(key, { url: shown(path, host), path, host, sources: [], expect: expect ?? null, label: label ?? null });
  const r = urls.get(key);
  if (!r.sources.includes(source)) r.sources.push(source);
  if (expect && !r.expect) r.expect = expect;
  if (label && !r.label) r.label = label;
  return r;
}
const distPages = walk(DIST).filter((f) => f.endsWith('/index.html')).map((f) => `/${relative(DIST, dirname(f))}/`.replace(/^\/\.?\/$/, '/').replace(/\/+/g, '/')).sort();
for (const p of distPages) addUrl(p, 'dist page');

// Sitemaps (as served), robots.txt
const locsOf = (xml) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));
const robotsRes = await get('/robots.txt');
const robotsTxt = robotsRes.status === 200 ? robotsRes.body.toString('utf8') : '';
const sitemapRefs = [...robotsTxt.matchAll(/^\s*Sitemap:\s*(\S+)/gmi)].map((m) => m[1]);
const sitemapFiles = new Map(); // path -> { status, locs }
async function readSitemap(path, depth = 0) {
  if (sitemapFiles.has(path) || depth > 3) return;
  const r = await get(path);
  const xml = r.status === 200 ? r.body.toString('utf8') : '';
  const isIndex = /<sitemapindex\b/.test(xml);
  const locs = locsOf(xml);
  sitemapFiles.set(path, { status: r.status, contentType: contentType(r), isIndex, locs, lastmod: /<lastmod>/.test(xml), wellFormed: /^<\?xml[\s\S]*<\/(urlset|sitemapindex)>\s*$/.test(xml.trim()) });
  if (isIndex) for (const l of locs) { const t = localise(l); if (t.path) await readSitemap(t.path, depth + 1); }
}
for (const ref of sitemapRefs) { const t = localise(ref); if (t.path) await readSitemap(t.path); }
await readSitemap('/sitemap-index.xml');
await readSitemap('/sitemap-0.xml');
const sitemapUrls = new Set();
for (const [, s] of sitemapFiles) if (!s.isIndex) for (const l of s.locs) sitemapUrls.add(l);
for (const loc of sitemapUrls) {
  let u; try { u = new URL(loc); } catch { finding('sitemap-loc-invalid', 'high', loc, `<loc>${loc}</loc> is not a URL`, 'site/astro.config.mjs (sitemap integration)'); continue; }
  if (u.origin !== PRODUCTION) finding('sitemap-loc-host', 'high', loc, `<loc> origin ${u.origin}, expected ${PRODUCTION}`, 'site/astro.config.mjs: site');
  addUrl(u.pathname + u.search, 'sitemap');
}

// Legacy redirects and rewrite rules from the .htaccess
const legacy = [];
for (const r of redirectRules) {
  const paths = instantiate(r.pattern, { leadingSlash: true });
  if (!paths.length) note('htaccess', '(none)', `RedirectMatch ${r.status} ${r.pattern}: no concrete URL could be instantiated`);
  for (const p of paths) { addUrl(p, r.status >= 300 && r.status < 400 ? 'legacy redirect (.htaccess)' : `RedirectMatch ${r.status} (.htaccess)`, { label: `RedirectMatch ${r.status} ${r.pattern}${r.target ? ` ${r.target}` : ''}` }); legacy.push({ path: p, rule: r }); }
}
for (const r of rewriteRules) {
  if (r.pattern === '^') continue; // the canonical-host rule: exercised with Host headers below
  const paths = instantiate(r.pattern, { leadingSlash: false });
  if (!paths.length) note('htaccess', '(none)', `RewriteRule ${r.pattern}: no concrete URL could be instantiated`);
  for (const p of paths) addUrl(p, 'rewrite rule (.htaccess)', { label: `RewriteRule ${r.pattern} ${r.target} [${r.flags}]`, expect: /\bF\b/.test(r.flags) ? 'blocked' : null });
}

// Probes
const PROBE_404 = '/seo-audit-no-such-page/';
const probes = [
  ['/robots.txt', 'robots'], ['/sitemap-index.xml', 'sitemap'], ['/sitemap-0.xml', 'sitemap'], ['/sitemap.xml', 'guess'],
  [PROBE_404, '404'], ['/seo-audit-no-such-file.html', '404'], ['/api/enquiry.php', 'enquiry-get'], ['/uma-private/', 'private'],
  ['/uma-private/config.php', 'private'], ['/.git/config', 'blocked'], ['/.git/HEAD', 'blocked'], ['/.htaccess', 'blocked'], ['/index.html', 'duplicate-path'],
  ['/.well-known/security.txt', 'asset'], ['/site.webmanifest', 'asset'], ['/favicon.ico', 'asset'], ['/api/', 'no-listing'], ['/_astro/', 'no-listing'],
];
for (const [p, expect] of probes) addUrl(p, 'probe', { expect });
const hostProbes = [
  { host: PROD_HOST, path: '/', want: `${PRODUCTION}/`, label: 'http -> https (apex)' },
  { host: PROD_HOST, path: '/about/', want: `${PRODUCTION}/about/`, label: 'http -> https (apex)' },
  { host: `www.${PROD_HOST}`, path: '/', want: `${PRODUCTION}/`, label: 'www -> apex' },
  { host: `www.${PROD_HOST}`, path: '/services/', want: `${PRODUCTION}/services/`, label: 'www -> apex' },
  { host: PROD_HOST, path: '/dentistry-admissions-in-ukraine', want: `${PRODUCTION}/dentistry-admissions-in-ukraine`, label: 'http legacy URL (two hops)' },
  { host: `staging.${PROD_HOST}`, path: '/', want: null, label: 'staging host must NOT be sent to production' },
];
for (const h of hostProbes) addUrl(h.path, 'host rule (.htaccess)', { host: h.host, label: h.label });
// DirectorySlash: every page without its trailing slash
for (const p of distPages) if (p !== '/') addUrl(p.replace(/\/$/, ''), 'no trailing slash', { expect: 'slash-redirect' });

// ------------------------------------------------------------------------------------------------ request every URL
for (const rec of urls.values()) {
  const f = await follow(rec.path, rec.host);
  const first = await get(rec.path, { host: rec.host });
  Object.assign(rec, {
    status: first.status, contentType: contentType(first), location: first.headers.location ?? null, xRobotsTag: first.headers['x-robots-tag'] ?? null,
    chain: f.chain, finalUrl: f.finalUrl, finalStatus: f.final?.status ?? null, hops: f.hops ?? null, loop: !!f.loop, external: !!f.external,
  });
}

// ------------------------------------------------------------------------------------------------ robots.txt
function robotsRules(txt) {
  const groups = []; let cur = null; let lastWasAgent = false;
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim(); if (!line) continue;
    const m = /^([A-Za-z-]+)\s*:\s*(.*)$/.exec(line); if (!m) continue;
    const k = m[1].toLowerCase(), v = m[2].trim();
    if (k === 'user-agent') { if (!lastWasAgent) { cur = { agents: [], rules: [] }; groups.push(cur); } cur.agents.push(v.toLowerCase()); lastWasAgent = true; continue; }
    lastWasAgent = false;
    if (cur && (k === 'allow' || k === 'disallow')) cur.rules.push({ allow: k === 'allow', path: v });
  }
  const g = groups.find((x) => x.agents.includes('googlebot')) ?? groups.find((x) => x.agents.includes('*'));
  return g?.rules ?? [];
}
const ROBOTS_RULES = robotsRules(robotsTxt);
function robotsBlocked(path) {
  let best = null;
  for (const r of ROBOTS_RULES) {
    if (r.path === '') continue;
    const re = new RegExp(`^${r.path.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\\\$$/, '$')}`);
    if (re.test(path) && (!best || r.path.length > best.path.length || (r.path.length === best.path.length && r.allow))) best = r;
  }
  return best && !best.allow ? best.path : null;
}

// ------------------------------------------------------------------------------------------------ pages: DOM extraction
const { chromium } = await import('playwright');
const browser = await chromium.launch();
const pageRecords = [...urls.values()].filter((r) => r.status === 200 && /^text\/html/i.test(r.contentType) && (r.sources.includes('dist page') || r.sources.includes('sitemap')) && !r.host);
const probe404 = urls.get(` ${PROBE_404}`);
if (probe404 && /^text\/html/i.test(probe404.contentType)) pageRecords.push(probe404);
const isProbe404 = (r) => r.path === PROBE_404;

function extractDom() {
  const n = (s) => (s ?? '').replace(/\s+/g, ' ').trim();
  const strip = (el) => { if (!el) return ''; const c = el.cloneNode(true); c.querySelectorAll('script, style, template, noscript').forEach((x) => x.remove()); return n(c.textContent); };
  const metas = (sel) => [...document.querySelectorAll(sel)].map((m) => m.getAttribute('content') ?? '');
  const og = {};
  for (const m of document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]')) og[m.getAttribute('property') ?? m.getAttribute('name')] = m.getAttribute('content');
  const main = document.querySelector('main');
  return {
    lang: document.documentElement.getAttribute('lang'),
    title: document.title, titleCount: document.querySelectorAll('title').length,
    descriptions: metas('meta[name="description"]'),
    robotsMeta: metas('meta[name="robots"], meta[name="googlebot"]'),
    viewport: metas('meta[name="viewport"]')[0] ?? null,
    charset: document.characterSet,
    canonicals: [...document.querySelectorAll('link[rel="canonical"]')].map((l) => l.getAttribute('href')),
    og,
    mainCount: document.querySelectorAll('main').length,
    h1: [...document.querySelectorAll('h1')].map((h) => n(h.textContent)),
    headings: [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((h) => ({ level: Number(h.tagName[1]), text: n(h.textContent).slice(0, 90), inMain: !!h.closest('main') })),
    mainText: strip(main), bodyText: strip(document.body),
    links: [...document.querySelectorAll('a[href]')].map((a) => ({ href: a.getAttribute('href'), text: n(a.textContent).slice(0, 60) || a.getAttribute('aria-label') || '', inMain: !!a.closest('main') })),
    forms: [...document.querySelectorAll('form')].map((f) => ({ action: f.getAttribute('action'), method: (f.getAttribute('method') ?? 'get').toLowerCase(), honeypot: !!f.querySelector('input[name="website"]'), required: f.querySelectorAll('[required]').length, fields: f.querySelectorAll('input:not([type="hidden"]), select, textarea').length })),
    images: [...document.querySelectorAll('img')].map((i) => { const r = i.getBoundingClientRect(); return { src: i.getAttribute('src'), alt: i.getAttribute('alt'), width: i.getAttribute('width'), height: i.getAttribute('height'), loading: i.getAttribute('loading'), top: Math.round(r.top + window.scrollY), renderedWidth: Math.round(r.width), naturalWidth: i.naturalWidth }; }),
    jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
    breadcrumb: [...document.querySelectorAll('nav[aria-label="breadcrumb" i] li')].map((li) => ({ name: n(li.textContent), href: li.querySelector('a')?.getAttribute('href') ?? null })),
    ids: [...document.querySelectorAll('[id], a[name]')].map((e) => e.id || e.getAttribute('name')),
    researchPreview: !!document.querySelector('[data-research-preview]'),
    jsUrls: document.querySelectorAll('a[href^="javascript:" i]').length,
  };
}
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  for (const rec of pageRecords) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(BASE + rec.path, { waitUntil: 'load' });
    rec.dom = await page.evaluate(extractDom);
    rec.consoleErrors = errors.filter((e) => !(isProbe404(rec) && /404/.test(e)));
    await page.close();
  }
  await ctx.close();
}

// ------------------------------------------------------------------------------------------------ links (out) and their targets
function linkTarget(href, pagePath) {
  if (href == null) return null;
  const h = href.trim();
  if (/^(mailto|tel|javascript|data|sms|whatsapp):/i.test(h)) return { scheme: h.split(':')[0].toLowerCase(), raw: h };
  if (h.startsWith('#')) return { path: pagePath, search: '', hash: decodeURIComponent(h.slice(1)), samePage: true };
  let u; try { u = new URL(h, PRODUCTION + pagePath); } catch { return { invalid: h }; }
  if (u.hostname !== PROD_HOST && u.hostname !== `www.${PROD_HOST}`) return { external: u.href };
  return { path: u.pathname, search: u.search, hash: u.hash ? decodeURIComponent(u.hash.slice(1)) : '', www: u.hostname !== PROD_HOST, insecure: u.protocol === 'http:' };
}
const linkTargets = new Map(); // path+search -> follow result
const inbound = new Map();     // final path -> Set(source page)
const inboundMain = new Map();
const externalLinks = new Map();
for (const rec of pageRecords) {
  const out = [];
  for (const l of rec.dom.links) {
    const t = linkTarget(l.href, isProbe404(rec) ? '/' : rec.path);
    if (!t) continue;
    if (t.external) { externalLinks.set(t.external, (externalLinks.get(t.external) ?? 0) + 1); continue; }
    if (t.scheme || t.invalid) { out.push({ ...l, ...t }); continue; }
    const key = t.path + t.search;
    if (!linkTargets.has(key)) linkTargets.set(key, await follow(key));
    out.push({ ...l, ...t, key });
  }
  for (const f of rec.dom.forms) {
    if (!f.action) continue;
    const t = linkTarget(f.action, rec.path);
    if (t?.path) { const r = await get(t.path + t.search); out.push({ href: f.action, form: true, method: f.method, key: t.path + t.search, formStatus: r.status }); }
  }
  rec.linksOut = out;
}
for (const rec of pageRecords) {
  if (isProbe404(rec)) continue;
  for (const l of rec.linksOut) {
    if (!l.key || l.form) continue;
    const f = linkTargets.get(l.key);
    const finalPath = f?.final?.status === 200 ? f.finalUrl.replace(/\?.*$/, '') : l.path;
    if (finalPath === rec.path) continue; // self links do not count
    if (!inbound.has(finalPath)) inbound.set(finalPath, new Set());
    inbound.get(finalPath).add(rec.path);
    if (l.inMain) { if (!inboundMain.has(finalPath)) inboundMain.set(finalPath, new Set()); inboundMain.get(finalPath).add(rec.path); }
  }
}

// ------------------------------------------------------------------------------------------------ per-page analysis
const pagesByPath = new Map(pageRecords.map((r) => [r.path, r]));
for (const rec of pageRecords) {
  const d = rec.dom;
  const raw = (await get(rec.path)).body.toString('utf8');
  const head = /<head\b[^>]*>([\s\S]*?)<\/head>/i.exec(raw)?.[1] ?? '';
  const rawCanonicals = [...head.matchAll(/<link\b[^>]*rel=["']?canonical["']?[^>]*>/gi)].map((m) => /href=["']([^"']*)["']/i.exec(m[0])?.[1] ?? '');
  const rawRobots = [...head.matchAll(/<meta\b[^>]*name=["']?(?:robots|googlebot)["']?[^>]*>/gi)].map((m) => /content=["']([^"']*)["']/i.exec(m[0])?.[1] ?? '');
  const prodUrl = PRODUCTION + rec.path;
  const directives = [...rawRobots, ...d.robotsMeta, rec.xRobotsTag ?? ''].join(',').toLowerCase();
  const noindex = /\b(noindex|none)\b/.test(directives);
  const canonical = d.canonicals[0] ?? null;
  const blocked = robotsBlocked(rec.path);
  const role = isProbe404(rec) ? '404' : d.researchPreview ? 'research preview' : noindex ? 'noindex' : 'page';
  const indexable = !isProbe404(rec) && rec.status === 200 && !noindex && canonical === prodUrl && !blocked;
  const inSitemap = sitemapUrls.has(prodUrl);
  const srcFile = sourceOf(isProbe404(rec) ? '(404 probe)' : rec.path);
  const src = srcFile ? `site/${srcFile}` : null;
  const description = d.descriptions[0] ?? '';
  const mainWords = words(d.mainText).length;
  Object.assign(rec, { srcFile, role, noindex, indexable, inSitemap, canonical, robots: [...new Set([...rawRobots, ...d.robotsMeta])].join(' | '), robotsTxtBlocked: blocked, title: d.title, titleLength: chars(d.title), description, descriptionLength: chars(description), words: mainWords, h1Count: d.h1.length, src });
  const U = isProbe404(rec) ? `${PROBE_404} (404 page)` : rec.path;

  if (isProbe404(rec)) {
    if (rec.status !== 404) finding('soft-404', 'high', U, `unknown URL answered ${rec.status}, expected 404`, 'site/public/.htaccess: ErrorDocument 404');
    if (!noindex) finding('404-indexable', 'low', U, `404 page robots "${rec.robots}"`, locate('src/pages/404.astro', /noindex/));
    if (canonical) {
      const c = linkTarget(canonical, '/');
      const cr = c?.path ? await get(c.path) : null;
      if (cr && cr.status !== 200) finding('canonical-to-404', 'low', U, `the 404 page declares <link rel="canonical" href="${canonical}">, which itself answers ${cr.status}`, `${locate('src/layouts/Base.astro', /rel="canonical"/)} (omit the canonical on the 404 page; see ${locate('src/pages/404.astro', /<Base/)})`);
    }
  } else {
    // status, robots, canonical, sitemap contract
    if (!noindex) {
      if (rec.status !== 200) finding('status', 'high', U, `intended indexable page answered ${rec.status}`, src ?? '');
      if (!canonical) finding('canonical-missing', 'high', U, 'no <link rel="canonical">', locate('src/layouts/Base.astro', /rel="canonical"/));
      else if (canonical !== prodUrl) finding('canonical-mismatch', 'high', U, `canonical ${canonical} != ${prodUrl}`, locate('src/layouts/Base.astro', /rel="canonical"/));
      if (blocked) finding('robots-txt-blocked', 'high', U, `robots.txt "Disallow: ${blocked}" blocks an intended indexable page`, locate('src/pages/robots.txt.ts', /Allow: \//));
    }
    if (d.canonicals.length > 1) finding('canonical-multiple', 'high', U, `${d.canonicals.length} canonical links: ${d.canonicals.join(', ')}`, locate('src/layouts/Base.astro', /rel="canonical"/));
    if (JSON.stringify(rawCanonicals) !== JSON.stringify(d.canonicals)) finding('canonical-rendered-differs', 'medium', U, `raw HTML canonical ${JSON.stringify(rawCanonicals)} vs rendered ${JSON.stringify(d.canonicals)}`, src ?? '');
    if (rec.xRobotsTag && /noindex/i.test(rec.xRobotsTag) && !rawRobots.some((r) => /noindex/i.test(r))) note('x-robots-tag', U, `noindex comes from the X-Robots-Tag header only: ${rec.xRobotsTag}`);
    if (indexable && !inSitemap) finding('sitemap-missing', 'high', U, 'indexable page (200, index, self-canonical, crawlable) is not in the sitemap', 'site/astro.config.mjs: sitemap filter');
    if (!indexable && inSitemap) finding('sitemap-not-indexable', 'high', U, `in the sitemap but not indexable (status ${rec.status}, robots "${rec.robots}", canonical ${canonical}${blocked ? `, robots.txt Disallow ${blocked}` : ''})`, 'site/astro.config.mjs: sitemap filter');
    if (role === 'research preview' && !noindex) finding('preview-indexable', 'high', U, `research preview without noindex (robots "${rec.robots}")`, locate('src/components/university/ResearchPreviewProfile.astro', /noindex|Base/));
    if (/apply\/thank-you/.test(rec.path) && !noindex) finding('thank-you-indexable', 'high', U, `robots "${rec.robots}"`, locate('src/pages/apply/thank-you.astro', /noindex/));
    if (noindex && blocked) finding('noindex-blocked-by-robots', 'low', U, `robots meta "${rec.robots}" cannot be read by Google: robots.txt "Disallow: ${blocked}" stops the crawl, so a linked URL could still be listed without content`, `${locate('src/pages/robots.txt.ts', /Allow: \//)} (drop the Disallow line and rely on the noindex, or keep both knowingly)`);

    // titles and descriptions (uniqueness checked below)
    if (!d.title) finding('title-missing', 'medium', U, 'no <title>', locate(srcFile, /title=/));
    else if (rec.titleLength > TITLE_MAX) finding('title-long', 'low', U, `title ${rec.titleLength} chars (> ${TITLE_MAX}): "${d.title}"`, locate(srcFile, /title=/));
    else if (rec.titleLength > TITLE_IDEAL && indexable) finding('title-over-ideal', 'low', U, `title ${rec.titleLength} chars (ideal <= ${TITLE_IDEAL}, max ${TITLE_MAX}): "${d.title}"`, locate(srcFile, /title=/));
    if (d.titleCount !== 1) finding('title-count', 'medium', U, `${d.titleCount} <title> elements`, 'site/src/layouts/Base.astro');
    if (!description) finding('description-missing', 'medium', U, 'no meta description', locate(srcFile, /description=/));
    else if ((rec.descriptionLength < DESC_MIN || rec.descriptionLength > DESC_MAX) && (indexable || role === 'research preview')) finding('description-length', 'low', U, `meta description ${rec.descriptionLength} chars (expected ${DESC_MIN}-${DESC_MAX}): "${description}"`, locate(srcFile, /description=/));
    if (d.descriptions.length > 1) finding('description-multiple', 'medium', U, `${d.descriptions.length} meta descriptions`, 'site/src/layouts/Base.astro');
  }

  // headings
  if (d.h1.length !== 1) finding('h1-count', 'medium', U, `${d.h1.length} <h1> elements${d.h1.length ? `: ${d.h1.map((h) => `"${h}"`).join(', ')}` : ''}`, src ?? '');
  {
    const skips = [];
    let prev = 0;
    for (const h of d.headings) { if (prev && h.level > prev + 1) skips.push(`h${prev} -> h${h.level} "${h.text}"`); if (!prev && h.level !== 1) skips.push(`first heading is h${h.level} "${h.text}"`); prev = h.level; }
    rec.headingSkips = skips;
    if (skips.length) finding('heading-skip', 'low', U, skips.slice(0, 4).join('; ') + (skips.length > 4 ? ` (+${skips.length - 4} more)` : ''), src ?? '');
  }
  if (d.mainCount !== 1) finding('main-count', 'medium', U, `${d.mainCount} <main> elements`, 'site/src/layouts/Base.astro');

  // thin content
  if (indexable && mainWords < THIN_WORDS) {
    if (THIN_EXEMPT.has(rec.path)) note('thin-content (exempt)', U, `${mainWords} words in <main> (${LEGAL.has(rec.path) ? 'legal page' : 'application form'}: noted, not failed)`);
    else finding('thin-content', 'medium', U, `${mainWords} words in <main> (< ${THIN_WORDS})`, src ?? '');
  }

  // lang, viewport, Open Graph
  if (!d.lang) finding('lang', 'medium', U, 'no lang attribute on <html>', locate('src/layouts/Base.astro', /<html/));
  else if (!/^en(-GB)?$/i.test(d.lang)) note('lang', U, `lang="${d.lang}"`);
  if (!d.viewport || !/width=device-width/.test(d.viewport)) finding('viewport', 'medium', U, `viewport meta "${d.viewport ?? '(none)'}"`, locate('src/layouts/Base.astro', /viewport/));
  if (!isProbe404(rec)) {
    const missing = ['og:title', 'og:description', 'og:url', 'og:image', 'og:type', 'twitter:card'].filter((k) => !d.og[k]);
    if (missing.length) finding('open-graph', 'low', U, `missing ${missing.join(', ')}`, locate('src/layouts/Base.astro', /og:/));
    if (d.og['og:url'] && canonical && d.og['og:url'] !== canonical) finding('open-graph', 'low', U, `og:url ${d.og['og:url']} != canonical ${canonical}`, locate('src/layouts/Base.astro', /og:url/));
    if (d.og['og:image']) {
      const t = linkTarget(d.og['og:image'], rec.path);
      if (!t?.path) finding('open-graph', 'low', U, `og:image is not on the production host: ${d.og['og:image']}`, locate('src/layouts/Base.astro', /og:image/));
      else { const r = await get(t.path); if (r.status !== 200 || !/^image\//.test(contentType(r))) finding('open-graph', 'medium', U, `og:image ${d.og['og:image']} answers ${r.status} ${contentType(r)}`, locate('src/layouts/Base.astro', /og:image/)); }
    }
  }

  // images: alt, dimensions, broken, format, weight, oversizing, lazy loading below the first screen
  rec.imageDetails = [];
  for (const img of d.images) {
    if (img.alt === null) finding('img-alt', 'medium', U, `<img src="${img.src}"> has no alt attribute`, src ?? '');
    if (!img.width || !img.height) finding('img-dimensions', 'low', U, `<img src="${img.src}"> without width/height`, src ?? '');
    const t = linkTarget(img.src, rec.path);
    if (!t?.path) continue;
    const r = await get(t.path);
    if (r.status !== 200) { finding('img-broken', 'medium', U, `<img src="${img.src}"> answers ${r.status}`, src ?? ''); continue; }
    const type = contentType(r);
    const bytes = r.body.length;
    rec.imageDetails.push({ src: img.src, type, bytes, loading: img.loading, top: img.top, renderedWidth: img.renderedWidth, naturalWidth: img.naturalWidth });
    if (/image\/(png|jpe?g|gif)/.test(type) && bytes > IMG_MODERN_BYTES) finding('img-format', 'low', U, `<img src="${img.src}"> ${type} ${Math.round(bytes / 1024)} KB (a WebP/AVIF version would be smaller)`, src ?? '');
    if (bytes > IMG_HEAVY_BYTES) finding('img-weight', 'medium', U, `<img src="${img.src}"> ${Math.round(bytes / 1024)} KB`, src ?? '');
    if (!/svg/.test(type) && img.naturalWidth && img.renderedWidth && img.naturalWidth > img.renderedWidth * 3) finding('img-oversized', 'low', U, `<img src="${img.src}"> ${img.naturalWidth}px wide shown at ${img.renderedWidth}px (desktop 1280)`, src ?? '');
    if (img.top > FOLD_PX && img.loading !== 'lazy' && !/svg/.test(type)) note('img-loading', U, `<img src="${img.src}"> starts ${img.top}px down without loading="lazy"`);
  }

  // forms: spam protection and validation (the handler's own tests: tests/enquiry-php.mjs)
  for (const f of d.forms) {
    if (f.method !== 'post') continue;
    if (!f.honeypot) finding('form-spam-protection', 'medium', U, `<form action="${f.action}" method="post"> has no honeypot field (name="website", checked by site/public/api/enquiry.php)`, src ?? '');
    if (!f.required) finding('form-validation', 'low', U, `<form action="${f.action}" method="post"> marks no field as required`, src ?? '');
  }

  // CSP-blocked script, console errors
  const inline = [...raw.matchAll(/<script\b([^>]*)>/gi)].filter((m) => !/\bsrc=/i.test(m[1]) && !/application\/ld\+json/i.test(m[1])).length;
  if (inline) finding('inline-script', 'high', U, `${inline} inline executable <script> element(s): blocked by the production CSP (script-src 'self')`, src ?? '');
  if (/\son[a-z]+\s*=\s*["']/i.test(raw.replace(/<script[\s\S]*?<\/script>/gi, ''))) finding('inline-handler', 'high', U, 'inline event handler attribute: blocked by the production CSP', src ?? '');
  if (d.jsUrls) finding('javascript-url', 'high', U, `${d.jsUrls} javascript: link(s): blocked by the production CSP`, src ?? '');
  if (rec.consoleErrors.length) finding('console-error', 'medium', U, rec.consoleErrors.slice(0, 3).join(' | ').slice(0, 300), src ?? '');

  // security headers (as the .htaccess sets them)
  const res = await get(rec.path);
  for (const h of alwaysHeaders) {
    const got = res.headers[h.name];
    if (got !== h.value) finding('security-header', 'medium', U, `${h.name}: got ${got === undefined ? '(absent)' : `"${got}"`}, .htaccess sets "${h.value}"`, 'site/public/.htaccess (Header always set)');
  }
  const csp = String(res.headers['content-security-policy'] ?? '');
  const scriptSrc = /(?:^|;)\s*script-src\s+([^;]*)/i.exec(csp)?.[1] ?? /(?:^|;)\s*default-src\s+([^;]*)/i.exec(csp)?.[1] ?? '';
  if (!csp) finding('csp', 'medium', U, 'no Content-Security-Policy header', 'site/public/.htaccess');
  else if (!/'self'/.test(scriptSrc) || /'unsafe-inline'|'unsafe-eval'|\*/.test(scriptSrc)) finding('csp', 'medium', U, `script-src is "${scriptSrc}" (want 'self' without unsafe-inline/eval or wildcards)`, 'site/public/.htaccess');
  const hsts = res.headers['strict-transport-security'];
  if (hsts && !(Number(/max-age=(\d+)/.exec(hsts)?.[1] ?? 0) >= 31536000)) finding('hsts', 'low', U, `HSTS "${hsts}" (max-age below one year)`, 'site/public/.htaccess');
  if (res.headers['x-content-type-options'] !== 'nosniff') finding('security-header', 'medium', U, `X-Content-Type-Options "${res.headers['x-content-type-options'] ?? '(absent)'}"`, 'site/public/.htaccess');
  if (!res.headers['referrer-policy']) finding('security-header', 'medium', U, 'no Referrer-Policy header', 'site/public/.htaccess');
  rec.headers = Object.fromEntries(['content-type', 'content-security-policy', 'strict-transport-security', 'x-content-type-options', 'referrer-policy', 'x-frame-options', 'permissions-policy', 'x-robots-tag'].map((k) => [k, res.headers[k] ?? null]));
  if (!/^text\/html\b/i.test(rec.contentType)) finding('content-type', 'medium', U, `Content-Type "${rec.contentType}"`, 'site/public/.htaccess');

  // links out
  for (const l of rec.linksOut) {
    if (l.scheme === 'javascript') continue; // reported above
    if (l.scheme === 'tel' || l.scheme === 'sms' || l.scheme === 'whatsapp') { finding('exposure-phone', 'high', U, `link ${l.raw}`, src ?? ''); continue; }
    if (l.scheme === 'mailto') { const addr = decodeURIComponent(l.raw.slice(7).split('?')[0]).toLowerCase(); if (addr !== ALLOWED_EMAIL) finding('exposure-email', 'high', U, `mailto link to ${addr}`, src ?? ''); continue; }
    if (l.invalid) { finding('link-invalid', 'medium', U, `unparsable href "${l.invalid}"`, src ?? ''); continue; }
    if (l.form) { if (l.formStatus === 404 || l.formStatus >= 500) finding('form-action-broken', 'high', U, `<form action="${l.href}"> answers ${l.formStatus} to GET`, src ?? ''); continue; }
    if (!l.key) continue;
    if (l.www || l.insecure) finding('link-host', 'low', U, `absolute link via ${l.insecure ? 'http' : ''}${l.www ? ' www' : ''}: ${l.href}`, src ?? '');
    const f = linkTargets.get(l.key);
    const first = f.chain[0];
    if (f.final?.status === 200 && f.hops === 0) {
      if (l.hash && !l.samePage && pagesByPath.get(f.finalUrl) && !pagesByPath.get(f.finalUrl).dom.ids.includes(l.hash)) finding('link-fragment', 'low', U, `link ${l.href}: no element with id "${l.hash}" on ${f.finalUrl}`, src ?? '');
      if (l.samePage && l.hash && !d.ids.includes(l.hash) && l.hash !== 'top') finding('link-fragment', 'low', U, `in-page link #${l.hash}: no element with that id`, src ?? '');
      continue;
    }
    if (f.final?.status === 200) {
      const intentional = redirectRules.some((r) => r.status >= 300 && r.status < 400 && r.re.test(l.path));
      const slash = first.location && localise(first.location).path === `${l.path}/`;
      finding(intentional ? 'link-to-legacy-redirect' : 'link-redirect', 'low', U, `link ${l.href} -> ${f.chain.map((c) => c.status).join(' -> ')} ${f.finalUrl}${slash ? ' (missing trailing slash)' : ''}`, src ?? '');
      continue;
    }
    if (l.path === '/api/enquiry.php' && first.status === 405) continue;
    finding('link-broken', 'high', U, `link ${l.href} -> ${f.chain.map((c) => `${c.status}`).join(' -> ')}${f.external ? ` (leaves the site: ${f.finalUrl})` : ''}`, src ?? '');
  }

  // JSON-LD
  rec.jsonldTypes = [];
  const nodes = [];
  for (const block of d.jsonld) {
    let obj;
    try { obj = JSON.parse(block); } catch (e) { finding('jsonld-parse', 'medium', U, `JSON-LD does not parse: ${e.message}`, src ?? ''); continue; }
    const visit = (o) => { if (Array.isArray(o)) return o.forEach(visit); if (o && typeof o === 'object') { if (o['@graph']) visit(o['@graph']); if (o['@type']) nodes.push(o); else if (!o['@graph']) finding('jsonld-no-type', 'medium', U, `JSON-LD object without @type: ${JSON.stringify(o).slice(0, 80)}`, src ?? ''); } };
    visit(obj);
    if (!obj['@context'] || !/schema\.org/.test(JSON.stringify(obj['@context']))) finding('jsonld-context', 'medium', U, `JSON-LD @context is ${JSON.stringify(obj['@context'])}`, src ?? '');
  }
  rec.jsonldTypes = nodes.map((n0) => [].concat(n0['@type']).join('/'));
  if (role === 'research preview' && d.jsonld.length) finding('jsonld-on-preview', 'high', U, `structured data on a noindex research preview: ${rec.jsonldTypes.join(', ')}`, locate('src/components/university/ResearchPreviewProfile.astro', /jsonLd|Base/));
  else if (noindex && d.jsonld.length && !isProbe404(rec)) finding('jsonld-on-noindex', 'low', U, `structured data on a noindex page: ${rec.jsonldTypes.join(', ')}`, src ?? '');
  const visible = canonText(d.bodyText);
  for (const n0 of nodes) {
    const types = [].concat(n0['@type']);
    if (types.includes('FAQPage')) {
      const qs = [].concat(n0.mainEntity ?? []);
      if (!qs.length) finding('jsonld-faq', 'medium', U, 'FAQPage without mainEntity', src ?? '');
      const missQ = [], missA = [];
      for (const q of qs) {
        if (!q.name || !visible.includes(canonText(q.name))) missQ.push(q.name);
        const a = q.acceptedAnswer?.text;
        if (!a || !visible.includes(canonText(a))) missA.push(q.name);
      }
      rec.faq = { questions: qs.length, questionsNotVisible: missQ.length, answersNotVisible: missA.length };
      if (missQ.length) finding('jsonld-faq-mismatch', 'medium', U, `${missQ.length}/${qs.length} FAQPage question(s) not in the visible text: ${missQ.slice(0, 3).map((x) => `"${x}"`).join('; ')}`, src ?? '');
      if (missA.length) finding('jsonld-faq-mismatch', 'medium', U, `${missA.length}/${qs.length} FAQPage answer(s) not in the visible text, for: ${missA.slice(0, 3).map((x) => `"${x}"`).join('; ')}`, src ?? '');
    }
    if (types.includes('BreadcrumbList')) {
      const items = [].concat(n0.itemListElement ?? []).sort((a, b) => a.position - b.position);
      const ldNames = items.map((i) => norm(i.name ?? i.item?.name));
      const visNames = d.breadcrumb.map((b) => b.name);
      if (!d.breadcrumb.length) finding('jsonld-breadcrumb-mismatch', 'medium', U, 'BreadcrumbList with no visible breadcrumb (nav[aria-label=Breadcrumb])', locate('src/components/Breadcrumbs.astro', /BreadcrumbList/));
      else if (JSON.stringify(ldNames) !== JSON.stringify(visNames)) finding('jsonld-breadcrumb-mismatch', 'medium', U, `BreadcrumbList names ${JSON.stringify(ldNames)} vs visible ${JSON.stringify(visNames)}`, locate('src/components/Breadcrumbs.astro', /BreadcrumbList/));
      items.forEach((it, i) => {
        if (it.position !== i + 1) finding('jsonld-breadcrumb-mismatch', 'medium', U, `ListItem positions not 1..n: ${items.map((x) => x.position).join(',')}`, locate('src/components/Breadcrumbs.astro', /position/));
        const itemUrl = typeof it.item === 'string' ? it.item : it.item?.['@id'];
        const vis = d.breadcrumb[i]?.href;
        if (itemUrl && vis && !sameUrl(itemUrl, new URL(vis, prodUrl).href)) finding('jsonld-breadcrumb-mismatch', 'medium', U, `ListItem ${i + 1} item ${itemUrl} vs visible link ${vis}`, locate('src/components/Breadcrumbs.astro', /item/));
        if (!itemUrl && i < items.length - 1) finding('jsonld-breadcrumb-mismatch', 'medium', U, `ListItem ${i + 1} ("${it.name}") has no item URL`, locate('src/components/Breadcrumbs.astro', /item/));
      });
    }
    if (types.includes('Organization')) {
      const probs = [];
      if (!n0.name) probs.push('no name');
      if (!sameUrl(n0.url, `${PRODUCTION}/`)) probs.push(`url ${n0.url}`);
      if (n0.email && n0.email.replace(/^mailto:/, '').toLowerCase() !== ALLOWED_EMAIL) probs.push(`email ${n0.email}`);
      if (!n0.logo) probs.push('no logo');
      else {
        const lt = linkTarget(typeof n0.logo === 'string' ? n0.logo : n0.logo.url, '/');
        const lr = lt?.path ? await get(lt.path) : null;
        if (!lr || lr.status !== 200 || !/^image\//.test(contentType(lr))) probs.push(`logo ${JSON.stringify(n0.logo)} answers ${lr?.status ?? 'off-site'}`);
      }
      if (probs.length) finding('jsonld-organization', 'medium', U, `Organization: ${probs.join('; ')}`, locate('src/pages/index.astro', /Organization/));
      rec.organization = { name: n0.name, url: n0.url, logo: n0.logo, email: n0.email ?? null, sameAs: n0.sameAs ?? null };
    }
    if (types.includes('WebSite')) {
      const probs = [];
      if (!n0.name) probs.push('no name');
      if (!sameUrl(n0.url, `${PRODUCTION}/`)) probs.push(`url ${n0.url}`);
      if (rec.path !== '/') probs.push(`WebSite on ${rec.path} (Google reads it on the home page)`);
      if (probs.length) finding('jsonld-website', 'low', U, `WebSite: ${probs.join('; ')}`, locate('src/pages/index.astro', /WebSite/));
    }
  }
  if (d.breadcrumb.length && !rec.jsonldTypes.includes('BreadcrumbList') && indexable) finding('jsonld-breadcrumb-missing', 'low', U, 'visible breadcrumb without BreadcrumbList structured data', locate('src/components/Breadcrumbs.astro', /BreadcrumbList/));
}
// home page: Organization and WebSite expected
{
  const home = pagesByPath.get('/');
  if (home && !home.jsonldTypes.includes('Organization')) finding('jsonld-organization', 'medium', '/', 'no Organization structured data on the home page', locate('src/pages/index.astro', /jsonLd/));
  if (home && !home.jsonldTypes.includes('WebSite')) finding('jsonld-website', 'low', '/', 'no WebSite structured data on the home page (site name in results)', locate('src/pages/index.astro', /jsonLd/));
}

// uniqueness of titles and descriptions, inbound links, duplicate content
const realPages = pageRecords.filter((r) => !isProbe404(r));
for (const [field, check, fixRe] of [['title', 'title-duplicate', /title=/], ['description', 'description-duplicate', /description=/]]) {
  const by = new Map();
  for (const r of realPages) { if (!r[field]) continue; if (!by.has(r[field])) by.set(r[field], []); by.get(r[field]).push(r); }
  for (const [value, rs] of by) if (rs.length > 1) {
    const idx = rs.filter((r) => r.indexable);
    finding(check, idx.length > 1 ? 'medium' : 'low', rs.map((r) => r.path).join(', '), `${rs.length} pages share the ${field} "${value}"`, locate(rs[0].srcFile, fixRe));
  }
}
for (const r of pageRecords) {
  r.inbound = isProbe404(r) ? null : (inbound.get(r.path)?.size ?? 0);
  r.inboundFromMain = isProbe404(r) ? null : (inboundMain.get(r.path)?.size ?? 0);
  r.inboundFromIndexable = isProbe404(r) ? null : [...(inbound.get(r.path) ?? [])].filter((p) => pagesByPath.get(p)?.indexable).length;
  if (r.indexable && r.inbound === 0) finding('orphan', 'medium', r.path, 'indexable page with 0 inbound internal links from other pages', 'add a link from a related page (Header/Footer or a hub page)');
  else if (r.indexable && r.inboundFromMain === 0) note('inbound', r.path, `inbound links only from the header/footer (${r.inbound} pages); none from body text`);
}
// click depth from the home page (breadth-first over internal links that answer 200 without a redirect)
{
  const depth = new Map([['/', 0]]);
  const queue = ['/'];
  while (queue.length) {
    const p = queue.shift();
    const rec = pagesByPath.get(p);
    if (!rec || isProbe404(rec)) continue;
    for (const l of rec.linksOut) {
      if (!l.key || l.form) continue;
      const f = linkTargets.get(l.key);
      if (f?.final?.status !== 200) continue;
      const to = f.finalUrl.replace(/\?.*$/, '');
      if (!depth.has(to) && pagesByPath.has(to)) { depth.set(to, depth.get(p) + 1); queue.push(to); }
    }
  }
  for (const r of pageRecords) {
    if (isProbe404(r)) { r.clickDepth = null; continue; }
    r.clickDepth = depth.has(r.path) ? depth.get(r.path) : null;
    if (r.indexable && r.clickDepth === null) finding('click-depth', 'medium', r.path, 'indexable page not reachable by links from the home page', 'link it from a hub page');
    else if (r.indexable && r.clickDepth > DEPTH_MAX) finding('click-depth', 'low', r.path, `${r.clickDepth} clicks from the home page (> ${DEPTH_MAX})`, 'link it from the home page or a hub page');
    else if (r.role === 'research preview' && r.clickDepth === null) note('click-depth', r.path, 'research preview not reachable from the home page');
  }
}

// query-parameter URLs: internal links that carry parameters, plus typical visitor/campaign parameters
const parameterUrls = [];
{
  const targets = new Set([...linkTargets.keys()].filter((k) => k.includes('?')));
  for (const p of PARAM_PROBES) targets.add(p);
  for (const key of [...targets].sort()) {
    const path = key.replace(/\?.*$/, '');
    const base = pagesByPath.get(path);
    const r = await get(key);
    const head = /<head\b[^>]*>([\s\S]*?)<\/head>/i.exec(r.body.toString('utf8'))?.[1] ?? '';
    const canon = /<link\b[^>]*rel=["']?canonical["']?[^>]*href=["']([^"']*)["']/i.exec(head)?.[1] ?? null;
    const robots = /<meta\b[^>]*name=["']?robots["']?[^>]*content=["']([^"']*)["']/i.exec(head)?.[1] ?? '';
    const entry = { url: key, status: r.status, canonical: canon, robots, linkedInternally: linkTargets.has(key) };
    parameterUrls.push(entry);
    if (r.status !== 200) { finding('param-url', 'medium', key, `answers ${r.status}`, base?.src ?? ''); continue; }
    const want = PRODUCTION + path;
    if (/noindex/i.test(robots)) continue; // a noindex parameter URL cannot compete with the clean URL
    if (!canon) finding('param-canonical', 'medium', key, `no canonical; the clean URL ${want} should be declared`, locate('src/layouts/Base.astro', /rel="canonical"/));
    else if (canon !== want) finding('param-canonical', canon.includes('?') ? 'high' : 'medium', key, `canonical ${canon}, expected ${want}`, locate('src/layouts/Base.astro', /rel="canonical"/));
  }
  const inSitemapWithParams = [...sitemapUrls].filter((u) => u.includes('?'));
  if (inSitemapWithParams.length) finding('sitemap-params', 'high', inSitemapWithParams.join(', '), 'sitemap lists URLs with query parameters', 'site/astro.config.mjs');
}

// 410 Gone: retired URLs
{
  const gone = HTACCESS.split('\n').filter((l) => /\bG\]|\[[^\]]*\bG\b|R=410|\bgone\b|Redirect\s+410/i.test(l) && !/^\s*#/.test(l));
  note('gone-410', '.htaccess', gone.length ? `${gone.length} 410 rule(s): ${gone.map((l) => l.trim()).join(' | ').slice(0, 200)}` : `no 410 rules: retired legacy URLs are 301-redirected to their closest current page (${redirectRules.filter((r) => r.status >= 300 && r.status < 400).length} redirect rules) and unknown URLs answer 404`);
}

{
  const sh = new Map(pageRecords.map((r) => [r, shingles(r.dom.mainText)]));
  for (const a of pageRecords) {
    let best = { score: 0, url: null }, bestIdx = { score: 0, url: null };
    for (const b of pageRecords) {
      if (a === b) continue;
      const s = jaccard(sh.get(a), sh.get(b));
      const bu = isProbe404(b) ? '(404 page)' : b.path;
      if (s > best.score) best = { score: s, url: bu };
      if (b.indexable && s > bestIdx.score) bestIdx = { score: s, url: bu };
    }
    a.duplicate = { top: Math.round(best.score * 1000) / 10, topUrl: best.url, topIndexable: Math.round(bestIdx.score * 1000) / 10, topIndexableUrl: bestIdx.url, shingles: sh.get(a).size };
    if (a.indexable && bestIdx.score >= DUP_MEDIUM) finding('duplicate-content', 'medium', a.path, `<main> text ${pct(bestIdx.score)}% similar (5-word shingles, Jaccard) to ${bestIdx.url}`, a.src ?? '');
    else if (a.indexable && bestIdx.score >= DUP_LOW) finding('duplicate-content', 'low', a.path, `<main> text ${pct(bestIdx.score)}% similar to ${bestIdx.url}`, a.src ?? '');
  }
  const previews = pageRecords.filter((r) => r.role === 'research preview');
  if (previews.length > 1) note('duplicate-content', 'research previews', `research previews share one template: highest match ${Math.max(...previews.map((r) => r.duplicate.top))}% (noindex, so not an indexing problem; they become indexable only once published with verified facts)`);
}

// ------------------------------------------------------------------------------------------------ non-page URLs
for (const rec of urls.values()) {
  const U = rec.url;
  if (rec.loop) finding('redirect-loop', 'high', U, rec.chain.map((c) => `${c.status} ${c.url}`).join(' -> '), 'site/public/.htaccess');
  switch (rec.expect) {
    case 'robots':
      if (rec.status !== 200 || !/^text\/plain/.test(rec.contentType)) finding('robots-txt', 'high', U, `${rec.status} ${rec.contentType}`, 'site/src/pages/robots.txt.ts');
      if (!sitemapRefs.length) finding('robots-txt', 'medium', U, 'no Sitemap: line', locate('src/pages/robots.txt.ts', /Sitemap/));
      for (const s of sitemapRefs) { const t = localise(s); if (!s.startsWith(`${PRODUCTION}/`) || sitemapFiles.get(t.path ?? '')?.status !== 200) finding('robots-txt', 'high', U, `Sitemap: ${s}`, locate('src/pages/robots.txt.ts', /Sitemap/)); }
      if (ROBOTS_RULES.some((r) => !r.allow && r.path === '/')) finding('robots-txt', 'high', U, 'Disallow: / for Googlebot', locate('src/pages/robots.txt.ts', /Allow: \//));
      break;
    case 'sitemap': {
      const s = sitemapFiles.get(rec.path);
      if (rec.status !== 200 || !/xml/.test(rec.contentType)) finding('sitemap-file', 'high', U, `${rec.status} ${rec.contentType}`, 'site/astro.config.mjs (sitemap integration)');
      else if (!s?.wellFormed) finding('sitemap-file', 'high', U, 'not a well-formed urlset/sitemapindex', 'site/astro.config.mjs');
      else if (s.isIndex) for (const l of s.locs) { const t = localise(l); if (!t.path || sitemapFiles.get(t.path)?.status !== 200) finding('sitemap-file', 'high', U, `child sitemap ${l} does not answer 200`, 'site/astro.config.mjs'); }
      else {
        const dupes = s.locs.filter((l, i) => s.locs.indexOf(l) !== i);
        if (dupes.length) finding('sitemap-file', 'medium', U, `duplicate <loc>: ${dupes.join(', ')}`, 'site/astro.config.mjs');
        if (!s.lastmod) finding('sitemap-lastmod', 'low', U, `${s.locs.length} URLs, no <lastmod> (Google ignores <changefreq> and <priority>; an accurate <lastmod> helps recrawl)`, `${locate('astro.config.mjs', /changefreq/)} (add lastmod from each page's real last-change date, or omit changefreq/priority)`);
      }
      break;
    }
    case 'guess': if (rec.status !== 200) note('sitemap', U, `${rec.status}: Google is given /sitemap-index.xml through robots.txt; submit that URL in Search Console`); break;
    case '404': if (rec.status !== 404) finding('soft-404', 'high', U, `unknown URL answered ${rec.status}`, 'site/public/.htaccess: ErrorDocument 404'); break;
    case 'enquiry-get':
      if (rec.status === 200) finding('enquiry-get', 'medium', U, 'GET answers 200 (expected 405)', 'site/public/api/enquiry.php');
      if (!/noindex/i.test(rec.xRobotsTag ?? '')) finding('enquiry-get', 'low', U, `X-Robots-Tag "${rec.xRobotsTag ?? '(absent)'}"`, 'site/public/api/enquiry.php');
      break;
    case 'private': if (rec.status !== 404 && rec.status !== 403) finding('private-reachable', 'high', U, `answered ${rec.status}`, 'site/public/.htaccess: RedirectMatch 404 ^/uma-private'); break;
    case 'blocked': if (rec.status !== 403 && rec.status !== 404) finding('blocked-reachable', 'high', U, `answered ${rec.status} (expected 403/404)`, 'site/public/.htaccess'); break;
    case 'no-listing': if (rec.status === 200) finding('directory-listing', 'medium', U, 'directory URL answered 200', 'site/public/.htaccess: Options -Indexes'); break;
    case 'duplicate-path': if (rec.status === 200) note('duplicate-path', U, `answers 200 with the home page; its canonical (${PRODUCTION}/) consolidates it`); break;
    case 'asset': if (rec.status !== 200) finding('asset', 'medium', U, `answered ${rec.status}`, 'site/public/'); break;
    case 'slash-redirect': {
      const want = `${rec.path}/`;
      const loc = rec.location ? localise(rec.location).path : null;
      if (rec.status === 200) finding('no-trailing-slash', 'medium', U, `answers 200 (duplicate of ${want}); expected 301 to ${want}`, 'site/public/.htaccess (DirectorySlash)');
      else if (!(rec.status === 301 && loc === want && rec.finalStatus === 200)) finding('no-trailing-slash', 'low', U, `${rec.chain.map((c) => `${c.status}`).join(' -> ')} ${rec.finalUrl ?? ''}, expected 301 to ${want}`, 'site/public/.htaccess (DirectorySlash)');
      break;
    }
    default: break;
  }
  if (rec.sources.includes('legacy redirect (.htaccess)')) {
    const target = pagesByPath.get(rec.finalUrl);
    if (!(rec.status >= 300 && rec.status < 400)) finding('legacy-redirect', 'medium', U, `${rec.label}: answered ${rec.status}`, 'site/public/.htaccess');
    else if (rec.finalStatus !== 200) finding('legacy-redirect', 'medium', U, `${rec.label}: ends at ${rec.finalStatus} ${rec.finalUrl}`, 'site/public/.htaccess');
    else if (target && !target.indexable) finding('legacy-redirect', 'medium', U, `${rec.label}: target ${rec.finalUrl} is not indexable`, 'site/public/.htaccess');
    else if (rec.hops > 1) finding('legacy-redirect', 'low', U, `${rec.label}: ${rec.hops} hops`, 'site/public/.htaccess');
    if (rec.status === 302 || rec.status === 307) finding('legacy-redirect', 'low', U, `${rec.label}: temporary ${rec.status} for a permanent move`, 'site/public/.htaccess');
  }
  if (rec.sources.includes('RedirectMatch 404 (.htaccess)') && rec.status !== 404) finding('private-reachable', 'high', U, `${rec.label}: answered ${rec.status}`, 'site/public/.htaccess');
  if (rec.sources.includes('rewrite rule (.htaccess)') && rec.expect === 'blocked' && rec.status !== 403) finding('blocked-reachable', 'high', U, `${rec.label}: answered ${rec.status}`, 'site/public/.htaccess');
}
for (const h of hostProbes) {
  const rec = urls.get(`${h.host} ${h.path}`);
  if (!rec) continue;
  if (h.want === null) {
    if (rec.status >= 300 && rec.status < 400 && /ukrainemedicaladmissions\.com/.test(rec.location ?? '') && !/staging\./.test(rec.location ?? '')) finding('host-rule', 'high', rec.url, `staging host redirected to production: ${rec.status} ${rec.location}`, 'site/public/.htaccess: RewriteCond %{HTTP_HOST}');
    else note('host-rule', rec.url, `${rec.status}: not redirected to production (as intended)`);
    continue;
  }
  if (!(rec.status === 301 && rec.location === h.want)) finding('host-rule', 'high', rec.url, `${h.label}: ${rec.status} ${rec.location ?? ''}, expected 301 ${h.want}`, 'site/public/.htaccess: canonical-host RewriteRule');
  else if (rec.finalStatus !== 200) finding('host-rule', 'high', rec.url, `${h.label}: chain ends ${rec.finalStatus} ${rec.finalUrl}`, 'site/public/.htaccess');
}

// ------------------------------------------------------------------------------------------------ exposure scan (every output file)
const TEXT_EXT = new Set(['.html', '.htm', '.css', '.js', '.mjs', '.json', '.xml', '.txt', '.svg', '.php', '.webmanifest', '.map', '']);
const FILE_EXT_TLD = /\.(png|jpe?g|gif|svg|webp|avif|css|js|mjs|woff2?|ico|json|xml|txt|html?|php)$/i;
const EXPOSURE = [
  { id: 'evidence-path', re: /data\/evidence/g },
  { id: 'researchReferences', re: /researchReferences/g },
  { id: 'search-snippet', re: /search[ -]snippet/gi },
  { id: 'NOT-verified-marker', re: /NOT verified/g },
  { id: 'canary', re: /CANARY/g },
  { id: 'openQuestions', re: /openQuestions/g },
  { id: 'staging-host', re: /staging\.ukrainemedicaladmissions|https?:\/\/staging\.|dist-staging|dist-preview|hstgr\.io|hostingersite\.com|\blocalhost\b|127\.0\.0\.1/gi },
  { id: 'source-map', re: /sourceMappingURL/g },
  { id: 'git', re: /\.git\b(?!hub)/g },
  { id: 'uma-private', re: /uma-private/gi },
  { id: 'test-fixture', re: /tests\/fixtures|dist-fixture|\/fixtures\//g },
  { id: 'email', re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, textOnly: true, keep: (m) => m.toLowerCase() !== ALLOWED_EMAIL && !FILE_EXT_TLD.test(m) },
  { id: 'phone', re: /(?:tel:|sms:)\+?[\d\s().-]{6,}|(?<![\w.#-])\+\d{1,3}[\s.-]?\(?\d{1,4}\)?(?:[\s.-]?\d{2,4}){2,4}(?![\w.])/g, textOnly: true, visibleTextOnly: true },
  { id: 'whatsapp', re: /whats\s?app|wa\.me\//gi },
];
const outputFiles = walk(DIST).sort();
const exposure = { filesScanned: outputFiles.length, hits: [], allowed: [] };
for (const file of outputFiles) {
  const r = relative(DIST, file);
  const ext = extname(file).toLowerCase();
  const isText = TEXT_EXT.has(ext);
  const buf = readFileSync(file);
  const text = buf.toString(isText ? 'utf8' : 'latin1');
  if (ext === '.map') exposure.hits.push({ file: r, id: 'source-map', match: r, context: 'source map file in the output' });
  if (/(^|\/)\.git(\/|$)/.test(r)) exposure.hits.push({ file: r, id: 'git', match: r, context: 'Git metadata in the output' });
  if (/uma-private/.test(r)) exposure.hits.push({ file: r, id: 'uma-private', match: r, context: 'private storage path in the output' });
  for (const p of EXPOSURE) {
    if (p.textOnly && !isText) continue;
    let hay = text;
    if (p.visibleTextOnly && (ext === '.js' || ext === '.css' || ext === '.mjs' || ext === '.svg')) hay = (text.match(/(?:tel|sms):[^"'\s)]+/g) ?? []).join(' ');
    else if (p.visibleTextOnly && ext === '.html') hay = text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ').replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ').replace(/<(?!a\b)[^>]+>/gi, ' ');
    for (const m of hay.matchAll(p.re)) {
      if (p.keep && !p.keep(m[0])) continue;
      const i = m.index ?? 0;
      exposure.hits.push({ file: r, id: p.id, match: m[0], context: norm(hay.slice(Math.max(0, i - 60), i + m[0].length + 60)) });
    }
  }
}
// A hit is an exposure when the file is served and the served body contains it (.htaccess is denied; PHP is executed).
for (const h of exposure.hits) {
  const res = await get(`/${h.file.split('/').map(encodeURIComponent).join('/')}`);
  h.servedStatus = res.status;
  h.served = res.status === 200 && res.body.toString(TEXT_EXT.has(extname(h.file).toLowerCase()) ? 'utf8' : 'latin1').includes(h.match);
}
exposure.allowed = exposure.hits.filter((h) => !h.served);
exposure.hits = exposure.hits.filter((h) => h.served);
for (const h of exposure.allowed) note('exposure (not served)', `/${h.file}`, `${h.id} "${h.match}" in an output file that is not served as written (HTTP ${h.servedStatus}${h.file.endsWith('.php') ? ', executed by PHP' : ''}): ${h.context.slice(0, 140)}`);
{
  const grouped = new Map();
  for (const h of exposure.hits) { const k = `${h.id}|${h.match}`; if (!grouped.has(k)) grouped.set(k, []); grouped.get(k).push(h); }
  for (const [, hs] of grouped) finding(`exposure-${hs[0].id}`, 'high', hs.map((h) => `/${h.file}`).slice(0, 6).join(', ') + (hs.length > 6 ? ` (+${hs.length - 6})` : ''), `"${hs[0].match}" served in ${hs.length} file(s): …${hs[0].context.slice(0, 160)}…`, 'find the source with: grep -rn in site/src site/public');
}
// The enquiry handler's GET answer and the 404 body are responses, not files: scan them too.
for (const p of ['/api/enquiry.php', PROBE_404]) {
  const body = (await get(p)).body.toString('utf8');
  for (const e of EXPOSURE) for (const m of body.matchAll(e.re)) if (!e.keep || e.keep(m[0])) { if (e.visibleTextOnly) continue; finding(`exposure-${e.id}`, 'high', p, `response body contains "${m[0]}"`, 'site/public/api/enquiry.php'); }
}

// ------------------------------------------------------------------------------------------------ mobile (Playwright)
function mobileProbe({ min, advisory }) {
  const W = document.documentElement.clientWidth;
  const n = (s) => (s ?? '').replace(/\s+/g, ' ').trim();
  const desc = (el) => {
    const cls = typeof el.className === 'string' ? el.className.trim().split(/\s+/).filter((c) => c && !c.startsWith('astro-')).slice(0, 2).join('.') : '';
    const t = n(el.getAttribute('aria-label') || el.textContent || el.getAttribute('name') || el.getAttribute('value') || el.getAttribute('placeholder')).slice(0, 40);
    return `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ''}${cls ? `.${cls}` : ''}${t ? ` "${t}"` : ''}`;
  };
  const hiddenStyle = (el) => {
    for (let p = el; p && p !== document.documentElement; p = p.parentElement) {
      const cs = getComputedStyle(p);
      if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return true;
      if (cs.clip === 'rect(0px, 0px, 0px, 0px)' || cs.clipPath === 'inset(50%)') return true;
      if (p.hasAttribute('hidden') || p.hasAttribute('inert')) return true;
    }
    return false;
  };
  // horizontal overflow
  const scrollW = document.documentElement.scrollWidth;
  const offenders = [];
  for (const el of document.body.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.right <= W + 1) continue;
    if (getComputedStyle(el).position === 'fixed') continue;
    let contained = false;
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const ox = getComputedStyle(p).overflowX; if (ox !== 'visible' && p.getBoundingClientRect().right <= W + 1) { contained = true; break; } }
    if (contained || hiddenStyle(el)) continue;
    offenders.push({ el: desc(el), right: Math.round(r.right) });
    if (offenders.length >= 6) break;
  }
  // tap targets
  const sel = 'a[href], button, input:not([type="hidden"]), select, textarea, summary, [role="button"], [role="link"], [role="tab"], [role="checkbox"], [role="radio"], [tabindex]:not([tabindex="-1"])';
  const targets = [];
  for (const el of document.querySelectorAll(sel)) {
    let box = el, r = el.getBoundingClientRect();
    if ((el.type === 'checkbox' || el.type === 'radio') && el.labels?.length) {
      for (const l of el.labels) { const lr = l.getBoundingClientRect(); if (!hiddenStyle(l) && lr.width * lr.height > (hiddenStyle(el) ? 0 : r.width * r.height)) { box = l; r = lr; } }
    }
    if (r.width < 1 || r.height < 1 || hiddenStyle(box)) continue;
    if (r.right <= 0 || r.left >= W || r.bottom + window.scrollY <= 0) continue;
    let inline = false;
    if (el.tagName === 'A' && getComputedStyle(el).display === 'inline') {
      let b = el.parentElement;
      while (b && getComputedStyle(b).display.startsWith('inline')) b = b.parentElement;
      inline = !!b && n(b.textContent).length > n(el.textContent).length + 3;
    }
    targets.push({ el, desc: desc(el), x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height, inline });
  }
  const small = targets.filter((t) => (t.w < min || t.h < min) && !t.inline);
  const fails = [];
  for (const t of small) {
    const cx = t.x + t.w / 2, cy = t.y + t.h / 2;
    let clash = null;
    for (const o of targets) {
      if (o === t || o.el.contains(t.el) || t.el.contains(o.el)) continue;
      const isSmall = (o.w < min || o.h < min) && !o.inline;
      if (isSmall) { if (Math.hypot(cx - (o.x + o.w / 2), cy - (o.y + o.h / 2)) < min) { clash = o.desc; break; } }
      else { const dx = Math.max(o.x - cx, 0, cx - (o.x + o.w)), dy = Math.max(o.y - cy, 0, cy - (o.y + o.h)); if (Math.hypot(dx, dy) < min / 2) { clash = o.desc; break; } }
    }
    if (clash) fails.push({ el: t.desc, size: `${Math.round(t.w)}x${Math.round(t.h)}`, near: clash });
  }
  const adv = targets.filter((t) => !t.inline && (t.w < advisory || t.h < advisory));
  return {
    viewport: W, scrollWidth: scrollW, overflow: scrollW > W + 1, offenders,
    targets: targets.length, inlineExempt: targets.filter((t) => t.inline).length, undersized: small.length,
    spacingExempt: small.length - fails.length, fails, advisoryCount: adv.length,
    advisorySample: adv.slice(0, 8).map((t) => `${t.desc} ${Math.round(t.w)}x${Math.round(t.h)}`),
  };
}
if (RUN_MOBILE) {
  for (const width of MOBILE_WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: 800 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    for (const rec of pageRecords) {
      const page = await ctx.newPage();
      await page.goto(BASE + rec.path, { waitUntil: 'load' });
      const m = await page.evaluate(mobileProbe, { min: TAP_MIN, advisory: TAP_ADVISORY });
      rec.mobile ??= {};
      rec.mobile[width] = m;
      await page.close();
    }
    await ctx.close();
  }
  for (const rec of pageRecords) {
    const U = isProbe404(rec) ? `${PROBE_404} (404 page)` : rec.path;
    for (const width of MOBILE_WIDTHS) {
      const m = rec.mobile[width];
      if (m.overflow) finding('mobile-overflow', 'medium', U, `${width}px: scrollWidth ${m.scrollWidth} > ${m.viewport}; ${m.offenders.map((o) => `${o.el} right=${o.right}`).join('; ')}`, rec.src ?? '');
      else if (m.offenders.length) note('mobile-clipped', U, `${width}px: elements extend past the viewport without page scroll: ${m.offenders.map((o) => o.el).join('; ')}`);
      if (m.fails.length) finding('tap-target', 'medium', U, `${width}px: ${m.fails.length} target(s) under ${TAP_MIN}px without spacing: ${m.fails.slice(0, 4).map((f) => `${f.el} ${f.size} (near ${f.near})`).join('; ')}`, rec.src ?? '');
    }
    const a = Math.max(...MOBILE_WIDTHS.map((w) => rec.mobile[w].advisoryCount));
    if (a) finding('tap-target-advisory', 'low', U, `${a} target(s) under ${TAP_ADVISORY}px in one dimension (advisory; WCAG 2.2 AAA 2.5.5): ${rec.mobile[MOBILE_WIDTHS[0]].advisorySample.slice(0, 3).join('; ')}`, `shared components: ${locate('src/components/Footer.astro', /^\s*ul \{/)} (footer links), ${locate('src/styles/global.css', /^\.crumbs a \{/)} (breadcrumb), ${locate('src/components/Header.astro', /^\s*\.burger \{/)} (menu button)`);
  }
}
await browser.close();

// ------------------------------------------------------------------------------------------------ Lighthouse
const lighthouseRuns = [];
if (RUN_LH) {
  const { default: lighthouse } = await import('lighthouse');
  const { launch } = await import('chrome-launcher');
  const chromePath = process.env.CHROME_PATH
    ?? (existsSync('/opt/pw-browsers') ? readdirSync('/opt/pw-browsers').filter((d) => d.startsWith('chromium-')).map((d) => `/opt/pw-browsers/${d}/chrome-linux/chrome`).find(existsSync) : undefined);
  const chrome = await launch({ chromePath, chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] });
  const lhPages = [...pageRecords.filter((r) => r.indexable), ...pageRecords.filter((r) => r.role === 'research preview').slice(0, 1)];
  const run = async (path) => (await lighthouse(BASE + path, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: LH_CATEGORIES })).lhr;
  const scoresOf = (lhr) => Object.fromEntries(LH_CATEGORIES.map((k) => [k, lhr.categories[k]?.score ?? null]));
  for (const rec of lhPages) {
    let lhr = await run(rec.path);
    let scores = scoresOf(lhr);
    let remeasured = false;
    // Run-to-run noise (tests/perf.mjs): a page under 0.9 performance is measured once more and the better run kept.
    if ((scores.performance ?? 0) < 0.9) { const again = await run(rec.path); const s2 = scoresOf(again); if ((s2.performance ?? 0) > (scores.performance ?? 0)) { lhr = again; scores = s2; } remeasured = true; }
    const failing = {};
    for (const cat of ['accessibility', 'best-practices', 'seo']) {
      failing[cat] = (lhr.categories[cat]?.auditRefs ?? []).filter((a) => a.weight > 0).map((a) => lhr.audits[a.id]).filter((a) => a && a.score !== null && a.score < 1 && !['notApplicable', 'manual', 'informative'].includes(a.scoreDisplayMode)).map((a) => `${a.id}: ${a.title}`);
    }
    const metrics = { lcp: lhr.audits['largest-contentful-paint']?.numericValue ?? null, cls: lhr.audits['cumulative-layout-shift']?.numericValue ?? null, tbt: lhr.audits['total-blocking-time']?.numericValue ?? null, fcp: lhr.audits['first-contentful-paint']?.numericValue ?? null, si: lhr.audits['speed-index']?.numericValue ?? null, bytes: lhr.audits['total-byte-weight']?.numericValue ?? null };
    const entry = { path: rec.path, role: rec.role, indexable: rec.indexable, scores, metrics, failing, remeasured, lighthouseVersion: lhr.lighthouseVersion, formFactor: lhr.configSettings?.formFactor, throttlingMethod: lhr.configSettings?.throttlingMethod };
    lighthouseRuns.push(entry);
    rec.lighthouse = entry;
    const s = (k) => Math.round((scores[k] ?? 0) * 100);
    console.log(`lighthouse ${rec.path.padEnd(70)} perf ${s('performance')} a11y ${s('accessibility')} bp ${s('best-practices')} seo ${s('seo')}  LCP ${Math.round(metrics.lcp)}ms CLS ${metrics.cls?.toFixed(3)} TBT ${Math.round(metrics.tbt)}ms${rec.indexable ? '' : ' (noindex)'}`);
    const U = rec.path;
    if (rec.indexable) {
      if ((scores.performance ?? 0) < 0.9) finding('lh-performance', 'medium', U, `mobile performance ${s('performance')} (LCP ${Math.round(metrics.lcp)} ms, TBT ${Math.round(metrics.tbt)} ms, CLS ${metrics.cls?.toFixed(3)})`, rec.src ?? '');
      if ((scores.seo ?? 0) < 0.9) finding('lh-seo', 'medium', U, `Lighthouse SEO ${s('seo')}: ${failing.seo.join('; ')}`, rec.src ?? '');
      else if (failing.seo.length) finding('lh-seo', 'low', U, `Lighthouse SEO ${s('seo')}: ${failing.seo.join('; ')}`, rec.src ?? '');
      if (metrics.lcp > 2500) finding('lh-lcp', 'medium', U, `LCP ${Math.round(metrics.lcp)} ms (> 2500, simulated mobile)`, rec.src ?? '');
      if (metrics.cls > 0.1) finding('lh-cls', 'medium', U, `CLS ${metrics.cls.toFixed(3)} (> 0.1)`, rec.src ?? '');
      if (metrics.tbt > 200) finding('lh-tbt', 'low', U, `TBT ${Math.round(metrics.tbt)} ms (> 200)`, rec.src ?? '');
    }
    if ((scores.accessibility ?? 0) < 0.9) finding('lh-accessibility', 'medium', U, `Lighthouse accessibility ${s('accessibility')}: ${failing.accessibility.join('; ')}`, rec.src ?? '');
    else if (failing.accessibility.length) finding('lh-accessibility', 'low', U, `Lighthouse accessibility ${s('accessibility')}: ${failing.accessibility.join('; ')}`, rec.src ?? '');
    if ((scores['best-practices'] ?? 0) < 0.9) finding('lh-best-practices', 'low', U, `Lighthouse best practices ${s('best-practices')}: ${failing['best-practices'].join('; ')}`, rec.src ?? '');
  }
  await chrome.kill();
}

// ------------------------------------------------------------------------------------------------ private storage untouched
{
  const left = readdirSync(PRIVATE).filter((f) => f !== 'config.php');
  if (left.length) finding('private-write', 'high', '/api/enquiry.php', `the audit's GET left files in the temporary private directory: ${left.join(', ')}`, 'site/public/api/enquiry.php');
}

// ------------------------------------------------------------------------------------------------ issues (grouped), report
const groups = new Map();
for (const f of findings) {
  const k = `${f.severity}|${f.check}`;
  if (!groups.has(k)) groups.set(k, { severity: f.severity, check: f.check, urls: [], evidence: [], fixes: [] });
  const g = groups.get(k);
  if (!g.urls.includes(f.url)) g.urls.push(f.url);
  g.evidence.push(`${f.url}: ${f.evidence}`);
  if (f.fix && !g.fixes.includes(f.fix)) g.fixes.push(f.fix);
}
const issues = [...groups.values()].sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity] || a.check.localeCompare(b.check)).map((g, i) => ({ id: `SEO-${String(i + 1).padStart(2, '0')}`, ...g, status: 'open' }));
const count = (s) => issues.filter((i) => i.severity === s).length;
const range = (k, f = (x) => x) => { const v = lighthouseRuns.filter((r) => r.indexable).map((r) => f(r.scores[k] ?? r.metrics[k])).filter((x) => x != null); return v.length ? [Math.min(...v), Math.max(...v)] : null; };

const pageRow = (r) => ({
  url: isProbe404(r) ? `${PROBE_404} (404 page)` : r.path, role: r.role, status: r.status, finalUrl: r.finalUrl, contentType: r.contentType, canonical: r.canonical, robots: r.robots, xRobotsTag: r.xRobotsTag,
  robotsTxtBlocked: r.robotsTxtBlocked, indexable: r.indexable, inSitemap: r.inSitemap, title: r.title, titleLength: r.titleLength, description: r.description, descriptionLength: r.descriptionLength,
  h1Count: r.h1Count, headingSkips: r.headingSkips, words: r.words, linksOut: r.linksOut.filter((l) => l.key && !l.form).length, inbound: r.inbound, inboundFromMain: r.inboundFromMain, inboundFromIndexable: r.inboundFromIndexable,
  duplicate: r.duplicate, jsonldTypes: r.jsonldTypes, faq: r.faq ?? null, organization: r.organization ?? null, lang: r.dom.lang, viewport: r.dom.viewport, og: r.dom.og, images: r.dom.images.length,
  headers: r.headers, consoleErrors: r.consoleErrors, mobile: r.mobile ?? null, lighthouse: r.lighthouse ?? null, source: r.src,
  clickDepth: r.clickDepth ?? null, imageDetails: r.imageDetails ?? [], forms: r.dom.forms,
});
const report = {
  generatedAt: new Date().toISOString(),
  commit: COMMIT, branch: BRANCH, workingTreeChanges: DIRTY,
  dist: rel(DIST), distBuiltAt: new Date(builtAt).toISOString(),
  method: {
    server: `php -S ${HOSTPORT} -t dist tests/fixtures/live-router.php (applies dist/.htaccess; redirects not followed automatically, each hop requested)`,
    browser: 'Playwright Chromium (desktop 1280x900 for DOM extraction; 360 and 390 px mobile contexts)',
    lighthouse: RUN_LH ? 'Lighthouse (default config: mobile emulation, simulated throttling) via chrome-launcher on Playwright Chromium' : 'skipped (--no-lighthouse)',
    thresholds: { TITLE_IDEAL, TITLE_MAX, DESC_MIN, DESC_MAX, THIN_WORDS, DUP_MEDIUM, DUP_LOW, TAP_MIN, TAP_ADVISORY, IMG_MODERN_BYTES, IMG_HEAVY_BYTES, FOLD_PX, DEPTH_MAX },
    localLimits: [
      'No live host: TLS, the real Apache/LiteSpeed MIME table, compression and caching headers are not tested.',
      'The http->https and www->apex rules are shown with a Host header against the stand-in, which always reports HTTPS off; https://www cannot be shown.',
      'No Search Console, no Google index, crawl-stats or field (CrUX) data: indexing and real-user performance are not proven.',
      'External links are listed but not requested (the environment refuses outbound hosts).',
    ],
  },
  totals: {
    urlsRequested: urls.size, pagesAnalysed: pageRecords.length, indexable: pageRecords.filter((r) => r.indexable).length,
    inSitemap: sitemapUrls.size, researchPreviews: pageRecords.filter((r) => r.role === 'research preview').length,
    internalLinkTargets: linkTargets.size, externalLinks: externalLinks.size, outputFilesScanned: exposure.filesScanned,
    lighthouseRuns: lighthouseRuns.length, issues: { high: count('high'), medium: count('medium'), low: count('low') },
  },
  lighthouseRanges: RUN_LH ? {
    indexablePages: lighthouseRuns.filter((r) => r.indexable).length,
    performance: range('performance', pct), accessibility: range('accessibility', pct), bestPractices: range('best-practices', pct), seo: range('seo', pct),
    lcpMs: range('lcp', Math.round), cls: range('cls', (x) => Math.round(x * 1000) / 1000), tbtMs: range('tbt', Math.round),
    researchPreview: lighthouseRuns.find((r) => r.role === 'research preview') ?? null,
  } : null,
  issues,
  notes,
  pages: pageRecords.map(pageRow),
  urls: [...urls.values()].map((r) => ({ url: r.url, sources: r.sources, label: r.label, expect: r.expect, status: r.status, contentType: r.contentType, location: r.location, xRobotsTag: r.xRobotsTag, finalUrl: r.finalUrl, finalStatus: r.finalStatus, hops: r.hops, chain: r.chain })),
  parameterUrls,
  clickDepth: Object.fromEntries(pageRecords.filter((r) => !isProbe404(r)).map((r) => [r.path, r.clickDepth ?? null])),
  linkTargets: [...linkTargets].map(([k, f]) => ({ target: k, chain: f.chain, finalUrl: f.finalUrl, finalStatus: f.final?.status ?? null })),
  externalLinks: [...externalLinks].map(([href, n]) => ({ href, links: n })),
  sitemaps: Object.fromEntries([...sitemapFiles].map(([p, s]) => [p, s])),
  robotsTxt: { body: robotsTxt, rules: ROBOTS_RULES, sitemaps: sitemapRefs },
  exposure,
};
mkdirSync(dirname(OUT_FILE), { recursive: true });
writeFileSync(OUT_FILE, `${JSON.stringify(report, null, 2)}\n`);

console.log(`\nseo-audit: commit ${COMMIT?.slice(0, 7) ?? '?'}${DIRTY.length ? ` (+${DIRTY.length} uncommitted)` : ''}; ${urls.size} URLs requested, ${pageRecords.length} pages analysed (${report.totals.indexable} indexable, ${sitemapUrls.size} in sitemap, ${report.totals.researchPreviews} research previews), ${linkTargets.size} internal link targets, ${exposure.filesScanned} output files scanned`);
console.log(`issues: ${count('high')} high, ${count('medium')} medium, ${count('low')} low; ${notes.length} notes`);
for (const i of issues.filter((x) => x.severity !== 'low')) console.log(`  ${i.severity.toUpperCase().padEnd(6)} ${i.id} ${i.check} [${i.urls.length} URL${i.urls.length > 1 ? 's' : ''}] ${i.evidence[0].slice(0, 220)}`);
for (const i of issues.filter((x) => x.severity === 'low')) console.log(`  low    ${i.id} ${i.check} [${i.urls.length}] ${i.evidence[0].slice(0, 160)}`);
if (report.lighthouseRanges) {
  const L = report.lighthouseRanges; const r2 = (x) => (x ? `${x[0]}-${x[1]}` : 'n/a');
  console.log(`lighthouse (mobile, ${L.indexablePages} indexable pages): performance ${r2(L.performance)}, accessibility ${r2(L.accessibility)}, best practices ${r2(L.bestPractices)}, SEO ${r2(L.seo)}; LCP ${r2(L.lcpMs)} ms, CLS ${r2(L.cls)}, TBT ${r2(L.tbtMs)} ms`);
}
console.log(`wrote ${rel(OUT_FILE)}`);
process.exit(count('high') ? 1 : 0);
