# Evidence register — Ivano-Frankivsk National Medical University (`ivano-frankivsk-national-medical-university`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/ivano-frankivsk-national-medical-university.json`, checked 2026-10-12): **blocked**. Re-tested on 2026-10-12 (08:47 UTC) from the build environment with curl through its proxy (one HTTPS request to the root address of each host). Hosts named in this record's references and website lead: www.ifnmu.edu.ua. Government and register hosts: mon.gov.ua, info.edbo.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, studyinukraine.gov.ua. Every host was refused at the environment's proxy under its network policy (curl: "CONNECT tunnel failed, response 403"; HTTP code 000); a control request to example.com was refused the same way, while api.github.com returned HTTP 200. No official page or PDF was opened and no claim was checked. Previous attempt: 2026-10-11 (same result). Route to access: the owner adds the hosts under the environment's Network access → Allowed domains, or supplies captures (research/verification/CAPTURE_REQUEST_2026-10-12.md). A refused request is an access limitation, never evidence about the university.

**Record under verification:** `site/src/content/universities/ivano-frankivsk-national-medical-university.json` — 3 programme(s) with an official-domain lead of international admission (Medicine, Dentistry (221 Stomatology), Pharmacy, industrial pharmacy); 4 deferred programme(s) kept unpublished until eligibility is read (Nursing Care («Сестринська справа»), specialty 223 Nursing, Public Health («Громадське здоров'я»), Physical Therapy, Occupational Therapy («Фізична терапія, ерготерапія») — bachelor, Therapy and Rehabilitation («Терапія та реабілітація») — master's; also a separate Occupational Therapy («Ерготерапія») master's).

**Evidence store:** `site/data/evidence/ivano-frankivsk-national-medical-university.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `ivano-frankivsk-national-medical-university--NN--short-name.pdf` where NN is the row number of this register (e.g. `ivano-frankivsk-national-medical-university--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/ivano-frankivsk-national-medical-university.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Current-cycle rules, dates and fee table for foreign citizens |  |  |
| 2 | [Admission rules 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/rules-for-admission-to-higher-education-at-ivano-frankovsk-national-medical-university-in-2026/) | Full 2026 rules |  |  |
| 3 | [Regulation on the Selection Committee for Foreigners 2026](https://www.ifnmu.edu.ua/wp-content/uploads/2026/05/Положення-про-відбіркову-комісію-іноземців-ІФНМУ-у-2026-році.pdf) | Route via the Unified Interagency Information System; invitation validity; decision timing |  |  |
| 4 | [Master's degree for foreign citizens 2025](https://www.ifnmu.edu.ua/admission_committe_2025/masters-degree-for-foreign-citizens-2025/) | 2025 dates, exam subjects and scoring (previous cycle) |  |  |
| 5 | [Cost of studying 2025](https://www.ifnmu.edu.ua/admission_committe_2025/the-cost-of-studying-at-the-infmu-and-the-infmu-professional-medical-college-in-2025/) | Fee table for foreign citizens with column headers, currency and payment basis — read before any fee is recorded |  |  |
| 6 | [Public information: fees](https://www.ifnmu.edu.ua/home/public-information/amount-of-fees-for-education-training-retraining-qualification-improvement-of-education-seekers/) | Official fee schedule |  |  |
| 7 | [Admission (English, older section)](https://www.ifnmu.edu.ua/en/admission) | Programmes open to foreign citizens *(Shows a 2022-dated note; possibly outdated)* |  |  |
| 8 | [Faculty of Training of Foreign Citizens](https://www.ifnmu.edu.ua/home/faculty-of-training-of-foreign-citizens/) | Unit responsible for foreign students |  |  |
| 9 | [Foreign citizens' training department (deanery)](https://www.ifnmu.edu.ua/en/staf-en/faculties/deanery-of-foreign-citizens-training-department) | Languages, stages of study *(Undated, likely several years old)* |  |  |
| 10 | [Preparatory department](https://www.ifnmu.edu.ua/en/for-students/preparatory-department) | Duration, subjects, certificate, group size *(Undated)* |  |  |
| 11 | [Educational programmes](https://www.ifnmu.edu.ua/educational-programs/) | Current programme documents by specialty |  |  |
| 12 | [Medicine programme 2025 (PDF)](https://www.ifnmu.edu.ua/wp-content/uploads/2025/06/7_Professional-Education-Program-І2-Medicine-2025-edition-2020-07.pdf) | Award title, ECTS, duration, approval date |  |  |
| 13 | [Dentistry programme 2023 edition (PDF)](https://www.ifnmu.edu.ua/wp-content/uploads/2024/08/Educational-professional-program-Stomatology-2023-edition-2020-04.pdf) | Award title "Master of Dentistry" *(Likely superseded by the 2025 edition)* |  |  |
| 14 | [Pharmacy programme (PDF)](https://www.ifnmu.edu.ua/wp-content/uploads/2026/04/09_EPP_-Master_Pharmacy_industrial_pharmacy_2020_09_25.pdf) | Level and award title |  |  |
| 15 | [Nursing Care programme (PDF)](https://www.ifnmu.edu.ua/wp-content/uploads/2025/05/ОПП-Сестринська-справа-ред-2024_03.1.pdf) | Award title «Бакалавр медсестринства», duration |  |  |
| 16 | [Public Health programme presentation (2026-04-29)](https://www.ifnmu.edu.ua/2026/04/29/prezentatsiia-novoi-osvitnoi-prohramy-hromadske-zdorovia-v-ifnmu/) | Status of the new master's programme |  |  |
| 17 | [Master's in 227 Therapy and Rehabilitation](https://www.ifnmu.edu.ua/admission-committee/admission-to-the-masters-program-in-specialty-227-therapy-and-rehabilitation/) | Duration and admission |  |  |
| 18 | [Faculty of Health Sciences](https://www.ifnmu.edu.ua/faculty-of-health-sciences/) | Nursing, physical therapy, ergotherapy, public health programmes |  |  |
| 19 | [Order No. 964-д of 26.08.2025](https://www.ifnmu.edu.ua/wp-content/uploads/2025/11/Наказ-№-964-д-від-26.08.-2025-р.-Про-організацію-освітнього-процесу-в-осінньому-семестрі-2025-2026-н.р.-.pdf) | Teaching format for autumn semester 2025–26 (dated) |  |  |
| 20 | [News 2026-09-01: foreign students start the academic year](https://www.ifnmu.edu.ua/2026/09/01/navchannia-bez-kordoniv-inozemni-studenty-medyky-rozpochynaiut-novyy-navchalnyy-rik/) | In-person practical classes for foreign students (dated) |  |  |
| 21 | [Admissions committee contacts](https://www.ifnmu.edu.ua/admission-committee/contact-information-admissions-commission-ifnmu/) | Address, phone, email |  |  |
| 22 | [IFNMU brief information (2024)](https://www.ifnmu.edu.ua/wp-content/uploads/2024/09/IFNMU-brief-information.docx) | Overview, international student numbers |  |  |
| 23 | To locate: The current fee table for foreign citizens if a 2026 version exists | — |  |  |
| 24 | To locate: The EDEBO (registry.edbo.gov.ua) or Ministry-portal (universities.studyinukraine.gov.ua) entry | — |  |  |

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Ivano-Frankivsk National Medical University | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://www.ifnmu.edu.ua/ | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | unverified | LEAD: 2 Halytska Street, Ivano-Frankivsk | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | unverified | LEAD: email: pk@ifnmu.edu.ua, phone: +380 (342) 75-03-25 | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## C. Programme `medicine` — Medicine (`programmes[].id = "medicine"`, field medicine)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.medicine.internationalAdmission` | unverified | LEAD: True | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.medicine.intakeYear` | unverified | LEAD: 2025/26 | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.medicine.level` | unverified | LEAD: integrated_master | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.medicine.specialtyCode` | unverified | LEAD: 222 (I2) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.medicine.qualification` | unverified | LEAD: Master of Medicine | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.medicine.durationText` | unverified | LEAD: 5 years 10 months | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.medicine.durationYears` | unverified | LEAD: 6 | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.medicine.language` | unverified | LEAD: English, Ukrainian | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.medicine.format` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.medicine.tuition` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.medicine.otherMandatoryCosts.*` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.medicine.deadlines` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.medicine.intake` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.medicine.requirements.oral-exam` | unverified | LEAD: Oral entrance examination in biology and English for the English-medium track; each answer scored on a 100–200 scale (2025 cycle, search summary — verify wording). | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Entrance requirement wording verbatim (exam; subject Biology; English; format oral examination); intake year | no evidence recorded |  |  |  |
| `programmes.medicine.documents.*` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## C. Programme `dentistry` — Dentistry (221 Stomatology) (`programmes[].id = "dentistry"`, field dentistry)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.dentistry.internationalAdmission` | unverified | LEAD: True | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.dentistry.intakeYear` | unverified | LEAD: 2025/26 | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.dentistry.level` | unverified | LEAD: integrated_master | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.dentistry.specialtyCode` | unverified | LEAD: 221 (I1) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.dentistry.qualification` | unverified | LEAD: Master of Dentistry | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.dentistry.durationText` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.dentistry.durationYears` | unverified | LEAD: 5 | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.dentistry.language` | unverified | LEAD: English, Ukrainian | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.dentistry.format` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.dentistry.tuition` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.dentistry.otherMandatoryCosts.*` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.dentistry.deadlines` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.dentistry.intake` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.dentistry.requirements.oral-exam` | unverified | LEAD: Oral entrance examination in biology and English (English-medium track, 2025 cycle — verify). | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Entrance requirement wording verbatim (exam; subject Biology; English; format oral examination); intake year | no evidence recorded |  |  |  |
| `programmes.dentistry.documents.*` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## C. Programme `pharmacy` — Pharmacy, industrial pharmacy (`programmes[].id = "pharmacy"`, field pharmacy)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.pharmacy.internationalAdmission` | unverified | LEAD: True | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.pharmacy.intakeYear` | unverified | LEAD: 2025/26 | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.pharmacy.level` | unverified | LEAD: master | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.pharmacy.specialtyCode` | unverified | LEAD: 226 (I8) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.pharmacy.qualification` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.pharmacy.durationText` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.pharmacy.durationYears` | unverified | LEAD: 5 | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.pharmacy.language` | unverified | LEAD: English, Ukrainian | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.pharmacy.format` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.pharmacy.tuition` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.pharmacy.otherMandatoryCosts.*` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.pharmacy.deadlines` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.pharmacy.intake` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.pharmacy.requirements.*` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim | no evidence recorded |  |  |  |
| `programmes.pharmacy.documents.*` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## D. Preparatory route `preparatory-department` — Preparatory Department («Підготовче відділення») of the Faculty of Foreign Citizens Training

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `preparatoryRoutes.preparatory-department.languageOfInstruction` | unverified | LEAD: Ukrainian | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Language(s) the preparatory subjects are taught in | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.englishTrack` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Whether an English-language preparatory track exists (quote) | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.durationText` | unverified | LEAD: 10 months | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Duration exactly as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.subjects` | unverified | LEAD: Ukrainian language, Biology, Chemistry, Mathematics, Physics, Computer science, Drawing, Geography | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Subject list as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.certificateName` | unverified | LEAD: Certificate | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Name of the certificate awarded, as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.progressionText` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | VERBATIM wording on what completion gives / does not give | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.appliesToEnglishDegreeTrack` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Whether English-track degree applicants use this route | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.startDate` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Start date or month as printed, with year | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.fee` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Fee with currency and academic year as printed; else To be confirmed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.eligibilityText` | not-published | — (no lead) | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Eligibility wording verbatim | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `nursing` — Nursing Care («Сестринська справа»), specialty 223 Nursing (nursing) | `programmes.nursing.internationalAdmission`; `programmes.nursing.language` | No snippet shows availability to international applicants (official foreigner lists name Dentistry, Medicine, Pharmacy). | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `public-health` — Public Health («Громадське здоров'я») (public_health) | `programmes.public-health.internationalAdmission`; `programmes.public-health.language` | Not found. | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `physical-therapy-bachelor` — Physical Therapy, Occupational Therapy («Фізична терапія, ерготерапія») — bachelor (physical_therapy) | `programmes.physical-therapy-bachelor.internationalAdmission`; `programmes.physical-therapy-bachelor.language` | No snippet shows availability to international applicants. | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `physical-therapy-master` — Therapy and Rehabilitation («Терапія та реабілітація») — master's; also a separate Occupational Therapy («Ерготерапія») master's (physical_therapy) | `programmes.physical-therapy-master.internationalAdmission`; `programmes.physical-therapy-master.language` | No snippet shows availability to international applicants. | [Admissions committee 2026](https://www.ifnmu.edu.ua/admissions-committee-2026/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Current (2026) application deadlines and fee table for foreign citizens (only 2025 found).  
   Closure (fill): 
2. Teaching format statement for the current semester (two dated leads exist — read them).  
   Closure (fill): 
3. Fee-table column headers (per year vs total), currency and payment basis — verify on the page before recording anything.  
   Closure (fill): 
4. Exact verbatim wording of the 2025 deadlines and exam scoring (search summary only).  
   Closure (fill): 
5. Dentistry programme title ("Dentistry" vs "221 Stomatology") and which edition is in force.  
   Closure (fill): 
6. Nursing, Public Health (new 2026) and Physical Therapy/Ergotherapy: eligibility of international applicants and language.  
   Closure (fill): 
7. Master's in Nursing: existence and award title (entrance-exam mention only).  
   Closure (fill): 
8. Public Health master's: licensed/enrolling status.  
   Closure (fill): 
9. Preparatory department: current fee, 2025–26 intake, English-medium option.  
   Closure (fill): 
10. Physical education / sport: no degree programme found.  
   Closure (fill): 
11. Accommodation availability and published prices.  
   Closure (fill): 
12. Evidence-backed recognition statements only.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/ivano-frankivsk-national-medical-university.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
