# Evidence register — Danylo Halytsky Lviv National Medical University (`danylo-halytsky-lviv-national-medical-university`)

**Status:** NOTHING VERIFIED. Every "Verified value / wording" cell below is empty because no official page could be opened from the build environment (DNS blocked for `.ua` domains, tested 2026-10-11 with curl and the fetch tool). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Record under verification:** `site/src/content/universities/danylo-halytsky-lviv-national-medical-university.json` — 3 programme(s) with an official-domain lead of international admission (Medicine, Dentistry, Pharmacy, Industrial Pharmacy); 2 deferred programme(s) kept unpublished until eligibility is read (Nursing (specialty 223), professional junior bachelor — LNMU Medical College, Physical Therapy).

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `danylo-halytsky-lviv-national-medical-university--NN--short-name.pdf` where NN is the row number of this register (e.g. `danylo-halytsky-lviv-national-medical-university--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date).

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Languages of instruction for foreign students, preparatory course, admission window *(Undated; cites 2020/2021 figures — treat as potentially out of date)* |  |  |
| 2 | [Admission information for foreign applicants (PDF)](https://new.meduniv.lviv.ua/uploads/repository/dep/dep_foreign_students/3.%20ADMISSION/INFORMATION%20FOR%20APPLICANTS/2.%20Admission%20Information.pdf) | "Invitation to Study" procedure, document list, Faculty of Foreign Students contacts *(2023 cycle — may be out of date)* |  |  |
| 3 | [Rules of Admission 2023 (PDF)](https://new.meduniv.lviv.ua/uploads/repository/dep/dep_foreign_students/3.%20ADMISSION/INFORMATION%20FOR%20APPLICANTS/4.%20Rules%20of%20Admission%202023.pdf) | Specialties open to foreigners, entrance tests, application windows, quota routes *(2023 rules — out of date; look for the 2026 rules)* |  |  |
| 4 | ["Dear Applicant" letter (PDF)](https://new.meduniv.lviv.ua/uploads/repository/dep/dep_foreign_students/3.%20ADMISSION/INFORMATION%20FOR%20APPLICANTS/%21Dear%20Applicant.pdf) | Applicant guidance (content not in snippets) |  |  |
| 5 | [Payment for study, hostel and additional services (PDF)](https://new.meduniv.lviv.ua/uploads/repository/dep/dep_foreign_students/3.%20ADMISSION/Payment%20for%20study%2C%20hostel%20and%20additional%20services.pdf) | Fee table structure, hostel and additional costs — read before any fee is recorded *(Labelled 2021/2022 — out of date; figures not recorded)* |  |  |
| 6 | [Information letter to foreign students (PDF)](https://new.meduniv.lviv.ua/uploads/repository/dep/dep_foreign_students/%21ANNOUNCEMENTS/%21Inf_letter.pdf) | Statement on operation and teaching format *(Undated, apparently 2022 — out of date)* |  |  |
| 7 | [Algorithm for Polish citizens (PDF)](https://new.meduniv.lviv.ua/uploads/repository/dep/dep_foreign_students/3.%20ADMISSION/ALGORITHMS%20FOR%20POLISH%20CITIZENS/Algorithm%20for%20Polish%20Citizens.pdf) | Admission route for Polish citizens (quota places) |  |  |
| 8 | [Homepage](https://new.meduniv.lviv.ua/) | Official name, contacts, current notices on teaching format *(Homepage did not appear in search results; the domain hosts every official document found)* |  |  |
| 9 | [English homepage](https://new.meduniv.lviv.ua/en/) | Official English name, international section |  |  |
| 10 | [English site: Medical College](https://new.meduniv.lviv.ua/en/?p=902) | Nursing (223) professional junior bachelor at the Medical College |  |  |
| 11 | [Regulation on the organisation of the educational process (PDF)](https://new.meduniv.lviv.ua/uploads/repository/dep/dep_medical_1/14._%D0%9F%D0%9E%D0%9B%D0%9E%D0%96%D0%95%D0%9D%D0%9D%D0%AF/01.%D0%9F%D0%BE%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F%20%D0%BF%D1%80%D0%BE%20%D0%BE%D1%80%D0%B3%D0%B0%D0%BD%D1%96%D0%B7%D0%B0%D1%86%D1%96%D1%8E%20%D0%BE%D1%81%D0%B2%D1%96%D1%82%D0%BD%D1%8C%D0%BE%D0%B3%D0%BE%20%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%83%20%D1%83%20%D0%9B%D0%9D%D0%9C%D0%A3.pdf) | How teaching is organised (Ukrainian); context for the teaching-format statement |  |  |

Cross-check only, never a source: [Ministry portal: preparatory department (university 131)](https://universities.studyinukraine.gov.ua/en/minedu/university/131/preparatory-department)

## B. Record-level claims

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Danylo Halytsky Lviv National Medical University | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation |  |  |  |
| `website` | unverified | LEAD: https://new.meduniv.lviv.ua/ | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | The canonical domain and the international-students section |  |  |  |
| `address` | unverified | LEAD: 69 Pekarska St., Lviv | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Postal address exactly as printed on the contacts page |  |  |  |
| `internationalOffice` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Name of the unit for foreign applicants, email, phone, page URL |  |  |  |
| `status` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so |  |  |  |
| `statusStatement` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | in-person / blended / distance exactly as the statement says; otherwise not-published |  |  |  |
| `founded` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Founding year only from the official history page |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate; a news item is not evidence |  |  |  |
| `recognition` | not-published | — (no lead) | search.wdoms.org (to locate) | At most a bare "listed in the World Directory of Medical Schools" with its own URL; never licensing implications |  |  |  |
| `accommodation` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Hostel availability and published prices with year, or not-published |  |  |  |

## C. Programme `medicine` — Medicine (`programmes[].id = "medicine"`, field medicine)

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|
| `internationalAdmission` | unverified | LEAD: True | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) |  |  |  |
| `intakeYear` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | The intake/academic year the page refers to, exactly as printed |  |  |  |
| `level` | unverified | LEAD: master | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Level as the university classifies it (master's / single-cycle master's / bachelor) |  |  |  |
| `specialtyCode` | unverified | LEAD: 222 | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Specialty code(s) exactly as printed (e.g. "222", "I2") |  |  |  |
| `qualification` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Exact award title as printed (never MBBS unless printed) |  |  |  |
| `durationText` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") |  |  |  |
| `durationYears` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Whole years only if the page states years |  |  |  |
| `language` | unverified | LEAD: English, Ukrainian | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Languages of instruction offered to foreign applicants for this programme |  |  |  |
| `format` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Teaching format only from the dated statement (row statusStatement) |  |  |  |
| `tuition` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation — ALL as printed; if the page shows another year or is silent → "To be confirmed" |  |  |  |
| `deadlines` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Application window dates with the year as printed; a committee working period is recorded as exactly that |  |  |  |
| `intake` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Start of studies as printed |  |  |  |
| `requirements[entrance-tests]` | unverified | LEAD: Foreigners entering the first year compete on the results of entrance tests: English language (first subject, coefficient 0.50) and Chemistry (second subject, coefficient 0.50). | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Entrance requirement wording verbatim (exam; subject English language; Chemistry; format —); intake year |  |  |  |
| `documents[passport-copy]` | unverified | LEAD: Copy of international passport | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Document name and any condition (translation, legalisation, format) verbatim |  |  |  |
| `documents[school-certificate]` | unverified | LEAD: Copy of the High School Certificate (Complete Secondary Education Certificate) with Transcripts | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Document name and any condition (translation, legalisation, format) verbatim |  |  |  |
| `documents[consent]` | unverified | LEAD: Consent to personal data collection and processing | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Document name and any condition (translation, legalisation, format) verbatim |  |  |  |

## C. Programme `dentistry` — Dentistry (`programmes[].id = "dentistry"`, field dentistry)

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|
| `internationalAdmission` | unverified | LEAD: True | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) |  |  |  |
| `intakeYear` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | The intake/academic year the page refers to, exactly as printed |  |  |  |
| `level` | unverified | LEAD: master | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Level as the university classifies it (master's / single-cycle master's / bachelor) |  |  |  |
| `specialtyCode` | unverified | LEAD: 221 | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Specialty code(s) exactly as printed (e.g. "222", "I2") |  |  |  |
| `qualification` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Exact award title as printed (never MBBS unless printed) |  |  |  |
| `durationText` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") |  |  |  |
| `durationYears` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Whole years only if the page states years |  |  |  |
| `language` | unverified | LEAD: English, Ukrainian | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Languages of instruction offered to foreign applicants for this programme |  |  |  |
| `format` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Teaching format only from the dated statement (row statusStatement) |  |  |  |
| `tuition` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation — ALL as printed; if the page shows another year or is silent → "To be confirmed" |  |  |  |
| `deadlines` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Application window dates with the year as printed; a committee working period is recorded as exactly that |  |  |  |
| `intake` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Start of studies as printed |  |  |  |
| `requirements[entrance-tests]` | unverified | LEAD: Foreigners entering the first year compete on the results of entrance tests: English language (first subject, coefficient 0.50) and Chemistry (second subject, coefficient 0.50). | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Entrance requirement wording verbatim (exam; subject English language; Chemistry; format —); intake year |  |  |  |
| `documents[passport-copy]` | unverified | LEAD: Copy of international passport | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Document name and any condition (translation, legalisation, format) verbatim |  |  |  |
| `documents[school-certificate]` | unverified | LEAD: Copy of the High School Certificate (Complete Secondary Education Certificate) with Transcripts | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Document name and any condition (translation, legalisation, format) verbatim |  |  |  |
| `documents[consent]` | unverified | LEAD: Consent to personal data collection and processing | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Document name and any condition (translation, legalisation, format) verbatim |  |  |  |

## C. Programme `pharmacy` — Pharmacy, Industrial Pharmacy (`programmes[].id = "pharmacy"`, field pharmacy)

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|
| `internationalAdmission` | unverified | LEAD: True | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) |  |  |  |
| `intakeYear` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | The intake/academic year the page refers to, exactly as printed |  |  |  |
| `level` | unverified | LEAD: master | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Level as the university classifies it (master's / single-cycle master's / bachelor) |  |  |  |
| `specialtyCode` | unverified | LEAD: 226 | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Specialty code(s) exactly as printed (e.g. "222", "I2") |  |  |  |
| `qualification` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Exact award title as printed (never MBBS unless printed) |  |  |  |
| `durationText` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") |  |  |  |
| `durationYears` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Whole years only if the page states years |  |  |  |
| `language` | unverified | LEAD: English, Ukrainian | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Languages of instruction offered to foreign applicants for this programme |  |  |  |
| `format` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Teaching format only from the dated statement (row statusStatement) |  |  |  |
| `tuition` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation — ALL as printed; if the page shows another year or is silent → "To be confirmed" |  |  |  |
| `deadlines` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Application window dates with the year as printed; a committee working period is recorded as exactly that |  |  |  |
| `intake` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Start of studies as printed |  |  |  |
| `requirements[entrance-tests]` | unverified | LEAD: Foreigners entering the first year compete on the results of entrance tests: English language (first subject, coefficient 0.50) and Chemistry (second subject, coefficient 0.50). | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Entrance requirement wording verbatim (exam; subject English language; Chemistry; format —); intake year |  |  |  |
| `documents[passport-copy]` | unverified | LEAD: Copy of international passport | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Document name and any condition (translation, legalisation, format) verbatim |  |  |  |
| `documents[school-certificate]` | unverified | LEAD: Copy of the High School Certificate (Complete Secondary Education Certificate) with Transcripts | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Document name and any condition (translation, legalisation, format) verbatim |  |  |  |
| `documents[consent]` | unverified | LEAD: Consent to personal data collection and processing | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Document name and any condition (translation, legalisation, format) verbatim |  |  |  |

## D. Preparatory route `preparatory-course` — Preparatory course for foreign citizens

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|
| `languageOfInstruction` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Language(s) the preparatory subjects are taught in |  |  |  |
| `englishTrack` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Whether an English-language preparatory track exists (quote) |  |  |  |
| `durationText` | unverified | LEAD: one year | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Duration exactly as printed |  |  |  |
| `subjects` | unverified | LEAD: Ukrainian language, Chemistry, Biology, Physics | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Subject list as printed |  |  |  |
| `certificateName` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Name of the certificate awarded, as printed |  |  |  |
| `progressionText` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | VERBATIM wording on what completion gives / does not give |  |  |  |
| `appliesToEnglishDegreeTrack` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Whether English-track degree applicants use this route |  |  |  |
| `startDate` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Start date or month as printed, with year |  |  |  |
| `fee` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Fee with currency and academic year as printed; else To be confirmed |  |  |  |
| `eligibilityText` | not-published | — (no lead) | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Eligibility wording verbatim |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

| Programme (`deferredProgrammes[].id`) | Field | Lead | Page(s) to open | What to read | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|
| `nursing-college` — Nursing (specialty 223), professional junior bachelor — LNMU Medical College (nursing) | internationalAdmission; language | Not listed among the specialties open to foreign candidates in the 2023 admission rules (221, 222, 226 only); no snippet shows availability to international applicants. | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred |  |  |  |
| `physical-therapy` — Physical Therapy (physical_therapy) | internationalAdmission; language | Not listed among the specialties open to foreign candidates in the 2023 admission rules; no snippet shows availability to international applicants. | [English site: foreign students (teaching languages, preparatory course)](https://new.meduniv.lviv.ua/en/?p=818) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Dated official statement for 2026–27 on operation and teaching format (only an undated letter, apparently 2022, and third-party news were found); no status is recorded until then.  
   Closure (fill): 
2. Admission rules for foreign applicants for the 2026 intake: specialties open to foreigners, entrance tests, quota routes (the latest rules found are for 2023).  
   Closure (fill): 
3. Official name as printed on the homepage, founding year and canonical website (the homepage did not appear in any result; new.meduniv.lviv.ua is taken from the URLs of official documents).  
   Closure (fill): 
4. Official postal address and current Faculty of Foreign Students contacts (the only e-mail lead, kept in the internationalOffice note, comes from a 2023-cycle document).  
   Closure (fill): 
5. Exact award titles, levels and durations for Medicine, Dentistry and Pharmacy (no duration or award title in any snippet).  
   Closure (fill): 
6. Official tuition fees for foreign applicants with the academic year and payment schedule (only a 2021/22 table — out of date; third-party news figures are in UAH, apparently for domestic applicants, and not recorded).  
   Closure (fill): 
7. Application windows and intake dates for the current cycle (2023–24 windows are out of date; an undated official page gives a different window — conflicting leads).  
   Closure (fill): 
8. Entrance tests for the current cycle: subjects, format, pass marks (2023 rules: English language and Chemistry).  
   Closure (fill): 
9. Required documents as currently published (the "Invitation to Study" list comes from a 2023-cycle PDF).  
   Closure (fill): 
10. Preparatory course: language of instruction for the science subjects, English track, certificate, progression wording verbatim, start date and fee with year (the Ministry-portal figures are undated).  
   Closure (fill): 
11. Nursing (junior bachelor at the Medical College) and Physical Therapy: level, language and whether international applicants are admitted.  
   Closure (fill): 
12. Whether any other programme (e.g. public health, or the further domestic specialties named in 2026 news) is open to foreign applicants.  
   Closure (fill): 
13. Accreditation of each programme from the NAQA register or the certificate.  
   Closure (fill): 
14. Accommodation availability and published prices with year.  
   Closure (fill): 
15. Evidence-backed recognition statements only.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
