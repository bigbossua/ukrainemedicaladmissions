# PUBLICATION_POLICY_DECISIONS.md — the open publication-policy decisions (backlog N24 a–c, N25)

**Date:** 2026-10-12 · **Branch:** `wip/policy` (from `e822e4e`) · **Status:** fail-closed defaults implemented and tested; **every one of them is an owner decision that is still open**. Nothing is published, nothing is deployed, and production (`b2ca3d6`) is unchanged.

**What this memo is.** For each of the three decisions in `TECHNICAL_REPAIR_BACKLOG.md` N24 (a), (b) and (c): the exact backlog wording, what the code did before, what each option means for publishing a profile, for students and for the business, the default now in the code and why it is defensible, and how to change it. It is not legal advice. Where a choice has legal or commercial weight, the memo says so and leaves it to the owner.

**Where the settings live.** Every owner-adjustable setting for these three decisions, and the maximum age of the last full review, is a named constant in `site/src/lib/publication-config.mjs`, each with a comment saying what changing it does (one older open decision is still fixed in the code: see the residual items at the end). The policy code (`site/src/lib/publication.mjs`) reads its settings only from there; a test fails if anything else in `site/src` imports that file or if the build passes other settings. After changing a setting: run `npm test` in `site/`, update the matching check in `site/tests/publication-policy.mjs` (section "N24 settings", which pins the defaults on purpose so that a change is never silent), and record the decision in this memo.

**Effect on the site today: none.** All twelve university records are unpublished, and no official source can be opened from this environment (`DIRECTORY_VERIFICATION_PLAN.md` §10.1a). The defaults decide what the *first* verified profile may show.

## Summary

| | Decision | Default now in the code | Setting (`site/src/lib/publication-config.mjs`) | Owner |
|---|---|---|---|---|
| (a) | Our own text (overview, programme names, city, region) printed without evidence | Overview only after an editorial review tied to the exact text; programme listed only if its name appears in the quotation that verifies its international admission; city and region only if the verified address contains them | `OVERVIEW_REQUIRES_EDITORIAL_REVIEW`, `PROGRAMME_NAME_REQUIRES_QUOTATION`, `CITY_AND_REGION_REQUIRE_VERIFIED_ADDRESS`, `WITHHELD_PLACE_TEXT` | **Confirm or change** |
| (b) | Which hosts count as a recognition authority | None: the list is empty, so no recognition claim is shown | `RECOGNITION_AUTHORITY_HOSTS` | **Confirm or change** (choosing authorities is yours alone) |
| (c) | The official website vouches for itself | The website needs a verified government (.gov.ua) entry listing exactly the same website; until then the university's own pages support nothing | `WEBSITE_REQUIRES_GOVERNMENT_EVIDENCE`, `GOVERNMENT_HOST_SUFFIXES` | **Confirm or change** |
| (d) | Research previews (N25, 2026-10-12): unpublished universities listed by name, labelled "Not yet verified" | On: names only, projection-only pages, noindex, no structured data, not in the sitemap, opt-in per record | `RESEARCH_PREVIEWS` (+ `verification.researchPreview` per record) | **Confirm or change** |

---

## (a) Our own text printed without evidence

**Exact backlog wording (N24 a):** "`overview`, programme names, city and region are editorial text printed without evidence (only checked for internal wording): make `overview` internal until evidenced, or add a reviewer step;"

**What the code did before.** The four fields were classed "editorial-public": printed exactly as written in the record, with no evidence entry. The only check was for research-note wording ("search snippet", "not verified", "to be confirmed" and the like); finding it blocked the whole profile. A sentence in an overview, a programme name or a city therefore reached the page on our word alone.

**Why it matters.** These fields read like facts. An overview can describe a faculty or a teaching arrangement; a programme name labels every fact and fee on its card; a city places the university on the map and in the directory filter. Today's twelve overviews were written from leads, and every one still carries draft wording, so none of them could be published as it stands in any case.

**Options**

| Option | Publishing a profile | Students | Business |
|---|---|---|---|
| **1. Reviewer step plus evidence matching (implemented default)** | A profile can still be published without an overview (it is simply left out until reviewed). A programme is listed only when its name, as recorded, appears in the quotation that verifies its international admission; record the name exactly as the university prints it. City and region are printed only when the verified address contains them; otherwise the city reads "To be confirmed" and the region is left out. | They see only text that a named reviewer has read in its current form, programme names in the university's own words, and no guessed location. | A small extra step per profile (review the overview, record the hash). Some profiles will open with "City to be confirmed" or without an overview until the review is done. A programme the university names differently in different places will need its name recorded as quoted. |
| 2. Make `overview` internal until evidenced | Profiles never show an overview; nothing else changes unless the other rules are also adopted. | Less context on each profile. | Simplest; loses the descriptive paragraph that helps search snippets and reading. |
| 3. Keep printing our text as before (all three settings `false`) | As before 2026-10-12: only the research-note check. | Risk of reading our wording as the university's. | Least work; the highest risk of an unverified statement on a live page. |

**Default implemented (option 1) and why it is defensible.**

- *Overview.* A published profile prints the overview only when `verification.editorialReview` records a reviewer, a review date (not in the future) and the SHA-256 of the overview text exactly as it is now. The hash is the safeguard: any later edit, even one character, no longer matches, so the overview disappears from the page until someone reviews the new text. The review is internal (never printed). Research-note wording in the overview still blocks the whole profile. Command for the reviewer: `node scripts/publication-report.mjs --overview-hash <slug>` (from `site/`).
- *Programme names.* The name is printed only when it appears in the quotation of an evidence entry that actually verifies that programme's international admission (whole words, ignoring letter case and repeated spaces; a word joined by a hyphen or apostrophe counts as one word, so "Medicine" is not found in "Pre-Medicine"; a quotation in an unverified entry, an agent's page or another claim's entry does not count). **Design choice to note:** when the name cannot be printed, the programme is **not listed at all**, rather than listed under a substitute label. Every page that lists a programme labels its facts and its fee with its name; a substitute such as "Medicine programme" would be our guess, and a fee printed against no name would mislead. If you prefer the programme to be listed under our field label instead, say so; that needs a page change as well as this setting.
- *City and region.* Each is printed only when it appears, as whole words, in the address the profile shows as verified (a hyphenated place name is one word: "Ivano" or "Frankivsk" is not found in "Ivano-Frankivsk"). Whole-word matching cannot tell a city from a street of the same name ("Kyiv" in "12 Kyiv Street, Vinnytsia"), so the reviewer still checks that the city recorded is the one the address names. A withheld city reads "To be confirmed" in the directory's city filter and on the home and course pages, and "City to be confirmed" on directory cards, the profile and the comparison table; a withheld region is left out. If an address is recorded only in Ukrainian, record the city the same way or it will stay withheld. This never guesses a location.

**How to change it.** In `site/src/lib/publication-config.mjs`: set `OVERVIEW_REQUIRES_EDITORIAL_REVIEW`, `PROGRAMME_NAME_REQUIRES_QUOTATION` or `CITY_AND_REGION_REQUIRE_VERIFIED_ADDRESS` to `false` to drop that rule; `WITHHELD_PLACE_TEXT` changes the words printed for a withheld city. For option 2, ask for the overview field to be reclassified as internal in `FIELD_POLICY` (`site/src/lib/publication.mjs`).

**OWNER DECISION: confirm or change** (option 1 as implemented; and whether an unquotable programme name means "not listed", as now, or "listed under our field label").

---

## (b) Recognition evidence

**Exact backlog wording (N24 b):** "tier-4 recognition evidence is checked only against university and excluded hosts: add an allow-list of recognition authority hosts, empty by default;"

**What the code did before.** A recognition claim needed tier-4 evidence (the destination country's recognition authority), not on the university's own website and not on a search, archive, directory or social host. Any other host was accepted on the reviewer's judgement that it belonged to a recognition authority.

**Options**

| Option | Publishing a profile | Students | Business |
|---|---|---|---|
| **1. Empty allow-list (implemented default)** | No recognition claim is shown on any profile; the Recognition row reads "To be confirmed". Recognition is not a publication requirement, so profiles can still go live. | No statement about recognition in their country from us; they rely on their own regulator, which is where the decision sits. | No recognition marketing. Lowest risk of implying that a degree leads to registration or the right to practise. |
| 2. List the authorities you choose | A claim is shown only from a tier-4 page on a listed host (or a subdomain of it), quoted and dated, with every other rule still applying. | A dated quotation from the authority, naming the country. | You decide which countries' authorities, and you own the wording. Each listed authority's pages must then be read and re-checked on schedule. |
| 3. No list (as before) | Any non-excluded host the reviewer judges to be an authority. | Same as option 2, but with less certainty about the source. | Relies entirely on reviewer judgement; a look-alike or unofficial page could slip through. |

**Default implemented (option 1) and why it is defensible.** `RECOGNITION_AUTHORITY_HOSTS` is empty. Choosing which authorities count is a legal and commercial decision for the owner, so the code makes none. Recognition statements are where implied professional registration is most likely (`UNIVERSITY_EVIDENCE_STANDARD.md` §9), and a wrong statement could lead a student to a decision they cannot reverse. Even with an authority listed, the university's own website and directories never count, and a look-alike host does not match.

**Public wording, if a claim is ever shown.** It must state what the authority's page says and its date, naming the country and the authority. It must never say or imply that a degree guarantees registration, a licence, eligibility for a licensing examination or the right to practise. It should sit beside the "check with the regulator in your own country" statement, whose exact wording is still open (`UNIVERSITY_EVIDENCE_STANDARD.md` §13 item 14). The profile today prints only "To be confirmed" for recognition; the wording for a shown claim would be a page change made when you choose option 2.

**How to change it.** Add bare host names (lower case, no `https://`, no path) to `RECOGNITION_AUTHORITY_HOSTS` in `site/src/lib/publication-config.mjs`, then update the "N24 settings" check in `site/tests/publication-policy.mjs` and record here which authorities you chose and why.

**OWNER DECISION: confirm or change** (keep the list empty, or name the authorities).

---

## (c) Circular official host

**Exact backlog wording (N24 c):** "the official host for tier 1-2 evidence comes from the record's own website claim (circular): require tier-3 (.gov.ua) evidence for `website`;"

**What the code did before.** The official host was taken from the record's own `website` value, whether or not that value was verified, and the website claim itself could be backed by a page on that same website. A record pointing at the wrong domain (a look-alike or an agent's copy) would have made that domain's pages count as "the university's own" for every fact.

**Options**

| Option | Publishing a profile | Students | Business |
|---|---|---|---|
| **1. Government listing required (implemented default)** | **No profile can go live until a Ukrainian government page (an address ending .gov.ua, for example the Ministry portal or EDEBO) listing exactly the same website has been read and recorded as a verified tier-3 entry.** Until then the university's own pages (tiers 1 and 2) support nothing: no name, address, programme or fee read there is shown. A verified government entry listing a *different* website is a conflict, and everything that depends on the official host stays withheld. | Every fact on a profile traces back to a domain a government register attributes to the university, which is the main protection against look-alike sites. | Slower first publication: one more page per university, on hosts that are also refused from this environment (`info.edbo.gov.ua`, `mon.gov.ua`, `studyinukraine.gov.ua`, `universities.studyinukraine.gov.ua` in §10.1a). Whether each register page lists the university's website has **not** been checked, because those hosts cannot be opened; if none does for a university, that profile cannot be published under this default. An owner capture of the government page (Route B, `owner-capture` with its capture file named) counts like any other tier-3 entry. |
| 2. Allow the university's own pages alone (setting `false`) | As before: the website can be verified from the website itself. | The look-alike risk returns. | Faster; matches today's reviewer workflow with "domain not cross-checked with a register" in the method. |
| 3. A different anchor | For example accept only a NAQA certificate naming the domain (still a .gov.ua page, so option 1 already accepts it), or a published letter on the university's domain (still circular). | — | Needs a code change; tell us which anchor. |

**Default implemented (option 1) and why it is defensible.** `WEBSITE_REQUIRES_GOVERNMENT_EVIDENCE` is `true`. It turns the evidence standard's proposal into a rule: §13 item 6 proposes that the domain check against a tier-3 register is mandatory before publishing, once a register can be opened. It closes the one loop in the policy where a record could vouch for itself, and it fails closed: no government listing, no official host. "Exactly the same website" means character for character, including a trailing "/", so record the website exactly as the register prints it and use that same value in the record.

**How to change it.** In `site/src/lib/publication-config.mjs`: `WEBSITE_REQUIRES_GOVERNMENT_EVIDENCE = false` for option 2; `GOVERNMENT_HOST_SUFFIXES` lists the address endings that count as tier 3 (today only `gov.ua`, from `UNIVERSITY_EVIDENCE_STANDARD.md` §6), and adding one widens what counts as a government source.

**OWNER DECISION: confirm or change** (keep the government listing as a precondition, or allow the university's own pages alone).

---

## (d) Research previews: listing unverified universities by name (N25, added 2026-10-12)

**Owner instruction (2026-10-12):** "Keep unverified university claims out of public pages. However, do not let the absence of verified details prevent you from building a useful directory interface, navigation, search/filter components, page templates and clearly labelled research previews." and "Keep all 12 existing university records unpublished until their required evidence checks pass."

**Before:** an unpublished record left no trace in a production build: no card, no page, no mention (the directory said "we do not list the university here, not even as pending"). With zero evidence entries recorded, the directory was empty and the live site still showed the old, unverified Ternopil card.

**What the code does now (default ON).** A real record that is **not published** and **opts in** (`verification.researchPreview: true`, set on all 12 records) is listed as a *research preview*:
- a directory card and a home-page entry with its short name and the label **"Not yet verified"**, and a choice in the apply and home forms labelled "(not yet verified)";
- a page at `/universities/<slug>/` built **only** from the policy projection (`toPublicRecord`) — exactly what a published profile could print. Today that means the name and nothing else; each fact appears with its source and date only once its evidence passes the same rules as a published profile (so previews fill in progressively, starting with Vinnytsia once its sources can be read);
- `noindex, follow`, no structured data, never in the sitemap; the page says it is not the university's website and claims no partnership; the apply route is `/apply/?university=<slug>`.

**What stays the same.** The 12 records remain unpublished (the gate reports "0 published, 12 research previews"). Fee, course and comparison content never lists a preview (enforced by a static test). Synthetic samples and records that do not opt in never appear. A record flagged publishable that fails the policy still stops the build, whether or not it opts in.

**Options and consequences.**

| Option | For students | For the business | Risk |
|---|---|---|---|
| **On (default)** | Can see which universities the service covers, search them, read what to check before applying and start an application for a named university | A visible, honest directory; the pages earn trust now and become indexable profiles automatically once verified | Low: names only, clearly labelled; a name spelling may differ from the official title (the page says the official name is still to be confirmed) |
| Off (`RESEARCH_PREVIEWS = false`) | Empty directory until the first profile is verified | Nothing to show visitors until official sources can be read | None from content; high commercial cost |
| On and indexable (not implemented) | Same as On | Preview pages could appear in search results | Twelve near-identical "not yet verified" pages risk being judged thin; not recommended until each has verified facts |

**Setting:** `RESEARCH_PREVIEWS` in `site/src/lib/publication-config.mjs`; per record, `verification.researchPreview` in the record file. **Owner: confirm** the default and the student-facing label "Not yet verified".

## Technical gaps fixed at the same time (no owner decision needed)

| Backlog wording (N24) | What the code does now |
|---|---|
| (d) "preparatory `startDate` and free-text `intake` are guarded by `nextReview`, not by a date check;" | A preparatory start date or a free-text intake that contains a date written YYYY-MM-DD that has passed is withheld, whether the date stands alone or sits inside the text ("2026-09-01 (orientation week)", "2026-09-01T09:00", one of two dates); so is one naming any year before the current academic year's start year (in 2026/27, "September 2025" or "2025/26 intake"). An impossible YYYY-MM-DD date is withheld. A date written any other way in the current academic year is still guarded only by its `nextReview` date (see residual items). |
| (e) "the tuition "To be confirmed" text mentions a payment schedule that the fee display never prints;" | When a fee is shown, the profile, the preparatory route card and the comparison table now print the year-by-year amounts and the payment schedule exactly as recorded, when the verified value carries them (they are part of the value the evidence matched). The "To be confirmed" explanation now promises only what is printed: the amount, the currency, what it is charged per, the academic year, and the schedule and year-by-year amounts *where the university states them*. |
| (f) "records in subdirectories of `src/content/universities` are built but not checked by R1-R11;" | The universities and samples collections read top-level `*.json` files only (`site/src/content.config.ts`); `npm run test:records` (new rule R12) fails if a subdirectory or any other file appears there; a fixture build proves that a flagged record placed in a subdirectory produces no page. |

---

## Other owner decisions still open (referenced, not restated)

1. **N24 (j) Zaporizhzhia:** the draft lists Perfume-Cosmetic Technology and Pediatrics as field "other". Keep or drop (`TECHNICAL_REPAIR_BACKLOG.md` N24 j).
2. **The 17 items in `UNIVERSITY_EVIDENCE_STANDARD.md` §13** (the "TO CONFIRM (owner)" list). The defaults above touch three of them: item 6 (domain check against a tier-3 register mandatory) is what decision (c) implements; item 14 (wording of the "check with your own regulator" statement) is needed before any recognition claim under decision (b); item 4 (whether a World Directory of Medical Schools listing is shown) is unchanged: WDOMS is never evidence in the code.
3. **Residual items found while doing this work** (none affects today's output, because nothing is published):
   - Preparatory route names are also our own text. A route is shown only when at least one of its facts is verified, but its name is not checked against a quotation. Same choice as decision (a): apply the quotation rule, or keep as is.
   - A free-text intake or start date with no year at all ("1 September"), with a two-digit year ("Sept '25"), or written in words within the current academic year after it has passed ("1 September 2026", read in October 2026) is guarded only by its `nextReview` date (required for both, because they are time-sensitive). Writing start dates as YYYY-MM-DD lets the date check withhold them once they pass.
   - `UNIVERSITY_EVIDENCE_STANDARD.md` §13 item 16 (which source tiers count for claims other than recognition, accreditation and fees) is still fixed in the code as tiers 1–3 (`allowedTiers` in `site/src/lib/publication.mjs`), not a setting in `publication-config.mjs`. If you decide to narrow it, that is a code change.
   - Pages outside this work package: `/tuition-fees/` prints a shown fee as amount and basis only (it should print the schedule and year-by-year amounts too), and its text promises "five properties" for every fee, three of which (collection currency and exchange rate, track, exclusions) have no field in the fee record; the profile's meta description is written as "short name, city", so a withheld city would read "To be confirmed" there. These need page changes, listed for the integrating work package.

**Nothing in this memo is a fact about any university, and nothing here has been verified against an official source.**
