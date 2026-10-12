// Evidence-tool tests (no build): scripts/evidence-entry.mjs (record one evidence entry) and scripts/capture-intake.py
// (Route B capture intake). Every write goes to TEMPORARY copies of the fixture record and evidence file in
// tests/fixtures/evidence-tools/, passed with --records-dir / --evidence-dir (or UMA_UNIVERSITIES_DIR / UMA_EVIDENCE_DIR);
// the real records and evidence files are snapshotted first and must be byte-identical at the end.
//
// Proves: a valid entry is accepted and appended with the right id; a dry run (the default) writes nothing; an unknown
// claim path, a fee from a disallowed tier, a non-https URL, a search-snippet method or source, a missing quotation, a
// value the record field cannot hold, a Route A entry while access is blocked and an owner capture without its file name
// are refused or reported as "would not be shown" with the policy's own reason code; --apply-to-record keeps rule R10
// (the exact-equality rule of tests/records-evidence.mjs, re-run here) and refuses an entry that is not verified/publish;
// --mark-outdated changes only status, decision and reason, and is refused when it would leave a verified claim without
// support; capture-intake refuses a folder inside the repository (or containing it, or inside any git working tree),
// lists sizes and SHA-256, matches register rows, and finds phrases in HTML, text and (when pdftotext is installed) PDF
// captures with page numbers, writing nothing into the repository.
// Prints "evidence-tools: N checks, M failures".
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, cpSync, readFileSync, writeFileSync, rmSync, mkdirSync, readdirSync, existsSync, symlinkSync } from 'node:fs';
import { join, resolve, dirname, relative, isAbsolute } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { record as recordSchema } from '../src/content/schema.mjs';
import { parseEvidence } from '../src/lib/evidence.mjs';
import { listClaims, deepEqual, evaluateClaim, toPublicRecord, currentAcademicYear, isoDay, itemValue } from '../src/lib/publication.mjs';

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = resolve(SITE, '..');
const FIX = join(SITE, 'tests/fixtures/evidence-tools');
const TOOL = join(SITE, 'scripts/evidence-entry.mjs');
const INTAKE = join(SITE, 'scripts/capture-intake.py');
const SLUG = 'fixture-tools-medical-university';
const H = 'https://tools.fixture.example';
const NOW = new Date();
const TODAY = isoDay(NOW);
const day = (n) => isoDay(new Date(NOW.getTime() + n * 86400000));
const AY = currentAcademicYear(NOW);
const AY_PREV = `${Number(AY.slice(0, 4)) - 1}/${AY.slice(2, 4)}`;
const AY_END = `${Number(AY.slice(0, 4)) + 1}-06-30`;
const NEXT = AY_END >= TODAY ? AY_END : day(30);
const HOSTS = { officialHosts: ['tools.fixture.example'] };

let checks = 0, failures = 0;
const check = (cond, msg) => { checks++; if (!cond) { failures++; console.log('FAIL', msg); } };
const section = (name) => console.log(`-- ${name}`);
/** Run one section; an exception counts as a failure and the remaining sections still run. */
const guard = (name, fn) => { section(name); try { fn(); } catch (e) { check(false, `${name}: threw ${e?.stack ?? e}`); } };

// ---------------------------------------------------------------------------------------------- safety: real files
const REAL_DIRS = [join(SITE, 'src/content/universities'), join(SITE, 'data/evidence')];
const realSnapshot = () => Object.fromEntries(REAL_DIRS.flatMap((d) => readdirSync(d).map((f) => [join(d, f), readFileSync(join(d, f), 'utf8')])));
const REAL_BEFORE = realSnapshot();
const gitStatus = () => spawnSync('git', ['-C', REPO, 'status', '--porcelain', '--untracked-files=all'], { encoding: 'utf8' }).stdout;
const GIT_BEFORE = gitStatus();

// ---------------------------------------------------------------------------------------------- helpers
const TMP = mkdtempSync(join(tmpdir(), 'evidence-tools-'));
const WORK_DIRS = []; // capture-intake's temporary text folders, removed at exit
process.on('exit', () => { for (const w of [TMP, ...WORK_DIRS]) if (relative(REPO, w).startsWith('..')) rmSync(w, { recursive: true, force: true }); });
let n = 0;
/** A fresh temporary copy of the fixture record and evidence file. @param {{ access?: string }} [o] */
function fresh({ access } = {}) {
  const d = join(TMP, `set-${++n}`);
  cpSync(join(FIX, 'records'), join(d, 'records'), { recursive: true });
  cpSync(join(FIX, 'evidence'), join(d, 'evidence'), { recursive: true });
  if (access) {
    const f = join(d, 'evidence', `${SLUG}.json`);
    const ev = JSON.parse(readFileSync(f, 'utf8'));
    ev.access.status = access;
    writeFileSync(f, `${JSON.stringify(ev, null, 2)}\n`);
  }
  return d;
}
const paths = (d) => ({ rec: join(d, 'records', `${SLUG}.json`), ev: join(d, 'evidence', `${SLUG}.json`) });
const snap = (d) => { const p = paths(d); return readFileSync(p.rec, 'utf8') + '\u0000' + readFileSync(p.ev, 'utf8'); };
const readRec = (d) => recordSchema.parse(JSON.parse(readFileSync(paths(d).rec, 'utf8')));
const readEv = (d) => { const r = parseEvidence(JSON.parse(readFileSync(paths(d).ev, 'utf8'))); if (r.state !== 'ok') throw new Error(r.errors.join(' | ')); return r.data; };
const stableText = (file) => { const t = readFileSync(file, 'utf8'); return t === `${JSON.stringify(JSON.parse(t), null, 2)}\n`; };
const cleanEnv = () => { const e = { ...process.env }; delete e.UMA_UNIVERSITIES_DIR; delete e.UMA_EVIDENCE_DIR; return e; };

/** Run the entry tool on set `d` with --json. */
function tool(d, args, { env, dirs = true } = {}) {
  const dirArgs = dirs ? ['--records-dir', join(d, 'records'), '--evidence-dir', join(d, 'evidence')] : [];
  const r = spawnSync(process.execPath, [TOOL, ...dirArgs, '--slug', SLUG, ...args, '--json'], { encoding: 'utf8', cwd: SITE, env: env ?? cleanEnv() });
  let j = null;
  try { j = JSON.parse(r.stdout); } catch { /* reported by the checks */ }
  return { code: r.status, j, out: r.stdout + r.stderr };
}
const refusedWith = (r, text) => !!r.j && r.j.refused.some((x) => x.includes(text));

const money = (amount, ay = AY) => ({ amount, currency: 'USD', per: 'year', academicYear: ay });
/** Options of a valid, publishable tuition entry; `over` replaces options (null removes one). */
function opts(over = {}) {
  const o = {
    path: 'programmes.medicine.tuition', value: JSON.stringify(money(1000)), statement: 'Fixture: tuition for the current academic year',
    url: `${H}/fees.pdf`, org: 'Fixture Tools Medical University', tier: '2', type: 'pdf', quote: `Fixture tuition 1000 USD per year, ${AY}`,
    accessed: TODAY, 'academic-year': AY, 'next-review': NEXT, status: 'verified', reviewer: 'verifier (fixture)',
    method: 'fixture: read on the fixture PDF', decision: 'publish', ...over,
  };
  return Object.entries(o).filter(([, v]) => v !== null && v !== undefined).flatMap(([k, v]) => [`--${k}`, String(v)]);
}
/** R10 of tests/records-evidence.mjs, the same exact-equality rule. */
const r10 = (rec, entries) => listClaims(rec).filter(({ path, claim }) => claim.status === 'verified'
  && !entries.some((e) => e.claimPath === path && e.status === 'verified' && deepEqual(e.value, claim.value))).map((c) => c.path);
const claimAt = (rec, path) => listClaims(rec).find((c) => c.path === path)?.claim;
const FEE_ID = (k) => `${SLUG}/programmes.medicine.tuition/${k}`;

// ---------------------------------------------------------------------------------------------- 1. dry run
guard('dry run is the default and writes nothing', () => {
  const d = fresh();
  const before = snap(d);
  const r = tool(d, opts());
  check(r.code === 0 && r.j?.ok, `valid entry dry run exits 0 (got ${r.code}: ${r.out.slice(0, 300)})`);
  check(r.j?.dryRun === true && !r.j?.wrote.evidence && !r.j?.wrote.record, 'dry run reports nothing written');
  check(r.j?.id === FEE_ID(1), `first entry on a claim path gets id .../1 (got ${r.j?.id})`);
  check(r.j?.evaluation.now?.code === 'not-verified', `as the record stands, the policy says not-verified (got ${r.j?.evaluation.now?.code})`);
  check(r.j?.evaluation.ifApplied?.show === true, 'if applied, the real policy would show the claim');
  check(snap(d) === before, 'dry run: record and evidence files are byte-identical');
  const r2 = tool(d, [...opts(), '--apply-to-record']);
  check(r2.code === 0 && r2.j?.recordChange?.after?.status === 'verified' && !r2.j?.wrote.record, '--apply-to-record without --write previews the record change only');
  check(snap(d) === before, 'dry run with --apply-to-record: files byte-identical');
  const r3 = tool(d, [...opts(), '--dry-run']);
  check(r3.code === 0 && r3.j?.dryRun === true, 'explicit --dry-run behaves as the default');
  check(tool(d, [...opts(), '--dry-run', '--write']).code === 2, '--dry-run with --write is a usage error');
  check(snap(d) === before, 'files still byte-identical after the dry runs');
  const env = { ...cleanEnv(), UMA_UNIVERSITIES_DIR: join(d, 'records'), UMA_EVIDENCE_DIR: join(d, 'evidence') };
  const r4 = tool(d, opts(), { env, dirs: false });
  check(r4.code === 0 && r4.j?.id === FEE_ID(1), 'UMA_UNIVERSITIES_DIR / UMA_EVIDENCE_DIR select the fixture copies too');
});

// ---------------------------------------------------------------------------------------------- 2. write
guard('--write appends with the next id and keeps every existing entry', () => {
  const d = fresh();
  const recBefore = readFileSync(paths(d).rec, 'utf8');
  const original = readEv(d).entries;
  const r = tool(d, [...opts(), '--write']);
  check(r.code === 0 && r.j?.wrote.evidence === true && r.j?.wrote.record === false, `--write records the entry (got ${r.code}: ${r.out.slice(0, 300)})`);
  const ev = readEv(d);
  check(ev.entries.length === original.length + 1 && ev.entries.at(-1).id === FEE_ID(1), 'entry appended at the end with id .../1');
  check(deepEqual(ev.entries.slice(0, original.length), original), 'existing entries unchanged');
  check(stableText(paths(d).ev), 'evidence file keeps 2-space indent and a trailing newline');
  check(readFileSync(paths(d).rec, 'utf8') === recBefore, '--write without --apply-to-record leaves the record untouched');
  const w = tool(d, [...opts({ decision: 'withhold', 'withhold-reason': 'Fixture: a second reading, kept for the record.' }), '--write']);
  check(w.code === 0 && w.j?.id === FEE_ID(2), `second entry on the same path gets id .../2 (got ${w.j?.id})`);
  const ev2 = readEv(d);
  check(deepEqual(ev2.entries.slice(0, ev.entries.length), ev.entries), 'second write keeps the first entries exactly');
  const dupW = tool(d, [...opts(), '--write']);
  check(dupW.code === 1 && refusedWith(dupW, `already recorded as ${FEE_ID(1)}`), 'the same command run twice is refused (no duplicate reading)');
  const before = snap(d);
  const dupA = tool(d, [...opts(), '--write', '--apply-to-record']);
  const evA = readEv(d), recA = readRec(d);
  check(dupA.code === 0 && dupA.j?.reused === FEE_ID(1) && evA.entries.length === ev2.entries.length, `repeating it with --apply-to-record reuses ${FEE_ID(1)} and appends nothing (got ${dupA.code}: ${dupA.j?.refused?.join(' | ')})`);
  check(deepEqual(evA.entries, ev2.entries) && deepEqual(claimAt(recA, 'programmes.medicine.tuition').value, money(1000)) && r10(recA, evA.entries).length === 0, 'the reused entry is applied to the record and R10 holds');
  check(snap(d) !== before, 'the record file changed (and only through the apply)');
  const on = tool(d, [...opts({ path: 'officialName', value: JSON.stringify('Fixture Tools Medical University'), tier: '1', type: 'web-page', url: `${H}/about`, 'academic-year': null, 'next-review': day(300), quote: 'Fixture Tools Medical University' }), '--write']);
  check(on.code === 0 && on.j?.id === `${SLUG}/officialName/2`, `a path that already has entry /1 gets /2 (got ${on.j?.id})`);
});

// ---------------------------------------------------------------------------------------------- 3. apply to record
guard('--apply-to-record sets the claim and keeps R10', () => {
  const d = fresh();
  const recRawBefore = JSON.parse(readFileSync(paths(d).rec, 'utf8'));
  const r = tool(d, [...opts(), '--write', '--apply-to-record']);
  check(r.code === 0 && r.j?.wrote.record === true, `write + apply succeeds (got ${r.code}: ${r.out.slice(0, 300)})`);
  const rec = readRec(d), ev = readEv(d);
  const c = claimAt(rec, 'programmes.medicine.tuition');
  check(deepEqual(c.value, money(1000)) && c.status === 'verified' && c.source === `${H}/fees.pdf` && c.checked === TODAY, 'record claim: value, status verified, source = url, checked = accessed');
  check(r10(rec, ev.entries).length === 0, `R10 (exact equality) holds after apply (failing: ${r10(rec, ev.entries).join(', ')})`);
  check(evaluateClaim('programmes.medicine.tuition', c, ev.entries, { now: NOW, ...HOSTS }).show === true, 'the real policy shows the applied claim');
  check(stableText(paths(d).rec), 'record file keeps 2-space indent and a trailing newline');
  const after = JSON.parse(readFileSync(paths(d).rec, 'utf8'));
  after.programmes[0].tuition = recRawBefore.programmes[0].tuition;
  check(deepEqual(after, recRawBefore), 'nothing else in the record changed');

  const n1 = tool(d, [...opts({ path: 'officialName', value: JSON.stringify('Fixture Tools Medical University'), tier: '1', type: 'web-page', url: `${H}/about`, 'academic-year': null, 'next-review': day(300), quote: 'Fixture Tools Medical University' }), '--write', '--apply-to-record']);
  const rec2 = readRec(d), ev2 = readEv(d);
  const pub = toPublicRecord(rec2, ev2, { now: NOW });
  check(n1.code === 0 && pub.officialName.show === true && pub.officialName.value === 'Fixture Tools Medical University', 'record-level claim applied: toPublicRecord shows it');
  check(r10(rec2, ev2.entries).length === 0, 'R10 holds after the second apply');

  const item = { type: 'exam', summary: 'Fixture entrance examination in Biology and Chemistry.', subject: 'Biology; Chemistry', intakeYear: AY };
  const ri = tool(d, [...opts({ path: 'programmes.medicine.requirements.entrance-exam', value: JSON.stringify(item), url: `${H}/admission`, tier: '1', type: 'web-page', quote: 'Fixture: entrance examination in Biology and Chemistry.' }), '--write', '--apply-to-record']);
  const rec3 = readRec(d), ev3 = readEv(d);
  const it = rec3.programmes[0].requirements[0];
  check(ri.code === 0 && deepEqual(itemValue('requirement', it), item) && it.status === 'verified' && it.source === `${H}/admission` && it.checked === TODAY, `requirement item applied field by field (got ${ri.code}: ${ri.j?.refused?.join(' | ')})`);
  check(r10(rec3, ev3.entries).length === 0, 'R10 holds for the applied item');

  const before = snap(d);
  const wh = tool(d, [...opts({ value: JSON.stringify(money(1500)), decision: 'withhold', 'withhold-reason': 'Fixture: not shown.' }), '--write', '--apply-to-record']);
  check(wh.code === 1 && refusedWith(wh, 'applies only an entry that is verified'), '--apply-to-record refuses a withheld entry');
  check(snap(d) === before, 'refused apply: neither file changed (the entry is not written either)');
  const pv = tool(d, [...opts({ value: JSON.stringify(money(1500)), status: 'partially-verified', decision: 'withhold', 'withhold-reason': 'Fixture: no payment basis.' }), '--write', '--apply-to-record']);
  check(pv.code === 1 && refusedWith(pv, 'applies only an entry that is verified'), '--apply-to-record refuses a partially-verified entry');
  const cf = tool(d, [...opts({ value: JSON.stringify(money(1500)), quote: 'Fixture tuition 1500 USD' }), '--write', '--apply-to-record']);
  check(cf.code === 1 && cf.j?.evaluation.ifApplied?.code === 'conflict', `a verified entry disagreeing with an earlier verified one is refused as a conflict (got ${cf.j?.evaluation.ifApplied?.code})`);
  check(snap(d) === before, 'refused conflicting apply: neither file changed');
  const df = tool(d, [...opts({ path: 'programmes.nursing.internationalAdmission', value: 'true', url: `${H}/admission`, tier: '1', type: 'web-page', 'academic-year': null, quote: 'Fixture: nursing admits foreign applicants.' }), '--write', '--apply-to-record']);
  check(df.code === 1 && refusedWith(df, 'deferredProgrammes'), 'applying international admission to a deferred programme is refused (R9: move it first)');
  const closed = tool(d, [...opts({ path: 'programmes.medicine.internationalAdmission', value: 'false', url: `${H}/admission`, tier: '1', type: 'web-page', 'academic-year': null, quote: 'Fixture: medicine does not admit foreign applicants.' }), '--write', '--apply-to-record']);
  check(closed.code === 1 && refusedWith(closed, 'moves to deferredProgrammes[] first'), `applying "not open" to a programme in programmes[] is refused (R9: programmes[] holds only open programmes) (got ${closed.code}: ${closed.j?.refused?.join(' | ')})`);
  check(snap(d) === before, 'refused R9 applies: neither file changed');
  const rec9 = readRec(d);
  check(rec9.programmes.every((p) => p.internationalAdmission.value === true) && !rec9.deferredProgrammes.some((p) => p.internationalAdmission.status === 'verified' && p.internationalAdmission.value === true), 'R9 of tests/records-evidence.mjs still holds for the fixture record');
});

// ---------------------------------------------------------------------------------------------- 4. refusals
guard('refusals and "would not be shown" reasons', () => {
  const d = fresh();
  const before = snap(d);
  const u = tool(d, [...opts({ path: 'programmes.medicine.fees' }), '--write']);
  check(u.code === 1 && refusedWith(u, 'unknown claim path') && refusedWith(u, 'programmes.medicine.tuition'), 'unknown claim path refused, with the valid paths listed');
  const t3 = tool(d, [...opts({ tier: '3', url: 'https://mon.gov.ua/fixture-fees.pdf' }), '--write']);
  check(t3.code === 1 && t3.j?.evaluation.ifApplied?.code === 'tier-not-allowed' && refusedWith(t3, 'would not show'), `tier 3 for a fee: would not be shown (tier-not-allowed) and refused (got ${t3.j?.evaluation.ifApplied?.code})`);
  const t3w = tool(d, opts({ tier: '3', url: 'https://mon.gov.ua/fixture-fees.pdf', decision: 'withhold', 'withhold-reason': 'Fixture: government page, not the fee schedule.' }));
  check(t3w.code === 0 && t3w.j?.evaluation.ifApplied?.code === 'evidence-not-publishable' && t3w.j?.evaluation.asPublish?.code === 'tier-not-allowed', 'withheld tier 3 fee entry: accepted, and the deeper reason (tier-not-allowed) is reported');
  const off = tool(d, opts({ tier: '1', url: 'https://agency.example/fees' }));
  check(off.code === 1 && off.j?.evaluation.ifApplied?.code === 'source-not-official', 'tier 1 fee on a host that is not the official website: source-not-official, refused');
  const http = tool(d, [...opts({ url: 'http://tools.fixture.example/fees.pdf' }), '--write']);
  check(http.code === 1 && refusedWith(http, '--url: must be an https URL'), 'non-https URL refused by the evidence schema');
  const snip = tool(d, [...opts({ method: 'read from a Google search snippet' }), '--write']);
  check(snip.code === 1 && snip.j?.evaluation.ifApplied?.code === 'source-not-evidence', `search-snippet method: source-not-evidence, refused (got ${snip.j?.evaluation.ifApplied?.code})`);
  const goog = tool(d, opts({ tier: '1', url: 'https://www.google.com/search?q=fixture' }));
  check(goog.code === 1 && goog.j?.evaluation.ifApplied?.code === 'source-not-evidence', 'search-engine URL: source-not-evidence, refused');
  const noq = tool(d, [...opts({ quote: null }), '--write']);
  check(noq.code === 1 && refusedWith(noq, 'missing: --quote'), 'missing quotation option refused');
  const emq = tool(d, [...opts({ quote: '' }), '--write']);
  check(emq.code === 1 && emq.j?.evaluation.ifApplied?.code === 'evidence-not-publishable' && refusedWith(emq, 'needs the exact quotation'), 'empty quotation with publish: evidence-not-publishable, refused');
  const silent = tool(d, opts({ value: 'null', quote: '', status: 'unverified', decision: 'withhold', 'withhold-reason': 'Fixture: the fee page read today does not state the fee.' }));
  check(silent.code === 0 && silent.j?.evaluation.ifApplied?.show === false, 'a silent page (value null, empty quotation, withhold) is accepted and not shown');
  const itemPath = 'programmes.medicine.requirements.entrance-exam';
  const inull = tool(d, [...opts({ path: itemPath, value: 'null', url: `${H}/admission`, tier: '1', type: 'web-page', quote: 'Fixture: entrance examination.' }), '--write']);
  check(inull.code === 1 && refusedWith(inull, 'silent page, which is never published'), `a publish decision with value null for a requirement item is refused (got ${inull.code}: ${inull.j?.refused?.join(' | ')})`);
  const isil = tool(d, opts({ path: itemPath, value: 'null', url: `${H}/admission`, tier: '1', type: 'web-page', quote: '', status: 'unverified', decision: 'withhold', 'withhold-reason': 'Fixture: the admission page read today does not state the examination.' }));
  check(isil.code === 0, `a silent page for a requirement item (value null, withhold) is accepted (got ${isil.code}: ${isil.j?.refused?.join(' | ')})`);
  const nr = tool(d, opts({ 'next-review': null }));
  check(nr.code === 1 && nr.j?.evaluation.ifApplied?.code === 'stale-review', 'time-sensitive fee without next review: stale-review, refused');
  const past = tool(d, opts({ value: JSON.stringify(money(1000, AY_PREV)), 'academic-year': AY_PREV }));
  check(past.code === 1 && past.j?.evaluation.ifApplied?.code === 'past-academic-year', `fee for an ended academic year: past-academic-year (got ${past.j?.evaluation.ifApplied?.code})`);
  const ayx = tool(d, opts({ 'academic-year': null }));
  check(ayx.code === 1 && ayx.j?.evaluation.ifApplied?.code === 'academic-year-not-evidenced', 'fee evidence without its academic year: academic-year-not-evidenced');
  const fit = tool(d, opts({ value: JSON.stringify({ amount: 1000, currency: 'EURO', per: 'year', academicYear: AY }) }));
  check(fit.code === 1 && refusedWith(fit, 'does not fit the record field'), 'a value the record field cannot hold is refused');
  const fut = tool(d, opts({ accessed: day(3) }));
  check(fut.code === 1 && refusedWith(fut, 'is in the future'), 'accessed date in the future refused');
  const pubu = tool(d, opts({ status: 'unverified' }));
  check(pubu.code === 1 && refusedWith(pubu, 'needs --status verified'), 'publish decision with status unverified refused');
  const wr = tool(d, opts({ decision: 'withhold' }));
  check(wr.code === 1 && refusedWith(wr, '--withhold-reason: a withheld entry must say why'), 'withhold without a reason refused by the evidence schema');
  const ct = tool(d, opts({ contradicts: `${SLUG}/officialName/99` }));
  check(ct.code === 1 && refusedWith(ct, 'is not an entry in this file'), 'contradicts naming an unknown entry refused');
  const oc = tool(d, opts({ type: 'owner-capture' }));
  check(oc.code === 1 && refusedWith(oc, 'needs --capture-ref'), 'owner capture without its file name refused');
  const ocp = tool(d, opts({ type: 'owner-capture', 'capture-ref': `/home/someone/${SLUG}--03--fees.pdf` }));
  check(ocp.code === 1 && refusedWith(ocp, 'file name only'), 'capture reference given as a path refused');
  check(tool(d, ['--bogus', 'x']).code === 2, 'unknown option is a usage error');
  check(tool(d, ['--apply-to-record', '--mark-outdated', `${SLUG}/officialName/1`]).code === 2, '--apply-to-record without a new entry is a usage error');
  check(tool(d, ['--value', '1', '--mark-outdated', `${SLUG}/officialName/1`]).code === 2, 'entry options without --path are a usage error');
  const esc = tool(d, [...opts({ quote: `Fixture tuition 1000 USD per year, ${AY}\u001b[2J\u0007` }), '--write']);
  check(esc.code === 1 && refusedWith(esc, '--quote contains a control character (U+001B, U+0007'), `a quotation with terminal control characters is refused (got ${esc.code}: ${esc.j?.refused?.join(' | ')})`);
  const c1 = tool(d, [...opts({ org: 'Fixture Tools\u009b Medical University' }), '--write']);
  check(c1.code === 1 && refusedWith(c1, '--org contains a control character (U+009B)'), 'a C1 control character in a one-line option is refused');
  const nl = tool(d, [...opts({ url: `${H}/fees\n.pdf` }), '--write']);
  check(nl.code === 1 && refusedWith(nl, '--url contains a control character (U+000A)'), 'a line break inside the URL is refused (the URL parser would silently drop it)');
  const cv = tool(d, [...opts({ path: 'officialName', value: JSON.stringify('Fixture Tools\u0008 Medical University'), tier: '1', type: 'web-page', url: `${H}/about`, 'academic-year': null, quote: 'Fixture Tools Medical University' }), '--write']);
  check(cv.code === 1 && refusedWith(cv, '--value contains a control character (U+0008)'), 'a control character inside a --value string is refused');
  const qbad = join(TMP, 'quote-bell.txt');
  writeFileSync(qbad, 'Fixture tuition\u0007 1000 USD\n');
  const qb = tool(d, [...opts({ quote: null, 'quote-file': qbad }), '--write']);
  check(qb.code === 1 && refusedWith(qb, '--quote-file contains a control character (U+0007'), 'a quote file with a control character is refused');
  check(snap(d) === before, 'after every refusal: files byte-identical');
  const ml = tool(d, opts({ quote: `Fixture tuition\t1000 USD\nper year, ${AY}` }));
  check(ml.code === 0 && ml.j?.entry?.quotation === `Fixture tuition\t1000 USD\nper year, ${AY}`, 'tabs and line feeds in a quotation are kept');
  const qf = join(TMP, 'quote-bom-crlf.txt');
  writeFileSync(qf, `\uFEFFFixture tuition 1000 USD\r\nper year, ${AY}\r\n\r\n`);
  const bom = tool(fresh(), [...opts({ quote: null, 'quote-file': qf }), '--write']);
  check(bom.code === 0 && bom.j?.entry?.quotation === `Fixture tuition 1000 USD\nper year, ${AY}`, `a quote file loses its byte-order mark, CRLF becomes LF and trailing line breaks go (got ${JSON.stringify(bom.j?.entry?.quotation)})`);

  const badv = tool(d, [...opts({ value: '{"amount": 1000,' }), '--write']);
  check(badv.code === 1 && refusedWith(badv, '--value is not valid JSON'), 'a --value that is not valid JSON is refused');
  check(snap(d) === before, 'after the malformed --value: files byte-identical');
  for (const [which, text] of [['ev', '{"slug": "fixture-tools-medical-university", "access": '], ['rec', '{"slug": "fixture-tools-medical-university"']]) {
    const m = fresh();
    writeFileSync(paths(m)[which], text);
    const mb = snap(m);
    const r = tool(m, [...opts(), '--write', '--apply-to-record']);
    const name = which === 'ev' ? 'evidence' : 'record';
    check(r.code === 1 && refusedWith(r, `the ${name} file is not valid JSON`) && snap(m) === mb, `a malformed ${name} file is refused and left as it is`);
    // Without --json the reason must be printed too (an early refusal once printed nothing at all).
    const h = spawnSync(process.execPath, [TOOL, '--records-dir', join(m, 'records'), '--evidence-dir', join(m, 'evidence'), '--slug', SLUG, ...opts()], { encoding: 'utf8', cwd: SITE, env: cleanEnv() });
    check(h.status === 1 && h.stdout.includes(`REFUSED: the ${name} file is not valid JSON`) && h.stdout.includes('Nothing was written.'), `without --json, the refusal of a malformed ${name} file is printed`);
  }
  const b = fresh({ access: 'blocked' });
  const bb = snap(b);
  const blk = tool(b, [...opts(), '--write']);
  check(blk.code === 1 && refusedWith(blk, 'access block says "blocked"'), 'Route A (pdf) entry refused while the access block says blocked');
  const cap = tool(b, opts({ type: 'owner-capture', 'capture-ref': `${SLUG}--03--fees.pdf`, method: 'fixture: read from owner capture' }));
  check(cap.code === 0 && cap.j?.evaluation.ifApplied?.show === true, 'Route B owner capture with its file name accepted while access is blocked');
  check(snap(b) === bb, 'blocked set: files byte-identical');
});

// ---------------------------------------------------------------------------------------------- 5. mark outdated
guard('the dry run applies the build\'s N24 (c) rule: no government listing, no official host', () => {
  // Same fixture, but the website is no longer listed by a government register: under the policy the university's own
  // site then supports nothing, so a fee read on it must be reported as "would not be shown" (never a false "would show").
  const d = fresh();
  const p = paths(d);
  const rec = JSON.parse(readFileSync(p.rec, 'utf8'));
  rec.website = { ...rec.website, status: 'unverified', source: null, checked: null };
  writeFileSync(p.rec, `${JSON.stringify(rec, null, 2)}\n`);
  const ev = JSON.parse(readFileSync(p.ev, 'utf8'));
  ev.entries = ev.entries.filter((e) => e.claimPath !== 'website');
  writeFileSync(p.ev, `${JSON.stringify(ev, null, 2)}\n`);
  const r = tool(d, opts());
  const ia = r.j?.evaluation?.ifApplied;
  check(ia && ia.show === false, `without a government listing the fee would not be shown (got ${JSON.stringify(ia)})`);
  check(ia && ia.code === 'source-not-official', `the reason is source-not-official (got ${ia?.code})`);
});

guard('--mark-outdated', () => {
  const d = fresh();
  check(tool(d, [...opts(), '--write', '--apply-to-record']).code === 0, 'setup: fee entry written and applied');
  const before = snap(d);
  const alone = tool(d, ['--mark-outdated', FEE_ID(1), '--outdated-reason', 'Fixture: replaced.', '--write']);
  check(alone.code === 1 && refusedWith(alone, 'would break rule R10'), 'marking the only support of a verified claim outdated is refused (R10)');
  check(snap(d) === before, 'refused mark-outdated: files byte-identical');
  const old = readEv(d).entries.find((e) => e.id === FEE_ID(1));
  const fix = tool(d, [...opts({ value: JSON.stringify(money(1200)), quote: `Fixture tuition 1200 USD per year, ${AY}` }), '--mark-outdated', FEE_ID(1), '--write', '--apply-to-record']);
  check(fix.code === 0 && fix.j?.id === FEE_ID(2) && fix.j?.markedOutdated === FEE_ID(1), `correction: new entry .../2 plus old entry marked outdated (got ${fix.code}: ${fix.j?.refused?.join(' | ')})`);
  const ev = readEv(d), rec = readRec(d);
  const o1 = ev.entries.find((e) => e.id === FEE_ID(1));
  check(o1.status === 'outdated' && o1.decision === 'withhold' && o1.withholdReason.includes(`Superseded by ${FEE_ID(2)}`), 'old entry: status outdated, decision withhold, reason names the new entry');
  check(deepEqual({ ...o1, status: old.status, decision: old.decision, withholdReason: old.withholdReason }, old), 'old entry: every other field unchanged');
  check(deepEqual(claimAt(rec, 'programmes.medicine.tuition').value, money(1200)) && r10(rec, ev.entries).length === 0, 'record follows the correction and R10 holds');
  check(evaluateClaim('programmes.medicine.tuition', claimAt(rec, 'programmes.medicine.tuition'), ev.entries, { now: NOW, ...HOSTS }).show === true, 'the outdated entry no longer conflicts: the corrected claim is shown');
  const again = tool(d, ['--mark-outdated', FEE_ID(1), '--outdated-reason', 'x', '--write']);
  check(again.code === 1 && refusedWith(again, 'already outdated'), 'marking an outdated entry again is refused');
  const unk = tool(d, ['--mark-outdated', `${SLUG}/officialName/42`, '--outdated-reason', 'x', '--write']);
  check(unk.code === 1 && refusedWith(unk, 'not an existing entry'), 'marking an unknown entry is refused');
  const nor = tool(d, ['--mark-outdated', `${SLUG}/officialName/1`, '--write']);
  check(nor.code === 1 && refusedWith(nor, 'needs --outdated-reason'), 'marking outdated alone needs a reason');
  const ok = tool(d, ['--mark-outdated', `${SLUG}/officialName/1`, '--outdated-reason', 'Fixture: the page has moved.', '--write']);
  const e1 = readEv(d).entries.find((e) => e.id === `${SLUG}/officialName/1`);
  check(ok.code === 0 && e1.status === 'outdated' && e1.withholdReason === 'Fixture: the page has moved.', 'marking a withheld entry outdated alone works');
  check(stableText(paths(d).ev) && stableText(paths(d).rec), 'files keep their JSON layout after the corrections');
});

// ---------------------------------------------------------------------------------------------- 6. capture intake
guard('capture-intake.py', () => {
  const py = spawnSync('python3', ['-I', '-c', 'import sys; print(sys.executable)'], { encoding: 'utf8' }).stdout.trim();
  const intake = (args, env) => {
    const r = spawnSync(py, ['-I', INTAKE, ...args], { encoding: 'utf8', cwd: SITE, env: env ?? process.env });
    const w = /Extracted text: (.+?) \(temporary/.exec(r.stdout ?? '')?.[1];
    if (w) WORK_DIRS.push(w); // removed at exit, whatever happens
    return r;
  };
  const inRepo = intake([FIX, SLUG]);
  check(inRepo.status === 2 && inRepo.stderr.includes('inside the repository'), 'refuses a captures folder inside the repository');
  const parent = intake([dirname(REPO), SLUG]);
  check(parent.status === 2 && parent.stderr.includes('contains the repository'), 'refuses a folder that contains the repository');
  const gitLike = join(TMP, 'other-repo');
  mkdirSync(join(gitLike, '.git'), { recursive: true });
  mkdirSync(join(gitLike, 'caps'));
  const og = intake([join(gitLike, 'caps'), SLUG]);
  check(og.status === 2 && og.stderr.includes('inside a git working tree'), 'refuses a folder inside another git working tree');
  check(intake([join(TMP, 'missing-folder'), SLUG]).status === 2, 'refuses a folder that does not exist');
  const linkIn = join(TMP, 'link-into-repo');
  symlinkSync(FIX, linkIn, 'dir');
  const li = intake([linkIn, SLUG]);
  check(li.status === 2 && li.stderr.includes('inside the repository'), 'refuses a symbolic link outside the repository that points to a folder inside it (the real path is checked)');

  const caps = join(TMP, 'captures');
  mkdirSync(caps);
  const html = `<html><head><title>Fixture admission</title><script>var x = "FIXTURE-SCRIPT-CANARY";</script><style>.c{color:red}</style></head><body><h1>Admission</h1><p>Fixture Tools Medical University admits
    international applicants to the fixture Medicine programme.</p><p>Fees &amp; charges: see the fee schedule.</p></body></html>`;
  writeFileSync(join(caps, `${SLUG}--01--admission.html`), html);
  writeFileSync(join(caps, `${SLUG}--03--fees.pdf`), pdf(['Fixture cover page', `Fixture tuition fee for the ${AY.slice(0, 4)}/20${AY.slice(5)} academic year`]));
  writeFileSync(join(caps, 'notes.txt'), 'Fixture plain text capture phrase.\n');
  writeFileSync(join(caps, `${SLUG}--09--extra.png`), Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  writeFileSync(join(caps, 'forged\nREFUSED: fake.txt'), 'x');
  const sha = (f) => createHash('sha256').update(readFileSync(join(caps, f))).digest('hex');
  const feePhrase = `tuition fee for the ${AY.slice(0, 4)}/20${AY.slice(5)}`;
  const run = intake([caps, SLUG, '--register', join(FIX, 'EVIDENCE_REGISTER.md'), '--find', 'admits   INTERNATIONAL applicants', '--find', feePhrase, '--find', 'FIXTURE-SCRIPT-CANARY', '--find', 'plain text capture']);
  const out = run.stdout;
  check(run.status === 0, `capture intake runs on an outside folder (got ${run.status}: ${run.stderr.slice(0, 300)})`);
  for (const f of [`${SLUG}--01--admission.html`, `${SLUG}--03--fees.pdf`, 'notes.txt']) check(out.includes(`| ${f} | ${readFileSync(join(caps, f)).length} | ${sha(f)} |`), `lists ${f} with its size and SHA-256`);
  check(/Rows with a capture:\n\s+1\. Fixture admission page: .*--01--admission\.html\n\s+3\. Fixture fee schedule: .*--03--fees\.pdf/.test(out), 'register rows 1 and 3 have a capture');
  check(/still missing a capture[^\n]*\n\s+2\. Fixture contacts page\n\s+4\. To locate: Fixture dated statement/.test(out), 'register rows 2 and 4 are listed as missing');
  check(out.includes('notes.txt: does not follow') && out.includes('row 9 is not in section A'), 'misnamed files and unknown rows are reported');
  check(!out.includes('\nREFUSED: fake') && out.includes('| forged REFUSED: fake.txt | 1 |'), 'a line break in a file name is printed as a space, so a name cannot forge a line of the report');
  check(/Phrase "admits   INTERNATIONAL applicants": 1 match\(es\)\n\s+fixture-tools-medical-university--01--admission\.html, page 1: .*\[\[admits international applicants\]\]/.test(out), 'finds a phrase in an HTML capture across a line break, ignoring case, with its page');
  check(/Phrase "FIXTURE-SCRIPT-CANARY": 0 match/.test(out), 'script content is not treated as page text');
  check(/Phrase "plain text capture": 1 match\(es\)\n\s+notes\.txt, page 1/.test(out), 'finds a phrase in a text capture');
  const m = /Extracted text: (.+?) \(temporary/.exec(out);
  const work = m ? m[1] : null;
  check(!!work && isAbsolute(work) && relative(REPO, work).startsWith('..') && existsSync(work) && readdirSync(work).length >= 2, 'extracted text goes to a temporary folder outside the repository');
  const hasPdftotext = spawnSync('sh', ['-c', 'command -v pdftotext'], { encoding: 'utf8' }).status === 0;
  if (hasPdftotext) {
    check(new RegExp(`Phrase "${feePhrase.replace(/[/.]/g, '\\$&')}": 1 match\\(es\\)\\n\\s+${SLUG}--03--fees\\.pdf, page 2:`).test(out), 'finds a phrase in a PDF capture on page 2 (pdftotext)');
    const emptyPath = join(TMP, 'empty-path');
    mkdirSync(emptyPath);
    const noPdf = intake([caps, SLUG, '--register', join(FIX, 'EVIDENCE_REGISTER.md'), '--find', feePhrase], { ...process.env, PATH: emptyPath });
    check(noPdf.status === 0 && noPdf.stdout.includes('pdftotext is not installed') && noPdf.stdout.includes('PDF text not extracted'), 'without pdftotext the PDF part is skipped with a message');
  } else {
    console.log('SKIP PDF phrase search: pdftotext is not installed here');
    check(out.includes('pdftotext is not installed'), 'without pdftotext the PDF part is skipped with a message');
  }
  check(gitStatus() === GIT_BEFORE, 'capture intake wrote nothing into the repository (git status unchanged)');
});

// ---------------------------------------------------------------------------------------------- end
const REAL_AFTER = realSnapshot();
check(Object.keys(REAL_AFTER).length === Object.keys(REAL_BEFORE).length && Object.entries(REAL_BEFORE).every(([f, t]) => REAL_AFTER[f] === t), 'the real records and evidence files are byte-identical (only fixture copies were written)');
check(gitStatus() === GIT_BEFORE, 'git status of the repository is unchanged');
console.log(`evidence-tools: ${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);

/** A minimal PDF with one line of text per page (ASCII only). @param {string[]} pages */
function pdf(pages) {
  const objs = [];
  const font = 3 + 2 * pages.length;
  objs[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objs[2] = `<< /Type /Pages /Kids [${pages.map((_, i) => `${3 + 2 * i} 0 R`).join(' ')}] /Count ${pages.length} >>`;
  pages.forEach((text, i) => {
    const stream = `BT /F1 12 Tf 72 720 Td (${text.replace(/[()\\]/g, (c) => `\\${c}`)}) Tj ET`;
    objs[3 + 2 * i] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${font} 0 R >> >> /Contents ${4 + 2 * i} 0 R >>`;
    objs[4 + 2 * i] = `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`;
  });
  objs[font] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
  let s = '%PDF-1.4\n';
  const offsets = [];
  for (let i = 1; i < objs.length; i++) { offsets[i] = Buffer.byteLength(s); s += `${i} 0 obj\n${objs[i]}\nendobj\n`; }
  const xref = Buffer.byteLength(s);
  s += `xref\n0 ${objs.length}\n0000000000 65535 f \n${offsets.slice(1).map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('')}`;
  s += `trailer\n<< /Size ${objs.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(s, 'latin1');
}
