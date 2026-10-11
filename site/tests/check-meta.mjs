// Metadata checker over dist/: unique titles & descriptions, canonical present and self-referencing,
// exactly one h1, robots directive present, noindex pages absent from the sitemap.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DIST = resolve('dist');
const SITE = 'https://ukrainemedicaladmissions.com';
const pages = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && pages.push(p); } })(DIST);
const sitemap = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8');

const titles = new Map(), descs = new Map();
let problems = 0;
const warn = (f, msg) => { console.log(`${msg}  ${f.replace(DIST, '')}`); problems++; };
for (const f of pages) {
  const h = readFileSync(f, 'utf8');
  const title = h.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const desc = h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const canon = h.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
  const robots = h.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? '';
  const h1s = (h.match(/<h1[\s>]/g) ?? []).length;
  const rel = f.replace(DIST, '').replace(/index\.html$/, '').replace(/404\.html$/, '404');
  const is404 = f.endsWith('404.html');
  if (!title) warn(f, 'NO TITLE');
  if (title.length > 70) warn(f, `LONG TITLE (${title.length})`);
  if (!desc) warn(f, 'NO DESCRIPTION'); else if (!is404 && (desc.length > 165 || desc.length < 50)) warn(f, `DESC LENGTH ${desc.length}`);
  if (!canon) warn(f, 'NO CANONICAL'); else if (!is404 && canon !== SITE + rel) warn(f, `CANONICAL MISMATCH ${canon}`);
  if (!robots) warn(f, 'NO ROBOTS META');
  if (h1s !== 1) warn(f, `H1 COUNT ${h1s}`);
  for (const img of h.match(/<img\b[^>]*>/g) ?? []) { if (!/\balt="/.test(img)) warn(f, `IMG WITHOUT ALT ${img.slice(0, 80)}`); if (!/\bwidth="/.test(img) || !/\bheight="/.test(img)) warn(f, `IMG WITHOUT DIMENSIONS ${img.slice(0, 80)}`); }
  if (titles.has(title)) warn(f, `DUPLICATE TITLE with ${titles.get(title)}`); else titles.set(title, rel);
  if (descs.has(desc)) warn(f, `DUPLICATE DESCRIPTION with ${descs.get(desc)}`); else descs.set(desc, rel);
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const o = JSON.parse(m[1]); if (!o['@type']) warn(f, 'JSON-LD WITHOUT @type'); } catch { warn(f, 'INVALID JSON-LD'); }
  }
  const inSitemap = sitemap.includes(`<loc>${SITE}${rel}</loc>`);
  if (robots.includes('noindex') && inSitemap) warn(f, 'NOINDEX PAGE IN SITEMAP');
  if (!robots.includes('noindex') && rel !== '404' && !inSitemap) warn(f, 'INDEXABLE PAGE MISSING FROM SITEMAP');
}
// RFC 9116 security.txt: present, and its Expires date is in the future but no more than a year ahead.
const secPath = join(DIST, '.well-known', 'security.txt');
try {
  const sec = readFileSync(secPath, 'utf8');
  const exp = Date.parse(sec.match(/^Expires:\s*(\S+)/m)?.[1] ?? '');
  const days = (exp - Date.now()) / 86400000;
  if (!/^Contact:\s*mailto:/m.test(sec)) warn(secPath, 'SECURITY.TXT WITHOUT mailto CONTACT');
  if (Number.isNaN(exp) || days < 0) warn(secPath, 'SECURITY.TXT EXPIRED OR UNPARSABLE');
  else if (days > 366) warn(secPath, 'SECURITY.TXT EXPIRES MORE THAN A YEAR AHEAD');
  else if (days < 30) warn(secPath, `SECURITY.TXT EXPIRES IN ${Math.floor(days)} DAYS — renew`);
} catch { warn(secPath, 'MISSING .well-known/security.txt'); }
console.log(`check-meta: ${pages.length} pages, ${problems} problems`);
process.exit(problems ? 1 : 0);
