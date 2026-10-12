# Evidence register — Bogomolets National Medical University (`bogomolets-national-medical-university`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/bogomolets-national-medical-university.json`, checked 2026-10-12): **blocked**. Re-tested on 2026-10-12 (08:47 UTC) from the build environment with curl through its proxy (one HTTPS request to the root address of each host). Hosts named in this record's references and website lead: naqa.gov.ua, nmuofficial.com, universities.studyinukraine.gov.ua, vstup.osvita.ua. Government and register hosts: mon.gov.ua, info.edbo.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, studyinukraine.gov.ua. Every host was refused at the environment's proxy under its network policy (curl: "CONNECT tunnel failed, response 403"; HTTP code 000); a control request to example.com was refused the same way, while api.github.com returned HTTP 200. No official page or PDF was opened and no claim was checked. Previous attempt: 2026-10-11 (same result). Route to access: the owner adds the hosts under the environment's Network access → Allowed domains, or supplies captures (research/verification/CAPTURE_REQUEST_2026-10-12.md). A refused request is an access limitation, never evidence about the university.

**Record under verification:** `site/src/content/universities/bogomolets-national-medical-university.json` — 3 programme(s) with an official-domain lead of international admission (Medicine, Dentistry, Pharmacy, industrial pharmacy); 2 deferred programme(s) kept unpublished until eligibility is read (Public Health («Громадське здоров'я»), Physical therapy, ergotherapy («Фізична терапія, ерготерапія»), specialty «Терапія та реабілітація»).

**Evidence store:** `site/data/evidence/bogomolets-national-medical-university.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `bogomolets-national-medical-university--NN--short-name.pdf` where NN is the row number of this register (e.g. `bogomolets-national-medical-university--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/bogomolets-national-medical-university.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Programme list with durations, languages, application window, document list, tuition, exam programmes |  |  |
| 2 | [Faculty for Training of Foreign Citizens: admission](https://nmuofficial.com/en/(УКР)%20/zagalni-vidomosti/fakultety/fakultet-pidgotovky-inozemnyh-gromadyan/vstup-inozemnyh-gromadyan/) | Admission route and contacts *(URL as surfaced by search (contains a space); may need correction)* |  |  |
| 3 | [About the centre / faculty](https://nmuofficial.com/en/?p=114102) | Unit responsible for foreign citizens *(Snippet content not returned)* |  |  |
| 4 | [Medicine accreditation page (222)](https://nmuofficial.com/en/?p=192606) | Languages, validity, training units |  |  |
| 5 | [International Relations Department](https://nmuofficial.com/en/?p=8085) | Contacts |  |  |
| 6 | [Official page (surfaced in search)](https://nmuofficial.com/en/?p=88424) | Purpose to be established on opening |  |  |
| 7 | [International Relations Department (API snapshot)](https://nmuofficial.com/en/wp-json/wp/v2/pages/8095) | Address, phone, email *(Older snapshot, undated)* |  |  |
| 8 | [Historic page (2014)](https://nmuofficial.com/en/?p=15651) | Enrolment of foreign students since 1992 *(Out of date; context only)* |  |  |
| 9 | [Official English homepage](https://nmuofficial.com/en/) | Official name and current domain |  |  |
| 10 | To locate: The official contacts page (live, not the API snapshot) | — |  |  |
| 11 | To locate: Confirmation of the current primary domain (nmuofficial.com vs nmu.ua / nmu.edu.ua), from the government register entry | — |  |  |
| 12 | To locate: The official fee page or order for foreign citizens 2026/27 | — |  |  |
| 13 | To locate: A dated 2025–26 or 2026–27 notice on teaching format | — |  |  |
| 14 | To locate: The dentistry (221) accreditation page | — |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [Ministry portal: contacts](https://universities.studyinukraine.gov.ua/en/minedu/university/1/contacts); [NAQA self-assessment (2025)](https://naqa.gov.ua/wp-content/uploads/2025/10/Відомості-про-самооцінювання-НМУ_Богомольця.pdf)

Third-party pages (leads only, never a source): [Third-party admissions portal (2026 offers)](https://vstup.osvita.ua/y2026/r27/149/); [Third-party admissions portal (price list)](https://vstup.osvita.ua/r27/149/price.html)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Bogomolets National Medical University | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://nmuofficial.com/en/ | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | unverified | LEAD: 13 Taras Shevchenka Boulevard, Kyiv, 01601 | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | unverified | LEAD: email: intdep@nmu.ua, phone: +38 (044) 235-21-31 | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## C. Programme `medicine` — Medicine (`programmes[].id = "medicine"`, field medicine)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.medicine.internationalAdmission` | unverified | LEAD: True | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.medicine.intakeYear` | unverified | LEAD: 2026/27 | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.medicine.level` | unverified | LEAD: integrated_master | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.medicine.specialtyCode` | unverified | LEAD: 222 (I2) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.medicine.qualification` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.medicine.durationText` | unverified | LEAD: 6 years | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.medicine.durationYears` | unverified | LEAD: 6 | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.medicine.language` | unverified | LEAD: English, Ukrainian | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.medicine.format` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.medicine.tuition` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.medicine.otherMandatoryCosts.*` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.medicine.deadlines` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.medicine.intake` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.medicine.requirements.oral-exams` | unverified | LEAD: Oral entrance examination programmes are published in Mathematics, Biology, Physics, Chemistry and English Language. | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Entrance requirement wording verbatim (exam; subject Mathematics; Biology; Physics; Chemistry; English; format oral examination); intake year | no evidence recorded |  |  |  |
| `programmes.medicine.documents.*` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## C. Programme `dentistry` — Dentistry (`programmes[].id = "dentistry"`, field dentistry)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.dentistry.internationalAdmission` | unverified | LEAD: True | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.dentistry.intakeYear` | unverified | LEAD: 2026/27 | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.dentistry.level` | unverified | LEAD: integrated_master | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.dentistry.specialtyCode` | unverified | LEAD: I1 | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.dentistry.qualification` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.dentistry.durationText` | unverified | LEAD: 5 years | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.dentistry.durationYears` | unverified | LEAD: 5 | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.dentistry.language` | unverified | LEAD: English, Ukrainian | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.dentistry.format` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.dentistry.tuition` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.dentistry.otherMandatoryCosts.*` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.dentistry.deadlines` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.dentistry.intake` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.dentistry.requirements.oral-exams` | unverified | LEAD: Oral entrance examinations (programmes published for Mathematics, Biology, Physics, Chemistry, English). | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Entrance requirement wording verbatim (exam; subject —; format oral examination); intake year | no evidence recorded |  |  |  |
| `programmes.dentistry.documents.*` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## C. Programme `pharmacy` — Pharmacy, industrial pharmacy (`programmes[].id = "pharmacy"`, field pharmacy)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.pharmacy.internationalAdmission` | unverified | LEAD: True | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.pharmacy.intakeYear` | unverified | LEAD: 2026/27 | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.pharmacy.level` | unverified | LEAD: master | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.pharmacy.specialtyCode` | unverified | LEAD: I8 | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.pharmacy.qualification` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.pharmacy.durationText` | unverified | LEAD: 5 years | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.pharmacy.durationYears` | unverified | LEAD: 5 | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.pharmacy.language` | unverified | LEAD: English, Ukrainian | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.pharmacy.format` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.pharmacy.tuition` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.pharmacy.otherMandatoryCosts.*` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.pharmacy.deadlines` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.pharmacy.intake` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.pharmacy.requirements.oral-exams` | unverified | LEAD: Oral entrance examinations (programmes published for Mathematics, Biology, Physics, Chemistry, English). | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Entrance requirement wording verbatim (exam; subject —; format oral examination); intake year | no evidence recorded |  |  |  |
| `programmes.pharmacy.documents.*` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## D. Preparatory route `preparatory-department` — Preparatory department (for foreign citizens)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `preparatoryRoutes.preparatory-department.languageOfInstruction` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Language(s) the preparatory subjects are taught in | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.englishTrack` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Whether an English-language preparatory track exists (quote) | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.durationText` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Duration exactly as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.subjects` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Subject list as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.certificateName` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Name of the certificate awarded, as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.progressionText` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | VERBATIM wording on what completion gives / does not give | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.appliesToEnglishDegreeTrack` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Whether English-track degree applicants use this route | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.startDate` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Start date or month as printed, with year | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.fee` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Fee with currency and academic year as printed; else To be confirmed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.eligibilityText` | not-published | — (no lead) | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Eligibility wording verbatim | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `public-health` — Public Health («Громадське здоров'я») (public_health) | `programmes.public-health.internationalAdmission`; `programmes.public-health.language` | Not confirmed as open to international students. | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `physical-therapy` — Physical therapy, ergotherapy («Фізична терапія, ерготерапія»), specialty «Терапія та реабілітація» (physical_therapy) | `programmes.physical-therapy.internationalAdmission`; `programmes.physical-therapy.language` | Not confirmed as open to international students. | [Admission of foreign citizens](https://nmuofficial.com/en/?p=73670) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Dated official statement of teaching format and location for 2025–26 / 2026–27.  
   Closure (fill): 
2. Current primary domain (nmuofficial.com vs nmu.ua / nmu.edu.ua) and the official postal address.  
   Closure (fill): 
3. Exact award titles for Medicine, Dentistry and Pharmacy.  
   Closure (fill): 
4. Nursing: no official snippet names a nursing award for international students — confirm whether one exists before adding it.  
   Closure (fill): 
5. Public health and physical therapy: level, language, eligibility of international applicants (third-party listings only).  
   Closure (fill): 
6. Physical education / sport: no degree programme found.  
   Closure (fill): 
7. Official tuition fees for foreign citizens: amount, currency, academic year, schedule.  
   Closure (fill): 
8. Document list and entrance-exam content on the admissions page (not in snippets).  
   Closure (fill): 
9. Application window for 2026 (exact dates) and preparatory department dates for 2026.  
   Closure (fill): 
10. Preparatory department: duration, subjects, language, fee, progression wording.  
   Closure (fill): 
11. Named admissions contact for the Faculty for Training of Foreign Citizens.  
   Closure (fill): 
12. Accommodation availability and published prices.  
   Closure (fill): 
13. Evidence-backed recognition statements only.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/bogomolets-national-medical-university.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
