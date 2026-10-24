# Legal review brief (2026-10-24)

**For a qualified legal reviewer. This is preparation, not legal advice, and nothing in it is approved.** The four legal pages (`/privacy/`, `/terms/`, `/disclosure/`, `/complaints-policy/`) remain drafts behind the release gate (`npm run check:release`: 36 items open). Their values live in `site/src/lib/legal.mjs`; the item list is `LEGAL_COMPLETION_CHECKLIST.md`.

**Sources.** The research below could not open any official legal text: this environment's network policy refused `zakon.rada.gov.ua`, `ombudsman.gov.ua`, `eur-lex.europa.eu`, `legislation.gov.uk`, `ico.org.uk` and `meity.gov.in`. Every point comes from search-engine excerpts of official pages or law-firm summaries, some of them unofficial reprints. Check each article against the current consolidated text before relying on it.

## 1. Facts the owner has supplied (2026-10-24)

| Item | Owner's answer | Status |
|---|---|---|
| Legal name | Supplied; held outside the public repository until the release commit (owner instruction: personal details stay out of Git) | To enter at release |
| Country | Ukraine | To enter at release |
| Legal form | ФОП (Ukrainian individual entrepreneur), stated by the owner on 2026-10-24, **subject to confirmation against the registration documents** | Pending that confirmation. If confirmed, the e-commerce and consumer-law disclosure questions for a ФОП in 3.2 apply directly. See 3.1 |
| Registration number | Pending: to be read from the registration documents, never invented | Open until verified; the gate rejects a placeholder |
| Public postal address | Not decided. No residential address may be published | Left unresolved until the reviewer confirms the disclosure required and recommends a lawful correspondence option (owner instruction). See 3.2 |
| Mailbox provider (info@) | Hostinger | To enter at release once confirmed in hPanel: the contracting entity, the email product and the data-centre region (`OWNER_ACTION_SHEET.md` §8, H1–H6) |
| Effective date | 24 October 2026 | Should match the actual publication date |
| Review route | Draft for qualified legal review | The gate stays closed until the review is recorded |
| Dashboard paragraph | Remove | **Done** in the draft (section 2) |

## 2. What changed in the drafts (this commit)

- **Dashboard paragraph removed.** The privacy notice no longer describes the unbuilt application dashboard: the "Applications" bullet, the application-records retention line and the dashboard sentence under Security are gone. The two matching items (`retention.applicationRecords`, `lawfulBasis.applications`) are not required while `facts.documentsAccepted` is false. If documents are ever accepted, both become required again and block the release until reviewed wording is added (tested).
- **The notice now matches what the code does** (`site/public/api/enquiry.php`, the forms):
  - We do not send enquiries or candidate profiles to any university.
  - What is stored with each submission: reference number, time, the consent note, the keyed IP code where enabled, and a note if the e-mail copy failed.
  - Which details are required and which are optional.
  - Automatic spam checks only; no automated decisions about people.
  - How security works in practice.
- **Rate-limit counters.** Previously they were never deleted, although the code said "one hour". They are now removed once more than an hour old, at the next submission (tested).
- **Labels for an individual operator.** "Legal entity" became "Operated by", "Country of registration" became "Country", and "Registered address" became "Postal address for formal requests". Nothing implies a registered office.
- **Complaints page.** The refund sentence about paid services now appears only if paid services exist; today it says nothing is charged.
- **Apply and thank-you pages** no longer promise a future dashboard.

## 3. Questions the reviewer must resolve

### 3.1 Operator status (Ukraine)
1. Civil Code Art. 50 makes state registration a condition of an individual's entrepreneurial activity. Law 4196-IX (from 28.08.2025) defines entrepreneurship by profit purpose, and KUpAP Art. 164 fines unregistered economic activity. **Is this free service, run with plans for paid services later, entrepreneurial activity that requires registration as an ФОП?**
2. MES Order 1541 (recruitment of foreign students) refers to business entities working under contracts with institutions. **Does collecting candidate profiles under "Apply Online Now", with no university contracts and nothing sent to universities, count as recruitment, and must the wording avoid any suggestion of agent status?** The site claims no partnership.

### 3.2 Address
1. **Is a published postal address required?**
   - GDPR Art. 13(1)(a) asks for "contact details", not expressly a postal address.
   - Ukraine's Law 2297-VI Art. 8(2)(1) gives a right to know the controller's location on request.
   - E-commerce Law 675-VIII Art. 7 requires an ФОП's place of registration and actual residence, where it applies. It may not apply while nothing is sold (Art. 3 ties e-commerce to profit-oriented transactions).
   - Consumer Law 1023-XII Art. 13 requires the performer's location before a distance contract.
2. **Options that keep a residential address off the site**, for your choice; none is approved, and the owner must confirm one:
   - (a) a contracted correspondence or virtual-office address, labelled "Postal address for formal requests";
   - (b) a "c/o" address of a lawyer or representative, under written authorisation;
   - (c) e-mail only, with a postal address given on request. This may fail any rule requiring a published location.

   A PO box (абонентська скринька) receives mail but is not a "location". If the owner registers as an ФОП, the register's location is the residential address and register data are generally open. That may decide the choice of legal form before paid services start.

### 3.3 Which data-protection laws apply, and which authority to name
- **Ukraine (2297-VI):** baseline for a Ukraine-based controller.
  - Supervisor: the Ukrainian Parliament Commissioner for Human Rights (ombudsman.gov.ua).
  - Art. 12(2) lists what people must be told at collection.
  - Art. 9 and Ombudsman Order 1/02-14 cover notification of "particular-risk" processing. **Does the optional nationality field trigger it?**
  - Bill 8153 (GDPR-aligned) was pending at last check.
- **UK GDPR:** the UK is a named market. Art. 3(2)(a) may apply to a free service.
  - **If it does: is an Art. 27 UK representative needed, or does the "occasional" exemption fit a site whose core activity is the forms?**
  - Name the ICO.
  - The UK complaint-handling duty (s.164A DPA 2018, reported in force from 19 June 2026) may affect the complaints wording.
- **EU GDPR:** no EU market is named. **Does the site "envisage" EU users? If yes, the same Art. 27 question applies.**
- **India DPDP Act 2023:** s.3(b) reaches processing outside India connected with offering services in India.
  - Commencement is phased: some duties from 13 November 2026, most notice, consent and children's duties from 13 May 2027.
  - **Add an India section now or before May 2027?**
- **Nigeria NDPA 2023:** s.2(2)(c) may apply; regulator NDPC.
- **Proposed authority line** (to complete once decided): "You can complain to the Ukrainian Parliament Commissioner for Human Rights (ombudsman.gov.ua). If you live in the United Kingdom, you can also complain to the Information Commissioner's Office (ico.org.uk)." Add other authorities only as decided.

### 3.4 Lawful bases (items 21, 22, 23)
The draft proposes two bases for one purpose ("your consent and steps taken at your request before any contract"). **Pick one per purpose.** Options:
- (A) consent, withdrawable;
- (B) pre-contract steps. Doubtful while the service is free and no contract is planned.

For abuse detection the proposal is legitimate interests ("keeping our forms free of spam and abuse"), with the right to object. Under DPDP, consent (s.6) or legitimate use (s.7(a)).

### 3.5 Rights, correspondence and logs
- **Rights paragraph (proposed):** "You can ask us for a copy of your personal data, and ask us to correct it, delete it or restrict how we use it. You can also ask to receive the information you gave us in a commonly used electronic format, and object to our use of your data where we rely on our legitimate interests. Where we rely on your consent, you can withdraw it at any time; this does not affect what we did before. To use any of these rights, e-mail us."
- **E-mails sent to us directly** (complaints and rights requests) are not yet covered.
  - Proposed bullet: "Emails you send us, including complaints and requests about your data: your email address, your name if you give it, and what you write. Used to reply, to handle your complaint or request, and to keep a record of complaints and their outcome."
  - **Which basis applies, and does the mailbox retention period cover correspondence?**
- **Host access logs and mail logs:** not described. Whether they exist, what they hold and how long they are kept are unverified.
  - Proposed paragraph, once the owner confirms the facts in hPanel: "Our hosting provider keeps technical logs of requests to this website and of emails sent and received through our mailbox, such as the IP address, the page or address involved, and the date and time. These logs are used to run and protect the service."
  - A retention item would be added to `legal.mjs` for it. No period has been invented.

### 3.6 Retention, processors and transfers
- **Retention.** The proposed periods (items 23–25: "up to 12 months after our last contact") have no deletion job behind them. **Records must be deleted by hand: confirm a routine before approving any period.** Backups (item 14) depend on the Hostinger plan.
- **Processor.** Hostinger's data-processing terms name Hostinger International Ltd (Cyprus) or Hostinger UK Limited. **Which entity and which data-centre region apply to this account** (owner to read from hPanel)?
- **Transfers.** **Is there a transfer under Ukrainian Art. 29 or GDPR Chapter V, and which safeguard?**

### 3.7 Applicants under 18 (item 28)
Three options, for your choice:
- **(A) 18 or over only.** A required "I am 18 or over" tick. Under-18s ask a parent or guardian to contact us. Simplest, but it excludes school-leavers.
- **(B) Under-18s with parent or guardian confirmation.** We e-mail the guardian and delete the form if there is no confirmation within a set period. Closest to DPDP s.9; needs a process.
- **(C) No age limit, with a guardian contact requested.** Least friction, highest risk under DPDP s.9 from May 2027 and possibly under UK/EU GDPR Art. 8.

### 3.8 Wording on the forms and terms
- **Forms.** They say "agree to the privacy notice", while the tick box asks permission to store and reply.
  - Proposed: "tick the box to let us store your details and reply to you". Server message: "your permission to store your details and reply to you (tick the box)".
  - **Must the exact tick-box wording and the notice version be stored with each submission?** Today a summary is stored.
- **Terms.** The "Acceptable use" clause mentions submitting documents, which the site does not accept. Proposed: "You agree to give accurate information about yourself and your qualifications."

## 4. Before publication

1. The owner confirms the legal form (3.1), the address route (3.2), the Hostinger entity and region (3.6) and a deletion routine (3.6).
2. The reviewer settles 3.1–3.8. The owner approves the wording.
3. I enter all values in one commit just before the release and rebuild. The reviewer reads the built pages and the review is recorded (items 32–34). `npm run check:release` must print READY.
