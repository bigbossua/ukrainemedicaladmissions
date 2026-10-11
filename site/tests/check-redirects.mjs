// Redirect-safety test: proves the .htaccess redirect rules cannot loop, chain, hide a built page or point
// at a missing page before any production write. Runs against public/.htaccess and dist/ (after a build).
// Usage (from site/): node tests/check-redirects.mjs [--htaccess public/.htaccess] [--dist dist]
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 && args[i + 1] ? args[i + 1] : d; };
const HT = resolve(opt('--htaccess', 'public/.htaccess'));
const DIST = resolve(opt('--dist', 'dist'));
if (!existsSync(HT)) { console.error(`check-redirects: ${HT} not found`); process.exit(2); }
if (!existsSync(DIST)) { console.error(`check-redirects: ${DIST} not found — run "npm run build" first`); process.exit(2); }
let problems = 0;
const fail = (m) => { console.log(`FAIL  ${m}`); problems++; };

// 1. dist/.htaccess is the same bytes as public/.htaccess (Astro copies public/ verbatim)
const distHt = join(DIST, '.htaccess');
if (!existsSync(distHt)) fail('dist/.htaccess missing');
else if (!readFileSync(distHt).equals(readFileSync(HT))) fail('dist/.htaccess differs from public/.htaccess — rebuild');

// 2. parse directives (case-insensitive, comments ignored)
const lines = readFileSync(HT, 'utf8').split(/\r?\n/).map((t, i) => ({ n: i + 1, t: t.trim() })).filter((l) => l.t && !l.t.startsWith('#'));
const D = { redirect: [], redirectmatch: [], rewritecond: [], rewriterule: [], errordocument: [] };
for (const l of lines) {
  const m = l.t.match(/^(RedirectMatch|RedirectPermanent|RedirectTemp|Redirect|RewriteCond|RewriteRule|ErrorDocument)\b\s*(.*)$/i);
  if (!m) continue;
  const k = m[1].toLowerCase();
  (k === 'redirectpermanent' || k === 'redirecttemp' ? D.redirect : D[k]).push({ ...l, rest: m[2] });
}

// 3. plain Redirect is prefix-matching: "Redirect 301 /about /about/" loops on /about/ -> /about// ...
for (const d of D.redirect) fail(`line ${d.n}: plain "${d.t.split(/\s+/)[0]}" is prefix-matching and can loop; use an anchored RedirectMatch: ${d.t}`);

// 4. RedirectMatch rules: anchored, site-relative target with trailing slash, target page built
const safeRe = (p) => { try { return new RegExp(p); } catch { return null; } };
const rules = [];
for (const d of D.redirectmatch) {
  const m = d.rest.match(/^(?:(\d{3}|permanent|temp|seeother|gone)\s+)?(\S+)(?:\s+(\S+))?\s*$/i);
  if (!m) { fail(`line ${d.n}: unparsable RedirectMatch`); continue; }
  const status = (m[1] ?? '302').toLowerCase(), pattern = m[2], target = m[3] ?? null;
  if (!pattern.startsWith('^') || !pattern.endsWith('$')) fail(`line ${d.n}: pattern not anchored with ^ and $: ${pattern}`);
  const re = safeRe(pattern);
  if (!re) fail(`line ${d.n}: pattern is not a valid regular expression: ${pattern}`);
  const gone = status === 'gone' || status === '410' || status === '404'; // no target: the URL is refused
  if (!gone) {
    if (!target) fail(`line ${d.n}: missing target`);
    else if (!/^\/\S*\/$/.test(target)) fail(`line ${d.n}: target must be site-relative, start with "/" and end with "/": ${target}`);
    else if (!existsSync(join(DIST, target, 'index.html'))) fail(`line ${d.n}: target ${target} has no built page (dist${target}index.html)`);
  }
  rules.push({ n: d.n, status, pattern, target: gone ? null : target, re, t: d.t });
}

// 5. no target may match any source (that is a chain or a loop)
for (const r of rules) if (r.target) for (const o of rules) if (o.re && o.re.test(r.target)) fail(`line ${r.n}: target ${r.target} matches the source pattern of line ${o.n} (${o.pattern}) — chain or loop`);

// 6. derive probe URLs from each pattern, follow them through the rule set, reject chains, loops and
//    sources that are also built pages
const probesOf = (p) => {
  let core = p.replace(/^\^/, '').replace(/\$$/, '');
  const optSlash = core.endsWith('/?');
  core = core.replace(/\/\?$/, '').replace(/\\(.)/g, '$1');
  if (/[.*+?()[\]{}|\\]/.test(core)) return null; // still a regex — cannot derive literal probes
  return optSlash ? [core, core + '/'] : [core];
};
const follow = (url) => {
  const hops = []; let cur = url; const seen = new Set([cur]);
  for (let i = 0; i < 6; i++) {
    const r = rules.find((x) => x.re && x.re.test(cur));
    if (!r) break;
    if (!r.target) { hops.push('410'); break; }
    cur = r.target; hops.push(cur);
    if (seen.has(cur)) { hops.push('CYCLE'); break; }
    seen.add(cur);
  }
  return hops;
};
const rows = [];
for (const r of rules) {
  if (!r.re) continue;
  const probes = probesOf(r.pattern);
  if (!probes) { rows.push({ n: r.n, probe: `(regex ${r.pattern})`, to: r.target ?? '410', status: 'not derivable' }); continue; }
  for (const p of probes) {
    if (!r.re.test(p)) { fail(`line ${r.n}: derived probe ${p} does not match its own pattern ${r.pattern}`); continue; }
    const hops = follow(p);
    const status = hops.includes('CYCLE') ? 'LOOP' : hops.length > 1 ? 'CHAIN' : 'ok';
    if (status !== 'ok') fail(`line ${r.n}: ${p} -> ${hops.join(' -> ')} (${status})`);
    const built = existsSync(join(DIST, p.endsWith('/') ? p : p + '/', 'index.html')) || (!p.endsWith('/') && existsSync(join(DIST, p)) && !existsSync(join(DIST, p, 'index.html')) && /\.[a-z0-9]+$/i.test(p));
    if (built) fail(`line ${r.n}: ${p} is both a built page and a redirect source — the page is unreachable`);
    rows.push({ n: r.n, probe: p, to: hops[0] ?? '-', status });
  }
}

// 7. canonical-host block: RewriteCond on HTTP_HOST naming the production host, then a RewriteRule R=301
//    to https://ukrainemedicaladmissions.com — scoping that keeps any other host from being bounced here
let hostCond = false, hostRule = false;
for (const l of lines) {
  const c = l.t.match(/^RewriteCond\s+%\{HTTP_HOST\}\s+(\S+)/i);
  if (c && /ukrainemedicaladmissions\\?\.com/i.test(c[1])) hostCond = true;
  const r = l.t.match(/^RewriteRule\s+\S+\s+(\S+)(?:\s+\[([^\]]*)\])?/i);
  if (r) { if (hostCond && /^https:\/\/ukrainemedicaladmissions\.com/i.test(r[1]) && /R=301/i.test(r[2] ?? '')) hostRule = true; hostCond = false; }
}
if (!hostRule) fail('canonical-host block missing: a RewriteCond %{HTTP_HOST} matching ukrainemedicaladmissions.com must precede the RewriteRule with R=301 to https://ukrainemedicaladmissions.com');

// 8. ErrorDocument 404 must name a built file
const ed = D.errordocument.find((d) => /^404\s/.test(d.rest));
if (!ed) fail('no ErrorDocument 404 directive');
else { const f = ed.rest.split(/\s+/)[1]; if (!f || !f.startsWith('/') || !existsSync(join(DIST, f))) fail(`ErrorDocument 404 ${f} is not present in dist`); }

console.log('| Line | Probe URL | Resolves to | Status |\n|---|---|---|---|');
for (const r of rows) console.log(`| ${r.n} | ${r.probe} | ${r.to} | ${r.status} |`);
console.log(`check-redirects: ${D.redirect.length} Redirect, ${rules.length} RedirectMatch, ${D.rewritecond.length} RewriteCond, ${D.rewriterule.length} RewriteRule, ${D.errordocument.length} ErrorDocument; ${problems} problems`);
process.exit(problems ? 1 : 0);
