# DECISION REPORT — research audit complete, 2026-10-11 (latest; supersedes the addenda below where they differ)

## A. SEMrush batch reconciliation (reconciled; derived figures labelled)

| Item | Figure | Source |
|---|---|---|
| Calls made 2026-10-11 | 10 (1 probe + 6 R1 + 3 R2) | `SEMRUSH_API_LEDGER.md` "R1 + R2 executed" |
| Raw exports | 10 files, 85 returned lines, each file's lines × 10 = the recorded cost of its call (all ten match) | `research/semrush/2026-10-11-*.csv`; programmatic check + independent audit agent (≈400 values, 0 errors) |
| Units used this phase | **850** of the 2,340 cap; R3–R5 not run | ledger |
| Consumption before this phase | **2,110** (50,000 − owner's 47,890) — **DERIVED**: assumes the 50,000 screenshot preceded the first paid call and that no other tool connected to the account drew on the shared unit pool; replaces the ledger's earlier 2,240; the 130 overstatement sat in the published-price estimate of the 2026-10-10 parallel batch (actual 1,070; per-call split unrecoverable) | ledger reconciliation entry |
| **Cumulative** | **2,960** (position after R1/R2; superseded 2026-10-11 by programme 3: 6,230 line-based, see §N.6) | |
| **Expected remaining** | **47,040** after R1/R2 (superseded: 43,770 after programme 3, ESTIMATE; §N.6) | |
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

**Spend:** R1 250 + R2 590 + probe 10 = **850 units** (cap 2,340; R3–R5 not run). Cumulative 2,960; expected balance **47,040** (owner to confirm) at that point; superseded by programme 3 (§N.6). Ten raw exports in `research/semrush/2026-10-11-*.csv`.

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
| SEMrush | 20 raw exports; 2,960 units consumed in total (2,110 DERIVED from the owner's 47,890 reading + 850 VERIFIED per call); expected remaining 47,040 (ESTIMATE until the owner reads the API Units page). No call in this phase. (Superseded by programme 3: §N.6.) |
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

## L. SEMrush-governed review 2026-10-11 (the eight required answers; MEASURED unless labelled)

1. **Data examined:** all 20 exports in `research/semrush/` re-parsed from the raw CSVs: `phrase_all` (study medicine in ukraine, 79 databases, 35 with volume); `phrase_fullsearch` "ukraine medical" (in, uk; 18 rows each); `phrase_these` 8 phrasing variants (in, uk, ng, pk, za, ae) and 20 UK seeds (2026-10-10); R1 programme terms (six databases; 25 lines returned of 144 requested) and R2 universities + cities (in 21, uk 24, ng 14 lines) and the 10-unit probe (2026-10-11). Ledger: 2,960 units consumed; 47,040 expected remaining (ESTIMATE until the owner's next reading).
2. **Opportunities supported:** O1 fees (India; exact 260 at kd 7; broad 320–720 at kd 11–18), O2 named universities (India exact 50–480; kd 16–34), O3 directory/list/comparison (India broad 210–2,900 bucket; "medical universities in ukraine" 20 in five databases), O4 MBBS/medicine (India exact 260 ×2; uk/za 30), O5 eligibility/recognition (India 20–30). Everything else is unproven or rejected (§13 of `KEYWORD_URL_MAP.md`).
3. **Unknown or unmeasured:** SERP competition for every cluster (no `phrase_organic` run); broad ceilings in ng/pk/za/ae (`phrase_fullsearch` only run for in/uk); named-university demand in za/ae/pk; long-tail fee/eligibility phrasings; kd and intent outside India for most terms; any demand for the readiness service itself; GSC actuals (no property yet).
4. **Existing pages to improve (in order):** `/tuition-fees/` (O1), `/universities/` (O3), `/courses/medicine/` (O4), `/admissions/` and `/faq/` (O5), `/courses/dentistry/` (O6); home copy corrected 2026-10-11.
5. **New pages meriting consideration:** only `/universities/<slug>/` per verified profile (O2), in the verifiability order Vinnytsia → Odesa → Bukovinian → Ivano-Frankivsk → Bogomolets → Ternopil → Uzhhorod (Kharkiv gated). No programme-family, city, country or standalone-MBBS page.
6. **Revenue link:** O1 and O2 bring fee-sensitive, university-specific applicants to the Apply CTA; O5 is the entry to the candidate profile and the document-readiness review (SERVICE_TIERS_SPEC option B); O3/O4 feed both. None of this is sellable before verified requirements and fees exist.
7. **Facts to verify before publication:** per record, the ten proof categories in `research/verification/<slug>/EVIDENCE_REGISTER.md`; for O1 specifically ≥1 official fee schedule with its academic year; for O5 the regulator's own document on recognition in India.
8. **Next action and why:** open official-source access (allow-list or captures) — every proven cluster depends on verified official data; then, after the first verified fee or profile, approve RB1 (SERP competition, ≈800 units at the assumed price) so the competitive column stops reading "not measured".

## M. Master mandate — Phase 1 report (evidence programme), 2026-10-11

**Completed:** research programme 3 executed under the owner's cap (working cap 5,000 incl. the 850 R1/R2 units): 26 calls, 22 with data, **3,270 units line-based (max-reading estimate 3,380; conservative bound 3,850)**; raw exports `research/semrush/2026-10-11-P3-*` (22 files); per-call ledger `SEMRUSH_API_LEDGER.md`; SERP and competitor register `KEYWORD_URL_MAP.md` §16; opportunity register §13 updated (competition column now measured for O1–O4; O5: question phrasings only); backlog §14 items RB1–RB5 executed; decision log §17. Cumulative consumption 6,230 line-based (max-reading estimate 6,340; conservative 6,810); expected balance 43,770 (max-reading 43,660; conservative 43,190) — ESTIMATE until the owner's next reading.

**What SEMrush now shows (MEASURED):** every India SERP for the fees, MBBS and college terms is held by education agencies (plus Wikipedia's list for the directory terms, Quora, shiksha, ranking sites); no official university and no regulator ranks for them. Named-university head terms belong to the official sites (Bukovinian #1/#3/#5), and for Vinnytsia two look-alike domains outrank the official site. The top agency page captures the whole cluster with an estimated 701 visits/month. Broad ceilings outside India are 20–40. Students' questions cluster on cost, duration, validity in India, NEET, and how to apply.

**What it changes:** nothing in the URL map (one URL per intent holds), but priorities are now evidence-backed: `/tuition-fees/` first (verified fee schedules + the question phrasings), `/universities/` second (needs ≥3 verified profiles to beat a Wikipedia list), `/courses/medicine/` third (MBBS phrasing incl. the kd-7 "ukraine mbbs college"), profiles for the admissions sub-intent with look-alike warnings, `/faq/` and `/admissions/` for the question phrasings with official sources only. Expectation: hundreds of visits a month from this cluster, not thousands; the asset's value is conversion of a small, high-intent audience.

**Blocked:** official-source verification (DNS), so no fee or profile can yet be published; UK SERP competition (not stored by SEMrush).


## N. Integration handover — Phases 2–5 (2026-10-11; working branch `claude/university-profile-pipeline`, mirrored on `claude/new-session-ppgh22`; nothing deployed)

**Commits.** `50376e3` Phase 2 page content → five work packages merged without conflicts (`2ffc221` apply, `b1f87e0` readiness, `e37946e` stage2, `d19d662` visual, `1634697` directory) → `4136658` integration fixes (CSP inline scripts N20, keyed IP hash N21, false-claim copy, test wiring) → a follow-up commit with the fixes found by the read-only verification of `4136658` (claims, security and documents; see "Verification" below). The final hash is the branch head in `git log`.

### N.1 Work packages and files (VERIFIED-IN-REPO: `git diff --name-status 50376e3 wip/<key>`)

| Package | Files |
|---|---|
| Stepped candidate-profile form (`wip/apply`) | `site/public/api/enquiry.php`, `site/src/pages/apply/index.astro`, `site/src/pages/apply/thank-you.astro`, `site/src/pages/privacy/index.astro`, `site/src/scripts/apply-steps.ts` (new), `site/src/scripts/form-validate.ts`, `site/tests/a11y.mjs`, `site/tests/enquiry-php.mjs` (new), `site/tests/ui-smoke.mjs` |
| Readiness logic and synthetic demo (`wip/readiness`) | `site/src/lib/readiness.mjs` (new), `site/src/lib/synthetic-candidate.mjs` (new), `site/src/components/readiness/*` (7 new), `site/src/pages/preview/[...path].astro`, `site/tests/preview-ui.mjs`, `site/tests/publication-gate.mjs`, `site/tests/readiness-logic.mjs` (new) |
| Stage-2 design and readiness-review offer (`wip/stage2`, documents only) | `APPLICATION_SYSTEM_SPEC.md` (§14), `SECURITY_AND_RELEASE_CHECKLIST.md` (§C), `SERVICE_TIERS_SPEC.md` |
| Visual layer (`wip/visual`) | `site/src/components/illustrations/{ApplicationJourney,DocumentStates,HeroIllustration,Icon}.astro` (new), `site/src/components/CtaBand.astro`, `site/src/lib/courses.ts`, `site/src/pages/{index,admissions/index,courses/index,courses/[course]}.astro`, `site/src/styles/global.css`, `VISUAL_AUDIT_AND_IMAGE_REGISTER.md` (§11) |
| Directory, per-URL specs, analytics plan (`wip/directory`) | `site/src/pages/universities/index.astro`, `KEYWORD_URL_MAP.md` (§18–§19), `DIRECTORY_VERIFICATION_PLAN.md` (§9), `ANALYTICS_AND_SEARCH_CONSOLE.md` (new) |

### N.2 Tests by layer

- **Local (this environment):** the full `npm test` chain plus `npx astro check` on the integrated tree; results are in the commit messages of `4136658` and the follow-up commit (every stage 0 failures; a11y covers 20 pages at two widths plus 14 apply-form states; `enquiry-php` and `readiness-logic` included).
- **CI:** Site CI succeeded on `4136658` (runs 38156249853 and 38156251319); the follow-up commit's run is recorded in the chat handover.
- **Live:** not run. The production host and every official `.ua` domain are blocked from this environment; `npm run verify:live` has never run.

### N.3 Verification of `4136658` (three read-only reviewers) and what was done

Fixed in the follow-up commit: present-tense claims of features that do not exist (services document review and status tracking, FAQ readiness check, FAQ photographs, privacy access log, disclosure "paid services"); "verified information" in the site description, Organization JSON-LD, about, services, course and fees descriptions; "full list" in the directory title and medicine page; an unapproved promise of a free manual requirements comparison and fee confirmation (apply, thank-you, admissions, privacy, fees, FAQ); unverified generalisations (fee currency practice, passport validity, "often biology and chemistry"); the privacy notice now discloses the keyed IP code, the timestamp and the mailbox copy; the handler no longer strips "<" from input (a grade "<50" was stored empty); MIME headers; `display_errors` off; CSP sent on error responses; `/uma-private` refused; directory cards now actually hide when filtered, with a stronger test; contact form length limits and an announced error. Documentation inconsistencies fixed on `wip/docs-fix` and merged.

### N.4 Open items

| Item | Status | Owner action |
|---|---|---|
| Enquiry e-mail delivery from the host (N4) | NOT VERIFIED: only captured locally through a redirected sendmail | after an approved release, send one synthetic profile and confirm it reaches the business mailbox, not spam |
| Legal pages are drafts with placeholders but are in the build and sitemap; the forms collect data under the draft notice (A10/D7) | release blocker | legal entity, address, retention periods, legal review |
| Latent: once a record is publishable, components would print unverified values and internal notes, and the R6 gate enforces less than the published "What we check" list (N23) | must be fixed before the first profile is published | none (development task) |
| `ip_hash_key` in `uma-private/config.php` (N21) | needed at release | create a random key on the host |
| Live CSP and header behaviour (N20) | UNVERIFIED | after an approved release, check the mobile menu on a phone |
| Minor deferred defects (N22) | documented | none |

### N.5 Directory (VERIFIED-IN-REPO; `DIRECTORY_VERIFICATION_PLAN.md` §9)

0 profiles published; 7 draft records with 749 claim objects, 0 verified, 0 with a source URL; production builds show the empty state and redirect the old Ternopil URL (302). Most important gaps: no official page can be read from here (owner Route A allow-list or Route B captures); no verified fee schedule, so `/tuition-fees/` cannot answer the strongest fee queries; fewer than three profiles, so the directory cannot satisfy the "list" intent; N23 must be fixed before the first profile flips to publishable.

### N.6 SEMrush position

Units spent in Phases 2–5: **0**. Cumulative consumption 6,230 line-based (max-reading estimate 6,340; conservative bound 6,810); expected balance 43,770 (43,660; 43,190): ESTIMATE until the owner's next API Units reading, which is the required reconciliation step before any further metered call. Programme-3 headroom under the 5,000 cap: 880 / 770 / 300. Strongest evidence-backed opportunities (MEASURED, India database): fee phrasings (ukraine medical fees 720, kd 18; ukraine medical college fees 590, kd 12; medical fees in ukraine 480, kd 12; ukraine mbbs fees 260, kd 7; cost of mbbs in ukraine 260, kd 11) → `/tuition-fees/`; named universities (bukovinian state medical university 480, kd 30; odessa 390; pirogov 390 broad; bogomolets 320) → profiles; directory phrasings (ukraine medical college 2,900 broad, kd 22; list 210, kd 11; best 390, kd 14) → `/universities/`; ukraine mbbs college 480, kd 7 → `/courses/medicine/`. Every India SERP for the fee, MBBS and college terms is held by agencies, and the top agency page earns an estimated 701 visits a month across 20 keywords: the realistic prize is hundreds of high-intent visits, not thousands.

### N.7 Deployment and data

No deployment: `origin/production` is unchanged at `b2ca3d6` (release of 2026-10-11 00:53 UTC). No sensitive-data collection was introduced: the stepped form asks for study plans, education with self-reported grades, have/need/not-sure answers about documents (no files), residence, optional nationality and language preference; no passport number, date of birth, document upload, health or payment data; nothing is sent to any university.

### N.8 Recommended next task

Verify the first university profile from official sources, starting with its fee schedule, then complete the three-profile set in the owner's order (Vinnytsia → Odesa → Bukovinian). Reason: every proven organic cluster (fees, named universities, directory) and the only legitimate revenue line (the document-readiness review) depend on verified official data, and none exists. Preconditions: the owner opens access (Route A, minutes) or supplies captures (Route B); N23 is fixed in the same change so a published profile shows only verified facts; release only on separate approval.

## O. Publication gate, evidence store and research drafts — handover (2026-10-11; branch `claude/university-profile-pipeline`; nothing deployed)

### O.1 Baseline before this work (Phase 1)

| Item | State | How established |
|---|---|---|
| Working branch | `claude/university-profile-pipeline` at `4b93a11`, equal to its remote | git |
| Production | `origin/production` at `b2ca3d6` (2026-10-11 00:53 UTC), unchanged; it still lists the unverified Ternopil card on `/universities/` and serves a noindex Ternopil page | `git show origin/production:…` |
| CI on `4b93a11` | success | GitHub Actions |
| Working locally | full chain; the stepped form, menu, directory filters and contact form under the production headers (32 of 32 end-to-end checks) | local runs |
| Verified against a real external service | nothing: mail delivery, live headers and every official source are untested | network policy refuses the hosts |
| Designed, not built | Stage 2 accounts and uploads (`APPLICATION_SYSTEM_SPEC.md` §14) | documents |

### O.2 What changed

- **Fail-closed publication system** (backlog N23 fixed). `site/src/lib/publication.mjs` decides every public value field by field: the record claim must be verified and backed by a matching evidence entry (`site/data/evidence/<slug>.json`) that is verified, quoted, dated, exactly equal, from an allowed tier on the official host (fees tiers 1–2; recognition tier 4 only), not contradicted, not past review and not for an ended academic year. The `publishable` flag can only narrow; a flagged record that fails stops the production build. Every schema field is classified public, editorial or internal, and an unclassified field fails tests and builds. JSON-LD is written through an escaper in both `Base.astro` and `Breadcrumbs.astro`; meta attribute text cannot carry angle brackets.
- **Evidence store and standard.** `UNIVERSITY_EVIDENCE_STANDARD.md` (statuses, source hierarchy, conflict and expiry rules, the reviewer's procedure, 17 owner decisions); one evidence file per record, each with zero entries and an access block; the register generator shows evidence and access per claim.
- **Access record.** `DIRECTORY_VERIFICATION_PLAN.md` §10.1a lists all 32 hosts refused on 2026-10-11 (plus each research draft's own hosts) and states that a gateway denial is an access limitation, never evidence; §10.2–§10.4 list the exact official pages and PDFs needed for Vinnytsia, Odesa and Bukovinian, claim group by claim group.
- **Research drafts.** Kharkiv, Zaporizhzhia, Dnipro, Lviv and Poltava added as unpublished research-draft records with evidence registers; every value is an unverified lead with a dated note; no fee, deadline or intake value; gating questions first.

### O.3 Acceptance criteria (verified on the final tree)

| Criterion | Result |
|---|---|
| 1 Twelve records unpublished everywhere | Production build: 0 of 57 files mention any record's slug, names or hosts; sitemap has no profile URL; only `.htaccess` carries the Ternopil 302 rule. Live production still shows the old Ternopil card until an approved release. |
| 2 Each field validated against its own evidence | Yes: per-claim evaluation; the flag only narrows (`test:publication`, 729 unit checks). |
| 3 No leak of notes or unapproved fields | Fixture production builds scan every output file for canaries, with positive controls; field-policy coverage test; mutation-proved. |
| 4 Twelve scenarios in CI, both breakout regressions | `npm run test:publication` and `npm run report:publication` are CI steps; build-level and static tests cover `Base.astro` and `Breadcrumbs.astro`, each proved by removing the escaper. |
| 5 Blocked hosts and pages documented | §10.1a–§10.4; access blocks only, no evidence entries. |
| 6 No inferred claims in the five drafts | Audit: 0 money values, 0 deadline values, 0 verified claims, 0 values without a lead note; two adversarial record audits. |
| 7 Full suite and CI on the final commit | Local full chain passed; CI result recorded in the chat handover. |
| 8 Push only to the review branch | Yes; the session branch is no longer updated. |

### O.4 Directory (Phase 4 audit; the owner's Phase 4 brief arrived truncated)

Exists: `/universities/` with six filters (city, programme family, level, language, preparatory route, intake), reset, live count, an honest empty state, verified-only comparison table, how-to, no-ranking and look-alike guidance; profiles, filters, chips, data attributes and JSON-LD built only from shown values. Incomplete: everything that needs verified data (production lists 0 universities). Not built: search, sorting, a pick-and-compare selection, saved shortlists.

### O.5 Open items

N4 mail delivery unverified; A10/D7 legal pages are drafts (release blocker); N22 minor defects; N24 residual gate decisions; 17 owner decisions in the evidence standard; live CSP and headers unverified.

### O.6 SEMrush

0 units spent. Cumulative 6,230 line-based (max-reading 6,340; conservative 6,810); expected balance 43,770 (43,660; 43,190); headroom under the 5,000 cap 880 / 770 / 300. ESTIMATE until the owner's API Units reading.

### O.7 Owner actions

1. Allow the hosts in `DIRECTORY_VERIFICATION_PLAN.md` §10.1a in the environment's Network access settings, or supply captures (Route B). Nothing can be verified until then.
2. Send a current SEMrush API Units reading.
3. Decide N24 (a)–(c) and the evidence standard's §13 items before the first profile is published.
4. Insert the legal entity and retention periods (A10/D7) before any release.
5. Approve a release when ready: only a release removes the unverified Ternopil card from the live site.

## P. SEMrush-led execution and release candidate (2026-10-12; branch `claude/university-profile-pipeline`; nothing deployed)

### P.1 Work completed

- **Publication policy (backlog N24):** fail-closed defaults for the three owner decisions, every setting in `site/src/lib/publication-config.mjs`, memo `PUBLICATION_POLICY_DECISIONS.md` (exact backlog wording, consequences, "OWNER DECISION: confirm or change"); gaps (d)–(f) fixed; two review bypasses closed (hyphenated words, past dates with extra text).
- **Legal readiness:** the four legal pages read owner details from `site/src/lib/legal.mjs` with visible markers; `npm run check:release` refuses while anything is missing (placeholders such as "TBC" count as missing); `LEGAL_COMPLETION_CHECKLIST.md`.
- **Release safety:** `site/scripts/release-gate.mjs` is the production publish gate; the publish workflow runs it before its only push and has a non-deploying `verify` target; CI calls the real publish workflow in `verify` mode and runs simulations proving the gate refuses a failed publication gate and missing legal details; `EMAIL_DELIVERY_VERIFICATION.md`, `RELEASE_CHECKLIST_PROPOSED.md`, `RELEASE_CANDIDATE.md`; `verify-live.mjs` gains the Ternopil, empty-state, sitemap, CSP, inline-script, handler and private-storage checks, self-tested against the production build with 24 defect mutations.
- **Evidence tooling:** `npm run evidence:add` (validates one entry, dry-runs it through the policy's own context, writes only on request, keeps record and evidence in step) and `capture-intake.py` for owner captures; register page hints for the five drafts.
- **SEMrush-backed page improvements:** FAQ anchors and cross-links for the measured question phrasings; "Ukraine MBBS college" phrasing on `/courses/medicine/` (`09a5a59`). No page was added.

### P.2 SEMrush status (MEASURED from `research/semrush/` and `SEMRUSH_API_LEDGER.md`)

**Last used:** 2026-10-11, research programme 3 (26 calls; the last, call 26, a `resource_organic` export of the top agency page). No call since.

**Balance: UNVERIFIED.** The last owner reading was 47,890 units on 2026-10-11, before the R1/R2 batch. Estimates since then: consumed 6,230 line-based (max-reading 6,340; conservative 6,810); remaining 43,770 (43,660; 43,190). Headroom under the 5,000-unit programme cap: 880 line-based, 300 conservative. No unit is spent until the owner's API Units reading is reconciled in the ledger.

**Inventory: 42 raw exports.**

| Dimension | Count |
|---|---|
| Dates | 2026-10-10: 10 (pilot and follow-up) · 2026-10-11: 32 (1 probe, R1 6, R2 3, programme 3: 22) |
| Report types | `phrase_these` 21 (exact phrase overview) · `phrase_organic` 8 (top-10 SERPs) · `phrase_fullsearch` 5 (broad-match containers) · `phrase_questions` 3 · `phrase_related` 2 · `resource_organic` 2 (a competitor page's keywords) · `phrase_all` 1 (one phrase across databases) |
| Databases | India `in` 21 · United Kingdom `uk` 5 · Nigeria `ng` 4 · Pakistan `pk` 4 · South Africa `za` 4 · UAE `ae` 3 (plus `phrase_all` across many) |

Broad-match (`phrase_fullsearch`) rows are containers that overlap: they are never added together and never treated as exact demand. "Ukraine medical college" 2,900 is such a container.

**Strongest evidence-backed clusters and the URL for each (India database unless stated; exact phrase volumes per month as exported):**

| Cluster | Evidence | Competition | Target URL | Status |
|---|---|---|---|---|
| Fees and cost | ukraine medical fees 720 (kd 18); ukraine medical college fees 590 (kd 12); medical fees in ukraine 480 (kd 12); ukraine mbbs fees 260 (kd 7); cost of mbbs in ukraine 260 (kd 11) | every top-10 result is an agency page; no official source ranks | `/tuition-fees/` | exists; needs a verified fee schedule to answer the query |
| Named universities | bukovinian state medical university 480 (kd 30); odessa national medical university 390 (kd 16); kharkiv national medical university 390 (kd 34); bogomolets 320 (kd 25); ivano frankivsk 210 (kd 29); uzhhorod 140 (kd 30); ternopil 110 (kd 16); pirogov medical university ukraine 390 (broad) | official sites hold the top results; look-alike domains outrank Vinnytsia's official site | `/universities/<slug>/` per verified profile | no profile verified |
| MBBS phrasing | ukraine mbbs college 480 (kd 7, the lowest in the cluster); mbbs in ukraine 260 (kd 18) | agencies | `/courses/medicine/` | exists; phrasing added in `09a5a59` |
| Directory / list | ukraine medical college list 210 (kd 11); best medical college in ukraine 390 (kd 14); ukraine medical college 2,900 (broad container, kd 22) | Wikipedia's list and rankings sites | `/universities/` | exists; lists nothing until ≥3 profiles verify |
| Eligibility and questions | mbbs in ukraine eligibility 30; is ukraine mbbs valid in india 20; questions: cost 40/20/20, duration 30, validity in India 30+20+10+10, NEET 20 | not measured | `/admissions/#readiness`, `/faq/` | exists; FAQ anchors and cross-links added in `09a5a59` |

**Pages to improve, consolidate or remove.** Improve: the five URLs above (done where no verified facts are needed). Consolidate if no verified English-taught programme exists by the next review: `/courses/pharmacy/` (uk 0; unproven). Keep without new pages: `/courses/nursing/` (uk 20 only; never BSN/MSN wording), `/courses/dentistry/` (in 30, uk 10). Remove: the live unverified Ternopil profile (already a 302 to `/universities/` on the branch; removed from the live site only by the next approved release).

**Proposed pages that lack evidence (not built):** country pages for India, Nigeria, Pakistan, South Africa or the UAE (exact demand 10–30; the India 2,900 figure is a broad container); city pages (no city phrase returned in India); a separate MBBS page (same intent as `/courses/medicine/`); public health, physiotherapy, sport, preparatory-course and BSN/MSN pages (not returned in any database); a "best universities" ranking page (we do not rank).

**Smallest justified research batch (only after the balance is reconciled):** none is needed now: every proven cluster waits on verified official data, not on more keyword data. If the owner wants one batch, the smallest with decision value is two `phrase_organic` SERPs in India for "mbbs in ukraine eligibility" and "is ukraine mbbs valid in india" (2 calls × 10 lines × 10 units = 200 units, inside the 300-unit conservative headroom), to learn whether the question phrasings are winnable from `/admissions/` and `/faq/`.

### P.3 Release candidate

See `RELEASE_CANDIDATE.md`: status, changes against production, the safeguard, blockers in four categories, release instructions and rollback. Status: not safe to release until the owner's legal details are complete; every other check passes.

## Q. University directory made visible — research previews, page rewrites, SEMrush priorities (2026-10-12; branch `claude/university-profile-pipeline`; nothing deployed)

### Q.1 Why the universities were not visible (diagnosis)

- **Live site (`b2ca3d6`):** shows one card, Ternopil, from before the publication gate. That card was never verified.
- **Working branch, before this milestone:** none of the 12 records is published. Each needs evidence entries for its facts, and every evidence file has **0 entries** because every official university and government host is refused by this environment's network policy. The directory then rendered its deliberate empty state ("we do not list the university here, not even as pending"). The 12 records produced no card, no page and no mention.
- **Release:** the release gate refuses because the owner's legal details are missing, so nothing from the branch reaches the live site. The publish workflow and CI are behaving as designed.
- **Not the cause:** routes, templates, navigation, links and deployment configuration. The main navigation already led with "Universities", the homepage linked the directory, and `/universities/` and `/universities/[slug]/` existed. The blank directory came from the publication rules plus the lack of evidence, and the release block kept the fix off the live site.

### Q.2 What was built

- **Research previews (N25):** owner setting `RESEARCH_PREVIEWS`, opt-in per record; see `PUBLICATION_POLICY_DECISIONS.md` (d).
  - The 12 universities are listed by name, labelled "Not yet verified", in the directory and on the home page.
  - Each has a page at `/universities/<slug>/`, built only from the policy projection. It shows no facts today. It lists what to check before applying and what is still unverified, gives an Apply Online Now route with the university preselected, and states that it is not the university's website and claims no partnership.
  - Preview pages are noindex/follow, carry no structured data and are never in the sitemap.
  - Records stay unpublished: 0 published, 12 previews.
- **Directory:** verified and not-yet-verified tiers, and alphabetical name search that ignores filler words and accepts spelling variants (Odessa, Kharkov, Lvov, Vinnitsa, Zaporozhye, Uzhgorod, Ternopol, Dnepr, Pirogov). Facet filters appear only when verified data exists. The caveat is said once, and the cards are compact on mobile.
- **Home:** new H1, true trust points, and the full list of 12 universities.
- **Forms:** `/apply/` and the home start form offer each preview labelled "(not yet verified)".
- **Ternopil URL:** served as its preview page (the 302 was removed; the gate enforces the rule both ways).
- **Page rewrites:**
  - `/courses/medicine/`: rebuilt as the medicine (MBBS) hub, with an H2 on programme length that gives no figure.
  - Dentistry, nursing and pharmacy: course-specific checks replace a 169-word shared block.
  - `/admissions/`: task-led, with the eligibility wording and one "Coming later" box.
  - `/faq/`: eligibility, cost and duration first; India recognition split from other countries; new questions on "not yet verified" and what we do today. The unverified "Study in Ukraine portal" claim was removed.
  - `/tuition-fees/`: the fee-schedule guide leads, followed by a printable list of questions to ask; the MBBS and "equivalent" claims are fixed.
  - `/about/`, `/contact/`, `/services/`, `/404`, `/apply/` and `/apply/thank-you/`: titles, structure and duplicate lines fixed.
- **New indexable pages: none.** The SEMrush evidence rejected country, eligibility, comparison, standalone MBBS and city pages for this round (Q.3). University profiles become indexable automatically once verified.

### Q.3 SEMrush (existing 42 exports; 0 units spent; balance unverified)

| Question | Answer from existing exports (exact demand unless labelled) |
|---|---|
| Strongest university demand (India, exact) | Bukovinian 480 · Odesa ("odessa…") 390 · Kharkiv 390 · Bogomolets 320 · Ivano-Frankivsk 210 · Uzhhorod 140 · Ternopil 110 · Zaporizhzhia (former name) 90 · Lviv 50 · Vinnytsia 50 (Pirogov 390 is broad only) · Poltava 20 · Dnipro 20. Total 2,270; steady across 12 months. |
| Strongest countries | India 3,160 exact; UK 490; UAE 310; Nigeria 300; Pakistan 290; South Africa 150. |
| Competitor pages with traffic | One agency hub (rmcedu "MBBS in Ukraine") holds positions 1–6 on 20 India keywords for an estimated 701 visits/month in total; the MBBS, fees and "college" SERPs share 4–6 of 10 URLs. |
| Pages to rewrite or expand | `/universities/` (list intent: "ukraine medical college list" 210, broad), `/courses/medicine/` (MBBS hub: "mbbs in ukraine" 260 exact), `/tuition-fees/` ("mbbs in ukraine fees" 260 exact), `/admissions/` (eligibility 30), `/faq/` (question rows 10–40). Done. |
| Merge or remove | `/courses/pharmacy/`: zero measured demand (uk 0). Kept and improved for now; merging changes a URL, so it is an owner decision. |
| New pages justified | None now. Country pages (India exact 20), an eligibility page (30, already served by `/admissions/`), fee and university comparison pages (need verified data; same intent as existing pages), a standalone MBBS page and city pages are all rejected. |
| Further research | No batch needed. Optional later batch of ≤200 units, only after a fresh balance reading (ledger 2026-10-12). |

**Correction to §P.2:** some figures in that table are broad or related-keyword rows, not exact demand: ukraine medical fees 720, ukraine medical college fees 590, medical fees in ukraine 480, ukraine mbbs fees 260, cost of mbbs in ukraine 260, ukraine mbbs college 480, ukraine medical college list 210 and best medical college in ukraine 390. Several fee rows are also spikes: 94–99% of their searches fall in the last two months. Only the exact figures above should be used for planning.

### Q.4 What the owner needs to do

See `OWNER_INPUT_NEEDED.md` (rewritten 2026-10-12 into five sections: information only the owner can provide, decisions needing approval, work Claude can do independently, evidence from official sources, tests possible only after release). These cover confirming N25 and the "Not yet verified" label, the N24 defaults, access to official sources, a SEMrush reading, the backup and `config.php`, release approval, and the email test after release.


## R. Evidence access, Google readiness, Search Console and owner checklist (2026-10-12; branch `claude/university-profile-pipeline`; nothing deployed)

- **Official sources: still blocked, and nothing verified.** At 08:47 UTC every one of the 31 university hosts in the records, the government and register hosts and the control `example.com` was refused by this environment's network policy (403 at the proxy); `api.github.com` answered 200. Each evidence file's access block and `SOURCE_VERIFICATION_REGISTER.md` record the attempt.
  - **Route to access:** the owner adds hosts under the environment's Network access → Allowed domains. The 20 hosts that cover all P1 work are listed at the top of `research/verification/CAPTURE_REQUEST_2026-10-12.md`.
  - **If access cannot be enabled:** the same file lists 164 official pages (80 P1) for the seven priority universities plus Vinnytsia, how to capture them, and a 498-row claim register (status today: NOT ACCESSED).
  - **Tooling:** evidence registers now exist for all twelve records (Bogomolets, Ivano-Frankivsk, Uzhhorod and Ternopil added), so captures can be matched to claims.
  - **Record notes corrected:** recognition is per destination-country regulator; a WDOMS listing is a directory entry, not recognition; registration (EDEBO) and accreditation (NAQA) are separate claims.
- **SEMrush:** 30 units, one `phrase_these` (in). "pirogov medical university ukraine" is 390 exact and steady, so Vinnytsia moves into the top verification group. The balance is not readable; estimate 43,740 (conservative 43,160). See the ledger.
- **Google readiness:**
  - **Audit:** a new tool, `site/scripts/seo-audit.mjs` (`npm run audit:seo`; in `npm test`, CI and the release gate via `test:seo`), audited all 96 URLs and 32 pages. It first found 1 medium (two thin pages) and 7 low issues; after the fixes, 0 high, 0 medium and 3 accepted low.
  - **Lighthouse (mobile):** performance 98–100; accessibility, best practices and SEO 100.
  - **Report:** URL by URL in `GOOGLE_READINESS_AUDIT.md`. No live, Search Console or indexing data exists.
- **Search Console and GA4:** no access in this session (no connector; production host blocked). Nothing about indexing is claimed.
  - **Prepared:** the verification-tag setting, with tests, and the steps (`ANALYTICS_AND_SEARCH_CONSOLE.md`, "Status check, 2026-10-12").
  - **GA4:** not installed. It would need consent, a CSP change and a privacy-notice update; the recommended alternative is in the same document.
- **Owner checklist:** `OWNER_INPUT_NEEDED.md` has five sections: information only the owner can provide, approvals, work Claude can do, official evidence, and tests possible only after release.
- **Preview for the owner:** a private Artifact copy of the production build, with forms disabled.

## S. Owner action sheet, access probe and Search Console order (2026-10-12; branch `claude/university-profile-pipeline`; nothing deployed)

- **Access:** all 20 priority hosts still refused by the network policy (403 to CONNECT; re-tested 10:07 and 10:12 UTC). No captures received, so no university fact is verified and official-source research has not started. All 12 records stay unpublished and noindex.
- **`OWNER_ACTION_SHEET.md`** (new, one page): the 20 hosts as a copy-paste block with the exact settings path; the 38 release-gate items numbered exactly as `scripts/release-readiness.mjs` prints them (22 missing, 9 proposals, 3 review fields, 4 banners that clear on their own), with a reply template; Search Console steps; SEMrush position; milestones M1 (first evidence pack, Bukovinian) and M2 (release).
- **`npm run probe:access`** (`site/scripts/probe-access.mjs`, new): probes the hosts in `research/verification/ALLOWLIST_P1.txt` through the session proxy and classifies each as OPEN, BLOCKED (policy), DNS, TIMEOUT, TLS or ERROR. Checked both ways: api.github.com and registry.npmjs.org OPEN, example.com BLOCKED. `npm run test:allowlist` (in `npm test`, CI and therefore the release gate; offline) keeps the list, the capture request's "Start here" line and the sheet identical, checks that all 16 hosts used by official addresses in the capture request §2 are covered, and proves the classification rules (13 cases) and catches 10 file mutations.
- **Search Console:** Domain property now (a DNS TXT record the owner adds; no site change). Sitemap submission only after the release, because the live home page and `/universities/` (production `b2ca3d6`, `index, follow`) still show the old unverified Ternopil card. `ANALYTICS_AND_SEARCH_CONSOLE.md` A2 updated. Nothing verified, submitted or indexed is claimed.
- **SEMrush:** no call made (0 units). One possible later call (about 50–100 units, after a university's first facts are verified) is described in the sheet and needs the owner's yes.

