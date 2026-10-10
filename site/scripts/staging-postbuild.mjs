// Post-build step for staging (dist-staging/): append a server-level noindex header so even non-HTML
// responses (PDFs, images, the PHP endpoint) carry it. Wrapped in IfModule so a host without
// mod_headers does not 500. The guard (tests/staging-guard.mjs) asserts this block is present.
import { appendFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
const htaccess = resolve('dist-staging/.htaccess');
if (!existsSync(htaccess)) { console.error('staging-postbuild: dist-staging/.htaccess missing'); process.exit(1); }
appendFileSync(htaccess, '\n# STAGING BUILD: never index (server-level, all responses)\n<IfModule mod_headers.c>\n  Header always set X-Robots-Tag "noindex, nofollow"\n</IfModule>\n');
console.log('staging-postbuild: X-Robots-Tag appended to dist-staging/.htaccess');
