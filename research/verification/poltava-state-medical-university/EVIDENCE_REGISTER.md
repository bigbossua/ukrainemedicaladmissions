# Evidence register — Poltava State Medical University (`poltava-state-medical-university`)

**Status:** NOTHING VERIFIED. Every "Verified value / wording" cell below is empty because no official page could be opened from the build environment (DNS blocked for `.ua` domains, tested 2026-10-11 with curl and the fetch tool). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Record under verification:** `site/src/content/universities/poltava-state-medical-university.json` — 2 programme(s) with an official-domain lead of international admission (Medicine, Dentistry); 4 deferred programme(s) kept unpublished until eligibility is read (Nursing (specialty 223), programme subject area 223.02 Emergency Medicine (Paramedic), Public Health («Громадське здоров'я»), specialty 229, Physical therapy, ergotherapy («Фізична терапія, ерготерапія»), specialty 227, Pharmacy (specialty 226)).

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `poltava-state-medical-university--NN--short-name.pdf` where NN is the row number of this register (e.g. `poltava-state-medical-university--01--homepage.pdf`).
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
| 1 | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | International office contacts, address, faculty role for foreign students |  |  |
| 2 | [English homepage](https://en.pdmu.edu.ua/) | Official name, former name, founding year |  |  |
| 3 | [Homepage](https://www.pdmu.edu.ua/) | Canonical domain, contacts, current notices on teaching format |  |  |
| 4 | [About the International Faculty (history)](https://en.pdmu.edu.ua/info/foreign-students/istoriya-fakultetu-pidgotovki-inozemnih-studentiv) | Faculty history and renaming |  |  |
| 5 | [Fees for foreign students (PDF)](https://en.pdmu.edu.ua/storage/admission/docs/UgLqRTwTxabc2LfS3edZoQ4amKrA9mlrsnT1ErvG.pdf) | Programmes and languages for foreign students; fee table — read before any fee is recorded *(Undated; its figures conflict with the Ministry portal — find the academic year before recording anything)* |  |  |
| 6 | [Dentistry programme information (PDF)](https://en.pdmu.edu.ua/storage/basic_pages/docs/HWJOCCE9ksoCCf1Ft0cFBq3RKUTfjAMppJx4sJSH.pdf) | Level, ECTS, duration, accreditation validity, enrolment of foreigners *(Undated)* |  |  |
| 7 | [Programme document (PDF)](https://en.pdmu.edu.ua/storage/basic_pages/docs/kUIDRuZxUBnAL1VAnTW0sEXWH5SLJG149DvNgENW.pdf) | Content not captured in snippets — open and identify (listed by the sweep among pages to verify) |  |  |
| 8 | [Admission information for foreign citizens (PDF)](https://en.pdmu.edu.ua/storage/admission/docs/HPwAtLfjejlRvyD6k8vZGbyBFJWEgxMYxYdq5qZf.pdf) | Entrance tests, nursing professional test, enrolment orders *(Undated)* |  |  |
| 9 | [Admissions site](https://vstup.pdmu.edu.ua/) | Current admission rules, deadlines, programme list |  |  |
| 10 | [Educational and Research Center for Foreign Citizens Training](https://en.pdmu.edu.ua/education/nncpig) | Preparatory subjects, language, eligibility, contacts *(Undated)* |  |  |
| 11 | [Centre history](https://en.pdmu.edu.ua/education/nncpig/istoriya-navchalno-naukovogo-centru) | Origin (1997) and renaming (2018) |  |  |
| 12 | [English news](https://en.pdmu.edu.ua/news) | Current notices on teaching format and on-site activity |  |  |
| 13 | [News: international students study Ukrainian online](https://en.pdmu.edu.ua/news/priorities-of-the-educational-process-international-students-study-the-ukrainian-language-online) | Teaching format for international students *(2023 — out of date)* |  |  |
| 14 | [Notice to entrants](https://www.pdmu.edu.ua/news/do-uvagi-vstupnikiv-to-the-attention-of-the-entrants-news-cvyr) | Admission notices *(2024 domestic intake — out of date; dates not recorded)* |  |  |
| 15 | [Older International Faculty page](https://pdmu.edu.ua/magazines/old/facultethome/fakultetinostran/fakultetinozem_en.html) | English-medium Medicine and Dentistry for foreigners (history) *(Older page — historical context only)* |  |  |
| 16 | [Nursing "Paramedic" programme 2024](https://pdmu.edu.ua/n-process/department-npr/one-level/opp/paramedic/academic-and-professional-program-paramedic-2024) | Level, specialty, award title of the nursing (paramedic) bachelor |  |  |
| 17 | [Public Health master's programme (project page)](https://pdmu.edu.ua/n-process/department-npr/two-level/opp/public-health/proiekt-osvitnoyi-programi-department-npr-opp-public-health-pvte) | Programme status, language |  |  |
| 18 | [Public Health master's programme 2025 (PDF)](https://pdmu.edu.ua/storage/department-npr-opp-public-health/files/R9mLqNuWSjyGFbQd7axcb05b0YtGG0QtGMI3wXyQ.pdf) | Level, award title, ECTS, duration |  |  |
| 19 | [Physical therapy bachelor programme review (PDF)](https://pdmu.edu.ua/storage/department-npr-opp-fizterapiya/files/3jAR9q4135it5dVWtJ22KwtrqDdC9Z3c63fl30gy.pdf) | Level and specialty of the physical therapy programme |  |  |
| 20 | [College Pharmacy programme (PDF)](https://college.pdmu.edu.ua/storage/education/docs/43ZF4aOuZ6Lm6mlhglWjLPIuHg1F5rimLAVVaMig.pdf) | Pharmacy junior-bachelor programme at the university's college *(2022; found by a separate search on 2026-10-11)* |  |  |

Cross-check only, never a source: [Ministry portal: fees (university 82)](https://universities.studyinukraine.gov.ua/en/minedu/university/82/cost); [Ministry portal: preparatory department (university 82)](https://universities.studyinukraine.gov.ua/en/minedu/university/82/preparatory-department)

## B. Record-level claims

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Poltava State Medical University | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation |  |  |  |
| `website` | unverified | LEAD: https://www.pdmu.edu.ua/ | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | The canonical domain and the international-students section |  |  |  |
| `address` | unverified | LEAD: 36011, Poltava, 23 Shevchenka Street | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Postal address exactly as printed on the contacts page |  |  |  |
| `internationalOffice` | unverified | LEAD: email: international@pdmu.edu.ua, phone: (0532) 697092, url: https://en.pdmu.edu.ua/info/foreign-students | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Name of the unit for foreign applicants, email, phone, page URL |  |  |  |
| `status` | unverified | LEAD: operating | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so |  |  |  |
| `statusStatement` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | in-person / blended / distance exactly as the statement says; otherwise not-published |  |  |  |
| `founded` | unverified | LEAD: 1921 | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Founding year only from the official history page |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate; a news item is not evidence |  |  |  |
| `recognition` | not-published | — (no lead) | search.wdoms.org (to locate) | At most a bare "listed in the World Directory of Medical Schools" with its own URL; never licensing implications |  |  |  |
| `accommodation` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Hostel availability and published prices with year, or not-published |  |  |  |

## C. Programme `medicine` — Medicine (`programmes[].id = "medicine"`, field medicine)

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|
| `internationalAdmission` | unverified | LEAD: True | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) |  |  |  |
| `intakeYear` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | The intake/academic year the page refers to, exactly as printed |  |  |  |
| `level` | unverified | LEAD: master | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Level as the university classifies it (master's / single-cycle master's / bachelor) |  |  |  |
| `specialtyCode` | unverified | LEAD: 222 | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Specialty code(s) exactly as printed (e.g. "222", "I2") |  |  |  |
| `qualification` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Exact award title as printed (never MBBS unless printed) |  |  |  |
| `durationText` | unverified | LEAD: 5 years and 10 months | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") |  |  |  |
| `durationYears` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Whole years only if the page states years |  |  |  |
| `language` | unverified | LEAD: English, Ukrainian | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Languages of instruction offered to foreign applicants for this programme |  |  |  |
| `format` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Teaching format only from the dated statement (row statusStatement) |  |  |  |
| `tuition` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation — ALL as printed; if the page shows another year or is silent → "To be confirmed" |  |  |  |
| `deadlines` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Application window dates with the year as printed; a committee working period is recorded as exactly that |  |  |  |
| `intake` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Start of studies as printed |  |  |  |
| `requirements[]` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim |  |  |  |
| `documents[]` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | The full numbered document list for foreign applicants, with conditions — one row each |  |  |  |

## C. Programme `dentistry` — Dentistry (`programmes[].id = "dentistry"`, field dentistry)

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|
| `internationalAdmission` | unverified | LEAD: True | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) |  |  |  |
| `intakeYear` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | The intake/academic year the page refers to, exactly as printed |  |  |  |
| `level` | unverified | LEAD: master | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Level as the university classifies it (master's / single-cycle master's / bachelor) |  |  |  |
| `specialtyCode` | unverified | LEAD: 221 | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Specialty code(s) exactly as printed (e.g. "222", "I2") |  |  |  |
| `qualification` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Exact award title as printed (never MBBS unless printed) |  |  |  |
| `durationText` | unverified | LEAD: 4 years 10 months | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") |  |  |  |
| `durationYears` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Whole years only if the page states years |  |  |  |
| `language` | unverified | LEAD: English, Ukrainian | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Languages of instruction offered to foreign applicants for this programme |  |  |  |
| `format` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Teaching format only from the dated statement (row statusStatement) |  |  |  |
| `tuition` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation — ALL as printed; if the page shows another year or is silent → "To be confirmed" |  |  |  |
| `deadlines` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Application window dates with the year as printed; a committee working period is recorded as exactly that |  |  |  |
| `intake` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Start of studies as printed |  |  |  |
| `requirements[entrance-exams]` | unverified | LEAD: Foreigners and stateless persons are enrolled on the results of entrance examinations, under the general terms of the university's admission rules. | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Entrance requirement wording verbatim (exam; subject —; format —); intake year |  |  |  |
| `documents[]` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | The full numbered document list for foreign applicants, with conditions — one row each |  |  |  |

## D. Preparatory route `foreign-citizens-training-centre` — Educational and Research Center for Foreign Citizens Training

| Field (JSON path) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|
| `languageOfInstruction` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Language(s) the preparatory subjects are taught in |  |  |  |
| `englishTrack` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Whether an English-language preparatory track exists (quote) |  |  |  |
| `durationText` | unverified | LEAD: 1 year | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Duration exactly as printed |  |  |  |
| `subjects` | unverified | LEAD: Ukrainian language, Scientific style of speech, Biology, Chemistry, Physics, Mathematics, Basics of Computer Science, Local History | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Subject list as printed |  |  |  |
| `certificateName` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Name of the certificate awarded, as printed |  |  |  |
| `progressionText` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | VERBATIM wording on what completion gives / does not give |  |  |  |
| `appliesToEnglishDegreeTrack` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Whether English-track degree applicants use this route |  |  |  |
| `startDate` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Start date or month as printed, with year |  |  |  |
| `fee` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Fee with currency and academic year as printed; else To be confirmed |  |  |  |
| `eligibilityText` | not-published | — (no lead) | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Eligibility wording verbatim |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

| Programme (`deferredProgrammes[].id`) | Field | Lead | Page(s) to open | What to read | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|
| `nursing-paramedic` — Nursing (specialty 223), programme subject area 223.02 Emergency Medicine (Paramedic) (nursing) | internationalAdmission; language | No quoted official statement that foreign applicants are admitted to this programme for the current intake. Leads: the Ministry portal fee lines (undated); a search summary of the undated official fee PDF ("also lists Nursing under English study"); a summary of an undated official admission PDF saying the nursing programme uses a professional test instead of the entrance tests. Read the official pages before moving it to programmes[]. | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred |  |  |  |
| `public-health` — Public Health («Громадське здоров'я»), specialty 229 (public_health) | internationalAdmission; language | No snippet shows availability to international applicants; not named in the foreign-student fee leads. | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred |  |  |  |
| `physical-therapy` — Physical therapy, ergotherapy («Фізична терапія, ерготерапія»), specialty 227 (physical_therapy) | internationalAdmission; language | No snippet shows availability to international applicants; not named in the foreign-student fee leads. | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred |  |  |  |
| `pharmacy` — Pharmacy (specialty 226) (pharmacy) | internationalAdmission; language | No snippet shows availability to international applicants; the foreign-student fee leads name Medicine, Dentistry and Nursing, not Pharmacy. | [International Faculty](https://en.pdmu.edu.ua/info/foreign-students) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Dated official statement for 2026–27 on teaching format, including whether international students are taught in Poltava or online (2023–24 statements describe distance or online study; 2025 news shows on-site simulation training).  
   Closure (fill): 
2. Admission rules for foreign applicants for the 2026 intake: programmes open to foreigners, entrance tests (an undated PDF names the language of instruction and biology for bachelor's enrolment), invitation procedure.  
   Closure (fill): 
3. Official postal address (the lead is the International Faculty address) and current International Faculty contacts.  
   Closure (fill): 
4. Exact award titles for Medicine and Dentistry (older page: "Doctor of Medicine"), and durations as printed (Medicine: "5 years and 10 months" in the programme document against "over six years" in the fee PDF).  
   Closure (fill): 
5. FEES CONFLICT: the official fee PDF is undated and its English-medium figures conflict with the Ministry portal; find the dated official fee schedule for 2026/27 (amount, currency, per-period, payment schedule) and record which source is current.  
   Closure (fill): 
6. Application windows and intake dates for foreign applicants (only 2024 domestic deadlines found; third-party 2026 claims not recorded).  
   Closure (fill): 
7. Required documents for foreign applicants (none in snippets).  
   Closure (fill): 
8. Dentistry accreditation: the certificate was said to be valid until 01.07.2026 — current status from the NAQA register.  
   Closure (fill): 
9. Nursing (223.02 Paramedic bachelor): whether foreign applicants are admitted, in which language, and the exact award; resolve the Ministry-portal English-medium line against an official page.  
   Closure (fill): 
10. Pharmacy: whether any programme is open to foreign applicants, with level and language (leads: third-party part-time master's 2024; college junior bachelor 2022).  
   Closure (fill): 
11. Public Health master's and Physical therapy bachelor: eligibility of international applicants, language, accreditation.  
   Closure (fill): 
12. Preparatory centre: language of instruction for the science subjects (the official page says "Ukrainian or Russian languages"), English track, certificate, progression wording verbatim, start date, fee with year.  
   Closure (fill): 
13. Accommodation availability and published prices with year.  
   Closure (fill): 
14. Evidence-backed recognition statements only.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
