/** True when built with STAGING=1 (publish workflow `target: staging`). Forces noindex everywhere. */
export const STAGING = /^(1|true|yes)$/i.test((process.env.STAGING ?? '').trim());

/**
 * True when built with PREVIEW_UNPUBLISHED=1: unpublished (unverified) university records and the
 * synthetic sample record are built for LOCAL REVIEW ONLY (noindex, no canonical, no structured data,
 * never in the sitemap). Production builds never set this flag: there, an unpublished record produces no page, or, if it
 * opts in to a research preview (N25), a labelled noindex page built from the policy projection only.
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

/**
 * Google Search Console verification token for a URL-prefix property (ANALYTICS_AND_SEARCH_CONSOLE.md §A1, option ii).
 * null (default): no tag is printed. To verify, the owner copies ONLY the content value of the tag Google shows
 * (<meta name="google-site-verification" content="THIS-PART">) here, runs `npm test`, and releases. A Domain property
 * (DNS TXT record) needs nothing here. tests/check-meta.mjs checks the format and that every page carries the tag once
 * it is set (staging builds never print it). Removing the value later un-verifies the property.
 */
export const SEARCH_CONSOLE_VERIFICATION: string | null = null;

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
