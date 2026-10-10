// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// University profiles whose data is not yet verified (verification.publishable = false)
// are built (noindex) but must never be listed in the sitemap.
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
  integrations: [
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
