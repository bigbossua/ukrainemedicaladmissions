export const SITE = {
  name: 'Ukraine Medical Admissions',
  url: 'https://ukrainemedicaladmissions.com',
  email: 'info@ukrainemedicaladmissions.com',
  description:
    'Independent admissions support for international students applying to medical universities in Ukraine: verified information on programmes, requirements and fees.',
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
