# Evidence register — Bohdan Khmelnytsky National University of Cherkasy (`bohdan-khmelnytsky-national-university-of-cherkasy`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/bohdan-khmelnytsky-national-university-of-cherkasy.json`, checked 2026-10-12): **blocked**. Tested on 2026-10-12 (13:02 UTC) from the build environment with curl through its proxy (one HTTPS request to the root address of each host). Hosts: cdu.edu.ua, www.cdu.edu.ua (official); universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua (government and register); vstup.osvita.ua (third-party aggregator). Every host was refused at the environment's proxy under its network policy (curl: "CONNECT tunnel failed, response 403"; HTTP code 000). No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1.

**Record under verification:** `site/src/content/universities/bohdan-khmelnytsky-national-university-of-cherkasy.json` — 1 programme(s) with an official-domain lead of international admission (Medicine); 0 deferred programme(s) kept unpublished until eligibility is read (none).

**Evidence store:** `site/data/evidence/bohdan-khmelnytsky-national-university-of-cherkasy.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `bohdan-khmelnytsky-national-university-of-cherkasy--NN--short-name.pdf` where NN is the row number of this register (e.g. `bohdan-khmelnytsky-national-university-of-cherkasy--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/bohdan-khmelnytsky-national-university-of-cherkasy.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Homepage](https://www.cdu.edu.ua/) | Official name and canonical domain, list of faculties and institutes (including the Medical Institute), current notices on teaching format |  |  |
| 2 | [Medical Institute](https://cdu.edu.ua/en/departments/medical-institute.html) | Exact name and place of the Medical Institute in the university's structure; admission of foreign nationals and stateless persons *(Undated)* |  |  |
| 3 | [Medical Institute: Educational Program](https://cdu.edu.ua/en/departments/medical-institute/educational-program.html) | Medicine: level, award title ("Doctor of Medicine" per search summary), specialty code, duration, language of instruction, eligibility of foreign nationals *(Undated; duration, fees, specialty code, licence and accreditation were not in the returned text)* |  |  |
| 4 | [Application Instructions (international applicants)](https://cdu.edu.ua/en/information/for-international-applicants/application-instructions.html) | Required documents for foreign applicants (education certificate, translation, notarisation, legalisation, health certificate, insurance, photos) *(Undated)* |  |  |
| 5 | [Contact us (international applicants)](https://cdu.edu.ua/en/information/for-international-applicants/contact-us.html) | Center of International Education address and phone; international office e-mail *(Undated)* |  |  |
| 6 | [EDEBO register entry (university 101)](https://registry.edbo.gov.ua/university/101) | State registration: official names (Ukrainian and English), ownership, website; then the licensed specialties (whether Medicine, 222 or its current-classifier equivalent, is licensed) *(Registration is not a licence or accreditation; no registry date returned)* |  |  |
| 7 | [Agency page: MBBS (rmcedu.com)](https://www.rmcedu.com/mbbs-abroad/mbbs-in-ukraine/cherkasy-national-university/) | Capture only (THIRD-PARTY agency, Indian market): the "MBBS", USD 37,200 total, six-year and NMC/WHO approval claims as stated, for comparison against official records; never evidence *(Agency claims; not searched again on re-check; none recorded)* |  |  |
| 8 | [Agency page: university profile (rmcedu.com)](https://www.rmcedu.com/bohdan-khmelnytsky-national-university-cherkasy.html) | Capture only (THIRD-PARTY agency): claims as stated; never evidence |  |  |
| 9 | [Wikipedia: Cherkasy National University](https://en.wikipedia.org/wiki/Cherkasy_National_University) | Cross-check only (THIRD-PARTY): website (www.cdu.edu.ua), origin in 1921, national-status year (2003; the Encyclopedia of Ukraine says 1998), structure (8 institutes and two faculties) *(Third-party; never evidence)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [NAQA](https://naqa.gov.ua/); [NAQA news: regional seminar in Cherkasy](https://en.naqa.gov.ua/?p=5860); [Ministry portal: profile (university 52)](https://universities.studyinukraine.gov.ua/en/minedu/university/52); [Ministry portal: cost (university 52)](https://universities.studyinukraine.gov.ua/en/minedu/university/52/cost); [Ministry portal: documents (university 52)](https://universities.studyinukraine.gov.ua/en/minedu/university/52/documents); [Ministry portal: preparatory department (university 52)](https://universities.studyinukraine.gov.ua/en/minedu/university/52/preparatory-department)

Third-party pages (leads only, never a source): [vstup.osvita.ua 2025 card](https://vstup.osvita.ua/y2025/r24/101/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Bohdan Khmelnytsky National University of Cherkasy | [Homepage](https://www.cdu.edu.ua/) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://cdu.edu.ua/ | [Homepage](https://www.cdu.edu.ua/) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | unverified | LEAD: 81 Shevchenko Blvd., Cherkasy | [Homepage](https://www.cdu.edu.ua/) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | unverified | LEAD: phone: +38 (0472) 54 13 45, url: https://cdu.edu.ua/en/information/for-international-applicants/contact-us.html | [Homepage](https://www.cdu.edu.ua/) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [Homepage](https://www.cdu.edu.ua/) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Homepage](https://www.cdu.edu.ua/) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Homepage](https://www.cdu.edu.ua/) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [Homepage](https://www.cdu.edu.ua/) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [Homepage](https://www.cdu.edu.ua/) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## C. Programme `medicine` — Medicine (`programmes[].id = "medicine"`, field medicine)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.medicine.internationalAdmission` | unverified | LEAD: True | [Homepage](https://www.cdu.edu.ua/) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.medicine.intakeYear` | not-published | — (no lead) | [Homepage](https://www.cdu.edu.ua/) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.medicine.level` | unverified | LEAD: master | [Homepage](https://www.cdu.edu.ua/) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.medicine.specialtyCode` | not-published | — (no lead) | [Homepage](https://www.cdu.edu.ua/) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.medicine.qualification` | not-published | — (no lead) | [Homepage](https://www.cdu.edu.ua/) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.medicine.durationText` | not-published | — (no lead) | [Homepage](https://www.cdu.edu.ua/) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.medicine.durationYears` | not-published | — (no lead) | [Homepage](https://www.cdu.edu.ua/) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.medicine.language` | unverified | LEAD: English, Ukrainian | [Homepage](https://www.cdu.edu.ua/) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.medicine.format` | not-published | — (no lead) | [Homepage](https://www.cdu.edu.ua/) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.medicine.tuition` | not-published | — (no lead) | [Homepage](https://www.cdu.edu.ua/) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.medicine.otherMandatoryCosts.*` | not-published | — (no lead) | [Homepage](https://www.cdu.edu.ua/) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.medicine.deadlines` | not-published | — (no lead) | [Homepage](https://www.cdu.edu.ua/) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.medicine.intake` | not-published | — (no lead) | [Homepage](https://www.cdu.edu.ua/) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.medicine.requirements.*` | not-published | — (no lead) | [Homepage](https://www.cdu.edu.ua/) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim | no evidence recorded |  |  |  |
| `programmes.medicine.documents.*` | not-published | — (no lead) | [Homepage](https://www.cdu.edu.ua/) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Dated official statement for 2026–27 on whether, where and how foreign students are taught (in person in Cherkasy, blended or distance). No statement on teaching format was found for any year; the only related official wording is the 2022 admission rule that admission of foreigners "may be carried out in person and/or remotely".  
   Closure (fill): 
2. Licence: whether Medicine (222 under the old classifier or its current-classifier equivalent) is licensed for this university, with the licensed volume, from the Ministry or EDEBO licence register. The EDEBO register entry (university 101) records registration only; no licence record for any health specialty was returned.  
   Closure (fill): 
3. NAQA accreditation of the Medicine programme from the NAQA register or the official certificate (none returned); international accreditation (for example by a WFME-aligned agency) kept separate from NAQA accreditation and from recognition (none returned).  
   Closure (fill): 
4. Medicine programme: confirm on the official Educational Program page (undated) the level (Master's per search summary), whether it is a single-cycle (integrated) master's, the exact award title ("Doctor of Medicine" per search summary), the specialty code and the duration as printed; the agency's "MBBS" and six-year claims are not recorded.  
   Closure (fill): 
5. FEES: Medicine tuition for foreign students for 2026/27 (amount, currency, per-period, payment schedule) from a dated official fee schedule. No official figure was returned (the Ministry portal cost section for university 52 was not reproduced); the agency's USD 37,200 total is not recorded.  
   Closure (fill): 
6. Language of instruction: confirm that both the Ukrainian and the English Medicine tracks ("Ukrainian or English as per the choice of the Student") are open to foreign applicants for the current intake.  
   Closure (fill): 
7. Admission rules for foreign applicants for the 2026 intake, including the requirements for Medicine (school subjects, grades, language proficiency, entrance test or interview); the official rules found are labelled 2022 (URL slug says 2020) and describe enrolment by interview and contract.  
   Closure (fill): 
8. Required documents for foreign applicants under the current rules (the official Application Instructions page is undated and paraphrased only).  
   Closure (fill): 
9. Application windows and intake dates for foreign applicants: the Ministry portal lead (28 February and 31 October, not reproduced on re-check) gives no year and no programme or intake.  
   Closure (fill): 
10. Official name in English and Ukrainian, canonical website (cdu.edu.ua or www.cdu.edu.ua) and founding year (third-party sources: origin in 1921 as an institute of people's education; national status 2003 per Wikipedia, 1998 per the Encyclopedia of Ukraine).  
   Closure (fill): 
11. Official postal address (the only lead is the Center of International Education address, 81 Shevchenko Blvd., Cherkasy, as paraphrased) and current international office contacts, including whether the "Center of International Education" and the "Institute of International Education" named on the Ministry portal are the same unit.  
   Closure (fill): 
12. Whether Ministry "Study in Ukraine" portal entry 52 is this university (its profile, cost, documents, preparatory and summer-school pages were not reproduced on re-check).  
   Closure (fill): 
13. Preparatory department for foreigners (lead from the Ministry portal only, not reproduced): existence, fields ("economic, biological"), language of instruction, English track, duration, fee with year, certificate and progression wording verbatim.  
   Closure (fill): 
14. Structure: the exact official name of the Medical Institute and its place in the university (Wikipedia: 8 institutes and two faculties; a "10 faculties" claim was not reproduced).  
   Closure (fill): 
15. Accommodation: hostel availability and published prices with year (no information found).  
   Closure (fill): 
16. Recognition: evidence-backed statements from destination-country regulators only. The agency's NMC and WHO approval claim is not recognition; no WDOMS listing was returned (either way).  
   Closure (fill): 
17. Name collisions: never attribute pages of Yuriy Fedkovych Chernivtsi National University (also abbreviated ChNU, chnu.edu.ua), Cherkasy State Technological University (chdtu.edu.ua) or Cherkasy Medical Academy to this university.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/bohdan-khmelnytsky-national-university-of-cherkasy.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
