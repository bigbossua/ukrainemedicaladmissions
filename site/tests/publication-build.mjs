// Publication build test: REAL `astro build` runs against fixture records, without deploying anything.
//
//   (a) "fail" fixtures — a record flagged publishable with no evidence file:
//         production build must exit non-zero and name the record; a PREVIEW build of the same fixtures must succeed
//         and render the record as a draft with its publication failures in the verification queue.
//   (b) "pass" fixtures — publishable records carrying every trap (unverified fee with a distinctive amount, conflicting
//         tuition, expired deadline, notes with canary strings, recognition backed only by the university, unknown extra
//         keys, a verified value containing "</script><script>alert(1)</script>", internal path strings) plus verified
//         POSITIVE CONTROLS: the build must succeed; then EVERY output file (HTML, XML, sitemap, robots, JS, CSS, JSON) is
//         scanned for every canary; positive controls must appear; the malicious value may appear only escaped; the sitemap
//         and JSON-LD carry only verified data. A PREVIEW build of the same fixtures must keep the published profiles clean.
//   (c) stale data — build, change a verified tuition value in both the record and its evidence, rebuild into the SAME
//         outDir with the SAME content cache (nothing cleared): the new value must be present and the old one absent; then
//         withdraw the evidence (mark it conflicting) and rebuild again: the value must disappear.
//
// Fixture records and evidence live in tests/fixtures/publication/ (dates are tokens, resolved against today's date by
// tests/fixtures/publication/materialise.mjs). Builds use separate outDirs (dist-fixture-*), a private content cache in
// a temporary directory, and the variables UMA_UNIVERSITIES_DIR / UMA_EVIDENCE_DIR / UMA_CACHE_DIR. The real dist/ is
// never touched. Temporary files and the dist-fixture-* directories are removed at the end (KEEP_FIXTURE_DIST=1 keeps them).
import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync, rmSync, mkdtempSync } from 'node:fs';
import { join, resolve, extname } from 'node:path';
import { tmpdir } from 'node:os';
import { materialise, academicYear } from './fixtures/publication/materialise.mjs';

const SITE_DIR = resolve('.');
const ASTRO = resolve('node_modules/astro/astro.js');
const NOW = new Date();
const AY = academicYear(NOW);
const TMP = mkdtempSync(join(tmpdir(), 'uma-publication-'));
const OUT = { fail: 'dist-fixture-fail', failPreview: 'dist-fixture-fail-preview', pass: 'dist-fixture-pass', passPreview: 'dist-fixture-pass-preview', stale: 'dist-fixture-stale' };

let checks = 0, failures = 0;
const fail = (m) => { console.log('FAIL', m); failures++; };
const check = (cond, m) => { checks++; if (!cond) fail(m); return !!cond; };

function build(label, { dirs, outDir, preview = false, cacheDir }) {
  const env = { ...process.env, UMA_UNIVERSITIES_DIR: dirs.universities, UMA_EVIDENCE_DIR: dirs.evidence, UMA_CACHE_DIR: cacheDir, ASTRO_TELEMETRY_DISABLED: '1' };
  delete env.PREVIEW_UNPUBLISHED; delete env.STAGING;
  if (preview) env.PREVIEW_UNPUBLISHED = '1';
  const r = spawnSync(process.execPath, [ASTRO, 'build', '--outDir', outDir], { cwd: SITE_DIR, env, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const output = `${r.stdout ?? ''}\n${r.stderr ?? ''}`;
  console.log(`build ${label}: exit ${r.status}`);
  return { status: r.status, output };
}

const TEXT = new Set(['.html', '.xml', '.txt', '.js', '.mjs', '.css', '.json', '.webmanifest', '.svg', '.map', '.php', '.htaccess', '']);
function outputFiles(root) {
  const out = [];
  (function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : out.push(p); } })(root);
  return out.map((p) => ({ rel: p.slice(root.length), text: readFileSync(p, TEXT.has(extname(p)) ? 'utf8' : 'latin1') }));
}
const page = (root, path) => { const f = join(root, path, 'index.html'); return existsSync(f) ? readFileSync(f, 'utf8') : ''; };
const ldBlocks = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const attr = (html, slug, name) => { const m = new RegExp(`<article[^>]*data-slug="${slug}"[^>]*>`).exec(html); const a = m && new RegExp(`${name}="([^"]*)"`).exec(m[0]); return a ? a[1] : null; };

// Every string that must never reach public output. Everything carrying "CANARY" is covered by the first pattern;
// the rest are numeric canaries (unverified, conflicting and stale amounts, raw and as formatted), internal research
// wording, the unescaped attack string and internal path strings.
const CANARIES = [
  'CANARY',
  '98765', '98,765', '55501', '55,501', '55502', '55,502', '91919', '91,919', '81818', '81,818', '64646', '64,646',
  'NOT verified; read the official page', 'Search-snippet lead',
  '<script>alert(1)', '</script><script>', 'alert(1)</script>',
  TMP, 'data/evidence', 'tests/fixtures', 'UMA_EVIDENCE_DIR', 'UMA_UNIVERSITIES_DIR', SITE_DIR,
  // Sources of withheld claims (a withheld claim prints no source link): a search snippet, an agent site, a directory,
  // a second "rules" page that contradicts the first, the conflicting fee page, an http page and the register whose
  // value does not match.
  'google.com/search', 'best-agent.fixture.example', 'directory.fixture.example', 'alpha.fixture.example/prep-rules', 'beta.fixture.example/fees-2',
  'http://beta.fixture.example', 'register.fixture.example',
];
// A numeric canary matches only as a whole number (not inside a longer number, a decimal or an asset hash).
const matcher = (c) => (/^\d[\d,]*$/.test(c) ? ((t) => new RegExp(`(?<![\\w.,])${c}(?![\\w,]|\\.\\d)`).test(t)) : (t) => t.includes(c));
function scan(root, label, canaries = CANARIES) {
  const files = outputFiles(root);
  check(files.length > 20, `${label}: only ${files.length} output files`);
  for (const c of canaries) {
    const m = matcher(c);
    const hits = files.filter((f) => m(f.text)).map((f) => f.rel);
    check(hits.length === 0, `${label}: "${c}" found in ${hits.length} file(s): ${hits.slice(0, 5).join(', ')}`);
  }
  return files;
}

try {
  // ------------------------------------------------------------------ (a) fail fixtures
  {
    const dirs = materialise('fail', join(TMP, 'fail'), NOW);
    const prod = build('fail (production)', { dirs, outDir: OUT.fail, cacheDir: join(TMP, 'cache-fail') });
    check(prod.status !== 0, '(a) production build of a flagged record without evidence must fail, but it exited 0');
    check(prod.output.includes('fixture-flagged-no-evidence'), '(a) build error does not name the record fixture-flagged-no-evidence');
    check(/no evidence file/i.test(prod.output), '(a) build error does not list the missing evidence file as a failure');
    check(/open verification question/i.test(prod.output), '(a) build error does not list the open question as a failure');
    check(!existsSync(join(OUT.fail, 'universities', 'fixture-flagged-no-evidence', 'index.html')), '(a) a failed production build still wrote the flagged profile');

    const prev = build('fail (preview)', { dirs, outDir: OUT.failPreview, preview: true, cacheDir: join(TMP, 'cache-fail-preview') });
    check(prev.status === 0, `(a) PREVIEW build of the same fixtures must succeed (exit ${prev.status})\n${prev.output.slice(-1500)}`);
    const h = page(OUT.failPreview, 'universities/fixture-flagged-no-evidence');
    if (check(h, '(a) preview: draft page for the flagged record missing')) {
      check(h.includes('data-draft-banner'), '(a) preview: draft banner missing');
      check(/<meta name="robots" content="noindex, nofollow"/.test(h), '(a) preview: draft not noindex');
      check(ldBlocks(h).length === 0, '(a) preview: JSON-LD on a draft page');
      check(!/<link rel="canonical"/.test(h), '(a) preview: canonical on a draft page');
      check(h.includes('data-publication-failures'), '(a) preview: publication failures not listed in the verification queue');
      check(/No evidence file/i.test(h), '(a) preview: the missing evidence file is not listed as a failure');
    }
  }

  // ------------------------------------------------------------------ (b) pass fixtures
  {
    const dirs = materialise('pass', join(TMP, 'pass'), NOW);
    const prod = build('pass (production)', { dirs, outDir: OUT.pass, cacheDir: join(TMP, 'cache-pass') });
    if (check(prod.status === 0, `(b) production build of the pass fixtures failed (exit ${prod.status})\n${prod.output.slice(-3000)}`)) {
      scan(OUT.pass, '(b) production');
      const alpha = page(OUT.pass, 'universities/fixture-alpha-medical-university');
      const beta = page(OUT.pass, 'universities/fixture-beta-medical-university');
      check(alpha && beta, '(b) a publishable fixture profile was not built');
      check(!existsSync(join(OUT.pass, 'universities', 'fixture-gamma-draft-university')), '(b) the unflagged draft got a production page');
      // Positive controls: verified values with matching evidence must be shown.
      for (const v of ['POSCTRL-ALPHA-OFFICIAL-NAME Medical University', 'POSCTRL-ALPHA-STATEMENT: teaching this academic year is in person.', 'POSCTRL-ALPHA-ADDRESS 1 Alpha Street, Alphaville',
        '7,123 USD per year', `(${AY})`, 'POSCTRL-ALPHA-COST-LABEL', '345 USD per year', 'POSCTRL-ALPHA-REQ-BIOLOGY', 'POSCTRL-ALPHA-DOC-PASSPORT', 'POSCTRL-ALPHA-PREP-ROUTE',
        'POSCTRL-ALPHA-PREP-DURATION', 'POSCTRL-ALPHA-ACCREDITATION', 'https://register.fixture.gov.ua/alpha', 'POSCTRL-222', 'posctrl-office@alpha.fixture.example', 'POSCTRL-ALPHA-MEDICINE', 'POSCTRL-ALPHA-OVERVIEW', '1901',
        'https://alpha.fixture.example/fees', 'Verified', 'To be confirmed', 'still being confirmed', 'Some other mandatory costs have not yet been verified'])
        check(alpha.includes(v), `(b) alpha profile: positive control "${v}" missing`);
      for (const v of ['POSCTRL-BETA-OFFICIAL-NAME', 'POSCTRL-BETA-STATEMENT', 'POSCTRL-BETA-MEDICINE', 'POSCTRL-BETA-PHARMACY', 'POSCTRL-BETA-DEADLINE', 'POSCTRL-BETA-DURATION 6 years', 'relocated', 'To be confirmed'])
        check(beta.includes(v), `(b) beta profile: positive control "${v}" missing`);
      // The attack string: present only escaped, in HTML text and in JSON-LD.
      check(alpha.includes('POSCTRL-ALPHA-HOSTEL &lt;/script&gt;&lt;script&gt;alert(1)&lt;/script&gt; &amp; co'), '(b) alpha: verified value with markup not rendered as escaped text');
      check(beta.includes('POSCTRL-BETA-ADDRESS &lt;/script&gt;&lt;script&gt;alert(1)&lt;/script&gt;'), '(b) beta: verified address with markup not rendered as escaped text');
      // JSON-LD: only verified values; escaped; parses back to the exact value.
      for (const [slug, h, exp] of [
        ['fixture-alpha-medical-university', alpha, { name: 'POSCTRL-ALPHA-OFFICIAL-NAME Medical University', url: 'https://alpha.fixture.example/', address: 'POSCTRL-ALPHA-ADDRESS 1 Alpha Street, Alphaville' }],
        ['fixture-beta-medical-university', beta, { name: 'POSCTRL-BETA-OFFICIAL-NAME', url: 'https://beta.fixture.example/', address: 'POSCTRL-BETA-ADDRESS </script><script>alert(1)</script>' }],
      ]) {
        const blocks = ldBlocks(h);
        for (const b of blocks) check(!/[<>]/.test(b) && !b.includes('\u2028') && !b.includes('\u2029'), `(b) ${slug}: JSON-LD block contains an unescaped < > or line separator`);
        const parsed = blocks.map((b) => { try { return JSON.parse(b); } catch { fail(`(b) ${slug}: JSON-LD does not parse`); return {}; } });
        const org = parsed.find((o) => o['@type'] === 'CollegeOrUniversity');
        if (check(org, `(b) ${slug}: CollegeOrUniversity JSON-LD missing`)) {
          check(JSON.stringify(Object.keys(org).sort()) === JSON.stringify(['@context', '@type', 'address', 'name', 'url']), `(b) ${slug}: JSON-LD keys ${Object.keys(org)} — only verified name, url and address are allowed`);
          for (const [k, v] of Object.entries(exp)) check(org[k] === v, `(b) ${slug}: JSON-LD ${k} is ${JSON.stringify(org[k])}, expected the verified value`);
        }
        const crumbs = parsed.find((o) => o['@type'] === 'BreadcrumbList');
        check(crumbs && crumbs.itemListElement.map((i) => i.name).join(' > ') === `Home > Universities > ${slug === 'fixture-alpha-medical-university' ? 'Fixture Alpha Medical University' : 'Fixture Beta Medical University'}`, `(b) ${slug}: breadcrumb JSON-LD unexpected`);
      }
      check(ldBlocks(beta).some((b) => b.includes('\\u003c/script\\u003e')), '(b) beta: JSON-LD does not carry the escaped attack string');
      // Directory: filters and chips only from shown values.
      const dir = page(OUT.pass, 'universities');
      check(attr(dir, 'fixture-alpha-medical-university', 'data-levels') === 'integrated_master', `(b) directory alpha data-levels = ${attr(dir, 'fixture-alpha-medical-university', 'data-levels')}`);
      check(attr(dir, 'fixture-alpha-medical-university', 'data-languages') === 'English', `(b) directory alpha data-languages = ${attr(dir, 'fixture-alpha-medical-university', 'data-languages')}`);
      check(attr(dir, 'fixture-alpha-medical-university', 'data-intakes') === AY, `(b) directory alpha data-intakes = ${attr(dir, 'fixture-alpha-medical-university', 'data-intakes')}`);
      check(attr(dir, 'fixture-alpha-medical-university', 'data-fields') === 'medicine', `(b) directory alpha data-fields = ${attr(dir, 'fixture-alpha-medical-university', 'data-fields')} (unlisted programmes leaked)`);
      check(attr(dir, 'fixture-alpha-medical-university', 'data-prep') === 'yes', '(b) directory alpha: preparatory route with a verified claim not flagged');
      check(attr(dir, 'fixture-beta-medical-university', 'data-languages') === 'English Ukrainian', `(b) directory beta data-languages = ${attr(dir, 'fixture-beta-medical-university', 'data-languages')}`);
      check(attr(dir, 'fixture-beta-medical-university', 'data-fields') === 'medicine pharmacy', `(b) directory beta data-fields = ${attr(dir, 'fixture-beta-medical-university', 'data-fields')}`);
      // Beta's only preparatory route is withheld: neither "yes" nor "no" (the "no route recorded" filter must not claim it).
      check(attr(dir, 'fixture-beta-medical-university', 'data-prep') === 'tbc', `(b) directory beta data-prep = ${attr(dir, 'fixture-beta-medical-university', 'data-prep')}, expected tbc (route withheld)`);
      const betaRow = (/<th scope="row"[^>]*><a href="\/universities\/fixture-beta-medical-university\/"[\s\S]*?<\/tr>/.exec(dir) ?? [''])[0];
      check(betaRow && !betaRow.includes('None listed'), '(b) directory comparison: a withheld route is shown as "None listed"');
      check(/Preparatory route<\/dt>\s*<dd[^>]*>\s*<span class="muted"[^>]*>To be confirmed</.test(beta) && !beta.includes('None recorded'), '(b) beta profile: a withheld preparatory route is not shown as "To be confirmed"');
      check(dir.includes('7,123 USD/year'), '(b) directory comparison table: verified tuition missing');
      check(!/<select name="level"[\s\S]*?value="bachelor"[\s\S]*?<\/select>/.test(dir), '(b) directory level filter offers an unverified level');
      check(!new RegExp(`<select name="intake"[\\s\\S]*?value="${academicYear(NOW, -1).replace('/', '\\/')}"`).test(dir.split('</form>')[0]), '(b) directory intake filter offers an unverified intake');
      const fees = page(OUT.pass, 'tuition-fees');
      check(fees.includes('7,123 USD / year'), '(b) /tuition-fees/: verified tuition missing');
      const home = page(OUT.pass, '');
      check(home.includes('value="fixture-alpha-medical-university"') && home.includes('value="fixture-beta-medical-university"'), '(b) home: published records missing from the start form');
      const apply = page(OUT.pass, 'apply');
      check(apply.includes('value="fixture-alpha-medical-university"'), '(b) /apply/: published record missing from the university select');
      check(!page(OUT.pass, 'courses/dentistry').includes('fixture-alpha'), '(b) /courses/dentistry/: an unlisted programme produced a card');
      check(page(OUT.pass, 'courses/medicine').includes('/universities/fixture-alpha-medical-university/#medicine'), '(b) /courses/medicine/: listed programme missing');
      // Sitemap: verified profiles only, and only URLs that exist.
      const sitemap = existsSync(join(OUT.pass, 'sitemap-0.xml')) ? readFileSync(join(OUT.pass, 'sitemap-0.xml'), 'utf8') : '';
      check(sitemap.includes('/universities/fixture-alpha-medical-university/') && sitemap.includes('/universities/fixture-beta-medical-university/'), '(b) sitemap: published profiles missing');
      check(!sitemap.includes('fixture-gamma'), '(b) sitemap lists the draft');
      for (const [, loc] of sitemap.matchAll(/<loc>https:\/\/ukrainemedicaladmissions\.com([^<]*)<\/loc>/g)) check(existsSync(join(OUT.pass, loc, 'index.html')), `(b) sitemap lists ${loc}, which was not built`);
      check(!/fixture/.test(readFileSync(join(OUT.pass, 'robots.txt'), 'utf8')), '(b) robots.txt mentions a fixture');
    }

    const prev = build('pass (preview)', { dirs, outDir: OUT.passPreview, preview: true, cacheDir: join(TMP, 'cache-pass-preview') });
    if (check(prev.status === 0, `(b) PREVIEW build of the pass fixtures failed\n${prev.output.slice(-1500)}`)) {
      for (const slug of ['fixture-alpha-medical-university', 'fixture-beta-medical-university']) {
        const h = page(OUT.passPreview, `universities/${slug}`);
        check(h && !h.includes('data-draft-banner'), `(b) preview: published ${slug} rendered as a draft`);
        for (const c of ['CANARY', '98,765', '55,501', 'NOT verified; read the official page', '<script>alert(1)']) check(!h.includes(c), `(b) preview: published ${slug} shows "${c}" (preview builds must use the same projection for published records)`);
      }
      check(page(OUT.passPreview, 'universities/fixture-gamma-draft-university').includes('data-draft-banner'), '(b) preview: the draft is not rendered as a draft');
    }
  }

  // ------------------------------------------------------------------ (c) stale data
  {
    const dirs = materialise('pass', join(TMP, 'stale'), NOW);
    const cacheDir = join(TMP, 'cache-stale');
    const recFile = join(dirs.universities, 'fixture-alpha-medical-university.json');
    const evFile = join(dirs.evidence, 'fixture-alpha-medical-university.json');
    const edit = (file, fn) => { const j = JSON.parse(readFileSync(file, 'utf8')); fn(j); writeFileSync(file, JSON.stringify(j, null, 2)); };
    const tuitionEntry = (ev) => ev.entries.find((e) => e.claimPath === 'programmes.medicine.tuition');
    const everywhere = (s) => { const m = matcher(s); return outputFiles(OUT.stale).filter((f) => m(f.text)).map((f) => f.rel); };

    let r = build('stale #1', { dirs, outDir: OUT.stale, cacheDir });
    check(r.status === 0, `(c) first build failed\n${r.output.slice(-1500)}`);
    check(page(OUT.stale, 'universities/fixture-alpha-medical-university').includes('7,123 USD per year'), '(c) first build: 7,123 missing');

    edit(recFile, (j) => { j.programmes[0].tuition.value.amount = 7456; });
    edit(evFile, (ev) => { tuitionEntry(ev).value.amount = 7456; });
    r = build('stale #2 (same outDir, same cache)', { dirs, outDir: OUT.stale, cacheDir });
    check(r.status === 0, `(c) second build failed\n${r.output.slice(-1500)}`);
    check(page(OUT.stale, 'universities/fixture-alpha-medical-university').includes('7,456 USD per year'), '(c) second build: the new value 7,456 is missing from the profile');
    check(page(OUT.stale, 'tuition-fees').includes('7,456 USD / year'), '(c) second build: the new value 7,456 is missing from /tuition-fees/');
    const old = everywhere('7,123').concat(everywhere('7123'));
    check(old.length === 0, `(c) second build: the old value 7,123 is still present in ${old.join(', ')}`);

    edit(evFile, (ev) => { const e = tuitionEntry(ev); e.status = 'conflicting'; e.decision = 'withhold'; e.withholdReason = 'Withdrawn for the stale-data test.'; });
    r = build('stale #3 (evidence withdrawn)', { dirs, outDir: OUT.stale, cacheDir });
    check(r.status === 0, `(c) third build failed\n${r.output.slice(-1500)}`);
    const left = everywhere('7,456').concat(everywhere('7456'));
    check(left.length === 0, `(c) third build: the withdrawn value 7,456 is still present in ${left.join(', ')}`);
  }
} finally {
  if (!process.env.KEEP_FIXTURE_DIST) for (const d of Object.values(OUT)) rmSync(resolve(d), { recursive: true, force: true });
  rmSync(TMP, { recursive: true, force: true });
}

console.log(`publication-build: ${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);
