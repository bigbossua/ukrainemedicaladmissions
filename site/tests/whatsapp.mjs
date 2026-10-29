// WhatsApp links in the built site (owner decision 2026-10-29; src/lib/whatsapp.ts, src/components/WhatsAppLink.astro).
// Every WhatsApp link: exactly https://wa.me/380633534065?text=<one parameter>, canonical percent-encoding, a message that
// names ukrainemedicaladmissions.com, an accessible name containing the visible text, rel noopener noreferrer, a new tab.
// The general message is exactly the owner's default text (footer and contact page); page links name their own page, and
// every university page names its own university. No other WhatsApp number, host, scheme or parameter anywhere.
// Run after `npm run build`. Prints "whatsapp: N checks, M failures" and exits non-zero on any failure.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
const NUMBER = '380633534065';
const DISPLAY = '+380 63 353 40 65';
const DEFAULT = 'Hello Ukraine Medical Admissions, I found you through ukrainemedicaladmissions.com and would like information about studying medicine in Ukraine. Please advise me on the admissions process.';
const forPage = (p) => `Hello Ukraine Medical Admissions, I found you through ukrainemedicaladmissions.com (${p} page) and would like information about studying medicine in Ukraine. Please advise me on the admissions process.`;
// Pages whose own WhatsApp link names them (besides the footer's general link). University pages are checked below.
const PAGES = {
  '/': 'Home', '/about/': 'About us', '/admissions/': 'Admissions guide', '/apply/': 'Apply online', '/courses/': 'Courses',
  '/courses/medicine/': 'Medicine course guide', '/courses/dentistry/': 'Dentistry course guide', '/courses/nursing/': 'Nursing course guide',
  '/courses/pharmacy/': 'Pharmacy course guide', '/faq/': 'Student FAQ', '/services/': 'Our services', '/tuition-fees/': 'Tuition fees guide',
  '/universities/': 'University directory',
};

let checks = 0, failures = 0;
const check = (ok, label, detail = '') => { checks++; if (!ok) { failures++; console.log(`FAIL ${label}${detail ? ` — ${detail}` : ''}`); } };
if (!existsSync(DIST)) { console.log('FAIL dist/ missing: run npm run build first'); console.log('whatsapp: 0 checks, 1 failures'); process.exit(1); }

const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && files.push(p); } })(DIST);
const route = (f) => { const r = '/' + relative(DIST, f).split(sep).join('/'); return r.endsWith('/index.html') ? r.slice(0, -'index.html'.length) : r; };
const unescape = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const textOf = (s) => unescape(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

let total = 0;
for (const f of files) {
  const r = route(f);
  const html = readFileSync(f, 'utf8');
  // Any WhatsApp destination at all, in any attribute or text: it must be the business link.
  for (const m of html.matchAll(/(?:https?:\/\/(?:wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)\/[^"'\s<>]*|whatsapp:\/\/[^"'\s<>]*)/gi)) {
    check(new RegExp(`^https://wa\\.me/${NUMBER}\\?text=`).test(unescape(m[0])), `${r}: WhatsApp destination other than the business link`, m[0].slice(0, 80));
  }
  const links = [...html.matchAll(/<a\b([^>]*\bhref="https:\/\/wa\.me\/[^"]*"[^>]*)>([\s\S]*?)<\/a>/g)].map((m) => {
    const attrs = m[1]; const get = (n) => unescape((new RegExp(`\\b${n}="([^"]*)"`).exec(attrs) ?? [])[1] ?? '');
    return { href: get('href'), label: get('aria-label'), rel: get('rel'), target: get('target'), text: textOf(m[2]) };
  });
  const messages = [];
  for (const l of links) {
    total++;
    const m = new RegExp(`^https://wa\\.me/(\\d+)\\?text=([^&#]+)$`).exec(l.href);
    check(!!m && m[1] === NUMBER, `${r}: WhatsApp number is exactly ${NUMBER}, one text parameter`, l.href.slice(0, 90));
    if (!m) continue;
    let msg = '';
    try { msg = decodeURIComponent(m[2]); } catch { check(false, `${r}: WhatsApp text is valid percent-encoding`, m[2].slice(0, 60)); continue; }
    check(encodeURIComponent(msg) === m[2], `${r}: WhatsApp text is canonically encoded (no raw spaces or unencoded reserved characters)`, m[2].slice(0, 60));
    check(msg.includes('ukrainemedicaladmissions.com'), `${r}: WhatsApp message names ukrainemedicaladmissions.com`, msg);
    check(!/\bappl(?:ied|ication (?:was |has been )?submitted)\b|\bsubmitted\b/i.test(msg), `${r}: WhatsApp message never claims an application or submission`, msg);
    check(msg.length < 300, `${r}: WhatsApp message stays short`, String(msg.length));
    check(l.text === `WhatsApp: ${DISPLAY}`, `${r}: visible link text is "WhatsApp: ${DISPLAY}"`, l.text);
    check(l.label.startsWith('Contact Ukraine Medical Admissions on ') && l.label.includes(l.text), `${r}: accessible name names the business and contains the visible text`, l.label);
    check(/\bnoopener\b/.test(l.rel) && /\bnoreferrer\b/.test(l.rel) && l.target === '_blank', `${r}: rel noopener noreferrer, new tab`, `${l.rel} ${l.target}`);
    messages.push(msg);
  }
  // Every page carries the footer's general link, with the owner's default text exactly.
  check(messages.includes(DEFAULT), `${r}: the general WhatsApp link (footer) uses the default message exactly`);
  if (PAGES[r]) check(messages.includes(forPage(PAGES[r])), `${r}: a WhatsApp link names this page ("${PAGES[r]} page")`, messages.join(' | ').slice(0, 200));
  if (r === '/contact/') check(messages.filter((x) => x === DEFAULT).length >= 2, '/contact/: the contact section offers the general WhatsApp message (besides the footer)');
  if (r === '/apply/thank-you/' || r === '/404.html') check(messages.every((x) => x === DEFAULT), `${r}: only the general WhatsApp link`);
  // University pages: the link names the university shown in the page heading.
  if (/^\/universities\/[a-z0-9-]+\/$/.test(r)) {
    const h1 = textOf((/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html) ?? [])[1] ?? '');
    check(!!h1 && messages.includes(forPage(h1)), `${r}: a WhatsApp link names this university ("${h1} page")`, messages.join(' | ').slice(0, 200));
  }
}
check(total > files.length, `WhatsApp links found (${total} on ${files.length} pages)`);
console.log(`whatsapp: ${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);
