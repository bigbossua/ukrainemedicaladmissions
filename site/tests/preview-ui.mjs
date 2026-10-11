// Preview UI test (Playwright + axe) over dist-preview/: draft profiles, the directory with drafts, the preview index
// and the synthetic sample. Checks rendering (no console errors, no horizontal overflow at 3 widths), the directory
// filters against the cards' own data attributes, the draft banner, and accessibility (WCAG 2.1 A/AA + best-practice;
// serious/critical violations fail). Screenshots go to tests/output/preview/.
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve, extname } from 'node:path';

const DIST = resolve('dist-preview');
if (!existsSync(DIST)) { console.log('dist-preview/ missing — run npm run build:preview first'); process.exit(1); }
const OUT = resolve('tests/output/preview'); mkdirSync(OUT, { recursive: true });
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain' };
const server = createServer((req, res) => {
  let p = join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { res.writeHead(404); return res.end('404'); }
  res.writeHead(200, { 'content-type': MIME[extname(p)] ?? 'application/octet-stream' }); res.end(readFileSync(p));
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;

const pages = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && pages.push(p.replace(DIST, '').replace(/index\.html$/, '')); } })(DIST);
const underTest = pages.filter((p) => p.startsWith('/universities/') || p.startsWith('/preview/'));

let failures = 0; const fail = (m) => { console.log('FAIL', m); failures++; };
const a11y = []; let blocking = 0;
const browser = await chromium.launch();
for (const [name, width] of [['mobile', 390], ['tablet', 820], ['desktop', 1440]]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  for (const path of underTest) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await page.goto(base + path, { waitUntil: 'load' });
    if (errors.filter((e) => !/fonts\.g/.test(e)).length) fail(`${name} ${path} console errors: ${errors.join(' | ')}`);
    const html = await page.content();
    if (/whatsapp|wa\.me/i.test(html)) fail(`${name} ${path} contains WhatsApp reference`);
    if (!(await page.$('[data-draft-banner]'))) fail(`${name} ${path} draft banner missing`);
    if (!(await page.$('header a.btn-primary, header .btn-primary'))) fail(`${name} ${path} header CTA missing`);
    if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)) fail(`${name} ${path} horizontal overflow`);
    if ((await page.$$eval('h1', (h) => h.length)) !== 1) fail(`${name} ${path} must have exactly one h1`);

    // Directory filters: data-driven against the cards' own attributes.
    if (name === 'desktop' && path === '/universities/') {
      const total = await page.$$eval('[data-list] > article', (a) => a.length);
      const expect = async (label) => {
        const shown = await page.$$eval('[data-list] > article', (a) => a.filter((el) => el.offsetParent !== null).length); // actually visible, not just [hidden] unset
        const count = Number(await page.textContent('[data-count]'));
        if (shown !== count) fail(`directory ${label}: count ${count} ≠ visible cards ${shown}`);
        const emptyHidden = await page.$eval('[data-empty]', (el) => el.hidden);
        if ((shown === 0) === emptyHidden) fail(`directory ${label}: empty state ${emptyHidden ? 'hidden' : 'shown'} with ${shown} cards`);
        return shown;
      };
      for (const [key, attr, mode] of [['field', 'fields', 'list'], ['level', 'levels', 'list'], ['language', 'languages', 'list'], ['city', 'city', 'exact'], ['intake', 'intakes', 'list'], ['prep', 'prep', 'exact']]) {
        const options = await page.$$eval(`[data-filter="${key}"] option`, (o) => o.map((x) => x.value).filter(Boolean));
        for (const value of options) {
          await page.selectOption(`[data-filter="${key}"]`, value);
          const shown = await expect(`${key}=${value}`);
          const predicted = await page.$$eval('[data-list] > article', (a, [attr, mode, value]) => a.filter((el) => mode === 'exact' ? el.dataset[attr] === value : (el.dataset[attr] ?? '').split(' ').includes(value)).length, [attr, mode, value]);
          if (shown !== predicted) fail(`directory ${key}=${value}: shows ${shown}, data says ${predicted}`);
          await page.selectOption(`[data-filter="${key}"]`, '');
        }
      }
      // Combination that cannot match: a city plus a field that city does not offer (if any such pair exists).
      const cards = await page.$$eval('[data-list] > article', (a) => a.map((el) => ({ city: el.dataset.city, fields: (el.dataset.fields ?? '').split(' ').filter(Boolean) })));
      const allFields = [...new Set(cards.flatMap((c) => c.fields))];
      outer: for (const c of cards) for (const f of allFields) if (!cards.some((x) => x.city === c.city && x.fields.includes(f))) {
        await page.selectOption('[data-filter="city"]', c.city); await page.selectOption('[data-filter="field"]', f);
        if ((await expect(`city=${c.city}+field=${f}`)) !== 0) fail('impossible combination should show 0');
        break outer;
      }
      await page.click('[data-reset]');
      await page.waitForTimeout(50);
      if ((await expect('after reset')) !== total) fail('reset did not restore all cards');
      // Compare table present and scrollable region labelled
      if (!(await page.$('.compare[role="region"][aria-label]'))) fail('compare table region missing');
    }
    if (name === 'desktop' && path.startsWith('/universities/') && path !== '/universities/') {
      if (!(await page.$('[data-draft-banner]'))) fail(`${path} no draft banner`);
      if (await page.$('link[rel="canonical"]')) fail(`${path} has canonical`);
      if ((await page.$$eval('script[type="application/ld+json"]', (s) => s.length)) > 0) fail(`${path} has JSON-LD`);
      if (!(await page.$('text=Verification queue'))) fail(`${path} research references not shown in preview`);
      // Jump links must resolve to programme cards on the page.
      const jumps = await page.$$eval('nav.jump a', (a) => a.map((x) => x.getAttribute('href')));
      for (const j of jumps) if (!(await page.$(`${j.replace(/([^a-zA-Z0-9_#-])/g, '\\$1')}`))) fail(`${path} jump link ${j} has no target`);
    }
    // Readiness demo: the fixed disclaimer is visible, every row has a worded result badge, nothing is totalled.
    if (path === '/preview/readiness/') {
      if (!(await page.isVisible('[data-disclaimer]'))) fail(`${name} ${path} disclaimer not visible`);
      const badges = await page.$$eval('[data-readiness-row] [data-result]', (b) => b.map((x) => x.textContent.trim()));
      const rows = await page.$$eval('[data-readiness-row]', (r) => r.length);
      if (!rows || badges.length !== rows || badges.some((t) => !['Met', 'Not met', 'Unknown', 'Pending evidence'].includes(t))) fail(`${name} ${path} readiness badges: ${JSON.stringify(badges)}`);
      if (/\b(in)?eligible\b|\bscore\b|\bverdict\b/i.test(await page.innerText('main'))) fail(`${name} ${path} mentions eligibility, a score or a verdict`);
    }
    // Accessibility (mobile + desktop)
    if (name !== 'tablet') {
      if (name === 'mobile') await page.click('[data-menu-toggle]').catch(() => {});
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze();
      for (const v of results.violations) {
        const sev = ['serious', 'critical'].includes(v.impact) ? 'BLOCKING' : 'minor';
        if (sev === 'BLOCKING') blocking++;
        a11y.push({ viewport: name, path, id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 3).map((n) => n.target.join(' ')) });
        console.log(`${sev.padEnd(8)} ${name.padEnd(7)} ${path.padEnd(60)} ${v.id} (${v.impact}) ×${v.nodes.length}`);
      }
    }
    await page.screenshot({ path: join(OUT, `${name}${path.replace(/\//g, '_')}.png`), fullPage: true });
    await page.close();
  }
  await ctx.close();
}
await browser.close(); server.close();
writeFileSync(join(OUT, 'a11y-report.json'), JSON.stringify(a11y, null, 2));
console.log(`preview-ui: ${underTest.length} pages × 3 widths, ${failures} failures, ${blocking} blocking a11y violations (screenshots in tests/output/preview/)`);
process.exit(failures || blocking ? 1 : 0);
