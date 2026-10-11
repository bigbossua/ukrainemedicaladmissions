# ANALYTICS_AND_SEARCH_CONSOLE.md — how we will measure the site without collecting personal data

**Date:** 2026-10-11 · **Status:** plan only. Nothing in this document is installed, configured or deployed. No Search Console property exists, no analytics tool is installed, and no measurement data of any kind exists yet. Every step that changes DNS, the live site or the privacy notice needs the owner's approval (§F).

Labels: **VERIFIED-IN-REPO** = read in a repository file or built page; **MEASURED-LOCAL** = reproduced in this environment against a local build; **OFFICIAL** = read on the vendor's or regulator's own page (none could be opened from this environment); **UNVERIFIED** = from general knowledge of the product, not re-checked here; **ASSUMPTION**; **RECOMMENDATION**. Costs below are "as published by the vendor" and are **UNVERIFIED** here: vendor pricing pages were not opened (outbound access is limited by the environment's network policy). Re-check each before deciding.

**Facts this plan relies on (VERIFIED-IN-REPO):**
- Canonical host: `https://ukrainemedicaladmissions.com` (non-www, HTTPS): `SITE.url` in `site/src/lib/site.ts`, `site` in `site/astro.config.mjs`, and the 301 rules at the top of `site/public/.htaccess`.
- Sitemap: `robots.txt` advertises `https://ukrainemedicaladmissions.com/sitemap-index.xml`; the deployed release (`origin/production`, `b2ca3d6`) lists 18 URLs in `sitemap-0.xml`, the same set as a build of this branch.
- Content Security Policy sent by `site/public/.htaccess` today: `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self'; form-action 'self'; frame-ancestors 'self'; base-uri 'self'`. There is no `connect-src`, so `fetch`/`sendBeacon` fall back to `default-src 'self'` (same origin only).
- The privacy notice (`site/src/pages/privacy/index.astro`, since `4136658`) says "Website analytics: none installed. We use no analytics or advertising trackers today; if we add privacy-respecting measurement, this notice will name the tool before it is switched on." That matches what is installed; it must be updated to name the tool before any option in §B goes live (`SECURITY_AND_RELEASE_CHECKLIST.md` A10). *(Updated 2026-10-11: the earlier notice said "only aggregated, privacy-respecting measurement … [Tool to be confirmed.]".)*
- Stage 1 of the application is an e-mail/JSON enquiry handled by `site/public/api/enquiry.php` (no accounts, save-and-resume, uploads, status tracking or payments); since `4136658` the `/apply/` form is the five-step candidate-profile form. The handler's stored records are the only ground truth for completed enquiries.
- **Former defect, fixed in `4136658` (backlog N20; `DIRECTORY_VERIFICATION_PLAN.md` §9.1):** Astro inlined small processed scripts, which the CSP above blocks (served with the CSP header, the directory filter and the mobile menu stopped working). `site/astro.config.mjs` now sets `vite: { build: { assetsInlineLimit: 0 } }`, so every processed script is an external `/_astro/*.js` file, and `test:meta` fails on any executable inline script or inline handler. An event script bundled the same way runs under the CSP; whether the live host sends the CSP header is UNVERIFIED until `verify:live` runs.

## A. Google Search Console setup (for the owner)

Search Console is Google's own report of how the site appears in Google Search. It needs no code on the page beyond verification, sets no cookie and collects nothing from visitors. Cost: free (as published by Google; UNVERIFIED here). It is the first-party source for the "current performance" lines in `KEYWORD_URL_MAP.md` §18 and closes checklist item A11.

The property types, menu names, permission levels and date ranges in A1 to A3 are from general knowledge of the product (UNVERIFIED here: Google's help pages were not opened for this plan). Re-check them on Google's own help pages on the day.

### A1. Choose the property type

| Option | What it covers | How it is verified | What that means here |
|---|---|---|---|
| **Domain property** `ukrainemedicaladmissions.com` (RECOMMENDATION if the owner can edit DNS) | every protocol and subdomain (`https`, `http`, `www`, any staging subdomain) | a DNS TXT record added at the domain's DNS provider | **a DNS change: owner's approval and owner's action.** No site release is needed, and verification survives future releases |
| **URL-prefix property** `https://ukrainemedicaladmissions.com/` | only URLs that start with exactly that prefix | (i) an HTML verification file in the site root, or (ii) a `<meta name="google-site-verification">` tag in every page's `<head>` | **a release: owner's approval.** (i) is a file in `site/public/`; it would be built into `dist/` and the test suite walks every `.html` file (`check-meta`, `ui-smoke`, `a11y`), so the plain Google file would fail those tests unless they exclude it. (ii) is one line in `site/src/layouts/Base.astro` (a shared file: the orchestrator wires it). Removing the file or tag later un-verifies the property |

Do not create `http://` or `www.` URL-prefix properties: those hosts only redirect (301) to the canonical host.

### A2. Steps once the property type is chosen (owner, with the daughter watching)

1. Search Console → Add property → enter the domain (Domain) or `https://ukrainemedicaladmissions.com/` (URL-prefix) → follow the verification method chosen in A1.
2. Sitemaps → submit `sitemap-index.xml` (full URL `https://ukrainemedicaladmissions.com/sitemap-index.xml`). Expect it to report the URLs in `sitemap-0.xml` (18 in the current release).
3. URL Inspection → check `/`, `/universities/` and `/tuition-fees/` (indexable, self-canonical). After a release that changes a page, request indexing for that page only.
4. Settings → Users and permissions: the owner stays **Owner**. Add the daughter as a **Restricted** user (read-only: she can see the reports and export them, but cannot change settings, add users or submit sitemaps). Upgrade her to Full only if she must submit sitemaps or request indexing herself. Claude gets no account; the owner or daughter exports the files.
5. Turn on e-mail notifications for the owner.

### A3. Baseline export (on the day of verification, and again 28 days later)

- Performance → Search results → search type Web → date range **Last 16 months** (the longest range Search Console offers; a newly added property may show less history: UNVERIFIED here). Export the **Queries, Pages, Countries and Devices** tabs (CSV or Google Sheets).
- Indexing → Pages (indexed and not indexed, with reasons) and Sitemaps (submitted versus discovered).
- The status of `/universities/ternopil-national-medical-university/` (served as `noindex` by the current release; becomes a 302 to `/universities/` after a release from the working branch).
- **Storage:** query exports are not personal data but are commercially sensitive, and the repository is public (`research/verification/README.md`). Keep the raw exports outside the repository until it is private (decision D8); commit only dated summaries. Label every figure from them **GSC** (first-party actual), never mixed with SEMrush estimates (`KEYWORD_URL_MAP.md` §5).

### A4. Review cadence (RECOMMENDATION)

| When | Who | What |
|---|---|---|
| Weekly for 4 weeks after verification and after each release | daughter | Indexing → Pages and Sitemaps: new errors, submitted versus indexed |
| Monthly | daughter writes a short dated note; owner reads it | Performance for the mapped query groups in `KEYWORD_URL_MAP.md` §18: impressions, clicks, CTR, average position, last 28 days against the previous 28, India and UK first |
| Quarterly | owner with Claude | compare with the ranked register (`KEYWORD_URL_MAP.md` §13) and decide changes; no SEMrush spend unless approved |
| 28 days after a release that publishes a profile or a fee | daughter | the affected URL and its queries |

## B. Analytics options for a privacy-first site under UK/EU rules

**Legal frame (ASSUMPTION, needs legal review; operating jurisdiction is open decision D7).** UK GDPR / EU GDPR apply to personal data (IP addresses and device identifiers count). PECR in the UK and the ePrivacy Directive (Art. 5(3)) in the EU require consent before storing or reading information on a visitor's device unless it is strictly necessary. UK law was amended in 2025 (Data (Use and Access) Act 2025) to allow some analytics storage without consent where visitors are told and can object; when and how that applies must be confirmed by a legal reviewer before anyone relies on it (UNVERIFIED here). EU national regulators differ on exemptions for audience measurement (UNVERIFIED here). The safest design stores nothing on the device, sends no identifier and keeps data first-party.

| Option | Cost (as published; UNVERIFIED here) | What it measures | Consent implications (ASSUMPTION; legal review) | Exact CSP change against the current `.htaccess` CSP | Other risks |
|---|---|---|---|---|---|
| **1. Server logs from the host** (Hostinger access logs or hPanel statistics, if the plan provides them: UNVERIFIED) | included in hosting, if available | page requests only (path, status, time, referrer, user agent, IP); no clicks or form steps; bots inflate counts | no device storage, so no PECR/ePrivacy consent; IP addresses are personal data, so state the purpose (security and operations), the retention set by the host, and mention it in the privacy notice | **none** | depends on what the host exposes; the daughter needs hPanel access |
| **2. Cloudflare Web Analytics** (JavaScript beacon; site not proxied through Cloudflare) | free | page views, referrers, countries, devices, Core Web Vitals; **no custom events** as far as known (UNVERIFIED), so the dictionary in §C could not be implemented with it | no cookies as published; whether the beacon still needs consent or an opt-out is a legal question; data goes to a US provider (transfer terms, processor agreement) | `script-src 'self' https://static.cloudflareinsights.com; connect-src 'self' https://cloudflareinsights.com` (from Cloudflare's published guidance as recalled; re-check before applying) | third-party script on every page; the beacon tag must be an external `<script defer src=…>` with its `data-cf-beacon` attribute (no inline code) |
| **3a. Self-hosted Matomo** (PHP and MySQL; ASSUMPTION that the hosting plan supports it, as `EXECUTIVE_REPORT.md` §K.8 assumes for the product) | software free (open source); hosting already paid; maintenance time | page views and custom events; can run cookieless | cookieless mode avoids device storage; data stays first-party; still list it in the privacy notice | same origin (e.g. `/stats/`): **none**, but Matomo's default tracking snippet is inline and must move into an external same-origin file. On a subdomain (e.g. `stats.ukrainemedicaladmissions.com`, which needs a DNS change): `script-src 'self' https://stats.ukrainemedicaladmissions.com; connect-src 'self' https://stats.ukrainemedicaladmissions.com; img-src 'self' data: https://stats.ukrainemedicaladmissions.com` | a second PHP application to patch and secure; the Git auto-deploy of the document root could overwrite a same-origin install (ASSUMPTION), so a subdomain is safer |
| **3b. First-party event beacon** (a small bundled script sends allow-listed events to a new same-origin PHP endpoint, e.g. `/api/event.php`, which stores daily counts outside the document root) | development time only | exactly the dictionary in §C; nothing else | no cookie, no device storage, no identifier, no IP stored by the endpoint: likely outside the consent requirement (ASSUMPTION; legal review); host logs still record the request | **none** (`sendBeacon` to the same origin is allowed by `default-src 'self'`) | must validate input against the allow-list, rate-limit, never log request bodies with free text; the inline-script fix it depended on is in `4136658` (N20) |
| **4. Google Analytics 4 with consent** | standard tier free; paid tier exists | page views, custom events, acquisition reports | sets cookies, so consent first (a consent banner and a consent-management setup), US transfer, a longer privacy notice | `script-src 'self' https://*.googletagmanager.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com` (Google's published CSP guidance as recalled; more hosts if Google Signals is enabled, which it should not be); the default `gtag` snippet is inline and must move to an external file | widens the CSP, adds a banner that hurts the first visit, and sends data to an advertising company: at odds with the privacy notice's "no advertising trackers" |

**Recommendation.** Use **Search Console** (A) plus the **host's server logs** (option 1) for traffic from day one, and build the **first-party event beacon** (option 3b) for the events in §C (both former preconditions are met since `4136658`: the stepped Stage-1 form exists and the inline-script defect is fixed; the beacon still needs the owner's choice of option 3b, the privacy-notice update and a release). It needs no CSP change, no third party, no cookie and no banner, and it fits the existing PHP pattern (`enquiry.php`, private storage in `uma-private/`). Choose self-hosted Matomo (3a) only if the owner wants a ready-made dashboard and accepts maintaining a second application. Do not install GA4 unless paid acquisition is approved later. Before any option goes live: update the privacy notice (A10), record the retention period, and get the legal check above.

## C. Event dictionary (no personal data)

**Rules for every event.** No names, e-mail addresses, countries typed by the visitor, qualifications, message text or any other field value. No free text of any kind. No user, session or device identifier, no IP address, no fingerprinting, no cookie or local storage. Property values come only from the fixed allow-lists below; anything else is dropped by the endpoint. The page is recorded as its path without query string or fragment (for example `/apply/`, never `/apply/?course=…`). Time is recorded at day resolution. Because there are no identifiers, funnels are computed from aggregate counts, not per person. Elements are marked with `data-*` attributes and handled by one bundled script with `addEventListener` (no inline handlers; CSP-compatible, since processed scripts are external files from `4136658`). RECOMMENDATION: send nothing when the browser signals Global Privacy Control.

| Event | Definition | Trigger | Properties (allowed values) | Purpose | KPI it feeds (§D) |
|---|---|---|---|---|---|
| `apply_step_view` | a step of the `/apply/` form was shown | page load for step 1; each move to a later step | `step`: integer 1…N (N = 5: the stepped form at `/apply/` since `4136658`) | count candidate-profile starts and how far people get | starts; step reach |
| `apply_step_complete` | a step was left with client-side validation passed | "Next" on a step, or a valid submit on the last step | `step`: integer 1…N | find the step where people stop | step completion rate |
| `apply_validation_error` | client-side validation flagged a field | once per flagged field per attempt to leave the step | `step`: integer; `field`: the field's `name` from the allow-list `course`, `level`, `university`, `university2`, `university3`, `university_other`, `intake`, `edu_level`, `qualification`, `country`, `qual_year`, `qual_status`, `scale_type`, `scale_max`, `outstanding`, `documents_note`, `name`, `email`, `residence`, `nationality`, `language`, `message`, `consent` (the exact `name` attributes in `site/src/pages/apply/index.astro` at `4136658`; never the value or the error text; the subject-row fields `subjects[…]` and the document fields `documents[…]` are not on the list, so no subject or document value is ever reported; the honeypot `website` and the hidden `ts` and `type` fields are never reported) | find confusing fields | validation errors per 100 step views; top fields |
| `apply_submit` | the form was submitted after client-side validation passed | the submit that the browser actually sends | none | count attempted submissions | completions (reconciled with the handler's stored records and `/apply/thank-you/` views) |
| `cta_click` | an Apply Online Now link was clicked | click on a link to `/apply/`, or submission of the home page's quick-start form (a GET form to `/apply/`), that carries `data-cta-location` | `location`: `header`, `header-menu`, `cta-band`, `home-hero`, `home-start`, `directory-how`, `directory-empty`, `course-medicine`, `course-dentistry`, `course-nursing`, `course-pharmacy`, `tuition-fees`, `admissions`, `faq`, `profile` | learn which placements start profiles | CTA click-through by location |
| `directory_filter_change` | a directory filter was changed | `change` on a `[data-filter]` select on `/universities/` | `filter`: `city`, `field`, `level`, `language`, `prep`, `intake` (the filter's name only, never the chosen value) | learn which comparison dimensions matter, to prioritise verification fields | directory engagement; filter ranking |
| `official_link_click` | an official-source link was followed | click on an outbound link marked `data-official` (verified source links on profiles) | `domain`: the link's hostname only (no path) | show that students check official sources; trust | official-source use per profile view |
| `faq_open` | an FAQ answer was opened | first `toggle` to open of a `<details>` element on `/faq/` per page load | `question`: a stable id from the FAQ content (ids do not exist yet; adding them is a content change) | learn which questions matter, compared with the SEMrush question phrasings | question interest |
| `readiness_link_click` | a link to the readiness explanation was clicked | click on a link to `/admissions/#readiness` | `location`: same allow-list as `cta_click` | measure interest in the readiness check before any document-readiness review is priced (`SERVICE_TIERS_SPEC.md`) | readiness interest |

Page views for rates come from server logs (option 1) or, for search landings, from Search Console; the dictionary deliberately has no page-view event.

## D. KPIs and review periods

No KPI has a target. Targets are set only after at least one quarter of baseline data and the owner's agreement; no document may promise a number.

| KPI | Definition | Source | Review period |
|---|---|---|---|
| Organic visibility per query group | impressions, clicks, CTR and average position for each mapped group in `KEYWORD_URL_MAP.md` §18, by country | Search Console | monthly (28 days against the previous 28); quarterly against §13 |
| Indexing | sitemap URLs indexed versus submitted | Search Console | weekly for 4 weeks after a release, then monthly |
| Candidate-profile starts | `apply_step_view` with `step` = 1 | event beacon | monthly (weekly glance) |
| Candidate-profile completions | enquiries stored by `enquiry.php` (ground truth), cross-checked with `apply_submit` | handler store; event beacon | monthly |
| Completion rate | completions ÷ starts | derived | monthly; read only when the counts are large enough to mean something (threshold agreed with the owner) |
| Step drop-off and field friction | `apply_step_complete` ÷ `apply_step_view` per step; `apply_validation_error` per 100 step views | event beacon | monthly, once the event beacon exists (the stepped form exists since `4136658`) |
| CTA click-through | `cta_click` by location ÷ views of that page | event beacon; server logs | monthly |
| Directory engagement | share of directory views with at least one `directory_filter_change` | event beacon; server logs | monthly, once at least one profile is published |
| Official-source use | `official_link_click` ÷ profile views | event beacon; server logs | monthly, once profiles are published |
| Question interest | `faq_open` by question | event beacon | quarterly |
| Readiness interest | `readiness_link_click` by location | event beacon | monthly |
| Enquiry completeness | share of enquiries with course, country and qualification filled | the daughter counts in the handler store; no personal data leaves it | monthly |

## E. Local tests, CI and live verification: what each proves

| Layer | Command | Where it runs | What it proves | What it cannot prove | Status |
|---|---|---|---|---|---|
| Local tests | `npm test` and its parts (`test:records`, `test:readiness`, build, `test:links`, `test:meta`, `test:redirects`, `test:ui`, `test:a11y`, `test:perf`, `test:release`, `test:staging`, `test:gate`, `test:preview`, `test:php` = `php -l` plus `tests/enquiry-php.mjs`) | a worktree in this environment; a Node static server, Chromium and PHP's built-in server | the built files meet the checks: record evidence rules, readiness logic, links, metadata (including no executable inline script), redirect rules as written, UI behaviour, axe, Lighthouse, publication gate, and the enquiry handler's validation and storage under PHP's built-in server | anything the real server does: Apache/LiteSpeed rules, response headers including the CSP, PHP execution, e-mail, DNS and TLS, what Google sees. Example: before `4136658` all local tests passed while the CSP would have blocked the inline scripts (N20); `test:meta` now catches inline scripts, but header delivery itself is provable only live | run locally on `4136658`; results are quoted per command in the integration commit message |
| CI | `.github/workflows/ci.yml` (push or pull request touching `site/`): `npm ci`, `astro check`, the same tests including `test:readiness`, `php -l` on the handler and `node tests/enquiry-php.mjs` | GitHub Actions, clean runner | the same checks are reproducible from the repository at a given commit | the same blind spots as local tests | CI run 38156249853 (`claude/university-profile-pipeline`) and CI run 38156251319 (`claude/new-session-ppgh22`): success on `4136658` (2026-10-11); `wip/directory` itself was never pushed |
| Live verification | `npm run verify:live` (`site/scripts/verify-live.mjs`, read-only) | against the deployed host | what the server actually serves: robots and sitemap, status, canonical and robots meta of every sitemap URL, security headers including the CSP, redirects, the handler's 422/303 behaviour with a honeypot-filled synthetic form, browser console errors and failed requests, the mobile menu, axe | Google's view of the site | **never run**: the production host is blocked from this environment (2026-10-11 15:29 UTC: `CONNECT tunnel failed, response 403`). It would catch a CSP regression or a header the host does not send (console errors, mobile-menu check) |
| Search Console | URL Inspection, Pages, Performance | Google | what Google crawled, indexed and showed, and how searchers responded | on-page behaviour | no property yet |

Reporting rule: every test result names its layer ("local:", "CI run #n:", "live:", "GSC:"), and a result is reported only by someone who ran it and saw it.

## F. Not done, and what needs approval

| Item | Needs | Who |
|---|---|---|
| Create and verify the Search Console property | Domain property: a DNS TXT record (DNS change). URL-prefix: a release adding the meta tag (shared file `Base.astro`) or the HTML file (plus a test exclusion) | owner approves and acts; the orchestrator wires any code change |
| Submit the sitemap, add the daughter as a Restricted user, export the baseline | the property above | owner |
| Choose the analytics option | owner decision on §B | owner |
| Legal check of the consent position and retention periods | jurisdiction decision D7 and a legal reviewer | owner |
| ~~Correct the privacy notice's analytics line ("[Tool to be confirmed.]")~~ **Done in `4136658`**: it reads "Website analytics: none installed…"; name the chosen tool there before it is switched on | a content change and a release (A10) | owner approves |
| ~~Fix script inlining so scripts are external files (`site/astro.config.mjs`)~~ **Done in `4136658`** (N20); confirm on the live site after the next approved release | a release and `verify:live` | orchestrator (done); owner (live check) |
| Add `data-cta-location`, `data-official` and FAQ question ids; build the event script and `/api/event.php` | code and content changes in shared files; a release | orchestrator, after the owner chooses option 3b |
| Make the repository private before storing Search Console exports in it | decision D8 | owner |
| Run `npm run verify:live` after the next release | network access to the production host (environment Network access → Allowed domains) | owner |

Nothing in this document has been installed, purchased, configured or deployed, and no measurement data has been invented: every "current performance" in the planning documents remains "not measured" until Search Console and the chosen tool produce real data.
