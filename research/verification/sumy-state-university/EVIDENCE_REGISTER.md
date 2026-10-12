# Evidence register — Sumy State University (`sumy-state-university`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/sumy-state-university.json`, checked 2026-10-12): **blocked**. Tested on 2026-10-12 (13:02 UTC) from the build environment with curl through its proxy (one HTTPS request to the root address of each host). Hosts: sumdu.edu.ua, int.sumdu.edu.ua, study.sumdu.edu.ua, med.sumdu.edu.ua, inter.med.sumdu.edu.ua, news.sumdu.edu.ua, t1.sumdu.edu.ua (official); universities.studyinukraine.gov.ua, mon.gov.ua, edbo.gov.ua, registry.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua (government and register); www.eqar.eu, data.deqar.eu, wfme.org, search.wdoms.org (international registers and directories). Every host was refused at the environment's proxy under its network policy (curl: "CONNECT tunnel failed, response 403"; HTTP code 000). No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1.

**Record under verification:** `site/src/content/universities/sumy-state-university.json` — 1 programme(s) with an official-domain lead of international admission (Medicine / General Medicine (specialty 222)); 2 deferred programme(s) kept unpublished until eligibility is read (Dentistry / Stomatology (specialty 221), Preventive Medicine (Prophylactic Medicine)).

**Evidence store:** `site/data/evidence/sumy-state-university.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `sumy-state-university--NN--short-name.pdf` where NN is the row number of this register (e.g. `sumy-state-university--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/sumy-state-university.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Homepage](https://sumdu.edu.ua/) | Canonical domain, official name, contacts, current notices on teaching format |  |  |
| 2 | [Admission for foreign applicants (international office)](https://int.sumdu.edu.ua/en/study/251-master.html) | Admission requirements, documents, entry window and application route for foreigners (check date and currency) *(Undated; cites MES order No. 1541 of 01.11.2013)* |  |  |
| 3 | [Foreigners' price list 2023-2024 (PDF)](https://study.sumdu.edu.ua/images/Prices%202023-2024/Prices_Eng_2023-2024.pdf) | Medicine line for foreigners; also find the 2025-2026 / 2026-2027 equivalent on study.sumdu.edu.ua — read before any fee is recorded *(2023-2024 — out of date; the medicine figure was not returned; no figure recorded)* |  |  |
| 4 | [Medical Institute (Department of International Education site)](https://study.sumdu.edu.ua/en/study/institutes-and-faculties/med.html) | Medical Institute programmes for foreigners, contract-based admission, language groups, international accreditation note *(Undated)* |  |  |
| 5 | [Medical Institute (international office site)](https://int.sumdu.edu.ua/en/welcome-to-sumdu/academic-structure/53-medical-institute.html) | Official Medical Institute description, programme list by level and language, foreign student numbers (with date) *(Undated; the first-round reading that Nursing and Public Health bachelor programmes are listed here was not reproduced)* |  |  |
| 6 | [Medical Institute: our specialties](https://med.sumdu.edu.ua/en/our-specialties/) | Specialties and durations (General Medicine, Preventive Medicine, Dentistry) *(The six-year duration lead was not reproduced on re-check)* |  |  |
| 7 | [Medical Institute English homepage](https://med.sumdu.edu.ua/en) | Full official name of the Medical Institute (page title seen only truncated: "Academic and Research ...") |  |  |
| 8 | [Medical Institute history](https://med.sumdu.edu.ua/en/history-of-institute-and-development/) | Medical Faculty 1992, Medical Institute 2005; the 2009 WHO-database claim (a directory claim, not recognition) |  |  |
| 9 | [Medical Institute contacts (job.sumdu.edu.ua)](https://job.sumdu.edu.ua/en/documents/medical-institute/) | Medical Institute address and phone *(Undated)* |  |  |
| 10 | [International accreditation expertise](https://med.sumdu.edu.ua/en/international-accreditation-expertise/) | University's account of the IAAR/NAQA pilot accreditation |  |  |
| 11 | [IAAR certificate for the Medicine Master's (PDF, university-hosted)](https://inter.med.sumdu.edu.ua/wp-content/uploads/2022/09/sumdu_master_medicine_certificate-international-accreditation.pdf) | IAAR certificate: issue date, validity, scope (Medicine 222 Master's), WFME wording *(International accreditation — not NAQA accreditation and not recognition; check at IAAR)* |  |  |
| 12 | [News: NAQA–IAAR pilot accreditation completed](https://news.sumdu.edu.ua/en/en-news/12371-accreditation-assessment-of-the-educational-program-of-the-medical-specialty-according-to-the-pilot-project-of-the-independent-international-agency-national-agency-for-quality-assurance-in-higher-education-and-sumdu-is-completed.html) | Pilot project details, expert visit January 26-28, 2022 *(2022)* |  |  |
| 13 | [EQAR record of the IAAR decision](https://www.eqar.eu/qa-results/search/by-report/report/?id=77762) | Cross-check only: EQAR/DEQAR record of the IAAR programme accreditation decision (22/04/2022) *(European register (third-party), not a Ukrainian authority and not a recognition body)* |  |  |
| 14 | [DEQAR institution record](https://data.deqar.eu/institution/3364) | Cross-check only: DEQAR institution record (identifier UA-national 168, list of accreditation reports) *(Third-party register; not re-checked in the second round)* |  |  |
| 15 | [Residences for foreign students](https://int.sumdu.edu.ua/en/life-ssu/student-campus/residences3) | Residences for foreign students (No. 3, 4, 5), contacts; look for fees *(Undated)* |  |  |
| 16 | [Preparatory department](https://study.sumdu.edu.ua/en/preparatory-department.html) | Preparatory department and Department of International Education details *(Undated)* |  |  |
| 17 | [About the Department of International Education](https://study.sumdu.edu.ua/en/about-us/about-the-department.html) | International department role and contacts; foreign student numbers ("About 1000 foreign citizens from 50 countries") *(Undated)* |  |  |
| 18 | [News: rector interview on wartime operation](https://news.sumdu.edu.ua/en/en-news/12464-sumdu-is-consolidated-and-aimed-at-further-development-rector-vasyl-karpusha.html) | Wartime teaching format (remote from 1 April 2022, shelters, medicine and dentistry near shelters) *(2022 — out of date)* |  |  |
| 19 | [News: Academic Council on activity under martial law](https://news.sumdu.edu.ua/en/en-news/12492-the-academic-council-of-sumdu-has-considered-the-issue-of-university-activities-in-terms-of-martial-law.html) | Academic Council decision on martial-law operation (date and content) *(Likely 2022; content not returned)* |  |  |
| 20 | [News: how foreign students live in war](https://med.sumdu.edu.ua/en/how-foreign-students-live-in-war/) | Foreign-student wartime situation (as of 5 March 2022) *(2022 — out of date)* |  |  |
| 21 | [University hospital](https://study.sumdu.edu.ua/en/students-life/university-hospital.html) | Clinical base statement *(Undated)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [NAQA note on the NAQA–IAAR pilot](https://en.naqa.gov.ua/?p=1739); [Ministry portal: contacts (university 74)](https://universities.studyinukraine.gov.ua/en/minedu/university/74/contacts); [Ministry portal: preparatory department (university 74)](https://universities.studyinukraine.gov.ua/en/minedu/university/74/preparatory-department); [Ministry portal: university 150](https://universities.studyinukraine.gov.ua/en/minedu/university/150)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Sumy State University | [Homepage](https://sumdu.edu.ua/) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://sumdu.edu.ua/ | [Homepage](https://sumdu.edu.ua/) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | unverified | LEAD: email: info@study.sumdu.edu.ua, url: https://study.sumdu.edu.ua/en/about-us/about-the-department.html | [Homepage](https://sumdu.edu.ua/) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | unverified | LEAD: Foreign students live in residences No. 3, 4 and 5. | [Homepage](https://sumdu.edu.ua/) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## C. Programme `medicine` — Medicine / General Medicine (specialty 222) (`programmes[].id = "medicine"`, field medicine)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.medicine.internationalAdmission` | unverified | LEAD: True | [Homepage](https://sumdu.edu.ua/) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.medicine.intakeYear` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.medicine.level` | unverified | LEAD: master | [Homepage](https://sumdu.edu.ua/) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.medicine.specialtyCode` | unverified | LEAD: 222 | [Homepage](https://sumdu.edu.ua/) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.medicine.qualification` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.medicine.durationText` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.medicine.durationYears` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.medicine.language` | unverified | LEAD: English, Ukrainian | [Homepage](https://sumdu.edu.ua/) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.medicine.format` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.medicine.tuition` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.medicine.otherMandatoryCosts.*` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.medicine.deadlines` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.medicine.intake` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.medicine.requirements.*` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim | no evidence recorded |  |  |  |
| `programmes.medicine.documents.*` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## D. Preparatory route `preparatory-department` — Preparatory department (Department of International Education)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `preparatoryRoutes.preparatory-department.languageOfInstruction` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Language(s) the preparatory subjects are taught in | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.englishTrack` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Whether an English-language preparatory track exists (quote) | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.durationText` | unverified | LEAD: 10 months | [Homepage](https://sumdu.edu.ua/) | Duration exactly as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.subjects` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Subject list as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.certificateName` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Name of the certificate awarded, as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.progressionText` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | VERBATIM wording on what completion gives / does not give | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.appliesToEnglishDegreeTrack` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Whether English-track degree applicants use this route | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.startDate` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Start date or month as printed, with year | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.fee` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Fee with currency and academic year as printed; else To be confirmed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-department.eligibilityText` | not-published | — (no lead) | [Homepage](https://sumdu.edu.ua/) | Eligibility wording verbatim | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `dentistry` — Dentistry / Stomatology (specialty 221) (dentistry) | `programmes.dentistry.internationalAdmission`; `programmes.dentistry.language` | No admission lead specific to foreign applicants for Dentistry: the int.sumdu.edu.ua Medical Institute page (international office site) lists Dentistry among Master's programmes (paraphrase), and a 2024 invitation page lists 221 Dentistry with Ukrainian NMT conditions (which may apply to domestic applicants only). No fee line or admission statement for foreign applicants to Dentistry was returned, and the IAAR accreditation is evidenced for Medicine only. Read the official pages before moving it to programmes[]. | [Homepage](https://sumdu.edu.ua/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `preventive-medicine` — Preventive Medicine (Prophylactic Medicine) (other) | `programmes.preventive-medicine.internationalAdmission`; `programmes.preventive-medicine.language` | Only listed among the Medical Institute's specialties ("General Medicine, Preventive Medicine, Dentistry (Stomatology)") on med.sumdu.edu.ua (search-tool summary). Level, specialty code, language and availability to foreign applicants are not stated. | [Homepage](https://sumdu.edu.ua/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Dated official statement for 2026–27 on whether, where and how foreign students are taught (in person in Sumy, blended or distance), including any relocation. The latest official teaching-format evidence is the 2022 rector interview (remote from 1 April 2022); third-party reports describe the 2022 evacuation of international students and strikes on the campus in 2023 and 2025.  
   Closure (fill): 
2. Admission rules for foreign applicants for the 2026 intake: programmes open to foreigners, entrance test or interview, English-proficiency evidence, minimum grades (the admission page found is undated and cites MES order No. 1541 of 01.11.2013; no official 2025 or 2026 rules for foreigners were found).  
   Closure (fill): 
3. Official name in English and Ukrainian (the Ukrainian name was seen only in a third-party headline), the Medical Institute's full official name, and the canonical website (no government source quotes the domain).  
   Closure (fill): 
4. Official postal address: the Ministry portal (Rymskoho-Korsakova Street, 40007), IAU (Mykoly Sumtsova Street, 2) and job.sumdu.edu.ua for the Medical Institute (9 Academichna Street) differ.  
   Closure (fill): 
5. Current international office contacts (the phone numbers found date from 2022).  
   Closure (fill): 
6. FEES: current tuition for foreign Medicine and Dentistry students for 2026/27 (amount, currency, per-period, payment schedule); the medicine figure of the official 2023-2024 list was not returned and third-party figures conflict.  
   Closure (fill): 
7. Application windows and intake dates for foreign applicants for the current year (only an undated "15 September till 15 November" entry window found).  
   Closure (fill): 
8. Required documents for foreign applicants under the current rules (the list found is undated).  
   Closure (fill): 
9. Medicine: exact award title, whether it is a single-cycle (integrated) master's, duration as printed (the six-year lead was not reproduced) and the language tracks open to foreigners for the current intake.  
   Closure (fill): 
10. Registration and licence: EDEBO register entry and licensed specialties (222 Medicine, 221 Dentistry) — none surfaced.  
   Closure (fill): 
11. NAQA accreditation of Medicine (222) and Dentistry (221) from the NAQA register (none found). The IAAR accreditation of the Medicine Master's (22 April 2022 to 21 April 2027 per a search summary of the university-hosted certificate) is an international accreditation: check it at IAAR and keep it separate from NAQA accreditation and from recognition.  
   Closure (fill): 
12. Dentistry: whether foreign applicants are admitted, in which language, duration and award title.  
   Closure (fill): 
13. Preventive Medicine: level, specialty code, language and eligibility of foreign applicants.  
   Closure (fill): 
14. Nursing and Public Health bachelor programmes: a first-round summary listed them among English-taught levels on the int.sumdu Medical Institute page, but the re-check did not reproduce it; confirm whether they exist and admit foreign applicants.  
   Closure (fill): 
15. Preparatory department: language of instruction, English track, subjects, certificate name, progression wording verbatim, start date, fee with year (the 10-month duration rests on the Ministry portal only).  
   Closure (fill): 
16. Accommodation: which residences for foreign students are in use after the reported campus strikes, and published prices with year.  
   Closure (fill): 
17. Number of foreign students is inconsistent and mostly undated (official pages, undated: about 800 from 56 countries and about 1,000 from 50 countries; official, as of March 2022: about 1,700 in the dormitories; third-party: about 1,300 to 1,900, including about 1,400 in a profile updated May 2025).  
   Closure (fill): 
18. Whether the agency name "Sumy State Medical University" refers to SumDU, and which institution Ministry portal entry 150 is.  
   Closure (fill): 
19. IAAR's WFME recognition status (check on WFME's own site); evidence-backed recognition statements only.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/sumy-state-university.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
