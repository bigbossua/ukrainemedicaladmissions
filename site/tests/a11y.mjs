// Automated accessibility audit (axe-core, WCAG 2.1 A/AA + best-practice) over every built page,
// at mobile and desktop widths, served from dist/, plus every step (and error state) of the stepped form at /apply/.
// Fails on any 'serious' or 'critical' violation.
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
const report = []; let blocking = 0, minor = 0, applyStates = 0;
async function audit(page, name, path) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze();
  for (const v of results.violations) {
    const sev = ['serious', 'critical'].includes(v.impact) ? 'BLOCKING' : 'minor';
    if (sev === 'BLOCKING') blocking++; else minor++;
    report.push({ viewport: name, path, id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 3).map((n) => n.target.join(' ')) });
    console.log(`${sev.padEnd(8)} ${name.padEnd(7)} ${path.padEnd(52)} ${v.id} (${v.impact}) ×${v.nodes.length}`);
  }
}
// The stepped form at /apply/ shows one step at a time: audit every step, and the error states, as a person reaches
// them by pressing Continue after filling in the minimum (synthetic data only).
async function auditApplySteps(ctx, name) {
  const page = await ctx.newPage();
  const state = async (label) => { applyStates++; await audit(page, name, `/apply/ [${label}]`); };
  try {
    await page.goto(base + '/apply/', { waitUntil: 'load' });
    await page.click('#step-1 [data-next]'); await state('step 1, errors');
    await page.selectOption('#f-course', 'medicine'); await page.click('#step-1 [data-next]'); await state('step 2');
    await page.fill('#f-qual-year', 'x'); await page.click('#step-2 [data-next]'); await state('step 2, errors');
    await page.fill('#f-qual-year', '2025'); await page.fill('#f-subject-0-name', 'Biology'); await page.fill('#f-subject-0-grade', 'B');
    await page.click('#step-2 [data-next]'); await state('step 3');
    await page.check('input[name="documents[passport]"][value="have"]'); await page.click('#step-3 [data-next]'); await state('step 4');
    await page.click('#step-4 [data-next]'); await state('step 4, errors');
    await page.fill('#f-name', 'Synthetic Candidate'); await page.fill('#f-email', 'synthetic.candidate@example.invalid'); await page.check('#f-consent');
    await page.click('#step-4 [data-next]'); await state('step 5, review');
  } catch (e) {
    blocking++;
    console.log(`BLOCKING ${name.padEnd(7)} /apply/ step walk failed: ${String(e).split('\n')[0]}`);
  }
  await page.close();
}
for (const [name, width] of [['mobile', 390], ['desktop', 1440]]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  for (const path of pages) {
    const page = await ctx.newPage();
    await page.goto(base + path, { waitUntil: 'load' });
    if (name === 'mobile') await page.click('[data-menu-toggle]').catch(() => {}); // audit the open menu too
    await audit(page, name, path);
    await page.close();
    if (path === '/apply/') await auditApplySteps(ctx, name);
  }
  await ctx.close();
}
await browser.close(); server.close();
writeFileSync(join(OUT, 'a11y-report.json'), JSON.stringify(report, null, 2));
console.log(`a11y: ${pages.length} pages × 2 widths + ${applyStates} /apply/ step states, ${blocking} blocking (serious/critical), ${minor} minor violations (tests/output/a11y-report.json)`);
process.exit(blocking ? 1 : 0);
