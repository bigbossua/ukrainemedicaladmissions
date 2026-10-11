// Evidence store: schema and loader. One file per university record, site/data/evidence/<record slug>.json.
//
// The store lives OUTSIDE src/content and public/, so it is never served, rendered or bundled: pages only ever see the
// result of the publication policy (src/lib/publication.mjs), which reads these files at build time.
// The file format is a fixed interface shared by every work package (UNIVERSITY_DATA_REGISTER.md, "Publication policy
// (fail-closed)"); parsing is STRICT, so an unknown key, a missing key or a wrong type makes the whole file invalid,
// and an invalid file counts as "nothing verified".
//
// Plain ESM with JSDoc so the build (astro.config.mjs, src/lib/records.ts) and the node tests import the same code.
import { z } from 'astro/zod';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

export const EVIDENCE_STATUSES = /** @type {const} */ (['verified', 'partially-verified', 'conflicting', 'unverified', 'outdated', 'not-applicable']);
export const EVIDENCE_TYPES = /** @type {const} */ (['web-page', 'pdf', 'owner-capture', 'official-letter']);

/** A real calendar date written YYYY-MM-DD. @param {string} s */
export const isIsoDate = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(`${s}T00:00:00Z`)) && new Date(`${s}T00:00:00Z`).toISOString().slice(0, 10) === s;
/** @param {string} u */
export const isHttpsUrl = (u) => { try { return typeof u === 'string' && new URL(u).protocol === 'https:'; } catch { return false; } };

const isoDate = z.string().refine(isIsoDate, 'must be a real date written YYYY-MM-DD');
const academicYear = z.string().regex(/^\d{4}\/\d{2}$/, 'must be written like 2026/27').refine((s) => (Number(s.slice(0, 4)) + 1) % 100 === Number(s.slice(5)), 'second year must follow the first');
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const evidenceEntry = z.object({
  id: z.string().min(1),
  claimPath: z.string().min(1),
  statement: z.string().min(1),
  value: z.unknown(),
  sourceUrl: z.string().refine(isHttpsUrl, 'must be an https URL'),
  sourceOrganisation: z.string().min(1),
  sourceTier: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  evidenceType: z.enum(EVIDENCE_TYPES),
  quotation: z.string(),
  effectiveDate: isoDate.nullable(),
  academicYear: academicYear.nullable(),
  accessed: isoDate,
  captureRef: z.string().min(1).nullable(),
  status: z.enum(EVIDENCE_STATUSES),
  reviewer: z.string().min(1),
  method: z.string().min(1),
  contradicts: z.array(z.string()),
  nextReview: isoDate.nullable(),
  decision: z.enum(['publish', 'withhold']),
  withholdReason: z.string().nullable(),
}).strict().superRefine((e, ctx) => {
  if (e.decision === 'withhold' && !(e.withholdReason ?? '').trim()) ctx.addIssue({ code: 'custom', path: ['withholdReason'], message: 'a withheld entry must say why' });
});

export const evidenceFile = z.object({
  slug: z.string().regex(SLUG, 'must be a lower-case slug'),
  access: z.object({ status: z.enum(['blocked', 'open']), checked: isoDate, note: z.string() }).strict(),
  entries: z.array(evidenceEntry),
}).strict().superRefine((f, ctx) => {
  const ids = new Set();
  f.entries.forEach((e, i) => {
    if (ids.has(e.id)) ctx.addIssue({ code: 'custom', path: ['entries', i, 'id'], message: `duplicate id ${e.id}` });
    ids.add(e.id);
    // Compare as text (no regular expression built from file content, so an odd slug or path can never throw).
    const prefix = `${f.slug}/${e.claimPath}/`;
    if (!(e.id.startsWith(prefix) && /^\d+$/.test(e.id.slice(prefix.length)))) ctx.addIssue({ code: 'custom', path: ['entries', i, 'id'], message: `id must be "${f.slug}/${e.claimPath}/<n>"` });
  });
});

/**
 * Parse an evidence file's JSON content. `value` must be PRESENT in every entry (null is a value; a missing key is not).
 * @param {unknown} raw
 * @returns {{ state: 'ok', data: z.infer<typeof evidenceFile> } | { state: 'invalid', errors: string[] }}
 */
export function parseEvidence(raw) {
  const missingValue = Array.isArray(/** @type {any} */ (raw)?.entries) ? /** @type {any[]} */ (/** @type {any} */ (raw).entries).flatMap((e, i) => (e && typeof e === 'object' && Object.prototype.hasOwnProperty.call(e, 'value') ? [] : [`entries.${i}.value: required`])) : [];
  const parsed = evidenceFile.safeParse(raw);
  if (!parsed.success || missingValue.length) return { state: 'invalid', errors: [...missingValue, ...(parsed.success ? [] : parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`))] };
  return { state: 'ok', data: parsed.data };
}

/** Directory of the evidence store: UMA_EVIDENCE_DIR (fixture builds and tests only) or site/data/evidence. */
export const evidenceDir = () => resolve(process.env.UMA_EVIDENCE_DIR || 'data/evidence');
/** Directory of the real university records: UMA_UNIVERSITIES_DIR (fixture builds and tests only) or site/src/content/universities. */
export const universitiesDir = () => resolve(process.env.UMA_UNIVERSITIES_DIR || 'src/content/universities');

/**
 * Load the evidence file for one record. A missing file means "nothing verified"; an unreadable or invalid file too.
 * @param {string} slug @param {{ dir?: string }} [opts]
 * @returns {{ state: 'missing' } | { state: 'ok', data: z.infer<typeof evidenceFile> } | { state: 'invalid', errors: string[] }}
 */
export function loadEvidence(slug, { dir = evidenceDir() } = {}) {
  if (!SLUG.test(slug)) return { state: 'invalid', errors: [`unsafe slug "${slug}"`] };
  const file = join(dir, `${slug}.json`);
  if (!existsSync(file)) return { state: 'missing' };
  let raw;
  try { raw = JSON.parse(readFileSync(file, 'utf8')); } catch (e) { return { state: 'invalid', errors: [`not valid JSON: ${/** @type {Error} */ (e).message}`] }; }
  const r = parseEvidence(raw);
  if (r.state === 'ok' && r.data.slug !== slug) return { state: 'invalid', errors: [`file ${slug}.json carries slug "${r.data.slug}"`] };
  return r;
}

/** Names of the evidence files present (without .json). @param {{ dir?: string }} [opts] */
export const listEvidenceFiles = ({ dir = evidenceDir() } = {}) => (existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)).sort() : []);

/**
 * Read and schema-parse every university record file in a directory (for astro.config.mjs, the tests and the report;
 * pages get records through the content collection and src/lib/records.ts instead).
 * @param {import('astro/zod').ZodTypeAny} schema @param {{ dir?: string }} [opts]
 * @returns {{ file: string, data?: any, error?: string }[]}
 */
export function readRecordFiles(schema, { dir = universitiesDir() } = {}) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith('.json')).sort().map((file) => {
    try {
      const parsed = schema.safeParse(JSON.parse(readFileSync(join(dir, file), 'utf8')));
      return parsed.success ? { file, data: parsed.data } : { file, error: parsed.error.issues.slice(0, 5).map((i) => `${i.path.join('.')}: ${i.message}`).join(' | ') };
    } catch (e) { return { file, error: `not valid JSON: ${/** @type {Error} */ (e).message}` }; }
  });
}
