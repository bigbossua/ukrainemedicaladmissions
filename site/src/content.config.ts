import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * SINGLE SOURCE OF TRUTH for university and programme data.
 * Every factual field is a `Claim`: a value plus where it came from and when
 * it was last checked. Pages render unverified claims with a visible
 * "verification pending" state and never as plain fact.
 * See UNIVERSITY_DATA_REGISTER.md for the process.
 */
const verification = z.enum(['verified', 'unverified', 'outdated', 'not-published']);

const claim = <T extends z.ZodTypeAny>(value: T) =>
  z.object({
    value: value.nullable(),
    status: verification.default('unverified'),
    source: z.string().url().nullable().default(null),   // official evidence URL
    checked: z.string().date().nullable().default(null),  // YYYY-MM-DD last checked
    note: z.string().optional(),
  });

const money = z.object({
  amount: z.number(),
  currency: z.string().length(3),
  per: z.enum(['year', 'semester', 'programme', 'once']),
  academicYear: z.string(),        // e.g. "2026/27"
  schedule: z.string().optional(), // payment schedule as published
});

const programme = z.object({
  id: z.string(),                                      // e.g. "medicine"
  name: z.string(),                                    // as the university names it
  qualification: claim(z.string()),                    // e.g. "Master of Medicine (MD)"
  course: z.enum(['medicine', 'dentistry', 'nursing', 'pharmacy', 'preparatory', 'other']),
  durationYears: claim(z.number()),
  language: claim(z.array(z.enum(['English', 'Ukrainian']))),
  format: claim(z.enum(['on-campus', 'distance', 'blended'])),
  internationalAdmission: claim(z.boolean()),
  tuition: claim(money),
  otherMandatoryCosts: z.array(z.object({ label: z.string(), cost: claim(money) })).default([]),
  entryRequirements: claim(z.array(z.string())),
  requiredDocuments: claim(z.array(z.string())),
  deadlines: claim(z.array(z.object({ label: z.string(), date: z.string() }))),
  intake: claim(z.string()),
});

const universities = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/universities' }),
  schema: z.object({
    slug: z.string(),
    officialName: claim(z.string()),
    shortName: z.string(),
    alternativeNames: z.array(z.string()).default([]),
    status: claim(z.enum(['operating', 'relocated', 'merged', 'suspended', 'unknown'])),
    city: z.string(),
    region: z.string().optional(),
    address: claim(z.string()),
    website: claim(z.string().url()),
    internationalOffice: claim(z.object({ email: z.string().optional(), phone: z.string().optional(), url: z.string().url().optional() })),
    founded: claim(z.number()),
    overview: z.string(),                 // our own neutral description; no claims beyond verified fields
    accreditation: claim(z.string()),
    recognition: claim(z.array(z.string())),
    accommodation: claim(z.string()),
    programmes: z.array(programme),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    images: z.array(z.object({ src: z.string(), alt: z.string(), credit: z.string(), licence: z.string(), source: z.string().url(), retrieved: z.string().date() })).default([]),
    verification: z.object({
      publishable: z.boolean().default(false), // false => page is noindex and absent from sitemap
      lastReview: z.string().date().nullable().default(null),
      reviewer: z.string().optional(),
      openQuestions: z.array(z.string()).default([]),
    }),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faqs' }),
  schema: z.object({
    section: z.string(),
    order: z.number().default(0),
    items: z.array(z.object({ q: z.string(), a: z.string() })),
  }),
});

export const collections = { universities, faqs };
