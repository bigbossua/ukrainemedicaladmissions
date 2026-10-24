# Google readiness audit (local, production build)

## Update 2026-10-24: the three low findings (no audit repeated)

Baseline: CI [run 40057578714](https://github.com/bigbossua/ukrainemedicaladmissions/actions/runs/40057578714) is green on `ed12cdc`. Re-measured with `npm run test:seo` on the branch head; no new SEMrush units.

| Finding | Outcome | Reason |
|---|---|---|
| SEO-03: tap targets under the 44 px AAA advisory size (all already passed the 24 px AA minimum) | **Fixed.** These standalone links and controls are now at least 44 px tall: the header logo link, breadcrumbs, footer links (also 44 px wide), card links, the sidebar and "next steps" link lists, small buttons, the FAQ toggles (the whole closed card is the toggle; the layout does not move) and standalone e-mail links | Shared components only, CSS only. Inline links inside sentences are exempt under WCAG and unchanged |
| SEO-01: the dentistry and pharmacy course pages share 34 % of their text (5-word shingles) | **Accepted, low** | The shared part is the verification checklist both courses need. Each page targets its own cluster (`KEYWORD_URL_MAP.md` §1). The overlap is below the 50 % medium threshold. Rewriting copy only to lower the number would add unsupported text. The pharmacy merge stays your decision (no measured demand) |
| SEO-02: no `<lastmod>` in the sitemap | **Accepted, low** | Google uses `lastmod` only when it is consistently accurate. No accurate per-page date exists: CI checks out one commit, and a build date would be wrong for unchanged pages. On the first release every URL is new, and submitting the sitemap (`OWNER_ACTION_SHEET.md` §3) asks Google to crawl it. Revisit after the release if needed |

## Consolidated Google-readiness audit (2026-10-17)

**Scope and evidence.** Working branch `claude/university-profile-pipeline` at `6b82acc` (site code identical to release candidate `485ac4c`). Local evidence: production build, `npm run test:seo` (`site/tests/output/seo-audit.json`, 106 URLs requested, 37 pages, 80 output files scanned), the full `npm test` suite, and CI [run 38925745895](https://github.com/bigbossua/ukrainemedicaladmissions/actions/runs/38925745895) (green, including the release-gate dry run). **Live evidence: none.** This environment cannot reach `ukrainemedicaladmissions.com` (proxy refusal, 2026-10-16), and the live site still serves the 11 October release (`b2ca3d6`), not this branch. So nothing below claims live Google readiness.

**Verdict.** The release candidate is technically ready for Google on every check that can run locally: 0 high, 0 medium and 3 accepted low issues. What stands between it and Google is not technical: the release gate refuses publication until the 38 owner legal items are supplied and reviewed (`OWNER_ACTION_SHEET.md` §2.0); after the deploy come the live checks and Search Console, which only run against the live host.

### Prioritised actions

| Priority | Action | Owner | Why |
|---|---|---|---|
| P0 | Supply the 38 legal items and the legal review (`OWNER_ACTION_SHEET.md` §2.0) | You and your reviewer | The release gate refuses publication without them; nothing below can happen before |
| P0 | Pause the live forms until the release (`OWNER_ACTION_SHEET.md` §6) | You (hPanel) | The live notice is inaccurate and the live handler stores an undisclosed reversible IP code |
| P0 | Release: backup, private config, approval, deploy (`OWNER_ACTION_SHEET.md` §7) | You approve; I run the gate and move the pointer | Gets this branch, not the 11 October build, in front of Google |
| P1 | Search Console: domain property (DNS TXT record at your registrar, or the HTML-tag route via `SEARCH_CONSOLE_VERIFICATION` and a rebuild), then submit `https://ukrainemedicaladmissions.com/sitemap-index.xml` (`OWNER_ACTION_SHEET.md` §3) | You | Indexing and coverage are only visible there |
| P1 | Live checks: `npm run verify:live` (status codes, redirects, HTTPS, headers and CSP on live responses, release integrity, private paths blocked) | Me, once the two production hosts are allowed; or you | Confirms the deploy matches the tested build |
| P1 | E-mail delivery test for both forms (`EMAIL_DELIVERY_VERIFICATION.md` §4–7) | Me (submissions) and you (mailbox) | Forms are the conversion path |
| P2 | Official-source access (`OWNER_ACTION_SHEET.md` §1, P1 and P2 host lists) | You | Verified profiles are the only pages with steady name demand that can become indexable; today all 17 stay noindex |
| P3 | Optional: accurate sitemap `<lastmod>` (needs full git history in CI and the publish workflow; little value for 18 URLs); a 301 for `/sitemap.xml` (needs the redirect-safety test to accept file targets: not done, the test is part of the gate); a 301 for `/index.html` (its canonical already consolidates it); the pharmacy page merge (your decision, no measured demand) | — | Low value or needs a decision |

### Area by area

| Area | Confirmed locally | Defects | Cannot be verified here |
|---|---|---|---|
| Crawl, index, robots, sitemap, canonicals | 18 indexable pages answer 200 with a self-canonical and `index, follow`; robots.txt names `/sitemap-index.xml`; sitemap lists exactly the 18; 17 research previews are `noindex, follow`, outside the sitemap, with no structured data; preview builds are entirely noindex (gate check); parameter URLs (`?q=`, `utm_`, `?ref=`, `?course=`) canonicalise to the clean URL; `/index.html` canonicalises to `/` | None open. Low: no `<lastmod>` (P3) | Google's crawl, the live robots.txt and sitemap responses, indexing |
| Titles, descriptions, H1s | Every indexable page: one H1, title ≤ 60, description ≤ 160, distinct; titles carry their SEMrush clusters (table below) | None | How Google rewrites snippets |
| Internal links, breadcrumbs, orphans | 0 broken internal links (66 targets); every page within 1 click of `/`; no orphans; BreadcrumbList on every inner page; `/terms/` is linked only from the footer (fine for a legal page) | None | — |
| Structured data | Organization (512 px logo, slash-terminated URLs) and WebSite on `/`; FAQPage text identical to the visible FAQ; no structured data on previews or drafts; no claims about universities | None | Rich-result eligibility in Search Console |
| Mobile, accessibility, performance | 37 pages × 3 widths with 0 failures and no horizontal scroll; axe 0 violations (37 pages × 2 widths and 14 apply-form states; preview build too); Lighthouse mobile 97–100, LCP about 2.0–2.3 s, CLS 0, TBT 0 ms (local runs, simulated) | None. Advisory: some tap targets under the 44 px AAA size (all pass the 24 px AA minimum) | Field Core Web Vitals (CrUX) and real devices |
| Links, redirects, 404/410, duplicates | 2 legacy 301s, loop-safe (redirect test); unknown URLs answer 404 with noindex and no canonical; no 410 rules (nothing retired needs one); dentistry and pharmacy pages 34 % similar (accepted low); previews 94 % alike but noindex | None open | Live redirect chains and HTTPS rules (`verify:live`) |
| Images | The only `<img>` elements on indexable pages are the header and footer logos (SVG, at most 17.8 KB, each with alt text, width and height); every illustration is inline SVG; no raster images, so no format or weight issue; the footer logo is not lazy-loaded (negligible at this size) | None | — |
| Forms, privacy, headers, e-mail | Honeypot, timing field and server validation; 429 rate limits; mail failures logged and recorded; no uploads; CSP `script-src 'self'`, `object-src 'none'`, HSTS, nosniff, frame and referrer policies on every response in the local stand-in (156 checks) | **Release-blocking:** legal pages are drafts (38 owner items). **Live risk:** the live site's old notice and handler (`OWNER_ACTION_SHEET.md` §6) | Real e-mail delivery, SPF/DKIM/DMARC, live headers |
| Search Console | Runbook ready (domain property first; sitemap after release); verification tag prepared and off | — | Verification, coverage, indexing: only after the release and your verification |

### SEMrush evidence used (validated 2026-10-17 against the export rows; no new calls)

| URL | Cluster | Figures (database, report, file) |
|---|---|---|
| `/tuition-fees/` (P0) | fees | "ukraine medical college fees" 590, KD 12 (in, broad: `2026-10-10-phrase_fullsearch-in-ukraine-medical.csv`); "…fees for indian students" 2,900, KD 9 (in, broad lead, same file); fee phrasings bring 69 % of the leading competitor's estimated Ukraine traffic (`2026-10-12-resource_organic-in-rmcedu-ukraine-urls.csv`) |
| `/universities/` (P1) | list / best | "ukraine medical college" 2,900, KD 22 (in, broad: same fullsearch file); "best medical college in ukraine" 390, KD 14; "ukraine medical college list" 210, KD 11; exact "medical universities in ukraine" 20 (in, ng, pk, ae: `2026-10-10-phrase_these-*-variants.csv`) |
| `/courses/medicine/` (P1) | MBBS | exact "mbbs in ukraine" 260, KD 18 (in: `2026-10-10-phrase_these-in-variants.csv`); "ukraine mbbs college" 480, KD 7 (in, related: `2026-10-11-P3-phrase_related-in-mbbs-in-ukraine.csv`) |
| `/admissions/` (P1) | eligibility | "mbbs in ukraine eligibility" 30 (in: `2026-10-11-R1-phrase_these-in-programme-terms.csv`); "is neet required for mbbs in ukraine" 20 (in, questions) |
| `/faq/` (P2) | validity | "is ukraine mbbs valid in india" 20 (in: R1 and P3 questions files) |
| `/courses/dentistry/`, `/courses/nursing/` | programme | "study dentistry in ukraine" 30 (in, R1); "study nursing in ukraine" 20 (uk, R1) |
| `/courses/pharmacy/` | — | no measured demand (R1): kept pending your merge decision |

Broad and related figures are leads, not exact demand, and overlapping variants are never added. `python3 site/scripts/check-seo-figures.py SEO_PAGE_PLAN.md KEYWORD_URL_MAP.md SITE_GAP_ANALYSIS.md`: 308 figures, 0 problems. No new pages are justified: the page plan's open items each need verified evidence or your decision (`SEO_PAGE_PLAN.md` §5–6).

---

*The sections below are the record of the first run (12 October) and its re-runs; several of their points no longer apply.*

- **Date:** 12 October 2026 (run finished 09:11 UTC)
- **Commit audited:** `f86363c0a48459407cdbd4851f6f4efd79cf7a1d` on `claude/university-profile-pipeline`
- **Build audited:** a clean production build of that commit (`git archive f86363c site`, then `astro build` with no staging or preview flags). It is byte-identical (`diff -r`) to `site/dist` as built at 08:59 UTC.
- **Tool:** `site/scripts/seo-audit.mjs` (`npm run audit:seo`), output `site/tests/output/seo-audit.json`.
- **Result:** 0 high, 1 medium, 7 low issues. Exit code 0.

Why `--dist` was used: other sessions were editing university records and evidence files in this working tree while the audit ran (uncommitted, not yet built). That made `site/dist` look "older than its sources" by file time, although its content still matched `f86363c` exactly. So the final run used `node scripts/seo-audit.mjs --dist <clean build of f86363c>`. After the next commit, rebuild and re-run: `cd site && UMA_CACHE_DIR=$(mktemp -d) npm run build && npm run audit:seo`.

## Verdict in plain words

On this build, nothing local would stop Google indexing an intended page, and no private or unverified data is served. All 18 indexable pages answer 200, carry a self-referencing canonical and `index, follow`, are crawlable under robots.txt and are in the sitemap. The sitemap lists nothing else. The 12 university research previews and the thank-you page are `noindex`, out of the sitemap and carry no structured data. Structured data matches the visible page (FAQ, breadcrumbs). The security headers match the `.htaccess` on every page. No horizontal scrolling at 360 or 390 px, and no tap target fails the WCAG 2.2 AA 24 px minimum. Lighthouse (mobile) scores 98 to 100 for performance and 100 for accessibility, best practices and SEO on every indexable page.

What is left: two indexable pages are thin (`/contact/` 95 words, `/courses/` 172 words). The rest is polish: ten titles over 60 characters, two descriptions 1 to 2 characters over 160, the 404 page's canonical, no `<lastmod>` in the sitemap, robots.txt blocking the noindex thank-you page, and tap targets under the 44 px advisory size.

## Method

1. **Server.** `php -S 127.0.0.1:<port> -t <build> tests/fixtures/live-router.php`. The router reads the build's own `.htaccess` (a byte copy of `site/public/.htaccess`) and applies it: `Header always set`, the canonical-host `RewriteRule`, the `.git` block, `RedirectMatch` (legacy 301s and the `uma-private` 404), `DirectorySlash`, `Options -Indexes`, `ErrorDocument 404` and the `<Files>` blocks. It runs `api/enquiry.php` with a temporary private directory whose config sets `send_mail` to false. Nothing was e-mailed or stored.
2. **Requests.** Every URL was requested with plain `node:http`, so redirects were not followed automatically. Each hop was requested and recorded, and a Location on the HTTPS production host was continued on the local server.
3. **URL set (96 URLs).** Included every `dist/**/index.html` (31 pages); every `<loc>` in `sitemap-index.xml` → `sitemap-0.xml` (18); the legacy and private `RedirectMatch` sources, each with and without the trailing slash; the `.git` `RewriteRule` sources; `/robots.txt`, `/sitemap-index.xml`, `/sitemap-0.xml` and `/sitemap.xml`; two 404 probes; `GET /api/enquiry.php`; `/uma-private/`, `/uma-private/config.php`, `/.git/config`, `/.git/HEAD` and `/.htaccess`; `/index.html`, `/api/` and `/_astro/`; the static assets; every page without its trailing slash (30); and six Host-header requests (apex over HTTP, www, a legacy URL over HTTP, and the staging host). Then all 47 internal link targets found on the pages were requested as well.
4. **Pages.** Each 200 HTML page and the 404 page was loaded in Playwright Chromium (1280×900) to read the rendered DOM. Canonical and robots were also read from the raw HTML and compared. Checks per page: the sitemap contract (indexable ⇔ in sitemap); title (≤ 60 ideal, ≤ 70 maximum, unique); meta description (50 to 160 characters, unique); exactly one H1; no skipped heading levels; word count of `<main>`; thin content under 300 words for indexable pages (legal pages and `/apply/` noted, not failed); internal links out and the hops they produce, including `#fragment` targets and form actions; inbound links from other pages (orphans); duplicate content by 5-word shingle Jaccard of `<main>` against every other page (medium at 50% or more against an indexable page, low at 30% or more); JSON-LD (parses, `@context`, `@type`, FAQPage questions and answers present in the visible text, BreadcrumbList names, order and URLs matching the visible breadcrumb, Organization and WebSite fields, none on research previews); `lang`; viewport; Open Graph and Twitter card, with `og:image` resolving; images (alt, width and height, resolving); inline scripts and handlers (blocked by `script-src 'self'`); console and CSP errors; and every `Header always set` value from the `.htaccess`.
5. **Exposure scan.** All 74 output files were scanned, not just HTML: dotfiles, PHP, XML, CSS, JS, SVG, fonts and images. Patterns: `data/evidence`, `researchReferences`, `search snippet` / `Search-snippet`, `NOT verified`, `CANARY`, `openQuestions`, staging and local hosts, source maps (`.map`, `sourceMappingURL`), `.git`, `uma-private`, test fixture paths, any e-mail address other than `info@ukrainemedicaladmissions.com`, phone numbers (including `tel:`), and WhatsApp. A hit counts as an exposure only if the file is served and the served body contains it. Hits in files that are not served as written (the `.htaccess` answers 403; PHP is executed) are listed as notes.
6. **Mobile.** Playwright at 360 and 390 px (mobile emulation, touch, DPR 2), every page plus the 404 page. Checks: horizontal overflow, and tap targets (links, buttons, form controls, `summary`) of at least 24 px. The WCAG 2.5.8 inline-link exception and spacing exception were applied. Targets under 44 px are reported as advisory.
7. **Lighthouse 13.5.0.** Default config: mobile form factor, simulated throttling. Run through chrome-launcher on Playwright's Chromium, against the same PHP stand-in so the real headers apply. Covered all 18 indexable URLs plus one research preview. A page under 90 for performance would be measured a second time; none needed it.
8. **Proof that the checks fire.** A mutated copy of the build was audited. It had: a broken link; a phone number; a second e-mail address and "WhatsApp" text; `researchReferences` on a page; a research preview made indexable and given JSON-LD; one FAQ question changed; one canonical removed; an inline script; and one breadcrumb name changed. The audit reported 11 high and 3 medium issues for these (plus the existing medium for thin content), all as expected, and exited 1.

## What these local checks can and cannot prove

They **can** show what the built files and this `.htaccess` do, under an emulation of the host's rules. That covers status codes, redirects, headers, markup, structured data, links, sitemap and robots consistency, leaked strings, mobile layout in Chromium, and lab performance.

They **cannot** show any of the following, and nothing here should be read as if they do:

- **No live host.** The real server (Hostinger, Apache or LiteSpeed) was not contacted, so nothing about TLS, certificates, HTTP/2, compression, caching headers or the host's own MIME table is tested. The router always reports HTTPS as off. That is why `http://` → `https://` and `www` → apex can be shown only by sending a Host header to the stand-in. `https://www…` cannot be shown at all. On the live host, `scripts/verify-live.mjs` covers these.
- **No Search Console.** There is no evidence of verification, sitemap submission, coverage, "Crawled – currently not indexed", manual actions or rich-result eligibility as Google judges it.
- **No indexing data.** No proof that any page is, or will be, indexed or ranked. Passing these checks removes local blockers. It does not mean Google will index or rank the pages.
- **No field data.** Lighthouse numbers are lab figures (simulated slow 4G, emulated mid-range phone) from a local server. They are not Chrome UX Report or Core Web Vitals field data.
- **External links.** The pages contain none. Even so, this environment refuses outbound hosts, so none could have been checked.
- **University facts.** This audit checks markup and exposure, not facts. No university fact was checked or verified. The research previews stay noindex because no evidence entry from an official source supports any of their facts.

## Pages (URL by URL)

"Inbound (all / body)" counts the distinct other pages that link to the URL, then the ones whose link is inside `<main>`. "Top duplicate" is the highest 5-word-shingle Jaccard of `<main>` text against any other page. "LH" is Lighthouse mobile performance / accessibility / SEO. Only one research preview was run, by design. Its SEO score of 69 is the `noindex` itself (`is-crawlable`), which is intended.

| URL | Status | Indexable | In sitemap | Title / desc. chars | Words in `<main>` | Inbound (all / body) | Top duplicate | JSON-LD types | LH perf / a11y / SEO | Issues |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | 200 | yes | yes | 55 / 145 | 713 | 30 / 29 | 6.5% /admissions/ | Organization, WebSite | 99 / 100 / 100 | SEO-07 |
| `/about/` | 200 | yes | yes | 37 / 160 | 302 | 30 / 13 | 3.5% /services/ | BreadcrumbList | 99 / 100 / 100 | SEO-07 |
| `/admissions/` | 200 | yes | yes | 70 / 150 | 1007 | 30 / 25 | 6.5% / | BreadcrumbList | 99 / 100 / 100 | SEO-07, SEO-08 |
| `/apply/` | 200 | yes | yes | 66 / 160 | 1148 | 30 / 25 | 5.4% / | BreadcrumbList | 98 / 100 / 100 | SEO-07, SEO-08 |
| `/apply/thank-you/` (noindex) | 200 | no | no | 69 / 123 | 173 | 0 / 0 | 5.3% /services/ | none | — | SEO-05, SEO-07 |
| `/complaints-policy/` | 200 | yes | yes | 46 / 108 | 322 | 30 / 1 | 6.2% /terms/ | BreadcrumbList | 100 / 100 / 100 | SEO-07 |
| `/contact/` | 200 | yes | yes | 39 / 110 | 95 | 30 / 3 | 0.9% /apply/ | BreadcrumbList | 99 / 100 / 100 | SEO-01, SEO-07 |
| `/courses/` | 200 | yes | yes | 66 / 156 | 172 | 30 / 5 | 6.3% / | BreadcrumbList | 99 / 100 / 100 | SEO-01, SEO-07, SEO-08 |
| `/courses/dentistry/` | 200 | yes | yes | 68 / 161 | 364 | 2 / 2 | 33.6% /courses/pharmacy/ | BreadcrumbList | 99 / 100 / 100 | SEO-03, SEO-04, SEO-07, SEO-08 |
| `/courses/medicine/` | 200 | yes | yes | 61 / 153 | 543 | 5 / 5 | 14.4% /courses/pharmacy/ | BreadcrumbList | 99 / 100 / 100 | SEO-07, SEO-08 |
| `/courses/nursing/` | 200 | yes | yes | 68 / 160 | 366 | 2 / 2 | 25.4% /courses/pharmacy/ | BreadcrumbList | 99 / 100 / 100 | SEO-07, SEO-08 |
| `/courses/pharmacy/` | 200 | yes | yes | 69 / 162 | 355 | 2 / 2 | 33.6% /courses/dentistry/ | BreadcrumbList | 99 / 100 / 100 | SEO-03, SEO-04, SEO-07, SEO-08 |
| `/disclosure/` | 200 | yes | yes | 65 / 128 | 254 | 30 / 3 | 10.3% /terms/ | BreadcrumbList | 100 / 100 / 100 | SEO-07, SEO-08 |
| `/faq/` | 200 | yes | yes | 69 / 136 | 1044 | 30 / 17 | 4.5% /admissions/ | FAQPage, BreadcrumbList | 99 / 100 / 100 | SEO-07, SEO-08 |
| `/privacy/` | 200 | yes | yes | 43 / 120 | 897 | 30 / 2 | 8.3% /terms/ | BreadcrumbList | 99 / 100 / 100 | SEO-07 |
| `/services/` | 200 | yes | yes | 41 / 156 | 406 | 30 / 2 | 5.3% /apply/thank-you/ | BreadcrumbList | 99 / 100 / 100 | SEO-07 |
| `/terms/` | 200 | yes | yes | 41 / 80 | 323 | 30 / 0 | 10.3% /disclosure/ | BreadcrumbList | 99 / 100 / 100 | SEO-07 |
| `/tuition-fees/` | 200 | yes | yes | 62 / 160 | 1064 | 30 / 23 | 1.7% /faq/ | BreadcrumbList | 99 / 100 / 100 | SEO-07, SEO-08 |
| `/universities/` | 200 | yes | yes | 57 / 151 | 824 | 30 / 24 | 4.2% / | BreadcrumbList | 99 / 100 / 100 | SEO-07 |
| `/universities/bogomolets-national-medical-university/` (research preview, noindex) | 200 | no | no | 56 / 131 | 622 | 2 / 2 | 94.2% /universities/kharkiv-national-medical-university/ | none | 99 / 100 / 69 | SEO-07 |
| `/universities/bukovinian-state-medical-university/` (research preview, noindex) | 200 | no | no | 53 / 128 | 622 | 2 / 2 | 94.2% /universities/dnipro-state-medical-university/ | none | — | SEO-07 |
| `/universities/danylo-halytsky-lviv-national-medical-university/` (research preview, noindex) | 200 | no | no | 66 / 141 | 630 | 2 / 2 | 93.7% /universities/bogomolets-national-medical-university/ | none | — | SEO-07 |
| `/universities/dnipro-state-medical-university/` (research preview, noindex) | 200 | no | no | 49 / 124 | 622 | 2 / 2 | 94.2% /universities/bukovinian-state-medical-university/ | none | — | SEO-07 |
| `/universities/ivano-frankivsk-national-medical-university/` (research preview, noindex) | 200 | no | no | 61 / 136 | 622 | 2 / 2 | 93.9% /universities/bogomolets-national-medical-university/ | none | — | SEO-07 |
| `/universities/kharkiv-national-medical-university/` (research preview, noindex) | 200 | no | no | 53 / 128 | 622 | 2 / 2 | 94.2% /universities/bogomolets-national-medical-university/ | none | — | SEO-07 |
| `/universities/odesa-national-medical-university/` (research preview, noindex) | 200 | no | no | 51 / 126 | 622 | 2 / 2 | 94.2% /universities/bogomolets-national-medical-university/ | none | — | SEO-07 |
| `/universities/poltava-state-medical-university/` (research preview, noindex) | 200 | no | no | 50 / 125 | 622 | 2 / 2 | 94.2% /universities/bukovinian-state-medical-university/ | none | — | SEO-07 |
| `/universities/ternopil-national-medical-university/` (research preview, noindex) | 200 | no | no | 54 / 129 | 622 | 2 / 2 | 94.2% /universities/bogomolets-national-medical-university/ | none | — | SEO-07 |
| `/universities/uzhhorod-national-university/` (research preview, noindex) | 200 | no | no | 46 / 121 | 618 | 2 / 2 | 92.3% /universities/bogomolets-national-medical-university/ | none | — | SEO-07 |
| `/universities/vinnytsia-national-pirogov-memorial-medical-university/` (research preview, noindex) | 200 | no | no | 66 / 147 | 630 | 2 / 2 | 92.5% /universities/bogomolets-national-medical-university/ | none | — | SEO-07 |
| `/universities/zaporizhzhia-state-medical-and-pharmaceutical-university/` (research preview, noindex) | 200 | no | no | 68 / 149 | 630 | 2 / 2 | 91.9% /universities/uzhhorod-national-university/ | none | — | SEO-07 |
| `/seo-audit-no-such-page/ (404 page)` | 404 | no | no | 43 / 138 | 31 | — | 0.5% /courses/ | none | — | SEO-02, SEO-07 |

## Other URLs (redirects, rules, probes)

Locations shown as a path were absolute `http://127.0.0.1:<port>/…` on the stand-in. On the live host, Apache gives the same rule an absolute `https://ukrainemedicaladmissions.com/…` Location.

| URL | Why requested | Hops (each requested, none followed automatically) | Result |
|---|---|---|---|
| `/dentistry-admissions-in-ukraine` | legacy redirect: RedirectMatch 301 ^/dentistry-admissions-in-ukraine/?$ /courses/dentistry/ | 301 → /courses/dentistry/ · 200 | ok: one 301 hop to an indexable 200 page |
| `/dentistry-admissions-in-ukraine/` | legacy redirect: RedirectMatch 301 ^/dentistry-admissions-in-ukraine/?$ /courses/dentistry/ | 301 → /courses/dentistry/ · 200 | ok: one 301 hop to an indexable 200 page |
| `/document-translation-legalisation` | legacy redirect: RedirectMatch 301 ^/document-translation-legalisation/?$ /admissions/ | 301 → /admissions/ · 200 | ok: one 301 hop to an indexable 200 page |
| `/document-translation-legalisation/` | legacy redirect: RedirectMatch 301 ^/document-translation-legalisation/?$ /admissions/ | 301 → /admissions/ · 200 | ok: one 301 hop to an indexable 200 page |
| `/uma-private` | RedirectMatch 404: RedirectMatch 404 ^/uma-private(/.*)?$ | 404 | ok: private storage path answers 404 |
| `/uma-private/` | RedirectMatch 404; probe: RedirectMatch 404 ^/uma-private(/.*)?$ | 404 | ok: private storage path answers 404 |
| `/uma-private/seo-audit-probe` | RedirectMatch 404: RedirectMatch 404 ^/uma-private(/.*)?$ | 404 | ok: private storage path answers 404 |
| `/.git` | rewrite rule: RewriteRule (^\|/)\.git(/\|$) - [F,L] | 403 | ok: Git path refused (403) |
| `/.git/` | rewrite rule: RewriteRule (^\|/)\.git(/\|$) - [F,L] | 403 | ok: Git path refused (403) |
| `/.git/config` | rewrite rule; probe: RewriteRule (^\|/)\.git(/\|$) - [F,L] | 403 | ok: Git path refused (403) |
| `/seo-audit-dir/.git` | rewrite rule: RewriteRule (^\|/)\.git(/\|$) - [F,L] | 403 | ok: Git path refused (403) |
| `/seo-audit-dir/.git/` | rewrite rule: RewriteRule (^\|/)\.git(/\|$) - [F,L] | 403 | ok: Git path refused (403) |
| `/seo-audit-dir/.git/config` | rewrite rule: RewriteRule (^\|/)\.git(/\|$) - [F,L] | 403 | ok: Git path refused (403) |
| `/robots.txt` | probe | 200 | ok: text/plain; Sitemap: https://ukrainemedicaladmissions.com/sitemap-index.xml |
| `/sitemap-index.xml` | probe | 200 | ok: application/xml |
| `/sitemap-0.xml` | probe | 200 | ok: application/xml |
| `/sitemap.xml` | probe | 404 | not built; robots.txt names /sitemap-index.xml (note only) |
| `/seo-audit-no-such-page/` | probe | 404 | ok: 404 with the 404 page (noindex) |
| `/seo-audit-no-such-file.html` | probe | 404 | ok: 404 with the 404 page (noindex) |
| `/api/enquiry.php` | probe | 405 | ok: 405, X-Robots-Tag "noindex, nofollow", nothing stored |
| `/uma-private/config.php` | probe | 404 | ok: 404 |
| `/.git/HEAD` | probe | 403 | ok: 403 |
| `/.htaccess` | probe | 403 | ok: 403 |
| `/index.html` | probe | 200 | serves the home page; its canonical points to / (note only) |
| `/.well-known/security.txt` | probe | 200 | ok: text/plain;charset=UTF-8 |
| `/site.webmanifest` | probe | 200 | ok: application/manifest+json |
| `/favicon.ico` | probe | 200 | ok: image/vnd.microsoft.icon |
| `/api/` | probe | 403 | ok: no directory listing (403) |
| `/_astro/` | probe | 403 | ok: no directory listing (403) |
| `http://ukrainemedicaladmissions.com/` | host rule: http -> https (apex) | 301 → https://ukrainemedicaladmissions.com/ · 200 | ok: one 301 hop to the HTTPS apex |
| `http://ukrainemedicaladmissions.com/about/` | host rule: http -> https (apex) | 301 → https://ukrainemedicaladmissions.com/about/ · 200 | ok: one 301 hop to the HTTPS apex |
| `http://www.ukrainemedicaladmissions.com/` | host rule: www -> apex | 301 → https://ukrainemedicaladmissions.com/ · 200 | ok: one 301 hop to the HTTPS apex |
| `http://www.ukrainemedicaladmissions.com/services/` | host rule: www -> apex | 301 → https://ukrainemedicaladmissions.com/services/ · 200 | ok: one 301 hop to the HTTPS apex |
| `http://ukrainemedicaladmissions.com/dentistry-admissions-in-ukraine` | host rule: http legacy URL (two hops) | 301 → https://ukrainemedicaladmissions.com/dentistry-admissions-in-ukraine · 301 → /courses/dentistry/ · 200 | ok, two hops (host rule, then legacy rule); Google follows both |
| `http://staging.ukrainemedicaladmissions.com/` | host rule: staging host must NOT be sent to production | 200 | ok: staging host is not sent to production |
| every page without its trailing slash (30 URLs, e.g. `/about`) | DirectorySlash | 301 → …/ · 200 | ok: one 301 hop to the slashed URL |

## Checks that passed on every applicable URL

- **Sitemap contract.** 18 indexable pages, 18 sitemap URLs, the same set. Every `<loc>` is `https://ukrainemedicaladmissions.com/…` and answers 200 with a self canonical. No noindex page is in the sitemap. robots.txt names `https://ukrainemedicaladmissions.com/sitemap-index.xml`, which answers 200 and points to `sitemap-0.xml`.
- **Canonical and robots.** One canonical per page, the same in the raw HTML and the rendered DOM, equal to the page's production URL on all 31 built pages. Indexable pages say `index, follow, max-image-preview:large`. The research previews say `noindex, follow` and the thank-you page `noindex, nofollow`. No page sends `X-Robots-Tag`. `GET /api/enquiry.php` sends `noindex, nofollow` and answers 405.
- **Titles and descriptions.** All present, one of each per page, all unique. No title is over 70 characters. Descriptions are 80 to 162 characters (see SEO-03).
- **Headings.** Exactly one H1 on all 32 pages, including the 404. No skipped heading levels.
- **Links.** 47 internal link targets, all 200 with no redirect hop. All `#fragment` targets exist. Every form action (`/api/enquiry.php`) exists. No `javascript:`, `tel:` or `sms:` links, and no external links. No orphan: every indexable page has at least 2 inbound links from other pages.
- **Duplicate content.** Highest match between indexable pages: 33.6% (`/courses/dentistry/` ↔ `/courses/pharmacy/`, SEO-04). The research previews match each other at 91.9 to 94.2%, because they share one template and have no verified facts. They are noindex, so this is not an indexing problem; it matters only when a profile is published.
- **Structured data.** All 20 JSON-LD blocks parse, with `@context` schema.org and a `@type`. Home page: Organization (name, url, logo `/brand/uma-emblem-light.svg` answers 200 `image/svg+xml`, email `info@ukrainemedicaladmissions.com`) and WebSite (name, url). `/faq/`: FAQPage with 16 questions; all 16 questions and all 16 answers appear in the visible text. 17 pages have a BreadcrumbList whose names, order and URLs match the visible breadcrumb. No structured data on any research preview, the thank-you page or the 404 page.
- **Page basics.** `lang="en"`, `width=device-width` viewport, and og:title, og:description, og:url (equal to the canonical), og:image (`/og-default.png`, 200 `image/png`), og:type and twitter:card on every page. Every `<img>` has alt, width and height, and resolves.
- **Security headers** (on every page and on the 404): `Content-Security-Policy` exactly as in the `.htaccess`, with `script-src 'self'` and no `unsafe-inline` for scripts; `Strict-Transport-Security: max-age=31536000; includeSubDomains`; `X-Content-Type-Options: nosniff`; `Referrer-Policy: strict-origin-when-cross-origin`; `X-Frame-Options: SAMEORIGIN`; `Permissions-Policy: camera=(), microphone=(), geolocation=()`. No inline script, no inline handler, and no console or CSP error on any page.
- **Exposure scan** (74 files): nothing served. Five hits sit in files that are not served as written. `/.htaccess` (answers 403) has comments and rules naming `.git` and `uma-private`. `/api/enquiry.php` (executed by PHP; GET answers 405 with no source) has the private storage path `…/uma-private` and the sending address `no-reply@ukrainemedicaladmissions.com`, which is the From address of the owner's notification e-mail. Neither file's body reaches a visitor.
- **Redirects and private paths.** Both legacy URLs (with and without the slash) go to an indexable 200 page in one 301. Every page without its trailing slash goes to the slashed URL in one 301. `/uma-private…` answers 404. `.git` paths and `/.htaccess` answer 403. `/api/` and `/_astro/` answer 403 (no listing). The Host-header requests show one 301 to the HTTPS apex for the apex over HTTP and for www. A legacy URL over HTTP takes two hops (host rule, then legacy rule), which Google follows. The staging host is not sent to production.
- **Mobile, 360 and 390 px.** No horizontal overflow on any of the 32 pages. 19 to 47 tap targets per page. 15 to 28 per page are under 24 px in one dimension (footer links, breadcrumb "Home"), and every one passes the WCAG 2.5.8 spacing exception (for example, footer links are 17 px tall at a 29 px pitch, so 24 px circles do not overlap). Inline links in sentences are exempt. No failures.

## Lighthouse (mobile emulation, simulated throttling, Lighthouse 13.5.0)

| Pages | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| 18 indexable URLs | 98–100 | 100 | 100 | 100 | 1801–2310 ms | 0–0.043 | 0 ms |
| 1 research preview (`/universities/bogomolets-national-medical-university/`) | 99 | 100 | 100 | 69 (only `is-crawlable`: the intended noindex) | 2102 ms | 0 | 0 ms |

Slowest LCP: `/apply/` (2310 ms). The only layout shift: `/universities/` (CLS 0.043, under the 0.1 threshold). Page weight is 169 to 224 KB. Lighthouse reported no failing SEO, accessibility or best-practice audit on any indexable page.

## Issues

Severity guide. **High:** would stop Google indexing an intended page, leak private or unverified data, break the canonical and sitemap contract, or block a user. **Medium:** likely to hurt ranking or understanding. **Low:** polish. File and line references are to the current working tree; the quoted code anchors the line if it moves.

| ID | URL(s) | Severity | Evidence (exact values) | Proposed fix (file:line) | Status |
|---|---|---|---|---|---|
| SEO-01 | `/contact/`, `/courses/` | medium | Indexable pages under 300 words of `<main>` text: `/contact/` **95 words**, `/courses/` **172 words**. Both are in the sitemap with self canonicals. `/courses/` is a hub for "medical courses in Ukraine" and gets 5 inbound body links. | `/contact/`: `site/src/pages/contact/index.astro:10-18` (the `.prose` column). Add a short "What to include in your message" list (course, intake year, school-leaving qualification and grades so far, country, universities you are considering) and one paragraph on what the service does and does not do, linking `/services/` and `/disclosure/`. Promise no reply time unless the owner sets one. If the owner prefers a minimal contact page, record it as an exemption at `site/scripts/seo-audit.mjs:42` (`THIN_EXEMPT`) instead. `/courses/`: `site/src/pages/courses/index.astro:24-31` ("Before you choose"). Add a "How the four courses differ and what to check for each" section (qualification title, length as stated on the university's own programme page, practical or clinical training, language of teaching, who regulates practice in the student's home country), drawn from the per-course sections in `site/src/lib/courses.ts`. General guidance only, no university facts. | **fixed** — `/contact/` and `/courses/` expanded with guidance (no new claims); re-run: both above 300 words |
| SEO-02 | `/seo-audit-no-such-page/` (any unknown URL, served by the 404 page) | low | Status 404 (correct) and `noindex, nofollow`, but the page declares `<link rel="canonical" href="https://ukrainemedicaladmissions.com/404/">` and `og:url` to the same URL. `GET /404/` answers **404**. | `site/src/layouts/Base.astro:27` (`const bare = STAGING \|\| draft;`), `:48` (`{!bare && <link rel="canonical" …>}`) and `:54` (`og:url`): add a prop that omits both, and pass it at `site/src/pages/404.astro:6` (`<Base title="Page not found" …>`). `site/tests/check-meta.mjs:34` (`NO CANONICAL`) then needs to exempt `404.html`. | **fixed** — `Base.astro` `canonical={false}` on the 404 page; `check-meta.mjs` now fails on a canonical there |
| SEO-03 | `/courses/dentistry/`, `/courses/pharmacy/` | low | Meta description **161** and **162** characters (limit 160). | `site/src/lib/courses.ts:109`: "Dentistry in Ukraine for international students: what to ask about practical training, the qualification title and extra costs, and who decides recognition." (156). `site/src/lib/courses.ts:184`: "Pharmacy in Ukraine for international students: ask about the qualification title, teaching language and practical training, and who decides registration." (154). | **fixed** — both descriptions shortened to 156 and 154 characters |
| SEO-04 | `/courses/dentistry/`, `/courses/pharmacy/` | low | `<main>` text **33.6%** similar to each other (5-word shingles). `/courses/nursing/` is 25.4% similar to pharmacy. Each page is 355–366 words, and about a third is the shared template: the "Universities verified for …" empty state, the "Not sure you qualify?" card, the official-website note and the CTA band. These three pages also get only 2 inbound links each (`/` and `/courses/`). | Add 150–200 words of course-specific guidance to each course's `sections` in `site/src/lib/courses.ts` (dentistry block from `:105`, nursing from `:143`, pharmacy from `:180`). Optionally shorten the shared blocks in `site/src/pages/courses/[course].astro:42-69`. Add contextual links to the three courses where relevant (for example `site/src/pages/admissions/index.astro`, `site/src/pages/tuition-fees/index.astro`), as `/courses/medicine/` already has. | **partly fixed** — "Other courses" links on every course page (each course page now has 5 inbound links); 34% similarity remains from the shared template: accepted (each page has its own course-specific checks) |
| SEO-05 | `/apply/thank-you/` | low | robots.txt `Disallow: /apply/thank-you/` stops Google fetching the page, so it cannot read the page's `noindex, nofollow`. A URL that is linked elsewhere could still be listed without content. Not in the sitemap; 0 inbound links. | `site/src/pages/robots.txt.ts:10` (production body). Drop `Disallow: /apply/thank-you/` and rely on the noindex, as the staging comment at `:6-7` already argues. Or keep both and accept the small risk. | **fixed** — `Disallow: /apply/thank-you/` removed; the page keeps `noindex` |
| SEO-06 | `/sitemap-0.xml` | low | 18 URLs, each with `<changefreq>weekly</changefreq><priority>0.7</priority>` and no `<lastmod>`. Google ignores changefreq and priority; an accurate lastmod helps recrawling. | `site/astro.config.mjs:53-54` (`changefreq: 'weekly', priority: 0.7`). Add `lastmod` through the sitemap integration's `serialize` only from a real per-page last-change date (never the build time, which Google learns to ignore). Otherwise drop changefreq and priority. | **deferred** — an accurate per-page last-change date is not available; the build date would be inaccurate, which Google learns to ignore |
| SEO-07 | all 32 pages | low (advisory) | 0 targets fail the WCAG 2.2 AA 24 px minimum at 360 or 390 px. Advisory: **17–32** targets per page are under 44 px in one dimension, for example footer links 17 px tall (29 px pitch), breadcrumb "Home" 38×16, brand link 148×34 and menu button 42×42. | `site/src/components/Footer.astro:52-53` (`ul { … gap: .4rem; }`, `a { … }`): make footer links `display:inline-block` with about `.65rem 0` padding (rows of 44 px or more). `site/src/styles/global.css:134` (`.crumbs a`): add vertical padding. `site/src/components/Header.astro:36` (`.burger` 42 px → 44 px). | **partly fixed** — footer and breadcrumb links padded, menu button 44 px; remaining sub-44 px targets meet WCAG 2.2 AA (24 px): accepted as advisory |
| SEO-08 | `/admissions/`, `/apply/`, `/courses/`, `/courses/dentistry/`, `/courses/medicine/`, `/courses/nursing/`, `/courses/pharmacy/`, `/disclosure/`, `/faq/`, `/tuition-fees/` | low | Titles over the 60-character ideal (all ≤ 70): admissions **70** "How to apply to a medical university in Ukraine: eligibility and steps"; apply **66**; courses **66**; dentistry **68**; medicine **61**; nursing **68**; pharmacy **69**; disclosure **65**; faq **69**; tuition-fees **62** "MBBS and medical college fees in Ukraine: how to compare costs". Eight of the ten are over only because of the " \| Ukraine Medical Admissions" suffix (28 characters). | `site/src/layouts/Base.astro:29` (`const fullTitle = …`): append the suffix only when the result stays ≤ 60 characters. That fixes apply (→ 38), courses (→ 37), the four course pages (→ 32–40), disclosure (→ 37) and faq (→ 40). The two pages with `suffix={false}` need shorter wording: `site/src/pages/admissions/index.astro:12`, for example "How to apply to medical university in Ukraine: eligibility" (58); `site/src/pages/tuition-fees/index.astro:19`, for example "MBBS and medical college fees in Ukraine: compare costs" (55). Check against `KEYWORD_URL_MAP.md` first. | **fixed** — brand suffix only when the title stays within 60 characters; `/admissions/` and `/tuition-fees/` titles shortened |

## Notes (recorded, not issues)

- `/disclosure/` has 254 words. It is a legal page, so it is noted, not failed. `/privacy/` (897), `/terms/` (323), `/complaints-policy/` (322) and `/apply/` (1148) are over 300.
- `/terms/` is linked only from the footer (30 pages), never from body text.
- `/sitemap.xml` answers 404. Google is told about `/sitemap-index.xml` in robots.txt; submit that URL in Search Console.
- `/index.html` serves the home page with a 200. Its canonical (`https://ukrainemedicaladmissions.com/`) consolidates it.
- `Content-Type` for HTML on the stand-in is `text/html;charset=UTF-8`, and every page also declares `<meta charset="utf-8">` first in `<head>`. The live host's header is unknown until `verify-live` runs there.

## Re-running

```
cd site
UMA_CACHE_DIR=$(mktemp -d) npm run build      # only when dist/ is missing or older than its sources
npm run audit:seo                             # about 2.5 minutes; add -- --no-lighthouse for about 10 seconds
```

The audit builds nothing. It exits 2 if `dist/` is missing or older than `src/`, `public/`, `data/` or `astro.config.mjs`. It exits 1 on any high issue and 0 otherwise. `-- --dist <dir>` audits another built copy. Full data: `site/tests/output/seo-audit.json` (pages, URLs and hops, link targets, exposure hits and allowed hits, mobile measurements, Lighthouse per page, notes).


## Re-run after fixes (2026-10-12, working tree on f86363c plus the fixes above)

`npm run audit:seo` on a clean production build: **0 high, 0 medium, 3 low** (exit 0). 96 URLs requested; 32 pages analysed (18 indexable, all 18 in the sitemap, 12 noindex research previews, the thank-you page and the 404 page); 47 internal link targets all answer 200 with no redirect hop; no orphan; nothing private or unverified in any of the 74 served files.

| Remaining | Severity | Decision |
|---|---|---|
| `/courses/dentistry/` and `/courses/pharmacy/` are 34% alike (shared template blocks) | low | Accepted: each page carries its own course-specific checks; below any meaningful duplicate threshold |
| No `<lastmod>` in the sitemap | low | Deferred until real per-page change dates exist |
| Targets under 44 px (WCAG 2.2 AAA advisory) | low | Accepted: every target meets the AA 24 px minimum |

Lighthouse (mobile emulation, default throttling), 18 indexable pages: performance 98–100, accessibility 100, best practices 100, SEO 100; LCP 1,800–2,251 ms; CLS 0–0.043; TBT 0 ms. The research-preview page scores SEO 69 only because it is deliberately noindex.

**Not proven by any of this:** what the live host serves (TLS, compression, caching, real headers), whether Google crawls or indexes the pages, field Core Web Vitals, Search Console coverage. Those need the release, `npm run verify:live` and a Search Console property.

## Re-run with the extended checks and 17 research previews (2026-10-12, later)

`npm run test:seo` (the audit without Lighthouse) on the production build that includes the five research previews added on 2026-10-12 found **0 high, 0 medium and 3 low issues** (the same three accepted lows as above).
- **Scope:** 106 URLs requested, 37 pages analysed: 18 indexable, all 18 in the sitemap, 17 noindex research previews, the thank-you page and the 404 page. 57 internal link targets, all answering 200 with no redirect.
- **Previews:** the 17 previews are 90.6–94.2% alike (one template, no verified facts). They are noindex and outside the sitemap, so they are not an indexing problem.
- **Checks added to the audit since the first run:**
  - Click depth from the home page: every page is within one click.
  - Query-parameter URLs: 24 in all, the 21 internal links with parameters (`?university=`, `?course=`) plus 3 typical visitor or campaign parameters (`?q=`, `utm_`, `?ref=`). All answer 200 with the canonical of the clean URL.
  - Images: format, weight, oversizing and lazy loading. Only two SVG logos are used.
  - POST forms: both carry the honeypot field the handler checks, and required fields.
  - 410 rules: none. Retired legacy URLs are 301-redirected and unknown URLs answer 404.
- **Proof the new checks work:** mutation tests show a FAQ canonical carrying `?ref=` is caught as high and a removed honeypot as medium.

The directory search box's example text is now "e.g. Bukovinian, Pirogov". These are name words with measured India demand ("bukovinian state medical university" 480, "pirogov medical university ukraine" 390), and the example no longer shows a bare city name, which the publication gate would otherwise read as another record's withheld city.

