// The 20-host allowlist and the access probe (scripts/probe-access.mjs). Offline: no host is contacted.
// 1. The real files agree: research/verification/ALLOWLIST_P1.txt, the "Start here" line of
//    CAPTURE_REQUEST_2026-10-12.md, the block in OWNER_ACTION_SHEET.md, and every official address in the capture
//    request's §2 page tables lies on a listed host.
// 2. Mutations of those files are caught (a dropped host, an extra host, a duplicate, an uncovered address, a sheet that
//    drifts, a missing block).
// 3. classify() turns curl results into OPEN / BLOCKED / DNS / TIMEOUT / TLS / ERROR as the probe reports them; a proxy
//    refusal is never reported as OPEN, and a proxy 405 (configuration problem) is not reported as the allowlist.
// 4. Usage errors, unreadable files, an unwritable --json path and an empty or malformed list exit 2 before any host is
//    contacted.
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PATHS, checkAllowlist, classify, parseList, captureSection2Hosts } from '../scripts/probe-access.mjs';

let checks = 0;
const failures = [];
const ok = (cond, msg) => { checks++; if (!cond) failures.push(msg); };

const real = { list: readFileSync(PATHS.list, 'utf8'), capture: readFileSync(PATHS.capture, 'utf8'), sheet: readFileSync(PATHS.sheet, 'utf8') };
const realProblems = checkAllowlist(real);
ok(realProblems.length === 0, `real files: ${realProblems.join('; ')}`);
ok(parseList(real.list).length === 20, 'real list: 20 hosts');
ok(captureSection2Hosts(real.capture).length > 0, 'capture request §2: official addresses found');

const hosts = parseList(real.list);
const caught = (name, t, expect) => {
  const p = checkAllowlist(t);
  ok(p.some((x) => x.includes(expect)), `mutation not caught (${name}): expected a problem containing "${expect}", got ${JSON.stringify(p)}`);
};
const dropLine = (text, host) => text.split('\n').filter((l) => l.trim() !== host).join('\n');

caught('host dropped from the list', { ...real, list: dropLine(real.list, 'knmu.edu.ua') }, 'the list has 19 hosts');
caught('host dropped: §2 address no longer covered', { ...real, list: dropLine(real.list, 'knmu.edu.ua') }, 'CAPTURE_REQUEST §2 uses hosts the list does not allow: knmu.edu.ua');
caught('extra host in the list', { ...real, list: `${real.list}example.org\n` }, 'OWNER_ACTION_SHEET allowlist block lacks: example.org');
caught('extra host in the sheet', { ...real, sheet: real.sheet.replace('new.vnmu.edu.ua\n', 'new.vnmu.edu.ua\nexample.org\n') }, 'OWNER_ACTION_SHEET allowlist block has hosts not in the list: example.org');
caught('duplicate host', { ...real, list: real.list.replace('onmedu.edu.ua\n', 'onmedu.edu.ua\nonmedu.edu.ua\n') }, 'duplicate hosts: onmedu.edu.ua');
caught('not a host name', { ...real, list: real.list.replace('tdmu.edu.ua\n', 'https://tdmu.edu.ua/\n') }, 'not a plain host name');
caught('sheet drifts', { ...real, sheet: dropLine(real.sheet, 'new.vnmu.edu.ua') }, 'OWNER_ACTION_SHEET allowlist block lacks: new.vnmu.edu.ua');
caught('sheet block removed', { ...real, sheet: real.sheet.replace('<!-- allowlist:start -->', '') }, 'OWNER_ACTION_SHEET allowlist block: host list not found');
caught('Start here line drifts', { ...real, capture: real.capture.replace('`junior.tdmu.edu.ua`, ', '') }, 'CAPTURE_REQUEST "Start here" lacks: junior.tdmu.edu.ua');
const s2 = real.capture.indexOf('## 2. If access');
caught('new §2 address on an unlisted host', { ...real, capture: `${real.capture.slice(0, s2)}## 2. If access\n| 99 | \`x.pdf\` | <https://www.knmu.edu.ua/en/> | P1 | |\n${real.capture.slice(s2 + '## 2. If access'.length)}` }, 'www.knmu.edu.ua');
ok(hosts.every((h) => !checkAllowlist(real).some((p) => p.includes(h))), 'no real host is named in a problem');

const cases = [
  [[56, '000', 'curl: (56) CONNECT tunnel failed, response 403'], 'BLOCKED'],
  [[56, '000', 'curl: (56) CONNECT tunnel failed, response 405'], 'ERROR'],
  [[56, '000', 'curl: (56) CONNECT tunnel failed, response 407'], 'BLOCKED'],
  [[0, '200', ''], 'OPEN'],
  [[0, '301', ''], 'OPEN'],
  [[0, '404', ''], 'OPEN'],
  [[6, '000', 'curl: (6) Could not resolve host: www.example.invalid'], 'DNS'],
  [[28, '000', 'curl: (28) Operation timed out after 12001 milliseconds'], 'TIMEOUT'],
  [[60, '000', 'curl: (60) SSL certificate problem: unable to get local issuer certificate'], 'TLS'],
  [[35, '000', 'curl: (35) OpenSSL SSL_connect: Connection reset by peer'], 'TLS'],
  [[56, '000', 'curl: (56) CONNECT tunnel failed, response 502'], 'ERROR'],
  [[7, '000', 'curl: (7) Failed to connect to proxy port 39505'], 'ERROR'],
  [[0, '000', ''], 'ERROR'],
];
for (const [[status, out, err], want] of cases) {
  const got = classify(status, out, err).result;
  ok(got === want, `classify(${status}, "${out}", "${err}") = ${got}, expected ${want}`);
}

const tmp = mkdtempSync(join(tmpdir(), 'allowlist-'));
writeFileSync(join(tmp, 'empty.txt'), '# only a comment\n\n');
writeFileSync(join(tmp, 'bad.txt'), 'https://www.bsmu.edu.ua/\n');
const script = new URL('../scripts/probe-access.mjs', import.meta.url).pathname;
const usageCases = [
  [['--bogus'], 'unknown option'],
  [['check'], 'positional argument'],
  [['-c'], 'single-dash argument'],
  [['--list'], '--list without a value'],
  [['--json', '--list', 'x'], '--json followed by another option'],
  [['--list', join(tmp, 'missing.txt'), '--check'], 'missing list file'],
  [['--list', join(tmp, 'empty.txt')], 'list with no hosts (probe mode)'],
  [['--list', join(tmp, 'bad.txt')], 'list with a URL instead of a host (probe mode)'],
  [['--json', join(tmp, 'no-such-dir', 'out.json')], 'unwritable --json path'],
];
for (const [argv, what] of usageCases) {
  const r = spawnSync(process.execPath, [script, ...argv], { encoding: 'utf8', timeout: 20000 });
  ok(r.status === 2 && /probe-access: /.test(r.stderr) && !/access probe,/.test(r.stdout), `usage error not reported with exit 2 (${what}): exit ${r.status}, ${r.stderr.trim() || r.stdout.trim()}`);
}
const checkRun = spawnSync(process.execPath, [script, '--check'], { encoding: 'utf8', timeout: 20000 });
ok(checkRun.status === 0 && /0 problem\(s\)/.test(checkRun.stdout), `--check on the real files: exit ${checkRun.status}, ${checkRun.stdout.trim()}`);
rmSync(tmp, { recursive: true, force: true });

for (const f of failures) console.log(`FAIL  ${f}`);
console.log(`allowlist: ${checks} checks, ${failures.length} failures`);
process.exit(failures.length ? 1 : 0);
