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
2. SEMrush spend R1–R2 (and optionally R3–R5).
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
