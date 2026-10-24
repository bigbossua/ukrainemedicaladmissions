# Evidence register — Rivne Medical Academy (`rivne-medical-academy`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/rivne-medical-academy.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: mcollege.rv.ua, universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/rivne-medical-academy.json` — 0 programme(s) with an official-domain lead of international admission (); 5 deferred programme(s) kept unpublished until eligibility is read (223 Медсестринство / Nursing (Bachelor), Medical-Pharmaceutical Faculty, 226 Фармація / Pharmacy (Bachelor), Medical-Pharmaceutical Faculty, 221 Стоматологія - Профілактична стоматологія (dental hygiene, allied-health vocational programme; NOT a dentist qualification), 221 Стоматологія - Ортопедична стоматологія (dental technology / prosthetic dental technician, allied-health vocational programme; NOT a dentist qualification), 223 Медсестринство - Акушерська справа / Midwifery (professional junior bachelor) - appears under a DIFFERENT vstup.osvita.ua institution id (933), possibly a structural college rather than the academy itself).

**Evidence store:** `site/data/evidence/rivne-medical-academy.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `rivne-medical-academy--NN--short-name.pdf` where NN is the row number of this register (e.g. `rivne-medical-academy--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/rivne-medical-academy.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Directory entry titled with the full official-form name 'Комунальний заклад вищо](https://www.education.ua/universities/939/) | Directory entry titled with the full official-form name 'Комунальний заклад вищої освіти «Рівненська медична академія» Рівненської обласної ради' (communal HEI of Rivne Regional Council) *(Result date as shown: not shown in results. Search-result lead, not read in full.)* |  |  |
| 2 | [Ombudsman (government) tag page naming dormitory No. 2 of the 'Комунальний закла](https://ombudsman.gov.ua/en/news/tags/gurtozhitok-2-komunalnogo-zakladu-vishchoi-osviti-rivnenska-medichna-akademiya-rivnenskoi-oblasnoi-radi) | Ombudsman (government) tag page naming dormitory No. 2 of the 'Комунальний заклад вищої освіти «Рівненська медична академія» Рівненської обласної ради' *(Result date as shown: not shown in results. Search-result lead, not read in full.)* |  |  |
| 3 | [Directory: type Академія, 'Форма власності: Державна', forms full-time/evening/d](https://osvita.ua/vnz/guide/37461/) | Directory: type Академія, 'Форма власності: Державна', forms full-time/evening/distance, qualification levels bachelor, professional junior bachelor, master, city Rivne; address вул. М. Карнаухова, 53 *(Result date as shown: not shown in results. Search-result lead, not read in full.)* |  |  |
| 4 | [Directory page (college-type listing) at the same address giving mcollege.rv.ua;](https://osvita.ua/vnz/college/16814/) | Directory page (college-type listing) at the same address giving mcollege.rv.ua; describes the college heritage ('один із перших в області серед закладів І-ІІ рівня акредитації') *(Result date as shown: not shown in results. Search-result lead, not read in full.)* |  |  |
| 5 | [News: part of the former Rivne MSEK building (вул. Стельмаха, 6) transferred to ](https://zaxid.net/chastinu_budivli_rivnenskoyi_msek_peredadut_medichniy_akademiyi_n1604132) | News: part of the former Rivne MSEK building (вул. Стельмаха, 6) transferred to the medical academy for classrooms and simulation-centre expansion *(Result date as shown: not shown in results. Search-result lead, not read in full.)* |  |  |
| 6 | [News that Luhansk State Medical University started operating in Rivne oblast (co](https://suspilne.media/225305-na-rivnensini-rozpocav-robotu-luganskij-medicnij-universitet/) | News that Luhansk State Medical University started operating in Rivne oblast (confusion-risk context only) *(Result date as shown: not shown in results. Search-result lead, not read in full.)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [MON licence register page for higher-education providers in Rivne oblast - surfa](https://mon.gov.ua/ministerstvo-2/poslugi/litsenzuvannya/litsenziyniy-reestr-subektiv-osvitnoi-diyalnosti/litsenziyniy-reestr-subektiv-osvitnoi-diyalnosti-u-sferi-vishchoi-osviti/rivnenska-oblast-2)

Third-party pages (leads only, never a source): [Admissions directory hub for 'Рівненська медична академія' (institution id 729):](https://vstup.osvita.ua/y2017/r18/729/); [2026 admission page: Nursing bachelor, full-time, complete secondary education b](https://vstup.osvita.ua/y2026/r18/729/1608415/); [2022 page: Nursing bachelor contract fee 31,400 UAH/year (outdated)](https://vstup.osvita.ua/y2022/r18/729/992571/); [2025 statistics page (dental hygiene professional junior bachelor: 20 budget / 6](https://vstup.osvita.ua/y2025/r18/729/1443712/); [2023 page: 223 Медсестринство / Акушерська справа, professional junior bachelor,](https://vstup.osvita.ua/y2023/r18/933/); ['Рокитнівський фаховий медичний коледж Рівненської медичної академії' - a profes](https://vstup.osvita.ua/y2025/r18/4412/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Communal Institution of Higher Education "Rivne Medical Academy" of Rivne Regional Council (translation of the Ukrainian name; no official English name found in search results) | [Directory entry titled with the full official-form name 'Комунальний заклад вищо](https://www.education.ua/universities/939/) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://mcollege.rv.ua/ | [Directory entry titled with the full official-form name 'Комунальний заклад вищо](https://www.education.ua/universities/939/) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [Directory entry titled with the full official-form name 'Комунальний заклад вищо](https://www.education.ua/universities/939/) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | not-published | — (no lead) | [Directory entry titled with the full official-form name 'Комунальний заклад вищо](https://www.education.ua/universities/939/) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [Directory entry titled with the full official-form name 'Комунальний заклад вищо](https://www.education.ua/universities/939/) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Directory entry titled with the full official-form name 'Комунальний заклад вищо](https://www.education.ua/universities/939/) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Directory entry titled with the full official-form name 'Комунальний заклад вищо](https://www.education.ua/universities/939/) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [Directory entry titled with the full official-form name 'Комунальний заклад вищо](https://www.education.ua/universities/939/) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [Directory entry titled with the full official-form name 'Комунальний заклад вищо](https://www.education.ua/universities/939/) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `223-nursing-bachelor-medical-pharmaceutical-faculty` — 223 Медсестринство / Nursing (Bachelor), Medical-Pharmaceutical Faculty (nursing) | `programmes.223-nursing-bachelor-medical-pharmaceutical-faculty.internationalAdmission`; `programmes.223-nursing-bachelor-medical-pharmaceutical-faculty.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Directory entry titled with the full official-form name 'Комунальний заклад вищо](https://www.education.ua/universities/939/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `226-pharmacy-bachelor-medical-pharmaceutical-faculty` — 226 Фармація / Pharmacy (Bachelor), Medical-Pharmaceutical Faculty (pharmacy) | `programmes.226-pharmacy-bachelor-medical-pharmaceutical-faculty.internationalAdmission`; `programmes.226-pharmacy-bachelor-medical-pharmaceutical-faculty.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Directory entry titled with the full official-form name 'Комунальний заклад вищо](https://www.education.ua/universities/939/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `221-dental-hygiene-allied-health-vocational-programme-not-a-dentist-qualification` — 221 Стоматологія - Профілактична стоматологія (dental hygiene, allied-health vocational programme; NOT a dentist qualification) (other) | `programmes.221-dental-hygiene-allied-health-vocational-programme-not-a-dentist-qualification.internationalAdmission`; `programmes.221-dental-hygiene-allied-health-vocational-programme-not-a-dentist-qualification.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Directory entry titled with the full official-form name 'Комунальний заклад вищо](https://www.education.ua/universities/939/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `221-dental-technology-prosthetic-dental-technician-allied-health-vocational-programme-not-a-dentist-qualification` — 221 Стоматологія - Ортопедична стоматологія (dental technology / prosthetic dental technician, allied-health vocational programme; NOT a dentist qualification) (other) | `programmes.221-dental-technology-prosthetic-dental-technician-allied-health-vocational-programme-not-a-dentist-qualification.internationalAdmission`; `programmes.221-dental-technology-prosthetic-dental-technician-allied-health-vocational-programme-not-a-dentist-qualification.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Directory entry titled with the full official-form name 'Комунальний заклад вищо](https://www.education.ua/universities/939/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `223-midwifery-professional-junior-bachelor-appears-under-a-different-vstup-osvita-ua-institution-id-933-possibly-a-structural-college-rather-than-the-academy-itself` — 223 Медсестринство - Акушерська справа / Midwifery (professional junior bachelor) - appears under a DIFFERENT vstup.osvita.ua institution id (933), possibly a structural college rather than the academy itself (nursing) | `programmes.223-midwifery-professional-junior-bachelor-appears-under-a-different-vstup-osvita-ua-institution-id-933-possibly-a-structural-college-rather-than-the-academy-itself.internationalAdmission`; `programmes.223-midwifery-professional-junior-bachelor-appears-under-a-different-vstup-osvita-ua-institution-id-933-possibly-a-structural-college-rather-than-the-academy-itself.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Directory entry titled with the full official-form name 'Комунальний заклад вищо](https://www.education.ua/universities/939/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Relocation lead (unverified): No relocation lead. Address lead: м. Рівне, вул. М. Карнаухова, 53 (osvita.ua directory). A zaxid.net news item (date not shown in results) reports that part of the former Rivne MSEK building at вул. Стельмаха, 6 was transferred to the academy for classrooms and expansion of a simulation centre - consistent with ongoing operation in Rivne. 2026 admission pages exist on vstup.osvita.ua. Related: Luhansk State Medical University is reported (suspilne.media) to have started work in Rivne oblast after relocation - a different institution.  
   Closure (fill): 
6. Red flag to resolve before any fact is shown: No lead at all for admission of foreign applicants, an international office, or English-medium teaching (English and Ukrainian searches both returned nothing); all surfaced offers are domestic nursing/pharmacy bachelor and vocational allied-health programmes.  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: No medicine (222) or dentist-level dentistry degree programme surfaced; the two '221 Стоматологія' programmes are professional-junior-bachelor allied-health programmes (dental hygiene, dental technology) and must not be presented as dentistry degrees.  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: Ownership label conflict: the official name form 'Комунальний заклад вищої освіти ... Рівненської обласної ради' indicates communal ownership, while the osvita.ua directory labels it 'Форма власності: Державна' and the vstup directory says 'державної форми власності і підпорядковується обласній раді' - communal is the better-supported reading but unconfirmed by a statute or founder decision.  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: Domain 'mcollege.rv.ua' is a college-era hostname given only by third-party directories (osvita.ua, vstup.osvita.ua); not confirmed from the institution or a government register.  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: Name/location confusion risks: Luhansk State Medical University is reported to operate in Rivne oblast after relocation (suspilne.media); Rivne State Humanitarian University and the Open International University 'Ukraine' Rivne Institute appear in 'Rivne' searches; 'Рокитнівський фаховий медичний коледж Рівненської медичної академії' is listed as a structural subdivision of the academy (vstup.osvita.ua/y2025/r18/4412/).  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: The midwifery lead sits under vstup.osvita.ua institution id 933, not the academy's id 729 - attribution unverified.  
   Closure (fill): 
12. Red flag to resolve before any fact is shown: osvita.ua directory states master-level qualification exists, but no master's programme page was found; the pharmacy bachelor page reflects a 2021-2024 cohort, so current pharmacy intake is unconfirmed.  
   Closure (fill): 
13. Red flag to resolve before any fact is shown: Only fee found is a 2022 contract fee (31,400 UAH/year, nursing bachelor) - outdated; no current fees.  
   Closure (fill): 
14. Missing evidence: Official website not read (network policy); domain mcollege.rv.ua is a third-party directory lead only - needs confirmation from the institution or a government register.  
   Closure (fill): 
15. Missing evidence: Official English name - none found; the English name given is a translation.  
   Closure (fill): 
16. Missing evidence: EDEBO registry entry (institution record, licence, licensed specialties and volumes, accreditation certificates) - not found.  
   Closure (fill): 
17. Missing evidence: NAQA accreditation decisions for any programme - not found.  
   Closure (fill): 
18. Missing evidence: Ministry 'Study in Ukraine' portal listing - not found.  
   Closure (fill): 
19. Missing evidence: Ownership form: statute or Rivne Regional Council founding decision confirming communal ownership (directories conflict: communal name form vs 'державна' label).  
   Closure (fill): 
20. Missing evidence: Any rule or page on admission of foreign applicants, an international office, or English-medium teaching - not found.  
   Closure (fill): 
21. Missing evidence: Current (2026/27) programme list from the academy itself, especially: whether a master's programme (osvita.ua claims master level) exists; whether 226 Pharmacy bachelor has a current intake (only a 2021-2024 cohort page found); whether 224/227 programmes exist (none surfaced).  
   Closure (fill): 
22. Missing evidence: Current tuition fees - only a 2022 nursing fee (31,400 UAH/year) found.  
   Closure (fill): 
23. Missing evidence: Relationship between vstup.osvita.ua institution id 933 (midwifery lead) and the academy (id 729).  
   Closure (fill): 
24. Missing evidence: Founding history and former name (e.g. a predecessor 'базовий медичний коледж') - not confirmed by any snippet; the college-era hostname is suggestive only.  
   Closure (fill): 
25. Missing evidence: Publication dates of the zaxid.net and ombudsman.gov.ua items.  
   Closure (fill): 
26. Missing evidence: Status of the Rokytne Professional Medical College as a structural subdivision.  
   Closure (fill): 
27. Skeptic's note: No EDEBO, MON licence register or NAQA entry surfaced; HEI status and the full name rest on a government ombudsman.gov.ua tag page (full communal name), education.ua and vstup.osvita.ua ('академія', подпорядкована обласній раді). Licence and accreditation of every programme unverified.  
   Closure (fill): 
28. Skeptic's note: Qualifying degree leads are nursing bachelor (2026 admission page) and pharmacy bachelor (only a 2021-2024 cohort page; current pharmacy intake unconfirmed). No medicine (222) or dentist-level dentistry lead; the two '221 Стоматологія' programmes are professional-junior-bachelor allied-health programmes (dental hygiene, dental technology) and must not be shown as dentistry degrees.  
   Closure (fill): 
29. Skeptic's note: Domain mcollege.rv.ua is a college-era hostname given only by osvita.ua-family directories (medium confidence); not confirmed by the institution or a register.  
   Closure (fill): 
30. Skeptic's note: Ownership label conflict: communal per the legal name form vs 'Державна' in osvita.ua.  
   Closure (fill): 
31. Skeptic's note: Midwifery lead sits under a different vstup.osvita.ua institution id (933) and may belong to a structural college; the 'Рокитнівський фаховий медичний коледж Рівненської медичної академії' is a vocational subdivision, not a separate HEI.  
   Closure (fill): 
32. Skeptic's note: Confusion risk with Luhansk State Medical University (candidate), reported to operate in Rivne oblast after relocation; the two are different institutions.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/rivne-medical-academy.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
