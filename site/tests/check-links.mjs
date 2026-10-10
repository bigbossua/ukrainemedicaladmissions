// Internal link + asset checker over dist/. Fails on any broken internal href/src.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DIST = resolve('dist');
const html = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && html.push(p); } })(DIST);

const ATTR = /\b(?:href|src|action)="([^"#?]*)(?:[#?][^"]*)?"/g;
const EXTERNAL = /^(https?:)?\/\/|^mailto:|^tel:|^javascript:|^data:/;
let broken = 0, checked = 0;
const seen = new Set();
for (const file of html) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(ATTR)) {
    const url = m[1];
    if (!url || EXTERNAL.test(url) || seen.has(url)) continue;
    seen.add(url); checked++;
    if (!url.startsWith('/')) { console.log(`RELATIVE  ${url}  in ${file.replace(DIST, '')}`); broken++; continue; }
    const candidates = url.endsWith('/') ? [join(DIST, url, 'index.html')] : [join(DIST, url), join(DIST, url, 'index.html')];
    // PHP endpoints are served by the host, not present in dist as HTML
    if (url.endsWith('.php')) candidates.push(join(DIST, url));
    if (!candidates.some(existsSync)) { console.log(`BROKEN    ${url}  in ${file.replace(DIST, '')}`); broken++; }
  }
}
console.log(`check-links: ${html.length} pages, ${checked} unique internal URLs, ${broken} broken`);
process.exit(broken ? 1 : 0);
