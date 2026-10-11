import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { record } from './content/schema.mjs';

/**
 * Collections. The record schema lives in ./content/schema.mjs (plain JS) so that the automated tests
 * validate every record with exactly the schema the build uses. See that file and UNIVERSITY_DATA_REGISTER.md.
 */
export { FIELD_KEYS, LEVEL_KEYS } from './content/schema.mjs';

const universities = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/universities' }),
  schema: record,
});

/** Synthetic sample records for local UI demonstrations only. Built solely in PREVIEW_UNPUBLISHED builds under /preview/. */
const samples = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/samples' }),
  schema: record,
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faqs' }),
  schema: z.object({
    section: z.string(),
    order: z.number().default(0),
    items: z.array(z.object({ q: z.string(), a: z.string() })),
  }),
});

export const collections = { universities, samples, faqs };
