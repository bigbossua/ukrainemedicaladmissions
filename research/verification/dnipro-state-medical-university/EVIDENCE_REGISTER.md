# Evidence register — Dnipro State Medical University (`dnipro-state-medical-university`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/dnipro-state-medical-university.json`, checked 2026-10-12): **blocked**. Re-tested on 2026-10-12 (08:47 UTC) from the build environment with curl through its proxy (one HTTPS request to the root address of each host). Hosts named in this record's references and website lead: 302.dmu.edu.ua, 416.dmu.edu.ua, dmu.edu.ua, infoen.dmu.edu.ua, pv.dmu.edu.ua, study.dmu.edu.ua. Government and register hosts: mon.gov.ua, info.edbo.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, studyinukraine.gov.ua. Every host was refused at the environment's proxy under its network policy (curl: "CONNECT tunnel failed, response 403"; HTTP code 000); a control request to example.com was refused the same way, while api.github.com returned HTTP 200. No official page or PDF was opened and no claim was checked. Previous attempt: 2026-10-11 (same result). Route to access: the owner adds the hosts under the environment's Network access → Allowed domains, or supplies captures (research/verification/CAPTURE_REQUEST_2026-10-12.md). A refused request is an access limitation, never evidence about the university.

**Record under verification:** `site/src/content/universities/dnipro-state-medical-university.json` — 0 programme(s) with an official-domain lead of international admission (); 4 deferred programme(s) kept unpublished until eligibility is read (Medicine («Медицина»), Dentistry («Стоматологія»), Pharmacy, industrial pharmacy («Фармація, промислова фармація»), Physical therapy, occupational therapy («Фізична терапія, ерготерапія»)).

**Evidence store:** `site/data/evidence/dnipro-state-medical-university.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `dnipro-state-medical-university--NN--short-name.pdf` where NN is the row number of this register (e.g. `dnipro-state-medical-university--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/dnipro-state-medical-university.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Admission process (admissions portal for foreigners)](https://study.dmu.edu.ua/admission-s/admission-process) | Invitation to Study route, documents, enrolment, start of the academic year; look for a programme list and languages *(Undated)* |  |  |
| 2 | [Admissions portal for foreigners](https://study.dmu.edu.ua/) | Programmes open to foreign applicants, languages, fees, deadlines (none in snippets) |  |  |
| 3 | [Admission process (main site)](https://dmu.edu.ua/en/admission-process) | Payment terms for tuition and hostel; admission route *(Undated)* |  |  |
| 4 | [Pre-study language course](https://study.dmu.edu.ua/pre-study-language-course) | Preparatory course: dates, subjects, documents, progression wording |  |  |
| 5 | [Preparatory Department for Foreign Citizens](https://pv.dmu.edu.ua/english) | Preparatory department: dates (conflict with the admissions portal), subjects, certificate, fee |  |  |
| 6 | [International portal](https://infoen.dmu.edu.ua/) | International Faculty: programmes taught to foreign students and their language |  |  |
| 7 | [DSMU and the International Faculty](https://infoen.dmu.edu.ua/dsmu-and-faculty) | Official-domain statement; dean's office contacts and address |  |  |
| 8 | [Graduates: general information](https://infoen.dmu.edu.ua/graduates/general-information) | May state programmes and awards for international graduates (not in any snippet) |  |  |
| 9 | [International activity](https://dmu.edu.ua/ua/activity/international-activity) | History and organisation of foreign-student training |  |  |
| 10 | [University news](https://dmu.edu.ua/novini/) | Operating conditions: look for a 2025–26 or 2026–27 university-wide order or notice on the format of the educational process |  |  |
| 11 | [Department notice: blended learning from 1 September 2025](https://302.dmu.edu.ua/english/mixed-learning) | Department-level format notice (context for the operating-conditions question only) *(Department level, not university-wide)* |  |  |
| 12 | [Department notice: online teaching from 02.09.2024](https://416.dmu.edu.ua/home/english) | Earlier department-level format notice (context only) *(2024 — out of date)* |  |  |
| 13 | [Online teaching for foreign citizens (news, March 2022)](https://dmu.edu.ua/novini/march-14-2022/) | Earlier wartime notice (context only) *(2022 — out of date)* |  |  |
| 14 | To locate: A university-wide, dated official statement for 2026–27 on teaching format and location (only department-level notices from 2024 and 2025 and university notices from 2022 were found) | — |  |  |
| 15 | To locate: An official page naming the degree programmes open to foreign applicants and their language of instruction (no official page found names an English-medium programme) | — |  |  |
| 16 | To locate: Tuition fees for foreign applicants with the academic year (only domestic contract prices were found) | — |  |  |
| 17 | To locate: Application deadlines and intake dates for foreign applicants (none found) | — |  |  |
| 18 | To locate: Entry requirements and entrance examinations for foreign applicants (none in the snippets) | — |  |  |
| 19 | To locate: The International Relations Department contacts with the official postal address | — |  |  |
| 20 | To locate: Hostel (accommodation) information with published prices and their academic year | — |  |  |
| 21 | To locate: EDEBO (info.edbo.gov.ua) or Ministry-portal (universities.studyinukraine.gov.ua) entry for the university, to cross-check the official domain | — |  |  |

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Dnipro State Medical University | [DSMU and the International Faculty](https://infoen.dmu.edu.ua/dsmu-and-faculty) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://dmu.edu.ua/ | [DSMU and the International Faculty](https://infoen.dmu.edu.ua/dsmu-and-faculty)<br>To locate: section A row 21 | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [DSMU and the International Faculty](https://infoen.dmu.edu.ua/dsmu-and-faculty)<br>To locate: section A row 19 | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | unverified | LEAD: email: int@dmu.edu.ua, url: https://infoen.dmu.edu.ua/dsmu-and-faculty | [DSMU and the International Faculty](https://infoen.dmu.edu.ua/dsmu-and-faculty)<br>To locate: section A row 19 | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | not-published | — (no lead) | [University news](https://dmu.edu.ua/novini/)<br>To locate: section A row 14 | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [University news](https://dmu.edu.ua/novini/)<br>To locate: section A row 14 | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [University news](https://dmu.edu.ua/novini/)<br>To locate: section A row 14 | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [DSMU and the International Faculty](https://infoen.dmu.edu.ua/dsmu-and-faculty) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [Admission process (main site)](https://dmu.edu.ua/en/admission-process)<br>To locate: section A row 20 | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## D. Preparatory route `preparatory-department` — Preparatory Department for Foreign Citizens

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `preparatoryRoutes.preparatory-department.languageOfInstruction` | not-published | — (no lead) | [Pre-study language course](https://study.dmu.edu.ua/pre-study-language-course)<br>[Preparatory Department for Foreign Citizens](https://pv.dmu.edu.ua/english) | Language(s) the preparatory subjects are taught in | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.englishTrack` | not-published | — (no lead) | [Pre-study language course](https://study.dmu.edu.ua/pre-study-language-course)<br>[Preparatory Department for Foreign Citizens](https://pv.dmu.edu.ua/english) | Whether an English-language preparatory track exists (quote) | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.durationText` | not-published | — (no lead) | [Pre-study language course](https://study.dmu.edu.ua/pre-study-language-course)<br>[Preparatory Department for Foreign Citizens](https://pv.dmu.edu.ua/english) | Duration exactly as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.subjects` | unverified | LEAD: Ukrainian language, Physics, Chemistry, Biology | [Pre-study language course](https://study.dmu.edu.ua/pre-study-language-course)<br>[Preparatory Department for Foreign Citizens](https://pv.dmu.edu.ua/english) | Subject list as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.certificateName` | not-published | — (no lead) | [Pre-study language course](https://study.dmu.edu.ua/pre-study-language-course)<br>[Preparatory Department for Foreign Citizens](https://pv.dmu.edu.ua/english) | Name of the certificate awarded, as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.progressionText` | not-published | — (no lead) | [Pre-study language course](https://study.dmu.edu.ua/pre-study-language-course)<br>[Preparatory Department for Foreign Citizens](https://pv.dmu.edu.ua/english) | VERBATIM wording on what completion gives / does not give | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.appliesToEnglishDegreeTrack` | not-published | — (no lead) | [Pre-study language course](https://study.dmu.edu.ua/pre-study-language-course)<br>[Preparatory Department for Foreign Citizens](https://pv.dmu.edu.ua/english) | Whether English-track degree applicants use this route | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.startDate` | not-published | — (no lead) | [Pre-study language course](https://study.dmu.edu.ua/pre-study-language-course)<br>[Preparatory Department for Foreign Citizens](https://pv.dmu.edu.ua/english) | Start date or month as printed, with year | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.fee` | not-published | — (no lead) | [Pre-study language course](https://study.dmu.edu.ua/pre-study-language-course)<br>[Preparatory Department for Foreign Citizens](https://pv.dmu.edu.ua/english) | Fee with currency and academic year as printed; else To be confirmed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.eligibilityText` | not-published | — (no lead) | [Pre-study language course](https://study.dmu.edu.ua/pre-study-language-course)<br>[Preparatory Department for Foreign Citizens](https://pv.dmu.edu.ua/english) | Eligibility wording verbatim | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `medicine` — Medicine («Медицина») (medicine) | `programmes.medicine.internationalAdmission`; `programmes.medicine.language` | No official page found that names this programme as open to foreign applicants. The official admissions page for foreigners describes the Invitation to Study route but, in the snippet, names no programme; agencies assert English-medium teaching (not evidence). | [Admissions portal for foreigners](https://study.dmu.edu.ua/)<br>[International portal](https://infoen.dmu.edu.ua/)<br>[Graduates: general information](https://infoen.dmu.edu.ua/graduates/general-information)<br>To locate: section A row 15 | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `dentistry` — Dentistry («Стоматологія») (dentistry) | `programmes.dentistry.internationalAdmission`; `programmes.dentistry.language` | No official page found that names this programme as open to foreign applicants. The official admissions page for foreigners describes the Invitation to Study route but, in the snippet, names no programme; agencies assert English-medium teaching (not evidence). | [Admissions portal for foreigners](https://study.dmu.edu.ua/)<br>[International portal](https://infoen.dmu.edu.ua/)<br>[Graduates: general information](https://infoen.dmu.edu.ua/graduates/general-information)<br>To locate: section A row 15 | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `pharmacy` — Pharmacy, industrial pharmacy («Фармація, промислова фармація») (pharmacy) | `programmes.pharmacy.internationalAdmission`; `programmes.pharmacy.language` | No official page found that names this programme as open to foreign applicants. The official admissions page for foreigners describes the Invitation to Study route but, in the snippet, names no programme; agencies assert English-medium teaching (not evidence). | [Admissions portal for foreigners](https://study.dmu.edu.ua/)<br>[International portal](https://infoen.dmu.edu.ua/)<br>[Graduates: general information](https://infoen.dmu.edu.ua/graduates/general-information)<br>To locate: section A row 15 | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `physical-therapy` — Physical therapy, occupational therapy («Фізична терапія, ерготерапія») (physical_therapy) | `programmes.physical-therapy.internationalAdmission`; `programmes.physical-therapy.language` | No snippet shows availability to international applicants. | [Admissions portal for foreigners](https://study.dmu.edu.ua/)<br>[International portal](https://infoen.dmu.edu.ua/)<br>[Graduates: general information](https://infoen.dmu.edu.ua/graduates/general-information)<br>To locate: section A row 15 | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. OPERATING CONDITIONS (check first): a university-wide, dated official statement for 2026–27 on teaching format and location (only department-level notices from 2024 and 2025 and university notices from 2022 were found).  
   Closure (fill): 
2. Which degree programmes are open to foreign applicants, and in which language: no official page found names an English-medium programme; only agencies assert English-medium Medicine, Dentistry and Pharmacy. No degree programme may move to programmes[] until an official page states it.  
   Closure (fill): 
3. Level, specialty code, duration and exact award title for each programme, from the official pages.  
   Closure (fill): 
4. Official tuition fees for foreign applicants with the academic year (only domestic contract prices and agency figures found).  
   Closure (fill): 
5. Application deadlines and intake dates for foreign applicants (none found; the academic year is said to start on 1 September).  
   Closure (fill): 
6. Entry requirements and entrance examinations for foreign applicants (none in the snippets).  
   Closure (fill): 
7. Required documents as currently published (snippet: passport copy, school diploma with transcripts, signed personal-data consent).  
   Closure (fill): 
8. Whether the university uses the Unified Interdepartmental Information System for foreign applicants (not confirmed).  
   Closure (fill): 
9. Official postal address and International Relations Department contacts.  
   Closure (fill): 
10. Preparatory department: start date (1 September or 1 October), duration, language of instruction for the science subjects, certificate, progression wording verbatim, fee with year.  
   Closure (fill): 
11. Physical therapy (227): level (bachelor's or master's) and whether foreign applicants are admitted; nursing and public health: whether offered at all (a third-party directory lists 229 Public Health).  
   Closure (fill): 
12. Accommodation availability and published prices.  
   Closure (fill): 
13. Evidence-backed recognition statements only (agency claims of WHO or NMC recognition are not evidence).  
   Closure (fill): 
14. Programmes: no programme on the official domain has a lead of admission for international applicants yet, so programmes[] is empty; the Preparatory Department for Foreign Citizens is recorded once, under preparatoryRoutes[] (2026-10-11 integration: the duplicate programme entry was removed).  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/dnipro-state-medical-university.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
