import { PREVIEW } from './site';
import { FIELDS, LEVELS } from './fields';

/**
 * Publication gate. A record whose `verification.publishable` is false is NOT part of the public site:
 * no page, no link, no sitemap entry, no structured data, no form option. It becomes visible only in a
 * PREVIEW_UNPUBLISHED=1 build, where every page carrying it is noindex, bare (no canonical / JSON-LD) and
 * banner-marked as a draft. Every page that lists universities must filter through this function.
 */
export const isVisible = (u: { data: { verification: { publishable: boolean } } }) => u.data.verification.publishable || PREVIEW;

export const byShortName = (a: { data: { shortName: string } }, b: { data: { shortName: string } }) => a.data.shortName.localeCompare(b.data.shortName);

/** Programme-family keys in display order (FIELDS order), limited to those present in `programmes`. */
export function fieldsOf(programmes: { field: string }[]): string[] {
  const present = new Set(programmes.map((p) => p.field));
  return Object.keys(FIELDS).filter((k) => present.has(k));
}

export function levelsOf(programmes: { level: { value: string | null } }[]): string[] {
  const present = new Set(programmes.map((p) => p.level.value).filter((v): v is string => !!v));
  return Object.keys(LEVELS).filter((k) => present.has(k));
}

export function languagesOf(programmes: { language: { value: string[] | null } }[]): string[] {
  return [...new Set(programmes.flatMap((p) => p.language.value ?? []))].sort();
}

export function intakesOf(programmes: { intakeYear: { value: string | null } }[]): string[] {
  return [...new Set(programmes.map((p) => p.intakeYear.value).filter((v): v is string => !!v))].sort();
}

/** Format an international-office claim value for display. */
export const officeText = (v: { email?: string; phone?: string; url?: string }) => [v.email, v.phone].filter(Boolean).join(' · ') || (v.url ? 'See official page' : '');
