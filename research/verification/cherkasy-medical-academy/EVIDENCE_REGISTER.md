# Evidence register — Cherkasy Medical Academy (`cherkasy-medical-academy`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/cherkasy-medical-academy.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: medacademy.ck.ua, universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/cherkasy-medical-academy.json` — 0 programme(s) with an official-domain lead of international admission (); 4 deferred programme(s) kept unpublished until eligibility is read (Медицина (speciality 222), educational programme «Лікар», Медсестринство (speciality 223), programmes «Лікувальна справа», «Акушерська справа», «Сестринська справа», Фармація (за спеціалізаціями), Терапія та реабілітація (за спеціалізаціями) (speciality 227 Therapy and rehabilitation)).

**Evidence store:** `site/data/evidence/cherkasy-medical-academy.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `cherkasy-medical-academy--NN--short-name.pdf` where NN is the row number of this register (e.g. `cherkasy-medical-academy--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/cherkasy-medical-academy.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [EDEBO registry entry titled «Черкаська медична академія»; search summary: code 8](https://registry.edbo.gov.ua/university/834) | EDEBO registry entry titled «Черкаська медична академія»; search summary: code 834, founded 14.10.1930, regional council governing body, website medacademy.ck.ua, Khreshchatyk St 215, English name Che *(Result date as shown: undated registry page; search run 2026-10-24. Search-result lead, not read in full.)* |  |  |
| 2 | [State admissions-portal offer titled «Бакалавр, (I5) Медсестринство, Заочна, Чер](https://vstup.edbo.gov.ua/offer/1579659/) | State admissions-portal offer titled «Бакалавр, (I5) Медсестринство, Заочна, Черкаська медична академія» *(Result date as shown: 2024 per search summary. Search-result lead, not read in full.)* |  |  |
| 3 | [Directory entry: «Тип НЗ: Академія; Підпорядкування: Обласна рада; Тип НЗ: Закла](https://www.education.ua/universities/942/) | Directory entry: «Тип НЗ: Академія; Підпорядкування: Обласна рада; Тип НЗ: Заклад вищої освіти»; website http://www.medacademy.ck.ua; phone (0472) 37 33 10; rector Губенко Інна Яківна; directions Фарм *(Result date as shown: undated directory page. Search-result lead, not read in full.)* |  |  |
| 4 | [Directory entry calling it «державний заклад вищої освіти в місті Черкаси»; addr](https://osvita.ua/vnz/guide/37467/) | Directory entry calling it «державний заклад вищої освіти в місті Черкаси»; address вул. Хрещатик, 215; site https://medacademy.ck.ua/; same four programme directions *(Result date as shown: undated directory page. Search-result lead, not read in full.)* |  |  |
| 5 | [Older college listing: «Черкаський медичний коледж - вищий навчальний заклад I-I](https://osvita.ua/vnz/college/16858/) | Older college listing: «Черкаський медичний коледж - вищий навчальний заклад I-II рівнів акредитації» (apparent predecessor; link to the academy not confirmed) *(Result date as shown: undated, apparently pre-academy. Search-result lead, not read in full.)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [MON page: information on the right to conduct educational activity in higher edu](https://mon.gov.ua/ua/ministerstvo/poslugi/licenzuvannya/vidomosti-pro-pravo-zdijsnennya-osvitnoyi-diyalnosti/vidomosti-pro-pravo-zdijsnennya-osvitnoyi-diyalnosti-u-sveri-vischoi-osviti/cherkaska-oblast-l); [MON PDF titled «medichna akademiya19» under the licensing ('pravo diyalnosti') p](https://mon.gov.ua/storage/app/media/pravo-diyalnosti/2019/10/10/medichna-akademiya19.pdf); [NAQA expert-register annex naming the academy (staff as accreditation experts); ](https://naqa.gov.ua/wp-content/uploads/2026/01/Додаток-про-включення-до-Реєстру-експертів-з-числа-НПП-НП-від-23.12.2025.pdf); [Study in Ukraine portal result returned for the domain-restricted search — it is](https://universities.studyinukraine.gov.ua/en/minedu/university/52/)

Third-party pages (leads only, never a source): [2026 admissions-campaign listing: Master's «Лікар» (222 Medicine) 38,947 UAH/yr ](https://vstup.osvita.ua/y2026/r24/834/); [2025 admissions-campaign listing: Master's «Лікар» 38,947 UAH/yr, term 01.10.202](https://vstup.osvita.ua/y2025/r24/834/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Cherkasy Medical Academy (English name as given in the EDEBO registry search result; full legal form not confirmed) | [EDEBO registry entry titled «Черкаська медична академія»; search summary: code 8](https://registry.edbo.gov.ua/university/834) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://medacademy.ck.ua/ | [EDEBO registry entry titled «Черкаська медична академія»; search summary: code 8](https://registry.edbo.gov.ua/university/834) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [EDEBO registry entry titled «Черкаська медична академія»; search summary: code 8](https://registry.edbo.gov.ua/university/834) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | not-published | — (no lead) | [EDEBO registry entry titled «Черкаська медична академія»; search summary: code 8](https://registry.edbo.gov.ua/university/834) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [EDEBO registry entry titled «Черкаська медична академія»; search summary: code 8](https://registry.edbo.gov.ua/university/834) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [EDEBO registry entry titled «Черкаська медична академія»; search summary: code 8](https://registry.edbo.gov.ua/university/834) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [EDEBO registry entry titled «Черкаська медична академія»; search summary: code 8](https://registry.edbo.gov.ua/university/834) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [EDEBO registry entry titled «Черкаська медична академія»; search summary: code 8](https://registry.edbo.gov.ua/university/834) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [EDEBO registry entry titled «Черкаська медична академія»; search summary: code 8](https://registry.edbo.gov.ua/university/834) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `speciality-222-educational-programme` — Медицина (speciality 222), educational programme «Лікар» (medicine) | `programmes.speciality-222-educational-programme.internationalAdmission`; `programmes.speciality-222-educational-programme.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [EDEBO registry entry titled «Черкаська медична академія»; search summary: code 8](https://registry.edbo.gov.ua/university/834) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `speciality-223-programmes` — Медсестринство (speciality 223), programmes «Лікувальна справа», «Акушерська справа», «Сестринська справа» (nursing) | `programmes.speciality-223-programmes.internationalAdmission`; `programmes.speciality-223-programmes.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [EDEBO registry entry titled «Черкаська медична академія»; search summary: code 8](https://registry.edbo.gov.ua/university/834) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `programme-2` — Фармація (за спеціалізаціями) (pharmacy) | `programmes.programme-2.internationalAdmission`; `programmes.programme-2.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [EDEBO registry entry titled «Черкаська медична академія»; search summary: code 8](https://registry.edbo.gov.ua/university/834) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `speciality-227-therapy-and-rehabilitation` — Терапія та реабілітація (за спеціалізаціями) (speciality 227 Therapy and rehabilitation) (other) | `programmes.speciality-227-therapy-and-rehabilitation.internationalAdmission`; `programmes.speciality-227-therapy-and-rehabilitation.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [EDEBO registry entry titled «Черкаська медична академія»; search summary: code 8](https://registry.edbo.gov.ua/university/834) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Location lead as found (unverified): Cherkasy (address lead: вул. Хрещатик, 215 / Khreshchatyk Street 215, consistent across the EDEBO registry, education.ua and osvita.ua search results)  
   Closure (fill): 
6. Relocation lead (unverified): No relocation lead. The Cherkasy address (Khreshchatyk St 215) is consistent across the EDEBO registry, education.ua and osvita.ua results, and the academy has 2025 and 2026 admissions-campaign offers on vstup.osvita.ua plus an EDEBO admissions-portal offer (vstup.edbo.gov.ua/offer/1579659). Cherkasy is not in an occupied or front-line region. No official page was opened, so current operation is inferred from third-party admissions listings only.  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: Inventory group G (nursing/allied-health level) is contradicted by the 2025 and 2026 admissions listings, which show a 6-year Master's «Лікар» in 222 Medicine at a communal academy; the licence volume text in the lead is truncated and no NAQA accreditation decision for 222 Medicine (or any programme) was found — licence and accreditation remain unverified.  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: No lead of any kind for admission of foreign applicants, English-medium teaching, an international office, or a Study in Ukraine portal entry; every offer found is a domestic (budget/contract, UAH-priced) offer.  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: Ownership wording is inconsistent across leads: EDEBO registry and education.ua indicate a regional-council (communal) body («Підпорядкування: Обласна рада»), while osvita.ua text calls it «державний заклад вищої освіти»; the full legal name with «Комунальний заклад вищої освіти … Черкаської обласної ради» was not confirmed by search.  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: Name confusion: an osvita.ua listing describes the apparent predecessor «Черкаський медичний коледж» (I-II accreditation level); the reorganisation into an academy, and whether a separate 'фаховий коледж' still exists under a similar name, are unconfirmed.  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: English-language searches for 'Cherkasy Medical Academy' return Bohdan Khmelnytsky National University of Cherkasy (already listed) and Cherkasy State Technological University instead — easy to conflate in directories and in SEO copy.  
   Closure (fill): 
12. Red flag to resolve before any fact is shown: Rector name (Inna Gubenko) comes from directory/registry summaries only and may be outdated.  
   Closure (fill): 
13. Red flag to resolve before any fact is shown: The contract fee leads (38,947 UAH/yr Medicine; 38,856 UAH/yr non-budget nursing) are domestic figures from a third-party aggregator; they must not be presented as fees for international applicants.  
   Closure (fill): 
14. Missing evidence: No page on medacademy.ck.ua was opened (network policy): full legal name, charter/founder, rector, admissions rules, programme list and contact details are all unverified against the official site.  
   Closure (fill): 
15. Missing evidence: MON licence register entry (licence number, licensed volumes, date) for 222 Medicine Master's, 223 Nursing, 226 Pharmacy and 227 Therapy and rehabilitation — the MON oblast list and 2019 PDF were returned but not read; the vstup.osvita.ua licence-volume text was truncated.  
   Closure (fill): 
16. Missing evidence: NAQA accreditation decisions/certificates for any educational programme — none found; only staff expert-register PDFs.  
   Closure (fill): 
17. Missing evidence: Any provision for foreign applicants (admission rules for foreigners, invitation issuance, Study in Ukraine portal listing, international office page) — not found.  
   Closure (fill): 
18. Missing evidence: English-medium teaching — not found.  
   Closure (fill): 
19. Missing evidence: Dentistry — no lead at all (not found).  
   Closure (fill): 
20. Missing evidence: Level of the pharmacy programme (bachelor vs. master) and the speciality codes for pharmacy and therapy/rehabilitation — not shown.  
   Closure (fill): 
21. Missing evidence: Date and legal act of the reorganisation of «Черкаський медичний коледж» into the academy, and whether any 'фаховий коледж' with a similar name still exists.  
   Closure (fill): 
22. Missing evidence: Fees for international applicants — not found (only domestic UAH contract fees from a third-party aggregator).  
   Closure (fill): 
23. Missing evidence: Current rector and governance (EDEBO summary names Inna Gubenko; may be outdated).  
   Closure (fill): 
24. Missing evidence: Direct official confirmation of 2026/27 operation (only third-party campaign listings and a 2024 EDEBO offer found).  
   Closure (fill): 
25. Skeptic's note: Licence and accreditation unverified: the vstup.osvita.ua licence-volume text for the 6-year Master's «Лікар» (222 Medicine) is truncated, and no NAQA accreditation decision for any programme was found (only expert-register PDFs naming its staff). Open question, not a bar.  
   Closure (fill): 
26. Skeptic's note: Ownership wording inconsistent: EDEBO registry summary and education.ua indicate a regional-council (communal) body, osvita.ua calls it 'державний заклад вищої освіти'; the full legal form was not confirmed.  
   Closure (fill): 
27. Skeptic's note: Apparent predecessor «Черкаський медичний коледж» (I-II accreditation level) appears in an older osvita.ua listing; the reorganisation into an academy and whether a similarly named фаховий коледж still exists are unconfirmed.  
   Closure (fill): 
28. Skeptic's note: English-language searches for 'Cherkasy Medical Academy' return Bohdan Khmelnytsky National University of Cherkasy (listed) and Cherkasy State Technological University; keep profiles separate.  
   Closure (fill): 
29. Skeptic's note: Rector name (Inna Gubenko) from registry/directory summaries may be outdated; contract-fee figures are domestic UAH aggregator leads and must not be shown as international fees.  
   Closure (fill): 
30. Skeptic's note: No foreign-applicant, English-medium or Study in Ukraine portal lead (not required for the name-only tier).  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/cherkasy-medical-academy.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
