# Evidence register — Andrei Krupynskyi Lviv Medical Academy (`lviv-medical-academy-krupynskyi`)

**Status:** NOTHING VERIFIED. No evidence entry is verified, and every "Verified value / wording" cell below is empty, because no official page could be opened from the build environment (see the Access line; earlier attempts are logged in `SOURCE_VERIFICATION_REGISTER.md`). This register is the exact list of what to open, what to read and what to record so that the record can be verified either (A) by Claude once the domains are allow-listed, or (B) from captures made by the owner or daughter in an ordinary browser.

**Access** (`site/data/evidence/lviv-medical-academy-krupynskyi.json`, checked 2026-10-24): **blocked**. Tested on 2026-10-24 from the build environment with scripts/probe-access.mjs (one HTTPS request to the root address of each host). Hosts: lma.edu.ua, universities.studyinukraine.gov.ua, mon.gov.ua, registry.edbo.gov.ua, vstup.edbo.gov.ua, naqa.gov.ua, en.naqa.gov.ua. Probe on 2026-10-24T16:30:56Z over the fourth host list (research/verification/ALLOWLIST_P4.txt, 32 hosts): 32 refused at the environment's proxy under its network policy (403 to CONNECT), 0 open. No official page or PDF was opened and no claim was checked. Route to access: the environment's Network access setting (Allowed domains); see OWNER_ACTION_SHEET.md §1. A refused request is an access limitation, never evidence about the institution.

**Record under verification:** `site/src/content/universities/lviv-medical-academy-krupynskyi.json` — 0 programme(s) with an official-domain lead of international admission (); 7 deferred programme(s) kept unpublished until eligibility is read (223 Медсестринство (Nursing) — bachelor's, Медсестринство (Nursing) — master's, освітньо-професійна програма, 226 Фармація (Pharmacy) — master's, Фармація — фаховий молодший бакалавр (vocational, run by the academy's фаховий коледж), Медсестринство — «Сестринська справа», «Акушерська справа» (vocational, academy's фаховий коледж), Психологія (Psychology) — bachelor's, Laboratory Medicine / Laboratory Techniques / Treatment Techniques / Paediatrics / Nursing (Study in Ukraine portal listing; levels not stated)).

**Evidence store:** `site/data/evidence/lviv-medical-academy-krupynskyi.json` holds one entry per piece of evidence, keyed by the claim path in the first column of sections B–E (the rules, statuses and source tiers are in `UNIVERSITY_EVIDENCE_STANDARD.md`). The evidence column shows, for each entry: status, source tier, date accessed, whether an exact quotation is recorded, and the publish / withhold decision — or "no evidence recorded".

## How to capture a page (Route B)

1. Open the URL in a normal browser. If the page redirects or you navigate further, note the **final URL** shown in the address bar.
2. Save it as a PDF with the browser's print header on (File → Print → "Headers and footers" ticked → Save as PDF), so the URL and the date are printed on every page; or take a full-page screenshot with the address bar visible.
3. Name the file `lviv-medical-academy-krupynskyi--NN--short-name.pdf` where NN is the row number of this register (e.g. `lviv-medical-academy-krupynskyi--01--homepage.pdf`).
4. Keep captures **outside this repository** while the repository is public (the repository is public as of 2026-10-11); send them as a folder or attach them to the review. The register records only the file name.
5. If a page does not exist or does not publish a fact, write "NOT FOUND" or "SILENT" in the capture column — that is a valid result; the field is then closed as not-published with a note.

## Verification rules that apply (owner decisions 2026-10-11)

- Baseline intake **2026–27**, but record the **exact academic year and wording printed on the page** (e.g. "2026/2027", "2026-2027 academic year"); never translate a 2025/26 figure into a 2026/27 claim.
- Only programmes for which an official page states that international (foreign) applicants are admitted go in `programmes[]`; all others stay in `deferredProgrammes[]` (unpublished) until that page is read.
- Fees, deadlines and intake dates: record a value only when printed on the official page for the stated intake, with currency, per-period, academic year and payment schedule; otherwise the profile shows "To be confirmed" with its explanation. No estimate, no third-party figure, no conversion.
- Quote the university's own wording verbatim for the status statement and the preparatory progression text; never type a quotation from a search snippet.
- Never: recognition or licensing implications, rankings, "MBBS/BSN/MSN/MPH" unless the university prints it, promotional statistics.
- Each verified claim = `status: verified` + `source` (the exact https URL) + `checked` (the capture or reading date) + a matching evidence entry in `site/data/evidence/lviv-medical-academy-krupynskyi.json` (status verified, decision publish, exact quotation recorded) as `UNIVERSITY_EVIDENCE_STANDARD.md` sets out. A search snippet, agent page or directory listing is a lead and never counts as evidence.

## A. Pages to open (official domain)

| # | Page | Purpose | Capture file (fill) | Result (fill: captured / not found / changed URL) |
|---|---|---|---|---|
| 1 | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | osvita.ua guide: communal higher-education institution of Lviv Regional Council; bachelor, master, junior bachelor; address P. Doroshenka 70, Lviv; site lma.edu.ua *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 2 | [osvita.ua guide entry; licensed capacity 582 places (older figure)](https://osvita.ua/vnz/guide/37458/) | osvita.ua guide entry; licensed capacity 582 places (older figure) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 3 | [Directory entry titled «КЗВО ЛОР «Львівська медична академія імені Андрея Крупин](https://www.education.ua/universities/864/) | Directory entry titled «КЗВО ЛОР «Львівська медична академія імені Андрея Крупинського»» (abbreviated communal title) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 4 | [Studyportals profile: "one of the oldest higher medical educational institutions](https://www.mastersportal.com/universities/21828/andrei-krupynskyi-lviv-medical-academy.html) | Studyportals profile: "one of the oldest higher medical educational institutions not only in Ukraine, but also in Europe"; "turned 246 years old on October 1, 2019"; third-party scholarship listings *(Result date as shown: text references 2019; page undated. Search-result lead, not read in full.)* |  |  |
| 5 | [Recruitment-style directory: lineage to a 1773 Lviv Medical Collegium; academy s](https://www.uni2study.com/universities/ukraine/lviv-medical-academy-named-after-andrei-krupinsky) | Recruitment-style directory: lineage to a 1773 Lviv Medical Collegium; academy status 2019; lists Lviv Regional Council and MON as accrediting agencies *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 6 | [Directory entry under the apparent predecessor name "Andrey Krupynski Lviv Insti](https://www.unipage.net/en/27631/andrey_krupynski_lviv_institute_of_nursing_and_laboratory_medicine) | Directory entry under the apparent predecessor name "Andrey Krupynski Lviv Institute of Nursing and Laboratory Medicine" *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |
| 7 | [Danylo Halytsky Lviv National Medical University page returned for the same quer](https://new.meduniv.lviv.ua/en/?p=818) | Danylo Halytsky Lviv National Medical University page returned for the same query — disambiguation only (LNMU's English Medium Program since 1997 is not this academy's) *(Result date as shown: undated. Search-result lead, not read in full.)* |  |  |

Government or regulator pages (tier 3; acceptable only for the claim types `UNIVERSITY_EVIDENCE_STANDARD.md` §7 allows): [Ministry Study in Ukraine portal programmes listing (Health/Medicine area) in wh](https://studyinukraine.gov.ua/study-in-ukraine/programmes-and-courses/?areas=22)

Third-party pages (leads only, never a source): [2024 admission directory entry; full communal title; summary: website lma.edu.ua](https://vstup.osvita.ua/y2024/r14/627/); [2023 entry; Bachelor 223 Медсестринство, 40 licensed places, study 01.09.2023–30](https://vstup.osvita.ua/y2023/r14/627/); [2022 entry under the short title «Львівська медична академія імені Андрея Крупин](https://vstup.osvita.ua/y2022/r14/627/); [2020 entry under the full communal title (continuity of the name since at least ](https://vstup.osvita.ua/y2020/r14/627/); [2025 programme page (set also includes 1459468, 1486611, 1537625, 1558546, 15589](https://vstup.osvita.ua/y2025/r14/627/1484963/); [2026 programme page (set also includes 1587479, 1609641, 1638675, 1642797, 16680](https://vstup.osvita.ua/y2026/r14/627/1634308/)

## B. Record-level claims

| Claim path (evidence `claimPath`) | Status now | Lead (unverified, from snippets) | Page(s) to open | What to read and record | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Verified value / wording | Date read |
|---|---|---|---|---|---|---|---|---|
| `officialName` | unverified | LEAD: Higher Educational Communal Institution of Lviv Regional Council "Andrei Krupynskyi Lviv Medical Academy" (LEAD ONLY: wording attributed by the search summary to the Study in Ukraine portal programmes listing; official English rendering on lma.edu.ua not seen) | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | The full official name exactly as printed (English, and Ukrainian if shown); note the abbreviation | no evidence recorded |  |  |  |
| `website` | unverified | LEAD: https://lma.edu.ua/ | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | The canonical domain and the international-students section | no evidence recorded |  |  |  |
| `address` | not-published | — (no lead) | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | Postal address exactly as printed on the contacts page | no evidence recorded |  |  |  |
| `internationalOffice` | not-published | — (no lead) | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | Name of the unit for foreign applicants, email, phone, page URL | no evidence recorded |  |  |  |
| `status` | unverified | LEAD: operating | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | "operating" only if a dated current-year official statement or order shows the university operating at its address; "relocated" if it says so | no evidence recorded |  |  |  |
| `statusStatement` | not-published | — (no lead) | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | The university's own dated statement on the organisation/format of the current academic year — VERBATIM, with its date | no evidence recorded |  |  |  |
| `teachingFormat` | not-published | — (no lead) | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | in-person / blended / distance exactly as the statement says; otherwise not-published | no evidence recorded |  |  |  |
| `founded` | not-published | — (no lead) | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | Founding year only from the official history page | no evidence recorded |  |  |  |
| `accreditation` | not-published | — (no lead) | NAQA register (to locate) | Only from the NAQA register or the certificate (tiers 1–3); a news item is not evidence; never presented as recognition of the qualification in another country | no evidence recorded |  |  |  |
| `recognition` | not-published | — (no lead) | The destination country's recognition authority (to locate per country) | Only a statement by the official recognition authority of a named destination country (tier 4), quoted with its date; a World Directory of Medical Schools listing is not recognition; never imply registration or a licence to practise | no evidence recorded |  |  |  |
| `accommodation` | not-published | — (no lead) | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | Hostel availability and published prices with year, or not-published | no evidence recorded |  |  |  |

## E. Deferred programmes — eligibility question only (stay unpublished until answered)

Deferred programmes use the same claim paths as programmes (`programmes.<id>.<field>`), because programme ids are unique across `programmes[]` and `deferredProgrammes[]` (rule R9).

| Programme (`deferredProgrammes[].id`) | Claim paths | Lead | Page(s) to open | What to read | Evidence entries (status · tier · accessed · quotation · decision) | Capture file | Answer | Date read |
|---|---|---|---|---|---|---|---|---|
| `223-nursing-bachelor-s` — 223 Медсестринство (Nursing) — bachelor's (nursing) | `programmes.223-nursing-bachelor-s.internationalAdmission`; `programmes.223-nursing-bachelor-s.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `nursing-master-s` — Медсестринство (Nursing) — master's, освітньо-професійна програма (nursing) | `programmes.nursing-master-s.internationalAdmission`; `programmes.nursing-master-s.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `226-pharmacy-master-s` — 226 Фармація (Pharmacy) — master's (pharmacy) | `programmes.226-pharmacy-master-s.internationalAdmission`; `programmes.226-pharmacy-master-s.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `vocational-run-by-the-academy-s` — Фармація — фаховий молодший бакалавр (vocational, run by the academy's фаховий коледж) (pharmacy) | `programmes.vocational-run-by-the-academy-s.internationalAdmission`; `programmes.vocational-run-by-the-academy-s.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `vocational-academy-s` — Медсестринство — «Сестринська справа», «Акушерська справа» (vocational, academy's фаховий коледж) (nursing) | `programmes.vocational-academy-s.internationalAdmission`; `programmes.vocational-academy-s.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `psychology-bachelor-s` — Психологія (Psychology) — bachelor's (other) | `programmes.psychology-bachelor-s.internationalAdmission`; `programmes.psychology-bachelor-s.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |
| `laboratory-medicine-laboratory-techniques-treatment-techniques-paediatrics-nursing-study-in-ukraine-portal-listing-levels-not-stated` — Laboratory Medicine / Laboratory Techniques / Treatment Techniques / Paediatrics / Nursing (Study in Ukraine portal listing; levels not stated) (other) | `programmes.laboratory-medicine-laboratory-techniques-treatment-techniques-paediatrics-nursing-study-in-ukraine-portal-listing-levels-not-stated.internationalAdmission`; `programmes.laboratory-medicine-laboratory-techniques-treatment-techniques-paediatrics-nursing-study-in-ukraine-portal-listing-levels-not-stated.language` | No lead that this programme admits foreign applicants; verify on the official admissions page. | [osvita.ua guide: communal higher-education institution of Lviv Regional Council;](https://osvita.ua/vnz/college/16768/) | Does an official page state that foreign applicants are admitted, and in which language? If yes → move to programmes[] and verify its rows as in section C; if no or silent → stays deferred | internationalAdmission: no evidence recorded<br>language: no evidence recorded |  |  |  |

## F. Open questions to close (each: answered by a verified row above, or closed as not-published with the page that is silent)


1. Official name in English and Ukrainian, canonical domain and postal address, from the official site and the EDEBO register.  
   Closure (fill): 
2. Dated official statement for the current academic year on whether, where and how foreign students are taught.  
   Closure (fill): 
3. State registration (EDEBO), programme licence (Ministry or EDEBO licence register) and NAQA accreditation for each health programme: three separate claims.  
   Closure (fill): 
4. Which medicine, dentistry, pharmacy or nursing programmes admit foreign applicants, in which language, with what duration and intake, and the official fee page.  
   Closure (fill): 
5. Location lead as found (unverified): Lviv (address lead: vul. P. Doroshenka 70, Lviv — osvita.ua guide, undated)  
   Closure (fill): 
6. Relocation lead (unverified): No relocation lead. Admission listings for 2020, 2022, 2023, 2024, 2025 and 2026 on vstup.osvita.ua all place the academy in Lviv (region r14); address lead vul. P. Doroshenka 70, Lviv (osvita.ua). Lviv is not occupied territory. 2024 listing lead: "122 offers, a licensed capacity of 841 places, and 909 total applications"; an older guide entry gives "Ліцензійний обсяг: 582 місць" at 107 offers — figures differ by year and must not be quoted as current.  
   Closure (fill): 
7. Red flag to resolve before any fact is shown: Name confusion: searches for "Lviv Medical Academy" return Danylo Halytsky Lviv National Medical University (meduniv.lviv.ua, already listed) pages, including its English Medium Program "implemented in 1997" — that programme belongs to LNMU, not to this academy. Any copy must not attribute LNMU's medicine/dentistry/English-medium offers to the academy.  
   Closure (fill): 
8. Red flag to resolve before any fact is shown: No lead for any 222 Medicine or 221 Dentistry degree programme; the portfolio found is nursing (bachelor/master), pharmacy (master, non-budget), psychology (bachelor) plus vocational nursing/pharmacy. A targeted search for Технології медичної діагностики, Фізична терапія and Стоматологія returned nothing. Relevance to international medicine/dentistry applicants is unsupported; inventory group G (nursing/allied-health level) stands.  
   Closure (fill): 
9. Red flag to resolve before any fact is shown: The academy runs an internal "фаховий коледж" offering фаховий молодший бакалавр programmes (Сестринська справа, Акушерська справа, Фармація). These are vocational, not higher-education degrees, and must not be presented as degree programmes.  
   Closure (fill): 
10. Red flag to resolve before any fact is shown: No lead at all for admission of foreign applicants, English-medium teaching, tuition for foreigners or an international office page; the vstup.osvita.ua directory "doesn't break out foreign applicants". Studyportals/uni2study/unipage are recruitment-style directories and their "scholarships" listings are third-party and possibly stale.  
   Closure (fill): 
11. Red flag to resolve before any fact is shown: Predecessor identity: unipage.net lists "Andrey Krupynski Lviv Institute of Nursing and Laboratory Medicine"; uni2study says academy status was granted in 2019 and traces lineage to a 1773 "Lviv Medical Collegium". The rename history and the official order are unconfirmed; older directory entries may exist under the institute name.  
   Closure (fill): 
12. Red flag to resolve before any fact is shown: Inconsistent admission basis for the Pharmacy master's across two search summaries (на базі фахового молодшого бакалавра vs. на базі бакалавра) — do not state either as fact.  
   Closure (fill): 
13. Red flag to resolve before any fact is shown: Licensed-capacity figures differ across years (582 places/107 offers in an undated guide; 841 places/122 offers in the 2024 listing); none is a verified current figure.  
   Closure (fill): 
14. Red flag to resolve before any fact is shown: No EDEBO or NAQA record surfaced; licence and accreditation status of every programme is unverified.  
   Closure (fill): 
15. Missing evidence: Official site lma.edu.ua not opened (network policy): official Ukrainian/English name, domain ownership, programme list, admission rules and contacts unconfirmed from the primary source.  
   Closure (fill): 
16. Missing evidence: EDEBO registry entry (registry.edbo.gov.ua): not found in search — licence (specialities 223, 226, others), licensed volumes and accreditation certificates unverified.  
   Closure (fill): 
17. Missing evidence: NAQA accreditation decisions for any higher-education programme: not found.  
   Closure (fill): 
18. Missing evidence: Study in Ukraine portal: institution page URL not confirmed; only a programmes-area listing lead.  
   Closure (fill): 
19. Missing evidence: Admission of foreign applicants to any programme, tuition for foreigners, English-medium teaching, international office/department page: not found.  
   Closure (fill): 
20. Missing evidence: Whether any 222 Medicine or 221 Dentistry (or dental technology) higher-education programme exists: no lead; absence in results is not proof of absence.  
   Closure (fill): 
21. Missing evidence: Full higher-education programme list (e.g., 224 lab diagnostics, 227 physical therapy): not found; only nursing, pharmacy and psychology leads.  
   Closure (fill): 
22. Missing evidence: Legal/rename history (institute to academy, reported 2019) and the Ukrainian predecessor name: only recruitment-directory leads; founding order not found.  
   Closure (fill): 
23. Missing evidence: Pharmacy master's admission basis (vocational junior bachelor vs. bachelor): inconsistent between search summaries.  
   Closure (fill): 
24. Missing evidence: Current (2026) licensed capacity and offer count: only 2024 and older figures.  
   Closure (fill): 
25. Missing evidence: Exact mapping of each programme to its vstup.osvita.ua sub-page URL: not confirmed from snippets.  
   Closure (fill): 
26. Skeptic's note: No lead for any 222 Medicine or 221 Dentistry degree; the qualifying leads are nursing (bachelor 2023 with 40 licensed places; master 2026) and pharmacy (master, non-budget, 2025). The academy also runs a фаховий коледж whose nursing/pharmacy/midwifery programmes are vocational and must not be shown as degrees.  
   Closure (fill): 
27. Skeptic's note: No EDEBO or NAQA record surfaced; licence and accreditation of every programme unverified. Study in Ukraine portal institution page not confirmed (only a programmes-area listing lead).  
   Closure (fill): 
28. Skeptic's note: Pharmacy master's admission basis is reported inconsistently (на базі фахового молодшого бакалавра vs на базі бакалавра).  
   Closure (fill): 
29. Skeptic's note: Predecessor identity ('Andrey Krupynski Lviv Institute of Nursing and Laboratory Medicine', academy status reportedly 2019) rests on recruitment directories; the founding/rename order was not found.  
   Closure (fill): 
30. Skeptic's note: Name-confusion risk: 'Lviv Medical Academy' searches return Danylo Halytsky Lviv National Medical University (listed) and its English Medium Program; none of LNMU's offers belong to this academy. Also distinct from the private candidate lviv-medical-institute.  
   Closure (fill): 
31. Skeptic's note: Domain lma.edu.ua is a directory lead (osvita.ua, vstup.osvita.ua), medium confidence, not read on the site or a register.  
   Closure (fill): 

## G. Session log (fill)

| Date | Who | Pages opened (numbers from section A) | Rows verified | Rows closed as not-published | Notes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## H. Evidence file check (generated)

- 0 evidence entries in `site/data/evidence/lviv-medical-academy-krupynskyi.json`; 0 verified with the decision "publish".
- No structural problems found in the evidence file.
