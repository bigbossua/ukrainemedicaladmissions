// SINGLE SOURCE OF TRUTH for university and programme data (schema only; collections are wired in ../content.config.ts).
// Plain JS so the automated tests (tests/records-evidence.mjs) can validate every record with the SAME schema the build uses.
//
// Every factual field is a `Claim`: a value plus where it came from and when it was last checked.
// Production pages never read these records directly: they get the projection built by the publication policy
// (src/lib/publication.mjs via src/lib/records.ts), which shows a claim only when the evidence store backs it.
// Records that are not published produce NO page in production builds at all (they are built only when
// PREVIEW_UNPUBLISHED=1, for local review, where drafts render as they are with a draft banner).
// A NEW FIELD here must also be classified in FIELD_POLICY (src/lib/publication.mjs) or the tests and the build fail.
// See UNIVERSITY_DATA_REGISTER.md for the process and the field-by-field meaning.
import { z } from 'astro/zod';

// 'partially-verified' and 'conflicting' (added 2026-10-11, publication policy): a page never shows either; a conflicting
// claim is withheld as "To be confirmed" until the official sources agree (src/lib/publication.mjs).
export const verification = z.enum(['verified', 'unverified', 'outdated', 'not-published', 'partially-verified', 'conflicting']);

/** @template {import('astro/zod').ZodTypeAny} T @param {T} value */
const claim = (value) =>
  z.object({
    value: value.nullable(),
    status: verification.default('unverified'),
    source: z.string().url().nullable().default(null),   // official evidence URL (only meaningful when verified)
    checked: z.string().date().nullable().default(null),  // YYYY-MM-DD last checked against the source
    note: z.string().optional(),                          // provenance: e.g. "search-snippet lead 2026-10-11 — not verified"
  });

export const money = z.object({
  amount: z.number(),
  currency: z.string().length(3),
  per: z.enum(['year', 'semester', 'programme', 'once']),
  academicYear: z.string(),        // e.g. "2026/27" — never publish a fee without its year
  schedule: z.string().optional(), // payment schedule as published
  variesByYear: z.string().optional(), // e.g. "year 1: 3,500; years 2–6: 4,100" as published
});

export const FIELD_KEYS = /** @type {const} */ (['medicine', 'dentistry', 'pharmacy', 'nursing', 'public_health', 'physical_therapy', 'physical_education', 'preparatory', 'other']);
export const LEVEL_KEYS = /** @type {const} */ (['bachelor', 'master', 'integrated_master', 'junior_bachelor', 'preparatory', 'phd', 'other']);

/** One entry requirement as the university states it. Only `verified` objects feed a readiness assessment. */
export const requirement = z.object({
  id: z.string(),
  type: z.enum(['subject', 'grade', 'exam', 'language', 'age', 'document', 'other']),
  summary: z.string(),                                  // what the university states (verbatim where possible)
  subject: z.string().optional(),                       // e.g. "Biology"
  minimum: z.object({ value: z.string(), scale: z.string() }).optional(), // e.g. { value: "60", scale: "percent" }
  condition: z.string().optional(),                     // applicability, e.g. "applicants with A-levels"
  examFormat: z.string().optional(),                    // e.g. "oral examination" (verbatim)
  intakeYear: z.string().optional(),                    // e.g. "2026/27" — requirements are intake-specific
  status: verification.default('unverified'),
  source: z.string().url().nullable().default(null),
  checked: z.string().date().nullable().default(null),
  note: z.string().optional(),
});

/** One document the university requires; `condition` makes it conditional (e.g. translation if not in Ukrainian/English). */
export const documentRequirement = z.object({
  id: z.string(),
  name: z.string(),
  condition: z.string().optional(),
  formatNote: z.string().optional(),                    // e.g. "6 photographs 3×4 cm" (verbatim)
  intakeYear: z.string().optional(),
  status: verification.default('unverified'),
  source: z.string().url().nullable().default(null),
  checked: z.string().date().nullable().default(null),
  note: z.string().optional(),
});

export const programme = z.object({
  id: z.string(),                                       // e.g. "medicine"
  name: z.string(),                                     // as the university names it
  field: z.enum(FIELD_KEYS),                            // programme family (directory filter; course page only where one exists)
  level: claim(z.enum(LEVEL_KEYS)),
  specialtyCode: claim(z.string()),                     // Ukrainian specialty code(s) as published, e.g. "222 / I2"
  qualification: claim(z.string()),                     // exact award title as the university names it — never "MBBS"/"BSN"/"MSN" unless the university uses it
  durationYears: claim(z.number()),
  durationText: claim(z.string()),                      // e.g. "5 years 10 months" as published
  language: claim(z.array(z.enum(['English', 'Ukrainian']))),
  format: claim(z.enum(['on-campus', 'distance', 'blended'])),
  internationalAdmission: claim(z.boolean()),
  intakeYear: claim(z.string()),                        // the intake the programme-level claims refer to
  tuition: claim(money),
  otherMandatoryCosts: z.array(z.object({ label: z.string(), cost: claim(money) })).default([]),
  entryRequirements: claim(z.array(z.string())),        // legacy summary list (kept for the course pages)
  requirements: z.array(requirement).default([]),       // structured, intake-specific requirement objects
  requiredDocuments: claim(z.array(z.string())),        // legacy summary list
  documents: z.array(documentRequirement).default([]),  // structured document requirements
  deadlines: claim(z.array(z.object({ label: z.string(), date: z.string() }))),
  intake: claim(z.string()),
  gradingNote: z.string().optional(),                   // how the university describes grade scales, if it does
});

/** A university's preparatory / foundation route for foreign applicants. Progression wording is quoted, never generalised. */
export const preparatoryRoute = z.object({
  id: z.string(),
  name: z.string(),                                     // as the university names it
  languageOfInstruction: claim(z.array(z.string())),
  englishTrack: claim(z.boolean()),                     // true only if the university states an English-language preparatory track
  durationText: claim(z.string()),
  subjects: claim(z.array(z.string())),
  certificateName: claim(z.string()),
  progressionText: claim(z.string()),                   // verbatim official wording on what completion does / does not give
  appliesToEnglishDegreeTrack: claim(z.boolean()),      // e.g. false where the university excludes English-track applicants
  startDate: claim(z.string()),
  fee: claim(money),
  eligibilityText: claim(z.string()),
  note: z.string().optional(),
});

/** Official pages a verification pass must open. Research references only — never evidence. */
export const researchReference = z.object({
  label: z.string(),
  url: z.string().url(),
  purpose: z.string(),                                  // what this page is expected to establish
  snippetDate: z.string().optional(),                   // date of the search snippet that surfaced it
  note: z.string().optional(),
});

export const record = z.object({
  slug: z.string(),
  synthetic: z.boolean().default(false),                // true ONLY for the sample record used in local UI demonstrations
  officialName: claim(z.string()),
  shortName: z.string(),
  alternativeNames: z.array(z.string()).default([]),
  status: claim(z.enum(['operating', 'relocated', 'merged', 'suspended', 'unknown'])),
  statusStatement: claim(z.string()),                   // the university's own dated statement on operation/teaching for the current year (verbatim)
  teachingFormat: claim(z.enum(['in-person', 'blended', 'distance', 'unknown'])),
  city: z.string(),
  region: z.string().optional(),
  address: claim(z.string()),
  website: claim(z.string().url()),
  internationalOffice: claim(z.object({ email: z.string().optional(), phone: z.string().optional(), url: z.string().url().optional() })),
  founded: claim(z.number()),
  overview: z.string(),                                 // our own neutral description; no claims beyond verified fields
  accreditation: claim(z.string()),
  recognition: claim(z.array(z.string())),
  accommodation: claim(z.string()),
  programmes: z.array(programme),                     // ONLY programmes with official evidence of admission for international applicants (owner decision 2026-10-11)
  deferredProgrammes: z.array(programme).default([]),  // recorded programmes WITHOUT that evidence: never rendered publicly; preview-only verification queue
  preparatoryRoutes: z.array(preparatoryRoute).default([]),
  researchReferences: z.array(researchReference).default([]),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  images: z.array(z.object({ src: z.string(), alt: z.string(), credit: z.string(), licence: z.string(), source: z.string().url(), retrieved: z.string().date() })).default([]),
  verification: z.object({
    publishable: z.boolean().default(false),            // false => NO page in production; preview-only build; never in the sitemap
    lastReview: z.string().date().nullable().default(null),
    reviewer: z.string().optional(),
    openQuestions: z.array(z.string()).default([]),
  }),
});
