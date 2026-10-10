// Guard for the staging build (dist-staging/, built with STAGING=1):
// every page must carry noindex, robots.txt must disallow everything, and no sitemap may exist.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DIST = resolve('dist-staging');
if (!existsSync(DIST)) { console.error('staging-guard: dist-staging/ missing — run npm run build:staging first'); process.exit(1); }
const pages = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && pages.push(p); } })(DIST);

let problems = 0;
for (const f of pages) {
  const h = readFileSync(f, 'utf8');
  if (!/<meta name="robots" content="noindex, nofollow"/.test(h)) { console.log('NOT NOINDEX', f.replace(DIST, '')); problems++; }
  if (/rel="sitemap"/.test(h)) { console.log('SITEMAP LINK', f.replace(DIST, '')); problems++; }
}
const robots = existsSync(join(DIST, 'robots.txt')) ? readFileSync(join(DIST, 'robots.txt'), 'utf8') : '';
if (!/^Disallow: \/$/m.test(robots) || /Sitemap:/.test(robots)) { console.log('ROBOTS NOT BLOCKING:\n' + robots); problems++; }
for (const sm of ['sitemap-index.xml', 'sitemap-0.xml']) if (existsSync(join(DIST, sm))) { console.log('SITEMAP FILE PRESENT', sm); problems++; }
console.log(`staging-guard: ${pages.length} pages, ${problems} problems`);
process.exit(problems ? 1 : 0);
