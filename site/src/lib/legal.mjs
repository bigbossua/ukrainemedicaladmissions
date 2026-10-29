// @ts-check
// OWNER-SUPPLIED LEGAL DETAILS — the one file the four legal pages read (/privacy/, /terms/, /disclosure/,
// /complaints-policy/). Plain ESM with JSDoc, so the pages, scripts/release-readiness.mjs and tests/release-readiness.mjs
// all read exactly the same object. Completion guide: LEGAL_COMPLETION_CHECKLIST.md (repository root).
//
// THIS FILE IS PREPARATION, NOT LEGAL ADVICE. Nothing here was decided by a lawyer, and nothing here may be filled in by
// a developer or an AI assistant on the owner's behalf: every value below that is `null` or `proposed(...)` must come
// from the owner (and, where LEGAL_ITEMS says `review: true`, be checked by a qualified legal reviewer).
//
// How to supply a value:
//   - replace `null` (or a `proposed(...)` call) with the value as plain text in quotes,
//   - dates as 'YYYY-MM-DD', yes/no answers as true or false,
//   - only where LEGAL_ITEMS says `notApplicable: true` may the value be NOT_APPLICABLE (the page then shows "not
//     applicable", or leaves the line out where a line would make no sense); "N/A" and "not applicable" count the same,
//   - a placeholder such as "TBC", "to be confirmed", "???" or anything in square brackets counts as NOT supplied.
// A value written as proposed(...) is text that today's draft pages already contain but that the owner has NOT approved
// (no approval is recorded anywhere in the repository). It is shown on the page with a visible "proposed" marker and
// counts as NOT supplied until the owner replaces the proposed(...) call with the plain value.
//
// The draft banner ("Draft for legal review") stays on all four pages until legalStatus(LEGAL).complete is true: every
// required value supplied (no null, no proposal) AND legalReviewCompleted true with reviewedBy and reviewDate set.
// `npm run check:release` (scripts/release-readiness.mjs) lists everything still missing and exits non-zero until then.

/** Marker for a detail that does not apply to this business (allowed only where LEGAL_ITEMS says notApplicable: true). */
export const NOT_APPLICABLE = 'not-applicable';

/**
 * Text that today's draft already contains, with no recorded owner approval. Not a fact; counts as missing.
 * @template T
 * @param {T} value the wording in today's draft
 * @param {string} source where the draft wording is recorded
 * @returns {{ proposed: T, source: string }}
 */
export const proposed = (value, source) => Object.freeze({ proposed: value, source });

/** @param {unknown} v @returns {v is { proposed: unknown, source: string }} */
export const isProposal = (v) => !!v && typeof v === 'object' && !Array.isArray(v) && 'proposed' in v;

export const LEGAL = {
  // ---- Who runs the service --------------------------------------------------------------------------------------
  // None of these is recorded anywhere in the repository (open decision D7: SECURITY_AND_RELEASE_CHECKLIST.md A0/A10,
  // APPLICATION_SYSTEM_SPEC.md §7 B6, EXECUTIVE_REPORT.md §O.7). "Ukraine Medical Admissions" is the site's NAME
  // (site/src/lib/site.ts SITE.name), not a legal entity.
  entity: {
    name: null,
    type: null,
    country: null,
    registrationNumber: null,
    address: null,
  },
  controller: {
    name: null,
  },
  // Whether a representative in the UK or the EU is needed depends on where the business is established (legal review).
  representative: {
    needed: null,
    details: null,
  },
  contact: {
    // DOCUMENTED: the business e-mail. site/src/lib/site.ts (SITE.email); site/public/api/enquiry.php (default notify_to);
    // site/public/.well-known/security.txt (Contact). tests/release-readiness.mjs fails if site.ts ever disagrees.
    email: 'info@ukrainemedicaladmissions.com',
  },

  // ---- Law, authorities and outside bodies (all need legal review; jurisdiction is open decision D7) ---------------
  governingLaw: null,
  courts: null,
  // The data-protection authority people can complain to. The draft says only "the relevant supervisory authority"
  // "where UK or EU data-protection law applies" (privacy page); which one applies is not recorded.
  privacyAuthority: null,
  // The outside body an unresolved complaint can be taken to. The draft complaints page asked for an "applicable
  // consumer-protection body"; none is recorded.
  complaintsBody: null,

  // ---- Dates and versions ----------------------------------------------------------------------------------------
  // All four drafts say "effective date to be set before publication". The privacy-notice version is also the consent
  // version the enquiry handler should store once the notice leaves draft (TECHNICAL_REPAIR_BACKLOG.md N22e).
  effectiveDate: null,
  noticeVersion: null,

  // ---- How long data is kept ---------------------------------------------------------------------------------------
  retention: {
    // PROPOSED: privacy draft "Enquiries: up to 12 months after our last contact."; APPLICATION_SYSTEM_SPEC.md §14.12
    // row "Stage-1 enquiry JSON": "Period in the draft notice; owner to confirm".
    enquiries: proposed('up to 12 months after our last contact', 'site/src/pages/privacy/index.astro (draft); APPLICATION_SYSTEM_SPEC.md §14.12, "owner to confirm"'),
    // PROPOSED: the handler stores candidate profiles from /apply/ as Stage-1 enquiry records (type "application-start",
    // stage "enquiry": APPLICATION_SYSTEM_SPEC.md §2, site/public/api/enquiry.php), which the §14.12 row above covers.
    candidateProfiles: proposed('up to 12 months after our last contact', 'APPLICATION_SYSTEM_SPEC.md §14.12 row "Stage-1 enquiry JSON" (covers both record types), "owner to confirm"'),
    // PROPOSED: privacy draft "kept there for the same retention period as the stored record".
    mailboxCopies: proposed('the same period as the stored record', 'site/src/pages/privacy/index.astro (draft), "What else is stored with a submission"'),
    // MISSING: APPLICATION_SYSTEM_SPEC.md §14.12 "Backups … Window TO BE CONFIRMED"; whether the host's own backups
    // include the private storage directory is not recorded (HOSTING_AND_DEPLOYMENT_ASSESSMENT.md §1: plan unverified).
    backups: null,
    // MISSING: WhatsApp became a contact channel (owner decision 2026-10-29); how long those conversations are kept is the
    // owner's to state. No value is proposed here.
    whatsappMessages: null,
    // MISSING (audit F3, 2026-10-29): the host keeps server, error and mail logs (IP address, page, time, browser); what
    // they hold and for how long is read in hPanel (OWNER_ACTION_SHEET.md H7-H9). Not described in the notice before.
    hostLogs: null,
    // MISSING (audit F3): e-mails people send us directly (complaints, rights requests) are kept outside the form records.
    correspondence: null,
    // NOT REQUIRED while facts.documentsAccepted is false. Owner decision 2026-10-24: the privacy notice no longer
    // describes the application dashboard, which is not built. If documents are ever accepted, this period (and a reviewed
    // paragraph on the privacy page) is required again before release.
    applicationRecords: null,
    // MISSING: the complaints draft says "We keep a record of each complaint and its outcome" with no period.
    complaints: null,
  },

  // ---- Lawful basis for each purpose (all need legal review: SECURITY_AND_RELEASE_CHECKLIST.md C11.1) --------------
  lawfulBasis: {
    // PROPOSED: privacy draft "Legal basis: your consent and steps taken at your request before any contract."
    enquiries: proposed('your consent and steps taken at your request before any contract', 'site/src/pages/privacy/index.astro (draft); not legally reviewed (A10, C11.1)'),
    candidateProfiles: proposed('your consent and steps taken at your request before any contract', 'site/src/pages/privacy/index.astro (draft); not legally reviewed (A10, C11.1)'),
    // MISSING: the draft gives no basis for keeping the submission time and the keyed IP code used to detect abuse.
    abuseDetection: null,
    // NOT REQUIRED while facts.documentsAccepted is false (owner decision 2026-10-24, as retention.applicationRecords).
    applications: null,
  },

  // ---- Who else handles the data, and where --------------------------------------------------------------------------
  processors: {
    // DOCUMENTED, AS LABELLED in HOSTING_AND_DEPLOYMENT_ASSESSMENT.md: §1 "Hostinger account holds this site — VERIFIED
    // (screenshot)"; §2 Hostinger Git is the "CHOSEN ROUTE" for deployment. Still UNVERIFIED there: the hosting plan
    // (§1) and whether the domain is already connected to that website entry (§12.1). The stored form records live on
    // this host, outside the web root (site/public/api/enquiry.php; APPLICATION_SYSTEM_SPEC.md §2).
    hosting: 'Hostinger',
    // MISSING: the provider of the business mailbox that receives each submission is not recorded
    // (APPLICATION_SYSTEM_SPEC.md §14.2 H6: "the domain's mail service", UNVERIFIED).
    mailbox: null,
    // MISSING (review of 2026-10-29): which WhatsApp service the business uses (the WhatsApp or WhatsApp Business app on a
    // phone, or the WhatsApp Business Platform through a provider) and where the conversations and any chat backups are
    // kept (for example only on the phone, or also in Google Drive or iCloud). Not recorded; nothing is assumed.
    whatsapp: null,
  },
  // MISSING: the countries where the hosting provider, the mailbox provider and WhatsApp (Meta) store data (not recorded;
  // plan unverified).
  processingLocation: null,
  // MISSING: whether personal data goes to other countries, and the safeguard used (legal review).
  internationalTransfers: null,

  // ---- Applicants under 18 ------------------------------------------------------------------------------------------
  // MISSING: open legal question (APPLICATION_SYSTEM_SPEC.md §14.12; SECURITY_AND_RELEASE_CHECKLIST.md C11.2;
  // EXECUTIVE_REPORT.md §K.8 escalation). The forms ask no age today.
  under18Policy: null,

  // ---- Complaints timescales (complaints draft; no owner approval recorded) -------------------------------------------
  complaints: {
    acknowledge: proposed('3 working days', 'site/src/pages/complaints-policy/index.astro (draft)'),
    reply: proposed('15 working days', 'site/src/pages/complaints-policy/index.astro (draft)'),
    reviewer: proposed('the business owner', 'site/src/pages/complaints-policy/index.astro (draft)'),
    review: proposed('a further 10 working days', 'site/src/pages/complaints-policy/index.astro (draft)'),
  },

  // ---- Paid services and referral payments ---------------------------------------------------------------------------
  paidServices: {
    // DOCUMENTED: nothing is sold or charged. Disclosure draft "We currently charge nothing and receive no payment from
    // applicants, universities or anyone else"; SERVICE_TIERS_SPEC.md "Not on sale, not priced, not shown on the
    // website"; APPLICATION_SYSTEM_SPEC.md §5 "Stage 4 — payments (not before owner approval)".
    offered: false,
    // Needed only once a paid service is approved (inclusions, exclusions, price, payment timing, refund terms,
    // VAT position: SERVICE_TIERS_SPEC.md "Pricing gates" and "Legal prerequisites").
    terms: null,
  },
  // DOCUMENTED: no referral fee, commission or partnership exists. Disclosure draft "[No such arrangement exists at the
  // date of this draft.]"; SERVICE_TIERS_SPEC.md "Rejected for now — no agreements exist"; EXECUTIVE_REPORT.md §6.
  referralArrangements: false,
  // Needed only if a referral fee, commission or partnership is ever agreed (disclosure page: "we will state so here").
  referralDetails: null,

  // ---- Facts about what the site does today (DOCUMENTED; change only when the code changes) --------------------------
  facts: {
    // No analytics or advertising tracker is installed: privacy draft (since 4136658); ANALYTICS_AND_SEARCH_CONSOLE.md
    // "no analytics tool is installed"; the CSP in site/public/.htaccess allows only the site's own scripts.
    analyticsInstalled: false,
    // No payment is taken: see paidServices.offered.
    paymentsTaken: false,
    // No document is accepted at Stage 1: APPLICATION_SYSTEM_SPEC.md §2; site/public/api/enquiry.php header.
    documentsAccepted: false,
    // What site/public/api/enquiry.php stores for each submission (one JSON file in uma-private/enquiries/, outside the
    // web root) and e-mails as plain text to contact.email. tests/release-readiness.mjs compares these lists with the
    // handler, so a new stored field fails the test until this list (and the privacy notice) is updated.
    storedRecordFields: ['id', 'version', 'type', 'stage', 'received', 'name', 'email', 'course', 'university', 'message', 'consent', 'consentText', 'ip_hash', 'profile', 'notification'],
    storedProfileFields: {
      intent: ['field', 'level', 'universities', 'university_other', 'intake'],
      education: ['level', 'qualification', 'awarding_country', 'year', 'year_status', 'scale_type', 'scale_max', 'subjects', 'outstanding'],
      documents: ['type', 'state'],
      documents_note: [],
      contact: ['name', 'email', 'residence', 'nationality', 'language', 'questions'],
    },
    // ip_hash: an HMAC-SHA256 of the visitor's IP address and the month, stored ONLY when a secret ip_hash_key is set in
    // uma-private/config.php; without it, nothing about the IP is stored (enquiry.php; TECHNICAL_REPAIR_BACKLOG.md N21).
    ipHashOnlyWithKey: true,
  },

  // ---- Legal review ----------------------------------------------------------------------------------------------------
  // Set to true ONLY after a qualified reviewer has read all four pages with the values above (A10, C11.1).
  legalReviewCompleted: false,
  reviewedBy: null,
  reviewDate: null,
};

/**
 * @typedef {object} LegalItem
 * @property {string} path   dotted path into LEGAL
 * @property {string} what   plain words, shown on the page as "[to be supplied by the owner: <what>]"
 * @property {string} why    why the pages need it
 * @property {('privacy'|'terms'|'disclosure'|'complaints-policy')[]} pages  where it appears (empty only for an item that is not
 *   required today and that no page shows yet: it is required, and blocks the release, as soon as its condition holds)
 * @property {boolean} review  needs a qualified legal review
 * @property {'text'|'date'|'boolean'} [kind]  default 'text'
 * @property {boolean} [notApplicable]  NOT_APPLICABLE is an allowed answer
 * @property {(legal: any) => boolean} [requiredWhen]  required only when this returns true
 */

/** Every owner detail the four pages need, in the order the owner should supply them (LEGAL_COMPLETION_CHECKLIST.md). */
/** @type {readonly LegalItem[]} */
export const LEGAL_ITEMS = Object.freeze([
  { path: 'entity.name', what: 'the legal name of the person or company that runs this service', why: 'Visitors must be told who they are dealing with and who holds their data.', pages: ['privacy', 'terms', 'disclosure', 'complaints-policy'], review: false },
  { path: 'entity.type', what: 'the legal form of the business (for example sole trader or limited company)', why: 'Identifies the entity; decides whether a registration number exists.', pages: ['privacy', 'terms'], review: false },
  { path: 'entity.country', what: 'the country where the business is registered or, for an individual, where you operate the service from', why: 'Decides which data-protection and consumer law applies, the authority, and whether a representative is needed.', pages: ['privacy', 'terms'], review: false },
  { path: 'entity.registrationNumber', what: 'the registration number, or "not applicable" if the business has none', why: 'Identifies a registered company.', pages: ['privacy', 'terms'], review: false, notApplicable: true },
  { path: 'entity.address', what: 'a postal address for formal requests (a business or correspondence address; it is published, so never a residential address you do not want public, and never called a registered office unless it is one)', why: 'A postal address for formal requests and complaints.', pages: ['privacy', 'terms', 'complaints-policy'], review: false },
  { path: 'controller.name', what: 'the name of the data controller', why: 'The privacy notice must name who decides how personal data is used.', pages: ['privacy'], review: true },
  { path: 'representative.needed', what: 'whether the law requires a representative in the UK or the EU', why: 'A business established outside the UK or the EU may need one; depends on the country of registration.', pages: ['privacy'], review: true, kind: 'boolean' },
  { path: 'representative.details', what: "the representative's name and postal address", why: 'Must be named in the privacy notice when one is required.', pages: ['privacy'], review: true, requiredWhen: (l) => l.representative?.needed === true },
  { path: 'governingLaw', what: 'the law that governs these terms', why: 'The terms must say which law applies.', pages: ['terms'], review: true },
  { path: 'courts', what: 'the courts that deal with disputes', why: 'The terms must say where disputes are decided.', pages: ['terms'], review: true },
  { path: 'privacyAuthority', what: 'the data-protection authority people can complain to, with its web address', why: 'The privacy notice must name the authority, not only "the relevant supervisory authority".', pages: ['privacy'], review: true },
  { path: 'complaintsBody', what: 'the outside body an unresolved complaint can be taken to, or "not applicable"', why: 'The complaints draft asked for the applicable consumer-protection body.', pages: ['complaints-policy'], review: true, notApplicable: true },
  { path: 'effectiveDate', what: 'the date these pages take effect', why: 'Every draft says "effective date to be set before publication".', pages: ['privacy', 'terms', 'disclosure', 'complaints-policy'], review: false, kind: 'date' },
  { path: 'noticeVersion', what: 'the version number of this privacy notice', why: 'Shown on the notice. It should also be stored with each consent; the form handler does not store it yet (backlog N22e).', pages: ['privacy'], review: false },
  { path: 'retention.enquiries', what: 'how long contact-form enquiries are kept', why: 'The privacy notice must state each retention period.', pages: ['privacy'], review: true },
  { path: 'retention.candidateProfiles', what: 'how long candidate profiles from the application form are kept', why: 'The privacy notice must state each retention period.', pages: ['privacy'], review: true },
  { path: 'retention.whatsappMessages', what: 'how long WhatsApp conversations with applicants are kept', why: 'The site offers WhatsApp as a contact channel (owner decision 2026-10-29); the notice must state each retention period.', pages: ['privacy'], review: true },
  { path: 'retention.hostLogs', what: 'what the host\'s server, error and mail logs record about visitors (for example IP address, page, time and browser) and how long they are kept', why: 'The host keeps these logs; the notice must describe them and their retention (audit F3, OWNER_ACTION_SHEET.md H7-H9).', pages: ['privacy'], review: true },
  { path: 'retention.correspondence', what: 'how long e-mails sent to us directly (for example complaints and rights requests) are kept', why: 'Direct correspondence is kept outside the form records; the notice must state its retention (audit F3).', pages: ['privacy'], review: true },
  { path: 'retention.mailboxCopies', what: 'how long the e-mail copies in the business mailbox are kept', why: 'Each submission is also e-mailed to the business mailbox.', pages: ['privacy'], review: true },
  { path: 'retention.backups', what: 'whether backups contain form submissions, and how long backups are kept', why: 'Deleted data can remain in backups; the notice must say for how long (APPLICATION_SYSTEM_SPEC.md §14.12).', pages: ['privacy'], review: true },
  { path: 'retention.applicationRecords', what: 'how long application records and documents are kept after an application ends', why: 'Required once documents are accepted (the notice must then describe the document process and give a period).', pages: [], review: true, requiredWhen: (l) => l.facts?.documentsAccepted === true },
  { path: 'retention.complaints', what: 'how long complaint records are kept', why: 'The complaints policy says each complaint is recorded, with no period.', pages: ['complaints-policy'], review: true },
  { path: 'lawfulBasis.enquiries', what: 'the lawful basis for replying to enquiries', why: 'The privacy notice must give a lawful basis for each purpose.', pages: ['privacy'], review: true },
  { path: 'lawfulBasis.candidateProfiles', what: 'the lawful basis for handling candidate profiles', why: 'The privacy notice must give a lawful basis for each purpose.', pages: ['privacy'], review: true },
  { path: 'lawfulBasis.abuseDetection', what: 'the lawful basis for keeping the submission time and the keyed IP code to detect abuse', why: 'The draft gives no basis for this purpose.', pages: ['privacy'], review: true },
  { path: 'lawfulBasis.applications', what: 'the lawful basis for handling application documents', why: 'Required once documents are accepted (the notice must then give a basis for the document process).', pages: [], review: true, requiredWhen: (l) => l.facts?.documentsAccepted === true },
  { path: 'processors.mailbox', what: 'the company that provides the business mailbox', why: 'Each submission is e-mailed there, so it handles personal data for us.', pages: ['privacy'], review: false },
  { path: 'processors.whatsapp', what: 'which WhatsApp service you use (the WhatsApp or WhatsApp Business app on a phone, or the WhatsApp Business Platform through a provider) and where the conversations and any chat backups are kept (for example only on the phone, or also in Google Drive or iCloud)', why: 'The site offers WhatsApp as a contact channel (owner decision 2026-10-29); the notice must name who keeps those messages and where, including any backup provider.', pages: ['privacy'], review: false },
  { path: 'processingLocation', what: 'the countries where the hosting provider, the mailbox provider and WhatsApp (Meta) store the data', why: 'The notice must say where data is processed; it lists all three providers.', pages: ['privacy'], review: true },
  { path: 'internationalTransfers', what: 'whether personal data is sent to other countries, including through WhatsApp (Meta), and the safeguard used', why: 'Transfers abroad must be disclosed with their safeguard; WhatsApp messages are carried by Meta.', pages: ['privacy'], review: true },
  { path: 'under18Policy', what: 'the rule for applicants under 18', why: 'Open legal question (APPLICATION_SYSTEM_SPEC.md §14.12, checklist C11.2); applicants are often under 18.', pages: ['privacy'], review: true },
  { path: 'complaints.acknowledge', what: 'how quickly a complaint is acknowledged', why: 'The complaints policy promises timescales.', pages: ['complaints-policy'], review: false },
  { path: 'complaints.reply', what: 'how quickly a complaint receives a full reply', why: 'The complaints policy promises timescales.', pages: ['complaints-policy'], review: false },
  { path: 'complaints.reviewer', what: 'who reviews a complaint when the person is not satisfied', why: 'The complaints policy names a second stage.', pages: ['complaints-policy'], review: false },
  { path: 'complaints.review', what: 'how quickly the review stage replies', why: 'The complaints policy promises timescales.', pages: ['complaints-policy'], review: false },
  { path: 'referralDetails', what: 'who pays the referral fee, commission or other payment, and how much', why: 'The disclosure page promises to state any such payment before the applicant decides.', pages: ['disclosure'], review: true, requiredWhen: (l) => l.referralArrangements === true },
  { path: 'paidServices.terms', what: 'the terms of each paid service (inclusions, exclusions, price, payment timing, refund terms)', why: 'Required before any paid service is offered.', pages: ['terms'], review: true, requiredWhen: (l) => l.paidServices?.offered === true },
]);

/** Paths in LEGAL that are documented facts or flags, not owner items (checked by tests for coverage). */
export const LEGAL_DOCUMENTED_PATHS = Object.freeze([
  'contact.email', 'processors.hosting', 'paidServices.offered', 'referralArrangements', 'facts',
  'legalReviewCompleted', 'reviewedBy', 'reviewDate',
]);

/** The page slug for each legal page, with its path. */
export const LEGAL_PAGES = Object.freeze({ privacy: '/privacy/', terms: '/terms/', disclosure: '/disclosure/', 'complaints-policy': '/complaints-policy/' });

/** @param {any} obj @param {string} path */
export function getPath(obj, path) {
  return path.split('.').reduce((o, k) => (o && typeof o === 'object' ? o[k] : undefined), obj);
}

/** @param {string} path */
export function legalItem(path) {
  const item = LEGAL_ITEMS.find((i) => i.path === path);
  if (!item) throw new Error(`legal.mjs: no LEGAL_ITEMS entry for "${path}"`);
  return item;
}

const isIsoDate = (/** @type {unknown} */ s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && new Date(`${s}T00:00:00Z`).toISOString().slice(0, 10) === s;
const blank = (/** @type {unknown} */ v) => v === null || v === undefined || (typeof v === 'string' && v.trim() === '');
// Text that is not yet an answer ("TBC", "to be confirmed", "[address]", "???"): an item holding it counts as NOT supplied,
// so the draft banner stays and the page shows the "[to be supplied by the owner: …]" marker instead.
const PLACEHOLDER_TEXT = /^\s*(?:tbc|tbd|tba|todo|fixme|unknown|pending|null|undefined|x{2,}|\?+|-+|\.{3}|…)\s*\.?\s*$|\b(?:to be (?:confirmed|supplied|decided|agreed|added|inserted|set|determined|advised)|tbc|tbd|todo|fixme|placeholder|lorem ipsum)\b|[[\]]/i;
// Plain text meaning "not applicable" ("N/A", "not applicable") is treated exactly like NOT_APPLICABLE.
const NOT_APPLICABLE_TEXT = /^\s*(?:n\/?a|not[ -]applicable)\s*\.?\s*$/i;
/** True for text that is a placeholder rather than an answer. @param {unknown} v */
export const looksLikePlaceholder = (v) => typeof v === 'string' && PLACEHOLDER_TEXT.test(v);

/**
 * The state of one owner item: 'supplied', 'proposed', 'missing', 'not-applicable', 'invalid' or 'not-required'.
 * @param {any} legal @param {LegalItem} item
 * @returns {{ state: 'supplied'|'proposed'|'missing'|'not-applicable'|'invalid'|'not-required', value?: any, problem?: string }}
 */
export function itemState(legal, item) {
  if (item.requiredWhen && !item.requiredWhen(legal)) return { state: 'not-required' };
  const v = getPath(legal, item.path);
  if (blank(v)) return { state: 'missing' };
  if (isProposal(v)) return { state: 'proposed', value: v.proposed };
  if (v === NOT_APPLICABLE || (typeof v === 'string' && NOT_APPLICABLE_TEXT.test(v))) return item.notApplicable ? { state: 'not-applicable' } : { state: 'invalid', value: v, problem: '"not applicable" is not an allowed answer for this item' };
  const kind = item.kind ?? 'text';
  if (kind === 'boolean' && typeof v !== 'boolean') return { state: 'invalid', value: v, problem: 'must be true or false' };
  if (kind === 'date' && !isIsoDate(v)) return { state: 'invalid', value: v, problem: 'must be a date written YYYY-MM-DD' };
  if (kind === 'text' && typeof v !== 'string') return { state: 'invalid', value: v, problem: 'must be text' };
  if (kind === 'text' && looksLikePlaceholder(v)) return { state: 'invalid', value: v, problem: `"${v.trim()}" is a placeholder, not an answer` };
  return { state: 'supplied', value: v };
}

/**
 * Everything still needed before the legal pages may leave draft.
 * @param {any} legal @param {{ now?: Date }} [opts]
 */
export function legalStatus(legal, { now = new Date() } = {}) {
  const missing = [], proposals = [], invalid = [];
  for (const item of LEGAL_ITEMS) {
    const s = itemState(legal, item);
    if (s.state === 'missing') missing.push(item);
    else if (s.state === 'proposed') proposals.push({ item, value: s.value });
    else if (s.state === 'invalid') invalid.push({ item, value: s.value, problem: s.problem });
  }
  // The documented values the pages read must keep their form: a flag that is not true or false would hide a conditional
  // line (paid-service terms, referral payments) and switch off the item it requires, while the banner disappeared.
  const documented = [];
  for (const [p, what] of [['paidServices.offered', 'Whether paid services are offered'], ['referralArrangements', 'Whether a referral arrangement exists'], ['facts.documentsAccepted', 'Whether documents are accepted']])
    if (typeof getPath(legal, p) !== 'boolean') documented.push(`${what} (${p}) must be true or false.`);
  const email = getPath(legal, 'contact.email');
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) documented.push('The business e-mail (contact.email) must be an e-mail address.');
  const hosting = getPath(legal, 'processors.hosting');
  if (typeof hosting !== 'string' || blank(hosting) || looksLikePlaceholder(hosting)) documented.push('The hosting provider (processors.hosting) must be named.');
  const review = [];
  if (legal?.legalReviewCompleted !== true) review.push('The legal review is not recorded as completed (legalReviewCompleted is not true).');
  if (typeof legal?.reviewedBy !== 'string' || blank(legal.reviewedBy) || looksLikePlaceholder(legal.reviewedBy)) review.push('The reviewer is not named (reviewedBy is empty or a placeholder).');
  if (!isIsoDate(legal?.reviewDate)) review.push('The review date is not set (reviewDate must be YYYY-MM-DD).');
  else if (legal.reviewDate > now.toISOString().slice(0, 10)) review.push('The review date is in the future.');
  return { missing, proposals, invalid, documented, review, complete: !missing.length && !proposals.length && !invalid.length && !documented.length && !review.length };
}

/** True when the four pages may drop the "Draft for legal review" banner. @param {any} [legal] */
export const legalPagesComplete = (legal = LEGAL) => legalStatus(legal).complete;

/** The state of one owner item in LEGAL (for the pages' conditional lines). @param {string} path @param {any} [legal] */
export const ownerState = (path, legal = LEGAL) => itemState(legal, legalItem(path)).state;

/** A documented value or flag in LEGAL, untyped (LEGAL_DOCUMENTED_PATHS). @param {string} path @returns {any} */
export const documented = (path) => getPath(LEGAL, path);

/** "2026-11-01" -> "1 November 2026" (UTC, so the build machine's time zone cannot shift the day). @param {string} iso */
export const formatLegalDate = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
