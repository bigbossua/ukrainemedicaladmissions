# Evidence register — Petro Mohyla Black Sea National University (`petro-mohyla-black-sea-national-university`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/petro-mohyla-black-sea-national-university.json`, checked 2026-10-12): **blocked**. Tested on 2026-10-12 (13:02 UTC) from the build environment with curl through its proxy (one HTTPS request to the root address of each host). Hosts: chmnu.edu.ua (official); universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua (government and register). Every host was refused at the environment's proxy under its network policy (curl: "CONNECT tunnel failed, response 403"; HTTP code 000). No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1.

**Record under verification:** `site/src/content/universities/petro-mohyla-black-sea-national-university.json` — 1 programme(s) with an official-domain lead of international admission (Medicine (specialty 222)); 1 deferred programme(s) kept unpublished until eligibility is read (Pharmacy).

**Evidence store:** `site/data/evidence/petro-mohyla-black-sea-national-university.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `petro-mohyla-black-sea-national-university--NN--short-name.pdf` where NN is the row number of this register (e.g. `petro-mohyla-black-sea-national-university--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/petro-mohyla-black-sea-national-university.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Full fee table for foreigners including the Medicine (and any Pharmacy) row, the Academic Council Minutes No. 11 of 29 August 2025, payment terms and the language-of-instruction statement — read before any fee is recorded *(Fees approved 29 August 2025; the Medicine figure was not shown in any snippet; no figure recorded)* |  |  |
| 2 | [Foreign Students](https://chmnu.edu.ua/en/foreign-students/) | Entry windows (1 November / 1 March) with their year, admission bases, programme list for foreigners *(Undated; no date recorded)* |  |  |
| 3 | [Peculiarities of admission](https://chmnu.edu.ua/peculiarities-of-admission/) | Admission rules for foreigners, requirements and documents *(Undated)* |  |  |
| 4 | [Applicant handbook ('dovidnik abituriyenta')](https://chmnu.edu.ua/dovidnik-abituriyenta) | Current admission rules and deadlines *(Content not shown in results)* |  |  |
| 5 | [Preparatory department](https://chmnu.edu.ua/preparatory-department/) | Duration, fee, language, entry requirements and the progression wording verbatim *(Undated)* |  |  |
| 6 | [NAQA decision of 26 December 2023 (PDF, university-hosted)](https://chmnu.edu.ua/wp-content/uploads/222_Rishennya_Natsionalnogo_agentstva.pdf) | Programme name, accreditation type and term (protocol No. 21 (50)); then confirm on the NAQA register *(Not confirmed to cover Medicine (222); only the file name suggests it)* |  |  |
| 7 | [Medicine programme document, English (PDF)](https://chmnu.edu.ua/wp-content/uploads/OPP_222_Medicine-2021-3.pdf) | Language, duration, admission conditions; check for a newer edition *(2021 — may be superseded)* |  |  |
| 8 | [Medicine programme document, Ukrainian (PDF)](https://chmnu.edu.ua/wp-content/uploads/OPP-222-Meditsina-2021.pdf) | Level, 360 ECTS credits, six-year term *(2021 — may be superseded)* |  |  |
| 9 | [General information](https://chmnu.edu.ua/general_information/) | Official name, history, status; the membership claims (EUA, MCU, WHO, Medical Council of India), which are not recognition *(Discovery-stage figures (first medical university in the region in 2016; more than 2,500 foreign students) were not reproduced on re-check and are not recorded)* |  |  |
| 10 | [History of the university](https://chmnu.edu.ua/en/history-of-our-university/) | Founding year (search summary: 2002; Wikipedia: 17 January 1996) and status history |  |  |
| 11 | [University structure](https://chmnu.edu.ua/university-structure) | Exact official name of the Medical Institute and its departments |  |  |
| 12 | [International activities](https://chmnu.edu.ua/mizhnarodna-diyalnist/) | International office contacts, foreign-student information, the statement on a licence to train foreign students *(Undated)* |  |  |
| 13 | [News (page 2)](https://chmnu.edu.ua/category/zapisi/novini/page/2) | News and orders on the current teaching format (in person, blended, online) and shelter arrangements |  |  |
| 14 | [Strategic plan 2025–2029 (PDF)](https://chmnu.edu.ua/wp-content/uploads/Strategichnij_plan_CHNU_2025-2029.pdf) | Any statement on wartime operation and teaching mode *(No snippet mentioned distance or blended teaching or shelters)* |  |  |
| 15 | [osvita.ua directory entry](https://osvita.ua/vnz/guide/351/) | Cross-check only (THIRD-PARTY): address, telephone and website as listed *(Third-party; address conflicts with the Ministry portal)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [Ministry portal: contacts (university 13)](https://universities.studyinukraine.gov.ua/en/minedu/university/13/contacts); [Ministry portal: student feedback (university 13)](https://universities.studyinukraine.gov.ua/en/minedu/university/13/student-feedback)

Third-party pages (leads only, never a source): [vstup.osvita.ua 2024 Medicine listing](https://vstup.osvita.ua/y2024/r15/265/840428/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Petro Mohyla Black Sea National University | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://chmnu.edu.ua/ | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## C. Programme `medicine` — Medicine (specialty 222) (`programmes[].id = "medicine"`, field medicine)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.medicine.internationalAdmission` | unverified | LEAD: True | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.medicine.intakeYear` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.medicine.level` | unverified | LEAD: master | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.medicine.specialtyCode` | unverified | LEAD: 222 | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.medicine.qualification` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.medicine.durationText` | unverified | LEAD: 6 years | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.medicine.durationYears` | unverified | LEAD: 6 | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.medicine.language` | unverified | LEAD: English, Ukrainian | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.medicine.format` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.medicine.tuition` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.medicine.otherMandatoryCosts.*` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.medicine.deadlines` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.medicine.intake` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.medicine.requirements.*` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim | no evidence recorded |  |  |  |
| `programmes.medicine.documents.*` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## D. Preparatory route `pre-university-department` — Pre-University Department (preparatory department)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `preparatoryRoutes.pre-university-department.languageOfInstruction` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Language(s) the preparatory subjects are taught in | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.englishTrack` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Whether an English-language preparatory track exists (quote) | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.durationText` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Duration exactly as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.subjects` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Subject list as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.certificateName` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Name of the certificate awarded, as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.progressionText` | unverified | LEAD: as a result of the successful completion of the Pre-University Department, foreign citizens and students without citizenship receive an official certificate, which allows admission to the specialty of their choice | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | VERBATIM wording on what completion gives / does not give | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.appliesToEnglishDegreeTrack` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Whether English-track degree applicants use this route | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.startDate` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Start date or month as printed, with year | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.fee` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Fee with currency and academic year as printed; else To be confirmed | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.eligibilityText` | not-published | — (no lead) | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Eligibility wording verbatim | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `pharmacy` — Pharmacy (pharmacy) | `programmes.pharmacy.internationalAdmission`; `programmes.pharmacy.language` | Lead only (adversarial re-check, 2026-10-12): a search-tool paraphrase of the official fee page for foreigners (fees approved 29 August 2025) mentions a five-year Pharmacy track; the wording was not quoted verbatim and no fee figure was shown. Read the official fee page and the admission rules for foreigners before moving it to programmes[]. | [Conditions and tuition fees (foreigners)](https://chmnu.edu.ua/conditions-and-tuition-fees/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Dated official statement for 2026–27 on whether, where and how foreign students are taught (in person in Mykolaiv, blended or distance), including the state of the main building, the University Clinic and the clinical training bases after the August 2022 missile damage. No 2025 or 2026 official statement was found; the latest lead is a January 2024 DAAD Studybridge report (third-party, attribution to this university unverified) saying most courses were taught online.  
   Closure (fill): 
2. FEES: Medicine tuition for foreign students for 2026/27 (amount, currency, per-period, payment schedule). The official fee table approved by the Academic Council on 29 August 2025 exists, but the Medicine row was not shown in any result; third-party figures are not recorded.  
   Closure (fill): 
3. Language of instruction for Medicine: whether an English-medium track is open to foreign applicants for the current intake (the fee page says "Training is conducted in Ukrainian and English" for training generally; the 2021 programme document says Ukrainian and English).  
   Closure (fill): 
4. Medicine: exact award title, whether the university classifies it as a single-cycle (integrated) master's, and whether the 2021 programme documents (OPP 222: 360 ECTS, six years) have been superseded.  
   Closure (fill): 
5. Admission rules for foreign applicants for the 2026 intake, including the requirements for Medicine (school subjects, grades, language proficiency, entrance test or interview); the admission page found names only laws and ministry orders.  
   Closure (fill): 
6. Required documents for foreign applicants under the current rules (only a generic third-party checklist found).  
   Closure (fill): 
7. Application windows and intake dates for foreign applicants: the official Foreign Students page gives entry until 1 November and until 1 March with no year, and does not confirm they apply to Medicine.  
   Closure (fill): 
8. Registration and licence: the EDEBO register entry for the university and the licence for specialty 222 Medicine (none seen). The university's own statement that it "has a license to train foreign students" carries no date or licence number.  
   Closure (fill): 
9. NAQA accreditation of Medicine (222) from the NAQA register: the university-hosted NAQA decision of 26 December 2023 (protocol No. 21 (50)) does not visibly name the programme, the accreditation type or the term.  
   Closure (fill): 
10. International accreditation (for example by a WFME-aligned agency): none found; keep it separate from NAQA accreditation and from recognition.  
   Closure (fill): 
11. Recognition: evidence-backed statements from destination-country regulators only (only each country's regulator can establish eligibility for professional registration). The university's and the Ministry portal's claims of WHO and Medical Council of India membership or recognition are not recognition; no WDOMS directory check was performed.  
   Closure (fill): 
12. Official name in English and Ukrainian (the Ukrainian name was seen only on a third-party site), the founding year (Wikipedia: 17 January 1996 as the Mykolaiv branch of NaUKMA; official history page summary: 2002) and the exact official English name of the Medical Institute.  
   Closure (fill): 
13. Official postal address: osvita.ua (third-party: вул. Перша Воєнна, 1) and the Ministry portal contacts page (68 Desantnykiv Street, 10, 54003) differ; not evidence of relocation.  
   Closure (fill): 
14. International office contacts (none in results; the Ministry portal lists an international department phone line whose number was not captured).  
   Closure (fill): 
15. Whether Ministry "Study in Ukraine" portal entry 13 is this university (its contacts page came up for an exact-name query, but the snippet did not quote the name verbatim).  
   Closure (fill): 
16. Pharmacy: whether a programme is open to foreign applicants, with level, specialty code, duration as printed and language (only a paraphrased "five-year Pharmacy track" lead from the fee page).  
   Closure (fill): 
17. Preparatory department: duration, fee with year, language of instruction, English track, subjects, certificate name, start date, entry requirements and the progression wording verbatim.  
   Closure (fill): 
18. Accommodation: hostel availability and published prices with year (no official information found).  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/petro-mohyla-black-sea-national-university.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
