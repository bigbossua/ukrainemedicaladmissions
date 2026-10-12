// PUBLICATION SETTINGS THE OWNER MAY CHANGE. The publication policy (src/lib/publication.mjs) reads its adjustable
// settings ONLY from this file; nothing else in src/ imports it (tests/publication-policy.mjs checks that).
//
// Every value below is the fail-closed default chosen on 2026-10-12 for backlog N24 (a)-(c). Each one is an owner
// decision that is still open: PUBLICATION_POLICY_DECISIONS.md (repository root) explains what each setting means for
// publishing a profile, for students and for the business, and how to change it. Changing a value here changes what
// every build may print; run `npm test` afterwards and record the decision in that memo.
//
// Nothing here is legal advice and nothing here is a fact about any university.

// ------------------------------------------------------------------------------------------- (a) our own text
// Our own editorial text (overview, programme names, city, region) is printed without an evidence entry of its own.

/**
 * true (default): a published profile prints the overview ONLY when `verification.editorialReview` records a reviewer,
 * a review date (not in the future) and the SHA-256 of the overview text exactly as it is now. Any later edit to the
 * overview, even one character, changes the hash and hides the overview again until someone re-reviews it.
 * false: the overview is printed without a review (the behaviour before 2026-10-12), still only if it carries no
 * research-note wording.
 */
export const OVERVIEW_REQUIRES_EDITORIAL_REVIEW = true;

/**
 * true (default): a programme is listed on a published profile only when its name, as recorded, appears (ignoring
 * letter case and repeated spaces, and as whole words) in the quotation of an evidence entry that verifies that
 * programme's international admission. A programme whose name cannot be shown is not listed at all, because every page
 * that lists a programme labels its facts and fee with its name, and any other label would be our guess.
 * false: programme names are printed without that check (the behaviour before 2026-10-12).
 */
export const PROGRAMME_NAME_REQUIRES_QUOTATION = true;

/**
 * true (default): the city and the region are printed only when each appears (ignoring letter case, as whole words) in
 * the address value that the profile shows as verified. Otherwise cards, filters and the profile print
 * WITHHELD_PLACE_TEXT instead of the city, and leave the region out. We never guess a location.
 * false: city and region are printed as recorded (the behaviour before 2026-10-12).
 */
export const CITY_AND_REGION_REQUIRE_VERIFIED_ADDRESS = true;

/** What cards, filters and pages print in place of a city that is withheld. Plain words; never a guess. */
export const WITHHELD_PLACE_TEXT = 'To be confirmed';

// ------------------------------------------------------------------------------------------- (b) recognition
/**
 * Host names of the destination countries' official recognition authorities whose pages may support a recognition
 * claim (tier 4). A claim is shown only when its tier-4 evidence page is on one of these hosts or a subdomain of one
 * (write bare host names, lower case, no "https://", no path, e.g. "authority.example"). EMPTY BY DEFAULT: no
 * recognition claim is shown anywhere until the owner chooses which authorities to list. Adding a host is an owner
 * decision. Public wording, if a claim is ever shown, states what the authority's page says and its date; it never
 * says or implies that a degree guarantees registration, a licence or the right to practise.
 * @type {readonly string[]}
 */
export const RECOGNITION_AUTHORITY_HOSTS = Object.freeze([]);

// ------------------------------------------------------------------------------------------- (c) official host
/**
 * true (default): the official website is shown only when, in addition to every other rule, at least one verified
 * tier-3 evidence entry on a government address (GOVERNMENT_HOST_SUFFIXES) carries EXACTLY the same website value, for
 * example a Ministry or EDEBO page listing the university's site. Until the website is shown, the university's own
 * pages (tier 1 and 2 evidence) support nothing, so no programme, fee or other fact read there can be shown and no
 * profile can be published. A verified government entry carrying a different website is a conflict: the website and
 * everything that depends on the official host stay withheld.
 * false: the website may be shown on the strength of the university's own pages alone (circular: the page that names the
 * official site is itself on that site).
 */
export const WEBSITE_REQUIRES_GOVERNMENT_EVIDENCE = true;

/**
 * Address endings that count as a Ukrainian government or regulator source (tier 3), matched on the host name or a
 * subdomain of it. Standard: UNIVERSITY_EVIDENCE_STANDARD.md §6 (tier 3 = Ukrainian government or competent regulator).
 * Adding an ending widens what counts as a government source.
 * @type {readonly string[]}
 */
export const GOVERNMENT_HOST_SUFFIXES = Object.freeze(['gov.ua']);

// ------------------------------------------------------------------------------------------- review age
/** A profile is published only when its last full review (verification.lastReview) is at most this many days old. */
export const REVIEW_MAX_AGE_DAYS = 180;

/**
 * The settings object the policy uses by default. The build never passes another one; the unit tests pass changed copies
 * to prove what each setting does.
 */
export const PUBLICATION_SETTINGS = Object.freeze({
  OVERVIEW_REQUIRES_EDITORIAL_REVIEW,
  PROGRAMME_NAME_REQUIRES_QUOTATION,
  CITY_AND_REGION_REQUIRE_VERIFIED_ADDRESS,
  WITHHELD_PLACE_TEXT,
  RECOGNITION_AUTHORITY_HOSTS,
  WEBSITE_REQUIRES_GOVERNMENT_EVIDENCE,
  GOVERNMENT_HOST_SUFFIXES,
  REVIEW_MAX_AGE_DAYS,
});
