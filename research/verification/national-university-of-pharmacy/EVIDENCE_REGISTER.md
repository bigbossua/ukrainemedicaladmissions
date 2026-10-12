# Evidence register — National University of Pharmacy (`national-university-of-pharmacy`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/national-university-of-pharmacy.json`, checked 2026-10-12): **blocked**. Tested on 2026-10-12 (13:02 UTC) from the build environment with curl through its proxy (one HTTPS request to the root address of each host). Hosts: official hosts nuph.edu.ua, en.nuph.edu.ua, pat.nuph.edu.ua, college.nuph.edu.ua; government and register hosts registry.edbo.gov.ua, naqa.gov.ua, public.naqa.gov.ua, studyinukraine.gov.ua, universities.studyinukraine.gov.ua, mon.gov.ua, moz.gov.ua. Every host was refused at the environment's proxy under its network policy (curl: "CONNECT tunnel failed, response 403"; HTTP code 000). No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1.

**Record under verification:** `site/src/content/universities/national-university-of-pharmacy.json` — 1 programme(s) with an official-domain lead of international admission (Pharmacy); 3 deferred programme(s) kept unpublished until eligibility is read (Clinical Pharmacy, Industrial Pharmacy (Pharmaceutical technologies), Laboratory diagnostics (specialty 224 Technologies of medical diagnostics and treatment)).

**Evidence store:** `site/data/evidence/national-university-of-pharmacy.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `national-university-of-pharmacy--NN--short-name.pdf` where NN is the row number of this register (e.g. `national-university-of-pharmacy--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/national-university-of-pharmacy.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | 2025-2026 fee and duration schedule for foreign citizens: programme titles, levels, durations, language columns, currency, full-time/part-time — read before any fee, duration or level is recorded *(Dated 01.05.2025; not reproduced in the re-check search; out of date for 2026-27)* |  |  |
| 2 | [Fee schedule for foreign citizens, 2024-2025 (PDF)](https://en.nuph.edu.ua/wp-content/uploads/2024/06/2.Specialties-and-training-cost_04.06.2024р.pdf) | 2024-2025 fee schedule, for comparison and dating *(Out of date)* |  |  |
| 3 | [Study for foreign citizens (English and Ukrainian tracks)](https://en.nuph.edu.ua/?p=433) | English (5-year) and Ukrainian (6-year) tracks, July 01 to October 31 admission window, year-round Pre-University intake, hostel statement; capture the page date *(Undated; the 5-year English and 6-year Ukrainian track leads were not reproduced in the re-check search)* |  |  |
| 4 | [Dean of the Faculty for Foreign Citizens' Education](https://en.nuph.edu.ua/?p=953) | "Accredited specialties" self-claim, Kharkiv "safe place to study" statement, hostel guarantee, any date *(Undated)* |  |  |
| 5 | [For holders of a Pre-University Certificate from another university](https://en.nuph.edu.ua/?p=703) | Rules for applicants holding a Pre-University Certificate from another university |  |  |
| 6 | [Faculties](https://en.nuph.edu.ua/faculties/) | Faculty for Foreign Citizens' Education: contacts (indek@ vs interdep@), programmes |  |  |
| 7 | [Basic information about activities](https://nuph.edu.ua/information-about-activities) | Basic institutional information: study modes, languages, Ministry of Health laboratory reference, any licence or accreditation data *(Undated)* |  |  |
| 8 | [English site page titled "National University of Pharmacy"](https://en.nuph.edu.ua/?p=13964) | Official name, history (1812 laboratory, 1921 institute), fields of knowledge and specialties, staff numbers; canonical domain *(Undated)* |  |  |
| 9 | [Newsletter 2019](https://en.nuph.edu.ua/?p=13610) | 2019 newsletter: foreign student numbers (1.5 thousand from 43 countries) *(2019 — out of date; attribution uncertain; not reproduced in the re-check search)* |  |  |
| 10 | [History of international education](https://en.nuph.edu.ua/?p=124) | History of international education at the university |  |  |
| 11 | [Department notice: distance learning during quarantine (2020)](https://pat.nuph.edu.ua/en/information-for-the-foreign-educational-applicants-about-distance-learning-during-quarantine) | 2020 quarantine distance-learning notice (context only; pre-war) *(2020 — out of date)* |  |  |
| 12 | [Professional college programme document 2023-2024 (PDF)](https://college.nuph.edu.ua/wp-content/uploads/2024/05/МБ-2023-2024.pdf) | Domain basis (college subdomain); junior-bachelor Pharmacy programme of the university's professional college — an internal development document, not an accreditation decision *(Concerns the college, not the university's degree programmes)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [Study in Ukraine portal listing (ID 41)](https://universities.studyinukraine.gov.ua/en/minedu/university/41); [Study in Ukraine portal: international partners (ID 41)](https://universities.studyinukraine.gov.ua/en/minedu/university/41/international-partners)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: National University of Pharmacy | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://nuph.edu.ua/ | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## C. Programme `pharmacy` — Pharmacy (`programmes[].id = "pharmacy"`, field pharmacy)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.pharmacy.internationalAdmission` | unverified | LEAD: True | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.pharmacy.intakeYear` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.pharmacy.level` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.pharmacy.specialtyCode` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.pharmacy.qualification` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.pharmacy.durationText` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.pharmacy.durationYears` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.pharmacy.language` | unverified | LEAD: English | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.pharmacy.format` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.pharmacy.tuition` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.pharmacy.otherMandatoryCosts.*` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.pharmacy.deadlines` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.pharmacy.intake` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.pharmacy.requirements.*` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim | no evidence recorded |  |  |  |
| `programmes.pharmacy.documents.*` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## D. Preparatory route `pre-university-department` — Pre-University Department

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `preparatoryRoutes.pre-university-department.languageOfInstruction` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Language(s) the preparatory subjects are taught in | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.englishTrack` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Whether an English-language preparatory track exists (quote) | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.durationText` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Duration exactly as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.subjects` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Subject list as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.certificateName` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Name of the certificate awarded, as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.progressionText` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | VERBATIM wording on what completion gives / does not give | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.appliesToEnglishDegreeTrack` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Whether English-track degree applicants use this route | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.startDate` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Start date or month as printed, with year | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.fee` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Fee with currency and academic year as printed; else To be confirmed | no evidence recorded |  |  |  |
| `preparatoryRoutes.pre-university-department.eligibilityText` | not-published | — (no lead) | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Eligibility wording verbatim | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `clinical-pharmacy` — Clinical Pharmacy (pharmacy) | `programmes.clinical-pharmacy.internationalAdmission`; `programmes.clinical-pharmacy.language` | No quoted official statement that foreign applicants are admitted to this programme. Lead only: a search-tool summary (paraphrase) of the 2025-2026 foreign-student fee schedule PDF lists Clinical Pharmacy, taught in English (original search round only; not reproduced in the re-check search, not refuted). Read the official fee schedule and programme list before moving it to programmes[]. | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `industrial-pharmacy` — Industrial Pharmacy (Pharmaceutical technologies) (pharmacy) | `programmes.industrial-pharmacy.internationalAdmission`; `programmes.industrial-pharmacy.language` | No quoted official statement that foreign applicants are admitted to this programme. Lead only: a search-tool summary (paraphrase) of the 2025-2026 foreign-student fee schedule PDF lists English-medium part-time tuition for Industrial Pharmacy (Pharmaceutical technologies) (original search round only; not reproduced in the re-check search, not refuted). | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `laboratory-diagnostics` — Laboratory diagnostics (specialty 224 Technologies of medical diagnostics and treatment) (other) | `programmes.laboratory-diagnostics.internationalAdmission`; `programmes.laboratory-diagnostics.language` | No quoted official statement that foreign applicants are admitted to this programme. Leads: the 2025-2026 foreign-student fee schedule PDF lists it with a Ukrainian-medium figure (original search round only; not reproduced in the re-check search, not refuted); the Study in Ukraine portal listing (ID 41, tool summary, undated) lists specialties in medical diagnostics and treatment. Read the official pages before moving it to programmes[]. | [Fee and duration schedule for foreign citizens, 2025-2026 (PDF)](https://nuph.edu.ua/wp-content/uploads/2020/07/2.specialties-and-training-cost_01.05.2025r.pdf) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. OPERATING CONDITIONS (gate — answer first): a dated official statement for 2026–27 on whether, where and how foreign students are taught (in Kharkiv, elsewhere in Ukraine or remotely; in person, blended or distance). Only an undated official invitation describing Kharkiv as a safe place to study, an undated list of study modes and a pre-war 2020 quarantine notice were found. No other part of this record should be published until this is answered.  
   Closure (fill): 
2. Official name in English and Ukrainian (the Ukrainian name was seen only on a third-party listing; whether "National Pharmaceutical University" is an official alternative English name is not confirmed), canonical website and official postal address.  
   Closure (fill): 
3. Current admissions contact for foreign applicants: conflicting e-mail addresses interdep@nuph.edu.ua and indek@nuph.edu.ua (not reproduced in the re-check).  
   Closure (fill): 
4. Founding year: the official site gives 1812 (pharmaceutical laboratory at Kharkiv Imperial University) and 1921 (first pharmaceutical institute); third-party profiles give 1805.  
   Closure (fill): 
5. Which ministry the university reports to, from a government source (only an official-page reference to a Ministry of Health laboratory and a third-party statement that the college is subordinate to the Ministry of Health).  
   Closure (fill): 
6. Registration and licence: the EDEBO register entry and the Ministry of Education and Science licence record (none retrieved). Keep separate from accreditation and recognition.  
   Closure (fill): 
7. NAQA programme accreditation for Pharmacy and any other programme open to foreigners, from the NAQA register or the official certificate ("accredited specialties" is an undated self-claim naming no body or decision).  
   Closure (fill): 
8. International accreditation: none found (an international accreditation is not recognition).  
   Closure (fill): 
9. Recognition: no claims found and WDOMS status not checked; record only evidence-backed statements from a destination-country recognition authority.  
   Closure (fill): 
10. FEES: no 2026-2027 fee schedule found; the latest official figures are for 2025-2026 and that PDF was not reproduced in the re-check. Find the dated official schedule for 2026/27 (amount, currency, per-period, payment schedule); the Laboratory diagnostics figure (2700) has no stated currency; third-party figures (UAH ranges; "minimum 5,000 USD") conflict with the official schedule.  
   Closure (fill): 
11. Application windows and intake dates for foreign applicants for the 2026 intake: the July 01 to October 31 window and the year-round Pre-University intake come from undated pages; the Study in Ukraine portal describes windows ending 31 October and 28 February (possible February intake, unconfirmed).  
   Closure (fill): 
12. Entry requirements for foreign applicants (minimum qualifications, entrance tests, language proficiency) and required documents: none found.  
   Closure (fill): 
13. Pharmacy: level ("master's" is a tool summary, not quoted), specialty code (226.01 in the not-reproduced fee PDF), exact award title, duration conflict (5 years on the faculty page vs 4 years 10 months in the fee tables), and languages open to foreigners (Ukrainian-medium track; whether Russian-medium teaching is still offered).  
   Closure (fill): 
14. Clinical Pharmacy, Industrial Pharmacy (Pharmaceutical technologies; level and duration not stated) and Laboratory diagnostics (224, bachelor, Ukrainian column only): whether each is open to foreign applicants, with level, language and duration.  
   Closure (fill): 
15. Programme scope: no Medicine, Dentistry or Medical Psychology programme was found; confirm from the official programme list that the university offers pharmacy and related programmes only.  
   Closure (fill): 
16. Study in Ukraine portal listing (ID 41): read the listing itself (website, specialties, levels, languages, intake windows); it is a directory listing, not an EDEBO, licence or NAQA record.  
   Closure (fill): 
17. Pre-University Department: language of instruction, whether it serves English-track applicants, certificate name, progression wording verbatim, duration, start date, fee with year.  
   Closure (fill): 
18. Accommodation: current hostel availability for foreign students and published prices with year (undated leads say every incoming foreign student gets a hostel place).  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/national-university-of-pharmacy.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
