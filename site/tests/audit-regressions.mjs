// Regression checks for the accessibility and layout defects confirmed by the 2026-10-29 audit (AX-01 to AX-09; AX-06,
// render-blocking stylesheets, is a documented P3 and not fixed). Each check failed on the build before the fixes.
//   AX-01 directory finder laid out from the first paint: no layout shift on a slow phone; hidden with scripts off
//   AX-02 open mobile menu scrolls inside a short viewport: the in-menu Apply Online Now can be reached and seen
//   AX-03 focus ring on the white hero card has at least 3:1 contrast (not the yellow ring of the dark hero)
//   AX-04 contact form errors name the field in text, linked with aria-describedby
//   AX-05 contact form marks required fields in visible text
//   AX-07 no dead menu button with scripts off
//   AX-08 no aria-label on a span without a role (count badges in the directory)
//   AX-09 a submit button disabled by a sent form is usable again when the page is shown from the back-forward cache
// Review of the fixes (2026-10-29): what is typed in the finder before its script runs is applied; the contact consent
// error slot stays hidden until it has a message; focus rings in the scrolling mobile menu are not clipped.
// Prints "audit-regressions: N checks, M failures". Needs dist/ (npm run build).
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve, extname } from 'node:path';

const DIST = resolve(process.argv[2] ?? 'dist');
if (!existsSync(join(DIST, 'index.html'))) { console.log('audit-regressions: dist/ missing (run npm run build first)'); process.exit(1); }
let checks = 0, failures = 0;
const ok = (cond, msg) => { checks++; if (!cond) { failures++; console.log('FAIL', msg); } };

// AX-08 (static, every page): aria-label is not supported on a span without a role, so screen readers skip it.
const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && files.push(p); } })(DIST);
for (const f of files) {
  const bad = [...readFileSync(f, 'utf8').matchAll(/<span\b[^>]*>/g)].map((m) => m[0]).filter((t) => /\saria-label=/.test(t) && !/\srole=/.test(t));
  ok(bad.length === 0, `AX-08 ${f.slice(DIST.length)}: span with aria-label and no role: ${bad.slice(0, 2).join(' ')}`);
}
// AX-01 (static): the finder carries no hidden attribute (shown from the first paint) and is marked for the no-script rule.
const dirHtml = readFileSync(join(DIST, 'universities/index.html'), 'utf8');
const finderTag = (/<form\b[^>]*data-filters[^>]*>/.exec(dirHtml) ?? [''])[0];
ok(finderTag && !/\shidden[\s>=]/.test(finderTag) && /data-js-only/.test(finderTag), `AX-01 /universities/: finder tag ${finderTag}`);
ok(/<noscript><style>\[data-js-only\]\{display:none!important\}<\/style><\/noscript>/.test(dirHtml), 'AX-01 /universities/: the no-script rule for [data-js-only] is missing from the head');

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2' };
const server = createServer((req, res) => {
  let p = join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': MIME[extname(p)] ?? 'application/octet-stream' }); res.end(readFileSync(p));
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();

// AX-01 (dynamic): a slow phone (4x CPU throttling) loads the directory without the list jumping when the script arrives.
// Before the fix one run measured 0.152; the Core Web Vitals "good" limit is 0.1, and this page now measures about 0.
{
  const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.addInitScript(() => { window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); });
  await page.goto(base + '/universities/', { waitUntil: 'load' }); await page.waitForTimeout(2000);
  const cls = await page.evaluate(() => window.__cls);
  ok(cls < 0.05, `AX-01 /universities/ at 412 px, 4x CPU: layout shift ${cls.toFixed(3)} (limit 0.05)`);
  await ctx.close();
}
// AX-01 and AX-07 (scripts off): no finder that cannot work, no menu button that cannot open; the plain link rows remain.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(base + '/universities/', { waitUntil: 'load' });
  ok(await page.$eval('[data-filters]', (f) => getComputedStyle(f).display === 'none'), 'AX-01 scripts off: the directory finder is shown but cannot filter');
  ok(await page.$eval('[data-menu-toggle]', (b) => getComputedStyle(b).display === 'none'), 'AX-07 scripts off: the menu button is shown but cannot open the menu');
  await ctx.close();
}
// AX-02: in a short viewport the open menu scrolls by itself (the sticky header does not scroll with the page), so the
// last item, Apply Online Now, comes into view when it takes focus.
for (const [width, height] of [[320, 256], [844, 340]]) {
  const ctx = await browser.newContext({ viewport: { width, height }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(base + '/faq/', { waitUntil: 'load' });
  await page.click('[data-menu-toggle]');
  await page.focus('#main-menu .menu-cta a');
  const r = await page.evaluate(() => { const a = document.querySelector('#main-menu .menu-cta a').getBoundingClientRect(); return { top: a.top, bottom: a.bottom, vh: innerHeight }; });
  ok(r.top >= 0 && r.bottom <= r.vh + 1, `AX-02 ${width}x${height}: focused in-menu Apply Online Now is outside the viewport (${Math.round(r.top)}-${Math.round(r.bottom)} of ${r.vh})`);
  // Tab through the open menu from the top: each focused link's ring (outline plus offset) stays inside the menu's
  // visible box, so the scrolling menu never clips it.
  await page.focus('[data-menu-toggle]');
  const clipped = [];
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    const c = await page.evaluate(() => {
      const a = document.activeElement; const menu = document.getElementById('main-menu');
      if (!a || !menu?.contains(a)) return null;
      const cs = getComputedStyle(a); const ring = parseFloat(cs.outlineWidth) + parseFloat(cs.outlineOffset);
      const b = a.getBoundingClientRect(); const m = menu.getBoundingClientRect();
      const top = m.top + menu.clientTop, bottom = top + menu.clientHeight;
      return { text: a.textContent.trim(), ok: b.top - ring >= top - 0.5 && b.bottom + ring <= bottom + 0.5 };
    });
    if (!c) break;
    if (!c.ok) clipped.push(c.text);
  }
  ok(clipped.length === 0, `AX-02 ${width}x${height}: focus ring clipped by the scrolling menu on: ${clipped.join(', ')}`);
  await ctx.close();
}
// AX-03: the focus ring inside the white hero card is dark enough on white (WCAG 1.4.11, at least 3:1).
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'load' });
  let inCard = false;
  for (let i = 0; i < 40 && !inCard; i++) { await page.keyboard.press('Tab'); inCard = await page.evaluate(() => !!document.activeElement?.closest('.hero-card')); }
  ok(inCard, 'AX-03 /: keyboard focus never reached the hero card');
  if (inCard) {
    const ratio = await page.evaluate(() => {
      const rgb = getComputedStyle(document.activeElement).outlineColor.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number);
      const lum = (c) => { const [r, g, b] = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
      return (1 + 0.05) / (lum(rgb) + 0.05); // against the card's white
    });
    ok(ratio >= 3, `AX-03 /: hero card focus ring contrast on white ${ratio.toFixed(2)}:1 (needs 3:1)`);
  }
  await ctx.close();
}
// Finder used before its script runs (slow phone): once the script arrives, the list matches what was typed.
{
  const ctx = await browser.newContext({ viewport: { width: 412, height: 823 } });
  const page = await ctx.newPage();
  await page.route('**/_astro/*.js', async (route) => { await new Promise((r) => setTimeout(r, 1500)); await route.continue(); });
  await page.goto(base + '/universities/', { waitUntil: 'commit' });
  await page.waitForSelector('#dir-q', { state: 'visible' });
  await page.fill('#dir-q', 'Odesa');
  await page.waitForLoadState('load'); await page.waitForTimeout(300);
  const st = await page.evaluate(() => {
    const shown = [...document.querySelectorAll('[data-list] article')].filter((a) => !a.hidden).map((a) => a.dataset.name ?? '');
    return { total: document.querySelectorAll('[data-list] article').length, shown, count: document.querySelector('[data-count]')?.textContent };
  });
  ok(st.shown.length > 0 && st.shown.length < st.total && st.shown.every((n) => /odesa|odessa/i.test(n)) && st.count === String(st.shown.length),
    `finder: a search typed before the script ran is not applied (${st.shown.length} of ${st.total} shown, count ${st.count})`);
  await ctx.close();
}
// AX-04, AX-05, AX-09 on /contact/.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(base + '/contact/', { waitUntil: 'load' });
  const form = 'form[action="/api/enquiry.php"]';
  const unmarked = await page.$$eval(`${form} [required]`, (els) => els.filter((el) => {
    const label = el.id ? document.querySelector(`label[for="${el.id}"]`) : el.closest('label');
    return !/\(required\)/.test(label?.textContent ?? '') && el.type !== 'checkbox';
  }).map((el) => el.name));
  ok(unmarked.length === 0, `AX-05 /contact/: required fields without a visible "(required)": ${unmarked.join(', ')}`);
  const slots = await page.$$eval(`${form} .err[id$="-error"]`, (els) => els.filter((e) => e.hidden && getComputedStyle(e).display !== 'none').map((e) => e.id));
  ok(slots.length === 0, `/contact/: hidden error slots still take up space: ${slots.join(', ')}`);
  await page.fill(`${form} input[name="name"]`, 'Anna');
  await page.fill(`${form} input[name="email"]`, 'anna@gmail');
  await page.fill(`${form} textarea[name="message"]`, 'A question.');
  await page.click(`${form} button[type="submit"]`);
  for (const name of ['email', 'consent']) {
    const s = await page.$eval(`${form} [name="${name}"]`, (el) => {
      const id = el.getAttribute('aria-describedby'); const slot = id ? document.getElementById(id) : null;
      return { invalid: el.getAttribute('aria-invalid'), text: slot && !slot.hidden ? slot.textContent.trim() : '' };
    });
    ok(s.invalid === 'true' && s.text.length > 10, `AX-04 /contact/: invalid ${name} has no field-specific message linked by aria-describedby (${JSON.stringify(s)})`);
  }
  ok(await page.$eval(`${form} [name="name"]`, (el) => !el.hasAttribute('aria-invalid')), 'AX-04 /contact/: a valid name is marked invalid');
  // AX-09: a sent form disables its button; a page restored from the back-forward cache must enable it again.
  const enabled = await page.evaluate((sel) => {
    const b = document.querySelector(`${sel} button[type="submit"]`); b.disabled = true; b.setAttribute('aria-disabled', 'true');
    window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
    return !b.disabled && !b.hasAttribute('aria-disabled');
  }, form);
  ok(enabled, 'AX-09 /contact/: submit button stays disabled after a back-forward cache restore');
  await ctx.close();
}
await browser.close(); server.close();
console.log(`audit-regressions: ${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);
