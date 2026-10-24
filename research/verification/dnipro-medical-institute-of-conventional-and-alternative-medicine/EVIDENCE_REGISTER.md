# Evidence register — Dnipro Medical Institute of Traditional and Non-Traditional Medicine (`dnipro-medical-institute-of-conventional-and-alternative-medicine`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/dnipro-medical-institute-of-conventional-and-alternative-medicine.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: emu.dp.ua, universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/dnipro-medical-institute-of-conventional-and-alternative-medicine.json` — 2 programme(s) with an official-domain lead of international admission (Medicine (спеціальність 222 «Медицина»), Dentistry (спеціальність 221 «Стоматологія»)); 0 deferred programme(s) kept unpublished until eligibility is read (none).

**Evidence store:** `site/data/evidence/dnipro-medical-institute-of-conventional-and-alternative-medicine.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `dnipro-medical-institute-of-conventional-and-alternative-medicine--NN--short-name.pdf` where NN is the row number of this register (e.g. `dnipro-medical-institute-of-conventional-and-alternative-medicine--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/dnipro-medical-institute-of-conventional-and-alternative-medicine.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Wikipedia article under the 'Conventional and Alternative Medicine' title; says private, teaches international students, 'Medicine and Dentistry programmes are offered in English' (citation needed tag *(Result date as shown: undated (current article). Search-result lead, not read in full.)* |  |  |
| 2 | [IAU World Higher Education Database entry 'Dnipro Medical Institute of Tradition](https://whed.net/institutions/IAU-003791) | IAU World Higher Education Database entry 'Dnipro Medical Institute of Traditional and Non-Traditional Medicine'; founded 1993, Dnipro, Sevastopolska 17, instruction in Ukrainian, admission requiremen *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 3 | [IAU-HESD listing with the same name; 'Founded in 1993, the University is located](https://iau-hesd.net/university/dnipro-medical-institute-traditional-and-non-traditional-medicine) | IAU-HESD listing with the same name; 'Founded in 1993, the University is located in Dnipro' *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 4 | [osvita.ua HEI guide: «Дніпровський медичний інститут традиційної і нетрадиційної](https://osvita.ua/vnz/guide/207/) | osvita.ua HEI guide: «Дніпровський медичний інститут традиційної і нетрадиційної медицини – вищий заклад освіти недержавної форми власності»; master-level Medicine (6 yrs) and Dentistry (5 yrs); addre *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 5 | [education.ua listing titled «Європейський медичний університет» with former name](https://www.education.ua/universities/885/) | education.ua listing titled «Європейський медичний університет» with former name «Дніпровський медичний інститут традиційної і нетрадиційної медицини (ДМІ ТНМ)»; 221 Стоматологія, full-time 4y9m 01.09 *(Result date as shown: 2026 admission cycle (page current as of search, 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 6 | [SUCHO archive authority record under the earlier name 'Dnipropetrovsk Medical In](https://database.sucho.org/Archives/Authorities/1336) | SUCHO archive authority record under the earlier name 'Dnipropetrovsk Medical Institute of Traditional & Nontraditional Medicine' *(Result date as shown: undated (archive record). Search-result lead, not read in full.)* |  |  |
| 7 | [Journal «Фітотерапія» article describing the Dnipropetrovsk institute's traditio](https://www.phytotherapy.vernadskyjournals.in.ua/journal\2016\3\14.pdf) | Journal «Фітотерапія» article describing the Dnipropetrovsk institute's traditional/non-traditional medicine orientation *(Result date as shown: 2016. Search-result lead, not read in full.)* |  |  |
| 8 | [Student forum post: 'seats are limited for international students' and transfers](https://www.thestudentroom.co.uk/showpost.php?p=79238342) | Student forum post: 'seats are limited for international students' and transfers hard — anecdotal, unverified *(Result date as shown: undated (older forum post). Search-result lead, not read in full.)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [MoES 'Study in Ukraine' statistics: 'Limited Liability Company "Dnipro Medical I](https://studyinukraine.gov.ua/?p=6548); [MoES university portal entry (id 92) returned for this institution's name; conte](https://universities.studyinukraine.gov.ua/en/minedu/university/92)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Dnipro Medical Institute of Traditional and Non-Traditional Medicine (LLC) — name used by WHED (IAU-003791) and the MoES 2020 invitation list; Wikipedia titles it "Dnipro Medical Institute of Conventional and Alternative Medicine"; a rename to "European Medical University" is a lead only (education.ua) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://emu.dp.ua/ | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## C. Programme `medicine-222` — Medicine (спеціальність 222 «Медицина») (`programmes[].id = "medicine-222"`, field medicine)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.medicine-222.internationalAdmission` | unverified | LEAD: True | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.medicine-222.intakeYear` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.medicine-222.level` | unverified | LEAD: master | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.medicine-222.specialtyCode` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.medicine-222.qualification` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.medicine-222.durationText` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.medicine-222.durationYears` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.medicine-222.language` | unverified | LEAD: English, Ukrainian | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.medicine-222.format` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.medicine-222.tuition` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.medicine-222.otherMandatoryCosts.*` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.medicine-222.deadlines` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.medicine-222.intake` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.medicine-222.requirements.*` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim | no evidence recorded |  |  |  |
| `programmes.medicine-222.documents.*` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## C. Programme `dentistry-221` — Dentistry (спеціальність 221 «Стоматологія») (`programmes[].id = "dentistry-221"`, field dentistry)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.dentistry-221.internationalAdmission` | unverified | LEAD: True | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.dentistry-221.intakeYear` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.dentistry-221.level` | unverified | LEAD: master | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.dentistry-221.specialtyCode` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.dentistry-221.qualification` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.dentistry-221.durationText` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.dentistry-221.durationYears` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.dentistry-221.language` | unverified | LEAD: English, Ukrainian | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.dentistry-221.format` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.dentistry-221.tuition` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.dentistry-221.otherMandatoryCosts.*` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.dentistry-221.deadlines` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.dentistry-221.intake` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.dentistry-221.requirements.*` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim | no evidence recorded |  |  |  |
| `programmes.dentistry-221.documents.*` | not-published | — (no lead) | [Wikipedia article under the 'Conventional and Alternative Medicine' title; says ](https://en.wikipedia.org/wiki/Dnipro_Medical_Institute_of_Conventional_and_Alternative_Medicine) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Relocation lead (unverified): No relocation lead found; every source places the institution in Dnipro (not occupied territory). Addresses differ between sources: osvita.ua gives вул. Дзяка Георгія, 3; the IAU/WHED entry gives Севастопольська, 17. education.ua shows a 2026 admission cycle (applications 19 July–1 August), which is a lead that it is still operating. A possible rename to «Європейський медичний університет» (European Medical University) appears on education.ua; no official decision, date or legal basis for the rename was found.  
   Closure (fill): 
6. Red flag to resolve before any fact is shown: Three different names in circulation (Conventional/Alternative vs Traditional/Non-Traditional vs European Medical University); the rename is attested only by education.ua and one medical-education blog, no official source found  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: Domain emu.dp.ua rests on a single osvita.ua directory listing plus the EMU acronym fit; a direct search for "emu.dp.ua" returned no indexed page from that host  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: No EDEBO record, licence number or NAQA accreditation decision found in search for either name  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: English-medium teaching claim comes from Wikipedia (which carries a 'citation needed' tag on its foreign-student claims), while WHED/IAU lists the language of instruction as Ukrainian only  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: Address discrepancy between sources (Дзяка Георгія 3 vs Севастопольська 17)  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: Legal form is an LLC (ТОВ) per the MoES 2020 list — private, for-profit company structure; owner/founder not identified  
   Closure (fill): 
12. Red flag to resolve before any fact is shown: Easily confused with the state Dnipro State Medical University (dmu.edu.ua; listed as dnipro-state-medical-university) and with the private candidate Dnipro Institute of Medicine and Public Health — three distinct Dnipro medical HEIs  
   Closure (fill): 
13. Red flag to resolve before any fact is shown: Student forum (The Student Room) posts report limited international seats and difficult third-year transfers — anecdotal and unverified  
   Closure (fill): 
14. Red flag to resolve before any fact is shown: No pharmacy or nursing programme lead found; directory should not list these for this institution  
   Closure (fill): 
15. Missing evidence: Official website not opened (network policy); emu.dp.ua unconfirmed as the institution's host — needs an official page read or WHOIS/registrar record  
   Closure (fill): 
16. Missing evidence: Current official legal name: whether the rename to «Європейський медичний університет» / European Medical University has taken legal effect, its date and the MoES order or EDEBO record  
   Closure (fill): 
17. Missing evidence: EDEBO registry entry (ЄДЕБО ID), licence number and licensed volumes for 221 Стоматологія and 222 Медицина  
   Closure (fill): 
18. Missing evidence: NAQA accreditation status of each programme (certificates, decisions, expiry dates)  
   Closure (fill): 
19. Missing evidence: Confirmation of English-medium teaching for foreign applicants from an official page (only Wikipedia asserts it; WHED says Ukrainian)  
   Closure (fill): 
20. Missing evidence: International applicants / admissions page URL, application procedure, fees, and whether 2026/27 intake for foreign applicants is open  
   Closure (fill): 
21. Missing evidence: Registered address (two different addresses in third-party sources) and founder/owner of the LLC  
   Closure (fill): 
22. Missing evidence: Whether any pharmacy or nursing programme exists (none found — record as 'not found', not as absent)  
   Closure (fill): 
23. Missing evidence: Current operating status from an official or government source dated 2025–2026 (only the education.ua 2026 admission dates indicate operation)  
   Closure (fill): 
24. Skeptic's note: Name in flux (not a bar): three names circulate — 'Traditional and Non-Traditional Medicine' (WHED, MoES 2020 list), 'Conventional and Alternative Medicine' (Wikipedia, slug) and 'European Medical University' (education.ua card title; matches the emu.dp.ua domain on osvita.ua). The rename is attested only by aggregators; no founder decision, MoES order or EDEBO entry found. Retitle if confirmed.  
   Closure (fill): 
25. Skeptic's note: Domain emu.dp.ua rests on the osvita.ua directory link plus the acronym fit; no indexed page from that host surfaced.  
   Closure (fill): 
26. Skeptic's note: No EDEBO record, licence number or NAQA accreditation decision found for either name.  
   Closure (fill): 
27. Skeptic's note: English-medium teaching conflicting: Wikipedia claims it (citation needed); WHED/IAU lists Ukrainian only.  
   Closure (fill): 
28. Skeptic's note: Legal form is an LLC (ТОВ) per the MoES 2020 invitation statistics; address differs between sources (Дзяка Георгія 3 vs Севастопольська 17).  
   Closure (fill): 
29. Skeptic's note: Easily confused with Dnipro State Medical University (state, listed) and Dnipro Institute of Medicine and Public Health (private, candidate); no pharmacy/nursing lead.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/dnipro-medical-institute-of-conventional-and-alternative-medicine.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
