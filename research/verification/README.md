# research/verification — evidence registers for manual verification

One folder per university record, created only for records whose verification has been approved (2026-10-11: Vinnytsia, Odesa, Bukovinian). Each `EVIDENCE_REGISTER.md` is generated from the record JSON and lists, row by row, every claim the published profile would show: the field's JSON path, its current status, the unverified lead (if any), the official page(s) to open, what to read and record, and empty columns for the capture file name, the verified value or wording and the date read.

**Nothing in these registers is verified.** As of 2026-10-11 every official `.ua` domain is unreachable from the build environment (DNS refused for both `curl` and the fetch tool — see `SOURCE_VERIFICATION_REGISTER.md`), so the registers are the precise work-list for either route:

- **Route A** — the owner allow-lists the domains (`DIRECTORY_VERIFICATION_PLAN.md` §3); Claude then opens the pages, fills the register and the JSON in the same session, and records the session in `SOURCE_VERIFICATION_REGISTER.md`.
- **Route B** — the owner or daughter captures the pages (section "How to capture a page" in each register) and shares the folder; Claude (or the daughter, via GitHub) transcribes the values into the JSON with `source` = the exact URL and `checked` = the capture date.

Captures stay **outside the repository** while it is public (confirmed public on 2026-10-11). The register records only file names such as `odesa-national-medical-university--08--fees.pdf`.

A record becomes `publishable: true` only when every row of its register is either verified or closed as not-published with the page that is silent, its open questions are empty, `lastReview` is set, and `npm test` passes (`test:records` rules R1–R9, `test:gate`, `test:preview`). Deferred programmes (`deferredProgrammes[]`) are never published until an official page states that international applicants are admitted.

Regenerate a register after the JSON changes (from the repository root): `python3 -I site/scripts/make-evidence-register.py <slug> [<slug> ...]`.
