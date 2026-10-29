// UI smoke test with Playwright against a static preview of dist/.
// Checks: pages render without console errors, nav + primary CTA present, mobile menu toggles,
// directory filter works, apply form validates client-side, WhatsApp only through the business link (owner decision
// 2026-10-29; tests/whatsapp.mjs checks the messages), screenshots at 3 widths.
import { chromium } from 'playwright';
// Any WhatsApp link other than the business number with a pre-filled text (no other number, scheme or parameter).
const waBad = (h) => [...h.matchAll(/(?:https?:\/\/(?:wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)\/[^"'\s<>]*|whatsapp:\/\/[^"'\s<>]*)/gi)].map((m) => m[0]).filter((u) => !/^https:\/\/wa\.me\/380633534065\?text=[^&"'\s<>]+$/.test(u.replace(/&amp;/g, '&')));
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
    if (waBad(html).length) fail(`${name} ${path} WhatsApp link other than the business link: ${waBad(html).join(', ')}`);
    if (!path.includes('404') && !(await page.$('header a.btn-primary, header .btn-primary'))) fail(`${name} ${path} header CTA missing`);
    const hScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (hScroll) fail(`${name} ${path} horizontal overflow`);
    if (name === 'mobile' && path === '/') {
      await page.click('[data-menu-toggle]');
      if ((await page.getAttribute('[data-menu-toggle]', 'aria-expanded')) !== 'true') fail('mobile menu did not open');
      const links = await page.$$eval('[data-menu] a', (as) => as.filter((a) => a.offsetParent !== null).length);
      if (links < 6) fail(`mobile menu shows ${links} links`);
    }
    if (name === 'desktop' && path === '/') {
      // Home page (2026-10-25): a featured group of research previews and counted links into the directory by reported
      // type, never the whole directory; every featured name links to its profile; the explainer carries both labels.
      const featured = await page.$$eval('.featured-list li a[href^="/universities/"]', (a) => a.map((x) => x.getAttribute('href')));
      const directoryCards = await page.$$eval('[data-list] article', (a) => a.length).catch(() => 0);
      if (!featured.length) fail('home: no featured universities');
      if (featured.length > 15) fail(`home: ${featured.length} featured universities (the home page must feature a selection, not the whole directory)`);
      if (directoryCards) fail('home: the full directory list is rendered on the home page');
      const typeLinks = await page.$$eval('.browse-list a[href^="/universities/?type="]', (a) => a.map((x) => x.getAttribute('href')));
      if (typeLinks.length < 3) fail(`home: only ${typeLinks.length} browse-by-type links`);
      const text = (await page.textContent('main')) ?? '';
      for (const t of ['Reported in public sources', 'Verified on an official source', 'How we verify']) if (!text.includes(t)) fail(`home: explainer text "${t}" missing`);
      if (!(await page.$(`a.btn[href="/universities/"]`))) fail('home: no directory button');
    }
    if (name === 'desktop' && path === '/universities/') {
      // Deep links from the home and course pages pre-apply a filter; an unknown value is ignored.
      const typeOpt = await page.$eval('select[name="type"] option:nth-child(2)', (o) => o.value).catch(() => null);
      if (typeOpt) {
        await page.goto(base + `/universities/?type=${typeOpt}`, { waitUntil: 'load' });
        const shown = await page.$$eval('[data-list] article:not([hidden])', (a) => a.map((el) => el.dataset.type));
        if (!shown.length || shown.some((t) => t !== typeOpt)) fail(`directory: ?type=${typeOpt} did not filter to that type (${shown.length} shown)`);
        if ((await page.inputValue('select[name="type"]')) !== typeOpt) fail('directory: the type select does not reflect the deep link');
        await page.goto(base + '/universities/?rfield=medicine', { waitUntil: 'load' });
        const med = await page.$$eval('[data-list] article:not([hidden])', (a) => a.map((el) => (el.dataset.rfields ?? '').split(' ')));
        if (!med.length || med.some((f) => !f.includes('medicine'))) fail('directory: ?rfield=medicine did not filter to universities reporting medicine');
        await page.goto(base + '/universities/?type=no-such-type&rfield=zzz', { waitUntil: 'load' });
        if ((await page.$$eval('[data-list] article:not([hidden])', (a) => a.length)) !== (await page.$$eval('[data-list] article', (a) => a.length))) fail('directory: an unknown deep-link value hid cards');
        await page.goto(base + '/universities/', { waitUntil: 'load' });
      }
      // Data-driven: the directory lists published profiles and, since N25, research previews ("not yet verified"), so
      // expectations are derived from the cards' own data attributes instead of hard-coding a university.
      const total = await page.$$eval('[data-list] article', (a) => a.length);
      const visible = () => page.$$eval('[data-list] article', (a) => a.filter((el) => el.offsetParent !== null).length);
      const count = Number(await page.textContent('[data-count]'));
      if (count !== total) fail(`directory count ${count} ≠ ${total} cards`);
      const previews = await page.$$eval('[data-list] article[data-status="preview"]', (a) => a.map((el) => ({ name: el.dataset.name ?? '', facts: ['city', 'fields', 'levels', 'languages', 'intakes', 'prep'].filter((k) => k in el.dataset), extra: Object.keys(el.dataset).filter((k) => !['slug', 'status', 'name', 'kind', 'type', 'rcity', 'rfields'].includes(k) && !k.startsWith('astroCid')), reported: el.querySelector('.rep')?.textContent ?? '' })));
      for (const p of previews) if (p.facts.length) fail(`directory: not-yet-verified card "${p.name}" carries fact attributes ${p.facts.join(', ')}`);
      for (const p of previews) if (p.extra.length) fail(`directory: not-yet-verified card "${p.name}" carries unexpected attributes ${p.extra.join(', ')}`);
      for (const p of previews) if (p.reported && !/^Reported/.test(p.reported.trim())) fail(`directory: card "${p.name}" prints a lead without the word Reported: ${p.reported.slice(0, 60)}`);
      // Every not-yet-verified card says so, has exactly one link (to its own profile), and the page says the card details are reported.
      const cardChecks = await page.$$eval('[data-list] article[data-status="preview"]', (a) => a.map((el) => ({ slug: el.dataset.slug, status: el.querySelector('.status')?.textContent ?? '', links: [...el.querySelectorAll('a')].map((x) => x.getAttribute('href')) })));
      for (const c of cardChecks) {
        if (!/Not yet verified/.test(c.status)) fail(`directory: card ${c.slug} lacks its "Not yet verified" status`);
        if (c.links.length !== 1 || c.links[0] !== `/universities/${c.slug}/`) fail(`directory: card ${c.slug} links ${JSON.stringify(c.links)} (expected one link to its profile)`);
      }
      if (!/as reported in public sources/.test((await page.textContent('[data-filters]')) ?? '')) fail('directory: the finder does not say the filters use reported details');
      // The "as reported" filters narrow the previews and Clear restores them.
      if (previews.length > 1 && (await page.$('select[name="rcity"]'))) {
        const city = await page.$eval('select[name="rcity"] option:nth-child(2)', (o) => o.value);
        await page.selectOption('select[name="rcity"]', city);
        const shown = await page.$$eval('[data-list] article:not([hidden])', (a) => a.map((el) => el.dataset.rcity));
        if (!shown.length || shown.some((c) => c !== city)) fail(`directory: city filter "${city}" shows ${shown.length} cards, not all from that city`);
        await page.click('[data-reset]'); await page.waitForTimeout(50);
        if ((await visible()) !== total) fail('directory: Clear after the city filter did not restore every card');
      }
      if (total === 0) {
        if (!(await page.$('[data-empty-state]'))) fail('directory empty state missing with zero universities');
        if (await page.$('[data-list] a[href^="/universities/"]')) fail('directory lists a profile link with zero universities');
      } else {
        // Name search: a word from the first card, a spelling variant, and a query that matches nothing.
        const names = await page.$$eval('[data-list] article', (a) => a.map((el) => el.dataset.name ?? ''));
        const word = (names[0].split(/\s+/).find((w) => w.length > 5) ?? names[0]).replace(/[^a-z-]/g, '');
        await page.fill('[data-search]', word.toUpperCase());
        const expected = names.filter((n) => n.includes(word.toLowerCase())).length;
        if ((await visible()) !== expected || Number(await page.textContent('[data-count]')) !== expected) fail(`directory search "${word}": shows ${await visible()}, expected ${expected}`);
        if (names.some((n) => n.includes('odesa'))) {
          await page.fill('[data-search]', 'Odessa');
          if ((await visible()) !== names.filter((n) => n.includes('odesa')).length) fail('directory search: the spelling "Odessa" does not find Odesa');
        }
        // Separate institutions with similar names (src/lib/name-search.mjs): a look-alike name shows the nearest names under
        // a caution, an exact name shows no caution.
        const caution = () => page.$eval('[data-near-match]', (el) => !el.hidden);
        if (names.some((n) => n.includes('kharkiv national medical'))) {
          await page.fill('[data-search]', 'Kharkiv National University');
          if (!(await caution()) || (await visible()) === 0) fail('directory search: "Kharkiv National University" (a different institution) is not shown under the caution');
          await page.fill('[data-search]', 'Kharkiv National Medical University');
          if ((await caution()) || (await visible()) !== 1) fail('directory search: the exact name "Kharkiv National Medical University" is not a plain single match');
        }
        if (names.some((n) => n.includes('cherkasy'))) {
          await page.fill('[data-search]', 'Cherkassy');
          if ((await visible()) !== names.filter((n) => n.includes('cherkasy')).length) fail('directory search: the spelling "Cherkassy" does not find Cherkasy');
        }
        // Type filter (grouping by name): each option shows exactly the cards of that kind.
        if (await page.$('[data-filter="kind"]')) {
          await page.fill('[data-search]', '');
          for (const kind of ['medical', 'other']) {
            await page.selectOption('[data-filter="kind"]', kind);
            const predicted = await page.$$eval('[data-list] article', (a, k) => a.filter((el) => el.dataset.kind === k).length, kind);
            if ((await visible()) !== predicted || Number(await page.textContent('[data-count]')) !== predicted) fail(`directory type filter "${kind}": shows ${await visible()}, expected ${predicted}`);
          }
          await page.selectOption('[data-filter="kind"]', '');
        }
        await page.fill('[data-search]', 'zzqx university');
        if ((await visible()) !== 0 || (await page.textContent('[data-count]')) !== '0') fail('directory search for a non-existent name still shows cards');
        if (await page.$eval('[data-no-match]', (el) => el.hidden)) fail('directory: no-match message hidden with zero results');
        if (await caution()) fail('directory: the similar-name caution is shown with zero results');
        if ((await page.$$eval('[data-tier]', (t) => t.filter((x) => !x.hidden).length)) !== 0) fail('directory: an empty tier heading is still shown');
        await page.click('[data-reset]');
        await page.waitForTimeout(50);
        if ((await visible()) !== total) fail('directory: Clear did not restore every card');
        const fields = await page.$$eval('[data-filter="field"] option', (o) => o.map((x) => x.value).filter(Boolean));
        for (const f of fields.slice(0, 2)) {
          await page.selectOption('[data-filter="field"]', f);
          const predicted = await page.$$eval('[data-list] article', (a, f) => a.filter((el) => (el.dataset.fields ?? '').split(' ').includes(f)).length, f);
          if (Number(await page.textContent('[data-count]')) !== predicted) fail(`directory filter field=${f} count mismatch`);
          await page.selectOption('[data-filter="field"]', '');
        }
        // A city combined with a language none of its cards offers must show the no-match message (when such a pair exists).
        const cards = await page.$$eval('[data-list] article[data-city]', (a) => a.map((el) => ({ city: el.dataset.city, langs: (el.dataset.languages ?? '').split(' ') })));
        const langs = await page.$$eval('[data-filter="language"] option', (o) => o.map((x) => x.value).filter(Boolean));
        const pair = cards.flatMap((c) => langs.filter((l) => !cards.some((x) => x.city === c.city && x.langs.includes(l))).map((l) => [c.city, l]))[0];
        if (pair) {
          await page.selectOption('[data-filter="city"]', pair[0]); await page.selectOption('[data-filter="language"]', pair[1]);
          if ((await page.textContent('[data-count]')) !== '0') fail(`directory filter ${pair.join('+')} should yield 0`);
          if (await page.$eval('[data-no-match]', (el) => el.hidden)) fail('no-match message not shown');
        }
      }
    }
    if (path === '/apply/') {
      // Stepped candidate-profile form (APPLICATION_SYSTEM_SPEC.md §12.1). The walk runs at every width (overflow is
      // checked on each step); prefill, keyboard, no-JavaScript and CSP checks run once, at desktop width.
      const A = `${name} apply`;
      const visibleSteps = () => page.$$eval('fieldset[data-step]', (fs) => fs.map((f, i) => (f.hidden ? -1 : i + 1)).filter((i) => i > 0).join(','));
      const current = () => page.$$eval('[data-progress-item]', (li) => li.findIndex((x) => x.getAttribute('aria-current') === 'step') + 1);
      const focused = () => page.evaluate(() => document.activeElement?.id || document.activeElement?.getAttribute('data-error-summary') !== null && 'error-summary' || document.activeElement?.tagName);
      const summaryShown = () => page.$eval('[data-error-summary]', (el) => !el.hidden);
      const overflow = async (label) => { if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)) fail(`${A} ${label}: horizontal overflow`); };
      const shot = (label) => page.screenshot({ path: join(OUT, `${name}_apply_${label}.png`), fullPage: true });
      let posted = 0; page.on('request', (r) => { if (r.url().includes('/api/enquiry.php')) posted++; });

      // Prefill uses whichever universities the publication gate lets through (published profiles first, then the
      // research previews inside optgroups); with none, an unknown slug must be ignored. The chosen university is also
      // selected during the walk below so the review step must show its label.
      const slugs = await page.$$eval('[name="university"] option', (o) => o.map((x) => x.value).filter((v) => v && v !== 'unlisted'));
      const previewSlugs = await page.$$eval('[name="university"] optgroup option', (o) => o.map((x) => x.value));
      const uni = slugs[0] ?? '';
      const uniLabel = uni ? (await page.$eval(`[name="university"] option[value="${uni}"]`, (o) => o.textContent?.replace(/\s+/g, ' ').trim() ?? '')) : '';
      if (name === 'desktop') {
        const noteShown = () => page.$eval('[data-prefill-note]', (el) => !el.hidden);
        const noteText = () => page.$eval('[data-prefill-note]', (el) => el.textContent ?? '');
        await page.goto(base + `/apply/?course=medicine&university=${uni || 'not-a-listed-university'}`, { waitUntil: 'load' });
        if ((await page.inputValue('[name="course"]')) !== 'medicine') fail('apply prefill course');
        if ((await page.inputValue('[name="university"]')) !== uni) fail('apply prefill university');
        if ((await page.inputValue('[name="university2"]')) !== '' || (await page.inputValue('[name="university3"]')) !== '') fail('apply prefill touched the second or third university choice');
        if (!(await noteShown())) fail('apply prefill: the step-1 note is not shown');
        const note = await noteText();
        if (!note.includes('field of study “Medicine”')) fail(`apply prefill note does not name the field of study: ${note}`);
        if (uni && !note.includes(`first-choice university “${uniLabel}”`)) fail(`apply prefill note does not name the university "${uniLabel}": ${note}`);
        if (!uni && /university/.test(note)) fail(`apply prefill note names a university although none is listed: ${note}`);
        // A research preview (optgroup option, "not yet verified") prefills like any other listed option, from a
        // profile page's "Apply Online Now" link.
        if (previewSlugs.length) {
          const pv = previewSlugs[previewSlugs.length - 1];
          const pvLabel = await page.$eval(`[name="university"] option[value="${pv}"]`, (o) => o.textContent?.replace(/\s+/g, ' ').trim() ?? '');
          await page.goto(base + `/apply/?university=${pv}`, { waitUntil: 'load' });
          if ((await page.inputValue('[name="university"]')) !== pv) fail(`apply prefill of a research preview (${pv})`);
          if ((await page.inputValue('[name="course"]')) !== '') fail('apply prefill set a field of study that was not in the link');
          if (!/not yet verified/i.test(pvLabel)) fail(`research-preview option "${pvLabel}" is not labelled not yet verified`);
          const n = await noteText();
          if (!(await noteShown()) || !n.includes(`“${pvLabel}”`) || /field of study/.test(n)) fail(`apply prefill note for a research preview: ${n}`);
        }
        // Unknown, unsafe or empty values are ignored: nothing selected, no note, no script error (pageerror is collected).
        for (const qs of ['university=not-a-listed-university&course=zzz', 'university=%3Cscript%3Ealert(1)%3C%2Fscript%3E&course=%22%3E%3Cimg%20src%3Dx%3E', 'university=..%2F..%2Fetc%2Fpasswd', 'university=&course=', 'university=' + 'a'.repeat(300)]) {
          await page.goto(base + `/apply/?${qs}`, { waitUntil: 'load' });
          if ((await page.inputValue('[name="university"]')) !== '' || (await page.inputValue('[name="course"]')) !== '') fail(`apply prefill accepted an unlisted value (?${qs.slice(0, 40)})`);
          if (await noteShown()) fail(`apply prefill note shown for an unlisted value (?${qs.slice(0, 40)})`);
        }
        await page.goto(base + '/apply/?course=public_health', { waitUntil: 'load' });
        if ((await page.inputValue('[name="course"]')) !== 'public_health') fail('apply prefill of an underscored field key (programme cards)');
        await page.goto(base + '/apply/', { waitUntil: 'load' });
      }

      // Step 1: only one step visible, progress marks it; Continue with no field of study is blocked.
      if ((await visibleSteps()) !== '1') fail(`${A}: with JavaScript only step 1 should be visible (visible: ${await visibleSteps()})`);
      if ((await current()) !== 1) fail(`${A}: progress does not mark step 1 with aria-current="step"`);
      await shot('step1');
      await page.click('#step-1 [data-next]');
      if (!(await summaryShown())) fail(`${A}: Continue without a field of study shows no error summary`);
      if ((await visibleSteps()) !== '1') fail(`${A}: moved past step 1 without a field of study`);
      if ((await page.getAttribute('#f-course', 'aria-invalid')) !== 'true') fail(`${A}: field of study not marked aria-invalid`);
      if (!(await page.$('[data-error-summary] a[href="#f-course"]'))) fail(`${A}: error summary does not link to the field of study`);
      if ((await focused()) !== 'error-summary') fail(`${A}: focus not moved to the error summary (on ${await focused()})`);
      await page.click('[data-error-summary] a[href="#f-course"]');
      if ((await focused()) !== 'f-course') fail(`${A}: error summary link does not focus the field`);
      await shot('step1-error');

      // Choose medicine -> step 2, focus on the step heading, summary cleared.
      await page.selectOption('#f-course', 'medicine');
      if (uni) await page.selectOption('[name="university"]', uni);
      if ((await page.getAttribute('#f-course', 'aria-invalid')) === 'true') fail(`${A}: field still flagged after it was corrected`);
      await page.click('#step-1 [data-next]');
      if ((await visibleSteps()) !== '2') fail(`${A}: choosing medicine did not move to step 2`);
      if ((await current()) !== 2) fail(`${A}: progress does not mark step 2`);
      if ((await focused()) !== 'step-2-title') fail(`${A}: focus not on the step 2 heading (on ${await focused()})`);
      if (await summaryShown()) fail(`${A}: error summary still shown on step 2`);
      await overflow('step 2');
      // An invalid year blocks step 2; nothing else on it is required.
      await page.fill('#f-qual-year', '20x5');
      await page.click('#step-2 [data-next]');
      if ((await visibleSteps()) !== '2' || !(await summaryShown())) fail(`${A}: an invalid year did not block step 2`);
      await page.fill('#f-qual-year', '2025');
      await page.fill('#f-subject-0-name', 'Biology'); await page.fill('#f-subject-0-grade', 'B'); await page.selectOption('#f-subject-0-status', 'predicted');
      await shot('step2');
      await page.click('#step-2 [data-next]');
      if ((await visibleSteps()) !== '3') fail(`${A}: did not reach step 3`);
      await overflow('step 3');
      if (!/no file is uploaded/i.test(await page.textContent('#step-3'))) fail(`${A}: documents step does not say that no file is uploaded`);
      if ((await page.$$('#step-3 fieldset.doc')).length !== 10) fail(`${A}: documents step should list ten document types`);
      await page.check('input[name="documents[passport]"][value="have"]');
      await shot('step3');
      // Back and forward keep answers.
      await page.click('#step-3 [data-back]');
      if ((await visibleSteps()) !== '2' || (await page.inputValue('#f-subject-0-name')) !== 'Biology') fail(`${A}: Back did not return to step 2 with answers kept`);
      await page.click('#step-2 [data-next]');
      await page.click('#step-3 [data-next]');
      if ((await visibleSteps()) !== '4') fail(`${A}: did not reach step 4`);
      await overflow('step 4');
      // Step 4: name, email and consent are required; submitting without consent is blocked.
      await page.fill('#f-name', 'Synthetic Candidate'); await page.fill('#f-email', 'synthetic.candidate@example.invalid');
      await page.click('#step-4 [data-next]');
      if ((await visibleSteps()) !== '4') fail(`${A}: moved past step 4 without consent`);
      if (!(await page.$('[data-error-summary] a[href="#f-consent"]'))) fail(`${A}: error summary does not link to the consent box`);
      await shot('step4-error');
      await page.check('#f-consent');
      await page.click('#step-4 [data-next]');
      if ((await visibleSteps()) !== '5') fail(`${A}: did not reach the review step`);
      if ((await current()) !== 5) fail(`${A}: progress does not mark step 5`);
      await overflow('review');
      // Review: read-only summary of what was entered, with Edit links.
      const reviewText = (await page.textContent('[data-review-summary]')) ?? '';
      for (const expected of ['Medicine', ...(uni ? [uniLabel] : []), 'Biology', 'Predicted', 'Passport', 'I have it', 'Synthetic Candidate', 'synthetic.candidate@example.invalid']) {
        if (!reviewText.includes(expected)) fail(`${A}: review summary does not show "${expected}"`);
      }
      if ((await page.$$('[data-review-summary] input, [data-review-summary] select, [data-review-summary] textarea')).length) fail(`${A}: review summary is not read-only`);
      if ((await page.$$('[data-review-summary] a[data-goto]')).length !== 4) fail(`${A}: review should have an Edit link for each of the four steps`);
      if ((await page.textContent('[data-submit]'))?.replace(/[→\s]+$/, '').trim() !== 'Apply Online Now') fail(`${A}: final button text is not "Apply Online Now"`);
      await shot('step5-review');
      // Edit returns to the step and offers a way straight back to the review.
      await page.click('[data-review-summary] a[data-goto="0"]');
      if ((await visibleSteps()) !== '1') fail(`${A}: Edit did not open step 1`);
      if ((await page.textContent('#step-1 [data-next]'))?.trim() !== 'Return to review') fail(`${A}: Continue does not offer "Return to review" after Edit`);
      await page.click('#step-1 [data-next]');
      if ((await visibleSteps()) !== '5') fail(`${A}: "Return to review" did not return to the review`);
      // Safety net: if consent is cleared, the final submit is blocked and step 4 is shown again.
      await page.$eval('#f-consent', (el) => { el.checked = false; });
      await page.click('[data-submit]');
      await page.waitForTimeout(150);
      if (posted) fail(`${A}: form was submitted without consent`);
      if ((await visibleSteps()) !== '4' || !(await summaryShown())) fail(`${A}: submit without consent did not return to step 4 with the error summary`);
      if (!page.url().includes('/apply/')) fail(`${A}: left the page despite missing consent`);

      if (name === 'desktop') {
        // A complete submit posts every step's answers plus the timing field (the handler itself is tested by enquiry-php.mjs).
        let body = '';
        await page.route('**/api/enquiry.php', (route) => { body = route.request().postData() ?? ''; route.fulfill({ status: 200, contentType: 'text/plain', body: 'ok' }); });
        await page.check('#f-consent');
        await page.click('#step-4 [data-next]');
        await Promise.all([page.waitForURL('**/api/enquiry.php'), page.click('[data-submit]')]);
        const sent = new URLSearchParams(body);
        for (const [k, v] of [['type', 'application-start'], ['course', 'medicine'], ['subjects[0][name]', 'Biology'], ['subjects[0][status]', 'predicted'], ['documents[passport]', 'have'], ['qual_year', '2025'], ['consent', 'yes'], ['website', '']]) {
          if (sent.get(k) !== v) fail(`apply submit: ${k} posted as ${JSON.stringify(sent.get(k))}, expected ${JSON.stringify(v)}`);
        }
        if (!/^\d+$/.test(sent.get('ts') ?? '')) fail(`apply submit: timing field ts not set (${sent.get('ts')})`);

        // Keyboard order (APPLICATION_SYSTEM_SPEC.md §12.1): pressing Tab moves through the current step only, in page
        // order, with a visible focus outline on every stop, and ends on Continue (then Back from step 2 on).
        const tabWalk = async (step, label) => {
          // Expected stops: every visible, focusable control of the step after the current focus, in page order
          // (one stop per radio group: its checked radio, else its first).
          const expected = await page.evaluate((sel) => {
            const all = [...document.querySelectorAll('*')]; const root = document.querySelector(sel); const start = all.indexOf(document.activeElement);
            const groups = new Set(); const out = [];
            for (const el of root.querySelectorAll('a[href], button, input, select, textarea')) {
              if (el.tabIndex < 0 || el.disabled || el.type === 'hidden' || !el.getClientRects().length) continue;
              if (el.type === 'radio') {
                if (groups.has(el.name)) continue;
                groups.add(el.name);
                out.push(root.querySelector(`input[type="radio"][name="${CSS.escape(el.name)}"]:checked`) ?? el);
              } else out.push(el);
            }
            return out.map((el) => all.indexOf(el)).filter((p) => p > start).sort((a, b) => a - b);
          }, step);
          const stops = [];
          for (let i = 0; i < 120; i++) {
            await page.keyboard.press('Tab');
            const s = await page.evaluate((sel) => {
              const a = document.activeElement; const root = document.querySelector(sel);
              const cs = a ? getComputedStyle(a) : null;
              return { id: a?.id || a?.getAttribute('href') || a?.tagName || '', inStep: !!(a && root?.contains(a)), next: !!a?.hasAttribute('data-next'), back: !!a?.hasAttribute('data-back'),
                pos: a ? [...document.querySelectorAll('*')].indexOf(a) : -1, outline: !!cs && cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0 };
            }, step);
            stops.push(s);
            if (!s.inStep || s.back || (s.next && step === '#step-1')) break;
          }
          const ids = stops.map((s) => s.id).join(' > ');
          if (stops.some((s) => !s.inStep)) fail(`apply keyboard ${label}: Tab left the step or reached a hidden step (${ids})`);
          if (stops.some((s, i) => i > 0 && s.pos <= stops[i - 1].pos)) fail(`apply keyboard ${label}: Tab order is not page order (${ids})`);
          if (stops.map((s) => s.pos).join() !== expected.join()) fail(`apply keyboard ${label}: Tab skips or adds controls (${stops.length} stops, ${expected.length} focusable controls expected: ${ids})`);
          if (stops.some((s) => !s.outline)) fail(`apply keyboard ${label}: no visible focus outline on ${stops.filter((s) => !s.outline).map((s) => s.id).join(', ')}`);
          const end = stops.slice(-2);
          if (step === '#step-1' ? !end[1]?.next : !(end[0]?.next && end[1]?.back)) fail(`apply keyboard ${label}: Tab order does not end on Continue${step === '#step-1' ? '' : ' then Back'} (${ids})`);
        };
        posted = 0;
        await page.unroute('**/api/enquiry.php');
        await page.goto(base + '/apply/', { waitUntil: 'load' });
        await page.focus('#f-course');
        await tabWalk('#step-1', 'step 1');

        // Enter in a text field on step 1 acts as Continue, never as a submit.
        await page.selectOption('#f-course', 'dentistry');
        await page.focus('#f-university-other');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(150);
        if ((await visibleSteps()) !== '2' || posted) fail('apply: Enter on step 1 did not act as Continue');
        if ((await focused()) !== 'step-2-title') fail(`apply keyboard: focus not on the step 2 heading after Enter (on ${await focused()})`);
        await tabWalk('#step-2', 'step 2');
        await page.click('#step-2 [data-next]');
        await tabWalk('#step-3', 'step 3');
        await page.click('#step-3 [data-next]');
        await tabWalk('#step-4', 'step 4');

        // Without JavaScript: every fieldset visible, no step buttons, one submit button.
        const noJs = await browser.newContext({ viewport: { width, height: 900 }, javaScriptEnabled: false });
        const p2 = await noJs.newPage();
        await p2.goto(base + '/apply/', { waitUntil: 'load' });
        const shown = await p2.$$eval('fieldset[data-step]', (fs) => fs.filter((f) => f.getClientRects().length > 0).length);
        if (shown !== 5) fail(`apply without JavaScript: ${shown} of 5 fieldsets visible`);
        if (!(await p2.isVisible('form[data-steps] button[type="submit"]'))) fail('apply without JavaScript: submit button not visible');
        if (await p2.$$eval('[data-next], [data-back]', (b) => b.some((x) => x.getClientRects().length > 0))) fail('apply without JavaScript: step buttons visible');
        if (await p2.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)) fail('apply without JavaScript: horizontal overflow');
        await p2.screenshot({ path: join(OUT, 'desktop_apply_nojs.png'), fullPage: true });
        await noJs.close();

        // Under the production Content-Security-Policy (from public/.htaccess) the stepped form and prefill still work:
        // its scripts are bundled files, not inline code.
        const csp = readFileSync('public/.htaccess', 'utf8').match(/Content-Security-Policy "([^"]+)"/)?.[1];
        if (!csp) fail('apply CSP check: no Content-Security-Policy found in public/.htaccess');
        else {
          const cspCtx = await browser.newContext({ viewport: { width, height: 900 } });
          await cspCtx.route(/\/apply\/(\?.*)?$/, async (route) => {
            const res = await route.fetch();
            await route.fulfill({ response: res, headers: { ...res.headers(), 'content-security-policy': csp } });
          });
          const p3 = await cspCtx.newPage();
          const blocked = [];
          p3.on('console', (m) => { if (/Content Security Policy/i.test(m.text())) blocked.push(m.text()); });
          await p3.goto(base + '/apply/?course=nursing', { waitUntil: 'load' });
          if ((await p3.inputValue('#f-course')) !== 'nursing') fail('apply under CSP: prefill did not run');
          if ((await p3.$$eval('fieldset[data-step]', (fs) => fs.filter((f) => !f.hidden).length)) !== 1) fail('apply under CSP: stepped form did not start');
          await p3.click('#step-1 [data-next]');
          if (await p3.$eval('#step-2', (f) => f.hidden)) fail('apply under CSP: Continue did not work');
          if (blocked.length) fail(`apply under the production CSP: ${blocked.length} inline script(s) blocked on the page`);
          await cspCtx.close();
        }
      }
      if (errors.filter((e) => !/fonts\.g/.test(e)).length) fail(`${A}: console errors during the walk: ${errors.join(' | ')}`);
      await page.goto(base + '/apply/', { waitUntil: 'load' }); // the page screenshot below shows step 1
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
