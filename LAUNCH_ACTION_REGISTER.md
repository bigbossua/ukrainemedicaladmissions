# Launch readiness and organic growth: action register (26 October 2026)

Status labels: **Confirmed** = checked by me with the evidence named. **Confirmed by owner** = checked by you on the live site or in hPanel and reported to me (I cannot see it myself). **Not tested** = this environment cannot reach it, and it is never assumed to work. **Needs you** = your access, decision or professional advice.

This environment's network proxy refuses `ukrainemedicaladmissions.com` (with and without `www`, http and https), Google Search Console, GA4, Google Trends, Hostinger and every official university host (all checked 26 October). SEMrush reports no API units (trace f54801d70b3c9174e0fc8e4a1c773352; ledger updated). Every live statement below is **Not tested** unless marked **Confirmed by owner**.

**Update, 26 October (owner checks):** the Hostinger deployment is confirmed in hPanel, and the live `/apply/thank-you/` shows the wording released in `053cee0` (the reply address info@ukrainemedicaladmissions.com, the spam-folder instruction, the documents-list link and the statement that nothing is sent to a university automatically). That wording first appears in commit `30f8dea`, so the live site serves this release. Form processing, private-storage protection and email delivery remain **Not tested**.

## 1. Current status and evidence

| Area | Status | Evidence |
|---|---|---|
| Source of the current release | **Confirmed** | `claude/university-profile-pipeline` at `053cee0`; release pointer `publish-production-interim` at `053cee0` |
| Production branch | **Confirmed** | `production` at `5048eb1` "Build 053cee0", tag `release-20261026-210314`, interim mode (legal pages published as drafts). Its file tree (`a05a56e`) is identical to the build tested locally |
| CI and release gate | **Confirmed** | Site CI runs 69, 70 and 71 passed; publish run 6 passed the full release gate in interim mode |
| Hostinger deployment | **Confirmed by owner** (26 October) | Confirmed in hPanel; consistent with the live thank-you wording below |
| Live thank-you page wording | **Confirmed by owner** (26 October) | Reply address, spam-folder instruction, documents-list link and "no automatic university application" all visible on the live `/apply/thank-you/` |
| Other live pages (home, directory, profiles, FAQ, contact, apply) | **Not tested** | Proxy refusal. The same build passed locally: 65 pages × 3 widths, 12 pages × 6 mobile widths, accessibility at 0 violations |
| Live form processing (submit → stored record → thank-you page) | **Not tested** | Inference, not a test: the handler sends a notification only after the record file is written (a failed write stops with a 500 page and no email), so the real notifications above imply that live records are being stored. No live access. Locally, the real handler stored both journey submissions outside the web root (journey test, 68 checks) and passed 196 handler checks covering validation, errors, rate limits, the honeypot and timing. Live check: T3 |
| Live private-storage protection (`uma-private/` outside `public_html`, never served) | **Not tested** | The rule (`RedirectMatch 404 ^/uma-private`) and the storage location are confirmed in the code only. Live check: T5 |
| Live email notification | **Not tested** (delivery unreliable on the owner's evidence) | Owner, 27 October: real notifications from no-reply@ukrainemedicaladmissions.com reach info@, one in the inbox and four in Spam (some repeated for one sender name), and a "Mail Delivery System" bounce sits in the inbox. So `mail()` runs on the live host, but placement and authentication are unproven. Investigation and checks: `EMAIL_DELIVERY_VERIFICATION.md` §8 (observations of 28 October in §8.5; causes still unconfirmed). Live check: T3 |
| Thank-you page "only after success" | **Confirmed, with two by-design exceptions** | It is shown after a stored submission (303 redirect). It is also shown when the handler silently drops a suspected bot (honeypot filled, or the page open for under 3 seconds; on the working branch since 29 October also a post without the forms' hidden fields), so bots learn nothing. The URL is static, so anyone can open it directly; it is noindex and claims nothing about a specific person. A missing field gives a 422 page, too many submissions a 429, and a storage failure a 500, never the thank-you page |
| Sitemap and robots | **Confirmed (build)** | 18 URLs, valid XML, one child sitemap, all on the https production host, 0 profiles; `robots.txt` points to the index and disallows `/api/` |
| Search Console | **Not tested** | No verification file or meta tag in the site, so ownership must be via DNS. You reported the sitemap as "Success, 18 discovered" |
| GA4 | **Confirmed: not installed** | No analytics code in the build. The security policy allows scripts from this site only |
| University profiles | **Confirmed** | 45 research previews, all `noindex, follow`, none in the sitemap, 0 verified facts (`research/verification/VERIFICATION_STATUS.md`) |
| Legal pages | **Confirmed** | All four show "Draft for legal review"; 40 release items open (section 4; 36 until 29 October) |

## 2. Critical blockers

1. **Form processing, private-storage protection and email delivery are unproven on the live site.** The deployment itself is confirmed (owner, 26 October). Action: T3 and T5 in section 5.
2. **Legal and ownership details are missing** (40 items, section 4). The privacy notice cannot become final, and the final release gate stays closed.
3. **No official university source is reachable** (0 of 88 hosts). No profile can be verified, indexed or added to the sitemap.
4. **No measurement exists.** There is no analytics, and Search Console data has not been shared. Organic performance and conversion are unknown.

## 3. Actions I can complete without your input

None of these needs a production release; each would wait for your approval to ship.

| # | Action | Why | Effort |
|---|---|---|---|
| S1 | Branded 422, 429 and 500 pages (header, plain explanation, link back to the form). Today they are unstyled HTML or plain text | A student who hits an error should still see a trustworthy page | Small |
| S2 | Retention purge script that lists and deletes records older than the approved period, plus written steps for handling a deletion request | Retention is in the privacy notice but nothing enforces it. Built only after you approve the periods (L21–L23) | Small |
| S3 | Weekly report template (below), filled from your Search Console export and a count of stored records | Your Phase 5 report | Done below |
| S4 | Evidence register by topic | Your Phase 3 register | **Done**: `VERIFICATION_STATUS.md` "Evidence by topic" (45 universities, 63 programme entries, 0 verified for availability, language, fees, requirements or deadlines; no current-year statement) |
| S5 | Directory → FAQ link, larger checkboxes, tablet header, clearer thank-you page | Student journey | **Done and released** in `5048eb1` |

## 4. Questions and approvals required from you

### 4a. The 40 open release items

Grouped by the review flags in `site/src/lib/legal.mjs`, by whether a draft value exists, and by whether the value itself is a legal determination (E); the grouping is a judgement, not only the flags (corrected 29 October, audit F5 and review of the fixes): **A Owner fact** (9): only you can supply it, no review flag. **B Owner value + legal review** (7): you supply the value, a lawyer checks it; no draft exists. **C Draft: owner approval + legal review** (5): approve or replace the draft wording, then a lawyer checks it. **D Draft: owner approval** (4). **E Legal advice and sign-off** (11): a legal determination, decided with your reviewer. **F Technical** (4): clears automatically. Total 40 (36 until 29 October; L37 and L40 came with WhatsApp, L38–L39 with audit F3).

**Conditional items, not required today:** answering L7 "yes" adds the representative's name and address; accepting documents adds the retention and lawful basis for application records; referral payments add their details; paid services add their terms. No value is filled in by Claude, and no item is marked compliant without your input.

| # | Item (field in `site/src/lib/legal.mjs`) | Who |
|---|---|---|
| L1 | Legal name of the person or company running the service (`entity.name`) | A Owner fact |
| L2 | Legal form, e.g. sole trader or limited company (`entity.type`) | A Owner fact |
| L3 | Country of registration or operation (`entity.country`) | A Owner fact |
| L4 | Registration number, or "not applicable" (`entity.registrationNumber`) | A Owner fact |
| L5 | Published postal address for formal requests (`entity.address`) | A Owner fact |
| L6 | Data controller's name (`controller.name`) | B Owner value + legal review |
| L7 | Whether a UK or EU representative is required (`representative.needed`) | E Legal advice and sign-off |
| L8 | Governing law of the terms (`governingLaw`) | E Legal advice and sign-off |
| L9 | Courts for disputes (`courts`) | E Legal advice and sign-off |
| L10 | Data-protection authority people can complain to, with its web address (`privacyAuthority`) | E Legal advice and sign-off |
| L11 | Outside body for unresolved complaints, or "not applicable" (`complaintsBody`) | E Legal advice and sign-off |
| L12 | Date the pages take effect (`effectiveDate`) | A Owner fact |
| L13 | Privacy notice version number (`noticeVersion`) | A Owner fact |
| L14 | Whether backups hold form submissions, and for how long (`retention.backups`) | B Owner value + legal review |
| L15 | Retention period for complaint records (`retention.complaints`); no draft value exists | B Owner value + legal review |
| L16 | Lawful basis for keeping the submission time and keyed IP code (`lawfulBasis.abuseDetection`) | E Legal advice and sign-off |
| L17 | Business mailbox provider (`processors.mailbox`) | A Owner fact |
| L18 | Countries where the hosting provider, the mailbox provider, WhatsApp (Meta) and any chat-backup provider store or process the data (`processingLocation`) | B Owner value + legal review |
| L19 | International transfers, including through WhatsApp (Meta) or a chat-backup provider, and the safeguard used (`internationalTransfers`) | E Legal advice and sign-off |
| L20 | Rule for applicants under 18 (`under18Policy`) | E Legal advice and sign-off |
| L21 | Enquiry retention; the draft proposes "up to 12 months after our last contact" (`retention.enquiries`) | C Draft: owner approval + legal review |
| L22 | Candidate-profile retention; the draft proposes the same (`retention.candidateProfiles`) | C Draft: owner approval + legal review |
| L23 | Mailbox-copy retention; the draft proposes "the same period as the stored record" (`retention.mailboxCopies`) | C Draft: owner approval + legal review |
| L24 | Lawful basis for replying to enquiries; the draft proposes consent plus pre-contract steps (`lawfulBasis.enquiries`; the privacy draft shows the same value for WhatsApp messages) | C Draft: owner approval + legal review |
| L25 | Lawful basis for candidate profiles; the draft proposes the same (`lawfulBasis.candidateProfiles`) | C Draft: owner approval + legal review |
| L26 | Complaint acknowledgement time; the draft proposes 3 working days (`complaints.acknowledge`) | D Draft: owner approval |
| L27 | Full complaint reply time; the draft proposes 15 working days (`complaints.reply`) | D Draft: owner approval |
| L28 | Complaint reviewer; the draft proposes "the business owner" (`complaints.reviewer`) | D Draft: owner approval |
| L29 | Review-stage reply time; the draft proposes a further 10 working days (`complaints.review`) | D Draft: owner approval |
| L30 | Legal review recorded as completed (`legalReviewCompleted`) | E Legal advice and sign-off |
| L31 | Reviewer named (`reviewedBy`) | E Legal advice and sign-off |
| L32 | Review date (`reviewDate`) | E Legal advice and sign-off |
| L37 | How long WhatsApp conversations are kept (`retention.whatsappMessages`; added 29 October with the WhatsApp channel) | B Owner value + legal review |
| L38 | What the host's server, error and mail logs record and how long they are kept (`retention.hostLogs`; added 29 October, audit F3; read it in hPanel, OWNER_ACTION_SHEET.md H7–H9) | B Owner value + legal review |
| L39 | How long e-mails sent to us directly are kept, e.g. complaints and rights requests (`retention.correspondence`; added 29 October, audit F3) | B Owner value + legal review |
| L40 | Which WhatsApp service you use (WhatsApp or WhatsApp Business app on a phone, or the WhatsApp Business Platform through a provider) and where the conversations and any chat backups are kept, e.g. only on the phone, or also in Google Drive or iCloud (`processors.whatsapp`; added 29 October, review of the WhatsApp change) | A Owner fact |
| L33–L36 | The draft banner and placeholders on `/privacy/`, `/terms/`, `/disclosure/` and `/complaints-policy/` | F Technical (clears automatically): the build and the release gate clear them once L1–L32 and L37–L40 are recorded |

The order to complete them is in `LEGAL_COMPLETION_CHECKLIST.md`. The legal pages stay drafts until L30–L32 are genuinely recorded.

### 4b. Decisions

| # | Question | Why it matters |
|---|---|---|
| Q1 | Analytics: GA4 (needs a cookie-consent banner, a security-policy change and a privacy-notice change) or a cookieless first-party event count (`ANALYTICS_AND_SEARCH_CONSOLE.md` §B)? | Without one, application starts cannot be measured; only completed enquiries can be counted |
| Q2 | Approve S1 (error pages) and, after L21–L23, S2 (retention purge) for the next release? | The next release ships only on your approval |
| Q3 | Does `uma-private/config.php` on the server set `ip_hash_key`? (Answer yes or no only; never send the value) | Without it, the 5-per-hour per-IP limit is off and only the 100-per-hour site limit applies |
| Q4 | Official-source access: allow the 88 hosts in `research/verification/ALLOWLIST_ALL.txt` in this environment's network settings, or send captures (`OWNER_ACTION_SHEET.md`)? | It is the only route to verified, indexable university profiles |

## 5. Tests and evidence required before the next production release

| # | Test | Who | Pass condition |
|---|---|---|---|
| T1 | Full suite `npm test`, CI on the release commit, release gate (publish workflow) | Me | All green, as for `053cee0` |
| T2 | Confirm the live build | You | **Done 26 October**: deployment confirmed in hPanel; new thank-you wording visible |
| T3 | Live test enquiry through Apply Online: name `TEST – please ignore`, your own email address, field of study "Not decided yet", consent ticked | You | Thank-you page shown; a new `.json` file in `uma-private/enquiries/` with today's date in its name; notification email received at info@ (check spam) |
| T4 | Live error state. The browser blocks an incomplete form, so test the server directly, sending the two hidden fields as the real form does: `curl -s -o /dev/null -w "%{http_code}\n" -X POST -d "type=enquiry&name=TEST&email=test@example.com&message=TEST&website=&ts=" https://ukrainemedicaladmissions.com/api/enquiry.php` (consent left out) | You | `422`; no new file in `uma-private/enquiries/`. (Without `website=&ts=` the handler on the branch since 29 October answers 303 and drops the post as not sent by the site.) |
| T5 | Private storage is not public. (a) File Manager: `uma-private` sits next to `public_html`, not inside it. (b) From any computer, each of these prints `404` (or `403`), never `200`: `for p in uma-private/ uma-private/enquiries/ uma-private/config.php uma-private/ratelimit/; do curl -s -o /dev/null -w "$p %{http_code}\n" "https://ukrainemedicaladmissions.com/$p"; done`. Read-only: it stores and reveals nothing | You | (a) true; (b) 404 or 403 for all four |
| T6 | Live checks script `node site/scripts/verify-live.mjs https://ukrainemedicaladmissions.com`, run on a machine that can reach the site | You, or Claude on your computer | 0 failures |
| T7 | Search Console URL Inspection → Test live URL for `/`, `/universities/` and one profile | You | First two indexable; the profile "Excluded by noindex" |

## 6. First SEO opportunities supported by research

Source: the 45 SEMrush exports, checked line by line (`KEYWORD_URL_MAP.md` §20). No Search Console, GA4 or Trends data was available. Volumes are monthly (SEMrush), India database unless stated. Exact and broad figures are never added.

| Priority | Opportunity | Evidence | Page | Blocked by |
|---|---|---|---|---|
| 1 | Verified university profiles for the 12 names with exact demand of 100 or more | Exact `in`: IEU 590, Bukovinian 480, Kharkiv NMU 390, Odesa NMU 390, Vinnytsia 390, Lugansk 390 (ambiguous), Bogomolets 320, Ivano-Frankivsk 210, Kyiv MU 140 (ambiguous), Uzhhorod 140, Ternopil 110, Sumy 110. SERPs measured for Bukovinian and Pirogov: university domains, Wikipedia, agencies | Existing preview URLs, indexed only after the publication gate | Q4 (official sources) |
| 2 | One official, dated fee schedule on `/tuition-fees/` | "mbbs in ukraine fees" 260 exact (kd 7, the lowest kd at 100+); "ukraine medical college fees" 590 broad; SERP shows agencies and Quora | `/tuition-fees/` (existing) | Q4 |
| 3 | `/courses/medicine/` with verified programme rows | "mbbs in ukraine" 260 exact (kd 18); "ukraine mbbs college" 480 broad (kd 7); SERP 10/10 agencies | Existing | Q4 |
| 4 | Directory as the list page | "ukraine medical college" 2,900 broad; "… list" 210 broad; "best …" 390 broad; Wikipedia's list ranks #1 | `/universities/` (existing; we never rank) | Needs at least 3 verified profiles |
| — | Target countries | India first (all of the above); UK second (names up to 90, "study medicine in ukraine" 30); Nigeria, Pakistan, UAE and South Africa only for university names (10–40). Egypt, Morocco, Azerbaijan, Georgia, Turkey, Bangladesh and Ghana: only the English head term was measured (0–20) | No new country pages | Search Console country data |

No new page is proposed. Every measured question already has an answer on an indexable page, and new country or topic guides lack demand or verified facts.

## Weekly organic report (definition)

Every Monday, for the previous 7 days compared with the 7 before. Counts only: no names, emails or messages.

| Section | Metric | Source |
|---|---|---|
| Search visibility | Impressions, clicks, CTR, average position; top 10 queries; top 10 pages; top 5 countries | Search Console → Performance |
| Indexing | Indexed pages (target: the 18 sitemap URLs); "Excluded by noindex" (expected: 45 previews); sitemap status | Search Console → Pages, Sitemaps |
| Enquiries | New records in `uma-private/enquiries/` by type (enquiry, application-start); any record with `"notification": "failed"` | Server file count |
| Conversion | Application starts and completions | Not available until Q1 is decided |
| Changes | Releases, newly verified profiles and fees in the week | Git tags, `VERIFICATION_STATUS.md` |
