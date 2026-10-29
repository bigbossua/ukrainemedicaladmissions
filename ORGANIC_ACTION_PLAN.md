# Organic action plan (26 October 2026)

**Scope.** Grow organic traffic from the 18 published URLs and the 45 noindex university previews. No new pages, no deployment, and no paid SEMrush use until the £0 steps are done.
**Sources.** `KEYWORD_URL_MAP.md` §20 (checked twice against the CSV lines), `SEO_PAGE_PLAN.md` §5 and §8, `research/semrush/*.csv`, and the build of `6c77d82`.
**No performance claim.** No Search Console or analytics data has been shared with this project, so nothing here says how any page ranks or performs.

## State, verified on 26 October 2026

| Item | Value |
|---|---|
| Production branch `production` | `2b86c0d`: the build of source `45b1926` (tag `release-20261026-052914`, interim mode, legal pages published as drafts) |
| Release pointers | `publish-production-interim` at `45b1926`; `publish-production` (final gate) at `4d4e605` (11 October), not moved since |
| Research branch `claude/university-profile-pipeline` | `6c77d82`: five commits after `45b1926`, containing tests, scripts, evidence-access records and SEO documents only. No file under `site/src`, `site/public` or the Astro config changed. Its build is identical to production (tree `d0849e8`). Nothing needs deploying, and nothing was deployed. |
| Indexable URLs | 18, all in the sitemap |
| University profiles | 45: all `noindex, follow`, none in the sitemap, 0 verified (0 of 88 official hosts reachable on 26 and 29 October) |
| Release readiness | Not ready: 36 items block the final gate (owner details for the legal pages and legal review; `LEGAL_COMPLETION_CHECKLIST.md`) |
| Live site | Not checked: this environment cannot reach the domain |

## Actions, ordered by expected organic impact, evidence and effort

| # | Action | Who | Cost | Effort | Evidence | Expected effect |
|---|---|---|---|---|---|---|
| 1 | **Search Console baseline.** Export Performance (queries, pages and countries, last 3 months) and the Pages report (`ANALYTICS_AND_SEARCH_CONSOLE.md` §A3) | Owner | £0 | 15 minutes | None yet: this export *is* the evidence | First real data on which of the 18 pages get impressions. It decides actions 6–8 and any SEMrush spend |
| 2 | **Official-source access for the 12 P0 universities.** Allow the hosts in `research/verification/ALLOWLIST_ALL.txt` in the environment's network settings, or send captures (`OWNER_ACTION_SHEET.md`). Claude then verifies each profile | Owner, then Claude | £0 | 10 minutes, then one verification per university | Exact demand of 100 or more (database `in`): IEU 590, Bukovinian 480, Kharkiv NMU 390, Odesa NMU 390, Vinnytsia 390, Lugansk 390 (ambiguous), Bogomolets 320, Ivano-Frankivsk 210, Kyiv MU 140 (ambiguous), Uzhhorod 140, Ternopil 110, Sumy 110 | The largest opportunity. A verified profile can lose its noindex and enter the sitemap (the publication gate decides), and profiles are the pages closest to an application |
| 3 | **One official, dated fee schedule** on `/tuition-fees/`, from the same access | Claude, after 2 | £0 | Small | "mbbs in ukraine fees" in 260 · kd 7, exact: the lowest kd of any measured keyword at 100 or more. "ukraine medical college fees" in 590, broad. The SERP shows agencies and Quora | Fills the page's main gap, a real figure. It also meets half of the India guide's gate |
| 4 | **Link the directory body to `/faq/`**, the item still pending in `SEO_PAGE_PLAN.md` §5 | Claude | £0 | Minutes | Page plan; `/faq/` answers the measured questions (10–40 each) | Small; completes the internal links |
| 5 | **Sitemap `lastmod`** taken from each page's real last change (`seo-audit` SEO-02). Add it before the first profile is published | Claude | £0 | Small | SEO audit finding SEO-02 | Faster recrawl once profiles and fees go live |
| 6 | **Retitle only where Search Console shows a mismatch** (`SEO_PAGE_PLAN.md` §8: "two URLs share a group → fix titles and links") | Claude, after 1 | £0 | Small | Search Console queries per page | No guessing. The current titles already carry the measured phrases ("MBBS" on `/courses/medicine/`, "MBBS … fees" on `/tuition-fees/`, "list of medical colleges" on `/universities/`, "eligibility" on `/admissions/`) |
| 7 | **`/courses/pharmacy/`:** keep it until the first verification batch, then fold it into `/courses/` if nothing is verified | Owner decision | £0 | Small | "study pharmacy in ukraine" uk 0 exact; SEO-01: 34 % similar to dentistry | Removes a thin page; low impact |
| 8 | **Paid SEMrush, only after 1–3:** (a) `phrase_these` on queries that Search Console shows but no export holds; (b) local-language demand in eg, ma, az, ge, tr, bd and gh, only if Search Console shows impressions from those countries | Owner sets the budget | Paid | — | Ledger: 0 units available. The head term in those markets measures 0–20 | Measures demand before any new page is built |

Actions 4 and 5 are code changes. They are ready once the owner approves, and they are released only through the gated workflow with the owner's go-ahead, never just because CI passes.

## Leads (3): follow-up, privacy-safe

**Not checked from this session.** The site has no lead admin area. Each enquiry is stored in two places: a JSON file in `uma-private/enquiries/` on Hostinger (outside `public_html`), and an email to the notification address. The record has no status field, so follow-up status lives in the mailbox. This session cannot open hPanel, the mailbox or the live server.

Report back counts only, never names, email addresses or message text:

- received;
- replied to within 24 hours;
- awaiting the applicant;
- qualified (a course and intake in view);
- closed: not eligible, not interested, or no response after two follow-ups.

Keep the files private (mode 0600, inside `uma-private/`). Never paste them into chats, issues or commits.

## Owner actions

1. **Leads.** Check the three enquiries in hPanel File Manager and the notification mailbox, then send the counts above. To have Claude do this in your logged-in browser, start a session on your own computer: the Claude Desktop app, or `claude remote-control` in the project folder.
2. **Live verification.** Open `https://ukrainemedicaladmissions.com/universities/` and confirm it shows 45 universities with "Not yet verified" labels. Confirm that `/sitemap-0.xml` lists 18 URLs. In Search Console, run URL Inspection → Test live URL for `/` and `/universities/`.
3. **Search Console export:** action 1.
4. **Official-source access:** action 2.
5. **Legal review.** Supply the owner details and get a qualified reviewer to sign off the 36 open items (`LEGAL_COMPLETION_CHECKLIST.md`). The four legal pages keep the "Draft for legal review" banner until then. Releases after that use the final gate (`publish-production`).
6. **SEMrush.** Needed only for action 8: confirm the live unit balance and set a budget first.
