# Evidence register — Lesya Ukrainka Volyn National University (`lesya-ukrainka-volyn-national-university`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/lesya-ukrainka-volyn-national-university.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: vnu.edu.ua, universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/lesya-ukrainka-volyn-national-university.json` — 0 programme(s) with an official-domain lead of international admission (); 3 deferred programme(s) kept unpublished until eligibility is read (Медицина / Medicine (specialty 222), Medical Faculty, Стоматологія / Dentistry (specialty 221), Postgraduate internship (інтернатура) at the Medical Faculty).

**Evidence store:** `site/data/evidence/lesya-ukrainka-volyn-national-university.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `lesya-ukrainka-volyn-national-university--NN--short-name.pdf` where NN is the row number of this register (e.g. `lesya-ukrainka-volyn-national-university--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/lesya-ukrainka-volyn-national-university.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [English name; 'state-sponsored university in Lutsk'; roots in a 1940 teachers' i](https://en.wikipedia.org/wiki/Lesya_Ukrainka_Volyn_National_University) | English name; 'state-sponsored university in Lutsk'; roots in a 1940 teachers' institute; 1993 presidential decree granted university status; infobox ~12,369 students, rector Anatolii Tsos (possibly d *(Result date as shown: undated (encyclopedia; search 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 2 | [First master's graduates of the Medical Faculty received diplomas on 23 June 202](https://vnu.edu.ua/en/news/universitet-imeni-lesi-ukrainki-vipustiv-pershikh-magistriv-medikiv) | First master's graduates of the Medical Faculty received diplomas on 23 June 2025 *(Result date as shown: 2025-06-23 (event date per snippet). Search-result lead, not read in full.)* |  |  |
| 3 | [Interns start studies; Dean of Medical Faculty Andrii Poruchynskyi](https://vnu.edu.ua/en/news/lesya-ukrainka-university-interns-start-their-studies) | Interns start studies; Dean of Medical Faculty Andrii Poruchynskyi *(Result date as shown: not shown. Search-result lead, not read in full.)* |  |  |
| 4 | [Medical Faculty department; address 'Lutsk, Bankova Street, 9'](https://wiki.vnu.edu.ua/wiki/Department_of_Internal_and_Family_Medicine) | Medical Faculty department; address 'Lutsk, Bankova Street, 9' *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 5 | [Review of the educational-professional programme 'Medicine' (master, 222) as the](https://vnu.edu.ua/sites/default/files/2022-03/%D0%A0%D0%B5%D1%86%D0%B5%D0%BD%D0%B7%202.%202020.pdf) | Review of the educational-professional programme 'Medicine' (master, 222) as the basis for creating the Medical Faculty *(Result date as shown: 2020 review; uploaded 2022-03. Search-result lead, not read in full.)* |  |  |
| 6 | [2026/2027 tuition: Dentistry and Medicine 58,700 UAH/year; increases up to 28%](https://zaxid.net/podorozhchannya_do_28_volinskiy_universitet_imeni_lesi_ukrayinki_zatverdiv_tsini_dlya_vstupnikiv_n1639300) | 2026/2027 tuition: Dentistry and Medicine 58,700 UAH/year; increases up to 28% *(Result date as shown: 2026 (2026/2027 entrants). Search-result lead, not read in full.)* |  |  |
| 7 | [Earlier tuition approval article (figures not in snippet)](https://zaxid.net/volinskiy_universitet_imeni_lesi_ukrayinki_zatverdiv_vartist_navchannya_dlya_vstupnikiv_n1614725) | Earlier tuition approval article (figures not in snippet) *(Result date as shown: not shown. Search-result lead, not read in full.)* |  |  |
| 8 | [2025 admission rules; links to registry.edbo.gov.ua/university/44 (EDEBO id 44 l](https://vstup.vnu.edu.ua/wp-content/uploads/2025/04/І.pdf) | 2025 admission rules; links to registry.edbo.gov.ua/university/44 (EDEBO id 44 lead); rules approved by Academic Council under MON procedure *(Result date as shown: 2025-04 (upload path). Search-result lead, not read in full.)* |  |  |
| 9 | ['Study in LUVNU' page of the International Relations Office](https://inter-dep.vnu.edu.ua/?p=4736) | 'Study in LUVNU' page of the International Relations Office *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 10 | [Admission procedures and required documents for foreign applicants](https://inter-dep.vnu.edu.ua/enrolment-procedures-required-documents/) | Admission procedures and required documents for foreign applicants *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 11 | [Invitation to foreign citizens; teaching languages Ukrainian, English, French, G](https://vnu.edu.ua/uk/news/lesya-ukrainka-volyn-national-university-invites-foreign-citizens-enroll-bachelors-masters) | Invitation to foreign citizens; teaching languages Ukrainian, English, French, German; strengths listed exclude medicine *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 12 | [Two intake windows (deadlines 1 November and 1 March); MON invitation letter; pr](https://vnu.edu.ua/en/news/incoming-students) | Two intake windows (deadlines 1 November and 1 March); MON invitation letter; pre-study courses in Ukrainian or Russian *(Result date as shown: references 2020-2021 academic year. Search-result lead, not read in full.)* |  |  |
| 13 | [Aggregator listing: 'Волинський національний університет імені Лесі Українки (ВН](https://www.education.ua/universities/39/) | Aggregator listing: 'Волинський національний університет імені Лесі Українки (ВНУ)'; ~9,873 students, 722 staff; faculties incl. philology, history, medicine, economics, psychology, law *(Result date as shown: undated aggregator. Search-result lead, not read in full.)* |  |  |
| 14 | [Cabinet of Ministers order No. 426-r of 04.07.2012 approving the rename Volyn Na](https://osvita.ua/legislation/Vishya_osvita/30155/) | Cabinet of Ministers order No. 426-r of 04.07.2012 approving the rename Volyn National University -> Eastern European National University *(Result date as shown: 2012-07-04. Search-result lead, not read in full.)* |  |  |
| 15 | [MON order No. 1471 of 26.11.2020 lists journals of 'Волинського національного ун](https://ra.vnu.edu.ua/dva-periodychnyh-vydannya-universytetu-vklyucheno-do-pereliku-naukovyh-fahovyh-vydan-ukrayiny-kategoriyi-b) | MON order No. 1471 of 26.11.2020 lists journals of 'Волинського національного університету імені Лесі Українки' (name back in use by late 2020) *(Result date as shown: 2020-11-26 (order date). Search-result lead, not read in full.)* |  |  |
| 16 | [Accreditation expert-group report hosted by the university (programme not named ](https://vnu.edu.ua/sites/default/files/2024-02/%D0%97%D0%B2%D1%96%D1%82%20%D0%BF%D1%80%D0%BE%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B8%20%D0%B0%D0%BA%D1%80%D0%B5%D0%B4%D0%B8%D1%82%D0%B0%D1%86%D1%96%D0%B9%D0%BD%D0%BE%D1%97%20%D0%B5%D0%BA%D1%81%D0%BF%D0%B5%D1%80%D1%82%D0%B8%D0%B7%D0%B8%20%D0%BE%D1%81%D0%B2%D1%96%D1%82%D0%BD%D1%8C%D0%BE%D1%97%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%B8_2.pdf) | Accreditation expert-group report hosted by the university (programme not named in snippet; a 2023-03 sibling PDF also exists) *(Result date as shown: uploaded 2024-02. Search-result lead, not read in full.)* |  |  |
| 17 | [uniRank listing (third-party)](https://www.unirank.org/ua/uni/lesya-ukrainka-volyn-national-university/) | uniRank listing (third-party) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |

Third-party pages (leads only, never a source): [222 Medicine: Master, Medical Faculty, full-time; licence volume and contract fe](https://vstup.osvita.ua/y2024/r4/44/1308487/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Lesya Ukrainka Volyn National University (search-result lead: Wikipedia article title; vnu.edu.ua/uk news slug "lesya-ukrainka-volyn-national-university-invites-foreign-citizens..."; inter-dep.vnu.edu.ua uses "LUVNU") | [English name; 'state-sponsored university in Lutsk'; roots in a 1940 teachers' i](https://en.wikipedia.org/wiki/Lesya_Ukrainka_Volyn_National_University) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://vnu.edu.ua/ | [English name; 'state-sponsored university in Lutsk'; roots in a 1940 teachers' i](https://en.wikipedia.org/wiki/Lesya_Ukrainka_Volyn_National_University) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [English name; 'state-sponsored university in Lutsk'; roots in a 1940 teachers' i](https://en.wikipedia.org/wiki/Lesya_Ukrainka_Volyn_National_University) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | unverified | LEAD: url: https://inter-dep.vnu.edu.ua/ (International Relations Office; pages seen in results: "Study in LUVNU" https://inter-dep.vnu.edu.ua/?p=4736 and "Admission procedures & required documents" https://inter-dep.vnu.edu.ua/enrolment-procedures-required-documents/; also https://vnu.edu.ua/en/news/incoming-students, which references the 2020-2021 academic year) | [English name; 'state-sponsored university in Lutsk'; roots in a 1940 teachers' i](https://en.wikipedia.org/wiki/Lesya_Ukrainka_Volyn_National_University) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [English name; 'state-sponsored university in Lutsk'; roots in a 1940 teachers' i](https://en.wikipedia.org/wiki/Lesya_Ukrainka_Volyn_National_University) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [English name; 'state-sponsored university in Lutsk'; roots in a 1940 teachers' i](https://en.wikipedia.org/wiki/Lesya_Ukrainka_Volyn_National_University) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [English name; 'state-sponsored university in Lutsk'; roots in a 1940 teachers' i](https://en.wikipedia.org/wiki/Lesya_Ukrainka_Volyn_National_University) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [English name; 'state-sponsored university in Lutsk'; roots in a 1940 teachers' i](https://en.wikipedia.org/wiki/Lesya_Ukrainka_Volyn_National_University) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [English name; 'state-sponsored university in Lutsk'; roots in a 1940 teachers' i](https://en.wikipedia.org/wiki/Lesya_Ukrainka_Volyn_National_University) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `medicine-specialty-222-medical-faculty` — Медицина / Medicine (specialty 222), Medical Faculty (medicine) | `programmes.medicine-specialty-222-medical-faculty.internationalAdmission`; `programmes.medicine-specialty-222-medical-faculty.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [English name; 'state-sponsored university in Lutsk'; roots in a 1940 teachers' i](https://en.wikipedia.org/wiki/Lesya_Ukrainka_Volyn_National_University) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `dentistry-specialty-221` — Стоматологія / Dentistry (specialty 221) (dentistry) | `programmes.dentistry-specialty-221.internationalAdmission`; `programmes.dentistry-specialty-221.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [English name; 'state-sponsored university in Lutsk'; roots in a 1940 teachers' i](https://en.wikipedia.org/wiki/Lesya_Ukrainka_Volyn_National_University) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `postgraduate-internship-at-the-medical-faculty` — Postgraduate internship (інтернатура) at the Medical Faculty (medicine) | `programmes.postgraduate-internship-at-the-medical-faculty.internationalAdmission`; `programmes.postgraduate-internship-at-the-medical-faculty.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [English name; 'state-sponsored university in Lutsk'; roots in a 1940 teachers' i](https://en.wikipedia.org/wiki/Lesya_Ukrainka_Volyn_National_University) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Location lead as found (unverified): Lutsk (Луцьк), Volyn Oblast  
   Closure (fill): 
6. Relocation lead (unverified): No relocation lead. Lutsk, Volyn Oblast (north-west Ukraine) is the reported base in every lead; the Department of Internal and Family Medicine lists "Lutsk, Bankova Street, 9" (wiki.vnu.edu.ua, undated). Recent activity leads: first Medical Faculty masters graduated 23 June 2025 (vnu.edu.ua/en news); tuition for 2026/2027 entrants approved (zaxid.net, headline "Подорожчання до 28%"). No occupied-territory or front-line lead.  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: No lead shows foreign applicants admitted to, or English-medium teaching of, Medicine or Dentistry. The university's own invitation to foreign citizens (vnu.edu.ua/uk news, undated) names teaching languages Ukrainian, English, French and German and lists strengths in economics, information systems, international relations, tourism and journalism; medicine is not mentioned. Consistent with the inventory flag 'no programme for foreigners shown'.  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: The Medical Faculty is new (programme review dated 2020; first master's graduates 23 June 2025). No NAQA accreditation decision for 222 Medicine was found; accreditation status is unverified.  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: Dentistry (221) rests on one 2026/2027 fee snippet from zaxid.net; no licence, EDEBO or NAQA lead.  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: Name confusion risk: (a) a separate communal institution 'Volyn Medical Institute' (КЗВО «Волинський медичний інститут» Волинської обласної ради, Lutsk) exists in the inventory (group G) and is NOT the same body; (b) 2012-2020 name 'Lesya Ukrainka Eastern European National University' still appears in third-party and academic sources.  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: International-applicant pages seen in results reference the 2020-2021 academic year (deadlines 1 November and 1 March; pre-study language courses in Ukrainian or Russian, 6-10 months) and may be outdated; no current international prospectus found.  
   Closure (fill): 
12. Red flag to resolve before any fact is shown: Tuition volatility: contract fees for Medicine rose from about 29,500-40,000 UAH/year (2022-2024, vstup.osvita.ua) to 58,700 UAH/year for 2026/2027 entrants (zaxid.net); figures are domestic contract fees, not foreign-applicant fees.  
   Closure (fill): 
13. Red flag to resolve before any fact is shown: All findings are search-result leads; no official page, EDEBO record or NAQA record was read (network policy blocks those hosts).  
   Closure (fill): 
14. Missing evidence: EDEBO record (registry.edbo.gov.ua/university/44) read directly: legal name, ownership, licence for 222 Medicine and 221 Dentistry, current licence volumes  
   Closure (fill): 
15. Missing evidence: NAQA accreditation decision(s) for 222 Medicine and 221 Dentistry (not found in any lead)  
   Closure (fill): 
16. Missing evidence: Whether foreign applicants are admitted to Medicine/Dentistry at all, in which language, and any English-medium medicine programme (no lead found)  
   Closure (fill): 
17. Missing evidence: Study in Ukraine portal (studyinukraine.gov.ua) listing (not found)  
   Closure (fill): 
18. Missing evidence: Dentistry (221): level, start year, licence, first intake (only a 2026/2027 fee snippet)  
   Closure (fill): 
19. Missing evidence: Nursing (223) and Pharmacy (226) programmes: not found in results  
   Closure (fill): 
20. Missing evidence: The 2020 legal act (presidential decree or order) that restored the name 'Volyn National University'  
   Closure (fill): 
21. Missing evidence: Current international-office content and foreign-applicant fees (pages seen reference 2020-2021)  
   Closure (fill): 
22. Missing evidence: Any official page of vnu.edu.ua read directly (network policy blocked official hosts; every item above is a search-result lead)  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/lesya-ukrainka-volyn-national-university.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
