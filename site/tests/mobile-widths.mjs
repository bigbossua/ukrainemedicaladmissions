// Mobile acceptance test (owner brief 2026-10-26) over dist/: twelve page types at 320, 360, 390 and 430 CSS px on a touch
// viewport. Checks: no horizontal scrolling (and which element overflows), the menu opens and closes on Escape without
// overflow, form controls at least 16 px (no zoom on focus; hidden honeypot and checkboxes excluded), primary links and
// buttons at least 44 x 44 px, the h1 at least 24 px, the footer links visible, directory search works, no page errors.
// Prints "mobile-widths: N pages x 4 widths, M failures". Needs dist/ (npm run build).
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve, extname } from 'node:path';

const DIST = resolve('dist');
if (!existsSync(join(DIST, 'index.html'))) { console.log('mobile-widths: dist/ missing (run npm run build first)'); process.exit(1); }
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };
const server = createServer((req, res) => { let p = join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname)); if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html'); if (!existsSync(p)) { res.writeHead(404); return res.end('404'); } res.writeHead(200, { 'content-type': MIME[extname(p)] ?? 'application/octet-stream' }); res.end(readFileSync(p)); }).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;
const PAGES = ['/', '/universities/', '/universities/kyiv-medical-university/', '/universities/zaporizhzhia-state-medical-and-pharmaceutical-university/', '/courses/medicine/', '/admissions/', '/tuition-fees/', '/faq/', '/apply/', '/contact/', '/privacy/', '/404.html'];
const WIDTHS = [320, 360, 390, 430];
let failures = 0; const fail = (m) => { failures++; console.log('FAIL', m); };
const browser = await chromium.launch();
for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 800 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  for (const p of PAGES) {
    const page = await ctx.newPage(); const errs = []; page.on('pageerror', (e) => errs.push(e.message));
    await page.goto(base + p, { waitUntil: 'load' });
    const r = await page.evaluate(() => {
      const de = document.documentElement; const out = { overflow: de.scrollWidth > de.clientWidth + 1, wide: [], smallControls: [], smallTargets: [], h1: 0, footerLinks: 0 };
      if (out.overflow) for (const el of document.querySelectorAll('body *')) { const b = el.getBoundingClientRect(); if (b.right > de.clientWidth + 1 && b.width > 20) { out.wide.push(`${el.tagName.toLowerCase()} right=${Math.round(b.right)}`); if (out.wide.length > 5) break; } }
      for (const el of document.querySelectorAll('input:not([type=checkbox]):not([type=radio]):not([type=hidden]), select, textarea')) { const cs = getComputedStyle(el); const fs = parseFloat(cs.fontSize); const visible = el.offsetParent !== null && cs.visibility !== 'hidden' && el.getBoundingClientRect().width > 1 && !el.closest('[aria-hidden="true"]'); if (visible && fs < 16) out.smallControls.push(`${el.tagName.toLowerCase()}[name=${el.getAttribute('name')}] ${fs}px`); }
      for (const el of document.querySelectorAll('a.btn, button, header nav a, .filters select, [data-reset]')) { const b = el.getBoundingClientRect(); if (el.offsetParent && b.width > 0 && (b.height < 44 || b.width < 44)) out.smallTargets.push(`${el.tagName.toLowerCase()} "${(el.textContent || '').trim().slice(0, 20)}" ${Math.round(b.width)}x${Math.round(b.height)}`); }
      const h1 = document.querySelector('h1'); out.h1 = h1 ? parseFloat(getComputedStyle(h1).fontSize) : 0;
      out.footerLinks = [...document.querySelectorAll('footer a')].filter((a) => a.offsetParent).length;
      return out;
    });
    if (r.overflow) fail(`${width} ${p}: horizontal overflow (${r.wide.join('; ')})`);
    if (r.smallControls.length) fail(`${width} ${p}: controls under 16px: ${r.smallControls.slice(0, 3).join(', ')}`);
    if (r.smallTargets.length) fail(`${width} ${p}: targets under 44px: ${r.smallTargets.slice(0, 4).join(', ')}`);
    if (r.h1 < 24) fail(`${width} ${p}: h1 only ${r.h1}px`);
    if (r.footerLinks < 10) fail(`${width} ${p}: only ${r.footerLinks} footer links visible`);
    if (p === '/') {
      await page.click('[data-menu-toggle]');
      if (!(await page.$eval('[data-menu]', (m) => m.hasAttribute('data-open') && m.getBoundingClientRect().height > 100))) fail(`${width}: the mobile menu did not open`);
      if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)) fail(`${width}: horizontal overflow with the menu open`);
      await page.keyboard.press('Escape');
      if (!(await page.$eval('[data-menu]', (m) => !m.hasAttribute('data-open')))) fail(`${width}: the menu did not close on Escape`);
    }
    if (p === '/universities/') { await page.fill('[data-search]', 'kyiv'); if (!(await page.$$eval('[data-list] article:not([hidden])', (a) => a.length))) fail(`${width}: directory search for "kyiv" found nothing`); await page.click('[data-reset]'); }
    if (errs.length) fail(`${width} ${p}: page errors ${errs.join(' | ')}`);
    await page.close();
  }
  await ctx.close();
}
await browser.close(); server.close();
console.log(`mobile-widths: ${PAGES.length} pages x ${WIDTHS.length} widths, ${failures} failures`);
process.exit(failures ? 1 : 0);
