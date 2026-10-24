// Server-side test of the Stage-1 form handler (public/api/enquiry.php) with synthetic data only.
// Starts PHP's built-in server on a free port with UMA_PRIVATE_DIR pointing at a fresh temporary directory
// (config.php there turns e-mail off), posts synthetic submissions and inspects the JSON records written.
// Checks: 405 for GET; 303 + exactly one record for valid submissions; 422 + no record when required fields are
// missing; honeypot and the soft timing check drop silently; enumerations outside the allow-lists are dropped;
// arrays are capped; control characters never reach single-line fields; the contact-page enquiry still works;
// every FIELDS key in src/lib/fields.ts (underscored keys included) plus "undecided" is accepted.
// Prints "enquiry-php: N checks, M failures" and exits non-zero on any failure.
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { mkdtempSync, writeFileSync, readdirSync, readFileSync, rmSync, existsSync, utimesSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(SITE, 'public');

let checks = 0, failures = 0;
const check = (ok, label, detail = '') => { checks++; if (!ok) { failures++; console.log(`FAIL ${label}${detail ? ` — ${detail}` : ''}`); } };

const freePort = () => new Promise((res, rej) => {
  const s = createServer(); s.on('error', rej);
  s.listen(0, '127.0.0.1', () => { const { port } = s.address(); s.close(() => res(port)); });
});

const store = mkdtempSync(join(tmpdir(), 'uma-enquiry-test-'));
writeFileSync(join(store, 'config.php'), "<?php return ['send_mail' => false, 'ip_hash_key' => 'test-only-key', 'max_per_hour' => 1000, 'per_ip_per_hour' => 1000];\n");
const port = await freePort();
const php = spawn('php', ['-d', 'display_errors=1', '-d', 'error_reporting=-1', '-S', `127.0.0.1:${port}`, '-t', PUBLIC], {
  env: { ...process.env, UMA_PRIVATE_DIR: store }, stdio: ['ignore', 'ignore', 'pipe'],
});
let phpLog = ''; php.stderr.on('data', (d) => { phpLog += d; });
const URL_ = `http://127.0.0.1:${port}/api/enquiry.php`;

const cleanup = () => { try { php.kill(); } catch {} try { rmSync(store, { recursive: true, force: true }); } catch {} };
process.on('exit', cleanup);

// Wait for the server.
let up = false;
for (let i = 0; i < 50 && !up; i++) {
  try { await fetch(URL_); up = true; } catch { await new Promise((r) => setTimeout(r, 100)); }
}
if (!up) { console.log('FAIL php -S did not start', phpLog); console.log('enquiry-php: 0 checks, 1 failures'); process.exit(1); }

const recordsDir = join(store, 'enquiries');
const listRecords = () => (existsSync(recordsDir) ? readdirSync(recordsDir).filter((f) => f.endsWith('.json')).sort() : []);

/** POST form-encoded pairs; returns status, location, body and the records written by this request. */
async function post(pairs, label) {
  const before = new Set(listRecords());
  const body = new URLSearchParams(pairs.map(([k, v]) => [k, String(v)]));
  const res = await fetch(URL_, { method: 'POST', body, redirect: 'manual', headers: { 'content-type': 'application/x-www-form-urlencoded' } });
  const text = await res.text();
  check(!/(Warning|Notice|Deprecated|Fatal error|Parse error)\b.*:/.test(text), `${label}: no PHP diagnostics in the response`, text.slice(0, 200));
  const added = listRecords().filter((f) => !before.has(f)).map((f) => JSON.parse(readFileSync(join(recordsDir, f), 'utf8')));
  return { status: res.status, location: res.headers.get('location') ?? '', text, added };
}
const accepted = (r, label) => {
  check(r.status === 303, `${label}: 303`, `got ${r.status} ${r.text.slice(0, 160)}`);
  check(/^\/apply\/thank-you\/$/.test(r.location), `${label}: redirects to /apply/thank-you/`, r.location);
  check(r.added.length === 1, `${label}: exactly one record written`, `${r.added.length} written`);
  return r.added[0] ?? {};
};
const rejected = (r, label) => {
  check(r.status === 422, `${label}: 422`, `got ${r.status}`);
  check(r.added.length === 0, `${label}: no record written`, `${r.added.length} written`);
};
const dropped = (r, label) => {
  check(r.status === 303 && r.location === '/apply/thank-you/', `${label}: 303 to /apply/thank-you/`, `got ${r.status} ${r.location}`);
  check(r.added.length === 0, `${label}: no record written`, `${r.added.length} written`);
};

const EMAIL = 'synthetic.candidate@example.invalid';
const minimum = (extra = []) => [['type', 'application-start'], ['course', 'medicine'], ['name', 'Synthetic Candidate'], ['email', EMAIL], ['consent', 'yes'], ...extra];

// 1. Method check
{
  const res = await fetch(URL_, { redirect: 'manual' });
  check(res.status === 405, 'GET: 405', `got ${res.status}`);
  check((res.headers.get('allow') ?? '').includes('POST'), 'GET: Allow: POST header');
}

// 2. A complete, valid candidate profile
{
  const pairs = [
    ['type', 'application-start'], ['course', 'medicine'], ['level', 'integrated_master'],
    ['university', 'unlisted'], ['university2', ''], ['university3', ''], ['university_other', 'Example State University'],
    ['intake', 'later'],
    ['edu_level', 'secondary'], ['qualification', 'Secondary School Certificate'], ['country', 'Example-land'],
    ['qual_year', '2026'], ['qual_status', 'expected'], ['scale_type', 'letter'], ['scale_max', 'A'],
    ['subjects[0][name]', 'Biology'], ['subjects[0][grade]', 'B'], ['subjects[0][status]', 'predicted'],
    ['subjects[1][name]', 'Chemistry'], ['subjects[1][grade]', 'C'], ['subjects[1][status]', 'achieved'],
    ['subjects[2][name]', ''], ['subjects[2][grade]', ''], ['subjects[2][status]', ''],
    ['subjects[3][name]', 'Physics'], ['subjects[3][grade]', ''], ['subjects[3][status]', 'not_studied'],
    ['subjects[4][name]', ''], ['subjects[4][grade]', ''], ['subjects[4][status]', 'pending'],
    ['subjects[5][name]', ''], ['subjects[5][grade]', ''], ['subjects[5][status]', ''],
    ['outstanding', 'Final examinations\nResults expected later'],
    ['documents[certificate]', 'need'], ['documents[passport]', 'have'], ['documents[translations]', 'not_sure'], ['documents_note', 'School reference letter'],
    ['name', 'Synthetic Candidate'], ['email', EMAIL], ['residence', 'Example-land'], ['nationality', 'Exampleish'], ['language', 'English'],
    ['message', 'A synthetic question.'], ['consent', 'yes'], ['website', ''], ['ts', '45000'],
  ];
  const rec = accepted(await post(pairs, 'valid application-start'), 'valid application-start');
  const p = rec.profile ?? {};
  check(rec.version === 2, 'record: version 2', JSON.stringify(rec.version));
  check(rec.type === 'application-start', 'record: type application-start');
  check(rec.stage === 'enquiry', 'record: stage is enquiry', rec.stage);
  check(rec.course === 'medicine' && rec.university === 'unlisted', 'record: top-level course and university kept');
  check(JSON.stringify(p.intent) === JSON.stringify({ field: 'medicine', level: 'integrated_master', universities: ['unlisted'], university_other: 'Example State University', intake: 'later' }), 'profile.intent matches the post', JSON.stringify(p.intent));
  const e = p.education ?? {};
  check(e.level === 'secondary' && e.qualification === 'Secondary School Certificate' && e.awarding_country === 'Example-land', 'profile.education level/qualification/country', JSON.stringify(e));
  check(e.year === '2026' && e.year_status === 'expected' && e.scale_type === 'letter' && e.scale_max === 'A', 'profile.education year/status/scale');
  check(JSON.stringify(e.subjects) === JSON.stringify([
    { name: 'Biology', grade: 'B', result_status: 'predicted' },
    { name: 'Chemistry', grade: 'C', result_status: 'achieved' },
    { name: 'Physics', grade: '', result_status: 'not_studied' },
  ]), 'profile.education.subjects: empty rows dropped, grades as typed', JSON.stringify(e.subjects));
  check(e.outstanding === 'Final examinations\nResults expected later', 'profile.education.outstanding keeps line breaks', JSON.stringify(e.outstanding));
  check(JSON.stringify(p.documents) === JSON.stringify([{ type: 'certificate', state: 'need' }, { type: 'passport', state: 'have' }, { type: 'translations', state: 'not_sure' }]), 'profile.documents matches the post', JSON.stringify(p.documents));
  check(p.documents_note === 'School reference letter', 'profile.documents_note stored');
  check(JSON.stringify(p.contact) === JSON.stringify({ name: 'Synthetic Candidate', email: EMAIL, residence: 'Example-land', nationality: 'Exampleish', language: 'English', questions: 'A synthetic question.' }), 'profile.contact matches the post', JSON.stringify(p.contact));
  check(rec.consent === true && typeof rec.consentText === 'string', 'record: consent recorded');
  check(/^[0-9a-f]{64}$/.test(rec.ip_hash ?? ''), 'record: IP stored only as a keyed hash');
  check(!/127\.0\.0\.1/.test(JSON.stringify(rec)), 'record: raw IP not stored');
  check(!('ts' in rec) && !('website' in rec) && !('ts' in p), 'record: bot-check fields not stored');
}

// 3. Required fields
rejected(await post([], 'empty POST'), 'empty POST');
rejected(await post(minimum().filter(([k]) => k !== 'course'), 'no course'), 'application-start without course');
rejected(await post(minimum().filter(([k]) => k !== 'name'), 'no name'), 'application-start without name');
rejected(await post(minimum().filter(([k]) => k !== 'email'), 'no email'), 'application-start without email');
rejected(await post(minimum().map(([k, v]) => [k, k === 'email' ? 'not-an-email' : v]), 'bad email'), 'application-start with an invalid email');
rejected(await post(minimum().filter(([k]) => k !== 'consent'), 'no consent'), 'application-start without consent');
rejected(await post(minimum().map(([k, v]) => [k, k === 'course' ? 'astrology' : v]), 'unknown course'), 'application-start with a course outside the allow-list');
rejected(await post(minimum().filter(([k]) => k !== 'name').concat([['name[]', 'array instead of text']]), 'array name'), 'name posted as an array');
{
  const r = await post(minimum().filter(([k]) => k !== 'course'), 'no course 422 page');
  check(/field of study/.test(r.text) && !/javascript:/i.test(r.text), '422 page names the missing field and uses no javascript: link');
}
{
  const r = accepted(await post(minimum().filter(([k]) => k !== 'country'), 'no country'), 'application-start without country (no longer required)');
  check(r.profile?.education?.awarding_country === '', 'missing country stored as empty');
}

// 4. Bot checks
dropped(await post(minimum([['website', 'https://spam.example.invalid']]), 'honeypot'), 'honeypot filled');
dropped(await post(minimum([['ts', '1200']]), 'fast'), 'ts below 3 seconds');
accepted(await post(minimum([['ts', '3000']]), 'ts 3s'), 'ts of 3 seconds');
accepted(await post(minimum([['ts', '']]), 'ts empty'), 'ts empty (no script) is not treated as a bot');

// 5. Enumerations outside the allow-lists are dropped
{
  const rec = accepted(await post(minimum([
    ['level', 'wizardry'], ['edu_level', 'kindergarten'], ['qual_status', 'maybe'], ['scale_type', 'stars'], ['intake', '1999'],
    ['qual_year', 'abcd'], ['university', '../../etc/passwd'], ['university2', 'Not A Slug'], ['university3', 'unlisted'],
    ['subjects[0][name]', 'Biology'], ['subjects[0][grade]', 'B'], ['subjects[0][status]', 'excellent'],
    ['documents[passport]', 'lost'], ['documents[certificate]', 'have'], ['stage', 'official-submission'],
  ]), 'bad enums'), 'invalid enumerations');
  const p = rec.profile ?? {};
  check(p.intent?.level === '' && p.education?.level === '' && p.education?.year_status === '' && p.education?.scale_type === '', 'invalid level/edu_level/qual_status/scale_type stored as empty', JSON.stringify(p));
  check(p.intent?.intake === '' && p.education?.year === '', 'invalid intake and year stored as empty');
  check(JSON.stringify(p.intent?.universities) === '["unlisted"]', 'invalid university slugs dropped', JSON.stringify(p.intent?.universities));
  check(p.education?.subjects?.[0]?.result_status === '', 'invalid subject status stored as empty');
  check(JSON.stringify(p.documents) === '[{"type":"certificate","state":"have"}]', 'invalid document state dropped', JSON.stringify(p.documents));
  check(rec.stage === 'enquiry', 'posted stage is ignored: stage stays enquiry', rec.stage);
}

// 6. Arrays are capped
{
  const many = [];
  for (let i = 0; i < 15; i++) many.push([`subjects[${i}][name]`, `Subject ${i + 1}`], [`subjects[${i}][grade]`, String(i)]);
  const rec = accepted(await post(minimum([
    ...many,
    ['university', 'alpha-university'], ['university2', 'beta-university'], ['university3', 'alpha-university'], ['university4', 'delta-university'],
    ['documents[passport]', 'have'], ['documents[diary]', 'have'], ['documents[0]', 'need'],
    ...['certificate', 'transcript', 'photographs', 'birth_certificate', 'medical_certificate', 'translations', 'legalisation', 'language_certificate', 'other'].map((d) => [`documents[${d}]`, 'need']),
  ]), 'caps'), 'array caps');
  const p = rec.profile ?? {};
  check(p.education?.subjects?.length === 12, 'subjects capped at 12 rows', String(p.education?.subjects?.length));
  check(JSON.stringify(p.intent?.universities) === '["alpha-university","beta-university"]', 'universities: at most three fields read, duplicates removed', JSON.stringify(p.intent?.universities));
  check(p.documents?.length === 10 && p.documents.every((d) => d.type !== 'diary' && d.type !== '0'), 'documents limited to the ten known types', JSON.stringify(p.documents));
}
{
  const rec = accepted(await post(minimum([['subjects', 'not-an-array'], ['documents', 'not-an-array']]), 'scalar arrays'), 'array fields posted as text');
  check(JSON.stringify(rec.profile?.education?.subjects) === '[]' && JSON.stringify(rec.profile?.documents) === '[]', 'non-array subjects/documents ignored');
}

// 7. Control characters, tags and length caps
{
  const rec = accepted(await post([
    ['type', 'application-start'], ['course', 'dentistry'], ['name', 'Synthetic\r\nBcc: victim@example.invalid\tCandidate'], ['email', EMAIL], ['consent', 'yes'],
    ['residence', 'Example land'], ['qualification', '<b>Certificate</b>\u0000'], ['subjects[0][name]', 'Bio\nlogy'], ['subjects[0][grade]', 'A\r'],
    ['message', 'Line one\r\nLine two\u0007'], ['university_other', 'x'.repeat(500)],
  ], 'control chars'), 'control characters');
  const p = rec.profile ?? {};
  check(!/[\r\n\t]/.test(rec.name ?? '') && rec.name === 'Synthetic Bcc: victim@example.invalid Candidate', 'name stored without CR/LF/tab', JSON.stringify(rec.name));
  check(p.contact?.name === rec.name, 'profile.contact.name sanitised the same way');
  check(p.contact?.residence === 'Example land', 'U+2028 removed from a single-line field', JSON.stringify(p.contact?.residence));
  check(p.education?.qualification === '<b>Certificate</b>', 'NUL removed; text otherwise stored as typed (JSON storage, plain-text mail: no tag stripping)', JSON.stringify(p.education?.qualification));
  check(p.education?.subjects?.[0]?.name === 'Bio logy' && p.education?.subjects?.[0]?.grade === 'A', 'subject cells are single-line', JSON.stringify(p.education?.subjects));
  check(rec.message === 'Line one\nLine two', 'multi-line message keeps line breaks, drops other control characters', JSON.stringify(rec.message));
  check(p.intent?.university_other?.length === 200, 'university_other capped at 200 characters', String(p.intent?.university_other?.length));
}
// 7b. Values containing "<" are data, not markup: a grade such as "<50" must survive (verification finding, 2026-10-11)
{
  const rec = accepted(await post([
    ['type', 'application-start'], ['course', 'medicine'], ['name', 'Synthetic Candidate'], ['email', EMAIL], ['consent', 'yes'],
    ['subjects[0][name]', 'Chemistry'], ['subjects[0][grade]', '<50'], ['subjects[0][status]', 'achieved'],
    ['outstanding', 'Physics 3<4 results pending'], ['message', 'My chemistry score was <80 and biology >90, is that enough?'],
  ], 'less-than values'), 'less-than values');
  const p = rec.profile ?? {};
  check(p.education?.subjects?.[0]?.grade === '<50', 'grade "<50" stored unchanged', JSON.stringify(p.education?.subjects));
  check(p.education?.outstanding === 'Physics 3<4 results pending', 'outstanding "3<4" stored unchanged', JSON.stringify(p.education?.outstanding));
  check(rec.message === 'My chemistry score was <80 and biology >90, is that enough?', 'message with "<" stored unchanged', JSON.stringify(rec.message));
}
{
  const rec = accepted(await post(minimum().map(([k, v]) => [k, k === 'name' ? 'N'.repeat(500) : v]), 'long name'), 'long name');
  check(rec.name?.length === 120, 'name capped at 120 characters', String(rec.name?.length));
}

// 8. Contact-page enquiry keeps its behaviour
{
  const rec = accepted(await post([['type', 'enquiry'], ['name', 'Synthetic Enquirer'], ['email', EMAIL], ['message', 'A synthetic enquiry.'], ['consent', 'yes'], ['website', '']], 'enquiry'), 'contact enquiry');
  check(rec.type === 'enquiry' && rec.stage === 'enquiry' && rec.version === 2, 'enquiry record: type, stage, version');
  check(rec.message === 'A synthetic enquiry.' && rec.name === 'Synthetic Enquirer' && !('profile' in rec), 'enquiry record: fields stored, no profile object');
  rejected(await post([['type', 'enquiry'], ['name', 'Synthetic Enquirer'], ['email', EMAIL], ['consent', 'yes']], 'enquiry no message'), 'contact enquiry without a message');
  accepted(await post([['name', 'Synthetic Enquirer'], ['email', EMAIL], ['message', 'No type field.'], ['consent', 'yes']], 'no type'), 'post without a type is treated as an enquiry');
}

// 9. Every field-of-study key (underscored keys included) and "undecided" is accepted
{
  const src = readFileSync(join(SITE, 'src/lib/fields.ts'), 'utf8');
  const block = src.match(/export const FIELDS = \{([\s\S]*?)\n\} as const;/)?.[1] ?? '';
  const keys = [...block.matchAll(/^\s+([a-z_]+):\s*\{/gm)].map((m) => m[1]);
  check(keys.length >= 9 && keys.includes('public_health'), 'FIELDS keys parsed from src/lib/fields.ts', keys.join(','));
  for (const key of [...keys, 'undecided']) {
    const rec = accepted(await post(minimum().map(([k, v]) => [k, k === 'course' ? key : v]), `course=${key}`), `course=${key}`);
    check(rec.profile?.intent?.field === key && rec.course === key, `course=${key} stored`);
  }
}

// 10. Storage stays outside the web root
check(!existsSync(join(PUBLIC, 'enquiries')) && !existsSync(join(PUBLIC, 'api', 'enquiries')), 'no records inside public/');
check(listRecords().every((f) => /^\d{8}-\d{6}-[0-9a-f]{16}\.json$/.test(f)), 'record file names are timestamp + random id');

cleanup();

// 11. Notification e-mail: with sending on, mail() is captured by a stand-in sendmail; a name containing CR/LF must not
// add a header, and the subject is encoded.
{
  const store2 = mkdtempSync(join(tmpdir(), 'uma-enquiry-mail-'));
  const mailFile = join(store2, 'mail.txt');
  writeFileSync(join(store2, 'config.php'), "<?php return ['send_mail' => true, 'notify_to' => 'team@example.invalid', 'from' => 'no-reply@example.invalid'];\n");
  const port2 = await freePort();
  const php2 = spawn('php', ['-d', 'display_errors=1', '-d', 'error_reporting=-1', '-d', `sendmail_path=tee -a ${mailFile}`, '-S', `127.0.0.1:${port2}`, '-t', PUBLIC], {
    env: { ...process.env, UMA_PRIVATE_DIR: store2 }, stdio: ['ignore', 'ignore', 'ignore'],
  });
  const url2 = `http://127.0.0.1:${port2}/api/enquiry.php`;
  try {
    let ok = false;
    for (let i = 0; i < 50 && !ok; i++) { try { await fetch(url2); ok = true; } catch { await new Promise((r) => setTimeout(r, 100)); } }
    const body = new URLSearchParams([['type', 'application-start'], ['course', 'medicine'], ['name', 'Synthetic\r\nBcc: victim@example.invalid'], ['email', EMAIL], ['consent', 'yes'], ['subjects[0][name]', 'Biology'], ['subjects[0][grade]', 'B']]);
    const res = await fetch(url2, { method: 'POST', body, redirect: 'manual' });
    check(res.status === 303, 'mail: submission accepted with sending on', String(res.status));
    for (let i = 0; i < 20 && !existsSync(mailFile); i++) await new Promise((r) => setTimeout(r, 100));
    const mail = existsSync(mailFile) ? readFileSync(mailFile, 'utf8') : '';
    const [headers = '', ...rest] = mail.split(/\r?\n\r?\n/);
    check(mail.length > 0, 'mail: a notification was handed to sendmail');
    check(!/^bcc:/im.test(headers), 'mail: CR/LF in the name cannot add a Bcc header', headers);
    // RFC 2047: one or more encoded words of at most 75 characters, folded onto continuation lines.
    const subj = (headers.match(/^Subject: (.*(?:\r?\n[ \t].*)*)/m) ?? [])[1] ?? '';
    const words = subj.split(/\r?\n[ \t]+|\s+/).filter(Boolean);
    check(words.length > 1 && words.every((w) => /^=\?UTF-8\?B\?[A-Za-z0-9+/=]+\?=$/.test(w) && w.length <= 75), 'mail: subject is folded encoded words of at most 75 characters', subj);
    const decoded = words.map((w) => Buffer.from(w.slice(10, -2), 'base64').toString('utf8')).join('');
    check(decoded.startsWith('[UMA] New application-start from Synthetic') && !/[\r\n]/.test(decoded), 'mail: the subject decodes to the full text, without CR/LF', decoded);
    check(/^Reply-To: synthetic\.candidate@example\.invalid$/m.test(headers), 'mail: Reply-To is the validated address');
    check(/^Content-Transfer-Encoding: base64$/m.test(headers), 'mail: body is base64 (no line over 998 bytes)', headers);
    const bodyRaw = rest.join('\n\n');
    check(bodyRaw.split(/\r?\n/).every((l) => l.length <= 76), 'mail: body lines are at most 76 characters');
    const text = Buffer.from(bodyRaw.replace(/\s+/g, ''), 'base64').toString('utf8');
    check(/Biology: B/.test(text) && /nothing has been sent to any university/.test(text), 'mail: body lists the profile and states nothing was sent to a university', text.slice(0, 200));
  } finally {
    php2.kill();
    rmSync(store2, { recursive: true, force: true });
  }
}

// 12. A mail system that refuses the notification: the record is still stored (the person sees the thank-you page),
// and the failure is written to the record and to the error log instead of disappearing.
{
  const store3 = mkdtempSync(join(tmpdir(), 'uma-enquiry-mailfail-'));
  writeFileSync(join(store3, 'config.php'), "<?php return ['send_mail' => true, 'notify_to' => 'team@example.invalid', 'from' => 'no-reply@example.invalid'];\n");
  const port3 = await freePort();
  let log3 = '';
  const php3 = spawn('php', ['-d', 'display_errors=0', '-d', 'log_errors=1', '-d', 'sendmail_path=/bin/false', '-S', `127.0.0.1:${port3}`, '-t', PUBLIC], {
    env: { ...process.env, UMA_PRIVATE_DIR: store3 }, stdio: ['ignore', 'ignore', 'pipe'],
  });
  php3.stderr.on('data', (d) => { log3 += d; });
  const url3 = `http://127.0.0.1:${port3}/api/enquiry.php`;
  try {
    let ok = false;
    for (let i = 0; i < 50 && !ok; i++) { try { await fetch(url3); ok = true; } catch { await new Promise((r) => setTimeout(r, 100)); } }
    const res = await fetch(url3, { method: 'POST', body: new URLSearchParams([['type', 'enquiry'], ['name', 'Synthetic Candidate'], ['email', EMAIL], ['message', 'Synthetic question'], ['consent', 'yes']]), redirect: 'manual' });
    check(res.status === 303, 'mail failure: the submission is still accepted', String(res.status));
    const dir3 = join(store3, 'enquiries');
    const files = existsSync(dir3) ? readdirSync(dir3) : [];
    const rec = files.length === 1 ? JSON.parse(readFileSync(join(dir3, files[0]), 'utf8')) : {};
    check(rec.notification === 'failed', 'mail failure: the record says the notification failed', JSON.stringify(rec).slice(0, 200));
    await new Promise((r) => setTimeout(r, 200));
    check(/notification e-mail for record [0-9a-f]{16} was not accepted/.test(log3), 'mail failure: written to the error log');
  } finally {
    php3.kill();
    rmSync(store3, { recursive: true, force: true });
  }
}

// 13. Rate limits: per keyed IP code (only with ip_hash_key) and in total per hour; nothing is stored or sent over the limit.
{
  const store4 = mkdtempSync(join(tmpdir(), 'uma-enquiry-rate-'));
  writeFileSync(join(store4, 'config.php'), "<?php return ['send_mail' => false, 'ip_hash_key' => 'test-only-key', 'per_ip_per_hour' => 2, 'max_per_hour' => 3];\n");
  const port4 = await freePort();
  const php4 = spawn('php', ['-S', `127.0.0.1:${port4}`, '-t', PUBLIC], { env: { ...process.env, UMA_PRIVATE_DIR: store4 }, stdio: ['ignore', 'ignore', 'ignore'] });
  const url4 = `http://127.0.0.1:${port4}/api/enquiry.php`;
  const send = () => fetch(url4, { method: 'POST', body: new URLSearchParams([['type', 'enquiry'], ['name', 'Synthetic Candidate'], ['email', EMAIL], ['message', 'Synthetic question'], ['consent', 'yes']]), redirect: 'manual' });
  const count = () => (existsSync(join(store4, 'enquiries')) ? readdirSync(join(store4, 'enquiries')).length : 0);
  try {
    let ok = false;
    for (let i = 0; i < 50 && !ok; i++) { try { await fetch(url4); ok = true; } catch { await new Promise((r) => setTimeout(r, 100)); } }
    const statuses = [];
    for (let i = 0; i < 3; i++) statuses.push((await send()).status);
    check(statuses.join(',') === '303,303,429', 'rate limit: the third submission from one keyed IP within the hour is refused (429)', statuses.join(','));
    check(count() === 2, 'rate limit: nothing is stored over the limit', String(count()));
    const rl = existsSync(join(store4, 'ratelimit')) ? readdirSync(join(store4, 'ratelimit')) : [];
    check(rl.length === 1 && /^[0-9a-f]{64}\.json$/.test(rl[0]), 'rate limit: only the keyed IP code is used as the counter name', rl.join(','));
    const stale = join(store4, 'ratelimit', `${'0'.repeat(64)}.json`);
    writeFileSync(stale, '[1]'); utimesSync(stale, new Date(Date.now() - 2 * 3600e3), new Date(Date.now() - 2 * 3600e3));
    check((await send()).status === 429 && !existsSync(stale) && readdirSync(join(store4, 'ratelimit')).length === 1, 'rate limit: a counter older than an hour is deleted at the next submission; the current one is kept', readdirSync(join(store4, 'ratelimit')).join(','));
    rmSync(join(store4, 'ratelimit'), { recursive: true, force: true });
    statuses.length = 0;
    for (let i = 0; i < 2; i++) statuses.push((await send()).status);
    check(statuses.join(',') === '303,429', 'rate limit: the total per-hour cap applies to everyone', statuses.join(','));
    check(count() === 3, 'rate limit: the total cap stops storage at max_per_hour', String(count()));
  } finally {
    php4.kill();
    rmSync(store4, { recursive: true, force: true });
  }
}

console.log(`enquiry-php: ${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);
