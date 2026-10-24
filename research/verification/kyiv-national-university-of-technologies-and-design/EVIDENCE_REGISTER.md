# Evidence register — Kyiv National University of Technologies and Design (`kyiv-national-university-of-technologies-and-design`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/kyiv-national-university-of-technologies-and-design.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: knutd.edu.ua, universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/kyiv-national-university-of-technologies-and-design.json` — 1 programme(s) with an official-domain lead of international admission (Промислова фармація / Industrial Pharmacy (specialty 226 Фармація, промислова фармація)); 2 deferred programme(s) kept unpublished until eligibility is read (Промислова фармація / Industrial Pharmacy (specialty 226 Фармація, промислова фармація), Промислова фармація / Industrial Pharmacy — educational-scientific (PhD) programme).

**Evidence store:** `site/data/evidence/kyiv-national-university-of-technologies-and-design.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `kyiv-national-university-of-technologies-and-design--NN--short-name.pdf` where NN is the row number of this register (e.g. `kyiv-national-university-of-technologies-and-design--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/kyiv-national-university-of-technologies-and-design.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical Technologies): 'only higher education institution in Kyiv that trains ... at all levels of higher education directly unde *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 2 | [Faculty of Chemical and Biopharmaceutical Technologies page; faculty office emai](https://en.knutd.edu.ua/university/faculties/fcht) | Faculty of Chemical and Biopharmaceutical Technologies page; faculty office email fht@knutd.edu.ua *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 3 | [Master's educational programme document, specialty 226, guarantor Halstian A. H.](https://knutd.edu.ua/files/ekts/2022/fchbt/fchbt_226mgchf_2022.pdf) | Master's educational programme document, specialty 226, guarantor Halstian A. H., Department of Industrial Pharmacy *(Result date as shown: 2022 (per filename/snippet). Search-result lead, not read in full.)* |  |  |
| 4 | [2023 master's programme document, 226: objects of study = drug development and i](https://www.knutd.edu.ua/files/ekts/2023/fchbt/fhbt_226_mghfb_2023.pdf) | 2023 master's programme document, 226: objects of study = drug development and industrial production, quality control, pharmaceutical quality system *(Result date as shown: 2023. Search-result lead, not read in full.)* |  |  |
| 5 | [Bachelor's programme document, specialty 226 (title only)](https://www.knutd.edu.ua/files/ekts/2021/fchbt/fchbt_226_bchf_2021-1.pdf) | Bachelor's programme document, specialty 226 (title only) *(Result date as shown: 2021. Search-result lead, not read in full.)* |  |  |
| 6 | [2019 programme document: graduates suited to employment in the pharmaceutical in](https://knutd.edu.ua/files/ekts/2019/fchbt/fchbt_226dfpf_2019.PDF) | 2019 programme document: graduates suited to employment in the pharmaceutical industry; notes a path toward a doctoral degree *(Result date as shown: 2019. Search-result lead, not read in full.)* |  |  |
| 7 | [Admission rules ('2025 edition'): KNUTD admits foreigners and stateless persons;](https://en.knutd.edu.ua/learning-opportunities/admissions/admissions_rules/) | Admission rules ('2025 edition'): KNUTD admits foreigners and stateless persons; may admit to preparatory programmes; enrolment via the Unified Interagency Information System for Foreigners; distance  *(Result date as shown: 2025. Search-result lead, not read in full.)* |  |  |
| 8 | [Preparatory department for foreigners: Ukrainian language + specialised courses;](https://en.knutd.edu.ua/learning-opportunities/preparatory-department/) | Preparatory department for foreigners: Ukrainian language + specialised courses; 'tuition fee is 1000 USD'; enrolment 1 Oct-1 Dec; contact study@knutd.edu.ua; address 2 Mala Shyianovska Str., Kyiv *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 9 | [Shows an 'international_knutd' section exists on the English site (partner infor](https://en.knutd.edu.ua/international_knutd/ompd/info-partner/) | Shows an 'international_knutd' section exists on the English site (partner information page); landing page of the international office not identified *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 10 | [KNUTD news items (also /9976/, /13653/, /16292/ returned) carrying the FIP World](https://en.knutd.edu.ua/events-and-publications/news/14502/) | KNUTD news items (also /9976/, /13653/, /16292/ returned) carrying the FIP World List of Pharmacy Schools claim and the 'most popular universities in the capital ... Bogomolets National Medical Univer *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 11 | [KNUTD news item; one of /19269/ or /11291/ is the 2025 welcome notice for postgr](https://en.knutd.edu.ua/events-and-publications/news/19269/) | KNUTD news item; one of /19269/ or /11291/ is the 2025 welcome notice for postgraduate students naming rector Oleksandra Olshanska (mapping not confirmed) *(Result date as shown: 2025 (reported). Search-result lead, not read in full.)* |  |  |
| 12 | [WHED entry: transliteration 'Kiivs'kij Natsional'nij Universitet Tekhnologii ta ](https://www.whed.net/institutions/IAU-010359) | WHED entry: transliteration 'Kiivs'kij Natsional'nij Universitet Tekhnologii ta Dyzainu (KNUTD)'; languages 'Ukrainian;Russian;English' *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 13 | ['state-sponsored university in Kyiv'; founded 1930; ~10,000 students; faculties ](https://en.wikipedia.org/wiki/Kyiv_National_University_of_Technologies_and_Design) | 'state-sponsored university in Kyiv'; founded 1930; ~10,000 students; faculties incl. chemical and biopharmaceutical technologies; official website en.knutd.edu.ua; address Nemyrovycha-Danchenka St, 2 *(Result date as shown: undated (encyclopedia). Search-result lead, not read in full.)* |  |  |
| 14 | [IAU record: founded 17 April 1930 as the Institute of Leather Industry; focus on](https://www.iau-hesd.net/node/168) | IAU record: founded 17 April 1930 as the Institute of Leather Industry; focus on light and chemical industries, fashion, design, economics, law *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 15 | [Granted national university status and current name in 2001](https://www.encyclopediaofukraine.com/pages%5CK%5CY%5CKyivNationalUniversityofTechnologiesandDesign.htm) | Granted national university status and current name in 2001 *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [MES 'Study in Ukraine' portal listing titled 'Kyiv National University of Techno](https://universities.studyinukraine.gov.ua/en/minedu/university/99/)

Third-party pages (leads only, never a source): [vstup.osvita.ua 2024 card for KNUTD bachelor 'Промислова фармація' (226), report](https://vstup.osvita.ua/y2024/r27/307/870169/); [vstup.osvita.ua 2023 card (KNUTD, 226), reported 'Небюджетна (в т.ч. для іноземц](https://vstup.osvita.ua/y2023/r27/307/1260429/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Kyiv National University of Technologies and Design | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://knutd.edu.ua/ | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | unverified | LEAD: url: https://en.knutd.edu.ua/learning-opportunities/admissions/admissions_rules/ | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## C. Programme `industrial-pharmacy-specialty-226` — Промислова фармація / Industrial Pharmacy (specialty 226 Фармація, промислова фармація) (`programmes[].id = "industrial-pharmacy-specialty-226"`, field pharmacy)

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `programmes.industrial-pharmacy-specialty-226.internationalAdmission` | unverified | LEAD: True | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | The sentence stating that foreign/international applicants are admitted to THIS programme for the stated intake (quote it) | no evidence recorded |  |  |  |
| `programmes.industrial-pharmacy-specialty-226.intakeYear` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | The intake/academic year the page refers to, exactly as printed | no evidence recorded |  |  |  |
| `programmes.industrial-pharmacy-specialty-226.level` | unverified | LEAD: bachelor | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Level as the university classifies it (master's / single-cycle master's / bachelor) | no evidence recorded |  |  |  |
| `programmes.industrial-pharmacy-specialty-226.specialtyCode` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Specialty code(s) exactly as printed (e.g. "222", "I2") | no evidence recorded |  |  |  |
| `programmes.industrial-pharmacy-specialty-226.qualification` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Exact award title as printed (never MBBS unless printed) | no evidence recorded |  |  |  |
| `programmes.industrial-pharmacy-specialty-226.durationText` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Duration exactly as printed (e.g. "5 years 10 months", "12 semesters") | no evidence recorded |  |  |  |
| `programmes.industrial-pharmacy-specialty-226.durationYears` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Whole years only if the page states years | no evidence recorded |  |  |  |
| `programmes.industrial-pharmacy-specialty-226.language` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Languages of instruction offered to foreign applicants for this programme | no evidence recorded |  |  |  |
| `programmes.industrial-pharmacy-specialty-226.format` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Teaching format only from the dated statement (row statusStatement) | no evidence recorded |  |  |  |
| `programmes.industrial-pharmacy-specialty-226.tuition` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Amount, currency, per year/semester, academic year, payment schedule, year-by-year variation, refundable or not — ALL as printed; if the page shows another year or is silent → "To be confirmed" | no evidence recorded |  |  |  |
| `programmes.industrial-pharmacy-specialty-226.otherMandatoryCosts.*` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Each other mandatory charge the official fee page lists for foreign applicants to this programme: label as printed, amount, currency, period (year / semester / one-off), academic year, refundable or not — one row each, never added into the tuition or a total | no evidence recorded |  |  |  |
| `programmes.industrial-pharmacy-specialty-226.deadlines` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Application window dates with the year as printed; a committee working period is recorded as exactly that | no evidence recorded |  |  |  |
| `programmes.industrial-pharmacy-specialty-226.intake` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Start of studies as printed | no evidence recorded |  |  |  |
| `programmes.industrial-pharmacy-specialty-226.requirements.*` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Every entry requirement the page lists for foreign applicants: subject, minimum grade and scale, exam format, condition — one row each, verbatim | no evidence recorded |  |  |  |
| `programmes.industrial-pharmacy-specialty-226.documents.*` | not-published | — (no lead) | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | The full numbered document list for foreign applicants, with conditions — one row each | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `industrial-pharmacy-specialty-226-2` — Промислова фармація / Industrial Pharmacy (specialty 226 Фармація, промислова фармація) (pharmacy) | `programmes.industrial-pharmacy-specialty-226-2.internationalAdmission`; `programmes.industrial-pharmacy-specialty-226-2.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `industrial-pharmacy-educational-scientific-phd-programme` — Промислова фармація / Industrial Pharmacy — educational-scientific (PhD) programme (pharmacy) | `programmes.industrial-pharmacy-educational-scientific-phd-programme.internationalAdmission`; `programmes.industrial-pharmacy-educational-scientific-phd-programme.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Industrial Pharmacy department page (Faculty of Chemical and Biopharmaceutical T](https://en.knutd.edu.ua/university/faculties/fcht/htpf) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Relocation lead (unverified): No relocation lead found. Every lead places the university in Kyiv: Wikipedia/IAU give 'Nemyrovycha-Danchenka St, 2, Kyiv, 01011'; the KNUTD preparatory-department page gives '2 Mala Shyianovska Str.' (possibly the same street under a new name — unverified). Activity leads for 2024-2025: 2024 vstup.osvita.ua admission card; '2025 edition' admission rules on en.knutd.edu.ua; a 2025 welcome notice for postgraduate students naming rector Oleksandra Olshanska. No suspension, merger or licence-revocation lead surfaced in six searches (absence of a search hit is not evidence of status).  
   Closure (fill): 
6. Red flag to resolve before any fact is shown: Group H profile: no medicine (222), dentistry (221) or nursing (223) programme lead in any search; the only health-related programmes are specialty 226 under the educational programme 'Промислова фармація' (Industrial Pharmacy), run from a Faculty of Chemical and Biopharmaceutical Technologies at a light-industry/design university. Whether this track leads to a pharmacist (провізор) qualification acceptable for professional registration abroad, rather than an industrial-technologist profile, is unverified and must not be implied.  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: No English-medium teaching lead for any programme; WHED lists 'Ukrainian;Russian;English' only at institution level. The 2024 vstup.osvita.ua 'Відкрита (в т.ч. для іноземців)' marker is a Ukrainian-track admission flag, not evidence of English-medium teaching.  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: Preparatory-department page snippet ('tuition fee is 1000 USD', enrolment 1 Oct-1 Dec, study@knutd.edu.ua) is undated; do not publish as a current fee.  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: Name-confusion risk: several Kyiv institutions share the 'Kyiv National University of ...' pattern (e.g. Construction and Architecture; Culture and Arts; Taras Shevchenko), and a Study in Ukraine portal hit returned for a KNUTD query was actually NUPH (/university/41). Portal URLs must be matched by title, not by query.  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: Minor inconsistencies across leads: two addresses (Nemyrovycha-Danchenka 2 vs Mala Shyianovska 2); Wikipedia's rector entry reportedly differs from a 2025 university notice naming Oleksandra Olshanska; enrolment figures differ between directories.  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: Industrial Pharmacy department page claims to be 'the only higher education institution in Kyiv' training at all levels under 'Industrial Pharmacy' — a self-description, not verified.  
   Closure (fill): 
12. Red flag to resolve before any fact is shown: The FIP 'World List of Pharmacy Schools' and 'most popular with foreign students' claims come from KNUTD's own news items (self-reported; exact news URLs not matched).  
   Closure (fill): 
13. Missing evidence: No official page was opened: names, domain, ownership and programmes are search-result leads only (official hosts blocked by network policy).  
   Closure (fill): 
14. Missing evidence: EDEBO registry record (licence for specialty 226, licensed volume, levels) — not found.  
   Closure (fill): 
15. Missing evidence: NAQA accreditation status/certificates for the 'Промислова фармація' bachelor, master and PhD programmes — not found.  
   Closure (fill): 
16. Missing evidence: Whether the 'Промислова фармація' educational programme confers a pharmacist (провізор) qualification usable for professional registration, versus an industrial-pharmacy technologist profile — unverified.  
   Closure (fill): 
17. Missing evidence: English-medium instruction for any 226 programme — no lead at all.  
   Closure (fill): 
18. Missing evidence: Current (2026) admission rules for foreigners, 226 tuition fees, and the foreign-applicant application link — not found; 2025 rules and an undated 1000 USD preparatory fee are the latest leads.  
   Closure (fill): 
19. Missing evidence: International office landing page and contact — only the admissions-rules and preparatory-department pages surfaced; the 'international_knutd' section's main page is unidentified.  
   Closure (fill): 
20. Missing evidence: Confirmation that no nursing (223), medicine (222) or dentistry (221) programme exists — based on search absence only, not on the programme catalogue.  
   Closure (fill): 
21. Missing evidence: Address reconciliation (Nemyrovycha-Danchenka 2 vs Mala Shyianovska 2) and current rector — conflicting/undated leads.  
   Closure (fill): 
22. Missing evidence: vstup.osvita.ua URL-to-snippet mapping (which 2023 URL carries the bachelor card) — not confirmed.  
   Closure (fill): 
23. Missing evidence: Exact official Ukrainian full name as in the statute (e.g. whether 'та' or 'і') — taken from Ukrainian-language snippets in genitive form, not from the statute.  
   Closure (fill): 
24. Skeptic's note: Whether the 'Промислова фармація' (Industrial Pharmacy) programmes in specialty 226 confer a pharmacist qualification usable for professional registration, rather than an industrial-technologist profile, is unverified and must not be implied.  
   Closure (fill): 
25. Skeptic's note: No English-medium teaching lead for any programme; the 2024 vstup.osvita.ua 'Відкрита (в т.ч. для іноземців)' marker is a Ukrainian-track admission flag only.  
   Closure (fill): 
26. Skeptic's note: No EDEBO licence record or NAQA accreditation lead for the 226 bachelor, master or PhD programmes.  
   Closure (fill): 
27. Skeptic's note: Admission information is 2025-edition rules plus an undated '1000 USD' preparatory-department fee; no 2026 rules, 226 tuition or dedicated international-office landing page found.  
   Closure (fill): 
28. Skeptic's note: Minor inconsistencies: two addresses (Nemyrovycha-Danchenka 2 vs Mala Shyianovska 2), differing rector entries, differing enrolment figures; vstup.osvita.ua URL-to-snippet mapping for the 2023 card not confirmed.  
   Closure (fill): 
29. Skeptic's note: Study in Ukraine portal match (university/99) rests on the result title; an earlier portal hit for a KNUTD query (university/41) was actually the National University of Pharmacy.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/kyiv-national-university-of-technologies-and-design.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
