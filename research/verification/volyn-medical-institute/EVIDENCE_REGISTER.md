# Evidence register — Volyn Medical Institute (`volyn-medical-institute`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/volyn-medical-institute.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: vmi.volyn.ua, universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/volyn-medical-institute.json` — 0 programme(s) with an official-domain lead of international admission (); 6 deferred programme(s) kept unpublished until eligibility is read (Сестринська справа (спеціальність 223 Медсестринство) — bachelor, Екстрена медицина / парамедик (спеціальність 223 Медсестринство), Сестринська справа (спеціальність 223 Медсестринство) — master, Клінічна психологія (спеціальність 053 Психологія), Стоматологія ортопедична — college programme of the structural unit Луцький базовий фаховий медичний коледж (dental technician level; NOT a higher-education dentistry degree), Лікувальна справа — college programme of the structural unit Луцький базовий фаховий медичний коледж (feldsher level; NOT a medicine degree)).

**Evidence store:** `site/data/evidence/volyn-medical-institute.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `volyn-medical-institute--NN--short-name.pdf` where NN is the row number of this register (e.g. `volyn-medical-institute--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/volyn-medical-institute.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський](https://www.education.ua/universities/978/) | Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський медичний інститут» Волинської обласної ради», address Луцьк, вул. Лесі Українки, 2, acting rector Пастрик Т. В., 2026/2 *(Result date as shown: undated page; content refers to the 2026/27 intake; seen 2026-10-24. Search-result lead, not read in full.)* |  |  |
| 2 | [Official-domain lead: 'Перелік спеціальностей' listing bachelor 223 Медсестринст](https://vmi.volyn.ua/vstupnikam/pyeryelik-spyetsialnostyey/) | Official-domain lead: 'Перелік спеціальностей' listing bachelor 223 Медсестринство (Сестринська справа; Екстрена медицина/парамедик) and 053 Психологія (Клінічна психологія) *(Result date as shown: undated; seen in search results 2026-10-24 (page not opened). Search-result lead, not read in full.)* |  |  |
| 3 | [Official-domain lead: licence volumes, regional order and tuition page; master's](https://vmi.volyn.ua/vstupnikam/litsyenziyni-obsyagi-ryegionalnye-zamovlyennya-ta-vartist-navchannya/) | Official-domain lead: licence volumes, regional order and tuition page; master's 223 licence asserted *(Result date as shown: undated; seen 2026-10-24 (page not opened). Search-result lead, not read in full.)* |  |  |
| 4 | [Official-domain lead: history page exists (content not seen)](https://vmi.volyn.ua/about-institute/istoriya/) | Official-domain lead: history page exists (content not seen) *(Result date as shown: undated; seen 2026-10-24. Search-result lead, not read in full.)* |  |  |
| 5 | [NAQA self-assessment form hosted on the institute's domain (programme/year not v](https://vmi.volyn.ua/data/media/files/9/4/94-vidomostiprosamoocinyuvannyaosvitnoiprogramy.pdf) | NAQA self-assessment form hosted on the institute's domain (programme/year not visible) *(Result date as shown: undated; seen 2026-10-24. Search-result lead, not read in full.)* |  |  |
| 6 | [Educational-professional programme 'Сестринська справа' (2023 edition) PDF](https://www.vmi.volyn.ua/data/media/files/2/3/23-osvitno-profesiina-programa-sestrynska-sprava-(2023).pdf) | Educational-professional programme 'Сестринська справа' (2023 edition) PDF *(Result date as shown: 2023 (from file title). Search-result lead, not read in full.)* |  |  |
| 7 | [Educational-professional programme 'Екстрена медицина/парамедик' PDF](https://vmi.volyn.ua/data/media/files/2/6/26-opp-paramedyk-2025-26.pdf) | Educational-professional programme 'Екстрена медицина/парамедик' PDF *(Result date as shown: 2025-26 (from file name). Search-result lead, not read in full.)* |  |  |
| 8 | [PDF whose title carries the letterhead form «КОМУНАЛЬНИЙ ЗАКЛАД ВИЩОЇ ОСВІТИ «ВО](https://vmi.volyn.ua/data/media/files/6/1/61-ok16-rpok-pedagogichna-praktyka-ostatochnyi.pdf) | PDF whose title carries the letterhead form «КОМУНАЛЬНИЙ ЗАКЛАД ВИЩОЇ ОСВІТИ «ВОЛИНСЬКИЙ МЕДИЧНИЙ ІНСТИТУТ»» *(Result date as shown: undated; seen 2026-10-24. Search-result lead, not read in full.)* |  |  |
| 9 | [Aggregator guide: 'перший медичний навчальний заклад на Волині, понад сімдесятил](https://osvita.ua/vnz/guide/37446/) | Aggregator guide: 'перший медичний навчальний заклад на Волині, понад сімдесятилітня історія'; lists ownership as 'Державна' (discrepancy) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 10 | [Aggregator page on professional-junior-bachelor admission conditions (college le](https://osvita.ua/mlbachelor/fmb_umovy_pryyomu/89242/) | Aggregator page on professional-junior-bachelor admission conditions (college level) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 11 | [Aggregator profile of Луцький базовий фаховий медичний коледж described as a str](https://www.education.ua/colleges/1998/) | Aggregator profile of Луцький базовий фаховий медичний коледж described as a structural unit of the institute; programmes Стоматологія ортопедична, Лікувальна справа *(Result date as shown: undated; refers to 2026 intake. Search-result lead, not read in full.)* |  |  |
| 12 | [Name-confusion check: English search for 'Volyn Medical Institute' returned only](https://en.wikipedia.org/wiki/Lesya_Ukrainka_Volyn_National_University) | Name-confusion check: English search for 'Volyn Medical Institute' returned only VNU (Prosp. Voli 13, Lutsk; rector Anatolii Tsos) and its Medical Faculty wiki pages *(Result date as shown: undated; seen 2026-10-24. Search-result lead, not read in full.)* |  |  |

Third-party pages (leads only, never a source): [Aggregator tuition page: 36,600 UAH/yr bachelor full-time and 45,850 UAH/yr mast](https://vstup.osvita.ua/r4/622/price.html); [Aggregator 2025 listing 'Медсестринство': bachelor Сестринська справа, non-budge](https://vstup.osvita.ua/y2025/r4/622/1508443/); [Aggregator 2026 listing, apparently the structural college (college programmes, ](https://vstup.osvita.ua/y2026/r4/7042/1635936/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Municipal Higher Education Institution "Volyn Medical Institute" of the Volyn Regional Council (unofficial translation of the Ukrainian name; no official English name surfaced in any search result) | [Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський](https://www.education.ua/universities/978/) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://vmi.volyn.ua/ | [Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський](https://www.education.ua/universities/978/) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський](https://www.education.ua/universities/978/) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | not-published | — (no lead) | [Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський](https://www.education.ua/universities/978/) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський](https://www.education.ua/universities/978/) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський](https://www.education.ua/universities/978/) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський](https://www.education.ua/universities/978/) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський](https://www.education.ua/universities/978/) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський](https://www.education.ua/universities/978/) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `223-bachelor` — Сестринська справа (спеціальність 223 Медсестринство) — bachelor (nursing) | `programmes.223-bachelor.internationalAdmission`; `programmes.223-bachelor.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський](https://www.education.ua/universities/978/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `223` — Екстрена медицина / парамедик (спеціальність 223 Медсестринство) (nursing) | `programmes.223.internationalAdmission`; `programmes.223.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський](https://www.education.ua/universities/978/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `223-master` — Сестринська справа (спеціальність 223 Медсестринство) — master (nursing) | `programmes.223-master.internationalAdmission`; `programmes.223-master.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський](https://www.education.ua/universities/978/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `053` — Клінічна психологія (спеціальність 053 Психологія) (other) | `programmes.053.internationalAdmission`; `programmes.053.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський](https://www.education.ua/universities/978/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `college-programme-of-the-structural-unit-dental-technician-level-not-a-higher-education-dentistry-degree` — Стоматологія ортопедична — college programme of the structural unit Луцький базовий фаховий медичний коледж (dental technician level; NOT a higher-education dentistry degree) (other) | `programmes.college-programme-of-the-structural-unit-dental-technician-level-not-a-higher-education-dentistry-degree.internationalAdmission`; `programmes.college-programme-of-the-structural-unit-dental-technician-level-not-a-higher-education-dentistry-degree.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський](https://www.education.ua/universities/978/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `college-programme-of-the-structural-unit-feldsher-level-not-a-medicine-degree` — Лікувальна справа — college programme of the structural unit Луцький базовий фаховий медичний коледж (feldsher level; NOT a medicine degree) (other) | `programmes.college-programme-of-the-structural-unit-feldsher-level-not-a-medicine-degree.internationalAdmission`; `programmes.college-programme-of-the-structural-unit-feldsher-level-not-a-medicine-degree.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Aggregator profile: full legal name «Комунальний заклад вищої освіти «Волинський](https://www.education.ua/universities/978/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Location lead as found (unverified): Lutsk (lead: Луцьк, вул. Лесі Українки, 2 — education.ua/universities/978)  
   Closure (fill): 
6. Relocation lead (unverified): No relocation lead. Lutsk (Volyn oblast, western Ukraine) is neither occupied nor front-line. Address lead: вул. Лесі Українки, 2, Луцьк (education.ua, undated). Activity leads for the 2026/27 cycle (master's intake 7–22 Aug 2026, college intake 12–17 Aug 2026) and an acting rector ("В.о. ректора — Пастрик Тетяна Володимирівна", education.ua) indicate a functioning institution. No merger, suspension or licence-revocation lead was found in a targeted search (реорганізація / ліцензія / акредитація 2025).  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: Name confusion: an English search for "Volyn Medical Institute" Lutsk returned ONLY Lesya Ukrainka Volyn National University (VNU) pages; VNU's medical unit was itself named "Educational and Scientific Medical Institute" in 2020–2021 (inventory block for lesya-ukrainka-volyn-national-university). The two are distinct legal entities (communal institute at вул. Лесі Українки 2 vs state university at просп. Волі 13), but a directory card titled "Volyn Medical Institute" invites conflation.  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: Relevance: nursing-level institute (223 Медсестринство bachelor/master, 053 psychology, plus a vocational college). No medicine, dentistry or pharmacy degree lead. No lead of any kind for admission of foreign citizens or English-medium teaching; the inventory flag "domestic intake" stands unchanged.  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: Ownership discrepancy in aggregators: osvita.ua lists "Форма власності: Державна" while the legal name and education.ua say Волинської обласної ради (communal). Probably stale catalogue data, unverified.  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: Fee figures differ between aggregator pages (28,300 UAH for 2025 vs 36,600 UAH bachelor / 45,850 UAH master for 2026); none read from the official page. Do not present either as current.  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: The structural unit Луцький базовий фаховий медичний коледж (фаховий коледж, professional junior bachelor level) appears on separate aggregator pages (education.ua/colleges/1998, vstup.osvita.ua r4/7042) and could be mistaken for a separate institution or for higher-education programmes ("Стоматологія ортопедична", "Лікувальна справа" are college-level, not dentistry/medicine degrees).  
   Closure (fill): 
12. Red flag to resolve before any fact is shown: Leadership listed as acting rector ("В.о. ректора") on education.ua — governance status unverified.  
   Closure (fill): 
13. Red flag to resolve before any fact is shown: No official English name, English site version or international page surfaced; "Volyn Medical Institute" is a translation.  
   Closure (fill): 
14. Missing evidence: No official page read: vmi.volyn.ua (and www.vmi.volyn.ua) could not be opened; everything above is a search-result lead. Needed: the institute's own 'Правила прийому 2026' (incl. any section on іноземці), the 'Перелік спеціальностей' and licence/fees pages, and the history page (foundation year, former names).  
   Closure (fill): 
15. Missing evidence: EDEBO registry entry (registry.edbo.gov.ua): legal name, ЄДРПОУ code, ownership form, licensed specialties (223, 053) and licence volumes — not found in search.  
   Closure (fill): 
16. Missing evidence: MON licence order for the second (master's) level in 223 Медсестринство and any NAQA accreditation decisions/certificates for the bachelor and master programmes — asserted only on institute material; the self-assessment PDF's programme and year are unknown.  
   Closure (fill): 
17. Missing evidence: Whether foreign citizens are admitted at all, under what conditions, and whether any teaching is in English — no lead in any direction.  
   Closure (fill): 
18. Missing evidence: Official English name and whether the site has an English version or an international applicants page — not found.  
   Closure (fill): 
19. Missing evidence: Current tuition fees from the official page (aggregators show 28,300 / 36,600 / 45,850 UAH for different years and levels).  
   Closure (fill): 
20. Missing evidence: Rector / acting rector confirmation (education.ua lists Пастрик Тетяна Володимирівна as в.о. ректора).  
   Closure (fill): 
21. Missing evidence: Ownership confirmation: communal (Volyn Regional Council) per legal name vs 'Державна' per osvita.ua.  
   Closure (fill): 
22. Missing evidence: Relationship and dates for the structural unit Луцький базовий фаховий медичний коледж (search summary mentioned a host lbmk.lutsk.ua — unverified, not seen in any result URL).  
   Closure (fill): 
23. Missing evidence: Level of the 'Екстрена медицина/парамедик' programme (bachelor per search summary only).  
   Closure (fill): 
24. Missing evidence: Note on domain: vmi.volyn.ua returned institutional pages and PDFs in two searches and both search summaries name it as the institute's site, but it is not confirmed by any government register — hence domainConfidence medium.  
   Closure (fill): 
25. Skeptic's note: Name-confusion risk: an English search for 'Volyn Medical Institute' Lutsk returned only Lesya Ukrainka Volyn National University (candidate), whose medical unit was itself called 'Educational and Scientific Medical Institute' in 2020-2021. The two are distinct legal entities (communal institute at вул. Лесі Українки 2 vs state university at просп. Волі 13); the profile must say so.  
   Closure (fill): 
26. Skeptic's note: No EDEBO, MON licence register, Study in Ukraine or NAQA entry surfaced; the master's licence in 223 Медсестринство is asserted only on the institute's own pages. Open question, not a bar.  
   Closure (fill): 
27. Skeptic's note: Qualifying degree leads are nursing only (bachelor «Сестринська справа», «Екстрена медицина/парамедик»; master «Сестринська справа»). No medicine, dentistry or pharmacy degree lead; the structural unit Луцький базовий фаховий медичний коледж offers only vocational programmes («Стоматологія ортопедична», «Лікувальна справа») that must not be shown as degrees.  
   Closure (fill): 
28. Skeptic's note: Ownership discrepancy (communal per legal name and education.ua vs 'Державна' on osvita.ua); acting rector only (В.о. ректора) per education.ua.  
   Closure (fill): 
29. Skeptic's note: No official English name or English site surfaced; 'Volyn Medical Institute' is a translation.  
   Closure (fill): 
30. Skeptic's note: Aggregator fee figures differ by year and page; none read from the official site.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/volyn-medical-institute.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
