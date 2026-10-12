// Publication policy unit tests (node, no build). Every rule of src/lib/publication.mjs and the evidence schema of
// src/lib/evidence.mjs, including the twelve owner scenarios:
//   (1) flagged publishable with no evidence        (7) required field empty
//   (2) verified name but unverified fees           (8) malicious input in a verified value
//   (3) conflicting tuition amounts                 (9) a private field added to the source record
//   (4) expired admission deadline                  (10) a new schema field without a policy entry
//   (5) internal notes                              (11) passes preview but fails publication
//   (6) recognition backed only by the university   (12) stale data
// plus the leak-hunter review's adversarial fixtures (snippet, agent and archive sources; expired next-review dates;
// evidence for 2025/26; declared contradictions; inexact evidence values; notes copied into values and into our own
// text; markup; unknown keys; unevidenced items; deferred programmes), and static checks over src/: only
// lib/records.ts reads the universities collection, and every JSON-LD block is written through serializeJsonLd.
// Prints "publication-policy: N checks, M failures".
import { readdirSync, readFileSync, statSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { tmpdir } from 'node:os';
import { z } from 'astro/zod';
import { record, programme } from '../src/content/schema.mjs';
import { parseEvidence, loadEvidence, evidenceFile } from '../src/lib/evidence.mjs';
import {
  FIELD_POLICY, policyCoverage, assertPolicyCoverage, evaluateClaim, allowedTiers, toPublicRecord, evaluatePublication, publicationDecision,
  publicationBuildError, viewClaim, viewItems, serializeJsonLd, profileJsonLd, currentAcademicYear, listClaims, PUBLIC_REASONS,
  editorialTextHash, containsPhrase, editorialReviewMatches, formatMoney, CODE_WORDS, NOT_LISTED_WORDS, RESEARCH_PREVIEW_WORDS,
} from '../src/lib/publication.mjs';
import * as CONFIG from '../src/lib/publication-config.mjs';
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
// A Ukrainian government register page listing the university's website (N24 c).
const GOV_WEBSITE_PAGE = 'https://register.unit-test.gov.ua/universities/1';
// The university's official website host is unit.example (tier 1 and 2 evidence must be on it).
const C = (path, claim, entries, opts = {}) => evaluateClaim(path, claim, entries, { now: NOW, officialHosts: ['unit.example'], ...opts });

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
    // N24 (c): a government register (tier 3, .gov.ua) lists exactly the same website.
    entry('website', `${H}/`, { n: 2, sourceTier: 3, sourceUrl: GOV_WEBSITE_PAGE, quotation: `Register entry. Website: ${H}/` }),
    entry('programmes.medicine.level', 'integrated_master'), entry('programmes.medicine.durationYears', 6), entry('programmes.medicine.language', ['English']),
    // N24 (a): the quotation that verifies international admission names the programme as the record does.
    entry('programmes.medicine.internationalAdmission', true, { quotation: 'Foreign citizens are admitted to Medicine for this intake.' }),
    entry('programmes.medicine.intakeYear', AY), entry('programmes.medicine.tuition', money(5000), { academicYear: AY }),
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
  for (const [shape, key] of [['claim', 'note'], ['record', 'researchReferences'], ['verification', 'openQuestions'], ['verification', 'reviewer'], ['verification', 'editorialReview'], ['record', 'deferredProgrammes'], ['record', 'faqs'], ['record', 'images'], ['record', 'synthetic'], ['requirement', 'note'], ['documentRequirement', 'note'], ['preparatoryRoute', 'note'], ['claim', 'status'], ['record', 'alternativeNames'], ['programme', 'gradingNote']])
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
  check(C('accreditation', V('Cert 1', 'https://register.unit-test.gov.ua/1'), ev('accreditation', 'Cert 1', { sourceTier: 3, sourceUrl: 'https://register.unit-test.gov.ua/1' })).show, 'accreditation from a tier-3 government register is shown');
  hidden(C('website', V('javascript:alert(1)'), ev('website', 'javascript:alert(1)')), 'under-review', 'unsafe-url', 'website value that is not https');
  hidden(C('internationalOffice', V({ url: 'javascript:alert(1)' }), ev('internationalOffice', { url: 'javascript:alert(1)' })), 'under-review', 'unsafe-url', 'office url that is not https');
  // (6) recognition: only tier 4, never on the university's own website
  const recog = ['Listed by the destination regulator'];
  for (const tier of [1, 2, 3]) hidden(C('recognition', V(recog, `${H}/recognition`), ev('recognition', recog, { sourceTier: tier, sourceUrl: `${H}/recognition` })), 'under-review', 'tier-not-allowed', `(6) recognition backed by a tier-${tier} source (the university's own page)`);
  hidden(C('recognition', V(recog, 'https://www.unit.example/recognition'), ev('recognition', recog, { sourceTier: 4, sourceUrl: 'https://www.unit.example/recognition' }), { officialHosts: ['unit.example'] }), 'under-review', 'recognition-from-university', '(6) "tier 4" recognition evidence hosted on the university website');
  // N24 (b): only from a recognition authority the owner has listed. The list is empty by default, so even a genuine
  // tier-4 page is withheld until the owner lists its host; a listed host is shown (settings passed by the test only).
  hidden(C('recognition', V(recog, 'https://regulator.example/list'), ev('recognition', recog, { sourceTier: 4, sourceUrl: 'https://regulator.example/list' })), 'under-review', 'recognition-authority-not-listed', '(6) recognition from a tier-4 authority the owner has not listed');
  check(C('recognition', V(recog, 'https://regulator.example/list'), ev('recognition', recog, { sourceTier: 4, sourceUrl: 'https://regulator.example/list' }), { settings: { RECOGNITION_AUTHORITY_HOSTS: ['regulator.example'] } }).show, 'recognition from a listed tier-4 authority is shown');
  // Fees: tiers 1-2 only (the university's own pages or fee schedule); a government page never supports a fee (standard §7).
  hidden(C('programmes.medicine.tuition', V(money(5000), 'https://portal.unit-test.gov.ua/fees'), ev('programmes.medicine.tuition', money(5000), { academicYear: AY, sourceTier: 3, sourceUrl: 'https://portal.unit-test.gov.ua/fees' })), 'under-review', 'tier-not-allowed', 'fee backed only by a tier-3 government page');
  check(JSON.stringify(allowedTiers('programmes.medicine.tuition')) === '[1,2]' && JSON.stringify(allowedTiers('preparatoryRoutes.p.fee')) === '[1,2]' && JSON.stringify(allowedTiers('programmes.m.otherMandatoryCosts.0')) === '[1,2]', 'fee paths allow tiers 1-2 only');
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
  for (const k of ['note', 'researchReferences', 'deferredProgrammes', 'openQuestions', 'reviewer', 'faqs', 'images', 'synthetic', 'alternativeNames', 'gradingNote', 'entryRequirements', 'requiredDocuments', 'status' + 'Internal', 'publishable', 'code', 'editorialReview', 'overviewSha256'])
    check(!keys.has(k), `(5) projection carries the internal key "${k}"`);
  // Only public / editorial-public keys (plus the withheld counters) at record level
  const allowed = new Set([...Object.entries(FIELD_POLICY.record).filter(([, c]) => c !== 'internal').map(([k]) => k), 'programmesWithheld', 'routesWithheld', 'editorialWithheld']);
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
  for (const slug of ['fixture-alpha-medical-university', 'fixture-beta-medical-university', 'fixture-delta-medical-university']) {
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
  for (const slug of ['fixture-alpha-medical-university', 'fixture-beta-medical-university', 'fixture-delta-medical-university']) eq(parseEvidence(readFixture(join(FIXTURE_ROOT, `pass/evidence/${slug}.json`), NOW)).state, 'ok', `fixture evidence ${slug} parses`);
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

// ------------------------------------------------------------------------------------------------ adversarial review
// Leak-hunter review (2026-10-11): fixtures written to defeat the gate. Every one must be withheld.
section('adversarial review');
{
  const hidden = (r, code, msg) => { check(!r.show && r.value === null && r.source === null && r.checked === null, `${msg}: must be withheld (got show=${r.show}, code=${r.code})`); if (code) eq(r.code, code, `${msg} code`); };
  const shown = (r, msg) => check(r.show === true, `${msg}: positive control must be shown (code ${r.code})`);
  // A search snippet, cache, archive copy, directory, social page or blog is never evidence, at any tier.
  for (const [url, tier, path, value] of [
    ['https://www.google.com/search?q=unit+test+university', 1, 'officialName', 'Name'], ['https://www.google.co.uk/search?q=unit', 2, 'officialName', 'Name'],
    ['https://webcache.googleusercontent.com/search?q=cache:unit.example', 1, 'officialName', 'Name'], ['https://unit-example.translate.goog/page', 1, 'officialName', 'Name'],
    ['https://www.bing.com/search?q=unit', 3, 'accreditation', 'Cert'], ['https://en.wikipedia.org/wiki/Unit', 3, 'accreditation', 'Cert'],
    ['https://web.archive.org/web/2025/https://unit.example/page', 1, 'officialName', 'Name'], ['https://www.facebook.com/unit', 1, 'officialName', 'Name'],
    ['https://t.me/unit', 1, 'officialName', 'Name'], ['https://docs.google.com/document/d/x', 2, 'officialName', 'Name'],
    ['https://wdoms.org/school/unit', 4, 'recognition', ['Listed']], ['https://yandex.ua/search/?text=unit', 4, 'recognition', ['Listed']],
  ]) hidden(C(path, V(value, url), ev(path, value, { sourceTier: tier, sourceUrl: url })), 'source-not-evidence', `snippet or third-party source marked verified (tier ${tier}, ${new URL(url).hostname})`);
  hidden(C('officialName', V('Name'), ev('officialName', 'Name', { method: 'Read in a search snippet on 2026-10-11' })), 'source-not-evidence', 'evidence whose method says it came from a search snippet');
  // Tier 1 and 2 must be on the official website; tier 3 on a Ukrainian government address.
  hidden(C('officialName', V('Name', 'https://best-agent.example/unit'), ev('officialName', 'Name', { sourceUrl: 'https://best-agent.example/unit' })), 'source-not-official', 'an agent site marked tier 1');
  hidden(C('officialName', V('Name', 'https://unit.example.attacker.example/page'), ev('officialName', 'Name', { sourceTier: 2, sourceUrl: 'https://unit.example.attacker.example/page' })), 'source-not-official', 'a look-alike host marked tier 2');
  shown(C('officialName', V('Name', 'https://admission.unit.example/page'), ev('officialName', 'Name', { sourceUrl: 'https://admission.unit.example/page' })), 'tier 1 on a subdomain of the official website');
  hidden(C('accreditation', V('Cert', 'https://register.example/1'), ev('accreditation', 'Cert', { sourceTier: 3, sourceUrl: 'https://register.example/1' })), 'source-not-official', 'tier 3 on an address that is not .gov.ua');
  hidden(C('accreditation', V('Cert', 'https://gov.ua.attacker.example/1'), ev('accreditation', 'Cert', { sourceTier: 3, sourceUrl: 'https://gov.ua.attacker.example/1' })), 'source-not-official', 'tier 3 on a look-alike of .gov.ua');
  hidden(evaluateClaim('officialName', V('Name'), ev('officialName', 'Name'), { now: NOW }), 'source-not-official', 'no official host known: tier 1 evidence fails closed');
  // Owner captures must name their capture file.
  hidden(C('officialName', V('Name'), ev('officialName', 'Name', { evidenceType: 'owner-capture', captureRef: null })), 'no-capture', 'owner capture without a capture file');
  shown(C('officialName', V('Name'), ev('officialName', 'Name', { evidenceType: 'owner-capture', captureRef: 'unit-2026-10-09.pdf' })), 'owner capture with a capture file');
  // An expired next-review date retires the entry for every claim, not only time-sensitive ones.
  hidden(C('officialName', V('Name'), ev('officialName', 'Name', { nextReview: day(-1) })), 'stale-review', 'expired nextReview on the official name');
  hidden(C('programmes.medicine.language', V(['English']), ev('programmes.medicine.language', ['English'], { nextReview: day(-1) })), 'stale-review', 'expired nextReview on a programme language');
  hidden(C('recognition', V(['Listed'], 'https://regulator.example/list'), ev('recognition', ['Listed'], { sourceTier: 4, sourceUrl: 'https://regulator.example/list', nextReview: day(-30) }), { settings: { RECOGNITION_AUTHORITY_HOSTS: ['regulator.example'] } }), 'stale-review', 'expired nextReview on recognition (listed authority)');
  // Evidence that names an academic year which has ended (2025/26 when the current year is 2026/27).
  const last = academicYear(NOW, -1);
  eq(last, '2025/26', 'the previous academic year');
  hidden(C('programmes.medicine.language', V(['English']), ev('programmes.medicine.language', ['English'], { academicYear: last })), 'evidence-year-ended', 'language evidence for 2025/26');
  hidden(C('programmes.medicine.intakeYear', V(AY), ev('programmes.medicine.intakeYear', AY, { academicYear: last })), 'evidence-year-ended', 'intake-year evidence read on the 2025/26 page');
  hidden(C('programmes.medicine.requirements.bio', V({ type: 'subject', summary: 'Biology' }), ev('programmes.medicine.requirements.bio', { type: 'subject', summary: 'Biology' }, { academicYear: last })), 'evidence-year-ended', 'requirement evidence for 2025/26');
  hidden(C('programmes.medicine.tuition', V(money(5000, last)), ev('programmes.medicine.tuition', money(5000, last), { academicYear: last })), 'past-academic-year', 'a 2025/26 fee');
  hidden(C('programmes.medicine.tuition', V(money(5000)), ev('programmes.medicine.tuition', money(5000), { academicYear: last })), 'evidence-year-ended', 'a current fee backed by the 2025/26 fee page');
  shown(C('programmes.medicine.language', V(['English']), ev('programmes.medicine.language', ['English'], { academicYear: AY })), 'language evidence for the current year');
  // Contradictions declared through `contradicts` withhold the claim, from either side, until the entry is outdated.
  hidden(C('officialName', V('Name'), [entry('officialName', 'Name', { contradicts: [`${SLUG}/officialName/2`] }), entry('officialName', 'Other', { n: 2, status: 'unverified', decision: 'withhold', withholdReason: 'x' })]), 'conflict', 'a verified entry that lists a contradiction');
  hidden(C('officialName', V('Name'), [entry('officialName', 'Name'), entry('officialName', 'Other', { n: 2, status: 'unverified', decision: 'withhold', withholdReason: 'x', contradicts: [`${SLUG}/officialName/1`] })]), 'conflict', 'an unverified second entry that contradicts the verified one');
  hidden(C('programmes.medicine.durationYears', V(6), [entry('programmes.medicine.durationYears', 6), entry('programmes.medicine.durationText', '5 years 10 months', { status: 'unverified', decision: 'withhold', withholdReason: 'x', contradicts: [`${SLUG}/programmes.medicine.durationYears/1`] })]), 'conflict', 'an entry for another claim that contradicts this one');
  shown(C('officialName', V('Name'), [entry('officialName', 'Name'), entry('officialName', 'Other', { n: 2, status: 'outdated', decision: 'withhold', withholdReason: 'superseded', contradicts: [`${SLUG}/officialName/1`] })]), 'a contradiction closed by marking the entry outdated');
  // Evidence must carry exactly the record's value: no extra or missing keys, no quotation-less entries.
  hidden(C('programmes.medicine.tuition', V(money(5000)), ev('programmes.medicine.tuition', { ...money(5000), agentMargin: 'CANARY' }, { academicYear: AY })), 'value-mismatch', 'fee evidence with an extra key');
  hidden(C('programmes.medicine.tuition', V({ ...money(5000), schedule: 'two instalments' }), ev('programmes.medicine.tuition', money(5000), { academicYear: AY })), 'value-mismatch', 'record fee with a schedule the evidence does not carry');
  hidden(C('officialName', V('Name'), ev('officialName', 'Name ')), 'value-mismatch', 'evidence value differing by a trailing space');
  const noQuote = entry('officialName', 'Name'); delete noQuote.quotation;
  hidden(C('officialName', V('Name'), [noQuote]), 'evidence-not-publishable', 'evidence with no quotation key');
  // A research note copied into a value or into our own text.
  for (const [path, value] of [
    ['programmes.medicine.requirements.bio', { type: 'subject', summary: NOTE }], ['address', 'Search-snippet lead — read the official page before publishing'],
    ['programmes.medicine.intake', 'To be confirmed'], ['programmes.medicine.deadlines', [{ label: 'Applications close (TBC)', date: day(30) }]],
    ['programmes.medicine.documents.passport', { name: 'Passport', formatNote: 'unverified research lead' }],
  ]) hidden(C(path, V(value), ev(path, value)), 'internal-wording', `note wording copied into ${path}`);
  shown(C('programmes.medicine.requirements.bio', V({ type: 'subject', summary: 'Biology at grade C or above' }), ev('programmes.medicine.requirements.bio', { type: 'subject', summary: 'Biology at grade C or above' })), 'an ordinary requirement summary');
  const { rec, ev: e } = passing();
  for (const [field, mut] of [
    ['overview', (r) => { r.overview = `Overview. ${NOTE}`; }], ['shortName', (r) => { r.shortName = 'Unit (not verified)'; }],
    ['programmes.medicine.name', (r) => { r.programmes[0].name = 'Medicine — TODO check the name'; }], ['city', (r) => { r.city = 'Testville (awaiting verification)'; }],
  ]) {
    const r = clone(rec); mut(r);
    const res = evaluatePublication(r, e, { now: NOW });
    check(!res.publishable && res.failures.some((x) => x.code === 'internal-wording' && x.field === field), `note wording in our own ${field} blocks publication (got ${res.failures.map((x) => x.code)})`);
    check(publicationDecision(r, e, { now: NOW }).buildError, `note wording in ${field} of a flagged record stops a production build`);
  }
  const rc = clone(rec); rc.programmes[0].otherMandatoryCosts = [{ label: 'Hostel (search-snippet lead)', cost: V(money(300)) }];
  const ec = clone(e); ec.entries.push(entry('programmes.medicine.otherMandatoryCosts.0', money(300), { academicYear: AY }));
  const pc = toPublicRecord(rc, ec, { now: NOW });
  check(pc.programmes[0].otherMandatoryCosts.length === 0 && pc.programmes[0].otherCostsWithheld === 1, 'a cost whose label carries note wording is dropped and counted');
  // HTML and "</script>" in verified values: data in, escaped out (Astro escapes text; JSON-LD via serializeJsonLd).
  const evil = 'Unit </script><script>alert(1)</script> <img src=x onerror=alert(1)> University';
  const re = clone(rec); re.officialName = V(evil); const ee = clone(e); ee.entries.find((x) => x.claimPath === 'officialName').value = evil;
  const ldEvil = serializeJsonLd(profileJsonLd(toPublicRecord(re, ee, { now: NOW }))[0]);
  check(!/[<>]/.test(ldEvil) && JSON.parse(ldEvil).name === evil, 'markup in a verified name is escaped in the profile JSON-LD and round-trips');
  // An extra top-level key: the schema the build uses drops it, and the projection never copies it.
  const withExtra = { ...clone(rec), agentCommission: 'CANARY-EXTRA-TOP-LEVEL' };
  check(!('agentCommission' in record.parse(withExtra)), 'the record schema drops an unknown top-level key');
  check(!JSON.stringify(toPublicRecord(withExtra, e, { now: NOW })).includes('CANARY-EXTRA-TOP-LEVEL'), 'an unknown top-level key never reaches the projection');
  // A requirement or document item marked verified without an evidence entry is dropped and counted.
  const ri = clone(rec);
  ri.programmes[0].requirements = [{ id: 'english', type: 'language', summary: 'CANARY-REQ-NO-EVIDENCE', status: 'verified', source: `${H}/page`, checked: day(-2) }];
  ri.programmes[0].documents = [{ id: 'passport', name: 'CANARY-DOC-NO-EVIDENCE', status: 'verified', source: `${H}/page`, checked: day(-2) }];
  const pi = toPublicRecord(ri, e, { now: NOW });
  check(pi.programmes[0].requirements.length === 0 && pi.programmes[0].requirementsWithheld === 1 && pi.programmes[0].documents.length === 0 && pi.programmes[0].documentsWithheld === 1 && !JSON.stringify(pi).includes('CANARY'), 'verified items without evidence are dropped and counted');
  // A deferred programme stays internal even when every one of its claims has matching verified evidence.
  const rd = clone(rec); rd.deferredProgrammes = [{ ...clone(rec.programmes[0]), id: 'dentistry', name: 'CANARY-DEFERRED-PROGRAMME', field: 'dentistry' }];
  const ed = clone(e); for (const x of e.entries.filter((y) => y.claimPath.startsWith('programmes.medicine.'))) { const c = clone(x); c.claimPath = x.claimPath.replace('medicine', 'dentistry'); c.id = `${SLUG}/${c.claimPath}/1`; ed.entries.push(c); }
  eq(parseEvidence(ed).state, 'ok', 'deferred-programme evidence file is valid');
  const pd = toPublicRecord(rd, ed, { now: NOW });
  check(!JSON.stringify(pd).includes('CANARY-DEFERRED') && pd.programmes.map((p) => p.id).join() === 'medicine', 'a fully evidenced deferred programme never reaches the projection');
  // A programme is listed with its fee "To be confirmed" only when the fee page was read on the official website.
  const rf = clone(rec); rf.programmes[0].tuition = { value: null, status: 'not-published', source: null, checked: null };
  const ef = clone(e); ef.entries = ef.entries.filter((x) => x.claimPath !== 'programmes.medicine.tuition');
  ef.entries.push(entry('programmes.medicine.tuition', null, { status: 'unverified', decision: 'withhold', withholdReason: 'no fee table found', sourceUrl: 'https://best-agent.example/fees', academicYear: AY }));
  check(toPublicRecord(rf, ef, { now: NOW }).programmes.length === 0, 'a fee page "read" on an agent site does not get the programme listed');
  ef.entries[ef.entries.length - 1].sourceUrl = `${H}/fees`;
  check(toPublicRecord(rf, ef, { now: NOW }).programmes.length === 1, 'positive control: a fee page read on the official website does');
  // The fee page counts as read only under the same source rules as a shown fact (review 2026-10-11).
  const feeRead = (o) => { const x = clone(ef); Object.assign(x.entries[x.entries.length - 1], o); return toPublicRecord(rf, x, { now: NOW }).programmes.length; };
  eq(feeRead({ method: 'Copied from a search snippet of the fee page' }), 0, 'a fee page "read" from a search snippet does not get the programme listed');
  eq(feeRead({ academicYear: academicYear(NOW, -1) }), 0, 'a fee page read for an academic year that has ended does not get the programme listed');
  eq(feeRead({ status: 'outdated' }), 0, 'an outdated fee-page entry does not get the programme listed');
  // Ids that collide share every evidence entry, so neither item is used (review 2026-10-11).
  const rdup = clone(rec); rdup.programmes.push({ ...clone(rec.programmes[0]), name: 'CANARY-DUPLICATE-PROGRAMME', field: 'dentistry' });
  const pdup = toPublicRecord(rdup, e, { now: NOW });
  check(pdup.programmes.length === 0 && pdup.programmesWithheld === 2 && !JSON.stringify(pdup).includes('CANARY'), 'two programmes with one id: neither is listed');
  check(evaluatePublication(rdup, e, { now: NOW }).notListed.some((n) => n.reasons.includes('duplicate-id')), 'the duplicate id is explained in the report');
  const rdef = clone(rec); rdef.deferredProgrammes = [{ ...clone(rec.programmes[0]), name: 'Deferred copy' }];
  eq(toPublicRecord(rdef, e, { now: NOW }).programmes.length, 0, 'a listed programme whose id is also used by a deferred programme is not listed');
  const ritem = clone(rec); const bio = { id: 'bio', type: 'subject', summary: 'Biology', status: 'verified', source: `${H}/page`, checked: day(-2) };
  ritem.programmes[0].requirements = [bio, { ...bio, summary: 'CANARY-DUPLICATE-ITEM' }];
  const eitem = clone(e); eitem.entries.push(entry('programmes.medicine.requirements.bio', { type: 'subject', summary: 'Biology' }));
  const pitem = toPublicRecord(ritem, eitem, { now: NOW }).programmes[0];
  check(pitem.requirements.length === 0 && pitem.requirementsWithheld === 2 && !JSON.stringify(pitem).includes('CANARY'), 'two requirement items with one id: both withheld and counted');
  ritem.programmes[0].requirements = [bio];
  eq(toPublicRecord(ritem, eitem, { now: NOW }).programmes[0].requirements.length, 1, 'positive control: the same item alone is shown');
  const rroute = clone(rec); const route = { id: 'prep', name: 'Preparatory course', languageOfInstruction: V(['Ukrainian']), englishTrack: { value: null, status: 'not-published', source: null, checked: null } };
  rroute.preparatoryRoutes = [route, { ...clone(route), name: 'CANARY-DUPLICATE-ROUTE' }];
  const eroute = clone(e); eroute.entries.push(entry('preparatoryRoutes.prep.languageOfInstruction', ['Ukrainian']));
  const proute = toPublicRecord(rroute, eroute, { now: NOW });
  check(proute.preparatoryRoutes.length === 0 && proute.routesWithheld === 2 && !JSON.stringify(proute).includes('CANARY'), 'two preparatory routes with one id: both withheld and counted');
  rroute.preparatoryRoutes = [route];
  eq(toPublicRecord(rroute, eroute, { now: NOW }).preparatoryRoutes.length, 1, 'positive control: the same route alone is shown');
  // An evidence file with a slug or claim path full of regular-expression characters is invalid, never a crash.
  const oddSlug = (() => { try { const x = clone(e); x.slug = 'bad(['; x.entries = x.entries.map((y) => ({ ...y, id: `bad([/${y.claimPath}/1` })); return parseEvidence(x).state; } catch (err) { return `threw: ${err.message}`; } })();
  eq(oddSlug, 'invalid', 'an evidence file with a regex-like slug is reported invalid');
  // The minimal passing record still passes: the new rules do not withhold properly evidenced facts.
  eq(evaluatePublication(rec, e, { now: NOW }).failures.map((x) => x.code), [], 'positive control: the minimal record still passes');
}

// ------------------------------------------------------------------------------------------------ N24 owner decisions and gaps
// Backlog N24 (a)-(f), 2026-10-12: fail-closed defaults for the three owner decisions (src/lib/publication-config.mjs)
// and the three technical gaps. Each rule has adversarial cases, a positive control, and a check of the owner setting.
section('N24 settings');
{
  // The defaults the owner has not yet confirmed (PUBLICATION_POLICY_DECISIONS.md). If the owner changes one, record the
  // decision in that memo and update the matching check here.
  eq([CONFIG.OVERVIEW_REQUIRES_EDITORIAL_REVIEW, CONFIG.PROGRAMME_NAME_REQUIRES_QUOTATION, CONFIG.CITY_AND_REGION_REQUIRE_VERIFIED_ADDRESS, CONFIG.WEBSITE_REQUIRES_GOVERNMENT_EVIDENCE], [true, true, true, true], 'N24 fail-closed defaults (a) and (c) are on');
  eq([...CONFIG.RECOGNITION_AUTHORITY_HOSTS], [], 'N24 (b) RECOGNITION_AUTHORITY_HOSTS is empty by default (choosing authorities is the owner\'s decision; record it in PUBLICATION_POLICY_DECISIONS.md and update this check)');
  check(CONFIG.RECOGNITION_AUTHORITY_HOSTS.every((h) => typeof h === 'string' && /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(h)), 'every recognition authority host is a bare lower-case host name (no scheme, no path)');
  eq([...CONFIG.GOVERNMENT_HOST_SUFFIXES], ['gov.ua'], 'tier 3 government addresses end .gov.ua');
  eq(CONFIG.WITHHELD_PLACE_TEXT, 'To be confirmed', 'a withheld city reads "To be confirmed"');
  check(Object.isFrozen(CONFIG.PUBLICATION_SETTINGS) && Object.isFrozen(CONFIG.RECOGNITION_AUTHORITY_HOSTS), 'the settings cannot be changed at run time');
  eq(Object.keys(CONFIG.PUBLICATION_SETTINGS).sort(), Object.keys(CONFIG).filter((k) => k !== 'PUBLICATION_SETTINGS').sort(), 'PUBLICATION_SETTINGS carries every setting in publication-config.mjs');
  for (const code of ['website-not-government-listed', 'recognition-authority-not-listed', 'start-date-passed', 'start-date-unparseable', 'past-year-named']) check(typeof CODE_WORDS[code] === 'string', `CODE_WORDS explains ${code}`);
  check(typeof NOT_LISTED_WORDS['programme-name'] === 'string', 'NOT_LISTED_WORDS explains programme-name');
}

section('N24 (a) overview');
{
  const { rec, ev: e } = passing();
  const reviewed = (r, o = {}) => { const x = clone(r); x.verification.editorialReview = { reviewer: 'editor (role)', date: day(-1), overviewSha256: editorialTextHash(x.overview), ...o }; return x; };
  eq(editorialTextHash('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad', 'editorialTextHash is SHA-256 of the exact UTF-8 text');
  check(editorialTextHash('Overview.') !== editorialTextHash('Overview. '), 'a trailing space changes the hash');
  const p0 = toPublicRecord(rec, e, { now: NOW });
  check(!('overview' in p0) && p0.editorialWithheld.overview === true, 'an overview with no editorial review is withheld (key absent)');
  check(evaluatePublication(rec, e, { now: NOW }).publishable, 'a withheld overview does not by itself block publication');
  const ok = reviewed(rec);
  const p1 = toPublicRecord(ok, e, { now: NOW });
  check(p1.overview === rec.overview && p1.editorialWithheld.overview === false, 'positive control: an overview whose review hash matches the current text is shown');
  check(!JSON.stringify(p1).includes('editor (role)') && !JSON.stringify(p1).includes(editorialTextHash(rec.overview)), 'the editorial review (reviewer, hash) never reaches the projection');
  const edited = clone(ok); edited.overview = `${rec.overview} CANARY-EDITED-AFTER-REVIEW`;
  const p2 = toPublicRecord(edited, e, { now: NOW });
  check(!('overview' in p2) && !JSON.stringify(p2).includes('CANARY'), 'an overview edited after its review is withheld until re-reviewed');
  const ws = clone(ok); ws.overview = `${rec.overview} `;
  check(!('overview' in toPublicRecord(ws, e, { now: NOW })), 'even a one-space edit hides the overview');
  check(!('overview' in toPublicRecord(reviewed(rec, { date: day(1) }), e, { now: NOW })), 'a review dated in the future does not count');
  check(!('overview' in toPublicRecord(reviewed(rec, { reviewer: '  ' }), e, { now: NOW })), 'a review without a reviewer does not count');
  check(!('overview' in toPublicRecord(reviewed(rec, { date: '2026-02-30' }), e, { now: NOW })), 'a review with an impossible date does not count');
  check(!('overview' in toPublicRecord(reviewed(rec, { overviewSha256: editorialTextHash('another text') }), e, { now: NOW })), 'a review of other text does not count');
  check(!editorialReviewMatches({ overview: 'x', verification: {} }, day(0)) && editorialReviewMatches(reviewed({ ...clone(rec), overview: 'x' }), day(0)), 'editorialReviewMatches: no review / matching review');
  const noted = reviewed({ ...clone(rec), overview: `Overview. ${NOTE}` });
  const pn = toPublicRecord(noted, e, { now: NOW });
  check(!('overview' in pn) && !evaluatePublication(noted, e, { now: NOW }).publishable, 'a reviewed overview carrying research-note wording is withheld and blocks publication');
  check(toPublicRecord(rec, e, { now: NOW, settings: { OVERVIEW_REQUIRES_EDITORIAL_REVIEW: false } }).overview === rec.overview, 'owner setting OVERVIEW_REQUIRES_EDITORIAL_REVIEW=false prints the overview without a review');
  // Schema: optional, additive, strict, and the hash must look like a SHA-256.
  check(record.safeParse(clone(rec)).success, 'a record without editorialReview still parses (additive change)');
  check(record.safeParse(reviewed(rec)).success, 'a record with a well-formed editorialReview parses');
  check(!record.safeParse(reviewed(rec, { overviewSha256: 'abc' })).success, 'the schema rejects a malformed hash');
  check(!record.safeParse(reviewed(rec, { approvedBy: 'x' })).success, 'the schema rejects an unknown editorialReview key');
}

section('N24 (a) programme names');
{
  const { rec, ev: e } = passing();
  const withQuote = (q, mut = (x) => x) => { const x = clone(e); x.entries.find((y) => y.claimPath === 'programmes.medicine.internationalAdmission').quotation = q; return mut(x); };
  const listed = (r, evd, settings) => toPublicRecord(r, evd, { now: NOW, settings }).programmes.map((p) => p.id).join();
  eq(listed(rec, e), 'medicine', 'positive control: the name appears in the quotation that verifies international admission');
  eq(listed(rec, withQuote('Foreign citizens are admitted to the programme for this intake.')), '', 'a programme whose name is absent from the quotation is not listed');
  const res = evaluatePublication(rec, withQuote('Foreign citizens are admitted to the programme.'), { now: NOW });
  check(!res.publishable && res.failures.some((f) => f.code === 'no-listed-programme') && res.notListed.some((n) => n.reasons.includes('programme-name')), 'the unlisted programme blocks a profile with no other programme and is explained as programme-name');
  eq(listed(rec, withQuote('FOREIGN CITIZENS ARE ADMITTED TO   MEDICINE.')), 'medicine', 'the match ignores letter case and repeated spaces');
  const r2 = clone(rec); r2.programmes[0].name = 'Medic';
  eq(listed(r2, e), '', 'a name found only inside a longer word ("Medic" in "Medicine") does not count');
  const r3 = clone(rec); r3.programmes[0].name = 'Medicine CANARY-NAME-NOT-QUOTED';
  const p3 = toPublicRecord(r3, e, { now: NOW });
  check(p3.programmes.length === 0 && !JSON.stringify(p3).includes('CANARY'), 'a programme name that is not quoted never reaches the projection');
  // Only the quotation of an entry that actually supports the claim counts.
  const other = withQuote('Foreign citizens are admitted to the programme.', (x) => { x.entries.push(entry('programmes.medicine.internationalAdmission', true, { n: 2, status: 'unverified', decision: 'withhold', withholdReason: 'x', quotation: 'Medicine is open to foreign citizens.' })); return x; });
  eq(listed(rec, other), '', 'a name found only in the quotation of an unverified entry does not count');
  const elsewhere = withQuote('Foreign citizens are admitted.', (x) => { x.entries.find((y) => y.claimPath === 'programmes.medicine.level').quotation = 'Medicine: integrated master'; return x; });
  eq(listed(rec, elsewhere), '', 'a name found only in the quotation for another claim does not count');
  const offsite = withQuote('Medicine admits foreign citizens.', (x) => { const y = entry('programmes.medicine.internationalAdmission', true, { n: 2, sourceUrl: 'https://best-agent.example/medicine', quotation: 'CANARY Medicine admits foreign citizens.' }); x.entries.find((z) => z.claimPath === 'programmes.medicine.internationalAdmission').quotation = 'Admitted.'; x.entries.push(y); return x; });
  eq(listed(rec, offsite), '', 'a name found only in the quotation of an agent-site entry does not count');
  eq(listed(rec, withQuote('Foreign citizens are admitted.'), { PROGRAMME_NAME_REQUIRES_QUOTATION: false }), 'medicine', 'owner setting PROGRAMME_NAME_REQUIRES_QUOTATION=false lists the programme without the check');
  // A name joined to another word by a hyphen is part of that word (review 2026-10-12).
  eq(listed(rec, withQuote('The Pre-Medicine foundation year admits foreign citizens.')), '', 'a name found only inside a hyphenated word ("Medicine" in "Pre-Medicine") does not count');
  eq(listed(rec, withQuote("Foreign citizens are admitted to 'Medicine' and to Pre-Medicine.")), 'medicine', 'positive control: a quoted name (in quotation marks) still counts');
  // containsPhrase
  check(containsPhrase('Kyiv, 1 Main Street', 'kyiv') && containsPhrase('a  b', 'A B') && !containsPhrase('Lvivska Street', 'Lviv') && !containsPhrase('x', '') && !containsPhrase(null, 'x') && containsPhrase('вул. Пирогова, Вінниця', 'вінниця') && !containsPhrase('Вінницька область', 'Вінниця'), 'containsPhrase: whole words, any letter case, Cyrillic included');
  check(!containsPhrase('2 Halytska St, Ivano-Frankivsk', 'Ivano') && !containsPhrase('2 Halytska St, Ivano-Frankivsk', 'Frankivsk') && containsPhrase('2 Halytska St, Ivano-Frankivsk', 'ivano-frankivsk')
    && !containsPhrase("1 Main St, Kam'ianets-Podilskyi", 'Kam') && !containsPhrase('1 Main St, Kam’ianets-Podilskyi', 'Kamianets') && !containsPhrase('Pre-Medicine', 'Medicine')
    && containsPhrase('‘Medicine’ admits', 'Medicine') && containsPhrase('Lviv – 79010', 'Lviv') && containsPhrase('Lviv - 79010', 'Lviv') && containsPhrase('м.Вінниця', 'Вінниця'),
  'containsPhrase: a hyphen or apostrophe between letters joins one word; quotation marks and spaced dashes still separate words');
}

section('N24 (a) city and region');
{
  const { rec, ev: e } = passing();
  const withAddress = (addr) => { const r = clone(rec); r.address = V(addr); const x = clone(e); x.entries.find((y) => y.claimPath === 'address').value = addr; return [r, x]; };
  const p0 = toPublicRecord(rec, e, { now: NOW });
  check(p0.city === 'To be confirmed' && p0.editorialWithheld.city === true && !('region' in p0), 'a city that is not in the verified address reads "To be confirmed" (never a guess)');
  const [r1, e1] = withAddress('1 Test Street, TESTVILLE, Test Oblast');
  r1.region = 'Test Oblast';
  const p1 = toPublicRecord(r1, e1, { now: NOW });
  check(p1.city === 'Testville' && p1.region === 'Test Oblast' && !p1.editorialWithheld.city && !p1.editorialWithheld.region, 'positive control: city and region contained in the verified address are shown');
  const r2 = clone(r1); r2.region = 'CANARY-REGION Oblast';
  const p2 = toPublicRecord(r2, e1, { now: NOW });
  check(!('region' in p2) && p2.editorialWithheld.region === true && !JSON.stringify(p2).includes('CANARY'), 'a region that is not in the verified address is left out');
  const [r3, e3] = withAddress('1 Testvilleska Street');
  eq(toPublicRecord(r3, e3, { now: NOW }).city, 'To be confirmed', 'a city found only inside a longer word does not count');
  const [r3b, e3b] = withAddress('1 Test Street, Testville-Podilskyi');
  eq(toPublicRecord(r3b, e3b, { now: NOW }).city, 'To be confirmed', 'a city found only as part of a hyphenated place name ("Testville" in "Testville-Podilskyi") does not count');
  const [r4, e4] = withAddress('1 Test Street, Testville');
  e4.entries = e4.entries.filter((y) => y.claimPath !== 'address');
  const p4 = toPublicRecord(r4, e4, { now: NOW });
  check(p4.address.show === false && p4.city === 'To be confirmed', 'when the address itself is withheld, the city is withheld even if the raw address contains it');
  const r5 = clone(rec); r5.city = 'CANARY-CITY';
  const p5 = toPublicRecord(r5, e, { now: NOW });
  check(!JSON.stringify(p5).includes('CANARY') && evaluatePublication(r5, e, { now: NOW }).publishable, 'a withheld city never reaches the projection and does not by itself block publication');
  check(toPublicRecord(rec, e, { now: NOW, settings: { CITY_AND_REGION_REQUIRE_VERIFIED_ADDRESS: false } }).city === 'Testville', 'owner setting CITY_AND_REGION_REQUIRE_VERIFIED_ADDRESS=false prints the city as recorded');
}

section('N24 (b) recognition authorities');
{
  const recog = ['Listed by the destination regulator'];
  const page = 'https://www.regulator.example/foreign-schools';
  const R = (url, settings) => C('recognition', V(recog, url), ev('recognition', recog, { sourceTier: 4, sourceUrl: url }), settings ? { settings } : {});
  const hiddenR = (r, code, msg) => { check(!r.show && r.value === null && r.source === null, `${msg}: must be withheld`); eq(r.code, code, `${msg} code`); };
  hiddenR(R(page), 'recognition-authority-not-listed', 'default (empty list): a tier-4 page on any host');
  check(R(page, { RECOGNITION_AUTHORITY_HOSTS: ['regulator.example'] }).show, 'positive control: a listed authority host ("www." ignored)');
  check(R('https://lists.regulator.example/page', { RECOGNITION_AUTHORITY_HOSTS: ['regulator.example'] }).show, 'a subdomain of a listed authority host');
  hiddenR(R('https://regulator.example.attacker.example/page', { RECOGNITION_AUTHORITY_HOSTS: ['regulator.example'] }), 'recognition-authority-not-listed', 'a look-alike of a listed host');
  hiddenR(R('https://other-regulator.example/page', { RECOGNITION_AUTHORITY_HOSTS: ['regulator.example'] }), 'recognition-authority-not-listed', 'a host that is not listed while another is');
  hiddenR(R('https://www.unit.example/recognition', { RECOGNITION_AUTHORITY_HOSTS: ['unit.example'] }), 'recognition-from-university', 'the university\'s own site, even if listed by mistake');
  hiddenR(R('https://wdoms.org/school/1', { RECOGNITION_AUTHORITY_HOSTS: ['wdoms.org'] }), 'source-not-evidence', 'a directory, even if listed by mistake');
  const { rec, ev: e } = passing();
  const rr = clone(rec); rr.recognition = V(['CANARY-RECOGNITION'], 'https://regulator.example/list');
  const er = clone(e); er.entries.push(entry('recognition', ['CANARY-RECOGNITION'], { sourceTier: 4, sourceUrl: 'https://regulator.example/list' }));
  check(!JSON.stringify(toPublicRecord(rr, er, { now: NOW })).includes('CANARY'), 'by default no recognition claim reaches the projection');
  check(toPublicRecord(rr, er, { now: NOW, settings: { RECOGNITION_AUTHORITY_HOSTS: ['regulator.example'] } }).recognition.show, 'with the authority listed, the same claim is shown');
}

section('N24 (c) official website and government evidence');
{
  const { rec, ev: e } = passing();
  const W = (entries, settings) => C('website', V(`${H}/`, `${H}/`), entries, settings ? { settings } : {});
  const tier1 = entry('website', `${H}/`, { sourceUrl: `${H}/` });
  const gov = (o = {}) => entry('website', `${H}/`, { n: 2, sourceTier: 3, sourceUrl: GOV_WEBSITE_PAGE, ...o });
  const rv = V(`${H}/`, `${H}/`);
  eq(W([tier1, gov()]).show, true, 'positive control: the university\'s page and a government register list the same website');
  eq(W([tier1]).code, 'website-not-government-listed', 'the university\'s own page alone does not establish its official website');
  eq(W([tier1, gov({ value: 'https://other.example/' })]).code, 'conflict', 'a verified government entry listing a different website is a conflict');
  eq(W([tier1, gov({ value: `${H}` })]).code, 'conflict', 'a government entry differing only by the trailing slash is a conflict (exactly the same value is required)');
  eq(W([tier1, gov({ sourceUrl: 'https://register.example/universities/1' })]).code, 'website-not-government-listed', 'a tier-3 entry not on a .gov.ua address does not count');
  eq(W([tier1, gov({ sourceUrl: 'https://register.gov.ua.attacker.example/1' })]).code, 'website-not-government-listed', 'a look-alike of .gov.ua does not count');
  eq(W([tier1, gov({ status: 'unverified', decision: 'withhold', withholdReason: 'x' })]).code, 'website-not-government-listed', 'an unverified government entry does not count');
  eq(W([tier1, gov({ nextReview: day(-1) })]).code, 'website-not-government-listed', 'a government entry past its next review does not count');
  eq(W([tier1, gov({ quotation: '' })]).code, 'website-not-government-listed', 'a government entry without a quotation does not count');
  eq(W([tier1, gov({ method: 'copied from a search snippet' })]).code, 'website-not-government-listed', 'a government entry read from a search snippet does not count');
  eq(W([tier1, gov({ sourceTier: 2 })]).code, 'website-not-government-listed', 'a .gov.ua entry not marked tier 3 does not count');
  eq(W([tier1], { WEBSITE_REQUIRES_GOVERNMENT_EVIDENCE: false }).show, true, 'owner setting WEBSITE_REQUIRES_GOVERNMENT_EVIDENCE=false: the university\'s page alone is enough');
  eq(C('website', V(`${H}/`, GOV_WEBSITE_PAGE), [gov()]).show, true, 'the government register page may itself be the website\'s source');
  check(rv.status === 'verified', 'record claim fixture');
  // Profile level: without the government entry nothing that depends on the official host is shown.
  const noGov = clone(e); noGov.entries = noGov.entries.filter((x) => x.sourceTier !== 3);
  const p = toPublicRecord(rec, noGov, { now: NOW });
  check(!p.website.show && !p.officialName.show && !p.address.show && p.programmes.length === 0, 'no government entry: website, name, address and programmes (all read on the university\'s own pages) are withheld');
  const res = evaluatePublication(rec, noGov, { now: NOW });
  check(!res.publishable && res.failures.some((f) => f.field === 'website' && f.code === 'not-shown:website-not-government-listed'), 'no government entry: the profile cannot be published and the failure says why');
  check(publicationDecision(rec, noGov, { now: NOW }).buildError, 'a flagged record without the government entry stops a production build');
  const differs = clone(e); differs.entries.find((x) => x.sourceTier === 3).value = 'https://unit-other.example/';
  const pd = toPublicRecord(rec, differs, { now: NOW });
  check(pd.website.publicState === 'withheld-conflict' && !pd.officialName.show && pd.programmes.length === 0, 'government entry with a different website: conflict, and everything that depends on the official host is withheld');
  // Tier-3 evidence for other claims does not depend on the official host.
  const ra = clone(rec); ra.accreditation = V('Cert 1', 'https://register.unit-test.gov.ua/accreditation/1');
  const ea = clone(noGov); ea.entries.push(entry('accreditation', 'Cert 1', { sourceTier: 3, sourceUrl: 'https://register.unit-test.gov.ua/accreditation/1' }));
  check(toPublicRecord(ra, ea, { now: NOW }).accreditation.show, 'a government-register fact is still evaluated on its own when the website is withheld');
  check(evaluatePublication(rec, noGov, { now: NOW, settings: { WEBSITE_REQUIRES_GOVERNMENT_EVIDENCE: false } }).publishable, 'owner setting off: the same record publishes on the university\'s own pages');
}

section('N24 (d) start dates and intake text');
{
  const sd = (value, o = {}) => C('preparatoryRoutes.prep.startDate', V(value), ev('preparatoryRoutes.prep.startDate', value, o));
  const it = (value) => C('programmes.medicine.intake', V(value), ev('programmes.medicine.intake', value));
  const lastYear = String(NOW.getUTCFullYear() - 1), thisYear = String(NOW.getUTCFullYear());
  eq(sd(day(-1)).code, 'start-date-passed', 'a preparatory start date written YYYY-MM-DD that has passed');
  eq(sd(day(0)).show, true, 'a start date of today is still shown');
  eq(sd(day(30)).show, true, 'positive control: a future start date');
  eq(sd('2026-02-30').code, 'start-date-unparseable', 'an impossible YYYY-MM-DD start date');
  eq(sd(`1 November ${lastYear}`).code, 'past-year-named', 'a free-text start date naming a year before the current academic year');
  eq(sd(`1 November ${thisYear}`).show, true, 'positive control: a free-text start date in the current academic year');
  eq(it(`September ${lastYear}`).code, 'past-year-named', 'a free-text intake naming last year');
  eq(it(`${academicYear(NOW, -1)} intake`).code, 'past-year-named', 'a free-text intake naming the previous academic year');
  eq(it(`Classes start in September ${thisYear}`).show, true, 'positive control: an intake in the current academic year');
  eq(it(`${AY} intake`).show, true, 'positive control: an intake naming the current academic year');
  eq(it('Applications from 10 000 students').show, true, 'a number that is not a year is not read as one');
  eq(it('September 2019 and September 2027').code, 'past-year-named', 'any past year in the text withholds it');
  // A YYYY-MM-DD date inside the text counts too (review 2026-10-12): with words, with a time, or one of two dates.
  eq(sd(`${day(-1)} (orientation week)`).code, 'start-date-passed', 'a passed YYYY-MM-DD start date followed by words');
  eq(sd(`${day(-1)}T09:00`).code, 'start-date-passed', 'a passed YYYY-MM-DD start date with a time');
  eq(sd(`${day(-1)} or ${day(60)}`).code, 'start-date-passed', 'two start dates, one of which has passed');
  eq(sd(`Classes begin ${thisYear}-02-30`).code, 'start-date-unparseable', 'an impossible YYYY-MM-DD date inside the text');
  eq(sd(`${day(10)} (orientation week)`).show, true, 'positive control: a future YYYY-MM-DD start date followed by words');
  eq(it(`Classes start ${day(-1)}`).code, 'start-date-passed', 'a free-text intake containing a YYYY-MM-DD date that has passed');
  eq(it(`Classes start ${day(20)}`).show, true, 'positive control: a free-text intake containing a future YYYY-MM-DD date');
}

section('N24 (e) fee display');
{
  const m = { amount: 4100, currency: 'USD', per: 'year', academicYear: AY, schedule: 'two instalments, by 1 September and 1 February', variesByYear: 'year 1: 3,500; years 2-6: 4,100' };
  const t = formatMoney(m);
  check(t.startsWith(`4,100 USD per year (${AY})`) && t.includes('payment schedule, as published: two instalments, by 1 September and 1 February') && t.includes('year by year, as published: year 1: 3,500; years 2-6: 4,100'), `formatMoney prints the schedule and year-by-year amounts the verified fee carries: ${t}`);
  eq(formatMoney({ amount: 5000, currency: 'EUR', per: 'semester', academicYear: AY }), `5,000 EUR per semester (${AY})`, 'formatMoney without schedule');
  eq(formatMoney({ amount: 9000, currency: 'EUR', per: 'programme', academicYear: AY }), `9,000 EUR for the whole programme (${AY})`, 'formatMoney for a whole-programme fee');
  eq(formatMoney({ amount: 200, currency: 'UAH', per: 'once', academicYear: AY }), `200 UAH one-off (${AY})`, 'formatMoney for a one-off charge');
  check(formatMoney(m, { compact: true }).startsWith(`4,100 USD/year (${AY})`) && formatMoney(m, { compact: true }).includes('year by year, as published'), 'compact form keeps the year-by-year amounts');
  eq([formatMoney(null), formatMoney({ amount: 'x' })], ['', ''], 'formatMoney of something that is not a fee is empty');
  const { rec, ev: e } = passing();
  const r = clone(rec); r.programmes[0].tuition = V(m);
  const x = clone(e); x.entries.find((y) => y.claimPath === 'programmes.medicine.tuition').value = m;
  const shownFee = toPublicRecord(r, x, { now: NOW }).programmes[0].tuition;
  check(shownFee.show && shownFee.value.schedule === m.schedule && shownFee.value.variesByYear === m.variesByYear, 'a shown fee carries its schedule and year-by-year amounts to the page');
}

// ------------------------------------------------------------------------------------------------ N25 research previews
section('N25 research previews');
{
  const { rec, ev: e } = passing();
  const opt = (r, v = true) => ({ ...clone(r), verification: { ...clone(r.verification), researchPreview: v } });
  const unpub = (r) => ({ ...clone(r), verification: { ...clone(r.verification), publishable: false } });
  eq(CONFIG.RESEARCH_PREVIEWS, true, 'N25 default: research previews on (owner instruction 2026-10-12)');
  eq(CONFIG.PUBLICATION_SETTINGS.RESEARCH_PREVIEWS, true, 'N25 setting is part of PUBLICATION_SETTINGS');
  eq(FIELD_POLICY.verification.researchPreview, 'internal', 'N25 verification.researchPreview is internal');
  eq(record.parse({ ...clone(rec), verification: { publishable: false, lastReview: null, openQuestions: [] } }).verification.researchPreview, false, 'N25 schema default: not opted in');
  // An unpublished record that opts in: a preview whose record is EXACTLY the projection.
  const d = publicationDecision(opt(unpub(rec)), e, { now: NOW });
  eq([d.published, d.researchPreview, d.researchPreviewReasons], [false, true, []], 'N25 unpublished + opted in = research preview');
  eq(d.previewRecord, toPublicRecord(opt(unpub(rec)), e, { now: NOW }), 'N25 the preview record is exactly toPublicRecord()');
  check(d.publicRecord === null, 'N25 a research preview has no publicRecord (it is not published)');
  check(!deepKeys(d.previewRecord).has('researchPreview') && !deepKeys(d.previewRecord).has('publishable') && !deepKeys(d.previewRecord).has('note'), 'N25 the preview record carries no internal key');
  // Published records are never previews; flags and settings each refuse on their own.
  const pub = publicationDecision(opt(rec), e, { now: NOW });
  eq([pub.published, pub.researchPreview, pub.previewRecord], [true, false, null], 'N25 a published record is not a preview');
  check(pub.researchPreviewReasons.includes('published'), 'N25 reason: published');
  const reasonsOf = (r, o = {}) => publicationDecision(r, e, { now: NOW, ...o }).researchPreviewReasons;
  check(reasonsOf(unpub(rec)).includes('not-opted-in'), 'N25 a record that does not opt in is not a preview');
  check(reasonsOf(opt(unpub(rec), 'yes')).includes('not-opted-in'), 'N25 only the boolean true opts in');
  check(reasonsOf(opt(unpub(rec)), { settings: { RESEARCH_PREVIEWS: false } }).includes('setting-off'), 'N25 setting off: no previews');
  check(reasonsOf({ ...opt(unpub(rec)), synthetic: true }).includes('synthetic'), 'N25 a synthetic sample is never a preview');
  check(reasonsOf((() => { const r = opt(unpub(rec)); delete r.synthetic; return r; })()).includes('synthetic'), 'N25 a record without synthetic:false (unparsed) is refused (fail closed)');
  for (const slug of ['Unit-Test', 'unit--test', '../unit', 'unit test', 'a'.repeat(81)]) check(reasonsOf({ ...opt(unpub(rec)), slug }).includes('unsafe-slug'), `N25 unsafe slug "${slug.slice(0, 20)}" refused`);
  for (const shortName of ['', 'ab', '   ', 'x'.repeat(121), 'Unit <b>Test</b>', 'Unit\nTest', 'Unit Test University (not verified)', 'Search snippet: Unit Test', 'Unit Test University TBC', 'Unit Test \u2028 University'])
    check(reasonsOf({ ...opt(unpub(rec)), shortName }).includes('short-name'), `N25 short name ${JSON.stringify(shortName.slice(0, 30))} refused`);
  for (const k of Object.keys(RESEARCH_PREVIEW_WORDS)) check(typeof RESEARCH_PREVIEW_WORDS[k] === 'string' && RESEARCH_PREVIEW_WORDS[k].length > 20, `N25 reason ${k} has plain words`);
  // Unverified, noted, conflicting values never reach the preview record (it is the same projection a published page gets).
  const leaky = opt(unpub(rec));
  leaky.officialName = U('CANARY-OFFICIAL-NAME'); leaky.website = U('https://canary-host.example/'); leaky.address = U('CANARY-ADDRESS');
  leaky.overview = 'CANARY-OVERVIEW'; leaky.region = 'CANARY-REGION'; leaky.alternativeNames = ['CANARY-ALT'];
  leaky.researchReferences = [{ label: 'CANARY-REF', url: 'https://canary-ref.example/', purpose: 'CANARY-PURPOSE' }];
  leaky.programmes[0].tuition = U(money(98765));
  const lp = publicationDecision(record.parse(leaky), e, { now: NOW });
  check(lp.researchPreview, 'N25 a record full of unverified values can still be a preview (name only)');
  const ls = JSON.stringify(lp.previewRecord);
  for (const c of ['CANARY', 'canary-host', '98765', 'Search-snippet', 'NOT verified']) check(!ls.includes(c), `N25 preview record leaks "${c}"`);
  eq(lp.previewRecord.city, CONFIG.WITHHELD_PLACE_TEXT, 'N25 preview: a city not in a verified address is withheld');
  check(lp.previewRecord.officialName.show === false && lp.previewRecord.website.show === false, 'N25 preview: unverified name and website are not shown');
  // Opting in never turns a flagged, failing record into a quiet preview: a production build still stops.
  const flaggedFailing = { ...opt(rec), officialName: U('Unit Test University') };
  const ff = publicationDecision(flaggedFailing, e, { now: NOW });
  check(ff.buildError === true && ff.published === false, 'N25 a flagged record that fails the policy is still a build error when it opts in to a preview');
  check(publicationBuildError([ff]) !== null, 'N25 publicationBuildError still names a flagged, failing, opted-in record');
  // A preview shows exactly the claims that ARE verified (progressive): here status, statement and format still pass.
  check(lp.previewRecord.status.show === false, 'N25 preview: claims on the university\'s own pages are not shown while the website is withheld (N24 c)');
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
  // N24: the owner settings are read only by the policy, and nothing in the build passes other settings.
  for (const f of files) {
    const r = rel(f), t = readFileSync(f, 'utf8').replace(/^\s*(\/\/|\*|\/\*\*).*$/gm, '');
    if (r !== 'lib/publication.mjs') check(!/publication-config/.test(t), `${r}: imports publication-config.mjs — only src/lib/publication.mjs may read the owner settings`);
    if (r !== 'lib/publication.mjs' && r !== 'lib/publication-config.mjs') check(!/\bsettings\s*:/.test(t) || !/publicationDecision|evaluatePublication|toPublicRecord|evaluateClaim/.test(t), `${r}: passes settings to the publication policy — the build must use the defaults in publication-config.mjs`);
  }
  check(!/\bsettings\s*:/.test(readFileSync(resolve('astro.config.mjs'), 'utf8')), 'astro.config.mjs passes settings to the publication policy');
  // N25: research previews are listed only where a page asks for them; the preview components never touch internal fields.
  const PREVIEW_PAGES = new Set(['lib/publication.mjs', 'lib/records.ts', 'pages/index.astro', 'pages/universities/index.astro', 'pages/universities/[slug].astro', 'pages/apply/index.astro']);
  let previewUsers = 0;
  for (const c of files) {
    const r = rel(c), t = readFileSync(c, 'utf8').replace(/^\s*(\/\/|\*|\/\*\*).*$/gm, '');
    if (/getResearchPreviews|previewRecord/.test(t)) { previewUsers++; check(PREVIEW_PAGES.has(r), `${r}: lists research previews — only ${[...PREVIEW_PAGES].join(', ')} may`); }
  }
  check(previewUsers === PREVIEW_PAGES.size, `N25 static check saw ${previewUsers} files using research previews, expected ${PREVIEW_PAGES.size}`);
  // getResearchPreviews must hand pages the policy projection, never the raw record.
  const rt = readFileSync(join(SRC, 'lib/records.ts'), 'utf8');
  const grp = rt.slice(rt.indexOf('export async function getResearchPreviews'), rt.indexOf('}', rt.indexOf('export async function getResearchPreviews') + 10) + 200);
  check(/x\.d\.previewRecord/.test(grp) && !/x\.raw/.test(grp), 'N25 records.ts getResearchPreviews maps previewRecord (the projection), never the raw record');
  check(/if \(PREVIEW\) return \[\];/.test(grp), 'N25 records.ts getResearchPreviews returns nothing in PREVIEW builds (drafts are shown raw there instead)');
  for (const c of ['components/university/ResearchPreviewProfile.astro', 'components/university/ResearchPreviewCard.astro']) {
    const t = readFileSync(join(SRC, c), 'utf8');
    check(!/\.note\b|researchReferences|alternativeNames|openQuestions|deferredProgrammes|failures|\.raw\b|faqs|editorialReview|reviewer|Withheld|lastReview/.test(t.replace(/^\s*(\/\/|\*|\/\*\*).*$/gm, '')), `${c}: reads an internal record field, a withheld count or the review date`);
    check(!/set:html/.test(t), `${c}: renders raw HTML`);
  }
  // N24 (e): every fee display goes through formatMoney (which prints the schedule and year-by-year amounts).
  for (const c of ['components/university/ProgrammeCard.astro', 'components/university/PreparatoryRoute.astro', 'components/university/CompareTable.astro']) {
    const t = readFileSync(join(SRC, c), 'utf8');
    check(/formatMoney\(/.test(t) && !/\.amount\.toLocaleString/.test(t), `${c}: formats a fee by hand instead of formatMoney (the schedule and year-by-year amounts would be dropped)`);
  }
  check(!/payment schedule and the date we read it/.test(readFileSync(join(SRC, 'components/university/ProgrammeCard.astro'), 'utf8')), 'ProgrammeCard: the old tuition explanation (promising a schedule unconditionally) is back');
  // N24 (f): the universities and samples collections read top-level *.json files only.
  const cc = readFileSync(join(SRC, 'content.config.ts'), 'utf8');
  for (const [name, base] of [['universities', 'universitiesDir'], ['samples', "'./src/content/samples'"]]) {
    const m = new RegExp(`const ${name} = defineCollection\\(\\{\\s*loader: glob\\(\\{ pattern: '([^']*)', base: ${base.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')} \\}\\)`).exec(cc);
    check(m && m[1] === '*.json', `content.config.ts: the ${name} collection must read top-level *.json files only (found ${m ? m[1] : 'no matching loader'})`);
  }
}

console.log(`publication-policy: ${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);
