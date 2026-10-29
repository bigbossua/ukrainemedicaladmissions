# Evidence register — Kharkiv Polytechnic Institute (`kharkiv-polytechnic-institute`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/kharkiv-polytechnic-institute.json`, checked 2026-10-26): **blocked**. Re-tested on 2026-10-26 from the build environment with the access probe (npm run probe:access -- --list research/verification/ALLOWLIST_ALL.txt; one HTTPS request to the root address of each host through the environment's proxy). Hosts for this record tested: kpi.kharkov.ua, mon.gov.ua, naqa.gov.ua, registry.edbo.gov.ua, studyinukraine.gov.ua, universities.studyinukraine.gov.ua, www.kpi.kharkov.ua. Result: 0 open, 7 refused at the proxy under the network policy ("proxy answered 403 to CONNECT"; 0 of 88 listed hosts open). Not on the probe list: bmpp.khpi.edu.ua, info.edbo.gov.ua. No official page or PDF was opened and no claim was checked. Previous attempts: 2026-10-11, 2026-10-12, 2026-10-24 (same result). Route to access: the owner adds the hosts under the environment's Network access → Allowed domains, or supplies captures. A refused request is an access limitation, never evidence about the university.

**Record under verification:** `site/src/content/universities/kharkiv-polytechnic-institute.json` — 0 programme(s) with an official-domain lead of international admission (); 2 deferred programme(s) kept unpublished until eligibility is read (Фармація, промислова фармація (speciality 226) / Pharmacy, Industrial Pharmacy — educational-professional programme of the Educational and Scientific Institute of Chemical Technologies and Engineering; graduating department named as Organic Synthesis and Pharmaceutical Technologies (2022 OPP) and Pharmacy and Chemical Technologies (2025 syllabus host), Навчально-науковий медичний інститут НТУ «ХПІ» (Educational and Scientific Medical Institute) — postgraduate physician training only per leads: interns in 'Внутрішні хвороби' and 'Загальна практика – сімейна медицина'; departments of Internal Diseases and Family Medicine, Radiology).

**Evidence store:** `site/data/evidence/kharkiv-polytechnic-institute.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `kharkiv-polytechnic-institute--NN--short-name.pdf` where NN is the row number of this register (e.g. `kharkiv-polytechnic-institute--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/kharkiv-polytechnic-institute.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [OPP 2022 for 226 Pharmacy, Industrial Pharmacy, bachelor level; names the owning](https://blogs.kpi.kharkov.ua/v2/nv/wp-content/uploads/sites/43/2024/01/226-OPP-2022.pdf) | OPP 2022 for 226 Pharmacy, Industrial Pharmacy, bachelor level; names the owning institute and graduating department *(Result date as shown: 2022 programme year; uploaded 2024-01 per URL path. Search-result lead, not read in full.)* |  |  |
| 2 | [2025 syllabus 'Вступ до спеціальності' of the Pharmacy and Chemical Technologies](https://web.kpi.kharkov.ua/pharmchem/wp-content/uploads/sites/126/2016/06/I8_Sylabus_Vstup-do-spetsialnosti_2025.pdf) | 2025 syllabus 'Вступ до спеціальності' of the Pharmacy and Chemical Technologies department - programme still taught in 2025 *(Result date as shown: 2025 (filename). Search-result lead, not read in full.)* |  |  |
| 3 | [University order No. 379ОД of 3 Sept 2021 enacting the Regulation on the Educati](https://blogs.kpi.kharkov.ua/v2/vr/wp-content/uploads/sites/27/2021/09/Rishennya-radi-protokol-8-2021.pdf) | University order No. 379ОД of 3 Sept 2021 enacting the Regulation on the Educational and Scientific Medical Institute *(Result date as shown: 2021-09-03. Search-result lead, not read in full.)* |  |  |
| 4 | [Academic council decision/order 2023 (surfaced for the medical-institute query; ](https://blogs.kpi.kharkov.ua/v2/vr/wp-content/uploads/sites/27/2023/04/Nakaz-rishennya-radi-protokol-3-2023.pdf) | Academic council decision/order 2023 (surfaced for the medical-institute query; content not described) *(Result date as shown: 2023-04. Search-result lead, not read in full.)* |  |  |
| 5 | [Medical institute department page: postgraduate intern training; address Pushkin](https://web.kpi.kharkov.ua/medicine/uk/vnutrishnih-hvorob-i-simejnoyi-medicini/) | Medical institute department page: postgraduate intern training; address Pushkinska 79, Kharkiv *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 6 | [Medical institute radiology department page](https://web.kpi.kharkov.ua/medicine/uk/radiologiyi) | Medical institute radiology department page *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 7 | [Repository paper 'Становлення та розвиток медико-фармацевтичної школи в НТУ ХПІ'](https://repository.kpi.kharkov.ua/handle/KhPI-Press/91025) | Repository paper 'Становлення та розвиток медико-фармацевтичної школи в НТУ ХПІ' (historical review) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 8 | [Institute of International Education notice: 2025/2026 recruitment of foreign st](https://web.kpi.kharkov.ua/mo/en/2024/08/13/recruitment-of-foreign-students-at-ntu-khpi-in-the-2025-2026/) | Institute of International Education notice: 2025/2026 recruitment of foreign students begun; refers to list of programmes in Ukrainian and English and to admission rules for foreigners *(Result date as shown: 2024-08-13. Search-result lead, not read in full.)* |  |  |
| 9 | [Institute of International Education (foreign students) section, English](https://web.kpi.kharkov.ua/mo/en/) | Institute of International Education (foreign students) section, English *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 10 | [2024 bachelor admissions roadmap (domestic NMT-based admission)](https://vstup.kpi.kharkov.ua/wp-content/uploads/2024/06/kht_dorozhna_karta_vstupnoi_kampanii_2024_roku_v_ntu_khpi_bak.pdf) | 2024 bachelor admissions roadmap (domestic NMT-based admission) *(Result date as shown: 2024-06. Search-result lead, not read in full.)* |  |  |
| 11 | [Background: founded 1885 as Kharkiv Technological Institute, Polytechnical Insti](https://en.wikipedia.org/wiki/Kharkiv_Polytechnic_Institute) | Background: founded 1885 as Kharkiv Technological Institute, Polytechnical Institute 1929, national university status 2000 (tertiary source) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 12 | [Encyclopedia of Ukraine entry (spelling 'Kharkiv Polytechnical Institute')](https://www.encyclopediaofukraine.com/pages%5CK%5CH%5CKharkivPolytechnicalInstituteNationalTechnicalUniversity.htm) | Encyclopedia of Ukraine entry (spelling 'Kharkiv Polytechnical Institute') *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 13 | [THE profile: 1501+ band 2025; bachelor's, master's, doctoral degrees](https://timeshighereducation.com/world-university-rankings/national-technical-university-kharkiv-polytechnic-institute) | THE profile: 1501+ band 2025; bachelor's, master's, doctoral degrees *(Result date as shown: 2025 rankings. Search-result lead, not read in full.)* |  |  |
| 14 | [uniRank profile (Ukrainian name slug; enrolment band; admission description) - t](https://www.unirank.org/ua/uni/національний-технічний-університет-“харківський-політехнічний-інститут”/) | uniRank profile (Ukrainian name slug; enrolment band; admission description) - tertiary *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 15 | [Journal article on the khpi.edu.ua host (shows the second official host); conten](https://bmpp.khpi.edu.ua/article/download/342007/329930/793999) | Journal article on the khpi.edu.ua host (shows the second official host); content not seen *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 16 | [Context only: war damage to another Kharkiv university (KhNMU), 2025; not about ](https://gwaramedia.com/en/kharkiv-national-medical-university-suffered-1-6-million-loss-because-of-damage-inflicted-by-russian-attacks/) | Context only: war damage to another Kharkiv university (KhNMU), 2025; not about KhPI *(Result date as shown: 2025. Search-result lead, not read in full.)* |  |  |
| 17 | [Educational and Scientific Medical Institute (official page)](https://www.kpi.kharkov.ua/eng/?p=5156) | Official page: institute set up by rector's order no. 206 OD of 30 April 2021; departments include General Pharmacy; the licence reported covers postgraduate education |  |  |
| 18 | [Foreign students news (official page)](https://www.kpi.kharkov.ua/eng/2024/11/29/ntu-khpi-is-among-the-top-3-university-leaders-in-ukraine-by-the-number-of-foreign-students/) | Official news item on foreign-student numbers |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [Ministry 'Study in Ukraine' portal contacts page: state (Governmental) ownership](https://universities.studyinukraine.gov.ua/en/minedu/university/83/contacts); [MON document surfaced for the medical-institute licence query; content not descr](https://mon.gov.ua/storage/app/media/pravo-diyalnosti/2020/April/13/%20123.pdf)

Third-party pages (leads only, never a source): [vstup.osvita.ua 2022 admissions listing for KhPI (region r27, institution 307); ](https://vstup.osvita.ua/y2022/r27/307/999569/); [vstup.osvita.ua 2023 admissions listing for KhPI; content not seen (also /y2023/](https://vstup.osvita.ua/y2023/r27/307/1210563/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: National Technical University "Kharkiv Polytechnic Institute" (lead: Study in Ukraine contacts page lists "National Technical University «Kharkiv Polytechnic Institute»"; THE ranking page uses the same wording) | [OPP 2022 for 226 Pharmacy, Industrial Pharmacy, bachelor level; names the owning](https://blogs.kpi.kharkov.ua/v2/nv/wp-content/uploads/sites/43/2024/01/226-OPP-2022.pdf) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://kpi.kharkov.ua/ | [OPP 2022 for 226 Pharmacy, Industrial Pharmacy, bachelor level; names the owning](https://blogs.kpi.kharkov.ua/v2/nv/wp-content/uploads/sites/43/2024/01/226-OPP-2022.pdf) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [OPP 2022 for 226 Pharmacy, Industrial Pharmacy, bachelor level; names the owning](https://blogs.kpi.kharkov.ua/v2/nv/wp-content/uploads/sites/43/2024/01/226-OPP-2022.pdf) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | unverified | LEAD: url: https://web.kpi.kharkov.ua/mo/en/ (Institute of International Education; recruitment notice: https://web.kpi.kharkov.ua/mo/en/2024/08/13/recruitment-of-foreign-students-at-ntu-khpi-in-the-2025-2026/; contacts shown in snippets: fmo@khpi.edu.ua, +38 (057) 707-66-34; an older page shows omsroot@kpi.kharkov.ua and +38 (057) 707-63-16) | [OPP 2022 for 226 Pharmacy, Industrial Pharmacy, bachelor level; names the owning](https://blogs.kpi.kharkov.ua/v2/nv/wp-content/uploads/sites/43/2024/01/226-OPP-2022.pdf) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [OPP 2022 for 226 Pharmacy, Industrial Pharmacy, bachelor level; names the owning](https://blogs.kpi.kharkov.ua/v2/nv/wp-content/uploads/sites/43/2024/01/226-OPP-2022.pdf) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [OPP 2022 for 226 Pharmacy, Industrial Pharmacy, bachelor level; names the owning](https://blogs.kpi.kharkov.ua/v2/nv/wp-content/uploads/sites/43/2024/01/226-OPP-2022.pdf) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [OPP 2022 for 226 Pharmacy, Industrial Pharmacy, bachelor level; names the owning](https://blogs.kpi.kharkov.ua/v2/nv/wp-content/uploads/sites/43/2024/01/226-OPP-2022.pdf) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [OPP 2022 for 226 Pharmacy, Industrial Pharmacy, bachelor level; names the owning](https://blogs.kpi.kharkov.ua/v2/nv/wp-content/uploads/sites/43/2024/01/226-OPP-2022.pdf) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [OPP 2022 for 226 Pharmacy, Industrial Pharmacy, bachelor level; names the owning](https://blogs.kpi.kharkov.ua/v2/nv/wp-content/uploads/sites/43/2024/01/226-OPP-2022.pdf) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `speciality-226-pharmacy-industrial-pharmacy-educational-professional-programme-of-the-educational-and-scientific-institute-of-chemical-technologies-and-engineering-graduating-department-named-as-organic-synthesis-and-pharmaceutical-technologies-2022-opp-and-pharmacy-and-chemical-technologies-2025-syllabus-host` — Фармація, промислова фармація (speciality 226) / Pharmacy, Industrial Pharmacy — educational-professional programme of the Educational and Scientific Institute of Chemical Technologies and Engineering; graduating department named as Organic Synthesis and Pharmaceutical Technologies (2022 OPP) and Pharmacy and Chemical Technologies (2025 syllabus host) (pharmacy) | `programmes.speciality-226-pharmacy-industrial-pharmacy-educational-professional-programme-of-the-educational-and-scientific-institute-of-chemical-technologies-and-engineering-graduating-department-named-as-organic-synthesis-and-pharmaceutical-technologies-2022-opp-and-pharmacy-and-chemical-technologies-2025-syllabus-host.internationalAdmission`; `programmes.speciality-226-pharmacy-industrial-pharmacy-educational-professional-programme-of-the-educational-and-scientific-institute-of-chemical-technologies-and-engineering-graduating-department-named-as-organic-synthesis-and-pharmaceutical-technologies-2022-opp-and-pharmacy-and-chemical-technologies-2025-syllabus-host.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [OPP 2022 for 226 Pharmacy, Industrial Pharmacy, bachelor level; names the owning](https://blogs.kpi.kharkov.ua/v2/nv/wp-content/uploads/sites/43/2024/01/226-OPP-2022.pdf) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `educational-and-scientific-medical-institute-postgraduate-physician-training-only-per-leads-interns-in-and-departments-of-internal-diseases-and-family-medicine-radiology` — Навчально-науковий медичний інститут НТУ «ХПІ» (Educational and Scientific Medical Institute) — postgraduate physician training only per leads: interns in 'Внутрішні хвороби' and 'Загальна практика – сімейна медицина'; departments of Internal Diseases and Family Medicine, Radiology (other) | `programmes.educational-and-scientific-medical-institute-postgraduate-physician-training-only-per-leads-interns-in-and-departments-of-internal-diseases-and-family-medicine-radiology.internationalAdmission`; `programmes.educational-and-scientific-medical-institute-postgraduate-physician-training-only-per-leads-interns-in-and-departments-of-internal-diseases-and-family-medicine-radiology.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [OPP 2022 for 226 Pharmacy, Industrial Pharmacy, bachelor level; names the owning](https://blogs.kpi.kharkov.ua/v2/nv/wp-content/uploads/sites/43/2024/01/226-OPP-2022.pdf) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Location lead as found (unverified): Kharkiv (lead: Study in Ukraine contacts page gives "Kyrpychova str. 2", postal code 61002; medical-institute department page gives "Харків 61002, вул. Пушкінська 79, Комплекс «Гігант»"). No relocation lead found.  
   Closure (fill): 
6. Relocation lead (unverified): No relocation lead found; all address leads place the university in Kharkiv (Kyrpychova St 2; medical departments at Pushkinska St 79). Continued operation is indicated by: the Institute of International Education notice dated 2024-08-13 'The main recruitment of foreign students at NTU "KhPI" in the 2025/2026 academic year has begun'; a 2025 syllabus for the 226 programme; a June 2024 admissions roadmap (vstup.kpi.kharkov.ua); and the Study in Ukraine search summary saying the official site 'has a page on admission of foreign students for the 2026/2027 academic year' and pages on 'distance learning for foreign students' (pages not read). Kharkiv is a front-line city: the search surfaced general reports of war damage to Kharkiv universities (e.g., Gwara Media 2025 on Kharkiv National Medical University) but no KhPI-specific damage, suspension or relocation report. Whether teaching is in person, online or mixed is unverified.  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: Weak fit for a medical-admissions directory: no undergraduate medicine, dentistry or master's pharmacy degree lead; the only health-related degree lead is a BACHELOR in 226 Pharmacy, Industrial Pharmacy (industrial/technological orientation), and the medical institute appears to be postgraduate internship training only (consistent with the earlier inventory note).  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: No lead that pharmacy is open to foreign applicants or taught in English; the 2025/2026 recruitment notice points to a programme list in Ukrainian and English that the search did not expose.  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: Front-line city (Kharkiv); general war-damage reports for Kharkiv universities exist, no KhPI-specific report found; in-person vs distance delivery unverified.  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: Two official-looking hosts in use (kpi.kharkov.ua for www/web/vstup/blogs/repository subdomains; khpi.edu.ua for e-mail and a journal host) - canonical domain unsettled.  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: Name/domain confusion: 'KPI' in kpi.kharkov.ua and the 'Polytechnic Institute' name invite confusion with Igor Sikorsky Kyiv Polytechnic Institute (kpi.ua); 'Навчально-науковий медичний інститут' is also the name of medical units at other universities (e.g., Sumy State University).  
   Closure (fill): 
12. Red flag to resolve before any fact is shown: Institution is titled 'Institute' but is a national technical UNIVERSITY (bachelor/master/doctoral per THE/uniRank leads); not a vocational 'фаховий коледж' - the title alone could mislead a reader.  
   Closure (fill): 
13. Red flag to resolve before any fact is shown: No EDEBO licence record, licensed volume or NAQA accreditation lead for 226 found; 222 Medicine licence lead explicitly not found.  
   Closure (fill): 
14. Missing evidence: EDEBO licence record for NTU KhPI: speciality 226 level(s) and licensed volume; confirmation that no 221/222/223 licence exists  
   Closure (fill): 
15. Missing evidence: Official 2025/2026 (and 2026/2027) list of programmes open to foreign applicants with language of instruction - whether 226 Pharmacy is included and whether any English-medium option exists  
   Closure (fill): 
16. Missing evidence: Existence of a master's-level 226 programme (only a bachelor's OPP 2022 found)  
   Closure (fill): 
17. Missing evidence: Current official programme list of the Educational and Scientific Medical Institute (undergraduate vs postgraduate only)  
   Closure (fill): 
18. Missing evidence: NAQA accreditation status of the 226 bachelor programme  
   Closure (fill): 
19. Missing evidence: Canonical official domain (kpi.kharkov.ua vs khpi.edu.ua) and the canonical international-admissions/apply page (the 'here' links in the recruitment notice were not resolved)  
   Closure (fill): 
20. Missing evidence: Official statement on 2025/2026 operating mode (in-person/distance), campus condition and any relocation  
   Closure (fill): 
21. Missing evidence: Tuition fees for foreign applicants  
   Closure (fill): 
22. Missing evidence: Study in Ukraine main profile page (only the contacts sub-page surfaced) and the content of the 2020-04-13 MON document  
   Closure (fill): 
23. Missing evidence: vstup.osvita.ua 2025 listing content for 226 at KhPI (only 2022/2023 listing URLs surfaced, unread)  
   Closure (fill): 
24. Skeptic's note: The only health-degree lead is a BACHELOR in 226 Фармація, промислова фармація (OPP 2022; 2025 syllabus of the Pharmacy and Chemical Technologies department; 2022/2023 vstup.osvita.ua listings, content unread). No master's 226 found, so no lead to a pharmacist qualification; the orientation is industrial.  
   Closure (fill): 
25. Skeptic's note: The Educational and Scientific Medical Institute appears to train interns only (postgraduate); no undergraduate 222 Medicine licence lead was found. It must not be presented as a medicine degree route.  
   Closure (fill): 
26. Skeptic's note: No lead that pharmacy is open to foreign applicants or taught in English; the 2025/2026 recruitment notice points to a programme list not exposed by search.  
   Closure (fill): 
27. Skeptic's note: Kharkiv is a front-line city; delivery mode (in person, distance) and campus condition are unverified; no KhPI-specific damage or relocation report found.  
   Closure (fill): 
28. Skeptic's note: Canonical domain unsettled: kpi.kharkov.ua (www, web, vstup, blogs, repository) versus khpi.edu.ua (e-mail, journal host); domain confidence medium.  
   Closure (fill): 
29. Skeptic's note: No EDEBO licence record, licensed volume or NAQA accreditation lead for 226; Study in Ukraine portal main profile not surfaced (contacts sub-page only).  
   Closure (fill): 
30. Skeptic's note: Title says 'Institute' although it is a national technical university; readers may misjudge the institution type.  
   Closure (fill): 
31. Name lead (unverified): National Technical University "Kharkiv Polytechnic Institute" (lead: Study in Ukraine contacts page lists "National Technical University «Kharkiv Polytechnic Institute»"; THE ranking page uses the same wording)  
   Closure (fill): 
32. Name lead (unverified): Національний технічний університет «Харківський політехнічний інститут» (lead: inventory alias; uniRank URL slug "національний-технічний-університет-“харківський-політехнічний-інститут”"; abbreviated НТУ «ХПІ» in university PDFs)  
   Closure (fill): 
33. Name lead (unverified): Kharkiv Polytechnical Institute (Encyclopedia of Ukraine spelling; 1929 name)  
   Closure (fill): 
34. Name lead (unverified): Kharkiv Technological Institute (1885 predecessor, per Wikipedia/Encyclopedia of Ukraine leads)  
   Closure (fill): 
35. Name lead (unverified): Навчально-науковий медичний інститут НТУ «ХПІ» (its medical unit, per 2021 order lead)  
   Closure (fill): 
36. Name lead (unverified): Навчально-науковий інститут хімічних технологій та інженерії (unit that owns the 226 pharmacy programme, per OPP 2022 lead)  
   Closure (fill): 
37. Name lead (unverified): Institute of International Education / web.kpi.kharkov.ua/mo (foreign-student unit)  
   Closure (fill): 
38. No source of 2026-10-25 confirms an undergraduate Medicine (222) or Pharmacy programme open to international applicants; the medical institute's reported licence covers postgraduate education only. Keep every programme area as a lead until the admission rules for foreigners are read.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/kharkiv-polytechnic-institute.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
