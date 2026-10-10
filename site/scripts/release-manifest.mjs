// Release manifest: every file a production deploy would write, with size and SHA-256.
// Usage (from site/): node scripts/release-manifest.mjs [--dist dist] [--out tests/output/release-manifest.json]
// Network-independent. Feeds field 3 of the first-write plan (HOSTING_AND_DEPLOYMENT_ASSESSMENT.md §9)
// and gives a release fingerprint to record next to the backup hash before and after a deploy.
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname, relative, sep } from 'node:path';
import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(name); return i >= 0 && args[i + 1] ? args[i + 1] : def; };
const DIST = resolve(opt('--dist', 'dist'));
const OUT = resolve(opt('--out', 'tests/output/release-manifest.json'));
if (!existsSync(DIST)) { console.error(`release-manifest: ${DIST} does not exist — run "npm run build" first`); process.exit(2); }

const files = [];
(function walk(d) { for (const f of readdirSync(d).sort()) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); } })(DIST);
const sha = (buf) => createHash('sha256').update(buf).digest('hex');
const entries = files
  .map((p) => { const buf = readFileSync(p); return { path: relative(DIST, p).split(sep).join('/'), bytes: buf.length, sha256: sha(buf) }; })
  .sort((a, b) => (a.path < b.path ? -1 : 1));
let generatedFrom = 'unknown';
try { generatedFrom = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { /* not a git checkout */ }
const fingerprint = sha(entries.map((e) => `${e.path} ${e.sha256}`).join('\n'));
const totalBytes = entries.reduce((n, e) => n + e.bytes, 0);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify({ generatedFrom, fileCount: entries.length, totalBytes, fingerprint, files: entries }, null, 2) + '\n');

const top = new Map();
for (const e of entries) {
  const [head, ...rest] = e.path.split('/');
  const t = top.get(head) || { name: head, type: rest.length ? 'dir' : 'file', count: 0, bytes: 0 };
  t.count++; t.bytes += e.bytes; top.set(head, t);
}
console.log('| Entry | Type | Files | Bytes |\n|---|---|---|---|');
for (const t of [...top.values()].sort((a, b) => (a.name < b.name ? -1 : 1))) console.log(`| \`${t.name}\` | ${t.type} | ${t.count} | ${t.bytes.toLocaleString('en-GB')} |`);
console.log(`\nrelease-manifest: ${entries.length} files, ${totalBytes.toLocaleString('en-GB')} bytes, build ${generatedFrom}, fingerprint ${fingerprint}`);
console.log(`written ${relative(process.cwd(), OUT)}`);
