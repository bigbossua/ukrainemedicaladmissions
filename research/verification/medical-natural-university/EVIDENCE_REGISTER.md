# Evidence register — Medical and Natural Sciences University (`medical-natural-university`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/medical-natural-university.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: vnz-mpu.com.ua, universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/medical-natural-university.json` — 0 programme(s) with an official-domain lead of international admission (); 3 deferred programme(s) kept unpublished until eligibility is read (Громадське здоров'я (Public Health), specialty code I9 (formerly 229), медичний факультет, Медсестринство (за спеціалізаціями) / Nursing, specialty code I5 (formerly 223) - university level, Медсестринство (Nursing) at the attached Фаховий коледж Медико-Природничого університету - VOCATIONAL level, not higher education).

**Evidence store:** `site/data/evidence/medical-natural-university.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `medical-natural-university--NN--short-name.pdf` where NN is the row number of this register (e.g. `medical-natural-university--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/medical-natural-university.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [osvita.ua directory entry: 'ПВНЗ "Медико-Природничий Університет" - це приватний](https://osvita.ua/vnz/guide/36804/) | osvita.ua directory entry: 'ПВНЗ "Медико-Природничий Університет" - це приватний вищий навчальний заклад'; address 'м. Миколаїв, просп. Богоявленський, 43А'; site vnz-mpu.com.ua; phones (093) 549 33 1 *(Result date as shown: undated directory entry. Search-result lead, not read in full.)* |  |  |
| 2 | [education.ua entry 'Приватний вищий навчальний заклад «Медико-Природничий Універ](https://www.education.ua/universities/874/) | education.ua entry 'Приватний вищий навчальний заклад «Медико-Природничий Університет»' rendering the English name as 'Medical and Natural Sciences University' *(Result date as shown: undated directory entry. Search-result lead, not read in full.)* |  |  |
| 3 | [education.ua entry 'Фаховий коледж приватного вищого навчального закладу «Медико](https://www.education.ua/colleges/1986/) | education.ua entry 'Фаховий коледж приватного вищого навчального закладу «Медико-природничий університет»': nursing '2 роки 8 місяців навчання (13.10.2026 — 01.07.2029)', 'контракт — 15 місць' *(Result date as shown: shows 2026 intake dates. Search-result lead, not read in full.)* |  |  |
| 4 | [Second osvita.ua guide entry returned for the same name (appears to be the colle](https://osvita.ua/vnz/guide/37459/) | Second osvita.ua guide entry returned for the same name (appears to be the college or a second record of the institution; not opened) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 5 | [Returned for the English-name query; a DIFFERENT Mykolaiv institution (already l](https://en.wikipedia.org/wiki/Petro_Mohyla_Black_Sea_State_University) | Returned for the English-name query; a DIFFERENT Mykolaiv institution (already listed as petro-mohyla-black-sea-national-university); cited only to document the name-confusion risk *(Result date as shown: n/a. Search-result lead, not read in full.)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [MON higher-education licence register, Mykolaiv oblast page - surfaced in result](https://mon.gov.ua/ministerstvo-2/poslugi/litsenzuvannya/litsenziyniy-reestr-subektiv-osvitnoi-diyalnosti/litsenziyniy-reestr-subektiv-osvitnoi-diyalnosti-u-sferi-vishchoi-osviti/mikolaivska-oblast-2)

Third-party pages (leads only, never a source): [Admissions-portal page 'Медико-Природничий Університет' (Mykolaiv): 'заклад вищо](https://vstup.osvita.ua/r15/3955/); [Same portal, 2024 year page titled 'Приватний вищий навчальний заклад "Медико-Пр](https://vstup.osvita.ua/y2024/r15/3955/); [Admissions-portal page for the attached 'Фаховий коледж Медико-Природничого унів](https://vstup.osvita.ua/y2025/r15/6478/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Private Higher Education Institution "Medical and Natural Sciences University" (English form is a directory rendering on education.ua; the inventory's "Medical-Natural University" is a literal translation; no official English form read) | [osvita.ua directory entry: 'ПВНЗ "Медико-Природничий Університет" - це приватний](https://osvita.ua/vnz/guide/36804/) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://vnz-mpu.com.ua/ | [osvita.ua directory entry: 'ПВНЗ "Медико-Природничий Університет" - це приватний](https://osvita.ua/vnz/guide/36804/) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [osvita.ua directory entry: 'ПВНЗ "Медико-Природничий Університет" - це приватний](https://osvita.ua/vnz/guide/36804/) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | not-published | — (no lead) | [osvita.ua directory entry: 'ПВНЗ "Медико-Природничий Університет" - це приватний](https://osvita.ua/vnz/guide/36804/) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [osvita.ua directory entry: 'ПВНЗ "Медико-Природничий Університет" - це приватний](https://osvita.ua/vnz/guide/36804/) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [osvita.ua directory entry: 'ПВНЗ "Медико-Природничий Університет" - це приватний](https://osvita.ua/vnz/guide/36804/) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [osvita.ua directory entry: 'ПВНЗ "Медико-Природничий Університет" - це приватний](https://osvita.ua/vnz/guide/36804/) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [osvita.ua directory entry: 'ПВНЗ "Медико-Природничий Університет" - це приватний](https://osvita.ua/vnz/guide/36804/) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [osvita.ua directory entry: 'ПВНЗ "Медико-Природничий Університет" - це приватний](https://osvita.ua/vnz/guide/36804/) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `public-health-specialty-code-i9-formerly-229` — Громадське здоров'я (Public Health), specialty code I9 (formerly 229), медичний факультет (other) | `programmes.public-health-specialty-code-i9-formerly-229.internationalAdmission`; `programmes.public-health-specialty-code-i9-formerly-229.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua directory entry: 'ПВНЗ "Медико-Природничий Університет" - це приватний](https://osvita.ua/vnz/guide/36804/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `nursing-specialty-code-i5-formerly-223-university-level` — Медсестринство (за спеціалізаціями) / Nursing, specialty code I5 (formerly 223) - university level (nursing) | `programmes.nursing-specialty-code-i5-formerly-223-university-level.internationalAdmission`; `programmes.nursing-specialty-code-i5-formerly-223-university-level.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua directory entry: 'ПВНЗ "Медико-Природничий Університет" - це приватний](https://osvita.ua/vnz/guide/36804/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `nursing-at-the-attached-vocational-level-not-higher-education` — Медсестринство (Nursing) at the attached Фаховий коледж Медико-Природничого університету - VOCATIONAL level, not higher education (nursing) | `programmes.nursing-at-the-attached-vocational-level-not-higher-education.internationalAdmission`; `programmes.nursing-at-the-attached-vocational-level-not-higher-education.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua directory entry: 'ПВНЗ "Медико-Природничий Університет" - це приватний](https://osvita.ua/vnz/guide/36804/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Location lead as found (unverified): Mykolaiv (lead: osvita.ua gives the address as просп. Богоявленський, 43А, м. Миколаїв)  
   Closure (fill): 
6. Relocation lead (unverified): No relocation lead found. The vstup.osvita.ua institution page carries 2026 intake data (34 offers, licensed volume 238 places, 58 applications submitted) for the Mykolaiv address, and osvita.ua gives просп. Богоявленський, 43А, м. Миколаїв. Licensed volume appears to have grown from 166 places / 25 offers (2024 page) to 238 / 34 (2026 page). Mykolaiv is a front-adjacent city, but no search result reported a move, suspension or merger. Search-result leads only; the official site was not read.  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: No lead shows admission of foreign applicants, a licence to train foreigners, or English-medium teaching: a dedicated search for іноземних студентів / international students returned nothing for this institution (osvita.ua, vstup.osvita.ua, education.ua listings only). The institution appears to be out of scope for an international medical-admissions directory.  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: No medicine (222), dentistry (221) or pharmacy (226) programme lead: all leads show only nursing (I5/223) and public health (I9/229), despite the name 'university' and a 'медичний факультет' label.  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: Name confusion with its own attached vocational college: 'Фаховий коледж Медико-Природничого університету' / 'Фаховий коледж ПВНЗ «Медико-природничий університет»' is a separate listing (education.ua/colleges/1986/, vstup.osvita.ua/y2025/r15/6478/) offering фаховий молодший бакалавр nursing; do not merge college-level data into the university profile.  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: Name confusion with the listed Petro Mohyla Black Sea National University (also Mykolaiv): the English-language search returned PMBSNU's Wikipedia page; the two are distinct institutions (state vs private; different addresses).  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: English name is unsettled: 'Medical and Natural Sciences University' (education.ua) vs 'Medical-Natural University' (inventory literal translation); no official English form read.  
   Closure (fill): 
12. Red flag to resolve before any fact is shown: Domain vnz-mpu.com.ua comes essentially from one publisher family (osvita.ua / vstup.osvita.ua), echoed by the college listing; not confirmed against the official site or the MON/EDEBO register.  
   Closure (fill): 
13. Red flag to resolve before any fact is shown: Small private institution (licensed volume 166-238 places across all offers) with no government register entry visible in search results; accreditation status of its programmes is unknown.  
   Closure (fill): 
14. Red flag to resolve before any fact is shown: Possible 2025-2026 specialty recoding (223 -> I5, 229 -> I9) means older listings and the current portal use different codes; they are the same specialties, not extra programmes.  
   Closure (fill): 
15. Missing evidence: Official site vnz-mpu.com.ua not read (network policy): official Ukrainian and English names, address, structure (university vs attached college), rector and legal identity all unconfirmed.  
   Closure (fill): 
16. Missing evidence: MON licence register / EDEBO entry: ЄДРПОУ code, licensed specialties (223/I5 Медсестринство, 229/I9 Громадське здоров'я) and levels (bachelor vs master), licensed volumes - not found in search results.  
   Closure (fill): 
17. Missing evidence: NAQA accreditation status of each programme - not found.  
   Closure (fill): 
18. Missing evidence: Whether the institution holds a licence to train foreign citizens, admits foreign applicants at all, or has any international-applicants page - not found (no lead).  
   Closure (fill): 
19. Missing evidence: Any English-medium teaching - not found (no lead).  
   Closure (fill): 
20. Missing evidence: Level of university-level nursing (bachelor and/or master) - the portal lists bachelor and master intake for the institution but no nursing offer with its level was quoted.  
   Closure (fill): 
21. Missing evidence: Whether the 'медичний факультет' label implies any plan for a medicine (222) programme - no lead; treat as nursing/public-health only.  
   Closure (fill): 
22. Missing evidence: Confirmation that vnz-mpu.com.ua is the official domain from the official site or a government register (currently osvita.ua-family listings only).  
   Closure (fill): 
23. Missing evidence: Current operating status from an official or government source (only third-party 2026 intake data found; no news items, no relocation, suspension or merger reports either way).  
   Closure (fill): 
24. Missing evidence: Tuition fees, admission requirements for foreigners and application links - none found.  
   Closure (fill): 
25. Skeptic's note: Weakest programme lead in this batch: the only university-level offer concretely identified for 2026 is Public Health (I9/229, bachelor), which is not one of the four qualifying fields. The nursing DEGREE lead rests on the osvita.ua HEI guide (vnz/guide/36804) stating the university trains in «Медсестринство (за спеціалізаціями)» and on a 2025 vstup.osvita.ua page mentioning I5 Медсестринство whose attribution (university vs attached college) is unclear. The clearly identified nursing offer belongs to the attached vocational college (фаховий молодший бакалавр) and does not count.  
   Closure (fill): 
26. Skeptic's note: No medicine (222), dentistry (221) or pharmacy (226) lead at all despite the 'university' name and a 'медичний факультет' label.  
   Closure (fill): 
27. Skeptic's note: No government register entry (MON licence register, EDEBO, NAQA) surfaced; HEI status rests on vstup.osvita.ua ('заклад вищої освіти без підпорядкування', bachelor/master, licensed volume 238 in 2026) and osvita.ua ('приватний вищий навчальний заклад').  
   Closure (fill): 
28. Skeptic's note: English name unsettled: 'Medical and Natural Sciences University' (education.ua rendering) vs the literal 'Medical-Natural University'; no official English form read.  
   Closure (fill): 
29. Skeptic's note: Domain vnz-mpu.com.ua comes from one publisher family (osvita.ua/vstup.osvita.ua), echoed by the college listing.  
   Closure (fill): 
30. Skeptic's note: Do not merge data from the attached 'Фаховий коледж Медико-Природничого університету' into the university profile; do not confuse with Petro Mohyla Black Sea National University (listed, also Mykolaiv).  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/medical-natural-university.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
