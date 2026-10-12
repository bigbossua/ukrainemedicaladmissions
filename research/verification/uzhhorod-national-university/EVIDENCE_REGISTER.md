# Evidence register — Uzhhorod National University (`uzhhorod-national-university`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/uzhhorod-national-university.json`, checked 2026-10-12): **blocked**. Re-tested on 2026-10-12 (08:47 UTC) from the build environment with curl through its proxy (one HTTPS request to the root address of each host). Hosts named in this record's references and website lead: uzhnu.edu.ua, vstup.osvita.ua, www.uzhnu.edu.ua. Government and register hosts: mon.gov.ua, info.edbo.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, studyinukraine.gov.ua. Every host was refused at the environment's proxy under its network policy (curl: "CONNECT tunnel failed, response 403"; HTTP code 000); a control request to example.com was refused the same way, while api.github.com returned HTTP 200. No official page or PDF was opened and no claim was checked. Previous attempt: 2026-10-11 (same result). Route to access: the owner adds the hosts under the environment's Network access → Allowed domains, or supplies captures (research/verification/CAPTURE_REQUEST_2026-10-12.md). A refused request is an access limitation, never evidence about the university.

**Record under verification:** `site/src/content/universities/uzhhorod-national-university.json` — 1 programme(s) with an official-domain lead of international admission (Medicine (Medical Doctor programme, Medical Faculty No. 2)); 6 deferred programme(s) kept unpublished until eligibility is read (Dentistry (Dental practitioner programme), Pharmacy («Фармація»), Nursing («Медсестринство»), Public Health («Громадське здоров'я»), Physical therapy and rehabilitation ("Physical Rehabilitation"), Physical Culture and Sports).

**Evidence store:** `site/data/evidence/uzhhorod-national-university.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `uzhhorod-national-university--NN--short-name.pdf` where NN is the row number of this register (e.g. `uzhhorod-national-university--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/uzhhorod-national-university.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | 2026 two-stage admission windows, remote exams, Unified System registration |  |  |
| 2 | [For foreign students: about](https://uzhnu.edu.ua/en/cat/abiturient-foreign/about) | Selection Committee for Foreign Nationals; International Students Department contacts |  |  |
| 3 | [Courses in English and tuition fees](https://uzhnu.edu.ua/en/cat/abiturient-foreign/courses_in_english) | Official English-programme list and fees — read before any fee is recorded |  |  |
| 4 | [Foreign applicants: account activation](https://www.uzhnu.edu.ua/en/cat/foreign-acc_activation) | Application mechanics |  |  |
| 5 | [Medical Faculty No. 2 (news, 2024–25)](https://uzhnu.edu.ua/en/news/Medical-Faculty-No-2-modern-education-for-future-professionals.htm) | English-medium Medicine for foreign students; levels |  |  |
| 6 | [Faculty of Medicine](https://uzhnu.edu.ua/en/cat/faculty-medical/about) | Programmes and languages |  |  |
| 7 | [Faculty of Dentistry](https://uzhnu.edu.ua/en/cat/faculty-fstomat/about) | Duration; places for foreign citizens *(Undated)* |  |  |
| 8 | [Department of Health Studies](https://uzhnu.edu.ua/en/cat/health-kaf_health) | Physical rehabilitation levels; faculty history *(Undated)* |  |  |
| 9 | [Centre of Pre-University Preparation](https://uzhnu.edu.ua/en/cat/pdodp-preuniversity) | Preparatory department details |  |  |
| 10 | [Dentistry syllabus 2024–25](https://www.uzhnu.edu.ua/en/infocentre/get/97982) | Level, specialty 221, languages |  |  |
| 11 | [Nursing programme (Ukrainian)](https://www.uzhnu.edu.ua/uk/infocentre/get/25379) | Level, forms of study |  |  |
| 12 | [Public Health master's programme (Ukrainian)](https://www.uzhnu.edu.ua/uk/infocentre/get/17746) | Level, standard, aims |  |  |
| 13 | [Order on the exam session, semester 1 2025–26](https://uzhnu.edu.ua/en/infocentre/get/43800) | Mixed-format evidence (dated) |  |  |
| 14 | [List of specialities and programmes](https://www.uzhnu.edu.ua/en/news/List-of-specialities-specializations-educational-programmes.htm) | Full programme list |  |  |
| 15 | [Graduation ceremony (June 2026)](https://www.uzhnu.edu.ua/en/news/Uzhhorod-National-University-Holds-Graduation-Cerem.htm) | English-medium Medical Doctor programme graduates (dated) |  |  |
| 16 | To locate: The official contacts page (postal address) | — |  |  |
| 17 | To locate: The official programme page for 222 Medicine at Medical Faculty No. 2 (level, award, duration) | — |  |  |
| 18 | To locate: A dated 2026–27 statement on teaching format for foreign students | — |  |  |
| 19 | To locate: The EDEBO (registry.edbo.gov.ua) or Ministry-portal (universities.studyinukraine.gov.ua) entry listing the official website | — |  |  |

Third-party pages (leads only, never a source): [Third-party admissions portal (2025 pharmacy offer)](https://vstup.osvita.ua/y2025/r8/207/1557305/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: State University "Uzhhorod National University" | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://www.uzhnu.edu.ua/ | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | unverified | LEAD: email: dep-istudents@uzhnu.edu.ua, phone: +380 (3122) 64-31-56, url: https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/about | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## C. Programme `medicine` — Medicine (Medical Doctor programme, Medical Faculty No. 2) (`programmes[].id = "medicine"`, field medicine)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.medicine.internationalAdmission` | unverified | LEAD: True | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.medicine.intakeYear` | unverified | LEAD: 2026/27 | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.medicine.level` | unverified | LEAD: master | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.medicine.specialtyCode` | unverified | LEAD: 222 | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.medicine.qualification` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.medicine.durationText` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.medicine.durationYears` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.medicine.language` | unverified | LEAD: English | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.medicine.format` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.medicine.tuition` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.medicine.otherMandatoryCosts.*` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.medicine.deadlines` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.medicine.intake` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.medicine.requirements.entrance-exams` | unverified | LEAD: Entrance examinations in chemistry, biology and English (2019 interview — stale; current subjects not confirmed). | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Entrance requirement wording verbatim (exam; subject Chemistry; Biology; English; format —); intake year | no evidence recorded |  |  |  |
| `programmes.medicine.requirements.remote-exams` | unverified | LEAD: Remote entrance exams are conducted in an online format with mandatory video recording (including screen recording). | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Entrance requirement wording verbatim (other; subject —; format —); intake year | no evidence recorded |  |  |  |
| `programmes.medicine.documents.legalised-education-documents` | unverified | LEAD: Legalised educational documents (Remote admission with an electronic invitation) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Document name and any condition (translation, legalisation, format) verbatim | no evidence recorded |  |  |  |
| `programmes.medicine.documents.unified-system-registration` | unverified | LEAD: Registration in the Unified Admission Information System for the Admission of International Applicants (Applicants without Ukrainian residence) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Document name and any condition (translation, legalisation, format) verbatim | no evidence recorded |  |  |  |

## D. Preparatory route `preparatory-department` — Preparatory department for studying Ukrainian (Centre of Pre-University Preparation and Foreign Citizens Assistance)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `preparatoryRoutes.preparatory-department.languageOfInstruction` | unverified | LEAD: Ukrainian | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Language(s) the preparatory subjects are taught in | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.englishTrack` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Whether an English-language preparatory track exists (quote) | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.durationText` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Duration exactly as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.subjects` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Subject list as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.certificateName` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Name of the certificate awarded, as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.progressionText` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | VERBATIM wording on what completion gives / does not give | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.appliesToEnglishDegreeTrack` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Whether English-track degree applicants use this route | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.startDate` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Start date or month as printed, with year | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.fee` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Fee with currency and academic year as printed; else To be confirmed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.eligibilityText` | not-published | — (no lead) | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Eligibility wording verbatim | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `dentistry` — Dentistry (Dental practitioner programme) (dentistry) | `programmes.dentistry.internationalAdmission`; `programmes.dentistry.language` | Faculty of Dentistry page (undated) mentions places for representatives of other countries; not confirmed by a current admissions page. | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `pharmacy` — Pharmacy («Фармація») (pharmacy) | `programmes.pharmacy.internationalAdmission`; `programmes.pharmacy.language` | Not confirmed. | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `nursing` — Nursing («Медсестринство») (nursing) | `programmes.nursing.internationalAdmission`; `programmes.nursing.language` | Not confirmed as open to foreigners. | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `public-health` — Public Health («Громадське здоров'я») (public_health) | `programmes.public-health.internationalAdmission`; `programmes.public-health.language` | Not confirmed as open to foreigners. | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `physical-rehabilitation` — Physical therapy and rehabilitation ("Physical Rehabilitation") (physical_therapy) | `programmes.physical-rehabilitation.internationalAdmission`; `programmes.physical-rehabilitation.language` | Not confirmed as open to foreigners. | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `physical-culture-sport` — Physical Culture and Sports (physical_education) | `programmes.physical-culture-sport.internationalAdmission`; `programmes.physical-culture-sport.language` | Not confirmed. | [For foreign students: admission rules](https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official statement of teaching format for foreign students 2025–26 / 2026–27 (only an exam-session order found).  
   Closure (fill): 
2. Official postal address of the university and of Medical Faculty No. 2.  
   Closure (fill): 
3. Current tuition fees for English-taught programmes (official courses_in_english page — content not retrieved).  
   Closure (fill): 
4. Exact wording and dates of the 2026 two-stage admission windows for fee-paying foreigners.  
   Closure (fill): 
5. Current entrance-exam subjects for medicine (2019 snippet only).  
   Closure (fill): 
6. Dentistry: current admissions page confirming English-medium intake for foreigners; award title.  
   Closure (fill): 
7. Pharmacy: whether any English-taught or foreigner-oriented track exists.  
   Closure (fill): 
8. Nursing, Public Health, Physical rehabilitation, Physical culture and sport: levels current to 2025–26, language and eligibility of foreigners.  
   Closure (fill): 
9. Preparatory department: duration, subjects, medium of instruction, fee, progression wording.  
   Closure (fill): 
10. Medicine duration as currently published (2019 "six years" is stale).  
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

- 0 evidence entries in `site/data/evidence/uzhhorod-national-university.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
