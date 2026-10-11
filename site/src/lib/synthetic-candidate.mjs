// SYNTHETIC CANDIDATE — NOT A REAL PERSON. Invented data for the readiness demo and tests only.
//
// Source: the worked example in APPLICATION_SYSTEM_SPEC.md §12.2 (field medicine, integrated master,
// "Secondary School Certificate", awarding country "Example-land", Biology B, Chemistry C, Physics not studied,
// English B, Mathematics A; documents: certificate have, transcript need, passport have, translation not sure).
// Additions that §12.2 does not state, chosen so the example runs against the synthetic sample record
// (src/content/samples/example-medical-university.json):
//   - grades are on a letter scale with result_status "achieved" (§13 fields scale_type / result_status);
//   - intended intake "2026/27", the intake the sample's requirement objects name;
//   - certificate language not given, so the translation condition stays unsettled (as in §12.2).
// Never put real candidate data here. Used only by /preview/readiness/ (preview builds) and tests/readiness-logic.mjs;
// tests/publication-gate.mjs fails if any SYNTHETIC_MARKERS string appears in a production page.

/** @typedef {import('./readiness.mjs').Candidate} Candidate */

/** @type {Readonly<Candidate & { synthetic: true, id: string }>} */
export const SYNTHETIC_CANDIDATE = Object.freeze({
  synthetic: true,
  id: 'synthetic-candidate-12-2',
  intent: { field: 'medicine', level: 'integrated_master', universities: ['example-medical-university'], intake: '2026/27' },
  education: {
    qualification: 'Secondary School Certificate',
    awardingCountry: 'Example-land',
    year: null,
    scaleType: 'letter',
    scaleMax: null,
    certificateLanguage: null,
    schoolLanguage: null,
  },
  subjects: [
    { name: 'Biology', studied: true, grade: 'B', scaleType: 'letter', scaleMax: null, resultStatus: 'achieved' },
    { name: 'Chemistry', studied: true, grade: 'C', scaleType: 'letter', scaleMax: null, resultStatus: 'achieved' },
    { name: 'Physics', studied: false },
    { name: 'English', studied: true, grade: 'B', scaleType: 'letter', scaleMax: null, resultStatus: 'achieved' },
    { name: 'Mathematics', studied: true, grade: 'A', scaleType: 'letter', scaleMax: null, resultStatus: 'achieved' },
  ],
  documents: [
    { type: 'certificate', state: 'have' },
    { type: 'transcript', state: 'need' },
    { type: 'passport', state: 'have' },
    { type: 'translation', state: 'not_sure' },
  ],
});

/**
 * SYNTHETIC variant of the same candidate who has not studied Chemistry. Used to show (and test) that a preparatory
 * route is suggested only when a result is "not met" and the route's claims are verified.
 * @type {Readonly<Candidate & { synthetic: true, id: string }>}
 */
export const SYNTHETIC_VARIANT_NO_CHEMISTRY = Object.freeze({
  ...SYNTHETIC_CANDIDATE,
  id: 'synthetic-candidate-12-2-no-chemistry',
  subjects: SYNTHETIC_CANDIDATE.subjects.map((s) => (s.name === 'Chemistry' ? { name: 'Chemistry', studied: false } : s)),
});

/** Distinctive strings that must never appear in a production page (checked by tests/publication-gate.mjs). */
export const SYNTHETIC_MARKERS = Object.freeze(['Example-land', SYNTHETIC_CANDIDATE.id]);
