# DECISION REPORT — research audit complete, 2026-10-11 (latest; supersedes the addenda below where they differ)

## A. SEMrush batch reconciliation (reconciled; derived figures labelled)

| Item | Figure | Source |
|---|---|---|
| Calls made 2026-10-11 | 10 (1 probe + 6 R1 + 3 R2) | `SEMRUSH_API_LEDGER.md` "R1 + R2 executed" |
| Raw exports | 10 files, 85 returned lines, each file's lines × 10 = the recorded cost of its call (all ten match) | `research/semrush/2026-10-11-*.csv`; programmatic check + independent audit agent (≈400 values, 0 errors) |
| Units used this phase | **850** of the 2,340 cap; R3–R5 not run | ledger |
| Consumption before this phase | **2,110** (50,000 − owner's 47,890) — **DERIVED**: assumes the 50,000 screenshot preceded the first paid call and that no other tool connected to the account drew on the shared unit pool; replaces the ledger's earlier 2,240; the 130 overstatement sat in the published-price estimate of the 2026-10-10 parallel batch (actual 1,070; per-call split unrecoverable) | ledger reconciliation entry |
| **Cumulative** | **2,960** | |
| **Expected remaining** | **47,040** — to be confirmed on the owner's next API Units reading | |
| Audit corrections applied | wording only: UK "every other name 20" → ten names 20, Vinnytsia 0; nursing intent "informational" → not computed; §4.1 "45 databases incl. lk" → 44, lk not returned; ledger "234 requested" → 235 incl. probe; stale §9/§10 headers and §6 status cells marked superseded | this commit |

## B. Evidence classes — what is measured, what is a lead, what is assumed

- **Measured (SEMrush estimates, exact phrase unless stated):** everything in `KEYWORD_URL_MAP.md` §4, §6, §6.1, §7 Demand/Difficulty/Intent columns and §12 column "Demand (M)". These are third-party estimates of monthly searches; no Search Console actuals exist yet.
- **Official-source evidence (opened and read):** **none.** Official `.ua` university pages and registries remain unreachable from this environment.
- **Preliminary findings (search-snippet leads with URL + quote):** everything in `UNIVERSITY_DATA_REGISTER.md` §6–§8, `PROGRAMME_SUPPLY_REGISTER.md`, `research/universities/*.json` and the image candidates in `VISUAL_AUDIT_AND_IMAGE_REGISTER.md` §8. No lead may be published.
- **Assumptions / analyst judgement:** the expansion order (demand × verifiability × operating conditions), the money-page decisions, the tier labels, the readiness-service design, the revenue options. Each is marked as such where it appears.
- **Verified project facts:** repository state, CI results, the production branch contents and fingerprint, the ledger arithmetic.

## C. Official verification — status and exact blocker

Nothing could be verified: `curl` to `bsmu.edu.ua`, `onmedu.edu.ua`, `tdmu.edu.ua`, `vnmu.edu.ua`, `nmuofficial.com`, `universities.studyinukraine.gov.ua`, `info.edbo.gov.ua`, `search.wdoms.org` and the production host all fail at the environment's proxy (network policy). **Required access (free, owner, environment → Edit → Network access → Allowed domains):** `ukrainemedicaladmissions.com`, `www.ukrainemedicaladmissions.com`, `bsmu.edu.ua`, `vstup.bsmu.edu.ua`, `vnmu.edu.ua`, `foreign.vnmu.edu.ua`, `onmedu.edu.ua`, `nmuofficial.com`, `ifnmu.edu.ua`, `uzhnu.edu.ua`, `tdmu.edu.ua`, `knmu.edu.ua`, `mphu.edu.ua`, `int.mphu.edu.ua`, `new.meduniv.lviv.ua`, `pdmu.edu.ua`, `en.pdmu.edu.ua`, `dmu.edu.ua`, `universities.studyinukraine.gov.ua`, `studyinukraine.gov.ua`, `info.edbo.gov.ua`, `search.wdoms.org`. Alternative: the owner supplies the official pages/PDFs listed per university in `UNIVERSITY_DATA_REGISTER.md` §6 ("Official pages to open"). **Missing evidence per university, in every case:** a dated current-year statement of teaching format and location; the current admission rules for foreigners; the current fee schedule; intake dates; exact award titles; eligibility and language for nursing, public health and rehabilitation programmes.

## D. Country comparison and keyword-to-URL decisions (updated with R1 + R2)

India is the only market with measured applicant demand at scale: twelve university names at 20–480/mo (Bukovinian 480, Odessa 390, Kharkiv 390, Bogomolets 320, Ivano-Frankivsk 210, Uzhhorod 140, Ternopil 110, Zaporizhzhia 90, Vinnytsia 50 + Pirogov 390, Lviv 50, Poltava 20, Dnipro 20), the fees cluster (260–720, kd 7–18), "mbbs in ukraine" 260 and small long-tail (dentistry 30, eligibility 30, for Indian students 20, validity 20). UK is second (Bogomolets 90, other names 20, nursing 20, public health 10). Nigeria shows named-university interest for the first time (eight names at 10–30). Pakistan, South Africa, UAE: zero on every programme term; names not measured.

**Pages to improve (existing):** `/tuition-fees/` (first — verified figures), `/universities/` (comparison framework, more verified institutions), `/courses/medicine/` (verified titles), `/admissions/` (eligibility/readiness + preparatory routes), `/faq/` (regulator-sourced recognition answer), `/courses/dentistry/` (verified programmes).
**Proposed money pages — consider (approve for planning after verification):** seven university profiles in the order Bukovinian → Vinnytsia → Odesa → Bogomolets → Ivano-Frankivsk → Uzhhorod → Ternopil (template exists). **Conditional:** Kharkiv (operating-conditions check). **Defer:** Zaporizhzhia, Lviv, Poltava, Dnipro profiles; preparatory resource page; country page; public health; rehabilitation; nursing content investment. **Reject:** city pages, standalone MBBS page, separate comparison page, sport.

## E. Programme-family assessment (all eight families) — `KEYWORD_URL_MAP.md` §12

Medicine and the university names carry the measured demand; dentistry is small but measured in India; pharmacy, nursing, public health, rehabilitation, physical training and preparatory/foundation have **no measured English-language demand in any of six databases** (nursing uk 20 and public health uk 10 excepted) while official supply exists for all of them in Ukrainian. Decision: they live inside the candidate-profile service as selectable fields assessed against verified requirements, not as acquisition pages.

## F. Candidate-profile specification — reviewed (`APPLICATION_SYSTEM_SPEC.md` §8, §12, §13)

Save-and-resume, subjects/grades with scale and result status, conditional document requirements, verified preparatory-route objects (language, English track, certificate, verbatim progression wording), intake-year-bound university requirements and exam formats are now specified; nothing is implemented; no real documents are collected; the eight go-live gates stand.

## G. Visual and image register — updated (`VISUAL_AUDIT_AND_IMAGE_REGISTER.md` §7–§9)

Twenty-plus free candidates identified (Pexels generic settings; Wikimedia Commons building photographs for named institutions), each needing its licence line read on the page before download; licensing obligations per source recorded; generated imagery allowed only as labelled illustrative fallbacks, never as a university's facilities or students. No image downloaded (sources blocked here; no purchase).

## H. Research gaps (ranked by impact)

1. Official verification of any claim (network access or owner-supplied documents) — blocks every profile and the fees page.
2. Current-year operating conditions per university (none has a dated 2025–26 statement in snippets) — blocks publication even after fee/programme verification.
3. SERP/competitor evidence (R3–R5, not authorised) — would tell us who ranks for the twelve names and the fees cluster.
4. Search Console actuals — none exists; property status unknown.
5. Legal entity details (D7) for the policy pages.
6. Live verification of the deployed site — one allow-list entry away.

## I. Ranked next actions

1. **Owner:** add the allowed domains in C (free, minutes). 2. **Me, on access:** run `npm run verify:live`; verify Bukovinian, Vinnytsia and Odesa end-to-end (procedure §3 of the university register) and publish nothing until each passes. 3. **Me, now, no approval needed (repository only):** build the multi-programme profile pipeline — schema extension, comparison table, profile layout, seven unpublishable record shells — so verified facts can go live without further engineering. 4. **Me, repository only:** stepped Stage-1 profile form. 5. **Owner:** confirm the API Units balance (expect 47,040); decide D7 and D9. 6. **Later, approval:** R3–R5 (≈4,100 units at assumed prices) once profiles exist to rank.

## J. Recommended single highest-value next implementation step

**Build the verified-university-profile pipeline in the repository: extend the content schema (field, level, requirement objects, preparatory route), redesign the profile and directory comparison layout (V3/V4), and create the seven approved profile records as unpublishable shells pre-filled with the official source URLs to check — no deployment.**

Why this and not something else: the only acquisition demand measured at scale is for named universities (twelve names, 20–480/mo in India, plus UK and Nigeria interest), and every one of those pages is currently absent or noindex; the sole blocker to publishing them is official verification, which is an owner-side access decision. Doing the engineering now means that the day access exists, each profile needs data entry and review, not development. It also makes the fees page (the lowest-difficulty cluster) publishable from the same verified records, and it serves the readiness service, whose requirement objects live in the same schema. The stepped Stage-1 form is the next step after it. The step is reversible, local, and touches nothing on production; the deployment that eventually publishes verified profiles will be a separate approval.

---

# EXECUTIVE_REPORT.md — Ukraine Medical Admissions, 2026-10-11

Labels used throughout: **VERIFIED** (observed, evidence named) · **OWNER-REPORTED** · **LEAD** (search snippet with URL, unverified) · **HYPOTHESIS** · **DECISION** · **DONE** / **NOT DONE** · **NEEDS APPROVAL**.

## 1. Current verified state of the website

- Production branch `production` = `b2ca3d6` (build of `4d4e605`, tag `release-20261011-005330`, 45 files, fingerprint `5ff6e7e7…c033d4`) — VERIFIED from GitHub. Hostinger deployment into `public_html/` — OWNER-REPORTED; **the live host is not reachable from this environment** (network policy), so no live check has run. The read-only check is ready (`npm run verify:live`) and documented with expected results in `BASELINE_REPORT.md` §9.
- 18 indexable pages in the sitemap, 3 noindex; canonicals, robots, JSON-LD and the two legacy 301s correct in the published tree (VERIFIED offline). One university record (Ternopil), noindex, 0 verified claims; its official name draws 110/mo in India (R2, 2026-10-11), correcting the earlier "0 demand" reading that was UK-only. No country or city pages (deliberate). Fees page has no figures (deliberate).
- Forms: Stage 1 only; behaviour verified in code and with synthetic data locally; **live behaviour and e-mail delivery UNVERIFIED**. No accounts, profiles, uploads, tracking or admin exist.
- Local quality gates: axe 0 violations, Lighthouse 99–100, 3-width smoke, 0 broken links, security headers and exposed-file rules in `.htaccess` (all LOCAL ONLY). CI run #9 passed on the deployed content; later commits are docs and tooling.
- Analytics: none installed; Search Console: unknown to this session. No first-party data exists.

## 2. SEMrush research: what exists, what is missing

Exists *(superseded by the decision report section A: 20 exports, 26 calls, 2,960 cumulative)*: 10 raw exports, 16 logged calls, 2,240 units at published prices (balance not re-read; not inferred). Every number cited in the registers was re-checked against the exports today. Missing: SERP/competitor data for any term; related/question keywords; trends; difficulty/intent outside India; course terms outside the UK; nursing/public-health/rehabilitation/preparatory terms everywhere (except uk "study nursing in ukraine" 20); university names outside in/uk; city terms; broad match outside in/uk. A costed request (R1–R5, `KEYWORD_URL_MAP.md` §9) is written; **no call has been made** — NEEDS APPROVAL.

## 3. Country comparison and recommended priorities (evidence in `KEYWORD_URL_MAP.md` §6)

- **Tier 1 — India:** the only market with measured applicant demand above the lowest buckets and computed difficulty: "mbbs in ukraine" 260 (kd 18), "mbbs in ukraine fees" 260 (kd 7), broad match "ukraine medical college" 2,900 (kd 22), fees cluster 320–720 at kd 11–18; named universities Pirogov 390, Bogomolets 320. Vocabulary: "medical college", "MBBS", "fees".
- **Tier 2 — United Kingdom:** small (10–30/mo per phrase) but measured, English-language, and the only market with course-level data (nursing 20 = MBBS 20 > dentistry 10 > pharmacy 0); named universities 20–70.
- **Tier 3 — Nigeria, Pakistan, South Africa, UAE:** eight exact phrases at 0–30/mo each; broad match never purchased — **unmeasured, not rejected**. R3 (1,440 units) is the fair test.
- Excluded: Russia (not served), returnee/NMC/news demand, UK humanitarian-aid demand, generic "study in ukraine".
DECISION: content wording follows India; the UK is the second content market; no country is dropped or promoted further without R1/R3.

## 4. Keyword-to-URL map and money-page register — DONE (`KEYWORD_URL_MAP.md` §7–§8)

23 clusters mapped over every indexable URL plus the expanded programme and university clusters; 15 money-page candidates assessed with the ten required fields. Decisions: **improve** `/tuition-fees/` (verified figures), `/courses/medicine/`, `/universities/`, `/admissions/` (readiness section), `/courses/nursing/` (on verified supply); **approve for planning after verification** three university profiles — Vinnytsia, Bogomolets, Bukovinian (plus Ternopil on verification merit) *(superseded by section D: seven profiles, Bukovinian first)*; **defer** preparatory resource, country page, public health, physiotherapy; **reject** city pages, a standalone MBBS page, a separate comparison page, sport. **No new SEO page is created by this report.**

## 5. Candidate-profile and document-readiness product — recommendation (`APPLICATION_SYSTEM_SPEC.md` §8–§11)

Free, saveable candidate profile (field, level, universities, education, subjects/grades with scale, documents "have / need") → programme-specific readiness assessment against **verified requirement objects only** (met / not met / unknown / pending evidence; never "eligible") → document checklist with seven states → save and resume without pressure tactics → submission and tracking through the existing four-state machine. Multi-university data model specified; Ternopil is one record among many. Platform: PHP 8 + MySQL on the existing Hostinger plan (no Node runtime on web hosting; no purchase); eight go-live gates before any real document. HYPOTHESIS until built and piloted with synthetic records.

## 6. Revenue model — recommendation and validation gaps (`SERVICE_TIERS_SPEC.md`)

Core: free profile + paid application-support levels (the three provisional tiers, prices unset). First sellable unit: a single fixed-scope **document-readiness review**. Preparatory-route guidance as a feature once routes are verified. **Rejected:** university referral commissions and paid listings — inherent conflict with the published independence disclosure; revisit only on the owner's explicit decision with full disclosure. Gaps: no demand or willingness-to-pay data, no measured workload, no legal entity (D7), no verified requirements to review against. None needs money to close.

## 7. Visual audit and image plan — DONE as a plan (`VISUAL_AUDIT_AND_IMAGE_REGISTER.md`)

The site has a sound design system and **no imagery at all** beyond logos. Direction decided: documentary photographs of study settings (Unsplash, owner-downloaded or allow-listed — the domain is blocked here), in-repo SVG process/document/cost illustrations, image-led cards and profiles; hard rules against implying any named institution; 12-row register with mobile/desktop and performance treatment. Image sourcing is the one visual item blocked by network access.

## 8. University and programme portfolio — research DONE, verification NOT DONE (`UNIVERSITY_DATA_REGISTER.md` §6–§10, `PROGRAMME_SUPPLY_REGISTER.md`, `research/universities/`)

Nine universities swept at snippet level (Vinnytsia, Bogomolets, Bukovinian, Lviv, Ivano-Frankivsk, Odesa, Poltava, Ternopil, Kharkiv): English-medium integrated master's in medicine, dentistry and pharmacy for foreigners is the consistently documented offer; preparatory departments (10 months, Ukrainian + sciences) at all nine; **English-track nursing bachelor leads at Kharkiv and Ternopil only**; public health and physical therapy exist only as Ukrainian-language programmes, several new or unaccredited; no medical-university sport degree; **no university returned a dated official statement of its 2025–26 teaching format** — the first thing to verify. Expansion order *(superseded by the decision report section D after R2: Bukovinian → Vinnytsia → Odesa → Bogomolets → Ivano-Frankivsk → Uzhhorod → Ternopil; Kharkiv gated)*: Vinnytsia → Bogomolets → Ternopil (verification merit) → Bukovinian → Ivano-Frankivsk/Odesa/Lviv/Poltava (R2 decides) → Kharkiv (operating-conditions check first). Zaporizhzhia, Dnipro, Uzhhorod and the two programme-topic sweeps were **not researched** (the shared web-search budget ran out) and are repeated next turn. **0 claims verified; nothing from the sweep may be published.**

## 9. Technical, privacy, security and admissions-information risks

Live site unverified (PHP execution, headers, redirects); e-mail delivery unverified; no analytics or GSC; official information unreachable from the environment (D5); current-year operating status unknown for every university; recognition/licensing questions must use primary regulator documents only; document handling gated by eight security prerequisites; demand in English-language markets is small in the data — the business case rests on India wording plus unmeasured Tier-3 ceilings and on the readiness service's value, not on traffic volume.

## 10. Prioritised actions (rationale in `PROJECT_EXECUTION_PLAN.md` §8)

P0 *(updated 2026-10-11: R1+R2 done for 850 units; verify Bukovinian, Vinnytsia and Odesa first)*: allow-list the production hosts and run `verify:live`; allow-list official university domains (or supply PDFs). P1: verified fees and profiles; `/admissions/` readiness section; visual layers 1–2; stepped Stage-1 profile form. P2: Stage 2 platform on synthetic data; nursing parity; GSC + analytics decision. P3: R3–R5; CMS activation; D9.

## 11. Completed / not completed

DONE: baseline report; reconciliation of all cited metrics against exports; country comparison; master keyword-to-URL register; money-page register; costed research request; candidate-profile service spec; revenue options; visual/image register; implementation proposal; university discovery register, programme matrix, expansion order, deferred list; programme-supply register; live-verification script; meta test extended (alt text, dimensions). NOT DONE and why: live verification (network policy); official verification of any claim (network policy); SEMrush research beyond the existing exports (needs approval); three universities and two programme sweeps (search budget); images (Unsplash blocked); anything on production (no deployment authorised).

## 12. Costs or paid research needing approval

*(Updated 2026-10-11: R1+R2 executed for 850 units; remaining approval candidates are R3 (1,440), R4 ≈1,200 and R5 ≈1,500 at assumed prices — not authorised.)* Original: SEMrush R1 (1,440), R2 (900) — minimum 2,340 units; R3 (1,440); R4 ≈1,200 and R5 ≈1,500 at assumed prices to be confirmed. No other spend proposed; no purchase of any kind is recommended.

## 13. Decisions required before production changes

1. Network allow-list: production hosts; official university and registry domains (free).
2. ~~SEMrush spend R1–R2~~ done 2026-10-11 (850 units); R3–R5 remain optional and unapproved.
3. Approval of each production deployment (none pending).
4. Image-sourcing route (owner-downloaded Unsplash vs allow-list vs generated with labels).
5. Analytics tool and CSP change; GSC property ownership.
6. Legal entity details (D7) for privacy/terms/complaints; D9 default branch.
7. Stage 2 go-live with real documents — only after the eight gates in `APPLICATION_SYSTEM_SPEC.md` §11.


---

# Addendum — decision report for the research and verification phase, 2026-10-11 (evening)

**Verified this phase:** Semrush's published price for the approved reports (10 API units per line, developer documentation snippet). **Not verified:** the account balance (unreadable from this environment) — therefore **R1/R2 were not executed; 0 units spent; cumulative 2,240.** Unblock: the owner reads the API Units page and states the balance; execution then follows the probe-first plan in `SEMRUSH_API_LEDGER.md`.

**University and programme research:** the sweep is complete for all 12 target universities and the three programme topics, at snippet level with every claim quoted and linked (raw data in `research/universities/`). Official pages remain unreachable (network policy, D5), so **0 claims are verified for publication**; the registers are a verification queue with an explicit order. New facts worth the owner's attention, all unverified: Zaporizhzhia's official pages say foreign students are taught offline in Berehove (Zakarpattia) since 2023; Dnipro has no official-domain English programme snippet at all; Uzhhorod offers the broadest health-sciences supply (nursing, public health, rehabilitation, all Ukrainian-language) in a western region; Bogomolets lists no public-health programme for foreigners in 2026; the specialty codes changed in 2024 (229→I9, 227 renamed, 017→A7).

**SEO decisions:** unchanged; §10 of `KEYWORD_URL_MAP.md` records why each defer/improve decision stands. No new page.

**Images:** 20+ free candidates identified from Pexels and Wikimedia Commons with the exact licence check still to do on each page; one Unsplash+ paid item rejected; institution photographs restricted to their own profile pages.

**Live verification:** still blocked; domains and steps unchanged (`BASELINE_REPORT.md` §9): allow `ukrainemedicaladmissions.com` and `www.ukrainemedicaladmissions.com`, then `npm run verify:live`.

**Candidate profile:** stepped Stage-1 form, readiness worked example and missing-document workflow specified (`APPLICATION_SYSTEM_SPEC.md` §12); nothing implemented; no document collection.

**Blockers, in order of impact:** (1) network allow-list for the production hosts and the official university/registry domains — free, minutes, unlocks live checks and the first real verifications; (2) the SEMrush balance reading — unlocks R1/R2; (3) legal entity details (D7).


---

# Addendum — approved SEMrush research executed, 2026-10-11 (night)

**Reconciliation:** owner's balance 47,890 → actual consumption before this phase **2,110**, not the ledger's 2,240; the 130-unit overstatement sat in the published-price *estimate* for the eight parallel 2026-10-10 calls (actual 1,070 in total; per-call split unrecoverable). Ledger corrected; verified figures now govern.

**Probe:** `phrase_these`, 1 keyword → 10 units; every subsequent sequential call read exactly 10 × returned lines; unreturned keywords are not billed.

**Spend:** R1 250 + R2 590 + probe 10 = **850 units** (cap 2,340; R3–R5 not run). Cumulative 2,960; expected balance **47,040** (owner to confirm). Ten raw exports in `research/semrush/2026-10-11-*.csv`.

**How the findings change the money-page priorities**
- University profiles are the main acquisition opportunity and there are twelve measured names, not two: Bukovinian 480 (mixed informational + transactional), Odessa 390 (kd 16), Kharkiv 390 (kd 34), Bogomolets 320 (uk 90), Ivano-Frankivsk 210, Uzhhorod 140, Ternopil 110 (kd 16), Zaporizhzhia 90, Vinnytsia 50 (+ Pirogov 390), Lviv 50, Poltava 20, Dnipro 20 — all India unless stated. Seven profiles are approved for planning in the order Bukovinian → Vinnytsia → Odesa → Bogomolets → Ivano-Frankivsk → Uzhhorod → Ternopil; Kharkiv is held behind an operating-conditions check; Zaporizhzhia, Lviv, Poltava and Dnipro deferred. Every profile still requires official verification before it can be indexed.
- Ternopil's "no demand" reading is corrected: 110/mo in India at the lowest difficulty; the template profile is worth indexing once verified.
- Nigeria shows its first measured named-university interest (eight names at 10–30/mo) → secondary English market; no country pages.
- Programme pages are demoted: nursing (uk 20, in 0, BSN/MSN not returned) drops to P3; public health (uk 10) stays deferred; physiotherapy, sport, preparatory/foundation, requirements/documents phrasings, "english medium" and "mbbs in ukraine 2026" were not returned in any of six databases — defers and rejects confirmed; preparatory routes remain a section of `/admissions/` for student value.
- Small Tier-1 confirmations ("study dentistry" 30, "mbbs eligibility" 30, "for indian students" 20, "is ukraine mbbs valid in india" 20) support improving existing pages, not new URLs. Fee phrasing per university (10–30) confirms fees live on profiles and `/tuition-fees/`. City pages rejected with evidence.

**Unchanged:** no new SEO page; `/tuition-fees/` stays the first content priority and cannot rank without verified figures; no SERP or competitor evidence exists (R3–R5 not run); nothing deployed, nothing purchased, no production change.

## K. Strategic review 2026-10-11 (checkpoint `ca21a48`; analysis, verification and reversible local work only)

Labels: **MEASURED** = read from a SEMrush CSV in `research/semrush/`; **OFFICIAL** = read on an official source (none exists yet); **VERIFIED-IN-REPO** = read in a repository file or computed from it; **OWNER-REPORTED**; **ESTIMATE**; **ASSUMPTION**; **RECOMMENDATION**. Boundaries respected: no SEMrush call, no new page, no deployment, no purchase, no accounts/uploads/payments.

### K.1 Actual state (VERIFIED-IN-REPO)

| Layer | What is true at `ca21a48` |
|---|---|
| Code (branch `claude/university-profile-pipeline`) | Astro static site, 20 built pages (incl. 404 and `/apply/thank-you/`), 18 sitemap URLs; publication gate (`site/src/lib/records.ts`); seven university records with 0 verified claims (`npm run test:records`: "8 records, 1012 checks, 0 failures"); `deferredProgrammes[]`; Ternopil 302 in `site/public/.htaccess`; evidence registers in `research/verification/`. |
| Preview build (`npm run build:preview`, never deployed) | 29 pages: the seven draft profiles (noindex, no canonical/JSON-LD, draft banner, verification queue), `/preview/` and the synthetic sample. |
| Production release (`origin/production` = `b2ca3d6`, build of `4d4e605`) | 45 files; sitemap 18 URLs (identical set to the branch build); `/universities/ternopil-national-medical-university/` served with `noindex, nofollow` and a self-canonical; home and `/apply/` selects offer Ternopil; no other university anywhere. Live behaviour could not be fetched from this environment (host blocked) — `npm run verify:live` has never run. |
| Tests | Local full suite 2026-10-11 (`npm test`, log `npm-test-2.log`): records-evidence 0 failures · check-links 0 broken · check-meta 0 problems · check-redirects 0 problems · ui-smoke 0 failures · a11y 0 blocking/0 minor · perf 4 pages within budget · staging-guard 0 problems · publication-gate 178 checks, 0 failures · preview-ui 0 failures, 0 blocking a11y · EXIT=0. CI runs #12–#15 on this branch: success (run 15 = `ca21a48`). |
| SEMrush | 20 raw exports; 2,960 units consumed in total (2,110 DERIVED from the owner's 47,890 reading + 850 VERIFIED per call); expected remaining 47,040 (ESTIMATE until the owner reads the API Units page). No call in this phase. |
| University facts | **0 verified** across all seven records (749 claim objects; 0 with a source URL or check date). Every value is a search-snippet LEAD or not-published. |
| What the website does for a student today | Reads guidance pages; filters an (empty in production) directory; submits a Stage-1 enquiry (`/apply/` → `public/api/enquiry.php` → e-mail + JSON, honeypot, 422/303 handling) — no account, no save-and-resume, no upload, no payment, no university submission. |
| Blocked | Official `.ua` domains, Ministry portal, EDEBO, NAQA, WDOMS, image hosts and the production host — DNS refused for curl and the fetch tool (`SOURCE_VERIFICATION_REGISTER.md` 2026-10-11 row). |

### K.2 SEMrush findings that matter commercially (MEASURED; report type matters)

Report types: `phrase_all` = one phrase's volume per database; `phrase_these` = exact-phrase volumes for listed keywords in one database; `phrase_fullsearch` = the top keywords *containing* a seed ("ukraine medical"), i.e. a broad container report — its rows are related phrases, not exact-match demand for the seed, and several rows share one rounded bucket (three different phrases each show 2,900), so they must never be added together.

| Cluster | Exact keyword · database · report | Volume | kd · intent | Existing URL |
|---|---|---|---|---|
| "Medical college" directory intent | ukraine medical college · in · fullsearch | 2,900 | 22 · informational | `/universities/` |
| | ukraine medical college list · in · fullsearch | 210 | 11 · informational | `/universities/` |
| | best medical college in ukraine · in · fullsearch | 390 | 14 · informational/commercial | `/universities/` (no-ranking stance) |
| Fees / cost (the commercially strongest cluster) | ukraine medical college fees for indian students · in · fullsearch | 2,900 | 9 · informational | `/tuition-fees/` |
| | ukraine medical fees · in · fullsearch | 720 | 18 | `/tuition-fees/` |
| | ukraine medical college fees · in · fullsearch | 590 | 12 | `/tuition-fees/` |
| | medical fees in ukraine · in · fullsearch | 480 | 12 | `/tuition-fees/` |
| | cost of medical education in ukraine · in · fullsearch | 320 | 11 | `/tuition-fees/` |
| | mbbs in ukraine fees · in · phrase_these (exact) | 260 | 7 · informational | `/tuition-fees/` |
| MBBS / study medicine | mbbs in ukraine · in · phrase_these (2026-10-10 and the 2026-10-11 probe, both 260) | 260 | 18 · informational; 12-month trend rising to its peak in month 9 | `/courses/medicine/` |
| | ukraine mbbs · in · phrase_these | 260 | 18 | `/courses/medicine/` |
| | study medicine in ukraine · phrase_all | uk 30 · za 30 · ae 20 · in 10 · ng 10 · pk 0 (ru 90, excluded market) | n/a | `/courses/medicine/` |
| Named universities (India, exact, R2) | bukovinian 480 (kd 30, informational + transactional) · odessa 390 (16) · kharkiv 390 (34, navigational) · bogomolets 320 (25) · ivano frankivsk 210 (29) · uzhhorod 140 (30) · ternopil 110 (16) · zaporizhzhia 90 · vinnytsia 50 (+ "pirogov medical university ukraine" 390, fullsearch, kd 23) · lviv 50 · poltava 20 · dnipro 20; "<name> fees" 10–30 | | | `/universities/<slug>/` (none published) |
| Eligibility / readiness (India, exact, R1) | mbbs in ukraine eligibility 30 · study dentistry in ukraine 30 · mbbs in ukraine for indian students 20 (cpc 0.36) · is ukraine mbbs valid in india 20 | | not computed | `/admissions/`, `/courses/dentistry/`, `/faq/` |
| Programme families (R1, six databases) | nursing: uk 20 only; public health: uk 10 only; physiotherapy / sports / preparatory / BSN / MSN / MPH: not returned anywhere (unbilled) | | | no page (deferred/rejected) |

What this means: measurable, service-relevant demand exists almost only in India, in the low thousands per month for broad "medical college" phrasing and in the hundreds for exact fees, MBBS and named-university phrasing; UK, Nigeria, Pakistan, South Africa and the UAE show 10–30 per exact phrase. The two clusters that matter — fees and named universities — can only be served with **verified official fee schedules and profiles**, which do not exist yet. Verification is therefore the critical path for SEO as well as for the product.

### K.3 Country comparison (MEASURED unless labelled)

| Country (db) | Head terms | Fees | Named universities | Programme families | Verified supply | Likely customer value (ASSUMPTION) | Priority |
|---|---|---|---|---|---|---|---|
| India (in) | mbbs in ukraine 260; study medicine 10; ukraine medical college 2,900 (fullsearch) | 260 exact; 320–720 fullsearch; 2,900 (fullsearch, rounded bucket) | 20–480 per name, 12 names measured | dentistry 30; nursing 0; others not returned | none yet | highest: medicine-only intent, fee-sensitive, document-heavy applications | **1** |
| United Kingdom (uk) | 30 | mbbs in ukraine fees 20 | bogomolets 90; others 20 | nursing 20; dentistry 10; public health 10 | none | ASSUMPTION: smaller but higher-trust market; UK recognition rules decisive | 2 (trust, not volume) |
| Nigeria (ng) | 10 | 0 | 10–30 | not returned | none | unknown | 3 |
| South Africa (za) | 30 | 0 | not measured (R2 not run for za) | not returned | none | unknown | 4 |
| UAE (ae) | 20 | 20 | not measured | not returned | none | unknown | 5 |
| Pakistan (pk) | 10 | 20 | not measured | not returned | none | unknown | 6 |
| Others | ru 90 (excluded market); cl/cz/dk/hu/jp/mx/zw 30 (phrase_all noise) | not measured | not measured | not measured | none | not pursued | — |

Missing data labelled: kd and intent are computed only where SEMrush had enough data (India mostly); SERP/competitor reports (R3–R5) were never run; GSC does not exist yet; no demand for the service itself (readiness review) is measured anywhere.

### K.4 Final keyword-to-URL map for the existing site (supersedes KEYWORD_URL_MAP.md §7 row by row; "unchanged" unless stated)

| Cluster | → URL | Action | Change vs §7 |
|---|---|---|---|
| study medicine / mbbs in ukraine / ukraine mbbs | `/courses/medicine/` | improve (verified qualification titles, language, duration per university once verified; readiness CTA) | unchanged |
| fees / cost / "for indian students" | `/tuition-fees/` | improve — the strongest commercial cluster; publish the first verified fee rows with year and currency; expand the "how fees are published" and "what a year costs" explainers now (no figures) | unchanged; priority raised to first |
| ukraine medical college / list / best | `/universities/` | improve — directory + verified-only comparison already built; needs ≥3 published profiles to satisfy "list" intent | **interpretation corrected: fullsearch bucket, not exact demand; not additive** |
| medical universities in ukraine (all six dbs, 20 each) | `/universities/` | retain | unchanged |
| named universities | `/universities/<slug>/` | consider new page per verified profile only (M4 Vinnytsia → M16 Odesa → M6 Bukovinian → M17 → M5 → M19 → M18; M20 Kharkiv gated) | **order changed to verifiability-first** |
| eligibility / documents / preparatory | `/admissions/` | improve — readiness checklist structure, preparatory-route section with the no-guarantee sentence (verified routes only) | unchanged |
| study dentistry in ukraine (in 30, uk 10) | `/courses/dentistry/` | retain; improve on verified supply | unchanged |
| nursing (uk 20; BSN/MSN not returned) | `/courses/nursing/` | retain; improve only on a verified programme; never BSN/MSN wording | unchanged |
| pharmacy (no data) | `/courses/pharmacy/` | retain (thin); consolidate into `/courses/` if no verified English programme by the next review | unchanged |
| public health / physiotherapy / sport / preparatory / city pages / "MBBS in Ukraine" page / comparison page / for-Indian-students page | none | defer (public health, physiotherapy, preparatory resource, for-Indian-students) · reject (sport, city pages, standalone MBBS page, separate comparison page) | unchanged |
| is ukraine mbbs valid in india (in 20) | `/faq/` | improve only with an official regulator document | unchanged |
| returnee/policy/aid phrasings | none | reject | unchanged |

No new URL is created under this task. Cannibalisation check unchanged (one URL per intent).

### K.5 Money-page priorities (RECOMMENDATION; strongest existing pages first)

1. `/tuition-fees/` — audience: Indian applicants and parents budgeting; intent: fees/cost; evidence: the fees cluster above; purpose: first verified fee rows → profile → `/apply/`; verification requirement: ≥1 official fee schedule read with its academic year (Vinnytsia 2026/27 PDF and Odesa 2026 table are the nearest).
2. `/universities/` — shortlisting intent (2,900 bucket, 210, 390); needs ≥3 published profiles; conversion: card → profile → apply.
3. `/universities/<slug>/` for Vinnytsia, Odesa, Bukovinian — named-university intent (50 + 390 pirogov; 390; 480); each publishable only after its evidence register passes.
4. `/courses/medicine/` — MBBS/medicine intent (260 ×2); improve with verified titles and the readiness CTA.
5. `/admissions/` — eligibility intent (30) and the product entry (readiness checklist, preparatory routes); the page where the service is explained.

### K.6 University verification (VERIFIED-IN-REPO) and the fastest path

Zero verified claims in all seven records. Missing proof for every record spans all ten categories (identity/address, operating and teaching statement, international eligibility, exact titles, language, requirements with subjects and grades, fees with year, intake dates, documents, preparatory progression conditions); the per-record page lists are in `research/verification/<slug>/EVIDENCE_REGISTER.md` (three approved records) and `DIRECTORY_VERIFICATION_PLAN.md` §6 (all seven). Candidates without a record (Kharkiv, Zaporizhzhia, Lviv, Poltava, Dnipro) stay without one until §2 inclusion criteria are evidenced from opened pages. Routes tested and failed 2026-10-11: curl and the fetch tool (DNS). Legitimate routes: A — owner allow-lists the hosts (EXECUTIVE_REPORT §C list plus `www.`/sub-hosts, `nmu.ua`, `naqa.gov.ua`, `en.naqa.gov.ua`, the production hosts); B — owner/daughter captures the register pages as dated PDFs; C — e-mails to the universities to locate pages (never a source). ESTIMATE of verifier effort once pages are open: 2–4 hours per record for the minimal profile (identity, status, three programmes, fees, documents), plus the daughter's review.

### K.7 Most valuable improvements to existing pages (RECOMMENDATION; no new URLs)

1. Home hero: "Verified & dated university information" overstated the present state — changed on the branch to "Every fact dated and marked verified or pending" (`site/src/pages/index.astro`). Hours; reversible. (Done 2026-10-11.)
2. `/tuition-fees/`: explain how Ukrainian fee schedules are published (per year, in USD or UAH at the NBU rate, by language track, with the academic year) and what else a year costs, with no figures until verified; prepare the fee table to show source and date per row (already supported). Hours.
3. `/admissions/`: add the document-readiness checklist structure (states from APPLICATION_SYSTEM_SPEC §8.3), the "what the four stages mean" explainer, and a preparatory-routes section that prints only verified routes with the standing sentence. Days.
4. `/courses/medicine/`: make the MBBS explainer the entry to readiness ("check your subjects against the published requirements") and reserve the qualification-title block for verified data. Hours.
5. `/apply/`: the stepped Stage-1 form (spec §12.1) — intent, education with subjects and grades, documents have/need, consent — still e-mail/JSON backed. Days.
6. `/faq/`: the India recognition question only with the regulator's own document (blocked here; the owner can supply it).

### K.8 Candidate-profile product (RECOMMENDATION)

Simplest viable architecture on the current hosting: PHP 8 + MySQL (SQLite for the synthetic pilot), server-rendered forms in the existing design system, e-mail magic-link sign-in (no passwords to protect), session cookies (SameSite, HttpOnly), CSRF tokens, rate limits, uploads only in phase 2 to a directory outside the web root with allow-listed types, size caps and authenticated download; nightly encrypted backup; retention and deletion rules; data minimisation (no passport data at profile stage). Data model as APPLICATION_SYSTEM_SPEC §9: candidate, profile, qualifications (subject, grade, scale, status), programme choice, assessment results (met / not met / unknown / pending evidence — only against verified requirement objects), checklist items (states §8.3), status timeline. Phases: 0 (now, no accounts): stepped form + readiness demo on the synthetic sample; 1 (after gates §11 items 1, 3, 6, 7): accounts, save-and-resume, e-mail updates, no uploads; 2 (after all §11 gates): uploads and reviewer queue; 3: payments only after owner approval. Escalate: legal entity and jurisdiction (D7), privacy law and consent text, mail deliverability (N4), and any processing of minors' data.

Service offer: a fixed-scope **document-readiness review** — the student receives a written report comparing their self-declared record with one verified programme's published requirements (met / not met / unknown / pending evidence), a prioritised to-do list and the document checklist with conditions; delivered by e-mail within a stated turnaround after the candidate's profile reaches a complete-enough state; ESTIMATE 1–2 reviewer hours per report (to be measured on ≥5 synthetic cases); pricing tested only after workload measurement, competitor price points recorded with sources, refund terms and consumer-law review in the operating jurisdiction; disclosures: independence, no guarantee of admission/visa/recognition, what the fee does and does not include, refund and complaints routes. Not sellable until at least one programme's requirements are verified.

### K.9 Visual and image improvements (RECOMMENDATION; no purchases)

The design system (Inter / Inter Tight, navy/blue/yellow tokens, cards, badges) is consistent and accessible (axe clean), but the site has no imagery beyond logos and reads as a template. Materially useful, in order: (1) one documentary hero photograph of a study setting from the Pexels candidates in VISUAL register §8 (owner downloads; licence line, author and date recorded in §8 before use; alt text "students studying — illustrative, not a university in Ukraine"); (2) course-page header images (anatomy/dental models) with the same rule; (3) an in-repo SVG illustration set for the four stages and the document checklist; (4) keep the initials tiles for universities until a licensed photograph of each campus exists (never imply a campus); (5) verified badges with real dates are the strongest trust element — they appear automatically once data is verified. Image hosts are blocked here; the owner performs the downloads.

### K.10 Five highest-priority actions

| # | Action | Why | Evidence | Effort | Reversible | Approval |
|---|---|---|---|---|---|---|
| 1 | Open official-source access: allow-list the hosts (or capture the register pages) | unblocks the fees cluster, the profiles, the readiness product and the service offer at once; 0 verified claims today | K.2, K.6; `SOURCE_VERIFICATION_REGISTER.md` | minutes (owner) | yes | network setting only |
| 2 | Verify Vinnytsia and Odesa first, then Bukovinian; publish the first fee rows and 2–3 profiles in one release | the two strongest commercial clusters need verified fees and named profiles | `research/verification/*`, K.4 | 2–4 h per record + review | yes | release approval (separate) |
| 3 | Content improvements without claims: tuition-fees explainers, admissions readiness structure, medicine readiness CTA, home copy | serves the fees/eligibility intents honestly now; raises trust | K.7 | hours–days | yes | none |
| 4 | Stage-1 stepped candidate-profile form and the readiness demo on synthetic data | product foundation; measures stage conversion before any pricing | APPLICATION_SYSTEM_SPEC §12 | days | yes | none (no accounts) |
| 5 | Operability and measurement: make the repository private (D8), install Pages CMS (Rung 1), create the Search Console property after the first release | the daughter must run the verification loop; GSC replaces assumptions with actuals | `UNIVERSITY_DATA_REGISTER.md` §2a; K.3 gaps | hours | yes | owner actions (free) |

### K.11 Completed in this phase / blocked

Completed: reconciled state (K.1); SEMrush re-read from the raw CSVs with report types distinguished (K.2–K.4); map decisions recorded (K.4, KEYWORD_URL_MAP §7/§8 notes); verification routes and registers (K.6, earlier today); Ternopil URL preserved by a tested 302; home hero copy corrected; full local test suite and CI green. Blocked: every official-source read (DNS), live verification of production (host blocked), imagery downloads (hosts blocked); the multi-agent audit attempted for this review hit the session's agent limit, so the analysis above was done directly from the files and is labelled accordingly.

### K.12 Next single action

Allow-list the official domains listed in §C plus the gaps named in K.6 (or send the first captures per `research/verification/vinnytsia-…/EVIDENCE_REGISTER.md`). Evidence: both commercial clusters that SEMrush measured (fees; named universities) and the readiness product depend on official data; the repository holds 0 verified claims; the registers, layouts, gate and tests are ready, so the first verified profile can follow within a working day of access.
