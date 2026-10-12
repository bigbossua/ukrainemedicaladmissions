# Owner action sheet

**12 October 2026 · branch `claude/university-profile-pipeline` · production unchanged · not legal advice**

| | Today |
|---|---|
| Official sources | **Blocked.** All 20 hosts below refused by the network policy (re-tested 10:07 UTC) |
| Evidence received | **None.** No captures, no access, no verified fact |
| Release gate | **NOT READY:** the 38 items in §2 |
| Google | Nothing verified, submitted or indexed |

Background and every other open question: `OWNER_INPUT_NEEDED.md`. Pages to capture if you cannot allow the hosts: `research/verification/CAPTURE_REQUEST_2026-10-12.md` §2–§3.

## 1. Allow 20 hosts (unlocks university verification)

1. In the session title bar, open the cloud environment menu → **Edit**.
2. **Network access** → **Allowed domains** (shown under the *Limited* level; older apps show it under *Custom*). Keep **Allow package managers** ticked.
3. Paste the 20 hosts below, one per line, and save. Docs: https://code.claude.com/docs/en/cloud-environments#network-access
4. Tell me "hosts added". I run `npm run probe:access` (from `site/`). If this session still reports them blocked, start a new session on this branch; whether a running session picks up the change is not confirmed.

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

These cover every official address in the capture request (tested by `npm run test:allowlist`). Not needed yet: the NAQA and EDEBO-info hosts (programme accreditation, a later claim) and the two production hosts (live checks after a release); both are in the capture request §1.

**What I do once the hosts answer.** Order: Bukovinian, Odesa, Kharkiv, Bogomolets, Ivano-Frankivsk, Uzhhorod, Ternopil, then Vinnytsia (research priority from search demand, not a statement that any of them is admitting). For each, P1 pages first: the government register card, official name and contacts, a dated 2026/27 teaching statement, the Medicine admission rule for foreign applicants, the fee page. Each reading is one evidence entry: address, the exact passage, the document's date, the access date and a status (verified, silent, not found, conflict). Ukrainian registration, programme accreditation and recognition abroad stay separate claims. Profiles stay noindex and unpublished until the publication gate passes and you approve a release.

## 2. The 38 items the release gate lists

Numbered exactly as `node scripts/release-readiness.mjs` prints them. **R** = a qualified legal reviewer must check the answer. Fill in the reply template (§2.5) and send it; I enter the answers word for word. Or edit `site/src/lib/legal.mjs` yourself. "TBC", "???" or anything in square brackets counts as not supplied.

**Order:** item 3 (country) first, because it decides 7–11, 20 and 21. Then 1–2 and 4–5, 19 (mailbox provider), the reviewer items, the timescales (23–31), the date and version (12–13) last, and the review (32–34) at the very end.

### 2.1 Missing details (22)

| # | Field in `legal.mjs` | Send | R |
|---|---|---|---|
| 1 | `entity.name` | Legal name of the person or company that runs the service | |
| 2 | `entity.type` | Legal form (for example sole trader, limited company) | |
| 3 | `entity.country` | Country of registration | |
| 4 | `entity.registrationNumber` | Registration number, or `not applicable` | |
| 5 | `entity.address` | Registered or business postal address | |
| 6 | `controller.name` | Name of the data controller | R |
| 7 | `representative.needed` | `true` or `false`: is a UK or EU representative required? If `true`, also send `representative.details` (name and postal address), which becomes a 39th item | R |
| 8 | `governingLaw` | Law that governs the terms | R |
| 9 | `courts` | Courts that decide disputes | R |
| 10 | `privacyAuthority` | Data-protection authority people can complain to, with its web address | R |
| 11 | `complaintsBody` | Outside body for unresolved complaints, or `not applicable` | R |
| 12 | `effectiveDate` | Date the legal pages take effect, `YYYY-MM-DD` | |
| 13 | `noticeVersion` | Privacy notice version number | |
| 14 | `retention.backups` | Whether backups hold form submissions, and how long backups are kept | R |
| 15 | `retention.applicationRecords` | How long application records are kept after an application ends | R |
| 16 | `retention.complaints` | How long complaint records are kept | R |
| 17 | `lawfulBasis.abuseDetection` | Lawful basis for keeping the submission time and the keyed IP code | R |
| 18 | `lawfulBasis.applications` | Lawful basis for application documents (future dashboard) | R |
| 19 | `processors.mailbox` | Company that provides the info@ mailbox | |
| 20 | `processingLocation` | Countries where Hostinger and the mailbox provider store data | R |
| 21 | `internationalTransfers` | Whether personal data goes abroad, and the safeguard used | R |
| 22 | `under18Policy` | Rule for applicants under 18 | R |

### 2.2 Draft wording to approve or replace (9)

Write `approve` to keep the draft exactly, or give your own wording.

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

After the reviewer has read the four built pages with your answers in place:

| # | Field | Send |
|---|---|---|
| 32 | `legalReviewCompleted` | `true`, only once the review is done |
| 33 | `reviewedBy` | Reviewer's name |
| 34 | `reviewDate` | Review date, `YYYY-MM-DD` |

### 2.4 Draft banner on the four legal pages (4): nothing to send

| # | Page | Clears when |
|---|---|---|
| 35 | `/privacy/` | Items 1–34 are complete. The banner and the "[to be supplied by the owner: …]" markers then disappear on their own |
| 36 | `/terms/` | as above |
| 37 | `/disclosure/` | as above |
| 38 | `/complaints-policy/` | as above |

### 2.5 Reply template (copy, fill in, send)

```
1  entity.name:
2  entity.type:
3  entity.country:
4  entity.registrationNumber:
5  entity.address:
6  controller.name:
7  representative.needed:          (true/false)
   representative.details:         (only if true)
8  governingLaw:
9  courts:
10 privacyAuthority:
11 complaintsBody:
12 effectiveDate:                  (YYYY-MM-DD)
13 noticeVersion:
14 retention.backups:
15 retention.applicationRecords:
16 retention.complaints:
17 lawfulBasis.abuseDetection:
18 lawfulBasis.applications:
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
33 reviewedBy:
34 reviewDate:                     (YYYY-MM-DD)
```

## 3. Google Search Console: domain property first

Menu names are from general product knowledge, not checked against Google's help pages from here (Google's sites are blocked in this environment). Follow what Google shows on the day.

**Now (no release needed):**

1. Open Search Console → **Add property** → **Domain** → enter `ukrainemedicaladmissions.com`.
2. Google shows a TXT value starting `google-site-verification=`. At the company that runs the domain's DNS, add a **new** TXT record: host `@` (or blank, as that provider asks), value exactly as shown, default TTL. Do not edit or delete existing records (MX, SPF, A, CNAME). This is a DNS change only you make. It changes neither the website nor e-mail routing.
3. Back in Search Console, press **Verify**. If it fails, DNS may not have updated yet: wait and press Verify again.
4. **Settings → Users and permissions:** stay Owner; add anyone else as Restricted (read-only).
5. **Do not submit the sitemap yet.** The live home page and `/universities/` (both indexable) still show the old unverified Ternopil card (city, four programmes, "English (pending)"). Submitting now asks Google to crawl that version. The release replaces it.

**After a release you approve:**

6. **Sitemaps** → submit `sitemap-index.xml` (`https://ukrainemedicaladmissions.com/sitemap-index.xml`). The release lists 18 pages and no university preview pages.
7. **URL inspection** → `/`, `/universities/`, `/tuition-fees/` → **Request indexing** for each.
8. A few days later, **Indexing → Pages**: the 12 university preview pages should be reported as excluded by the noindex tag.
9. Baseline export: Performance (last 16 months), Pages and Sitemaps (`ANALYTICS_AND_SEARCH_CONSOLE.md` §A3). Keep exports outside the repository while it is public.

I can report verification, sitemap status or indexing only from screenshots or exports you send. There is no Search Console connector here. For a URL-prefix property instead, send only the token's `content` value. That route needs a release.

## 4. SEMrush: no calls planned

I am reusing the 42 exports and the 2026-10-12 check (30 units; balance estimate 43,740, not confirmed). No metered call is needed for the work above. The only call I would propose, with your yes first: after a university's first facts are verified, about 5–10 keyword lines (roughly 50–100 units) for that university's programme and fee searches, to choose wording for its title and description. Not before. Sending the balance from Semrush's subscription page costs nothing.

## 5. Next verifiable milestone

**M1: first evidence pack (Bukovinian).**

- `npm run probe:access` shows the 20 hosts OPEN.
- Every Bukovinian P1 claim has an entry with address, passage, document date, access date and status.
- `npm test` passes, and the publication report shows exactly which claims would be shown.
- A preview is rebuilt for you to inspect.

M1 needs §1 (or captures). It needs no release.

**M2: release.** Items 1–34 done → `npm run check:release` prints READY → you approve → `publish-production` moves → post-release checks (`OWNER_INPUT_NEEDED.md` §5) → §3 steps 6–9.

No deployment, DNS change, publication-gate bypass or move of the publishing pointer happens without your explicit approval.
