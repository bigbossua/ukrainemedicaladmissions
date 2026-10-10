import type { APIRoute } from 'astro';
import { STAGING, SITE } from '../lib/site';

// robots.txt is generated at build time so a staging build can never be indexed.
export const GET: APIRoute = () => {
  const body = STAGING
    ? `# STAGING BUILD — not for indexing\nUser-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /apply/thank-you/\n\nSitemap: ${SITE.url}/sitemap-index.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
