// Static guard over the PUBLISHING workflow itself (not the application): fails if the production publish could
// push without the release gate, if the non-deploying "verify" target could push, if a workflow call could select a
// deploy target, if the gate loses one of its checks, or if CI stops exercising the publish workflow.
// Prints "publish-workflow: N checks, M failures".
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import YAML from 'yaml';

const ROOT = resolve('..');
let checks = 0, failures = 0;
const check = (cond, msg, detail = '') => { checks++; if (!cond) { failures++; console.log('FAIL', msg, detail ? `(${detail})` : ''); } };

const wf = YAML.parse(readFileSync(resolve(ROOT, '.github/workflows/publish-production-branch.yml'), 'utf8'));
const ci = YAML.parse(readFileSync(resolve(ROOT, '.github/workflows/ci.yml'), 'utf8'));
const gate = readFileSync(resolve('scripts/release-gate.mjs'), 'utf8');
const pkg = JSON.parse(readFileSync(resolve('package.json'), 'utf8'));
const on = wf.on ?? wf[true];
const steps = wf.jobs?.publish?.steps ?? [];
const idx = (pred) => steps.findIndex(pred);
const runOf = (s) => String(s.run ?? '');

// Triggers and target validation
check(on?.workflow_call?.inputs?.target?.default === 'verify', 'workflow_call exists and defaults to target verify');
check((on?.workflow_dispatch?.inputs?.target?.options ?? []).includes('verify'), 'manual runs can choose verify (no deploy)');
const resolveStep = steps[idx((s) => s.name === 'Resolve and validate target')];
check(resolveStep && /a workflow call may only run target verify/.test(runOf(resolveStep)), 'a workflow call cannot select staging or production');
check(resolveStep && /production\) if \[ "\$CONFIRM" != "PUBLISH" \]/.test(runOf(resolveStep)), 'production still requires the typed PUBLISH confirmation');
// Interim release (RELEASE_AUTHORISATION.md, 2026-10-25): the interim pointer branch maps to the SAME production target and
// gate, only with UMA_RELEASE_MODE=interim; the gate accepts interim only with the authorisation file and the draft banners.
check((on?.push?.branches ?? []).includes('publish-production-interim'), 'the interim pointer branch triggers the workflow');
// No token in .git/config (audit SEC-2, 2026-10-29): every checkout runs with persist-credentials: false, so code that
// runs before the deploy step cannot read the token from the repository configuration, and the deploy step fetches and
// pushes only through its own PUSH_URL. This does not isolate the deploy step from code that ran earlier in the same
// job (a planted git hook or setting would run inside it); that needs a separate deploy job (owner decision, see
// SECURITY_AND_RELEASE_CHECKLIST.md section B.2).
{
  // Every job, not only "publish": a second job with its own checkout or push would bypass the gate.
  const checkouts = (job) => (job?.steps ?? []).filter((s) => String(s.uses ?? '').startsWith('actions/checkout'));
  const pub = Object.values(wf.jobs ?? {}).flatMap(checkouts);
  check(pub.length > 0 && pub.every((s) => s.with?.['persist-credentials'] === false), 'publish workflow: every checkout in every job runs with persist-credentials: false', String(pub.length));
  const ciCos = Object.values(ci.jobs ?? {}).flatMap(checkouts);
  check(ciCos.length > 0 && ciCos.every((s) => s.with?.['persist-credentials'] === false), 'CI: every checkout runs with persist-credentials: false', String(ciCos.length));
  check(Object.keys(wf.jobs ?? {}).join(',') === 'publish', 'publish workflow: a single job (a deploy job split is an owner decision; this guard must then be extended)', Object.keys(wf.jobs ?? {}).join(','));
  // git push/fetch with any global options in front (git -C dir, git -c key=value, git --no-pager ...) and any flags
  // after; the first non-flag word is the remote. A push or fetch without a remote counts as a failure.
  const GIT_NET = /\bgit((?:\s+-[Cc]\s+\S+|\s+--\S+)*)\s+(push|fetch)\b((?:\s+-\S+)*)(?:\s+([^\s;&|]+))?/g;
  const remotesIn = (text) => [...text.matchAll(GIT_NET)].map((m) => m[4] ?? '(none)');
  const deploy = steps.find((s) => /Commit the built site onto the deploy branch/.test(String(s.name ?? '')));
  const remotes = remotesIn(runOf(deploy ?? {}));
  check(deploy && remotes.length >= 2 && remotes.every((r) => r === '"$PUSH_URL"'), 'deploy step: every git fetch and push names "$PUSH_URL" as its remote (never origin, a literal URL or none)', remotes.join(' '));
  const allRemotes = Object.values(wf.jobs ?? {}).flatMap((j) => (j.steps ?? []).map(runOf)).flatMap(remotesIn);
  check(allRemotes.every((r) => r === '"$PUSH_URL"'), 'publish workflow: no step in any job fetches or pushes through a remote other than "$PUSH_URL"', allRemotes.join(' '));
}
// Rollback during the interim period (SECURITY_AND_RELEASE_CHECKLIST.md section D, corrected 2026-10-29): a tag named
// publish-production-interim-<stamp> must run the interim gate, and a manual run must not, so the documented route works.
{
  const r = runOf(resolveStep);
  const iInterim = r.indexOf('publish-production-interim|publish-production-interim-*)');
  const iPlain = r.indexOf('publish-production|publish-production-*)');
  check((on?.push?.tags ?? []).includes('publish-production-*'), 'tags named publish-production-* trigger the workflow (covers publish-production-interim-<stamp>)');
  check(iInterim >= 0 && iPlain > iInterim, 'the interim tag pattern is matched before the plain production pattern');
  check(iInterim >= 0 && /UMA_RELEASE_MODE=interim/.test(r.slice(iInterim, r.indexOf('\n', iInterim))), 'an interim tag sets UMA_RELEASE_MODE=interim');
  const elseBranch = r.slice(r.lastIndexOf('else'));
  check(!/UMA_RELEASE_MODE/.test(elseBranch), 'a manual run never sets interim mode (so the checklist must not use it for an interim rollback)');
  const checklist = readFileSync(resolve(ROOT, 'SECURITY_AND_RELEASE_CHECKLIST.md'), 'utf8');
  const sectionD = checklist.slice(checklist.indexOf('## D. Rollback'));
  check(/git tag publish-production-interim-rollback-[\w-]+ release-\d{8}-\d{6} && git push origin publish-production-interim-rollback-/.test(sectionD), 'checklist section D documents the interim rollback by tag');
}
check(resolveStep && /publish-production-interim\|publish-production-interim-\*\) TARGET=production; CONFIRM=PUBLISH; echo "UMA_RELEASE_MODE=interim"/.test(runOf(resolveStep)), 'the interim branch is a production publish in interim mode');
check(/UMA_RELEASE_MODE === 'interim'/.test(gate) && /RELEASE_AUTHORISATION\.md/.test(gate) && /Draft for legal review/.test(gate) && /INTERIM_ALLOWED = \/\^\(missing owner detail\|proposal not approved\|legal review\|built page not final\):\//.test(gate), 'gate: interim mode needs the authorisation file, the draft banners and only open legal-page items');
check(existsSync(resolve(ROOT, 'RELEASE_AUTHORISATION.md')) && /^Mode:\s*interim$/m.test(readFileSync(resolve(ROOT, 'RELEASE_AUTHORISATION.md'), 'utf8')), 'RELEASE_AUTHORISATION.md exists and states Mode: interim');

// The release gate runs before the only push, for production; verify never pushes
const prodGate = idx((s) => /Release gate \(production\)/.test(s.name ?? ''));
const verifyGate = idx((s) => /Release gate \(verify\)/.test(s.name ?? ''));
const outcome = idx((s) => /Verify outcome matches/.test(s.name ?? ''));
const pushIdx = idx((s) => /git push/.test(runOf(s)));
check(prodGate >= 0 && /node scripts\/release-gate\.mjs(?![^\n]*--skip-tests)/.test(runOf(steps[prodGate])), 'production runs the full release gate (never --skip-tests)');
check(prodGate >= 0 && /env\.TARGET == 'production'/.test(String(steps[prodGate].if)), 'production gate is conditional on the production target');
check(prodGate >= 0 && !steps[prodGate]['continue-on-error'], 'a failing production gate stops the job (no continue-on-error)');
check(pushIdx > prodGate && prodGate >= 0, 'the push step comes after the production release gate');
check(steps.filter((s) => /git push/.test(runOf(s))).length === 1, 'exactly one step pushes');
const pushIf = String(steps[pushIdx]?.if ?? '');
check(/staging/.test(pushIf) && /production/.test(pushIf) && !/verify/.test(pushIf), 'the push step runs only for staging or production, never verify');
check(verifyGate >= 0 && steps[verifyGate]['continue-on-error'] === true && /node scripts\/release-gate\.mjs(?![^\n]*--skip-tests)/.test(runOf(steps[verifyGate])), 'verify runs the same full gate and records its outcome');
check(outcome > verifyGate && /GATE_OUTCOME/.test(JSON.stringify(steps[outcome])), 'verify compares the gate outcome with the expected release state');
const stagingStep = steps[idx((s) => s.name === 'Build and test (staging)')];
check(stagingStep && /test:records/.test(runOf(stagingStep)) && /test:publication/.test(runOf(stagingStep)), 'staging builds run the record and publication checks first');

// The gate keeps all four checks
check(/run\('npm', \['test'\]\)/.test(gate), 'gate: full test suite');
check(/rmSync\(resolve\(SITE, 'dist'\)/.test(gate) && /\['run', 'build'\]/.test(gate), 'gate: clean production build');
check(/\['run', 'report:publication'\]/.test(gate), 'gate: publication report');
check(/\['run', 'check:release'(?:, '--', '--json', \w+)?\]/.test(gate), 'gate: release readiness (legal details, built legal pages, publication)');
for (const s of ['test', 'build', 'report:publication', 'check:release', 'test:records', 'test:publication', 'test:php']) check(Boolean(pkg.scripts?.[s]), `package.json defines "${s}"`);
check(/test:php/.test(pkg.scripts?.test ?? '') && /test:publication/.test(pkg.scripts?.test ?? '') && /test:records/.test(pkg.scripts?.test ?? ''), 'npm test includes the PHP handler, publication and record checks');

// CI exercises the real publish workflow in verify mode
const callers = Object.entries(ci.jobs ?? {}).filter(([, j]) => String(j.uses ?? '').endsWith('publish-production-branch.yml'));
check(callers.length === 1, 'ci.yml calls the publish workflow exactly once');
const [, caller] = callers[0] ?? [, {}];
check(caller.with?.target === 'verify', 'CI calls it with target verify');
check(['blocked', 'pass'].includes(caller.with?.expect), 'CI states the expected release state (blocked or pass)');

console.log(`publish-workflow: ${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);
