// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// University profiles whose data is not yet verified (verification.publishable = false) produce no page in
// production builds; they are built only with PREVIEW_UNPUBLISHED=1 for local review. The sitemap filter below
// is a second guard so such a page can never be listed even if that rule regressed.
const unpublished = readdirSync('./src/content/universities')
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(`./src/content/universities/${f}`, 'utf8')))
  .filter((u) => !u.verification?.publishable)
  .map((u) => `/universities/${u.slug}/`);

// Static output: the built `dist/` is plain HTML/CSS/JS plus the PHP form
// handler in public/api, so it runs on Hostinger shared hosting as-is.
export default defineConfig({
  site: 'https://ukrainemedicaladmissions.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // The production CSP (public/.htaccess) is script-src 'self': Astro must never inline a processed <script> as an
  // inline module, or the browser blocks it (mobile menu, directory filters, apply form). assetsInlineLimit 0 makes
  // every processed script an external /_astro/*.js file; tests/check-meta.mjs fails on any inline script.
  vite: { build: { assetsInlineLimit: 0 } },
  // Staging (STAGING=1) and preview (PREVIEW_UNPUBLISHED=1) builds emit no sitemap at all; every page is noindex.
  integrations: /^(1|true|yes)$/i.test((process.env.STAGING ?? '').trim()) || /^(1|true|yes)$/i.test((process.env.PREVIEW_UNPUBLISHED ?? '').trim()) ? [] : [
    sitemap({
      // Private / transactional pages never enter the sitemap.
      filter: (page) =>
        !page.includes('/apply/thank-you/') &&
        !page.includes('/404') &&
        !page.includes('/preview/') &&
        !unpublished.some((u) => page.endsWith(u)),
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
});
