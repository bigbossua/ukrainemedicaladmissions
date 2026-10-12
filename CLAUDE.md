# Working rules for this repository (Ukraine Medical Admissions)

## SEO decisions: SEMrush is the decision engine (owner rule, 2026-10-12, mandatory)

1. **Before any SEO decision**, read the existing exports in `research/semrush/` and `SEMRUSH_API_LEDGER.md` first. Use SEMrush evidence for keyword demand, intent, country databases, keyword difficulty, competitors, ranking pages, traffic opportunities and keyword gaps wherever it exists.
2. **Before creating or changing a page**, map the URL to actual SEMrush evidence: target keyword cluster, country database, intent, competing pages, expected organic opportunity. Never create a page to increase the page count. The page plan is `SEO_PAGE_PLAN.md`; the master register is `KEYWORD_URL_MAP.md`.
3. **University research**: SEMrush demand sets the research and verification order only. University facts are verified separately against official sources (`UNIVERSITY_EVIDENCE_STANDARD.md`). Search demand never proves legitimacy, licence, recognition or admissions availability.
4. **Continuous optimisation**: use the available SEMrush data to review existing URLs, find missing topics, detect cannibalisation and re-prioritise when new evidence arrives.
5. **Budget discipline**: inspect existing exports before any call; no duplicate queries; smallest useful scope; record every call in the ledger (question, database, report, lines, `usage.api_units`, file, decision); reconcile the balance against the owner's account reading (the MCP never reports the balance). Never buy units, change the subscription or exceed the authorised budget without the owner's approval.
6. **Evidence integrity**: never invent volumes, keyword difficulty, traffic, competitor findings or SEMrush results. Record database, date, file and figures. Label unavailable or unverified metrics. Exact-match and broad-match figures are different things; never add overlapping volumes.
7. **Organic only**: no paid advertising, paid traffic or paid backlinks. Every page needs a defensible role in a sustainable organic acquisition asset.
8. **When SEMrush is unavailable**: use the existing exports, name the precise missing evidence and report the blocker. Never substitute guesses or present other sources as SEMrush findings.

Every major SEO progress report states: SEMrush evidence used, databases covered, opportunities found, URLs affected, units consumed, the confirmed remaining balance (or that it is unconfirmed), and the next evidence-backed priorities.

## Standing release and content rules (owner)

- Work on `claude/university-profile-pipeline`. Do not deploy, change DNS or move the `publish-production` pointer without the owner's explicit approval.
- Never weaken the publication gate or the legal checks, and never change a failing check to passing just to release. University records stay unpublished until their evidence passes (`site/src/lib/publication.mjs`).
- Never invent university facts, fees, partnerships, recognition, testimonials, legal identity details, retention periods or reviewer sign-off. A blocked website is an access limitation, never evidence.
- Keep these separate: registration, programme licence, accreditation, destination-country recognition, professional registration.
- Primary call to action: "Apply Online Now". No WhatsApp links. Do not collect candidate documents before the privacy and security requirements are complete. Never commit secrets.
- Preserve the Content Security Policy and security headers.
