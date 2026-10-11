// Readiness assessment, document checklist and the Stage-2 document state machine.
// Specification: APPLICATION_SYSTEM_SPEC.md §8.2 (requirement objects, four results), §8.3 (document states),
// §12.2 (worked example and wording), §12.3 (missing-document workflow), §13 (scale_type / scale_max,
// result_status, conditional documents, intake-specific requirements, verbatim exam format).
// Data model of requirement and document objects: src/content/schema.mjs.
//
// Plain ESM with JSDoc types, no dependencies, so Astro pages and node tests import the same code.
//
// Rules this module never breaks:
//   - Only requirement objects with status "verified" can produce "met" or "not_met".
//   - Grades are never converted between scales.
//   - Results are never totalled into a score, a percentage, a verdict, "eligible" or "ineligible".
//   - Nothing here says a feature exists that does not (no uploads today: see `uploadsOpen`).

/** Fixed page wording (§8.2). Shown wherever results are shown. */
export const DISCLAIMER =
  'This compares what you told us with the requirements the university has published; it is not an admission decision.';

/** The four assessment results (§8.2). */
export const RESULTS = /** @type {const} */ (['met', 'not_met', 'unknown', 'pending_evidence']);
/** @typedef {typeof RESULTS[number]} Result */

/** @type {Readonly<Record<Result, string>>} */
export const RESULT_LABELS = Object.freeze({ met: 'Met', not_met: 'Not met', unknown: 'Unknown', pending_evidence: 'Pending evidence' });

/** Stage-1 checklist states (self-declared; nothing is uploaded at this stage). */
export const CHECKLIST_STATES = /** @type {const} */ (['available', 'outstanding', 'unknown', 'not_needed']);
/** @typedef {typeof CHECKLIST_STATES[number]} ChecklistState */

/** @type {Readonly<Record<ChecklistState, string>>} */
export const CHECKLIST_LABELS = Object.freeze({ available: 'You have it', outstanding: 'Outstanding', unknown: 'Unknown', not_needed: 'Not needed' });

/** Standing sentence shown with any preparatory route (same wording as the profile pages and /admissions/). */
export const PREP_STANDING =
  "A preparatory course improves academic preparation. It does not guarantee admission, progression or a place on any degree programme; the degree's own entry requirements still apply.";

/** Candidate-declared document types (§12.1 step 3). Keys are what a candidate profile stores. */
export const DOCUMENT_TYPES = Object.freeze({
  certificate: 'Secondary-school certificate',
  transcript: 'Transcript',
  passport: 'Passport',
  photographs: 'Photographs',
  birth_certificate: 'Birth certificate',
  medical_certificate: 'Medical certificate',
  translation: 'Translation',
  legalisation: 'Legalisation or apostille',
  language_certificate: 'Language certificate',
  other: 'Other document',
});
/** @typedef {keyof typeof DOCUMENT_TYPES} DocumentType */

/**
 * @typedef {'percentage' | 'letter' | 'points' | 'GPA' | 'other'} ScaleType
 * @typedef {'achieved' | 'predicted' | 'pending'} ResultStatus
 * @typedef {'have' | 'need' | 'not_sure'} DeclaredState
 *
 * @typedef {object} CandidateSubject
 * @property {string} name
 * @property {boolean} studied                 false = the candidate told us they did not study it
 * @property {string | null} [grade]           as typed by the candidate, never converted
 * @property {ScaleType | null} [scaleType]
 * @property {number | null} [scaleMax]
 * @property {ResultStatus | null} [resultStatus]
 *
 * @typedef {object} Candidate
 * @property {boolean} [synthetic]
 * @property {string} [id]
 * @property {{ field?: string, level?: string, universities?: string[], intake?: string | null }} intent
 * @property {{ qualification?: string | null, awardingCountry?: string | null, year?: string | null, scaleType?: ScaleType | null, scaleMax?: number | null, certificateLanguage?: string | null, schoolLanguage?: string | null }} education
 * @property {CandidateSubject[]} subjects
 * @property {{ type: string, state: DeclaredState }[]} documents
 *
 * @typedef {object} Requirement   (src/content/schema.mjs `requirement`; raw JSON may omit defaults)
 * @property {string} id
 * @property {'subject' | 'grade' | 'exam' | 'language' | 'age' | 'document' | 'other'} type
 * @property {string} summary
 * @property {string} [subject]
 * @property {{ value: string, scale: string }} [minimum]
 * @property {string} [condition]
 * @property {string} [examFormat]
 * @property {string} [intakeYear]
 * @property {string} [status]
 * @property {string | null} [source]
 * @property {string | null} [checked]
 *
 * @typedef {object} DocumentRequirement   (src/content/schema.mjs `documentRequirement`)
 * @property {string} id
 * @property {string} name
 * @property {string} [condition]
 * @property {string} [formatNote]
 * @property {string} [intakeYear]
 * @property {string} [status]
 * @property {string | null} [source]
 * @property {string | null} [checked]
 *
 * @typedef {object} Assessment
 * @property {string} requirementId
 * @property {Requirement['type']} type
 * @property {string} summary
 * @property {Result} result
 * @property {string} wording                 candidate-facing sentence
 * @property {string | null} source           only when the requirement is verified
 * @property {string | null} checked          only when the requirement is verified
 * @property {boolean} verified
 * @property {string} reason                  machine-readable reason code (see REASONS)
 * @property {string | null} subject
 * @property {string} candidateData            "what you told us"
 * @property {string | null} intakeYear
 * @property {boolean} intakeMismatch
 *
 * @typedef {object} ChecklistItem
 * @property {string} documentId
 * @property {string} name
 * @property {string | null} condition
 * @property {string | null} formatNote
 * @property {ChecklistState} state
 * @property {string} wording
 * @property {boolean} verified
 * @property {string} declared                "what you told us"
 * @property {'applies' | 'does_not_apply' | 'unsettled' | null} conditionStatus
 * @property {string | null} source
 * @property {string | null} checked
 * @property {boolean} intakeMismatch
 *
 * @typedef {{ uploadsOpen?: boolean }} Options   uploadsOpen=true gives the Stage-2 wording of §12.2 (uploads exist then)
 */

/** Reason codes an assessment can carry. */
export const REASONS = Object.freeze([
  'met', 'not_studied', 'below_minimum', 'unverified', 'not_published', 'outdated', 'intake_mismatch', 'no_data',
  'no_result_status', 'result_pending', 'no_verified_minimum', 'scale_unknown', 'scale_not_comparable',
  'grade_unreadable', 'evidence_needed', 'exam_result_needed', 'not_checkable', 'requirement_unreadable',
]);

const NOUNS = Object.freeze({
  subject: 'subject requirement', grade: 'minimum grade', exam: 'entrance examination requirement',
  language: 'language requirement', age: 'age requirement', document: 'document requirement', other: 'requirement',
});

/** Fixed wording for a requirement we have not verified (§12.2 row 3 for type=grade). @param {string} type */
export const unverifiedWording = (type) =>
  `The university's ${/** @type {Record<string, string>} */ (NOUNS)[type] ?? 'requirement'} has not yet been verified by us; we will confirm it from the official page.`;

// ------------------------------------------------------------------------------------------- helpers

/** @param {unknown} s */
const norm = (s) => String(s ?? '').trim().toLowerCase().replace(/\s+language$/, '');

/** First four-digit year of an intake string ("2026/27", "2026-2027", "2026") or null ("not sure", empty). @param {unknown} v */
export function intakeStartYear(v) {
  const m = String(v ?? '').match(/\b(\d{4})\b/);
  return m ? m[1] : null;
}

/** @param {Candidate} c @param {string | undefined} name */
const findSubject = (c, name) => (name ? (c.subjects ?? []).find((s) => norm(s.name) === norm(name)) : undefined);

/** @param {Candidate} c @param {string} type @returns {DeclaredState | null} */
const declaredState = (c, type) => (c.documents ?? []).find((d) => d.type === type)?.state ?? null;

/** @param {CandidateSubject} s @param {Candidate} c */
const scaleOf = (s, c) => ({ type: s.scaleType ?? c.education?.scaleType ?? null, max: s.scaleMax ?? c.education?.scaleMax ?? null });

const SCALE_WORDS = Object.freeze({ percentage: 'percentage', letter: 'letter', points: 'points', GPA: 'GPA', other: 'other' });

/** @param {{ type: string | null, max: number | null }} sc */
const scaleText = (sc) => (sc.type ? `${/** @type {Record<string, string>} */ (SCALE_WORDS)[sc.type] ?? sc.type} scale${sc.max != null && sc.type !== 'percentage' ? ` out of ${sc.max}` : ''}` : 'a scale you have not told us');

/**
 * Reads a requirement's free-text scale ("percent", "letter", "points out of 12", "GPA/4") into a type and maximum.
 * Unrecognised text becomes type "other", which is never comparable.
 * @param {string} scale
 * @returns {{ type: ScaleType, max: number | null }}
 */
export function parseScale(scale) {
  const s = String(scale ?? '').toLowerCase();
  /** @type {ScaleType} */
  let type = 'other';
  if (/percent|%/.test(s)) type = 'percentage';
  else if (/letter/.test(s)) type = 'letter';
  else if (/gpa/.test(s)) type = 'GPA';
  else if (/point/.test(s)) type = 'points';
  if (type === 'percentage') return { type, max: 100 };
  const m = s.match(/(?:out of|of|max(?:imum)?|\/)\s*(\d+(?:\.\d+)?)/) ?? s.match(/(\d+(?:\.\d+)?)\s*-?\s*point/);
  return { type, max: m ? Number(m[1]) : null };
}

const LETTERS = ['F', 'E', 'D', 'C', 'B', 'A'];
/** Rank within one letter scale (A* > A+ > A > A- > B+ ...). Null when the value is not a plain letter grade. @param {string} g */
export function letterRank(g) {
  const m = String(g ?? '').trim().toUpperCase().match(/^([A-F])(\*|\+|-)?$/);
  if (!m) return null;
  const base = LETTERS.indexOf(m[1]) * 3;
  if (m[2] === '*') return m[1] === 'A' ? base + 2 : null;
  return base + (m[2] === '+' ? 1 : m[2] === '-' ? -1 : 0);
}

/** @param {string} g */
const numberOf = (g) => {
  const t = String(g ?? '').trim().replace(/%$/, '').replace(',', '.');
  return /^\d+(?:\.\d+)?$/.test(t) ? Number(t) : null;
};

/** The language a language requirement names, if it names one we offer. @param {string} text */
const languageNamed = (text) => String(text ?? '').match(/\b(English|Ukrainian)\b/)?.[1] ?? null;

/** "What you told us" for one requirement. @param {Candidate} c @param {Requirement} r */
function candidateDataFor(c, r) {
  if (r.type === 'subject' || r.type === 'grade') {
    const s = findSubject(c, r.subject);
    if (!s) return 'Not told us yet';
    if (s.studied === false) return 'Not studied';
    const sc = scaleOf(s, c);
    const parts = [s.grade ? `${s.grade}` : 'Studied, no grade given'];
    if (s.grade && sc.type) parts.push(`(${scaleText(sc)})`);
    if (s.resultStatus && s.resultStatus !== 'achieved') parts.push(`, ${s.resultStatus}`);
    return parts.join(' ').replace(' ,', ',');
  }
  if (r.type === 'language') {
    const lang = languageNamed(r.summary);
    const bits = [];
    const s = lang ? findSubject(c, lang) : undefined;
    if (s) bits.push(s.studied === false ? `${s.name}: not studied` : `${s.name}: ${s.grade ?? 'studied'}`);
    const cert = declaredState(c, 'language_certificate');
    if (cert) bits.push(`language certificate: ${cert.replace('_', ' ')}`);
    if (c.education?.schoolLanguage) bits.push(`school taught in ${c.education.schoolLanguage}`);
    return bits.length ? bits.join('; ') : 'Not told us yet';
  }
  if (r.type === 'exam') return 'No result yet';
  if (r.type === 'age') return 'Not asked at this stage';
  if (r.type === 'document') return 'See the document checklist';
  return 'Nothing to compare yet';
}

// ------------------------------------------------------------------------------------------- assessment

/**
 * Compare a candidate's self-declared record with one programme's requirement objects, in requirement order.
 * @param {Candidate} candidate
 * @param {{ requirements?: Requirement[] }} programme
 * @param {Options} [options]
 * @returns {Assessment[]}
 */
export function assessReadiness(candidate, programme, options = {}) {
  return (programme?.requirements ?? []).map((r) => assessRequirement(candidate, r, options));
}

/**
 * @param {Candidate} c
 * @param {Requirement} r
 * @param {Options} [options]
 * @returns {Assessment}
 */
export function assessRequirement(c, r, options = {}) {
  const status = r.status ?? 'unverified';
  const verified = status === 'verified';
  const base = {
    requirementId: r.id,
    type: r.type,
    summary: r.summary,
    subject: r.subject ?? null,
    verified,
    source: verified ? r.source ?? null : null,
    checked: verified ? r.checked ?? null : null,
    candidateData: candidateDataFor(c, r),
    intakeYear: r.intakeYear ?? null,
    intakeMismatch: false,
  };
  /** @param {Result} result @param {string} reason @param {string} wording @returns {Assessment} */
  const out = (result, reason, wording) => ({ ...base, result, reason, wording });

  // 1. Only verified requirement objects can be compared at all.
  if (!verified) {
    if (status === 'outdated') return out('unknown', 'outdated', 'This requirement was published for an earlier intake. We will confirm the current one from the official page.');
    return out('unknown', status === 'not-published' ? 'not_published' : 'unverified', unverifiedWording(r.type));
  }

  // 2. Requirements are intake-specific: a requirement for another intake is flagged and not compared.
  const want = intakeStartYear(c.intent?.intake), has = intakeStartYear(r.intakeYear);
  if (want && has && want !== has) {
    return { ...out('unknown', 'intake_mismatch', `This requirement is published for the ${r.intakeYear} intake, but you plan to start in ${c.intent.intake}. We will confirm the requirement for your intake from the official page.`), intakeMismatch: true };
  }

  const name = r.subject ?? '';
  switch (r.type) {
    case 'subject': {
      if (!name) return out('unknown', 'requirement_unreadable', 'We could not read which subject this requirement names. We will check it on the official page.');
      const s = findSubject(c, name);
      if (!s) return out('unknown', 'no_data', `${name}: you have not told us about this subject yet.`);
      if (s.studied === false) return out('not_met', 'not_studied', `${name}: not studied, as you told us. The university lists it as a requirement.`);
      const grade = s.grade ? ` (grade ${s.grade} as you entered it)` : ' (as you told us)';
      if (s.resultStatus === 'achieved') return out('met', 'met', `${name}: studied${grade}`);
      if (s.resultStatus === 'predicted' || s.resultStatus === 'pending')
        return out('pending_evidence', 'result_pending', `${name}: studied, result ${s.resultStatus === 'predicted' ? 'predicted' : 'not out yet'}${grade}. We will update this when your final result is out.`);
      return out('unknown', 'no_result_status', `${name}: studied, but you have not told us whether your result is final.`);
    }

    case 'grade': {
      if (!r.minimum) return out('unknown', 'no_verified_minimum', `${name || 'This subject'}: there is no verified minimum grade, so there is nothing to compare yet.`);
      const label = name || 'Grade';
      const min = `${r.minimum.value} (${r.minimum.scale})`;
      const s = findSubject(c, name);
      if (!s) return out('unknown', 'no_data', `${label}: you have not told us your grade yet.`);
      if (s.studied === false) return out('not_met', 'not_studied', `${label}: not studied, as you told us. The university states a minimum grade of ${min} in it.`);
      if (!s.grade) return out('unknown', 'no_data', `${label}: you have not told us your grade yet.`);
      const cand = scaleOf(s, c), req = parseScale(r.minimum.scale);
      if (!cand.type) return out('unknown', 'scale_unknown', `${label}: tell us the grading scale of your grade ${s.grade}. We never convert grades between scales.`);
      const maxNeeded = req.type === 'points' || req.type === 'GPA';
      const sameMax = req.type === 'percentage' ? cand.max == null || cand.max === 100 : !maxNeeded || (req.max != null && cand.max != null && req.max === cand.max);
      if (req.type === 'other' || cand.type === 'other' || cand.type !== req.type || !sameMax)
        return out('unknown', 'scale_not_comparable', `${label}: your grade ${s.grade} is on a ${scaleText(cand)}; the university's minimum is ${min}. These scales are not comparable and we never convert between them.`);
      if (s.resultStatus === 'predicted' || s.resultStatus === 'pending')
        return out('pending_evidence', 'result_pending', `${label}: your result is ${s.resultStatus === 'predicted' ? 'predicted' : 'not out yet'}. We will compare it with the minimum of ${min} when the final result is out.`);
      if (s.resultStatus !== 'achieved') return out('unknown', 'no_result_status', `${label}: tell us whether your grade ${s.grade} is a final result.`);
      let at = null, need = null;
      if (req.type === 'letter') { at = letterRank(s.grade); need = letterRank(r.minimum.value); }
      else { at = numberOf(s.grade); need = numberOf(r.minimum.value); }
      if (at == null || need == null) return out('unknown', 'grade_unreadable', `${label}: we could not read the grade ${s.grade} as a value on this scale. We will check it with you.`);
      return at >= need
        ? out('met', 'met', `${label}: grade ${s.grade} as you entered it, against the university's minimum of ${min}.`)
        : out('not_met', 'below_minimum', `${label}: grade ${s.grade} as you entered it is below the university's minimum of ${min}.`);
    }

    case 'language': {
      const lang = languageNamed(r.summary);
      const what = lang ? `${lang} certificate` : 'language certificate';
      return out('pending_evidence', 'evidence_needed', options.uploadsOpen
        ? `Upload your ${what} or school letter when you have it.`
        : `When you have your ${what} or a letter from your school, keep it ready. We will ask for it later; please do not send it now.`);
    }

    case 'exam':
      return out('pending_evidence', 'exam_result_needed', r.examFormat
        ? `The university states an entrance examination in this format: “${r.examFormat}”. The result can only be known after you sit it.`
        : 'The university states an entrance examination. The result can only be known after you sit it.');

    case 'age':
      return out('unknown', 'not_checkable', 'We do not ask for your date of birth at this stage, so we cannot check this yet.');

    case 'document':
      return out('pending_evidence', 'evidence_needed', 'This is a document requirement. See the document checklist.');

    default:
      return out('unknown', 'not_checkable', 'We cannot check this from what you told us yet. We will look at it with you.');
  }
}

// ------------------------------------------------------------------------------------------- documents

/** Exclusive matchers, first match wins (a "translation of the certificate" is a translation, not a certificate). */
const DOC_MATCHERS = /** @type {[DocumentType, RegExp][]} */ ([
  ['translation', /translat/i],
  ['legalisation', /legali[sz]|apostil/i],
  ['medical_certificate', /medical/i],
  ['birth_certificate', /birth/i],
  ['language_certificate', /language (?:certificate|test)|ielts|toefl|english (?:certificate|test)/i],
  ['photographs', /photo/i],
  ['passport', /passport/i],
]);

/**
 * Which candidate-declared document types a university document object corresponds to.
 * A combined object ("certificate with transcript") maps to both parts.
 * @param {DocumentRequirement} doc
 * @returns {DocumentType[]}
 */
export function documentTypesFor(doc) {
  const text = `${doc.id ?? ''} ${doc.name ?? ''}`;
  for (const [type, re] of DOC_MATCHERS) if (re.test(text)) return [type];
  /** @type {DocumentType[]} */
  const types = [];
  if (/certificate|diploma|school-leaving/i.test(text)) types.push('certificate');
  if (/transcript|grades/i.test(text)) types.push('transcript');
  return types;
}

/**
 * Evaluate a document condition against the candidate's data. Only conditions the data can settle are resolved;
 * today that is the language of the certificate ("not in Ukrainian or English"). Anything else stays unsettled.
 * @param {string} condition
 * @param {Candidate} c
 * @returns {{ status: 'applies' | 'does_not_apply' | 'unsettled', kind: 'language' | 'unrecognised', languages: string[] }}
 */
export function evaluateCondition(condition, c) {
  const m = String(condition ?? '').match(/not (?:issued |written )?in ([A-Z][a-z]+(?:(?:,\s*|\s+or\s+|\s*\/\s*)[A-Z][a-z]+)*)/);
  if (!m) return { status: 'unsettled', kind: 'unrecognised', languages: [] };
  const languages = m[1].split(/,\s*|\s+or\s+|\s*\/\s*/);
  const lang = c.education?.certificateLanguage;
  if (!lang) return { status: 'unsettled', kind: 'language', languages };
  return { status: languages.some((l) => norm(l) === norm(lang)) ? 'does_not_apply' : 'applies', kind: 'language', languages };
}

/** What a candidate should do next for an outstanding part (only where the advice is universal). */
const NEXT_STEP = Object.freeze({ transcript: 'request it from your school', certificate: 'request it from your school' });

/**
 * Programme-specific document checklist from the programme's document objects (§8.3, §12.2, §13).
 * Stage 1: nothing is uploaded; "available" means the candidate told us they have it.
 * @param {Candidate} candidate
 * @param {{ documents?: DocumentRequirement[] }} programme
 * @param {Options} [options]
 * @returns {ChecklistItem[]}
 */
export function documentChecklist(candidate, programme, options = {}) {
  return (programme?.documents ?? []).map((doc) => checklistItem(candidate, doc, options));
}

/**
 * @param {Candidate} c
 * @param {DocumentRequirement} doc
 * @param {Options} [options]
 * @returns {ChecklistItem}
 */
function checklistItem(c, doc, options = {}) {
  const verified = (doc.status ?? 'unverified') === 'verified';
  const types = documentTypesFor(doc);
  const parts = types.map((t) => ({ type: t, label: DOCUMENT_TYPES[t], state: declaredState(c, t) }));
  const declared = parts.length
    ? parts.map((p) => `${p.label}: ${p.state ? p.state.replace('_', ' ') : 'not told us'}`).join('; ')
    : 'Not told us';
  const want = intakeStartYear(c.intent?.intake), has = intakeStartYear(doc.intakeYear);
  const base = {
    documentId: doc.id,
    name: doc.name,
    condition: doc.condition ?? null,
    formatNote: doc.formatNote ?? null,
    verified,
    declared,
    source: verified ? doc.source ?? null : null,
    checked: verified ? doc.checked ?? null : null,
    intakeMismatch: !!(want && has && want !== has),
    /** @type {ChecklistItem['conditionStatus']} */
    conditionStatus: null,
  };
  /** @param {ChecklistState} state @param {string} wording @returns {ChecklistItem} */
  const out = (state, wording) => ({ ...base, state, wording });

  if (!verified) return out('unknown', 'Not yet verified by us. We will confirm from the official page whether the university asks for this.');
  if (base.intakeMismatch) return out('unknown', `This document list is published for the ${doc.intakeYear} intake, but you plan to start in ${c.intent.intake}. We will confirm the list for your intake.`);

  let lead = '';
  if (doc.condition) {
    const cond = evaluateCondition(doc.condition, c);
    base.conditionStatus = cond.status;
    if (cond.status === 'unsettled') {
      return out('unknown', cond.kind === 'language'
        ? `Needed only if your documents are not in ${cond.languages.join(' or ')} — tell us the language.`
        : `Needed only in this case: “${doc.condition}”. We will check with you whether it applies.`);
    }
    if (cond.status === 'does_not_apply') return out('not_needed', `Not needed: you told us your certificate is in ${c.education.certificateLanguage}.`);
    lead = `Needed because your certificate is in ${c.education.certificateLanguage}. `;
  }

  if (!parts.length) return out('unknown', `${lead}${doc.name}: tell us whether you have this document.`);
  const needed = parts.filter((p) => p.state === 'need');
  if (needed.length) {
    return out('outstanding', lead + needed.map((p) => {
      const step = /** @type {Record<string, string>} */ (NEXT_STEP)[p.type];
      return `${p.label}: outstanding${step ? ` — ${step}` : ''}.`;
    }).join(' '));
  }
  const unsure = parts.filter((p) => p.state === 'not_sure');
  if (unsure.length) return out('unknown', lead + unsure.map((p) => `${p.label}: you are not sure whether you have this. Tell us when you know.`).join(' '));
  const missing = parts.filter((p) => !p.state);
  if (missing.length) return out('unknown', lead + missing.map((p) => `${p.label}: you have not told us about this document yet.`).join(' '));
  const label = parts.map((p) => p.label).join(' and ');
  return out('available', lead + (options.uploadsOpen
    ? `${label}: you have this. Upload a scan when you are ready.`
    : `${label}: you have this. Uploads are not open yet, so please keep it for now.`));
}

// ------------------------------------------------------------------------------------------- preparatory route

/** Claims that must be verified before a route can be suggested at all. */
export const REQUIRED_PREP_CLAIMS = Object.freeze(['progressionText', 'languageOfInstruction']);
/** Claims shown with a suggested route, each only when verified. */
const PREP_FACTS = /** @type {[string, string][]} */ ([
  ['languageOfInstruction', 'Language of instruction'],
  ['englishTrack', 'English-language track'],
  ['durationText', 'Duration'],
  ['subjects', 'Subjects'],
  ['certificateName', 'Certificate awarded'],
  ['appliesToEnglishDegreeTrack', 'Open to English-degree applicants'],
]);

/** @param {any} claim */
const claimVerified = (claim) =>
  !!claim && claim.status === 'verified' && claim.value !== null && claim.value !== undefined && !(Array.isArray(claim.value) && claim.value.length === 0) && !!claim.source;

/** @param {unknown} v */
const claimText = (v) => (Array.isArray(v) ? v.join(', ') : typeof v === 'boolean' ? (v ? 'Yes' : 'No') : String(v));

/**
 * A preparatory route to show beneath the results: only when some result is "not_met" AND the university has a route
 * whose required claims are verified. Returns the route's own verbatim progression wording with its source, and the
 * standing sentence. Otherwise null (nothing is suggested).
 * @param {Assessment[]} results
 * @param {{ preparatoryRoutes?: any[] }} record
 */
export function preparatorySuggestion(results, record) {
  const notMet = (results ?? []).filter((r) => r.result === 'not_met');
  if (!notMet.length) return null;
  const route = (record?.preparatoryRoutes ?? []).find((rt) => REQUIRED_PREP_CLAIMS.every((k) => claimVerified(rt[k])));
  if (!route) return null;
  return {
    routeId: /** @type {string} */ (route.id),
    name: /** @type {string} */ (route.name),
    progressionText: /** @type {string} */ (route.progressionText.value),
    source: /** @type {string} */ (route.progressionText.source),
    checked: /** @type {string | null} */ (route.progressionText.checked ?? null),
    facts: PREP_FACTS.filter(([k]) => claimVerified(route[k])).map(([k, label]) => ({
      key: k, label, value: claimText(route[k].value), source: /** @type {string} */ (route[k].source), checked: /** @type {string | null} */ (route[k].checked ?? null),
    })),
    standing: PREP_STANDING,
    triggeredBy: notMet.map((r) => r.requirementId),
  };
}

// ------------------------------------------------------------------------------------------- Stage-2 state machine (§8.3, §12.3)

/** Document-item states for Stage 2 (accounts and uploads). Not in use until the §11 gates are signed off. */
export const STATES = /** @type {const} */ (['not_requested', 'required', 'outstanding', 'uploaded', 'under_review', 'accepted_for_processing', 'replacement_requested']);
/** @typedef {typeof STATES[number]} DocState */

/** @type {Readonly<Record<DocState, string>>} */
export const STATE_LABELS = Object.freeze({
  not_requested: 'Not requested',
  required: 'Required',
  outstanding: 'Outstanding',
  uploaded: 'Uploaded',
  under_review: 'Under review',
  accepted_for_processing: 'Accepted for processing',
  replacement_requested: 'Replacement or clarification requested',
});

/** Fixed label shown beside "accepted for processing" (§12.3). */
export const ACCEPTED_LABEL = 'Accepted for our review. This is not confirmation of authenticity or acceptance by the university.';

/** What the candidate sees beside each state (§12.3). */
/** @type {Readonly<Record<DocState, string>>} */
export const STATE_NOTES = Object.freeze({
  not_requested: 'No longer needed for your current choice. The reason is noted.',
  required: 'Needed for the programme you chose.',
  outstanding: 'We are waiting for this document.',
  uploaded: 'Received, not yet reviewed.',
  under_review: 'A reviewer is checking it.',
  accepted_for_processing: ACCEPTED_LABEL,
  replacement_requested: 'We have told you the reason. The item is outstanding again until a new copy arrives.',
});

/** Templated reasons for "replacement or clarification requested" (§12.3). */
export const REPLACEMENT_REASONS = Object.freeze(['illegible', 'wrong document', 'expired', 'missing pages', 'translation needed']);

/** Allowed forward transitions; "any state → not_requested" is added below. @type {Record<DocState, DocState[]>} */
const FORWARD = {
  not_requested: ['required'],
  required: ['outstanding'],
  outstanding: ['uploaded'],
  uploaded: ['under_review'],
  under_review: ['accepted_for_processing', 'replacement_requested'],
  accepted_for_processing: [],
  replacement_requested: ['outstanding'],
};

/** @type {Readonly<Record<DocState, readonly DocState[]>>} */
export const TRANSITIONS = Object.freeze(Object.fromEntries(
  STATES.map((s) => [s, Object.freeze(s === 'not_requested' ? [...FORWARD[s]] : [...FORWARD[s], 'not_requested'])]),
));

/** @param {string} from @param {string} to */
export function canTransition(from, to) {
  if (from === to) return false;
  const next = /** @type {Record<string, readonly string[]>} */ (TRANSITIONS)[from];
  return !!next && next.includes(to);
}
