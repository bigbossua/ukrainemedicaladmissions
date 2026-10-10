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
      await page.selectOption('[data-filter="course"]', 'dentistry');
      const n = await page.textContent('[data-count]');
      if (n !== '1') fail(`directory filter dentistry => ${n}`);
      await page.selectOption('[data-filter="city"]', 'Ternopil');
      await page.selectOption('[data-filter="language"]', 'Ukrainian');
      if ((await page.textContent('[data-count]')) !== '0') fail('directory filter Ukrainian should yield 0');
      if (await page.$eval('[data-empty]', (el) => el.hidden)) fail('empty-state message not shown');
    }
    if (name === 'desktop' && path === '/apply/') {
      await page.goto(base + '/apply/?course=medicine&university=ternopil-national-medical-university', { waitUntil: 'load' });
      if ((await page.inputValue('[name="course"]')) !== 'medicine') fail('apply prefill course');
      if ((await page.inputValue('[name="university"]')) !== 'ternopil-national-medical-university') fail('apply prefill university');
      await page.click('form[data-form] button[type="submit"]');
      if (await page.$eval('[data-form-error]', (el) => el.hidden)) fail('apply form: validation summary not shown');
      if (!(await page.$('.field.error'))) fail('apply form: no field marked invalid');
      if (!page.url().includes('/apply/')) fail('apply form submitted despite missing fields');
    }
    if (['/', '/universities/', '/universities/ternopil-national-medical-university/', '/apply/', '/tuition-fees/'].includes(path)) {
      await page.screenshot({ path: join(OUT, `${name}${path.replace(/\//g, '_') || '_home'}.png`), fullPage: true });
    }
    await page.close();
  }
  await ctx.close();
}
await browser.close(); server.close();
console.log(`ui-smoke: ${pages.length} pages × 3 widths, ${failures} failures (screenshots in tests/output/)`);
process.exit(failures ? 1 : 0);
