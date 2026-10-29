// End-to-end applicant journey against the production build, served by PHP's built-in server through
// tests/fixtures/live-router.php (the build's own .htaccess: CSP and security headers, redirects) with the real
// enquiry handler (public/api/enquiry.php) writing to a temporary private directory (e-mail off).
//   Home → directory (search) → research-preview profile → Apply Online (pre-selected university, visible note) →
//   five steps → review shows the university → submit → /apply/thank-you/ (noindex, onward links) → one stored record
//   carrying the chosen university and nothing about the IP key.
// Runs on a phone-sized touch viewport and a desktop viewport. Nothing here states a university fact; the profile page
// is checked NOT to print one. Exit 1 on any failure. Needs dist/ (npm run build) and php.
import { chromium, devices } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const DIST = resolve('dist');
const ROUTER = resolve('tests/fixtures/live-router.php');
if (!existsSync(join(DIST, 'index.html'))) { console.log('journey: dist/ missing (run npm run build first)'); process.exit(1); }
const priv = mkdtempSync(join(tmpdir(), 'uma-journey-'));
writeFileSync(join(priv, 'config.php'), "<?php return ['send_mail' => false, 'ip_hash_key' => 'journey-only-key', 'max_per_hour' => 1000, 'per_ip_per_hour' => 1000];\n");
const port = 4300 + Math.floor(Math.random() * 500);
const php = spawn('php', ['-d', 'display_errors=1', '-d', 'error_reporting=-1', '-d', 'expose_php=0', '-S', `127.0.0.1:${port}`, '-t', DIST, ROUTER], { env: { ...process.env, UMA_PRIVATE_DIR: priv }, stdio: ['ignore', 'pipe', 'pipe'] });
let phpLog = ''; php.stdout.on('data', (d) => { phpLog += d; }); php.stderr.on('data', (d) => { phpLog += d; });
const base = `http://127.0.0.1:${port}`;
let up = false;
for (let i = 0; i < 40 && !up; i++) { await new Promise((r) => setTimeout(r, 250)); try { up = (await fetch(base + '/')).ok; } catch {} }
if (!up) { console.log('FAIL php -S did not start', phpLog); console.log('journey: 0 checks, 1 failures'); php.kill(); process.exit(1); }

let checks = 0, failures = 0;
const ok = (cond, msg) => { checks++; if (!cond) { failures++; console.log('FAIL', msg); } };

// 0. Search engines: robots.txt and both sitemap files are served the same way to Googlebot as to a browser, with a
// 200, an XML or text type, well-formed content and the production host in every URL (no user-agent rule anywhere).
for (const ua of ['Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'Mozilla/5.0 (X11; Linux x86_64) Chrome/130.0 Safari/537.36']) {
  const bot = /Googlebot/.test(ua) ? 'Googlebot' : 'browser';
  const r = await fetch(base + '/robots.txt', { headers: { 'user-agent': ua }, redirect: 'manual' });
  const robots = await r.text();
  ok(r.status === 200 && /text\/plain/.test(r.headers.get('content-type') ?? '') && /^Sitemap: https:\/\/ukrainemedicaladmissions\.com\/sitemap-index\.xml$/m.test(robots) && !/^Disallow: \/$/m.test(robots), `${bot}: robots.txt (${r.status}, ${r.headers.get('content-type')})`);
  for (const f of ['/sitemap-index.xml', '/sitemap-0.xml']) {
    const x = await fetch(base + f, { headers: { 'user-agent': ua }, redirect: 'manual' });
    const xml = await x.text();
    ok(x.status === 200, `${bot}: ${f} answers ${x.status}`);
    ok(/^(application|text)\/xml/.test(x.headers.get('content-type') ?? ''), `${bot}: ${f} content-type ${x.headers.get('content-type')}`);
    ok(/^<\?xml version="1\.0" encoding="UTF-8"\?>/.test(xml) && /<\/(sitemapindex|urlset)>\s*$/.test(xml) && xml.charCodeAt(0) !== 0xfeff, `${bot}: ${f} is not well-formed sitemap XML`);
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    ok(locs.length > 0 && locs.every((u) => u.startsWith('https://ukrainemedicaladmissions.com/')), `${bot}: ${f} lists a URL off the production host`);
  }
}
const browser = await chromium.launch();
const SLUG = 'kyiv-medical-university';
for (const [label, ctxOpts] of [['mobile', { ...devices['iPhone 13'] }], ['desktop', { viewport: { width: 1440, height: 900 } }]]) {
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

  // 1. Home → directory through the navigation (the mobile menu first on a phone).
  await page.goto(base + '/', { waitUntil: 'load' });
  if (label === 'mobile') { const toggle = page.locator('header button[aria-expanded]').first(); if (await toggle.count()) await toggle.click(); }
  await page.locator('a[href="/universities/"]:visible').first().click();
  await page.waitForURL('**/universities/');
  const cards = await page.$$eval('[data-list] article', (a) => a.map((x) => x.dataset.slug ?? ''));
  const expected = readdirSync(resolve('src/content/universities')).filter((f) => f.endsWith('.json')).length;
  ok(cards.length === expected, `${label}: directory lists ${cards.length} universities, records ${expected}`);
  ok(new Set(cards).size === cards.length, `${label}: directory lists a university twice`);

  // 2. Search, then open the profile from its card.
  await page.fill('[data-search]', 'kyiv medical');
  const shown = await page.$$eval('[data-list] article:not([hidden])', (a) => a.map((x) => x.dataset.slug));
  ok(shown.includes(SLUG), `${label}: search "kyiv medical" does not show ${SLUG} (${shown.join(', ')})`);
  await page.click(`article[data-slug="${SLUG}"] a.more`);
  await page.waitForURL(`**/universities/${SLUG}/`);
  ok((await page.textContent('h1'))?.trim() === 'Kyiv Medical University', `${label}: profile heading`);
  const mainText = (await page.evaluate(() => { const m = document.querySelector('main')?.cloneNode(true); m?.querySelector('[data-reported]')?.remove(); return m?.textContent ?? ''; }));
  ok(!/€|\$|USD|per year|per semester|www\.|https?:\/\//.test(mainText), `${label}: research-preview profile prints a fee or web address outside the reported block`);
  const reportedText = (await page.textContent('[data-reported]')) ?? '';
  ok(/not yet verified/i.test(reportedText) && !/€|\$|USD|per year|per semester/.test(reportedText), `${label}: reported block is labelled and prints no fee`);
  ok((await page.$$eval('[data-reported] a[href^="http"]', (a) => a.every((x) => x.rel.includes('nofollow')))), `${label}: an external link in the reported block lacks rel=nofollow`);
  ok(/noindex/.test(await page.$eval('meta[name="robots"]', (m) => m.content)), `${label}: research-preview profile is not noindex`);

  // 3. Profile → Apply Online with the university pre-selected and said so.
  await page.click('main a[href^="/apply/?university="]');
  await page.waitForURL(`**/apply/?university=${SLUG}`);
  // The handler treats a form sent less than 3 seconds after the page opened as a bot (enquiry.php MIN_ELAPSED_MS):
  // keep a human pace so the stored-record checks below are not timing-dependent.
  const applyOpened = Date.now();
  ok((await page.inputValue('[name="university"]')) === SLUG, `${label}: university not pre-selected on /apply/`);
  ok((await page.inputValue('[name="university2"]')) === '' && (await page.inputValue('[name="university3"]')) === '', `${label}: second or third choice touched`);
  ok(await page.isVisible('[data-prefill-note]'), `${label}: pre-selection note not visible`);
  ok(/Kyiv Medical University/.test((await page.textContent('[data-prefill-note]')) ?? ''), `${label}: pre-selection note does not name the university`);

  // 4. The five steps, with the minimum required, to the review.
  await page.selectOption('#f-course', 'medicine'); await page.click('#step-1 [data-next]');
  await page.fill('#f-qual-year', '2025'); await page.click('#step-2 [data-next]');
  await page.click('#step-3 [data-next]');
  await page.fill('#f-name', 'Journey Candidate'); await page.fill('#f-email', 'journey.candidate@example.invalid'); await page.check('#f-consent'); await page.click('#step-4 [data-next]');
  const review = (await page.textContent('[data-review-summary]')) ?? '';
  ok(review.includes('Kyiv Medical University (not yet verified)'), `${label}: review does not show the chosen university with its label`);
  ok(review.includes('Medicine'), `${label}: review does not show the field of study`);
  ok(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)), `${label}: horizontal overflow on the review step`);

  // 5. Submit through the real handler → thank-you page.
  const wait = 3600 - (Date.now() - applyOpened);
  if (wait > 0) await page.waitForTimeout(wait);
  await Promise.all([page.waitForURL('**/apply/thank-you/**'), page.click('[data-submit]')]);
  const thanks = (await page.textContent('main')) ?? '';
  ok(/received|thank/i.test(thanks), `${label}: thank-you page text`);
  ok(/noindex/.test(await page.$eval('meta[name="robots"]', (m) => m.content)), `${label}: thank-you page is not noindex`);
  const onward = await page.$$eval('main a', (a) => a.map((x) => x.getAttribute('href') ?? ''));
  ok(onward.includes('/universities/'), `${label}: thank-you page has no link back to the directory`);
  ok(!/dashboard|track your application|status view|upload (?:securely|your documents)|secure uploads?/i.test(thanks), `${label}: thank-you page promises a dashboard, tracking or uploads`);
  ok(errors.length === 0, `${label}: browser errors: ${errors.join(' | ')}`);
  await ctx.close();
}
// 6. Every form that posts to the handler sends the hidden fields the handler requires (present, enabled, not inside a
// disabled fieldset); the contact form works without JavaScript through the real handler.
for (const path of ['/contact/', '/apply/']) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: 'load' });
  const forms = await page.$$eval('form', (fs) => fs.filter((f) => f.getAttribute('action') === '/api/enquiry.php').map((f) => ['website', 'ts'].map((n) => {
    const el = f.querySelector(`input[name="${n}"]`);
    return !!el && !el.disabled && !el.closest('fieldset[disabled]');
  })));
  ok(forms.length === 1 && forms.every((f) => f.every(Boolean)), `${path}: the form posting to the handler lacks an enabled website or ts field: ${JSON.stringify(forms)}`);
  await ctx.close();
}
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(base + '/contact/', { waitUntil: 'load' });
  const form = 'form[action="/api/enquiry.php"]';
  await page.fill(`${form} input[name="name"]`, 'Journey Enquirer');
  await page.fill(`${form} input[name="email"]`, 'journey.enquirer@example.invalid');
  await page.fill(`${form} textarea[name="message"]`, 'A synthetic question sent without JavaScript.');
  // Tick consent from the keyboard: the label holds a link to /privacy/, and a pointer click could land on it.
  await page.focus(`${form} input[name="consent"]`);
  await page.keyboard.press('Space');
  ok(await page.isChecked(`${form} input[name="consent"]`), 'contact form without JavaScript: consent box not ticked');
  // Submit from the keyboard too (a pointer click with scripts off stalls the automation, not the page).
  await page.focus(`${form} button[type="submit"]`);
  await Promise.all([page.waitForURL('**/apply/thank-you/**', { waitUntil: 'domcontentloaded' }), page.keyboard.press('Enter')]);
  ok(/received|thank/i.test((await page.textContent('main')) ?? ''), 'contact form without JavaScript: no thank-you page');
  await ctx.close();
}
await browser.close();
php.kill();

// 7. Stored records: one per submission, carrying the chosen university; nothing about the IP key; no e-mail sent.
const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (f.endsWith('.json')) files.push(p); } })(priv);
const records = files.map((p) => JSON.parse(readFileSync(p, 'utf8'))).filter((r) => r && r.type === 'application-start');
ok(records.length === 2, `stored submissions: ${records.length}, expected 2 (one per viewport)`);
for (const r of records) {
  ok(r.university === SLUG, `stored record carries university ${JSON.stringify(r.university)}`);
  ok(r.course === 'medicine', `stored record carries course ${JSON.stringify(r.course)}`);
  ok(!JSON.stringify(r).includes('journey-only-key'), 'stored record leaks the IP hash key');
  ok(r.consent === true || r.consent === 'yes', `stored record consent ${JSON.stringify(r.consent)}`);
}
const enquiries = files.map((p) => JSON.parse(readFileSync(p, 'utf8'))).filter((r) => r && r.type === 'enquiry');
ok(enquiries.length === 1 && enquiries[0].name === 'Journey Enquirer' && enquiries[0].message === 'A synthetic question sent without JavaScript.', `contact form without JavaScript: stored enquiries ${enquiries.length}, expected 1`);
ok(!/dropped a post without the form's hidden fields/.test(phpLog), 'a real form submission was dropped as missing its hidden fields');
ok(!/Warning|Fatal|Notice|Deprecated/.test(phpLog), `PHP log: ${phpLog.slice(0, 300)}`);
rmSync(priv, { recursive: true, force: true });
console.log(`journey: ${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);
