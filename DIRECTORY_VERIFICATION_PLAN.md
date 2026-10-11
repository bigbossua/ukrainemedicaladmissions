# DIRECTORY_VERIFICATION_PLAN.md — from one listed university to a verified multi-university directory

**Date:** 2026-10-11 · **Branch:** `claude/university-profile-pipeline` at `8410f95` · **Production:** unchanged (the `production` branch still carries the build of `4d4e605`; the live site lists one university, Ternopil, as a `noindex` "verification in progress" page). Nothing in this plan is deployed or published.

**The honest position.** Seven real records exist on the branch. All seven are **draft shells built from search-snippet leads**: 749 claim objects in total, **0 verified**, 0 with a source URL, 0 with a check date. Not one of them is a completed university profile, and none produces a page in a production build (publication gate, `UNIVERSITY_DATA_REGISTER.md` §1). The binding constraint is **verification access** — every official `.ua` domain, the Ministry portal, EDEBO, NAQA and WDOMS are unreachable from the build environment — not the number of records. Creating more shells would add unverified claims and zero published pages.

Evidence labels used below: **VERIFIED** = read in a repository file or computed from it by script; **LEAD** = search-snippet lead recorded in `research/universities/*.json` and the record notes (a URL or snippet is never verification); **OWNER-REPORTED** = from the brief or the owner; **ASSUMPTION** = stated as such.

## 1. Where each of the seven records stands (VERIFIED by script at `8410f95`)

| # | Record (slug) | Exists | Verified claims | Leads with a value | Not-published | Programmes (with an international-admission lead) | Official-domain references | Open questions | Evidence strength | India demand (KEYWORD_URL_MAP §6.1 / §8 row) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Vinnytsia National Pirogov Memorial Medical University (`vinnytsia-national-pirogov-memorial-medical-university`) | yes | **0** | 40 | 79 | 7 (3: medicine, dentistry, pharmacy) | 19 of 19 | 12 | 3/5 | in 390 ("pirogov medical university ukraine", kd 23) + 50 (official name); uk 40 (M4) |
| 2 | Odesa National Medical University (`odesa-national-medical-university`) | yes | **0** | 36 | 69 | 6 (3: medicine, dentistry, pharmacy) | 21 of 21 | 11 | 3/5 | in 390 (kd 16, lowest of the large names); uk 20; ng 20 (M16) |
| 3 | Bukovinian State Medical University (`bukovinian-state-medical-university`) | yes | **0** | 26 | 65 | 5 (3: medicine, dentistry, pharmacy) | 18 of 22 | 12 | 3/5 | in 480 (largest; informational + transactional; kd 30); uk 20; ng 30 (M6) |
| 4 | Ivano-Frankivsk National Medical University (`ivano-frankivsk-national-medical-university`) | yes | **0** | 44 | 75 | 7 (3: medicine, dentistry, pharmacy) | 22 of 22 | 12 | 3/5 | in 210 (kd 29); uk 20; ng 20 (M17) |
| 5 | Bogomolets National Medical University (`bogomolets-national-medical-university`) | yes | **0** | 28 | 63 | 5 (3: medicine, dentistry, pharmacy) | 9 of 13 | 13 | 3/5 | in 320 (kd 25); uk 90 (strongest UK name); ng 20 (M5) |
| 6 | Ternopil National Medical University (`ternopil-national-medical-university`) | yes | **0** | 38 | 67 | 6 (3: medicine, dentistry, pharmacy) | 7 of 8 | 11 | 3/5 | in 110 (kd 16); uk 20; ng 20 (M19) |
| 7 | Uzhhorod National University (`uzhhorod-national-university`) | yes | **0** | 19 | 100 | 7 (1: medicine) | 15 of 16 | 12 | 3/5 | in 140 (kd 30); uk 20; ng 20 (M18) |

"Verified claims" would have to be non-zero for any profile; the project's own test (`site/tests/records-evidence.mjs`, rule R6) refuses `publishable: true` for every one of these records today (11–13 failures each when simulated). "Evidence strength" is the assessed quantity of official-domain, dated, intake-specific lead material available to verify against — analyst judgement, labelled as such.

### 1.1 What the leads consist of, per record (LEAD unless marked)


- **Vinnytsia National Pirogov Memorial Medical University** — two year-stamped fee PDFs (2026/27; 2025/26 citing orders of 19.05.2025), foreigner-admission procedures approved 30.04.2026, a document-list PDF, the 2025 Medicine programme document; an order of 20.08.2025 on the 2025–26 educational process exists (wording unread); no address lead; the foreign-faculty page is dated 2022.
- **Odesa National Medical University** — a 2026 admission PDF (committee period 01.07–31.10.2026, exam subjects, remote route, recognition deadline), a fee page labelled as the 2026 intake table (header and year label unconfirmed), 2026 specialty codes, "Master of Medicine" on the master's page, an address lead; latest teaching-format statement covers 2024–25 only.
- **Bukovinian State Medical University** — the 2026 English entrance-exam PDF (CEFR B2 interview; in person and/or remote), the admissions sub-site, Medical Faculty No. 3 page, FAQ with contact and document rules; but no address lead, no current-year degree-fee lead (the official fee page showed 2023–24 content), no dated teaching-format statement (timetables only), conflicting preparatory leads.
- **Ivano-Frankivsk National Medical University** — the best operating-status evidence of the seven (news dated 2026-09-01: in-person practicals for foreign students; order No. 964-д of 26.08.2025), a 2025 fee table for foreign citizens (columns unlabelled), the 2026 Selection Committee regulation, the 2025 Medicine programme document (award "Master of Medicine"), a contacts lead; every intake-specific lead is from the closed 2025 cycle.
- **Bogomolets National Medical University** — one official admissions page whose 2026 version carries the application window (July–October 2026), the three-programme list with durations, "Ukrainian or English", oral-exam programmes and (reportedly) the document list and tuition; no fee figure in any snippet, contacts from an undated snapshot, primary-domain question (nmuofficial.com vs nmu.ua), no teaching-format statement.
- **Ternopil National Medical University** — a fee table "as set up in 2025/2026" (past year by today), an admission page with document list, undated deadlines, preparatory pages on two subdomains, dated operation news (Aug 2026) without a format statement; three values are brief-sourced (long name, address, founded).
- **Uzhhorod National University** — 2026 two-stage admission rule for fee-paying foreigners, remote-exam rule, English-medium Medicine at Medical Faculty No. 2, June 2026 graduation; but the official English-programme fee page was never captured, no address lead, pharmacy/sport leads third-party only, 6 of 7 programmes without any eligibility lead.

Adversarial checks over the records (2026-10-11) found and corrected five inferences that had crept in as lead values: specialty codes not present in the snippets (Bukovinian medicine and physical therapy; Bogomolets dentistry and pharmacy national numbers), a medicine level recorded as "integrated" where the snippet only says master's (Vinnytsia, Uzhhorod), the Ternopil preparatory language of instruction, and a Ternopil public-health note mislabelled "official domain" (the basis is a third-party listing). Every unverified value must be treated as a question to answer from the live page, never as a default to confirm.

## 2. What prevents publication — the same five things for all seven (VERIFIED against `site/tests/records-evidence.mjs` R6 and `UNIVERSITY_DATA_REGISTER.md` §1, §3, §9, §10)

1. **Identity fields are not verified.** `officialName`, `status`, `website` and `address` must each carry an https source URL on the university's own domain and a check date. Today all are unverified, and `address` has no lead at all for Bukovinian, Vinnytsia and Uzhhorod.
2. **No dated current-year statement of operation and teaching format.** The register treats this as the single most important item before any profile goes live (§9, §10 guard). Leads: Ivano-Frankivsk has a news item dated 2026-09-01 and an order of 26.08.2025; Vinnytsia has an order of 20.08.2025 whose wording is unread; Uzhhorod an exam-session order for semester 1 of 2025–26; Odesa, Ternopil and Bukovinian only 2024–25 statements or timetables; Bogomolets none.
3. **Programme gate.** R6 requires every programme object's `internationalAdmission` to be verified. Each record also holds Ukrainian-only programmes (nursing, public health, physical therapy, sport) with no eligibility lead; they must be verified, or moved out of `programmes[]` into deferral notes, before `publishable: true`.
4. **Fees, deadlines and intake dates may exist only as verified values** (hard rule, R4). Every fee and date is held in note text today. Publication with "To be confirmed" fees is honest but weaker; whether that is acceptable is an owner decision (§5, decision b).
5. **Open questions must be empty and `lastReview` set.** Each record has 11–13 open questions; each must be answered from an official page or closed as not-published with a note naming the page read.

Plus the access blocker behind all five: no official page has been opened from this environment (`EXECUTIVE_REPORT.md` §C; `SOURCE_VERIFICATION_REGISTER.md` shows only FAILED / SNIPPET-ONLY / LEADS-ONLY sessions).

## 3. Access or evidence required (either route suffices; both together are fastest)

**Route A — allow-list (scalable, free, minutes).** Environment → Edit → Network access → Allowed domains. The `EXECUTIVE_REPORT.md` §C list, plus hosts the records cite that §C omits: `www.bsmu.edu.ua`, `vstup.bsmu.edu.ua`; `www.vnmu.edu.ua`, `foreign.vnmu.edu.ua`, `new.vnmu.edu.ua`, `web.vnmu.edu.ua`; `www.ifnmu.edu.ua`; `www.uzhnu.edu.ua`; `www.tdmu.edu.ua`, `junior.tdmu.edu.ua`, `phr.tdmu.edu.ua`; `nmu.ua`, `nmu.edu.ua` (domain question); `naqa.gov.ua`, `en.naqa.gov.ua` (NAQA is missing from §C); and the two production hosts for `npm run verify:live`. Gate: a test fetch of each host succeeds and is recorded in `SOURCE_VERIFICATION_REGISTER.md`.

**Route B — owner-supplied captures (fast, no waiting).** The owner or daughter opens each page in a normal browser and saves it as a PDF with the browser print header showing the URL and date (or a screenshot with the address bar visible), filed in a folder per slug. The checklists in §6 name the pages. A page that cannot be found is reported as "not found" so the field is closed as not-published instead of left open. ASSUMPTION (method): a capture showing URL and date is enough for `source` and `checked`; the final URL of any page reached by navigation must be recorded.

**Register lookups** (either route): EDEBO (`info.edbo.gov.ua`, Ukrainian) or the Ministry portal entry for §2 criterion 1 and the official name; NAQA for `accreditation` (certificate or listing, never a news item); WDOMS for a bare "listed" statement only.

**E-mails to the universities** (optional, parallel): they can point to the right page or justify a not-published note, but an e-mail reply can never itself be a `source` — the schema requires an https URL (`site/src/content/schema.mjs`).

## 4. What could safely be published after verification

Common to every record: the identity fields; status with the verbatim dated statement; for each programme the university states is open to international applicants — level, specialty code and award title exactly as printed, duration as printed, languages, the intake the facts refer to, entrance-exam subjects and format, the document list with its conditions, fee with amount, currency, period, academic year and payment basis, dates only when printed with the year; the preparatory route with the university's own progression wording. Never, even after reading the page: recognition or licensing implications, rankings, third-party or agency fee figures, stale-year statements presented as current, "MBBS/BSN/MSN/MPH" unless the university uses the term, promotional statistics.

Per record (the strongest items, LEAD → candidate for verification):

- **Vinnytsia National Pirogov Memorial Medical University:** official name, website and international portal, address (contacts page), international office; status with the verbatim dated order on the educational process; Medicine / Dentistry / Pharmacy: level, code, duration (12 / 10 / 10 semesters), languages, international admission for 2026/27, entrance-exam subjects (only if the page is current), the five document rules, tuition 2026/27 in USD per year with the NBU-rate payment basis; preparatory department subjects, language, duration, certificate, progression wording, fee with year.
- **Odesa National Medical University:** official name, website, address (13 Olgiivska St.) and admissions phone; status with a dated current-year notice (to be located); Medicine (222 / I2, "Master of Medicine"), Dentistry (221 / I1), Pharmacy (226 / I8): level, code, award, duration as printed, English and Ukrainian tracks, international admission 2026/27, entrance exams (biology, chemistry, language of study), remote-route document conditions and the one-year recognition deadline, committee working period recorded as such, tuition per year with the table's academic year, instalment wording; preparatory department profile, duration, subjects, certificate, fee with year.
- **Bukovinian State Medical University:** official name, website and admissions sub-site, address (contacts page), international-relations email; status with a dated university-wide notice (none found yet); Medicine / Dentistry / Pharmacy: level, duration, award, languages, international admission and intake dates from the 2026/27 rules, the English interview requirement (CEFR B2), the numbered document list with certification and legalisation conditions, tuition only if the fee page states the current year; preparatory course language, English track, duration (resolving 40 weeks / 10 months), subjects, start month (resolving November / 1 October), certificate, progression wording, fee with year.
- **Ivano-Frankivsk National Medical University:** official name, website, address (2 Halytska St.), admissions-committee contact; status with the verbatim dated 2026-09-01 statement or the current order; Medicine (222 / I2, "Master of Medicine", 5 years 10 months, 360 ECTS), Dentistry (221 / I1, "Master of Dentistry"), Pharmacy (226 / I8): level, award, duration, languages, international admission for the current cycle, oral-exam subjects and scoring, document list, tuition from the current fee table once its columns and currency are read; application route via the Unified Interagency System; preparatory department subjects, duration, certificate.
- **Bogomolets National Medical University:** official name and current primary domain, address and international-office contacts (live contacts page); status evidenced by the running 2026 intake plus a dated format notice (none found yet); Medicine (6 years), Dentistry (5 years, full-time only), Pharmacy (5 years): level, duration, "Ukrainian or English", international admission 2026/27, the application window, oral-exam subjects, the document list and tuition (both reported to be on the admissions page); Medicine accreditation (languages, validity) via NAQA; preparatory department window, duration, subjects, language, fee.
- **Ternopil National Medical University:** official name as printed, website and international subsite, address and dean's-office contact (contacts page); status with a dated current-year statement (latest found covers 2024–25); General Medicine, Dentistry, Pharmacy and Nursing: level, duration as printed, English and Ukrainian tracks, international admission, documents (passport scan, certificate with transcript, personal-data consent), entry requirements from the rules page, deadlines only if printed with the year, tuition only if a 2026/27 table exists (the 2025/26 table would be recorded as outdated); preparatory department duration, start, subjects, certificate, progression wording, fee; hostel details if published.
- **Uzhhorod National University:** official name, website and foreign-applicant section, address (contacts page), International Students Department contact; status with a dated current-year statement; Medicine at Medical Faculty No. 2: English-medium, open regardless of citizenship, level and award as printed, duration, the 2026 two-stage admission windows (exact wording), remote-exam rule, document conditions, tuition from the official English-programme page; Dentistry only if a current admissions page confirms the English intake; preparatory department details once read.

## 5. Recommended route — three verified profiles first, then one at a time

**Recommended order (this plan; `UNIVERSITY_DATA_REGISTER.md` §9 keeps the earlier order until the owner approves the change):** 1 Vinnytsia → 2 Odesa → 3 Bukovinian, with Ivano-Frankivsk prepared as the substitute third profile; then Ivano-Frankivsk → Bogomolets → Ternopil → Uzhhorod. Rationale: Vinnytsia and Odesa are the only two with year-stamped 2026 admission and fee documents on the official domain, so §3 step 6 can be completed for Medicine, Dentistry and Pharmacy in one session each; Bukovinian has the largest demand but the weakest verifiability (no fee, address or format lead) and is the one most likely to stall; Ivano-Frankivsk has the best operating-status evidence but its intake-specific leads are from the closed 2025 cycle.

**Minimum viable profile** (what "verified" must mean before `publishable: true`): identity fields verified; status with a dated current-year statement; `programmes[]` trimmed to the programmes an official page states are open to international applicants (Medicine, Dentistry, Pharmacy where evidenced; Medicine alone as the floor), each with verified level, language, duration, international admission and intake, and tuition either verified with its year or explicitly not-published after the fee page was read; deadlines only when printed with the year; open questions closed; `lastReview` set; a session row in `SOURCE_VERIFICATION_REGISTER.md`; `npm test` green.

| Step | Who | What | Gate |
|---|---|---|---|
| 1 | Owner | Four decisions: (a) first published version of each profile lists only programmes with an official international-admission statement; Ukrainian-only programmes move to deferral notes until eligibility is read; (b) may a profile go live with tuition or deadlines as explicit "To be confirmed" when the official page does not state the current year; (c) the current academic year for the operating-status guard is 2026–27 (today is 2026-10-11; the registers say 2025–26 in places); (d) access route A, B or both | Decisions written down (reply e-mail or a dated line in the register) |
| 2 | Owner | Route A allow-list (§3) and/or Route B captures for Vinnytsia, Odesa, Bukovinian (§6 checklists; the identity, status, programme and fee pages come first) | Fetch test recorded / folders complete, missing pages reported |
| 3 | Owner or daughter (optional) | Locating e-mails to foredean@vnmu.edu.ua, the Odesa international department, admission@bsmu.edu.ua asking only for links: current fee schedule, admission rules and dates for foreigners, postal address, dated teaching-format notice, eligibility of nursing/public health/physical therapy | None (advisory; replies are never a source) |
| 4 | Verifier (Claude with access, or the daughter editing JSON) | Vinnytsia: §3 steps 1–4 from the opened pages; trim programmes per (a); close 12 open questions; set `lastReview`; `publishable: true` | `npm run test:records` 0 failures, then full `npm test`; dated statusStatement present |
| 5 | Verifier | Odesa: the same; stop at the format gate if no dated current-year notice exists and report | Same |
| 6 | Verifier | Bukovinian in parallel; if no dated format statement or address can be found, park it (verified claims keep their sources) and run Ivano-Frankivsk from its 12 captures so the third profile is not delayed | Same; directory now has three publishable records in the preview build |
| 7 | Daughter (review), Claude (preview) | `npm run build:preview` (or the CI artifact); check every figure, date, award title and quotation against the captures; every "To be confirmed" must match a page that is silent | Owner sign-off per profile; no deployment |
| 8 | Owner (separate approval), Claude (release) | Release publishing the three profiles, after acknowledging that the live noindex Ternopil URL will 404 (or choosing a 302 / 410 rule); publish workflow → Hostinger → `npm run verify:live` → sitemap gains three URLs | Written approval; `npm test` green; `verify:live` passes |
| 9 | Verifier | Continuation, one at a time: Ivano-Frankivsk → Bogomolets → Ternopil (re-verify the template record and replace its brief-sourced values) → Uzhhorod | Same gates; each release approved separately |
| 10 | Verifier + owner | Register lookups for every published record (EDEBO / Ministry portal, NAQA, WDOMS) | §2 criteria 1 and 4 evidenced |
| 11 | Owner | Install the Pages CMS GitHub App (Rung 1; `.pages.yml` prepared) so the daughter edits status / source / checked through a form; diary the per-intake re-check and the `outdated` flip | One practice edit by the daughter passes CI |
| 12 | Verifier | Gated and deferred candidates stay as §9 lists them (Kharkiv, Zaporizhzhia need dated statements; Lviv, Poltava, Dnipro later); no new record file until §2 is evidenced from opened pages | §2 before any new shell |

Nothing above needs a paid tool, SEMrush units, a purchase or an account.

## 6. Page checklists for Route B (official-domain references from each record; "to locate" items are pages no snippet surfaced)


### 6.1 Vinnytsia National Pirogov Memorial Medical University — 19 surfaced official pages + 3 to locate

1. https://foreign.vnmu.edu.ua/en/admission-conditions-5/ — Foreign faculty: admission conditions: Programmes in English, semesters, entrance exam subjects, additional costs *(Page dated 2022 — treat as potentially out of date)*
2. https://vnmu.edu.ua/admission-of-foreign-citizens — Admission of foreign citizens: Selection Commission procedure *(Labelled with 2023 materials — may be outdated)*
3. https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf — Foreigner-admission procedures 2026: Current admission procedures, intakes, contacts
4. https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2025.PDF — Foreigner-admission procedures 2025: Previous-year procedures for comparison
5. https://www.vnmu.edu.ua/downloads/other/List_doc_obtaining.pdf — Document list for admission: Required documents, translation and legalisation, remote route
6. https://www.vnmu.edu.ua/downloads/other/Tuition_fee_2026-2027.pdf — Tuition fee 2026–2027 (official PDF): Fee per programme/track with year and payment basis — read before any fee is recorded
7. https://www.vnmu.edu.ua/downloads/other/Tuition%20fee_2025-2026.pdf — Tuition fee 2025–2026 (official PDF): Previous-year fees and the orders that set them
8. https://foreign.vnmu.edu.ua/en/preparatory-faculty/ — Preparatory faculty: Structure, subjects, duration, certificate, progression wording
9. https://foreign.vnmu.edu.ua/?p=1556 — Preparatory department article: History, chairs, subjects, hostel
10. https://foreign.vnmu.edu.ua/en/faculties-2/ — Foreign faculty: faculties: Programmes available to foreign students
11. https://foreign.vnmu.edu.ua/en/about-university/ — Foreign faculty: about the university: Official name and overview
12. https://foreign.vnmu.edu.ua/en/admission-conditions-for-post-graduate-studies/ — Postgraduate admission conditions: PhD route (out of profile scope; context)
13. https://www.vnmu.edu.ua/вступ-2026 — Admissions 2026 (Ukrainian): Full programme list incl. nursing, public health, physical therapy
14. https://www.vnmu.edu.ua/накази-та-розпорядження — Orders and directives: Order No. 146 of 20.08.2025 on the 2025–26 educational process (teaching format)
15. https://www.vnmu.edu.ua/downloads/pdf/OPP_medsestr_2025.pdf — Nursing programme 2025 (OPP): Level, award title, validity
16. https://www.vnmu.edu.ua/downloads/other/OPP_I9_grom-zd_2025(proekt).pdf — Public Health master's programme 2025 (draft): Level, ECTS, duration, accreditation status
17. https://www.vnmu.edu.ua/downloads/pdf/OPP_%20I2%20Medicine%20(mag)_2025.pdf — Medicine programme 2025 (OPP): Award title, duration, ECTS
18. https://www.vnmu.edu.ua/медичний-факультет-2 — Medical Faculty No. 2: Physical therapy bachelor duration and qualification
19. https://new.vnmu.edu.ua/documents — Documents (new site): Current regulatory documents
20. To locate: the official contacts page (postal address) on www.vnmu.edu.ua or foreign.vnmu.edu.ua
21. To locate: the current order on the organisation of the educational process (No. 146 of 20.08.2025 or its 2026–27 successor) — the list page AND the order itself
22. To locate: the EDEBO or Ministry-portal entry for ВНМУ ім. М.І. Пирогова

### 6.2 Odesa National Medical University — 21 surfaced official pages + 3 to locate

1. https://onmedu.edu.ua/information-foreign-citizens/international-faculty/?lang=en — International faculty / department: Unit responsible for foreign students; history
2. https://onmedu.edu.ua/information-foreign-citizens/requirements-admission-commission/?lang=en — Admission commission requirements: Admissions office address and phone; requirements
3. https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf — Information on admission 2026 (PDF): Route via Unified System, committee working period, exams, remote route, recognition deadline
4. https://onmedu.edu.ua/information-foreign-citizens/fees/?lang=en — Fees for foreign citizens: Per-year fee table by programme and track, year label, pre-study course fee — read before any fee is recorded
5. https://onmedu.edu.ua/information-foreign-citizens/language-training-cours/?lang=en — Preparatory department / language training: Profile, duration, subjects, certificate, progression wording *(Undated page; fee figure likely out of date)*
6. https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/?lang=en — Educational programmes for foreign citizens: Programme list for international applicants
7. https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/master-s-degree/?lang=en — Master's degree programmes: Specialty codes and award titles (222, 221, 226)
8. https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/os-doktor-filosofii/?lang=en — PhD programmes: Out of profile scope; context
9. https://onmedu.edu.ua/information-foreign-citizens/post-graduation-cours/?lang=en — Postgraduate courses: Out of profile scope; context
10. https://onmedu.edu.ua/abituriientam/?lang=en — Applicants 2026: 2026 specialty codes (I1, I2, I5, I8, I9)
11. https://onmedu.edu.ua/abituriientam/perelik-specialnostej/?lang=en — List of specialties: Full programme list
12. https://onmedu.edu.ua/abituriientam/prijmalna-komisija/programa-vstupnih-ispitiv/ — Entrance examination programmes: Exam content incl. public health (I9)
13. https://onmedu.edu.ua/osvita/osvitni-programi/os-bakalavr/ — Bachelor programmes: Nursing bachelor programmes (I5)
14. https://onmedu.edu.ua/wp-content/uploads/2025/05/OPP-Gromadske-zdorovja_Magistr.pdf — Public Health master's programme 2025 (OPP): Level, ECTS, duration, accreditation status
15. https://onmedu.edu.ua/vibirkovi-komponenti-terapija-ta-reabilitacija/ — Therapy and Rehabilitation electives (bachelor): Confirms bachelor level for specialty 227
16. https://onmedu.edu.ua/gromadske-obgovorennja-proektu-opp-terapija-ta-reabilitaciya/ — Therapy and Rehabilitation master's draft (public consultation): Status of master's specialisations *(Old page (3+ years) — may be out of date)*
17. https://onmedu.edu.ua/wp-content/uploads/2024/12/Proiekt-OPP-Akusherska-sprava_Bakalavr_2025_Gromadske-obgovorennja.pdf — Midwifery bachelor programme 2025 (draft): Award title «Бакалавр медсестринства», ECTS, duration
18. https://onmedu.edu.ua/regarding-the-new-academic-year-at-odesa-national-medical-university/?lang=en — Notice on the 2024–25 academic year: Teaching format statement (2024–25 only) *(Out of date for 2025–26)*
19. https://onmedu.edu.ua/category/education-en/?lang=en — Education news (English): Look for the current-year teaching-format statement
20. https://onmedu.edu.ua/about-univercity/important-information-university/?lang=en — Important information about the university: Official name, status, contacts
21. https://onmedu.edu.ua/can-pay-tuition-fee-installments/?lang=en — Tuition instalments notice: Payment schedule wording *(Undated)*
22. To locate: a DATED current-year notice on teaching format, found via the education news category — the index AND the notice
23. To locate: the whole fee table including its header and academic-year label
24. To locate: the EDEBO or Ministry-portal entry

### 6.3 Bukovinian State Medical University — 18 surfaced official pages + 5 to locate

1. https://www.bsmu.edu.ua/en/ — Official English homepage: Official name, languages of instruction, specialties list
2. https://www.bsmu.edu.ua/en/faq — International FAQ: Contact address, English level, document language and legalisation rules
3. https://www.bsmu.edu.ua/en/admission/preparatory-course — Preparatory course page: Duration, subjects, English-track statement, certificate wording, fee with year
4. https://www.bsmu.edu.ua/en/admission/tuition-fees/ — Tuition fees — foreign students: Official fee page: read the academic year it states (snippet showed 2023–2024 content), amounts, currency, per-period and schedule *(Surfaced in the second sweep (topic: preparatory); figures NOT recorded)*
5. https://www.bsmu.edu.ua/en/medical-faculty-no3/ — Medical Faculty No. 3: Medicine programme for foreign students; award title
6. https://vstup.bsmu.edu.ua/ — Admissions sub-site: Current admission rules and deadlines for foreigners
7. https://vstup.bsmu.edu.ua/wp-content/uploads/2026/06/english_program_2026.pdf — English entrance-exam programme 2026: Exam format (CEFR B2 interview), specialties covered, remote option
8. https://vstup.bsmu.edu.ua/wp-content/uploads/2024/08/english_program_2024.pdf — English entrance-exam programme 2024: Earlier version: Medicine, Dentistry, Pharmacy at Master's level *(Superseded by the 2026 document; comparison only)*
9. https://www.bsmu.edu.ua/wp-content/uploads/2023/07/buklet-bdmu-2023.pdf — University booklet 2023: Dentistry specialty 221 for foreign students *(Dated 2023 — may be out of date)*
10. https://www.bsmu.edu.ua/wp-content/uploads/2019/11/the-guide-for-foreign-applicants-2019.pdf — Guide for foreign applicants 2019: Historic specialties list incl. Nursing *(Dated 2019 — out of date; context only)*
11. https://www.bsmu.edu.ua/wp-content/uploads/2025/05/op_fizichna-terapiya-na-sajt.doc — Physical therapy programme document 2025: Level, award title, professional qualification
12. https://www.bsmu.edu.ua/wp-content/uploads/2026/01/zvit-pro-diyalnist-bdmu-za-2025-rik-sajt.pdf — Annual report 2025: Licence re-issue (2025), accreditation of Medicine (master)
13. https://www.bsmu.edu.ua/wp-content/uploads/2025/11/informacziya-pro-pidsumki-roboti-bdmu-v-2024-2025-n.r.pdf — Results of 2024–25 academic year: Operating context
14. https://www.bsmu.edu.ua/wp-content/uploads/2025/08/1_kurs_mediczina-inozemczi-osin_2025-2026.pdf — Timetable: 1st-year medicine, foreigners, autumn 2025: Indirect evidence of teaching format (remote synchronous sessions)
15. https://www.bsmu.edu.ua/wp-content/uploads/2026/02/1_kurs_mediczina-inozemczi-vesna_2026.pdf — Timetable: 1st-year medicine, foreigners, spring 2026: Indirect evidence of teaching format
16. https://www.bsmu.edu.ua/wp-content/uploads/2025/08/1_kurs_stomatologiya-inozemczi-osin_2025-2026.pdf — Timetable: 1st-year dentistry, foreigners, autumn 2025: Dentistry taught to foreign students
17. https://www.bsmu.edu.ua/wp-content/uploads/2025/08/2_kurs_farmacziya-inozemczi-osin_2025-2026.pdf — Timetable: 2nd-year pharmacy, foreigners, autumn 2025: Pharmacy taught to foreign students
18. https://www.bsmu.edu.ua/wp-content/uploads/2023/01/transfer-to-bsmu-ukraine.docx — Transfer guide 2023: Older contact address inter@bsmu.edu.ua *(Dated 2023)*
19. To locate: the official contacts page (postal address)
20. To locate: the Medicine, Dentistry and Pharmacy programme pages linked from the faculty pages
21. To locate: the 2026/27 Rules of admission for foreign citizens on vstup.bsmu.edu.ua — the index AND the rules
22. To locate: a dated university-wide notice on the 2026–27 teaching format (news section)
23. To locate: the EDEBO or Ministry-portal entry (university id 21)

Cross-check only (not official sources): https://universities.studyinukraine.gov.ua/en/minedu/university/21/preparatory-department (Ministry portal: preparatory department); https://universities.studyinukraine.gov.ua/en/minedu/university/21/dual-degree-programs (Ministry portal: dual-degree programmes); https://vstup.osvita.ua/y2025/r25/85/ (Third-party admissions portal (2025 offers)); https://vstup.osvita.ua/y2026/r25/85/1611246/ (Third-party admissions portal (2026 dentistry offer))

### 6.4 Ivano-Frankivsk National Medical University — 22 surfaced official pages + 2 to locate

1. https://www.ifnmu.edu.ua/admissions-committee-2026/ — Admissions committee 2026: Current-cycle rules, dates and fee table for foreign citizens
2. https://www.ifnmu.edu.ua/admissions-committee-2026/rules-for-admission-to-higher-education-at-ivano-frankovsk-national-medical-university-in-2026/ — Admission rules 2026: Full 2026 rules
3. https://www.ifnmu.edu.ua/wp-content/uploads/2026/05/Положення-про-відбіркову-комісію-іноземців-ІФНМУ-у-2026-році.pdf — Regulation on the Selection Committee for Foreigners 2026: Route via the Unified Interagency Information System; invitation validity; decision timing
4. https://www.ifnmu.edu.ua/admission_committe_2025/masters-degree-for-foreign-citizens-2025/ — Master's degree for foreign citizens 2025: 2025 dates, exam subjects and scoring (previous cycle)
5. https://www.ifnmu.edu.ua/admission_committe_2025/the-cost-of-studying-at-the-infmu-and-the-infmu-professional-medical-college-in-2025/ — Cost of studying 2025: Fee table for foreign citizens with column headers, currency and payment basis — read before any fee is recorded
6. https://www.ifnmu.edu.ua/home/public-information/amount-of-fees-for-education-training-retraining-qualification-improvement-of-education-seekers/ — Public information: fees: Official fee schedule
7. https://www.ifnmu.edu.ua/en/admission — Admission (English, older section): Programmes open to foreign citizens *(Shows a 2022-dated note; possibly outdated)*
8. https://www.ifnmu.edu.ua/home/faculty-of-training-of-foreign-citizens/ — Faculty of Training of Foreign Citizens: Unit responsible for foreign students
9. https://www.ifnmu.edu.ua/en/staf-en/faculties/deanery-of-foreign-citizens-training-department — Foreign citizens' training department (deanery): Languages, stages of study *(Undated, likely several years old)*
10. https://www.ifnmu.edu.ua/en/for-students/preparatory-department — Preparatory department: Duration, subjects, certificate, group size *(Undated)*
11. https://www.ifnmu.edu.ua/educational-programs/ — Educational programmes: Current programme documents by specialty
12. https://www.ifnmu.edu.ua/wp-content/uploads/2025/06/7_Professional-Education-Program-І2-Medicine-2025-edition-2020-07.pdf — Medicine programme 2025 (PDF): Award title, ECTS, duration, approval date
13. https://www.ifnmu.edu.ua/wp-content/uploads/2024/08/Educational-professional-program-Stomatology-2023-edition-2020-04.pdf — Dentistry programme 2023 edition (PDF): Award title "Master of Dentistry" *(Likely superseded by the 2025 edition)*
14. https://www.ifnmu.edu.ua/wp-content/uploads/2026/04/09_EPP_-Master_Pharmacy_industrial_pharmacy_2020_09_25.pdf — Pharmacy programme (PDF): Level and award title
15. https://www.ifnmu.edu.ua/wp-content/uploads/2025/05/ОПП-Сестринська-справа-ред-2024_03.1.pdf — Nursing Care programme (PDF): Award title «Бакалавр медсестринства», duration
16. https://www.ifnmu.edu.ua/2026/04/29/prezentatsiia-novoi-osvitnoi-prohramy-hromadske-zdorovia-v-ifnmu/ — Public Health programme presentation (2026-04-29): Status of the new master's programme
17. https://www.ifnmu.edu.ua/admission-committee/admission-to-the-masters-program-in-specialty-227-therapy-and-rehabilitation/ — Master's in 227 Therapy and Rehabilitation: Duration and admission
18. https://www.ifnmu.edu.ua/faculty-of-health-sciences/ — Faculty of Health Sciences: Nursing, physical therapy, ergotherapy, public health programmes
19. https://www.ifnmu.edu.ua/wp-content/uploads/2025/11/Наказ-№-964-д-від-26.08.-2025-р.-Про-організацію-освітнього-процесу-в-осінньому-семестрі-2025-2026-н.р.-.pdf — Order No. 964-д of 26.08.2025: Teaching format for autumn semester 2025–26 (dated)
20. https://www.ifnmu.edu.ua/2026/09/01/navchannia-bez-kordoniv-inozemni-studenty-medyky-rozpochynaiut-novyy-navchalnyy-rik/ — News 2026-09-01: foreign students start the academic year: In-person practical classes for foreign students (dated)
21. https://www.ifnmu.edu.ua/admission-committee/contact-information-admissions-commission-ifnmu/ — Admissions committee contacts: Address, phone, email
22. https://www.ifnmu.edu.ua/wp-content/uploads/2024/09/IFNMU-brief-information.docx — IFNMU brief information (2024): Overview, international student numbers
23. To locate: the current fee table for foreign citizens if a 2026 version exists
24. To locate: the EDEBO or Ministry-portal entry

### 6.5 Bogomolets National Medical University — 9 surfaced official pages + 5 to locate

1. https://nmuofficial.com/en/?p=73670 — Admission of foreign citizens: Programme list with durations, languages, application window, document list, tuition, exam programmes
2. https://nmuofficial.com/en/(УКР)%20/zagalni-vidomosti/fakultety/fakultet-pidgotovky-inozemnyh-gromadyan/vstup-inozemnyh-gromadyan/ — Faculty for Training of Foreign Citizens: admission: Admission route and contacts *(URL as surfaced by search (contains a space); may need correction)*
3. https://nmuofficial.com/en/?p=114102 — About the centre / faculty: Unit responsible for foreign citizens *(Snippet content not returned)*
4. https://nmuofficial.com/en/?p=192606 — Medicine accreditation page (222): Languages, validity, training units
5. https://nmuofficial.com/en/?p=8085 — International Relations Department: Contacts
6. https://nmuofficial.com/en/?p=88424 — Official page (surfaced in search): Purpose to be established on opening
7. https://nmuofficial.com/en/wp-json/wp/v2/pages/8095 — International Relations Department (API snapshot): Address, phone, email *(Older snapshot, undated)*
8. https://nmuofficial.com/en/?p=15651 — Historic page (2014): Enrolment of foreign students since 1992 *(Out of date; context only)*
9. https://nmuofficial.com/en/ — Official English homepage: Official name and current domain
10. To locate: the official contacts page (live, not the API snapshot)
11. To locate: confirmation of the current primary domain (nmuofficial.com vs nmu.ua / nmu.edu.ua)
12. To locate: the official fee page or order for foreign citizens 2026/27
13. To locate: a dated 2025–26 or 2026–27 notice on teaching format
14. To locate: the dentistry (221) accreditation page

Cross-check only (not official sources): https://universities.studyinukraine.gov.ua/en/minedu/university/1/contacts (Ministry portal: contacts); https://vstup.osvita.ua/y2026/r27/149/ (Third-party admissions portal (2026 offers)); https://vstup.osvita.ua/r27/149/price.html (Third-party admissions portal (price list)); https://naqa.gov.ua/wp-content/uploads/2025/10/Відомості-про-самооцінювання-НМУ_Богомольця.pdf (NAQA self-assessment (2025))

### 6.6 Ternopil National Medical University — 7 surfaced official pages + 4 to locate

1. https://www.tdmu.edu.ua/int/admission/ — International admission page: Admission route, documents, deadlines for international applicants
2. https://www.tdmu.edu.ua/int/payment-info/ — International tuition / payment info: Fee schedule by programme and track; deadlines
3. https://www.tdmu.edu.ua/int/?p=5664 — Tuition table 2025/26 (page ?p=5664): Per-year USD fees by programme; nursing English-track line
4. https://www.tdmu.edu.ua/int/rules-of-admission/ — Rules of admission: Entry requirements and exams
5. https://www.tdmu.edu.ua/int/?p=1625 — Preparatory department (international site): Duration, subjects, certificate, progression wording
6. https://junior.tdmu.edu.ua/english — Preparatory department (junior site): Duration (10 months), start in October, state certificate wording
7. https://www.tdmu.edu.ua/en/ — English site home: Official name, status notices, teaching-format statements
8. To locate: the official contacts page and the history page (founding year)
9. To locate: a 2026/27 fee table (the surfaced table is 2025/26)
10. To locate: a dated current-year statement of teaching format
11. To locate: the official programme pages with exact award titles

Cross-check only (not official sources): https://universities.studyinukraine.gov.ua/en/minedu/university/68/preparatory-department (Ministry "Study in Ukraine" portal — university 68)

### 6.7 Uzhhorod National University — 15 surfaced official pages + 3 to locate

1. https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs — For foreign students: admission rules: 2026 two-stage admission windows, remote exams, Unified System registration
2. https://uzhnu.edu.ua/en/cat/abiturient-foreign/about — For foreign students: about: Selection Committee for Foreign Nationals; International Students Department contacts
3. https://uzhnu.edu.ua/en/cat/abiturient-foreign/courses_in_english — Courses in English and tuition fees: Official English-programme list and fees — read before any fee is recorded
4. https://www.uzhnu.edu.ua/en/cat/foreign-acc_activation — Foreign applicants: account activation: Application mechanics
5. https://uzhnu.edu.ua/en/news/Medical-Faculty-No-2-modern-education-for-future-professionals.htm — Medical Faculty No. 2 (news, 2024–25): English-medium Medicine for foreign students; levels
6. https://uzhnu.edu.ua/en/cat/faculty-medical/about — Faculty of Medicine: Programmes and languages
7. https://uzhnu.edu.ua/en/cat/faculty-fstomat/about — Faculty of Dentistry: Duration; places for foreign citizens *(Undated)*
8. https://uzhnu.edu.ua/en/cat/health-kaf_health — Department of Health Studies: Physical rehabilitation levels; faculty history *(Undated)*
9. https://uzhnu.edu.ua/en/cat/pdodp-preuniversity — Centre of Pre-University Preparation: Preparatory department details
10. https://www.uzhnu.edu.ua/en/infocentre/get/97982 — Dentistry syllabus 2024–25: Level, specialty 221, languages
11. https://www.uzhnu.edu.ua/uk/infocentre/get/25379 — Nursing programme (Ukrainian): Level, forms of study
12. https://www.uzhnu.edu.ua/uk/infocentre/get/17746 — Public Health master's programme (Ukrainian): Level, standard, aims
13. https://uzhnu.edu.ua/en/infocentre/get/43800 — Order on the exam session, semester 1 2025–26: Mixed-format evidence (dated)
14. https://www.uzhnu.edu.ua/en/news/List-of-specialities-specializations-educational-programmes.htm — List of specialities and programmes: Full programme list
15. https://www.uzhnu.edu.ua/en/news/Uzhhorod-National-University-Holds-Graduation-Cerem.htm — Graduation ceremony (June 2026): English-medium Medical Doctor programme graduates (dated)
16. To locate: the official contacts page (postal address)
17. To locate: the official programme page for 222 Medicine at Medical Faculty No. 2 (level, award, duration)
18. To locate: a dated 2026–27 statement on teaching format for foreign students

Cross-check only (not official sources): https://vstup.osvita.ua/y2025/r8/207/1557305/ (Third-party admissions portal (2025 pharmacy offer))

## 7. Risks

- The teaching-format gate may not be clearable from the official sites for Bukovinian, Odesa and Bogomolets; the owner should decide in advance whether a dated "educational process" order or a dated news item counts, and Ivano-Frankivsk stays ready as the substitute.
- Fee pages may not state the current academic year (Bukovinian showed 2023–24; Ternopil 2025/26; Odesa's header is unconfirmed); the honest result is a "To be confirmed" fee, which is why decision (b) comes first.
- Snippets are search-engine summaries, not page text; quotations for the status statement and the preparatory progression wording must be re-typed from the live page or capture.
- Pages that previously served older content (Uzhhorod rules page showed 2023 rules; Vinnytsia admission page dated 2022; Odesa preparatory page c. 2023–24) may be stale; record the page's own date and prefer the 2026 PDFs.
- Closing open questions as not-published must be done honestly (each closure names the page read); the preview review in step 7 is the control.
- Trimming Ukrainian-only programmes narrows the comparison table and the candidate-profile service until eligibility is read.
- Deployment behaviour change: the only university URL on production today (Ternopil, noindex) returns 404 after the first deploy from this branch unless a 302/410 is chosen; publishing three verified profiles in that same release avoids an empty production directory.
- Operating conditions change within a year; every published status statement needs a diaried re-check and an `outdated` flip, operable by the daughter (Pages CMS Rung 1).

## 8. Status 2026-10-11 (after the owner's decisions)

Decisions taken by the owner: start with Vinnytsia, Odesa, Bukovinian; publish only programmes with official evidence of international admission (others deferred); "To be confirmed" with an explanation where a current fee or deadline cannot be confirmed; baseline 2026–27 with each source's exact year and wording preserved; no SEMrush units, no new shells, nothing published; resolve the Ternopil URL before any release.

Done on the branch:
- `deferredProgrammes[]` added to the schema; every programme without an official-domain lead of international admission moved there in all seven records (rule R9 in `test:records`; published profiles are checked for leaked deferred names by `test:gate`). The three approved records now list Medicine, Dentistry and Pharmacy only.
- "To be confirmed" rows for tuition, application window, intake and preparatory fee now carry a plain-language explanation of the limitation.
- Ternopil URL: temporary 302 to `/universities/` in `.htaccess`, tested (`test:redirects`, `test:gate`); the rule must be removed when the record becomes publishable (test-enforced).
- Access test: `curl` and the fetch tool both fail with DNS errors for every official domain (`SOURCE_VERIFICATION_REGISTER.md`). **No claim has been verified.**
- Evidence registers prepared for the three records: `research/verification/<slug>/EVIDENCE_REGISTER.md` (one row per claim; pages to open; what to read; empty verified-value columns), generator `site/scripts/make-evidence-register.py`.

Waiting on the owner: Route A (allow-list the domains in §3) and/or Route B (captures per the registers). Until one of them happens, the three profiles remain draft shells in the preview build and no release is proposed.


## 9. Directory audit (Phase 3, 2026-10-11)

**Scope and labels.** VERIFIED-IN-REPO = read from this branch (`wip/directory`: source at commit `8482ec7`, built with `npm run build` and `npm run build:preview` in the worktree) or from the deployed release branch with `git show origin/production:<path>` (`origin/production` = `b2ca3d6`, "Build 4d4e605 (release-20261011-005330)", 45 files). MEASURED-LOCAL = reproduced in this environment with a script against a local build. **Live checks are impossible here:** at 2026-10-11 15:29 UTC `curl` to `https://ukrainemedicaladmissions.com/universities/` and to `www.vnmu.edu.ua`, `onmedu.edu.ua` and `www.bsmu.edu.ua` failed with `CONNECT tunnel failed, response 403` (the environment's network policy). `npm run verify:live` has never run. Nothing below describes what the live server actually returns. *(Re-checked 2026-10-11 on the production and preview builds of the integration commit `4136658`, which merged `wip/directory`: title, 153-character description, 0 listed cards, empty-state sentence, six filters, comparison table absent in production and present in preview, the Ternopil 302 rule and `BreadcrumbList`-only structured data are unchanged; the rows whose result changed at integration name `4136658`.)*

### 9.1 `/universities/` on this branch versus the production branch (VERIFIED-IN-REPO)

| Check | This branch (source + local build) | Production branch (`origin/production`) |
|---|---|---|
| Exists in source | `site/src/pages/universities/index.astro` | built files only (no source on that branch) |
| Exists in build | `dist/universities/index.html` | `universities/index.html` |
| In navigation | first item of `NAV` in `site/src/lib/site.ts` ("Universities"); header nav and footer "Explore" list on every page; `aria-current="page"` on the directory itself | header nav and footer links present |
| Home page | section "Medical universities in Ukraine" with the empty-state note and an "All universities" button to `/universities/` | links to `/universities/` plus two links to the Ternopil profile from the home directory section |
| Self-canonical | `<link rel="canonical" href="https://ukrainemedicaladmissions.com/universities/">` | same |
| Indexable | `<meta name="robots" content="index, follow, max-image-preview:large">` | same |
| In sitemap | yes; `dist/sitemap-0.xml` has 18 URLs, the **identical set** to production (compared with `diff`) | yes; 18 URLs |
| Title / description | title unchanged ("Medical universities in Ukraine: full list of medical colleges"); description changed on this branch to 153 characters | older description ("…programmes, language, city and verification status.") |
| Universities listed | **0** (all seven records have `publishable: false`; the publication gate in `site/src/lib/records.ts` keeps them out) | **1**: the unverified Ternopil record as a card ("Verification in progress", "English (pending)", city and four programme chips) on an indexable page |
| Empty state with zero published profiles | visible `data-empty` block: "No university profile has completed verification yet." plus what is checked before publication and the Apply Online Now invitation; required by `tests/publication-gate.mjs` (regex on the built page) and `tests/ui-smoke.mjs` (empty state visible, no profile link) | not applicable (one draft listed); `data-empty` holds only the "no match for these filters" message |
| Profiles gated | `getStaticPaths` in `universities/[slug].astro` filters with `isVisible`; no `dist/universities/<slug>/` directory exists; `publication-gate`: 7 unpublished, 0 published, 1 sample, 202 checks at `4136658` (178 when first measured on `wip/directory`), 0 failures (no page, link, slug, sitemap entry or JSON-LD for an unpublished record) | `universities/ternopil-national-medical-university/index.html` is served with `noindex, nofollow` and a self-canonical, not in the sitemap, linked from `/universities/` and the home page |
| Filters | six: city, programme family, qualification level, teaching language, preparatory route, intake (`data-filter` on each select); with zero records each select offers only its default option, and the preparatory filter also offers "No preparatory route recorded" | three: city, course, language |
| Comparison table | `CompareTable` (verified-only cells, alphabetical, "no ranking is implied") renders only when at least one record is listed: absent from the production build today, present in the preview build with the seven drafts | absent |
| Ternopil URL | `site/public/.htaccess`: `RedirectMatch 302 ^/universities/ternopil-national-medical-university/?$ /universities/`; `check-redirects` reports it "ok" (no loop or chain); `publication-gate` requires the rule while the record is unpublished and rejects it once publishable | no such rule; the noindex draft page is served (HOSTING_AND_DEPLOYMENT_ASSESSMENT.md §13) |
| Structured data | `BreadcrumbList` only | `BreadcrumbList` only |
| Directory filter visibility | **latent defect, fixed after 4136658** (MEASURED-LOCAL on the preview build at `4136658`): the filter script set the `hidden` attribute and updated the count, but the card CSS (`.ucard { display: flex }` in `UniversityCard.astro`) overrides the browser's `[hidden]` style, so filtered-out cards stayed visible (city = Chernivtsi: count 1, all 7 cards visible); `tests/preview-ui.mjs` passed because it checks `el.hidden`, not actual visibility. Latent because the production build lists 0 cards; fixed by the orchestrator in the follow-up commit after `4136658` | not measured |
| Scripts under the production CSP | **Fixed in 4136658** (integration): `vite: { build: { assetsInlineLimit: 0 } }` in `site/astro.config.mjs`, so every processed script is an external `/_astro/*.js` file; `test:meta` fails on any executable inline script or inline handler; live header delivery UNVERIFIED (backlog N20). Original finding on `wip/directory` (MEASURED-LOCAL): Astro inlines processed scripts smaller than Vite's `build.assetsInlineLimit` (4,096 bytes by default; `node_modules/astro/dist/core/build/plugins/plugin-scripts.js`), so the directory filter and the header menu are emitted as inline `<script type="module">` on every page. Served locally **with** the `.htaccess` CSP header (`script-src 'self'`), the preview directory's count stayed 7 after choosing a city, the mobile menu stayed `aria-expanded="false"` and the browser logged 2 CSP messages; **without** the header the count fell to 1 and the menu opened. A throw-away build with `vite: { build: { assetsInlineLimit: 0 } }` emitted external `/_astro/*.js` files and both worked under the CSP. The test suite did not send the CSP header, so it passed. The fix belonged in `site/astro.config.mjs` (reported to the orchestrator, applied at integration) | `index.html` and `universities/index.html` also carry inline module scripts, and the production `.htaccess` sets the same CSP, so the same failure is expected on the live site if the host sends the header (UNVERIFIED: live check blocked) |

**Reading.** On this branch the directory is indexable, self-canonical, in the sitemap and linked from navigation and the home page, but it lists nothing: the "list" intent (KEYWORD_URL_MAP §16–§17) cannot be satisfied until at least three profiles pass verification. Production still shows one unverified record on an indexable page; the branch fixes that, and a release from the branch would replace the card with the empty state and redirect the Ternopil URL (302). The inline-script defect is fixed on the branch (`4136658`); confirm on the live site after the next approved release that the filters and the mobile menu work with the production CSP (checklist B, backlog N20).

### 9.2 Discovery and verification status per record (VERIFIED-IN-REPO by script over `site/src/content/universities/*.json`; no new shell created)

| Record (slug) | Publishable | Claim objects | Verified | With a source URL | Programmes / deferred | Open questions | `lastReview` | Evidence register | Verification order (owner, 2026-10-11) |
|---|---|---|---|---|---|---|---|---|---|
| `vinnytsia-national-pirogov-memorial-medical-university` | no | 119 | 0 | 0 | 3 / 4 | 12 | not set | `research/verification/vinnytsia-…/EVIDENCE_REGISTER.md` | 1 |
| `odesa-national-medical-university` | no | 105 | 0 | 0 | 3 / 3 | 11 | not set | `research/verification/odesa-…/EVIDENCE_REGISTER.md` | 2 |
| `bukovinian-state-medical-university` | no | 91 | 0 | 0 | 3 / 2 | 12 | not set | `research/verification/bukovinian-…/EVIDENCE_REGISTER.md` | 3 (Ivano-Frankivsk as substitute) |
| `ivano-frankivsk-national-medical-university` | no | 119 | 0 | 0 | 3 / 4 | 12 | not set | none yet (§6.4 checklist) | 4 |
| `bogomolets-national-medical-university` | no | 91 | 0 | 0 | 3 / 2 | 13 | not set | none yet (§6.5) | 5 |
| `ternopil-national-medical-university` | no | 105 | 0 | 0 | 3 / 3 | 11 | not set | none yet (§6.6) | 6 |
| `uzhhorod-national-university` | no | 119 | 0 | 0 | 1 / 6 | 12 | not set | none yet (§6.7) | 7 |

Total 749 claim objects, 0 verified, 0 with a source URL: unchanged from §1 and `UNIVERSITY_DATA_REGISTER.md` §4. Discovery status for these seven and for the candidates without a record (Kharkiv and Zaporizhzhia gated on operating conditions; Lviv, Poltava, Dnipro later; the rest of the research inventory not swept) is in `UNIVERSITY_DATA_REGISTER.md` §5, §6 (discovery register) and §9. Every value in the records is a search-snippet LEAD or not-published. No record file was added in this phase, as §5 step 12 requires.

### 9.3 What is blocked and the exact owner action to unblock it

**Blocked:** every official page needed to verify a claim (the university domains in §3 and `EXECUTIVE_REPORT.md` §C, the Ministry portal, EDEBO, NAQA, WDOMS) and the production host. Today's attempt is recorded in the scope note at the top of §9; earlier attempts are in `SOURCE_VERIFICATION_REGISTER.md`.

**Owner action, either route (free; minutes for Route A):**
- **Route A (allow-list).** In the Claude Code session, open the cloud environment menu in the session's title bar, choose Edit, then Network access. Either choose a broader access level, or stay on the Limited level and add the hosts under Allowed domains, leaving "Allow package managers" ticked. Hosts: the `EXECUTIVE_REPORT.md` §C list plus the extra hosts in §3 of this plan (`www.` and sub-hosts such as `foreign.vnmu.edu.ua`, `vstup.bsmu.edu.ua`, `junior.tdmu.edu.ua`; `naqa.gov.ua`, `en.naqa.gov.ua`; `nmu.ua`, `nmu.edu.ua`; `ukrainemedicaladmissions.com` and `www.ukrainemedicaladmissions.com` for `npm run verify:live`). Steps: https://code.claude.com/docs/en/cloud-environments#network-access. Gate: a test fetch of each host succeeds and is logged in `SOURCE_VERIFICATION_REGISTER.md`.
- **Route B (captures).** The owner or daughter opens each page listed in `research/verification/<slug>/EVIDENCE_REGISTER.md` (Vinnytsia, Odesa, Bukovinian first) and saves it as a PDF with the browser's URL and date header, following "How to capture a page" in each register. Captures stay outside the repository while it is public (`research/verification/README.md`); the register records only the file name. A page that cannot be found is reported as "not found" so the field can be closed as not-published.

After either route: verify per §5 steps 4–7; `npm run test:records`, `npm test`; owner sign-off per profile; a separate release approval (§5 step 8). Until then the directory stays empty in production builds, by design.

## 10. Vinnytsia first: access attempt and exact evidence needed (2026-10-11, second session)

**Nothing is verified.** Every URL in this section is a **LEAD URL**, taken from the record's `researchReferences` or from its evidence register (`research/verification/<slug>/EVIDENCE_REGISTER.md`, section A row numbers shown as "A1", "A2" …). None has been opened from this environment; each must be opened (Route A) or captured (Route B) before any claim can be recorded. Nothing below is a fact about a university: where a lead is mentioned it is labelled LEAD. Evidence is recorded only as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out, in `site/data/evidence/<slug>.json`; today all seven evidence files hold `"entries": []` and an access block with status `blocked`. No claim is copied from one university to another.

### 10.1 Access attempt (MEASURED in this environment, 2026-10-11, 18:18 UTC)

Method: `curl -sS -o /dev/null --max-time 20 -w '%{http_code}' https://HOST/` through the environment's proxy, one request per host.

| Host | Why it was tried | Result |
|---|---|---|
| `www.vnmu.edu.ua`, `vnmu.edu.ua`, `foreign.vnmu.edu.ua`, `new.vnmu.edu.ua` | Vinnytsia: every host in the record's research references | refused — `CONNECT tunnel failed, response 403`; HTTP code 000 |
| `onmedu.edu.ua` | Odesa | refused — same |
| `www.bsmu.edu.ua`, `vstup.bsmu.edu.ua` | Bukovinian | refused — same |
| `www.ifnmu.edu.ua` | Ivano-Frankivsk | refused — same |
| `nmuofficial.com` | Bogomolets | refused — same |
| `www.tdmu.edu.ua`, `junior.tdmu.edu.ua` | Ternopil | refused — same |
| `www.uzhnu.edu.ua`, `uzhnu.edu.ua` | Uzhhorod | refused — same |
| `mon.gov.ua`, `studyinukraine.gov.ua`, `universities.studyinukraine.gov.ua` | Ministry of Education and Science; national invitation route and university directory (tier 3) | refused — same |
| `naqa.gov.ua` | Accreditation register (tier 3) | refused — same |
| `web.archive.org` | Archived copies (never evidence for a current claim) | refused — same |
| `wdoms.org`, `search.wdoms.org` | World Directory of Medical Schools (a listing is not recognition) | refused — same |
| `vstup.osvita.ua` | Third-party portal cited by three records (a lead, never a source) | refused — same |

Control: `https://api.github.com/` through the same proxy returned HTTP 200, so the proxy was working and the refusals are specific to these hosts. The proxy's status log records each one as "gateway answered 403 to CONNECT (policy denial or upstream failure)". A re-run by the reviewer at 19:17 UTC gave the same result for all 21 hosts, and 200 for the control. The result is recorded in each record's `access` block and in `SOURCE_VERIFICATION_REGISTER.md`. No page or PDF was opened; no claim was checked.

### 10.2 Vinnytsia National Pirogov Memorial Medical University — exact evidence needed

Record `site/src/content/universities/vinnytsia-national-pirogov-memorial-medical-university.json`; evidence file `site/data/evidence/vinnytsia-national-pirogov-memorial-medical-university.json`; register `research/verification/vinnytsia-national-pirogov-memorial-medical-university/EVIDENCE_REGISTER.md` (rows A1–A22). Tiers are those of `UNIVERSITY_EVIDENCE_STANDARD.md` §6–§7. The tiers for recognition (4 only), accreditation (1–3) and fees (1–2) are policy; the others are proposals awaiting the owner's confirmation (standard §13 item 16).

| # | Claim group (claim paths) | LEAD URLs to open (register row) | What must be read and recorded | Tier needed | Notes |
|---|---|---|---|---|---|
| 1 | Institution name (`officialName`) | A11 https://foreign.vnmu.edu.ua/en/about-university/ · A19 https://new.vnmu.edu.ua/documents · A22 to locate: the EDEBO or Ministry-portal entry | The full official name exactly as printed, in English and in Ukrainian, and the abbreviation the university uses | 1–3 | The record holds an English name as a LEAD only; compare it with the printed form and record what is printed |
| 2 | Official website, address and international admissions contact (`website`, `address`, `internationalOffice`) | https://www.vnmu.edu.ua/ (the record's website LEAD) · A11 · A3 https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf · A20 to locate: the official contacts page | Whether the main site names `foreign.vnmu.edu.ua` as its international portal; the postal address exactly as printed; the name of the unit for foreign applicants, its e-mail, telephone and page, as printed on a current page | website 1; address and contact 1 or 3 | No address lead exists; the contact in the record is a LEAD from the 2026 procedures PDF |
| 3 | Programmes open to international students (`programmes.medicine.internationalAdmission`, `programmes.dentistry.internationalAdmission`, `programmes.pharmacy.internationalAdmission`, each `.intakeYear`; deferred: `programmes.nursing`, `programmes.public-health`, `programmes.physical-therapy`, `programmes.physical-culture-sport` `.internationalAdmission`) | A3 (2026 procedures PDF) · A1 https://foreign.vnmu.edu.ua/en/admission-conditions-5/ · A10 https://foreign.vnmu.edu.ua/en/faculties-2/ · A2 https://vnmu.edu.ua/admission-of-foreign-citizens · A13 https://www.vnmu.edu.ua/вступ-2026 | For each programme, the sentence stating that foreign applicants are admitted, and the intake it refers to (2026/27 or as printed). For each deferred programme, whether any official page says foreign applicants are admitted, and in which language | 1–2 | A1 is LEAD-dated 2022 and A2 carries 2023 materials: at most `outdated` for a 2026/27 claim. Deferred programmes stay unpublished until read |
| 4 | Exact qualification titles, level, specialty code, duration (`programmes.<id>.qualification`, `.level`, `.specialtyCode`, `.durationText`, `.durationYears`) | A17 https://www.vnmu.edu.ua/downloads/pdf/OPP_%20I2%20Medicine%20(mag)_2025.pdf · A1 · A10 · A19 (look for the Dentistry and Pharmacy programme documents, not surfaced by any lead) · deferred: A15 https://www.vnmu.edu.ua/downloads/pdf/OPP_medsestr_2025.pdf, A16 https://www.vnmu.edu.ua/downloads/other/OPP_I9_grom-zd_2025(proekt).pdf, A18 https://www.vnmu.edu.ua/медичний-факультет-2 | The award title exactly as printed (never "MBBS" unless printed); the level as the university classifies it (master's or single-cycle master's); the specialty code(s) as printed, old and new numbering if both appear; the duration as printed; each programme document's approval date and validity | 1–2 (codes also 3) | No award title has any lead; the medicine level lead was deliberately not recorded as integrated |
| 5 | Teaching language per programme (`programmes.<id>.language`) | A1 · A3 · A10 · A6 https://www.vnmu.edu.ua/downloads/other/Tuition_fee_2026-2027.pdf (if it lists tracks by language) | The languages of instruction offered to foreign applicants, programme by programme — not inferred from a general sentence | 1–2 | The record's English and Ukrainian values are LEADs only |
| 6 | Tuition and mandatory fees (`programmes.<id>.tuition`, `programmes.<id>.otherMandatoryCosts.<index>`, `preparatoryRoutes.preparatory-department.fee`, `accommodation`) | A6 (2026–2027 fee PDF) · A7 https://www.vnmu.edu.ua/downloads/other/Tuition%20fee_2025-2026.pdf (comparison only) · A1 (additional costs; 2022) · A9 https://foreign.vnmu.edu.ua/?p=1556 (hostel) | For each programme and track: amount, currency, per year / per semester / one-off, the academic year printed, the payment schedule, any exchange-rate basis as printed, year-by-year variation, refundable or not; each other mandatory charge separately with its own label, amount, currency, basis and year; any order cited as setting the fees; hostel prices with their year | **1–2 only** | No fee figure is held in the record or the evidence file. Figures taken from search snippets sit in `research/universities/2026-10-11-snippet-sweep.json` and `UNIVERSITY_DATA_REGISTER.md`; they are LEADs only and are never copied into an entry. A 2025–26 figure is `outdated` for 2026/27; never sum tuition and other charges; never convert |
| 7 | Academic and language prerequisites; documents (`programmes.<id>.requirements.<id>`, `programmes.<id>.documents.<id>`) | A3 · A5 https://www.vnmu.edu.ua/downloads/other/List_doc_obtaining.pdf · A1 (2022 exam subjects) · A4 https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2025.PDF (comparison only) | Entrance examination subjects, format, minimum score and scale, and any language requirement (level and how it is tested), for the 2026/27 intake; each required document with its condition (translation, legalisation, notarisation, remote route), verbatim and in the printed order | 1–2; 3 only for a national rule, shown as such | The exam lead comes from the 2022 page; the document leads are snippet fragments of A5 |
| 8 | Application dates and deadlines (`programmes.<id>.deadlines`, `programmes.<id>.intake`, `preparatoryRoutes.preparatory-department.startDate`) | A3 · A13 | The application window for each intake with the year as printed; the start of studies; the preparatory faculty's start date(s) | 1–2 | No deadline lead exists; the only lead is that intakes may be twice a year (LEAD) |
| 9 | Invitation and enrolment procedure (no record field yet; `programmes.<id>.documents.<id>` where it concerns documents) | A3 · A2 · A5 · A22 (Ministry portal entry; tier 3 for the national route) | How a foreign applicant applies; who issues the invitation and through which system, exactly as stated; what happens on arrival (enrolment, originals, any examination the page names); the conditions of any remote route | university steps 1–2; national procedure 3 | Never described from an agent's page; where such claims will live in the record is an open owner question (`UNIVERSITY_EVIDENCE_STANDARD.md` §13) |
| 10 | Institutional accreditation versus recognition (`accreditation`, `recognition`) | To locate: the NAQA register entry (`naqa.gov.ua`) and the certificates, possibly among A19; A16 for the public-health programme's own accreditation wording | Accreditation in Ukraine of the institution or of each programme, with the certificate or register entry, its date and validity. Recognition: only a statement by the recognition authority of a named destination country (tier 4) | accreditation 1–3; recognition **4 only** | No lead exists for institutional accreditation or for recognition; the only accreditation lead is A16's wording on the public-health programme document (LEAD, unread). Accreditation is never presented as recognition; a directory listing is not recognition; professional registration is never implied |
| 11 | Dated statement on safety, location or teaching delivery (`status`, `statusStatement`, `teachingFormat`, `programmes.<id>.format`) | A14 https://www.vnmu.edu.ua/накази-та-розпорядження · A21 to locate: the 2026–27 order on the organisation of the educational process · A19 | The dated order or notice for 2026/27 on how and where teaching is organised (in person, blended or distance), and any statement on location or safety — quoted verbatim with its date and number | 1–3 | Leads: a 2024–25 format statement, and order No. 146 of 20.08.2025 on the 2025–26 educational process, whose wording is unread (record notes). For a 2026/27 claim either could at most be `outdated`. The site never describes conditions in its own words |
| 12 | Preparatory route (`preparatoryRoutes.preparatory-department.*`) | A8 https://foreign.vnmu.edu.ua/en/preparatory-faculty/ · A9 · A6 | Language of instruction (including for the science subjects), whether an English track exists, duration, subjects, certificate name, progression wording verbatim, whether English-track degree applicants use it, start dates, fee with year, eligibility wording | 1–2 | The subject list in the record is a LEAD |

**The owner's two unblock routes for Vinnytsia** (either is enough; both are free):

- **Route A — allow-list.** In the cloud environment settings, Network access, allow `www.vnmu.edu.ua`, `vnmu.edu.ua`, `foreign.vnmu.edu.ua`, `new.vnmu.edu.ua`, and for tier 3 `naqa.gov.ua`, `en.naqa.gov.ua`, `universities.studyinukraine.gov.ua`, `studyinukraine.gov.ua`, `mon.gov.ua`, `info.edbo.gov.ua` (steps as in §9.3). Gate: a fetch test of each host succeeds, the evidence file's access block becomes `open`, and a row is added to `SOURCE_VERIFICATION_REGISTER.md`. Then each claim follows `UNIVERSITY_EVIDENCE_STANDARD.md` §11.2.
- **Route B — owner captures.** The owner (or someone the owner names) captures register rows A1–A22 in an ordinary browser, with the URL and date visible, named `vinnytsia-national-pirogov-memorial-medical-university--NN--short-name.pdf`, and kept outside the repository. Suggested order: A3, A6, A5, A14 with A21, A11, A20, A1, A8, A17, A10, A13, A22, then the rest. A page that cannot be found, or does not state the fact, is reported as "NOT FOUND" or "SILENT". Then each claim follows `UNIVERSITY_EVIDENCE_STANDARD.md` §11.3.

### 10.3 Odesa National Medical University — exact evidence needed (shorter)

Register rows A1–A24 (`research/verification/odesa-national-medical-university/EVIDENCE_REGISTER.md`); the only host in the record's references is `onmedu.edu.ua` (refused today). All URLs are LEAD URLs.

| Claim group | LEAD URLs (register row) | What must be read | Notes |
|---|---|---|---|
| Name | A20 https://onmedu.edu.ua/about-univercity/important-information-university/?lang=en · A24 to locate: register entry | Official name in English and Ukrainian, as printed | — |
| Website, address, contact | A20 · A2 https://onmedu.edu.ua/information-foreign-citizens/requirements-admission-commission/?lang=en · A1 https://onmedu.edu.ua/information-foreign-citizens/international-faculty/?lang=en | Canonical domain; whether the university itself names any other domain as its own (open question in the record); postal address and admissions contact as printed on a current page | The address and telephone in the record are LEADs from an undated page |
| Programmes open to international students | A6 https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/?lang=en · A7 https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/master-s-degree/?lang=en · A3 https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf · A4 · deferred: A13, A14, A15, A16 | The admission sentence per programme and its intake; for each deferred programme, eligibility of foreign applicants and language | — |
| Titles, level, codes, duration | A7 · A10 https://onmedu.edu.ua/abituriientam/?lang=en · A11 | Award titles, level, codes (old and new numbering if printed), duration as printed | No duration text has a lead; a duration must not be inferred from a fee table |
| Teaching language | A4 · A6 · A7 | Languages per programme | — |
| Tuition and mandatory fees | A4 https://onmedu.edu.ua/information-foreign-citizens/fees/?lang=en · A23 to locate: the whole table with its header and academic-year label · A21 https://onmedu.edu.ua/can-pay-tuition-fee-installments/?lang=en · A5 | Amount, currency, basis, academic year, schedule, refundability, other charges separately, preparatory fee with year | The record notes two different preparatory-fee figures on two official pages (LEAD): if both hold when read for the same year, record both as `conflicting` and withhold |
| Prerequisites and documents | A3 · A12 https://onmedu.edu.ua/abituriientam/prijmalna-komisija/programa-vstupnih-ispitiv/ | Exam subjects and format, language requirement, document list and conditions, for 2026/27 | — |
| Dates and deadlines | A3 | Application window with year; start of studies | A committee working period (LEAD in A3) is recorded as a working period, never as a deadline |
| Invitation and enrolment | A3 · A2 · A24 (tier 3 for the national route) | Application route, invitation, remote route and document-recognition conditions, exactly as printed | — |
| Accreditation versus recognition | To locate: NAQA register entry · A14 (programme document) | Accreditation in Ukraine with certificate or register entry; recognition only at tier 4 | No lead for either |
| Dated statement on safety, location or teaching delivery | A19 https://onmedu.edu.ua/category/education-en/?lang=en · A22 to locate: a dated 2026–27 notice · A18 | The dated 2026/27 notice, verbatim with its date | A18 covers 2024–25 only: `outdated` for 2026/27 |
| Preparatory route | A5 https://onmedu.edu.ua/information-foreign-citizens/language-training-cours/?lang=en · A4 | Duration, subjects, language, certificate, progression wording verbatim, fee with year | A5 is undated (LEAD) |

Unblock: Route A — allow `onmedu.edu.ua` plus the tier 3 hosts listed in §10.2; Route B — captures of A1–A24 named `odesa-national-medical-university--NN--short-name.pdf`, kept outside the repository, starting with A3, A4/A23, A20, A2, A7, A19/A22, A5.

### 10.4 Bukovinian State Medical University — exact evidence needed (shorter)

Register rows A1–A23 (`research/verification/bukovinian-state-medical-university/EVIDENCE_REGISTER.md`); hosts `www.bsmu.edu.ua` and `vstup.bsmu.edu.ua` (both refused today). All URLs are LEAD URLs. The record also cites two Ministry-portal pages (tier 3 for the claim types the standard allows) and a third-party portal (a lead only).

| Claim group | LEAD URLs (register row) | What must be read | Notes |
|---|---|---|---|
| Name | A1 https://www.bsmu.edu.ua/en/ · A23 to locate: register entry | Official name in English and Ukrainian, as printed | — |
| Website, address, contact | A1 · A2 https://www.bsmu.edu.ua/en/faq · A19 to locate: the contacts page | Canonical domain and admissions sub-site; postal address; current international-admissions e-mail and telephone | No address lead exists; two different contact e-mails appear in LEADs (A2 undated, A18 dated 2023) — record what a current page prints |
| Programmes open to international students | A7 https://vstup.bsmu.edu.ua/wp-content/uploads/2026/06/english_program_2026.pdf · A6 https://vstup.bsmu.edu.ua/ · A21 to locate: the 2026/27 rules for foreign citizens · A5 https://www.bsmu.edu.ua/en/medical-faculty-no3/ · deferred: A10, A11 | The admission sentence per programme and its intake; eligibility and language for each deferred programme | A10 is dated 2019 (context only) |
| Titles, level, codes, duration | A20 to locate: the programme pages · A5 · A9 (2023 booklet) | Award titles, level, codes and duration as printed | No specialty-code lead is recorded for Medicine or Pharmacy |
| Teaching language | A1 · A7 · A20 | Languages per programme, not from a university-wide sentence | — |
| Tuition and mandatory fees | A4 https://www.bsmu.edu.ua/en/admission/tuition-fees/ | Amount, currency, basis, academic year printed, schedule, refundability, other charges separately | The LEAD showed content for a past year (2023–24): if that is what the page prints, the entry is `outdated` and the profile shows "To be confirmed" |
| Prerequisites and documents | A7 · A2 · A21 | Language interview requirement and level, document list with certification and legalisation conditions, for 2026/27 | — |
| Dates and deadlines | A6 · A21 | Application window with year; start of studies | No official deadline lead exists |
| Invitation and enrolment | A21 · A2 · A6 · A23 (tier 3 for the national route) | Application route, invitation and enrolment steps, remote options, exactly as printed | — |
| Accreditation versus recognition | A12 https://www.bsmu.edu.ua/wp-content/uploads/2026/01/zvit-pro-diyalnist-bdmu-za-2025-rik-sajt.pdf (LEAD: mentions the licence and an accreditation) · to locate: NAQA register entry | Accreditation in Ukraine from the certificate or the register (a report is a pointer, not enough on its own); recognition only at tier 4 | — |
| Dated statement on safety, location or teaching delivery | A22 to locate: a dated 2026–27 university-wide notice · A12 · A13 | The dated notice, verbatim with its date | Timetables A14–A17 are indirect only and are not a statement |
| Preparatory route | A3 https://www.bsmu.edu.ua/en/admission/preparatory-course · A4 · the Ministry-portal preparatory page (tier 3, which the standard's proposed tiers do not accept for preparatory-route claims: a pointer only) | Duration, start, subjects, language and English track, certificate, progression wording verbatim, fee with year | The duration and start-month LEADs disagree with each other; if the official pages disagree when read, record `conflicting` and withhold |

Unblock: Route A — allow `www.bsmu.edu.ua` and `vstup.bsmu.edu.ua` plus the tier 3 hosts listed in §10.2; Route B — captures of A1–A23 named `bukovinian-state-medical-university--NN--short-name.pdf`, kept outside the repository, starting with A21, A7, A4, A2, A19, A1, A22, A3.

### 10.5 What happens once a route is open

For each claim: an evidence entry in `site/data/evidence/<slug>.json` (quotation, tier, dates, status, decision); the record claim is changed only when the entry is `verified` with the decision `publish`; the register is regenerated with `python3 -I site/scripts/make-evidence-register.py <slug>`; `npm run test:records` and `npm test` pass; the session is logged in `SOURCE_VERIFICATION_REGISTER.md`. Publication still needs the owner's sign-off per profile and a separate release approval (§5 steps 7–8). Until then the three records stay draft shells in the preview build, and no university-specific fact appears in a production page.
