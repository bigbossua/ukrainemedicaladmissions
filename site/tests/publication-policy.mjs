// Publication policy unit tests (node, no build). Every rule of src/lib/publication.mjs and the evidence schema of
// src/lib/evidence.mjs, including the twelve owner scenarios:
//   (1) flagged publishable with no evidence        (7) required field empty
//   (2) verified name but unverified fees           (8) malicious input in a verified value
//   (3) conflicting tuition amounts                 (9) a private field added to the source record
//   (4) expired admission deadline                  (10) a new schema field without a policy entry
//   (5) internal notes                              (11) passes preview but fails publication
//   (6) recognition backed only by the university   (12) stale data
// plus static checks over src/: only lib/records.ts reads the universities collection, and every JSON-LD block is
// written through serializeJsonLd. Prints "publication-policy: N checks, M failures".
import { readdirSync, readFileSync, statSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { tmpdir } from 'node:os';
import { z } from 'astro/zod';
import { record, programme } from '../src/content/schema.mjs';
import { parseEvidence, loadEvidence, evidenceFile } from '../src/lib/evidence.mjs';
import {
  FIELD_POLICY, policyCoverage, assertPolicyCoverage, evaluateClaim, toPublicRecord, evaluatePublication, publicationDecision,
  publicationBuildError, viewClaim, viewItems, serializeJsonLd, profileJsonLd, currentAcademicYear, listClaims, PUBLIC_REASONS,
} from '../src/lib/publication.mjs';
import { readFixture, FIXTURE_ROOT, academicYear } from './fixtures/publication/materialise.mjs';

let checks = 0, failures = 0;
const check = (cond, msg) => { checks++; if (!cond) { failures++; console.log('FAIL', msg); } };
const eq = (a, b, msg) => check(JSON.stringify(a) === JSON.stringify(b), `${msg}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const section = (name) => console.log(`-- ${name}`);

const NOW = new Date('2026-10-11T12:00:00Z');
const AY = currentAcademicYear(NOW); // 2026/27
const day = (n) => new Date(NOW.getTime() + n * 86400000).toISOString().slice(0, 10);
const SLUG = 'unit-test-university';
const H = 'https://unit.example';
const NOTE = 'CANARY-NOTE Search-snippet lead (official domain) — NOT verified; read the official page before publishing.';
const V = (value, source = `${H}/page`, extra = {}) => ({ value, status: 'verified', source, checked: day(-2), ...extra });
const U = (value) => ({ value, status: 'unverified', source: null, checked: null, note: NOTE });
const money = (amount, ay = AY) => ({ amount, currency: 'USD', per: 'year', academicYear: ay });
const entry = (claimPath, value, o = {}) => ({
  id: `${SLUG}/${claimPath}/${o.n ?? 1}`, claimPath, statement: `statement for ${claimPath}`, value, sourceUrl: `${H}/page`, sourceOrganisation: 'Unit Test University',
  sourceTier: 1, evidenceType: 'web-page', quotation: 'quoted passage', effectiveDate: null, academicYear: null, accessed: day(-2), captureRef: null,
  status: 'verified', reviewer: 'unit test', method: 'unit test', contradicts: [], nextReview: day(90), decision: 'publish', withholdReason: null,
  ...Object.fromEntries(Object.entries(o).filter(([k]) => k !== 'n')),
});
const evidence = (entries) => ({ slug: SLUG, access: { status: 'open', checked: day(-2), note: 'unit test' }, entries });
const ev = (claimPath, value, o) => [entry(claimPath, value, o)];
const C = (path, claim, entries, opts = {}) => evaluateClaim(path, claim, entries, { now: NOW, ...opts });

/** A minimal record that passes the policy, and its evidence. */
function passing() {
  const np = { value: null, status: 'not-published', source: null, checked: null };
  const prog = {
    id: 'medicine', name: 'Medicine', field: 'medicine', level: V('integrated_master'), specialtyCode: np, qualification: np, durationYears: V(6), durationText: np,
    language: V(['English']), format: np, internationalAdmission: V(true), intakeYear: V(AY), tuition: V(money(5000)), otherMandatoryCosts: [],
    entryRequirements: np, requirements: [], requiredDocuments: np, documents: [], deadlines: np, intake: np,
  };
  const rec = record.parse({
    slug: SLUG, officialName: V('Unit Test University'), shortName: 'Unit Test University', status: V('operating'), statusStatement: V('Teaching is in person this year.'),
    teachingFormat: V('in-person'), city: 'Testville', address: V('1 Test Street'), website: V(`${H}/`), internationalOffice: np, founded: np, overview: 'Unit test record.',
    accreditation: np, recognition: np, accommodation: np, programmes: [prog], verification: { publishable: true, lastReview: day(-10), openQuestions: [] },
  });
  const entries = [
    entry('officialName', 'Unit Test University'), entry('status', 'operating'), entry('statusStatement', 'Teaching is in person this year.', { academicYear: AY }),
    entry('teachingFormat', 'in-person'), entry('address', '1 Test Street'), entry('website', `${H}/`),
    entry('programmes.medicine.level', 'integrated_master'), entry('programmes.medicine.durationYears', 6), entry('programmes.medicine.language', ['English']),
    entry('programmes.medicine.internationalAdmission', true), entry('programmes.medicine.intakeYear', AY), entry('programmes.medicine.tuition', money(5000), { academicYear: AY }),
  ];
  return { rec, ev: evidence(entries) };
}
const clone = (x) => JSON.parse(JSON.stringify(x));
const deepKeys = (o, out = new Set()) => { if (Array.isArray(o)) o.forEach((x) => deepKeys(x, out)); else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) { out.add(k); deepKeys(v, out); } return out; };

// ------------------------------------------------------------------------------------------------ field policy
section('field policy');
{
  const cov = policyCoverage(record);
  eq(cov, { missing: [], stale: [] }, 'every schema key is classified and every policy entry exists in the schema');
  const classes = new Set(Object.values(FIELD_POLICY).flatMap((p) => Object.values(p)));
  check([...classes].every((c) => ['public', 'editorial-public', 'internal'].includes(c)), `only the three classes are used: ${[...classes]}`);
  for (const [shape, key] of [['claim', 'note'], ['record', 'researchReferences'], ['verification', 'openQuestions'], ['verification', 'reviewer'], ['record', 'deferredProgrammes'], ['record', 'faqs'], ['record', 'images'], ['record', 'synthetic'], ['requirement', 'note'], ['documentRequirement', 'note'], ['preparatoryRoute', 'note'], ['claim', 'status'], ['record', 'alternativeNames'], ['programme', 'gradingNote']])
    check(FIELD_POLICY[shape][key] === 'internal', `${shape}.${key} must be internal`);
  for (const [shape, key] of [['record', 'slug'], ['record', 'shortName'], ['record', 'city'], ['record', 'overview']]) check(FIELD_POLICY[shape][key] === 'editorial-public', `${shape}.${key} must be editorial-public`);
  // (10) a new schema field without a policy entry
  const extended = record.extend({ partnerAgency: z.string().optional() });
  check(policyCoverage(extended).missing.includes('record.partnerAgency'), '(10) a new record field without a policy entry is reported');
  const nested = record.extend({ programmes: z.array(programme.extend({ agentCommission: z.string() })) });
  check(policyCoverage(nested).missing.includes('programme.agentCommission'), '(10) a new programme field without a policy entry is reported');
  const claimExt = record.extend({ website: z.object({ value: z.string().nullable(), status: z.string(), source: z.string().nullable(), checked: z.string().nullable(), note: z.string().optional(), internalRef: z.string().optional() }) });
  check(policyCoverage(claimExt).missing.some((m) => m.startsWith('claim.internalRef')), '(10) a new claim key without a policy entry is reported');
  const objExt = record.extend({ sponsor: z.object({ name: z.string() }) });
  check(policyCoverage(objExt).missing.includes('record.sponsor'), '(10) a new nested object without a policy is reported');
  let threw = false; try { assertPolicyCoverage(extended); } catch (e) { threw = /partnerAgency/.test(e.message); }
  check(threw, '(10) assertPolicyCoverage (called by every build) throws, naming the field');
  // An unclassified field is never projected even before anyone notices.
  const { rec, ev: e } = passing();
  const pub = toPublicRecord({ ...rec, partnerAgency: 'CANARY-AGENCY' }, e, { now: NOW });
  check(!JSON.stringify(pub).includes('CANARY-AGENCY'), '(10) an unclassified field never reaches the projection');
}

// ------------------------------------------------------------------------------------------------ evaluateClaim
section('evaluateClaim');
{
  const ok = C('officialName', V('Name'), ev('officialName', 'Name'));
  eq([ok.show, ok.value, ok.publicState, ok.source], [true, 'Name', 'verified', `${H}/page`], 'a verified claim with matching evidence is shown');
  const hidden = (r, state, code, msg) => { check(!r.show && r.value === null && r.source === null && r.checked === null, `${msg}: must be withheld with no value/source/checked`); if (state) eq(r.publicState, state, `${msg} public state`); if (code) eq(r.code, code, `${msg} code`); check(Object.values(PUBLIC_REASONS).includes(r.reason), `${msg}: reason must be a fixed public sentence`); check(!JSON.stringify(r).includes('CANARY'), `${msg}: the note leaked`); };
  hidden(C('officialName', U('Name'), ev('officialName', 'Name')), 'to-be-confirmed', 'not-verified', 'unverified record claim');
  hidden(C('officialName', { ...V('Name'), status: 'outdated', note: NOTE }, ev('officialName', 'Name')), 'under-review', 'not-verified', 'outdated record claim');
  hidden(C('officialName', { ...V('Name'), status: 'partially-verified', note: NOTE }, ev('officialName', 'Name')), 'under-review', 'not-verified', 'partially verified record claim');
  hidden(C('officialName', { ...V('Name'), status: 'not-published' }, ev('officialName', 'Name')), 'to-be-confirmed', 'not-verified', 'not-published record claim');
  // (7) required field empty
  for (const empty of ['', '   ', [], [''], {}, null]) hidden(C('officialName', V(empty), ev('officialName', empty)), null, null, `(7) empty value ${JSON.stringify(empty)}`);
  hidden(C('internationalOffice', V({ email: '' }), ev('internationalOffice', { email: '' })), null, 'empty', '(7) empty office object');
  hidden(C('officialName', V('Name', 'http://unit.example/page'), ev('officialName', 'Name')), 'under-review', 'source-not-https', 'http source');
  hidden(C('officialName', { ...V('Name'), source: null }, ev('officialName', 'Name')), 'under-review', 'source-not-https', 'no source');
  hidden(C('officialName', { ...V('Name'), checked: null }, ev('officialName', 'Name')), 'under-review', 'no-check-date', 'no check date');
  hidden(C('officialName', { ...V('Name'), checked: day(3) }, ev('officialName', 'Name')), 'under-review', 'check-date-future', 'check date in the future');
  hidden(C('officialName', V('Name'), []), 'to-be-confirmed', 'no-evidence', '(1) no evidence entry');
  hidden(C('officialName', V('Name'), ev('address', 'Name')), 'to-be-confirmed', 'no-evidence', 'evidence for another path');
  hidden(C('officialName', V('Name'), ev('officialName', 'Name', { status: 'partially-verified' })), 'under-review', 'evidence-not-publishable', 'evidence partially verified');
  hidden(C('officialName', V('Name'), ev('officialName', 'Name', { status: 'unverified' })), 'under-review', 'evidence-not-publishable', 'evidence unverified');
  hidden(C('officialName', V('Name'), ev('officialName', 'Name', { decision: 'withhold', withholdReason: 'why' })), 'under-review', 'evidence-not-publishable', 'evidence decision withhold');
  hidden(C('officialName', V('Name'), ev('officialName', 'Name', { quotation: '  ' })), 'under-review', 'evidence-not-publishable', 'evidence without a quotation');
  hidden(C('officialName', V('Name'), ev('officialName', 'Name', { accessed: day(2) })), 'under-review', 'evidence-not-publishable', 'evidence accessed in the future');
  hidden(C('officialName', V('Name'), ev('officialName', 'Other name')), 'withheld-conflict', 'value-mismatch', 'verified evidence with a different value');
  hidden(C('officialName', V('Name'), [entry('officialName', 'Name'), entry('officialName', 'Name', { n: 2, status: 'conflicting', decision: 'withhold', withholdReason: 'x' })]), 'withheld-conflict', 'conflict', 'a conflicting entry beside a good one');
  hidden(C('officialName', { ...V('Name'), status: 'conflicting', note: NOTE }, ev('officialName', 'Name')), 'withheld-conflict', 'conflict', 'record claim marked conflicting');
  hidden(C('officialName', V('Name'), ev('officialName', 'Name', { sourceTier: 5 })), 'under-review', 'tier-not-allowed', 'tier 5 source');
  hidden(C('officialName', V('Name'), ev('officialName', 'Name', { sourceTier: 4 })), 'under-review', 'tier-not-allowed', 'tier 4 for a non-recognition claim');
  hidden(C('officialName', V('Name', `${H}/other`), ev('officialName', 'Name')), 'under-review', 'source-mismatch', 'record source is not the evidence page');
  check(C('accreditation', V('Cert 1', 'https://register.example/1'), ev('accreditation', 'Cert 1', { sourceTier: 3, sourceUrl: 'https://register.example/1' })).show, 'accreditation from a tier-3 register is shown');
  hidden(C('website', V('javascript:alert(1)'), ev('website', 'javascript:alert(1)')), 'under-review', 'unsafe-url', 'website value that is not https');
  hidden(C('internationalOffice', V({ url: 'javascript:alert(1)' }), ev('internationalOffice', { url: 'javascript:alert(1)' })), 'under-review', 'unsafe-url', 'office url that is not https');
  // (6) recognition: only tier 4, never on the university's own website
  const recog = ['Listed by the destination regulator'];
  for (const tier of [1, 2, 3]) hidden(C('recognition', V(recog, `${H}/recognition`), ev('recognition', recog, { sourceTier: tier, sourceUrl: `${H}/recognition` })), 'under-review', 'tier-not-allowed', `(6) recognition backed by a tier-${tier} source (the university's own page)`);
  hidden(C('recognition', V(recog, 'https://www.unit.example/recognition'), ev('recognition', recog, { sourceTier: 4, sourceUrl: 'https://www.unit.example/recognition' }), { officialHosts: ['unit.example'] }), 'under-review', 'recognition-from-university', '(6) "tier 4" recognition evidence hosted on the university website');
  check(C('recognition', V(recog, 'https://regulator.example/list'), ev('recognition', recog, { sourceTier: 4, sourceUrl: 'https://regulator.example/list' }), { officialHosts: ['unit.example'] }).show, 'recognition from a tier-4 authority is shown');
  // (3) conflicting tuition amounts
  const t = money(5000);
  hidden(C('programmes.medicine.tuition', V(t), [entry('programmes.medicine.tuition', t, { academicYear: AY }), entry('programmes.medicine.tuition', money(5100), { n: 2, academicYear: AY })]), 'withheld-conflict', 'conflict', '(3) two verified entries with different amounts');
  hidden(C('programmes.medicine.tuition', U(t), [entry('programmes.medicine.tuition', t, { academicYear: AY }), entry('programmes.medicine.tuition', money(5100), { n: 2, academicYear: AY })]), 'withheld-conflict', 'conflict', '(3) disagreeing verified entries withhold even an unverified record claim');
  hidden(C('programmes.medicine.tuition', V(money(5100)), ev('programmes.medicine.tuition', t, { academicYear: AY })), 'withheld-conflict', 'value-mismatch', '(3) record fee differs from the verified evidence');
  hidden(C('programmes.medicine.tuition', V(t), [entry('programmes.medicine.tuition', t, { academicYear: AY }), entry('programmes.medicine.tuition', money(5100), { n: 2, academicYear: AY, status: 'conflicting', decision: 'withhold', withholdReason: 'disagree' })]), 'withheld-conflict', 'conflict', '(3) a verified and a conflicting entry');
  check(C('programmes.medicine.tuition', V(t), ev('programmes.medicine.tuition', t, { academicYear: AY })).show, 'current fee with matching evidence is shown');
  check(C('programmes.medicine.tuition', V(money(5000, academicYear(NOW, 1))), ev('programmes.medicine.tuition', money(5000, academicYear(NOW, 1)), { academicYear: academicYear(NOW, 1) })).show, 'next year fee is shown');
  // (12) stale data
  hidden(C('programmes.medicine.tuition', V(money(5000, academicYear(NOW, -1))), ev('programmes.medicine.tuition', money(5000, academicYear(NOW, -1)), { academicYear: academicYear(NOW, -1) })), 'under-review', 'past-academic-year', '(12) fee for an academic year that has ended');
  hidden(C('programmes.medicine.tuition', V(t), ev('programmes.medicine.tuition', t, { academicYear: AY, nextReview: day(-1) })), 'under-review', 'stale-review', '(12) fee evidence past its next review date');
  hidden(C('programmes.medicine.tuition', V(t), ev('programmes.medicine.tuition', t, { academicYear: AY, nextReview: null })), 'under-review', 'stale-review', '(12) fee evidence without a next review date');
  hidden(C('programmes.medicine.tuition', V(t), ev('programmes.medicine.tuition', t)), 'under-review', 'academic-year-not-evidenced', 'fee evidence that does not name the academic year');
  hidden(C('programmes.medicine.tuition', V({ ...t, academicYear: '2026' }), ev('programmes.medicine.tuition', { ...t, academicYear: '2026' }, { academicYear: AY })), 'under-review', 'past-academic-year', 'fee with a malformed academic year');
  hidden(C('programmes.medicine.otherMandatoryCosts.0', V(t), ev('programmes.medicine.otherMandatoryCosts.0', t, { academicYear: AY, nextReview: day(-30) })), 'under-review', 'stale-review', '(12) other cost past review');
  hidden(C('preparatoryRoutes.prep.startDate', V('1 November'), ev('preparatoryRoutes.prep.startDate', '1 November', { nextReview: day(-1) })), 'under-review', 'stale-review', '(12) preparatory start date past review');
  hidden(C('programmes.medicine.intakeYear', V(academicYear(NOW, -1)), ev('programmes.medicine.intakeYear', academicYear(NOW, -1))), 'under-review', 'past-intake', '(12) intake year that has ended');
  hidden(C('statusStatement', V('We teach in person.'), ev('statusStatement', 'We teach in person.', { effectiveDate: `${NOW.getUTCFullYear() - 1}-10-01` })), 'under-review', 'statement-not-current', "(12) last year's statement");
  check(C('statusStatement', V('We teach in person.'), ev('statusStatement', 'We teach in person.', { effectiveDate: day(-20) })).show, 'a statement dated this academic year is shown');
  check(C('officialName', V('Name'), ev('officialName', 'Name', { nextReview: null })).show, 'a non-time-sensitive claim needs no next review date');
  // (4) expired admission deadline
  const dl = (date) => [{ label: 'Applications close', date }];
  hidden(C('programmes.medicine.deadlines', V(dl(day(-1))), ev('programmes.medicine.deadlines', dl(day(-1)))), 'under-review', 'deadline-passed', '(4) a deadline that has passed is never shown as open');
  hidden(C('programmes.medicine.deadlines', V([...dl(day(30)), ...dl(day(-3))]), ev('programmes.medicine.deadlines', [...dl(day(30)), ...dl(day(-3))])), 'under-review', 'deadline-passed', '(4) a list with one passed deadline');
  hidden(C('programmes.medicine.deadlines', V(dl('1 November')), ev('programmes.medicine.deadlines', dl('1 November'))), 'under-review', 'deadline-unparseable', 'a deadline without its year');
  check(C('programmes.medicine.deadlines', V(dl(day(30))), ev('programmes.medicine.deadlines', dl(day(30)))).show, 'a future deadline is shown');
  check(C('programmes.medicine.deadlines', V(dl(day(0))), ev('programmes.medicine.deadlines', dl(day(0)))).show, "today's deadline is still open");
  // Items carry their content as the value
  const item = { type: 'subject', summary: 'Biology', subject: 'Biology', intakeYear: AY };
  check(C('programmes.medicine.requirements.bio', V(item), ev('programmes.medicine.requirements.bio', item)).show, 'a verified requirement item with matching evidence is shown');
  hidden(C('programmes.medicine.requirements.bio', V({ ...item, intakeYear: academicYear(NOW, -1) }), ev('programmes.medicine.requirements.bio', { ...item, intakeYear: academicYear(NOW, -1) })), 'under-review', 'past-intake', '(12) requirement for a past intake');
  // (8) malicious input in a verified value: shown as data, escaped by the renderer and by serializeJsonLd
  const evil = 'A </script><script>alert(1)</script> & \u2028 B';
  const m = C('address', V(evil), ev('address', evil));
  check(m.show && m.value === evil, '(8) a verified value is passed through unchanged (escaping is the renderer\'s job)');
  const ld = serializeJsonLd({ address: evil });
  check(!/[<>]/.test(ld) && !ld.includes('\u2028') && !ld.includes('\u2029') && !ld.includes('&'), `(8) serializeJsonLd escapes < > & and line separators: ${ld}`);
  eq(JSON.parse(ld).address, evil, '(8) serializeJsonLd round-trips exactly');
}

// ------------------------------------------------------------------------------------------------ toPublicRecord
section('toPublicRecord');
{
  const alphaRec = record.parse(readFixture(join(FIXTURE_ROOT, 'pass/universities/fixture-alpha-medical-university.json'), NOW));
  const alphaEv = readFixture(join(FIXTURE_ROOT, 'pass/evidence/fixture-alpha-medical-university.json'), NOW);
  const pub = toPublicRecord(alphaRec, alphaEv, { now: NOW });
  const s = JSON.stringify(pub);
  // (5) internal notes
  check(!s.includes('CANARY'), `(5) projection of the trap fixture contains a canary: ${(s.match(/CANARY[-A-Z0-9]*/g) ?? []).slice(0, 5)}`);
  check(!s.includes('NOT verified'), '(5) projection contains research-note wording');
  const keys = deepKeys(pub);
  for (const k of ['note', 'researchReferences', 'deferredProgrammes', 'openQuestions', 'reviewer', 'faqs', 'images', 'synthetic', 'alternativeNames', 'gradingNote', 'entryRequirements', 'requiredDocuments', 'status' + 'Internal', 'publishable', 'code'])
    check(!keys.has(k), `(5) projection carries the internal key "${k}"`);
  // Only public / editorial-public keys (plus the withheld counters) at record level
  const allowed = new Set([...Object.entries(FIELD_POLICY.record).filter(([, c]) => c !== 'internal').map(([k]) => k), 'programmesWithheld', 'routesWithheld']);
  check(Object.keys(pub).every((k) => allowed.has(k)), `projection record keys ${Object.keys(pub).filter((k) => !allowed.has(k))}`);
  eq(pub.programmes.map((p) => p.id), ['medicine'], 'only the listable programme is projected');
  eq([pub.programmesWithheld, pub.routesWithheld], [2, 1], 'withheld programmes and routes are counted');
  const med = pub.programmes[0];
  eq([med.requirements.length, med.requirementsWithheld, med.documents.length, med.documentsWithheld, med.otherMandatoryCosts.length, med.otherCostsWithheld], [1, 1, 1, 1, 1, 1], 'unverified items are dropped and counted');
  eq([med.tuition.show, med.tuition.value?.amount], [true, 7123], 'verified fee shown');
  eq([med.deadlines.show, med.deadlines.publicState], [false, 'under-review'], '(4) expired deadline withheld in the projection');
  eq(pub.recognition.show, false, '(6) recognition backed only by the university is withheld');
  eq(pub.verification, { lastReview: alphaRec.verification.lastReview }, 'verification carries only lastReview');
  // A NEW object: changing it never changes the record
  pub.officialName.value = 'changed'; pub.programmes[0].tuition.value.amount = 1;
  check(alphaRec.officialName.value !== 'changed' && alphaRec.programmes[0].tuition.value.amount === 7123, 'projection shares no objects with the record');
  // (2) verified name but unverified fees
  const { rec, ev: e } = passing();
  const r2 = clone(rec); r2.programmes[0].tuition = { value: money(98765), status: 'unverified', source: null, checked: null, note: NOTE };
  const eNoFee = clone(e); eNoFee.entries = eNoFee.entries.filter((x) => x.claimPath !== 'programmes.medicine.tuition');
  const p2 = toPublicRecord(r2, eNoFee, { now: NOW });
  check(p2.officialName.show && !p2.programmes.length, '(2) name shown; programme not listed while its fee page is not read');
  check(!JSON.stringify(p2).includes('98765') && !JSON.stringify(p2).includes('CANARY'), '(2) the unverified fee amount and its note never reach the projection');
  const pMismatch = toPublicRecord(r2, e, { now: NOW });
  check(pMismatch.programmes[0]?.tuition.show === false && !JSON.stringify(pMismatch).includes('98765') && !JSON.stringify(pMismatch).includes('5000'), '(2) unverified record fee beside a verified evidence entry: neither amount is shown');
  const e2 = clone(eNoFee); e2.entries.push(entry('programmes.medicine.tuition', money(98765), { academicYear: AY, status: 'unverified', decision: 'withhold', withholdReason: 'not confirmed' }));
  const p2b = toPublicRecord(r2, e2, { now: NOW });
  check(p2b.programmes.length === 1 && p2b.programmes[0].tuition.show === false && !JSON.stringify(p2b).includes('98765'), '(2) with the fee page read: programme listed, fee "To be confirmed", amount absent');
  // (9) a private field added to the source record (raw, not schema-stripped)
  const raw = clone(rec);
  raw.privateNotes = 'CANARY-PRIVATE-RECORD'; raw.officialName.internalComment = 'CANARY-PRIVATE-CLAIM'; raw.programmes[0].agentFee = 'CANARY-PRIVATE-PROGRAMME';
  raw.programmes[0].tuition.value.agentMargin = 'CANARY-PRIVATE-MONEY'; raw.verification.ownerPhone = 'CANARY-PRIVATE-VERIFICATION';
  const e9 = clone(e); e9.entries.find((x) => x.claimPath === 'programmes.medicine.tuition').value.agentMargin = 'CANARY-PRIVATE-MONEY';
  const p9 = toPublicRecord(raw, e9, { now: NOW });
  check(!JSON.stringify(p9).includes('CANARY-PRIVATE'), `(9) a private field reached the projection: ${(JSON.stringify(p9).match(/CANARY-PRIVATE-[A-Z]+/g) ?? [])}`);
  check(p9.programmes[0].tuition.show && p9.programmes[0].tuition.value.amount === 5000, '(9) the policy keys of the fee are still shown');
  // No evidence at all: nothing shown
  const p0 = toPublicRecord(rec, null, { now: NOW });
  check(['officialName', 'status', 'address', 'website'].every((k) => !p0[k].show) && !p0.programmes.length, '(1) without evidence nothing is shown');
  // Evidence for another slug never counts
  const pOther = toPublicRecord(rec, { ...e, slug: 'another-university', entries: e.entries.map((x) => ({ ...x, id: x.id.replace(SLUG, 'another-university') })) }, { now: NOW });
  check(!pOther.officialName.show, "another record's evidence file never counts");
}

// ------------------------------------------------------------------------------------------------ evaluatePublication / decision
section('evaluatePublication');
{
  const { rec, ev: e } = passing();
  const okRes = evaluatePublication(rec, e, { now: NOW });
  eq([okRes.publishable, okRes.failures.map((f) => f.message)], [true, []], 'the minimal record passes');
  const fails = (r, evd, code, msg) => { const res = evaluatePublication(r, evd, { now: NOW }); check(!res.publishable && res.failures.some((f) => f.code === code || f.code.startsWith(code)), `${msg}: expected failure ${code}, got ${res.failures.map((f) => f.code)}`); return res; };
  // (1) flagged publishable with no evidence
  const r1 = fails(rec, null, 'no-evidence-file', '(1) flagged with no evidence');
  check(r1.failures.some((f) => /No evidence file/.test(f.message)), '(1) the failure says so in plain words');
  const d1 = publicationDecision(rec, null, { now: NOW, preview: false });
  eq([d1.flagged, d1.published, d1.buildError, d1.publicRecord], [true, false, true, null], '(1) production decision: not published, build error');
  // (11) passes preview but fails publication
  const d11 = publicationDecision(rec, null, { now: NOW, preview: true });
  eq([d11.published, d11.draft, d11.buildError], [false, true, false], '(11) preview decision: rendered as a draft, no build error');
  const msg = publicationBuildError([d1, publicationDecision(passing().rec, passing().ev, { now: NOW })]);
  check(msg && msg.includes(SLUG) && d1.failures.every((f) => msg.includes(f.message)), '(11) the build error names the record and every failure');
  check(publicationBuildError([d11]) === null, '(11) no build error in preview');
  check(publicationBuildError([publicationDecision({ ...rec, verification: { ...rec.verification, publishable: false } }, null, { now: NOW })]) === null, 'an unflagged failing record is no build error');
  // The flag only narrows
  const unflagged = publicationDecision({ ...clone(rec), verification: { ...rec.verification, publishable: false } }, e, { now: NOW });
  eq([unflagged.policyPasses, unflagged.published, unflagged.buildError], [true, false, false], 'policy passes but the flag is false: not published');
  // (7) required field empty
  const r7 = clone(rec); r7.address = V(''); const e7 = clone(e); e7.entries.find((x) => x.claimPath === 'address').value = '';
  fails(r7, e7, 'not-shown:empty', '(7) empty address');
  const r7b = clone(rec); r7b.officialName = { value: null, status: 'not-published', source: null, checked: null };
  fails(r7b, e, 'not-shown', '(7) official name not published');
  // (12) stale data
  const stale = (n) => { const r = clone(rec); r.verification.lastReview = day(-n); return r; };
  check(evaluatePublication(stale(180), e, { now: NOW }).publishable, 'lastReview 180 days ago passes');
  fails(stale(181), e, 'stale-last-review', '(12) lastReview 181 days ago');
  fails(stale(-1), e, 'future-last-review', 'lastReview in the future');
  const r12 = clone(rec); r12.verification.lastReview = null; fails(r12, e, 'no-last-review', 'no lastReview');
  const e12 = clone(e); e12.entries.find((x) => x.claimPath === 'statusStatement').nextReview = day(-1);
  fails(rec, e12, 'not-shown:stale-review', '(12) status statement past its review date');
  const e12b = clone(e); for (const x of e12b.entries) if (x.claimPath === 'programmes.medicine.tuition') x.nextReview = day(-1);
  fails(rec, e12b, 'no-listed-programme', '(12) stale fee evidence: the fee page no longer counts as read, nothing listable');
  // Other mandatory rules
  const sus = clone(rec); sus.status = V('suspended'); const eSus = clone(e); eSus.entries.find((x) => x.claimPath === 'status').value = 'suspended';
  fails(sus, eSus, 'status-not-operating', 'a suspended university');
  const unk = clone(rec); unk.teachingFormat = V('unknown'); const eUnk = clone(e); eUnk.entries.find((x) => x.claimPath === 'teachingFormat').value = 'unknown';
  fails(unk, eUnk, 'teaching-format-unknown', 'teaching format unknown');
  const oq = clone(rec); oq.verification.openQuestions = ['Which fee table is current?']; fails(oq, e, 'open-questions', 'open questions');
  const syn = clone(rec); syn.synthetic = true; fails(syn, e, 'synthetic', 'synthetic sample');
  const noProg = clone(rec); noProg.programmes[0].internationalAdmission = U(true); fails(noProg, e, 'no-listed-programme', 'no programme with verified international admission');
  fails({ ...clone(rec), slug: '../etc' }, e, 'unsafe-slug', 'unsafe slug');
  fails(rec, { ...clone(e), extra: 'x' }, 'invalid-evidence-file', 'evidence with an unknown key');
  fails(rec, { ...clone(e), slug: 'another-university' }, 'invalid-evidence-file', 'evidence for another record');
  const nl = evaluatePublication(noProg, e, { now: NOW }).notListed;
  check(nl.length === 1 && /international admission/.test(nl[0].message), 'the programme that cannot be listed is explained');
  // The trap fixtures pass the policy (their traps are withheld, not failures)
  for (const slug of ['fixture-alpha-medical-university', 'fixture-beta-medical-university']) {
    const r = record.parse(readFixture(join(FIXTURE_ROOT, `pass/universities/${slug}.json`), NOW));
    const res = evaluatePublication(r, readFixture(join(FIXTURE_ROOT, `pass/evidence/${slug}.json`), NOW), { now: NOW });
    eq(res.failures.map((f) => f.message), [], `pass fixture ${slug} passes`);
  }
  const flagged = record.parse(readFixture(join(FIXTURE_ROOT, 'fail/universities/fixture-flagged-no-evidence.json'), NOW));
  check(publicationDecision(flagged, null, { now: NOW }).buildError, 'fail fixture is a build error');
}

// ------------------------------------------------------------------------------------------------ evidence schema
section('evidence schema');
{
  const { ev: e } = passing();
  eq(parseEvidence(e).state, 'ok', 'a valid evidence file parses');
  for (const slug of ['fixture-alpha-medical-university', 'fixture-beta-medical-university']) eq(parseEvidence(readFixture(join(FIXTURE_ROOT, `pass/evidence/${slug}.json`), NOW)).state, 'ok', `fixture evidence ${slug} parses`);
  const bad = (mut, msg) => { const x = clone(e); mut(x); check(parseEvidence(x).state === 'invalid', `invalid evidence accepted: ${msg}`); };
  bad((x) => { delete x.entries[0].value; }, 'entry without a value key');
  bad((x) => { x.entries[0].decision = 'withhold'; x.entries[0].withholdReason = null; }, 'withheld entry without a reason');
  bad((x) => { x.entries[0].sourceUrl = 'http://unit.example/page'; }, 'http source');
  bad((x) => { x.entries[0].id = 'wrong/id/1'; }, 'id not slug/claimPath/n');
  bad((x) => { x.entries[1].id = x.entries[0].id; x.entries[1].claimPath = x.entries[0].claimPath; }, 'duplicate id');
  bad((x) => { x.entries[0].accessed = '2026-02-30'; }, 'impossible date');
  bad((x) => { x.entries[0].academicYear = '2026/28'; }, 'malformed academic year');
  bad((x) => { x.entries[0].sourceTier = 6; }, 'tier 6');
  bad((x) => { x.entries[0].status = 'probably'; }, 'unknown status');
  bad((x) => { x.entries[0].extra = 1; }, 'unknown entry key');
  bad((x) => { delete x.access; }, 'missing access block');
  check(typeof evidenceFile.safeParse === 'function', 'evidence schema exported');
  const dir = mkdtempSync(join(tmpdir(), 'uma-policy-'));
  try {
    eq(loadEvidence(SLUG, { dir }).state, 'missing', 'a missing file means nothing verified');
    eq(loadEvidence('../etc/passwd', { dir }).state, 'invalid', 'a path-like slug is refused');
    writeFileSync(join(dir, `${SLUG}.json`), '{ not json');
    eq(loadEvidence(SLUG, { dir }).state, 'invalid', 'unreadable JSON is invalid');
    writeFileSync(join(dir, `${SLUG}.json`), JSON.stringify(e));
    eq(loadEvidence(SLUG, { dir }).state, 'ok', 'a valid file loads');
    writeFileSync(join(dir, 'another-university.json'), JSON.stringify(e));
    eq(loadEvidence('another-university', { dir }).state, 'invalid', 'a file whose slug differs from its name is invalid');
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

// ------------------------------------------------------------------------------------------------ rendering helpers
section('rendering helpers');
{
  const withheld = { show: false, value: null, source: null, checked: null, publicState: 'withheld-conflict', reason: PUBLIC_REASONS['withheld-conflict'] };
  eq(viewClaim(withheld, { preview: true }).state, 'tbc', 'a withheld projected claim is "To be confirmed" even in preview');
  const rawU = U('CANARY-RAW-VALUE');
  const outside = viewClaim(rawU, { preview: false });
  check(outside.state === 'tbc' && outside.value === null && !JSON.stringify(outside).includes('CANARY'), 'a RAW claim outside PREVIEW prints nothing (no value, no note)');
  check(viewClaim(V('CANARY-RAW-VERIFIED'), { preview: false }).value === null, 'a RAW "verified" claim outside PREVIEW prints nothing (no evidence was checked)');
  const inside = viewClaim(rawU, { preview: true });
  check(inside.state === 'pending' && inside.value === 'CANARY-RAW-VALUE', 'a RAW draft claim in PREVIEW renders as reported (as before)');
  const items = [{ id: 'a', summary: 'CANARY-RAW-ITEM', status: 'unverified', note: NOTE }];
  eq(viewItems(items, { preview: false }), [], 'RAW items are dropped outside PREVIEW');
  eq(viewItems(items, { preview: true }).length, 1, 'RAW items render in PREVIEW');
  check(viewItems([{ id: 'b', summary: 'x', publicState: 'verified', note: 'CANARY' }])[0].note === undefined, 'a projected item never carries a note to the page');
  // JSON-LD only from shown values
  const { rec, ev: e } = passing();
  const ld = profileJsonLd(toPublicRecord({ ...clone(rec), alternativeNames: ['CANARY-ALT'] }, e, { now: NOW }));
  eq(ld, [{ '@context': 'https://schema.org', '@type': 'CollegeOrUniversity', name: 'Unit Test University', url: `${H}/`, address: '1 Test Street' }], 'profile JSON-LD from shown values only');
  eq(profileJsonLd(toPublicRecord(rec, null, { now: NOW })), [], 'no JSON-LD when the name is withheld');
  const e2 = clone(e); e2.entries = e2.entries.filter((x) => x.claimPath !== 'address');
  check(!('address' in profileJsonLd(toPublicRecord(rec, e2, { now: NOW }))[0]), 'a withheld address is left out of the JSON-LD');
  eq(listClaims(rec).filter((c) => c.path === 'programmes.medicine.tuition').length, 1, 'listClaims finds programme claims by path');
}

// ------------------------------------------------------------------------------------------------ static checks over src/
section('static checks');
{
  const SRC = resolve('src');
  const files = [];
  (function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : /\.(astro|ts|mjs|js)$/.test(f) && files.push(p); } })(SRC);
  const rel = (p) => relative(SRC, p).split('\\').join('/');
  for (const f of files) {
    const r = rel(f), t = readFileSync(f, 'utf8').replace(/^\s*(\/\/|\*|\/\*\*).*$/gm, ''); // comment lines removed
    if (r !== 'lib/records.ts' && r !== 'content.config.ts') check(!/(getCollection|getEntry|getEntries|getLiveCollection|getLiveEntry)\s*\(\s*['"`](universities|samples)['"`]/.test(t), `${r}: reads the universities/samples collection directly — use src/lib/records.ts`);
    if (!['lib/records.ts', 'content.config.ts', 'lib/evidence.mjs'].includes(r)) check(!/content\/universities/.test(t), `${r}: refers to src/content/universities directly`);
    if (!['lib/records.ts', 'lib/publication.mjs', 'lib/evidence.mjs'].includes(r)) check(!/evidence\.mjs|data\/evidence/.test(t), `${r}: reads the evidence store — only the policy and lib/records.ts may`);
    check(!/set:html=\{\s*JSON\.stringify/.test(t), `${r}: writes JSON with set:html={JSON.stringify(...)} — use serializeJsonLd`);
    for (const m of t.matchAll(/<script[^>]*application\/ld\+json[^>]*>/g)) check(/set:html=\{serializeJsonLd\(/.test(m[0]), `${r}: a JSON-LD block not written through serializeJsonLd: ${m[0]}`);
  }
  check(files.some((f) => rel(f) === 'layouts/Base.astro') && files.some((f) => rel(f) === 'components/Breadcrumbs.astro'), 'static checks saw Base.astro and Breadcrumbs.astro');
}

console.log(`publication-policy: ${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);
