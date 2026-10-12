import { getCollection } from 'astro:content';
import { PREVIEW } from './site';
import { FIELDS, LEVELS } from './fields';
import { record as recordSchema } from '../content/schema.mjs';
import { loadEvidence } from './evidence.mjs';
import { assertPolicyCoverage, publicationBuildError, publicationDecision, viewClaim } from './publication.mjs';

/**
 * THE ONLY ENTRY POINT to university data for pages and components (tests/publication-policy.mjs fails if any other file
 * under src/ calls getCollection('universities') or reads the record or evidence files).
 *
 * Every record is put through the publication policy (src/lib/publication.mjs) with its evidence file
 * (data/evidence/<slug>.json). A record is PUBLISHED only when verification.publishable is true AND the policy passes;
 * production pages receive only the projection of published records (toPublicRecord): withheld claims carry no value,
 * and notes, research references, deferred programmes and every other internal field are absent.
 *
 * Research previews (N25): getResearchPreviews() returns unpublished records that opt in, as the same projection, for the
 * few pages that list them labelled "Not yet verified" (directory, profile route, home, apply). getListedUniversities()
 * never includes them, so fee, course and comparison content cannot list one by accident.
 *
 * Fail closed: in a production (non-PREVIEW) build, a record flagged publishable that fails the policy stops the build
 * with an error naming the record and each failure. In a PREVIEW_UNPUBLISHED=1 build such a record, like every other
 * unpublished record, is rendered RAW as a draft (banner, noindex, no canonical / JSON-LD / sitemap), with its
 * publication failures listed in the verification queue.
 */

/** One build, one clock: every page of a build evaluates dates against the same moment. */
const BUILD_NOW = new Date();

/** A published record's projection (see toPublicRecord in publication.mjs). */
export type PublicUniversity = Record<string, any> & { slug: string; shortName: string; city: string; programmes: any[]; preparatoryRoutes: any[] };
export interface PublicationFailure { code: string; field: string; message: string }
export interface ListedUniversity {
  /** Projection (published) or, in PREVIEW builds only, the raw draft record. */
  d: any;
  draft: boolean;
  /** Draft only: flagged publishable but failing the policy. */
  flagged: boolean;
  failures: PublicationFailure[];
  notListed: { id: string; reasons: string[]; message: string }[];
}

async function decide() {
  assertPolicyCoverage(recordSchema);
  const entries = await getCollection('universities');
  const all = entries.map((e) => ({ raw: e.data, d: publicationDecision(e.data, loadEvidence(e.data.slug), { now: BUILD_NOW, preview: PREVIEW }) }));
  const error = publicationBuildError(all.map((x) => x.d));
  if (error) throw new Error(error);
  return all;
}

export const byShortName = (a: { shortName: string }, b: { shortName: string }) => a.shortName.localeCompare(b.shortName);

/** Projections of the published records, alphabetical. What every production page lists. */
export async function getPublicUniversities(): Promise<PublicUniversity[]> {
  return (await decide()).filter((x) => x.d.published).map((x) => x.d.publicRecord as PublicUniversity).sort(byShortName);
}

/**
 * Published projections plus, ONLY in PREVIEW builds, the unpublished records as raw drafts with their failures.
 * In a production build this returns exactly getPublicUniversities() (wrapped).
 */
export async function getListedUniversities(): Promise<ListedUniversity[]> {
  const all = await decide();
  const published: ListedUniversity[] = all.filter((x) => x.d.published).map((x) => ({ d: x.d.publicRecord, draft: false, flagged: true, failures: [], notListed: [] }));
  const drafts: ListedUniversity[] = PREVIEW ? all.filter((x) => !x.d.published).map((x) => ({ d: x.raw, draft: true, flagged: x.d.flagged, failures: x.d.failures, notListed: x.d.notListed })) : [];
  return [...published, ...drafts].sort((a, b) => byShortName(a.d, b.d));
}

/**
 * RESEARCH PREVIEWS (N25, src/lib/publication.mjs researchPreviewCheck): unpublished real records that opt in, as the
 * policy PROJECTION (shown claims only, our own text under the published-profile rules), alphabetical. Production builds
 * only: a PREVIEW_UNPUBLISHED=1 build shows every unpublished record raw as a draft instead, so this returns [] there.
 * Pages render these labelled "Research preview — not yet verified", noindex, without structured data, never in the
 * sitemap (astro.config.mjs lists only published profiles). Kept apart from getListedUniversities() on purpose: a page
 * shows previews only where it asks for them, so fee, course and comparison pages can never list one by accident.
 */
export async function getResearchPreviews(): Promise<PublicUniversity[]> {
  if (PREVIEW) return [];
  return (await decide()).filter((x) => x.d.researchPreview && !x.d.published).map((x) => x.d.previewRecord as PublicUniversity).sort(byShortName);
}

/** Count of the claims a projection SHOWS (top-level facts plus listed programmes): what a preview page calls "verified so far". */
export function shownFactCount(d: any): number {
  const top = ['officialName', 'website', 'address', 'status', 'statusStatement', 'teachingFormat', 'founded', 'internationalOffice', 'accreditation', 'recognition', 'accommodation'];
  return top.filter((k) => d?.[k]?.show === true).length + (Array.isArray(d?.programmes) ? d.programmes.length : 0);
}

/** Synthetic sample records (src/content/samples): PREVIEW builds only, never real, never published. */
export async function getPreviewSamples(): Promise<any[]> {
  if (!PREVIEW) return [];
  return (await getCollection('samples')).map((s) => s.data).sort(byShortName);
}

/** The value a page may use for a claim (projection: shown values only; raw drafts: as today, PREVIEW only). */
const usable = (claim: unknown): any => viewClaim(claim, { preview: PREVIEW }).value;

/** Programme-family keys in display order (FIELDS order), limited to those present in `programmes`. */
export function fieldsOf(programmes: { field: string }[]): string[] {
  const present = new Set(programmes.map((p) => p.field));
  return Object.keys(FIELDS).filter((k) => present.has(k));
}

export function levelsOf(programmes: { level: unknown }[]): string[] {
  const present = new Set(programmes.map((p) => usable(p.level)).filter((v): v is string => typeof v === 'string' && !!v));
  return Object.keys(LEVELS).filter((k) => present.has(k));
}

export function languagesOf(programmes: { language: unknown }[]): string[] {
  return [...new Set(programmes.flatMap((p) => { const v = usable(p.language); return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []; }))].sort();
}

export function intakesOf(programmes: { intakeYear: unknown }[]): string[] {
  return [...new Set(programmes.map((p) => usable(p.intakeYear)).filter((v): v is string => typeof v === 'string' && !!v))].sort();
}

/** Format an international-office claim value for display. */
export const officeText = (v: { email?: string; phone?: string; url?: string } | null | undefined) => (v ? [v.email, v.phone].filter(Boolean).join(' · ') || (v.url ? 'See official page' : '') : '');
