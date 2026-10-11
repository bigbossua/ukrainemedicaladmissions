# Evidence register — Zaporizhzhia State Medical and Pharmaceutical University (`zaporizhzhia-state-medical-and-pharmaceutical-university`)

**Status:** NOTHING VERIFIED. Every "Verified value / wording" cell below is empty because no official page could be opened from the build environment (DNS blocked for `.ua` domains, tested 2026-10-11 with curl and the fetch tool). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Record under verification:** `site/src/content/universities/zaporizhzhia-state-medical-and-pharmaceutical-university.json` — 5 programme(s) with an official-domain lead of international admission (Medicine, Dentistry, Pharmacy, Pediatrics, Perfume-Cosmetic Technology); 1 deferred programme(s) kept unpublished until eligibility is read (Therapy and Rehabilitation (specialty 227)).

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `zaporizhzhia-state-medical-and-pharmaceutical-university--NN--short-name.pdf` where NN is the row number of this register (e.g. `zaporizhzhia-state-medical-and-pharmaceutical-university--01--homepage.pdf`).
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
| 1 | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Programmes and languages for foreigners, places, intake windows, entrance examinations and pass mark, preparatory-faculty enrolment *(Year label conflicts across snippets (2025-2026 title; 2026-2027 content reported; 2024 table dates) — record the year printed on the page)* |  |  |
| 2 | [Tuition fee](https://int.mphu.edu.ua/p_259.html) | Per-year fees by programme and language, preparatory fee — read before any fee is recorded *(Labelled 2025-2026 in one snippet and 2026-2027 in another)* |  |  |
| 3 | [Training fields](https://int.mphu.edu.ua/p_257.html) | Programmes open to foreign students, durations, languages; official-site notice *(Undated)* |  |  |
| 4 | [Off-line teaching of foreign students is continuing in a safe area](https://int.mphu.edu.ua/p_1848.html) | Operating-conditions gate: where and how foreign students are taught (Berehove); find the date *(Undated)* |  |  |
| 5 | [News about studying in Berehove](https://int.mphu.edu.ua/p_1847_10.html) | Berehove teaching and preparatory department; dates of the news items |  |  |
| 6 | [Studies in Berehove: practical skills and USQE preparation](https://int.mphu.edu.ua/p_1886.html) | Berehove arrangement; preparatory-department wording |  |  |
| 7 | [Paediatric clinical training at the Berehove campus (news)](https://int.mphu.edu.ua/new_2699.html) | Berehove campus: date and scope of teaching |  |  |
| 8 | [Practice at the Berehove hospital (news)](https://int.mphu.edu.ua/p_1849.html) | Clinical-practice location for foreign students |  |  |
| 9 | [International section: site map](https://int.mphu.edu.ua/map_en.html) | Locate the contacts page, the international office and current-year notices |  |  |
| 10 | [Pre-university training courses](https://int.mphu.edu.ua/p_1547.html) | Confirm whether these courses (for domestic entrants) have any role for foreign applicants |  |  |
| 11 | [Official homepage](https://mphu.edu.ua/) | Official-site notice; university-wide 2026–27 notices on teaching format and location; contacts and address |  |  |
| 12 | [Annual review 2024 (PDF)](https://mphu.edu.ua/upload/razdel/240828_ro_24.pdf) | Foreign students on specialty 227 (therapy and rehabilitation); context *(Attribution to the university by snippet only)* |  |  |

## B. Record-level claims

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Zaporizhzhia State Medical and Pharmaceutical University | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation |  |  |  |
| `website` | unverified | LEAD: https://mphu.edu.ua/ | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The canonical domain and the international-students section |  |  |  |
| `address` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Postal address exactly as printed on the contacts page |  |  |  |
| `internationalOffice` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Name of the unit for foreign applicants, email, phone, page URL |  |  |  |
| `status` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | in-person / blended / distance exactly as the statement says; otherwise not-published |  |  |  |
| `founded` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Founding year only from the official history page |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate; a news item is not evidence |  |  |  |
| `recognition` | not-published | — (no lead) | search.wdoms.org (to locate) | At most a bare "listed in the World Directory of Medical Schools" with its own URL; never licensing implications |  |  |  |
| `accommodation` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Hostel availability and published prices with year, or not-published |  |  |  |

## C. Programme `medicine` — Medicine (`programmes[].id = "medicine"`, field medicine)

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|
| `internationalAdmission` | unverified | LEAD: True | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) |  |  |  |
| `intakeYear` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The intake/academic year the page refers to, exactly as printed |  |  |  |
| `level` | unverified | LEAD: master | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Level as the university classifies it (master's / single-cycle master's / bachelor) |  |  |  |
| `specialtyCode` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Specialty code(s) exactly as printed (e.g. "222", "I2") |  |  |  |
| `qualification` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Exact award title as printed (never MBBS unless printed) |  |  |  |
| `durationText` | unverified | LEAD: 5 years 10 months | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") |  |  |  |
| `durationYears` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Whole years only if the page states years |  |  |  |
| `language` | unverified | LEAD: English, Ukrainian | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Languages of instruction offered to foreign applicants for this programme |  |  |  |
| `format` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Teaching format only from the dated statement (row statusStatement) |  |  |  |
| `tuition` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation — ALL as printed; if the page shows another year or is silent → "To be confirmed" |  |  |  |
| `deadlines` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Application window dates with the year as printed; a committee working period is recorded as exactly that |  |  |  |
| `intake` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Start of studies as printed |  |  |  |
| `requirements[entrance-exams]` | unverified | LEAD: Foreign citizens are enrolled in the first year on the results of entrance examinations; the minimum passing mark is 6 out of 12. | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Entrance requirement wording verbatim (exam; subject —; format —); intake year |  |  |  |
| `documents[]` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The full numbered document list for foreign applicants, with conditions — one row each |  |  |  |

## C. Programme `dentistry` — Dentistry (`programmes[].id = "dentistry"`, field dentistry)

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|
| `internationalAdmission` | unverified | LEAD: True | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) |  |  |  |
| `intakeYear` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The intake/academic year the page refers to, exactly as printed |  |  |  |
| `level` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Level as the university classifies it (master's / single-cycle master's / bachelor) |  |  |  |
| `specialtyCode` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Specialty code(s) exactly as printed (e.g. "222", "I2") |  |  |  |
| `qualification` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Exact award title as printed (never MBBS unless printed) |  |  |  |
| `durationText` | unverified | LEAD: 4 years 10 months | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") |  |  |  |
| `durationYears` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Whole years only if the page states years |  |  |  |
| `language` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Languages of instruction offered to foreign applicants for this programme |  |  |  |
| `format` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Teaching format only from the dated statement (row statusStatement) |  |  |  |
| `tuition` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation — ALL as printed; if the page shows another year or is silent → "To be confirmed" |  |  |  |
| `deadlines` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Application window dates with the year as printed; a committee working period is recorded as exactly that |  |  |  |
| `intake` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Start of studies as printed |  |  |  |
| `requirements[]` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim |  |  |  |
| `documents[]` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The full numbered document list for foreign applicants, with conditions — one row each |  |  |  |

## C. Programme `pharmacy` — Pharmacy (`programmes[].id = "pharmacy"`, field pharmacy)

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|
| `internationalAdmission` | unverified | LEAD: True | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) |  |  |  |
| `intakeYear` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The intake/academic year the page refers to, exactly as printed |  |  |  |
| `level` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Level as the university classifies it (master's / single-cycle master's / bachelor) |  |  |  |
| `specialtyCode` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Specialty code(s) exactly as printed (e.g. "222", "I2") |  |  |  |
| `qualification` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Exact award title as printed (never MBBS unless printed) |  |  |  |
| `durationText` | unverified | LEAD: 4 years 10 months | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") |  |  |  |
| `durationYears` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Whole years only if the page states years |  |  |  |
| `language` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Languages of instruction offered to foreign applicants for this programme |  |  |  |
| `format` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Teaching format only from the dated statement (row statusStatement) |  |  |  |
| `tuition` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation — ALL as printed; if the page shows another year or is silent → "To be confirmed" |  |  |  |
| `deadlines` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Application window dates with the year as printed; a committee working period is recorded as exactly that |  |  |  |
| `intake` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Start of studies as printed |  |  |  |
| `requirements[]` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim |  |  |  |
| `documents[]` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The full numbered document list for foreign applicants, with conditions — one row each |  |  |  |

## C. Programme `pediatrics` — Pediatrics (`programmes[].id = "pediatrics"`, field other)

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|
| `internationalAdmission` | unverified | LEAD: True | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) |  |  |  |
| `intakeYear` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The intake/academic year the page refers to, exactly as printed |  |  |  |
| `level` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Level as the university classifies it (master's / single-cycle master's / bachelor) |  |  |  |
| `specialtyCode` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Specialty code(s) exactly as printed (e.g. "222", "I2") |  |  |  |
| `qualification` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Exact award title as printed (never MBBS unless printed) |  |  |  |
| `durationText` | unverified | LEAD: 5 years 10 months | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") |  |  |  |
| `durationYears` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Whole years only if the page states years |  |  |  |
| `language` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Languages of instruction offered to foreign applicants for this programme |  |  |  |
| `format` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Teaching format only from the dated statement (row statusStatement) |  |  |  |
| `tuition` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation — ALL as printed; if the page shows another year or is silent → "To be confirmed" |  |  |  |
| `deadlines` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Application window dates with the year as printed; a committee working period is recorded as exactly that |  |  |  |
| `intake` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Start of studies as printed |  |  |  |
| `requirements[]` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim |  |  |  |
| `documents[]` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The full numbered document list for foreign applicants, with conditions — one row each |  |  |  |

## C. Programme `perfume-cosmetic-technology` — Perfume-Cosmetic Technology (`programmes[].id = "perfume-cosmetic-technology"`, field other)

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|
| `internationalAdmission` | unverified | LEAD: True | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) |  |  |  |
| `intakeYear` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The intake/academic year the page refers to, exactly as printed |  |  |  |
| `level` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Level as the university classifies it (master's / single-cycle master's / bachelor) |  |  |  |
| `specialtyCode` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Specialty code(s) exactly as printed (e.g. "222", "I2") |  |  |  |
| `qualification` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Exact award title as printed (never MBBS unless printed) |  |  |  |
| `durationText` | unverified | LEAD: 4 years 10 months | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") |  |  |  |
| `durationYears` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Whole years only if the page states years |  |  |  |
| `language` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Languages of instruction offered to foreign applicants for this programme |  |  |  |
| `format` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Teaching format only from the dated statement (row statusStatement) |  |  |  |
| `tuition` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation — ALL as printed; if the page shows another year or is silent → "To be confirmed" |  |  |  |
| `deadlines` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Application window dates with the year as printed; a committee working period is recorded as exactly that |  |  |  |
| `intake` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Start of studies as printed |  |  |  |
| `requirements[]` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim |  |  |  |
| `documents[]` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | The full numbered document list for foreign applicants, with conditions — one row each |  |  |  |

## D. Preparatory route `international-faculty-1` — International (preparatory) Faculty No. 1

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|
| `languageOfInstruction` | unverified | LEAD: Ukrainian | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Language(s) the preparatory subjects are taught in |  |  |  |
| `englishTrack` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Whether an English-language preparatory track exists (quote) |  |  |  |
| `durationText` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Duration exactly as printed |  |  |  |
| `subjects` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Subject list as printed |  |  |  |
| `certificateName` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Name of the certificate awarded, as printed |  |  |  |
| `progressionText` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | VERBATIM wording on what completion gives / does not give |  |  |  |
| `appliesToEnglishDegreeTrack` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Whether English-track degree applicants use this route |  |  |  |
| `startDate` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Start date or month as printed, with year |  |  |  |
| `fee` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Fee with currency and academic year as printed; else To be confirmed |  |  |  |
| `eligibilityText` | not-published | — (no lead) | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Eligibility wording verbatim |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

| Programme (`deferredProgrammes[].id`) | Field | Lead | Page(s) to open | What to read | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|
| `therapy-rehabilitation` — Therapy and Rehabilitation (specialty 227) (physical_therapy) | internationalAdmission; language | No official admission statement found. Leads: the official 2024 annual review PDF counts 61 foreign students on specialty 227 (enrolment, not an admission statement); third-party directories say international students can study Therapy and Rehabilitation (specialisation "Physical Therapy"). Move to programmes[] only after an official page states admission. | [Requirements for admission of foreigners and stateless persons](https://int.mphu.edu.ua/p_1276.html) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. TEACHING LOCATION AND OPERATING CONDITIONS (gate — answer first): a dated official statement for 2026–27 on where and how foreign students are taught (Berehove, Zaporizhzhia or remotely), which programmes and years the Berehove arrangement covers, and whether it is current. The Berehove pages found are undated. No other work on this record should be published until this is answered.  
   Closure (fill): 
2. Which academic year the requirements page and the tuition page currently state (snippets conflict: 2024 table dates, 2025-2026 titles, 2026-2027 content reported).  
   Closure (fill): 
3. Official postal address(es) and international-office contacts as printed.  
   Closure (fill): 
4. Language of instruction for foreign applicants per programme (Medicine: a Ukrainian-medium row in the admissions table and English-medium listed elsewhere; Dentistry, Pharmacy, Pediatrics and Perfume-Cosmetic Technology: not stated on the official domain).  
   Closure (fill): 
5. Level, specialty code and exact award title for each programme.  
   Closure (fill): 
6. Official tuition fees with the academic year and payment schedule (official page and Ministry portal; year labels conflict).  
   Closure (fill): 
7. Intake windows and dates for the current cycle (only "no later than November 1 and March 1" and 2024 table dates found).  
   Closure (fill): 
8. Entrance examinations: subjects and format for the current cycle (pass mark 6 out of 12 seen).  
   Closure (fill): 
9. Required documents for foreign applicants (none in the snippets).  
   Closure (fill): 
10. Preparatory faculty: duration, subjects, language of instruction on an official page, certificate, progression wording verbatim, fee with year, start date, and whether it runs in Berehove.  
   Closure (fill): 
11. Therapy and Rehabilitation (227), nursing (a third-party directory lists "Nursing (Cosmetology)") and public health: whether any is offered and open to foreign applicants, at what level and in which language.  
   Closure (fill): 
12. Status of the legacy domain zsmu.edu.ua.  
   Closure (fill): 
13. Accommodation availability and published prices (Zaporizhzhia and Berehove).  
   Closure (fill): 
14. Evidence-backed recognition statements only.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
