# BASELINE_REPORT.md — verified current state (Phase A), 2026-10-11

Labels: **VERIFIED** (observed in this session, evidence named) · **OWNER-REPORTED** (stated by the owner, not observed here) · **LOCAL ONLY** (true of the build in this environment, not confirmed on the live host) · **UNVERIFIED** · **NOT PRESENT**.

## 1. Production version and source

| Item | Value | Label |
|---|---|---|
| Deploy branch `production` head | `b2ca3d6` — "Build 4d4e605 (release-20261011-005330)", 45 files, 640,981 bytes, manifest fingerprint `5ff6e7e7cbc219b61f8e4a75f39fd18ed8700e523b0cf516dc2f366a78c033d4` | VERIFIED (fetched from GitHub; identical to the local build) |
| Source commit built | `4d4e605` on `claude/new-session-ppgh22`; site content identical to `71f196b`, which passed CI run #9 | VERIFIED |
| Hostinger deployment of that branch into `public_html/` | "completed successfully" | OWNER-REPORTED — the live host cannot be reached from this environment (§9) |
| Working branch head at the time of this report | `da245c3` + this report's commit | VERIFIED |
| Default branch `main` | still holds only the master brief (`d9a4542`); CI and the publish workflow exist only on the working branch (decision D9) | VERIFIED |

## 2. Pages, sitemap, robots, canonicals, redirects, indexation (production tree)

- 21 built pages. **18 indexable and in the sitemap** (`/`, `/universities/`, `/courses/` + medicine, dentistry, nursing, pharmacy, `/admissions/`, `/tuition-fees/`, `/faq/`, `/about/`, `/services/`, `/contact/`, `/apply/`, `/privacy/`, `/terms/`, `/complaints-policy/`, `/disclosure/`); **3 noindex** (`/404.html`, `/apply/thank-you/`, `/universities/ternopil-national-medical-university/`). VERIFIED in the published tree.
- Every page: self-referencing canonical on `https://ukrainemedicaladmissions.com`, `robots` meta, one `h1`, unique title and description (titles ≤ 70, descriptions 50–165). JSON-LD: Organization (home), FAQPage (FAQ), BreadcrumbList (every breadcrumb page); none on noindex pages. `robots.txt`: `Allow: /`, `Disallow: /api/`, `Disallow: /apply/thank-you/`, sitemap line. VERIFIED (`check-meta`, `check-redirects` over the production tree).
- Redirects in `.htaccess`: host canonicalisation (HTTP→HTTPS, www→apex, host-scoped), `RedirectMatch 301` for `/dentistry-admissions-in-ukraine` → `/courses/dentistry/` and `/document-translation-legalisation` → `/admissions/`; `/services` and `/about` resolve by DirectorySlash. Proven loop-free offline; **live behaviour UNVERIFIED**.
- Indexation controls: unverified university profiles are `noindex`, absent from the sitemap and carry a banner; staging builds (unused) are noindex everywhere.

## 3. University, course, admissions and country pages

| Type | Present | Notes |
|---|---|---|
| University profiles | 1 — Ternopil NMU, **noindex**, 0 of 51 claims verified | Record holds only `unverified`/`not-published` claims; measured search demand: uk admission/fees phrasings 0 (2026-10-10); official name 110/mo in India, 20 uk, 20 ng (R2, 2026-10-11) |
| Course pages | 4 — medicine (482 words), dentistry (326), nursing (354), pharmacy (328) + `/courses/` index | Each links to the directory; no university-specific programme facts because none are verified |
| Admissions | `/admissions/` (535 words): four-stage process, generic document list, no-guarantee statements | No university-specific requirements (none verified) |
| Fees | `/tuition-fees/` (626 words): structure and vocabulary only, **no figures** | Cannot rank for the fees cluster until at least one fee schedule is verified |
| Country pages | NOT PRESENT | Deliberate: no country demand evidence beyond India wording; a trigger is recorded in `KEYWORD_URL_MAP.md` |
| City pages | NOT PRESENT | Deliberate |

## 4. Forms and their actual behaviour

- Two forms (`/apply/` application-start, `/contact/` enquiry) POST to `/api/enquiry.php`. Code-level behaviour (VERIFIED by reading and by `php -S` tests with synthetic data): GET → 405; honeypot filled → 303 to the thank-you page and nothing stored; validation failure → 422; success → JSON record in `<document-root-parent>/uma-private/enquiries/` and a plain-text `mail()` to `info@ukrainemedicaladmissions.com`, then 303 to `/apply/thank-you/`.
- **On the live host: UNVERIFIED** — PHP version, whether `uma-private/` is creatable, and the handler's responses have not been observed.
- **Email delivery: UNVERIFIED and never tested on Hostinger.** No SPF/DKIM check has been possible. Nothing in this project may claim that enquiries reach the inbox until the owner runs the authorised end-to-end test (synthetic enquiry → message received → record present).

## 5. Candidate accounts, profiles, uploads, tracking, administration

**NOT PRESENT.** The site is Stage 1 only (enquiry/application-start). There is no account system, no saved profile, no document upload, no status tracking and no administration interface. Specification: `APPLICATION_SYSTEM_SPEC.md` (Stages 2–4 proposed; §8–§11 added 2026-10-11 for the candidate-profile and readiness service).

## 6. Accessibility, performance, responsive layout, assets, security

| Check | Result | Label |
|---|---|---|
| axe WCAG 2.1 A/AA + best-practice, 21 pages × 2 widths | 0 violations | LOCAL ONLY (CI #9) |
| Lighthouse (mobile emulation) on 5 pages | performance 99–100, accessibility 100, best practices 100, SEO 100 (noindex page exempt) | LOCAL ONLY |
| Playwright smoke, 21 pages × 3 widths | 0 failures; mobile menu opens; no messaging-app strings | LOCAL ONLY |
| Internal links and assets | 33 unique URLs, 0 broken | LOCAL ONLY |
| Security headers (HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, CSP `default-src 'self'`) | present in `.htaccess` | LOCAL ONLY — mod_headers behaviour on the host unverified |
| Exposed files | dotfiles, `.json/.log/.bak/.sql`, `.git` paths denied; directory listings off; `security.txt` served | LOCAL ONLY |
| Live equivalents of all of the above | **not run** | blocked (§9) |

## 7. Analytics and Search Console

- **No analytics is installed** (no GA4/GTM/other tag in the source; the CSP `script-src 'self'` would block a third-party tag until amended). VERIFIED.
- **Search Console:** no verification token in the source; whether a property exists is UNKNOWN to this session (owner to confirm; no GSC connector is available here). No first-party performance data exists yet.
- Consequence: every traffic, ranking or conversion statement in this project is a SEMrush estimate or a hypothesis until GSC (and, if the owner chooses, a privacy-reviewed analytics tool) is connected.

## 8. SEMrush: what exists, what it cost, what is missing

- 10 raw exports (`research/semrush/`), 16 logged requests, **2,240 units at published prices** (`SEMRUSH_API_LEDGER.md`); the account balance has not been read since the owner's 50,000-unit screenshot — **not inferred**.
- Reports used: `phrase_all` (1 phrase, 79 databases), `phrase_these` (uk seeds; 8 variants × 6 databases), `phrase_fullsearch` ("ukraine medical", in + uk, 18 rows each). All metrics re-checked against the CSVs today: every figure cited in `KEYWORD_URL_MAP.md` matches its export.
- Missing (not purchased): SERP/competitor data for any term; related/question keywords; trends; kd/intent outside in/ru; course and programme terms outside uk; nursing/public-health/rehabilitation/preparatory terms (except uk "study nursing in ukraine" 20); university names outside in/uk; city terms; broad match outside in/uk. A costed request is in `KEYWORD_URL_MAP.md` §9 — **requires approval; no call has been made**.

## 9. Live verification blocker — exact status

- **Blocker (VERIFIED):** the cloud environment's network policy denies `ukrainemedicaladmissions.com` and `www.ukrainemedicaladmissions.com` (HTTPS CONNECT refused by the proxy; HTTP: host not resolvable). Official `.ua` university domains and Hostinger are denied likewise. No bypass has been attempted.
- **Unblock (owner, free):** environment menu → Edit → Network access → add the two hosts under Allowed domains (Limited level, package managers left ticked). For admissions verification add the official university domains as well (decision D5).
- **Test command (from `site/`, after `npm run build`):** `npm run verify:live` (script `site/scripts/verify-live.mjs`, added to the branch today; read-only; the only POSTs are an empty form and a honeypot-filled synthetic form, which the handler drops). It writes `tests/output/live/live-report.md` and screenshots.
- **Expected results:** every sitemap URL 200 `text/html` with canonical = URL and no noindex; 43 static files byte-identical to the release manifest; all assets 200 with correct MIME; 4 legacy redirect forms + host redirects → 301 → target, ≤ 2 hops, no loop; unknown URL → 404 with the custom page; `/.git/config`, `/.htaccess`, `/.env`, `/uma-private/` not 200; no directory listing; `security.txt` 200; the six security headers present; `/api/enquiry.php` GET 405, empty POST 422, honeypot POST 303; no console errors, no failed requests, no horizontal overflow at 390 px, axe clean at 390 and 1280 px.
- **Evidence to record:** the report file, the screenshots, and — separately, by the owner — the authorised end-to-end enquiry test proving email delivery.

## 10. Reconciliation of earlier reports

- Earlier audit claims about the legacy site (≈55 URLs, 14 university pages, 11 city pages, contractor folders) remain **neither confirmed nor refuted**; the owner's File Manager showed an empty root, so if DNS points at this server the legacy pages are gone and the redirects protect only old links.
- The decision record (`PROJECT_EXECUTION_PLAN.md`) and all registers are consistent with the exports and the build; no number in them was found to disagree with its source.
