# Owner action sheet

**12 October 2026 · branch `claude/university-profile-pipeline` · production unchanged · not legal advice**

| | Today |
|---|---|
| Official sources | **Blocked.** All 20 hosts below refused by the network policy (latest probe 10:12 UTC: 403 to CONNECT for all 20) |
| Evidence received | **None.** No captures, no access, no verified fact |
| Release | **NOT READY:** the 36 items in §2 (38 before the dashboard paragraph was removed on 2026-10-24), then the release steps in §5 |
| Google | Nothing verified or submitted by us. Index status unknown (no Search Console access; the live site is public and crawlable) |

Background and every other open question: `OWNER_INPUT_NEEDED.md`. Pages to capture if you cannot allow the hosts: `research/verification/CAPTURE_REQUEST_2026-10-12.md` §2–§3.

## 1. Allow 20 hosts (unlocks university verification)

1. In the session title bar, open the cloud environment menu → **Edit**.
2. **Network access** → **Allowed domains** (shown under the *Limited* level). Keep **Allow package managers** ticked. On an older app, Allowed domains is under *Custom*: there, tick the box that includes the default list of package managers.
3. Add all 20 hosts below exactly as written: no `https://`, no path, both the `www.` and bare forms, each one separately (one per line, or one per entry if the box takes them one at a time). A parent domain does not cover its subdomains. Save. Docs: https://code.claude.com/docs/en/cloud-environments#network-access
4. Send "hosts added" in this chat. I run `npm run probe:access` here and tell you what answers. If I still see them blocked, start a new Claude Code session on this repository with **the same cloud environment** and the branch `claude/university-profile-pipeline`, and send: "Read OWNER_ACTION_SHEET.md, run npm run probe:access in site/ and report." Whether a running session picks up the change is not confirmed.

<!-- allowlist:start -->
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
```
<!-- allowlist:end -->

**Latest check:** 2026-10-16 03:23 UTC, 0 of 20 open (proxy 403 to CONNECT on every host).

**Second list (optional, after the first 20).** The five previews added under N26 (Sumy, National University of Pharmacy, Taras Shevchenko Kyiv, Petro Mohyla, Cherkasy), the national registers, NAQA accreditation pages, and India's National Medical Commission (for the India questions on the FAQ). The list is in `research/verification/ALLOWLIST_P2.txt` (25 hosts, the same steps; it covers every page address for those five in `CAPTURE_REQUEST_WAVE2_2026-10-12.md`). Checked 2026-10-16: 0 of 25 open. After adding it, I run `npm run probe:access -- --list ../research/verification/ALLOWLIST_P2.txt`.

**Third list (2026-10-24).** It covers the four previews whose own sites are on neither list above: Danylo Halytsky Lviv, Dnipro, Poltava and Zaporizhzhia.
- The list is in `research/verification/ALLOWLIST_P3.txt`: 11 hosts, taken from the website leads already recorded in their records.
- Probe on 2026-10-24: P1 0 of 20 open, P2 0 of 25 open, P3 0 of 11 open. Every request was refused by this environment's network policy.
- With all three lists allowed, every one of the 17 profiles can be checked.
- Instead of adding all 56 hosts one by one, you can choose a broader network access level in the same settings.

**Which profiles each list unlocks:**
- P1: Bukovinian, Odesa, Kharkiv, Bogomolets, Ivano-Frankivsk, Uzhhorod, Ternopil and Vinnytsia, plus the two national registers.
- P2: Sumy, National University of Pharmacy, Taras Shevchenko Kyiv, Petro Mohyla, Cherkasy, NAQA and the other registers.
- P3: Lviv, Dnipro, Poltava and Zaporizhzhia.

A profile becomes indexable and enters the sitemap automatically once its facts pass the publication policy; the gate is unchanged.

```
sumdu.edu.ua
int.sumdu.edu.ua
study.sumdu.edu.ua
med.sumdu.edu.ua
inter.med.sumdu.edu.ua
news.sumdu.edu.ua
nuph.edu.ua
en.nuph.edu.ua
pat.nuph.edu.ua
knu.ua
biomed.knu.ua
pdis.knu.ua
chmnu.edu.ua
cdu.edu.ua
www.cdu.edu.ua
edbo.gov.ua
vstup.edbo.gov.ua
naqa.gov.ua
en.naqa.gov.ua
public.naqa.gov.ua
mon.gov.ua
moz.gov.ua
studyinukraine.gov.ua
nmc.org.in
www.nmc.org.in
```

**If you would rather not change the network settings:** save each page in the capture requests as a PDF (with the address and date visible) and send them; I record each as dated evidence the same way. Either route keeps every university fact unverified until its page has actually been read.

These 20 cover every full page address (`https://…`) in the capture request's §2 tables, including every P1 page (checked by `npm run test:allowlist`). Some checks, a few P1 ones included, may need one more host; I will ask only when a claim needs it:
- `info.edbo.gov.ua`, `nauka.gov.ua`: if the register card does not print the website.
- `nmu.ua`: if the register lists it as Bogomolets' website.
- `tnmu.edu.ua`: if the register lists it as Ternopil's website (open domain question).
- `naqa.gov.ua`, `public.naqa.gov.ua`: programme accreditation, P2.
- `studyinukraine.gov.ua`, `apply.studyinukraine.gov.ua`, `mon.gov.ua`, `zakon.rada.gov.ua`: national rules.
- The two production hosts: live checks after a release.

All but `tnmu.edu.ua` are described in the capture request §1.

**What I do once the hosts answer.**
- **Order** (search demand, `SEMRUSH_API_LEDGER.md` 2026-10-12): Bukovinian first; then Odesa, Kharkiv and Vinnytsia; then Bogomolets, Ivano-Frankivsk, Uzhhorod and Ternopil. This is a research priority only, not a statement that any of them is admitting.
- **P1 pages first** for each university: the government register card, official name and contacts, a dated 2026/27 teaching statement, the Medicine admission rule for foreign applicants, and the fee page.
- **Each reading becomes one dated evidence entry** with the address and the exact passage. Silent and not-found pages are recorded too.
- **Separate claims:** Ukrainian registration (EDEBO), programme accreditation (NAQA) and recognition abroad (each country's regulator) are never merged.
- **Visibility:** profiles stay noindex and unpublished until the publication gate passes and you approve a release.

## 2. The items the release check lists (36 since 2026-10-24; numbering kept from the original 38)

In the order `node scripts/release-readiness.mjs` lists them. The check prints bullets and lists only what is still open; the numbers below are this sheet's own. `LEGAL_COMPLETION_CHECKLIST.md` numbers the same fields differently, so always keep the field name next to an answer, as the template does. **R** = a qualified legal reviewer must check the answer.

### 2.0 At a glance: the 38 blockers in three groups

Numbers refer to the tables below (§2.1–2.4). Items 35–38 (the four legal pages built as drafts: banner, placeholder and proposal markers) clear by themselves once 1–34 are in and I rebuild. If item 7 is `true`, the representative's name and address become one more required item.

**A. Facts only you can supply (11).** Read them from your registration papers and your Hostinger and mailbox accounts; no wording to approve and no legal judgement needed to state them (your reviewer still reads every answer before signing off). Items 6, 14 and 20 are marked R in §2.1: your reviewer confirms them.

| # | Item | Where to find it |
|---|---|---|
| 1 | Legal name of the person or company running the service | registration certificate or ID |
| 2 | Legal form (sole trader, limited company …) | registration certificate |
| 3 | Country of registration (send first: it decides 6–11 and bears on 21) | registration certificate |
| 4 | Registration number, or `not applicable` | registration certificate |
| 5 | Postal address for formal requests | registration or business address |
| 6 | Data controller (normally the same as 1; your reviewer confirms) | — |
| 12 | Date the legal pages take effect (`YYYY-MM-DD`; send last) | your choice |
| 13 | Privacy notice version (for example `1.0`) | your choice |
| 14 | Whether host backups contain form submissions, and how long backups are kept | Hostinger plan / backup settings |
| 19 | Company that provides the info@ mailbox | mailbox account (Hostinger Email, Google Workspace, Zoho …) |
| 20 | Countries where Hostinger and the mailbox provider store data | each provider's data-centre setting or terms |

**B. Proposed wording to approve or replace (9).** Answer "approved" or give your own value.

| # | Item | Proposed |
|---|---|---|
| 23 | How long contact-form enquiries are kept | "up to 12 months after our last contact" |
| 24 | How long candidate profiles are kept | "up to 12 months after our last contact" |
| 25 | How long the e-mail copies in the mailbox are kept | "the same period as the stored record" |
| 26 | Lawful basis for replying to enquiries (reviewer to confirm) | "your consent and steps taken at your request before any contract" |
| 27 | Lawful basis for candidate profiles (reviewer to confirm) | same as 26 |
| 28 | Complaint acknowledged within | "3 working days" |
| 29 | Full reply within | "15 working days" |
| 30 | Second-stage reviewer | "the business owner" (if the owner also handles the first stage, the review is not independent: name someone else if you can) |
| 31 | Second-stage reply within | "a further 10 working days" |

**C. Needs a qualified legal reviewer (12; items 15 and 18 removed with the dashboard paragraph on 2026-10-24).** These are legal determinations, not facts; decide them with your reviewer, then send the agreed answers.

| # | Item |
|---|---|
| 7 | Whether a UK or EU representative is required (and, if yes, their name and address) |
| 8–9 | Governing law and courts for the terms |
| 10 | The data-protection authority people can complain to, with its web address |
| 11 | The outside complaints body, or `not applicable` |
| ~~15~~ | Not required: dashboard paragraph removed (owner decision 2026-10-24); returns only if documents are ever accepted |
| 16 | Retention of complaint records |
| 17 | Lawful basis for abuse detection (submission time and keyed IP code) |
| ~~18~~ | Not required: as item 15 |
| 21 | International transfers and the safeguard used |
| 22 | The rule for applicants under 18 (the forms are built for school-leavers) |
| 32–34 | Review completed, reviewer's name, review date (set only after the review) |

**Reviewer brief (not gate items, but raised by the 2026-10-16 review, `SITE_GAP_ANALYSIS.md` §6):** the consent wording ("agree to the privacy notice"); rights and authorities for applicants outside the UK and EU (India, Nigeria, Pakistan, UAE); missing rights (objection, portability, whether giving data is required, automated decisions); server and mail logs; the notice's commitments about the unbuilt dashboard; the brevity of the terms.

**The repository is public (your decision, 2026-10-24).** What I enter in `site/src/lib/legal.mjs` is readable on GitHub once pushed, and items 1–31 also appear on the public legal pages after the release. So: I enter all your answers in one commit just before the release, not piecemeal; use a business or correspondence address for item 5 if you prefer your home address not to be public; and for item 33 send a review reference you control (for example "Legal review ref. UMA-LR-01, record held by the owner") instead of the reviewer's name: the gate still refuses an empty or placeholder value, and you keep the signed review record offline. Never send passwords, keys or the contents of `config.php`.

**How to reply.** Fill in what you know in the template (§2.5) and send it. Partial replies are fine: leave a line blank if you do not have the answer yet. Agree the R lines with your reviewer before sending them. I enter the answers word for word. You can also edit `legal.mjs` yourself. "TBC", "???" or anything in square brackets counts as not supplied.

**Allowed answers.** Only items 4 and 11 accept `not applicable`; on any other item it is rejected and the item stays open. Items 15 and 18 concern the application dashboard, which is not built yet. Give an answer, or decide with the reviewer whether that paragraph should stay in the privacy notice. Removing it is a code change for you to approve.

**Order.**
1. Item 3 (country) first: with the reviewer, it decides 6–11 and bears on 21.
2. Then 1–2, 4–5, and 19–20. Read 19–20 from your mailbox and Hostinger accounts, not from your country of registration.
3. Then the other R items (14–18, 21–22) with your reviewer.
4. Then 23–31: approve or replace. 23–27 also need the reviewer.
5. 12–13 last, and 32–34 after the review.

### 2.1 Missing details (22)

| # | Field in `legal.mjs` | Send | R |
|---|---|---|---|
| 1 | `entity.name` | Legal name of the person or company that runs the service | |
| 2 | `entity.type` | Legal form (for example sole trader, limited company) | |
| 3 | `entity.country` | Country of registration | |
| 4 | `entity.registrationNumber` | Registration number, or `not applicable` | |
| 5 | `entity.address` | Registered or business postal address | |
| 6 | `controller.name` | Name of the data controller | R |
| 7 | `representative.needed` | `true` or `false`: is a UK or EU representative required? If `true`, also send `representative.details` (name and postal address). The check then lists it in place of item 7 until it is supplied | R |
| 8 | `governingLaw` | Law that governs the terms | R |
| 9 | `courts` | Courts that decide disputes | R |
| 10 | `privacyAuthority` | Data-protection authority people can complain to, with its web address | R |
| 11 | `complaintsBody` | Outside body for unresolved complaints, or `not applicable` | R |
| 12 | `effectiveDate` | Date the legal pages take effect, `YYYY-MM-DD` | |
| 13 | `noticeVersion` | Privacy notice version number | |
| 14 | `retention.backups` | Whether backups hold form submissions, and how long backups are kept | R |
| ~~15~~ | `retention.applicationRecords` | Not required while no documents are accepted (owner decision 2026-10-24) | R |
| 16 | `retention.complaints` | How long complaint records are kept | R |
| 17 | `lawfulBasis.abuseDetection` | Lawful basis for keeping the submission time and the keyed IP code | R |
| ~~18~~ | `lawfulBasis.applications` | Not required while no documents are accepted (owner decision 2026-10-24) | R |
| 19 | `processors.mailbox` | Company that provides the info@ mailbox | |
| 20 | `processingLocation` | Countries where Hostinger and the mailbox provider store data | R |
| 21 | `internationalTransfers` | Whether personal data goes abroad, and the safeguard used | R |
| 22 | `under18Policy` | Rule for applicants under 18 | R |

### 2.2 Draft wording to approve or replace (9)

Write `approve` to adopt the draft wording as your choice, or give your own. This is not legal approval: R items still need the reviewer before item 32.

| # | Field | Draft today | R |
|---|---|---|---|
| 23 | `retention.enquiries` | "up to 12 months after our last contact" | R |
| 24 | `retention.candidateProfiles` | "up to 12 months after our last contact" | R |
| 25 | `retention.mailboxCopies` | "the same period as the stored record" | R |
| 26 | `lawfulBasis.enquiries` | "your consent and steps taken at your request before any contract" | R |
| 27 | `lawfulBasis.candidateProfiles` | "your consent and steps taken at your request before any contract" | R |
| 28 | `complaints.acknowledge` | "3 working days" | |
| 29 | `complaints.reply` | "15 working days" | |
| 30 | `complaints.reviewer` | "the business owner" | |
| 31 | `complaints.review` | "a further 10 working days" | |

### 2.3 Legal review (3)

When 1–31 are in, I rebuild the four legal pages with your answers and send you a private preview copy for the reviewer. Do not use the live pages for the review: they are the older draft and do not contain your answers.

| # | Field | Send |
|---|---|---|
| 32 | `legalReviewCompleted` | `true`, only once the review is done |
| 33 | `reviewedBy` | Review reference you control, or the reviewer's name (see the note above) |
| 34 | `reviewDate` | Review date, `YYYY-MM-DD`, not in the future |

### 2.4 Draft banner on the four legal pages (4): nothing to send

| # | Page | Clears when |
|---|---|---|
| 35 | `/privacy/` | Items 1–34 (plus `representative.details` if 7 is `true`) are supplied in a valid form and the site is rebuilt. The banner, the "[to be supplied by the owner: …]" markers and the word "draft" then go. The live pages change only after a release you approve |
| 36 | `/terms/` | as above |
| 37 | `/disclosure/` | as above |
| 38 | `/complaints-policy/` | as above |

### 2.5 Reply template (copy, fill in what you know, send)

```
1  entity.name:
2  entity.type:
3  entity.country:
4  entity.registrationNumber:      (or not applicable)
5  entity.address:
6  controller.name:
7  representative.needed:          (true/false)
   representative.details:         (only if true)
8  governingLaw:
9  courts:
10 privacyAuthority:
11 complaintsBody:                 (or not applicable)
12 effectiveDate:                  (YYYY-MM-DD)
13 noticeVersion:
14 retention.backups:
15 retention.applicationRecords:  (not required: dashboard paragraph removed)
16 retention.complaints:
17 lawfulBasis.abuseDetection:
18 lawfulBasis.applications:     (not required: dashboard paragraph removed)
19 processors.mailbox:
20 processingLocation:
21 internationalTransfers:
22 under18Policy:
23 retention.enquiries:            approve / your wording
24 retention.candidateProfiles:    approve / your wording
25 retention.mailboxCopies:        approve / your wording
26 lawfulBasis.enquiries:          approve / your wording
27 lawfulBasis.candidateProfiles:  approve / your wording
28 complaints.acknowledge:         approve / your wording
29 complaints.reply:               approve / your wording
30 complaints.reviewer:            approve / your wording
31 complaints.review:              approve / your wording
32 legalReviewCompleted:           (true only after the review)
33 reviewedBy:                     (review reference, e.g. "Legal review ref. UMA-LR-01, record held by the owner")
34 reviewDate:                     (YYYY-MM-DD)
```

## 3. Google Search Console: domain property first

Menu names are from general product knowledge, not checked against Google's help pages from here (Google's sites are blocked in this environment). Follow what Google shows on the day.

**What the build and the server rules establish (checked 2026-10-24; the live host and public DNS cannot be reached from here):**
- **Preferred host:** `https://ukrainemedicaladmissions.com` (no `www`). Canonical tags and the sitemap take it from `site` in `site/astro.config.mjs`; robots.txt takes it from `SITE.url` in `site/src/lib/site.ts`. Both are set to this host.
- **HTTPS and `www`:** `site/public/.htaccess` lines 7–10 send `http://` and `www.` requests to `https://ukrainemedicaladmissions.com` with one 301. Legacy addresses and paths without the trailing slash take a second 301. Staging is exempt. Whether Hostinger applies the rule, whether the certificate covers both names (needed for `https://www.`) and whether a `www` DNS record exists can only be checked live.
- **Sitemap:** `https://ukrainemedicaladmissions.com/sitemap-index.xml`. It points to `sitemap-0.xml` with the 18 indexable pages. `/sitemap.xml` is not built (the local test answers 404), so do not submit that address. robots.txt allows everything except `/api/` and names the sitemap index.
- **Not in the sitemap, and `noindex`:** the 45 university preview pages, `/apply/thank-you/` and the 404 page.
- **Your DNS records:** I cannot read them from here, and I invent none. The only record to add is the TXT value that Google shows you in step 2.

**Now (no release needed):**

1. Open Search Console → **Add property** → **Domain** → enter `ukrainemedicaladmissions.com`.
2. Google shows a TXT value starting `google-site-verification=`. Add it at the DNS provider your domain's nameservers point to. Your domain registrar shows the nameservers; if you are not sure which company that is, send me a screenshot of that setting first.
   - **Adding the record:** a new TXT record, host `@` (or blank, as the provider asks), value exactly as shown, default TTL. If the provider keeps all TXT values at `@` as one record, add Google's value as an extra value. Never replace or remove the value that starts `v=spf1`.
   - **Leave everything else alone:** existing MX, A, CNAME and TXT records (SPF, DKIM, DMARC). Do not change the nameservers, and do not use any "connect", "point" or "transfer domain" option: those can replace every record, including e-mail.
   - This is a DNS change only you make. Done this way, it changes neither the website nor e-mail.
3. Back in Search Console, press **Verify**. If it fails, DNS may not have updated yet: wait and try again. If it still fails the next day, change nothing else and send me screenshots of Google's message and of the record. Once verified, keep the TXT record permanently: removing it un-verifies the property.
4. **Settings → Users and permissions:** stay Owner. Add anyone else as Restricted (read-only).
5. **First baseline, on the day of verification:**
   - Export Performance → Search results (last 16 months; Queries, Pages, Countries, Devices) and Indexing → Pages.
   - Use URL inspection on `/` and `/universities/` to see what Google holds today. Inspect only; do not press Request indexing.
   - Keep the files outside the repository while it is public and send them to me (`ANALYTICS_AND_SEARCH_CONSOLE.md` §A3).
6. **Sitemap: your choice; I recommend right after the release.** The live home page and `/universities/` show the old unverified Ternopil card: city, four programmes and "Verification in progress", and on `/universities/` also "English (pending)". Both pages are indexable. This is the `b2ca3d6` release you reported as deployed; I cannot open the live site from here.
   - Not submitting does not keep that card out of Google: that release's robots.txt already points Google to the same sitemap.
   - Waiting only avoids asking for a fresh crawl of the old version. Only a release you approve removes the card.
   - If you submit now, submit again after the release.

**After a release you approve:**

7. **Sitemaps** → submit `sitemap-index.xml` (`https://ukrainemedicaladmissions.com/sitemap-index.xml`). The release lists 18 pages and no university preview pages.
8. **URL inspection** → run **Test live URL**, then **Request indexing**, on these addresses in this order. `/` comes first as the entry page; it is not a SEMrush target. The rest follow the SEMrush priorities in `GOOGLE_READINESS_AUDIT.md`, "SEMrush evidence used" (existing exports, no new units).
   1. `/`
   2. `/tuition-fees/` (fees cluster, P0)
   3. `/universities/` (list and "best" cluster, P1)
   4. `/courses/medicine/` (MBBS cluster, P1)
   5. `/admissions/` (eligibility, P1)
   6. `/faq/` (validity, P2)

   Google limits indexing requests per day: if it refuses one, continue the next day. The sitemap covers the other pages.
9. **Spot-check one preview page** (for example `/universities/sumy-state-university/`) with URL inspection. It should say the page is excluded by `noindex`. That is correct: previews stay out of Google until their facts are verified.
10. A few days later, check **Indexing → Pages**: the 45 university preview pages carry `noindex`, so they should not appear as indexed. Repeat the step 5 export 28 days after the release.

**What can only be confirmed after the release goes live** (`npm run verify:live` from a computer that can reach the site, then Search Console):
- The 301s from `http://` and `www.` to the preferred host.
- The certificate and HSTS on live responses.
- Live status codes, headers and CSP.
- That the sitemap and robots.txt are served as built.
- That Google fetched the sitemap.
- Indexing and coverage.
- Real Core Web Vitals (field data needs real visitors over weeks).
- Delivery of form e-mails.

Until each of these is checked, none of them is confirmed.

I can report verification, sitemap status or indexing only from screenshots or exports you send; there is no Search Console connector here. If you would rather use a URL-prefix property, send only the token's `content` value; that route needs a release.

## 4. SEMrush: no calls planned

I am reusing the 42 exports and the 2026-10-12 check: 30 units, with a balance estimate of 43,740 (not confirmed). No metered call is needed for the work above.

The only call I would propose comes after a university's first facts are verified: about 5–10 keyword lines (roughly 50–100 units) for that university's programme and fee searches, to choose wording for its title and description. Before that call I need two things from you:
- your balance reading (Semrush Subscription info → API units, with the date; it costs nothing, and the ledger's standing rule requires it);
- your yes.

## 5. Milestones

**M1: first evidence pack (Bukovinian).**
- `npm run probe:access` shows the Bukovinian hosts (`www.bsmu.edu.ua`, `bsmu.edu.ua`, `vstup.bsmu.edu.ua`) and the two government hosts OPEN.
- Every Bukovinian P1 claim has an evidence entry with address, passage, document date, access date and status.
- `npm test` passes, and the publication report shows exactly which claims would be shown.
- A preview is rebuilt for you to inspect.

M1 needs §1 (or captures). It needs no release.

**M2: release (each step needs the one before).**
1. Items 1–34 are supplied (§2).
2. I rebuild. `npm run check:release` prints READY, and the full `npm run release:gate` passes (all tests, a clean build, the publication report, then that check). READY covers the legal pages and the university records only.
3. CI is changed to `expect: pass` and is green on that exact commit.
4. **Before anything is published:**
   - You take a dated backup of the live document root.
   - You create `uma-private/config.php` on the host (`OWNER_INPUT_NEEDED.md` §5, first row).
   - You complete the items in `SECURITY_AND_RELEASE_CHECKLIST.md` §A that apply.
5. You approve that exact commit.
6. `publish-production` moves. The workflow re-runs the release gate, then the host deploys.
7. Post-release checks follow: the live checks and the e-mail test (`OWNER_INPUT_NEEDED.md` §5, remaining rows), then §3 steps 7–10.

**Shortest route, 48-hour target (2026-10-24).** The technical work is done: every check except the legal readiness check passes on the branch head. Only §2 stands between the branch and an approvable release commit; the pre-publish steps in M2 step 4 (backup, private config) follow. The legal reviewer is the critical path.
- **Hour 0:**
  - You send item 3 first, then items 1, 2, 4, 5, 19 and 20 (group A, in the §2.0 order).
  - You book the reviewer with group C, items 6 and 14 and the reviewer brief (§2.0). Item 3 decides 6–11 together with the reviewer.
  - In parallel, you add the Search Console domain property and its TXT record (§3 steps 1–4; no release needed).
- **By hour 24:**
  - The reviewer settles items 6–11, 14–18 and 21–22, plus 23–27.
  - You approve or replace items 28–31.
- **Preview for the reviewer:**
  - I rebuild the four legal pages locally with your answers and send you the private preview copy (§2.3).
  - Items 12–13 (date and version) can be provisional until the text is final.
  - The reviewer reads the built pages and then signs.
- **When the review is signed:**
  - You send items 32–34.
  - I enter everything in one commit and run M2 steps 2–3.
  - I give you the commit hash.
  - You take the backup and create the private config, then approve.
  - Then come step 6, the live checks and §3 steps 7–10.

If the review cannot be finished within 48 hours, nothing is released: the gate stays closed. The branch head stays a release candidate that is technically valid but not legally cleared.

No deployment, DNS change, publication-gate bypass or move of the publishing pointer happens without your explicit approval.

## 6. Live site: form privacy risk (assessment 2026-10-16; nothing on the live site was changed)

**What the live release (11 October, `b2ca3d6`) does, read from its files:**
- The application and contact forms collect name, e-mail, country, course, university, qualification, start year and a free-text message, with a consent tick. No file upload exists, although the home page step says "Upload securely against a clear checklist".
- Each submission is stored as a file in `uma-private` (outside the web root if the host is set up as documented) and e-mailed to info@.
- The handler also stores `sha256(IP address + month)` with no secret key. With few enough IPv4 addresses to try them all, that hash can be reversed, so it is personal data, and the privacy notice does not mention it.
- The privacy notice shown is the old draft. It names no legal entity or data controller ("[Legal entity name … to be inserted.]"); it says aggregated analytics run (none is installed); it promises access records ("records of who accessed what") that do not exist; retention periods are "[to be confirmed]".
- The home page says "Verified & dated university information" and "Every fee, deadline and programme is checked against official university sources", although no university fact is verified.

**Assessment.** Any personal data collected now is collected without a named controller, under a notice that is inaccurate in three places, with an undisclosed reversible IP code, and possibly from applicants under 18. The release candidate fixes all of this except the owner and legal items, but it cannot go live until they are supplied. How serious the exposure is depends on how many people have actually submitted, which only you can see.

**Options (your decision; I change nothing on the live site):**

| Option | Effect | Trade-off |
|---|---|---|
| 1. **Pause the forms now (recommended)** | Collection stops at once; no personal data is stored or e-mailed until the release | Applicants are asked to e-mail instead; about five minutes in hPanel; fully reversible |
| 2. Release sooner | Fixes everything | Needs all of §2 first, so it is not immediate |
| 3. Leave as is | No work | Collection continues under the issues above |

**Option 1, step by step (you do this in hPanel; I have no access to the host. Menu names unverified):**
1. Open `public_html/api/` and download `enquiry.php` (your copy).
2. Rename it to `enquiry.php.original`.
3. Upload `ops/pause-forms/enquiry.php` from this repository into the same folder. It reads and stores nothing, sends no e-mail, and answers every submission with a short page asking people to write to info@ (HTTP 503, noindex). Checked here: `php -l` passes, and a test submission returned 503 and left no file behind.
4. Test: submit the contact form on the live site; you should see "Our online forms are paused".
5. **To undo:** delete the pause file and rename `enquiry.php.original` back to `enquiry.php`.

**Either way, also do this now:**
- Look in `uma-private/enquiries/` on the host and in the info@ mailbox for real submissions. Reply to anyone waiting, and with your reviewer decide what to keep. The `ip_hash` field in those files is the reversible code: deleting that field (or the files you do not need) reduces the risk.
- The release will replace the handler with the keyed version (no IP code at all without `ip_hash_key`), the accurate notice and pages without the unverified claims.

## 7. Release steps for your approval (only after §2 is complete)

Prepared now so that nothing waits once your answers arrive. Each step needs the one before; I do 1–3 and stop for your approval.

1. **I enter your answers** in `site/src/lib/legal.mjs` exactly as sent, run `npm run check:release` (must print READY, exit 0) and the full `npm run release:gate`.
2. **I switch CI to expect a pass** and push. CI must be green on that exact commit.
3. **I send you the release candidate:** commit, CI link, and the publication report (0 published universities; 17 previews, noindex).
4. **You take the backup** (`RELEASE_CHECKLIST_PROPOSED.md` 9.1). In hPanel, download a full archive of `public_html` and of `uma-private` (if it exists), store it off the server and never in Git, and record its SHA-256 (`shasum -a 256 <archive>` on macOS, `sha256sum <archive>` on Linux, `Get-FileHash <archive>` in PowerShell). Send me the date and the hash.
5. **You create the private configuration** (`EMAIL_DELIVERY_VERIFICATION.md` P3) on release day, right before you approve. Not earlier: the live handler already reads `uma-private/config.php` (`b2ca3d6`, `api/enquiry.php` line 26), so creating it early changes how the live forms behave. The backup in step 4 can be taken at any time, since it is a download only. Generate the key on your own computer (`openssl rand -hex 32`, or the PowerShell line in P3). Then, one level above `public_html`, create `uma-private/config.php` returning `notify_to`, `from`, `send_mail => true` and `ip_hash_key`, with permissions 600 for the file and 700 for the folder. Never send me the key; tell me only that it is done.
6. **You approve that exact commit** (by its hash, in this chat). Then I fast-forward `publish-production` to it (checked 2026-10-16: the current pointer `4d4e605` is an ancestor of the working branch, so no force-push is needed). The publish workflow re-runs the full release gate and, only if it passes, adds the built site to the `production` branch and tags the release. Hostinger then deploys `production`: automatically if auto-deploy is on, otherwise you click Deploy in hPanel → Websites → `ukrainemedicaladmissions.com` → Advanced → Git. No DNS change is needed or made.
7. **After the deploy (who does what):**
   - *Live checks* (`npm run verify:live`): this environment cannot reach the live site (2026-10-16: both `ukrainemedicaladmissions.com` and `www.ukrainemedicaladmissions.com` refused). Add those two hosts under Allowed domains (§1) and I run it; or run `cd site && npm run verify:live` on your computer and send me the output.
   - *E-mail delivery* (`EMAIL_DELIVERY_VERIFICATION.md` §4–7, both forms): I can send the synthetic test submissions once the live host is allowed; you confirm the messages arrived in info@ (only you can open that mailbox), and I check the stored records with you.
   - *Search Console* (§3): you add the domain property and submit `https://ukrainemedicaladmissions.com/sitemap-index.xml` in your Google account; send me a screenshot of the result. I never claim indexing until Search Console shows it.
   - *If anything fails:* restore the step 4 backup (`RELEASE_CHECKLIST_PROPOSED.md` 11.4) and pause auto-deploy so the next pull does not overwrite it.

### 7.1 Exact deploy commands (2026-10-24; each runs only after your approval of that exact commit)

`X` is the release commit. It sits on top of the branch head (site code as tested in `7a0aef3`; later commits change documents only), holds your legal answers and switches CI to `expect: pass`. `7a0aef3` itself cannot pass the gate.
1. **Before you approve:**
   - On `X`, `cd site && npm run check:release` prints READY and `npm run release:gate` prints `RELEASE GATE: PASSED`.
   - CI is green on `X`.
2. **Pointer check:** `git fetch origin && git merge-base --is-ancestor origin/publish-production X`. It must succeed, so the move is a fast-forward. Today the pointer is `4d4e605`, an ancestor of `7a0aef3`.
3. **Deploy:** `git push origin X:refs/heads/publish-production`, with no `--force`.
   - The push starts "Publish deploy branch" with target `production`; pushing to `publish-production` counts as the PUBLISH confirmation.
   - The workflow re-runs the full release gate on `X` and stops if anything fails.
   - It then adds one commit holding only the built site on top of `production` and tags the release `release-<UTC stamp>`.
4. **Host:** Hostinger deploys the new `production` commit, automatically or when you click Deploy (hPanel → Websites → ukrainemedicaladmissions.com → Advanced → Git). No DNS change.
5. **Record:** the new `production` commit, the release tag and the workflow run link.

### 7.1a Interim release (authorised 2026-10-25; `RELEASE_AUTHORISATION.md`)

Until the legal review is recorded, a release can go out in **interim mode**: the same full test suite, clean build and publication report, with the four legal pages published as drafts (banner and visible markers, as the live site has shown since 11 October). Command: `git push origin <commit>:refs/heads/publish-production-interim`. The gate still refuses if any check but the open legal items fails, if a legal page is built without the draft banner, or if the authorisation file is missing. The open legal items stay listed in `npm run check:release`; nothing is marked satisfied. Once the review is recorded, use `publish-production` (§7.1) and the authorisation ends.

### 7.2 Rollback (decided by you at the time; fastest first)

- **R1. Put the previous build back exactly (about 2 minutes plus the host pull).** This writes a new commit on `production` whose files are identical to today's live build `b2ca3d6`. It is a fast-forward, with no force-push:
  1. `git fetch origin production`
  2. `C=$(git commit-tree b2ca3d6^{tree} -p origin/production -m "Rollback: restore build b2ca3d6")`
  3. `git push origin "$C:refs/heads/production"`

  Then Hostinger deploys it (auto, or click Deploy). It restores bytes that were already live, so no new content is released. It brings back the old Ternopil card, so treat it as the last resort for a broken site.
- **R2. Restore the step 4 backup** in hPanel (whole document root), then pause auto-deploy so the next pull does not overwrite it. Use this if the host itself misbehaves.
- **R3. Only the forms are failing:** rename `public_html/api/enquiry.php`. Form posts then answer 404 and the rest of the site stays up.
- Not recommended: re-publishing the old source `4d4e605` through the workflow (`RELEASE_CHECKLIST_PROPOSED.md` 11.2). It re-runs old date-dependent tests and can refuse.

### 7.3 Staging: not used

Owner decision 2026-10-24: no staging website. Releases go straight from the release gate to the existing production site (§7.1).

## 8. Hostinger account facts to read in hPanel (2026-10-24)

The privacy notice must name the provider that stores the data, where it stores it, and what it logs. None of this is recorded in the repository, and this environment cannot open hPanel or Hostinger's site. Menu names change, so look for the wording below rather than an exact path.
- Send screenshots or copied text, never passwords.
- Screenshots that show account numbers, billing addresses or payment cards are fine to send me, but they stay out of Git.
- Write "not shown" where hPanel gives no answer: that becomes a question for Hostinger support, never a guess.

| # | What to find | Where to look | Why |
|---|---|---|---|
| H1 | **The Hostinger company you contract with**: its exact legal name and country | Any invoice or receipt under Billing (the seller named at the top); the Terms of Service or Data Processing Agreement linked from your account | It is the processor named in the notice (items 19–20) |
| H2 | **Whether a Data Processing Agreement covers your account**, and a copy or link with its date | Hostinger's legal pages (DPA), or ask support "which DPA applies to my account" | Shows whether written processing terms exist; also a reviewer question |
| H3 | **Server or data-centre location of the hosting plan** that serves ukrainemedicaladmissions.com | The website's dashboard or plan details in hPanel (look for "server location" or "data center") | Where submissions are stored (item 20); possible transfer abroad (item 21) |
| H4 | **Which email product runs info@**: Hostinger's own email, or a partner email service shown inside hPanel | hPanel → Emails: the product name on the mailbox page; and the domain's MX records in the DNS zone, as a screenshot of the MX lines only | If a partner service runs the mailbox, that company is a second processor (item 19) |
| H5 | **Where that mailbox stores mail** (country or region), if shown | The email product's settings, or its own terms | Item 20 |
| H6 | **Forwarding**: whether info@ forwards to, or is read through, any other mailbox or app (for example a personal Gmail account) | Mailbox settings: forwarding and auto-reply; and which devices or apps read it | Any other service holding copies must be named |
| H7 | **Website access logs**: whether they exist, what they show (IP address, page, time, browser) and how long they are kept | hPanel website section: "Access logs", "Statistics" or "Logs"; or ask support | The notice must describe them (brief 3.5) |
| H8 | **PHP error logs**: whether they exist, where, and how long they are kept | The same logs area, or ask support | The form handler writes a reference number there if an email fails |
| H9 | **Mail logs**: whether delivery logs exist for the mailbox, what they show and how long they are kept | The email section (look for "logs" or "delivery"), or ask support | The notice must describe them |
| H10 | **Backups**: how often, how many are kept and for how long, and whether files *outside* public_html are included (the private form storage, uma-private, sits one level above public_html) | hPanel → Backups for the website | Item 14 (backups) |
| H11 | **Who can sign in**: hPanel users or collaborators, FTP/SFTP and SSH accounts, and who can read info@ | Account access or collaborator settings; FTP and SSH accounts; the email account list | The notice says access is limited to the people who need it |
| H12 | **Document-root path** (the folder that holds public_html), for creating uma-private/config.php on release day | File Manager, top-level folders | Release step 5 |

**Registration status (owner statement 2026-10-24, later the same day).** The owner states the legal form is ФОП (Ukrainian individual entrepreneur), subject to confirmation against the registration documents.
- The legal form stays marked as pending until that confirmation; the registration number is left open until read from the documents (never invented).
- In the private preview they carry a "proposed" marker; in the repository they remain open.
- **Postal address:** it stays unresolved until the reviewer confirms what must be disclosed and recommends a lawful correspondence-address option. No address is invented or published.

## 9. Owner decisions recorded on 2026-10-24 (later the same day)

Recorded as stated; none of them completes a gate item by itself.
- **Legal form:** ФОП, as stated by the owner; documentary confirmation still required. Entered at release only once confirmed.
- **Registration number:** pending until read from the registration documents. Never invented or inferred.
- **Correspondence address:** unresolved until the qualified Ukrainian reviewer confirms the disclosure required and a lawful option. No residential address is published; no address is invented.
- **Bank details:** private; never in pages, Git, build output, metadata, reports or examples.
- **Data deletion:** the owner's *proposal* is a weekly review and deletion of eligible enquiry records and mailbox copies. It is not an approved retention policy: it stays subject to a legally approved retention policy and to confirmation of what may lawfully be deleted. Items 23–25 therefore remain proposals.
- **Privacy notice version:** 1.0 (item 13), entered at release.
- **Effective date (item 12):** 24 October 2026 only if the pages are published that day. If publication is later, the date is flagged for confirmation and set to the actual date; the notice is never backdated.
- **Complaint timescales and second-stage reviewer (items 28–31):** retained as proposals pending qualified review and the owner's approval.
- **Services page:** the planned-dashboard wording is removed; no dashboard functionality is described as an existing or planned service.
- **Legal review:** all four legal pages stay drafts until a qualified reviewer has reviewed the wording and the sign-off is recorded (items 32–34).

