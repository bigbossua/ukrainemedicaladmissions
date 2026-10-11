# UNIVERSITY_DATA_REGISTER.md

**Single source of truth:** `site/src/content/universities/<slug>.json`, validated at build time by the schema in `site/src/content.config.ts`. This document explains the model, the verification process and the current state of each record. It does not duplicate the data.

## 1. Data model (summary)

Every factual field is a **claim**: `{ value, status, source, checked, note }`.

| `status` | Meaning | How pages render it |
|---|---|---|
| `verified` | Checked against the official source in `source` on date `checked` | Shown as fact with "Verified", source link and date |
| `unverified` | Reported value (brief, earlier list, general knowledge) not yet checked | Shown highlighted with "Verification pending" and a warning |
| `outdated` | Was verified, but the source has changed or the academic year has passed | Treated like unverified until re-checked |
| `not-published` | We deliberately hold no value (e.g. a fee we have not confirmed) | "To be confirmed" — nothing invented |

Record-level: `officialName`, `alternativeNames`, `status` (operating / relocated / merged / suspended), `city`, `address`, `website`, `internationalOffice`, `founded`, `accreditation`, `recognition`, `accommodation`, `programmes[]`, `faqs[]`, `images[]` (with credit, licence, source, retrieval date), `verification { publishable, lastReview, openQuestions }`.

Programme-level: `qualification`, `course` (medicine | dentistry | nursing | pharmacy | preparatory | other), `durationYears`, `language`, `format`, `internationalAdmission`, `tuition { amount, currency, per, academicYear, schedule }`, `otherMandatoryCosts[]`, `entryRequirements`, `requiredDocuments`, `deadlines`, `intake`.

**`verification.publishable = false`** ⇒ the profile is built but `noindex`, excluded from the sitemap, carries a banner, and emits no structured data. Flip to `true` only after a full review.

University fees are never mixed with our own service fees (which do not exist in the data model at all).

## 2. Inclusion criteria for the directory (PROPOSED)

An institution is listed only when all of the following are evidenced:
1. It currently operates as a higher-education institution in Ukraine (official site live; present in a Ministry of Education / EDEBO register).
2. It offers at least one programme in medicine, dentistry, nursing or pharmacy leading to a recognised qualification.
3. It publishes an admissions route for international students (or explicitly states none — in which case it is listed with `internationalAdmission = false`).
4. Its current official name is confirmed; merged or renamed predecessors are recorded as `alternativeNames`, not as separate entries.
5. Relocated institutions (occupied-territory origins) are listed under their current operating city with `status = relocated`.

Completeness sources (official, identified 2026-10-10 by search; none yet fetched from this environment):
- **MoES "Study in Ukraine" university directory** — `universities.studyinukraine.gov.ua/en/minedu/university/<id>/` (contacts, invitation procedure per institution).
- **EDEBO** — `info.edbo.gov.ua` (Unified State Electronic Database on Education: licences, programmes; Ukrainian only).
- **NAQA accreditation register** — `naqa.gov.ua`.
- **World Directory of Medical Schools** — `search.wdoms.org` (listing only; never "recognised in country X").
Cross-check against the Wikipedia research list in the brief (research inventory only).

## 2a. How the data is edited (Option C rungs)

- **Rung 0 (current):** edit the JSON file on GitHub (web editor or local clone); `npm test` / CI validates the schema and fails on errors.
- **Rung 1 (prepared, inert):** `.pages.yml` at the repository root describes every claim field for Pages CMS, a free git-based editor with a form UI (status dropdown, source URL, check date). It activates only if the owner installs the Pages CMS GitHub App on the repository — an access decision, not a code change. Decap or Sveltia CMS are equivalent alternatives (they need an OAuth relay).
- **Rung 2 (on trigger only):** Kirby Panel — see `PROJECT_EXECUTION_PLAN.md` §2.

## 3. Verification procedure (per university, per intake)

1. Open the official website; record the domain in `website.source`.
2. For each claim, find the official page or PDF; paste its URL into `source`, set `checked` to today, set `status = verified`.
3. Fees: copy amount, currency, per-period and academic year exactly; record the payment schedule; never convert currencies.
4. If a page does not publish a fact, set `status = not-published` and explain in `note`.
5. Record the session in `SOURCE_VERIFICATION_REGISTER.md`.
6. When every programme the page shows has verified `language`, `durationYears`, `internationalAdmission` and `tuition` (or explicit `not-published`), set `verification.publishable = true` and `lastReview`.
7. Re-run `npm test`; the build fails on schema errors; the meta test fails if an unpublishable page leaks into the sitemap.
8. Diary a re-check before the next intake; set `outdated` when the academic year passes.

## 4. Record status

| Slug | Official name (claimed) | Publishable | Verified claims | Open questions |
|---|---|---|---|---|
| `ternopil-national-medical-university` | I. Horbachevsky Ternopil National Medical University of the Ministry of Health of Ukraine | **No** | 0 of 7 record-level, 0 of 44 programme-level | 7 (listed in the JSON) — official domain, international intake, fee schedule, requirements, deadlines, accommodation, recognition evidence |

Access attempt 2026-10-10: `www.tdmu.edu.ua` — DNS resolution failed from the build environment (network policy). No claim could be verified. Nothing has been invented to fill the gap.

## 5. Verification priority (SEMrush named-university evidence, 2026-10-10)

| Priority | Institution | Measured demand | Official domain (search-evidenced, unfetched) |
|---|---|---|---|
| 1 | Vinnytsia National Pirogov Memorial Medical University | in: "pirogov medical university ukraine" 390/mo (kd 23); uk 40 | to be identified |
| 2 | Bogomolets National Medical University (Kyiv) | in: 320/mo (kd 28, navigational); uk: 70 + "national medical university in kiev ukraine" 70 | `nmuofficial.com` (snippet: foreign applications 19 Jul–31 Oct 2026) |
| 3 | Bukovinian State Medical University (Chernivtsi) | uk: 20/mo | to be identified |
| 4 | Ternopil National Medical University (brief's pilot) | uk: 0/mo for admission and fees phrases; **not measured in in** | `tdmu.edu.ua` (official per search results) |

Ternopil remains the *template* pilot (its record exists and the page renders correctly as noindex) but has no measured search demand; the three institutions above should be verified before it unless the owner directs otherwise. **2026-10-11:** the snippet sweep (§6–§9, raw data in `research/universities/`) found Ternopil's official international pages carry a 2025/26 fee table, deadlines and an English-track nursing line — the richest leads of the sweep — so it moves to third in the expansion order on verification merit (§9).

## 6. Research inventory (NOT a confirmed list; from the brief)

Bogomolets NMU · Bukovinian SMU · Danylo Halytsky Lviv NMU · Dnipro SMU · Donetsk NMU (relocated) · International European University · Ivano-Frankivsk NMU · Kharkiv NMU · Kharkiv International Medical University · Kyiv Medical University · Luhansk SMU (relocated) · Odesa NMU · Odesa International Medical University · Poltava SMU · Ternopil NMU (pilot) · Uzhhorod NU (medical faculty) · Vinnytsia NMU · Zaporizhzhia SMPU · Sumy SU (medical institute) · Petro Mohyla Black Sea NU · Cherkasy NU · V. N. Karazin Kharkiv NU (medical school) · Taras Shevchenko NU of Kyiv · Dnipro Medical Institute of Conventional and Alternative Medicine. Postgraduate academies (Shupyk, KhMAPE, ZMAPE) are out of scope for undergraduate admissions unless a relevant programme is evidenced.

Each must pass §2 before a JSON record is created.

---

## 6. University discovery register (snippet-level leads from the 2026-10-11 search sweep; nothing verified)

Every cell is a **lead** quoted from a search-result snippet with its URL; official `.ua` pages were not opened (network policy, D5). "Verified relevant programmes" is therefore **none** for every row. Status values: *research candidate* · *needs further verification* · *verified for listing* (none yet) · *reject/defer*. Dates are those printed in the snippets; undated snippets are marked so. Fees are listed only to build the verification queue — **not for publication**.

| Institution (official name as found) | City · official site (snippet basis) | Programme leads with exact titles as found | International applicants (snippet) | Language (snippet) | Entry requirements (snippet) | Preparatory route (snippet) | Tuition leads (snippet; year) | Application window (snippet; year) | Recognition / status notes | Official pages to open at verification | Gaps | **Status** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **National Pirogov Memorial Medical University, Vinnytsya** (ВНМУ ім. М.І. Пирогова) | Vinnytsia · `vnmu.edu.ua`; international portal `foreign.vnmu.edu.ua` (official-domain snippets) | Medicine 222 "General Medicine"/"Medicine", Master, 6 y; Dentistry 221, Master, 5 y; Pharmacy 226 "Pharmacy (Industrial Pharmacy)", Master, 5 y full-time (also part-time) — all **official-domain, high confidence**; Nursing 223 «Медсестринство» bachelor (2025 programme doc); Public Health 229/I9 master's (2026 intake list; master's doc "draft/not accredited"); Physical therapy specialisation within «Терапія та реабілітація» bachelor 3 y 10 m; Physical culture and sport A7 bachelor (aggregator only) | Yes — Faculty of Foreign Citizens Training / Selection Commission; MES invitation (official PDF "specific features_studies_2025") | English and Ukrainian for Medicine, Dentistry, Pharmacy (official); Nursing, Public Health, Physical therapy: Ukrainian only in snippets | not in snippets beyond the invitation route and document list PDF | Preparatory Department (since 1979; Ukrainian language + natural sciences chairs; biology, physics, chemistry); duration not in snippet | 2026/27 official PDF: Medicine English 3,000 USD/y (Ukrainian 2,600); Dentistry English ≈3,500; Pharmacy English 2,800 full-time; Preparatory 1,300 | not in snippets | Operating in Vinnytsia; order №146 of 20.08.2025 on the 2025–26 educational process exists (content not in snippet) | `foreign.vnmu.edu.ua/en/admission-conditions-5/`, `vnmu.edu.ua/admission-of-foreign-citizens`, `…/downloads/other/Tuition_fee_2026-2027.pdf`, `…/specific features_studies_2026.pdf`, `…/List_doc_obtaining.pdf` | 2025–26 teaching format; preparatory duration/language; nursing/public health eligibility for foreigners; award titles | **Research candidate — first to verify** (strongest named-university demand: in 390, uk 40) |
| **Bogomolets National Medical University** (НМУ імені О.О. Богомольця) | Kyiv · `nmuofficial.com/en/` (official-domain admissions snippets) | Medicine I2, Master's, 6 y; Dentistry I1, Master's, 5 y; Pharmacy I8 "Pharmacy, industrial pharmacy", Master's, 5 y — **official, high**; Public Health «Громадське здоров'я» (aggregator price list only); Physical therapy/ergotherapy 227 bachelor (aggregator only); Nursing: no snippet | Yes — "Admission of foreign citizens" page, Faculty for Training of Foreign Citizens | "Studying is conducted in Ukrainian or English" (official) | document list and fees said to be on the admissions page; not in snippet | Preparatory department for foreign citizens; admission window 19 Jul–31 Oct (2024, 2025 notices); duration/subjects not in snippet | none official in snippets; domestic contract prices via news only | **2026: 19 July – 31 October 2026** (official snippet) | Operating; 2026 intake running | `nmuofficial.com/en/?p=73670`, `…/?p=114102`, `…/?p=192606` | official fee schedule; teaching format 2025–26; nursing/public health for foreigners | **Research candidate — second** (in 320 navigational, uk 70+70) |
| **Bukovinian State Medical University** (БДМУ) | Chernivtsi · `bsmu.edu.ua/en/`; admissions `vstup.bsmu.edu.ua` | Medicine "Master's in Medicine" (Medical Faculty No. 3 trains foreign students) — **official, high**; Dentistry 221 Master (2023 booklet); Pharmacy Master (2024 entrance programme, medium confidence); Nursing «Медсестринство» bachelor "incl. for foreigners" + master's (state portal); Physical therapy specialisation (bachelor, Ukrainian doc); Public health: none | Yes — Department for International Relations (`admission@bsmu.edu.ua`); English B1/B2 mentioned in FAQ | "Ukrainian and English languages (for foreigners)" (official); nursing/physio: Ukrainian only in snippets | English B1 (B2) level named in FAQ snippet | Preparatory course for foreign applicants: 40 weeks / 10 months, Nov–Aug, admission "all year around", core subjects in English for English-medium entrants; **1500 USD/year (official page, undated)** | degree fees: none official; UAH contract prices on state portal (2025/2026) | state portal window 01–08.09.2025 (aggregated); none official | Operating in Chernivtsi; autumn 2025 and spring 2026 timetables for foreign students show some remote synchronous classes | `bsmu.edu.ua/en/faq`, `…/en/admission/preparatory-course`, `…/en/medical-faculty-no3/`, `vstup.bsmu.edu.ua/…/english_program_2026.pdf` | official degree fees and deadlines; teaching format statement; award titles | **Research candidate — third** (uk 20) |
| **Danylo Halytsky Lviv National Medical University** (ЛНМУ) | Lviv · `new.meduniv.lviv.ua` (official-domain snippets) | Medicine 222, Dentistry 221, Pharmacy 226 — Master's (2023 rules PDF) — **official, high**; Nursing 223 junior bachelor at the Medical College only; Physical Therapy bachelor (attributed, URL unconfirmed); Public health: none | Yes — Faculty of Foreign Students; "Invitation to Study"; documents listed in official PDF | Ukrainian and English (official) | passport copy, secondary certificate with transcripts, consent (official PDF) | One-year preparatory course: intensive Ukrainian + chemistry, biology, physics (official page; a blog says Ukrainian-only) | official fee table **2021/22 — out of date** (Medicine 4,900 USD); 2025/26 and 2026 UAH figures via news (domestic) | **2023–24 windows — out of date** (1 Jun–14 Dec 2023; 16 Dec 2023–14 Mar 2024) | Operating in Lviv (news on 2025/26 and 2026 tuition approvals) | `new.meduniv.lviv.ua/en/?p=818`, `…/en/?p=902`, admission PDFs under `…/dep_foreign_students/3.%20ADMISSION/` | current rules, deadlines, fees for foreigners; nursing degree level | **Needs further verification** (no measured search demand yet; strong supply) |
| **Ivano-Frankivsk National Medical University** (ІФНМУ) | Ivano-Frankivsk · `ifnmu.edu.ua` / `…/en/` | Medicine I2 "Master of Medicine" 360 ECTS 5 y 10 m; Dentistry I1 Master; Pharmacy I8 Master (English fee row) — **official, high**; Nursing «Сестринська справа» bachelor (2 y 10 m shortened track; accredited "for the first time" 2025); Public Health I9 master's **new, presented April 2026, under discussion**; Physical therapy/ergotherapy bachelor 3 y 10 m and master's; PhD for foreigners | Yes — Faculty of Training of Foreign Citizens; Selection Commission regulation 2026 PDF | "Ukrainian and English … depending upon a student's choice" (official); nursing/PH/physio: Ukrainian docs only | not in snippets | Preparatory Department: 10-month year; Ukrainian + biology, chemistry, mathematics, physics, computer science, drawing, geography; groups of 6–8; certificate | **2025 official table**: Medicine English 4,000 USD/y (24,000 total); Dentistry English 4,300/y (21,500); Pharmacy English 3,600/y (18,000); paid in UAH at NBU rate | 2026 campaign section exists; dates not in snippet | Operating; rector's order 26.08.2025: blended format with distance elements, autumn 2025; 1 Sep 2026 news: in-person practicals for foreign students | `ifnmu.edu.ua/admissions-committee-2026/`, rules 2026, Selection Commission 2026 PDF, cost page 2025, fees page | 2026 fees/deadlines; spring 2026 format; eligibility of foreigners for nursing/PH/physio | **Needs further verification** (no measured demand yet; richest official documentation) |
| **Odesa National Medical University** (ОНМедУ) | Odesa · `onmedu.edu.ua` (`?lang=en`) | Medicine 222 "Master of Medicine"; Dentistry 221; Pharmacy 226 — Master's — **official, high**; Nursing I5 bachelor 240 ECTS 3 y 10 m (Ukrainian); Public Health I9 master's 120 ECTS (accreditation "none" in 2025 doc); «Терапія та реабілітація» bachelor; Psychology and Management in the international fee table | Yes — Department of international cooperation; Unified Interagency route | English and Ukrainian for Medicine/Dentistry/Pharmacy (fee table); nursing/PH/physio: Ukrainian | listed on "requirements" page (not in snippet) | Preparatory department (since 1992), biomedical profile: Ukrainian as a foreign language + physics, chemistry, biology; **1,300 USD (2026 table)** | **2026 fee page**: Medicine (English) 3,500 → 5,000 USD by year; Dentistry (English) 4,500 → 5,500; Pharmacy (English) 3,500 → 4,500 | **01.07.2026 – 31.10.2026** (official 2026 PDF) | Operating; 2024/25 format in-person or mixed; 2025–26 statement not found | `onmedu.edu.ua/information-foreign-citizens/…` (international-faculty, requirements, fees, language-training, programmes), 2026 admission PDF | 2025–26 format; durations in English text; eligibility for nursing/PH/physio; secondary domain status | **Needs further verification** (no measured demand yet) |
| **Poltava State Medical University** (ПДМУ; until 1 May 2021 Ukrainian Medical Stomatological Academy) | Poltava · `pdmu.edu.ua` / `en.pdmu.edu.ua` | Medicine 222 Master 360 ECTS 5 y 10 m; Dentistry 221 Master 300 ECTS 4 y 10 m — **official, high**; Nursing 223 "Bachelor of Nursing" (paramedic programme; Ministry portal lists English-medium fee 1,900 USD); Public Health 229 master's (2025 programme); Physical therapy 227 bachelor; Pharmacy: Ukrainian part-time master's via aggregator only | Yes — International Faculty (renamed 1 Nov 2020) | English and Ukrainian for Medicine/Dentistry; Nursing English per Ministry portal line (unconfirmed officially) | not in snippets | Educational and Research Center for Foreign Citizens Training (former Preparatory Department): one year; Ukrainian, biology, chemistry, physics, mathematics, computer science | official PDF **undated**: Dentistry 4,592 USD first year / 25,396 total; Medicine 4,008 first year; **conflicts** with Ministry portal "about 2,500/3,000 per year" | 2024 domestic deadlines only; aggregator claims a 2026 intake | Operating (2025 simulation-centre news); wartime distance-learning notices 2023–24 | `en.pdmu.edu.ua/info/foreign-students`, fee PDF, programme PDFs, `universities.studyinukraine.gov.ua/en/minedu/university/82/cost` | current rules/deadlines/fees for foreigners; pharmacy for foreigners; nursing award for English-medium | **Needs further verification** |
| **I. Horbachevsky Ternopil National Medical University** (TNMU/TDMU) — the existing template record | Ternopil · `tdmu.edu.ua/en/`; international subsite `tdmu.edu.ua/int/` | General Medicine/"Medicine" Master 5 y 10 m; Dentistry Master 5 y; Pharmacy Master 5 y — **official fee page, high**; Nursing bachelor 3 y 10 m with an **English track in the official fee table** (label garbled in snippet; award name "Bachelor of Nursing"/"Bachelor of Science" unconfirmed); Public Health master's (Ukrainian; ASPHER listing; first graduates June 2021); Physical therapy 227 bachelor + master's (faculty subsite) | Yes — International Students Faculty dean's office; invitation via `apply.studyinukraine.gov.ua` | English and Ukrainian tracks for Medicine, Dentistry, Pharmacy, Nursing (fee table); PH/physio: Ukrainian | scanned passport, secondary certificate with transcript, personal data (official admission page) | Preparatory Department for foreigners: 1 academic year (10 months), start 1 October; Ukrainian, biology, chemistry, physics, mathematics, computer science; groups of 12; state certificate; licensed for 100 (Ministry portal + official page) | **Official page stated for 2025/26 (USD)**: General Medicine English 3,500 y1 then 4,100 (total 24,000), Ukrainian 3,000 then 3,700; Dentistry English total 22,000; Pharmacy English 2,800 y1 then 4,000 (18,800); Nursing English 2,800 × 4 (11,200) | official page: **1 November (autumn) and 1 March (spring)** — undated snippet | Operating in Ternopil; explicit classroom-format statement only for 2024–25; readiness reports Aug 2025, Nov 2025, Aug 2026 | `tdmu.edu.ua/int/admission/`, `…/int/payment-info/`, `…/int/?p=5664`, `…/int/rules-of-admission/`, `…/int/?p=1625`, Ministry portal university/68 | 2026/27 fees; current teaching format; exact award names (medicine, nursing); PH/physio eligibility | **Needs further verification** — richest official leads of the sweep; **0 measured search demand (uk)**, in unmeasured |
| **Kharkiv National Medical University** (ХНМУ) | Kharkiv · `knmu.edu.ua` (states it is the only official site) | Medicine Master 360 ECTS 6 y, "Master of Medicine and Doctor of Medicine" (2024 catalogue) — **official, high**; Dentistry Master (2024/25 PDF; "Dental practitioner"); **Nursing bachelor 240 ECTS "taught in Ukrainian and English" (official 2021 catalogue + English PDF)** and Nursing master's (2024 PDF, "Ukrainian and English (certain topics)"); Public Health master's (2022 doc: Ukrainian and English); Physical Therapy, Occupational Therapy (IV Medical Faculty); Pharmacy: no snippet | Yes — 2025 admission regulations for foreigners; Educational and Scientific Institute for Foreign Citizens; electronic invitation via the Unified System; remote admission mentioned | Ukrainian, English (medicine, nursing per official docs); dentistry current language unconfirmed | per 2025 regulations page (not in snippet); e-invitation valid ≤ 6 months | Preparatory department: one academic year (10 months), two semesters, medical-biological focus, Ukrainian > half of study time, completion certificate | **none official**; aggregators only (≈4,200–5,500 USD/y, undated) | none in snippets | Operating and publishing in 2026; **Sept 2025 press: only nine international students admitted in 2025**; teaching format 2025–26 and any relocation: no official snippet | `knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/`, contacts page, VI Faculty page, preparatory page, programme catalogue | official fees; deadlines; current format/safety situation (front-line region); pharmacy | **Needs further verification — operating-conditions check first** (region under sustained attack; low 2025 international intake per press) |
| Zaporizhzhia State Medical and Pharmaceutical University | Zaporizhzhia | **not researched** — the sweep's shared web-search budget was exhausted before this agent ran; nothing filled from memory | — | — | — | — | — | — | — | official site to be identified | all | **Research candidate — sweep to be repeated** |
| Dnipro State Medical University | Dnipro | **not researched** (same cause) | — | — | — | — | — | — | — | — | all | **Research candidate — sweep to be repeated** |
| Uzhhorod National University, Faculty of Medicine | Uzhhorod | **not researched** (same cause) | — | — | — | — | — | — | — | — | all | **Research candidate — sweep to be repeated** |
| Other institutions in §6 research inventory (Sumy SU, Karazin KhNU, Kyiv Medical University, Odesa International MU, Kharkiv International MU, Donetsk NMU (relocated), Luhansk SMU (relocated), International European University, Petro Mohyla BSNU, Cherkasy NU, Taras Shevchenko NU, Dnipro Medical Institute of Conventional and Alternative Medicine) | various | not swept in this pass | — | — | — | — | — | — | relocated institutions need a dated official notice before any listing | — | all | **Research candidates — later pass** |

**Sweep limits (honest record):** 12 university agents and 2 programme agents ran with a shared budget of 200 web searches per turn; the budget ran out after the ninth university, so Zaporizhzhia, Dnipro, Uzhhorod and the two programme-topic agents returned no data (correctly, nothing was filled from memory). Those items are repeated in the next turn before any decision depends on them.

## 8. Programme-by-university matrix (leads only; ● official-domain snippet · ○ third-party snippet · — no snippet · E = English track in snippet · U = Ukrainian only in snippet · ? = language not in snippet)

| University | Medicine | Dentistry | Pharmacy | Nursing (bachelor / master) | Public health (master) | Physical therapy / rehab | PE / sport | Preparatory dept. |
|---|---|---|---|---|---|---|---|---|
| Vinnytsia (Pirogov) | ● E+U | ● E+U | ● E+U | ● U / — | ● U (draft, not accredited) | ● U (bachelor) | ○ ? | ● (Ukrainian course; 1,300 USD 2026/27) |
| Bogomolets (Kyiv) | ● E+U | ● E+U | ● E+U | — | ○ ? | ○ ? (bachelor) | — | ● (window 19 Jul–31 Oct) |
| Bukovinian (Chernivtsi) | ● E+U | ● E (2023) | ● E? (2024) | ● ? bachelor "incl. for foreigners" / ○ master | — | ● U (specialisation) | — | ● (10 months; English core subjects for English-medium entrants; 1,500 USD undated) |
| Lviv (Danylo Halytsky) | ● E+U | ● E+U | ● E+U | ● junior bachelor (college) | — | ○ ? | — | ● (1 year; Ukrainian + Chem/Bio/Phys) |
| Ivano-Frankivsk | ● E+U | ● E+U | ● E | ● U bachelor / — | ● U master (new 2026, under discussion) | ● U bachelor + master | — | ● (10 months) |
| Odesa | ● E+U | ● E+U | ● E+U | ● U bachelor | ● U master (accreditation "none" 2025) | ● U bachelor | — | ● (biomedical; 1,300 USD 2026) |
| Poltava | ● E+U | ● E+U | ○ U part-time master | ● bachelor "Bachelor of Nursing"; Ministry portal lists E fee | ● U master | ● U bachelor | — | ● (1 year) |
| Ternopil | ● E+U | ● E+U | ● E+U | ● **E+U bachelor** (fee table; label garbled) | ● U master | ● ? bachelor + master | — | ● (10 months; start 1 Oct) |
| Kharkiv | ● E+U | ● ? | — | ● **E+U bachelor** (2021 catalogue) / ● E-partial master | ● E+U? (2022 doc) | ● ? | — | ● (10 months) |
| Zaporizhzhia · Dnipro · Uzhhorod | not researched this pass | | | | | | | |

Reading: English-medium **medicine, dentistry and pharmacy for foreigners** are the consistently documented offer. **Nursing in English** has official-domain leads at exactly two universities (Kharkiv, Ternopil) plus a Ministry-portal line for Poltava — enough to justify verifying, not enough to publish. **Public health and physical therapy** appear only as Ukrainian-language programmes, several newly created or not yet accredited. **Preparatory departments** exist everywhere swept, almost all as Ukrainian-language preparation; Bukovinian is the only snippet describing English-medium core subjects.

## 9. Recommended expansion order and the deferred / excluded list

**Order (evidence = measured search demand + strength of official leads + verification effort):**

| Order | University | Why now | What must be true before the profile is indexable |
|---|---|---|---|
| 1 | Vinnytsia (Pirogov) | Largest named-university demand (in 390, uk 40); official 2026/27 fee PDF and admission PDFs exist to verify against | §3 procedure complete for Medicine, Dentistry, Pharmacy; teaching-format notice for the current year |
| 2 | Bogomolets (Kyiv) | Second demand (in 320, uk 140 across two namings); 2026 intake window official | as above + an official fee page (none in snippets) |
| 3 | Ternopil | Richest official leads incl. 2025/26 fee table, deadlines and English-track nursing; the template record already exists; **no measured demand** — indexed on verification merit, measured later via GSC and R2 | as above; nursing award title and English availability confirmed or the nursing line left unpublished |
| 4 | Bukovinian (Chernivtsi) | uk 20; preparatory course with English core subjects — relevant to the readiness service | as above; official degree fees (none in snippets) |
| 5 | Ivano-Frankivsk, Odesa, Lviv, Poltava | Strong supply, no measured demand yet (R2 decides order among them); Lviv's and Poltava's official fee documents are out of date or conflicting | as above; current-year documents |
| 6 | Kharkiv | Official English-medium nursing lead, but the operating-conditions check comes first (front-line region; nine international admissions in 2025 per press) | dated official statement on format and location for the current year; fees |
| — | Zaporizhzhia, Dnipro, Uzhhorod, and the rest of the §6 inventory | Not yet researched | sweep repeated; relocated institutions require a dated official notice |

**Deferred or excluded until verification exists (cannot be published):**

- Every university above as an *indexable* profile — none has a single verified claim yet; the register and matrix are leads.
- Nursing as an English-medium offer anywhere except as "to be confirmed"; the terms BSN/MSN as award names (no snippet uses them).
- Public health and physical-therapy programmes for international applicants (no snippet shows eligibility or English); "MPH" as an award name.
- Physical education / sport degrees (no medical-university supply found).
- Any fee figure (official leads exist for Ternopil 2025/26, Vinnytsia 2026/27, Odesa 2026, Ivano-Frankivsk 2025; Poltava's is undated and conflicts with the Ministry portal; Lviv's is 2021/22) — each must be read from the official page on the verification date.
- Any deadline (Bogomolets and Odesa 2026 windows are official leads; Ternopil's is undated; Lviv's is 2023–24).
- Any statement about teaching format or safety for 2025–26: no university returned a dated official snippet for the current year — this is the single most important verification item before any profile goes live.
- Relocated institutions (Donetsk NMU, Luhansk SMU) until an official current-location notice is read.

---

## 7. Comparison framework for prospective students (how universities will be compared — no rankings)

Only fields with `status = verified` are compared; anything else is shown as "not published" or "awaiting verification". The directory's comparison table and each profile use the same fields in the same order:

| Field | Shown as | Rule |
|---|---|---|
| Programmes open to international applicants | list with award title and duration | from verified programme records |
| Language of instruction per programme | English / Ukrainian / both | verified per programme, not per university |
| Entry requirements per programme | subjects, grades/scale, exams, language level | verified requirement objects only; "not published" otherwise |
| Preparatory route | yes/no, duration, language, progression condition text | verified; progression text copied from the official page |
| Tuition (per year, currency, academic year) | exact figures with year and source | never converted, never averaged, never "from $" |
| Application window / deadlines | dates with the intake year | verified for the current cycle only |
| Location and current status | city; operating / relocated / blended; last official notice date | from official notices; undated snippets are not status evidence |
| Recognition / listing | "listed in the World Directory of Medical Schools: yes/no (date)"; regulator statements only as quotations with source | never "recognised in country X" as our claim |
| Last verified | date | shown on every card and profile |

Words the site never uses about a university: best, top, safest, cheapest, most recognised, guaranteed, partner (unless a written agreement exists and is cited).

## 10. How the directory and candidate-profile system support many universities and programmes

- **One source of truth:** `site/src/content/universities/<slug>.json` holds record-level and programme-level claims; programmes carry `course`, `qualification`, `level`, `language`, `durationYears`, `internationalAdmission`, `tuition`, and (new) `requirements[]` and `preparatoryRoute` claim objects. The schema in `site/src/content.config.ts` is extended for `field ∈ {medicine, dentistry, pharmacy, nursing, public_health, physical_therapy, physical_education, preparatory, other}` and `level ∈ {bachelor, master, integrated_master, junior_bachelor, preparatory, phd}`.
- **Directory filters** by field, level, language, city, preparatory route and "verified for intake <year>"; cards show only verified facts and the last-verified date.
- **Candidate profile** (APPLICATION_SYSTEM_SPEC §8) lets the candidate pick field + level first, then universities; the readiness assessment compares their record with the verified requirement objects of each selected programme and lists gaps per programme, with the university's preparatory route shown where verified.
- **Nothing hard-coded:** Ternopil is one record among many; the profile template, the filters, the readiness logic and the application database import all iterate over whatever records are publishable.
- **Operating-status guard:** a record whose `status` is not `operating` or `relocated` with a dated official notice within the current academic year cannot be publishable.
