/**
 * Institution types as REPORTED in public sources (schema INSTITUTION_TYPE_KEYS; owner instruction 2026-10-25). Our own
 * classification of research leads, printed only with a "reported" label; never a verified fact. The order is the order
 * of the directory groups. Every group note says the same thing: reported, not yet verified.
 */
import { INSTITUTION_TYPE_KEYS } from '../content/schema.mjs';

export type InstitutionType = (typeof INSTITUTION_TYPE_KEYS)[number];

export const INSTITUTION_TYPES: Record<InstitutionType, { label: string; group: string; note: string }> = {
  'state-medical-university': { label: 'State medical university', group: 'State medical universities', note: 'Dedicated medical universities reported as state institutions.' },
  'state-pharmacy-university': { label: 'State pharmacy university', group: 'State pharmacy university', note: 'A dedicated pharmacy university reported as a state institution.' },
  'relocated-state-medical-university': { label: 'State medical university, reported as relocated', group: 'State medical universities reported as relocated', note: 'Reported to teach from another city than their original one; the current base is among the facts we confirm.' },
  'multi-faculty-university': { label: 'Multi-faculty university with a medical faculty or institute', group: 'Multi-faculty universities with a medical faculty or institute', note: 'Universities whose medical faculty or institute is reported in public sources.' },
  'private-university-or-institute': { label: 'Private university or institute', group: 'Private universities and institutes', note: 'Reported as private institutions; licence and accreditation are among the facts we confirm.' },
  'communal-medical-academy-or-institute': { label: 'Communal medical academy or institute', group: 'Communal medical academies and institutes', note: 'Reported as communal (regional) institutions, mostly at nursing and allied-health level; whether a medical degree is offered is among the facts we confirm.' },
  'health-programmes-university': { label: 'University with pharmacy, nursing or allied-health programmes', group: 'Universities with pharmacy, nursing or allied-health programmes', note: 'No medical degree was found in public sources; the programme areas reported are pharmacy, nursing or allied health.' },
};

export const UNCLASSIFIED = { key: 'unclassified', group: 'Other institutions', note: 'Institutions whose type is not yet recorded.' } as const;

export const typeLabel = (t: unknown): string => (typeof t === 'string' && t in INSTITUTION_TYPES ? INSTITUTION_TYPES[t as InstitutionType].label : '');

export interface PreviewGroup<T> { key: string; title: string; note: string; items: T[] }

/** Research previews grouped by reported institution type, in INSTITUTION_TYPE_KEYS order, unclassified last; empty groups dropped. */
export function groupPreviews<T extends { reported?: { institutionType?: string | null } | null }>(previews: T[]): PreviewGroup<T>[] {
  const groups: PreviewGroup<T>[] = INSTITUTION_TYPE_KEYS.map((k) => ({ key: k, title: INSTITUTION_TYPES[k].group, note: INSTITUTION_TYPES[k].note, items: previews.filter((u) => u.reported?.institutionType === k) }));
  groups.push({ key: UNCLASSIFIED.key, title: UNCLASSIFIED.group, note: UNCLASSIFIED.note, items: previews.filter((u) => !u.reported?.institutionType || !(u.reported.institutionType in INSTITUTION_TYPES)) });
  return groups.filter((g) => g.items.length > 0);
}
