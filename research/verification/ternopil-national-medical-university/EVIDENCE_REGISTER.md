# Evidence register — Ternopil National Medical University (`ternopil-national-medical-university`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/ternopil-national-medical-university.json`, checked 2026-10-12): **blocked**. Re-tested on 2026-10-12 (08:47 UTC) from the build environment with curl through its proxy (one HTTPS request to the root address of each host). Hosts named in this record's references and website lead: junior.tdmu.edu.ua, universities.studyinukraine.gov.ua, www.tdmu.edu.ua. Government and register hosts: mon.gov.ua, info.edbo.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, studyinukraine.gov.ua. Every host was refused at the environment's proxy under its network policy (curl: "CONNECT tunnel failed, response 403"; HTTP code 000); a control request to example.com was refused the same way, while api.github.com returned HTTP 200. No official page or PDF was opened and no claim was checked. Previous attempt: 2026-10-11 (same result). Route to access: the owner adds the hosts under the environment's Network access → Allowed domains, or supplies captures (research/verification/CAPTURE_REQUEST_2026-10-12.md). A refused request is an access limitation, never evidence about the university.

**Record under verification:** `site/src/content/universities/ternopil-national-medical-university.json` — 3 programme(s) with an official-domain lead of international admission (General Medicine, Dentistry, Pharmacy); 3 deferred programme(s) kept unpublished until eligibility is read (Nursing, Public Health, Physical therapy, occupational therapy (specialty 227)).

**Evidence store:** `site/data/evidence/ternopil-national-medical-university.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `ternopil-national-medical-university--NN--short-name.pdf` where NN is the row number of this register (e.g. `ternopil-national-medical-university--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/ternopil-national-medical-university.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Admission route, documents, deadlines for international applicants |  |  |
| 2 | [International tuition / payment info](https://www.tdmu.edu.ua/int/payment-info/) | Fee schedule by programme and track; deadlines |  |  |
| 3 | [Tuition table 2025/26 (page ?p=5664)](https://www.tdmu.edu.ua/int/?p=5664) | Per-year USD fees by programme; nursing English-track line |  |  |
| 4 | [Rules of admission](https://www.tdmu.edu.ua/int/rules-of-admission/) | Entry requirements and exams |  |  |
| 5 | [Preparatory department (international site)](https://www.tdmu.edu.ua/int/?p=1625) | Duration, subjects, certificate, progression wording |  |  |
| 6 | [Preparatory department (junior site)](https://junior.tdmu.edu.ua/english) | Duration (10 months), start in October, state certificate wording |  |  |
| 7 | [English site home](https://www.tdmu.edu.ua/en/) | Official name, status notices, teaching-format statements |  |  |
| 8 | To locate: The official contacts page and the history page (founding year) | — |  |  |
| 9 | To locate: A 2026/27 fee table (the surfaced table is 2025/26) | — |  |  |
| 10 | To locate: A dated current-year statement of teaching format | — |  |  |
| 11 | To locate: The official programme pages with exact award titles | — |  |  |
| 12 | To locate: The EDEBO (registry.edbo.gov.ua) or Ministry-portal (universities.studyinukraine.gov.ua) entry listing the official website | — |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [Ministry "Study in Ukraine" portal — university 68](https://universities.studyinukraine.gov.ua/en/minedu/university/68/preparatory-department)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: I. Horbachevsky Ternopil National Medical University of the Ministry of Health of Ukraine | [International admission page](https://www.tdmu.edu.ua/int/admission/) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://www.tdmu.edu.ua/ | [International admission page](https://www.tdmu.edu.ua/int/admission/) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | unverified | LEAD: 1 Maidan Voli, Ternopil, 46001, Ukraine | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [International admission page](https://www.tdmu.edu.ua/int/admission/) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | unverified | LEAD: 1957 | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## C. Programme `medicine` — General Medicine (`programmes[].id = "medicine"`, field medicine)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.medicine.internationalAdmission` | unverified | LEAD: True | [International admission page](https://www.tdmu.edu.ua/int/admission/) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.medicine.intakeYear` | unverified | LEAD: 2025/26 | [International admission page](https://www.tdmu.edu.ua/int/admission/) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.medicine.level` | unverified | LEAD: integrated_master | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.medicine.specialtyCode` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.medicine.qualification` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.medicine.durationText` | unverified | LEAD: 5 years 10 months | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.medicine.durationYears` | unverified | LEAD: 6 | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.medicine.language` | unverified | LEAD: English, Ukrainian | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.medicine.format` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.medicine.tuition` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.medicine.otherMandatoryCosts.*` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.medicine.deadlines` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.medicine.intake` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.medicine.requirements.*` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim | no evidence recorded |  |  |  |
| `programmes.medicine.documents.passport` | unverified | LEAD: Passport (scan) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Document name and any condition (translation, legalisation, format) verbatim | no evidence recorded |  |  |  |
| `programmes.medicine.documents.certificate` | unverified | LEAD: Secondary school certificate with transcript | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Document name and any condition (translation, legalisation, format) verbatim | no evidence recorded |  |  |  |
| `programmes.medicine.documents.consent` | unverified | LEAD: Personal-data consent | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Document name and any condition (translation, legalisation, format) verbatim | no evidence recorded |  |  |  |

## C. Programme `dentistry` — Dentistry (`programmes[].id = "dentistry"`, field dentistry)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.dentistry.internationalAdmission` | unverified | LEAD: True | [International admission page](https://www.tdmu.edu.ua/int/admission/) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.dentistry.intakeYear` | unverified | LEAD: 2025/26 | [International admission page](https://www.tdmu.edu.ua/int/admission/) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.dentistry.level` | unverified | LEAD: master | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.dentistry.specialtyCode` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.dentistry.qualification` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.dentistry.durationText` | unverified | LEAD: 5 years | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.dentistry.durationYears` | unverified | LEAD: 5 | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.dentistry.language` | unverified | LEAD: English, Ukrainian | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.dentistry.format` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.dentistry.tuition` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.dentistry.otherMandatoryCosts.*` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.dentistry.deadlines` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.dentistry.intake` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.dentistry.requirements.*` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim | no evidence recorded |  |  |  |
| `programmes.dentistry.documents.passport` | unverified | LEAD: Passport (scan) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Document name and any condition (translation, legalisation, format) verbatim | no evidence recorded |  |  |  |
| `programmes.dentistry.documents.certificate` | unverified | LEAD: Secondary school certificate with transcript | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Document name and any condition (translation, legalisation, format) verbatim | no evidence recorded |  |  |  |
| `programmes.dentistry.documents.consent` | unverified | LEAD: Personal-data consent | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Document name and any condition (translation, legalisation, format) verbatim | no evidence recorded |  |  |  |

## C. Programme `pharmacy` — Pharmacy (`programmes[].id = "pharmacy"`, field pharmacy)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.pharmacy.internationalAdmission` | unverified | LEAD: True | [International admission page](https://www.tdmu.edu.ua/int/admission/) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.pharmacy.intakeYear` | unverified | LEAD: 2025/26 | [International admission page](https://www.tdmu.edu.ua/int/admission/) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.pharmacy.level` | unverified | LEAD: master | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.pharmacy.specialtyCode` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.pharmacy.qualification` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.pharmacy.durationText` | unverified | LEAD: 5 years (Ukrainian track: 4 years 10 months) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.pharmacy.durationYears` | unverified | LEAD: 5 | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.pharmacy.language` | unverified | LEAD: English, Ukrainian | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.pharmacy.format` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.pharmacy.tuition` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.pharmacy.otherMandatoryCosts.*` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.pharmacy.deadlines` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.pharmacy.intake` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.pharmacy.requirements.*` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim | no evidence recorded |  |  |  |
| `programmes.pharmacy.documents.passport` | unverified | LEAD: Passport (scan) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Document name and any condition (translation, legalisation, format) verbatim | no evidence recorded |  |  |  |
| `programmes.pharmacy.documents.certificate` | unverified | LEAD: Secondary school certificate with transcript | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Document name and any condition (translation, legalisation, format) verbatim | no evidence recorded |  |  |  |
| `programmes.pharmacy.documents.consent` | unverified | LEAD: Personal-data consent | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Document name and any condition (translation, legalisation, format) verbatim | no evidence recorded |  |  |  |

## D. Preparatory route `preparatory-department` — Preparatory Department for foreigners and stateless persons

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `preparatoryRoutes.preparatory-department.languageOfInstruction` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Language(s) the preparatory subjects are taught in | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.englishTrack` | unverified | LEAD: False | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Whether an English-language preparatory track exists (quote) | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.durationText` | unverified | LEAD: 1 academic year (10 months) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Duration exactly as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.subjects` | unverified | LEAD: Ukrainian language, Biology, Chemistry, Physics, Mathematics, Computer science | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Subject list as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.certificateName` | unverified | LEAD: State certificate | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Name of the certificate awarded, as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.progressionText` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | VERBATIM wording on what completion gives / does not give | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.appliesToEnglishDegreeTrack` | unverified | LEAD: False | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Whether English-track degree applicants use this route | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.startDate` | unverified | LEAD: 1 October | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Start date or month as printed, with year | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.fee` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Fee with currency and academic year as printed; else To be confirmed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.eligibilityText` | not-published | — (no lead) | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Eligibility wording verbatim | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `nursing` — Nursing (nursing) | `programmes.nursing.internationalAdmission`; `programmes.nursing.language` | No official snippet states whether international applicants are admitted to this programme. | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `public-health` — Public Health (public_health) | `programmes.public-health.internationalAdmission`; `programmes.public-health.language` | No official snippet states whether international applicants are admitted to this programme. | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `physical-therapy` — Physical therapy, occupational therapy (specialty 227) (physical_therapy) | `programmes.physical-therapy.internationalAdmission`; `programmes.physical-therapy.language` | No official snippet states whether international applicants are admitted to this programme. | [International admission page](https://www.tdmu.edu.ua/int/admission/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Dated official statement of teaching format and location for 2025–26 (latest found covers 2024–25).  
   Closure (fill): 
2. Current official English name and domain (tdmu.edu.ua vs tnmu.edu.ua).  
   Closure (fill): 
3. Exact award titles for medicine, dentistry, pharmacy and nursing.  
   Closure (fill): 
4. Which programmes are open to international applicants for the next intake, and in which language; nursing English track to be confirmed.  
   Closure (fill): 
5. Official tuition fee schedule for the current year: amount, currency, academic year, payment schedule, other mandatory charges.  
   Closure (fill): 
6. Entry requirements, entrance exams and required documents as published for international applicants.  
   Closure (fill): 
7. Application deadlines (1 November / 1 March seen undated) and intake dates for the current cycle.  
   Closure (fill): 
8. Preparatory department: progression wording verbatim, fee, eligibility.  
   Closure (fill): 
9. Public health and physical therapy: eligibility of international applicants and language.  
   Closure (fill): 
10. Accommodation availability and published prices.  
   Closure (fill): 
11. Evidence-backed recognition statements only (e.g. World Directory listing).  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/ternopil-national-medical-university.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
