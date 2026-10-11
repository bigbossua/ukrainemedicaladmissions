# KEYWORD_URL_MAP.md

**Evidence status (2026-10-10): first genuine SEMrush data retrieved** — see §4 and `research/semrush/`. Seeds are marked *validated* only where a SEMrush figure now exists; everything else remains **UNVALIDATED**.

## 1. Seed clusters → canonical URL (one URL per intent)

| Cluster (intent) | Seed phrases (validated where §4 gives a figure; else unvalidated) | Canonical URL | Status |
|---|---|---|---|
| Study medicine / MBBS in Ukraine (informational) | study medicine in Ukraine (uk 30, za 30, ru 90, in 10); mbbs in ukraine / ukraine mbbs (in 260, uk 20); medicine admission in Ukraine (no data) | `/courses/medicine/` | Built; MBBS explainer added |
| Medical universities / colleges in Ukraine, list, "best" (comparison) | ukraine medical college (in 2,900); medical college list (in 210); best medical college/university/schools (in 390; uk 20×3); medical universities in ukraine (20 in ng/za/ae/pk/in; uk 0); ukraine medical university (20 in all six) | `/universities/` | Built; college wording + no-ranking section added |
| Named university (navigational) | pirogov medical university ukraine (in 390, uk 40); bogomolets national medical university ukraine (in 320, uk 70) + national medical university in kiev (uk 70); bukovinian state medical university ukraine (uk 20); **ternopil … admission/fees (uk 0; not measured in in)** | `/universities/<slug>/` | Ternopil built, noindex; others not yet created |
| Fees / cost (informational, lowest kd) | ukraine medical college fees for indian students (in 2,900 — lead only); ukraine medical fees (720); ukraine medical college fees (590); medical fees in ukraine (480); cost of medical education in ukraine (320); mbbs in ukraine fees (in 260; uk/ae/pk 20) | `/tuition-fees/` | Built; fee-vocabulary headings added; **no figures until verified** |
| Requirements / how to apply | medical university admission requirements in Ukraine; how to apply; documents required | `/admissions/` | Built |
| Dentistry | study dentistry in Ukraine; dentistry universities in Ukraine | `/courses/dentistry/` | Built |
| Nursing | study nursing in Ukraine; nursing universities in Ukraine | `/courses/nursing/` | Built |
| Pharmacy | study pharmacy in Ukraine; pharmacy universities in Ukraine | `/courses/pharmacy/` | Built |
| English-language programmes | English-language medical programmes in Ukraine | `/universities/?language=English` (filter) — no separate page unless evidence shows distinct intent | Not a page |
| Preparatory / foundation | preparatory course Ukraine medical | none yet — only if programmes are verified and demand shown | Not built |
| Country-specific (e.g. "for Nigerian students") | — | none — requires country demand evidence + admissions feasibility | Not built |

\* "MBBS" is not the qualification Ukrainian universities award. Pages may acknowledge the search term in copy but describe the actual qualification; a dedicated MBBS page is created only if SEMrush shows distinct intent and the copy can be accurate.

Anti-cannibalisation rule: a new page is created only if its target cluster has a different dominant intent from every existing row. Minor wording variants map to the existing URL.

## 2. Research ledger format (when units exist)

Store raw exports under `research/semrush/` (git-tracked, no credentials) as CSV with columns:
`date, database, report, keyword, volume, kd, cpc, intent, serp_features, source_trace_id`.
Log each API call in `SEMRUSH_API_LEDGER.md` with units consumed.
Summaries go in this file's §4; raw numbers are never typed by hand into pages.

## 3. Pilot programme (≤ 200 units, then review)

1. Keyword overview for the 20 brief seeds, database `uk`.
2. Related + question reports for the top 3 seeds by volume.
3. `organic_research` for 3 competitors visible in the SERP for seed 1 (names recorded only after the SERP is retrieved — none assumed).
4. Country check: repeat step 1 for `in`, `ng`, `pk` only if step 1 shows the metric set is useful.
Outputs: prioritised cluster table (volume, KD, intent, competitor gap) feeding `PAGE_ASSET_REGISTER.md`.

## 4. Validated findings (SEMrush, retrieved 2026-10-10; raw CSVs in `research/semrush/`)

### 4.1 Country demand for the head term "study medicine in ukraine" (`phrase_all`, monthly volume)
ru 90 (KD 15, intent 1=informational — the only database where SEMrush computed KD/intent) · uk 30 (CPC £1.02, competition 0.66) · cl 30 · cz 30 · dk 30 · hu 30 · jp 30 · mx 30 · za 30 · zw 30 · ae 20 · au 20 · ca 20 · de 20 · it 20 · kr 20 · ma 20 · se 20 · tr 20 · us 20 · in 10 · ng 10 · ar/bg/es/fi/fr/gr/ie/nl/no/pl/ro/sg/ua 10 · **0 in 45 databases incl. pk, bd, gh, eg, sa, qa, my, lk** (ids with no data).

Reading: measured English-language demand for the head term is **very small in every market** (no database above 90/month; largest English market, UK, is 30/month). India and Nigeria — historically the largest source markets — register only 10/month each for this exact phrase. The `0` KD/intent values mean SEMrush could not compute them (insufficient data), not low difficulty.

### 4.2 Seed phrases, UK database (`phrase_these`)
| Seed | Volume | CPC | Competition | KD |
|---|---|---|---|---|
| study medicine in ukraine | 30 | 1.02 | 0.66 | n/a |
| mbbs in ukraine | 20 | 0 | 0.33 | n/a |
| study nursing in ukraine | 20 | 0 | 0.14 | n/a |
| study dentistry in ukraine | 10 | 0 | 0 | n/a |
| medical universities in ukraine | 0 | — | 0.18 | n/a |
| medical universities in ukraine for international students | 0 | — | — | n/a |
| mbbs fees in ukraine | 0 | — | 0.33 | n/a |
| dentistry universities in ukraine · nursing universities in ukraine · study pharmacy in ukraine · ternopil national medical university admission · ternopil national medical university fees | 0 | — | — | n/a |
| 8 further seeds (medicine admission…, pharmacy universities…, ukrainian medical university fees, admission requirements…, english medical programmes…, ternopil … courses, how to apply…, documents required…) | **no data returned** | | | |

### 4.3 What this changes (decision-grade)
1. **No new SEO landing pages are justified by current evidence.** The existing 15 indexable URLs already cover every cluster with measurable demand (medicine, MBBS wording, nursing, dentistry). City pages, country pages and more course pages remain unjustified.
2. **"Nursing" (20/mo UK) is as large as "MBBS" and larger than dentistry** — the nursing course page deserves equal content investment, subject to verified programme availability.
3. **Country targeting cannot be decided from one phrase.** The head term is near-zero everywhere; the next cheap step is `phrase_these` (10 units per keyword-database) for 6–8 phrasing variants in `in`, `ng`, `uk`, `za`, `ae` and `pk` (≈400 units) plus `phrase_fullsearch` for "ukraine medical university" in `in` and `uk` (≈20 units per returned line, cap 20 lines each ≈ 800 units). **Requires owner approval — would exceed the 2,000 pilot cap.**
4. **Wartime demand collapse is visible in the data.** The business case should be re-examined against these volumes before major content spend; Search Console actuals (once the site is live) will be the second data source.
5. Metrics SEMrush did not compute (KD, intent) are marked n/a — not estimated.

### 4.4 Follow-up evidence (approved calls, 2026-10-10; raw CSVs `research/semrush/*variants.csv`, `*fullsearch*.csv`)

**Eight phrasing variants, six databases (monthly volume; kd/intent computed only where shown):**

| Phrase | in | ng | uk | za | ae | pk |
|---|---|---|---|---|---|---|
| study medicine in ukraine | 10 | 10 | 30 | 30 | 20 | 0 |
| mbbs in ukraine | **260** (kd 18, inf.) | 10 | 20 | 0 | 10 | 10 |
| ukraine mbbs | **260** (kd 18, inf.; identical metrics → same keyword group) | 10 | 20 | 0 | 10 | 10 |
| mbbs in ukraine fees | **260** (kd 7, inf.) | 0 | 20 | 0 | 20 | 20 |
| medical universities in ukraine | 20 | 20 | 0 | 20 | 20 | 20 |
| ukraine medical university | 20 | 20 | 20 | 20 | 20 | 20 |
| medicine in ukraine | 10 | 10 | 20 | 10 | 10 | 20 |
| study in ukraine (generic) | 20 | 20 | 30 | 20 | 20 | 20 |

**Broad match "ukraine medical", top 18 by volume (India):** applicant-type rows — ukraine medical college 2,900 (kd 22); ukraine medical college fees for indian students 2,900 (kd 9, cpc 0, competition 0); ukraine medical fees 720 (kd 18); ukraine medical college fees 590 (kd 12); medical fees in ukraine 480 (kd 12); best medical college in ukraine 390 (kd 14, mixed intent); cost of medical education in ukraine 320 (kd 11); ukraine medical college list 210 (kd 11). Returnee/news/policy rows — ukraine returned medical students 2,900; ukraine medical students supreme court 880; ukraine medical students news 390; nmc on ukraine medical students 320; ukraine return medical students 260; haryana medical student ukraine 210; ambiguous — ukraine medical students 1,000; ukraine indian medical students 480. Named universities — pirogov medical university ukraine 390 (kd 23); bogomolets national medical university ukraine 320 (kd 28, navigational). All India rows are informational except "best medical college" (mixed).
**Broad match, UK:** humanitarian/aid rows dominate (medical volunteer 70, donate medical supplies 50, plymouth medical aid 50, international medical corps 40, medical supplies 30, medical volunteering 30, puma plymouth 30, donate near me 30, british medic 20, christian medical association 20, combat medic 20 = 390 of 650); named universities (bogomolets 70, "national medical university in kiev" 70, pirogov 40, bukovinian 20); "best medical colleges / schools / university in ukraine" 20 each. kd/intent not computed for any UK row.

### 4.5 Reading the evidence

**Strongest supported opportunities (all on existing URLs):**
1. **Fees/cost cluster → `/tuition-fees/`.** Six Indian phrasings at kd 7–18 (upper bound 5,270/mo; SEMrush groups variants, so not additive) plus "mbbs in ukraine fees" 20/mo in uk, ae, pk. The page exists with the right structure but **publishes no figure** — it cannot rank until at least one fee is verified from an official fee order. Fee schedules therefore become the *first* claims verified for every university.
2. **MBBS vocabulary → `/courses/medicine/`.** "mbbs in ukraine"/"ukraine mbbs" 260/mo in India (26× the "study medicine" phrasing), present at 10–20/mo in uk/ae/pk/ng, absent in za. One URL carries both vocabularies; "MBBS" appears as an explained search term, never as the awarded qualification.
3. **"Medical college / list / best" → `/universities/`.** "ukraine medical college" 2,900 and "college list" 210 (kd 11) vs "medical universities in ukraine" 20. "Best" intent (390 in, 20×3 uk) is answered on the directory with criteria and an explicit *no official ranking* statement — never a ranking page.
4. **Named-university demand sets directory priority:** Vinnytsia NMU ("Pirogov") 390 in / 40 uk; Bogomolets NMU 320 in / 140 uk (two namings); Bukovinian SMU 20 uk. **Ternopil — the brief's focus — measures 0 in uk for both measured phrases and was not measured in in.**

**Misleading or irrelevant terms (never build for):** the Indian returnee/NMC/Supreme Court/news cluster (≈6,440/mo, plus 1,480 ambiguous) — wartime policy demand about students who left Ukraine, forbidden by brief Part 2 rule 3; the UK humanitarian-aid cluster; generic "study in ukraine" (belongs to the sibling project). **"ukraine medical college fees for indian students" (2,900) is a lead, not qualified demand:** cpc 0, competition 0, and it sits in the same 2,900 bucket as the news term; trend data not purchased.

**Country differences:** India is the only database with demand above the lowest buckets and the only one where SEMrush computed kd/intent for applicant terms; India says "medical college", "MBBS", "fees". South Africa uses "study medicine", zero MBBS. UK leads on "study medicine"/"study in ukraine" and named universities. Nigeria, Pakistan, UAE: flat 10–20/mo on generic "medical universities / ukraine medical university" phrasing — **exact-match only; broad match not purchased there, so their ceilings are unmeasured** (in India broad match revealed demand two orders of magnitude above the exact-match seeds).

**Cannibalisation fixed:** the home H1 and `/courses/medicine/` both targeted "study medicine in Ukraine"; the home H1 is now a brand/orientation statement.

**Limitations:** no SERP/competitor data (phrase_organic) for any term; no question or related reports; kd/intent uncomputed outside India/ru; course demand (dentistry/nursing/pharmacy) measured only in uk; no trend/seasonality; no Search Console actuals; SEMrush volumes are estimates. **Refutation status:** the four lens analyses and the merge into 12 recommendations completed; only the fees→`/tuition-fees/` recommendation finished adversarial refutation (not refuted; rationale corrected to exclude the Indian-qualified returnee rows). The remaining recommendations were stopped before refutation to conserve time and are recorded as analyst-level, not adversarially verified.

### 4.6 Actions for existing URLs (no new indexable URL)

| URL | Action | Evidence | Status |
|---|---|---|---|
| `/` | H1 changed to a brand/orientation statement so it no longer competes with `/courses/medicine/` for "study medicine in Ukraine" | cannibalisation rule; uk 30 / za 30 / ru 90 belong to the course page | **Implemented 2026-10-10** |
| `/courses/medicine/` | Added H2 "Searching for 'MBBS in Ukraine'?" explaining the term, that each university sets its own degree title (shown once verified) and that recognition is the home regulator's decision; "MBBS" added to meta description, not to the title until a qualification title is verified | in: mbbs in ukraine 260 (kd 18); uk 20; ae 10; pk 10 | **Implemented** |
| `/universities/` | Title "Medical universities in Ukraine: full list of medical colleges"; intro sentence on Indian/UK naming; H2 "Which is the best medical university in Ukraine?" with *no official ranking* statement and the comparison criteria | in: ukraine medical college 2,900; list 210; best 390; uk best× 20 | **Implemented** |
| `/tuition-fees/` | Title "Medical college fees in Ukraine: tuition & cost of study"; H2s mirroring measured phrasings (by university; MBBS fees; cost of medical education — what a total includes; fees for Indian students stating only what official schedules publish); internal links with varied anchors | fees cluster, kd 7–18 | **Implemented (copy); figures await verified fee orders** |
| `/courses/nursing/` | Bring to parity with dentistry once a nursing programme is verified | uk: study nursing 20 = mbbs 20 > dentistry 10 | Pending verification |
| `/universities/<slug>/` | Verify Vinnytsia (Pirogov), Bogomolets, Bukovinian next; Ternopil stays noindex | named-university rows | Pending official access |
| `/faq/`, `/admissions/`, `/about/`, `/contact/`, `/courses/{dentistry,pharmacy}/`, `/privacy/`, `/terms/` | No keyword-driven change | conversion/trust pages | No change |
| Future `/for-indian-students/` | **Not built.** Trigger: Search Console India impressions on `/tuition-fees/`, regulator requirements from an official document, ≥1 verified fee schedule, admissions feasibility confirmed | — | Trigger recorded |

## 5. Continuous workflow (once access exists)

Monthly: re-pull positions for mapped URLs (Search Console first-party; SEMrush for competitor/gap). Quarterly: review clusters, consolidate or expand, log decisions in `PAGE_ASSET_REGISTER.md`. SEMrush estimates and Search Console actuals are always labelled separately.

---

## 6. Country comparison (Phase B-A) — from the exports that exist, 2026-10-11

**Data compatibility, stated once:** `phrase_all` and `phrase_these` are **exact-phrase** monthly volumes (SEMrush "phrase match" of the exact wording); `phrase_fullsearch` is **broad match** ("keyword contains the phrase") and returns SEMrush's grouped keywords, so its rows are a different population and **not additive** with the exact-phrase rows or with each other. `keyword_difficulty = 0` with an empty `intent` means *not computed*. No trend, SERP or competitor report has been purchased for any market. All figures are SEMrush estimates retrieved 2026-10-10; Search Console actuals do not yet exist.

| Market (database) | Exact phrases measured (volume/mo) | Broad match "ukraine medical" | Course terms | Named universities | kd / intent | What is **not** measured | Tier (evidence-based) |
|---|---|---|---|---|---|---|---|
| **India (in)** | study medicine in ukraine 10 · mbbs in ukraine 260 · ukraine mbbs 260 · mbbs in ukraine fees 260 · medical universities in ukraine 20 · ukraine medical university 20 · medicine in ukraine 10 · study in ukraine 20 | ukraine medical college 2,900 (kd 22) · …college fees for indian students 2,900 (kd 9; cpc 0; competition 0 — lead) · ukraine medical fees 720 (18) · ukraine medical college fees 590 (12) · medical fees in ukraine 480 (12) · best medical college in ukraine 390 (14, mixed) · cost of medical education in ukraine 320 (11) · ukraine medical college list 210 (11); returnee/news rows ≈6,440 excluded | not measured | pirogov medical university ukraine 390 (kd 23) · bogomolets national medical university ukraine 320 (kd 28, navigational) | computed for most rows (kd 7–30; intent informational) | dentistry/nursing/pharmacy/public health/rehab/preparatory terms; city terms; trends; SERPs | **1 — only market with measured applicant demand above the lowest buckets and the only one where SEMrush computed kd/intent** |
| **United Kingdom (uk)** | study medicine in ukraine 30 (cpc 1.02, comp. 0.66) · mbbs in ukraine 20 · ukraine mbbs 20 · mbbs in ukraine fees 20 · medical universities in ukraine 0 · ukraine medical university 20 · medicine in ukraine 20 · study in ukraine 30 | humanitarian/aid rows ≈390 of 650 excluded; bogomolets 70 + "national medical university in kiev ukraine" 70 · pirogov 40 · bukovinian 20 · best medical colleges/schools/university 20 each | study nursing in ukraine 20 · study dentistry in ukraine 10 · study pharmacy in ukraine 0 · nursing/dentistry universities in ukraine 0 | as broad match | not computed for any row | trends; SERPs; nothing below 10/mo is reported | **2 — small but measured, English-language, the only market with course-term data** |
| **South Africa (za)** | study medicine in ukraine 30 · mbbs/ukraine mbbs/fees 0 · medical universities 20 · ukraine medical university 20 · medicine in ukraine 10 · study in ukraine 20 | not purchased | not measured | not measured | not computed | broad match, courses, universities | **3 — "study medicine" phrasing only; ceiling unknown** |
| **UAE (ae)** | study medicine 20 · mbbs 10 · ukraine mbbs 10 · mbbs fees 20 · medical universities 20 · ukraine medical university 20 · medicine in ukraine 10 · study in ukraine 20 | not purchased | not measured | not measured | not computed | as za | **3** |
| **Pakistan (pk)** | study medicine 0 · mbbs 10 · ukraine mbbs 10 · mbbs fees 20 · medical universities 20 · ukraine medical university 20 · medicine in ukraine 20 · study in ukraine 20 | not purchased | not measured | not measured | not computed | as za | **3** |
| **Nigeria (ng)** | study medicine 10 · mbbs 10 · ukraine mbbs 10 · mbbs fees 0 · medical universities 20 · ukraine medical university 20 · medicine in ukraine 10 · study in ukraine 20 | not purchased | not measured | not measured | not computed | as za — **historically a large source market; its broad-match ceiling is unmeasured, so it is not rejected** | **3** |
| Russia (ru) | study medicine in ukraine 90 (kd 15, informational) | — | — | — | computed | everything else | **Excluded** — not a served market; language |
| 30/mo single-phrase markets: cl, cz, dk, hu, jp, mx, zw; 20/mo: au, ca, de, it, kr, ma, se, tr, us | one exact phrase each | — | — | — | not computed | everything else | **Unranked** — one data point each; several are non-English-first markets where the English phrase under-measures demand |

**Reading.** Measured English-language demand is small everywhere. India is the only market where SEMrush shows applicant intent at scale and with computed difficulty; its vocabulary is "medical college", "MBBS", "fees". The UK is the only market with course-level data (nursing = MBBS = 20 > dentistry 10 > pharmacy 0). Every other market has eight exact phrases at 0–30/mo and nothing else — **that is an evidence gap, not evidence of no market**. The recommended research (§9) measures broad match in ng, pk, za and ae before any country is dropped or promoted.

## 7. Master keyword-to-URL register (every indexable URL considered; expanded programme and university clusters included)

Field key: **Evidence** = report · database · retrieval date (`research/semrush/`); **Demand/Difficulty** exactly as exported, *n/a* = not computed, *unavailable* = not purchased; **SERP evidence**: no SERP or competitor report has been purchased for any term — every row says so; **Action** ∈ improve · consolidate · retain · consider new page · defer · reject.

| # | Keyword / cluster | Market | Evidence | Demand | Difficulty | Intent | SERP evidence | Existing URL | Recommended action | Business value | Evidence gap | Decision rationale |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | study medicine in ukraine (head) | uk, za, ae, in, ng, pk (+ru, others) | phrase_all + phrase_these · 2026-10-10 | uk 30 · za 30 · ae 20 · in 10 · ng 10 · pk 0 · ru 90 | n/a (ru 15) | informational (ru only computed) | unavailable | `/courses/medicine/` | **retain** as canonical; improve with verified programme facts | Entry point for the largest service line → profile → apply | SERP/competitors; trend | Covered by one URL; home H1 already de-conflicted |
| 2 | mbbs in ukraine · ukraine mbbs | in, uk, ae, pk, ng | phrase_these · 2026-10-10 | in 260 (both) · uk 20 · ae 10 · pk 10 · ng 10 · za 0 | in 18 | informational | unavailable | `/courses/medicine/` (MBBS explainer H2) | **retain + improve** (explainer exists; add verified qualification titles per university) | Same journey as #1; India vocabulary | SERP; what Indian applicants expect on-page | Same intent as #1 — separate page would cannibalise |
| 3 | fees / cost cluster: mbbs in ukraine fees · ukraine medical fees · ukraine medical college fees · medical fees in ukraine · cost of medical education in ukraine · …fees for indian students | in (uk, ae, pk for "mbbs in ukraine fees") | phrase_these + phrase_fullsearch (in) · 2026-10-10 | in 260 · 720 · 590 · 480 · 320 · 2,900 (lead) · uk/ae/pk 20 | in 7 · 18 · 12 · 12 · 11 · 9 | informational | unavailable | `/tuition-fees/` | **improve** — publish verified, dated fee schedules per university; nothing else can make this page rank | Highest-intent informational cluster; parents and applicants budgeting → apply | ≥1 verified fee order (blocked: official sites unreachable); SERP | Lowest kd in the dataset; page exists with the right structure but no figures |
| 4 | ukraine medical college · ukraine medical college list · best medical college in ukraine (+ uk "best…" ×3) | in, uk | phrase_fullsearch · 2026-10-10 | in 2,900 · 210 · 390 · uk 20 ×3 | in 22 · 11 · 14 | informational / mixed | unavailable | `/universities/` | **improve** — comparison framework (§ UNIVERSITY_DATA_REGISTER §7), more verified institutions, explicit no-ranking stance | Directory is the shortlisting step → profile → apply | Verified institutions (currently 0 publishable); SERP | "Best" intent answered with criteria, never a ranking |
| 5 | medical universities in ukraine · ukraine medical university | in, ng, uk, za, ae, pk | phrase_these · 2026-10-10 | 20 in each (uk 0 for the first) | n/a | n/a | unavailable | `/universities/` | **retain** | As #4 | broad match in ng/za/ae/pk | Same intent as #4 |
| 6 | pirogov medical university ukraine · bogomolets national medical university ukraine · national medical university in kiev ukraine · bukovinian state medical university ukraine | in, uk | phrase_fullsearch · 2026-10-10 | in 390 · 320 · — · — ; uk 40 · 70 · 70 · 20 | in 23 · 28 | informational / navigational | unavailable | none (profiles not built) | **consider new page** — one verified profile each, in this order, after §UNIVERSITY_DATA_REGISTER §8 verification | Named-university demand converts closest to an application | Official verification (blocked); SERP (official site likely #1 — we target the "admissions & fees for internationals" sub-intent) | Only demand-backed new URLs in the dataset |
| 7 | ternopil national medical university admission / fees / courses | uk (in not measured) | phrase_these uk seeds · 2026-10-10 | uk 0 · 0 · no data | n/a | n/a | unavailable | `/universities/ternopil-national-medical-university/` (noindex) | **retain noindex**; verify; index only when claims are verified; measure in `in` (§9 R2) | Template profile; owner's pilot | demand in in; verification | No measured demand — not a priority for indexing |
| 8 | admission requirements / how to apply / documents required (medical university ukraine) | uk seeds | phrase_these · 2026-10-10 | no data returned (uk) | n/a | n/a | unavailable | `/admissions/` | **improve** — document-readiness states and verified per-programme requirements (candidate-profile service), not keyword copy | Core of the service; every applicant passes through | demand in in/ng/pk (§9 R1); verified requirements | Conversion page first, SEO second |
| 9 | study dentistry in ukraine · dentistry universities in ukraine | uk | phrase_these · 2026-10-10 | uk 10 · 0 | n/a | n/a | unavailable | `/courses/dentistry/` | **retain**; improve with verified programmes | Secondary service line | other markets (R1); supply | Small measured demand; page exists |
| 10 | study nursing in ukraine · nursing universities in ukraine · *bsn in ukraine · msn in ukraine · nursing in ukraine for international students* | uk (others not measured) | phrase_these · 2026-10-10 | uk 20 · 0 · *unavailable* | n/a | n/a | unavailable | `/courses/nursing/` | **improve on verified supply**; measure BSN/MSN wording (R1) | Equal to MBBS demand in uk; new service line if programmes exist in English | supply verification (exact award titles — not assumed BSN/MSN); demand elsewhere | One URL for all nursing wording until evidence shows distinct intent |
| 11 | study pharmacy in ukraine · pharmacy universities in ukraine | uk | phrase_these · 2026-10-10 | uk 0 · no data | n/a | n/a | unavailable | `/courses/pharmacy/` | **retain; re-evaluate after R1** — consolidate into `/courses/` if still unmeasured and no verified English programme | Weakest service line | demand in other markets; supply | Avoid a thin page living on no evidence |
| 12 | public health in ukraine · mph in ukraine · study public health ukraine international students | none | — | **unavailable** | unavailable | unavailable | unavailable | none | **defer** — until R1 demand + verified supply (`PROGRAMME_SUPPLY_REGISTER.md`) | Possible postgraduate line | everything | No page on zero evidence |
| 13 | physiotherapy / physical therapy / physical rehabilitation in ukraine | none | — | **unavailable** | unavailable | unavailable | unavailable | none | **defer** — as #12 | Possible line; professional-recognition questions are heavier than for medicine | everything | As #12 |
| 14 | physical education / sport science in ukraine | none | — | **unavailable** | unavailable | unavailable | unavailable | none | **defer**; low relevance to a *medical* admissions service unless evidence appears | Marginal | everything | Outside the core proposition |
| 15 | preparatory course / foundation year ukraine medicine (incl. "low grades", "without biology") | none | — | **unavailable** | unavailable | unavailable | unavailable | none (`/admissions/` closest) | **improve `/admissions/` first** with a verified preparatory-routes section; **consider new page** only if R1 shows distinct demand and ≥2 universities' preparatory departments are verified | High student value (readiness service); differentiator | supply (official preparatory-department pages); demand | Fits the readiness service; a page only on evidence |
| 16 | english medical programmes in ukraine · medical universities in ukraine for international students | uk | phrase_these · 2026-10-10 | no data · 0 | n/a | n/a | unavailable | `/universities/` (language filter) | **retain filter; no page** | — | — | No distinct measured intent |
| 17 | ukraine medical college fees for indian students (country-specific) | in | phrase_fullsearch · 2026-10-10 | 2,900 (cpc 0, competition 0 — lead, same bucket as a news term) | 9 | informational | unavailable | `/tuition-fees/` ("Fees for Indian students" H2) | **improve existing**; **defer** dedicated page — trigger: GSC India impressions on `/tuition-fees/` + regulator document + ≥1 verified fee | Largest single lead | trend; SERP; regulator source | Lead, not qualified demand |
| 18 | city terms: medical university kyiv / kharkiv / lviv / odesa … | none | — | **unavailable** | unavailable | unavailable | unavailable | none | **defer**; never thin city pages — cities belong to the directory filter and profiles (R2 measures) | — | demand | Earlier audit's "11 city pages" failure mode |
| 19 | ukraine returned medical students · supreme court · nmc · news · haryana (returnee/policy) | in | phrase_fullsearch · 2026-10-10 | ≈6,440 + 1,480 ambiguous | 22–30 | informational | unavailable | none | **reject** | None — not applicants; brief forbids | — | Excluded intent |
| 20 | medical volunteer / supplies / aid ukraine | uk | phrase_fullsearch · 2026-10-10 | ≈390 | n/a | n/a | unavailable | none | **reject** | None | — | Excluded intent |
| 21 | study in ukraine (generic) | all six | phrase_these · 2026-10-10 | 20–30 | n/a | n/a | unavailable | none | **reject** (sibling project; not medical) | None | — | Out of scope |
| 22 | is ukraine mbbs valid in india / recognition / nmc rules (applicant-side) | none measured | — | **unavailable** | unavailable | unavailable | unavailable | `/faq/` | **improve `/faq/` only with an official regulator source**; measure (R1) | Trust; decisive question for Indian families | official regulator document; demand | Never answered without a primary source |
| 23 | brand, services, about, contact, FAQ, legal (`/`, `/services/`, `/about/`, `/contact/`, `/faq/`, `/privacy/`, `/terms/`, `/complaints-policy/`, `/disclosure/`, `/apply/`) | — | — | n/a | — | navigational / transactional | — | each exists | **retain**; conversion and trust roles; `/services/` keeps legacy equity | Conversion, trust, compliance | — | Not keyword pages |

**Cannibalisation review:** #1/#2 share one URL by design; #4/#5 share one URL; nursing wording variants share #10; no two indexable URLs target the same cluster. **Thin-page watch:** `/courses/pharmacy/` (#11) and `/courses/` index are the thinnest indexable pages; neither is removed before R1 data exists.

## 8. Proposed money-page register (hypotheses with decisions — not an approved build list)

| # | Candidate | Target cluster | Market · intent | Demand / competition evidence | Audience | Practical information provided | Distinction from existing pages | Route to **Apply Online Now** | Verified facts needed first | Legitimate-revenue link | **Decision** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | `/tuition-fees/` (existing) | #3 fees/cost | in (uk/ae/pk) · informational | in 260–720 at kd 7–18; 2,900 lead | Applicants and parents budgeting | Verified, dated fee schedules per university and programme; what a total year costs includes; payment timing | None — it is the page | Fee row → university profile → `/apply/` prefilled | ≥1 official fee order per listed university (blocked by network policy) | Readiness-to-pay signal; the service fee is explained separately | **Improve (P0 content once verification is possible)** |
| M2 | `/courses/medicine/` (existing) | #1 + #2 | in, uk, za, ae · informational | in 260 (kd 18); uk 30/20; za 30 | Medicine applicants | Which universities teach medicine in English, qualification title, duration, requirements — all verified | None | Course → directory filter → profile → apply | Programme titles, language, duration per university | Largest service line | **Improve (P1)** |
| M3 | `/universities/` (existing) | #4 + #5 | in, uk, +4 · informational/mixed | in 2,900 (kd 22), 210 (11), 390 (14) | Shortlisting applicants | Fair comparison framework (verified facts, "unavailable" shown honestly), filters, no ranking | None | Card → profile → apply | ≥3 publishable profiles | Directory is the funnel's widest step | **Improve (P1)** |
| M4 | `/universities/vinnytsia-national-pirogov-memorial-medical-university/` (new) | #6 | in 390 (kd 23), uk 40 · informational | strongest named-university row | Applicants considering Vinnytsia | Programmes, language, requirements, fees, deadlines, preparatory route — verified, dated | First publishable profile beyond the template | Programme CTA → `/apply/?university=…` | Everything in §UNIVERSITY_DATA_REGISTER §3 | Named demand close to application | **Approve for planning — build only after verification** |
| M5 | `/universities/bogomolets-national-medical-university/` (new) | #6 | in 320 (kd 28, navigational), uk 70+70 | second-strongest; navigational share means the official site wins the head term — we serve the "admissions for internationals" sub-intent | As M4 | As M4 | As M4 | As M4 | As M4 | As M4 | **Approve for planning — after verification** |
| M6 | `/universities/bukovinian-state-medical-university/` (new) | #6 | uk 20 | small but measured | As M4 | As M4 | As M4 | As M4 | As M4 | As M4 | **Approve for planning — third** |
| M7 | `/courses/nursing/` (existing) | #10 | uk 20 · informational | equal to MBBS in uk | Nursing applicants | Exact award titles, level, language, eligibility — verified; distinction from medical qualifications | None | Course → directory → apply | Supply verification (`PROGRAMME_SUPPLY_REGISTER.md`) | Second service line if English programmes exist | **Improve on verified supply (P2)** |
| M8 | `/admissions/` (existing) | #8 + #15 | unmeasured · informational | none purchased | Ready-to-apply and under-prepared applicants | Document-readiness states; verified per-programme requirements; preparatory routes where verified | None | Checklist → `/apply/` (profile) | Verified requirements and preparatory routes | Core of the paid service | **Improve (P0 product, independent of SEO)** |
| M9 | Preparatory / foundation resource (new) | #15 | unmeasured | none | Applicants with low marks or missing science subjects | Who is eligible, duration, subjects, language, progression conditions — verified; no guarantees | New intent (readiness) | → profile with gap analysis | ≥2 universities' official preparatory pages; R1 demand | Differentiating service for the largest under-served group | **Defer — build the `/admissions/` section first; page only if R1 + supply support it** |
| M10 | `/for-indian-students/` (new) | #17 + #22 | in · informational | 2,900 lead (unqualified) | Indian applicants and parents | Regulator rules from the official document, fees, eligibility | Country framing | → `/tuition-fees/` → apply | Regulator document; ≥1 fee; GSC India signal | Largest lead market | **Defer — trigger recorded** |
| M11 | Public health / MPH page (new) | #12 | unmeasured | none | Graduates | — | — | — | Supply + demand | Postgraduate line | **Defer** |
| M12 | Physiotherapy / rehabilitation page (new) | #13 | unmeasured | none | — | — | — | — | Supply + demand + recognition facts | — | **Defer** |
| M13 | University comparison page (separate) | #4 | — | — | — | — | Overlaps `/universities/` | — | — | — | **Reject — comparison lives on `/universities/`** |
| M14 | City pages | #18 | unmeasured | none | — | — | Thin variants | — | — | — | **Reject (fold into directory filters)** |
| M15 | Standalone "MBBS in Ukraine" page | #2 | in 260 | same intent as medicine | — | — | Cannibalises M2 | — | — | — | **Reject (consolidated into M2)** |

Order of work implied: M8 and M1 (product and verification), then M2/M3, then M4→M5→M6 as verification completes, M7 on supply; everything marked defer waits for §9 data and `PROGRAMME_SUPPLY_REGISTER.md`.

## 9. Costed SEMrush research request — R1+R2 CONDITIONALLY APPROVED 2026-10-11 (cap 2,340 units; execution waits for the owner's balance reading — see `SEMRUSH_API_LEDGER.md`); R3–R5 NOT approved; no call has been made

Prices: `phrase_these` 10 units/line and `phrase_fullsearch` 20 units/line are the published per-line prices recorded in the ledger. Prices for `phrase_organic`, `phrase_related`, `phrase_questions` and `domain_organic` are **assumptions to be confirmed on Semrush's API pricing page before approval** (assumed 10/line for organic reports, 40/line for related/questions). Cumulative spend so far: 2,240 units; the brief's preservation floor (48,000 of 50,000) is already crossed by 240 units if the screenshot balance was current, so **every request below exceeds the original cap and needs explicit approval**. Each line can be approved separately.

| Req. | Report · databases | Keyword set | Lines | Estimated units | What it decides |
|---|---|---|---|---|---|
| R1 | `phrase_these` · in, uk, ng, pk, za, ae | 24 exact phrases: study nursing in ukraine · bsn in ukraine · nursing in ukraine for international students · msn in ukraine · public health in ukraine · mph in ukraine · master of public health ukraine · physiotherapy in ukraine · physical therapy ukraine university · physical rehabilitation ukraine · sports science ukraine university · preparatory course ukraine medicine · foundation year ukraine medical · medical university ukraine without biology · mbbs in ukraine eligibility · ukraine medical university admission requirements · documents required for mbbs in ukraine · mbbs in ukraine for indian students · is ukraine mbbs valid in india · mbbs in ukraine 2026 · study dentistry in ukraine · dentistry in ukraine fees · pharmacy in ukraine for international students · english medium medical university ukraine | 24 × 6 = 144 | **1,440** | Whether any expanded programme, preparatory, requirements or recognition cluster has measurable demand in any market (#8–#15, #22) |
| R2 | `phrase_these` · in, uk, ng | 12 universities × 2 phrasings ("<name> ukraine", "<name> fees") + 6 city phrases ("medical university kyiv/kharkiv/lviv/odesa/dnipro/vinnytsia") | 30 × 3 = 90 | **900** | Expansion order of the directory (M4–M6 and beyond); city intent (#18) |
| R3 | `phrase_fullsearch` · ng, pk, za, ae | "ukraine medical", display_limit 18, volume desc | 18 × 4 = 72 | **1,440** | Whether the broad-match ceilings in the Tier-3 markets resemble India's; the only way to rank those countries fairly |
| R4 | `phrase_organic` (SERP top 10) · in, uk | mbbs in ukraine · ukraine medical college fees · best medical college in ukraine · study medicine in ukraine · pirogov medical university ukraine · study nursing in ukraine | 6 × 10 × 2 = 120 | **≈1,200 (assumed 10/line)** | Who ranks (universities, agencies, directories, news), page types rewarded, realism for a new site |
| R5 | `domain_organic` · in | top 3 competitor domains revealed by R4 | 3 × 50 | **≈1,500 (assumed 10/line)** | Competitor keyword sets → gaps and improvement targets for existing URLs |
| **Minimum viable** | R1 + R2 | | | **2,340** | Enough to decide the programme and university expansion questions in this document |
| **Full** | R1–R5 | | | **≈6,480 (R4/R5 prices assumed)** | Adds SERP realism and competitor gaps |

Metered usage will be recorded per call in `SEMRUSH_API_LEDGER.md`; raw CSVs saved under `research/semrush/`; no page is created from this data without passing through §7.
