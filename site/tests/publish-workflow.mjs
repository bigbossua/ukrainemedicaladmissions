// Static guard over the PUBLISHING workflow itself (not the application): fails if the production publish could
// push without the release gate, if the non-deploying "verify" target could push, if a workflow call could select a
// deploy target, if the gate loses one of its checks, or if CI stops exercising the publish workflow.
// Prints "publish-workflow: N checks, M failures".
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import YAML from 'yaml';

const ROOT = resolve('..');
let checks = 0, failures = 0;
const check = (cond, msg) => { checks++; if (!cond) { failures++; console.log('FAIL', msg); } };

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
