// Proves the RELEASE GATE (scripts/release-gate.mjs, the exact checks the production publish workflow runs before its
// only push) REFUSES in the two situations the owner named, using simulations that never touch real files:
//   S1  a failed publication gate: a record flagged publishable without evidence is added through a temporary
//       universities directory (UMA_UNIVERSITIES_DIR) -> the clean production build and the publication report must fail
//   S2  missing legal details: today's real state -> the release-readiness check must fail on the owner's legal items
//   S3  INTERIM mode (UMA_RELEASE_MODE=interim, RELEASE_AUTHORISATION.md): today's real state -> the gate PASSES, says
//       INTERIM, names the number of open legal items and keeps every other check as it is
//   S4  interim mode without a valid authorisation file -> refused
//   S5  interim mode with a flagged record that fails the policy -> refused (checks 2 and 3 still block)
// All run the gate with --skip-tests (the full suite runs separately in CI) so each simulation costs one build.
// The real dist/ is rebuilt from the real records at the end. Prints "release-gate-selftest: N checks, M failures".
import { spawnSync } from 'node:child_process';
import { mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

let checks = 0, failures = 0;
const check = (cond, msg, detail = '') => { checks++; if (!cond) { failures++; console.log('FAIL', msg, detail ? `\n${detail}` : ''); } else console.log('ok  ', msg); };
const gate = (env) => {
  const r = spawnSync('node', ['scripts/release-gate.mjs', '--skip-tests'], { env: { ...process.env, ...env }, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
  return { status: r.status, out: `${r.stdout ?? ''}${r.stderr ?? ''}` };
};
const line = (out, name) => (out.split('\n').find((l) => l.includes(name) && /^(PASS|FAIL) {2}/.test(l)) ?? '');

const TMP = mkdtempSync(join(tmpdir(), 'uma-gate-'));
try {
  // S1: a failed publication gate
  const uni = join(TMP, 'universities');
  cpSync(resolve('src/content/universities'), uni, { recursive: true });
  cpSync(resolve('tests/fixtures/publication/fail/universities/fixture-flagged-no-evidence.json'), join(uni, 'fixture-flagged-no-evidence.json'));
  const s1 = gate({ UMA_UNIVERSITIES_DIR: uni, UMA_EVIDENCE_DIR: resolve('data/evidence'), UMA_CACHE_DIR: join(TMP, 'cache-s1') });
  check(s1.status === 1, 'S1 failed publication gate: the release gate exits 1', s1.out.split('\n').slice(-12).join('\n'));
  check(/RELEASE GATE: BLOCKED/.test(s1.out), 'S1: the summary says BLOCKED — do not publish');
  check(line(s1.out, 'clean production build').startsWith('FAIL'), 'S1: the clean production build refuses the flagged record');
  check(line(s1.out, 'publication report').startsWith('FAIL'), 'S1: the publication report fails');
  check(/fixture-flagged-no-evidence/.test(s1.out), 'S1: the flagged record is named in the output');

  // S2: missing legal details (today's real state)
  const s2 = gate({ UMA_CACHE_DIR: join(TMP, 'cache-s2') });
  check(s2.status === 1, 'S2 missing legal details: the release gate exits 1', s2.out.split('\n').slice(-12).join('\n'));
  check(line(s2.out, 'clean production build').startsWith('PASS'), 'S2: the real records build (nothing flagged)');
  check(line(s2.out, 'publication report').startsWith('PASS'), 'S2: the publication report passes (no record flagged)');
  check(line(s2.out, 'release readiness').startsWith('FAIL'), 'S2: the release-readiness check refuses');
  check(/legal|owner/i.test(s2.out.slice(s2.out.indexOf('release readiness'))), 'S2: the refusal names the missing owner legal details');

  // S3: interim mode on today's real state
  const s3 = gate({ UMA_RELEASE_MODE: 'interim', UMA_CACHE_DIR: join(TMP, 'cache-s3') });
  check(s3.status === 0, 'S3 interim mode: the release gate exits 0', s3.out.split('\n').slice(-12).join('\n'));
  check(/RELEASE GATE: PASSED \(INTERIM RELEASE under RELEASE_AUTHORISATION\.md\)/.test(s3.out), 'S3: the summary says PASSED (INTERIM RELEASE …)');
  check(/(\d+) legal-page item\(s\) remain open/.test(s3.out) && Number(/(\d+) legal-page item\(s\) remain open/.exec(s3.out)[1]) >= 30, 'S3: the open legal items are counted in the summary (not marked satisfied)');
  check(/published as drafts with the "Draft for legal review" banner/.test(s3.out), 'S3: the summary says the legal pages are published as drafts');
  check(line(s3.out, 'release readiness').startsWith('PASS') && /\[INTERIM: legal items open\]/.test(line(s3.out, 'release readiness')), 'S3: the readiness row is marked INTERIM');
  check(line(s3.out, 'clean production build').startsWith('PASS') && line(s3.out, 'publication report').startsWith('PASS'), 'S3: build and publication report still run and pass');
  check(/NOT READY: \d+ items? blocks? a release/.test(s3.out), 'S3: the readiness check itself still prints NOT READY with the open items');

  // S4: interim mode without a valid authorisation file
  const s4 = gate({ UMA_RELEASE_MODE: 'interim', UMA_RELEASE_AUTHORISATION: join(TMP, 'no-such-authorisation.md'), UMA_CACHE_DIR: join(TMP, 'cache-s4') });
  check(s4.status === 1 && /RELEASE GATE: BLOCKED/.test(s4.out), 'S4 interim without authorisation: BLOCKED', s4.out.split('\n').slice(-12).join('\n'));
  check(/INTERIM MODE REFUSED: no valid owner authorisation/.test(s4.out), 'S4: the refusal names the missing authorisation');

  // S5: interim mode with a flagged record that fails the policy
  const s5 = gate({ UMA_RELEASE_MODE: 'interim', UMA_UNIVERSITIES_DIR: uni, UMA_EVIDENCE_DIR: resolve('data/evidence'), UMA_CACHE_DIR: join(TMP, 'cache-s5') });
  check(s5.status === 1 && /RELEASE GATE: BLOCKED/.test(s5.out), 'S5 interim with a failing flagged record: BLOCKED', s5.out.split('\n').slice(-12).join('\n'));
  check(line(s5.out, 'clean production build').startsWith('FAIL') && line(s5.out, 'publication report').startsWith('FAIL'), 'S5: build and publication report refuse in interim mode too');
  check(/blockers that are not open legal-page items/.test(s5.out) || line(s5.out, 'release readiness').startsWith('FAIL'), 'S5: the readiness row is not accepted as interim when a record fails');
} finally {
  rmSync(TMP, { recursive: true, force: true });
}
console.log(`release-gate-selftest: ${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);
