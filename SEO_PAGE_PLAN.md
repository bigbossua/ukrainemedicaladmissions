# SEO_PAGE_PLAN.md: page-by-page SEO plan and SEMrush research report

**Date:** 12 October 2026 · **Branch:** `claude/university-profile-pipeline` · **Inputs:** `KEYWORD_URL_MAP.md` §6–§19, `SEMRUSH_API_LEDGER.md`, the 45 CSVs in `research/semrush/`, `GOOGLE_READINESS_AUDIT.md`, and titles, descriptions and H1s read from the built pages (`site/dist`).
**Labels:** MEASURED = SEMrush estimate as exported · DERIVED = calculated here from an export · ESTIMATE = unverified. **We have measured nothing about our own site's rankings, traffic or indexing.**

## 1. Summary

- **Among the six databases followed up (in, uk, ng, pk, ae, za), India is the only market with applicant demand at scale:** exact "mbbs in ukraine" is 260 (kd 18) [S1]. (The all-database check shows ru 90 for "study medicine in ukraine", the highest single database; not followed up [PA].) The UK peaks at 90 (Bogomolets) [R2]; broad ceilings in Nigeria, Pakistan and South Africa are 20–40 [P3F].
- **Three intents carry the demand:** fees and cost, the "medical college" list, and named universities. MBBS wording and eligibility questions are smaller. Nursing, public health, physiotherapy, sport and preparatory terms have no measured demand in India (UK: nursing 20, public health 10) [R1].
- **Several large fee figures come from spikes:** four fee phrasings (720, 480, 320 and the Hindi-English "ukraine me mbbs fees kitni hai" 260) were near zero in ten of the twelve months (DERIVED from [P3R] trends). Steady broad (`phrase_related`) fee phrasings run at 140–590 each. The 2,900 "ukraine medical college fees for indian students" row is only marginally steady (typical ≈1,770, 61%) and stays a lead (cpc and competition 0) [P3R, S2]. None of these figures are additive.
- **Agencies hold most positions on the generic India head-term SERPs** (10/10 on "mbbs in ukraine", 9/10 on "ukraine medical college fees"); Wikipedia's list page is #1 for "ukraine medical college"; rmcedu.com is in all 7 stored SERPs [P3S]. Its 30 exported Ukraine keywords bring an estimated 719 visits/month, 95% to one hub page at positions 1–6 and 69% from fee and cost phrasings [N2]: hundreds of visits, not thousands (SEMrush ESTIMATE; no forecast for our site).
- **Larger university names have steady demand** (Vinnytsia's and Lviv's 50s are spikes) [R2]. The presumed official domain (an unverified lead) leads the Bukovinian SERP; domains resembling the university's name (judged from URLs; pages not opened) outrank the presumed official domain for Pirogov [P3S]. Profiles target the admissions angle for international applicants and are indexed only once verified.
- **Build no new indexable URL.** Every measured cluster already has one URL (eligibility → `/admissions/`, recognition → `/faq/`). The work is to fill `/tuition-fees/`, `/universities/` and the profiles with verified, dated facts.
- **New names (2026-10-12):** International European University (590) and "lugansk state medical university" (390, ambiguous) lead [N3]. Both have open status questions and stay unlisted until official evidence settles them.
- **Spend:** 6,710 units line-based (conservative bound 7,290). The expected balance, 43,290, is unverified. This plan needs no further spend.

## 2. Evidence base and unit accounting

| Date | Programme (ledger) | Metered calls | Units | Basis | Cumulative |
|---|---|---|---|---|---|
| 2026-10-10 | 1: pilot + 8 variant/broad calls | 10 | 2,110 | DERIVED from the owner's 47,890 reading | 2,110 |
| 2026-10-11 | 2: R1 programme terms, R2 universities/cities, probe | 10 | 850 | per-call counter (VERIFIED) | 2,960 |
| 2026-10-11 | 3: 7 SERPs, questions, related, competitor page, broad ng/pk/za, names ae/pk/za | 26 (22 metered; 4 NOTHING FOUND, recorded at 0 pending the owner's balance reading) | 3,270 (max-reading 3,380; conservative 3,850) | line-based ESTIMATE | 6,230 |
| 2026-10-12 | Directory milestone (reconciliation only) | 0 | 0 | — | 6,230 |
| 2026-10-12 | Priority check: Vinnytsia/Zaporizhzhia names | 1 | 30 | counter | 6,260 |
| 2026-10-12 | 4: rmcedu Ukraine URLs (300) + 18 new names (150) | 2 | 450 | counter | **6,710** (6,820; 7,290) |

**Balance:** the owner last read 47,890 on 2026-10-11, before programme 2. The expected balance is now **43,290** (43,180; conservative 42,710): an ESTIMATE, **unverified**, because the connector never reports the balance. The owner's reading is required before any further metered call. 550 units remain under the 1,000-unit working cap that the session set itself (the owner named no figure); it is not an authorised budget, and no call is made without the owner's balance reading and approval.

**How volumes are read**
- **Exact or broad.** `phrase_these` and `phrase_all` give exact-phrase figures. Rows from `phrase_fullsearch` and `phrase_related`, and volumes in `resource_organic`, are related-keyword leads. `phrase_questions` rows are related-keyword leads too. They are never added together or to exact figures. Three India rows share the rounded 2,900 bucket.
- **Never add overlapping figures.** Spellings of one institution are alternatives, not a sum.
- **Spike or steady.** Typical month = volume × median ÷ mean of the 12-month trend (DERIVED; gives the ledger's "about 180" for the official Pirogov name). "Spike" = typical month under 60% of volume, which matches every spike label in the ledger and `KEYWORD_URL_MAP.md`.
- **When reports disagree,** `phrase_these` governs. For example, "odessa national medical university" is 390 in [R2] but 320 in [N2].
- **Small figures.** 10–30 are the lowest buckets. kd and intent are mostly not computed outside India.

**Source key** (`research/semrush/`): **S1** `2026-10-10-phrase_these-{in,uk,ng,pk,za,ae}-variants.csv` · **PR** `2026-10-11-probe-phrase_these-in-mbbs-in-ukraine.csv` · **S2** `2026-10-10-phrase_fullsearch-{in,uk}-ukraine-medical.csv` · **R1** `2026-10-11-R1-phrase_these-*-programme-terms.csv` · **R2** `2026-10-11-R2-phrase_these-{in,uk,ng}-universities-cities.csv` · **P3U** `2026-10-11-P3-phrase_these-{ae,pk,za}-universities.csv` · **P3F** `2026-10-11-P3-phrase_fullsearch-{ng,pk,za}-ukraine-medical.csv` · **P3R** `2026-10-11-P3-phrase_related-in-mbbs-in-ukraine.csv` · **P3Q** `2026-10-11-P3-phrase_questions-in-mbbs-in-ukraine.csv` · **P3M** `2026-10-11-P3-phrase_these-in-study-mbbs-in-ukraine.csv` · **P3S** `2026-10-11-P3-phrase_organic-in-*.csv` (7 SERPs) · **N1** `2026-10-12-phrase_these-in-vinnytsia-zaporizhzhia-names.csv` · **N2** `2026-10-12-resource_organic-in-rmcedu-ukraine-urls.csv` · **N3** `2026-10-12-phrase_these-in-new-university-names.csv` · **PA** `2026-10-10-phrase_all-study-medicine-in-ukraine.csv` · **US** `2026-10-10-phrase_these-uk-seeds.csv` · **P3C** `2026-10-11-P3-resource_organic-in-rmcedu-mbbs-in-ukraine.csv`.

## 3. Demand by intent cluster

**India.** Format: volume · kd · pattern. "Broad" = a related-keyword row.

| Cluster | Representative keywords | Intent | Owning URL |
|---|---|---|---|
| Fees and cost | exact: mbbs in ukraine fees 260 · 7 [S1]. Broad, steady: ukraine medical college fees 590 · 12; ukraine mbbs fees 260 · 7 and cost of mbbs in ukraine 260 · 11 (identical 12-month trends: one demand, counted once); ukraine medical university fees 170 · 11. Broad, spike: ukraine medical fees 720 · 18; medical fees in ukraine 480 · 12; cost of medical education in ukraine 320 · 11; ukraine me mbbs fees kitni hai 260 · 26 [P3R]. Lead only (broad, marginally steady: typical ≈1,770 = 61% of 2,900 [P3R]; cpc 0, competition 0 [S2]): ukraine medical college fees for indian students 2,900 · 9 | informational | `/tuition-fees/` |
| List, "best" | broad, steady: ukraine medical college 2,900 · 22; best medical college in ukraine 390 · 14 (informational + commercial); ukraine medical college list 210 · 11 [P3R]. Exact: medical universities in ukraine 20 [S1] | informational / mixed | `/universities/` |
| MBBS / medicine | exact: mbbs in ukraine 260 · 18 [S1], steady [PR]; ukraine mbbs 260 [S1] (identical metrics: the same demand, counted once). Broad: ukraine mbbs college 480 · 7 [P3R]. Spike: study mbbs in ukraine 40 [P3M] | informational | `/courses/medicine/` |
| Named universities | exact, steady: bukovinian 480 · 30; odessa 390 · 16; kharkiv 390 · 34; bogomolets 320 · 25; ivano frankivsk 210 · 29; uzhhorod national university 140 · 30 (whole-university name; the medicine share is unknown); ternopil 110 · 16 [R2]; pirogov medical university ukraine 390 · 23 [N1]. "<name> fees" 10–30 [R2] | mostly navigational; odessa and pirogov informational; bukovinian informational + transactional | `/universities/<slug>/` |
| Eligibility | exact: mbbs in ukraine eligibility 30 [R1]. Question leads: NEET 20, spike; how many years 30, spike; cost 40, steady [P3Q] | informational | `/admissions/` |
| Recognition | exact: is ukraine mbbs valid in india 20, spike [R1]. Question leads: valid in India 30, spike; Germany 20 [P3Q] | informational | `/faq/` |
| Dentistry | study dentistry in ukraine 30, spike (typical ≈11) [R1] | informational | `/courses/dentistry/` |
| Excluded | returnee, NMC and news rows (broad, not summed; largest: ukraine returned medical students 2,900) [S2] | news | none |

**Other markets** (exact unless marked; kd mostly not computed):

| Market | Measured demand | Reading |
|---|---|---|
| UK | study medicine 30 (cpc 1.02); "mbbs in ukraine", "ukraine mbbs" and "mbbs in ukraine fees" 20 each [S1]; "mbbs fees in ukraine" 0 [US]; bogomolets 90 steady, other names 20 (Vinnytsia 0) [R2]; nursing 20, public health 10, dentistry 10 [R1]; 11 of the 18 broad rows are not about study (aid, volunteering, military; largest: medical volunteer ukraine 70) [S2] | Small trust market; existing URLs |
| Nigeria | variants 0–20 [S1]; names 10–30 [R2]; broad top: medical universities in kiev ukraine 40 [P3F] | Tier 2b: list and name interest |
| Pakistan | names 10–30 [P3U]; broad top: ukraine medical college 40 · 27, spike [P3F] | Tier 3 |
| UAE | names 10–40; Bukovinian's 40 is a spike (typical ≈18); Lviv 30 is steady [P3U]; broad not run | Tier 3 |
| South Africa | "study medicine" phrasing 30, MBBS 0 [S1]; 4 names at 10–20 (Bukovinian 20 is a spike) [P3U]; broad top 20 [P3F] | Tier 3 |

## 4. Competitor register

| Who ranks [P3S] | URL type | Where |
|---|---|---|
| Education agencies: rmcedu (7 of 7 SERPs), eklavyaoverseas (5 of 7), bookmyuniversity, studyeurope, mbbsexperts, riaoverseas, ruseducation and others | one "MBBS in Ukraine" hub, plus university sub-pages | 10/10 on the MBBS SERP; 9 of 10 positions on the fees SERP (8 distinct agency domains: mbbs-md.com at #8 and #10; Quora #6) |
| Wikipedia | list page; university articles | #1 "ukraine medical college"; #3 "best medical college in ukraine" (list page); #2 on the Bukovinian and Pirogov SERPs (in 4 of the 7 SERPs) |
| Domains taken to be official (official-domain leads; not verified) | home and about pages | bsmu.edu.ua #1/#3/#5; vnmu.edu.ua only #6 |
| Look-alike or agent domains | domain names resembling the university's (judged from URLs; pages not opened) | vnnmu.com #1 and pirogov-university.com #3 (Pirogov); kharkivmedicaluniversity.com #6 ("ukraine medical college") |
| Aggregators and rankings, Q&A, video | lists, ranking tables, answers | shiksha, uesukraine, scimagoir, timeshighereducation; Quora #6 (fees); YouTube #10 |

No regulator or news page appears in the stored SERPs. Both UK SERP requests returned no data (ledger, programme 3, calls 12 and 23).

**What earns them traffic [N2]** (ESTIMATE): 719 visits/month across 30 keywords. Of these, 682 (95%) land on the hub page, 495 (69%) come from fee and cost phrasings and 116 from "ukraine medical college". Seven university sub-pages share 37 visits. (The ledger's "about 85%" counts "ukraine medical college" together with the fee phrasings.) These figures come from [N2] alone. The older snapshot of 2026-10-11 [P3C] also showed a hub row for "best medical college in ukraine" (position 1, 19 visits; hub total 701); figures from the two dates are not combined.

**Gaps we can honestly fill:**
- dated fee schedules from official sources, with the source linked (no university or regulator page ranks for fees; we judged the rankers from their URLs, not the pages);
- a directory that compares universities without ranking them;
- profiles that link the official domain and warn about look-alikes;
- recognition answers quoted from the regulator's own document;
- the admissions angle of name searches (on the Bukovinian SERP, agencies hold positions 7–10).

**Gaps we will not fill:** unverified fee tables or "total cost" figures; rankings; "approved colleges" lists or any recognition claim without the regulator's document; head terms for university names; the returnee and news cluster.

## 5. Page-by-page plan

Every page carries the site-wide **Apply Online Now** button. "In" = other indexable pages linking from body text (`site/dist`; header, footer and breadcrumbs excluded; the 17 noindex previews also link to fees, directory, admissions, FAQ, About (#verification) and Apply). "Done" = on this branch, not released.

| URL | Intent | Primary cluster | Supporting terms | Evidence required before claims | Links in / key out | Conversion | Priority and reason | State / next action |
|---|---|---|---|---|---|---|---|---|
| `/` | brand, orientation | none (H1 avoids "study medicine") | — | verified profiles before featuring any | logo / directory, courses, fees, previews | Apply (hero) | P2: entry page, not a ranking target | Done. Next: feature published profiles |
| `/tuition-fees/` | budgeting | fees and cost | for-Indian-students phrasings; cost questions | ≥1 official fee schedule: year, currency or payment basis, period, track, exclusions | 10 / universities, medicine, admissions, FAQ | fee row → profile → Apply | **P0**: fee and cost phrasings bring 495 of the 719 estimated visits/month (69%) in the 30 exported rmcedu Ukraine-URL keywords [N2] (export truncated at 30 rows; a SEMrush ESTIMATE, not the competitor's total); kd 7–15 on steady fee phrasings in `phrase_related`/`phrase_these` [S1, P3R] (`resource_organic` gives 12–17 for the same keywords [N2]); unlikely to compete without verified figures | Done; the table reads "No fee verified yet". Next: the first dated fee row |
| `/universities/` | list, shortlist | medical college / list / best | medical universities in ukraine; ng "…in kiev" | ≥3 profiles meeting the minimum viable profile; no ranking | 11 / fees, admissions, previews | card → profile → Apply | **P1**: largest steady related-keyword row ("ukraine medical college" 2,900, typical ≈2,310; a broad lead) [P3R]; the exact list phrasing is only 20 [S1]; Wikipedia #1 on "ukraine medical college", #3 on "best medical college in ukraine" [P3S] | Done (no-ranking and look-alike sections). Next: body links to medicine and FAQ |
| `/universities/<slug>/` | admissions for international applicants | official name | "<name> fees"; old spellings | minimum viable profile (`DIRECTORY_VERIFICATION_PLAN.md` §5) | `/`, directory / Apply prefilled, admissions, fees, FAQ | Apply (`?university=`) | **P0 per verified profile**: steady demand, closest to an application | 17 noindex research previews (name only: the 12 earlier and the 5 found on 2026-10-12). Next: §7 |
| `/courses/medicine/` | programme orientation | MBBS / medicine | ukraine mbbs college; study medicine (uk, za); duration question | award title as printed, duration, language, intake; "MBBS" explained as a search term only | 8 / directory, fees, admissions, FAQ | Apply (`?course=medicine`) | **P1**: main service line | Done. Next: verified programme rows |
| `/admissions/` | eligibility, process | eligibility | NEET; how to get admission | verified requirements and document lists; preparatory routes | 12 / directory, fees, courses, FAQ | readiness → candidate profile | **P1** (P0 as product) | Done. Next: verified requirements |
| `/faq/` | questions, trust | validity in India | cost, duration, NEET, Germany | the regulator's own document; verified durations | 5 / admissions, fees, medicine | enquiry, Apply | P2: decisive questions, low volume | Done (FAQPage matches the visible text). Next: regulator-sourced answers |
| `/courses/dentistry/` | programme | study dentistry | — | verified programme | 5 / directory, fees | Apply | P2 | Done. Next: verified rows |
| `/courses/nursing/` | programme | study nursing (uk only) | BSN/MSN not returned | an English-taught award, verified; never "BSN/MSN" | 5 / as above | Apply | P3 | Retain |
| `/courses/pharmacy/` | programme | none measured | — | a verified English programme | 5 / as above | Apply | P3: thin | Fold into `/courses/` if nothing is verified by the next review |
| `/courses/` | hub | none | — | general guidance only | 1 + nav / courses, directory | course → Apply | P3 | Done (SEO-01 fixed) |
| `/apply/` | transactional | none | — | claim no accounts, uploads or payment | 13 + nav / admissions, privacy | **the conversion** | P0 (conversion) | Done. Next: events (`ANALYTICS_AND_SEARCH_CONSOLE.md` §C) |
| `/services/`, `/about/`, `/contact/` | trust, contact | none (`/services/` is an existing live URL, kept) | — | only services that exist; company facts the owner confirms | 1–3 / apply, FAQ, disclosure | enquiry | P3 | Retain |
| `/privacy/`, `/terms/`, `/complaints-policy/`, `/disclosure/` | compliance | none | — | owner's legal values | footer; body: disclosure 4, privacy 2, complaints 1, terms 0 / — | none | P3 | Retain, indexable |

## 6. Pages not to create

| Page type | Why not |
|---|---|
| Country pages (Indian, Nigerian, Pakistani, UK students) | Exact "mbbs in ukraine for indian students" 20 [R1]; the 2,900 row is a lead [S2] already served by an H2 on `/tuition-fees/`; Nigeria and Pakistan broad top 40 and South Africa 20 [P3F, broad]; UK exact 20–30 [S1]. The India trigger needs a verified fee, the regulator's document and a Search Console signal |
| City pages | No India city phrase returned [R2]; UK "medical university in lviv" 20 only [R2]; Nigeria's broad "medical universities in kiev ukraine" 40 [P3F] is a list query for `/universities/` |
| "Best" or ranking pages | 3 of the 10 results for "best medical college in ukraine" are ranking or "top" lists (#2, #4, #6); #1 is an agency hub [P3S]; we never rank |
| MBBS variants (fees, 2026, "for Indian students") | Same intent as `/courses/medicine/` or `/tuition-fees/`; "mbbs in ukraine 2026" not returned [R1] |
| Per-university fee pages | 10–30 each [R2]; fees go on the profile |
| "Approved colleges", alternative-spelling or comparison pages | Doorway or duplicate risk; recognition needs the regulator's document |
| Public health, physiotherapy, sport, preparatory, "English-medium" | Not returned, returned at 0 (public health, India), or UK 10 only [R1] |
| Indexed research previews | 90.6–94.2% alike across the 17 previews (`npm run audit:seo`, this commit), with no verified facts |

## 7. University profile pipeline

Order = the owner's verification order of 2026-10-11 (verifiability first, then demand; `KEYWORD_URL_MAP.md` §8). Demand = India, exact. Evidence = unverified leads.

| Order | Institution | Demand | Evidence position | Gate before indexing |
|---|---|---|---|---|
| 1 | Vinnytsia (Pirogov) | 390 · 23 steady [N1]; official name 320, spike (overlapping) | 2026/27 fee and admission PDFs; domains resembling the university's name (judged from URLs; pages not opened) rank #1 and #3 above the presumed official vnmu.edu.ua (#6) [P3S] | minimum viable profile |
| 2 | Odesa | 390 · 16 [R2] | 2026 fee page, intake window | as above |
| 3 | Bukovinian | 480 · 30 [R2] | weakest leads (no fee, address or format) | as above; Ivano-Frankivsk substitutes |
| 4–7 | Ivano-Frankivsk 210; Bogomolets 320 (uk 90); Ternopil 110; Uzhhorod 140 [R2] | steady | fee tables or intake leads | current-year documents |
| Gated | Kharkiv 390 · 34; Zaporizhzhia 90 (the former name; the current name not returned [N1]; the older spelling "zaporozhye…" 170 is a `resource_organic` lead [N2], not additive) [R2] | steady | front-line region; Berehove teaching (undated) | dated official operating or location statement |
| Later | Lviv 50 (spike) [R2] ("danylo halytsky…" names 110 each as `resource_organic` leads [N2]; overlapping, exact not measured), Poltava 20, Dnipro 20 [R2] | small | old or conflicting documents | later pass |
| New 1 | International European University (Kyiv; private according to search results) | 590 · 19, steady but declining [N3] | Malta campus licence reported revoked on 13 August 2025 (third-party report; UNVERIFIED) | current Ukrainian licence and campus status, from official pages |
| New 2 | "lugansk state medical university" | 390 · 20 steady [N3] | ambiguous: the Ukrainian university reported relocated to Rivne vs an occupied-territory institution (UNVERIFIED; "luhansk…" spelling not returned) | dated official notice of the Rivne base; explicit distinction |
| New 3 | Kyiv Medical University (private according to search results) | 140 · 20 [N3] (ambiguous: some searchers may mean another Kyiv medical university, such as Bogomolets; cannot be split) | licence and branch questions | licence evidence |
| New 4 | Sumy State University | 110 · 24 [N3] | listed as a research preview (name only) in this commit | minimum viable profile |
| New, low | Karazin 20; Taras Shevchenko 20; Black Sea NU 30; Cherkasy 20; National University of Pharmacy 40; Donetsk NMU 20 (relocation reported, needs an official notice); Zaporizhzhia NU 20; Kharkiv International MU 10 [N3] | small | Taras Shevchenko, Black Sea NU (Petro Mohyla), Cherkasy and the National University of Pharmacy meet the preview criteria and are listed as research previews in this commit; the others are not listed | as above |

**Demand sets only the verification order; evidence decides what is listed.** Five new research-preview records (Sumy State University, National University of Pharmacy, Taras Shevchenko National University of Kyiv, Petro Mohyla Black Sea National University, Bohdan Khmelnytsky National University of Cherkasy) are added in the same commit: names only, every claim unverified, noindex, not in the sitemap (`UNIVERSITY_DATA_REGISTER.md` §12; decision N26 proposed).

**To become indexable, a profile needs:**
1. The minimum viable profile: verified identity, dated current-year operating statement, programmes officially open to international applicants, tuition verified with its year or marked "not published".
2. A passing release gate and the owner's sign-off.
3. A link to the official domain and a look-alike warning; the template still needs a field for this (backlog N22).
4. A title aimed at admissions, not the head term.
5. Enough verified content to end the template similarity.

Publishing then removes the noindex and adds the page to the sitemap.

## 8. Measurement (Search Console; no data yet)

Baseline: an export on the day the property is verified, repeated 28 days after the release (`ANALYTICS_AND_SEARCH_CONSOLE.md` §A3); then each 28 days against the previous 28, plus a review 28 days after any release that publishes a fee or profile (§A4). No targets (§D).

| Question | Signal | Confirms the plan if | Changes the plan if |
|---|---|---|---|
| Indexed? | Pages report: 18 sitemap URLs; previews "Excluded by noindex" | all 18 are indexed | "Crawled – currently not indexed" on fees or the directory → publish verified rows first |
| Does each cluster land on its URL? | Performance, India, §3 groups | fees → `/tuition-fees/`, college → `/universities/`, MBBS → `/courses/medicine/` | two URLs share a group → fix titles and links |
| Does the no-ranking answer earn clicks? | CTR on "best" queries | CTR in line with the page's other queries | near-zero CTR → rewrite the snippet (still no ranking) |
| Is the country order right? | Impressions by country | India first, the UK second | other markets exceed SEMrush's picture → revisit the tiers and India's country-page trigger |
| Do profiles win the admissions angle? | Name and "<name> fees" queries per profile | clicks on admissions and fee queries | clicks only on the head term → retitle |
| What did SEMrush miss? | Queries with impressions that are absent from every CSV | — | recurring new queries → a research item, after the balance is reconciled |
| Do visits convert? | `apply_step_view` and `apply_submit` (defined in §C; beacon not built); the handler's records | starts follow impressions | traffic without starts → review CTAs before adding content |

For our own pages, Search Console governs. SEMrush stays the source for competitors and market size.
