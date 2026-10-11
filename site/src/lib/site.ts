/** True when built with STAGING=1 (publish workflow `target: staging`). Forces noindex everywhere. */
export const STAGING = /^(1|true|yes)$/i.test((process.env.STAGING ?? '').trim());

/**
 * True when built with PREVIEW_UNPUBLISHED=1: unpublished (unverified) university records and the
 * synthetic sample record are built for LOCAL REVIEW ONLY (noindex, no canonical, no structured data,
 * never in the sitemap). Production builds never set this flag, so unpublished records produce no page.
 */
export const PREVIEW = /^(1|true|yes)$/i.test((process.env.PREVIEW_UNPUBLISHED ?? '').trim());

export const SITE = {
  name: 'Ukraine Medical Admissions',
  url: 'https://ukrainemedicaladmissions.com',
  email: 'info@ukrainemedicaladmissions.com',
  description:
    'Independent admissions support for international students applying to medical universities in Ukraine. We publish a fact only after checking an official source.',
  cta: 'Apply Online Now',
  ctaHref: '/apply/',
  // Mandatory wherever a university is named (brand guideline §6).
  disclaimer:
    'Ukraine Medical Admissions is an independent service. We are not affiliated with, or endorsed by, any university or government body. Admission decisions are made solely by the university.',
} as const;

export const NAV = [
  { href: '/universities/', label: 'Universities' },
  { href: '/courses/', label: 'Courses' },
  { href: '/admissions/', label: 'Admissions' },
  { href: '/tuition-fees/', label: 'Tuition & fees' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/about/', label: 'About' },
] as const;

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
