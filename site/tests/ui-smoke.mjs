// UI smoke test with Playwright against a static preview of dist/.
// Checks: pages render without console errors, nav + primary CTA present, mobile menu toggles,
// directory filter works, apply form validates client-side, no WhatsApp anywhere, screenshots at 3 widths.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, extname } from 'node:path';

const DIST = resolve('dist');
const OUT = resolve('tests/output'); mkdirSync(OUT, { recursive: true });
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain' };
const server = createServer((req, res) => {
  let p = join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { res.writeHead(404); return res.end('404'); }
  res.writeHead(200, { 'content-type': MIME[extname(p)] ?? 'application/octet-stream' }); res.end(readFileSync(p));
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;

const pages = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && pages.push(p.replace(DIST, '').replace(/index\.html$/, '')); } })(DIST);

let failures = 0; const fail = (m) => { console.log('FAIL', m); failures++; };
const browser = await chromium.launch();
for (const [name, width] of [['mobile', 390], ['tablet', 820], ['desktop', 1440]]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  for (const path of pages) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await page.goto(base + path, { waitUntil: 'load' });
    // Block external font requests silently (offline-safe); they are not under test.
    if (errors.filter((e) => !/fonts\.g/.test(e)).length) fail(`${name} ${path} console errors: ${errors.join(' | ')}`);
    const html = await page.content();
    if (/whatsapp|wa\.me/i.test(html)) fail(`${name} ${path} contains WhatsApp reference`);
    if (!path.includes('404') && !(await page.$('header a.btn-primary, header .btn-primary'))) fail(`${name} ${path} header CTA missing`);
    const hScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (hScroll) fail(`${name} ${path} horizontal overflow`);
    if (name === 'mobile' && path === '/') {
      await page.click('[data-menu-toggle]');
      if ((await page.getAttribute('[data-menu-toggle]', 'aria-expanded')) !== 'true') fail('mobile menu did not open');
      const links = await page.$$eval('[data-menu] a', (as) => as.filter((a) => a.offsetParent !== null).length);
      if (links < 6) fail(`mobile menu shows ${links} links`);
    }
    if (name === 'desktop' && path === '/universities/') {
      // Data-driven: the directory may list zero universities in production (publication gate), so derive
      // expectations from the cards' own data attributes instead of hard-coding a university.
      const total = await page.$$eval('[data-list] > article', (a) => a.length);
      const count = Number(await page.textContent('[data-count]'));
      if (count !== total) fail(`directory count ${count} ≠ ${total} cards`);
      if (total === 0) {
        if (await page.$eval('[data-empty]', (el) => el.hidden)) fail('directory empty state hidden with zero universities');
        if (await page.$('[data-list] a[href^="/universities/"]')) fail('directory lists a profile link with zero published records');
      } else {
        const fields = await page.$$eval('[data-filter="field"] option', (o) => o.map((x) => x.value).filter(Boolean));
        for (const f of fields.slice(0, 2)) {
          await page.selectOption('[data-filter="field"]', f);
          const predicted = await page.$$eval('[data-list] > article', (a, f) => a.filter((el) => (el.dataset.fields ?? '').split(' ').includes(f)).length, f);
          if (Number(await page.textContent('[data-count]')) !== predicted) fail(`directory filter field=${f} count mismatch`);
          await page.selectOption('[data-filter="field"]', '');
        }
        // A city combined with a language none of its cards offers must show the empty state (when such a pair exists).
        const cards = await page.$$eval('[data-list] > article', (a) => a.map((el) => ({ city: el.dataset.city, langs: (el.dataset.languages ?? '').split(' ') })));
        const langs = await page.$$eval('[data-filter="language"] option', (o) => o.map((x) => x.value).filter(Boolean));
        const pair = cards.flatMap((c) => langs.filter((l) => !cards.some((x) => x.city === c.city && x.langs.includes(l))).map((l) => [c.city, l]))[0];
        if (pair) {
          await page.selectOption('[data-filter="city"]', pair[0]); await page.selectOption('[data-filter="language"]', pair[1]);
          if ((await page.textContent('[data-count]')) !== '0') fail(`directory filter ${pair.join('+')} should yield 0`);
          if (await page.$eval('[data-empty]', (el) => el.hidden)) fail('empty-state message not shown');
        }
      }
    }
    if (name === 'desktop' && path === '/apply/') {
      // Prefill uses whichever universities the publication gate lets through; with none, an unknown slug must be ignored.
      const slugs = await page.$$eval('[name="university"] option', (o) => o.map((x) => x.value).filter((v) => v && v !== 'unlisted'));
      const uni = slugs[0] ?? 'not-a-listed-university';
      await page.goto(base + `/apply/?course=medicine&university=${uni}`, { waitUntil: 'load' });
      if ((await page.inputValue('[name="course"]')) !== 'medicine') fail('apply prefill course');
      if ((await page.inputValue('[name="university"]')) !== (slugs[0] ?? '')) fail('apply prefill university');
      await page.click('form[data-form] button[type="submit"]');
      if (await page.$eval('[data-form-error]', (el) => el.hidden)) fail('apply form: validation summary not shown');
      if (!(await page.$('.field.error'))) fail('apply form: no field marked invalid');
      if (!page.url().includes('/apply/')) fail('apply form submitted despite missing fields');
    }
    if (['/', '/universities/', '/apply/', '/tuition-fees/'].includes(path) || /^\/universities\/[^/]+\/$/.test(path)) {
      await page.screenshot({ path: join(OUT, `${name}${path.replace(/\//g, '_') || '_home'}.png`), fullPage: true });
    }
    await page.close();
  }
  await ctx.close();
}
await browser.close(); server.close();
console.log(`ui-smoke: ${pages.length} pages × 3 widths, ${failures} failures (screenshots in tests/output/)`);
process.exit(failures ? 1 : 0);
