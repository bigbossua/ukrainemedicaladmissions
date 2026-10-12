# Evidence register — Taras Shevchenko National University of Kyiv (`taras-shevchenko-national-university-of-kyiv`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/taras-shevchenko-national-university-of-kyiv.json`, checked 2026-10-12): **blocked**. Tested on 2026-10-12 (13:02 UTC) from the build environment with curl through its proxy (one HTTPS request to the root address of each host). Hosts: knu.ua, biomed.knu.ua, pdis.knu.ua (official); registry.edbo.gov.ua, naqa.gov.ua, studyinukraine.gov.ua, mon.gov.ua (government and register). Every host was refused at the environment's proxy under its network policy (curl: "CONNECT tunnel failed, response 403"; HTTP code 000). No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1.

**Record under verification:** `site/src/content/universities/taras-shevchenko-national-university-of-kyiv.json` — 1 programme(s) with an official-domain lead of international admission (Medicine (specialty 222)); 1 deferred programme(s) kept unpublished until eligibility is read (Laboratory diagnostics (bachelor's track)).

**Evidence store:** `site/data/evidence/taras-shevchenko-national-university-of-kyiv.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `taras-shevchenko-national-university-of-kyiv--NN--short-name.pdf` where NN is the row number of this register (e.g. `taras-shevchenko-national-university-of-kyiv--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/taras-shevchenko-national-university-of-kyiv.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Foreign-student programme list: Medicine 222 in English, places ("201"), six-year term, host unit; capture the page date or admission year and any fee shown *(Undated; sits under a "bachelor" URL although other sources describe Medicine as a master's)* |  |  |
| 2 | [English Master's Programme in Medicine (biomed.knu.ua)](https://biomed.knu.ua/ukreducational-program/medicine-eng.html) | Level, ECTS, duration, language, the "recognized in the EU" claim, any version date or accreditation note *(First-round lead only: neither this URL nor its 360-ECTS quote was reproduced on re-check)* |  |  |
| 3 | [Department of Clinical Medicine: English medicine programme page](https://biomed.knu.ua/institute-activity/educational/kafedry/kafedra-klinichnoi-medytsyny/osvitnia-diialnist/medicine-eng.html) | Language of instruction, clinical training, date; the 2017 start of recruitment for «Medicine» *(Appeared on re-check; its snippet does not state the teaching language)* |  |  |
| 4 | [Medicine educational programme documents](https://biomed.knu.ua/medicine/educational-program.html) | Edition year, guarantor, EDEBO ID, any accreditation reference |  |  |
| 5 | [Institute 2020 English booklet (PDF)](https://biomed.knu.ua/images/stories/Upload/Buklet/2020/ESC_Institute_Biology_Medicine_2020_ENGred.pdf) | Programmes, languages, durations (including the laboratory diagnostics bachelor's track), history *(2020 — check against current pages)* |  |  |
| 6 | [Educational and Scientific Center "Institute of Biology and Medicine"](https://knu.ua/en/departments/bm/) | Official unit name, address (Hlushkova Avenue), phone, departments, dormitory statements *(Undated)* |  |  |
| 7 | [Training of foreigners and preparatory faculty](https://knu.ua/en/abit/training) | Foreigner admission procedure (1998 decree reference) and preparatory faculty description *(Undated)* |  |  |
| 8 | [Admission policy for foreigners (2013)](https://knu.ua/en/abit/rules_inoz_2013) | Languages of training and interview-based enrolment; confirm whether superseded *(URL suggests 2013 — likely out of date)* |  |  |
| 9 | [English homepage](https://knu.ua/en/) | Admission of foreign nationals timeline (invitation, visa, application, residence permit; in person or remote); official name and canonical domain |  |  |
| 10 | [pdis.knu.ua](https://pdis.knu.ua/en/) | Identify the role of this subdomain (possible international or preparatory unit) and any fees or contacts for foreigners *(Content not shown in results)* |  |  |
| 11 | [EDEBO register](https://registry.edbo.gov.ua/) | Register entry for the university: licence for 222 Medicine and licensed volume, including for foreign citizens *(Exact URL not shown in results)* |  |  |
| 12 | [EDEBO admission offer 2018: Магістр, (222) Медицина, Денна](https://vstup2018.edbo.gov.ua/offer/504922/) | Cross-check only (government admission portal): 2018 full-time master's offer in 222 Medicine at the Institute, licensed capacity and state-funded places *(2018 — out of date; an admission offer, not a register entry)* |  |  |
| 13 | [Rector's report 2021 (PDF, univ.kiev.ua)](https://www.univ.kiev.ua/pdfs/zvit/zvit-rektora-2021.pdf) | Confirm univ.kiev.ua as a legacy domain of the university *(2021)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [NAQA](https://naqa.gov.ua/); [Study in Ukraine portal](https://studyinukraine.gov.ua/); [NAQA expert report, KNU Biology programme (PDF)](https://naqa.gov.ua/wp-content/uploads/2025/10/%D0%95%D0%BA%D1%81%D0%BF%D0%B5%D1%80%D1%82%D0%BD%D0%B8%D0%B9-%D0%B2%D0%B8%D1%81%D0%BD%D0%BE%D0%B2%D0%BE%D0%BA-%D0%93%D0%95%D0%A0-09-%D0%91%D1%96%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F-%D0%9A%D0%9D%D0%A3_%D0%A8%D0%B5%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%B0.pdf); [MON higher-education standard, 222 Medicine, master's level (PDF)](https://mon.gov.ua/static-objects/mon/sites/1/vishcha-osvita/zatverdzeni%20standarty/2021/11/09/222-Medytsyna.mahistr.09.11.pdf)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Taras Shevchenko National University of Kyiv | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://knu.ua/ | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## C. Programme `medicine` — Medicine (specialty 222) (`programmes[].id = "medicine"`, field medicine)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.medicine.internationalAdmission` | unverified | LEAD: True | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.medicine.intakeYear` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.medicine.level` | unverified | LEAD: master | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.medicine.specialtyCode` | unverified | LEAD: 222 | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.medicine.qualification` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.medicine.durationText` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.medicine.durationYears` | unverified | LEAD: 6 | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.medicine.language` | unverified | LEAD: English | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.medicine.format` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.medicine.tuition` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.medicine.otherMandatoryCosts.*` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.medicine.deadlines` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.medicine.intake` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.medicine.requirements.*` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim | no evidence recorded |  |  |  |
| `programmes.medicine.documents.*` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## D. Preparatory route `preparatory-faculty` — Preparatory faculty

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `preparatoryRoutes.preparatory-faculty.languageOfInstruction` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Language(s) the preparatory subjects are taught in | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-faculty.englishTrack` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Whether an English-language preparatory track exists (quote) | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-faculty.durationText` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Duration exactly as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-faculty.subjects` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Subject list as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-faculty.certificateName` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Name of the certificate awarded, as printed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-faculty.progressionText` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | VERBATIM wording on what completion gives / does not give | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-faculty.appliesToEnglishDegreeTrack` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Whether English-track degree applicants use this route | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-faculty.startDate` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Start date or month as printed, with year | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-faculty.fee` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Fee with currency and academic year as printed; else To be confirmed | no evidence recorded |  |  |  |
| `preparatoryRoutes.preparatory-faculty.eligibilityText` | not-published | — (no lead) | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Eligibility wording verbatim | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `laboratory-diagnostics` — Laboratory diagnostics (bachelor's track) (other) | `programmes.laboratory-diagnostics.internationalAdmission`; `programmes.laboratory-diagnostics.language` | No result shows that foreign applicants are admitted to this programme (the only lead is the 2020 booklet). Read the official pages before moving it to programmes[]. | [Programmes for foreign citizens (knu.ua)](https://knu.ua/en/inter-stud/degrees-and-programs/bachelor) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Dated official statement for 2026–27 on whether, where and how foreign students are taught (in person in Kyiv, blended or distance) at the Institute of Biology and Medicine. No dated statement on teaching format or wartime arrangements for 2022–2026 was found; the only dated official-structure lead is a NAQA Biology report uploaded 2025/10.  
   Closure (fill): 
2. Which admission year the knu.ua foreign-citizens listing (Medicine 222, English, six-year term, "201 places") refers to, and whether 201 is a licensed volume or an actual intake.  
   Closure (fill): 
3. Admission rules for foreign applicants for the 2026 intake: Medicine-specific requirements (entrance exam or interview subjects, minimum school grades), and whether the 2013 admission policy (interview-based enrolment; Ukrainian, Russian or English at the student's option) and the 1998-decree procedure are superseded.  
   Closure (fill): 
4. Official name in English and Ukrainian (the Ukrainian name was seen only on third-party aggregator cards), the Institute's official name, and the canonical website (knu.ua; univ.kiev.ua appears to be a legacy domain).  
   Closure (fill): 
5. Medicine level and award: whether it is a single-cycle (integrated) master's (listed under a "bachelor" URL on knu.ua; master's on the 2018 EDEBO offer and elsewhere), the exact award title, and the duration as printed (the "360 ECTS credits, 6 academic years" quote was not reproduced).  
   Closure (fill): 
6. Language: English for Medicine rests on the undated knu.ua foreign-citizens table only; confirm the language tracks open to foreign applicants for the current intake.  
   Closure (fill): 
7. FEES: tuition for foreign Medicine students for 2026/27 (amount, currency, per-period, payment schedule) — none found; only domestic contract figures on a third-party aggregator.  
   Closure (fill): 
8. Required documents, application windows and intake dates for foreign applicants for 2026/27 (none found; the Philology November 2025 exam reference is not about Medicine).  
   Closure (fill): 
9. Registration and licence: the EDEBO register entry for the university and the licence for 222 Medicine with its licensed volume, including for foreign citizens (only a 2018 EDEBO admission offer was seen).  
   Closure (fill): 
10. NAQA accreditation of the university's 222 Medicine programme (certificate number, validity) from the NAQA register — none found; no international accreditation found. Keep registration, licence, NAQA accreditation, international accreditation and recognition separate.  
   Closure (fill): 
11. Ministry of Education and Study in Ukraine portal listings (none seen), and the Institute's role, if any, in the Ministry's 222 Medicine standard (Order No. 1197 of 08.11.2021).  
   Closure (fill): 
12. World Directory of Medical Schools entry (not found in results — access limitation); a directory listing is not recognition.  
   Closure (fill): 
13. Recognition: only the university's own "recognized in the EU" claim (not reproduced). Evidence-backed recognition statements only, from destination-country regulators.  
   Closure (fill): 
14. International office or foreign-student department contact for the Institute; the role of pdis.knu.ua.  
   Closure (fill): 
15. Official postal address of the university (the Hlushkova Avenue lead is the Institute's; house number not returned).  
   Closure (fill): 
16. Accommodation: whether Dormitories No. 9 and No. 12 house foreign students, and published prices with year.  
   Closure (fill): 
17. Preparatory faculty: whether it offers a medical-biological track in English or only Ukrainian/Russian language preparation; official name, certificate, progression wording verbatim, start date, fee with year.  
   Closure (fill): 
18. Laboratory diagnostics bachelor's track (2020 booklet only): whether it is current and whether foreign applicants are admitted.  
   Closure (fill): 
19. Clinical training bases and the language of clinical training.  
   Closure (fill): 
20. Number of foreign students currently enrolled.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/taras-shevchenko-national-university-of-kyiv.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
