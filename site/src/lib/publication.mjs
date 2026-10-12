// PUBLICATION POLICY (fail-closed). The single source of the rules that decide what a public page may say about a
// university. Plain ESM with JSDoc so the build (astro.config.mjs, src/lib/records.ts, the components) and the node tests
// (tests/publication-policy.mjs, tests/publication-build.mjs, tests/records-evidence.mjs) run exactly the same code.
//
// The rules, in plain words (UNIVERSITY_DATA_REGISTER.md, "Publication policy (fail-closed)"):
//   1. Every key of every record shape is classified in FIELD_POLICY as 'public' (may appear once its evidence passes),
//      'editorial-public' (our own non-claim text, still escaped by the page) or 'internal' (never appears). A key without
//      a classification fails the tests and the build; an unclassified or internal key is never copied to a page.
//   2. A claim is SHOWN only when the record marks it verified with a non-empty value, an https source and a check date,
//      AND the evidence store (src/lib/evidence.mjs) holds a matching entry: verified, decision "publish", quoted, dated,
//      exactly the same value, the same source address and an allowed source tier (recognition: tier 4 only and never on
//      the university's own website; everything else: tiers 1-3), on an address that fits the tier (tiers 1-2: the
//      official website, once it is shown; tier 3: .gov.ua; tier 4: a listed recognition authority host; never a search
//      result, cache, archive, Wikipedia, WDOMS, social page, blog or link shortener). Any
//      conflicting entry, declared contradiction or verified entry with another value withholds the claim. An entry past
//      its next-review date, or naming an academic year that has ended, no longer counts; time-sensitive claims must have
//      a next-review date; fees need an academic year that has not ended (and the evidence must name it); a deadline that
//      has passed is never shown; a value carrying research-note wording is never shown. A preparatory start date written
//      YYYY-MM-DD that has passed, and a free-text intake or start date naming a year before the current academic year,
//      are never shown.
//      Owner settings (src/lib/publication-config.mjs, backlog N24): recognition is shown only from a tier-4 page on a
//      listed recognition authority host (the list is empty by default, so none is shown); the official website is shown
//      only when a verified tier-3 government entry carries exactly the same website, and until it is shown the
//      university's own pages (tiers 1-2) support nothing.
//      Anything else is withheld: no value, no note, no source. Pages print "To be confirmed".
//   3. toPublicRecord() builds a NEW object holding only public and editorial-public keys, every claim replaced by its
//      evaluated form. Programmes are listed only when their id is safe and unique, their international admission, level,
//      language, duration and intake year are shown, their fee page has been read and (owner setting) their name appears
//      in the quotation that verifies their international admission; requirement, document and cost items only when
//      shown (items or routes sharing an id are withheld, because their evidence cannot be told apart). Our own text:
//      the overview only with an editorial review whose hash matches the current text; city and region only when the
//      verified address contains them (owner settings; otherwise the city reads "To be confirmed" and the region is left out).
//   4. evaluatePublication() decides whether a record may have a public page at all. verification.publishable can only
//      NARROW that decision: a record is published only when the flag is true AND the policy passes. A production build
//      with a flagged record that fails the policy stops with an error naming the record and each failure.
import { createHash } from 'node:crypto';
import { parseEvidence, isIsoDate, isHttpsUrl } from './evidence.mjs';
import { PUBLICATION_SETTINGS, REVIEW_MAX_AGE_DAYS } from './publication-config.mjs';

/** @typedef {typeof PUBLICATION_SETTINGS} PublicationSettings */
/**
 * The default settings, optionally with some replaced (the unit tests prove each setting this way; the build never
 * passes settings). @param {Partial<PublicationSettings> | undefined} s @returns {PublicationSettings}
 */
const resolveSettings = (s) => (s && s !== PUBLICATION_SETTINGS ? Object.freeze({ ...PUBLICATION_SETTINGS, ...s }) : PUBLICATION_SETTINGS);

/** @typedef {'public' | 'editorial-public' | 'internal'} PolicyClass */
/** @typedef {'verified' | 'to-be-confirmed' | 'under-review' | 'withheld-conflict'} PublicState */
/** @typedef {{ show: boolean, value: any, source: string | null, checked: string | null, publicState: PublicState, reason: string }} PublicClaim */
/** @typedef {PublicClaim & { code: string }} EvaluatedClaim */

// ------------------------------------------------------------------------------------------------ field policy

/**
 * EVERY key of the record schema (src/content/schema.mjs) and of every object nested in it. tests/publication-policy.mjs
 * walks the Zod shapes and fails on a key that is missing here (and on an entry here that the schema no longer has);
 * getPublicUniversities() refuses to build in that case too. Everything inside an 'internal' key is internal.
 * @type {Readonly<Record<string, Readonly<Record<string, PolicyClass>>>>}
 */
export const FIELD_POLICY = Object.freeze({
  record: Object.freeze({
    slug: 'editorial-public', synthetic: 'internal', officialName: 'public', shortName: 'editorial-public', alternativeNames: 'internal',
    status: 'public', statusStatement: 'public', teachingFormat: 'public', city: 'editorial-public', region: 'editorial-public',
    address: 'public', website: 'public', internationalOffice: 'public', founded: 'public', overview: 'editorial-public',
    accreditation: 'public', recognition: 'public', accommodation: 'public', programmes: 'public', deferredProgrammes: 'internal',
    preparatoryRoutes: 'public', researchReferences: 'internal', faqs: 'internal', images: 'internal', verification: 'editorial-public',
  }),
  // editorialReview (N24 a): internal; its only effect is whether the overview may be printed.
  verification: Object.freeze({ publishable: 'internal', lastReview: 'editorial-public', reviewer: 'internal', openQuestions: 'internal', editorialReview: 'internal' }),
  claim: Object.freeze({ value: 'public', status: 'internal', source: 'public', checked: 'public', note: 'internal' }),
  internationalOffice: Object.freeze({ email: 'public', phone: 'public', url: 'public' }),
  programme: Object.freeze({
    id: 'editorial-public', name: 'editorial-public', field: 'editorial-public', level: 'public', specialtyCode: 'public', qualification: 'public',
    durationYears: 'public', durationText: 'public', language: 'public', format: 'public', internationalAdmission: 'public', intakeYear: 'public',
    tuition: 'public', otherMandatoryCosts: 'public', entryRequirements: 'internal', requirements: 'public', requiredDocuments: 'internal',
    documents: 'public', deadlines: 'public', intake: 'public', gradingNote: 'internal',
  }),
  otherMandatoryCost: Object.freeze({ label: 'public', cost: 'public' }),
  deadline: Object.freeze({ label: 'public', date: 'public' }),
  money: Object.freeze({ amount: 'public', currency: 'public', per: 'public', academicYear: 'public', schedule: 'public', variesByYear: 'public' }),
  requirement: Object.freeze({
    id: 'editorial-public', type: 'public', summary: 'public', subject: 'public', minimum: 'public', condition: 'public', examFormat: 'public',
    intakeYear: 'public', status: 'internal', source: 'public', checked: 'public', note: 'internal',
  }),
  requirementMinimum: Object.freeze({ value: 'public', scale: 'public' }),
  documentRequirement: Object.freeze({
    id: 'editorial-public', name: 'public', condition: 'public', formatNote: 'public', intakeYear: 'public', status: 'internal', source: 'public',
    checked: 'public', note: 'internal',
  }),
  preparatoryRoute: Object.freeze({
    id: 'editorial-public', name: 'editorial-public', languageOfInstruction: 'public', englishTrack: 'public', durationText: 'public', subjects: 'public',
    certificateName: 'public', progressionText: 'public', appliesToEnglishDegreeTrack: 'public', startDate: 'public', fee: 'public',
    eligibilityText: 'public', note: 'internal',
  }),
});

/** Which policy describes the object found at `<policy>.<key>` (after unwrapping claims, arrays, defaults). */
const NESTED = Object.freeze({
  'record.verification': 'verification', 'record.internationalOffice': 'internationalOffice', 'record.programmes': 'programme',
  'record.preparatoryRoutes': 'preparatoryRoute', 'programme.tuition': 'money', 'programme.otherMandatoryCosts': 'otherMandatoryCost',
  'otherMandatoryCost.cost': 'money', 'programme.deadlines': 'deadline', 'programme.requirements': 'requirement',
  'programme.documents': 'documentRequirement', 'requirement.minimum': 'requirementMinimum', 'preparatoryRoute.fee': 'money',
});

// Zod introspection that works with Zod 3 (node tests resolve astro's own zod 3.x) AND Zod 4 (in the Vite build
// "astro/zod" resolves to the project's root zod 4.x): v3 names types in _def.typeName, v4 in _def.type.
const WRAPPERS = new Set(['ZodDefault', 'ZodOptional', 'ZodNullable', 'ZodReadonly', 'ZodBranded', 'ZodCatch', 'default', 'optional', 'nullable', 'readonly', 'catch', 'prefault', 'nonoptional']);
/** @param {any} t */
const zodKind = (t) => t?._def?.typeName ?? t?._def?.type;
/** @param {any} t */
function unwrapZod(t) {
  for (let i = 0; i < 20 && t?._def; i++) {
    const n = zodKind(t);
    if (WRAPPERS.has(n)) t = t._def.innerType ?? t._def.type;
    else if (n === 'ZodEffects') t = t._def.schema;
    else if (n === 'ZodArray') t = t._def.type;
    else if (n === 'array') t = t._def.element;
    else if (n === 'ZodPipeline' || n === 'pipe') t = t._def.in;
    else break;
  }
  return t;
}
/** @param {any} t */
const isZodObject = (t) => zodKind(t) === 'ZodObject' || zodKind(t) === 'object';
/** @param {any} t @returns {Record<string, any>} */
const shapeOf = (t) => (typeof t.shape === 'function' ? t.shape() : t.shape ?? t._def?.shape ?? {});
const CLAIM_KEYS = ['value', 'status', 'source', 'checked'];
/** @param {any} t */
const isClaimShape = (t) => isZodObject(t) && CLAIM_KEYS.every((k) => k in shapeOf(t));

/**
 * Walk a Zod object schema (the record schema) and report every key that FIELD_POLICY does not classify, every nested
 * object without a policy, and every policy entry the schema no longer has.
 * @param {any} recordSchema @returns {{ missing: string[], stale: string[] }}
 */
export function policyCoverage(recordSchema) {
  const missing = [], seen = new Set();
  /** @param {any} shape @param {string} name */
  const walk = (shape, name) => {
    const policy = FIELD_POLICY[name];
    if (!policy) { missing.push(`${name} (no policy)`); return; }
    for (const [key, raw] of Object.entries(shape)) {
      seen.add(`${name}.${key}`);
      const cls = policy[key];
      if (!cls) { missing.push(`${name}.${key}`); continue; }
      if (cls === 'internal') continue;
      let t = unwrapZod(raw);
      if (isClaimShape(t)) {
        for (const ck of Object.keys(shapeOf(t))) { seen.add(`claim.${ck}`); if (!FIELD_POLICY.claim[ck]) missing.push(`claim.${ck} (in ${name}.${key})`); }
        t = unwrapZod(shapeOf(t).value);
      }
      if (isZodObject(t)) {
        const nested = NESTED[`${name}.${key}`];
        if (!nested) missing.push(`${name}.${key} (nested object without a policy)`);
        else walk(shapeOf(t), nested);
      }
    }
  };
  const root = unwrapZod(recordSchema);
  if (!isZodObject(root)) return { missing: ['record (not a Zod object)'], stale: [] };
  walk(shapeOf(root), 'record');
  const stale = Object.entries(FIELD_POLICY).flatMap(([n, p]) => Object.keys(p).map((k) => `${n}.${k}`)).filter((k) => !seen.has(k) && !k.startsWith('claim.'));
  for (const k of Object.keys(FIELD_POLICY.claim)) if (!seen.has(`claim.${k}`)) stale.push(`claim.${k}`);
  return { missing, stale };
}

/** Throw when the schema has a key the policy does not classify (called by the build). @param {any} recordSchema */
export function assertPolicyCoverage(recordSchema) {
  const { missing, stale } = policyCoverage(recordSchema);
  if (missing.length || stale.length) throw new Error(`Publication policy (src/lib/publication.mjs FIELD_POLICY) is out of step with src/content/schema.mjs.${missing.length ? ` Unclassified: ${missing.join(', ')}.` : ''}${stale.length ? ` No longer in the schema: ${stale.join(', ')}.` : ''} Classify every field as public, editorial-public or internal before building.`);
}

// ------------------------------------------------------------------------------------------------ dates and values

/** Re-exported from publication-config.mjs (the owner setting) for existing importers. */
export { REVIEW_MAX_AGE_DAYS };
/** @param {Date} d */
export const isoDay = (d) => d.toISOString().slice(0, 10);
/** Start year of the academic year containing `now` (academic years start on 1 September). @param {Date} now */
export const currentAcademicYearStart = (now) => (now.getUTCMonth() >= 8 ? now.getUTCFullYear() : now.getUTCFullYear() - 1);
/** @param {Date} now */
export const currentAcademicYear = (now) => { const y = currentAcademicYearStart(now); return `${y}/${String((y + 1) % 100).padStart(2, '0')}`; };
/** Start year of "2026/27", or NaN. @param {unknown} s */
export const academicYearStart = (s) => (typeof s === 'string' && /^\d{4}\/\d{2}$/.test(s) && (Number(s.slice(0, 4)) + 1) % 100 === Number(s.slice(5)) ? Number(s.slice(0, 4)) : NaN);
/** @param {unknown} s @param {Date} now */
const yearHasEnded = (s, now) => { const y = academicYearStart(s); return Number.isNaN(y) || y < currentAcademicYearStart(now); };

/** True when a value says something: not null, not blank, not an empty list or object (recursively). @param {unknown} v @returns {boolean} */
export function hasValue(v) {
  if (v === null || v === undefined) return false;
  if (typeof v === 'string') return v.trim().length > 0;
  if (typeof v === 'number') return Number.isFinite(v);
  if (typeof v === 'boolean') return true;
  if (Array.isArray(v)) return v.some(hasValue);
  if (typeof v === 'object') return Object.values(v).some(hasValue);
  return false;
}

/** Structural equality of JSON values; a key holding undefined counts as absent. @param {unknown} a @param {unknown} b @returns {boolean} */
export function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b || a === null || b === null || typeof a !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) return a.length === /** @type {any[]} */ (b).length && a.every((x, i) => deepEqual(x, /** @type {any[]} */ (b)[i]));
  const ka = Object.keys(a).filter((k) => /** @type {any} */ (a)[k] !== undefined).sort();
  const kb = Object.keys(/** @type {object} */ (b)).filter((k) => /** @type {any} */ (b)[k] !== undefined).sort();
  return ka.length === kb.length && ka.every((k, i) => k === kb[i] && deepEqual(/** @type {any} */ (a)[k], /** @type {any} */ (b)[k]));
}

const isPrimitive = (/** @type {unknown} */ v) => typeof v === 'string' || typeof v === 'boolean' || (typeof v === 'number' && Number.isFinite(v));
/** Copy only the policy's public keys holding primitive values. @param {any} v @param {Readonly<Record<string, PolicyClass>>} policy */
function pickKeys(v, policy) {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return undefined;
  /** @type {Record<string, unknown>} */ const out = {};
  for (const [k, cls] of Object.entries(policy)) if (cls === 'public' && isPrimitive(v[k])) out[k] = v[k];
  return out;
}

// ------------------------------------------------------------------------------------------------ our own text (N24 a)

/**
 * SHA-256 (lower-case hex) of a piece of our own text exactly as stored (UTF-8, no trimming or other change). An editorial
 * review records this for the overview; any later edit changes it. `node scripts/publication-report.mjs --overview-hash
 * <slug>` prints it for a record. @param {unknown} text
 */
export const editorialTextHash = (text) => createHash('sha256').update(typeof text === 'string' ? text : '', 'utf8').digest('hex');

/** Unicode NFC, lower case, every run of white space one space, trimmed. @param {string} s */
const normaliseText = (s) => s.normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
const WORD_CHAR = /[\p{L}\p{N}\p{M}]/u;
/** A hyphen or apostrophe between two word characters joins them into one word ("Ivano-Frankivsk", "Kam'ianets"). */
const JOINER = /[-‐‑'’ʼ]/u;
/** @param {string | undefined} c */
const isWordChar = (c) => typeof c === 'string' && c.length > 0 && WORD_CHAR.test(c);
/** @param {string | undefined} c */
const isJoiner = (c) => typeof c === 'string' && c.length > 0 && JOINER.test(c);
/**
 * True when `phrase` occurs in `text` as whole words, ignoring letter case and repeated white space: the match is not
 * joined to a letter or digit on either side, directly or through a hyphen or apostrophe ("Lviv" is not found in
 * "Lvivska Street", "Ivano" or "Frankivsk" not in "Ivano-Frankivsk", "Medicine" not in "Pre-Medicine"; a quotation
 * mark, or a dash with a space beside it, still separates words). An empty phrase is never found.
 * @param {unknown} text @param {unknown} phrase
 */
export function containsPhrase(text, phrase) {
  if (typeof text !== 'string' || typeof phrase !== 'string') return false;
  const t = normaliseText(text), p = normaliseText(phrase);
  if (!p) return false;
  for (let i = t.indexOf(p); i !== -1; i = t.indexOf(p, i + 1)) {
    const j = i + p.length;
    const joinedBefore = isWordChar(t[i - 1]) || (isJoiner(t[i - 1]) && isWordChar(t[i - 2]));
    const joinedAfter = isWordChar(t[j]) || (isJoiner(t[j]) && isWordChar(t[j + 1]));
    if (!joinedBefore && !joinedAfter) return true;
  }
  return false;
}

/**
 * The editorial review of the overview counts only when it names a reviewer, is dated (a real date, not after today)
 * and records the SHA-256 of the overview text exactly as it is now. @param {any} record @param {string} today
 */
export function editorialReviewMatches(record, today) {
  const r = record?.verification?.editorialReview;
  return !!r && typeof r === 'object' && typeof r.reviewer === 'string' && r.reviewer.trim().length > 0
    && isIsoDate(r.date) && r.date <= today && typeof r.overviewSha256 === 'string' && typeof record?.overview === 'string'
    && r.overviewSha256 === editorialTextHash(record.overview);
}

// ------------------------------------------------------------------------------------------------ claim paths

const SAFE_ID = /^[A-Za-z0-9_-]+$/;
const MONEY_PATH = [/^programmes\.[^.]+\.tuition$/, /^programmes\.[^.]+\.otherMandatoryCosts\.\d+$/, /^preparatoryRoutes\.[^.]+\.fee$/];
const TIME_SENSITIVE_PATH = [
  /^statusStatement$/, /^teachingFormat$/, /^programmes\.[^.]+\.(tuition|deadlines|intake|intakeYear)$/, /^programmes\.[^.]+\.otherMandatoryCosts\.\d+$/,
  /^programmes\.[^.]+\.(requirements|documents)\.[^.]+$/, /^preparatoryRoutes\.[^.]+\.(fee|startDate)$/,
];
const DEADLINES_PATH = /^programmes\.[^.]+\.deadlines$/;
const INTAKE_YEAR_PATH = /^programmes\.[^.]+\.intakeYear$/;
const REQUIREMENT_PATH = /^programmes\.[^.]+\.requirements\.[^.]+$/;
const DOCUMENT_PATH = /^programmes\.[^.]+\.documents\.[^.]+$/;
const START_DATE_PATH = /^preparatoryRoutes\.[^.]+\.startDate$/;
const INTAKE_TEXT_PATH = /^programmes\.[^.]+\.intake$/;
/** Four-digit years 1900-2099 written as a number of their own (not part of a longer number). */
const YEAR_IN_TEXT = /(?<!\d)(?:19|20)\d{2}(?!\d)/g;
/** @param {string} path */ export const isTimeSensitive = (path) => TIME_SENSITIVE_PATH.some((r) => r.test(path));
/** @param {string} path */ export const isMoneyPath = (path) => MONEY_PATH.some((r) => r.test(path));
/**
 * Source tiers that may support a claim at `path` (see the evidence interface): recognition only tier 4 (the destination
 * country's recognition authority); fees and other mandatory costs (tuition, otherMandatoryCosts, preparatory fee) only tiers
 * 1-2, the university's own pages or fee schedule (UNIVERSITY_EVIDENCE_STANDARD.md §7); every other claim, accreditation
 * included, tiers 1-3. Tier 5 supports nothing.
 * @param {string} path @returns {number[]}
 */
export const allowedTiers = (path) => (path === 'recognition' ? [4] : isMoneyPath(path) ? [1, 2] : [1, 2, 3]);

/**
 * The public content of a requirement or document item: the value an evidence entry for it must carry.
 * requirement: { type, summary, subject?, minimum? { value, scale }, condition?, examFormat?, intakeYear? }
 * document:    { name, condition?, formatNote?, intakeYear? }
 * @param {'requirement' | 'documentRequirement'} kind @param {any} item
 */
export function itemValue(kind, item) {
  if (!item || typeof item !== 'object') return undefined;
  /** @type {Record<string, unknown>} */ const out = {};
  for (const [k, cls] of Object.entries(FIELD_POLICY[kind])) {
    if (cls !== 'public' || k === 'source' || k === 'checked') continue;
    if (k === 'minimum') { if (item.minimum !== undefined) out.minimum = pickKeys(item.minimum, FIELD_POLICY.requirementMinimum); }
    else if (isPrimitive(item[k])) out[k] = item[k];
  }
  return out;
}

/**
 * The part of a claim value a page may show, by claim path: money, office and deadline objects keep only their policy
 * keys; any other object-valued claim has no public form (withheld). @param {string} path @param {unknown} v
 */
export function pickValue(path, v) {
  if (v === null || v === undefined) return v;
  if (isMoneyPath(path)) return pickKeys(v, FIELD_POLICY.money);
  if (path === 'internationalOffice') return pickKeys(v, FIELD_POLICY.internationalOffice);
  if (DEADLINES_PATH.test(path)) return Array.isArray(v) ? v.map((d) => pickKeys(d, FIELD_POLICY.deadline)) : undefined;
  if (REQUIREMENT_PATH.test(path) || DOCUMENT_PATH.test(path)) return v && typeof v === 'object' && !Array.isArray(v) ? v : undefined; // already an itemValue()
  if (isPrimitive(v)) return v;
  if (Array.isArray(v) && v.every(isPrimitive)) return [...v];
  return undefined;
}

/** True when the URL's host is one of `hosts` or a subdomain of one ("www." ignored on both sides). @param {string} url @param {readonly string[]} hosts */
function onHost(url, hosts) {
  const list = (Array.isArray(hosts) ? hosts : []).filter((o) => typeof o === 'string').map((o) => o.trim().toLowerCase().replace(/^www\./, '')).filter(Boolean);
  try { const h = new URL(url).hostname.toLowerCase().replace(/^www\./, ''); return list.some((o) => h === o || h.endsWith(`.${o}`)); } catch { return false; }
}
/** @param {string} url */
const hostOf = (url) => { try { return new URL(url).hostname.toLowerCase().replace(/^www\./, ''); } catch { return null; } };

// Sources that are never evidence at any tier (owner rule: search snippets, third-party directories, archives, social
// media and blogs are research leads only). Matched on the host name, any country domain (google.co.uk, yandex.ua ...).
// Other third-party sites fail the tier host rules instead (tiers 1-2: official website; tier 3: .gov.ua; tier 4: a host
// in RECOGNITION_AUTHORITY_HOSTS, src/lib/publication-config.mjs, which is empty until the owner lists authorities).
// UNIVERSITY_DATA_REGISTER.md lists these hosts by name: keep the two in step.
const NOT_EVIDENCE_HOST = /(^|\.)(google|googleusercontent|bing|yahoo|yandex|baidu|duckduckgo|ecosia|startpage|ask|wikipedia|wikiwand|wikimedia|archive|facebook|instagram|youtube|tiktok|twitter|linkedin|reddit|quora|medium|blogspot|wordpress|telegram|whatsapp|wdoms)\.[a-z]{2,}(\.[a-z]{2})?$|(^|\.)(t\.me|x\.com|youtu\.be|wa\.me|archive\.ph|archive\.is|archive\.today|search\.brave\.com|bit\.ly|tinyurl\.com)$|\.translate\.goog$/;
/** True when a URL is on a search engine, archive, directory, social network or blog host: never evidence. @param {string} url */
export const isNotEvidenceSource = (url) => { const h = hostOf(url); return !h || NOT_EVIDENCE_HOST.test(h); };
/** An evidence method that says the claim was read from a search result rather than the page itself. */
const SNIPPET_METHOD = /snippet|search[- ](result|engine)|cached cop/i;

// Wording that belongs in an internal research note, never in a public value (owner rule: notes never reach a page).
// A shown value or one of our own editorial strings that contains it is withheld (values) or blocks publication (text).
const INTERNAL_WORDING = /search[- ]?snippet|snippet[- ]lead|\bnot (?:yet )?verified\b|\bunverified\b|\b(?:awaiting|pending) verification\b|\bdraft record\b|read the official page|before publishing|\bresearch (?:lead|note|reference)s?\b|\bto be confirmed\b|\bTBC\b|\bTODO\b|\bFIXME\b|\bplaceholder\b|lorem ipsum/i;
/** True when a value (deep) contains internal research-note wording. @param {unknown} v @returns {boolean} */
export function hasInternalWording(v) {
  if (typeof v === 'string') return INTERNAL_WORDING.test(v);
  if (Array.isArray(v)) return v.some(hasInternalWording);
  if (v && typeof v === 'object') return Object.values(v).some(hasInternalWording);
  return false;
}

// ------------------------------------------------------------------------------------------------ evaluate one claim

/** Fixed, public-safe sentences. Nothing from a record or an evidence file is ever used as a reason. */
export const PUBLIC_REASONS = Object.freeze({
  verified: 'Read on the official source on the date shown.',
  'to-be-confirmed': 'Not yet published here. We only list this once it is confirmed from an official source.',
  'under-review': 'Not shown while it is being checked against the official source.',
  'withheld-conflict': 'Official sources give different information. We will publish this once the university confirms which is correct.',
});

/** Plain-words explanation of each withholding code, for the owner's report and the build error (never for pages). */
export const CODE_WORDS = Object.freeze({
  verified: 'shown',
  missing: 'the record has no such field',
  'not-verified': 'the record does not mark it verified',
  empty: 'it has no value',
  'source-not-https': 'its source is not an https web address',
  'no-check-date': 'it has no check date',
  'check-date-future': 'its check date is in the future',
  'unsafe-url': 'its web address value is not an https address',
  'no-public-form': 'its value has no public form',
  'no-evidence': 'the evidence file has no entry for it',
  'evidence-not-publishable': 'no evidence entry for it is verified, marked "publish", quoted, dated (not in the future), on an https page and identical to the record value',
  'tier-not-allowed': 'its evidence is not from an allowed kind of source (recognition needs tier 4, the recognition authority of the destination country; everything else tier 1, 2 or 3)',
  'source-not-evidence': 'its evidence is a search result, cached or translated copy, archive copy, Wikipedia, the WDOMS directory, a social-media page, a blog or a link shortener (a research lead, never evidence), or its method says it was read from a search snippet',
  'source-not-official': "its evidence page is not on the address its tier requires (tier 1 and 2: the university's official website, as recorded in the website field and only once that website is itself shown as verified; tier 3: a Ukrainian government address ending .gov.ua)",
  'website-not-government-listed': 'no verified evidence entry on a Ukrainian government address (tier 3, ending .gov.ua: for example a Ministry or EDEBO page) carries exactly the same website; until one does, the university\'s own pages support nothing (owner setting WEBSITE_REQUIRES_GOVERNMENT_EVIDENCE in src/lib/publication-config.mjs)',
  'recognition-authority-not-listed': 'its tier 4 evidence is not on the address of a recognition authority the owner has listed (RECOGNITION_AUTHORITY_HOSTS in src/lib/publication-config.mjs is empty by default, so no recognition claim is shown)',
  'start-date-passed': 'its start date has passed',
  'start-date-unparseable': 'its start date is written like YYYY-MM-DD but is not a real date',
  'past-year-named': 'its wording names a year before the current academic year',
  'no-capture': 'its evidence is an owner capture with no capture file named',
  'evidence-year-ended': 'its evidence names an academic year that has ended',
  'internal-wording': 'its value contains wording from an internal research note (for example "search snippet", "not verified" or "to be confirmed")',
  'recognition-from-university': "its recognition evidence is on the university's own website",
  'source-mismatch': "the record's source link is not the address of its verified evidence entry",
  conflict: 'the record or an evidence entry marks it conflicting, an evidence entry lists a contradiction (contradicts) for it, or verified evidence entries disagree with each other',
  'value-mismatch': 'a verified evidence entry has a different value from the record',
  'stale-review': 'its evidence has a next-review date that has passed (or, for a time-sensitive fact, no next-review date)',
  'past-academic-year': 'the fee is for an academic year that has ended (or the year is not written like 2026/27)',
  'academic-year-not-evidenced': "the evidence entry does not name the fee's academic year",
  'past-intake': 'it refers to an intake year that has ended (or the year is not written like 2026/27)',
  'statement-not-current': 'its evidence neither names the current academic year nor is dated within it',
  'deadline-passed': 'a date in it has passed',
  'deadline-unparseable': 'a date in it is not written YYYY-MM-DD',
});

/**
 * An evidence entry that may support a claim, apart from the claim-specific rules: verified, decision "publish", quoted,
 * read on a real date that is not in the future, on an https page that is not a search result, cache, archive, directory,
 * social page or blog (and not read from a snippet), an owner capture naming its file, next review not passed and no
 * academic year that has ended. @param {any} e @param {Date} now
 */
function isUsableEntry(e, now) {
  const today = isoDay(now);
  return !!e && e.status === 'verified' && e.decision === 'publish' && typeof e.quotation === 'string' && e.quotation.trim().length > 0
    && isIsoDate(e.accessed) && e.accessed <= today && isHttpsUrl(e.sourceUrl) && !isNotEvidenceSource(e.sourceUrl)
    && !(typeof e.method === 'string' && SNIPPET_METHOD.test(e.method))
    && (e.evidenceType !== 'owner-capture' || (typeof e.captureRef === 'string' && e.captureRef.trim().length > 0))
    && (e.nextReview === null || e.nextReview === undefined || (isIsoDate(e.nextReview) && e.nextReview >= today))
    && (e.academicYear === null || e.academicYear === undefined || !yearHasEnded(e.academicYear, now));
}

/**
 * Evaluate one claim against its evidence. Shown ONLY when every rule passes; otherwise the value, source and check
 * date are withheld (null) and `reason` is a fixed public sentence. Never returns the record's note.
 * @param {string} path claim path, e.g. "programmes.medicine.tuition"
 * @param {any} claim the record claim { value, status, source, checked } (for items: the item's content as `value`)
 * @param {any[]} evidenceEntries entries of the record's (validated) evidence file
 * `officialHosts`: the university's official website host(s) (from the record's website field, once that website is
 * shown); tier 1 and 2 evidence must be on one of them. `universityHosts` (default officialHosts): every host the
 * university publishes on; recognition evidence must be on none of them. Omitted hosts fail closed: no tier 1 or 2 entry
 * counts. `settings`: the owner settings (src/lib/publication-config.mjs); the build never passes this, tests do.
 * @param {{ now?: Date, officialHosts?: string[], universityHosts?: string[], settings?: Partial<PublicationSettings> }} [opts]
 * @returns {EvaluatedClaim}
 */
export function evaluateClaim(path, claim, evidenceEntries, opts = {}) {
  return evaluateClaimDetailed(path, claim, evidenceEntries, opts).result;
}

/**
 * evaluateClaim, plus the evidence entries that support the claim when it is shown (internal: used to check that a
 * programme's name appears in the quotation that verifies its international admission). Never projected.
 * @param {string} path @param {any} claim @param {any[]} evidenceEntries
 * @param {{ now?: Date, officialHosts?: string[], universityHosts?: string[], settings?: Partial<PublicationSettings> }} [opts]
 * @returns {{ result: EvaluatedClaim, entries: any[] }}
 */
function evaluateClaimDetailed(path, claim, evidenceEntries, { now = new Date(), officialHosts = [], universityHosts = officialHosts, settings } = {}) {
  const S = resolveSettings(settings);
  const today = isoDay(now);
  /** @param {PublicState} publicState @param {string} code */
  const withheld = (publicState, code) => ({ result: /** @type {EvaluatedClaim} */ ({ show: false, value: null, source: null, checked: null, publicState, reason: PUBLIC_REASONS[publicState], code }), entries: [] });
  if (!claim || typeof claim !== 'object' || !('value' in claim)) return withheld('to-be-confirmed', 'missing');
  const value = pickValue(path, claim.value);
  const all = (Array.isArray(evidenceEntries) ? evidenceEntries : []).filter((e) => e && typeof e === 'object');
  const entries = all.filter((e) => e.claimPath === path);
  // Conflicts first, whatever the record says: a conflicting entry; an entry for this claim that lists a contradiction;
  // an entry anywhere in the file that names an entry for this claim in its `contradicts` (an `outdated` entry no longer
  // counts: that is how a resolved conflict is closed); or verified entries that disagree with each other. (For the
  // website this includes a verified government entry that lists a different website: N24 c.)
  const ids = new Set(entries.map((e) => e.id));
  const live = (/** @type {any} */ e) => e.status !== 'outdated' && Array.isArray(e.contradicts);
  const contradicted = entries.some((e) => live(e) && e.contradicts.length > 0) || all.some((e) => live(e) && e.contradicts.some((/** @type {string} */ id) => ids.has(id)));
  const verifiedValues = entries.filter((e) => e.status === 'verified').map((e) => e.value);
  if (claim.status === 'conflicting' || entries.some((e) => e.status === 'conflicting') || contradicted || verifiedValues.some((v) => !deepEqual(v, verifiedValues[0]))) return withheld('withheld-conflict', 'conflict');
  if (claim.status !== 'verified') return withheld(claim.status === 'outdated' || claim.status === 'partially-verified' ? 'under-review' : 'to-be-confirmed', 'not-verified');
  // The evidence value must be deep-equal to the record value exactly as recorded (no extra or missing keys).
  if (verifiedValues.some((v) => !deepEqual(v, claim.value))) return withheld('withheld-conflict', 'value-mismatch');
  if (value === undefined && hasValue(claim.value)) return withheld('under-review', 'no-public-form');
  if (!hasValue(value)) return withheld('to-be-confirmed', 'empty');
  if (hasInternalWording(value)) return withheld('under-review', 'internal-wording');
  if (!isHttpsUrl(claim.source)) return withheld('under-review', 'source-not-https');
  if (!isIsoDate(claim.checked)) return withheld('under-review', 'no-check-date');
  if (claim.checked > today) return withheld('under-review', 'check-date-future');
  if ((path === 'website' && !isHttpsUrl(value)) || (path === 'internationalOffice' && value.url !== undefined && !isHttpsUrl(value.url))) return withheld('under-review', 'unsafe-url');
  if (entries.length === 0) return withheld('to-be-confirmed', 'no-evidence');
  let ok = entries.filter((e) => e.status === 'verified' && e.decision === 'publish' && typeof e.quotation === 'string' && e.quotation.trim() && isIsoDate(e.accessed) && e.accessed <= today && isHttpsUrl(e.sourceUrl) && deepEqual(e.value, claim.value));
  if (!ok.length) return withheld('under-review', 'evidence-not-publishable');
  const tiers = allowedTiers(path);
  ok = ok.filter((e) => tiers.includes(e.sourceTier));
  if (!ok.length) return withheld('under-review', 'tier-not-allowed');
  ok = ok.filter((e) => !isNotEvidenceSource(e.sourceUrl) && !(typeof e.method === 'string' && SNIPPET_METHOD.test(e.method)));
  if (!ok.length) return withheld('under-review', 'source-not-evidence');
  ok = ok.filter((e) => (e.sourceTier === 1 || e.sourceTier === 2 ? onHost(e.sourceUrl, officialHosts) : e.sourceTier === 3 ? onHost(e.sourceUrl, S.GOVERNMENT_HOST_SUFFIXES) : true));
  if (!ok.length) return withheld('under-review', 'source-not-official');
  ok = ok.filter((e) => e.evidenceType !== 'owner-capture' || (typeof e.captureRef === 'string' && e.captureRef.trim()));
  if (!ok.length) return withheld('under-review', 'no-capture');
  if (path === 'recognition') {
    ok = ok.filter((e) => !onHost(e.sourceUrl, universityHosts));
    if (!ok.length) return withheld('under-review', 'recognition-from-university');
    // N24 (b): only the recognition authorities the owner has listed (none by default).
    ok = ok.filter((e) => onHost(e.sourceUrl, S.RECOGNITION_AUTHORITY_HOSTS));
    if (!ok.length) return withheld('under-review', 'recognition-authority-not-listed');
  }
  ok = ok.filter((e) => e.sourceUrl === claim.source);
  if (!ok.length) return withheld('under-review', 'source-mismatch');
  // A next-review date that has passed retires the entry for EVERY claim; a time-sensitive claim must also have one.
  ok = ok.filter((e) => (e.nextReview === null || e.nextReview === undefined ? !isTimeSensitive(path) : isIsoDate(e.nextReview) && e.nextReview >= today));
  if (!ok.length) return withheld('under-review', 'stale-review');
  // A fee, intake year or item for a year that has ended is withheld whatever its evidence says.
  if (isMoneyPath(path) && yearHasEnded(value.academicYear, now)) return withheld('under-review', 'past-academic-year');
  if (INTAKE_YEAR_PATH.test(path) && yearHasEnded(value, now)) return withheld('under-review', 'past-intake');
  if ((REQUIREMENT_PATH.test(path) || DOCUMENT_PATH.test(path)) && value.intakeYear !== undefined && yearHasEnded(value.intakeYear, now)) return withheld('under-review', 'past-intake');
  // Evidence that names an academic year which has ended no longer supports any claim.
  ok = ok.filter((e) => e.academicYear === null || e.academicYear === undefined || !yearHasEnded(e.academicYear, now));
  if (!ok.length) return withheld('under-review', 'evidence-year-ended');
  if (path === 'statusStatement') {
    // The university's own statement must be for THIS academic year: the evidence names the year, or is dated in it.
    const ay = currentAcademicYear(now), ayStart = `${currentAcademicYearStart(now)}-09-01`;
    ok = ok.filter((e) => e.academicYear === ay || (isIsoDate(e.effectiveDate) && e.effectiveDate >= ayStart && e.effectiveDate <= today));
    if (!ok.length) return withheld('under-review', 'statement-not-current');
  }
  if (isMoneyPath(path)) {
    ok = ok.filter((e) => e.academicYear === value.academicYear);
    if (!ok.length) return withheld('under-review', 'academic-year-not-evidenced');
  }
  if (DEADLINES_PATH.test(path)) {
    if (!Array.isArray(value) || value.some((d) => !d || !isIsoDate(d.date))) return withheld('under-review', 'deadline-unparseable');
    if (value.some((d) => d.date < today)) return withheld('under-review', 'deadline-passed');
  }
  // N24 (d): a preparatory start date written YYYY-MM-DD that has passed, and a free-text intake or start date that names
  // a year before the current academic year (e.g. "September 2025" during 2026/27), are withheld whatever the evidence says.
  if (START_DATE_PATH.test(path) && typeof value === 'string' && /^\s*\d{4}-\d{2}-\d{2}\s*$/.test(value)) {
    if (!isIsoDate(value.trim())) return withheld('under-review', 'start-date-unparseable');
    if (value.trim() < today) return withheld('under-review', 'start-date-passed');
  }
  if ((START_DATE_PATH.test(path) || INTAKE_TEXT_PATH.test(path)) && typeof value === 'string' && [...value.matchAll(YEAR_IN_TEXT)].some((m) => Number(m[0]) < currentAcademicYearStart(now))) return withheld('under-review', 'past-year-named');
  // N24 (c): the official website also needs a verified government (tier 3) entry carrying exactly the same website.
  if (path === 'website' && S.WEBSITE_REQUIRES_GOVERNMENT_EVIDENCE) {
    const listed = entries.some((e) => isUsableEntry(e, now) && e.sourceTier === 3 && onHost(e.sourceUrl, S.GOVERNMENT_HOST_SUFFIXES) && deepEqual(e.value, claim.value));
    if (!listed) return withheld('under-review', 'website-not-government-listed');
  }
  return { result: { show: true, value: JSON.parse(JSON.stringify(value)), source: claim.source, checked: claim.checked, publicState: 'verified', reason: PUBLIC_REASONS.verified, code: 'verified' }, entries: ok };
}

/** The public form of an evaluated claim (drops the internal code). @param {EvaluatedClaim} c @returns {PublicClaim} */
const publicForm = (c) => ({ show: c.show, value: c.value, source: c.source, checked: c.checked, publicState: c.publicState, reason: c.reason });
/** @returns {PublicClaim} */
const tbc = () => ({ show: false, value: null, source: null, checked: null, publicState: 'to-be-confirmed', reason: PUBLIC_REASONS['to-be-confirmed'] });
/** @param {any} v */
const isClaimLike = (v) => !!v && typeof v === 'object' && !Array.isArray(v) && 'value' in v && 'status' in v;

// ------------------------------------------------------------------------------------------------ evidence + context

/**
 * Accepts a loader result ({ state }), a plain evidence object (validated here) or null/undefined (missing).
 * Unvalidated evidence is never used.
 * @param {any} evidence @param {string} [slug]
 * @returns {{ state: 'missing' } | { state: 'invalid', errors: string[] } | { state: 'ok', data: any }}
 */
export function normaliseEvidence(evidence, slug) {
  /** @type {any} */ let r;
  if (evidence === null || evidence === undefined) r = { state: 'missing' };
  else if (typeof evidence === 'object' && ['missing', 'ok', 'invalid'].includes(evidence.state) && !('entries' in evidence)) r = evidence.state === 'ok' ? parseEvidence(evidence.data) : evidence;
  else r = parseEvidence(evidence);
  if (r.state === 'ok' && slug !== undefined && r.data.slug !== slug) return { state: 'invalid', errors: [`the evidence file is for "${r.data.slug}", not "${slug}"`] };
  return r;
}

/**
 * The evaluation context of one record. The website claim is evaluated first, with the host of the record's own website
 * value as its provisional official host (its own tier 1 page must be on that site). Only when the website is SHOWN
 * (which, with WEBSITE_REQUIRES_GOVERNMENT_EVIDENCE, needs a government entry carrying the same website) does that host
 * become the official host that tier 1 and 2 evidence for every other claim must be on; otherwise officialHosts is empty
 * and the university's own pages support nothing (N24 c: the official host must not come from the record alone).
 * universityHosts: the website's host plus every host a tier 1 or 2 entry cites, shown or not (recognition evidence must
 * be on none of them).
 * @param {any} record @param {any[]} entries @param {Date} now @param {PublicationSettings} settings
 */
function contextOf(record, entries, now, settings) {
  const provisional = new Set();
  const w = record?.website?.value;
  if (typeof w === 'string' && isHttpsUrl(w)) { const h = hostOf(w); if (h) provisional.add(h); }
  const university = new Set(provisional);
  for (const e of entries) if (e.sourceTier === 1 || e.sourceTier === 2) { const h = hostOf(e.sourceUrl); if (h) university.add(h); }
  const websiteClaim = evaluateClaim('website', record?.website, entries, { now, officialHosts: [...provisional], universityHosts: [...university], settings });
  return { now, settings, officialHosts: websiteClaim.show ? [...provisional] : [], universityHosts: [...university], websiteClaim };
}

/**
 * The fee page was read (whatever it found): an entry for the tuition claim that is not outdated, at tier 1 or 2 on the
 * official website, read on the page itself (not from a search snippet, cache or archive), accessed on or before today,
 * with a next-review date that has not passed and no academic year that has ended. The same source rules as evaluateClaim.
 * @param {any[]} entries @param {string} path @param {{ now: Date, officialHosts: string[] }} ctx
 */
function feePageRead(entries, path, { now, officialHosts }) {
  const today = isoDay(now);
  return entries.some((e) => e.claimPath === path && e.status !== 'outdated'
    && (e.sourceTier === 1 || e.sourceTier === 2) && isHttpsUrl(e.sourceUrl) && onHost(e.sourceUrl, officialHosts)
    && !isNotEvidenceSource(e.sourceUrl) && !(typeof e.method === 'string' && SNIPPET_METHOD.test(e.method))
    && isIsoDate(e.accessed) && e.accessed <= today && isIsoDate(e.nextReview) && e.nextReview >= today
    && (e.academicYear === null || e.academicYear === undefined || !yearHasEnded(e.academicYear, now)));
}

// ------------------------------------------------------------------------------------------------ projection

/** Ids that occur more than once in a list of objects (their claim paths, and so their evidence, would collide). @param {unknown} list @returns {Set<string>} */
function duplicateIds(list) {
  const seen = new Set(), dup = new Set();
  for (const x of Array.isArray(list) ? list : []) { const id = x && typeof x === 'object' ? x.id : undefined; if (typeof id === 'string') { if (seen.has(id)) dup.add(id); seen.add(id); } }
  return dup;
}

/** Words for the reasons a programme is not listed. */
export const NOT_LISTED_WORDS = Object.freeze({
  'unsafe-id': 'its id contains characters other than letters, digits, "-" and "_"',
  'duplicate-id': 'another programme (listed or deferred) has the same id, so its evidence entries cannot be told apart',
  'international-admission': 'international admission is not shown as verified and open',
  level: 'its level is not shown as verified',
  language: 'its teaching language is not shown as verified',
  duration: 'its duration (durationText or durationYears) is not shown as verified',
  'intake-year': 'its intake year is not shown as verified',
  'fee-page-not-read': 'no current evidence entry (tier 1 or 2, on the official website, next review not passed) shows that its fee page was read',
  'programme-name': "its name, as recorded, does not appear (as whole words, ignoring letter case) in the quotation of an evidence entry that verifies its international admission, or it carries research-note wording; a programme name is our text, so it is printed only when the university's own words contain it (owner setting PROGRAMME_NAME_REQUIRES_QUOTATION)",
});

/** @typedef {{ now: Date, officialHosts: string[], universityHosts: string[], settings: PublicationSettings, websiteClaim: EvaluatedClaim }} RecordContext */

/**
 * @param {any} p @param {any[]} entries @param {RecordContext} ctx
 * @returns {{ programme: any, listed: boolean, reasons: string[] }}
 */
function projectProgramme(p, entries, ctx) {
  if (!p || typeof p !== 'object' || typeof p.id !== 'string' || !SAFE_ID.test(p.id)) return { programme: null, listed: false, reasons: ['unsafe-id'] };
  const base = `programmes.${p.id}`;
  /** @type {Record<string, any>} */ const out = {};
  /** @type {any[]} */ let admissionEntries = [];
  for (const [key, cls] of Object.entries(FIELD_POLICY.programme)) {
    if (cls === 'internal') continue;
    const v = p[key];
    if (key === 'internationalAdmission') {
      // Kept with its supporting entries: the programme's name must appear in one of their quotations (N24 a).
      const d = isClaimLike(v) ? evaluateClaimDetailed(`${base}.${key}`, v, entries, ctx) : null;
      out.internationalAdmission = d ? publicForm(d.result) : tbc();
      admissionEntries = d ? d.entries : [];
    } else if (key === 'otherMandatoryCosts') {
      out.otherMandatoryCosts = []; out.otherCostsWithheld = 0;
      (Array.isArray(v) ? v : []).forEach((c, i) => {
        const r = evaluateClaim(`${base}.otherMandatoryCosts.${i}`, c?.cost, entries, ctx);
        if (r.show && typeof c.label === 'string' && c.label.trim() && !hasInternalWording(c.label)) out.otherMandatoryCosts.push({ label: c.label, cost: publicForm(r) }); else out.otherCostsWithheld++;
      });
    } else if (key === 'requirements' || key === 'documents') {
      const kind = key === 'requirements' ? 'requirement' : 'documentRequirement';
      const items = []; let withheld = 0;
      const dupItems = duplicateIds(v);
      for (const item of Array.isArray(v) ? v : []) {
        if (!item || typeof item.id !== 'string' || !SAFE_ID.test(item.id) || dupItems.has(item.id)) { withheld++; continue; }
        const r = evaluateClaim(`${base}.${key}.${item.id}`, { value: itemValue(kind, item), status: item.status, source: item.source, checked: item.checked }, entries, ctx);
        if (r.show) items.push({ id: item.id, ...r.value, source: r.source, checked: r.checked, publicState: 'verified' }); else withheld++;
      }
      out[key] = items; out[key === 'requirements' ? 'requirementsWithheld' : 'documentsWithheld'] = withheld;
    } else if (cls === 'editorial-public') { if (typeof v === 'string') out[key] = v; }
    else out[key] = isClaimLike(v) ? publicForm(evaluateClaim(`${base}.${key}`, v, entries, ctx)) : tbc();
  }
  const reasons = [];
  if (!(out.internationalAdmission.show && out.internationalAdmission.value === true)) reasons.push('international-admission');
  if (!out.level.show) reasons.push('level');
  if (!out.language.show) reasons.push('language');
  if (!out.durationText.show && !out.durationYears.show) reasons.push('duration');
  if (!out.intakeYear.show) reasons.push('intake-year');
  if (!out.tuition.show && !feePageRead(entries, `${base}.tuition`, ctx)) reasons.push('fee-page-not-read');
  // N24 (a): the name is our text. With PROGRAMME_NAME_REQUIRES_QUOTATION it is printed only when the quotation that
  // verifies the programme's international admission contains it; a programme whose name cannot be printed is not listed.
  if (out.internationalAdmission.show && out.internationalAdmission.value === true) {
    const nameOk = typeof p.name === 'string' && p.name.trim().length > 0 && !hasInternalWording(p.name)
      && (!ctx.settings.PROGRAMME_NAME_REQUIRES_QUOTATION || admissionEntries.some((e) => containsPhrase(e.quotation, p.name)));
    if (!nameOk) reasons.push('programme-name');
  }
  return { programme: out, listed: reasons.length === 0, reasons };
}

/** @param {any} r @param {any[]} entries @param {RecordContext} ctx */
function projectRoute(r, entries, ctx) {
  if (!r || typeof r !== 'object' || typeof r.id !== 'string' || !SAFE_ID.test(r.id)) return null;
  /** @type {Record<string, any>} */ const out = {};
  let shown = 0;
  for (const [key, cls] of Object.entries(FIELD_POLICY.preparatoryRoute)) {
    if (cls === 'internal') continue;
    const v = r[key];
    if (cls === 'editorial-public') { if (typeof v === 'string') out[key] = v; continue; }
    out[key] = isClaimLike(v) ? publicForm(evaluateClaim(`preparatoryRoutes.${r.id}.${key}`, v, entries, ctx)) : tbc();
    if (out[key].show) shown++;
  }
  // A route is public only when at least one of its facts is verified (that is what establishes that it exists).
  return shown > 0 ? out : null;
}

/** @param {any} record @param {any} evidence @param {Date} now @param {PublicationSettings} settings */
function projection(record, evidence, now, settings) {
  const ev = normaliseEvidence(evidence, record?.slug);
  const entries = ev.state === 'ok' ? ev.data.entries : [];
  const ctx = contextOf(record, entries, now, settings);
  /** @type {Record<string, any>} */ const out = {};
  const notListed = [];
  let routesWithheld = 0;
  for (const [key, cls] of Object.entries(FIELD_POLICY.record)) {
    if (cls === 'internal') continue;
    const v = record?.[key];
    if (key === 'city' || key === 'region' || key === 'overview') continue; // our own text: decided below (N24 a)
    if (key === 'programmes') {
      out.programmes = [];
      // Two programmes (listed or deferred) with one id would share every evidence entry: list neither (fail closed).
      const dup = duplicateIds([...(Array.isArray(v) ? v : []), ...(Array.isArray(record?.deferredProgrammes) ? record.deferredProgrammes : [])]);
      for (const p of Array.isArray(v) ? v : []) {
        const r = typeof p?.id === 'string' && dup.has(p.id) ? { listed: false, programme: null, reasons: ['duplicate-id'] } : projectProgramme(p, entries, ctx);
        if (r.listed) out.programmes.push(r.programme); else notListed.push({ id: typeof p?.id === 'string' ? p.id : '?', reasons: r.reasons });
      }
      out.programmesWithheld = notListed.length;
    } else if (key === 'preparatoryRoutes') {
      out.preparatoryRoutes = [];
      const dupRoutes = duplicateIds(v);
      for (const r of Array.isArray(v) ? v : []) { const pr = typeof r?.id === 'string' && dupRoutes.has(r.id) ? null : projectRoute(r, entries, ctx); if (pr) out.preparatoryRoutes.push(pr); else routesWithheld++; }
      out.routesWithheld = routesWithheld;
    } else if (key === 'verification') out.verification = { lastReview: isIsoDate(v?.lastReview) ? v.lastReview : null };
    else if (key === 'website') out.website = publicForm(ctx.websiteClaim);
    else if (cls === 'editorial-public') { if (typeof v === 'string') out[key] = v; }
    else out[key] = isClaimLike(v) ? publicForm(evaluateClaim(key, v, entries, ctx)) : tbc();
  }
  // N24 (a) our own text. The overview needs an editorial review whose hash matches the current text; city and region
  // must each appear in the address the profile shows as verified. A withheld city reads WITHHELD_PLACE_TEXT on cards,
  // filters and the profile (never a guess); a withheld region and a withheld overview are left out.
  const usableText = (/** @type {unknown} */ t) => typeof t === 'string' && t.trim().length > 0 && !hasInternalWording(t);
  const address = out.address?.show === true && typeof out.address.value === 'string' ? out.address.value : null;
  const placeOk = (/** @type {unknown} */ t) => usableText(t) && (!settings.CITY_AND_REGION_REQUIRE_VERIFIED_ADDRESS || (address !== null && containsPhrase(address, t)));
  const overviewOk = usableText(record?.overview) && (!settings.OVERVIEW_REQUIRES_EDITORIAL_REVIEW || editorialReviewMatches(record, isoDay(now)));
  const cityOk = placeOk(record?.city), regionOk = placeOk(record?.region);
  out.city = cityOk ? record.city : settings.WITHHELD_PLACE_TEXT;
  if (regionOk) out.region = record.region;
  if (overviewOk) out.overview = record.overview;
  out.editorialWithheld = { overview: !overviewOk, city: !cityOk, region: typeof record?.region === 'string' && record.region.trim().length > 0 && !regionOk };
  return { out, notListed, ev, entries, ctx };
}

/**
 * A NEW object with only the public and editorial-public keys of `record`, every claim replaced by its evaluated
 * form ({ show, value, source, checked, publicState, reason }). Programmes not meeting the listing rule, and requirement,
 * document and cost items that are not shown, are dropped and counted (programmesWithheld, requirementsWithheld,
 * documentsWithheld, otherCostsWithheld, routesWithheld). Notes, research references, deferred programmes, FAQs, images,
 * open questions, the reviewer, the editorial review and unknown keys never appear. Our own text (N24 a): `overview` and
 * `region` are present only when shown; `city` is the recorded city or WITHHELD_PLACE_TEXT; `editorialWithheld` says
 * which of the three was withheld.
 * @param {any} record @param {any} evidence @param {{ now?: Date, settings?: Partial<PublicationSettings> }} [opts]
 */
export function toPublicRecord(record, evidence, { now = new Date(), settings } = {}) {
  return projection(record, evidence, now, resolveSettings(settings)).out;
}

// ------------------------------------------------------------------------------------------------ publication decision

const MANDATORY = /** @type {const} */ ([
  ['officialName', 'Official name'], ['website', 'Official website'], ['address', 'Address'], ['status', 'Operating status'],
  ['statusStatement', "The university's dated statement for the current year"], ['teachingFormat', 'Teaching format'],
]);

/**
 * May this record have a public page? Mandatory: evidence file present and valid; official name, website, address,
 * status, current statement and teaching format shown (status operating or relocated, teaching format stated); at least
 * one listed programme; lastReview set, not in the future and within REVIEW_MAX_AGE_DAYS; no research-note wording in our
 * own text; no open questions; not a synthetic sample.
 * @param {any} record @param {any} evidence @param {{ now?: Date, settings?: Partial<PublicationSettings> }} [opts]
 * @returns {{ publishable: boolean, failures: { code: string, field: string, message: string }[], notListed: { id: string, reasons: string[], message: string }[], publicRecord: any }}
 */
export function evaluatePublication(record, evidence, { now = new Date(), settings } = {}) {
  const S = resolveSettings(settings);
  const failures = [];
  /** @param {string} code @param {string} field @param {string} message */
  const f = (code, field, message) => failures.push({ code, field, message });
  const slug = typeof record?.slug === 'string' ? record.slug : '?';
  const { out, notListed, ev, entries, ctx } = projection(record, evidence, now, S);
  if (record?.synthetic === true) f('synthetic', 'synthetic', 'This is a synthetic sample record. Samples are never published.');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) f('unsafe-slug', 'slug', `The slug "${slug}" must use only lower-case letters, digits and single hyphens.`);
  if (ev.state === 'missing') f('no-evidence-file', 'evidence', `No evidence file: create data/evidence/${slug}.json with an entry for every claim the profile shows.`);
  else if (ev.state === 'invalid') f('invalid-evidence-file', 'evidence', `The evidence file data/evidence/${slug}.json does not match the evidence format: ${ev.errors.slice(0, 3).join('; ')}.`);
  for (const [key, label] of MANDATORY) {
    const r = key === 'website' ? ctx.websiteClaim : evaluateClaim(key, record?.[key], entries, ctx);
    if (!r.show) f(`not-shown:${r.code}`, key, `${label} is not shown: ${CODE_WORDS[/** @type {keyof typeof CODE_WORDS} */ (r.code)] ?? r.code}.`);
  }
  if (out.status?.show && !['operating', 'relocated'].includes(out.status.value)) f('status-not-operating', 'status', `The operating status is "${out.status.value}". Only operating or relocated universities are published.`);
  if (out.teachingFormat?.show && out.teachingFormat.value === 'unknown') f('teaching-format-unknown', 'teachingFormat', 'The teaching format is "unknown". The university must state how it is teaching this year.');
  if (!out.programmes.length) f('no-listed-programme', 'programmes', 'No programme can be listed. A programme is listed only when its international admission (open), level, language, duration and intake year are verified, its fee page has been read and its name appears in the quotation that verifies its international admission.');
  const lr = record?.verification?.lastReview;
  if (!lr) f('no-last-review', 'verification.lastReview', 'The date of the last full review (verification.lastReview) is not set.');
  else if (!isIsoDate(lr)) f('bad-last-review', 'verification.lastReview', 'The date of the last full review is not a date written YYYY-MM-DD.');
  else if (lr > isoDay(now)) f('future-last-review', 'verification.lastReview', 'The date of the last full review is in the future.');
  else {
    const age = Math.round((Date.parse(`${isoDay(now)}T00:00:00Z`) - Date.parse(`${lr}T00:00:00Z`)) / 86400000);
    if (age > S.REVIEW_MAX_AGE_DAYS) f('stale-last-review', 'verification.lastReview', `The last full review was ${age} days ago. It must be within ${S.REVIEW_MAX_AGE_DAYS} days.`);
  }
  // Our own editorial text must never carry a research note copied into it. Checked on the RECORD's text (whether or not
  // the page would print it): short name, city, region, overview, the name of every programme in programmes[] and of
  // every preparatory route the page shows.
  const editorial = [['shortName', record?.shortName], ['city', record?.city], ['region', record?.region], ['overview', record?.overview],
    ...(Array.isArray(record?.programmes) ? record.programmes : []).map((/** @type {any} */ p) => [`programmes.${p?.id}.name`, p?.name]),
    ...out.preparatoryRoutes.map((/** @type {any} */ r) => [`preparatoryRoutes.${r.id}.name`, r.name])];
  for (const [field, text] of editorial) if (hasInternalWording(text)) f('internal-wording', field, `Our own text in ${field} contains wording from an internal research note (for example "search snippet", "not verified" or "to be confirmed"). Rewrite it; notes never appear on a public page.`);
  const oq = Array.isArray(record?.verification?.openQuestions) ? record.verification.openQuestions.length : 0;
  if (oq) f('open-questions', 'verification.openQuestions', `${oq} open verification question${oq === 1 ? '' : 's'} remain${oq === 1 ? 's' : ''}. Answer or close each one.`);
  return {
    publishable: failures.length === 0,
    failures,
    notListed: notListed.map((n) => ({ ...n, message: `Programme "${n.id}" will not be listed: ${n.reasons.map((r) => NOT_LISTED_WORDS[/** @type {keyof typeof NOT_LISTED_WORDS} */ (r)] ?? r).join('; ')}.` })),
    publicRecord: out,
  };
}

/**
 * The publication decision for one record. `published` = flag AND policy. `buildError` = flagged but failing in a
 * production (non-PREVIEW) build: the build must stop. `draft` records render only in PREVIEW builds.
 * @param {any} record @param {any} evidence @param {{ now?: Date, preview?: boolean, settings?: Partial<PublicationSettings> }} [opts]
 */
export function publicationDecision(record, evidence, { now = new Date(), preview = false, settings } = {}) {
  const flagged = record?.verification?.publishable === true;
  const r = evaluatePublication(record, evidence, { now, settings });
  const published = flagged && r.publishable;
  return { slug: typeof record?.slug === 'string' ? record.slug : '?', flagged, policyPasses: r.publishable, published, draft: !published, buildError: flagged && !r.publishable && !preview, failures: r.failures, notListed: r.notListed, publicRecord: published ? r.publicRecord : null };
}

/**
 * The error a production build stops with, or null. Names every flagged record that fails and each failure.
 * @param {ReturnType<typeof publicationDecision>[]} decisions
 */
export function publicationBuildError(decisions) {
  const bad = decisions.filter((d) => d.buildError);
  if (!bad.length) return null;
  return [
    `Publication gate (fail-closed): ${bad.length} record${bad.length === 1 ? ' is' : 's are'} flagged verification.publishable = true but ${bad.length === 1 ? 'does' : 'do'} not pass the publication policy, so this production build stops. Fix each failure below, or set publishable back to false. A PREVIEW build (npm run build:preview) still renders ${bad.length === 1 ? 'it as a draft' : 'them as drafts'}.`,
    ...bad.map((d) => `  ${d.slug}:\n${d.failures.map((x) => `    - ${x.message}`).join('\n')}`),
    '  Full report: node scripts/publication-report.mjs',
  ].join('\n');
}

// ------------------------------------------------------------------------------------------------ rendering helpers

/**
 * What a component may render for a claim. A projected claim (from toPublicRecord) shows its value only when `show`.
 * A RAW record claim is rendered as it is today ONLY in PREVIEW builds (drafts and samples); outside PREVIEW a raw claim
 * is always "To be confirmed" with no value and no note, so a page that passes raw data by mistake still prints nothing.
 * @param {any} claim @param {{ preview?: boolean }} [opts]
 * @returns {{ state: 'verified' | 'pending' | 'tbc', value: any, source: string | null, checked: string | null, reason: string, note?: string }}
 */
export function viewClaim(claim, { preview = false } = {}) {
  const none = { value: null, source: null, checked: null };
  if (claim && typeof claim === 'object' && 'publicState' in claim) {
    return claim.show === true ? { state: 'verified', value: claim.value, source: claim.source, checked: claim.checked, reason: PUBLIC_REASONS.verified } : { state: 'tbc', ...none, reason: PUBLIC_REASONS[/** @type {PublicState} */ (claim.publicState)] ?? PUBLIC_REASONS['to-be-confirmed'] };
  }
  if (!preview || !claim || typeof claim !== 'object') return { state: 'tbc', ...none, reason: PUBLIC_REASONS['to-be-confirmed'] };
  const has = hasValue(claim.value);
  if (claim.status === 'verified' && has) return { state: 'verified', value: claim.value, source: claim.source ?? null, checked: claim.checked ?? null, reason: PUBLIC_REASONS.verified };
  if (has && claim.status !== 'not-published') return { state: 'pending', value: claim.value, source: null, checked: null, reason: PUBLIC_REASONS['to-be-confirmed'], note: claim.note };
  return { state: 'tbc', ...none, reason: PUBLIC_REASONS['to-be-confirmed'], note: claim.note };
}

/**
 * Requirement / document items a component may render. Projected items are verified by construction. RAW items appear
 * only in PREVIEW builds (with their status and note, as today); outside PREVIEW they are dropped.
 * @param {any[]} items @param {{ preview?: boolean }} [opts]
 * @returns {any[]}
 */
export function viewItems(items, { preview = false } = {}) {
  return (Array.isArray(items) ? items : []).flatMap((i) => {
    if (i && i.publicState === 'verified') return [{ ...i, state: 'verified', note: undefined }];
    if (!preview || !i || typeof i !== 'object') return [];
    return [{ ...i, state: i.status === 'verified' ? 'verified' : i.status === 'not-published' ? 'not-published' : 'pending' }];
  });
}

const PER_WORDS = Object.freeze({ year: 'per year', semester: 'per semester', programme: 'for the whole programme', once: 'one-off' });
const PER_SHORT = Object.freeze({ year: '/year', semester: '/semester', programme: ' for the whole programme', once: ' one-off' });
/**
 * Text for a shown fee (tuition, other mandatory cost, preparatory fee): amount, currency, basis and academic year, then
 * the year-by-year amounts and the payment schedule exactly as recorded, when the verified value carries them (they are
 * part of the value the evidence matched, so a page never prints the amount without them; N24 e). `compact` for tables.
 * Never converts, rounds or totals anything. '' for anything that is not a fee object.
 * @param {any} m @param {{ compact?: boolean }} [opts]
 */
export function formatMoney(m, { compact = false } = {}) {
  if (!m || typeof m !== 'object' || typeof m.amount !== 'number' || !Number.isFinite(m.amount) || typeof m.currency !== 'string') return '';
  const amount = m.amount.toLocaleString('en-GB');
  const basis = /** @type {Record<string, string>} */ (compact ? PER_SHORT : PER_WORDS)[m.per] ?? '';
  let text = compact ? `${amount} ${m.currency}${basis}` : `${amount} ${m.currency}${basis ? ` ${basis}` : ''}`;
  if (typeof m.academicYear === 'string' && m.academicYear) text += ` (${m.academicYear})`;
  if (typeof m.variesByYear === 'string' && m.variesByYear.trim()) text += ` — year by year, as published: ${m.variesByYear}`;
  if (typeof m.schedule === 'string' && m.schedule.trim()) text += ` — payment schedule, as published: ${m.schedule}`;
  return text;
}

/**
 * JSON for a <script type="application/ld+json"> block: "<", ">", "&", U+2028 and U+2029 are written as \u escapes, so a
 * value can never close the script element or break the JSON. JSON.parse gives back exactly the original values.
 * @param {unknown} obj
 */
export function serializeJsonLd(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

/**
 * Structured data for a published profile, from SHOWN values only (name, url, address). [] when the name is withheld.
 * @param {any} publicRecord
 */
export function profileJsonLd(publicRecord) {
  const s = (/** @type {any} */ c) => (c && c.publicState === 'verified' && c.show === true && typeof c.value === 'string' ? c.value : undefined);
  const name = s(publicRecord?.officialName);
  if (!name) return [];
  /** @type {Record<string, unknown>} */ const ld = { '@context': 'https://schema.org', '@type': 'CollegeOrUniversity', name };
  const url = s(publicRecord.website); if (url) ld.url = url;
  const address = s(publicRecord.address); if (address) ld.address = address;
  return [ld];
}

// ------------------------------------------------------------------------------------------------ claim paths for the evidence tests

/**
 * Every claim in a record (including deferred programmes and internal claims), with its claim path and the value an
 * evidence entry must carry. Used by tests/records-evidence.mjs (R10, R11) and the report.
 * @param {any} record @returns {{ path: string, claim: { value: any, status: string, source: any, checked: any } }[]}
 */
export function listClaims(record) {
  const out = [];
  for (const [k, v] of Object.entries(record ?? {})) if (isClaimLike(v)) out.push({ path: k, claim: v });
  for (const p of [...(record?.programmes ?? []), ...(record?.deferredProgrammes ?? [])]) {
    const base = `programmes.${p.id}`;
    for (const [k, v] of Object.entries(p)) if (isClaimLike(v)) out.push({ path: `${base}.${k}`, claim: v });
    (p.otherMandatoryCosts ?? []).forEach((/** @type {any} */ c, /** @type {number} */ i) => { if (isClaimLike(c?.cost)) out.push({ path: `${base}.otherMandatoryCosts.${i}`, claim: c.cost }); });
    for (const r of p.requirements ?? []) out.push({ path: `${base}.requirements.${r.id}`, claim: { value: itemValue('requirement', r), status: r.status, source: r.source, checked: r.checked } });
    for (const d of p.documents ?? []) out.push({ path: `${base}.documents.${d.id}`, claim: { value: itemValue('documentRequirement', d), status: d.status, source: d.source, checked: d.checked } });
  }
  for (const r of record?.preparatoryRoutes ?? []) for (const [k, v] of Object.entries(r)) if (isClaimLike(v)) out.push({ path: `preparatoryRoutes.${r.id}.${k}`, claim: v });
  return out;
}
