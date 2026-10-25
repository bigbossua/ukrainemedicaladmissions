#!/usr/bin/env node
// RELEASE GATE — the single list of checks a production publish must pass. The publish workflow
// (.github/workflows/publish-production-branch.yml, targets "production" and "verify") runs exactly this script
// before its only push step, so the workflow and local runs can never drift apart.
//
// Checks (all run, every failure is reported; exit 1 if any fails):
//   1. full test suite            npm test   (records + evidence rules, readiness, publication policy and fixture
//                                             builds, build, links, meta, redirects, UI, a11y, perf, release tooling,
//                                             staging guard, publication gate, preview UI, PHP form handler)
//   2. clean production build     rm -rf dist && npm run build   (what is deployed is built fresh, never reused)
//   3. publication report         npm run report:publication     (fails if a flagged record fails the policy)
//   4. release readiness          npm run check:release          (owner legal details, legal review flag, draft
//                                                                  markers in the built legal pages, publication)
// INTERIM MODE (UMA_RELEASE_MODE=interim; owner authorisation of 2026-10-25, RELEASE_AUTHORISATION.md at the repository
// root): checks 1-3 are unchanged and still block. Check 4 may report open LEGAL-PAGE items without blocking, and only
// when ALL of these hold: the authorisation file exists with Mode "interim" and an "Ends:" line; every one of the four
// built legal pages carries the "Draft for legal review" banner (a draft never looks final); and the readiness check
// reports nothing but open legal-page items (missing owner details, unapproved proposals, the legal review, pages that
// are not final). Anything else (a value in the wrong form, a page not built, a record flagged publishable that fails
// the policy) blocks as before. Nothing is marked satisfied: the open items are printed in the summary. The ordinary
// mode (no variable) is unchanged and blocks until the legal review is recorded.
// Options: --skip-tests  skip check 1 (used only by tests/release-gate-selftest.mjs to keep simulations fast)
//          --json <file> also write the result table as JSON
// Environment is passed through unchanged (the self-test uses UMA_UNIVERSITIES_DIR / UMA_EVIDENCE_DIR and the
// legal fixture variable to simulate failures without touching real files).
import { spawnSync } from 'node:child_process';
import { rmSync, writeFileSync, readFileSync, existsSync, mkdtempSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';

const args = process.argv.slice(2);
const skipTests = args.includes('--skip-tests');
const jsonOut = args.includes('--json') ? args[args.indexOf('--json') + 1] : null;
const SITE = resolve(new URL('..', import.meta.url).pathname);
const INTERIM = process.env.UMA_RELEASE_MODE === 'interim';
const AUTH_FILE = resolve(process.env.UMA_RELEASE_AUTHORISATION || join(SITE, '..', 'RELEASE_AUTHORISATION.md'));
const LEGAL_PATHS = ['/privacy/', '/terms/', '/disclosure/', '/complaints-policy/'];
const INTERIM_ALLOWED = /^(missing owner detail|proposal not approved|legal review|built page not final):/;
const TMP = mkdtempSync(join(tmpdir(), 'uma-release-gate-'));

/** The authorisation file, when it is present and complete: Mode interim, an authoriser, a date and an "Ends:" line. */
function authorisation() {
  if (!existsSync(AUTH_FILE)) return { ok: false, why: `${AUTH_FILE} is missing` };
  const t = readFileSync(AUTH_FILE, 'utf8');
  const field = (name) => (new RegExp(`^${name}:\\s*(.+)$`, 'mi').exec(t)?.[1] ?? '').trim();
  if (field('Mode') !== 'interim') return { ok: false, why: 'the authorisation file does not state "Mode: interim"' };
  if (!field('Authorised by') || !/^\d{4}-\d{2}-\d{2}$/.test(field('Date')) || !field('Ends')) return { ok: false, why: 'the authorisation file lacks "Authorised by:", a "Date:" written YYYY-MM-DD or an "Ends:" line' };
  return { ok: true, why: `${AUTH_FILE} (${field('Date')}, ends ${field('Ends').slice(0, 60)}…)` };
}

/**
 * In interim mode, a failed readiness check passes when every blocker is an open legal-page item, every legal page
 * carries the draft banner and the authorisation is valid. Returns the amended result for the step table.
 */
function interimVerdict(r, reportFile) {
  if (!INTERIM || r.ok) return r;
  let report;
  try { report = JSON.parse(readFileSync(reportFile, 'utf8')); } catch { return { ...r, tail: `${r.tail}\nINTERIM: the readiness report could not be read, so the check stays FAILED.` }; }
  const auth = authorisation();
  const other = report.blockers.filter((b) => !INTERIM_ALLOWED.test(b));
  const noBanner = LEGAL_PATHS.filter((p) => report.banners?.[p] !== true);
  const legalOpen = report.blockers.filter((b) => INTERIM_ALLOWED.test(b)).length;
  const reasons = [];
  if (!auth.ok) reasons.push(`no valid owner authorisation: ${auth.why}`);
  if (other.length) reasons.push(`blockers that are not open legal-page items: ${other.join('; ')}`);
  if (noBanner.length) reasons.push(`legal page(s) built without the "Draft for legal review" banner: ${noBanner.join(', ')} (a draft must never look final)`);
  if (reasons.length) return { ...r, tail: `${r.tail}\nINTERIM MODE REFUSED: ${reasons.join(' | ')}` };
  return { ok: true, status: 0, interim: true, legalOpen, tail: `${r.tail}\nINTERIM MODE: accepted under ${auth.why}. ${legalOpen} legal-page item(s) remain OPEN and are published as drafts with the "Draft for legal review" banner on all four pages; nothing is marked satisfied.` };
}

const run = (cmd, argv) => {
  const r = spawnSync(cmd, argv, { cwd: SITE, env: process.env, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
  const out = `${r.stdout ?? ''}${r.stderr ?? ''}`;
  return { ok: r.status === 0, status: r.status, tail: out.trim().split('\n').slice(-12).join('\n') };
};

const checks = [];
const step = (name, fn) => {
  const started = Date.now();
  const r = fn();
  checks.push({ name, ok: r.ok, status: r.status, seconds: Math.round((Date.now() - started) / 1000), tail: r.tail, interim: r.interim === true, legalOpen: r.legalOpen ?? null });
  console.log(`\n=== ${r.ok ? 'PASS' : 'FAIL'}  ${name}${r.ok ? '' : ` (exit ${r.status})`}\n${r.tail}`);
};

if (!skipTests) step('full test suite (npm test)', () => run('npm', ['test']));
step('clean production build (rm -rf dist && npm run build)', () => { rmSync(resolve(SITE, 'dist'), { recursive: true, force: true }); return run('npm', ['run', 'build']); });
step('publication report (npm run report:publication)', () => run('npm', ['run', 'report:publication']));
const readinessReport = join(TMP, 'release-readiness.json');
step('release readiness: legal details, legal review, built legal pages, publication (npm run check:release)', () => interimVerdict(run('npm', ['run', 'check:release', '--', '--json', readinessReport]), readinessReport));

const failed = checks.filter((c) => !c.ok);
const interimStep = checks.find((c) => c.interim);
console.log('\nRELEASE GATE SUMMARY');
for (const c of checks) console.log(`${c.ok ? 'PASS' : 'FAIL'}  ${c.name}${c.interim ? ' [INTERIM: legal items open]' : ''}  (${c.seconds}s)`);
console.log(failed.length ? `RELEASE GATE: BLOCKED — ${failed.length} of ${checks.length} checks failed. Do not publish.`
  : interimStep ? `RELEASE GATE: PASSED (INTERIM RELEASE under RELEASE_AUTHORISATION.md) — tests, build and publication report passed; ${interimStep.legalOpen} legal-page item(s) remain open and the four legal pages are published as drafts with the "Draft for legal review" banner${skipTests ? ' (tests skipped: self-test mode, not valid for a release)' : ''}.`
  : `RELEASE GATE: PASSED — all ${checks.length} checks passed${skipTests ? ' (tests skipped: self-test mode, not valid for a release)' : ''}.`);
if (jsonOut) writeFileSync(jsonOut, JSON.stringify({ passed: !failed.length, interim: !!interimStep, legalOpen: interimStep?.legalOpen ?? null, skipTests, checks }, null, 2));
rmSync(TMP, { recursive: true, force: true });
process.exit(failed.length ? 1 : 0);
