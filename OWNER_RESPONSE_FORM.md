# Owner response form: legal and privacy details (40 open items)

**30 October 2026 · branch `claude/university-profile-pipeline` · not legal advice · nothing below is filled in for you**

The release check (`npm run check:release`) lists **40 open items**: 24 details nobody has supplied, 9 draft wordings waiting for your approval, 3 legal-review fields and the "Draft for legal review" banner on 4 pages. This form asks for them in four kinds of question, so you can answer the facts today and take the rest to your solicitor. Partial answers are fine. Never send passwords, bank details or the contents of `uma-private/config.php`.

Until a qualified reviewer has read the built pages and the review is recorded (items L30 to L32), the four legal pages stay drafts with their banner. No automatic deletion or retention rule will be built until you have approved the retention periods.

## 1. Facts only you can give

Plain facts: no wording to approve and no legal judgement needed to state them. Your solicitor still reads every answer.

```
L1  Legal name of the person or company that runs the service:
L2  Legal form (sole trader, limited company, ...):
L3  Country of registration (send first: it decides the legal questions in part 3):
L4  Registration number, or "not applicable":
L5  Postal address for formal requests (a business address is fine):
L6  Data controller (normally the same as L1; your solicitor confirms):
L12 Date the legal pages take effect (YYYY-MM-DD; send last):
L13 Privacy notice version (for example 1.0):
L17 Company that provides the info@ mailbox:
```

**WhatsApp (L40).** Nothing about your WhatsApp set-up is assumed; the privacy notice names only what you tell us.

```
L40a Which WhatsApp service answers +380 63 353 40 65?
     ( ) WhatsApp (personal app)  ( ) WhatsApp Business app  ( ) WhatsApp Business Platform through a provider: ______
L40b On which device(s) is it used, and does anyone besides you read the chats?
L40c Chat backup: ( ) off  ( ) Google Drive  ( ) iCloud  ( ) other: ______   (Settings → Chats → Chat backup)
L40d Are WhatsApp chats copied anywhere else (exported, forwarded to e-mail, a CRM)?
```

**Facts to read in your accounts (no screenshot needed, the answer is enough):**

```
L14 Hostinger backups: do they include the form submissions folder, and how long are backups kept?  (hPanel, H10)
L38 Host logs: are access, error and mail logs kept, what do they record, and for how long?  (hPanel, H7 to H9)
L18 Countries where Hostinger, the mailbox provider, WhatsApp (Meta) and any chat-backup provider store data:
```

## 2. Your decisions (then checked by your solicitor)

Draft wording exists for these. Write `approve` to adopt it as your choice, or give your own.

```
L21 Contact-form enquiries are kept for:   draft "up to 12 months after our last contact"
L22 Candidate profiles are kept for:       draft "up to 12 months after our last contact"
L23 E-mail copies in the mailbox are kept: draft "the same period as the stored record"
L24 Lawful basis for replying to enquiries (also shown for WhatsApp messages):
                                           draft "your consent and steps taken at your request before any contract"
L25 Lawful basis for candidate profiles:   draft "your consent and steps taken at your request before any contract"
L26 Complaint acknowledged within:         draft "3 working days"
L27 Full complaint reply within:           draft "15 working days"
L28 Second-stage reviewer:                 draft "the business owner" (if you also handle the first stage, the review is
                                           not independent: name someone else if you can)
L29 Second-stage reply within:             draft "a further 10 working days"
```

No draft exists for these. State your current practice or the period you choose; your solicitor confirms it.

```
L37 WhatsApp conversations are kept for:
L39 E-mails sent to you directly (complaints, rights requests) are kept for:
L15 Complaint records are kept for:
L14 (period) Backups are kept for (if you can set it):
L38 (period) Host logs are kept for (if you can set it):
```

## 3. Questions for your solicitor (legal advice)

These are legal determinations. Please do not answer them yourself; send your solicitor this list with the built draft pages, which I prepare once parts 1 and 2 are in.

1. L6: confirm who the data controller is (normally the business in L1).
2. L7: is a UK or EU representative required (and, if so, their name and address)?
3. L8 and L9: which law governs the terms, and which courts decide disputes?
4. L10: which data-protection authority people can complain to, with its web address.
5. L11: the outside body for unresolved complaints, or "not applicable".
6. L16: the lawful basis for keeping the submission time and the keyed IP code (abuse detection).
7. L24 and L25: whether the draft lawful bases fit, including for WhatsApp enquiries.
8. L18 and L19: whether the storage locations you report are stated correctly, and any international transfers (hosting, mailbox, WhatsApp/Meta, any chat backup) with the safeguard used.
9. L20: the rule for applicants under 18 (the forms are built for school-leavers).
10. Whether data-processing terms are needed, and in place, with Hostinger, the mailbox provider, Meta or a WhatsApp Business Platform provider, and any chat-backup provider.
11. Whether a data protection officer is required.
12. Whether the consent wording on the forms fits the lawful bases chosen.
13. The retention periods in part 2, the host-log description (L38) and the WhatsApp description (L40), as they will appear on /privacy/.

After the review, and only then: L30 review completed (`true`), L31 a review reference you control (for example "Legal review ref. UMA-LR-01, record held by the owner"), L32 the review date.

## 4. The consolidated register (all 40 items)

Generated from `site/src/lib/legal.mjs` on 30 October 2026 and cross-checked against `LAUNCH_ACTION_REGISTER.md` §4a (column L), `OWNER_ACTION_SHEET.md` §2 (column Sheet), `LEGAL_COMPLETION_CHECKLIST.md` and `OWNER_INPUT_NEEDED.md`: every one of the 33 required values appears in all four, with the same field name. "Solicitor" follows the `review` flag in `legal.mjs`. An item can need more than one kind of answer.

| L | Sheet | Field (`legal.mjs`) | What is needed | Today | Fact from you | Approve draft | Your decision | Solicitor | Evidence to gather |
|---|---|---|---|---|---|---|---|---|---|
| L1 | 1 | `entity.name` | the legal name of the person or company that runs this service | missing | yes |  |  |  | registration certificate |
| L2 | 2 | `entity.type` | the legal form of the business (for example sole trader or limited company) | missing | yes |  |  |  | registration certificate |
| L3 | 3 | `entity.country` | the country where the business is registered or, for an individual, where you operate the service from | missing | yes |  |  |  | registration certificate |
| L4 | 4 | `entity.registrationNumber` | the registration number, or "not applicable" if the business has none | missing | yes |  |  |  | registration certificate |
| L5 | 5 | `entity.address` | a postal address for formal requests (a business or correspondence address; it is published, so never a residential address you do not want public, and never called a registered office unless it is one) | missing | yes |  |  |  | registration or business address |
| L6 | 6 | `controller.name` | the name of the data controller | missing | yes |  |  | yes |  |
| L7 | 7 | `representative.needed` | whether the law requires a representative in the UK or the EU | missing |  |  |  | yes |  |
| L8 | 8 | `governingLaw` | the law that governs these terms | missing |  |  |  | yes |  |
| L9 | 9 | `courts` | the courts that deal with disputes | missing |  |  |  | yes |  |
| L10 | 10 | `privacyAuthority` | the data-protection authority people can complain to, with its web address | missing |  |  |  | yes |  |
| L11 | 11 | `complaintsBody` | the outside body an unresolved complaint can be taken to, or "not applicable" | missing |  |  |  | yes |  |
| L12 | 12 | `effectiveDate` | the date these pages take effect | missing | yes |  |  |  |  |
| L13 | 13 | `noticeVersion` | the version number of this privacy notice | missing | yes |  |  |  |  |
| L21 | 23 | `retention.enquiries` | how long contact-form enquiries are kept | draft: "up to 12 months after our last contact" |  | yes |  | yes |  |
| L22 | 24 | `retention.candidateProfiles` | how long candidate profiles from the application form are kept | draft: "up to 12 months after our last contact" |  | yes |  | yes |  |
| L37 | 39 | `retention.whatsappMessages` | how long WhatsApp conversations with applicants are kept | missing |  |  | yes | yes |  |
| L38 | 40 | `retention.hostLogs` | what the host's server, error and mail logs record about visitors (for example IP address, page, time and browser) and how long they are kept | missing | yes |  | yes | yes | hPanel log settings (H7–H9) |
| L39 | 41 | `retention.correspondence` | how long e-mails sent to us directly (for example complaints and rights requests) are kept | missing |  |  | yes | yes |  |
| L23 | 25 | `retention.mailboxCopies` | how long the e-mail copies in the business mailbox are kept | draft: "the same period as the stored record" |  | yes |  | yes |  |
| L14 | 14 | `retention.backups` | whether backups contain form submissions, and how long backups are kept | missing | yes |  | yes | yes | hPanel backup settings (H10) |
| L15 | 16 | `retention.complaints` | how long complaint records are kept | missing |  |  | yes | yes |  |
| L24 | 26 | `lawfulBasis.enquiries` | the lawful basis for replying to enquiries (contact form and WhatsApp messages) | draft: "your consent and steps taken at your request before any contract" |  | yes |  | yes |  |
| L25 | 27 | `lawfulBasis.candidateProfiles` | the lawful basis for handling candidate profiles | draft: "your consent and steps taken at your request before any contract" |  | yes |  | yes |  |
| L16 | 17 | `lawfulBasis.abuseDetection` | the lawful basis for keeping the submission time and the keyed IP code to detect abuse | missing |  |  |  | yes |  |
| L17 | 19 | `processors.mailbox` | the company that provides the business mailbox | missing | yes |  |  |  | mailbox account (provider name) |
| L40 | 42 | `processors.whatsapp` | which WhatsApp service you use (the WhatsApp or WhatsApp Business app on a phone, or the WhatsApp Business Platform through a provider) and where the conversations and any chat backups are kept (for example only on the phone, or also in Google Drive or iCloud) | missing | yes |  |  |  | WhatsApp settings on the business phone (Settings → Chats → Chat backup); which app or provider |
| L18 | 20 | `processingLocation` | the countries where the hosting provider, the mailbox provider, WhatsApp (Meta) and any chat-backup provider (for example Google or Apple) store or process the data | missing | yes |  |  | yes | each provider's data-centre setting or terms (Hostinger, mailbox, Meta, any backup provider) |
| L19 | 21 | `internationalTransfers` | whether personal data is sent to other countries, including through WhatsApp (Meta) or a chat-backup provider, and the safeguard used | missing |  |  |  | yes |  |
| L20 | 22 | `under18Policy` | the rule for applicants under 18 | missing |  |  |  | yes |  |
| L26 | 28 | `complaints.acknowledge` | how quickly a complaint is acknowledged | draft: "3 working days" |  | yes |  |  |  |
| L27 | 29 | `complaints.reply` | how quickly a complaint receives a full reply | draft: "15 working days" |  | yes |  |  |  |
| L28 | 30 | `complaints.reviewer` | who reviews a complaint when the person is not satisfied | draft: "the business owner" |  | yes |  |  |  |
| L29 | 31 | `complaints.review` | how quickly the review stage replies | draft: "a further 10 working days" |  | yes |  |  |  |
| L30 | 32 | `legalReviewCompleted` | the legal review recorded as completed | not recorded |  |  |  | yes (after the review) |  |
| L31 | 33 | `reviewedBy` | a review reference you control, or the reviewer | not recorded |  |  |  | yes (after the review) |  |
| L32 | 34 | `reviewDate` | the review date | not recorded |  |  |  | yes (after the review) |  |
| L33–L36 | 35–38 | (built pages) | the "Draft for legal review" banner on /privacy/, /terms/, /disclosure/, /complaints-policy/ | shown | clears automatically once the 36 items above are recorded and the site is rebuilt |  |  |  |  |
**Counts:** 33 values (24 missing, 9 drafts) + 3 review fields + 4 draft pages = **40**. Of the 33 values: 13 need a fact from you, 9 have a draft to approve, 5 need your decision with no draft, 20 need your solicitor, and 10 need evidence you gather from your own accounts.

**Not required today** (they return only if the situation changes): `retention.applicationRecords` and `lawfulBasis.applications` (only if documents are ever accepted), `representative.details` (only if L7 is "yes"), referral and paid-service details (only if offered).

## How to reply

Copy parts 1 and 2, fill in what you know and send them. I enter your answers word for word in one commit just before the release, rebuild the four pages and send you a private preview copy for your solicitor. `OWNER_ACTION_SHEET.md` §2.5 has the same items as a one-line-per-field template.
