// Automated accessibility audit (axe-core, WCAG 2.1 A/AA + best-practice) over every built page,
// at mobile and desktop widths, served from dist/. Fails on any 'serious' or 'critical' violation.
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, readdirSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve, extname } from 'node:path';

const DIST = resolve('dist');
const OUT = resolve('tests/output'); mkdirSync(OUT, { recursive: true });
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json' };
const server = createServer((req, res) => {
  let p = join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': MIME[extname(p)] ?? 'application/octet-stream' }); res.end(readFileSync(p));
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;
const pages = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && pages.push(p.replace(DIST, '').replace(/index\.html$/, '')); } })(DIST);

const browser = await chromium.launch();
const report = []; let blocking = 0, minor = 0;
for (const [name, width] of [['mobile', 390], ['desktop', 1440]]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  for (const path of pages) {
    const page = await ctx.newPage();
    await page.goto(base + path, { waitUntil: 'load' });
    if (name === 'mobile') await page.click('[data-menu-toggle]').catch(() => {}); // audit the open menu too
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze();
    for (const v of results.violations) {
      const sev = ['serious', 'critical'].includes(v.impact) ? 'BLOCKING' : 'minor';
      if (sev === 'BLOCKING') blocking++; else minor++;
      report.push({ viewport: name, path, id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 3).map((n) => n.target.join(' ')) });
      console.log(`${sev.padEnd(8)} ${name.padEnd(7)} ${path.padEnd(52)} ${v.id} (${v.impact}) ×${v.nodes.length}`);
    }
    await page.close();
  }
  await ctx.close();
}
await browser.close(); server.close();
writeFileSync(join(OUT, 'a11y-report.json'), JSON.stringify(report, null, 2));
console.log(`a11y: ${pages.length} pages × 2 widths, ${blocking} blocking (serious/critical), ${minor} minor violations (tests/output/a11y-report.json)`);
process.exit(blocking ? 1 : 0);
