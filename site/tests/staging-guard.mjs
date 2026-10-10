// Guard for the staging build (dist-staging/, built with STAGING=1 via `npm run build:staging`):
// every page noindex; no canonical / og:url / JSON-LD pointing at production; robots.txt allows crawling
// (so the noindex can be seen) but lists no sitemap; no sitemap files; .htaccess carries X-Robots-Tag and
// the production-host redirect is host-scoped.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DIST = resolve('dist-staging');
if (!existsSync(DIST)) { console.error('staging-guard: dist-staging/ missing — run npm run build:staging first'); process.exit(1); }
const pages = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && pages.push(p); } })(DIST);

let problems = 0;
const bad = (msg) => { console.log(msg); problems++; };
for (const f of pages) {
  const h = readFileSync(f, 'utf8'); const rel = f.replace(DIST, '');
  if (!/<meta name="robots" content="noindex, nofollow"/.test(h)) bad(`NOT NOINDEX        ${rel}`);
  if (/rel="sitemap"/.test(h)) bad(`SITEMAP LINK       ${rel}`);
  if (/rel="canonical"/.test(h)) bad(`CANONICAL PRESENT  ${rel}`);
  if (/property="og:url"/.test(h)) bad(`OG:URL PRESENT     ${rel}`);
  if (/application\/ld\+json/.test(h)) bad(`JSON-LD PRESENT    ${rel}`);
}
const robots = existsSync(join(DIST, 'robots.txt')) ? readFileSync(join(DIST, 'robots.txt'), 'utf8') : '';
if (/^Disallow: \/\s*$/m.test(robots)) bad('ROBOTS BLOCKS CRAWLING (noindex would never be seen):\n' + robots);
if (/Sitemap:/.test(robots)) bad('ROBOTS LISTS A SITEMAP:\n' + robots);
if (!/STAGING/.test(robots)) bad('ROBOTS NOT THE STAGING VERSION:\n' + robots);
for (const sm of ['sitemap-index.xml', 'sitemap-0.xml']) if (existsSync(join(DIST, sm))) bad(`SITEMAP FILE PRESENT ${sm}`);
const ht = existsSync(join(DIST, '.htaccess')) ? readFileSync(join(DIST, '.htaccess'), 'utf8') : '';
if (!/Header always set X-Robots-Tag "noindex, nofollow"/.test(ht)) bad('.htaccess: X-Robots-Tag noindex header missing');
if (!/RewriteCond %\{HTTP_HOST\} \^\(www\\\.\)\?ukrainemedicaladmissions\\\.com\$/.test(ht)) bad('.htaccess: canonical-host redirect is not host-scoped');
console.log(`staging-guard: ${pages.length} pages, ${problems} problems`);
process.exit(problems ? 1 : 0);
