# Evidence register — International Academy of Ecology and Medicine (`international-academy-of-ecology-and-medicine`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/international-academy-of-ecology-and-medicine.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: maem.kiev.ua, universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/international-academy-of-ecology-and-medicine.json` — 0 programme(s) with an official-domain lead of international admission (); 4 deferred programme(s) kept unpublished until eligibility is read (Стоматологія (221) — освітня програма «Лікар-стоматолог», медичний факультет, Медицина (222) — освітня програма «Лікар», Медично-фармацевтичний коледж МАЕМ (subordinate college) — no academy-level pharmacy degree programme found, Медсестринство (223) — not found).

**Evidence store:** `site/data/evidence/international-academy-of-ecology-and-medicine.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `international-academy-of-ecology-and-medicine--NN--short-name.pdf` where NN is the row number of this register (e.g. `international-academy-of-ecology-and-medicine--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/international-academy-of-ecology-and-medicine.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [Aggregator profile: 'приватна академія', created for education 'на платній основ](https://osvita.ua/vnz/guide/521/) | Aggregator profile: 'приватна академія', created for education 'на платній основі' for citizens, foreigners and stateless persons; address 'Харківське шосе, 121'; website given as maem.kiev.ua *(Result date as shown: undated (viewed via search 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 2 | [Aggregator profile 'Міжнародна академія екології та медицини (МАЕМ) у Києві'; '7](https://www.education.ua/universities/66/) | Aggregator profile 'Міжнародна академія екології та медицини (МАЕМ) у Києві'; '780 студентів', '178 викладачів'; dentistry master's offer 2026 (52 000 UAH/yr, 24 contract places); medicine 50 000 UAH/ *(Result date as shown: 2026 intake data; profile figures undated. Search-result lead, not read in full.)* |  |  |
| 3 | [Marzieiev Institute for Public Health (NAMS Ukraine) news: cooperation agreement](https://health.gov.ua/en/events/main-events-of-the-institute-2024/22-11-2024-cooperation-agreement-with-the-international-academy-of-ecology-and-medicine/) | Marzieiev Institute for Public Health (NAMS Ukraine) news: cooperation agreement signed 21 Nov 2024 with 'the Private Higher Educational Institution «International Academy of Ecology and Medicine»'; a *(Result date as shown: 2024-11-22. Search-result lead, not read in full.)* |  |  |
| 4 | [Conference proceedings 'Ecology and Medicine' 2021 hosted by the academy (first ](https://health.gov.ua/wp-content/uploads/2024/03/ecology-and-medicine-conference-proceedings-2021.pdf) | Conference proceedings 'Ecology and Medicine' 2021 hosted by the academy (first spring conference 2021) *(Result date as shown: 2021 (uploaded 2024-03). Search-result lead, not read in full.)* |  |  |
| 5 | [International European University rector's report 2021: cooperation with MAEM on](https://ieu.edu.ua/docs/zvit-rectora-2021-v8.pdf) | International European University rector's report 2021: cooperation with MAEM on academic mobility, student exchange and shared use of clinics *(Result date as shown: 2021. Search-result lead, not read in full.)* |  |  |
| 6 | [Foreign aggregator: 'Estd in 2012 | Private University'; location line says 'Sev](https://studyabroad.careers360.com/ukraine/universities/international-academy-of-ecology-and-medicine-kyiv-unpg) | Foreign aggregator: 'Estd in 2012 | Private University'; location line says 'Sevastopol' — contradicts Kyiv leads *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 7 | [Encyclopedia of Modern Ukraine PDF returned for the Ukrainian name query; conten](https://www.esu.com.ua/pdf/file/42852.pdf) | Encyclopedia of Modern Ukraine PDF returned for the Ukrainian name query; content not read *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [MON order executing court decision 09.09.2019 No. 640/12300/19 cancelling MON or](https://mon.gov.ua/storage/app/media/pravo-diyalnosti/2019/12/12/1007.pdf); [MON licensing document naming the academy's Медично-фармацевтичний коледж at '02](https://mon.gov.ua/storage/app/media/pravo-diyalnosti/2018/10/mizhnarodna-akademiya-ekologii-ta-meditsini13.pdf); [MON licensing file for ПВНЗ «Міжнародна академія екології та медицини» (content ](https://mon.gov.ua/storage/app/media/pravo-diyalnosti/pvnz-mizhnarodna-akademiya-ekologiyi-ta-mediczini-14-08.pdf); [NAQA accreditation-case table (also 27.07.2021 and 21.06.2022 tables surfaced); ](https://naqa.gov.ua/wp-content/uploads/2023/03/Додаток-2-Таблиця-акредитаційних-справ_21.03.2023-.pdf)

Third-party pages (leads only, never a source): [Admissions aggregator institution page (osvita id 1292, region 27 = Kyiv): «Ліка](https://vstup.osvita.ua/r27/1292/); [Medicine (222) master's «Лікар» 2025 card: non-budget, full-time, 40 000 UAH/yr,](https://vstup.osvita.ua/y2025/r27/1292/1479975/); [Medicine master's 2026 card: 50 000 UAH/yr, applications 19.07.2026–01.08.2026](https://vstup.osvita.ua/y2026/r27/1292/1610471/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Private Higher Educational Institution "International Academy of Ecology and Medicine" (English form used by health.gov.ua, Nov 2024; search-result lead, no official page read) | [Aggregator profile: 'приватна академія', created for education 'на платній основ](https://osvita.ua/vnz/guide/521/) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://maem.kiev.ua/ | [Aggregator profile: 'приватна академія', created for education 'на платній основ](https://osvita.ua/vnz/guide/521/) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [Aggregator profile: 'приватна академія', created for education 'на платній основ](https://osvita.ua/vnz/guide/521/) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | not-published | — (no lead) | [Aggregator profile: 'приватна академія', created for education 'на платній основ](https://osvita.ua/vnz/guide/521/) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [Aggregator profile: 'приватна академія', created for education 'на платній основ](https://osvita.ua/vnz/guide/521/) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [Aggregator profile: 'приватна академія', created for education 'на платній основ](https://osvita.ua/vnz/guide/521/) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [Aggregator profile: 'приватна академія', created for education 'на платній основ](https://osvita.ua/vnz/guide/521/) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [Aggregator profile: 'приватна академія', created for education 'на платній основ](https://osvita.ua/vnz/guide/521/) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [Aggregator profile: 'приватна академія', created for education 'на платній основ](https://osvita.ua/vnz/guide/521/) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `221` — Стоматологія (221) — освітня програма «Лікар-стоматолог», медичний факультет (dentistry) | `programmes.221.internationalAdmission`; `programmes.221.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Aggregator profile: 'приватна академія', created for education 'на платній основ](https://osvita.ua/vnz/guide/521/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `222` — Медицина (222) — освітня програма «Лікар» (medicine) | `programmes.222.internationalAdmission`; `programmes.222.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Aggregator profile: 'приватна академія', created for education 'на платній основ](https://osvita.ua/vnz/guide/521/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `subordinate-college-no-academy-level-pharmacy-degree-programme-found` — Медично-фармацевтичний коледж МАЕМ (subordinate college) — no academy-level pharmacy degree programme found (pharmacy) | `programmes.subordinate-college-no-academy-level-pharmacy-degree-programme-found.internationalAdmission`; `programmes.subordinate-college-no-academy-level-pharmacy-degree-programme-found.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Aggregator profile: 'приватна академія', created for education 'на платній основ](https://osvita.ua/vnz/guide/521/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `223-not-found` — Медсестринство (223) — not found (nursing) | `programmes.223-not-found.internationalAdmission`; `programmes.223-not-found.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [Aggregator profile: 'приватна академія', created for education 'на платній основ](https://osvita.ua/vnz/guide/521/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Location lead as found (unverified): Kyiv (lead: osvita.ua address "Харківське шосе, 121"; the academy's medical-pharmaceutical college at "02660, м. Київ, вул. В. Шимановського, 2/1" per MON 2018 document)  
   Closure (fill): 
6. Relocation lead (unverified): No relocation lead. Every Ukrainian source (osvita.ua, vstup.osvita.ua, education.ua, MON documents, health.gov.ua) places the academy in Kyiv, with 2025 and 2026 competitive offers listed and a cooperation agreement signed 21 Nov 2024 (acting rector named as Ivan Savytskyi). The Careers360 aggregator page shows a location line "Sevastopol, Ukraine | Estd in 2012 | Private University" under a Kyiv title; this contradicts all other leads and looks like an aggregator error, but it is unverified and is recorded as a red flag rather than a relocation.  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: Licence history: MON order No. 826-л (12.06.2019) refused expansion to master's level in 222 Medicine and 221 Dentistry; the refusal was cancelled by Kyiv District Administrative Court (09.09.2019, No. 640/12300/19) and MON issued a follow-up order in Dec 2019. Current licensed scope and volumes are unverified (2025 aggregator shows licensed volume 90 for dentistry).  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: No NAQA programme accreditation record for MAEM visible in the 2021-2023 NAQA decision tables that surfaced; accreditation of the Medicine and Dentistry master's programmes is unverified.  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: Careers360 lists the location as 'Sevastopol' (occupied Crimea) under a Kyiv-titled page; all Ukrainian sources say Kyiv. Treat as aggregator error until confirmed; do not propagate.  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: Name spelling varies between 'екології та медицини' (osvita.ua, health.gov.ua, education.ua) and 'екології і медицини' (MON Dec 2019 order); easy to miss in registry searches.  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: Possible name confusion with the NAS Ukraine 'International Center for Astronomical, Medical and Ecological Research' (Міжнародний центр астрономічних та медико-екологічних досліджень), a separate research body in Kyiv.  
   Closure (fill): 
12. Red flag to resolve before any fact is shown: Official domain maem.kiev.ua is attested only by the osvita.ua publisher family; a direct search for maem.kiev.ua returned no pages from the domain itself.  
   Closure (fill): 
13. Red flag to resolve before any fact is shown: Aggregator data inconsistent: dentistry duration shown as both '4 роки 9 місяців (2026–2031)' and 2026–2032; application windows shown as both 19 July–1 Aug and 1–28 Sept; education.ua's '780 students / 178 teachers' figure is undated.  
   Closure (fill): 
14. Red flag to resolve before any fact is shown: No lead for English-medium teaching, foreign-applicant admission rules, or an international office; the only foreigner mention is the statutory purpose wording on osvita.ua.  
   Closure (fill): 
15. Red flag to resolve before any fact is shown: Reported cooperation with the private International European University (IEU rector report 2021: 'академічної мобільності та спільного використання клінік') — not a merger lead, but check that profiles for the two private Kyiv institutions are not conflated.  
   Closure (fill): 
16. Missing evidence: Official website content: maem.kiev.ua not reachable from here and attested only by the osvita.ua publisher family; official name, address, rector, contacts and admissions pages all unread.  
   Closure (fill): 
17. Missing evidence: EDEBO registry entry (registry.edbo.gov.ua): institution ID, legal status, current licences and licensed volumes for 221 Dentistry and 222 Medicine master's.  
   Closure (fill): 
18. Missing evidence: Outcome of the 2019 licence dispute: the exact scope of the Dec 2019 MON expansion order and any later licence changes.  
   Closure (fill): 
19. Missing evidence: NAQA accreditation certificates (or conditional/denied decisions) for the Medicine and Dentistry programmes.  
   Closure (fill): 
20. Missing evidence: Any admission route for foreign applicants: foreign-applicant rules, invitation/visa support, English-medium (or any non-Ukrainian) teaching, tuition for foreigners (only UAH domestic contract fees found).  
   Closure (fill): 
21. Missing evidence: International office / international-applicants page URL (not found).  
   Closure (fill): 
22. Missing evidence: Ministry 'Study in Ukraine' (USCIE) portal listing (not found).  
   Closure (fill): 
23. Missing evidence: Pharmacy and nursing: whether any higher-education programme exists (none found); status and relationship of the subordinate 'Медично-фармацевтичний коледж'.  
   Closure (fill): 
24. Missing evidence: Founding year (Careers360 '2012' unverified) and current rector (acting rector Ivan Savytskyi per Nov 2024 third-party news).  
   Closure (fill): 
25. Missing evidence: Reconciliation of the two Kyiv addresses (Kharkivske shose 121 vs Shymanovskoho 2/1) and of inconsistent aggregator programme durations and application windows.  
   Closure (fill): 
26. Skeptic's note: Careers360 shows 'Sevastopol, Ukraine' as the location under a Kyiv-titled page. All Ukrainian sources (osvita.ua, vstup.osvita.ua, education.ua, MON licensing orders 2018/2019, health.gov.ua Nov 2024) place the academy in Kyiv with 2025 and 2026 admission offers; the Careers360 line is internally inconsistent and judged an aggregator error, not credible contradictory evidence on jurisdiction. Do not propagate it.  
   Closure (fill): 
27. Skeptic's note: Licence history: MON order 826-л (12.06.2019) refused expansion to Master's in 222 Medicine / 221 Dentistry; refusal cancelled by Kyiv District Administrative Court (09.09.2019) and followed by a Dec 2019 MON order. Current licensed scope is unverified. Open question, not a bar.  
   Closure (fill): 
28. Skeptic's note: No NAQA accreditation record visible for its Medicine or Dentistry programmes in the 2021-2023 decision tables that surfaced (absence in snippets is not proof).  
   Closure (fill): 
29. Skeptic's note: Domain maem.kiev.ua is attested only by the osvita.ua publisher family (low confidence); no page from the domain itself surfaced.  
   Closure (fill): 
30. Skeptic's note: Name spelling varies ('екології та медицини' vs MON's 'екології і медицини'); possible confusion with the NAS 'International Center for Astronomical, Medical and Ecological Research' (a research body, not a HEI).  
   Closure (fill): 
31. Skeptic's note: Two Kyiv addresses (Kharkivske shose 121 vs Shymanovskoho 2/1, the latter its medical-pharmaceutical college) not reconciled; aggregator durations and application windows inconsistent.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/international-academy-of-ecology-and-medicine.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
