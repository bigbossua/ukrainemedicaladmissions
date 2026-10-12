# Official-source access and capture request — seven priority universities, plus Vinnytsia

**Date:** 2026-10-12 · **Branch:** `claude/university-profile-pipeline` (from `f86363c`) · **For:** the owner (network settings or page captures) and the verifier (evidence entries) · **Status:** nothing verified, nothing published, production unchanged.

**Why this request exists.** A university fact appears on ukrainemedicaladmissions.com only when an evidence entry from an official source supports it (`UNIVERSITY_EVIDENCE_STANDARD.md`). This build environment cannot open any official university or Ukrainian government page. The access re-test of 2026-10-12 at 08:47 UTC (all 31 university hosts in the twelve records, seven government and register hosts, and the control `example.com`) was refused at the environment's proxy (`CONNECT tunnel failed, response 403`), while `api.github.com` returned 200; it is logged in `SOURCE_VERIFICATION_REGISTER.md` and in each evidence file's access block. A spot check at 08:51 UTC added the hosts this request introduces or relies on — `registry.edbo.gov.ua`, `public.naqa.gov.ua`, `zakon.rada.gov.ua`, `apply.studyinukraine.gov.ua`, plus `knmu.edu.ua`, `onmedu.edu.ua`, `www.bsmu.edu.ua` and `nmuofficial.com` — with the same result (HTTP code 000). The 32 hosts tried on 2026-10-11 are listed in `DIRECTORY_VERIFICATION_PLAN.md` §10.1a. A refused connection is a fact about this environment, not about any university, and it is never evidence (standard, "Access limitations are not evidence").

**Two ways to unblock** (either is enough; both together is fastest):

- **Route A — allow the hosts in §1.** Claude then opens the pages itself, after a fetch test (standard §11.2).
- **Route B — send the captures listed in §2**, made as §3 describes. Claude then records each one with `capture-intake.py` and `evidence-entry.mjs` (standard §11.3 and §15).

**What this request is not.** The order of the seven universities follows SEMrush search demand (`EXECUTIVE_REPORT.md` §D): Bukovinian, Odesa, Kharkiv, Bogomolets, Ivano-Frankivsk, Uzhhorod, Ternopil. Vinnytsia, the owner's earlier first verification target, is listed eighth and separately. **This is research priority only.** It is not a statement that any university accepts applications, offers a programme, is accredited or is recognised anywhere. Every address below is a lead to open, not evidence. Addresses found by search today are labelled "located via search on 2026-10-12, not opened". No search-result text is quoted as fact.

**The first capture for every university is a government page (N24 c).** Under the default publication policy (`WEBSITE_REQUIRES_GOVERNMENT_EVIDENCE = true`, `PUBLICATION_POLICY_DECISIONS.md` (c)), the university's own pages support nothing until a verified `.gov.ua` page lists exactly the same website as the record. So in every table below the government register card and the Ministry-portal entry come first. Two points for the verifier, before any entry is recorded:

1. The record's `website` value must equal the government page's printed value character for character. Bukovinian (`https://www.bsmu.edu.ua/en/`) and Bogomolets (`https://nmuofficial.com/en/`) carry an `/en/` path that a register is unlikely to print. The value is changed to match the register's wording, not the other way round.
2. If a register prints the site without `https://`, recording it "exactly as printed" conflicts with the record's requirement for an https address. That is an owner decision under N24 (c); raise it before recording, do not normalise silently.

**Update after the SEMrush check of 2026-10-12 (`SEMRUSH_API_LEDGER.md`, 30 units):** "pirogov medical university ukraine" has steady exact demand of 390 a month in India, so Vinnytsia ranks with Odesa and Kharkiv and belongs in the top group. Treat its rows with the same priority as the seven.

**Start here (Route A): the 20 hosts that cover all P1 work** — university: `www.bsmu.edu.ua`, `bsmu.edu.ua`, `vstup.bsmu.edu.ua`, `onmedu.edu.ua`, `knmu.edu.ua`, `nmuofficial.com`, `www.nmuofficial.com`, `www.ifnmu.edu.ua`, `ifnmu.edu.ua`, `www.uzhnu.edu.ua`, `uzhnu.edu.ua`, `www.tdmu.edu.ua`, `tdmu.edu.ua`, `junior.tdmu.edu.ua`, `www.vnmu.edu.ua`, `vnmu.edu.ua`, `foreign.vnmu.edu.ua`, `new.vnmu.edu.ua`; government: `registry.edbo.gov.ua`, `universities.studyinukraine.gov.ua`. Add them in the cloud environment menu (session title bar → Edit → Network access → Allowed domains, keeping "Allow package managers" ticked; https://code.claude.com/docs/en/cloud-environments#network-access). §1 lists the optional P2 and post-release hosts.

The same 20 hosts, one per line: `research/verification/ALLOWLIST_P1.txt` (the owner copy is `OWNER_ACTION_SHEET.md` §1; `npm run test:allowlist` keeps the three identical and checks that every address in §2 is on one of them). After the owner allows them, `npm run probe:access` from `site/` reports which answer.

**Priorities.**

- **P1** — needed for a first publishable profile under the policy's mandatory list: official name; website and the government page that lists it; address; operating status with a dated 2026/27 statement and the teaching format; and at least one programme (Medicine as the floor) with international admission, level, language, duration, intake year, and its fee page read (`DIRECTORY_VERIFICATION_PLAN.md` §5, "Minimum viable profile"; `publication.mjs`, programme listing rules).
- **P2** — other facts students need: award titles, the other programmes, entry requirements, documents, deadlines, the admissions contact, licence and registration, programme accreditation, the preparatory route.
- **P3** — nice to have, or for comparison only: founding year, accommodation, older versions, deferred programmes.

**Pages requested (§2).**

| University (SEMrush order) | P1 | P2 | P3 | Total |
|---|---|---|---|---|
| 1 Bukovinian State Medical University | 11 | 6 | 4 | 21 |
| 2 Odesa National Medical University | 10 | 7 | 5 | 22 |
| 3 Kharkiv National Medical University (gated) | 12 | 5 | 5 | 22 |
| 4 Bogomolets National Medical University | 8 | 7 | 1 | 16 |
| 5 Ivano-Frankivsk National Medical University | 10 | 9 | 5 | 24 |
| 6 Uzhhorod National University | 8 | 6 | 4 | 18 |
| 7 Ternopil National Medical University | 11 | 5 | 0 | 16 |
| 8 Vinnytsia National Pirogov Memorial Medical University (separately) | 10 | 9 | 6 | 25 |
| **Total** | **80** | **54** | **30** | **164** |

A "page" is one address. A few rows ask for two or three files (a list page and the notice it links to, or one page per programme); the notes say so. Some P1 rows are "to locate" pages that may not exist; if one does not, report "NOT FOUND" (§3).

---

## 1. Allow these hosts

**Where.** In the Claude Code session: the cloud environment menu in the session title bar → Edit → Network access. Stay on the Limited level and add each host below under Allowed domains, leaving "Allow package managers" ticked (or choose a broader access level). Steps: https://code.claude.com/docs/en/cloud-environments#network-access. Enter each host exactly as written: no `https://`, no path. List every host separately; do not rely on a parent domain covering its subdomains.

**After saving.** Claude runs one fetch test per host, records the result in `SOURCE_VERIFICATION_REGISTER.md`, and sets each evidence file's access block to `open` before reading anything (standard §11.2 step 1). Until then the entry tool refuses Route A entries (`web-page`, `pdf`).

### 1(a) Official university hosts — 18 hosts, plus 1 conditional (P1)

| University | Host | Used for |
|---|---|---|
| Bukovinian | `www.bsmu.edu.ua` | Main site: homepage, Medical Faculty No. 3, FAQ, fee page, preparatory course, annual report |
| Bukovinian | `bsmu.edu.ua` | Bare form of the same site (the register may list it; redirects) |
| Bukovinian | `vstup.bsmu.edu.ua` | Admissions sub-site: 2026/27 rules for foreign citizens, 2026 English entrance-exam programme |
| Odesa | `onmedu.edu.ua` | Every Odesa page in the record: foreign-citizens section, 2026 admission PDF, fee table, news |
| Kharkiv | `knmu.edu.ua` | Every Kharkiv page in the record: admission rules, contacts, faculty, programme catalogue, news |
| Bogomolets | `nmuofficial.com` | Every Bogomolets page in the record: admission of foreign citizens, contacts, accreditation pages |
| Bogomolets | `www.nmuofficial.com` | The `www` form seen in leads (redirects) |
| Bogomolets | `nmu.ua` *(conditional)* | Only if the government register lists `nmu.ua` as the website (open domain question in the record) |
| Ivano-Frankivsk | `www.ifnmu.edu.ua` | Every Ivano-Frankivsk page in the record: 2026 admissions committee, rules, fee pages, programme documents, contacts |
| Ivano-Frankivsk | `ifnmu.edu.ua` | Bare form of the same site |
| Uzhhorod | `www.uzhnu.edu.ua` | Foreign-applicant rules, about page, programme documents |
| Uzhhorod | `uzhnu.edu.ua` | The record cites both forms (courses in English and fees, faculty pages) |
| Ternopil | `www.tdmu.edu.ua` | English site and the `/int/` international section: admission, rules, fees |
| Ternopil | `tdmu.edu.ua` | Bare form of the same site |
| Ternopil | `junior.tdmu.edu.ua` | Preparatory department site |
| Vinnytsia | `www.vnmu.edu.ua` | 2026 admission procedures, 2026–2027 fee PDF, document list, orders, programme documents |
| Vinnytsia | `vnmu.edu.ua` | Bare form cited by the record (admission of foreign citizens) |
| Vinnytsia | `foreign.vnmu.edu.ua` | Faculty of Foreign Citizens Training portal: about, faculties, admission conditions, preparatory faculty |
| Vinnytsia | `new.vnmu.edu.ua` | Documents on the new site |

Counts: Bukovinian 3, Odesa 1, Kharkiv 1, Bogomolets 2 (+1 conditional), Ivano-Frankivsk 2, Uzhhorod 2, Ternopil 3, Vinnytsia 4.

Not needed: `phr.tdmu.edu.ua` (a deferred programme only), `old.vnmu.edu.ua`, `vstup.osvita.ua` (third-party portal: a lead, never a source), `en.wikipedia.org`.

### 1(b) Ukrainian government education authorities — 6 hosts, plus 4 conditional

| Host | What it is needed for | Claims it can support | Priority |
|---|---|---|---|
| `registry.edbo.gov.ua` | The Unified State Electronic Database on Education (EDEBO) register of educational institutions (located via search on 2026-10-12, not opened): the university's card, with official name, address, website and the licence section | `website` (the N24 c government listing), `officialName`, `address`; institutional licence and registration | P1 |
| `universities.studyinukraine.gov.ua` | The Ministry of Education and Science "Study in Ukraine" university directory: each university's contacts tab (website, address), a second government listing for N24 (c) | `website` (tier 3), `address`, `officialName`. **Never fees**: fees need the university's own page (tiers 1–2 only) | P1 |
| `info.edbo.gov.ua` | EDEBO public information host named in the registers' "to locate" rows; a fallback if the register card does not show the website | as above | P2 |
| `naqa.gov.ua` | National Agency for Higher Education Quality Assurance (NAQA): accreditation decisions and protocols | `accreditation` (programme accreditation in Ukraine) | P2 |
| `public.naqa.gov.ua` | NAQA's public accreditation-case files (located via search on 2026-10-12, not opened) | `accreditation` | P2 |
| `studyinukraine.gov.ua` | Ministry portal pages on the national invitation route | Requirements or documents shown as national rules only (tier 3); the invitation procedure (no record field yet) | P2 |
| `apply.studyinukraine.gov.ua` *(conditional)* | Public pages of the national application and invitation system | Only if a profile describes the national invitation step | P3 |
| `mon.gov.ua` *(conditional)* | Ministry orders cited by a university's rules (for example the 2026 national admission procedure) or by a register card (licensing decisions) | Only when a profile states a national rule, or a licence order must be read | P3 |
| `zakon.rada.gov.ua` *(conditional)* | Official texts of legal acts cited by university documents (Cabinet of Ministers resolutions; Ministry orders on admitting foreigners or recognising foreign school documents) | Only if a profile states a national rule | P3 |
| `nauka.gov.ua` *(conditional)* | A fallback `.gov.ua` listing of a university's website, only if neither EDEBO nor the Ministry portal prints it. A search today surfaced an entry for Bukovinian, https://nauka.gov.ua/en/organizations/o.saWTeWsA/ (located via search on 2026-10-12, not opened); its page title looked like a test page, so check what it is before relying on it | `website` (tier 3) | P3 |

Not needed: `en.naqa.gov.ua` (English version; add only if `naqa.gov.ua` redirects there), `vstup.edbo.gov.ua` (domestic admissions), `web.archive.org` and `archive.org` (an archived copy never verifies a current claim), `testportal.gov.ua`.

**Three different things — never conflated:**

| What | Who decides | Where the evidence is | What it does not mean |
|---|---|---|---|
| Institutional licence and registration | The Ukrainian state (Ministry of Education and Science, through the EDEBO register) | The university's EDEBO register card | It is not accreditation of any programme, and not recognition abroad |
| Programme accreditation | NAQA, for a named programme in Ukraine | A NAQA decision or the accreditation certificate (a news item is never enough) | It is not recognition of the qualification in another country, and never a licence to practise |
| Professional recognition | Each destination country's own regulator, for each applicant | That regulator's own page (tier 4 only) | Nothing on a Ukrainian page can establish it |

### 1(c) Destination-country regulators — optional only (4 hosts)

Recognition of a Ukrainian medical qualification is decided by each destination country's own regulator, under that country's rules, for each applicant. It is not decided in Ukraine. The site shows no recognition claim today: `RECOGNITION_AUTHORITY_HOSTS` is empty (`PUBLICATION_POLICY_DECISIONS.md` (b)), and only the owner can choose which authorities count. Add these hosts only after that decision.

| Host | Used for |
|---|---|
| `nmc.org.in`, `www.nmc.org.in` | National Medical Commission, India (the market with the most measured demand): its own rules for foreign medical graduates, quoted and dated (tier 4), never implying registration or a licence |
| `search.wdoms.org`, `www.wdoms.org` | World Directory of Medical Schools. **A listing is a directory entry, not recognition**, not accreditation and not evidence of any programme fact. At most a bare "listed" statement at tier 5, and only if the owner allows it (standard §13 item 4) |

The United Kingdom (General Medical Council) and Nigeria (Medical and Dental Council of Nigeria) show smaller measured demand; no host is proposed for them until the owner chooses.

### 1(d) Production host — 2 hosts

| Host | Used for |
|---|---|
| `ukrainemedicaladmissions.com`, `www.ukrainemedicaladmissions.com` | `npm run verify:live` after an approved release (pages, the `www` → apex redirect, headers). Not needed for verification itself |

### Host list to copy (one per line)

The first 20 lines are enough for P1 work (18 university hosts plus the two government hosts):

```
www.bsmu.edu.ua
bsmu.edu.ua
vstup.bsmu.edu.ua
onmedu.edu.ua
knmu.edu.ua
nmuofficial.com
www.nmuofficial.com
www.ifnmu.edu.ua
ifnmu.edu.ua
www.uzhnu.edu.ua
uzhnu.edu.ua
www.tdmu.edu.ua
tdmu.edu.ua
junior.tdmu.edu.ua
www.vnmu.edu.ua
vnmu.edu.ua
foreign.vnmu.edu.ua
new.vnmu.edu.ua
registry.edbo.gov.ua
universities.studyinukraine.gov.ua
info.edbo.gov.ua
naqa.gov.ua
public.naqa.gov.ua
studyinukraine.gov.ua
ukrainemedicaladmissions.com
www.ukrainemedicaladmissions.com
```

Add when needed: `nmu.ua` (if the register lists it), `apply.studyinukraine.gov.ua`, `mon.gov.ua`, `zakon.rada.gov.ua`, `nauka.gov.ua`; and, only after the owner's recognition decision, `nmc.org.in`, `www.nmc.org.in`, `search.wdoms.org`, `www.wdoms.org`.

---

## 2. If access cannot be enabled: pages and documents to send

**How to read the tables.**

- **No.** is the row number of the university's evidence register, section A. It is the `NN` in the file name, so `capture-intake.py` can match the file to its row. Two files for one row are shown as `23a`, `23b`.
- **9x numbers** are pages no register row covers yet: 91–92 are official pages located by search today, 95–97 are the accreditation record for each programme. The intake tool lists them under "Files not matched to a row"; that is expected, and the entry tool accepts any file name that starts with the slug.
- **Four records had no register** (Bogomolets, Ivano-Frankivsk, Uzhhorod, Ternopil). *(Done 2026-10-12: the rows were added to `TO_LOCATE` and the four registers generated; the row numbers below match them.)* Their row numbers are the ones `site/scripts/make-evidence-register.py` assigns: research references numbered from 1, leaving out government and third-party hosts, then the "to locate" rows from `DIRECTORY_VERIFICATION_PLAN.md` §6.4–§6.7 (plus a government-entry row for Uzhhorod and Ternopil). Before the captures arrive, the verifier adds those "to locate" rows to `TO_LOCATE` in the order the tables give and runs, from the repository root: `python3 -I site/scripts/make-evidence-register.py bogomolets-national-medical-university ivano-frankivsk-national-medical-university uzhhorod-national-university ternopil-national-medical-university`. Do not add the pages located today to `researchReferences` until the captures are in: adding them renumbers the "to locate" rows.
- **Order of work.** P1 first, top to bottom: the government pages, then identity and contacts, then the dated current-year statement, then the programme and fee pages.
- **A page that cannot be found** is reported as `NOT FOUND`. **A page that does not state the fact** is still captured and marked `SILENT`: a silent official page is a valid result, recorded as such (standard §5.1).
- **Pages to capture** gives each address once; **What each claim needs** maps every claim to those captures.

**Addresses located via search on 2026-10-12 (not opened):** `https://registry.edbo.gov.ua/` (card addresses take the form `/university/<EDEBO code>/`); `https://public.naqa.gov.ua/` (case files take the form `/api/Accreditation/<number>/Pdf`); Odesa's Ministry-portal entry `https://universities.studyinukraine.gov.ua/en/minedu/university/85/contacts`; Kharkiv's `https://universities.studyinukraine.gov.ua/en/minedu/university/110/contacts`; Uzhhorod's about page `https://www.uzhnu.edu.ua/en/cat/university-about_us`; Vinnytsia's history page `https://vnmu.edu.ua/en/history-of-university`; and the `nauka.gov.ua` fallback in §1(b). The Bukovinian (`/21/contacts`) and Ternopil (`/68/contacts`) Ministry-portal addresses were built from the pattern of the Ministry-portal pages those records already cite, and the three EDEBO card numbers (85, 149, 207) are unconfirmed candidates: check the name on each page. Searches today found **no** new official page for: Bukovinian's 2026/27 rules, contacts or fees; Odesa's 2026–27 teaching-format notice; Kharkiv's 2026 rules or fees; Bogomolets' 2026/27 fee page; Ivano-Frankivsk's 2026 fee table for foreign citizens; Ternopil's 2026/27 fee table; the Ministry-portal entries for Vinnytsia, Ivano-Frankivsk and Uzhhorod.

### 2.1 Bukovinian State Medical University (`bukovinian-state-medical-university`)

SEMrush demand rank 1 (research priority only; not a statement that the university accepts applications or offers a programme). Register: `research/verification/bukovinian-state-medical-university/EVIDENCE_REGISTER.md` (rows 1–23). Record programmes: Medicine, Dentistry, Pharmacy; deferred: nursing, physical therapy. The record holds no address lead and no current-year statement; the fee page lead showed 2023–24 content.

**Pages to capture** (file names to use exactly; "doc" = send the original file plus an address-bar screenshot, see §3)

| No. | File name | Address (URL) | Priority | Notes |
|---|---|---|---|---|
| 23a | `bukovinian-state-medical-university--23--edebo-register-card.pdf` | To locate: open https://registry.edbo.gov.ua/ (register of educational entities; located via search on 2026-10-12, not opened), search the university name, capture its card | P1 | Candidate card address, inferred from the identifier in third-party portal addresses, unconfirmed: https://registry.edbo.gov.ua/university/85/ — check the name on the card |
| 23b | `bukovinian-state-medical-university--23--ministry-portal-contacts.pdf` | <https://universities.studyinukraine.gov.ua/en/minedu/university/21/contacts> | P1 | address built from the pattern of the Ministry-portal page the record already cites; not opened |
| 01 | `bukovinian-state-medical-university--01--homepage.pdf` | <https://www.bsmu.edu.ua/en/> | P1 |  |
| 19 | `bukovinian-state-medical-university--19--contacts.pdf` | To locate: Official contacts page with the postal address — not surfaced by any snippet | P1 |  |
| 22 | `bukovinian-state-medical-university--22--teaching-format-2026-27.pdf` | To locate: A dated university-wide notice on the 2026–27 teaching format (news section) | P1 | Capture the news list page and the notice itself (two files: add -list and -notice to the short name) |
| 21 | `bukovinian-state-medical-university--21--admission-rules-2026.pdf` | To locate: The 2026/27 Rules of admission for foreign citizens on vstup.bsmu.edu.ua — capture the index AND the rules | P1 | Capture the rules index on vstup.bsmu.edu.ua and the rules document (original file if PDF) |
| 06 | `bukovinian-state-medical-university--06--admissions-subsite.pdf` | <https://vstup.bsmu.edu.ua/> | P1 |  |
| 07 | `bukovinian-state-medical-university--07--english-exam-programme-2026.pdf` (doc) | <https://vstup.bsmu.edu.ua/wp-content/uploads/2026/06/english_program_2026.pdf> | P1 |  |
| 05 | `bukovinian-state-medical-university--05--medical-faculty-3.pdf` | <https://www.bsmu.edu.ua/en/medical-faculty-no3/> | P1 |  |
| 20 | `bukovinian-state-medical-university--20--programme-pages.pdf` | To locate: The Medicine, Dentistry and Pharmacy programme pages linked from the faculty pages (level, award title, duration) | P1 | One file per programme: -medicine, -dentistry, -pharmacy |
| 04 | `bukovinian-state-medical-university--04--tuition-fees.pdf` | <https://www.bsmu.edu.ua/en/admission/tuition-fees/> | P1 | Surfaced in the second sweep (topic: preparatory); figures NOT recorded |
| 02 | `bukovinian-state-medical-university--02--faq.pdf` | <https://www.bsmu.edu.ua/en/faq> | P2 |  |
| 03 | `bukovinian-state-medical-university--03--preparatory-course.pdf` | <https://www.bsmu.edu.ua/en/admission/preparatory-course> | P2 |  |
| 12 | `bukovinian-state-medical-university--12--annual-report-2025.pdf` (doc) | <https://www.bsmu.edu.ua/wp-content/uploads/2026/01/zvit-pro-diyalnist-bdmu-za-2025-rik-sajt.pdf> | P2 | Pointer only for licence and accreditation; a report is not enough on its own |
| 95 | `bukovinian-state-medical-university--95--accreditation-medicine.pdf` | To locate: the NAQA accreditation decision or certificate for the programme (search the university name on naqa.gov.ua and public.naqa.gov.ua), or the certificate the university publishes; one file per programme (Medicine) | P2 |  |
| 96 | `bukovinian-state-medical-university--96--accreditation-dentistry.pdf` | To locate: as file 95, for Dentistry | P2 |  |
| 97 | `bukovinian-state-medical-university--97--accreditation-pharmacy.pdf` | To locate: as file 95, for Pharmacy | P2 |  |
| 08 | `bukovinian-state-medical-university--08--english-exam-programme-2024.pdf` (doc) | <https://vstup.bsmu.edu.ua/wp-content/uploads/2024/08/english_program_2024.pdf> | P3 | Superseded by the 2026 document; comparison only |
| 09 | `bukovinian-state-medical-university--09--booklet-2023.pdf` (doc) | <https://www.bsmu.edu.ua/wp-content/uploads/2023/07/buklet-bdmu-2023.pdf> | P3 | Dated 2023 — may be out of date |
| 11 | `bukovinian-state-medical-university--11--physical-therapy-programme.doc` (doc) | <https://www.bsmu.edu.ua/wp-content/uploads/2025/05/op_fizichna-terapiya-na-sajt.doc> | P3 |  |
| 13 | `bukovinian-state-medical-university--13--results-2024-25.pdf` (doc) | <https://www.bsmu.edu.ua/wp-content/uploads/2025/11/informacziya-pro-pidsumki-roboti-bdmu-v-2024-2025-n.r.pdf> | P3 |  |

Rows of the register not requested (out of date, out of scope or indirect only; close them as "not needed"): 10 (2019 guide), 14–17 (timetables: indirect only, not a statement), 18 (2023 transfer guide). Government pages in the record (Ministry-portal preparatory and dual-degree pages): pointers only, not requested.

Pages requested: **P1 11**, P2 6, P3 4 (total 21).

**What each claim needs** (capture numbers refer to the list above, where each address is given)

| Claim | Claim path(s) | Capture(s) | Passage that must be visible | Priority |
|---|---|---|---|---|
| Official name | `officialName` | 01, 23a (to locate), 23b | Full official name exactly as printed (English and, if shown, Ukrainian), with the page heading or document title block | P1 |
| Official website, and the government (.gov.ua) page that lists exactly that website | `website` | 01, 23a (to locate), 23b | Heading naming the university and the field giving its website, character for character (N24 c); also name, address and EDEBO code if printed | P1 |
| Address | `address` | 19 (to locate), 23a (to locate), 23b, 02 | Full postal address exactly as printed, under a heading that shows it is the university's address | P1 |
| Operating status, dated current-year (2026/27) statement, teaching format | `status`, `statusStatement`, `teachingFormat`, `programmes.<id>.format` | 22 (to locate), 12, 13 | The whole 2026/27 notice or order on how and where teaching is organised (in person, blended or distance), with its date (and number, for an order) | P1 |
| Medicine: open to international applicants | `programmes.medicine.internationalAdmission` | 21 (to locate), 06, 07, 05 | The sentence saying foreign applicants are admitted to the programme, and the intake or academic year it refers to | P1 |
| Medicine: level and award title | `programmes.medicine.level`, `.qualification`, `.specialtyCode` | 20 (to locate), 05 | Level (e.g. master's, single-cycle master's) and award title exactly as printed; specialty code if printed | P1 (level); P2 (title, code) |
| Medicine: teaching language | `programmes.medicine.language` | 21 (to locate), 07, 20 (to locate), 01 | Language(s) of instruction stated for that programme, not a general sentence about the university | P1 |
| Medicine: duration | `programmes.medicine.durationText`, `.durationYears` | 20 (to locate), 05 | Duration exactly as printed (years and months, semesters or ECTS) | P1 |
| Medicine: intake and academic year | `programmes.medicine.intakeYear`, `.intake` | 21 (to locate), 06 | The academic year or intake the page applies to (e.g. 2026/2027) and any start date | P1 |
| Medicine: tuition fee schedule with academic year (the page must be read even if it turns out out of date) | `programmes.medicine.tuition`, `.otherMandatoryCosts.<n>` | 04 | The whole fee table: heading with academic-year label, every row and column header, currency, what each amount is charged per, payment schedule, any exchange-rate wording, other charges, footnotes, the document's own date or order number | P1 |
| Medicine: entry requirements | `programmes.medicine.requirements.<id>` | 07, 21 (to locate) | Entrance-examination subjects, format, pass mark and scale, and any language requirement, for the stated intake | P2 |
| Medicine: required documents | `programmes.medicine.documents.<id>` | 02, 21 (to locate) | The full numbered list of documents with their conditions (translation, legalisation, notarisation, remote route) | P2 |
| Medicine: application deadlines | `programmes.medicine.deadlines` | 21 (to locate), 06 | Application dates with the year as printed (a committee working period is recorded as that, never as a deadline) | P2 |
| Dentistry: open to international applicants; level and title; language; duration; intake | `programmes.dentistry.internationalAdmission`, `.level`, `.qualification`, `.language`, `.durationText`, `.intakeYear` | 21 (to locate), 06, 07, 05, 20 (to locate) | As for the first programme, for this programme | P2 |
| Dentistry: tuition fee schedule with academic year | `programmes.dentistry.tuition`, `.otherMandatoryCosts.<n>` | 04 | Its row(s) of the same fee table (no extra file if the table is already captured) | P2 |
| Dentistry: entry requirements, documents, deadlines | `programmes.dentistry.requirements.<id>`, `.documents.<id>`, `.deadlines` | 07, 21 (to locate), 02, 06 | As for the first programme, for this programme | P2 |
| Pharmacy: open to international applicants; level and title; language; duration; intake | `programmes.pharmacy.internationalAdmission`, `.level`, `.qualification`, `.language`, `.durationText`, `.intakeYear` | 21 (to locate), 06, 07, 05, 20 (to locate) | As for the first programme, for this programme | P2 |
| Pharmacy: tuition fee schedule with academic year | `programmes.pharmacy.tuition`, `.otherMandatoryCosts.<n>` | 04 | Its row(s) of the same fee table (no extra file if the table is already captured) | P2 |
| Pharmacy: entry requirements, documents, deadlines | `programmes.pharmacy.requirements.<id>`, `.documents.<id>`, `.deadlines` | 07, 21 (to locate), 02, 06 | As for the first programme, for this programme | P2 |
| International admissions contact | `internationalOffice` | 02, 19 (to locate) | Name of the unit for foreign applicants, its e-mail, telephone and page address as printed | P2 |
| Institutional licence / registration (government register) | no claim path today (schema gap); supports `website`, `officialName`, `address` | 23a (to locate) | The register card's licence section (licence or decision number, date, scope) — institutional registration and licensing, not programme accreditation | P2 (same file as the P1 register capture) |
| Programme accreditation in Ukraine (NAQA decision or certificate) | `accreditation` | 95 (to locate), 96 (to locate), 97 (to locate), 12 | Accreditation decision or certificate for the named programme: programme, level, number, date, validity — accreditation in Ukraine only, never recognition abroad | P2 |
| Preparatory department | `preparatoryRoutes.preparatory-course.*` (fee: `.fee`) | 03, 04 | Language of instruction, any English track, duration, subjects, certificate name, the progression sentence verbatim, start date(s), fee with academic year, eligibility wording | P2 |
| Founding year | `founded` | 01 | Founding year as printed on the official history page or register | P3 |
| Accommodation | `accommodation` | none referenced: capture only if found | Hostel availability and prices with the academic year | P3 |
| Deferred programmes (nursing, physical-therapy): eligibility of foreign applicants | `programmes.<deferred id>.internationalAdmission` | 11, 09 | Whether foreign applicants are admitted to the programme, and in which language, for the stated intake | P3 |
| Recognition in a destination country | `recognition` | not requested | Not requested: decided by each country's regulator (tier 4 only); no authority is listed (N24 b) | — |

### 2.2 Odesa National Medical University (`odesa-national-medical-university`)

SEMrush demand rank 2 (research priority only). Register: `research/verification/odesa-national-medical-university/EVIDENCE_REGISTER.md` (rows 1–24). Record programmes: Medicine, Dentistry, Pharmacy; deferred: nursing, public health, therapy and rehabilitation. The latest teaching-format lead covers 2024–25 only. A search result for the Ministry-portal entry appears to give a different street address from the record's lead; both are leads until the pages are read.

**Pages to capture** (file names to use exactly; "doc" = send the original file plus an address-bar screenshot, see §3)

| No. | File name | Address (URL) | Priority | Notes |
|---|---|---|---|---|
| 24a | `odesa-national-medical-university--24--edebo-register-card.pdf` | To locate: open https://registry.edbo.gov.ua/ (register of educational entities; located via search on 2026-10-12, not opened), search the university name, capture its card | P1 |  |
| 24b | `odesa-national-medical-university--24--ministry-portal-contacts.pdf` | <https://universities.studyinukraine.gov.ua/en/minedu/university/85/contacts> | P1 | located via search on 2026-10-12, not opened |
| 20 | `odesa-national-medical-university--20--important-information.pdf` | <https://onmedu.edu.ua/about-univercity/important-information-university/?lang=en> | P1 |  |
| 02 | `odesa-national-medical-university--02--admission-commission-requirements.pdf` | <https://onmedu.edu.ua/information-foreign-citizens/requirements-admission-commission/?lang=en> | P1 |  |
| 19 | `odesa-national-medical-university--19--education-news-index.pdf` | <https://onmedu.edu.ua/category/education-en/?lang=en> | P1 |  |
| 22 | `odesa-national-medical-university--22--teaching-format-2026-27.pdf` | To locate: A DATED current-year (2025–26 or 2026–27) notice on teaching format and location, found via the education news category — capture the index AND the notice | P1 | The dated notice itself, found from row 19 |
| 03 | `odesa-national-medical-university--03--admission-information-2026.pdf` (doc) | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> | P1 |  |
| 06 | `odesa-national-medical-university--06--programmes-for-foreign-citizens.pdf` | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/?lang=en> | P1 |  |
| 07 | `odesa-national-medical-university--07--masters-programmes.pdf` | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/master-s-degree/?lang=en> | P1 |  |
| 04 | `odesa-national-medical-university--04--fees-full-table.pdf` | <https://onmedu.edu.ua/information-foreign-citizens/fees/?lang=en> | P1 | Must show the whole table with header and academic-year label; this one file also covers row 23 |
| 01 | `odesa-national-medical-university--01--international-faculty.pdf` | <https://onmedu.edu.ua/information-foreign-citizens/international-faculty/?lang=en> | P2 |  |
| 05 | `odesa-national-medical-university--05--preparatory-department.pdf` | <https://onmedu.edu.ua/information-foreign-citizens/language-training-cours/?lang=en> | P2 | Undated page; fee figure likely out of date |
| 12 | `odesa-national-medical-university--12--entrance-exam-programmes.pdf` | <https://onmedu.edu.ua/abituriientam/prijmalna-komisija/programa-vstupnih-ispitiv/> | P2 |  |
| 21 | `odesa-national-medical-university--21--tuition-instalments.pdf` | <https://onmedu.edu.ua/can-pay-tuition-fee-installments/?lang=en> | P2 | Undated |
| 95 | `odesa-national-medical-university--95--accreditation-medicine.pdf` | To locate: the NAQA accreditation decision or certificate for the programme (search the university name on naqa.gov.ua and public.naqa.gov.ua), or the certificate the university publishes; one file per programme (Medicine) | P2 |  |
| 96 | `odesa-national-medical-university--96--accreditation-dentistry.pdf` | To locate: as file 95, for Dentistry | P2 |  |
| 97 | `odesa-national-medical-university--97--accreditation-pharmacy.pdf` | To locate: as file 95, for Pharmacy | P2 |  |
| 10 | `odesa-national-medical-university--10--applicants-2026.pdf` | <https://onmedu.edu.ua/abituriientam/?lang=en> | P3 |  |
| 11 | `odesa-national-medical-university--11--list-of-specialties.pdf` | <https://onmedu.edu.ua/abituriientam/perelik-specialnostej/?lang=en> | P3 |  |
| 13 | `odesa-national-medical-university--13--bachelor-programmes.pdf` | <https://onmedu.edu.ua/osvita/osvitni-programi/os-bakalavr/> | P3 |  |
| 14 | `odesa-national-medical-university--14--public-health-opp-2025.pdf` (doc) | <https://onmedu.edu.ua/wp-content/uploads/2025/05/OPP-Gromadske-zdorovja_Magistr.pdf> | P3 |  |
| 18 | `odesa-national-medical-university--18--notice-2024-25.pdf` | <https://onmedu.edu.ua/regarding-the-new-academic-year-at-odesa-national-medical-university/?lang=en> | P3 | Out of date for 2025–26; Only to mark the 2024–25 statement as out of date |

Rows of the register not requested (out of date, out of scope or indirect only; close them as "not needed"): 8, 9 (PhD and postgraduate: out of scope), 15–17 (deferred-programme drafts), 23 (covered by file 04).

Pages requested: **P1 10**, P2 7, P3 5 (total 22).

**What each claim needs** (capture numbers refer to the list above, where each address is given)

| Claim | Claim path(s) | Capture(s) | Passage that must be visible | Priority |
|---|---|---|---|---|
| Official name | `officialName` | 20, 24a (to locate), 24b | Full official name exactly as printed (English and, if shown, Ukrainian), with the page heading or document title block | P1 |
| Official website, and the government (.gov.ua) page that lists exactly that website | `website` | 20, 24a (to locate), 24b | Heading naming the university and the field giving its website, character for character (N24 c); also name, address and EDEBO code if printed | P1 |
| Address | `address` | 02, 20, 24a (to locate), 24b | Full postal address exactly as printed, under a heading that shows it is the university's address | P1 |
| Operating status, dated current-year (2026/27) statement, teaching format | `status`, `statusStatement`, `teachingFormat`, `programmes.<id>.format` | 22 (to locate), 19, 18 | The whole 2026/27 notice or order on how and where teaching is organised (in person, blended or distance), with its date (and number, for an order) | P1 |
| Medicine: open to international applicants | `programmes.medicine.internationalAdmission` | 06, 07, 03, 04 | The sentence saying foreign applicants are admitted to the programme, and the intake or academic year it refers to | P1 |
| Medicine: level and award title | `programmes.medicine.level`, `.qualification`, `.specialtyCode` | 07, 10, 11 | Level (e.g. master's, single-cycle master's) and award title exactly as printed; specialty code if printed | P1 (level); P2 (title, code) |
| Medicine: teaching language | `programmes.medicine.language` | 04, 06, 07 | Language(s) of instruction stated for that programme, not a general sentence about the university | P1 |
| Medicine: duration | `programmes.medicine.durationText`, `.durationYears` | 07, 06 | Duration exactly as printed (years and months, semesters or ECTS) | P1 |
| Medicine: intake and academic year | `programmes.medicine.intakeYear`, `.intake` | 03, 04 | The academic year or intake the page applies to (e.g. 2026/2027) and any start date | P1 |
| Medicine: tuition fee schedule with academic year (the page must be read even if it turns out out of date) | `programmes.medicine.tuition`, `.otherMandatoryCosts.<n>` | 04, 21 | The whole fee table: heading with academic-year label, every row and column header, currency, what each amount is charged per, payment schedule, any exchange-rate wording, other charges, footnotes, the document's own date or order number | P1 |
| Medicine: entry requirements | `programmes.medicine.requirements.<id>` | 03, 12 | Entrance-examination subjects, format, pass mark and scale, and any language requirement, for the stated intake | P2 |
| Medicine: required documents | `programmes.medicine.documents.<id>` | 03 | The full numbered list of documents with their conditions (translation, legalisation, notarisation, remote route) | P2 |
| Medicine: application deadlines | `programmes.medicine.deadlines` | 03 | Application dates with the year as printed (a committee working period is recorded as that, never as a deadline) | P2 |
| Dentistry: open to international applicants; level and title; language; duration; intake | `programmes.dentistry.internationalAdmission`, `.level`, `.qualification`, `.language`, `.durationText`, `.intakeYear` | 06, 07, 03, 04, 10, 11 | As for the first programme, for this programme | P2 |
| Dentistry: tuition fee schedule with academic year | `programmes.dentistry.tuition`, `.otherMandatoryCosts.<n>` | 04, 21 | Its row(s) of the same fee table (no extra file if the table is already captured) | P2 |
| Dentistry: entry requirements, documents, deadlines | `programmes.dentistry.requirements.<id>`, `.documents.<id>`, `.deadlines` | 03, 12 | As for the first programme, for this programme | P2 |
| Pharmacy, industrial pharmacy: open to international applicants; level and title; language; duration; intake | `programmes.pharmacy.internationalAdmission`, `.level`, `.qualification`, `.language`, `.durationText`, `.intakeYear` | 06, 07, 03, 04, 10, 11 | As for the first programme, for this programme | P2 |
| Pharmacy, industrial pharmacy: tuition fee schedule with academic year | `programmes.pharmacy.tuition`, `.otherMandatoryCosts.<n>` | 04, 21 | Its row(s) of the same fee table (no extra file if the table is already captured) | P2 |
| Pharmacy, industrial pharmacy: entry requirements, documents, deadlines | `programmes.pharmacy.requirements.<id>`, `.documents.<id>`, `.deadlines` | 03, 12 | As for the first programme, for this programme | P2 |
| International admissions contact | `internationalOffice` | 01, 02, 20 | Name of the unit for foreign applicants, its e-mail, telephone and page address as printed | P2 |
| Institutional licence / registration (government register) | no claim path today (schema gap); supports `website`, `officialName`, `address` | 24a (to locate) | The register card's licence section (licence or decision number, date, scope) — institutional registration and licensing, not programme accreditation | P2 (same file as the P1 register capture) |
| Programme accreditation in Ukraine (NAQA decision or certificate) | `accreditation` | 95 (to locate), 96 (to locate), 97 (to locate), 14 | Accreditation decision or certificate for the named programme: programme, level, number, date, validity — accreditation in Ukraine only, never recognition abroad | P2 |
| Preparatory department | `preparatoryRoutes.preparatory-department.*` (fee: `.fee`) | 05, 04 | Language of instruction, any English track, duration, subjects, certificate name, the progression sentence verbatim, start date(s), fee with academic year, eligibility wording | P2 |
| Founding year | `founded` | 20 | Founding year as printed on the official history page or register | P3 |
| Accommodation | `accommodation` | none referenced: capture only if found | Hostel availability and prices with the academic year | P3 |
| Deferred programmes (nursing, public-health, therapy-rehabilitation): eligibility of foreign applicants | `programmes.<deferred id>.internationalAdmission` | 13, 14, 10, 11 | Whether foreign applicants are admitted to the programme, and in which language, for the stated intake | P3 |
| Recognition in a destination country | `recognition` | not requested | Not requested: decided by each country's regulator (tier 4 only); no authority is listed (N24 b) | — |

### 2.3 Kharkiv National Medical University (`kharkiv-national-medical-university`)

SEMrush demand rank 3 (research priority only). **Gated record:** no status is recorded until a dated official 2026–27 statement says where and how the university teaches (record open question 1); capture row 22 first. Register: `research/verification/kharkiv-national-medical-university/EVIDENCE_REGISTER.md` (rows 1–28; a research draft, not yet approved for verification). Record programmes: Medicine only; deferred: dentistry, nursing (bachelor, master), public health, physical therapy.

**Pages to capture** (file names to use exactly; "doc" = send the original file plus an address-bar screenshot, see §3)

| No. | File name | Address (URL) | Priority | Notes |
|---|---|---|---|---|
| 22 | `kharkiv-national-medical-university--22--operating-statement-2026-27.pdf` | To locate: A dated official statement for 2026–27 on where and how the university teaches, including whether international students are taught in Kharkiv, elsewhere in Ukraine or remotely (operating-conditions gate; only 2022 format statements and a September 2025 press interview were found) | P1 | Gate: capture first. A news item that only shows activity is not a statement of where and how teaching happens |
| 28a | `kharkiv-national-medical-university--28--edebo-register-card.pdf` | To locate: open https://registry.edbo.gov.ua/ (register of educational entities; located via search on 2026-10-12, not opened), search the university name, capture its card | P1 |  |
| 28b | `kharkiv-national-medical-university--28--ministry-portal-contacts.pdf` | <https://universities.studyinukraine.gov.ua/en/minedu/university/110/contacts> | P1 | located via search on 2026-10-12, not opened |
| 07 | `kharkiv-national-medical-university--07--university-today.pdf` | <https://knmu.edu.ua/en/about-2/universytet-sogodni/> | P1 |  |
| 02 | `kharkiv-national-medical-university--02--contacts-foreign-applicants.pdf` | <https://knmu.edu.ua/en/kontakty-ta-informacziya-dlya-inozemnyh-vstupnykiv> | P1 |  |
| 05 | `kharkiv-national-medical-university--05--special-edition-29-2026.pdf` | <https://knmu.edu.ua/en/news/spesial-edition-29-2026/> | P1 | Dated 04.08.2026 in the snippet; Pointer for the gate only |
| 01 | `kharkiv-national-medical-university--01--admission-rules-foreigners.pdf` | <https://knmu.edu.ua/en/pravyla-pryjomu-ta-informacziya-dlya-inozemcziv/> | P1 | Snippet shows the 2025 regulations — look for the 2026 version |
| 23 | `kharkiv-national-medical-university--23--admission-regulations-2026.pdf` | To locate: Admission regulations for foreign applicants for the 2026 intake (only the 2025 regulations surfaced) | P1 |  |
| 03 | `kharkiv-national-medical-university--03--faculty-vi-foreign-students.pdf` | <https://knmu.edu.ua/en/faculty/vi-fakultet-z-pidgotovky-inozemnyh-studentiv-navchalno-naukovogo-instytutu-z-pidgotovky-inozemnyh-gromadyan> | P1 |  |
| 09 | `kharkiv-national-medical-university--09--medicine-master-2024-catalogue.pdf` | <https://knmu.edu.ua/en/program-catalog/medicine-master-2024/> | P1 |  |
| 11 | `kharkiv-national-medical-university--11--medicine-programme-2024-25.pdf` (doc) | <https://knmu.edu.ua/wp-content/uploads/2026/02/psp_med24_25.pdf> | P1 |  |
| 24 | `kharkiv-national-medical-university--24--tuition-fees.pdf` | To locate: The official tuition-fee page or fee schedule for foreign applicants, with its academic year and payment schedule (none found on the official domain) | P1 |  |
| 04 | `kharkiv-national-medical-university--04--preparatory-department.pdf` | <https://knmu.edu.ua/en/navchalno-naukovyj-instytut-z-pidgotovky-inozemnyh-gromadyan-hnmu/pidgotovche-viddilennya/> | P2 |  |
| 08 | `kharkiv-national-medical-university--08--programme-catalogue.pdf` | <https://knmu.edu.ua/program-catalog/> | P2 |  |
| 25 | `kharkiv-national-medical-university--25--deadlines-2026.pdf` | To locate: Application deadlines and intake dates for the current cycle (none found) | P2 |  |
| 26 | `kharkiv-national-medical-university--26--required-documents.pdf` | To locate: The required-documents list for foreign applicants as currently published (the older invitation page was not identified) | P2 |  |
| 95 | `kharkiv-national-medical-university--95--accreditation-medicine.pdf` | To locate: the NAQA accreditation decision or certificate for the programme (search the university name on naqa.gov.ua and public.naqa.gov.ua), or the certificate the university publishes; one file per programme (Medicine) | P2 |  |
| 27 | `kharkiv-national-medical-university--27--hostel.pdf` | To locate: Hostel (accommodation) information for foreign students with published prices and their academic year | P3 |  |
| 12 | `kharkiv-national-medical-university--12--dentistry-programme-2024-25.pdf` (doc) | <https://knmu.edu.ua/wp-content/uploads/2026/04/epp_st24_25.pdf> | P3 |  |
| 14 | `kharkiv-national-medical-university--14--nursing-bachelor-catalogue.pdf` | <https://knmu.edu.ua/en/program-catalog/nursing-bachelor-2021/> | P3 |  |
| 17 | `kharkiv-national-medical-university--17--public-health-programme-2022.pdf` (doc) | <https://knmu.edu.ua/wp-content/uploads/2022/07/op_gr_zdor2022.pdf> | P3 |  |
| 21 | `kharkiv-national-medical-university--21--iv-medical-faculty.pdf` | <https://knmu.edu.ua/en/faculty/iv-medychnyj-fakultet/> | P3 |  |

Rows of the register not requested (out of date, out of scope or indirect only; close them as "not needed"): 6 (2022 rector's address: out of date), 10 (2022 programme version), 13, 15, 16, 18–20 (deferred-programme documents; 2021–2024 versions).

Pages requested: **P1 12**, P2 5, P3 5 (total 22).

**What each claim needs** (capture numbers refer to the list above, where each address is given)

| Claim | Claim path(s) | Capture(s) | Passage that must be visible | Priority |
|---|---|---|---|---|
| Official name | `officialName` | 07, 28a (to locate), 28b | Full official name exactly as printed (English and, if shown, Ukrainian), with the page heading or document title block | P1 |
| Official website, and the government (.gov.ua) page that lists exactly that website | `website` | 07, 28a (to locate), 28b | Heading naming the university and the field giving its website, character for character (N24 c); also name, address and EDEBO code if printed | P1 |
| Address | `address` | 02, 28a (to locate), 28b | Full postal address exactly as printed, under a heading that shows it is the university's address | P1 |
| Operating status, dated current-year (2026/27) statement, teaching format | `status`, `statusStatement`, `teachingFormat`, `programmes.<id>.format` | 22 (to locate), 05 | The whole 2026/27 notice or order on how and where teaching is organised (in person, blended or distance), with its date (and number, for an order) | P1 |
| Medicine: open to international applicants | `programmes.medicine.internationalAdmission` | 23 (to locate), 01, 03 | The sentence saying foreign applicants are admitted to the programme, and the intake or academic year it refers to | P1 |
| Medicine: level and award title | `programmes.medicine.level`, `.qualification`, `.specialtyCode` | 09, 11, 03 | Level (e.g. master's, single-cycle master's) and award title exactly as printed; specialty code if printed | P1 (level); P2 (title, code) |
| Medicine: teaching language | `programmes.medicine.language` | 03, 11 | Language(s) of instruction stated for that programme, not a general sentence about the university | P1 |
| Medicine: duration | `programmes.medicine.durationText`, `.durationYears` | 11, 03, 09 | Duration exactly as printed (years and months, semesters or ECTS) | P1 |
| Medicine: intake and academic year | `programmes.medicine.intakeYear`, `.intake` | 23 (to locate), 01, 25 (to locate) | The academic year or intake the page applies to (e.g. 2026/2027) and any start date | P1 |
| Medicine: tuition fee schedule with academic year (the page must be read even if it turns out out of date) | `programmes.medicine.tuition`, `.otherMandatoryCosts.<n>` | 24 (to locate) | The whole fee table: heading with academic-year label, every row and column header, currency, what each amount is charged per, payment schedule, any exchange-rate wording, other charges, footnotes, the document's own date or order number | P1 |
| Medicine: entry requirements | `programmes.medicine.requirements.<id>` | 23 (to locate), 01 | Entrance-examination subjects, format, pass mark and scale, and any language requirement, for the stated intake | P2 |
| Medicine: required documents | `programmes.medicine.documents.<id>` | 26 (to locate), 23 (to locate) | The full numbered list of documents with their conditions (translation, legalisation, notarisation, remote route) | P2 |
| Medicine: application deadlines | `programmes.medicine.deadlines` | 25 (to locate), 23 (to locate) | Application dates with the year as printed (a committee working period is recorded as that, never as a deadline) | P2 |
| International admissions contact | `internationalOffice` | 02 | Name of the unit for foreign applicants, its e-mail, telephone and page address as printed | P2 |
| Institutional licence / registration (government register) | no claim path today (schema gap); supports `website`, `officialName`, `address` | 28a (to locate) | The register card's licence section (licence or decision number, date, scope) — institutional registration and licensing, not programme accreditation | P2 (same file as the P1 register capture) |
| Programme accreditation in Ukraine (NAQA decision or certificate) | `accreditation` | 95 (to locate), 17 | Accreditation decision or certificate for the named programme: programme, level, number, date, validity — accreditation in Ukraine only, never recognition abroad | P2 |
| Preparatory department | `preparatoryRoutes.preparatory-department.*` (fee: `.fee`) | 04, 24 (to locate) | Language of instruction, any English track, duration, subjects, certificate name, the progression sentence verbatim, start date(s), fee with academic year, eligibility wording | P2 |
| Founding year | `founded` | 07 | Founding year as printed on the official history page or register | P3 |
| Accommodation | `accommodation` | 27 (to locate), 04 | Hostel availability and prices with the academic year | P3 |
| Deferred programmes (dentistry, nursing-bachelor, nursing-master, public-health, physical-therapy): eligibility of foreign applicants | `programmes.<deferred id>.internationalAdmission` | 12, 14, 17, 21 | Whether foreign applicants are admitted to the programme, and in which language, for the stated intake | P3 |
| Recognition in a destination country | `recognition` | not requested | Not requested: decided by each country's regulator (tier 4 only); no authority is listed (N24 b) | — |

### 2.4 Bogomolets National Medical University (`bogomolets-national-medical-university`)

SEMrush demand rank 4 (research priority only). **Register generated 2026-10-12:** row numbers are those `make-evidence-register.py` assigns (research references 1–9) plus the "to locate" rows 10–14 of `DIRECTORY_VERIFICATION_PLAN.md` §6.5; add those five rows to `TO_LOCATE` in that order and generate the register before the captures arrive. Record programmes: Medicine, Dentistry, Pharmacy; deferred: public health, physical therapy. Open domain question: the record uses nmuofficial.com, while leads also show nmu.ua; the government page decides which website the profile may name.

**Pages to capture** (file names to use exactly; "doc" = send the original file plus an address-bar screenshot, see §3)

| No. | File name | Address (URL) | Priority | Notes |
|---|---|---|---|---|
| 11a | `bogomolets-national-medical-university--11--edebo-register-card.pdf` | To locate: open https://registry.edbo.gov.ua/ (register of educational entities; located via search on 2026-10-12, not opened), search the university name, capture its card | P1 | Candidate card address (a search result attributes EDEBO code 149 to the university; unconfirmed): https://registry.edbo.gov.ua/university/149/ |
| 11b | `bogomolets-national-medical-university--11--ministry-portal-contacts.pdf` | <https://universities.studyinukraine.gov.ua/en/minedu/university/1/contacts> | P1 | Already cited by the record (tier 3) |
| 09 | `bogomolets-national-medical-university--09--homepage.pdf` | <https://nmuofficial.com/en/> | P1 |  |
| 10 | `bogomolets-national-medical-university--10--contacts.pdf` | To locate: the official contacts page (live, not the API snapshot) | P1 |  |
| 05 | `bogomolets-national-medical-university--05--international-relations-department.pdf` | <https://nmuofficial.com/en/?p=8085> | P1 |  |
| 13 | `bogomolets-national-medical-university--13--teaching-format-notice.pdf` | To locate: a dated 2025–26 or 2026–27 notice on teaching format | P1 |  |
| 01 | `bogomolets-national-medical-university--01--admission-of-foreign-citizens.pdf` | <https://nmuofficial.com/en/?p=73670> | P1 | Expand every section (programmes, window, documents, cost) before printing |
| 12 | `bogomolets-national-medical-university--12--fees-2026-27.pdf` | To locate: the official fee page or order for foreign citizens 2026/27 | P1 | Only if the fee table is not on file 01 |
| 02 | `bogomolets-national-medical-university--02--faculty-foreign-citizens-admission.pdf` | <https://nmuofficial.com/en/(УКР)%20/zagalni-vidomosti/fakultety/fakultet-pidgotovky-inozemnyh-gromadyan/vstup-inozemnyh-gromadyan/> | P2 | URL as surfaced by search (contains a space); may need correction; Reach the page from file 01 or the homepage and capture the final address |
| 03 | `bogomolets-national-medical-university--03--centre-faculty.pdf` | <https://nmuofficial.com/en/?p=114102> | P2 | Snippet content not returned |
| 04 | `bogomolets-national-medical-university--04--medicine-accreditation-page.pdf` | <https://nmuofficial.com/en/?p=192606> | P2 |  |
| 14 | `bogomolets-national-medical-university--14--dentistry-accreditation-page.pdf` | To locate: the dentistry (221) accreditation page | P2 |  |
| 95 | `bogomolets-national-medical-university--95--accreditation-medicine.pdf` | To locate: the NAQA accreditation decision or certificate for the programme (search the university name on naqa.gov.ua and public.naqa.gov.ua), or the certificate the university publishes; one file per programme (Medicine) | P2 |  |
| 96 | `bogomolets-national-medical-university--96--accreditation-dentistry.pdf` | To locate: as file 95, for Dentistry | P2 |  |
| 97 | `bogomolets-national-medical-university--97--accreditation-pharmacy.pdf` | To locate: as file 95, for Pharmacy | P2 |  |
| 06 | `bogomolets-national-medical-university--06--page-88424.pdf` | <https://nmuofficial.com/en/?p=88424> | P3 | Purpose unknown: capture only if it is about admissions |

Rows of the register not requested (out of date, out of scope or indirect only; close them as "not needed"): 7 (a WordPress API address, not a page: capture the live page, row 05/10, instead), 8 (2014 page). Government page in the record not requested: the NAQA self-assessment report (a university's self-assessment is not an accreditation decision).

Pages requested: **P1 8**, P2 7, P3 1 (total 16).

**What each claim needs** (capture numbers refer to the list above, where each address is given)

| Claim | Claim path(s) | Capture(s) | Passage that must be visible | Priority |
|---|---|---|---|---|
| Official name | `officialName` | 09, 11a (to locate), 11b | Full official name exactly as printed (English and, if shown, Ukrainian), with the page heading or document title block | P1 |
| Official website, and the government (.gov.ua) page that lists exactly that website | `website` | 09, 11a (to locate), 11b | Heading naming the university and the field giving its website, character for character (N24 c); also name, address and EDEBO code if printed | P1 |
| Address | `address` | 10 (to locate), 05, 11a (to locate), 11b | Full postal address exactly as printed, under a heading that shows it is the university's address | P1 |
| Operating status, dated current-year (2026/27) statement, teaching format | `status`, `statusStatement`, `teachingFormat`, `programmes.<id>.format` | 13 (to locate), 01 | The whole 2026/27 notice or order on how and where teaching is organised (in person, blended or distance), with its date (and number, for an order) | P1 |
| Medicine: open to international applicants | `programmes.medicine.internationalAdmission` | 01, 02 | The sentence saying foreign applicants are admitted to the programme, and the intake or academic year it refers to | P1 |
| Medicine: level and award title | `programmes.medicine.level`, `.qualification`, `.specialtyCode` | 01, 04 | Level (e.g. master's, single-cycle master's) and award title exactly as printed; specialty code if printed | P1 (level); P2 (title, code) |
| Medicine: teaching language | `programmes.medicine.language` | 01 | Language(s) of instruction stated for that programme, not a general sentence about the university | P1 |
| Medicine: duration | `programmes.medicine.durationText`, `.durationYears` | 01 | Duration exactly as printed (years and months, semesters or ECTS) | P1 |
| Medicine: intake and academic year | `programmes.medicine.intakeYear`, `.intake` | 01 | The academic year or intake the page applies to (e.g. 2026/2027) and any start date | P1 |
| Medicine: tuition fee schedule with academic year (the page must be read even if it turns out out of date) | `programmes.medicine.tuition`, `.otherMandatoryCosts.<n>` | 01, 12 (to locate) | The whole fee table: heading with academic-year label, every row and column header, currency, what each amount is charged per, payment schedule, any exchange-rate wording, other charges, footnotes, the document's own date or order number | P1 |
| Medicine: entry requirements | `programmes.medicine.requirements.<id>` | 01 | Entrance-examination subjects, format, pass mark and scale, and any language requirement, for the stated intake | P2 |
| Medicine: required documents | `programmes.medicine.documents.<id>` | 01 | The full numbered list of documents with their conditions (translation, legalisation, notarisation, remote route) | P2 |
| Medicine: application deadlines | `programmes.medicine.deadlines` | 01 | Application dates with the year as printed (a committee working period is recorded as that, never as a deadline) | P2 |
| Dentistry: open to international applicants; level and title; language; duration; intake | `programmes.dentistry.internationalAdmission`, `.level`, `.qualification`, `.language`, `.durationText`, `.intakeYear` | 01, 02, 04 | As for the first programme, for this programme | P2 |
| Dentistry: tuition fee schedule with academic year | `programmes.dentistry.tuition`, `.otherMandatoryCosts.<n>` | 01, 12 (to locate) | Its row(s) of the same fee table (no extra file if the table is already captured) | P2 |
| Dentistry: entry requirements, documents, deadlines | `programmes.dentistry.requirements.<id>`, `.documents.<id>`, `.deadlines` | 01 | As for the first programme, for this programme | P2 |
| Pharmacy, industrial pharmacy: open to international applicants; level and title; language; duration; intake | `programmes.pharmacy.internationalAdmission`, `.level`, `.qualification`, `.language`, `.durationText`, `.intakeYear` | 01, 02, 04 | As for the first programme, for this programme | P2 |
| Pharmacy, industrial pharmacy: tuition fee schedule with academic year | `programmes.pharmacy.tuition`, `.otherMandatoryCosts.<n>` | 01, 12 (to locate) | Its row(s) of the same fee table (no extra file if the table is already captured) | P2 |
| Pharmacy, industrial pharmacy: entry requirements, documents, deadlines | `programmes.pharmacy.requirements.<id>`, `.documents.<id>`, `.deadlines` | 01 | As for the first programme, for this programme | P2 |
| International admissions contact | `internationalOffice` | 05, 10 (to locate), 03, 02 | Name of the unit for foreign applicants, its e-mail, telephone and page address as printed | P2 |
| Institutional licence / registration (government register) | no claim path today (schema gap); supports `website`, `officialName`, `address` | 11a (to locate) | The register card's licence section (licence or decision number, date, scope) — institutional registration and licensing, not programme accreditation | P2 (same file as the P1 register capture) |
| Programme accreditation in Ukraine (NAQA decision or certificate) | `accreditation` | 95 (to locate), 96 (to locate), 97 (to locate), 04, 14 (to locate) | Accreditation decision or certificate for the named programme: programme, level, number, date, validity — accreditation in Ukraine only, never recognition abroad | P2 |
| Preparatory department | `preparatoryRoutes.preparatory-department.*` (fee: `.fee`) | 01, 12 (to locate) | Language of instruction, any English track, duration, subjects, certificate name, the progression sentence verbatim, start date(s), fee with academic year, eligibility wording | P2 |
| Founding year | `founded` | 09 | Founding year as printed on the official history page or register | P3 |
| Accommodation | `accommodation` | none referenced: capture only if found | Hostel availability and prices with the academic year | P3 |
| Deferred programmes (public-health, physical-therapy): eligibility of foreign applicants | `programmes.<deferred id>.internationalAdmission` | 01 | Whether foreign applicants are admitted to the programme, and in which language, for the stated intake | P3 |
| Recognition in a destination country | `recognition` | not requested | Not requested: decided by each country's regulator (tier 4 only); no authority is listed (N24 b) | — |

### 2.5 Ivano-Frankivsk National Medical University (`ivano-frankivsk-national-medical-university`)

SEMrush demand rank 5 (research priority only). **Register generated 2026-10-12:** row numbers are those `make-evidence-register.py` assigns (references 1–22) plus "to locate" rows 23–24 of `DIRECTORY_VERIFICATION_PLAN.md` §6.4; add them to `TO_LOCATE` in that order and generate the register. Record programmes: Medicine, Dentistry, Pharmacy (their intake-year leads say 2025/26, the closed cycle); deferred: nursing, public health, physical therapy (bachelor, master).

**Pages to capture** (file names to use exactly; "doc" = send the original file plus an address-bar screenshot, see §3)

| No. | File name | Address (URL) | Priority | Notes |
|---|---|---|---|---|
| 24a | `ivano-frankivsk-national-medical-university--24--edebo-register-card.pdf` | To locate: open https://registry.edbo.gov.ua/ (register of educational entities; located via search on 2026-10-12, not opened), search the university name, capture its card | P1 |  |
| 24b | `ivano-frankivsk-national-medical-university--24--ministry-portal-entry.pdf` | To locate: the university's page on https://universities.studyinukraine.gov.ua/ (contacts tab) | P1 |  |
| 21 | `ivano-frankivsk-national-medical-university--21--admissions-committee-contacts.pdf` | <https://www.ifnmu.edu.ua/admission-committee/contact-information-admissions-commission-ifnmu/> | P1 |  |
| 20 | `ivano-frankivsk-national-medical-university--20--news-2026-09-01.pdf` | <https://www.ifnmu.edu.ua/2026/09/01/navchannia-bez-kordoniv-inozemni-studenty-medyky-rozpochynaiut-novyy-navchalnyy-rik/> | P1 | Dated 2026 lead; whether a dated news item counts as the statement is an owner decision (plan §7) |
| 01 | `ivano-frankivsk-national-medical-university--01--admissions-committee-2026.pdf` | <https://www.ifnmu.edu.ua/admissions-committee-2026/> | P1 | Expand every section, including any fee table |
| 02 | `ivano-frankivsk-national-medical-university--02--admission-rules-2026.pdf` | <https://www.ifnmu.edu.ua/admissions-committee-2026/rules-for-admission-to-higher-education-at-ivano-frankovsk-national-medical-university-in-2026/> | P1 |  |
| 12 | `ivano-frankivsk-national-medical-university--12--medicine-programme-2025.pdf` (doc) | <https://www.ifnmu.edu.ua/wp-content/uploads/2025/06/7_Professional-Education-Program-І2-Medicine-2025-edition-2020-07.pdf> | P1 |  |
| 23 | `ivano-frankivsk-national-medical-university--23--fees-2026.pdf` | To locate: the current fee table for foreign citizens if a 2026 version exists | P1 |  |
| 05 | `ivano-frankivsk-national-medical-university--05--cost-of-studying-2025.pdf` | <https://www.ifnmu.edu.ua/admission_committe_2025/the-cost-of-studying-at-the-infmu-and-the-infmu-professional-medical-college-in-2025/> | P1 | Fee page currently referenced; 2025 figures are out of date for 2026/27 but the page must be read if no 2026 table exists |
| 06 | `ivano-frankivsk-national-medical-university--06--public-information-fees.pdf` | <https://www.ifnmu.edu.ua/home/public-information/amount-of-fees-for-education-training-retraining-qualification-improvement-of-education-seekers/> | P1 |  |
| 03 | `ivano-frankivsk-national-medical-university--03--selection-committee-regulation-2026.pdf` (doc) | <https://www.ifnmu.edu.ua/wp-content/uploads/2026/05/Положення-про-відбіркову-комісію-іноземців-ІФНМУ-у-2026-році.pdf> | P2 |  |
| 08 | `ivano-frankivsk-national-medical-university--08--faculty-foreign-citizens.pdf` | <https://www.ifnmu.edu.ua/home/faculty-of-training-of-foreign-citizens/> | P2 |  |
| 10 | `ivano-frankivsk-national-medical-university--10--preparatory-department.pdf` | <https://www.ifnmu.edu.ua/en/for-students/preparatory-department> | P2 | Undated |
| 11 | `ivano-frankivsk-national-medical-university--11--educational-programmes.pdf` | <https://www.ifnmu.edu.ua/educational-programs/> | P2 |  |
| 13 | `ivano-frankivsk-national-medical-university--13--dentistry-programme-2023.pdf` (doc) | <https://www.ifnmu.edu.ua/wp-content/uploads/2024/08/Educational-professional-program-Stomatology-2023-edition-2020-04.pdf> | P2 | Likely superseded by the 2025 edition |
| 14 | `ivano-frankivsk-national-medical-university--14--pharmacy-programme.pdf` (doc) | <https://www.ifnmu.edu.ua/wp-content/uploads/2026/04/09_EPP_-Master_Pharmacy_industrial_pharmacy_2020_09_25.pdf> | P2 |  |
| 95 | `ivano-frankivsk-national-medical-university--95--accreditation-medicine.pdf` | To locate: the NAQA accreditation decision or certificate for the programme (search the university name on naqa.gov.ua and public.naqa.gov.ua), or the certificate the university publishes; one file per programme (Medicine) | P2 |  |
| 96 | `ivano-frankivsk-national-medical-university--96--accreditation-dentistry.pdf` | To locate: as file 95, for Dentistry | P2 |  |
| 97 | `ivano-frankivsk-national-medical-university--97--accreditation-pharmacy.pdf` | To locate: as file 95, for Pharmacy | P2 |  |
| 04 | `ivano-frankivsk-national-medical-university--04--masters-foreign-2025.pdf` | <https://www.ifnmu.edu.ua/admission_committe_2025/masters-degree-for-foreign-citizens-2025/> | P3 |  |
| 07 | `ivano-frankivsk-national-medical-university--07--admission-english-old.pdf` | <https://www.ifnmu.edu.ua/en/admission> | P3 | Shows a 2022-dated note; possibly outdated |
| 09 | `ivano-frankivsk-national-medical-university--09--deanery-foreign-citizens.pdf` | <https://www.ifnmu.edu.ua/en/staf-en/faculties/deanery-of-foreign-citizens-training-department> | P3 | Undated, likely several years old |
| 19 | `ivano-frankivsk-national-medical-university--19--order-964-2025.pdf` (doc) | <https://www.ifnmu.edu.ua/wp-content/uploads/2025/11/Наказ-№-964-д-від-26.08.-2025-р.-Про-організацію-освітнього-процесу-в-осінньому-семестрі-2025-2026-н.р.-.pdf> | P3 | Autumn 2025–26 only: to mark as out of date |
| 18 | `ivano-frankivsk-national-medical-university--18--faculty-health-sciences.pdf` | <https://www.ifnmu.edu.ua/faculty-of-health-sciences/> | P3 |  |

Rows of the register not requested (out of date, out of scope or indirect only; close them as "not needed"): 15–17 (deferred-programme documents), 22 (2024 brief: student numbers are never published).

Pages requested: **P1 10**, P2 9, P3 5 (total 24).

**What each claim needs** (capture numbers refer to the list above, where each address is given)

| Claim | Claim path(s) | Capture(s) | Passage that must be visible | Priority |
|---|---|---|---|---|
| Official name | `officialName` | 01, 21, 24a (to locate), 24b (to locate) | Full official name exactly as printed (English and, if shown, Ukrainian), with the page heading or document title block | P1 |
| Official website, and the government (.gov.ua) page that lists exactly that website | `website` | 01, 24a (to locate), 24b (to locate) | Heading naming the university and the field giving its website, character for character (N24 c); also name, address and EDEBO code if printed | P1 |
| Address | `address` | 21, 24a (to locate), 24b (to locate) | Full postal address exactly as printed, under a heading that shows it is the university's address | P1 |
| Operating status, dated current-year (2026/27) statement, teaching format | `status`, `statusStatement`, `teachingFormat`, `programmes.<id>.format` | 20, 19 | The whole 2026/27 notice or order on how and where teaching is organised (in person, blended or distance), with its date (and number, for an order) | P1 |
| Medicine: open to international applicants | `programmes.medicine.internationalAdmission` | 01, 02, 03 | The sentence saying foreign applicants are admitted to the programme, and the intake or academic year it refers to | P1 |
| Medicine: level and award title | `programmes.medicine.level`, `.qualification`, `.specialtyCode` | 12, 11 | Level (e.g. master's, single-cycle master's) and award title exactly as printed; specialty code if printed | P1 (level); P2 (title, code) |
| Medicine: teaching language | `programmes.medicine.language` | 01, 02, 12 | Language(s) of instruction stated for that programme, not a general sentence about the university | P1 |
| Medicine: duration | `programmes.medicine.durationText`, `.durationYears` | 12, 11 | Duration exactly as printed (years and months, semesters or ECTS) | P1 |
| Medicine: intake and academic year | `programmes.medicine.intakeYear`, `.intake` | 01, 02 | The academic year or intake the page applies to (e.g. 2026/2027) and any start date | P1 |
| Medicine: tuition fee schedule with academic year (the page must be read even if it turns out out of date) | `programmes.medicine.tuition`, `.otherMandatoryCosts.<n>` | 23 (to locate), 05, 06 | The whole fee table: heading with academic-year label, every row and column header, currency, what each amount is charged per, payment schedule, any exchange-rate wording, other charges, footnotes, the document's own date or order number | P1 |
| Medicine: entry requirements | `programmes.medicine.requirements.<id>` | 02, 01 | Entrance-examination subjects, format, pass mark and scale, and any language requirement, for the stated intake | P2 |
| Medicine: required documents | `programmes.medicine.documents.<id>` | 02, 03 | The full numbered list of documents with their conditions (translation, legalisation, notarisation, remote route) | P2 |
| Medicine: application deadlines | `programmes.medicine.deadlines` | 01, 02 | Application dates with the year as printed (a committee working period is recorded as that, never as a deadline) | P2 |
| Dentistry (221 Stomatology): open to international applicants; level and title; language; duration; intake | `programmes.dentistry.internationalAdmission`, `.level`, `.qualification`, `.language`, `.durationText`, `.intakeYear` | 01, 02, 13, 11 | As for the first programme, for this programme | P2 |
| Dentistry (221 Stomatology): tuition fee schedule with academic year | `programmes.dentistry.tuition`, `.otherMandatoryCosts.<n>` | 23 (to locate), 05, 06 | Its row(s) of the same fee table (no extra file if the table is already captured) | P2 |
| Dentistry (221 Stomatology): entry requirements, documents, deadlines | `programmes.dentistry.requirements.<id>`, `.documents.<id>`, `.deadlines` | 02, 01 | As for the first programme, for this programme | P2 |
| Pharmacy, industrial pharmacy: open to international applicants; level and title; language; duration; intake | `programmes.pharmacy.internationalAdmission`, `.level`, `.qualification`, `.language`, `.durationText`, `.intakeYear` | 01, 02, 14, 11 | As for the first programme, for this programme | P2 |
| Pharmacy, industrial pharmacy: tuition fee schedule with academic year | `programmes.pharmacy.tuition`, `.otherMandatoryCosts.<n>` | 23 (to locate), 05, 06 | Its row(s) of the same fee table (no extra file if the table is already captured) | P2 |
| Pharmacy, industrial pharmacy: entry requirements, documents, deadlines | `programmes.pharmacy.requirements.<id>`, `.documents.<id>`, `.deadlines` | 02, 01 | As for the first programme, for this programme | P2 |
| International admissions contact | `internationalOffice` | 21, 08 | Name of the unit for foreign applicants, its e-mail, telephone and page address as printed | P2 |
| Institutional licence / registration (government register) | no claim path today (schema gap); supports `website`, `officialName`, `address` | 24a (to locate) | The register card's licence section (licence or decision number, date, scope) — institutional registration and licensing, not programme accreditation | P2 (same file as the P1 register capture) |
| Programme accreditation in Ukraine (NAQA decision or certificate) | `accreditation` | 95 (to locate), 96 (to locate), 97 (to locate) | Accreditation decision or certificate for the named programme: programme, level, number, date, validity — accreditation in Ukraine only, never recognition abroad | P2 |
| Preparatory department | `preparatoryRoutes.preparatory-department.*` (fee: `.fee`) | 10, 23 (to locate), 05 | Language of instruction, any English track, duration, subjects, certificate name, the progression sentence verbatim, start date(s), fee with academic year, eligibility wording | P2 |
| Founding year | `founded` | 01 | Founding year as printed on the official history page or register | P3 |
| Accommodation | `accommodation` | none referenced: capture only if found | Hostel availability and prices with the academic year | P3 |
| Deferred programmes (nursing, public-health, physical-therapy-bachelor, physical-therapy-master): eligibility of foreign applicants | `programmes.<deferred id>.internationalAdmission` | 18, 11 | Whether foreign applicants are admitted to the programme, and in which language, for the stated intake | P3 |
| Recognition in a destination country | `recognition` | not requested | Not requested: decided by each country's regulator (tier 4 only); no authority is listed (N24 b) | — |

### 2.6 Uzhhorod National University (`uzhhorod-national-university`)

SEMrush demand rank 6 (research priority only). **Register generated 2026-10-12:** row numbers are those `make-evidence-register.py` assigns (references 1–15) plus "to locate" rows 16–18 of `DIRECTORY_VERIFICATION_PLAN.md` §6.7 and a proposed row 19 for the government entry; add them to `TO_LOCATE` in that order and generate the register. Record programme: Medicine (English-medium, Medical Faculty No. 2) only; deferred: dentistry, pharmacy, nursing, public health, physical rehabilitation, physical culture and sport. No address lead exists.

**Pages to capture** (file names to use exactly; "doc" = send the original file plus an address-bar screenshot, see §3)

| No. | File name | Address (URL) | Priority | Notes |
|---|---|---|---|---|
| 19a | `uzhhorod-national-university--19--edebo-register-card.pdf` | To locate: open https://registry.edbo.gov.ua/ (register of educational entities; located via search on 2026-10-12, not opened), search the university name, capture its card | P1 | Candidate card address, inferred from the identifier in third-party portal addresses, unconfirmed: https://registry.edbo.gov.ua/university/207/ |
| 19b | `uzhhorod-national-university--19--ministry-portal-entry.pdf` | To locate: the university's page on https://universities.studyinukraine.gov.ua/ (contacts tab) | P1 |  |
| 91 | `uzhhorod-national-university--91--about-university.pdf` | <https://www.uzhnu.edu.ua/en/cat/university-about_us> | P1 | located via search on 2026-10-12, not opened; not yet in the record's references |
| 16 | `uzhhorod-national-university--16--contacts.pdf` | To locate: the official contacts page (postal address) | P1 |  |
| 18 | `uzhhorod-national-university--18--teaching-format-2026-27.pdf` | To locate: a dated 2026–27 statement on teaching format for foreign students | P1 |  |
| 01 | `uzhhorod-national-university--01--admission-rules-foreign.pdf` | <https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs> | P1 | Check the year the page states (an earlier sweep saw older rules here) |
| 03 | `uzhhorod-national-university--03--courses-in-english-and-fees.pdf` | <https://uzhnu.edu.ua/en/cat/abiturient-foreign/courses_in_english> | P1 |  |
| 17 | `uzhhorod-national-university--17--medicine-programme-page.pdf` | To locate: the official programme page for 222 Medicine at Medical Faculty No. 2 (level, award, duration) | P1 |  |
| 02 | `uzhhorod-national-university--02--foreign-students-about.pdf` | <https://uzhnu.edu.ua/en/cat/abiturient-foreign/about> | P2 |  |
| 05 | `uzhhorod-national-university--05--medical-faculty-2-news.pdf` | <https://uzhnu.edu.ua/en/news/Medical-Faculty-No-2-modern-education-for-future-professionals.htm> | P2 |  |
| 06 | `uzhhorod-national-university--06--faculty-of-medicine.pdf` | <https://uzhnu.edu.ua/en/cat/faculty-medical/about> | P2 |  |
| 09 | `uzhhorod-national-university--09--pre-university-centre.pdf` | <https://uzhnu.edu.ua/en/cat/pdodp-preuniversity> | P2 |  |
| 14 | `uzhhorod-national-university--14--list-of-specialities.pdf` | <https://www.uzhnu.edu.ua/en/news/List-of-specialities-specializations-educational-programmes.htm> | P2 |  |
| 95 | `uzhhorod-national-university--95--accreditation-medicine.pdf` | To locate: the NAQA accreditation decision or certificate for the programme (search the university name on naqa.gov.ua and public.naqa.gov.ua), or the certificate the university publishes; one file per programme (Medicine) | P2 |  |
| 04 | `uzhhorod-national-university--04--account-activation.pdf` | <https://www.uzhnu.edu.ua/en/cat/foreign-acc_activation> | P3 |  |
| 07 | `uzhhorod-national-university--07--faculty-of-dentistry.pdf` | <https://uzhnu.edu.ua/en/cat/faculty-fstomat/about> | P3 | Undated |
| 13 | `uzhhorod-national-university--13--exam-session-order-2025-26.pdf` | <https://uzhnu.edu.ua/en/infocentre/get/43800> | P3 | Semester 1 of 2025–26 only |
| 15 | `uzhhorod-national-university--15--graduation-2026.pdf` | <https://www.uzhnu.edu.ua/en/news/Uzhhorod-National-University-Holds-Graduation-Cerem.htm> | P3 |  |

Rows of the register not requested (out of date, out of scope or indirect only; close them as "not needed"): 8, 10–12 (deferred-programme pages and documents).

Pages requested: **P1 8**, P2 6, P3 4 (total 18).

**What each claim needs** (capture numbers refer to the list above, where each address is given)

| Claim | Claim path(s) | Capture(s) | Passage that must be visible | Priority |
|---|---|---|---|---|
| Official name | `officialName` | 91, 02, 19a (to locate), 19b (to locate) | Full official name exactly as printed (English and, if shown, Ukrainian), with the page heading or document title block | P1 |
| Official website, and the government (.gov.ua) page that lists exactly that website | `website` | 91, 19a (to locate), 19b (to locate) | Heading naming the university and the field giving its website, character for character (N24 c); also name, address and EDEBO code if printed | P1 |
| Address | `address` | 16 (to locate), 19a (to locate), 19b (to locate) | Full postal address exactly as printed, under a heading that shows it is the university's address | P1 |
| Operating status, dated current-year (2026/27) statement, teaching format | `status`, `statusStatement`, `teachingFormat`, `programmes.<id>.format` | 18 (to locate), 13, 15 | The whole 2026/27 notice or order on how and where teaching is organised (in person, blended or distance), with its date (and number, for an order) | P1 |
| Medicine (Medical Doctor programme, Medical Faculty No. 2): open to international applicants | `programmes.medicine.internationalAdmission` | 01, 03, 05 | The sentence saying foreign applicants are admitted to the programme, and the intake or academic year it refers to | P1 |
| Medicine (Medical Doctor programme, Medical Faculty No. 2): level and award title | `programmes.medicine.level`, `.qualification`, `.specialtyCode` | 17 (to locate), 05, 06 | Level (e.g. master's, single-cycle master's) and award title exactly as printed; specialty code if printed | P1 (level); P2 (title, code) |
| Medicine (Medical Doctor programme, Medical Faculty No. 2): teaching language | `programmes.medicine.language` | 03, 17 (to locate), 05 | Language(s) of instruction stated for that programme, not a general sentence about the university | P1 |
| Medicine (Medical Doctor programme, Medical Faculty No. 2): duration | `programmes.medicine.durationText`, `.durationYears` | 17 (to locate), 06 | Duration exactly as printed (years and months, semesters or ECTS) | P1 |
| Medicine (Medical Doctor programme, Medical Faculty No. 2): intake and academic year | `programmes.medicine.intakeYear`, `.intake` | 01 | The academic year or intake the page applies to (e.g. 2026/2027) and any start date | P1 |
| Medicine (Medical Doctor programme, Medical Faculty No. 2): tuition fee schedule with academic year (the page must be read even if it turns out out of date) | `programmes.medicine.tuition`, `.otherMandatoryCosts.<n>` | 03 | The whole fee table: heading with academic-year label, every row and column header, currency, what each amount is charged per, payment schedule, any exchange-rate wording, other charges, footnotes, the document's own date or order number | P1 |
| Medicine (Medical Doctor programme, Medical Faculty No. 2): entry requirements | `programmes.medicine.requirements.<id>` | 01 | Entrance-examination subjects, format, pass mark and scale, and any language requirement, for the stated intake | P2 |
| Medicine (Medical Doctor programme, Medical Faculty No. 2): required documents | `programmes.medicine.documents.<id>` | 01, 04 | The full numbered list of documents with their conditions (translation, legalisation, notarisation, remote route) | P2 |
| Medicine (Medical Doctor programme, Medical Faculty No. 2): application deadlines | `programmes.medicine.deadlines` | 01 | Application dates with the year as printed (a committee working period is recorded as that, never as a deadline) | P2 |
| International admissions contact | `internationalOffice` | 02, 16 (to locate) | Name of the unit for foreign applicants, its e-mail, telephone and page address as printed | P2 |
| Institutional licence / registration (government register) | no claim path today (schema gap); supports `website`, `officialName`, `address` | 19a (to locate) | The register card's licence section (licence or decision number, date, scope) — institutional registration and licensing, not programme accreditation | P2 (same file as the P1 register capture) |
| Programme accreditation in Ukraine (NAQA decision or certificate) | `accreditation` | 95 (to locate) | Accreditation decision or certificate for the named programme: programme, level, number, date, validity — accreditation in Ukraine only, never recognition abroad | P2 |
| Preparatory department | `preparatoryRoutes.preparatory-department.*` (fee: `.fee`) | 09, 03 | Language of instruction, any English track, duration, subjects, certificate name, the progression sentence verbatim, start date(s), fee with academic year, eligibility wording | P2 |
| Founding year | `founded` | 91 | Founding year as printed on the official history page or register | P3 |
| Accommodation | `accommodation` | none referenced: capture only if found | Hostel availability and prices with the academic year | P3 |
| Deferred programmes (dentistry, pharmacy, nursing, public-health, physical-rehabilitation, physical-culture-sport): eligibility of foreign applicants | `programmes.<deferred id>.internationalAdmission` | 07, 14 | Whether foreign applicants are admitted to the programme, and in which language, for the stated intake | P3 |
| Recognition in a destination country | `recognition` | not requested | Not requested: decided by each country's regulator (tier 4 only); no authority is listed (N24 b) | — |

### 2.7 Ternopil National Medical University (`ternopil-national-medical-university`)

SEMrush demand rank 7 (research priority only). **Register generated 2026-10-12:** row numbers are those `make-evidence-register.py` assigns (references 1–7; the Ministry-portal reference is excluded from the numbering) plus "to locate" rows 8–11 of `DIRECTORY_VERIFICATION_PLAN.md` §6.6 and a proposed row 12 for the government entry. The official name, address and founding year in the record come from the project brief, not from any official page. Record programmes: General Medicine, Dentistry, Pharmacy (intake-year leads say 2025/26); deferred: nursing, public health, physical therapy. Open domain question: tdmu.edu.ua vs tnmu.edu.ua.

**Pages to capture** (file names to use exactly; "doc" = send the original file plus an address-bar screenshot, see §3)

| No. | File name | Address (URL) | Priority | Notes |
|---|---|---|---|---|
| 12a | `ternopil-national-medical-university--12--edebo-register-card.pdf` | To locate: open https://registry.edbo.gov.ua/ (register of educational entities; located via search on 2026-10-12, not opened), search the university name, capture its card | P1 |  |
| 12b | `ternopil-national-medical-university--12--ministry-portal-contacts.pdf` | <https://universities.studyinukraine.gov.ua/en/minedu/university/68/contacts> | P1 | address built from the pattern of the Ministry-portal page the record already cites; not opened |
| 07 | `ternopil-national-medical-university--07--english-site-home.pdf` | <https://www.tdmu.edu.ua/en/> | P1 |  |
| 08 | `ternopil-national-medical-university--08--contacts-and-history.pdf` | To locate: the official contacts page and the history page (founding year) | P1 | Two files: -contacts and -history |
| 10 | `ternopil-national-medical-university--10--teaching-format-2026-27.pdf` | To locate: a dated current-year statement of teaching format | P1 |  |
| 01 | `ternopil-national-medical-university--01--international-admission.pdf` | <https://www.tdmu.edu.ua/int/admission/> | P1 |  |
| 04 | `ternopil-national-medical-university--04--rules-of-admission.pdf` | <https://www.tdmu.edu.ua/int/rules-of-admission/> | P1 |  |
| 11 | `ternopil-national-medical-university--11--programme-pages.pdf` | To locate: the official programme pages with exact award titles | P1 | One file per programme: -medicine, -dentistry, -pharmacy |
| 09 | `ternopil-national-medical-university--09--fees-2026-27.pdf` | To locate: a 2026/27 fee table (the surfaced table is 2025/26) | P1 |  |
| 02 | `ternopil-national-medical-university--02--payment-info.pdf` | <https://www.tdmu.edu.ua/int/payment-info/> | P1 |  |
| 03 | `ternopil-national-medical-university--03--tuition-table-2025-26.pdf` | <https://www.tdmu.edu.ua/int/?p=5664> | P1 | 2025/26 table: read to record it as out of date if no 2026/27 table exists |
| 05 | `ternopil-national-medical-university--05--preparatory-department-int.pdf` | <https://www.tdmu.edu.ua/int/?p=1625> | P2 |  |
| 06 | `ternopil-national-medical-university--06--preparatory-department-junior.pdf` | <https://junior.tdmu.edu.ua/english> | P2 |  |
| 95 | `ternopil-national-medical-university--95--accreditation-medicine.pdf` | To locate: the NAQA accreditation decision or certificate for the programme (search the university name on naqa.gov.ua and public.naqa.gov.ua), or the certificate the university publishes; one file per programme (General Medicine) | P2 |  |
| 96 | `ternopil-national-medical-university--96--accreditation-dentistry.pdf` | To locate: as file 95, for Dentistry | P2 |  |
| 97 | `ternopil-national-medical-university--97--accreditation-pharmacy.pdf` | To locate: as file 95, for Pharmacy | P2 |  |

Rows of the register not requested (out of date, out of scope or indirect only; close them as "not needed"): none. Government page in the record (Ministry-portal preparatory page): pointer only, not requested.

Pages requested: **P1 11**, P2 5, P3 0 (total 16).

**What each claim needs** (capture numbers refer to the list above, where each address is given)

| Claim | Claim path(s) | Capture(s) | Passage that must be visible | Priority |
|---|---|---|---|---|
| Official name | `officialName` | 07, 12a (to locate), 12b, 12a (to locate), 12b | Full official name exactly as printed (English and, if shown, Ukrainian), with the page heading or document title block | P1 |
| Official website, and the government (.gov.ua) page that lists exactly that website | `website` | 07, 12a (to locate), 12b | Heading naming the university and the field giving its website, character for character (N24 c); also name, address and EDEBO code if printed | P1 |
| Address | `address` | 08 (to locate), 12a (to locate), 12b | Full postal address exactly as printed, under a heading that shows it is the university's address | P1 |
| Operating status, dated current-year (2026/27) statement, teaching format | `status`, `statusStatement`, `teachingFormat`, `programmes.<id>.format` | 10 (to locate), 07 | The whole 2026/27 notice or order on how and where teaching is organised (in person, blended or distance), with its date (and number, for an order) | P1 |
| General Medicine: open to international applicants | `programmes.medicine.internationalAdmission` | 01, 04, 11 (to locate) | The sentence saying foreign applicants are admitted to the programme, and the intake or academic year it refers to | P1 |
| General Medicine: level and award title | `programmes.medicine.level`, `.qualification`, `.specialtyCode` | 11 (to locate), 01 | Level (e.g. master's, single-cycle master's) and award title exactly as printed; specialty code if printed | P1 (level); P2 (title, code) |
| General Medicine: teaching language | `programmes.medicine.language` | 11 (to locate), 01, 09 (to locate) | Language(s) of instruction stated for that programme, not a general sentence about the university | P1 |
| General Medicine: duration | `programmes.medicine.durationText`, `.durationYears` | 11 (to locate), 01 | Duration exactly as printed (years and months, semesters or ECTS) | P1 |
| General Medicine: intake and academic year | `programmes.medicine.intakeYear`, `.intake` | 01, 04 | The academic year or intake the page applies to (e.g. 2026/2027) and any start date | P1 |
| General Medicine: tuition fee schedule with academic year (the page must be read even if it turns out out of date) | `programmes.medicine.tuition`, `.otherMandatoryCosts.<n>` | 09 (to locate), 02, 03 | The whole fee table: heading with academic-year label, every row and column header, currency, what each amount is charged per, payment schedule, any exchange-rate wording, other charges, footnotes, the document's own date or order number | P1 |
| General Medicine: entry requirements | `programmes.medicine.requirements.<id>` | 04, 01 | Entrance-examination subjects, format, pass mark and scale, and any language requirement, for the stated intake | P2 |
| General Medicine: required documents | `programmes.medicine.documents.<id>` | 01 | The full numbered list of documents with their conditions (translation, legalisation, notarisation, remote route) | P2 |
| General Medicine: application deadlines | `programmes.medicine.deadlines` | 01, 04 | Application dates with the year as printed (a committee working period is recorded as that, never as a deadline) | P2 |
| Dentistry: open to international applicants; level and title; language; duration; intake | `programmes.dentistry.internationalAdmission`, `.level`, `.qualification`, `.language`, `.durationText`, `.intakeYear` | 01, 04, 11 (to locate) | As for the first programme, for this programme | P2 |
| Dentistry: tuition fee schedule with academic year | `programmes.dentistry.tuition`, `.otherMandatoryCosts.<n>` | 09 (to locate), 02, 03 | Its row(s) of the same fee table (no extra file if the table is already captured) | P2 |
| Dentistry: entry requirements, documents, deadlines | `programmes.dentistry.requirements.<id>`, `.documents.<id>`, `.deadlines` | 04, 01 | As for the first programme, for this programme | P2 |
| Pharmacy: open to international applicants; level and title; language; duration; intake | `programmes.pharmacy.internationalAdmission`, `.level`, `.qualification`, `.language`, `.durationText`, `.intakeYear` | 01, 04, 11 (to locate) | As for the first programme, for this programme | P2 |
| Pharmacy: tuition fee schedule with academic year | `programmes.pharmacy.tuition`, `.otherMandatoryCosts.<n>` | 09 (to locate), 02, 03 | Its row(s) of the same fee table (no extra file if the table is already captured) | P2 |
| Pharmacy: entry requirements, documents, deadlines | `programmes.pharmacy.requirements.<id>`, `.documents.<id>`, `.deadlines` | 04, 01 | As for the first programme, for this programme | P2 |
| International admissions contact | `internationalOffice` | 01, 08 (to locate) | Name of the unit for foreign applicants, its e-mail, telephone and page address as printed | P2 |
| Institutional licence / registration (government register) | no claim path today (schema gap); supports `website`, `officialName`, `address` | 12a (to locate) | The register card's licence section (licence or decision number, date, scope) — institutional registration and licensing, not programme accreditation | P2 (same file as the P1 register capture) |
| Programme accreditation in Ukraine (NAQA decision or certificate) | `accreditation` | 95 (to locate), 96 (to locate), 97 (to locate) | Accreditation decision or certificate for the named programme: programme, level, number, date, validity — accreditation in Ukraine only, never recognition abroad | P2 |
| Preparatory department | `preparatoryRoutes.preparatory-department.*` (fee: `.fee`) | 05, 06, 02, 09 (to locate) | Language of instruction, any English track, duration, subjects, certificate name, the progression sentence verbatim, start date(s), fee with academic year, eligibility wording | P2 |
| Founding year | `founded` | 08 (to locate) | Founding year as printed on the official history page or register | P3 |
| Accommodation | `accommodation` | 02, 05 | Hostel availability and prices with the academic year | P3 |
| Deferred programmes (nursing, public-health, physical-therapy): eligibility of foreign applicants | `programmes.<deferred id>.internationalAdmission` | 01, 03 | Whether foreign applicants are admitted to the programme, and in which language, for the stated intake | P3 |
| Recognition in a destination country | `recognition` | not requested | Not requested: decided by each country's regulator (tier 4 only); no authority is listed (N24 b) | — |

### 2.8 Vinnytsia National Pirogov Memorial Medical University (eighth, listed separately) (`vinnytsia-national-pirogov-memorial-medical-university`)

The owner's earlier first verification target (`DIRECTORY_VERIFICATION_PLAN.md` §10.2), listed separately from the SEMrush order. Register: `research/verification/vinnytsia-national-pirogov-memorial-medical-university/EVIDENCE_REGISTER.md` (rows 1–22). The record cites year-stamped 2026 admission and 2026–2027 fee documents. Record programmes: Medicine, Dentistry, Pharmacy; deferred: nursing, public health, physical therapy, physical culture and sport. No address lead exists.

**Pages to capture** (file names to use exactly; "doc" = send the original file plus an address-bar screenshot, see §3)

| No. | File name | Address (URL) | Priority | Notes |
|---|---|---|---|---|
| 22a | `vinnytsia-national-pirogov-memorial-medical-university--22--edebo-register-card.pdf` | To locate: open https://registry.edbo.gov.ua/ (register of educational entities; located via search on 2026-10-12, not opened), search the university name, capture its card | P1 |  |
| 22b | `vinnytsia-national-pirogov-memorial-medical-university--22--ministry-portal-entry.pdf` | To locate: the university's page on https://universities.studyinukraine.gov.ua/ (contacts tab) | P1 |  |
| 11 | `vinnytsia-national-pirogov-memorial-medical-university--11--about-university.pdf` | <https://foreign.vnmu.edu.ua/en/about-university/> | P1 |  |
| 20 | `vinnytsia-national-pirogov-memorial-medical-university--20--contacts.pdf` | To locate: Official contacts page with the postal address (www.vnmu.edu.ua or foreign.vnmu.edu.ua) — not surfaced by any snippet | P1 |  |
| 14 | `vinnytsia-national-pirogov-memorial-medical-university--14--orders-and-directives.pdf` | <https://www.vnmu.edu.ua/накази-та-розпорядження> | P1 |  |
| 21 | `vinnytsia-national-pirogov-memorial-medical-university--21--educational-process-order-2026-27.pdf` | To locate: The current order on the organisation of the educational process (No. 146 of 20.08.2025 or its 2026–27 successor): capture the orders list page AND the order itself | P1 | The order itself (original file if PDF) |
| 03 | `vinnytsia-national-pirogov-memorial-medical-university--03--admission-procedures-2026.pdf` (doc) | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> | P1 |  |
| 10 | `vinnytsia-national-pirogov-memorial-medical-university--10--faculties.pdf` | <https://foreign.vnmu.edu.ua/en/faculties-2/> | P1 |  |
| 17 | `vinnytsia-national-pirogov-memorial-medical-university--17--medicine-opp-2025.pdf` (doc) | <https://www.vnmu.edu.ua/downloads/pdf/OPP_%20I2%20Medicine%20(mag)_2025.pdf> | P1 |  |
| 06 | `vinnytsia-national-pirogov-memorial-medical-university--06--tuition-fee-2026-27.pdf` (doc) | <https://www.vnmu.edu.ua/downloads/other/Tuition_fee_2026-2027.pdf> | P1 |  |
| 01 | `vinnytsia-national-pirogov-memorial-medical-university--01--admission-conditions.pdf` | <https://foreign.vnmu.edu.ua/en/admission-conditions-5/> | P2 | Page dated 2022 — treat as potentially out of date; Dated 2022 in the lead: comparison; at most "out of date" for 2026/27 |
| 02 | `vinnytsia-national-pirogov-memorial-medical-university--02--admission-of-foreign-citizens.pdf` | <https://vnmu.edu.ua/admission-of-foreign-citizens> | P2 | Labelled with 2023 materials — may be outdated |
| 05 | `vinnytsia-national-pirogov-memorial-medical-university--05--document-list.pdf` (doc) | <https://www.vnmu.edu.ua/downloads/other/List_doc_obtaining.pdf> | P2 |  |
| 08 | `vinnytsia-national-pirogov-memorial-medical-university--08--preparatory-faculty.pdf` | <https://foreign.vnmu.edu.ua/en/preparatory-faculty/> | P2 |  |
| 13 | `vinnytsia-national-pirogov-memorial-medical-university--13--admissions-2026-ukrainian.pdf` | <https://www.vnmu.edu.ua/вступ-2026> | P2 |  |
| 19 | `vinnytsia-national-pirogov-memorial-medical-university--19--documents-new-site.pdf` | <https://new.vnmu.edu.ua/documents> | P2 | Look for the Dentistry and Pharmacy programme documents and any accreditation certificates |
| 95 | `vinnytsia-national-pirogov-memorial-medical-university--95--accreditation-medicine.pdf` | To locate: the NAQA accreditation decision or certificate for the programme (search the university name on naqa.gov.ua and public.naqa.gov.ua), or the certificate the university publishes; one file per programme (Medicine) | P2 |  |
| 96 | `vinnytsia-national-pirogov-memorial-medical-university--96--accreditation-dentistry.pdf` | To locate: as file 95, for Dentistry | P2 |  |
| 97 | `vinnytsia-national-pirogov-memorial-medical-university--97--accreditation-pharmacy.pdf` | To locate: as file 95, for Pharmacy | P2 |  |
| 04 | `vinnytsia-national-pirogov-memorial-medical-university--04--admission-procedures-2025.pdf` (doc) | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2025.PDF> | P3 |  |
| 07 | `vinnytsia-national-pirogov-memorial-medical-university--07--tuition-fee-2025-26.pdf` (doc) | <https://www.vnmu.edu.ua/downloads/other/Tuition%20fee_2025-2026.pdf> | P3 |  |
| 09 | `vinnytsia-national-pirogov-memorial-medical-university--09--preparatory-article.pdf` | <https://foreign.vnmu.edu.ua/?p=1556> | P3 |  |
| 15 | `vinnytsia-national-pirogov-memorial-medical-university--15--nursing-opp-2025.pdf` (doc) | <https://www.vnmu.edu.ua/downloads/pdf/OPP_medsestr_2025.pdf> | P3 |  |
| 16 | `vinnytsia-national-pirogov-memorial-medical-university--16--public-health-opp-2025-draft.pdf` (doc) | <https://www.vnmu.edu.ua/downloads/other/OPP_I9_grom-zd_2025(proekt).pdf> | P3 |  |
| 92 | `vinnytsia-national-pirogov-memorial-medical-university--92--history.pdf` | <https://vnmu.edu.ua/en/history-of-university> | P3 | located via search on 2026-10-12, not opened; not yet in the record's references |

Rows of the register not requested (out of date, out of scope or indirect only; close them as "not needed"): 12 (postgraduate route: out of scope), 18 (deferred physical-therapy page).

Pages requested: **P1 10**, P2 9, P3 6 (total 25).

**What each claim needs** (capture numbers refer to the list above, where each address is given)

| Claim | Claim path(s) | Capture(s) | Passage that must be visible | Priority |
|---|---|---|---|---|
| Official name | `officialName` | 11, 19, 22a (to locate), 22b (to locate) | Full official name exactly as printed (English and, if shown, Ukrainian), with the page heading or document title block | P1 |
| Official website, and the government (.gov.ua) page that lists exactly that website | `website` | 11, 22a (to locate), 22b (to locate) | Heading naming the university and the field giving its website, character for character (N24 c); also name, address and EDEBO code if printed | P1 |
| Address | `address` | 20 (to locate), 22a (to locate), 22b (to locate), 03 | Full postal address exactly as printed, under a heading that shows it is the university's address | P1 |
| Operating status, dated current-year (2026/27) statement, teaching format | `status`, `statusStatement`, `teachingFormat`, `programmes.<id>.format` | 21 (to locate), 14, 19 | The whole 2026/27 notice or order on how and where teaching is organised (in person, blended or distance), with its date (and number, for an order) | P1 |
| Medicine (General Medicine): open to international applicants | `programmes.medicine.internationalAdmission` | 03, 10, 01, 02, 13 | The sentence saying foreign applicants are admitted to the programme, and the intake or academic year it refers to | P1 |
| Medicine (General Medicine): level and award title | `programmes.medicine.level`, `.qualification`, `.specialtyCode` | 17, 10, 01 | Level (e.g. master's, single-cycle master's) and award title exactly as printed; specialty code if printed | P1 (level); P2 (title, code) |
| Medicine (General Medicine): teaching language | `programmes.medicine.language` | 03, 10, 01, 06 | Language(s) of instruction stated for that programme, not a general sentence about the university | P1 |
| Medicine (General Medicine): duration | `programmes.medicine.durationText`, `.durationYears` | 17, 10, 01 | Duration exactly as printed (years and months, semesters or ECTS) | P1 |
| Medicine (General Medicine): intake and academic year | `programmes.medicine.intakeYear`, `.intake` | 03, 13 | The academic year or intake the page applies to (e.g. 2026/2027) and any start date | P1 |
| Medicine (General Medicine): tuition fee schedule with academic year (the page must be read even if it turns out out of date) | `programmes.medicine.tuition`, `.otherMandatoryCosts.<n>` | 06, 07, 01 | The whole fee table: heading with academic-year label, every row and column header, currency, what each amount is charged per, payment schedule, any exchange-rate wording, other charges, footnotes, the document's own date or order number | P1 |
| Medicine (General Medicine): entry requirements | `programmes.medicine.requirements.<id>` | 03, 01 | Entrance-examination subjects, format, pass mark and scale, and any language requirement, for the stated intake | P2 |
| Medicine (General Medicine): required documents | `programmes.medicine.documents.<id>` | 05, 03 | The full numbered list of documents with their conditions (translation, legalisation, notarisation, remote route) | P2 |
| Medicine (General Medicine): application deadlines | `programmes.medicine.deadlines` | 03, 13 | Application dates with the year as printed (a committee working period is recorded as that, never as a deadline) | P2 |
| Dentistry: open to international applicants; level and title; language; duration; intake | `programmes.dentistry.internationalAdmission`, `.level`, `.qualification`, `.language`, `.durationText`, `.intakeYear` | 03, 10, 01, 19 | As for the first programme, for this programme | P2 |
| Dentistry: tuition fee schedule with academic year | `programmes.dentistry.tuition`, `.otherMandatoryCosts.<n>` | 06 | Its row(s) of the same fee table (no extra file if the table is already captured) | P2 |
| Dentistry: entry requirements, documents, deadlines | `programmes.dentistry.requirements.<id>`, `.documents.<id>`, `.deadlines` | 03, 05 | As for the first programme, for this programme | P2 |
| Pharmacy, industrial pharmacy: open to international applicants; level and title; language; duration; intake | `programmes.pharmacy.internationalAdmission`, `.level`, `.qualification`, `.language`, `.durationText`, `.intakeYear` | 03, 10, 01, 19 | As for the first programme, for this programme | P2 |
| Pharmacy, industrial pharmacy: tuition fee schedule with academic year | `programmes.pharmacy.tuition`, `.otherMandatoryCosts.<n>` | 06 | Its row(s) of the same fee table (no extra file if the table is already captured) | P2 |
| Pharmacy, industrial pharmacy: entry requirements, documents, deadlines | `programmes.pharmacy.requirements.<id>`, `.documents.<id>`, `.deadlines` | 03, 05 | As for the first programme, for this programme | P2 |
| International admissions contact | `internationalOffice` | 03, 11, 20 (to locate) | Name of the unit for foreign applicants, its e-mail, telephone and page address as printed | P2 |
| Institutional licence / registration (government register) | no claim path today (schema gap); supports `website`, `officialName`, `address` | 22a (to locate) | The register card's licence section (licence or decision number, date, scope) — institutional registration and licensing, not programme accreditation | P2 (same file as the P1 register capture) |
| Programme accreditation in Ukraine (NAQA decision or certificate) | `accreditation` | 95 (to locate), 96 (to locate), 97 (to locate), 16, 19 | Accreditation decision or certificate for the named programme: programme, level, number, date, validity — accreditation in Ukraine only, never recognition abroad | P2 |
| Preparatory department | `preparatoryRoutes.preparatory-department.*` (fee: `.fee`) | 08, 09, 06 | Language of instruction, any English track, duration, subjects, certificate name, the progression sentence verbatim, start date(s), fee with academic year, eligibility wording | P2 |
| Founding year | `founded` | 92 | Founding year as printed on the official history page or register | P3 |
| Accommodation | `accommodation` | 09 | Hostel availability and prices with the academic year | P3 |
| Deferred programmes (nursing, public-health, physical-therapy, physical-culture-sport): eligibility of foreign applicants | `programmes.<deferred id>.internationalAdmission` | 13, 15, 16 | Whether foreign applicants are admitted to the programme, and in which language, for the stated intake | P3 |
| Recognition in a destination country | `recognition` | not requested | Not requested: decided by each country's regulator (tier 4 only); no authority is listed (N24 b) | — |
---

## 3. How to capture

Every capture must let the verifier fill the entry tool's options without guessing. A capture without a visible address and date cannot support any claim and will be sent back (standard §11.3 step 3).

### 3.1 What the tools take from each capture

`site/scripts/evidence-entry.mjs` records one evidence entry per claim. For a capture it is run with `--type owner-capture` (the evidence files' access blocks say `blocked`, so the tool refuses `web-page` and `pdf` entries until a fetch test has passed). Each option comes from the capture:

| Option | Taken from | So the capture must show |
|---|---|---|
| `--url` | The address printed on the capture (the final address after any redirect) | The full address, not shortened |
| `--accessed` | The capture date printed on the capture (`YYYY-MM-DD`) | The date |
| `--capture-ref` | The file name (a name only, never a path; it should start with the slug) | — (name the file as §2 says) |
| `--org` | The publisher's own name as the page or document prints it | The site's header or footer, or the document's title block: do not crop them |
| `--effective` | The page's own date: publication, approval or order date | Any date and order number the page carries |
| `--academic-year` | The academic year the page states (written `2026/27`) | The heading or label that states the year |
| `--quote-file` | The exact passage, in its original language, copied from the capture itself (extracted text is only a finding aid) | The whole passage, untranslated |

The verifier adds the rest (tier, status, next review date, decision). `site/scripts/capture-intake.py` checks a folder of captures first: it lists each file with its size and SHA-256, extracts the text of PDFs and HTML into a temporary folder outside the repository, matches file names to the register's section A rows, and with `--find` shows where a phrase occurs (file and page). It refuses any folder inside the repository or inside any git working tree.

### 3.2 Web pages: print to PDF, one file per address

1. Open the address in an ordinary browser. If it redirects, or you navigate to the page from a list, the address that counts is the one in the address bar when you capture.
2. Before printing: **turn off automatic translation** (the passage must be in the language the university published it in); open every collapsed section or tab that holds the passage; scroll to the bottom so that everything has loaded; close cookie banners that cover text. Use landscape for wide fee tables so that no column is cut off.
3. Print with the browser's header and footer switched on, so the date and the address are printed on every page:
   - **Chrome or Edge:** Ctrl+P (Cmd+P on a Mac) → Destination "Save as PDF" → More settings → tick "Headers and footers" → Save.
   - **Firefox:** Ctrl+P → Destination "Save to PDF" → tick "Print headers and footers" → Save.
   - **Safari:** File → Print → tick "Print headers and footers" → PDF → Save as PDF. ("Export as PDF" leaves the header out.)
4. Open the saved PDF and check: the date is in the header and the full address is in the footer. If the browser shortens a long address with "…", also save a screenshot of the browser window showing the full address in the address bar (click into it) and your computer's date, named like the PDF with `-address.png` at the end.

### 3.3 Documents (PDF, DOC, DOCX): send the original file

Download the original file and send it **unchanged**: do not print it, re-save it or convert it. Because a downloaded file shows neither its address nor the date you fetched it, add a screenshot of the browser with the document open (or the page with its download link), showing the full address in the address bar and your computer's date, named like the file with `-address.png` at the end. The original proves the content; the screenshot proves where and when it came from. The tables mark these rows "(doc)".

### 3.4 File names, dates and the manifest

- **Names:** exactly as in §2: `<slug>--NN--short-name.<ext>`, lower case, hyphens, no spaces, `NN` two digits. Where a note asks for several files on one row, add the suffix it gives (for example `bukovinian-state-medical-university--22--teaching-format-2026-27-list.pdf` and `…-notice.pdf`). Screenshots: the same name plus `-address.png`.
- **Date of capture:** the date the browser prints is the capture date, recorded as `accessed`. Capture each university's P1 pages on the same day if you can, and capture a fee table together with the heading that states its academic year, in one file.
- **Do not edit captures:** no highlighting, cropping, merging or notes on the file. If you want to point at a passage, write it in the manifest.
- **Manifest:** in each university's folder, a plain text file `MANIFEST.txt` with one line per file: `file name | full address copied from the address bar | YYYY-MM-DD HH:MM and time zone | captured / NOT FOUND / SILENT / moved to <new address> | note`. It is a cross-check only: the address and date printed on the capture are what count. The intake tool lists it under "Files not matched to a row"; that is expected.

### 3.5 Where to put the files (the repository is public)

The repository was confirmed public on 2026-10-11, so captures stay **outside it** (`research/verification/README.md`; standard §2). The registers and evidence files record only file names.

- Make one parent folder (for example `UMA-captures-2026-10`) with one sub-folder per university, named by its slug (for example `bukovinian-state-medical-university`). Keep it on your own computer or a private shared drive.
- Send the folder to the verifier privately (or attach it to the Claude Code session). **Never** commit captures to the repository, attach them to a GitHub issue, pull request or discussion (all public), or share them through a public link.
- The verifier copies each sub-folder into a plain folder outside any git working tree, for example `~/uma-captures/<slug>/`.

### 3.6 What the verifier does with them

1. For the four records without a register: add the "to locate" rows and generate the registers (§2, "How to read the tables").
2. From the repository root: `python3 -I site/scripts/capture-intake.py ~/uma-captures/<slug> <slug>` (add `--find "<words from the page>"` to locate a passage).
3. Open each capture and check that the address and the date are visible. If not, ask for a new capture.
4. Record the government page first (`website`, tier 3, value exactly as printed); without it no other entry for that university can be shown (N24 c).
5. From `site/`: `node scripts/evidence-entry.mjs --slug <slug> --path <claimPath> --value '<JSON>' --statement "<claim in plain words>" --url "<address on the capture>" --org "<publisher as printed>" --tier <n> --type owner-capture --capture-ref <file name> --quote-file <file outside the repository holding the exact passage> --accessed <capture date> --academic-year <YYYY/YY> --effective <page date> --next-review <date> --status <status> --reviewer "verifier (Claude)" --method "read from owner capture <file name>, captured <date> in a browser session" --decision <publish|withhold> [--withhold-reason "<why>"]`. Read the dry run; then `--write`, and `--apply-to-record` only for an entry that is verified with the decision "publish" and that the dry run says WOULD BE SHOWN (standard §15.1).
6. Regenerate the register (`python3 -I site/scripts/make-evidence-register.py <slug>`), run `npm run test:records` and `npm test` from `site/`, and log the session in `SOURCE_VERIFICATION_REGISTER.md`.

---

## 4. Evidence register (status today)

**Every row in this section is NOT ACCESSED.** No official page has been opened from this environment, so for every claim there is no supporting passage, the source's publication or update date is unknown, and there is no date accessed. Every evidence file in `site/data/evidence/` still holds `"entries": []`. Nothing below is a fact about any university.

**How to read the columns.**

- **Claim path** is the `claimPath` an evidence entry will use (standard §3). Where the record holds a requirement or document item, its id is used; `<id>` means none is recorded yet.
- **Kind** separates the three things that must never be conflated: **institutional licence / registration** (the government register card; the record has no claim path for it today — a schema gap for the owner), **programme accreditation in Ukraine** (a NAQA decision or the accreditation certificate; recorded under `accreditation`, naming the programme, until the record has programme-level accreditation paths), and **professional recognition in a destination country** (that country's regulator, tier 4 only; not requested).
- **Required tier** follows standard §7: recognition 4 only, accreditation 1–3, fees 1–2 only (policy); the other tiers are proposals awaiting the owner (§13 item 16). `website` needs both its own page (tier 1) and the government listing (tier 3, N24 c).
- **Candidate URL** is the first-choice page; "also" lists the other captures of the same university in §2, where each address is given.

### 4.1 Bukovinian State Medical University

| Claim path | Kind | Required tier | Candidate URL (first choice; other capture nos.) | Supporting passage | Publication / update date | Date accessed | Status |
|---|---|---|---|---|---|---|---|
| `officialName` | identity | 1, 2, 3 | <https://www.bsmu.edu.ua/en/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `website` | identity — own site | 1 | <https://www.bsmu.edu.ua/en/> (also 23a, 23b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `website` | identity — government listing (N24 c) | 3 (.gov.ua page listing the same website) | to locate — file 23a (also 23b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `address` | identity | 1, 3 | to locate — file 19 (also 23a, 23b, 02) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `internationalOffice` | contact | 1, 3 | <https://www.bsmu.edu.ua/en/faq> (also 19) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `status` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 22 (also 12, 13) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `statusStatement` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 22 (also 12, 13) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `teachingFormat` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 22 (also 12, 13) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `(no claim path — schema gap)` | **institutional licence / registration** (government register) | 3 (government register) | to locate — file 23a | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `accreditation` | **programme accreditation in Ukraine** (NAQA decision or certificate; never recognition) | 1, 2, 3 (NAQA register or certificate preferred) | to locate — file 95 (also 96, 97, 12) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `recognition` | **professional recognition in a destination country** (that country's regulator) | 4 only | not requested: no recognition authority is listed (N24 b); a WDOMS listing is a directory entry, not recognition | none | unknown | none | not requested |
| `founded` | identity | 1, 3 | <https://www.bsmu.edu.ua/en/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `accommodation` | student costs | 1, 2 | none referenced (to locate) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.internationalAdmission` | programme eligibility | 1, 2 | to locate — file 21 (also 06, 07, 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.level` | programme | 1, 2 | to locate — file 20 (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.specialtyCode` | programme | 1, 2 (3 for the code) | to locate — file 20 (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.qualification` | programme (award title as printed) | 1, 2 | to locate — file 20 (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.durationText / .durationYears` | programme | 1, 2 | to locate — file 20 (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.language` | programme | 1, 2 | to locate — file 21 (also 07, 20, 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 22 (also 12, 13) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.intakeYear` | intake (time-sensitive) | 1, 2 | to locate — file 21 (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.intake` | intake dates (time-sensitive) | 1, 2 | to locate — file 21 (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.tuition` | fee (time-sensitive) | 1, 2 only | <https://www.bsmu.edu.ua/en/admission/tuition-fees/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | <https://www.bsmu.edu.ua/en/admission/tuition-fees/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.deadlines` | dates (time-sensitive) | 1, 2 | to locate — file 21 (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.requirements.english-exam` | requirement (time-sensitive) | 1, 2 (3 for a national rule) | <https://vstup.bsmu.edu.ua/wp-content/uploads/2026/06/english_program_2026.pdf> (also 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.documents.language-of-documents` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.bsmu.edu.ua/en/faq> (also 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.internationalAdmission` | programme eligibility | 1, 2 | to locate — file 21 (also 06, 07, 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.level` | programme | 1, 2 | to locate — file 20 (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.specialtyCode` | programme | 1, 2 (3 for the code) | to locate — file 20 (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.qualification` | programme (award title as printed) | 1, 2 | to locate — file 20 (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.durationText / .durationYears` | programme | 1, 2 | to locate — file 20 (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.language` | programme | 1, 2 | to locate — file 21 (also 07, 20, 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 22 (also 12, 13) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.intakeYear` | intake (time-sensitive) | 1, 2 | to locate — file 21 (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.intake` | intake dates (time-sensitive) | 1, 2 | to locate — file 21 (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.tuition` | fee (time-sensitive) | 1, 2 only | <https://www.bsmu.edu.ua/en/admission/tuition-fees/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | <https://www.bsmu.edu.ua/en/admission/tuition-fees/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.deadlines` | dates (time-sensitive) | 1, 2 | to locate — file 21 (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.requirements.english-exam` | requirement (time-sensitive) | 1, 2 (3 for a national rule) | <https://vstup.bsmu.edu.ua/wp-content/uploads/2026/06/english_program_2026.pdf> (also 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.documents.<id>` | document (none recorded yet) | 1, 2 (3 for a national rule) | <https://www.bsmu.edu.ua/en/faq> (also 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.internationalAdmission` | programme eligibility | 1, 2 | to locate — file 21 (also 06, 07, 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.level` | programme | 1, 2 | to locate — file 20 (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.specialtyCode` | programme | 1, 2 (3 for the code) | to locate — file 20 (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.qualification` | programme (award title as printed) | 1, 2 | to locate — file 20 (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.durationText / .durationYears` | programme | 1, 2 | to locate — file 20 (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.language` | programme | 1, 2 | to locate — file 21 (also 07, 20, 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 22 (also 12, 13) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.intakeYear` | intake (time-sensitive) | 1, 2 | to locate — file 21 (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.intake` | intake dates (time-sensitive) | 1, 2 | to locate — file 21 (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.tuition` | fee (time-sensitive) | 1, 2 only | <https://www.bsmu.edu.ua/en/admission/tuition-fees/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | <https://www.bsmu.edu.ua/en/admission/tuition-fees/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.deadlines` | dates (time-sensitive) | 1, 2 | to locate — file 21 (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.requirements.english-exam` | requirement (time-sensitive) | 1, 2 (3 for a national rule) | <https://vstup.bsmu.edu.ua/wp-content/uploads/2026/06/english_program_2026.pdf> (also 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.documents.<id>` | document (none recorded yet) | 1, 2 (3 for a national rule) | <https://www.bsmu.edu.ua/en/faq> (also 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.nursing.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://www.bsmu.edu.ua/wp-content/uploads/2025/05/op_fizichna-terapiya-na-sajt.doc> (also 09) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.physical-therapy.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://www.bsmu.edu.ua/wp-content/uploads/2025/05/op_fizichna-terapiya-na-sajt.doc> (also 09) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-course.languageOfInstruction` | preparatory route | 1, 2 | <https://www.bsmu.edu.ua/en/admission/preparatory-course> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-course.englishTrack` | preparatory route | 1, 2 | <https://www.bsmu.edu.ua/en/admission/preparatory-course> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-course.durationText` | preparatory route | 1, 2 | <https://www.bsmu.edu.ua/en/admission/preparatory-course> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-course.subjects` | preparatory route | 1, 2 | <https://www.bsmu.edu.ua/en/admission/preparatory-course> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-course.certificateName` | preparatory route | 1, 2 | <https://www.bsmu.edu.ua/en/admission/preparatory-course> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-course.progressionText` | preparatory route | 1, 2 | <https://www.bsmu.edu.ua/en/admission/preparatory-course> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-course.appliesToEnglishDegreeTrack` | preparatory route | 1, 2 | <https://www.bsmu.edu.ua/en/admission/preparatory-course> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-course.eligibilityText` | preparatory route | 1, 2 | <https://www.bsmu.edu.ua/en/admission/preparatory-course> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-course.startDate` | preparatory route (time-sensitive) | 1, 2 | <https://www.bsmu.edu.ua/en/admission/preparatory-course> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-course.fee` | preparatory fee (time-sensitive) | 1, 2 only | <https://www.bsmu.edu.ua/en/admission/preparatory-course> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |

### 4.2 Odesa National Medical University

| Claim path | Kind | Required tier | Candidate URL (first choice; other capture nos.) | Supporting passage | Publication / update date | Date accessed | Status |
|---|---|---|---|---|---|---|---|
| `officialName` | identity | 1, 2, 3 | <https://onmedu.edu.ua/about-univercity/important-information-university/?lang=en> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `website` | identity — own site | 1 | <https://onmedu.edu.ua/about-univercity/important-information-university/?lang=en> (also 24a, 24b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `website` | identity — government listing (N24 c) | 3 (.gov.ua page listing the same website) | to locate — file 24a (also 24b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `address` | identity | 1, 3 | <https://onmedu.edu.ua/information-foreign-citizens/requirements-admission-commission/?lang=en> (also 20, 24a, 24b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `internationalOffice` | contact | 1, 3 | <https://onmedu.edu.ua/information-foreign-citizens/international-faculty/?lang=en> (also 02, 20) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `status` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 22 (also 19, 18) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `statusStatement` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 22 (also 19, 18) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `teachingFormat` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 22 (also 19, 18) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `(no claim path — schema gap)` | **institutional licence / registration** (government register) | 3 (government register) | to locate — file 24a | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `accreditation` | **programme accreditation in Ukraine** (NAQA decision or certificate; never recognition) | 1, 2, 3 (NAQA register or certificate preferred) | to locate — file 95 (also 96, 97, 14) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `recognition` | **professional recognition in a destination country** (that country's regulator) | 4 only | not requested: no recognition authority is listed (N24 b); a WDOMS listing is a directory entry, not recognition | none | unknown | none | not requested |
| `founded` | identity | 1, 3 | <https://onmedu.edu.ua/about-univercity/important-information-university/?lang=en> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `accommodation` | student costs | 1, 2 | none referenced (to locate) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.internationalAdmission` | programme eligibility | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/?lang=en> (also 07, 03, 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.level` | programme | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/master-s-degree/?lang=en> (also 10, 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.specialtyCode` | programme | 1, 2 (3 for the code) | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/master-s-degree/?lang=en> (also 10, 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.qualification` | programme (award title as printed) | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/master-s-degree/?lang=en> (also 10, 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.durationText / .durationYears` | programme | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/master-s-degree/?lang=en> (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.language` | programme | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/fees/?lang=en> (also 06, 07) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 22 (also 19, 18) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.intakeYear` | intake (time-sensitive) | 1, 2 | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.intake` | intake dates (time-sensitive) | 1, 2 | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.tuition` | fee (time-sensitive) | 1, 2 only | <https://onmedu.edu.ua/information-foreign-citizens/fees/?lang=en> (also 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | <https://onmedu.edu.ua/information-foreign-citizens/fees/?lang=en> (also 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.deadlines` | dates (time-sensitive) | 1, 2 | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.requirements.entrance-exams` | requirement (time-sensitive) | 1, 2 (3 for a national rule) | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> (also 12) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.documents.education-documents` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.documents.recognition` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.internationalAdmission` | programme eligibility | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/?lang=en> (also 07, 03, 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.level` | programme | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/master-s-degree/?lang=en> (also 10, 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.specialtyCode` | programme | 1, 2 (3 for the code) | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/master-s-degree/?lang=en> (also 10, 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.qualification` | programme (award title as printed) | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/master-s-degree/?lang=en> (also 10, 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.durationText / .durationYears` | programme | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/master-s-degree/?lang=en> (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.language` | programme | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/fees/?lang=en> (also 06, 07) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 22 (also 19, 18) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.intakeYear` | intake (time-sensitive) | 1, 2 | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.intake` | intake dates (time-sensitive) | 1, 2 | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.tuition` | fee (time-sensitive) | 1, 2 only | <https://onmedu.edu.ua/information-foreign-citizens/fees/?lang=en> (also 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | <https://onmedu.edu.ua/information-foreign-citizens/fees/?lang=en> (also 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.deadlines` | dates (time-sensitive) | 1, 2 | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.requirements.entrance-exams` | requirement (time-sensitive) | 1, 2 (3 for a national rule) | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> (also 12) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.documents.<id>` | document (none recorded yet) | 1, 2 (3 for a national rule) | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.internationalAdmission` | programme eligibility | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/?lang=en> (also 07, 03, 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.level` | programme | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/master-s-degree/?lang=en> (also 10, 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.specialtyCode` | programme | 1, 2 (3 for the code) | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/master-s-degree/?lang=en> (also 10, 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.qualification` | programme (award title as printed) | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/master-s-degree/?lang=en> (also 10, 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.durationText / .durationYears` | programme | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/osvitni-programi/master-s-degree/?lang=en> (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.language` | programme | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/fees/?lang=en> (also 06, 07) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 22 (also 19, 18) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.intakeYear` | intake (time-sensitive) | 1, 2 | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.intake` | intake dates (time-sensitive) | 1, 2 | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.tuition` | fee (time-sensitive) | 1, 2 only | <https://onmedu.edu.ua/information-foreign-citizens/fees/?lang=en> (also 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | <https://onmedu.edu.ua/information-foreign-citizens/fees/?lang=en> (also 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.deadlines` | dates (time-sensitive) | 1, 2 | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.requirements.entrance-exams` | requirement (time-sensitive) | 1, 2 (3 for a national rule) | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> (also 12) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.documents.<id>` | document (none recorded yet) | 1, 2 (3 for a national rule) | <https://onmedu.edu.ua/wp-content/uploads/2026/05/INFORMATION-ON-ADMISSION-TO-ONMEDU.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.nursing.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://onmedu.edu.ua/osvita/osvitni-programi/os-bakalavr/> (also 14, 10, 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.public-health.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://onmedu.edu.ua/osvita/osvitni-programi/os-bakalavr/> (also 14, 10, 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.therapy-rehabilitation.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://onmedu.edu.ua/osvita/osvitni-programi/os-bakalavr/> (also 14, 10, 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.languageOfInstruction` | preparatory route | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/language-training-cours/?lang=en> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.englishTrack` | preparatory route | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/language-training-cours/?lang=en> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.durationText` | preparatory route | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/language-training-cours/?lang=en> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.subjects` | preparatory route | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/language-training-cours/?lang=en> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.certificateName` | preparatory route | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/language-training-cours/?lang=en> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.progressionText` | preparatory route | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/language-training-cours/?lang=en> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.appliesToEnglishDegreeTrack` | preparatory route | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/language-training-cours/?lang=en> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.eligibilityText` | preparatory route | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/language-training-cours/?lang=en> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.startDate` | preparatory route (time-sensitive) | 1, 2 | <https://onmedu.edu.ua/information-foreign-citizens/language-training-cours/?lang=en> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.fee` | preparatory fee (time-sensitive) | 1, 2 only | <https://onmedu.edu.ua/information-foreign-citizens/fees/?lang=en> (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |

### 4.3 Kharkiv National Medical University

| Claim path | Kind | Required tier | Candidate URL (first choice; other capture nos.) | Supporting passage | Publication / update date | Date accessed | Status |
|---|---|---|---|---|---|---|---|
| `officialName` | identity | 1, 2, 3 | <https://knmu.edu.ua/en/about-2/universytet-sogodni/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `website` | identity — own site | 1 | <https://knmu.edu.ua/en/about-2/universytet-sogodni/> (also 28a, 28b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `website` | identity — government listing (N24 c) | 3 (.gov.ua page listing the same website) | to locate — file 28a (also 28b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `address` | identity | 1, 3 | <https://knmu.edu.ua/en/kontakty-ta-informacziya-dlya-inozemnyh-vstupnykiv> (also 28a, 28b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `internationalOffice` | contact | 1, 3 | <https://knmu.edu.ua/en/kontakty-ta-informacziya-dlya-inozemnyh-vstupnykiv> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `status` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 22 (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `statusStatement` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 22 (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `teachingFormat` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 22 (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `(no claim path — schema gap)` | **institutional licence / registration** (government register) | 3 (government register) | to locate — file 28a | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `accreditation` | **programme accreditation in Ukraine** (NAQA decision or certificate; never recognition) | 1, 2, 3 (NAQA register or certificate preferred) | to locate — file 95 (also 17) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `recognition` | **professional recognition in a destination country** (that country's regulator) | 4 only | not requested: no recognition authority is listed (N24 b); a WDOMS listing is a directory entry, not recognition | none | unknown | none | not requested |
| `founded` | identity | 1, 3 | <https://knmu.edu.ua/en/about-2/universytet-sogodni/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `accommodation` | student costs | 1, 2 | to locate — file 27 (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.internationalAdmission` | programme eligibility | 1, 2 | to locate — file 23 (also 01, 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.level` | programme | 1, 2 | <https://knmu.edu.ua/en/program-catalog/medicine-master-2024/> (also 11, 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.specialtyCode` | programme | 1, 2 (3 for the code) | <https://knmu.edu.ua/en/program-catalog/medicine-master-2024/> (also 11, 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.qualification` | programme (award title as printed) | 1, 2 | <https://knmu.edu.ua/en/program-catalog/medicine-master-2024/> (also 11, 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.durationText / .durationYears` | programme | 1, 2 | <https://knmu.edu.ua/wp-content/uploads/2026/02/psp_med24_25.pdf> (also 03, 09) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.language` | programme | 1, 2 | <https://knmu.edu.ua/en/faculty/vi-fakultet-z-pidgotovky-inozemnyh-studentiv-navchalno-naukovogo-instytutu-z-pidgotovky-inozemnyh-gromadyan> (also 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 22 (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.intakeYear` | intake (time-sensitive) | 1, 2 | to locate — file 23 (also 01, 25) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.intake` | intake dates (time-sensitive) | 1, 2 | to locate — file 23 (also 01, 25) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.tuition` | fee (time-sensitive) | 1, 2 only | to locate — file 24 | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | to locate — file 24 | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.deadlines` | dates (time-sensitive) | 1, 2 | to locate — file 25 (also 23) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.requirements.entrance-exams` | requirement (time-sensitive) | 1, 2 (3 for a national rule) | to locate — file 23 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.documents.<id>` | document (none recorded yet) | 1, 2 (3 for a national rule) | to locate — file 26 (also 23) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://knmu.edu.ua/wp-content/uploads/2026/04/epp_st24_25.pdf> (also 14, 17, 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.nursing-bachelor.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://knmu.edu.ua/wp-content/uploads/2026/04/epp_st24_25.pdf> (also 14, 17, 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.nursing-master.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://knmu.edu.ua/wp-content/uploads/2026/04/epp_st24_25.pdf> (also 14, 17, 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.public-health.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://knmu.edu.ua/wp-content/uploads/2026/04/epp_st24_25.pdf> (also 14, 17, 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.physical-therapy.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://knmu.edu.ua/wp-content/uploads/2026/04/epp_st24_25.pdf> (also 14, 17, 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.languageOfInstruction` | preparatory route | 1, 2 | <https://knmu.edu.ua/en/navchalno-naukovyj-instytut-z-pidgotovky-inozemnyh-gromadyan-hnmu/pidgotovche-viddilennya/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.englishTrack` | preparatory route | 1, 2 | <https://knmu.edu.ua/en/navchalno-naukovyj-instytut-z-pidgotovky-inozemnyh-gromadyan-hnmu/pidgotovche-viddilennya/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.durationText` | preparatory route | 1, 2 | <https://knmu.edu.ua/en/navchalno-naukovyj-instytut-z-pidgotovky-inozemnyh-gromadyan-hnmu/pidgotovche-viddilennya/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.subjects` | preparatory route | 1, 2 | <https://knmu.edu.ua/en/navchalno-naukovyj-instytut-z-pidgotovky-inozemnyh-gromadyan-hnmu/pidgotovche-viddilennya/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.certificateName` | preparatory route | 1, 2 | <https://knmu.edu.ua/en/navchalno-naukovyj-instytut-z-pidgotovky-inozemnyh-gromadyan-hnmu/pidgotovche-viddilennya/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.progressionText` | preparatory route | 1, 2 | <https://knmu.edu.ua/en/navchalno-naukovyj-instytut-z-pidgotovky-inozemnyh-gromadyan-hnmu/pidgotovche-viddilennya/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.appliesToEnglishDegreeTrack` | preparatory route | 1, 2 | <https://knmu.edu.ua/en/navchalno-naukovyj-instytut-z-pidgotovky-inozemnyh-gromadyan-hnmu/pidgotovche-viddilennya/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.eligibilityText` | preparatory route | 1, 2 | <https://knmu.edu.ua/en/navchalno-naukovyj-instytut-z-pidgotovky-inozemnyh-gromadyan-hnmu/pidgotovche-viddilennya/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.startDate` | preparatory route (time-sensitive) | 1, 2 | <https://knmu.edu.ua/en/navchalno-naukovyj-instytut-z-pidgotovky-inozemnyh-gromadyan-hnmu/pidgotovche-viddilennya/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.fee` | preparatory fee (time-sensitive) | 1, 2 only | <https://knmu.edu.ua/en/navchalno-naukovyj-instytut-z-pidgotovky-inozemnyh-gromadyan-hnmu/pidgotovche-viddilennya/> (also 24) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |

### 4.4 Bogomolets National Medical University

| Claim path | Kind | Required tier | Candidate URL (first choice; other capture nos.) | Supporting passage | Publication / update date | Date accessed | Status |
|---|---|---|---|---|---|---|---|
| `officialName` | identity | 1, 2, 3 | <https://nmuofficial.com/en/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `website` | identity — own site | 1 | <https://nmuofficial.com/en/> (also 11a, 11b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `website` | identity — government listing (N24 c) | 3 (.gov.ua page listing the same website) | to locate — file 11a (also 11b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `address` | identity | 1, 3 | to locate — file 10 (also 05, 11a, 11b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `internationalOffice` | contact | 1, 3 | <https://nmuofficial.com/en/?p=8085> (also 10, 03, 02) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `status` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 13 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `statusStatement` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 13 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `teachingFormat` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 13 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `(no claim path — schema gap)` | **institutional licence / registration** (government register) | 3 (government register) | to locate — file 11a | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `accreditation` | **programme accreditation in Ukraine** (NAQA decision or certificate; never recognition) | 1, 2, 3 (NAQA register or certificate preferred) | to locate — file 95 (also 96, 97, 04, 14) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `recognition` | **professional recognition in a destination country** (that country's regulator) | 4 only | not requested: no recognition authority is listed (N24 b); a WDOMS listing is a directory entry, not recognition | none | unknown | none | not requested |
| `founded` | identity | 1, 3 | <https://nmuofficial.com/en/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `accommodation` | student costs | 1, 2 | none referenced (to locate) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.internationalAdmission` | programme eligibility | 1, 2 | <https://nmuofficial.com/en/?p=73670> (also 02) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.level` | programme | 1, 2 | <https://nmuofficial.com/en/?p=73670> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.specialtyCode` | programme | 1, 2 (3 for the code) | <https://nmuofficial.com/en/?p=73670> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.qualification` | programme (award title as printed) | 1, 2 | <https://nmuofficial.com/en/?p=73670> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.durationText / .durationYears` | programme | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.language` | programme | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 13 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.intakeYear` | intake (time-sensitive) | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.intake` | intake dates (time-sensitive) | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.tuition` | fee (time-sensitive) | 1, 2 only | <https://nmuofficial.com/en/?p=73670> (also 12) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | <https://nmuofficial.com/en/?p=73670> (also 12) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.deadlines` | dates (time-sensitive) | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.requirements.oral-exams` | requirement (time-sensitive) | 1, 2 (3 for a national rule) | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.documents.<id>` | document (none recorded yet) | 1, 2 (3 for a national rule) | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.internationalAdmission` | programme eligibility | 1, 2 | <https://nmuofficial.com/en/?p=73670> (also 02) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.level` | programme | 1, 2 | <https://nmuofficial.com/en/?p=73670> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.specialtyCode` | programme | 1, 2 (3 for the code) | <https://nmuofficial.com/en/?p=73670> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.qualification` | programme (award title as printed) | 1, 2 | <https://nmuofficial.com/en/?p=73670> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.durationText / .durationYears` | programme | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.language` | programme | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 13 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.intakeYear` | intake (time-sensitive) | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.intake` | intake dates (time-sensitive) | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.tuition` | fee (time-sensitive) | 1, 2 only | <https://nmuofficial.com/en/?p=73670> (also 12) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | <https://nmuofficial.com/en/?p=73670> (also 12) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.deadlines` | dates (time-sensitive) | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.requirements.oral-exams` | requirement (time-sensitive) | 1, 2 (3 for a national rule) | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.documents.<id>` | document (none recorded yet) | 1, 2 (3 for a national rule) | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.internationalAdmission` | programme eligibility | 1, 2 | <https://nmuofficial.com/en/?p=73670> (also 02) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.level` | programme | 1, 2 | <https://nmuofficial.com/en/?p=73670> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.specialtyCode` | programme | 1, 2 (3 for the code) | <https://nmuofficial.com/en/?p=73670> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.qualification` | programme (award title as printed) | 1, 2 | <https://nmuofficial.com/en/?p=73670> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.durationText / .durationYears` | programme | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.language` | programme | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 13 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.intakeYear` | intake (time-sensitive) | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.intake` | intake dates (time-sensitive) | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.tuition` | fee (time-sensitive) | 1, 2 only | <https://nmuofficial.com/en/?p=73670> (also 12) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | <https://nmuofficial.com/en/?p=73670> (also 12) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.deadlines` | dates (time-sensitive) | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.requirements.oral-exams` | requirement (time-sensitive) | 1, 2 (3 for a national rule) | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.documents.<id>` | document (none recorded yet) | 1, 2 (3 for a national rule) | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.public-health.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.physical-therapy.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.languageOfInstruction` | preparatory route | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.englishTrack` | preparatory route | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.durationText` | preparatory route | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.subjects` | preparatory route | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.certificateName` | preparatory route | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.progressionText` | preparatory route | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.appliesToEnglishDegreeTrack` | preparatory route | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.eligibilityText` | preparatory route | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.startDate` | preparatory route (time-sensitive) | 1, 2 | <https://nmuofficial.com/en/?p=73670> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.fee` | preparatory fee (time-sensitive) | 1, 2 only | <https://nmuofficial.com/en/?p=73670> (also 12) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |

### 4.5 Ivano-Frankivsk National Medical University

| Claim path | Kind | Required tier | Candidate URL (first choice; other capture nos.) | Supporting passage | Publication / update date | Date accessed | Status |
|---|---|---|---|---|---|---|---|
| `officialName` | identity | 1, 2, 3 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> (also 21) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `website` | identity — own site | 1 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> (also 24a, 24b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `website` | identity — government listing (N24 c) | 3 (.gov.ua page listing the same website) | to locate — file 24a (also 24b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `address` | identity | 1, 3 | <https://www.ifnmu.edu.ua/admission-committee/contact-information-admissions-commission-ifnmu/> (also 24a, 24b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `internationalOffice` | contact | 1, 3 | <https://www.ifnmu.edu.ua/admission-committee/contact-information-admissions-commission-ifnmu/> (also 08) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `status` | operating status (dated, current year) | 1, 2, 3 (dated) | <https://www.ifnmu.edu.ua/2026/09/01/navchannia-bez-kordoniv-inozemni-studenty-medyky-rozpochynaiut-novyy-navchalnyy-rik/> (also 19) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `statusStatement` | operating status (dated, current year) | 1, 2, 3 (dated) | <https://www.ifnmu.edu.ua/2026/09/01/navchannia-bez-kordoniv-inozemni-studenty-medyky-rozpochynaiut-novyy-navchalnyy-rik/> (also 19) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `teachingFormat` | operating status (dated, current year) | 1, 2, 3 (dated) | <https://www.ifnmu.edu.ua/2026/09/01/navchannia-bez-kordoniv-inozemni-studenty-medyky-rozpochynaiut-novyy-navchalnyy-rik/> (also 19) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `(no claim path — schema gap)` | **institutional licence / registration** (government register) | 3 (government register) | to locate — file 24a | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `accreditation` | **programme accreditation in Ukraine** (NAQA decision or certificate; never recognition) | 1, 2, 3 (NAQA register or certificate preferred) | to locate — file 95 (also 96, 97) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `recognition` | **professional recognition in a destination country** (that country's regulator) | 4 only | not requested: no recognition authority is listed (N24 b); a WDOMS listing is a directory entry, not recognition | none | unknown | none | not requested |
| `founded` | identity | 1, 3 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `accommodation` | student costs | 1, 2 | none referenced (to locate) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.internationalAdmission` | programme eligibility | 1, 2 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> (also 02, 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.level` | programme | 1, 2 | <https://www.ifnmu.edu.ua/wp-content/uploads/2025/06/7_Professional-Education-Program-І2-Medicine-2025-edition-2020-07.pdf> (also 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.specialtyCode` | programme | 1, 2 (3 for the code) | <https://www.ifnmu.edu.ua/wp-content/uploads/2025/06/7_Professional-Education-Program-І2-Medicine-2025-edition-2020-07.pdf> (also 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.qualification` | programme (award title as printed) | 1, 2 | <https://www.ifnmu.edu.ua/wp-content/uploads/2025/06/7_Professional-Education-Program-І2-Medicine-2025-edition-2020-07.pdf> (also 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.durationText / .durationYears` | programme | 1, 2 | <https://www.ifnmu.edu.ua/wp-content/uploads/2025/06/7_Professional-Education-Program-І2-Medicine-2025-edition-2020-07.pdf> (also 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.language` | programme | 1, 2 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> (also 02, 12) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.format` | teaching delivery (dated) | 1, 2, 3 (dated) | <https://www.ifnmu.edu.ua/2026/09/01/navchannia-bez-kordoniv-inozemni-studenty-medyky-rozpochynaiut-novyy-navchalnyy-rik/> (also 19) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.intakeYear` | intake (time-sensitive) | 1, 2 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> (also 02) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.intake` | intake dates (time-sensitive) | 1, 2 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> (also 02) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.tuition` | fee (time-sensitive) | 1, 2 only | to locate — file 23 (also 05, 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | to locate — file 23 (also 05, 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.deadlines` | dates (time-sensitive) | 1, 2 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> (also 02) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.requirements.oral-exam` | requirement (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.ifnmu.edu.ua/admissions-committee-2026/rules-for-admission-to-higher-education-at-ivano-frankovsk-national-medical-university-in-2026/> (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.documents.<id>` | document (none recorded yet) | 1, 2 (3 for a national rule) | <https://www.ifnmu.edu.ua/admissions-committee-2026/rules-for-admission-to-higher-education-at-ivano-frankovsk-national-medical-university-in-2026/> (also 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.internationalAdmission` | programme eligibility | 1, 2 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> (also 02) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.level` | programme | 1, 2 | <https://www.ifnmu.edu.ua/wp-content/uploads/2024/08/Educational-professional-program-Stomatology-2023-edition-2020-04.pdf> (also 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.specialtyCode` | programme | 1, 2 (3 for the code) | <https://www.ifnmu.edu.ua/wp-content/uploads/2024/08/Educational-professional-program-Stomatology-2023-edition-2020-04.pdf> (also 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.qualification` | programme (award title as printed) | 1, 2 | <https://www.ifnmu.edu.ua/wp-content/uploads/2024/08/Educational-professional-program-Stomatology-2023-edition-2020-04.pdf> (also 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.durationText / .durationYears` | programme | 1, 2 | <https://www.ifnmu.edu.ua/wp-content/uploads/2024/08/Educational-professional-program-Stomatology-2023-edition-2020-04.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.language` | programme | 1, 2 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.format` | teaching delivery (dated) | 1, 2, 3 (dated) | <https://www.ifnmu.edu.ua/2026/09/01/navchannia-bez-kordoniv-inozemni-studenty-medyky-rozpochynaiut-novyy-navchalnyy-rik/> (also 19) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.intakeYear` | intake (time-sensitive) | 1, 2 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.intake` | intake dates (time-sensitive) | 1, 2 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.tuition` | fee (time-sensitive) | 1, 2 only | to locate — file 23 (also 05, 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | to locate — file 23 (also 05, 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.deadlines` | dates (time-sensitive) | 1, 2 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.requirements.oral-exam` | requirement (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.ifnmu.edu.ua/admissions-committee-2026/rules-for-admission-to-higher-education-at-ivano-frankovsk-national-medical-university-in-2026/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.documents.<id>` | document (none recorded yet) | 1, 2 (3 for a national rule) | <https://www.ifnmu.edu.ua/admissions-committee-2026/rules-for-admission-to-higher-education-at-ivano-frankovsk-national-medical-university-in-2026/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.internationalAdmission` | programme eligibility | 1, 2 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> (also 02) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.level` | programme | 1, 2 | <https://www.ifnmu.edu.ua/wp-content/uploads/2026/04/09_EPP_-Master_Pharmacy_industrial_pharmacy_2020_09_25.pdf> (also 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.specialtyCode` | programme | 1, 2 (3 for the code) | <https://www.ifnmu.edu.ua/wp-content/uploads/2026/04/09_EPP_-Master_Pharmacy_industrial_pharmacy_2020_09_25.pdf> (also 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.qualification` | programme (award title as printed) | 1, 2 | <https://www.ifnmu.edu.ua/wp-content/uploads/2026/04/09_EPP_-Master_Pharmacy_industrial_pharmacy_2020_09_25.pdf> (also 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.durationText / .durationYears` | programme | 1, 2 | <https://www.ifnmu.edu.ua/wp-content/uploads/2026/04/09_EPP_-Master_Pharmacy_industrial_pharmacy_2020_09_25.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.language` | programme | 1, 2 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.format` | teaching delivery (dated) | 1, 2, 3 (dated) | <https://www.ifnmu.edu.ua/2026/09/01/navchannia-bez-kordoniv-inozemni-studenty-medyky-rozpochynaiut-novyy-navchalnyy-rik/> (also 19) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.intakeYear` | intake (time-sensitive) | 1, 2 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.intake` | intake dates (time-sensitive) | 1, 2 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.tuition` | fee (time-sensitive) | 1, 2 only | to locate — file 23 (also 05, 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | to locate — file 23 (also 05, 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.deadlines` | dates (time-sensitive) | 1, 2 | <https://www.ifnmu.edu.ua/admissions-committee-2026/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.requirements.<id>` | requirement (none recorded yet) | 1, 2 (3 for a national rule) | <https://www.ifnmu.edu.ua/admissions-committee-2026/rules-for-admission-to-higher-education-at-ivano-frankovsk-national-medical-university-in-2026/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.documents.<id>` | document (none recorded yet) | 1, 2 (3 for a national rule) | <https://www.ifnmu.edu.ua/admissions-committee-2026/rules-for-admission-to-higher-education-at-ivano-frankovsk-national-medical-university-in-2026/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.nursing.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://www.ifnmu.edu.ua/faculty-of-health-sciences/> (also 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.public-health.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://www.ifnmu.edu.ua/faculty-of-health-sciences/> (also 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.physical-therapy-bachelor.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://www.ifnmu.edu.ua/faculty-of-health-sciences/> (also 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.physical-therapy-master.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://www.ifnmu.edu.ua/faculty-of-health-sciences/> (also 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.languageOfInstruction` | preparatory route | 1, 2 | <https://www.ifnmu.edu.ua/en/for-students/preparatory-department> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.englishTrack` | preparatory route | 1, 2 | <https://www.ifnmu.edu.ua/en/for-students/preparatory-department> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.durationText` | preparatory route | 1, 2 | <https://www.ifnmu.edu.ua/en/for-students/preparatory-department> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.subjects` | preparatory route | 1, 2 | <https://www.ifnmu.edu.ua/en/for-students/preparatory-department> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.certificateName` | preparatory route | 1, 2 | <https://www.ifnmu.edu.ua/en/for-students/preparatory-department> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.progressionText` | preparatory route | 1, 2 | <https://www.ifnmu.edu.ua/en/for-students/preparatory-department> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.appliesToEnglishDegreeTrack` | preparatory route | 1, 2 | <https://www.ifnmu.edu.ua/en/for-students/preparatory-department> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.eligibilityText` | preparatory route | 1, 2 | <https://www.ifnmu.edu.ua/en/for-students/preparatory-department> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.startDate` | preparatory route (time-sensitive) | 1, 2 | <https://www.ifnmu.edu.ua/en/for-students/preparatory-department> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.fee` | preparatory fee (time-sensitive) | 1, 2 only | <https://www.ifnmu.edu.ua/en/for-students/preparatory-department> (also 23, 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |

### 4.6 Uzhhorod National University

| Claim path | Kind | Required tier | Candidate URL (first choice; other capture nos.) | Supporting passage | Publication / update date | Date accessed | Status |
|---|---|---|---|---|---|---|---|
| `officialName` | identity | 1, 2, 3 | <https://www.uzhnu.edu.ua/en/cat/university-about_us> (also 02) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `website` | identity — own site | 1 | <https://www.uzhnu.edu.ua/en/cat/university-about_us> (also 19a, 19b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `website` | identity — government listing (N24 c) | 3 (.gov.ua page listing the same website) | to locate — file 19a (also 19b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `address` | identity | 1, 3 | to locate — file 16 (also 19a, 19b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `internationalOffice` | contact | 1, 3 | <https://uzhnu.edu.ua/en/cat/abiturient-foreign/about> (also 16) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `status` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 18 (also 13, 15) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `statusStatement` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 18 (also 13, 15) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `teachingFormat` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 18 (also 13, 15) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `(no claim path — schema gap)` | **institutional licence / registration** (government register) | 3 (government register) | to locate — file 19a | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `accreditation` | **programme accreditation in Ukraine** (NAQA decision or certificate; never recognition) | 1, 2, 3 (NAQA register or certificate preferred) | to locate — file 95 | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `recognition` | **professional recognition in a destination country** (that country's regulator) | 4 only | not requested: no recognition authority is listed (N24 b); a WDOMS listing is a directory entry, not recognition | none | unknown | none | not requested |
| `founded` | identity | 1, 3 | <https://www.uzhnu.edu.ua/en/cat/university-about_us> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `accommodation` | student costs | 1, 2 | none referenced (to locate) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.internationalAdmission` | programme eligibility | 1, 2 | <https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs> (also 03, 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.level` | programme | 1, 2 | to locate — file 17 (also 05, 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.specialtyCode` | programme | 1, 2 (3 for the code) | to locate — file 17 (also 05, 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.qualification` | programme (award title as printed) | 1, 2 | to locate — file 17 (also 05, 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.durationText / .durationYears` | programme | 1, 2 | to locate — file 17 (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.language` | programme | 1, 2 | <https://uzhnu.edu.ua/en/cat/abiturient-foreign/courses_in_english> (also 17, 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 18 (also 13, 15) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.intakeYear` | intake (time-sensitive) | 1, 2 | <https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.intake` | intake dates (time-sensitive) | 1, 2 | <https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.tuition` | fee (time-sensitive) | 1, 2 only | <https://uzhnu.edu.ua/en/cat/abiturient-foreign/courses_in_english> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | <https://uzhnu.edu.ua/en/cat/abiturient-foreign/courses_in_english> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.deadlines` | dates (time-sensitive) | 1, 2 | <https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.requirements.entrance-exams` | requirement (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.requirements.remote-exams` | requirement (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.documents.legalised-education-documents` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.documents.unified-system-registration` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.uzhnu.edu.ua/en/cat/abiturient-foreign/specs> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://uzhnu.edu.ua/en/cat/faculty-fstomat/about> (also 14) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://uzhnu.edu.ua/en/cat/faculty-fstomat/about> (also 14) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.nursing.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://uzhnu.edu.ua/en/cat/faculty-fstomat/about> (also 14) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.public-health.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://uzhnu.edu.ua/en/cat/faculty-fstomat/about> (also 14) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.physical-rehabilitation.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://uzhnu.edu.ua/en/cat/faculty-fstomat/about> (also 14) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.physical-culture-sport.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://uzhnu.edu.ua/en/cat/faculty-fstomat/about> (also 14) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.languageOfInstruction` | preparatory route | 1, 2 | <https://uzhnu.edu.ua/en/cat/pdodp-preuniversity> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.englishTrack` | preparatory route | 1, 2 | <https://uzhnu.edu.ua/en/cat/pdodp-preuniversity> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.durationText` | preparatory route | 1, 2 | <https://uzhnu.edu.ua/en/cat/pdodp-preuniversity> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.subjects` | preparatory route | 1, 2 | <https://uzhnu.edu.ua/en/cat/pdodp-preuniversity> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.certificateName` | preparatory route | 1, 2 | <https://uzhnu.edu.ua/en/cat/pdodp-preuniversity> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.progressionText` | preparatory route | 1, 2 | <https://uzhnu.edu.ua/en/cat/pdodp-preuniversity> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.appliesToEnglishDegreeTrack` | preparatory route | 1, 2 | <https://uzhnu.edu.ua/en/cat/pdodp-preuniversity> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.eligibilityText` | preparatory route | 1, 2 | <https://uzhnu.edu.ua/en/cat/pdodp-preuniversity> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.startDate` | preparatory route (time-sensitive) | 1, 2 | <https://uzhnu.edu.ua/en/cat/pdodp-preuniversity> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.fee` | preparatory fee (time-sensitive) | 1, 2 only | <https://uzhnu.edu.ua/en/cat/pdodp-preuniversity> (also 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |

### 4.7 Ternopil National Medical University

| Claim path | Kind | Required tier | Candidate URL (first choice; other capture nos.) | Supporting passage | Publication / update date | Date accessed | Status |
|---|---|---|---|---|---|---|---|
| `officialName` | identity | 1, 2, 3 | <https://www.tdmu.edu.ua/en/> (also 12a, 12b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `website` | identity — own site | 1 | <https://www.tdmu.edu.ua/en/> (also 12a, 12b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `website` | identity — government listing (N24 c) | 3 (.gov.ua page listing the same website) | to locate — file 12a (also 12b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `address` | identity | 1, 3 | to locate — file 08 (also 12a, 12b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `internationalOffice` | contact | 1, 3 | <https://www.tdmu.edu.ua/int/admission/> (also 08) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `status` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 10 (also 07) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `statusStatement` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 10 (also 07) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `teachingFormat` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 10 (also 07) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `(no claim path — schema gap)` | **institutional licence / registration** (government register) | 3 (government register) | to locate — file 12a | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `accreditation` | **programme accreditation in Ukraine** (NAQA decision or certificate; never recognition) | 1, 2, 3 (NAQA register or certificate preferred) | to locate — file 95 (also 96, 97) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `recognition` | **professional recognition in a destination country** (that country's regulator) | 4 only | not requested: no recognition authority is listed (N24 b); a WDOMS listing is a directory entry, not recognition | none | unknown | none | not requested |
| `founded` | identity | 1, 3 | to locate — file 08 | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `accommodation` | student costs | 1, 2 | <https://www.tdmu.edu.ua/int/payment-info/> (also 05) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.internationalAdmission` | programme eligibility | 1, 2 | <https://www.tdmu.edu.ua/int/admission/> (also 04, 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.level` | programme | 1, 2 | to locate — file 11 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.specialtyCode` | programme | 1, 2 (3 for the code) | to locate — file 11 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.qualification` | programme (award title as printed) | 1, 2 | to locate — file 11 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.durationText / .durationYears` | programme | 1, 2 | to locate — file 11 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.language` | programme | 1, 2 | to locate — file 11 (also 01, 09) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 10 (also 07) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.intakeYear` | intake (time-sensitive) | 1, 2 | <https://www.tdmu.edu.ua/int/admission/> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.intake` | intake dates (time-sensitive) | 1, 2 | <https://www.tdmu.edu.ua/int/admission/> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.tuition` | fee (time-sensitive) | 1, 2 only | to locate — file 09 (also 02, 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | to locate — file 09 (also 02, 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.deadlines` | dates (time-sensitive) | 1, 2 | <https://www.tdmu.edu.ua/int/admission/> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.requirements.<id>` | requirement (none recorded yet) | 1, 2 (3 for a national rule) | <https://www.tdmu.edu.ua/int/rules-of-admission/> (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.documents.passport` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.tdmu.edu.ua/int/admission/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.documents.certificate` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.tdmu.edu.ua/int/admission/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.documents.consent` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.tdmu.edu.ua/int/admission/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.internationalAdmission` | programme eligibility | 1, 2 | <https://www.tdmu.edu.ua/int/admission/> (also 04, 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.level` | programme | 1, 2 | to locate — file 11 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.specialtyCode` | programme | 1, 2 (3 for the code) | to locate — file 11 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.qualification` | programme (award title as printed) | 1, 2 | to locate — file 11 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.durationText / .durationYears` | programme | 1, 2 | to locate — file 11 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.language` | programme | 1, 2 | to locate — file 11 (also 01, 09) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 10 (also 07) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.intakeYear` | intake (time-sensitive) | 1, 2 | <https://www.tdmu.edu.ua/int/admission/> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.intake` | intake dates (time-sensitive) | 1, 2 | <https://www.tdmu.edu.ua/int/admission/> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.tuition` | fee (time-sensitive) | 1, 2 only | to locate — file 09 (also 02, 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | to locate — file 09 (also 02, 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.deadlines` | dates (time-sensitive) | 1, 2 | <https://www.tdmu.edu.ua/int/admission/> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.requirements.<id>` | requirement (none recorded yet) | 1, 2 (3 for a national rule) | <https://www.tdmu.edu.ua/int/rules-of-admission/> (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.documents.passport` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.tdmu.edu.ua/int/admission/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.documents.certificate` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.tdmu.edu.ua/int/admission/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.documents.consent` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.tdmu.edu.ua/int/admission/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.internationalAdmission` | programme eligibility | 1, 2 | <https://www.tdmu.edu.ua/int/admission/> (also 04, 11) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.level` | programme | 1, 2 | to locate — file 11 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.specialtyCode` | programme | 1, 2 (3 for the code) | to locate — file 11 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.qualification` | programme (award title as printed) | 1, 2 | to locate — file 11 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.durationText / .durationYears` | programme | 1, 2 | to locate — file 11 (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.language` | programme | 1, 2 | to locate — file 11 (also 01, 09) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 10 (also 07) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.intakeYear` | intake (time-sensitive) | 1, 2 | <https://www.tdmu.edu.ua/int/admission/> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.intake` | intake dates (time-sensitive) | 1, 2 | <https://www.tdmu.edu.ua/int/admission/> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.tuition` | fee (time-sensitive) | 1, 2 only | to locate — file 09 (also 02, 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | to locate — file 09 (also 02, 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.deadlines` | dates (time-sensitive) | 1, 2 | <https://www.tdmu.edu.ua/int/admission/> (also 04) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.requirements.<id>` | requirement (none recorded yet) | 1, 2 (3 for a national rule) | <https://www.tdmu.edu.ua/int/rules-of-admission/> (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.documents.passport` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.tdmu.edu.ua/int/admission/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.documents.certificate` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.tdmu.edu.ua/int/admission/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.documents.consent` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.tdmu.edu.ua/int/admission/> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.nursing.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://www.tdmu.edu.ua/int/admission/> (also 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.public-health.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://www.tdmu.edu.ua/int/admission/> (also 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.physical-therapy.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://www.tdmu.edu.ua/int/admission/> (also 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.languageOfInstruction` | preparatory route | 1, 2 | <https://www.tdmu.edu.ua/int/?p=1625> (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.englishTrack` | preparatory route | 1, 2 | <https://www.tdmu.edu.ua/int/?p=1625> (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.durationText` | preparatory route | 1, 2 | <https://www.tdmu.edu.ua/int/?p=1625> (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.subjects` | preparatory route | 1, 2 | <https://www.tdmu.edu.ua/int/?p=1625> (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.certificateName` | preparatory route | 1, 2 | <https://www.tdmu.edu.ua/int/?p=1625> (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.progressionText` | preparatory route | 1, 2 | <https://www.tdmu.edu.ua/int/?p=1625> (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.appliesToEnglishDegreeTrack` | preparatory route | 1, 2 | <https://www.tdmu.edu.ua/int/?p=1625> (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.eligibilityText` | preparatory route | 1, 2 | <https://www.tdmu.edu.ua/int/?p=1625> (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.startDate` | preparatory route (time-sensitive) | 1, 2 | <https://www.tdmu.edu.ua/int/?p=1625> (also 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.fee` | preparatory fee (time-sensitive) | 1, 2 only | <https://www.tdmu.edu.ua/int/?p=1625> (also 02, 09) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |

### 4.8 Vinnytsia National Pirogov Memorial Medical University (eighth, listed separately)

| Claim path | Kind | Required tier | Candidate URL (first choice; other capture nos.) | Supporting passage | Publication / update date | Date accessed | Status |
|---|---|---|---|---|---|---|---|
| `officialName` | identity | 1, 2, 3 | <https://foreign.vnmu.edu.ua/en/about-university/> (also 19) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `website` | identity — own site | 1 | <https://foreign.vnmu.edu.ua/en/about-university/> (also 22a, 22b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `website` | identity — government listing (N24 c) | 3 (.gov.ua page listing the same website) | to locate — file 22a (also 22b) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `address` | identity | 1, 3 | to locate — file 20 (also 22a, 22b, 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `internationalOffice` | contact | 1, 3 | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> (also 11, 20) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `status` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 21 (also 14, 19) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `statusStatement` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 21 (also 14, 19) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `teachingFormat` | operating status (dated, current year) | 1, 2, 3 (dated) | to locate — file 21 (also 14, 19) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `(no claim path — schema gap)` | **institutional licence / registration** (government register) | 3 (government register) | to locate — file 22a | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `accreditation` | **programme accreditation in Ukraine** (NAQA decision or certificate; never recognition) | 1, 2, 3 (NAQA register or certificate preferred) | to locate — file 95 (also 96, 97, 16, 19) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `recognition` | **professional recognition in a destination country** (that country's regulator) | 4 only | not requested: no recognition authority is listed (N24 b); a WDOMS listing is a directory entry, not recognition | none | unknown | none | not requested |
| `founded` | identity | 1, 3 | <https://vnmu.edu.ua/en/history-of-university> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `accommodation` | student costs | 1, 2 | <https://foreign.vnmu.edu.ua/?p=1556> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.internationalAdmission` | programme eligibility | 1, 2 | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> (also 10, 01, 02, 13) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.level` | programme | 1, 2 | <https://www.vnmu.edu.ua/downloads/pdf/OPP_%20I2%20Medicine%20(mag)_2025.pdf> (also 10, 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.specialtyCode` | programme | 1, 2 (3 for the code) | <https://www.vnmu.edu.ua/downloads/pdf/OPP_%20I2%20Medicine%20(mag)_2025.pdf> (also 10, 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.qualification` | programme (award title as printed) | 1, 2 | <https://www.vnmu.edu.ua/downloads/pdf/OPP_%20I2%20Medicine%20(mag)_2025.pdf> (also 10, 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.durationText / .durationYears` | programme | 1, 2 | <https://www.vnmu.edu.ua/downloads/pdf/OPP_%20I2%20Medicine%20(mag)_2025.pdf> (also 10, 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.language` | programme | 1, 2 | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> (also 10, 01, 06) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 21 (also 14, 19) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.intakeYear` | intake (time-sensitive) | 1, 2 | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> (also 13) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.intake` | intake dates (time-sensitive) | 1, 2 | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> (also 13) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.tuition` | fee (time-sensitive) | 1, 2 only | <https://www.vnmu.edu.ua/downloads/other/Tuition_fee_2026-2027.pdf> (also 07, 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | <https://www.vnmu.edu.ua/downloads/other/Tuition_fee_2026-2027.pdf> (also 07, 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.deadlines` | dates (time-sensitive) | 1, 2 | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> (also 13) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.requirements.entrance-exam` | requirement (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> (also 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.documents.passport` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.vnmu.edu.ua/downloads/other/List_doc_obtaining.pdf> (also 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.documents.education-document` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.vnmu.edu.ua/downloads/other/List_doc_obtaining.pdf> (also 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.documents.consent` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.vnmu.edu.ua/downloads/other/List_doc_obtaining.pdf> (also 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.documents.translation` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.vnmu.edu.ua/downloads/other/List_doc_obtaining.pdf> (also 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.medicine.documents.legalised-copies` | document (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.vnmu.edu.ua/downloads/other/List_doc_obtaining.pdf> (also 03) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.internationalAdmission` | programme eligibility | 1, 2 | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> (also 10, 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.level` | programme | 1, 2 | <https://new.vnmu.edu.ua/documents> (also 10) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.specialtyCode` | programme | 1, 2 (3 for the code) | <https://new.vnmu.edu.ua/documents> (also 10) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.qualification` | programme (award title as printed) | 1, 2 | <https://new.vnmu.edu.ua/documents> (also 10) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.durationText / .durationYears` | programme | 1, 2 | <https://new.vnmu.edu.ua/documents> (also 10, 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.language` | programme | 1, 2 | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> (also 10) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 21 (also 14, 19) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.intakeYear` | intake (time-sensitive) | 1, 2 | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.intake` | intake dates (time-sensitive) | 1, 2 | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.tuition` | fee (time-sensitive) | 1, 2 only | <https://www.vnmu.edu.ua/downloads/other/Tuition_fee_2026-2027.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | <https://www.vnmu.edu.ua/downloads/other/Tuition_fee_2026-2027.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.deadlines` | dates (time-sensitive) | 1, 2 | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.requirements.entrance-exam` | requirement (time-sensitive) | 1, 2 (3 for a national rule) | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.dentistry.documents.<id>` | document (none recorded yet) | 1, 2 (3 for a national rule) | <https://www.vnmu.edu.ua/downloads/other/List_doc_obtaining.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.internationalAdmission` | programme eligibility | 1, 2 | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> (also 10, 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.level` | programme | 1, 2 | <https://new.vnmu.edu.ua/documents> (also 10) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.specialtyCode` | programme | 1, 2 (3 for the code) | <https://new.vnmu.edu.ua/documents> (also 10) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.qualification` | programme (award title as printed) | 1, 2 | <https://new.vnmu.edu.ua/documents> (also 10) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.durationText / .durationYears` | programme | 1, 2 | <https://new.vnmu.edu.ua/documents> (also 10, 01) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.language` | programme | 1, 2 | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> (also 10) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.format` | teaching delivery (dated) | 1, 2, 3 (dated) | to locate — file 21 (also 14, 19) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.intakeYear` | intake (time-sensitive) | 1, 2 | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.intake` | intake dates (time-sensitive) | 1, 2 | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.tuition` | fee (time-sensitive) | 1, 2 only | <https://www.vnmu.edu.ua/downloads/other/Tuition_fee_2026-2027.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.otherMandatoryCosts.<n>` | other charges (time-sensitive; never added to tuition) | 1, 2 only | <https://www.vnmu.edu.ua/downloads/other/Tuition_fee_2026-2027.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.deadlines` | dates (time-sensitive) | 1, 2 | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.requirements.<id>` | requirement (none recorded yet) | 1, 2 (3 for a national rule) | <https://www.vnmu.edu.ua/downloads/other/specific%20features_studies_2026.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.pharmacy.documents.<id>` | document (none recorded yet) | 1, 2 (3 for a national rule) | <https://www.vnmu.edu.ua/downloads/other/List_doc_obtaining.pdf> | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.nursing.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://www.vnmu.edu.ua/вступ-2026> (also 15, 16) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.public-health.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://www.vnmu.edu.ua/вступ-2026> (also 15, 16) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.physical-therapy.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://www.vnmu.edu.ua/вступ-2026> (also 15, 16) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `programmes.physical-culture-sport.internationalAdmission` | deferred programme (unpublished until read) | 1, 2 | <https://www.vnmu.edu.ua/вступ-2026> (also 15, 16) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.languageOfInstruction` | preparatory route | 1, 2 | <https://foreign.vnmu.edu.ua/en/preparatory-faculty/> (also 09) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.englishTrack` | preparatory route | 1, 2 | <https://foreign.vnmu.edu.ua/en/preparatory-faculty/> (also 09) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.durationText` | preparatory route | 1, 2 | <https://foreign.vnmu.edu.ua/en/preparatory-faculty/> (also 09) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.subjects` | preparatory route | 1, 2 | <https://foreign.vnmu.edu.ua/en/preparatory-faculty/> (also 09) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.certificateName` | preparatory route | 1, 2 | <https://foreign.vnmu.edu.ua/en/preparatory-faculty/> (also 09) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.progressionText` | preparatory route | 1, 2 | <https://foreign.vnmu.edu.ua/en/preparatory-faculty/> (also 09) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.appliesToEnglishDegreeTrack` | preparatory route | 1, 2 | <https://foreign.vnmu.edu.ua/en/preparatory-faculty/> (also 09) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.eligibilityText` | preparatory route | 1, 2 | <https://foreign.vnmu.edu.ua/en/preparatory-faculty/> (also 09) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.startDate` | preparatory route (time-sensitive) | 1, 2 | <https://foreign.vnmu.edu.ua/en/preparatory-faculty/> (also 09) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
| `preparatoryRoutes.preparatory-department.fee` | preparatory fee (time-sensitive) | 1, 2 only | <https://www.vnmu.edu.ua/downloads/other/Tuition_fee_2026-2027.pdf> (also 08) | none | unknown | none | NOT ACCESSED — refused by network policy 2026-10-12 |
---

## 5. Record references and notes that look wrong or out of date

Found while preparing this request. None is a fact about a university; each is a reason to read the page carefully or to correct the record.

| Record | Reference or note | Why it looks wrong or out of date | Suggested handling |
|---|---|---|---|
| All 12 records | `recognition.note`: "List only recognition that can be evidenced (e.g. World Directory of Medical Schools listing) …" | Contradicts the standard (§6, §9: a directory listing is not recognition; recognition is tier 4 only) and N24 (b) | Reword the note in every record, for example "Only a dated statement by a destination country's recognition authority (tier 4), once the owner lists that authority; a directory listing is not recognition" |
| Bukovinian, Bogomolets | `website.value` carries an `/en/` path (`https://www.bsmu.edu.ua/en/`, `https://nmuofficial.com/en/`) | N24 (c) needs a government page listing exactly the same value | Change the value to the register's wording when the register page is read |
| Bogomolets | Reference 2: `https://nmuofficial.com/en/(УКР)%20/zagalni-vidomosti/…` | Malformed address (the record's own note says so) | Replace with the final address captured from the admissions page |
| Bogomolets | Reference 7: `https://nmuofficial.com/en/wp-json/wp/v2/pages/8095` | A WordPress API address, not a page a student can open; an undated snapshot | Replace with the live contacts page (to-locate row 10) |
| Bogomolets | Reference 6 (`?p=88424`) | Purpose unknown | Keep as P3; drop if it is not about admissions |
| Bogomolets | Domain question `nmuofficial.com` vs `nmu.ua` | Search results today still show both | Settle from the government page (§1(a) conditional host) |
| Kharkiv | Reference 1 (admission rules) shows the 2025 regulations; reference 6 is 2022; reference 10 is the 2022 programme version | Out of date for 2026/27 | Look for the 2026 versions (rows 22–23); old pages only to mark entries out of date |
| Ivano-Frankivsk | References 4 and 5 are the 2025 cycle; programme `intakeYear` leads say 2025/26; reference 7 shows a 2022 note; reference 9 is undated; reference 13 is a 2023 edition; reference 19 covers autumn 2025–26 | The 2025 cycle is closed | Read references 1–2 (2026) and row 23 first |
| Ternopil | `officialName`, `address` and `founded` come from the project brief, not from any official page or snippet; reference 3 is the 2025/26 fee table; programme `intakeYear` leads say 2025/26; domain question `tdmu.edu.ua` vs `tnmu.edu.ua` | Weakest provenance of the eight | Treat every Ternopil value as a question; capture row 9 (2026/27 fees) and the government entry first |
| Odesa | Reference 18 covers 2024–25 only; references 5 and 21 are undated; reference 16 is several years old; the address lead (from an undated page) may not match the Ministry-portal entry, judging by a search result | Out of date or undated | Read the dated 2026–27 notice (row 22) and the Ministry-portal entry (row 24b) |
| Bukovinian | Reference 4 (fees): the lead showed 2023–24 content; references 8 (2024), 9 (2023), 10 (2019) and 18 (2023) are old; references 14–17 are timetables, which are indirect evidence only | Out of date or indirect | Rows 19–23 (to locate) carry the P1 load |
| Uzhhorod | Reference 5 is a 2024–25 news item; reference 13 covers semester 1 of 2025–26; references 7 and 8 are undated; an earlier sweep saw older rules on reference 1; the Medicine duration lead dates from 2019 | Out of date or undated | Check the year printed on reference 1; read row 17 for duration |
| Vinnytsia | Reference 1 is dated 2022; reference 2 carries 2023 materials; references 4 and 7 are the 2025 versions | Comparison only | The 2026 procedures (3) and the 2026–2027 fee PDF (6) come first |
| Bogomolets, Ivano-Frankivsk, Uzhhorod, Ternopil | No evidence register exists | `capture-intake.py` cannot match files to rows until one is generated | Add the "to locate" rows and generate the registers (§2) |

## Change log

- 2026-10-12 — first version. Host list (18 university hosts plus 1 conditional; 6 government hosts plus 4 conditional; 4 optional destination-country and directory hosts; 2 production hosts), 164 pages requested across eight universities (P1 80, P2 54, P3 30), capture instructions matched to `capture-intake.py` and `evidence-entry.mjs`, and an evidence register in which every row is NOT ACCESSED. Nothing verified; no record or evidence file changed.
- 2026-10-12 (later) — the 20 "Start here" hosts also kept as `research/verification/ALLOWLIST_P1.txt` and in `OWNER_ACTION_SHEET.md` §1; `npm run test:allowlist` keeps them identical and covering every §2 address; `npm run probe:access` reports which answer. Re-test 10:12 UTC: all 20 refused by the network policy (403 to CONNECT); no captures received.
