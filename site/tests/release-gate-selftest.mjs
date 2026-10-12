// Proves the RELEASE GATE (scripts/release-gate.mjs, the exact checks the production publish workflow runs before its
// only push) REFUSES in the two situations the owner named, using simulations that never touch real files:
//   S1  a failed publication gate: a record flagged publishable without evidence is added through a temporary
//       universities directory (UMA_UNIVERSITIES_DIR) -> the clean production build and the publication report must fail
//   S2  missing legal details: today's real state -> the release-readiness check must fail on the owner's legal items
// Both run the gate with --skip-tests (the full suite runs separately in CI) so each simulation costs one build.
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
} finally {
  rmSync(TMP, { recursive: true, force: true });
}
console.log(`release-gate-selftest: ${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);
