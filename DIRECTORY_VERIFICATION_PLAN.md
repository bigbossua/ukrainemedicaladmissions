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

