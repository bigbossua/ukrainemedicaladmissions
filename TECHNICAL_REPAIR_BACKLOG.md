# TECHNICAL_REPAIR_BACKLOG.md

Status key: **REPORTED** = from the brief / earlier audit, not re-checked; **CONFIRMED** / **REFUTED** = verified in session with evidence; **FIXED (staging)** / **FIXED (production)**.

| # | Issue | Status | Evidence / notes | Proposed fix (needs approval) |
|---|---|---|---|---|
| 1 | ~55 sitemap URLs | REPORTED | Sitemap unreachable (network policy). | Inventory from sitemap + Kirby `content/`; classify keep / consolidate / remove. |
| 2 | 14 university pages with a broken, near-identical template | REPORTED | Codebase not available. | Replace with the verified Ternopil-first profile template; unique content per university. |
| 3 | 11 city pages redirecting to a broken placeholder | REPORTED | — | Decide per page: 410, redirect to directory filter, or rebuild if SEMrush shows demand. |
| 4 | 25 unrelated US-county contractor-template folders | REPORTED | — | Confirm no inbound links/equity, then remove with 410s; log in `PAGE_ASSET_REGISTER.md`. |
| 5 | Duplicate www / non-www indexing | REPORTED | Both hosts denied by proxy; cannot test. | 301 one host to the other; canonical tags; one Search Console property. |
| 6 | Roofing-related legal-page content | REPORTED | — | Rewrite privacy / terms for an admissions business (GDPR, data retention). |
| 7 | Contact / estimate forms, no application system | REPORTED | — | See `APPLICATION_SYSTEM_SPEC.md` (not started). |
| 8 | No online application system / Stripe | REPORTED | — | Stage 5–6. |
| 9 | WhatsApp CTAs present (Part 11 rule) | UNKNOWN | Site unreachable. | Remove all; replace with **Apply Online Now**. |
| 10 | Staging environment exposure to search engines | UNKNOWN | No staging URL known. | Verify `noindex` + auth before any build. |
