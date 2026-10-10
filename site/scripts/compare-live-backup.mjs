// Compare a backup of the LIVE site's files with the new build before the first production write.
//
// Usage (from site/):
//   unzip -q /path/to/backup.zip -d /path/to/extracted      # the script never reads zips
//   node scripts/compare-live-backup.mjs /path/to/extracted [--root <dir inside it>] [--dist dist]
//        [--htaccess public/.htaccess] [--out tests/output/live-backup-report.md]
//
// Reads only: directory listings, .html/.php/.htaccess text and sitemap*.xml. Never reads .sql, .env,
// archives, configuration or anything that may hold credentials; reports their presence only.
// Writes nothing except the report. Proposed redirects are PROPOSED — they are not applied anywhere.
// Exit 0 = report written; exit 2 = backup directory missing or no document-root candidate found.
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname, relative, basename, sep } from 'node:path';

const args = process.argv.slice(2);
const positional = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')));
const opt = (name, def) => { const i = args.indexOf(name); return i >= 0 && args[i + 1] ? args[i + 1] : def; };
const BACKUP = positional[0] ? resolve(positional[0]) : null;
const DIST = resolve(opt('--dist', 'dist'));
const HTACCESS = resolve(opt('--htaccess', 'public/.htaccess'));
const OUT = resolve(opt('--out', 'tests/output/live-backup-report.md'));

const fail = (msg) => { console.error(`compare-live-backup: ${msg}`); process.exit(2); };
if (!BACKUP || !existsSync(BACKUP) || !statSync(BACKUP).isDirectory()) fail('give the directory of the EXTRACTED backup as the first argument');
if (!existsSync(DIST)) fail(`${DIST} does not exist — run "npm run build" first`);
if (!existsSync(HTACCESS)) fail(`${HTACCESS} not found`);

const rel = (base, p) => relative(base, p).split(sep).join('/');
const walk = (d, out = []) => { for (const f of readdirSync(d).sort()) { const p = join(d, f); statSync(p).isDirectory() ? walk(p, out) : out.push(p); } return out; };
const dirsOf = (d, out = []) => { out.push(d); for (const f of readdirSync(d).sort()) { const p = join(d, f); if (statSync(p).isDirectory()) dirsOf(p, out); } return out; };
const depth = (p) => rel(BACKUP, p).split('/').filter(Boolean).length;
const SENSITIVE = /(^|\/)(\.env[^/]*|wp-config\.php|[^/]*\.(sql|sql\.gz|env|zip|tar|tgz|gz|7z|rar|bak|key|pem)|\.git|\.ssh|\.htpasswd)$/i;

// a) document-root candidates
const allDirs = dirsOf(BACKUP);
const hasIndex = (d) => ['index.html', 'index.php', '.htaccess'].some((f) => existsSync(join(d, f)));
const rawCandidates = allDirs.filter((d) => basename(d) === 'public_html' || hasIndex(d));
// keep only the top-most candidates: a page directory inside a root is not itself a root
const candidates = rawCandidates.filter((d) => !rawCandidates.some((o) => o !== d && d.startsWith(o + sep)));
let ROOT;
if (opt('--root', null)) { ROOT = resolve(BACKUP, opt('--root')); if (!existsSync(ROOT)) fail(`--root ${ROOT} not found`); }
else if (!candidates.length) fail('no document-root candidate (no public_html, index.html, index.php or .htaccess anywhere in the backup)');
else {
  const byDepth = (a, b) => depth(a) - depth(b) || a.localeCompare(b);
  const named = candidates.filter((d) => basename(d) === 'public_html').sort(byDepth);
  ROOT = (named[0]) || candidates.sort(byDepth)[0];
}
const rootLabel = rel(BACKUP, ROOT) || '.';

// b) technology markers (presence only)
const backupFiles = walk(ROOT);
const relFiles = backupFiles.map((p) => rel(ROOT, p));
const has = (p) => existsSync(join(ROOT, p));
const markers = [];
if (has('wp-config.php') || has('wp-content')) markers.push('WordPress (`wp-config.php` / `wp-content` present)' + (has('wp-config.php') ? ' — database credentials present in `wp-config.php`, not read' : ''));
if (has('kirby') && has('site') && has('content')) markers.push('Kirby (`kirby/`, `site/`, `content/` present)' + (has('site/config/.license') ? ' — `site/config/.license` present (licence file exists; contents not read)' : ' — no `site/config/.license` file'));
if (has('composer.json')) markers.push('Composer project (`composer.json` present)');
if (has('index.php')) markers.push('PHP entry point (`index.php` present)');
const phpCount = relFiles.filter((f) => /\.php$/i.test(f)).length;
const htmlCount = relFiles.filter((f) => /\.html?$/i.test(f)).length;
if (!phpCount && htmlCount) markers.push(`Static HTML only (${htmlCount} .html files, no .php)`);
else if (phpCount) markers.push(`${phpCount} .php file(s), ${htmlCount} .html file(s)`);
const legacyHtaccess = has('.htaccess') ? readFileSync(join(ROOT, '.htaccess'), 'utf8') : null;
const legacyRules = legacyHtaccess ? legacyHtaccess.split(/\r?\n/).filter((l) => /^\s*(Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|Rewrite\w*|ErrorDocument)\b/i.test(l)) : [];
const legacyPrefixRedirects = legacyRules.filter((l) => /^\s*(Redirect|RedirectPermanent|RedirectTemp)\b/i.test(l));
const sitemaps = relFiles.filter((f) => /(^|\/)sitemap[^/]*\.xml$/i.test(f));
const sensitive = relFiles.filter((f) => SENSITIVE.test(f));

// c) legacy URL inventory
const urls = new Map(); // path -> {sources:Set, title}
const addUrl = (u, source, title) => { const e = urls.get(u) || { sources: new Set(), title: null }; e.sources.add(source); if (title && !e.title) e.title = title; urls.set(u, e); };
const titleOf = (p) => { const m = readFileSync(p, 'utf8').match(/<title[^>]*>([\s\S]*?)<\/title>/i); return m ? m[1].replace(/\s+/g, ' ').trim().slice(0, 120) || '(no title)' : '(no title)'; };
for (const f of relFiles) {
  const isHtml = /\.html?$/i.test(f), isPhp = /\.php$/i.test(f);
  if (!isHtml && !isPhp) continue;
  const title = isHtml ? titleOf(join(ROOT, f)) : null;
  const dir = dirname(f) === '.' ? '' : dirname(f) + '/';
  const name = basename(f);
  if (/^index\.(html?|php)$/i.test(name)) addUrl('/' + dir, 'file', title);
  else if (isHtml) { addUrl('/' + f, 'file', title); addUrl('/' + f.replace(/\.html?$/i, ''), 'file', title); }
  else addUrl('/' + f, 'file', title);
}
const sitemapLocs = [];
for (const s of sitemaps) {
  for (const m of readFileSync(join(ROOT, s), 'utf8').matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)) {
    let u = m[1].trim();
    try { u = new URL(u).pathname; } catch { if (!u.startsWith('/')) u = '/' + u; }
    sitemapLocs.push(u); addUrl(u, `sitemap:${s}`, null);
  }
}

// d) coverage against the new site
const newHtaccess = readFileSync(HTACCESS, 'utf8');
const rules = [];
for (const line of newHtaccess.split(/\r?\n/)) {
  const m = line.match(/^\s*RedirectMatch\s+(?:(\d{3}|permanent|temp|seeother|gone)\s+)?(\S+)\s+(\S+)/i);
  if (m) { let re = null; try { re = new RegExp(m[2]); } catch { /* reported as unparsable */ } rules.push({ line: line.trim(), pattern: m[2], target: m[3], re }); }
}
const distPageExists = (u) => {
  if (u.endsWith('/')) return existsSync(join(DIST, u, 'index.html'));
  if (/\.[a-z0-9]+$/i.test(u)) return existsSync(join(DIST, u));
  return existsSync(join(DIST, u, 'index.html'));
};
const KEYWORDS = [
  [/dentist/i, '/courses/dentistry/'], [/fee|cost|tuition|price/i, '/tuition-fees/'], [/medicin|mbbs/i, existsSync(join(DIST, 'courses/medicine/index.html')) ? '/courses/medicine/' : '/courses/'],
  [/universit|college/i, '/universities/'], [/apply|application|enquir/i, '/apply/'], [/admission|document|translat|legalis|visa|invitation/i, '/admissions/'],
  [/service/i, '/services/'], [/contact/i, '/contact/'], [/faq|question/i, '/faq/'], [/privacy/i, '/privacy/'], [/term/i, '/terms/'],
  [/complaint/i, '/complaints-policy/'], [/disclos|referral|disclaimer/i, '/disclosure/'], [/about|team|founder|career/i, '/about/'],
];
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const proposeFor = (u) => {
  const slug = u.replace(/\.(html?|php)$/i, '');
  for (const [re, target] of KEYWORDS) if (re.test(slug) && distPageExists(target)) return { target, review: false };
  return { target: '/', review: true };
};
const coverage = [];
for (const [u, meta] of [...urls.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  let status, target = '', note = '';
  const rule = rules.find((r) => r.re && r.re.test(u));
  if (rule) { status = 'REDIRECTED'; target = rule.target; note = distPageExists(rule.target) ? 'target exists' : 'TARGET MISSING in dist'; }
  else if (distPageExists(u)) { status = 'KEPT'; target = u.endsWith('/') || /\.[a-z0-9]+$/i.test(u) ? u : u + '/'; note = target !== u ? 'via DirectorySlash' : 'same path'; }
  else { const p = proposeFor(u); status = 'UNCOVERED'; target = p.target; note = p.review ? 'REVIEW — no keyword match, fallback to /' : 'proposed by keyword'; }
  coverage.push({ url: u, status, target, note, title: meta.title || '', sources: [...meta.sources].join(', ') });
}
const proposed = coverage.filter((c) => c.status === 'UNCOVERED').map((c) => {
  const pattern = /\.(html?|php)$/i.test(c.url) ? `^${escapeRe(c.url)}$` : `^${escapeRe(c.url.replace(/\/$/, ''))}/?$`;
  return `RedirectMatch 301 ${pattern} ${c.target}${c.note.startsWith('REVIEW') ? '   # REVIEW' : ''}`;
});
// a plain-text legacy URL may appear twice (/x.html and /x); collapse duplicates in the proposed block
const proposedUnique = [...new Set(proposed)];

// e) collisions / f) untouched
const distFiles = new Set(walk(DIST).map((p) => rel(DIST, p)));
const sizeOf = (p) => statSync(p).size;
const PRIORITY = (f) => (f === '.htaccess' ? 0 : f === 'index.html' ? 1 : f === 'robots.txt' ? 2 : /^sitemap/i.test(f) ? 3 : 9);
const collisions = relFiles.filter((f) => distFiles.has(f)).sort((a, b) => PRIORITY(a) - PRIORITY(b) || a.localeCompare(b))
  .map((f) => ({ path: f, live: sizeOf(join(ROOT, f)), next: sizeOf(join(DIST, f)) }));
const untouched = relFiles.filter((f) => !distFiles.has(f));
const untouchedTop = new Map();
for (const f of untouched) { const head = f.includes('/') ? f.split('/')[0] + '/' : f; untouchedTop.set(head, (untouchedTop.get(head) || 0) + 1); }

// g) legacy contact channels (counts only)
let waFiles = 0, telFiles = 0;
for (const f of relFiles) {
  if (!/\.(html?|php)$/i.test(f)) continue;
  const t = readFileSync(join(ROOT, f), 'utf8');
  if (/whatsapp|wa\.me/i.test(t)) waFiles++;
  if (/\btel:/i.test(t)) telFiles++;
}

// report
const L = [];
L.push(`# Live backup vs new build — comparison report`, ``, `Backup directory: \`${BACKUP}\`  `, `Chosen document root inside it: \`${rootLabel}\` (${opt('--root', null) ? 'given with --root' : 'auto-selected'})  `, `New build: \`${DIST}\` · redirect rules: \`${HTACCESS}\``, ``, `Nothing in this report has been applied. Proposed redirects are proposals for review.`, ``);
L.push(`## a) Document-root candidates`, ``, `| Directory | Reason |`, `|---|---|`);
for (const d of candidates.sort((a, b) => depth(a) - depth(b) || a.localeCompare(b))) L.push(`| \`${rel(BACKUP, d) || '.'}\` | ${[basename(d) === 'public_html' ? 'named public_html' : null, hasIndex(d) ? 'contains index.html / index.php / .htaccess' : null].filter(Boolean).join('; ')}${d === ROOT ? ' — **chosen**' : ''} |`);
L.push(``, `## b) Technology markers (presence only; no file contents read except .htaccess rules and sitemap URLs)`, ``);
L.push(markers.length ? markers.map((m) => `- ${m}`).join('\n') : '- No recognised CMS or PHP markers');
L.push(`- \`.htaccess\`: ${legacyHtaccess ? `present — ${legacyRules.length} redirect/rewrite/error directive(s)` : 'absent'}`);
if (legacyRules.length) L.push('', '```', ...legacyRules.map((l) => l.trim()), '```');
if (legacyPrefixRedirects.length) L.push(``, `Plain \`Redirect\` directive(s) in the legacy file (prefix-matching; legacy rule, report only — not carried over): ${legacyPrefixRedirects.length}`);
L.push(`- Sitemap files: ${sitemaps.length ? sitemaps.map((s) => `\`${s}\``).join(', ') + ` (${sitemapLocs.length} URL(s))` : 'none'}`);
L.push(`- Sensitive files (exclude from any deploy, never read): ${sensitive.length ? sensitive.map((s) => `\`${s}\``).join(', ') : 'none found'}`);
L.push(``, `## c) Legacy URL inventory (${urls.size} URL(s) from files and sitemaps)`, ``, `| URL | Title (from <title>) | Source |`, `|---|---|---|`);
for (const c of coverage) L.push(`| \`${c.url}\` | ${c.title.replace(/\|/g, '\\|')} | ${c.sources} |`);
const count = (s) => coverage.filter((c) => c.status === s).length;
L.push(``, `## d) Coverage in the new site — KEPT ${count('KEPT')}, REDIRECTED ${count('REDIRECTED')}, UNCOVERED ${count('UNCOVERED')}`, ``, `| Legacy URL | Status | New URL | Note |`, `|---|---|---|---|`);
for (const c of coverage) L.push(`| \`${c.url}\` | ${c.status} | \`${c.target}\` | ${c.note} |`);
L.push(``, `### Proposed redirects — proposed, not applied; review before adding to public/.htaccess`, ``, '```', ...(proposedUnique.length ? proposedUnique : ['# nothing uncovered']), '```');
if (rules.some((r) => !r.re)) L.push(``, `Unparsable RedirectMatch pattern(s) in the new .htaccess: ${rules.filter((r) => !r.re).map((r) => `\`${r.pattern}\``).join(', ')}`);
L.push(``, `## e) Collisions — ${collisions.length} live file(s) at paths the new build also writes (WILL BE OVERWRITTEN)`, ``, `| Path | Live bytes | New bytes |`, `|---|---|---|`);
for (const c of collisions) L.push(`| \`${c.path}\` | ${c.live} | ${c.next} |`);
L.push(``, `## f) Untouched — ${untouched.length} live file(s) not in the new build (STAY REACHABLE after a Hostinger Git deploy until retired in an approved step)`, ``, `| Top-level entry | Files |`, `|---|---|`);
for (const [k, v] of [...untouchedTop.entries()].sort((a, b) => a[0].localeCompare(b[0]))) L.push(`| \`${k}\` | ${v}${SENSITIVE.test(k) ? ' — sensitive' : ''} |`);
L.push(``, `## g) Legacy contact channels (counts only)`, ``, `- Pages mentioning a messaging-app contact (whatsapp / wa.me): ${waFiles}`, `- Pages with \`tel:\` links: ${telFiles}`, ``, `Neither is carried over by the new build (brief Part 11); the owner decides on phone/address continuity (backlog N10).`, ``);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, L.join('\n'));
console.log(`compare-live-backup: root ${rootLabel} · ${urls.size} legacy URLs — KEPT ${count('KEPT')}, REDIRECTED ${count('REDIRECTED')}, UNCOVERED ${count('UNCOVERED')} · ${collisions.length} collision(s) · ${untouched.length} untouched · ${sensitive.length} sensitive`);
console.log(`report written ${relative(process.cwd(), OUT)}`);
