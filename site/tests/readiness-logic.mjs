// Readiness logic test (node, no build): src/lib/readiness.mjs against APPLICATION_SYSTEM_SPEC.md §8.2, §8.3, §12.2,
// §12.3 and §13, using the synthetic candidate (src/lib/synthetic-candidate.mjs) and the synthetic sample record
// (src/content/samples/example-medical-university.json). Also runs every real record through the logic to prove that
// unverified requirements can never produce "met" or "not met".
// Prints "readiness-logic: N checks, M failures" and exits non-zero on any failure.
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import * as R from '../src/lib/readiness.mjs';
import { SYNTHETIC_CANDIDATE as C, SYNTHETIC_VARIANT_NO_CHEMISTRY as V, SYNTHETIC_MARKERS } from '../src/lib/synthetic-candidate.mjs';

let checks = 0, failures = 0;
const ok = (cond, msg) => { checks++; if (!cond) { failures++; console.log('FAIL', msg); } };
const eq = (a, b, msg) => ok(JSON.stringify(a) === JSON.stringify(b), `${msg}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);
const note = (m) => console.log('NOTE', m);
const clone = (x) => JSON.parse(JSON.stringify(x));

const sample = JSON.parse(readFileSync(resolve('src/content/samples/example-medical-university.json'), 'utf8'));
const P = sample.programmes.find((p) => p.id === 'medicine');
const byId = (list, id, key = 'requirementId') => list.find((x) => x[key] === id);

// ------------------------------------------------------------------ constants
eq(R.DISCLAIMER, 'This compares what you told us with the requirements the university has published; it is not an admission decision.', 'DISCLAIMER wording (§8.2)');
eq([...R.RESULTS], ['met', 'not_met', 'unknown', 'pending_evidence'], 'four results (§8.2)');
eq(R.ACCEPTED_LABEL, 'Accepted for our review. This is not confirmation of authenticity or acceptance by the university.', 'accepted-for-processing label (§12.3)');

// ------------------------------------------------------------------ synthetic candidate (§12.2)
ok(C.synthetic === true, 'synthetic candidate carries synthetic: true');
ok(/^\/\/ SYNTHETIC CANDIDATE/.test(readFileSync(resolve('src/lib/synthetic-candidate.mjs'), 'utf8')), 'synthetic-candidate.mjs starts with a SYNTHETIC header comment');
eq([C.intent.field, C.intent.level, C.education.qualification, C.education.awardingCountry], ['medicine', 'integrated_master', 'Secondary School Certificate', 'Example-land'], 'candidate intent and education as §12.2');
eq(C.subjects.map((s) => [s.name, s.studied ? s.grade : 'not studied']), [['Biology', 'B'], ['Chemistry', 'C'], ['Physics', 'not studied'], ['English', 'B'], ['Mathematics', 'A']], 'candidate subjects as §12.2');
ok(C.subjects[0].scaleType === 'letter' && C.subjects[0].resultStatus === 'achieved', 'Biology is letter scale, achieved');
eq(C.documents.map((d) => [d.type, d.state]), [['certificate', 'have'], ['transcript', 'need'], ['passport', 'have'], ['translation', 'not_sure']], 'candidate documents as §12.2');
ok(SYNTHETIC_MARKERS.includes('Example-land'), 'synthetic markers include Example-land');
ok(V.synthetic === true && V.subjects.find((s) => s.name === 'Chemistry').studied === false, 'variant: synthetic, Chemistry not studied');

// ------------------------------------------------------------------ worked example §12.2 against the sample's requirement objects
const before = clone(P);
const res = R.assessReadiness(C, P);
eq(res.map((r) => r.requirementId), P.requirements.map((r) => r.id), 'results come back in requirement order');
eq(JSON.stringify(P), JSON.stringify(before), 'assessReadiness does not mutate the programme');
const bio = byId(res, 'bio'), chem = byId(res, 'chem'), bioMin = byId(res, 'bio-min'), eng = byId(res, 'eng'), exam = byId(res, 'exam');
eq([bio.result, bio.wording], ['met', 'Biology: studied (grade B as you entered it)'], '§12.2 row 1 Biology studied');
eq(bio.source, 'https://example.invalid/admission', 'verified requirement carries its source');
ok(!!bio.checked, 'verified requirement carries its checked date');
eq(chem.result, 'met', '§12.2 row 2 Chemistry studied');
eq([bioMin.result, bioMin.wording], ['unknown', "The university's minimum grade has not yet been verified by us; we will confirm it from the official page."], '§12.2 row 3 minimum 60% Biology (unverified)');
ok(bioMin.source === null && bioMin.checked === null, 'unverified requirement shows no source or date');
eq(eng.result, 'pending_evidence', '§12.2 row 4 English B1 or instruction in English');
eq(R.assessReadiness(C, P, { uploadsOpen: true }).find((r) => r.requirementId === 'eng').wording, 'Upload your English certificate or school letter when you have it.', '§12.2 row 4 exact wording in Stage-2 mode (uploads open)');
ok(!/upload/i.test(eng.wording) && /English certificate/.test(eng.wording) && /school/.test(eng.wording) && /do not send it now/.test(eng.wording), 'row 4 Stage-1 wording asks for the certificate or school letter without claiming uploads exist');
eq(exam.result, 'pending_evidence', 'sample exam requirement → pending evidence');
ok(exam.wording.includes(`“${P.requirements.find((r) => r.id === 'exam').examFormat}”`), 'exam wording quotes the verbatim examFormat');

const docs = R.documentChecklist(C, P);
eq(docs.map((d) => d.documentId), P.documents.map((d) => d.id), 'checklist in document order');
const cert = byId(docs, 'certificate', 'documentId'), tr = byId(docs, 'translation', 'documentId');
eq([cert.state, cert.wording], ['outstanding', 'Transcript: outstanding — request it from your school.'], '§12.2 row 5 certificate + transcript');
eq([tr.state, tr.wording], ['unknown', 'Needed only if your documents are not in Ukrainian or English — tell us the language.'], '§12.2 row 6 translation');
eq(tr.condition, P.documents.find((d) => d.id === 'translation').condition, 'conditional document carries its condition text');
eq(tr.conditionStatus, 'unsettled', 'translation condition unsettled without a certificate language');
eq(byId(docs, 'passport', 'documentId').state, 'available', 'passport have → available');
ok(/Uploads are not open yet/.test(byId(docs, 'passport', 'documentId').wording), 'available wording says uploads are not open');
const photos = byId(docs, 'photos', 'documentId');
eq([photos.state, photos.formatNote], ['unknown', '6 photographs, 3 × 4 cm (sample)'], 'photographs: undeclared → unknown; formatNote carried verbatim');
const med = byId(docs, 'medical', 'documentId');
eq([med.state, med.verified], ['unknown', false], 'unverified medical certificate → unknown, verified: false');
ok(/Not yet verified by us/.test(med.wording), 'unverified document wording says not yet verified');
eq(R.preparatorySuggestion(res, sample), null, '§12.2 candidate: nothing not met → no preparatory suggestion');

// Where the sample differs from the §12.2 table (reported, not failed):
note('sample requirement checked dates are 2026-10-01; §12.2 says 2026-10-11');
note('sample has an extra verified requirement "exam" (oral entrance examination) not in §12.2 → pending_evidence');
note('sample language requirement reads "English level B1, or secondary schooling in English (sample)"; §12.2 "English B1 or school instruction in English"');
note('sample stores certificate + transcript as ONE document object ("Secondary school certificate with transcript of grades"); the logic splits it into the two declared parts, giving §12.2 row 5');
note('sample adds documents not in §12.2: passport (available), photographs with format note (unknown: not declared), medical certificate (unverified)');
note('§12.2 shows "—" as Chemistry wording; the logic gives "Chemistry: studied (grade C as you entered it)" by the same rule as Biology');
note('§12.2 says Biology B is "on an unknown scale"; the synthetic candidate uses a letter scale (§13 scale_type). Row 3 is unknown either way because the requirement is unverified (and percent ≠ letter)');
note('§12.2 row 4 wording "Upload your English certificate…" is used only with uploadsOpen: true; the default Stage-1 wording does not mention uploads (no uploads exist)');
note('§12.2 models certificate + transcript and translation as type=document REQUIREMENT objects; the sample keeps them in programme.documents (schema documentRequirement), so they appear in the checklist, not as readiness rows');

// ------------------------------------------------------------------ rule-level checks
const req = (o) => ({ id: 'x', type: 'subject', summary: 's', status: 'verified', source: 'https://example.invalid/r', checked: '2026-10-01', intakeYear: '2026/27', ...o });
const cand = (subjects = [], extra = {}) => ({ synthetic: true, intent: { intake: '2026/27' }, education: {}, subjects, documents: [], ...extra });
const one = (c, r, o) => R.assessRequirement(c, r, o);
const sub = (o) => ({ name: 'Biology', studied: true, grade: 'B', scaleType: 'letter', resultStatus: 'achieved', ...o });

// unverified / not-published / outdated → unknown with the fixed wording
for (const status of ['unverified', 'not-published', undefined]) {
  const a = one(cand([sub()]), req({ subject: 'Biology', status }));
  eq([a.result, a.wording], ['unknown', "The university's subject requirement has not yet been verified by us; we will confirm it from the official page."], `status ${status ?? '(missing)'} → unknown, fixed wording`);
}
eq(one(cand([sub()]), req({ subject: 'Biology', status: 'outdated' })).result, 'unknown', 'outdated → unknown');

// subject rules
eq(one(cand([]), req({ subject: 'Biology' })).result, 'unknown', 'subject: no candidate data → unknown');
eq(one(cand([sub({ studied: false })]), req({ subject: 'Biology' })).result, 'not_met', 'subject: not studied → not_met');
eq(one(cand([sub({ resultStatus: 'predicted' })]), req({ subject: 'Biology' })).result, 'pending_evidence', 'subject: predicted → pending_evidence');
eq(one(cand([sub({ resultStatus: 'pending' })]), req({ subject: 'Biology' })).result, 'pending_evidence', 'subject: pending → pending_evidence');
eq(one(cand([sub({ resultStatus: null })]), req({ subject: 'Biology' })).result, 'unknown', 'subject: studied with no result status → unknown');
eq(one(cand([sub({ name: 'biology' })]), req({ subject: 'Biology' })).result, 'met', 'subject names match case-insensitively');

// grade rules: compare only verified + same scale (+ same max) + achieved; never convert
const g = (minimum, o = {}) => req({ type: 'grade', subject: 'Biology', minimum, ...o });
const pct = { value: '60', scale: 'percent' };
eq(one(cand([sub()]), g(pct)).result, 'unknown', 'grade: letter vs percent → unknown');
eq(one(cand([sub()]), g(pct)).reason, 'scale_not_comparable', 'grade: letter vs percent reason scale_not_comparable');
eq(one(cand([sub({ grade: '72', scaleType: 'percentage' })]), g(pct)).result, 'met', 'grade: 72% vs minimum 60% → met');
eq(one(cand([sub({ grade: '55%', scaleType: 'percentage' })]), g(pct)).result, 'not_met', 'grade: 55% vs minimum 60% → not_met');
eq(one(cand([sub({ grade: '72', scaleType: 'percentage', resultStatus: 'predicted' })]), g(pct)).result, 'pending_evidence', 'grade: predicted → pending_evidence');
eq(one(cand([sub({ grade: '72', scaleType: 'percentage', resultStatus: 'pending' })]), g(pct)).result, 'pending_evidence', 'grade: pending → pending_evidence');
eq(one(cand([sub({ grade: '72', scaleType: 'percentage' })]), g(pct, { status: 'unverified' })).result, 'unknown', 'grade: unverified minimum with matching scale → unknown (never compared)');
eq(one(cand([sub({ grade: '72', scaleType: null })], { education: {} }), g(pct)).reason, 'scale_unknown', 'grade: candidate scale missing → unknown (scale_unknown)');
eq(one(cand([sub({ grade: '72', scaleType: 'percentage' })]), g(undefined)).reason, 'no_verified_minimum', 'grade: no minimum stated → unknown (no_verified_minimum)');
eq(one(cand([sub({ grade: '10', scaleType: 'points', scaleMax: 12 })]), g({ value: '6', scale: 'points out of 12' })).result, 'met', 'grade: 10/12 vs 6/12 → met');
eq(one(cand([sub({ grade: '5', scaleType: 'points', scaleMax: 12 })]), g({ value: '6', scale: 'points out of 12' })).result, 'not_met', 'grade: 5/12 vs 6/12 → not_met');
eq(one(cand([sub({ grade: '9', scaleType: 'points', scaleMax: 10 })]), g({ value: '6', scale: 'points out of 12' })).result, 'unknown', 'grade: points out of 10 vs out of 12 → unknown (no conversion)');
eq(one(cand([sub({ grade: '9', scaleType: 'points', scaleMax: null })]), g({ value: '6', scale: 'points out of 12' })).result, 'unknown', 'grade: points with unknown max → unknown');
eq(one(cand([sub({ grade: '3.5', scaleType: 'GPA', scaleMax: 4 })]), g({ value: '3.0', scale: 'GPA/4' })).result, 'met', 'grade: GPA 3.5/4 vs 3.0/4 → met');
eq(one(cand([sub({ grade: '3.5', scaleType: 'GPA', scaleMax: 5 })]), g({ value: '3.0', scale: 'GPA/4' })).result, 'unknown', 'grade: GPA out of 5 vs out of 4 → unknown');
eq(one(cand([sub({ grade: 'B' })]), g({ value: 'C', scale: 'letter' })).result, 'met', 'grade: letter B vs minimum C → met');
eq(one(cand([sub({ grade: 'D' })]), g({ value: 'C', scale: 'letter' })).result, 'not_met', 'grade: letter D vs minimum C → not_met');
eq(one(cand([sub({ grade: 'A*' })]), g({ value: 'A', scale: 'letter' })).result, 'met', 'grade: A* vs minimum A → met');
eq(one(cand([sub({ grade: 'Distinction' })]), g({ value: 'C', scale: 'letter' })).reason, 'grade_unreadable', 'grade: unreadable letter value → unknown');
eq(one(cand([sub({ grade: '72', scaleType: 'other' })]), g({ value: '60', scale: 'national scale' })).result, 'unknown', 'grade: "other" scale never compared');
eq(one(cand([sub({ studied: false })]), g(pct)).result, 'not_met', 'grade: subject not studied → not_met');
eq(one(cand([]), g(pct)).result, 'unknown', 'grade: no candidate data → unknown');

// language, exam, age, other, document
const lang = req({ type: 'language', summary: 'English level B1, or secondary schooling in English' });
eq(one(cand([sub({ name: 'English', grade: 'A' })]), lang).result, 'pending_evidence', 'language: verified → pending_evidence even with a strong English grade');
eq(one(cand([]), lang).result, 'pending_evidence', 'language: no data → still pending_evidence (evidence needed)');
eq(one(cand([]), { ...lang, status: 'unverified' }).result, 'unknown', 'language: unverified → unknown');
const ex = req({ type: 'exam', summary: 'Entrance test', examFormat: 'written test, 50 questions (sample)' });
ok(one(cand([]), ex).result === 'pending_evidence' && one(cand([]), ex).wording.includes('“written test, 50 questions (sample)”'), 'exam: pending_evidence quoting the verbatim format');
eq(one(cand([]), { ...ex, status: 'unverified' }).result, 'unknown', 'exam: unverified → unknown');
eq(one(cand([]), req({ type: 'age', summary: 'At least 17 years old' })).result, 'unknown', 'age: not verifiable from candidate data → unknown');
eq(one(cand([]), req({ type: 'other', summary: 'Interview' })).result, 'unknown', 'other → unknown');
eq(one(cand([]), req({ type: 'document', summary: 'Certificate' })).result, 'pending_evidence', 'type=document requirement → pending_evidence (see checklist)');

// intake-specific requirements
const later = one(cand([sub()], { intent: { intake: '2027/28' } }), req({ subject: 'Biology' }));
ok(later.intakeMismatch === true && later.result === 'unknown' && /2026\/27/.test(later.wording) && /2027\/28/.test(later.wording), 'intake: requirement for 2026/27, candidate 2027/28 → flagged, not compared');
eq(one(cand([sub()], { intent: { intake: 'not sure' } }), req({ subject: 'Biology' })).intakeMismatch, false, 'intake: candidate "not sure" → no flag');
eq(one(cand([sub()], { intent: { intake: '2026' } }), req({ subject: 'Biology' })).result, 'met', 'intake: "2026" matches "2026/27"');
eq(one(cand([sub()], { intent: {} }), req({ subject: 'Biology', intakeYear: undefined })).result, 'met', 'intake: requirement without intakeYear is compared');
const laterUnv = one(cand([sub()], { intent: { intake: '2027/28' } }), req({ subject: 'Biology', status: 'unverified' }));
ok(laterUnv.intakeMismatch === true && laterUnv.result === 'unknown' && /not yet been verified/.test(laterUnv.wording), 'intake: unverified requirement for another intake is still flagged (and stays unknown)');

// conditional requirements (§8.2 condition, e.g. "applicants with A-levels"): never settled from the profile
const condReq = (o) => req({ subject: 'Physics', condition: 'Applicants with A-levels only (sample)', ...o });
const cNot = one(cand([sub({ name: 'Physics', studied: false })]), condReq());
ok(cNot.result === 'unknown' && cNot.reason === 'condition_unsettled' && cNot.wording.includes('“Applicants with A-levels only (sample)”'), 'conditional requirement: would-be not_met → unknown, condition quoted');
eq(cNot.condition, 'Applicants with A-levels only (sample)', 'conditional requirement: condition carried on the result');
eq(one(cand([sub({ name: 'Physics' })]), condReq()).result, 'unknown', 'conditional requirement: would-be met → unknown (condition not settled)');
eq(one(cand([sub({ name: 'Physics', grade: 'D' })]), condReq({ type: 'grade', minimum: { value: 'C', scale: 'letter' } })).result, 'unknown', 'conditional grade requirement: never not_met');
eq(one(cand([]), condReq({ type: 'exam', examFormat: 'written test (sample)' })).result, 'pending_evidence', 'conditional exam requirement: still pending_evidence');
ok(one(cand([]), condReq({ status: 'unverified' })).wording === "The university's subject requirement has not yet been verified by us; we will confirm it from the official page.", 'conditional unverified requirement keeps the fixed wording');
eq(R.preparatorySuggestion([cNot], sample), null, 'conditional requirement cannot trigger a preparatory suggestion');
eq(one(cand([sub()]), req({ subject: 'Biology' })).condition, null, 'unconditional requirement: condition null');

// only verified objects can produce met / not_met (exhaustive over types × statuses × candidate shapes)
const shapes = [cand([]), cand([sub()]), cand([sub({ studied: false })]), cand([sub({ grade: '90', scaleType: 'percentage' })]), cand([sub({ grade: '10', scaleType: 'percentage' })])];
let leak = 0;
for (const type of ['subject', 'grade', 'exam', 'language', 'age', 'document', 'other'])
  for (const status of ['unverified', 'not-published', 'outdated', undefined])
    for (const c of shapes) {
      const a = one(c, req({ type, status, subject: 'Biology', minimum: pct, summary: 'English B1' }));
      if (a.result !== 'unknown') leak++;
    }
eq(leak, 0, 'no unverified / not-published / outdated requirement yields anything but unknown');

// never a score, percentage, verdict, "eligible" or "ineligible"
const ALLOWED = ['requirementId', 'type', 'summary', 'subject', 'verified', 'source', 'checked', 'candidateData', 'intakeYear', 'intakeMismatch', 'condition', 'result', 'reason', 'wording'].sort();
const all = [...res, ...R.assessReadiness(V, P), ...R.assessReadiness(C, P, { uploadsOpen: true })];
ok(all.every((a) => JSON.stringify(Object.keys(a).sort()) === JSON.stringify(ALLOWED)), 'result objects have exactly the documented fields');
ok(all.every((a) => R.RESULTS.includes(a.result)), 'every result is one of the four');
ok(!all.some((a) => Object.keys(a).some((k) => /score|percent|total|verdict|eligib|overall|pass|rank/i.test(k))), 'no score / percentage / verdict / eligibility field');
ok(!all.some((a) => /eligib|verdict|\bscore\b|guarantee/i.test(a.wording)), 'no wording mentions eligibility, a verdict, a score or a guarantee');
ok(!Object.keys(R).some((k) => /score|verdict|eligib|total|percent|overall/i.test(k)), 'module exports nothing that totals results');
ok(!Array.isArray(res) || !('score' in res) && !('verdict' in res), 'result array carries no aggregate property');

// ------------------------------------------------------------------ document checklist rules
const docP = (d) => ({ documents: [{ id: 'd', name: 'Passport', status: 'verified', source: 'https://example.invalid/d', checked: '2026-10-01', intakeYear: '2026/27', ...d }] });
const dc = (docsDeclared, extra = {}) => cand([], { documents: docsDeclared, ...extra });
eq(R.documentChecklist(dc([{ type: 'passport', state: 'have' }]), docP({}))[0].state, 'available', 'document: have → available');
eq(R.documentChecklist(dc([{ type: 'passport', state: 'need' }]), docP({}))[0].state, 'outstanding', 'document: need → outstanding');
eq(R.documentChecklist(dc([{ type: 'passport', state: 'not_sure' }]), docP({}))[0].state, 'unknown', 'document: not_sure → unknown');
eq(R.documentChecklist(dc([]), docP({}))[0].state, 'unknown', 'document: not declared → unknown');
ok(!R.documentChecklist(dc([{ type: 'passport', state: 'have' }]), docP({}))[0].wording.match(/\bupload (?:a|your)\b/i), 'Stage-1 available wording never asks for an upload');
const tDoc = { id: 't', name: 'Notarised translation of the certificate', condition: 'Only if the certificate is not in Ukrainian or English' };
const tr2 = (lang, state) => R.documentChecklist(dc(state ? [{ type: 'translation', state }] : [], { education: { certificateLanguage: lang } }), docP(tDoc))[0];
eq([tr2('English', 'need').state, tr2('English', 'need').conditionStatus], ['not_needed', 'does_not_apply'], 'conditional: certificate in English → not needed');
eq(tr2('ukrainian', 'not_sure').state, 'not_needed', 'conditional: language match is case-insensitive');
eq([tr2('French', 'need').state, tr2('French', 'need').conditionStatus], ['outstanding', 'applies'], 'conditional: certificate in French + need → outstanding');
ok(/Needed because your certificate is in French/.test(tr2('French', 'need').wording), 'conditional: wording gives the reason it applies');
eq(tr2('French', 'have').state, 'available', 'conditional: applies + have → available');
eq(tr2('French', 'not_sure').state, 'unknown', 'conditional: applies + not sure → unknown');
eq(tr2('French', null).state, 'unknown', 'conditional: applies + not declared → unknown');
eq([tr2(null, 'need').state, tr2(null, 'need').conditionStatus], ['unknown', 'unsettled'], 'conditional: no certificate language → unknown even if declared need');
const hague = R.documentChecklist(dc([{ type: 'legalisation', state: 'need' }], { education: { certificateLanguage: 'French', awardingCountry: 'Example-land' } }), docP({ id: 'l', name: 'Apostille', condition: 'Applicants from countries outside the Hague Convention' }))[0];
eq([hague.state, hague.conditionStatus], ['unknown', 'unsettled'], 'conditional: condition the data cannot settle stays unknown');
ok(hague.wording.includes('Applicants from countries outside the Hague Convention'), 'unsettled condition is quoted in the wording');
// a language condition about another document, or about documents in general, is not settled by the certificate's language
const cl = (condition, name = 'Notarised translation') => R.documentChecklist(dc([{ type: 'translation', state: 'need' }], { education: { certificateLanguage: 'English' } }), docP({ id: 't2', name, condition }))[0];
eq([cl('Only if the birth certificate is not in Ukrainian or English').state, cl('Only if the birth certificate is not in Ukrainian or English').conditionStatus], ['unknown', 'unsettled'], 'conditional: birth-certificate language not settled by the school certificate');
eq(cl('Only if the passport is not in Ukrainian or English').conditionStatus, 'unsettled', 'conditional: passport language not settled by the school certificate');
eq(cl('If your documents are not in Ukrainian or English').conditionStatus, 'unsettled', 'conditional: "documents" in general not settled by the certificate language alone');
eq(R.evaluateCondition('If your documents are not in Ukrainian or English', C).kind, 'language', 'conditional: documents-language condition asks for the language');
eq(cl('Only if the certificate and other documents are not in Ukrainian or English').conditionStatus, 'unsettled', 'conditional: certificate plus other documents not settled by the certificate language alone');
eq(R.evaluateCondition('Only if the certificate is not in Latin script', { ...C, education: { certificateLanguage: 'English' } }).kind, 'unrecognised', 'conditional: a script condition is not read as a language');
ok(cl('Only if the birth certificate is not in Ukrainian or English').wording.includes('“Only if the birth certificate is not in Ukrainian or English”'), 'conditional: unsettled other-document condition is quoted');
eq(R.documentTypesFor({ id: 'police', name: 'Police clearance certificate' }), [], 'documentTypesFor: police-clearance certificate is not the school certificate');
eq(R.documentTypesFor({ id: 'hiv', name: 'HIV test certificate' }), ['medical_certificate'], 'documentTypesFor: HIV test certificate is a medical certificate');
eq(R.documentTypesFor({ id: 'edu', name: 'Document on the obtained level of education with grades (points) or an academic certificate' }), ['certificate', 'transcript'], 'documentTypesFor: education document with grades → certificate + transcript');
eq(R.documentChecklist(dc([{ type: 'certificate', state: 'have' }]), docP({ id: 'police', name: 'Police clearance certificate' }))[0].state, 'unknown', 'checklist: a school certificate the candidate has does not tick a police-clearance certificate');
const unv = R.documentChecklist(dc([{ type: 'passport', state: 'have' }]), docP({ status: 'unverified', source: null }))[0];
ok(unv.verified === false && unv.state === 'unknown' && unv.source === null, 'unverified document object marked not verified, state unknown, no source');
eq(R.documentChecklist(dc([{ type: 'passport', state: 'have' }], { intent: { intake: '2027/28' } }), docP({}))[0].intakeMismatch, true, 'document for another intake is flagged');
eq(R.documentTypesFor({ id: 'translation', name: 'Notarised translation of the certificate' }), ['translation'], 'documentTypesFor: translation of the certificate is a translation');
eq(R.documentTypesFor({ id: 'certificate', name: 'Secondary school certificate with transcript of grades' }), ['certificate', 'transcript'], 'documentTypesFor: certificate with transcript → both parts');
eq(R.documentTypesFor({ id: 'medical', name: 'Medical certificate' }), ['medical_certificate'], 'documentTypesFor: medical certificate');
eq(R.documentTypesFor({ id: 'photos', name: 'Photographs' }), ['photographs'], 'documentTypesFor: photographs');
ok(R.documentChecklist(C, P).every((d) => R.CHECKLIST_STATES.includes(d.state)), 'checklist states are Stage-1 states only (no "uploaded")');

// ------------------------------------------------------------------ Stage-2 state machine (§12.3)
eq([...R.STATES], ['not_requested', 'required', 'outstanding', 'uploaded', 'under_review', 'accepted_for_processing', 'replacement_requested'], 'seven document states (§8.3)');
const allowed = [['not_requested', 'required'], ['required', 'outstanding'], ['outstanding', 'uploaded'], ['uploaded', 'under_review'], ['under_review', 'accepted_for_processing'], ['under_review', 'replacement_requested'], ['replacement_requested', 'outstanding']];
for (const [f, t] of allowed) ok(R.canTransition(f, t), `allowed: ${f} → ${t}`);
for (const s of R.STATES) if (s !== 'not_requested') ok(R.canTransition(s, 'not_requested'), `allowed: ${s} → not_requested (requirement withdrawn)`);
const forbidden = [['required', 'uploaded'], ['outstanding', 'under_review'], ['outstanding', 'accepted_for_processing'], ['uploaded', 'accepted_for_processing'], ['accepted_for_processing', 'outstanding'], ['accepted_for_processing', 'under_review'], ['replacement_requested', 'uploaded'], ['replacement_requested', 'accepted_for_processing'], ['not_requested', 'outstanding'], ['under_review', 'uploaded'], ['required', 'required'], ['not_requested', 'not_requested'], ['outstanding', 'submitted'], ['nonsense', 'required']];
for (const [f, t] of forbidden) ok(!R.canTransition(f, t), `forbidden: ${f} → ${t}`);
let cnt = 0;
for (const f of R.STATES) for (const t of R.STATES) if (R.canTransition(f, t)) cnt++;
eq(cnt, allowed.length + R.STATES.length - 1, 'no transitions beyond §12.3');
const walk = ['required', 'outstanding', 'uploaded', 'under_review', 'replacement_requested', 'outstanding', 'uploaded', 'under_review', 'accepted_for_processing'];
ok(walk.every((s, i) => i === 0 || R.canTransition(walk[i - 1], s)), 'replacement loop returns to outstanding and can then be accepted');
eq(R.STATE_NOTES.accepted_for_processing, R.ACCEPTED_LABEL, 'accepted-for-processing note is the fixed label');
eq(R.STATE_NOTES.uploaded, 'Received, not yet reviewed.', 'uploaded shows "received, not yet reviewed" (§12.3)');
eq([...R.REPLACEMENT_REASONS], ['illegible', 'wrong document', 'expired', 'missing pages', 'translation needed'], 'templated replacement reasons (§12.3)');

// ------------------------------------------------------------------ preparatory suggestion
const vRes = R.assessReadiness(V, P);
eq(byId(vRes, 'chem').result, 'not_met', 'variant: Chemistry not studied → not_met');
const sug = R.preparatorySuggestion(vRes, sample);
ok(!!sug && sug.routeId === 'prep' && sug.source === 'https://example.invalid/preparatory', 'not_met + verified route → suggestion with source');
eq(sug?.progressionText, sample.preparatoryRoutes[0].progressionText.value, 'suggestion quotes the route\'s own progression wording verbatim');
eq(sug?.standing, R.PREP_STANDING, 'suggestion carries the standing sentence');
ok(/does not guarantee admission, progression or a place/.test(R.PREP_STANDING), 'standing sentence: no guarantee of admission, progression or a place');
eq(sug?.triggeredBy, ['chem'], 'suggestion names the not-met requirement');
const rec2 = clone(sample);
rec2.preparatoryRoutes[0].progressionText.status = 'unverified';
eq(R.preparatorySuggestion(vRes, rec2), null, 'route with unverified progression wording → no suggestion');
const rec3 = clone(sample); rec3.preparatoryRoutes[0].languageOfInstruction.status = 'unverified';
eq(R.preparatorySuggestion(vRes, rec3), null, 'route with unverified language of instruction → no suggestion');
const rec4 = clone(sample); rec4.preparatoryRoutes[0].progressionText.source = null;
eq(R.preparatorySuggestion(vRes, rec4), null, 'verified claim without a source is not treated as verified');
eq(R.preparatorySuggestion(vRes, { ...sample, preparatoryRoutes: [] }), null, 'not_met but no route → no suggestion');
const rec5 = clone(sample); rec5.preparatoryRoutes[0].durationText.status = 'unverified';
ok(!R.preparatorySuggestion(vRes, rec5).facts.some((f) => f.key === 'durationText'), 'unverified route facts are left out of the suggestion');
eq(R.preparatorySuggestion(res.map((r) => ({ ...r, result: 'unknown' })), sample), null, 'only unknown results → no suggestion');
eq(R.preparatorySuggestion(res.map((r) => ({ ...r, result: 'pending_evidence' })), sample), null, 'only pending results → no suggestion');

// ------------------------------------------------------------------ real records: nothing verified, so nothing can be met or not met
const realDir = resolve('src/content/universities');
for (const f of readdirSync(realDir).filter((x) => x.endsWith('.json'))) {
  const rec = JSON.parse(readFileSync(join(realDir, f), 'utf8'));
  for (const p of [...rec.programmes, ...(rec.deferredProgrammes ?? [])]) {
    const out = R.assessReadiness(C, p);
    const bad = out.filter((a, i) => (p.requirements[i].status ?? 'unverified') !== 'verified' && a.result !== 'unknown');
    ok(bad.length === 0, `${rec.slug}/${p.id}: unverified requirements stay unknown`);
    const badDocs = R.documentChecklist(C, p).filter((d, i) => (p.documents[i].status ?? 'unverified') !== 'verified' && (d.verified || d.state !== 'unknown'));
    ok(badDocs.length === 0, `${rec.slug}/${p.id}: unverified documents stay unknown and not verified`);
  }
  ok(rec.programmes.every((p) => !R.preparatorySuggestion(R.assessReadiness(C, p), rec) || rec.preparatoryRoutes.some((rt) => rt.progressionText?.status === 'verified')), `${rec.slug}: no preparatory suggestion without a verified route`);
}

console.log(`readiness-logic: ${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);
