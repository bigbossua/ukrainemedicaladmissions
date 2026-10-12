# EMAIL_DELIVERY_VERIFICATION.md — live test of the enquiry e-mail and the private record

**Date written:** 2026-10-12 · **Status:** procedure only. It has never been run. **E-mail delivery from the enquiry form is UNVERIFIED** and stays unverified until every step in §4 and §5 has passed on the real hosting account and the evidence is recorded (§7). Passing tests in this repository (`tests/enquiry-php.mjs`, `tests/verify-live-selftest.mjs`) run with `send_mail` switched off and prove nothing about delivery.

**`npm run verify:live` is not a delivery test.** Its only form posts are an empty form (expected 422) and a form with the hidden honeypot field filled (expected 303). The handler drops the honeypot post on purpose: nothing is stored and no e-mail is sent. It proves that PHP runs the handler, nothing more.

Who runs it: **the owner** (or someone the owner trusts with hPanel and the business mailbox). Claude cannot reach the host, the mailbox or the DNS from its environment, and never handles the private key in §2.

When: only **after a separately approved release** to production, or on a **staging host the owner has approved** (password-protected, `SECURITY_AND_RELEASE_CHECKLIST.md` A5). This procedure does not approve a release, a DNS change or any purchase.

Labels: **REPO** = read in this repository; **UNVERIFIED** = hPanel menu names, Hostinger behaviour and mail-provider behaviour not checked from here (hostinger.com is refused by the environment's network policy). Menu names may read differently on the owner's screen.

---

## 1. What the handler does (REPO, `site/public/api/enquiry.php`)

| Item | Behaviour |
|---|---|
| Private directory | `<parent of the document root>/uma-private`. On Hostinger this is the directory that **contains** `public_html` (exact path: checklist A1, `HOSTING_AND_DEPLOYMENT_ASSESSMENT.md` §10). The `UMA_PRIVATE_DIR` environment variable can override it, but shared hosting normally gives no way to set it, so the default applies. |
| Optional settings file | `uma-private/config.php`, returning an array. Keys: `notify_to`, `from`, `send_mail`, `ip_hash_key`. Without the file the handler still works with its built-in defaults (`notify_to` = `info@ukrainemedicaladmissions.com`, `from` = `no-reply@ukrainemedicaladmissions.com`, `send_mail` = true) but stores **no** IP information, because there is no `ip_hash_key`. |
| Record | One JSON file per accepted submission in `uma-private/enquiries/`, named `YYYYMMDD-HHMMSS-<16 hex>.json` (UTC). The handler creates `enquiries/` with mode 0700 and sets each file to 0600. Name and message are stored as typed, in UTF-8. `ip_hash` is a 64-character HMAC when `ip_hash_key` is set, otherwise `null`. |
| E-mail | PHP `mail()` to `notify_to`. Plain text, UTF-8. Headers: `From:` the `from` value, `Reply-To:` the e-mail address typed in the form, `MIME-Version: 1.0`, `Content-Type: text/plain; charset=utf-8`. Subject: `[UMA] New application-start from <name>` (encoded for non-ASCII names). The last body line is `Record: <id> (stage: enquiry; nothing has been sent to any university)`. No envelope sender is passed to `mail()`, so the `Return-Path` is whatever the host's mail system chooses (UNVERIFIED). |
| Dropped without storing or mailing | A filled honeypot field (`website`), or a form sent less than 3 seconds after the page opened (`ts` field). Both still show the thank-you page. |
| Rejected (422 page) | A missing field of study, name, valid e-mail address or consent tick. Nothing stored, nothing sent. |
| Storage failure | HTTP 500 with "Sorry, we could not record your details…". No e-mail is sent in that case. |

## 2. Preconditions (all must be true before the test)

- [ ] **P1 Approval.** The release (or the staging host) carrying the current handler is approved and deployed. Write down the release tag or commit.
- [ ] **P2 Document root known.** The document root path for the host under test is recorded (checklist A1). On staging, the staging document root must **not** sit inside the production `public_html`; otherwise `uma-private/` would land inside the production web root (backlog N22 o). If it does, stop and test on production after the release instead.
- [ ] **P3 `uma-private/config.php` exists beside the document root**, with exactly these four keys, mode 0600, in a directory of mode 0700. The two addresses below are the handler's own defaults (REPO); change them only if the owner decides to.

  ```php
  <?php
  return [
      'notify_to'   => 'info@ukrainemedicaladmissions.com',
      'from'        => 'no-reply@ukrainemedicaladmissions.com',
      'send_mail'   => true,
      'ip_hash_key' => 'PASTE-64-HEX-CHARACTERS-GENERATED-AS-BELOW',
  ];
  ```

  **The key** is a random secret of 32 bytes (64 hex characters). Generate it on the server or on the owner's own computer. Never paste it into a chat, an e-mail, a ticket or a Git commit (checklist C3.2). If it is ever exposed, replace it; old records keep their old hashes.

  **Option A, over SSH** (hPanel → Advanced → SSH Access; status ACTIVE per the assessment §1). The commands below create the directory and the file with the right modes, generate the key on the server and never print it:

  ```sh
  cd ~                               # then cd into the directory that CONTAINS the document root (A1)
  ls -d public_html                  # must list public_html: you are in the right place
  umask 077
  mkdir -p uma-private && chmod 700 uma-private
  KEY=$(php -r 'echo bin2hex(random_bytes(32));')
  cat > uma-private/config.php <<EOF
  <?php
  return [
      'notify_to'   => 'info@ukrainemedicaladmissions.com',
      'from'        => 'no-reply@ukrainemedicaladmissions.com',
      'send_mail'   => true,
      'ip_hash_key' => '$KEY',
  ];
  EOF
  unset KEY
  chmod 600 uma-private/config.php
  php -l uma-private/config.php      # expect: No syntax errors detected
  ls -ld uma-private uma-private/config.php   # expect drwx------ and -rw-------
  ```

  **Option B, in hPanel File Manager** (menu names UNVERIFIED). Generate the key on your own computer first: macOS or Linux terminal `openssl rand -hex 32`; Windows PowerShell `$b = New-Object byte[] 32; [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b); ($b | ForEach-Object { $_.ToString('x2') }) -join ''`. Then: Files → File Manager → go **one level above** `public_html` → New folder `uma-private` → open it → New file `config.php` → paste the block above with your key → Save → right-click the file → Permissions → `600`; right-click the folder → Permissions → `700`. Close the terminal window that showed the key.

  **Never commit it.** The file exists only on the server. It is outside the deploy directory, so Hostinger Git (which writes into `public_html/`) does not touch it. Note that `site/.gitignore` ignores a directory named `private/` but **not** one named `uma-private/` (REPO), so Git would not stop a copy made inside the repository: never create or copy it there, nor into a ticket or a backup that goes into Git.

- [ ] **P4 Read-only DNS check of the sending domain** (`ukrainemedicaladmissions.com`). **Look only; change nothing.** Any DNS change needs the owner's approval of that change.
  - Where: hPanel → Domains → `ukrainemedicaladmissions.com` → DNS / Nameservers → DNS records (UNVERIFIED names). If the domain's DNS is not hosted at Hostinger (still unconfirmed, assessment §12.1), the records live at the registrar's DNS page.
  - Or from the owner's own computer: `nslookup -type=TXT ukrainemedicaladmissions.com` and `nslookup -type=TXT _dmarc.ukrainemedicaladmissions.com`.
  - What to look for, and write down exactly as shown:

    | Record | Where | What a working record looks like | Note |
    |---|---|---|---|
    | SPF | TXT on the domain itself (`@`) | exactly **one** TXT value starting `v=spf1`, ending in `~all` or `-all` | Two `v=spf1` records make SPF fail. Whether the record covers the server that sends PHP mail is shown by the test, not by the record. |
    | DKIM | TXT (or CNAME) on `<selector>._domainkey`; the selector name is set by the mail provider | `v=DKIM1; k=rsa; p=…` | The selector name is not known from here (UNVERIFIED). Hostinger's e-mail DNS page may list it. |
    | DMARC | TXT on `_dmarc` | `v=DMARC1; p=none` (or `quarantine` / `reject`) with optional `rua=mailto:…` | `p=none` only reports; stricter policies make an unaligned message go to spam or bounce. |

  - Missing or doubtful records are **not** fixed during the test. Note them in §7 and treat them under §6.
- [ ] **P5 Mailbox access.** The owner can open `info@ukrainemedicaladmissions.com` (inbox and spam folder) and can view a message's full headers ("Show original" in Gmail, "View source" / "Headers" in most webmail; Hostinger Webmail names UNVERIFIED).
- [ ] **P6 A Reply-To address the owner controls**, separate from `info@` (for example the owner's own personal mailbox, or an alias of it). It is the only real address in the test; no other real personal data is used.
- [ ] **P7 A marker** for this test: `UMA-MAILTEST-<YYYYMMDD>-<HHMM>` in UTC, for example `UMA-MAILTEST-20261020-0915`.

## 3. Note before you start

- One synthetic submission per attempt. If an attempt fails and something is changed, the next attempt is a new submission with a new marker; record every attempt.
- Use no real applicant's data. Do not attach anything (the form accepts no files).
- Do not post the form from a script; use a browser, as an applicant would. Take more than 3 seconds, or the timing check drops it silently.

## 4. The test (one synthetic submission through the live `/apply/` form)

1. Write down the time (UTC) to the minute.
2. Open `https://ukrainemedicaladmissions.com/apply/` (or the approved staging URL) in a normal browser window.
3. Fill in only what is required, with synthetic values:
   - Field of study: any option, for example "Medicine".
   - Full name: `Zoë Тест UMA-MAILTEST-<YYYYMMDD>-<HHMM>`. The name mixes Latin with a diaeresis and Cyrillic to test UTF-8, and carries the marker.
   - E-mail: the Reply-To address from P6.
   - Your questions: `Synthetic delivery test UMA-MAILTEST-<YYYYMMDD>-<HHMM>. Not an applicant. Delete after checking.`
   - Leave residence, nationality, education and documents empty or at their defaults.
   - Tick the privacy-notice box.
4. Press **Apply Online Now** on the last step.
5. Expected: the thank-you page `/apply/thank-you/`. Write down the time. Any other page: stop and go to §6.

## 5. What to check (write each result down as you go)

| # | Check | How | Pass when |
|---|---|---|---|
| C1 | Arrival | `info@ukrainemedicaladmissions.com` inbox | the message with the marker arrives **within 15 minutes** of step 4 (the limit this procedure sets; not a promise from the host). Note the arrival time. |
| C2 | Spam folder | spam / junk folder of `info@` | the message is **not** there. If it is, the test fails C2 even though it arrived. |
| C3 | Authentication | full headers → `Authentication-Results:` line(s) added by the receiving server | `spf=pass`, `dkim=pass` with `header.d=ukrainemedicaladmissions.com` (or `header.i=@ukrainemedicaladmissions.com`), `dmarc=pass`. Copy the whole line. Also copy `Return-Path:` and `DKIM-Signature: … d=…`. |
| C4 | From | header | `From: no-reply@ukrainemedicaladmissions.com` (or the `from` value in config.php) |
| C5 | Reply-To | header; press Reply in the mail client | `Reply-To:` is the P6 address, and Reply addresses it (not `info@`, not `no-reply@`) |
| C6 | UTF-8 | subject line and body | subject reads `[UMA] New application-start from Zoë Тест UMA-MAILTEST-…`; the body shows `Name: Zoë Тест …` with no `Ã«`, `Ð¢` or `?` characters; `Content-Type: text/plain; charset=utf-8` in the headers |
| C7 | Message ID | header | copy the full `Message-ID:` value |
| C8 | Record written | SSH `ls -l ~/<parent of docroot>/uma-private/enquiries/` or File Manager | exactly one new `YYYYMMDD-HHMMSS-<id>.json` whose `<id>` equals the `Record:` line in the e-mail body |
| C9 | Record contents | open the file (SSH `cat`, or File Manager → View) | `"stage": "enquiry"`, the name with `ë` and Cyrillic readable (not `\u` escapes), the marker in `message`, `"consent": true`, `ip_hash` a 64-character hex string. **`ip_hash: null` means config.php was not read** (wrong directory or unreadable): fail. |
| C10 | Permissions | SSH `ls -l` / `ls -ld`, or File Manager → Permissions | record file `-rw-------` (0600); `enquiries/` and `uma-private/` `drwx------` (0700) |
| C11 | Not reachable over HTTP | from any computer: `curl -sI https://ukrainemedicaladmissions.com/uma-private/enquiries/<file>.json` and `curl -sI https://ukrainemedicaladmissions.com/uma-private/` (or open them in a browser) | both answer **404 or 403**, never 200. `npm run verify:live` checks `/uma-private/`, `/uma-private/config.php` and `/uma-private/enquiries/` the same way. |

**If C3 finds no `Authentication-Results` line**, the receiving server did not evaluate SPF, DKIM or DMARC (this can happen when the web server and the mailbox belong to the same provider; UNVERIFIED for this host). Then C3 is **not proven** by this message, and delivery to applicants' and partners' outside mailboxes is still unknown. Run one more attempt with a new marker after changing only `notify_to` in `config.php` to an outside mailbox the owner controls (for example the P6 mailbox); judge C1 to C7 there ("Show original" in Gmail lists SPF, DKIM and DMARC); then set `notify_to` back to `info@ukrainemedicaladmissions.com`, run `php -l uma-private/config.php`, and record both attempts.

The test **passes** only when C1 to C11 all pass. Anything else is a failure: record it as such (§7). Do not write "delivery works" anywhere until a passing run is recorded.

## 6. On failure

No new paid service, plugin, library, SMTP relay or other dependency without the owner's approval. A DNS change, a release or a hosting setting change each needs its own approval. Suggested fixes below are hypotheses until a re-test passes.

| Symptom | Likely cause (UNVERIFIED until checked) | What to do |
|---|---|---|
| "Please check the form" page (422) | a required field missing | fill field of study, name, a valid e-mail and the tick; new attempt |
| "Sorry, we could not record your details" (500) | the handler cannot create or write `uma-private/enquiries/` | check that `uma-private/` is beside the document root and owned by the hosting user; read the PHP error log (hPanel, UNVERIFIED location) for "UMA enquiry: cannot write". No e-mail is sent in this case. |
| Thank-you page but no record and no e-mail | dropped as a bot: sent within 3 seconds, or a browser extension filled the hidden `website` field | new attempt, slower, with extensions off |
| Record but `ip_hash` is `null` | `config.php` not read: wrong directory, wrong file name, or unreadable | compare the record's location with `config.php`'s; `php -l`; permissions; new attempt |
| Record but no e-mail anywhere after 15 minutes | `send_mail` false; `mail()` disabled or blocked; the host rejects a `From` address that is not a mailbox on the account | check `config.php`; check the host's mail log if hPanel offers one; read the PHP error log. Owner decisions (each free on the existing plan as far as known, UNVERIFIED): (a) set `from` to an existing mailbox such as `info@` in `config.php` (no release needed); (b) create `no-reply@` as a mailbox or forwarder in hPanel → Emails; (c) a code change passing an envelope sender to `mail()` (needs a release); (d) authenticated SMTP from a domain mailbox (a code change, and possibly a library: approval needed). |
| Arrives in spam | authentication failing or not aligned, or a new sending reputation | read C3. Do not mark passed. |
| `spf=fail`, `softfail`, `none` or `permerror` | no SPF record, two SPF records, or the record does not cover the server that sends PHP mail | record it; any SPF change is a DNS change for the owner to approve |
| `dkim=none` or `dkim=fail` | PHP `mail()` on this host is not signed for the domain, or DKIM is not enabled | record it; enabling DKIM in hPanel adds a DNS record (approval); option (d) above signs through the mailbox service |
| `dmarc=fail` while SPF passes | SPF passed for the host's own domain (see `Return-Path`), so it does not align with `From`; and no aligned DKIM | option (c) or (d) above; record it |
| Garbled name or subject | missing or wrong charset; a mail client that ignores encoded subjects; very long names can exceed the 75-character encoded-word limit (backlog N22 d) | record the client and the raw header; fix in code with a release |
| `Reply-To` missing or wrong | the address typed in the form, or the client hides it | check the raw header; re-test with the P6 address |
| Record file not 0600, or directory not 0700 | the server's file permissions defaults differ | `chmod 600` the file, `chmod 700` the directories; record it in `TECHNICAL_REPAIR_BACKLOG.md` (N4) |
| **The record or `uma-private/` answers 200 over HTTP** | the private directory is inside a web root | **stop**: rename `api/enquiry.php` to switch the form off (checklist D2), delete the synthetic record, move `uma-private/` outside every document root, and treat it as an incident (checklist C13); re-run C11 before switching the form back on |

## 7. Clean-up and evidence

**Clean-up (same day):**
1. Delete the synthetic record: SSH `rm ~/<parent of docroot>/uma-private/enquiries/<file>.json`, or File Manager → Delete. Confirm with `ls`.
2. Delete the test message from `info@` (inbox or spam) and empty that folder's trash. Delete any test reply from the P6 mailbox.
3. Keep `uma-private/config.php`: the release needs it (checklist B, backlog N21).

**Evidence:** add one line under section B of `SECURITY_AND_RELEASE_CHECKLIST.md` (or send the text for Claude to add), in this form. Copy header values exactly; leave out the P6 address and the key.

```text
Mail delivery test (EMAIL_DELIVERY_VERIFICATION.md) — PASS|FAIL — <YYYY-MM-DD> sent <HH:MM> UTC, arrived <HH:MM> UTC (<n> min), folder inbox|spam;
host <production|staging host>, release <tag> (<commit>); marker UMA-MAILTEST-<…>; Message-ID <…>;
Authentication-Results: <copied line>; Return-Path <domain only>; DKIM d=<…>; From <…>; Reply-To = test address yes|no;
UTF-8 subject/body ok|garbled; record <file name> 0600, dirs 0700, ip_hash present|null, HTTP <status> for the record URL and /uma-private/;
DNS read <date>: SPF <present|missing|2 records>, DKIM selector <name|not found>, DMARC p=<…|missing>; cleaned up <HH:MM> UTC; tested by <name>.
```

Then tick A7 and the "synthetic enquiry arrives" part of the B post-deploy line only if the result is PASS, and mark backlog N4 accordingly. A FAIL is recorded the same way, with the §6 row that applies.
