# Evidence register — Kharkiv National Medical University (`kharkiv-national-medical-university`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/kharkiv-national-medical-university.json`, checked 2026-10-11): **blocked**. Tried on 2026-10-11 (18:50 UTC) from the build environment with curl through its proxy (one HTTPS request to the root address of each host). University hosts named in this record's research references: knmu.edu.ua. Government and register hosts: universities.studyinukraine.gov.ua, studyinukraine.gov.ua, mon.gov.ua, naqa.gov.ua, info.edbo.gov.ua, search.wdoms.org. Every host was refused at the environment's proxy under its network policy (curl: "CONNECT tunnel failed, response 403"; HTTP code 000), while a control request to api.github.com through the same proxy returned HTTP 200. The fetch tool, asked for https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/, returned "getaddrinfo ENOTFOUND knmu.edu.ua". No official page or PDF was opened and no claim was checked; search snippets were used only as research leads, and no mirror or archive was used. The search-snippet sweeps that produced the leads are logged in SOURCE_VERIFICATION_REGISTER.md.

**Record under verification:** `site/src/content/universities/kharkiv-national-medical-university.json` — 1 programme(s) with an official-domain lead of international admission (Medicine); 5 deferred programme(s) kept unpublished until eligibility is read (Dentistry, Nursing (bachelor's programme), Master's Degree Programme in Nursing, Public Health («Громадське здоров'я»), Physical Therapy, Occupational Therapy).

**Evidence store:** `site/data/evidence/kharkiv-national-medical-university.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `kharkiv-national-medical-university--NN--short-name.pdf` where NN is the row number of this register (e.g. `kharkiv-national-medical-university--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/kharkiv-national-medical-university.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Current admission regulations for foreigners, entrance-examination format, invitation validity, preparatory applications *(Snippet shows the 2025 regulations — look for the 2026 version)* |  |  |
| 2 | [Contacts and information for foreign applicants](https://knmu.edu.ua/en/kontakty-ta-informacziya-dlya-inozemnyh-vstupnykiv) | International office (ESIFC) contacts and address |  |  |
| 3 | [VI Faculty for training foreign students](https://knmu.edu.ua/en/faculty/vi-fakultet-z-pidgotovky-inozemnyh-studentiv-navchalno-naukovogo-instytutu-z-pidgotovky-inozemnyh-gromadyan) | Programmes taught to foreign students: language, level, qualification, duration; Dentistry history |  |  |
| 4 | [Preparatory department](https://knmu.edu.ua/en/navchalno-naukovyj-instytut-z-pidgotovky-inozemnyh-gromadyan-hnmu/pidgotovche-viddilennya/) | Duration, subjects, language, certificate, progression wording, group size, dormitory |  |  |
| 5 | [Special edition No. 29, 2026 (news)](https://knmu.edu.ua/en/news/spesial-edition-29-2026/) | Operating-conditions gate: evidence of current activity; look for statements on location and teaching format *(Dated 04.08.2026 in the snippet)* |  |  |
| 6 | [Rector's address on the new academic year](https://knmu.edu.ua/en/news/zvernennya-rektora-do-zdobuvachiv-osvity-shhodo-novogo-navchalnogo-roku/) | Earlier wartime format statement (context for the operating-conditions question only) *(2022 — out of date)* |  |  |
| 7 | [University today](https://knmu.edu.ua/en/about-2/universytet-sogodni/) | Official name, official-site statement, founding year |  |  |
| 8 | [Programme catalogue](https://knmu.edu.ua/program-catalog/) | Full list of programmes with levels and languages |  |  |
| 9 | [Medicine (master) 2024 — programme catalogue](https://knmu.edu.ua/en/program-catalog/medicine-master-2024/) | Award title, specialty code, ECTS, start of validity |  |  |
| 10 | [Medicine (master) 2022 — programme catalogue](https://knmu.edu.ua/en/program-catalog/medicine-master-2022/) | Earlier version: languages, duration (comparison only) |  |  |
| 11 | [Medicine programme 2024/25 (PDF)](https://knmu.edu.ua/wp-content/uploads/2026/02/psp_med24_25.pdf) | Languages, award title, duration |  |  |
| 12 | [Dentistry programme 2024/25 (PDF)](https://knmu.edu.ua/wp-content/uploads/2026/04/epp_st24_25.pdf) | Level, professional qualification, language; changes in force from 1 September 2025 |  |  |
| 13 | [Dentistry master's programme 2024 — compulsory components (3rd year)](https://knmu.edu.ua/en/sompulsory-components-br-op-dentistry-master-2024-br-3rd-year/) | Source of the level lead ("Dentistry Master's programme"); programme version |  |  |
| 14 | [Nursing (bachelor's) 2021 — programme catalogue](https://knmu.edu.ua/en/program-catalog/nursing-bachelor-2021/) | Level, ECTS, languages; whether a current version exists |  |  |
| 15 | [Nursing (bachelor's) 2021 — English programme PDF](https://knmu.edu.ua/wp-content/uploads/2023/05/epp_n21eng.pdf) | Level, specialty, languages, graduating department |  |  |
| 16 | [Nursing master's programme 2024 (PDF)](https://knmu.edu.ua/wp-content/uploads/2024/08/opp_ms24.pdf) | Level, award name, languages ("certain topics" in English) |  |  |
| 17 | [Public Health master's programme 2022 (PDF)](https://knmu.edu.ua/wp-content/uploads/2022/07/op_gr_zdor2022.pdf) | Level, ECTS, duration, language, NAQA certificate No. 1363 (valid until 01.07.2026) |  |  |
| 18 | [Public Health accreditation information 2021 (PDF)](https://knmu.edu.ua/wp-content/uploads/2021/07/vidomosti_gr-zdor_akred.pdf) | Specialty code, level and accreditation details for Public Health *(2021 — check for a later accreditation)* |  |  |
| 19 | [Public Health master's programme 2024 (PDF)](https://knmu.edu.ua/wp-content/uploads/2024/07/op_gr_zdor2024.pdf) | Current version: language, accreditation |  |  |
| 20 | [Department of Public Health and Healthcare Management](https://knmu.edu.ua/en/departments/department-of-public-health-and-healthcare-management/) | Levels and specialties taught |  |  |
| 21 | [IV Medical Faculty](https://knmu.edu.ua/en/faculty/iv-medychnyj-fakultet/) | Physical Therapy, Occupational Therapy and Public Health: level and language |  |  |

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Kharkiv National Medical University | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://knmu.edu.ua/ | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | unverified | LEAD: url: https://knmu.edu.ua/en/kontakty-ta-informacziya-dlya-inozemnyh-vstupnykiv | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## C. Programme `medicine` — Medicine (`programmes[].id = "medicine"`, field medicine)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.medicine.internationalAdmission` | unverified | LEAD: True | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.medicine.intakeYear` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.medicine.level` | unverified | LEAD: master | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.medicine.specialtyCode` | unverified | LEAD: 222 | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.medicine.qualification` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.medicine.durationText` | unverified | LEAD: 6 years | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.medicine.durationYears` | unverified | LEAD: 6 | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.medicine.language` | unverified | LEAD: English, Ukrainian | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.medicine.format` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.medicine.tuition` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.medicine.otherMandatoryCosts.*` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.medicine.deadlines` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.medicine.intake` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.medicine.requirements.entrance-exams` | unverified | LEAD: Entrance examinations held in a distance format with video recording, after personal identification. | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Entrance requirement wording verbatim (exam; subject —; format distance format with video recording); intake year | no evidence recorded |  |  |  |
| `programmes.medicine.documents.*` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## D. Preparatory route `preparatory-department` — Preparatory department of the Educational and Scientific Institute for Foreign Citizens

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `preparatoryRoutes.preparatory-department.languageOfInstruction` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Language(s) the preparatory subjects are taught in | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.englishTrack` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Whether an English-language preparatory track exists (quote) | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.durationText` | unverified | LEAD: 1 academic year (10 months) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Duration exactly as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.subjects` | unverified | LEAD: Ukrainian language, Biology, Chemistry, Physics, Mathematics, Computer science, Country studies | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Subject list as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.certificateName` | unverified | LEAD: Certificate of completion | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Name of the certificate awarded, as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.progressionText` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | VERBATIM wording on what completion gives / does not give | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.appliesToEnglishDegreeTrack` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Whether English-track degree applicants use this route | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.startDate` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Start date or month as printed, with year | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.fee` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Fee with currency and academic year as printed; else To be confirmed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.eligibilityText` | not-published | — (no lead) | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Eligibility wording verbatim | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `dentistry` — Dentistry (dentistry) | `programmes.dentistry.internationalAdmission`; `programmes.dentistry.language` | No current official page found stating that foreign applicants are admitted to Dentistry. Leads: the VI Faculty page (official, undated, historical) says English-language training for foreigners in Dentistry began in 2008; the Ministry "Study in Ukraine" cost page for the university (government source, undated) lists Dentistry among English-medium master's programmes. Move to programmes[] only after an official university page states current admission. | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `nursing-bachelor` — Nursing (bachelor's programme) (nursing) | `programmes.nursing-bachelor.internationalAdmission`; `programmes.nursing-bachelor.language` | No snippet states that foreign applicants are admitted to Nursing. The Ministry portal's English-medium list for the university (government source, undated) covers only Medicine and Dentistry. | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `nursing-master` — Master's Degree Programme in Nursing (nursing) | `programmes.nursing-master.internationalAdmission`; `programmes.nursing-master.language` | No snippet states that foreign applicants are admitted. | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `public-health` — Public Health («Громадське здоров'я») (public_health) | `programmes.public-health.internationalAdmission`; `programmes.public-health.language` | No snippet states that foreign applicants are admitted. | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `physical-therapy` — Physical Therapy, Occupational Therapy (physical_therapy) | `programmes.physical-therapy.internationalAdmission`; `programmes.physical-therapy.language` | Government-portal lead only: the Ministry "Study in Ukraine" cost table for the university (undated) lists this bachelor programme for international students in its Ukrainian-medium section, with a per-year fee that is not recorded here. No official university page found; move to programmes[] only after an official university page states admission. | [Admission rules and information for foreigners](https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. OPERATING CONDITIONS (gate — answer first): a dated official statement for 2026–27 on where and how the university teaches (location; in person, blended or distance; safety arrangements), and whether international students are currently taught in Kharkiv, elsewhere in Ukraine or remotely. Only 2022 format statements and a September 2025 press interview were found. No other work on this record should be published until this is answered.  
   Closure (fill): 
2. Admission regulations for foreigners for the 2026 intake (only the 2025 regulations surfaced).  
   Closure (fill): 
3. Official postal address and international-office (ESIFC) contacts as printed.  
   Closure (fill): 
4. Exact award title for Medicine (conflicting leads: "Master of Medicine and Doctor of Medicine" and "Doctor in Medicine").  
   Closure (fill): 
5. Whether Dentistry is currently open to foreign applicants, and in which language (historical English start in 2008; Ministry-portal listing only).  
   Closure (fill): 
6. Official tuition fees for foreign applicants, with the academic year and payment schedule (none found on the official domain).  
   Closure (fill): 
7. Application deadlines and intake dates for the current cycle (none found).  
   Closure (fill): 
8. Entrance examinations for the current cycle: subjects, format, pass marks (2025 rules: distance format with video recording).  
   Closure (fill): 
9. Required documents for foreign applicants as currently published (an older invitation page lists a passport copy, an education document with grades and consent to data processing; that page was not identified).  
   Closure (fill): 
10. Preparatory department: language of instruction for the science subjects, whether it serves English-track applicants, progression wording verbatim, fee with year, start date.  
   Closure (fill): 
11. Nursing (bachelor's and master's), Public Health and Physical Therapy: eligibility of international applicants and language; Public Health accreditation after 01.07.2026.  
   Closure (fill): 
12. Whether the university offers Pharmacy at all (no snippet found).  
   Closure (fill): 
13. Accommodation availability and published prices.  
   Closure (fill): 
14. Evidence-backed recognition statements only.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/kharkiv-national-medical-university.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
