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
// Options: --skip-tests  skip check 1 (used only by tests/release-gate-selftest.mjs to keep simulations fast)
//          --json <file> also write the result table as JSON
// Environment is passed through unchanged (the self-test uses UMA_UNIVERSITIES_DIR / UMA_EVIDENCE_DIR and the
// legal fixture variable to simulate failures without touching real files).
import { spawnSync } from 'node:child_process';
import { rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const skipTests = args.includes('--skip-tests');
const jsonOut = args.includes('--json') ? args[args.indexOf('--json') + 1] : null;
const SITE = resolve(new URL('..', import.meta.url).pathname);

const run = (cmd, argv) => {
  const r = spawnSync(cmd, argv, { cwd: SITE, env: process.env, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
  const out = `${r.stdout ?? ''}${r.stderr ?? ''}`;
  return { ok: r.status === 0, status: r.status, tail: out.trim().split('\n').slice(-12).join('\n') };
};

const checks = [];
const step = (name, fn) => {
  const started = Date.now();
  const r = fn();
  checks.push({ name, ok: r.ok, status: r.status, seconds: Math.round((Date.now() - started) / 1000), tail: r.tail });
  console.log(`\n=== ${r.ok ? 'PASS' : 'FAIL'}  ${name}${r.ok ? '' : ` (exit ${r.status})`}\n${r.tail}`);
};

if (!skipTests) step('full test suite (npm test)', () => run('npm', ['test']));
step('clean production build (rm -rf dist && npm run build)', () => { rmSync(resolve(SITE, 'dist'), { recursive: true, force: true }); return run('npm', ['run', 'build']); });
step('publication report (npm run report:publication)', () => run('npm', ['run', 'report:publication']));
step('release readiness: legal details, legal review, built legal pages, publication (npm run check:release)', () => run('npm', ['run', 'check:release']));

const failed = checks.filter((c) => !c.ok);
console.log('\nRELEASE GATE SUMMARY');
for (const c of checks) console.log(`${c.ok ? 'PASS' : 'FAIL'}  ${c.name}  (${c.seconds}s)`);
console.log(failed.length ? `RELEASE GATE: BLOCKED — ${failed.length} of ${checks.length} checks failed. Do not publish.` : `RELEASE GATE: PASSED — all ${checks.length} checks passed${skipTests ? ' (tests skipped: self-test mode, not valid for a release)' : ''}.`);
if (jsonOut) writeFileSync(jsonOut, JSON.stringify({ passed: !failed.length, skipTests, checks }, null, 2));
process.exit(failed.length ? 1 : 0);
