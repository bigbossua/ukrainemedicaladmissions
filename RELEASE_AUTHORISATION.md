# Release authorisation (interim mode)

Mode: interim
Authorised by: the site owner (GitHub account bigbossua), in this project's assistant session
Date: 2026-10-25
Ends: when the legal review is recorded in site/src/lib/legal.mjs (legalReviewCompleted true, reviewer and date set); from then on only the final release gate applies and this authorisation has no effect

## What is authorised

A production release of the site as built from the working branch, with the four legal pages (`/privacy/`, `/terms/`, `/disclosure/`, `/complaints-policy/`) published **as drafts**: each carries the visible "Draft for legal review" banner and the visible "[to be supplied by the owner: …]" markers for every value the owner has not yet supplied. This is the state the live site has been in since 11 October 2026 (deploy branch `production`, build of 4d4e605: the privacy notice carries the same banner and a placeholder for the legal entity, and the Apply Online form is live). The interim release replaces it with a build whose notice matches the form handler and whose directory lists 45 universities as labelled research previews.

## What is not authorised, and what the gate still refuses

- No legal item is marked satisfied, no sign-off is recorded and no reviewer is named by this authorisation. `npm run check:release` keeps listing every open item; LEGAL_COMPLETION_CHECKLIST.md is unchanged.
- The release gate (`site/scripts/release-gate.mjs`, `UMA_RELEASE_MODE=interim`) still refuses when: the full test suite, the clean production build or the publication report fails; a university record flagged publishable fails the publication policy; any of the four legal pages is built without the "Draft for legal review" banner (a draft must never look final); the release-readiness check reports anything other than open legal-page items (for example a value in the wrong form or a missing build); or this file is missing or incomplete.
- No university fact is published without evidence: the publication policy and the research-preview rules are untouched.

## Owner's instruction (25 October 2026, quoted)

"Take full responsibility for getting the Ukraine Medical Admissions website completed and launched. I am authorising you to make the necessary implementation and release decisions within your available access." … "If the existing gate is unnecessarily coupling independent releases, implement a properly controlled release path that preserves required privacy, security and legal protections. Do not falsify sign-offs, fabricate reviewer approval, or mark unresolved legal requirements as satisfied." … "You have my authority to take ownership of the work and make the necessary decisions within your access. I want the directory live as quickly as it can legitimately be released."

## How it is used

Push the commit to publish as the branch `publish-production-interim` (`git push origin <commit>:refs/heads/publish-production-interim`). The publish workflow runs the release gate in interim mode and, only if it passes, adds the built site to the `production` branch, which the host deploys. The ordinary `publish-production` pointer keeps running the final gate unchanged.
