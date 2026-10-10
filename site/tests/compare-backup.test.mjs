// Self-test for the first-write tooling: release manifest over dist/ and the live-backup comparator over
// the synthetic fixture in tests/fixtures/legacy-backup/. Run from site/ after "npm run build".
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

let failed = 0;
const check = (cond, msg) => { console.log(`${cond ? 'ok  ' : 'FAIL'} ${msg}`); if (!cond) failed++; };
const run = (script, args) => execFileSync(process.execPath, [script, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

// 1) release manifest
const manifestOut = resolve('tests/output/release-manifest.json');
run('scripts/release-manifest.mjs', ['--out', manifestOut]);
const manifest = JSON.parse(readFileSync(manifestOut, 'utf8'));
check(manifest.fileCount > 0 && manifest.files.length === manifest.fileCount, `manifest lists ${manifest.fileCount} files`);
check(manifest.files.some((f) => f.path === '.htaccess'), 'manifest includes .htaccess');
check(manifest.files.some((f) => f.path === 'index.html') && manifest.files.some((f) => f.path === 'services/index.html'), 'manifest includes index.html and services/index.html');
check(/^[0-9a-f]{64}$/.test(manifest.fingerprint) && manifest.files.every((f) => /^[0-9a-f]{64}$/.test(f.sha256)), 'sha256 fingerprint and per-file hashes');

// 2) backup comparison on the fixture
const reportOut = resolve('tests/output/live-backup-report.md');
const fixture = resolve('tests/fixtures/legacy-backup');
const stdout = run('scripts/compare-live-backup.mjs', [fixture, '--out', reportOut]);
check(existsSync(reportOut), 'report written');
const r = readFileSync(reportOut, 'utf8');
const row = (url) => (r.match(new RegExp(`^\\| \`${url.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}\` \\| (\\w+) \\| \`([^\`]*)\` \\| ([^|]*)\\|$`, 'm')) || []);
check(r.includes('Chosen document root inside it: `public_html`'), 'auto-selects public_html as the root');
check(row('/services/')[1] === 'KEPT', '/services/ is KEPT');
check(row('/')[1] === 'KEPT', '/ is KEPT');
check(row('/about')[1] === 'KEPT' && /DirectorySlash/.test(row('/about')[3]), '/about is KEPT via DirectorySlash');
check(row('/dentistry-admissions-in-ukraine/')[1] === 'REDIRECTED' && row('/dentistry-admissions-in-ukraine/')[2] === '/courses/dentistry/', '/dentistry-admissions-in-ukraine/ REDIRECTED to /courses/dentistry/');
check(row('/document-translation-legalisation/')[1] === 'REDIRECTED' && row('/document-translation-legalisation/')[2] === '/admissions/', '/document-translation-legalisation/ REDIRECTED to /admissions/');
check(row('/meet-the-team/')[1] === 'UNCOVERED' && row('/meet-the-team/')[2] === '/about/', '/meet-the-team/ UNCOVERED with proposed /about/');
check(row('/careers/')[1] === 'UNCOVERED' && row('/careers/')[2] === '/about/', 'sitemap-only /careers/ (www host stripped) UNCOVERED with proposed /about/');
check(row('/contact.php')[1] === 'UNCOVERED' && row('/contact.php')[2] === '/contact/', '/contact.php UNCOVERED with proposed /contact/');
check(r.includes('RedirectMatch 301 ^/meet-the-team/?$ /about/') && r.includes('RedirectMatch 301 ^/contact\\.php$ /contact/'), 'proposed RedirectMatch lines are anchored and escaped');
check(r.includes('proposed, not applied'), 'proposed block is labelled as not applied');
check(/\| `\/document-translation-legalisation\/` \| \(no title\) \|/.test(r), 'missing <title> reported as (no title)');
check(r.includes('`old-backup.sql`') && /Sensitive files .*old-backup\.sql/.test(r), 'old-backup.sql flagged sensitive');
check(/\| `\.htaccess` \| \d+ \| \d+ \|/.test(r) && /\| `index\.html` \| \d+ \| \d+ \|/.test(r), '.htaccess and index.html listed as collisions');
check(r.includes('Redirect 301 /about /about-us') && r.includes('legacy rule, report only'), 'legacy plain Redirect reported, not applied');
check(/Pages mentioning a messaging-app contact \(whatsapp \/ wa\.me\): 1/.test(r) && /Pages with `tel:` links: 1/.test(r), 'contact-channel counts');
check(!/Legacy home|Chat with us/.test(r), 'no fixture body text leaks into the report');
check(/UNCOVERED \d+/.test(stdout), 'console summary printed');

// 3) exit code 2 on a directory with no root candidate
let code = 0;
try { run('scripts/compare-live-backup.mjs', ['tests/fixtures', '--root', 'nonexistent-dir', '--out', reportOut]); } catch (e) { code = e.status; }
check(code === 2, 'exit 2 when --root does not exist');
code = 0;
try { run('scripts/compare-live-backup.mjs', ['/nonexistent-backup-dir', '--out', reportOut]); } catch (e) { code = e.status; }
check(code === 2, 'exit 2 when the backup directory is missing');

console.log(`compare-backup.test: ${failed} failure(s)`);
process.exit(failed ? 1 : 0);
