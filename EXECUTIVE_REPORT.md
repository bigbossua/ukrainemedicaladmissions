# EXECUTIVE_REPORT.md — Ukraine Medical Admissions, 2026-10-11

Labels used throughout: **VERIFIED** (observed, evidence named) · **OWNER-REPORTED** · **LEAD** (search snippet with URL, unverified) · **HYPOTHESIS** · **DECISION** · **DONE** / **NOT DONE** · **NEEDS APPROVAL**.

## 1. Current verified state of the website

- Production branch `production` = `b2ca3d6` (build of `4d4e605`, tag `release-20261011-005330`, 45 files, fingerprint `5ff6e7e7…c033d4`) — VERIFIED from GitHub. Hostinger deployment into `public_html/` — OWNER-REPORTED; **the live host is not reachable from this environment** (network policy), so no live check has run. The read-only check is ready (`npm run verify:live`) and documented with expected results in `BASELINE_REPORT.md` §9.
- 18 indexable pages in the sitemap, 3 noindex; canonicals, robots, JSON-LD and the two legacy 301s correct in the published tree (VERIFIED offline). One university record (Ternopil), noindex, 0 verified claims. No country or city pages (deliberate). Fees page has no figures (deliberate).
- Forms: Stage 1 only; behaviour verified in code and with synthetic data locally; **live behaviour and e-mail delivery UNVERIFIED**. No accounts, profiles, uploads, tracking or admin exist.
- Local quality gates: axe 0 violations, Lighthouse 99–100, 3-width smoke, 0 broken links, security headers and exposed-file rules in `.htaccess` (all LOCAL ONLY). CI run #9 passed on the deployed content; later commits are docs and tooling.
- Analytics: none installed; Search Console: unknown to this session. No first-party data exists.

## 2. SEMrush research: what exists, what is missing

Exists: 10 raw exports, 16 logged calls, 2,240 units at published prices (balance not re-read; not inferred). Every number cited in the registers was re-checked against the exports today. Missing: SERP/competitor data for any term; related/question keywords; trends; difficulty/intent outside India; course terms outside the UK; nursing/public-health/rehabilitation/preparatory terms everywhere (except uk "study nursing in ukraine" 20); university names outside in/uk; city terms; broad match outside in/uk. A costed request (R1–R5, `KEYWORD_URL_MAP.md` §9) is written; **no call has been made** — NEEDS APPROVAL.

## 3. Country comparison and recommended priorities (evidence in `KEYWORD_URL_MAP.md` §6)

- **Tier 1 — India:** the only market with measured applicant demand above the lowest buckets and computed difficulty: "mbbs in ukraine" 260 (kd 18), "mbbs in ukraine fees" 260 (kd 7), broad match "ukraine medical college" 2,900 (kd 22), fees cluster 320–720 at kd 11–18; named universities Pirogov 390, Bogomolets 320. Vocabulary: "medical college", "MBBS", "fees".
- **Tier 2 — United Kingdom:** small (10–30/mo per phrase) but measured, English-language, and the only market with course-level data (nursing 20 = MBBS 20 > dentistry 10 > pharmacy 0); named universities 20–70.
- **Tier 3 — Nigeria, Pakistan, South Africa, UAE:** eight exact phrases at 0–30/mo each; broad match never purchased — **unmeasured, not rejected**. R3 (1,440 units) is the fair test.
- Excluded: Russia (not served), returnee/NMC/news demand, UK humanitarian-aid demand, generic "study in ukraine".
DECISION: content wording follows India; the UK is the second content market; no country is dropped or promoted further without R1/R3.

## 4. Keyword-to-URL map and money-page register — DONE (`KEYWORD_URL_MAP.md` §7–§8)

23 clusters mapped over every indexable URL plus the expanded programme and university clusters; 15 money-page candidates assessed with the ten required fields. Decisions: **improve** `/tuition-fees/` (verified figures), `/courses/medicine/`, `/universities/`, `/admissions/` (readiness section), `/courses/nursing/` (on verified supply); **approve for planning after verification** three university profiles — Vinnytsia, Bogomolets, Bukovinian (plus Ternopil on verification merit); **defer** preparatory resource, country page, public health, physiotherapy; **reject** city pages, a standalone MBBS page, a separate comparison page, sport. **No new SEO page is created by this report.**

## 5. Candidate-profile and document-readiness product — recommendation (`APPLICATION_SYSTEM_SPEC.md` §8–§11)

Free, saveable candidate profile (field, level, universities, education, subjects/grades with scale, documents "have / need") → programme-specific readiness assessment against **verified requirement objects only** (met / not met / unknown / pending evidence; never "eligible") → document checklist with seven states → save and resume without pressure tactics → submission and tracking through the existing four-state machine. Multi-university data model specified; Ternopil is one record among many. Platform: PHP 8 + MySQL on the existing Hostinger plan (no Node runtime on web hosting; no purchase); eight go-live gates before any real document. HYPOTHESIS until built and piloted with synthetic records.

## 6. Revenue model — recommendation and validation gaps (`SERVICE_TIERS_SPEC.md`)

Core: free profile + paid application-support levels (the three provisional tiers, prices unset). First sellable unit: a single fixed-scope **document-readiness review**. Preparatory-route guidance as a feature once routes are verified. **Rejected:** university referral commissions and paid listings — inherent conflict with the published independence disclosure; revisit only on the owner's explicit decision with full disclosure. Gaps: no demand or willingness-to-pay data, no measured workload, no legal entity (D7), no verified requirements to review against. None needs money to close.

## 7. Visual audit and image plan — DONE as a plan (`VISUAL_AUDIT_AND_IMAGE_REGISTER.md`)

The site has a sound design system and **no imagery at all** beyond logos. Direction decided: documentary photographs of study settings (Unsplash, owner-downloaded or allow-listed — the domain is blocked here), in-repo SVG process/document/cost illustrations, image-led cards and profiles; hard rules against implying any named institution; 12-row register with mobile/desktop and performance treatment. Image sourcing is the one visual item blocked by network access.

## 8. University and programme portfolio — research DONE, verification NOT DONE (`UNIVERSITY_DATA_REGISTER.md` §6–§10, `PROGRAMME_SUPPLY_REGISTER.md`, `research/universities/`)

Nine universities swept at snippet level (Vinnytsia, Bogomolets, Bukovinian, Lviv, Ivano-Frankivsk, Odesa, Poltava, Ternopil, Kharkiv): English-medium integrated master's in medicine, dentistry and pharmacy for foreigners is the consistently documented offer; preparatory departments (10 months, Ukrainian + sciences) at all nine; **English-track nursing bachelor leads at Kharkiv and Ternopil only**; public health and physical therapy exist only as Ukrainian-language programmes, several new or unaccredited; no medical-university sport degree; **no university returned a dated official statement of its 2025–26 teaching format** — the first thing to verify. Expansion order: Vinnytsia → Bogomolets → Ternopil (verification merit) → Bukovinian → Ivano-Frankivsk/Odesa/Lviv/Poltava (R2 decides) → Kharkiv (operating-conditions check first). Zaporizhzhia, Dnipro, Uzhhorod and the two programme-topic sweeps were **not researched** (the shared web-search budget ran out) and are repeated next turn. **0 claims verified; nothing from the sweep may be published.**

## 9. Technical, privacy, security and admissions-information risks

Live site unverified (PHP execution, headers, redirects); e-mail delivery unverified; no analytics or GSC; official information unreachable from the environment (D5); current-year operating status unknown for every university; recognition/licensing questions must use primary regulator documents only; document handling gated by eight security prerequisites; demand in English-language markets is small in the data — the business case rests on India wording plus unmeasured Tier-3 ceilings and on the readiness service's value, not on traffic volume.

## 10. Prioritised actions (rationale in `PROJECT_EXECUTION_PLAN.md` §8)

P0: allow-list the production hosts and run `verify:live`; allow-list official university domains (or supply PDFs) and verify Vinnytsia first; approve R1+R2 (2,340 units). P1: verified fees and profiles; `/admissions/` readiness section; visual layers 1–2; stepped Stage-1 profile form. P2: Stage 2 platform on synthetic data; nursing parity; GSC + analytics decision. P3: R3–R5; CMS activation; D9.

## 11. Completed / not completed

DONE: baseline report; reconciliation of all cited metrics against exports; country comparison; master keyword-to-URL register; money-page register; costed research request; candidate-profile service spec; revenue options; visual/image register; implementation proposal; university discovery register, programme matrix, expansion order, deferred list; programme-supply register; live-verification script; meta test extended (alt text, dimensions). NOT DONE and why: live verification (network policy); official verification of any claim (network policy); SEMrush research beyond the existing exports (needs approval); three universities and two programme sweeps (search budget); images (Unsplash blocked); anything on production (no deployment authorised).

## 12. Costs or paid research needing approval

SEMrush R1 (1,440), R2 (900) — minimum 2,340 units; R3 (1,440); R4 ≈1,200 and R5 ≈1,500 at assumed prices to be confirmed. No other spend proposed; no purchase of any kind is recommended.

## 13. Decisions required before production changes

1. Network allow-list: production hosts; official university and registry domains (free).
2. SEMrush spend R1–R2 (and optionally R3–R5).
3. Approval of each production deployment (none pending).
4. Image-sourcing route (owner-downloaded Unsplash vs allow-list vs generated with labels).
5. Analytics tool and CSP change; GSC property ownership.
6. Legal entity details (D7) for privacy/terms/complaints; D9 default branch.
7. Stage 2 go-live with real documents — only after the eight gates in `APPLICATION_SYSTEM_SPEC.md` §11.
