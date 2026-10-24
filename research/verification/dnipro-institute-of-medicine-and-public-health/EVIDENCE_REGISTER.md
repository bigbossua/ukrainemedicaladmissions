# Evidence register — Dnipro Institute of Medicine and Public Health (`dnipro-institute-of-medicine-and-public-health`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/dnipro-institute-of-medicine-and-public-health.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: dimh.kmu.edu.ua, universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/dnipro-institute-of-medicine-and-public-health.json` — 1 programme(s) with an official-domain lead of international admission (Медицина / Medicine (Master's, qualification лікар)); 2 deferred programme(s) kept unpublished until eligibility is read (Стоматологія / Dentistry (Master's, qualification лікар-стоматолог), Фармація / Pharmacy).

**Evidence store:** `site/data/evidence/dnipro-institute-of-medicine-and-public-health.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `dnipro-institute-of-medicine-and-public-health--NN--short-name.pdf` where NN is the row number of this register (e.g. `dnipro-institute-of-medicine-and-public-health--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/dnipro-institute-of-medicine-and-public-health.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Official-site English page (lead): title 'Institute Leadership | Дніпровський інститут медицини та громадського здоров'я'; president Maksym Mirzebasov, PhD in Medical Sciences, Associate Professor; no *(Result date as shown: undated (search result 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 2 | [Official-site English F.A.Q. (lead): Student Support Service for international s](https://dimh.kmu.edu.ua/?p=1814) | Official-site English F.A.Q. (lead): Student Support Service for international students; application questions to the International Department at dimh@kmu.edu.ua; Master's admission requires 'a diplom *(Result date as shown: undated (search result 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 3 | [Official-site announcement (lead): invited foreign students to the spring intake](https://dimh.kmu.edu.ua/?p=3089) | Official-site announcement (lead): invited foreign students to the spring intake for medicine; medicine programme described as accredited by a German agency in 2021 *(Result date as shown: 2022 (per search summary). Search-result lead, not read in full.)* |  |  |
| 4 | [Official-site PDF (lead): foreign applicants admitted on secondary education plu](https://dimh.kmu.edu.ua/wp-content/uploads/2021/05/Study-Program-DIMH.pdf) | Official-site PDF (lead): foreign applicants admitted on secondary education plus two entrance exams (Ukrainian or English; chemistry); document stated valid only until 2023/2024 *(Result date as shown: uploaded 2021-05. Search-result lead, not read in full.)* |  |  |
| 5 | [Official-site annual activity report for 2024 (academic year 2023–2024): staffin](https://dimh.kmu.edu.ua/wp-content/uploads/2025/03/richnyj-zvit_2024.pdf) | Official-site annual activity report for 2024 (academic year 2023–2024): staffing, teaching, international activity, clinical practice at treatment facilities — operating-status lead *(Result date as shown: uploaded 2025-03. Search-result lead, not read in full.)* |  |  |
| 6 | [Aggregator card (unofficial): private HEI founded 2018; MON licence dated 28.11.](https://osvita.ua/vnz/guide/37133/) | Aggregator card (unofficial): private HEI founded 2018; MON licence dated 28.11.2018; trains in Фармація, Медицина, Стоматологія; master level for medicine and dentistry; contradictory line that ДІМЗ  *(Result date as shown: undated (search result 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 7 | [Aggregator card (unofficial): full name 'Приватний заклад вищої освіти «Дніпровс](https://www.education.ua/universities/896/) | Aggregator card (unofficial): full name 'Приватний заклад вищої освіти «Дніпровський інститут медицини та громадського здоров'я» (ДІМЗ)'; 2024–2025 rating data and competitive offers *(Result date as shown: 2024–2025 (per search summary). Search-result lead, not read in full.)* |  |  |
| 8 | [Kyiv Medical University recognition document (lead): lists the Dnipro Institute ](https://kmu.edu.ua/wp-content/uploads/2021/02/viznannya.pdf) | Kyiv Medical University recognition document (lead): lists the Dnipro Institute of Medicine and Public Health alongside Kharkiv and Kyiv *(Result date as shown: uploaded 2021-02. Search-result lead, not read in full.)* |  |  |
| 9 | [Kyiv Medical University brochure (lead): 'campuses in KYIV | KHARKIV | DNIPRO'](https://kmu.edu.ua/wp-content/uploads/2022/04/KMUforMayors_c.pdf) | Kyiv Medical University brochure (lead): 'campuses in KYIV | KHARKIV | DNIPRO' *(Result date as shown: uploaded 2022-04. Search-result lead, not read in full.)* |  |  |
| 10 | [Third-party Lecturio MedEd Atlas listing of 'Dnipro Institute of Medicine and Pu](https://mededatlas.lecturio.com/language-of-instructions/english/page/28) | Third-party Lecturio MedEd Atlas listing of 'Dnipro Institute of Medicine and Public Health' under language of instruction English (unofficial lead) *(Result date as shown: undated (search result 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 11 | [Wikipedia article on a DIFFERENT private Dnipro institute, returned for this ins](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Wikipedia article on a DIFFERENT private Dnipro institute, returned for this institute's English name — name-confusion evidence only *(Result date as shown: undated (search result 2026-10-24). Search-result lead, not read in full.)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [MON licence register page for Dnipropetrovska oblast (higher education) returned](https://mon.gov.ua/ministerstvo-2/poslugi/litsenzuvannya/litsenziyniy-reestr-subektiv-osvitnoi-diyalnosti/litsenziyniy-reestr-subektiv-osvitnoi-diyalnosti-u-sferi-vishchoi-osviti/dnipropetrovska-oblast-2)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Dnipro Institute of Medicine and Public Health (search-result lead: English page titles on dimh.kmu.edu.ua and the KMU recognition PDF; not read from an official page) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://dimh.kmu.edu.ua/ | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | unverified | LEAD: url: https://dimh.kmu.edu.ua/?p=1814 | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## C. Programme `medicine-master-s-qualification` — Медицина / Medicine (Master's, qualification лікар) (`programmes[].id = "medicine-master-s-qualification"`, field medicine)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.medicine-master-s-qualification.internationalAdmission` | unverified | LEAD: True | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.medicine-master-s-qualification.intakeYear` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.medicine-master-s-qualification.level` | unverified | LEAD: master | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.medicine-master-s-qualification.specialtyCode` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.medicine-master-s-qualification.qualification` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.medicine-master-s-qualification.durationText` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.medicine-master-s-qualification.durationYears` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.medicine-master-s-qualification.language` | unverified | LEAD: English, Ukrainian | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.medicine-master-s-qualification.format` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.medicine-master-s-qualification.tuition` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.medicine-master-s-qualification.otherMandatoryCosts.*` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.medicine-master-s-qualification.deadlines` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.medicine-master-s-qualification.intake` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.medicine-master-s-qualification.requirements.*` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim | no evidence recorded |  |  |  |
| `programmes.medicine-master-s-qualification.documents.*` | not-published | — (no lead) | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `dentistry-master-s-qualification` — Стоматологія / Dentistry (Master's, qualification лікар-стоматолог) (dentistry) | `programmes.dentistry-master-s-qualification.internationalAdmission`; `programmes.dentistry-master-s-qualification.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `pharmacy` — Фармація / Pharmacy (pharmacy) | `programmes.pharmacy.internationalAdmission`; `programmes.pharmacy.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Official-site English page (lead): title 'Institute Leadership | Дніпровський ін](https://dimh.kmu.edu.ua/en/institute-leadership) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Relocation lead (unverified): No relocation lead found; Dnipro is not occupied. Operating-status leads: an annual activity report for 2024 (academic year 2023–2024) is published on the official site (PDF uploaded 2025-03: https://dimh.kmu.edu.ua/wp-content/uploads/2025/03/richnyj-zvit_2024.pdf), and education.ua shows 2024–2025 rating data. CONTRADICTION to check: the osvita.ua aggregator card (https://osvita.ua/vnz/guide/37133/) says 'сьогодні ДІМЗ успішно працює у серці Поділля — у місті Вінниця' while naming the institute 'Дніпровський'; this looks like an aggregator copy error but the actual licensed place of activity (Dnipro vs Vinnytsia) is unverified.  
   Closure (fill): 
6. Red flag to resolve before any fact is shown: Legal identity vs Kyiv Medical University (inventory slug kyiv-medical-university) unexplained: the site is a KMU subdomain (dimh.kmu.edu.ua), the International Department e-mail is dimh@kmu.edu.ua, KMU's 2021 recognition PDF (kmu.edu.ua/wp-content/uploads/2021/02/viznannya.pdf) lists the Dnipro institute alongside Kharkiv and Kyiv, and KMU's 2022 brochure says 'campuses in KYIV | KHARKIV | DNIPRO'. Whether ДІМЗ is a separate licensed ПЗВО or a structural unit/campus of KMU (and whose licence covers its programmes) is unverified.  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: osvita.ua card says the institute 'працює ... у місті Вінниця' while the name says Dnipro — place of licensed activity contradiction (likely aggregator error, unverified).  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: Name confusion risk: distinct from the state Dnipro State Medical University (listed slug dnipro-state-medical-university) and from the private Dnipro Medical Institute of Traditional and Non-traditional Medicine (inventory slug dnipro-medical-institute-of-conventional-and-alternative-medicine); search results for the English name mostly return those two institutions.  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: The only foreign-intake lead is a 2022 announcement and a 2021 study-programme PDF stated to be 'valid only until 2023/2024' — no current (2025/2026) admission rules for foreigners found; do not present these as current.  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: The 'medicine program accredited by a German agency in 2021' claim (dimh.kmu.edu.ua/?p=3089) is a foreign/private accreditation lead, not Ukrainian NAQA accreditation; NAQA listing not found. Keep registration, licence, accreditation and recognition separate.  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: Young institution (founded 2018 per osvita.ua) with no EDEBO/NAQA listing found and no EDRPOU code located — programme licence and accreditation status entirely unverified.  
   Closure (fill): 
12. Red flag to resolve before any fact is shown: English-medium teaching rests on a third-party atlas listing and a leadership-page remark about one faculty member teaching in English; no official English-programme page was read.  
   Closure (fill): 
13. Missing evidence: Official page read of dimh.kmu.edu.ua (home, 'про інститут', ліцензія/акредитація, вступ for foreigners 2025/2026) — hosts blocked from here  
   Closure (fill): 
14. Missing evidence: EDEBO (registry.edbo.gov.ua) record: legal name, EDRPOU code, legal address, licensed specialities 221/222/226 with licence volumes and status  
   Closure (fill): 
15. Missing evidence: MON licence register entry for Dnipropetrovska oblast confirming the institute and licence date (osvita.ua's 28.11.2018 is unofficial)  
   Closure (fill): 
16. Missing evidence: NAQA accreditation decisions for Medicine, Dentistry and Pharmacy programmes (none found)  
   Closure (fill): 
17. Missing evidence: Legal relationship to Kyiv Medical University: separate ПЗВО vs structural unit/campus; which entity holds the licence and issues diplomas  
   Closure (fill): 
18. Missing evidence: Current (2025/2026) admission rules for foreign citizens and whether an English-medium track exists now (only 2021–2022 leads found)  
   Closure (fill): 
19. Missing evidence: Pharmacy programme level and licence (only an aggregator mention)  
   Closure (fill): 
20. Missing evidence: Resolution of the osvita.ua 'Vinnytsia' place-of-activity statement vs Dnipro  
   Closure (fill): 
21. Missing evidence: Ministry 'Study in Ukraine' portal listing (not found)  
   Closure (fill): 
22. Missing evidence: Any dedicated international-applicants page beyond the FAQ (only the FAQ at ?p=1814 found)  
   Closure (fill): 
23. Skeptic's note: Legal relationship to Kyiv Medical University (candidate kyiv-medical-university) still unexplained: the site is a KMU subdomain, the international e-mail is dimh@kmu.edu.ua and KMU's 2021 recognition PDF lists the institute. Leads point to a separate legal HEI with shared founders rather than a structural unit (see notes), but this must be settled from EDEBO/EDR before any fact is published.  
   Closure (fill): 
24. Skeptic's note: No EDEBO card, MON licence-register row or NAQA decision found; osvita.ua's licence date 28.11.2018 is unofficial. The opendatabot EDRPOU record 44470425 returned for the name query has not been opened, so the code is unconfirmed.  
   Closure (fill): 
25. Skeptic's note: osvita.ua card says the institute operates 'у місті Вінниця' — probable aggregator error, unresolved.  
   Closure (fill): 
26. Skeptic's note: Foreign-intake leads are dated (2022 announcement; 2021 study programme 'valid until 2023/2024'); no current foreigner rules found. The 2021 AHPGS (Germany) accreditation is a foreign private accreditation, not NAQA.  
   Closure (fill): 
27. Skeptic's note: Pharmacy rests on an aggregator mention only; English-medium teaching rests on a third-party atlas and one leadership-page remark.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/dnipro-institute-of-medicine-and-public-health.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
