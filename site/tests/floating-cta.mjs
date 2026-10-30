// Floating action group (src/components/FloatingActions.astro, owner requirement 2026-10-30): "WhatsApp Us" and
// "Apply Now" visible and usable on every public page, on desktop and on phones, without covering what they float over.
//   Static, every built page: exactly one group, both links, the business WhatsApp link with the default message, and
//     Apply Now to /apply/ (on /apply/ itself to the form, #apply-form, so answers in progress are not lost).
//   Browser, 15 page types x desktop, tablet and the phone widths 320, 360, 375, 390, 414 and 430 px (plus a short
//     320 x 568 screen): both links inside the viewport, topmost at their centre, at least 44 x 44 px, still there after
//     scrolling to the middle and the end; bottom-right on wide screens, a full-width bottom bar on phones; no footer
//     link, form button, open mobile menu item or sticky element underneath; no horizontal scrolling.
//   Without JavaScript the group is shown and both links are plain links. Clicking Apply Now opens the real /apply/ form;
//   clicking WhatsApp Us opens https://wa.me/380633534065?text=... in a new tab (answered locally: no request leaves).
// Screenshots: tests/output/floating-cta/. Prints "floating-cta: N checks, M failures". Needs dist/ (npm run build).
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, readdirSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, resolve, extname, relative, sep } from 'node:path';

const DIST = resolve(process.argv[2] ?? 'dist');
const OUT = resolve('tests/output/floating-cta'); mkdirSync(OUT, { recursive: true });
if (!existsSync(join(DIST, 'index.html'))) { console.log('floating-cta: dist/ missing (run npm run build first)'); process.exit(1); }
const NUMBER = '380633534065';
const DEFAULT = 'Hello Ukraine Medical Admissions, I found you through ukrainemedicaladmissions.com and would like information about studying medicine in Ukraine. Please advise me on the admissions process.';
const WA_HREF = `https://wa.me/${NUMBER}?text=${encodeURIComponent(DEFAULT)}`;
let checks = 0, failures = 0;
const ok = (cond, msg) => { checks++; if (!cond) { failures++; console.log('FAIL', msg); } };

// ---- Static: every built page ----
const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && files.push(p); } })(DIST);
const routeOf = (f) => { const r = '/' + relative(DIST, f).split(sep).join('/'); return r.endsWith('/index.html') ? r.slice(0, -'index.html'.length) : r; };
for (const f of files) {
  const r = routeOf(f); const html = readFileSync(f, 'utf8');
  const groups = html.match(/<nav\b[^>]*data-floating-cta[^>]*>[\s\S]*?<\/nav>/g) ?? [];
  ok(groups.length === 1, `${r}: exactly one floating action group (found ${groups.length})`);
  const g = groups[0] ?? '';
  const wa = /<a\b([^>]*data-float-wa[^>]*)>([\s\S]*?)<\/a>/.exec(g); const ap = /<a\b([^>]*data-float-apply[^>]*)>([\s\S]*?)<\/a>/.exec(g);
  const attr = (a, n) => ((new RegExp(`\\b${n}="([^"]*)"`).exec(a ?? '') ?? [])[1] ?? '').replace(/&amp;/g, '&');
  ok(!!wa && attr(wa[1], 'href') === WA_HREF && /WhatsApp Us/.test(wa[2]), `${r}: floating WhatsApp Us link to the business number with the default message`);
  ok(!!ap && /Apply Now/.test(ap[2]) && attr(ap[1], 'href') === (r === '/apply/' ? '#apply-form' : '/apply/'), `${r}: floating Apply Now link to ${r === '/apply/' ? '#apply-form' : '/apply/'} (${ap ? attr(ap[1], 'href') : 'missing'})`);
}
const applyHtml = readFileSync(join(DIST, 'apply/index.html'), 'utf8');
ok(/<form\b[^>]*id="apply-form"[^>]*action="\/api\/enquiry\.php"/.test(applyHtml), '/apply/: the application form (id apply-form) posts to /api/enquiry.php');

// ---- Browser ----
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };
const server = createServer((req, res) => {
  let p = join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { res.writeHead(404, { 'content-type': 'text/html' }); return res.end(existsSync(join(DIST, '404.html')) ? readFileSync(join(DIST, '404.html')) : ''); }
  res.writeHead(200, { 'content-type': MIME[extname(p)] ?? 'application/octet-stream' }); res.end(readFileSync(p));
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;
const profile = readdirSync(join(DIST, 'universities')).find((d) => existsSync(join(DIST, 'universities', d, 'index.html')));
const PAGES = ['/', '/universities/', `/universities/${profile}/`, '/courses/', '/courses/medicine/', '/admissions/', '/services/', '/tuition-fees/', '/faq/', '/about/', '/contact/', '/apply/', '/apply/thank-you/', '/privacy/', '/404.html'];
const VIEWPORTS = [[1440, 900], [1280, 800], [768, 1024], [430, 932], [414, 896], [390, 844], [375, 812], [360, 780], [320, 740], [320, 568]];
const SHOTS = new Set(['1280:/', '1280:/universities/', `1280:/universities/${profile}/`, '1280:/apply/', '390:/', '390:/apply/', '320:/', `430:/universities/${profile}/`, '360:/contact/']);

// Everything about the group and what it might cover, measured in the page.
const measure = () => {
  const g = document.querySelector('[data-floating-cta]');
  if (!g) return { missing: true };
  const vw = document.documentElement.clientWidth, vh = innerHeight;
  const box = (el) => { const r = el.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, w: r.width, h: r.height }; };
  const topmost = (el) => { const r = el.getBoundingClientRect(); const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return !!hit && el.contains(hit); };
  const cs = getComputedStyle(g);
  const links = ['[data-float-wa]', '[data-float-apply]'].map((s) => { const a = g.querySelector(s); return a ? { ...box(a), topmost: topmost(a), text: a.textContent.replace(/\s+/g, ' ').trim() } : null; });
  const gb = box(g);
  const hits = (r) => r.w > 0 && r.h > 0 && r.left < gb.right && r.right > gb.left && r.top < gb.bottom && r.bottom > gb.top;
  // Fixed elements, and sticky ones while they are stuck, other than the group itself: they cannot be scrolled out
  // from under it. (A sticky element not yet stuck moves with the page like any other content.)
  const stuck = (el) => { const cs = getComputedStyle(el); if (cs.position === 'fixed') return true; if (cs.position !== 'sticky') return false; const t = parseFloat(cs.top); return !Number.isNaN(t) && Math.abs(el.getBoundingClientRect().top - t) < 1; };
  const sticky = [...document.querySelectorAll('body *')].filter((el) => !g.contains(el) && el !== g && el.offsetParent !== null && stuck(el))
    .filter((el) => hits(box(el))).map((el) => el.className || el.tagName);
  return { gb, display: cs.display, visibility: cs.visibility, opacity: cs.opacity, vw, vh, links, sticky, overflow: document.documentElement.scrollWidth > vw + 1 };
};
const footerUnderGroup = () => {
  const g = document.querySelector('[data-floating-cta]').getBoundingClientRect();
  return [...document.querySelectorAll('footer a, footer p')].filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.left < g.right && r.right > g.left && r.top < g.bottom && r.bottom > g.top; }).map((el) => el.textContent.trim().slice(0, 40));
};

// The site scrolls smoothly (global.css); move instantly and let any scroll settle before measuring.
const scrollToFraction = (page, f) => page.evaluate((x) => window.scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) * x, behavior: 'instant' }), f);
async function settle(page) { let last = -1; for (let i = 0; i < 40; i++) { const y = await page.evaluate(() => scrollY); if (y === last) return; last = y; await page.waitForTimeout(60); } }
const browser = await chromium.launch();
for (const [w, h] of VIEWPORTS) {
  const phone = w < 640;
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: w < 900, hasTouch: w < 900, deviceScaleFactor: 1 });
  for (const path of PAGES) {
    const page = await ctx.newPage();
    const tag = `${w}x${h} ${path}`;
    await page.goto(base + path, { waitUntil: 'load' });
    let missing = false;
    for (const [where, y] of [['top', 0], ['middle', 0.5], ['end', 1]]) {
      await scrollToFraction(page, y); await settle(page);
      const m = await page.evaluate(measure);
      if (m.missing) { ok(false, `${tag}: no floating group`); missing = true; break; }
      ok(m.display !== 'none' && m.visibility === 'visible' && Number(m.opacity) === 1, `${tag} (${where}): group hidden (${m.display}/${m.visibility}/${m.opacity})`);
      const [wa, ap] = m.links;
      for (const [name, l, text] of [['WhatsApp Us', wa, 'WhatsApp Us'], ['Apply Now', ap, 'Apply Now']]) {
        ok(!!l && l.text.includes(text), `${tag} (${where}): ${name} link missing or relabelled (${l?.text})`);
        if (!l) continue;
        ok(l.top >= 0 && l.bottom <= m.vh + 0.5 && l.left >= 0 && l.right <= m.vw + 0.5, `${tag} (${where}): ${name} not fully inside the viewport (${Math.round(l.left)},${Math.round(l.top)}-${Math.round(l.right)},${Math.round(l.bottom)} of ${m.vw}x${m.vh})`);
        ok(l.topmost, `${tag} (${where}): something covers ${name}`);
        ok(l.w >= 44 && l.h >= 44, `${tag}: ${name} smaller than 44 x 44 (${Math.round(l.w)} x ${Math.round(l.h)})`);
      }
      if (phone) ok(Math.abs(m.gb.left) < 1 && Math.abs(m.gb.right - m.vw) < 1 && Math.abs(m.gb.bottom - m.vh) < 1 && wa && ap && Math.abs(wa.top - ap.top) < 1, `${tag} (${where}): not a full-width bottom bar with both actions side by side`);
      else ok(m.vw - m.gb.right <= 40 && m.vh - m.gb.bottom <= 40, `${tag} (${where}): not at the bottom-right`);
      ok(m.sticky.length === 0, `${tag} (${where}): a sticky or fixed element sits under the group: ${m.sticky.join(', ')}`);
      ok(!m.overflow, `${tag} (${where}): horizontal scrolling`);
    }
    if (missing) { await page.close(); continue; }
    // At the end of the page nothing in the footer is left under the group.
    const covered = await page.evaluate(footerUnderGroup);
    ok(covered.length === 0, `${tag}: footer content under the group at the end of the page: ${covered.join(' | ')}`);
    // Form buttons: focusing one brings it into view above the group, not under it.
    if (path === '/contact/' || path === '/apply/') {
      const buttons = await page.$$('form[action="/api/enquiry.php"] button:visible');
      for (const b of buttons) {
        await scrollToFraction(page, 0); await settle(page);
        await b.focus(); await page.waitForTimeout(60); await settle(page);
        const s = await b.evaluate((el) => { const r = el.getBoundingClientRect(); const g = document.querySelector('[data-floating-cta]').getBoundingClientRect(); const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return { text: el.textContent.trim(), clear: r.bottom <= g.top + 0.5 || r.right <= g.left + 0.5 || r.top >= g.bottom - 0.5, hit: !!hit && el.contains(hit) }; });
        ok(s.clear && s.hit, `${tag}: focused form button "${s.text}" is under the floating group`);
      }
    }
    // The open mobile menu ends above the bar: every menu link reachable and uncovered.
    if (w < 900 && path === '/') {
      await scrollToFraction(page, 0); await settle(page);
      await page.click('[data-menu-toggle]');
      const items = await page.$$('#main-menu a');
      for (const a of items) {
        await a.focus();
        const s = await a.evaluate((el) => { const r = el.getBoundingClientRect(); const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return { text: el.textContent.trim(), hit: !!hit && el.contains(hit), inView: r.top >= 0 && r.bottom <= innerHeight }; });
        ok(s.hit && s.inView, `${tag}: open menu item "${s.text}" is covered or out of view`);
      }
      await page.keyboard.press('Escape');
    }
    if (SHOTS.has(`${w}:${path}`)) {
      await scrollToFraction(page, 0.35); await settle(page);
      await page.screenshot({ path: join(OUT, `${w}x${h}${path.replace(/\/$/, '').replace(/\//g, '_') || '_home'}.png`) });
    }
    await page.close();
  }
  await ctx.close();
}
// Keyboard: the ring is visible on both links.
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'load' });
  for (const sel of ['[data-float-wa]', '[data-float-apply]']) {
    await page.focus(sel); await page.keyboard.press('Shift+Tab'); await page.keyboard.press('Tab');
    const f = await page.evaluate((s) => { const a = document.querySelector(s); const cs = getComputedStyle(a); return { focused: document.activeElement === a, ring: cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2 }; }, sel);
    ok(f.focused && f.ring, `keyboard: ${sel} has no visible focus ring when tabbed to`);
  }
  // Destinations: Apply Now opens the real form; WhatsApp Us opens the business chat in a new tab.
  await ctx.route('https://wa.me/**', (r) => r.fulfill({ status: 200, contentType: 'text/plain', body: 'stand-in for wa.me' }));
  await Promise.all([page.waitForURL('**/apply/'), page.click('[data-float-apply]')]);
  ok(await page.$('form#apply-form[action="/api/enquiry.php"]') !== null, 'Apply Now: the destination is the /apply/ page with the application form');
  const [popup] = await Promise.all([page.waitForEvent('popup'), page.click('[data-float-wa]')]);
  await popup.waitForLoadState().catch(() => {});
  ok(popup.url() === WA_HREF, `WhatsApp Us: opens ${WA_HREF.slice(0, 40)}... in a new tab (got ${popup.url().slice(0, 60)})`);
  const before = page.url();
  await page.click('[data-float-apply]'); await page.waitForTimeout(300);
  ok(page.url().startsWith(before.split('#')[0]) && page.url().endsWith('#apply-form'), `on /apply/, Apply Now stays on the page and moves to the form (${page.url()})`);
  await ctx.close();
} catch (e) { ok(false, `keyboard and destination checks could not run: ${e.message.split('\n')[0]}`); }
// Without JavaScript: shown, both links plain links.
for (const [w, h] of [[390, 844], [1280, 800]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(base + '/universities/', { waitUntil: 'load' });
  const m = await page.evaluate(measure);
  ok(!m.missing && m.display !== 'none' && (m.links ?? []).every((l) => l && l.topmost && l.bottom <= m.vh + 0.5), `${w}x${h} without JavaScript: group not shown or covered`);
  if (w === 390) await page.screenshot({ path: join(OUT, '390x844_no-js_universities.png') });
  await ctx.close();
}
await browser.close(); server.close();
console.log(`floating-cta: ${checks} checks, ${failures} failures (screenshots in tests/output/floating-cta/)`);
process.exit(failures ? 1 : 0);
