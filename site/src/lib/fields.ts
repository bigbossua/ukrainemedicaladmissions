/**
 * Programme families and qualification levels supported by the data model.
 * A family has a public course page ONLY where SEMrush evidence justified one (KEYWORD_URL_MAP.md §12);
 * every other family is supported in the directory filters, profiles and the candidate-profile
 * service without a separate SEO page.
 */
export const FIELDS = {
  medicine: { label: 'Medicine', short: 'Medicine', page: '/courses/medicine/' },
  dentistry: { label: 'Dentistry', short: 'Dentistry', page: '/courses/dentistry/' },
  pharmacy: { label: 'Pharmacy', short: 'Pharmacy', page: '/courses/pharmacy/' },
  nursing: { label: 'Nursing', short: 'Nursing', page: '/courses/nursing/' },
  public_health: { label: 'Public health', short: 'Public health', page: null },
  physical_therapy: { label: 'Physical therapy and rehabilitation', short: 'Rehabilitation', page: null },
  physical_education: { label: 'Physical education and sport', short: 'Sport', page: null },
  preparatory: { label: 'Preparatory department', short: 'Preparatory', page: null },
  other: { label: 'Other health programme', short: 'Other', page: null },
} as const;
export type FieldKey = keyof typeof FIELDS;

export const LEVELS = {
  bachelor: 'Bachelor',
  master: "Master's",
  integrated_master: "Integrated master's (single-cycle)",
  junior_bachelor: 'Professional junior bachelor',
  preparatory: 'Preparatory (pre-degree)',
  phd: 'PhD',
  other: 'Other',
} as const;
export type LevelKey = keyof typeof LEVELS;

export const TEACHING_FORMATS = { 'in-person': 'In person', blended: 'Blended (in person and online)', distance: 'Distance', unknown: 'Not stated' } as const;
/** Display labels for the record enums (schema.mjs), so a verified value never prints as a raw key. */
export const OPERATING_STATUS = { operating: 'Operating', relocated: 'Relocated', merged: 'Merged', suspended: 'Suspended', unknown: 'Not stated' } as const;
export const PROGRAMME_FORMATS = { 'on-campus': 'On campus', distance: 'Distance', blended: 'Blended (on campus and online)' } as const;
export const label = (map: Record<string, string>, v: unknown) => (typeof v === 'string' && v in map ? map[v] : String(v));

export const REQUIREMENT_TYPES = { subject: 'Subject', grade: 'Minimum grade', exam: 'Entrance examination', language: 'Language', age: 'Age', document: 'Document', other: 'Other' } as const;
