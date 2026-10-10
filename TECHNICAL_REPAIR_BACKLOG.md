# TECHNICAL_REPAIR_BACKLOG.md

Status key: **REPORTED** = from the brief / earlier audit, not re-checked; **CONFIRMED** / **REFUTED** = verified in session with evidence; **SUPERSEDED** = no longer applies once the new site is deployed; **FIXED (staging/production)**.

## Issues from the earlier audit of the old site

The old site's files were **not found** in the `public_html` shown in the owner's File Manager (empty) and the live domain is unreachable from this environment, so none of these can be confirmed or refuted. If the new site replaces the old one entirely, items 1–8 become SUPERSEDED — but only after the real document root is confirmed and backed up (D1).

| # | Issue | Status | Evidence / notes | Resolution in the new site |
|---|---|---|---|---|
| 1 | ~55 sitemap URLs | REPORTED | Sitemap unreachable. | New sitemap has 15 indexable URLs, generated from real pages only. Old URLs need a redirect map once the old sitemap is obtained (preserve equity). |
| 2 | 14 near-identical university template pages | REPORTED | — | One profile template driven by per-university verified data; unverified profiles are noindex and absent from sitemap. |
| 3 | 11 city pages → broken placeholder | REPORTED | — | No city pages until SEMrush evidence exists. Redirect old city URLs to `/universities/` once known. |
| 4 | 25 US-county contractor folders | REPORTED | — | Not carried over. Return 410 once URLs are known. |
| 5 | Duplicate www / non-www | REPORTED | — | `.htaccess` 301s www→non-www and HTTP→HTTPS; canonical tags self-reference. **Untested on Hostinger LiteSpeed** — verify on staging. |
| 6 | Roofing legal content | REPORTED | — | New privacy notice and terms written for this business (draft, legal review pending). |
| 7 | Contact/estimate forms only | REPORTED | — | Stage-1 enquiry/application-start handler implemented and tested with synthetic data. |
| 8 | No application system / Stripe | REPORTED | — | Spec written (`APPLICATION_SYSTEM_SPEC.md`); no payments. |
| 9 | WhatsApp CTAs | UNKNOWN on old site | — | None in new site; UI test fails on any WhatsApp string. |
| 10 | Staging exposure | UNKNOWN | — | Staging plan: HTTP auth + `noindex` header; see `SECURITY_AND_RELEASE_CHECKLIST.md`. |

## New-site backlog

| # | Item | Priority | Notes |
|---|---|---|---|
| N1 | Redirect map from old URLs | High | Needs old sitemap / Search Console export. |
| N2 | Self-host fonts; drop Google Fonts from CSP | **DONE 2026-10-10** | Inter + Inter Tight variable woff2 (latin, latin-ext), 276 KB total, `font-src 'self'`; see `site/FONTS.md`. |
| N3 | Verify `.htaccess` behaviour on Hostinger (LiteSpeed): redirects, headers, 404 page, `.json` block vs `site.webmanifest` | High | Staging test. |
| N4 | `mail()` deliverability on Hostinger (SPF/DKIM for `no-reply@`) | High | Test on staging with a test inbox. |
| N5 | Image pipeline: Astro `<Image>` with WebP/AVIF, attribution record per image | Medium | No images yet beyond logos; see `brand/BRAND_GUIDELINES.md` §6. |
| N6 | Accessibility audit with axe (automated) | **DONE 2026-10-10** | `npm run test:a11y` (WCAG 2.1 A/AA + best-practice, 18 pages × 2 widths, mobile menu open) in CI. First run found 2 real defects, both fixed: inner-page eyebrow blue-on-navy; mobile-menu CTA text navy-on-blue (scoped-CSS specificity). Manual keyboard/screen-reader pass still outstanding (N9). |
| N9 | Manual keyboard + screen-reader pass (NVDA/VoiceOver) on staging | Medium | Automated axe cannot cover focus order semantics fully. |
| N7 | Lighthouse performance budget in CI | Low | After fonts are self-hosted. |
| N8 | Decap CMS (free) for non-technical editing of `src/content` | Later | Succession requirement. |
