import type { APIRoute } from 'astro';
import { STAGING, PREVIEW, SITE } from '../lib/site';

// robots.txt is generated at build time so a staging build can never be indexed. /apply/thank-you/ is not disallowed:
// it carries noindex, and a crawler must be able to fetch it to see that (GOOGLE_READINESS_AUDIT.md SEO-05).
export const GET: APIRoute = () => {
  // Staging: do NOT disallow crawling — a crawler must be able to fetch pages to see the noindex
  // meta / X-Robots-Tag; a blanket Disallow would let discovered URLs be indexed as bare entries.
  const body = STAGING || PREVIEW
    ? `# ${STAGING ? 'STAGING' : 'PREVIEW'} BUILD — every page is noindex; no sitemap\nUser-agent: *\nDisallow: /api/\n`
    : `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE.url}/sitemap-index.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
