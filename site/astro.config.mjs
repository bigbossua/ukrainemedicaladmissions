// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { record as recordSchema } from './src/content/schema.mjs';
import { readRecordFiles, loadEvidence, universitiesDir } from './src/lib/evidence.mjs';
import { publicationDecision, publicationBuildError } from './src/lib/publication.mjs';
import { resolve } from 'node:path';

const flag = (/** @type {string | undefined} */ v) => /^(1|true|yes)$/i.test((v ?? '').trim());
const PREVIEW = flag(process.env.PREVIEW_UNPUBLISHED);
const STAGING = flag(process.env.STAGING);

// PUBLICATION POLICY (src/lib/publication.mjs). The same records the pages are built from (UMA_UNIVERSITIES_DIR or
// src/content/universities, resolved exactly as src/content.config.ts does) and the same evidence store (UMA_EVIDENCE_DIR
// or data/evidence) decide which profiles are published: flag true AND policy passes. The sitemap filter below lists a
// /universities/<slug>/ URL only for a published record (allow-list), as a second guard behind the pages themselves;
// and a production build stops before rendering anything if a flagged record fails the policy (fail closed).
const decisions = readRecordFiles(recordSchema, { dir: universitiesDir() })
  .flatMap(({ data }) => (data ? [publicationDecision(data, loadEvidence(data.slug), { now: new Date(), preview: PREVIEW })] : []));
const published = new Set(decisions.filter((d) => d.published).map((d) => d.slug));
const gateError = publicationBuildError(decisions);

/** @type {import('astro').AstroIntegration} */
const publicationGate = {
  name: 'uma-publication-gate',
  hooks: { 'astro:build:start': () => { if (gateError) throw new Error(gateError); } },
};

// Static output: the built `dist/` is plain HTML/CSS/JS plus the PHP form
// handler in public/api, so it runs on Hostinger shared hosting as-is.
export default defineConfig({
  site: 'https://ukrainemedicaladmissions.com',
  output: 'static',
  // UMA_CACHE_DIR isolates the content-layer cache of the publication fixture builds (tests/publication-build.mjs).
  ...(process.env.UMA_CACHE_DIR ? { cacheDir: resolve(process.env.UMA_CACHE_DIR) } : {}),
  trailingSlash: 'always',
  build: { format: 'directory' },
  // The production CSP (public/.htaccess) is script-src 'self': Astro must never inline a processed <script> as an
  // inline module, or the browser blocks it (mobile menu, directory filters, apply form). assetsInlineLimit 0 makes
  // every processed script an external /_astro/*.js file; tests/check-meta.mjs fails on any inline script.
  vite: { build: { assetsInlineLimit: 0 } },
  // Staging (STAGING=1) and preview (PREVIEW_UNPUBLISHED=1) builds emit no sitemap at all; every page is noindex.
  integrations: [
    publicationGate,
    ...(STAGING || PREVIEW ? [] : [
      sitemap({
        // Private / transactional pages never enter the sitemap; a university profile only when it is published.
        filter: (page) => {
          if (page.includes('/apply/thank-you/') || page.includes('/404') || page.includes('/preview/')) return false;
          const profile = /\/universities\/([^/]+)\/$/.exec(new URL(page).pathname);
          return !profile || published.has(profile[1]);
        },
        changefreq: 'weekly',
        priority: 0.7,
      }),
    ]),
  ],
});
