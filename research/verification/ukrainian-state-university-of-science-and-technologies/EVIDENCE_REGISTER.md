# Evidence register — Ukrainian State University of Science and Technologies (`ukrainian-state-university-of-science-and-technologies`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/ukrainian-state-university-of-science-and-technologies.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: ust.edu.ua, universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/ukrainian-state-university-of-science-and-technologies.json` — 0 programme(s) with an official-domain lead of international admission (); 2 deferred programme(s) kept unpublished until eligibility is read (Фармація, промислова фармація / Pharmacy, industrial pharmacy (specialty code shown as 'I8' on the 2025 admissions-aggregator card; the pre-2025 code was 226), 226 Фармація, промислова фармація — HISTORICAL lead at the predecessor Ukrainian State University of Chemical Technology (vstup.osvita.ua institution id 216), 2017 intake).

**Evidence store:** `site/data/evidence/ukrainian-state-university-of-science-and-technologies.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `ukrainian-state-university-of-science-and-technologies--NN--short-name.pdf` where NN is the row number of this register (e.g. `ukrainian-state-university-of-science-and-technologies--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/ukrainian-state-university-of-science-and-technologies.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [English name; merger history (formed 2021; chemical-technology university joined](https://en.wikipedia.org/wiki/Ukrainian_State_University_of_Science_and_Technologies) | English name; merger history (formed 2021; chemical-technology university joined 'in 2024' per search summary) *(Result date as shown: undated (search 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 2 | [Official About page lead: 'brand new, powerful technical university that establi](https://ust.edu.ua/about-university) | Official About page lead: 'brand new, powerful technical university that established at the end of 2021, located in Dnipro'; UDKhTU and Prydniprovska State Academy of Civil Engineering and Architectur *(Result date as shown: undated (search 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 3 | [7 educational and scientific institutes; 'Ukrainian and English as the languages](https://ust.edu.ua/general-information/) | 7 educational and scientific institutes; 'Ukrainian and English as the languages of the educational process' *(Result date as shown: undated (search 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 4 | [English international-students section (candidate international-applicants page)](https://ust.edu.ua/en/for-students/international-students-en/about-university-en/) | English international-students section (candidate international-applicants page); dual-degree partner programmes at master's level mentioned *(Result date as shown: undated (search 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 5 | [History page: union of four institutions; former universities function as educat](https://ust.edu.ua/en/university/history/) | History page: union of four institutions; former universities function as educational-scientific institutes *(Result date as shown: undated (search 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 6 | [Predecessor NMetAU news: Cabinet decree 11 July 2023 No. 620-r joining UDKhTU an](https://nmetau.edu.ua/en/mnews/i6/p6) | Predecessor NMetAU news: Cabinet decree 11 July 2023 No. 620-r joining UDKhTU and the Dnipro State Academy of Construction and Architecture to the university ('Science and Technology' singular) *(Result date as shown: 2023 (decree date in snippet). Search-result lead, not read in full.)* |  |  |
| 7 | [THE profile: incorporated Prydniprovsk State Academy of Physical Culture and Spo](https://www.timeshighereducation.com/world-university-rankings/ukrainian-state-university-science-and-technologies) | THE profile: incorporated Prydniprovsk State Academy of Physical Culture and Sports in 2025 *(Result date as shown: 2025 (per snippet). Search-result lead, not read in full.)* |  |  |
| 8 | [Ukrainian name and abbreviation 'Український державний університет науки і техно](https://www.education.ua/universities/101/) | Ukrainian name and abbreviation 'Український державний університет науки і технологій (УДУНТ)' *(Result date as shown: undated (search 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 9 | [Predecessor NMetAU company record: 'в стані припинення', termination through reo](https://opendatabot.ua/c/02070766) | Predecessor NMetAU company record: 'в стані припинення', termination through reorganisation *(Result date as shown: undated (search 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 10 | [Repository community 'ННІ «Дніпровський інститут інфраструктури і транспорту» (Д](https://crust.ust.edu.ua/communities/8d575a47-fb8e-453d-a4e0-4b915ba8b644/subcoms-cols) | Repository community 'ННІ «Дніпровський інститут інфраструктури і транспорту» (ДІІТ)' — DIIT as an institute within the university *(Result date as shown: undated (search 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 11 | [Abbreviation 'USUST Dnipro'](https://www.railml.org/en/partners/usust-dnipro) | Abbreviation 'USUST Dnipro' *(Result date as shown: undated (search 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 12 | [Commercial aggregator: '2026 intake open' claim (unverified); a sibling page use](https://studyabroadaide.com/institutions/ukrainian-state-university-of-science-and-technologies/) | Commercial aggregator: '2026 intake open' claim (unverified); a sibling page uses slug 'national-metallurgical-academy-of-ukraine' *(Result date as shown: undated (search 2026-10-24). Search-result lead, not read in full.)* |  |  |
| 13 | [uniRank profile: officially recognised higher-education degrees; selective admis](https://www.unirank.org/ua/uni/ukrainian-state-university-of-science-and-technologies/) | uniRank profile: officially recognised higher-education degrees; selective admission by entrance examinations *(Result date as shown: undated (search 2026-10-24). Search-result lead, not read in full.)* |  |  |

Third-party pages (leads only, never a source): [Pharmacy master's card, 2025 intake: specialty I8 Pharmacy, full-time, year 1, c](https://vstup.osvita.ua/y2025/r5/6507/1531437/); [Pharmacy master's card, 2026 intake: contract 64,700 UAH, licensed intake 80, 75](https://vstup.osvita.ua/y2026/r5/6507/1636290/); [Predecessor UDKhTU card: 226 Фармація, промислова фармація, licensed volume 63](https://vstup.osvita.ua/y2017/r5/216/383118/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Ukrainian State University of Science and Technologies (search-result lead: Wikipedia article title, ust.edu.ua page titles, Times Higher Education profile; the variant "Ukrainian State University of Science and Technology" (singular) appears in an nmetau.edu.ua news item) | [English name; merger history (formed 2021; chemical-technology university joined](https://en.wikipedia.org/wiki/Ukrainian_State_University_of_Science_and_Technologies) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://ust.edu.ua/ | [English name; merger history (formed 2021; chemical-technology university joined](https://en.wikipedia.org/wiki/Ukrainian_State_University_of_Science_and_Technologies) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [English name; merger history (formed 2021; chemical-technology university joined](https://en.wikipedia.org/wiki/Ukrainian_State_University_of_Science_and_Technologies) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | unverified | LEAD: url: https://ust.edu.ua/en/for-students/international-students-en/about-university-en/ | [English name; merger history (formed 2021; chemical-technology university joined](https://en.wikipedia.org/wiki/Ukrainian_State_University_of_Science_and_Technologies) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [English name; merger history (formed 2021; chemical-technology university joined](https://en.wikipedia.org/wiki/Ukrainian_State_University_of_Science_and_Technologies) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [English name; merger history (formed 2021; chemical-technology university joined](https://en.wikipedia.org/wiki/Ukrainian_State_University_of_Science_and_Technologies) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [English name; merger history (formed 2021; chemical-technology university joined](https://en.wikipedia.org/wiki/Ukrainian_State_University_of_Science_and_Technologies) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [English name; merger history (formed 2021; chemical-technology university joined](https://en.wikipedia.org/wiki/Ukrainian_State_University_of_Science_and_Technologies) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [English name; merger history (formed 2021; chemical-technology university joined](https://en.wikipedia.org/wiki/Ukrainian_State_University_of_Science_and_Technologies) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `pharmacy-industrial-pharmacy-specialty-code-shown-as-i8-on-the-2025-admissions-aggregator-card-the-pre-2025-code-was-226` — Фармація, промислова фармація / Pharmacy, industrial pharmacy (specialty code shown as 'I8' on the 2025 admissions-aggregator card; the pre-2025 code was 226) (pharmacy) | `programmes.pharmacy-industrial-pharmacy-specialty-code-shown-as-i8-on-the-2025-admissions-aggregator-card-the-pre-2025-code-was-226.internationalAdmission`; `programmes.pharmacy-industrial-pharmacy-specialty-code-shown-as-i8-on-the-2025-admissions-aggregator-card-the-pre-2025-code-was-226.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [English name; merger history (formed 2021; chemical-technology university joined](https://en.wikipedia.org/wiki/Ukrainian_State_University_of_Science_and_Technologies) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `226-historical-lead-at-the-predecessor-ukrainian-state-university-of-chemical-technology-vstup-osvita-ua-institution-id-216-2017-intake` — 226 Фармація, промислова фармація — HISTORICAL lead at the predecessor Ukrainian State University of Chemical Technology (vstup.osvita.ua institution id 216), 2017 intake (pharmacy) | `programmes.226-historical-lead-at-the-predecessor-ukrainian-state-university-of-chemical-technology-vstup-osvita-ua-institution-id-216-2017-intake.internationalAdmission`; `programmes.226-historical-lead-at-the-predecessor-ukrainian-state-university-of-chemical-technology-vstup-osvita-ua-institution-id-216-2017-intake.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [English name; merger history (formed 2021; chemical-technology university joined](https://en.wikipedia.org/wiki/Ukrainian_State_University_of_Science_and_Technologies) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Relocation lead (unverified): No relocation lead: every result places the university in Dnipro (ust.edu.ua About page: 'a brand new, powerful technical university that established at the end of 2021, located in Dnipro'). It is itself the product of mergers: formed end-2021 'as a result of the union of four powerful educational institutions' whose 'former universities now function as educational and scientific institutes within one large university' (ust.edu.ua history/About, search summary); the Ukrainian State University of Chemical Technology and the Prydniprovska State Academy of Civil Engineering and Architecture were joined to it by Cabinet decree of 11 July 2023 No. 620-r (nmetau.edu.ua news) or 'in 2024' (ust.edu.ua About page) — the two dates conflict in the snippets; Times Higher Education says it incorporated the Prydniprovsk State Academy of Physical Culture and Sports in 2025. Opendatabot shows the predecessor National Metallurgical Academy of Ukraine (ЄДРПОУ 02070766) 'в стані припинення' through reorganisation. No suspension, licence-revocation or accreditation-problem lead was found.  
   Closure (fill): 
6. Red flag to resolve before any fact is shown: Not a medical school: a technical university with 7 educational-scientific institutes (ust.edu.ua general-information); the only health-related lead is one pharmacy master's programme inherited through the merged chemical-technology university. No medicine, dentistry or nursing lead found.  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: No lead shows the pharmacy programme admits foreign applicants or is taught in English; the only language statement ('Ukrainian and English as the languages of the educational process') is university-wide and programme-unspecific.  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: The fees in the leads (53,500 UAH/yr 2025; 64,700 UAH/yr 2026) are domestic contract fees from an admissions aggregator, not international tuition — must not be presented as foreigner fees.  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: Name confusion: 'Science and Technologies' vs 'Science and Technology'; abbreviations UST vs USUST; the aggregator studyabroadaide.com files it under the slug 'national-metallurgical-academy-of-ukraine' and separately under its own name; predecessor hosts nmetau.edu.ua, udhtu.edu.ua and diit.edu.ua are still live in results. Also distinct from the similarly named Dnipro University of Technology (Dnipro Polytechnic) and Dnipro State Technical University (Kamianske), neither of which appeared in these results.  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: Conflicting merger dates for the chemical-technology university (Cabinet decree 11 July 2023 No. 620-r vs '2024' on the About page) — the legal successor status for the 226/I8 pharmacy licence is a lead only.  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: Admissions aggregator (vstup.osvita.ua) specialty code 'I8' reflects the new specialty classifier; the mapping to the former code 226 is an inference from the programme name, not from the snippet.  
   Closure (fill): 
12. Missing evidence: Official programme page on ust.edu.ua for the pharmacy master's (name, level, duration, form, language) — only aggregator cards found; no official host could be opened.  
   Closure (fill): 
13. Missing evidence: Any bachelor's-level pharmacy programme at USUST — not found.  
   Closure (fill): 
14. Missing evidence: Whether foreign applicants are admitted to the pharmacy programme and whether any English-medium stream exists — not found.  
   Closure (fill): 
15. Missing evidence: International tuition for foreign applicants — not found (only domestic contract fees in the leads).  
   Closure (fill): 
16. Missing evidence: EDEBO record and licence/accreditation status for specialty 226/I8 Pharmacy under USUST as legal successor of UDKhTU — EDEBO not queried; MON 2019 licensing PDF for the predecessor not read.  
   Closure (fill): 
17. Missing evidence: Ministry 'Study in Ukraine' portal record — not found; the two universities.studyinukraine.gov.ua URLs surfaced (university/202, university/192) are unidentified.  
   Closure (fill): 
18. Missing evidence: NAQA accreditation records — not queried.  
   Closure (fill): 
19. Missing evidence: Exact legal date of the UDKhTU merger (2023 decree vs 2024 About-page date) — conflicting leads.  
   Closure (fill): 
20. Missing evidence: Official Ukrainian and English names from the statute/EDEBO (the leads come from listing titles).  
   Closure (fill): 
21. Missing evidence: Dedicated international-applicants admissions page (requirements, deadlines, invitation procedure) — only an 'About University' page under the international-students section was found.  
   Closure (fill): 
22. Missing evidence: An education.ua URL for this university carries a '?speciality=211' filter; the snippet does not say the university offers specialty 211 — do not infer anything from it.  
   Closure (fill): 
23. Skeptic's note: The pharmacy master's (specialty shown as I8, formerly 226) is known only from vstup.osvita.ua admissions cards for 2025 and 2026 (institution id 6507); no official programme page on ust.edu.ua was found, and the id-to-institution match rests on the search summary.  
   Closure (fill): 
24. Skeptic's note: Legal-successor status for the former UDKhTU 226 licence is a lead only; the merger date conflicts (Cabinet decree 11 July 2023 No. 620-r per nmetau.edu.ua vs '2024' on the ust.edu.ua About page). The I8-to-226 mapping is inferred from the programme name.  
   Closure (fill): 
25. Skeptic's note: No lead that the pharmacy programme admits foreign applicants or has an English-medium stream; the only language statement is university-wide.  
   Closure (fill): 
26. Skeptic's note: Fees in the leads (53,500 UAH/yr 2025; 64,700 UAH/yr 2026) are domestic contract fees, not international tuition.  
   Closure (fill): 
27. Skeptic's note: EDEBO and NAQA not queried; Study in Ukraine portal record not identified (university/202 and /192 hits unattributed); the 2019 MON licensing PDF for the predecessor was not read.  
   Closure (fill): 
28. Skeptic's note: Name-confusion risk: 'Science and Technologies' vs 'Science and Technology'; UST vs USUST; predecessor hosts (nmetau.edu.ua, udhtu.edu.ua, diit.edu.ua) still live; distinct from Dnipro University of Technology (Dnipro Polytechnic) and Dnipro State Technical University (Kamianske).  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/ukrainian-state-university-of-science-and-technologies.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
