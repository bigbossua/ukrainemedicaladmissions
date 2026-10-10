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
  if (titles.has(title)) warn(f, `DUPLICATE TITLE with ${titles.get(title)}`); else titles.set(title, rel);
  if (descs.has(desc)) warn(f, `DUPLICATE DESCRIPTION with ${descs.get(desc)}`); else descs.set(desc, rel);
  const inSitemap = sitemap.includes(`<loc>${SITE}${rel}</loc>`);
  if (robots.includes('noindex') && inSitemap) warn(f, 'NOINDEX PAGE IN SITEMAP');
  if (!robots.includes('noindex') && rel !== '404' && !inSitemap) warn(f, 'INDEXABLE PAGE MISSING FROM SITEMAP');
}
console.log(`check-meta: ${pages.length} pages, ${problems} problems`);
process.exit(problems ? 1 : 0);
