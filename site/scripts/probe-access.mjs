#!/usr/bin/env node
// ACCESS PROBE — can this environment reach the official hosts the verification work needs?
// The host list is research/verification/ALLOWLIST_P1.txt (the 20 hosts in OWNER_ACTION_SHEET.md). Run it first in
// any session after the owner changes Network access: official-source research starts only on hosts reported OPEN.
//
//   node scripts/probe-access.mjs            probe every host once (HTTPS GET of "/", 12 s limit, through the
//                                            session's proxy exactly as curl uses it; nothing is bypassed)
//   node scripts/probe-access.mjs --check    offline: the list has 20 valid, unique hosts; it equals the "Start here"
//                                            list in CAPTURE_REQUEST_2026-10-12.md and the block in
//                                            OWNER_ACTION_SHEET.md; every http(s) address in the capture request's §2
//                                            page tables is on a listed host. Hosts the capture request names only in
//                                            its §1 or as plain text (conditional, P2 accreditation, production) are
//                                            deliberately outside the 20 and not checked (npm run test:allowlist)
// Options: --list <file>  another host list (same format)   --json <file>  also write the probe result as JSON
//
// Result per host: OPEN (any HTTP answer, with its status), BLOCKED (the proxy refused the CONNECT with 403 or 407, i.e.
// the network policy), DNS, TIMEOUT, TLS, or ERROR (a proxy 405 is ERROR: a tool or proxy configuration problem, not the
// allowlist; see /root/.ccr/README.md). A BLOCKED host says nothing about the website itself: it is an
// access limitation, never evidence (UNIVERSITY_EVIDENCE_STANDARD.md). An OPEN host proves only that it answers; each
// fact still needs its own capture and register entry.
// Exit code: probe 0 all OPEN, 1 any host not OPEN; --check 0 consistent, 1 not (an empty or malformed list is a problem);
// 2 usage error, unreadable file, unwritable --json path, or (probe mode) a list that is empty or has a line that is not a
// plain host name.
import { spawnSync } from 'node:child_process';
import { accessSync, constants, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const SITE = resolve(new URL('..', import.meta.url).pathname);
const ROOT = resolve(SITE, '..');
export const PATHS = {
  list: resolve(ROOT, 'research/verification/ALLOWLIST_P1.txt'),
  capture: resolve(ROOT, 'research/verification/CAPTURE_REQUEST_2026-10-12.md'),
  sheet: resolve(ROOT, 'OWNER_ACTION_SHEET.md'),
};
export const EXPECTED_COUNT = 20;
const HINT = '; check $HTTPS_PROXY/__agentproxy/status (recentRelayFailures) before concluding the site refused';
const HOST = /^(?=.{4,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/;

/** @param {string} text @returns {string[]} hosts in file order, comments and blank lines dropped */
export function parseList(text) {
  return text.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
}

/** @param {string} text @returns {string[]} hosts in backticks on the capture request's "Start here" line */
export function startHereHosts(text) {
  const line = text.split('\n').find((l) => l.includes('**Start here (Route A)'));
  return line ? [...line.matchAll(/`([a-z0-9.-]+\.[a-z]{2,})`/g)].map((m) => m[1]) : [];
}

/** @param {string} text @returns {string[]} distinct hosts of every http(s) address in the §2 page tables */
export function captureSection2Hosts(text) {
  const start = text.indexOf('## 2. If access');
  const end = text.indexOf('## 3. How to capture');
  if (start < 0 || end < start) return [];
  const rows = text.slice(start, end).split('\n').filter((l) => l.startsWith('|') && /\|\s*P[123]\s*\|/.test(l));
  return [...new Set(rows.flatMap((l) => [...l.matchAll(/https?:\/\/([a-z0-9.-]+)/gi)].map((m) => m[1].toLowerCase())))];
}

/** @param {string} text @returns {string[] | null} hosts in the fenced block between the allowlist markers */
export function sheetHosts(text) {
  const m = text.match(/<!-- allowlist:start -->\s*```[a-z]*\n([\s\S]*?)```\s*<!-- allowlist:end -->/);
  return m ? parseList(m[1]) : null;
}

/** @param {{ list: string, capture: string, sheet: string }} t file contents @returns {string[]} problems found */
export function checkAllowlist(t) {
  const problems = [];
  const hosts = parseList(t.list);
  const set = new Set(hosts);
  if (hosts.length !== EXPECTED_COUNT) problems.push(`the list has ${hosts.length} hosts, expected ${EXPECTED_COUNT}`);
  if (set.size !== hosts.length) problems.push(`duplicate hosts: ${hosts.filter((h, i) => hosts.indexOf(h) !== i).join(', ')}`);
  for (const h of hosts) if (!HOST.test(h)) problems.push(`not a plain host name: "${h}"`);
  const same = (name, other) => {
    if (!other) return problems.push(`${name}: host list not found`);
    const o = new Set(other);
    const missing = hosts.filter((h) => !o.has(h));
    const extra = other.filter((h) => !set.has(h));
    if (missing.length) problems.push(`${name} lacks: ${missing.join(', ')}`);
    if (extra.length) problems.push(`${name} has hosts not in the list: ${extra.join(', ')}`);
    if (other.length !== o.size) problems.push(`${name} repeats a host`);
  };
  same('CAPTURE_REQUEST "Start here"', startHereHosts(t.capture).length ? startHereHosts(t.capture) : null);
  same('OWNER_ACTION_SHEET allowlist block', sheetHosts(t.sheet));
  const s2 = captureSection2Hosts(t.capture);
  if (!s2.length) problems.push('CAPTURE_REQUEST §2: no official addresses found (section moved or renamed?)');
  const uncovered = s2.filter((h) => !set.has(h));
  if (uncovered.length) problems.push(`CAPTURE_REQUEST §2 uses hosts the list does not allow: ${uncovered.join(', ')}`);
  return problems;
}

/**
 * Classify one curl run. @param {number|null} status curl exit code @param {string} stdout the %{http_code} output
 * @param {string} stderr @returns {{ result: 'OPEN'|'BLOCKED'|'DNS'|'TIMEOUT'|'TLS'|'ERROR', detail: string }}
 */
export function classify(status, stdout, stderr) {
  const err = (stderr || '').trim().replace(/^curl: /, '');
  const code = (stdout || '').trim();
  const proxy = err.match(/CONNECT tunnel failed, response (\d{3})/);
  if (proxy && ['403', '407'].includes(proxy[1])) return { result: 'BLOCKED', detail: `proxy answered ${proxy[1]} to CONNECT (network policy)` };
  if (proxy && proxy[1] === '405') return { result: 'ERROR', detail: `proxy answered 405: a tool or proxy configuration problem, not the allowlist${HINT}` };
  if (status === 0 && /^[1-5]\d\d$/.test(code)) return { result: 'OPEN', detail: `HTTP ${code}` };
  if (status === 6 || /Could not resolve host/i.test(err)) return { result: 'DNS', detail: err || 'host not resolved' };
  if (status === 28) return { result: 'TIMEOUT', detail: err || 'no answer within the time limit' };
  if ([35, 51, 58, 59, 60, 77, 80, 82, 83, 90, 91].includes(status ?? -1) || /SSL|TLS|certificate/i.test(err)) return { result: 'TLS', detail: `${err || `curl exit ${status}`}${HINT}` };
  return { result: 'ERROR', detail: `${err || `curl exit ${status}, HTTP "${code}"`}${HINT}` };
}

function probe(host) {
  const r = spawnSync('curl', ['-sS', '-o', '/dev/null', '-w', '%{http_code}', '--max-time', '12', `https://${host}/`], { encoding: 'utf8', env: process.env });
  if (r.error) return { host, result: 'ERROR', detail: `curl could not run: ${r.error.message}` };
  return { host, ...classify(r.status, r.stdout, r.stderr) };
}

function main() {
  const args = process.argv.slice(2);
  const usage = (msg) => { console.error(`probe-access: ${msg}; see the header of scripts/probe-access.mjs`); process.exit(2); };
  const withValue = new Set(['--list', '--json']);
  const values = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--check') continue;
    if (!withValue.has(a)) usage(`unknown argument "${a}"`);
    const v = args[i + 1];
    if (!v || v.startsWith('-')) usage(`${a} needs a file name`);
    values[a] = v;
    i++;
  }
  const jsonPath = values['--json'] ? resolve(process.cwd(), values['--json']) : null;
  if (jsonPath) { try { accessSync(dirname(jsonPath), constants.W_OK); } catch (e) { usage(`cannot write ${jsonPath} (${e.code ?? e.message})`); } }
  const read = (path) => { try { return readFileSync(path, 'utf8'); } catch (e) { return usage(`cannot read ${path} (${e.code ?? e.message})`); } };
  const listPath = values['--list'] ? resolve(process.cwd(), values['--list']) : PATHS.list;
  const listText = read(listPath);

  if (args.includes('--check')) {
    const capture = read(PATHS.capture);
    const problems = checkAllowlist({ list: listText, capture, sheet: read(PATHS.sheet) });
    const s2 = captureSection2Hosts(capture);
    for (const p of problems) console.log(`FAIL  ${p}`);
    console.log(`allowlist check: ${parseList(listText).length} hosts; the capture request's §2 page tables use ${s2.length} distinct hosts, ${problems.some((p) => p.startsWith('CAPTURE_REQUEST §2')) ? 'NOT all' : 'all'} covered; ${problems.length} problem(s)`);
    process.exit(problems.length ? 1 : 0);
  }

  const hosts = parseList(listText);
  const invalid = hosts.filter((h) => !HOST.test(h));
  if (!hosts.length || invalid.length) usage(`no usable host list in ${listPath}${invalid.length ? ` (not plain host names: ${invalid.join(', ')})` : ' (empty)'}`);
  if (listPath === PATHS.list && hosts.length !== EXPECTED_COUNT) console.log(`warning: ${hosts.length} hosts in the list, expected ${EXPECTED_COUNT} (run --check)`);
  const when = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
  console.log(`access probe, ${when} (UTC), ${hosts.length} hosts from ${listPath.replace(`${ROOT}/`, '')}`);
  const results = hosts.map(probe);
  const width = Math.max(...hosts.map((h) => h.length));
  for (const r of results) console.log(`${r.result.padEnd(7)}  ${r.host.padEnd(width)}  ${r.detail}`);
  const counts = results.reduce((a, r) => ({ ...a, [r.result]: (a[r.result] ?? 0) + 1 }), /** @type {Record<string, number>} */ ({}));
  const open = counts.OPEN ?? 0;
  console.log(`\n${open} of ${hosts.length} OPEN; ${Object.entries(counts).filter(([k]) => k !== 'OPEN').map(([k, v]) => `${v} ${k}`).join(', ') || 'none refused'}`);
  console.log(open === hosts.length
    ? 'All hosts answer. Next: capture P1 pages in the order of OWNER_ACTION_SHEET.md §1 (Bukovinian; then Odesa, Kharkiv and Vinnytsia; then the rest) and record each reading with scripts/evidence-entry.mjs.'
    : open
      ? 'Some hosts answer. Work only on universities whose hosts are all OPEN; record the others as blocked (an access limitation, not evidence).'
      : 'No host answers. Official-source research cannot start here: see OWNER_ACTION_SHEET.md §1 (allow the hosts) or send captures (CAPTURE_REQUEST §2).');
  if (jsonPath) writeFileSync(jsonPath, `${JSON.stringify({ checked: when, results }, null, 2)}\n`);
  process.exit(open === hosts.length ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
