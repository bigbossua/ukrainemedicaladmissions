# EMAIL_DELIVERY_VERIFICATION.md — live test of the enquiry e-mail and the private record

**Date written:** 2026-10-12 · **Status:** procedure only. It has never been run. **E-mail delivery from the enquiry form is UNVERIFIED** and stays unverified until every step in §4 and §5 has passed on the real hosting account and the evidence is recorded (§7). Passing tests in this repository (`tests/enquiry-php.mjs`, `tests/verify-live-selftest.mjs`) run either with `send_mail` switched off or, in one `enquiry-php` case, with `mail()` handed to a local stand-in for sendmail that only writes the message to a file; they prove nothing about delivery.

**`npm run verify:live` is not a delivery test.** Its only form posts are an empty form carrying only the two empty hidden fields (expected 422) and a form with the hidden honeypot field filled (expected 303). The handler drops the honeypot post on purpose: nothing is stored and no e-mail is sent. It proves that PHP runs the handler, nothing more.

Who runs it: **the owner** (or someone the owner trusts with hPanel and the business mailbox). Claude cannot reach the host, the mailbox or the DNS from its environment, and never handles the private key in §2.

When: only **after a separately approved release** to production, or on a **staging host the owner has approved** (password-protected, `SECURITY_AND_RELEASE_CHECKLIST.md` A5). This procedure does not approve a release, a DNS change or any purchase.

Labels: **REPO** = read in this repository; **UNVERIFIED** = hPanel menu names, Hostinger behaviour and mail-provider behaviour not checked from here (hostinger.com is refused by the environment's network policy). Menu names may read differently on the owner's screen.

---

## 1. What the handler does (REPO, `site/public/api/enquiry.php`)

| Item | Behaviour |
|---|---|
| Private directory | `<parent of the document root>/uma-private`. On Hostinger this is the directory that **contains** `public_html` (exact path: checklist A1, `HOSTING_AND_DEPLOYMENT_ASSESSMENT.md` §10). The `UMA_PRIVATE_DIR` environment variable can override it, but shared hosting normally gives no way to set it, so the default applies. |
| Optional settings file | `uma-private/config.php`, returning an array. Keys: `notify_to`, `from`, `send_mail`, `ip_hash_key`, and since 29 October on the working branch (not released) `envelope_from`. Without the file the handler still works with its built-in defaults (`notify_to` = `info@ukrainemedicaladmissions.com`, `from` = `no-reply@ukrainemedicaladmissions.com`, `send_mail` = true) but stores **no** IP information, because there is no `ip_hash_key`. |
| Record | One JSON file per accepted submission in `uma-private/enquiries/`, named `YYYYMMDD-HHMMSS-<16 hex>.json` (UTC). The handler creates `enquiries/` with mode 0700 and sets each file to 0600. Name and message are stored as typed, in UTF-8. `ip_hash` is a 64-character HMAC when `ip_hash_key` is set, otherwise `null`. |
| E-mail | PHP `mail()` to `notify_to`. Plain text, UTF-8. Headers: `From:` the `from` value, `Reply-To:` the e-mail address typed in the form, `MIME-Version: 1.0`, `Content-Type: text/plain; charset=utf-8`, `Content-Transfer-Encoding: base64` (the body is base64 in 76-character lines). Subject: `[UMA] New enquiry from <name>` (contact form, and any post that names no type) or `[UMA] New application-start from <name>` (the `/apply/` form), sent as UTF-8 base64 encoded words (`=?UTF-8?B?…?=`) folded at 75 characters. *(Corrected 2026-10-27: the earlier text said 8bit and gave only the application-start subject.)* The last body line is `Record: <id> (stage: enquiry; nothing has been sent to any university)`. In production (`5048eb1`) no envelope sender is passed to `mail()`, so the `Return-Path` is whatever the host's mail system chooses (UNVERIFIED). The working branch adds an optional `envelope_from` setting, off unless `config.php` sets it. |
| Dropped without storing or mailing | A filled honeypot field (`website`), or a form sent less than 3 seconds after the page opened (`ts` field). Since the change of 29 October on the working branch (not yet released): also a post that leaves out `website` or `ts`, or sends a `ts` that is not a number. Both real forms always send both fields, empty without a script. All of these still show the thank-you page. **Limit:** a script that copies the form and sends its empty hidden fields passes these checks and skips the timing check, because an empty `ts` must be accepted for people without JavaScript. Only the per-visitor rate limit (`ip_hash_key`) limits such posts. |
| Rejected (422 page) | `/apply/`: a missing field of study, name, valid e-mail address or consent tick. `/contact/`: a missing name, valid e-mail address, message or consent tick. Nothing stored, nothing sent. *(Corrected 2026-10-29, audit F6.)* |
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

  **Never commit it.** The file exists only on the server. It is outside the deploy directory, so Hostinger Git (which writes into `public_html/`) does not touch it. Both `.gitignore` files (repository root and `site/`) ignore `uma-private/` (REPO, checked 2026-10-29), but never create or copy it inside the repository all the same, nor into a ticket or a backup that goes into Git.

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
| C3 | Authentication | full headers → `Authentication-Results:` line(s) added by the receiving server | `spf=pass`, `dkim=pass` with `header.d=ukrainemedicaladmissions.com` (or `header.i=@ukrainemedicaladmissions.com`), `dmarc=pass`. Copy the whole line. Also copy `Return-Path:` and `DKIM-Signature: … d=…`.. Also copy any spam-score header (`X-Spam-Status`, `X-Spam-Score`, `X-Spam-Report` or the mailbox provider's equivalent) and note which rules fired (audit F7). |
| C4 | From | header | `From: no-reply@ukrainemedicaladmissions.com` (or the `from` value in config.php) |
| C5 | Reply-To | header; press Reply in the mail client | `Reply-To:` is the P6 address, and Reply addresses it (not `info@`, not `no-reply@`) |
| C6 | UTF-8 | subject line and body | subject reads `[UMA] New application-start from Zoë Тест UMA-MAILTEST-…`; the body shows `Name: Zoë Тест …` with no `Ã«`, `Ð¢` or `?` characters; `Content-Type: text/plain; charset=utf-8` in the headers |
| C7 | Message ID | header | copy the full `Message-ID:` value |
| C8 | Record written | SSH `ls -l ~/<parent of docroot>/uma-private/enquiries/` or File Manager | exactly one new `YYYYMMDD-HHMMSS-<id>.json` whose `<id>` equals the `Record:` line in the e-mail body |
| C9 | Record contents | open the file (SSH `cat`, or File Manager → View) | `"stage": "enquiry"`, the name with `ë` and Cyrillic readable (not `\u` escapes), the marker in `message`, `"consent": true`, `ip_hash` a 64-character hex string. **`ip_hash: null` means config.php was not read** (wrong directory or unreadable): fail. |
| C10 | Permissions | SSH `ls -l` / `ls -ld`, or File Manager → Permissions | record file `-rw-------` (0600); `enquiries/` and `uma-private/` `drwx------` (0700) |
| C11 | Not reachable over HTTP | from any computer: `curl -sI https://ukrainemedicaladmissions.com/uma-private/enquiries/<file>.json` and `curl -sI https://ukrainemedicaladmissions.com/uma-private/` (or open them in a browser) | both answer **404 or 403**, never 200. `npm run verify:live` checks `/uma-private/`, `/uma-private/config.php` and `/uma-private/enquiries/` the same way. |
| C12 | No bounce | `info@` inbox and spam, 30 minutes after step 4 | no "Undelivered Mail" or "Delivery Status Notification" message about this test. If one arrives, record only its status code (e.g. `5.7.1`), the remote server's one-line reason, and the original's `From` and `Subject`; redact any outside address |

**If C3 finds no `Authentication-Results` line**, the receiving server did not evaluate SPF, DKIM or DMARC (this can happen when the web server and the mailbox belong to the same provider; UNVERIFIED for this host). Then C3 is **not proven** by this message, and delivery to applicants' and partners' outside mailboxes is still unknown. Run one more attempt with a new marker after changing only `notify_to` in `config.php` to an outside mailbox the owner controls (for example the P6 mailbox); judge C1 to C7 there ("Show original" in Gmail lists SPF, DKIM and DMARC); then set `notify_to` back to `info@ukrainemedicaladmissions.com`, run `php -l uma-private/config.php`, and record both attempts.

**Evidence chain for one submission** (compare these; they must all name the same submission): the time you sent the form (step 4) → the thank-you page → the record file `uma-private/enquiries/YYYYMMDD-HHMMSS-<id>.json` (UTC time within a minute of step 4) → the notification's last line `Record: <id>` (same id) → its folder (inbox or spam) and its `Authentication-Results`, `Return-Path` and `DKIM-Signature d=` lines → no bounce (C12). A second notification with a **different** id is a second submission; the **same** id twice means the mail system delivered one message twice.

The test **passes** only when C1 to C12 all pass. Anything else is a failure: record it as such (§7). Do not write "delivery works" anywhere until a passing run is recorded.

## 6. On failure

No new paid service, plugin, library, SMTP relay or other dependency without the owner's approval. A DNS change, a release or a hosting setting change each needs its own approval. Suggested fixes below are hypotheses until a re-test passes.

| Symptom | Likely cause (UNVERIFIED until checked) | What to do |
|---|---|---|
| "Please check the form" page (422) | a required field missing | fill field of study, name, a valid e-mail and the tick; new attempt |
| "Sorry, we could not record your details" (500) | the handler cannot create or write `uma-private/enquiries/` | check that `uma-private/` is beside the document root and owned by the hosting user; read the PHP error log (hPanel, UNVERIFIED location) for "UMA enquiry: cannot write". No e-mail is sent in this case. |
| Thank-you page but no record and no e-mail | dropped as a bot: sent within 3 seconds, or a browser extension filled the hidden `website` field; with the 29 October handler also a page whose form lacks the hidden `website` or `ts` field (a template regression; the PHP error log then has the line "UMA enquiry: dropped a post without the form's hidden fields") | new attempt, slower, with extensions off; if the log line appears, check the form's hidden fields |
| Record but `ip_hash` is `null` | `config.php` not read: wrong directory, wrong file name, or unreadable | compare the record's location with `config.php`'s; `php -l`; permissions; new attempt |
| Record but no e-mail anywhere after 15 minutes | `send_mail` false; `mail()` disabled or blocked; the host rejects a `From` address that is not a mailbox on the account | **First open the record:** `"notification": "failed"` means the host's `mail()` refused the message (fix on the host or in `config.php`); no such flag means `mail()` accepted it and the problem is downstream (bounce, spam folder, DNS). Then: check `config.php`; check the host's mail log if hPanel offers one; read the PHP error log. Owner decisions (each free on the existing plan as far as known, UNVERIFIED): (a) set `from` to an existing mailbox such as `info@` in `config.php` (no release needed); (b) create `no-reply@` as a mailbox or forwarder in hPanel → Emails; (c) set `envelope_from` in `config.php` to an existing mailbox on the domain. The handler passes it to `mail()` as the envelope sender; the code is on the working branch since 29 October, so it needs one release, and after that it is a configuration change; (d) authenticated SMTP from a domain mailbox (a code change, and possibly a library: approval needed). |
| Arrives in spam | authentication failing or not aligned, or a new sending reputation | read C3. Do not mark passed. |
| `spf=fail`, `softfail`, `none` or `permerror` | no SPF record, two SPF records, or the record does not cover the server that sends PHP mail | record it; any SPF change is a DNS change for the owner to approve |
| `dkim=none` or `dkim=fail` | PHP `mail()` on this host is not signed for the domain, or DKIM is not enabled | record it; enabling DKIM in hPanel adds a DNS record (approval); option (d) above signs through the mailbox service |
| `dmarc=fail` while SPF passes | SPF passed for the host's own domain (see `Return-Path`), so it does not align with `From`; and no aligned DKIM | option (c) (`envelope_from`, once released) or (d) above, or DKIM for the domain (DNS); record it |
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

## 8. Investigation, 27 October 2026: spam placement, repeated notifications and a bounce

**Owner's observation (27 October):** in `info@`, one notification "[UMA] New enquiry from …" from `no-reply@ukrainemedicaladmissions.com` in the inbox; four UMA notifications in Spam, several repeated for the same sender name; one "Mail Delivery System — Undelivered Mail Returned to Sender" in the inbox. No enquiry content was shared, and none is recorded here.

### 8.1 Confirmed from the code (REPO)

| Item | Fact |
|---|---|
| How it sends | One PHP `mail()` call per stored submission, after the record file is written. No retry, no queue, no second recipient, no autoreply to the applicant |
| Recipient | `notify_to`, default `info@ukrainemedicaladmissions.com` (overridable only in the server's private `config.php`) |
| Sender | `From:` = `from`, default `no-reply@ukrainemedicaladmissions.com` (matches what the owner sees). **In production no envelope sender is passed to `mail()`**, so the `Return-Path` (where bounces go, and the domain SPF checks) is chosen by Hostinger's mail system. The working branch adds the optional `envelope_from` setting (off by default; §8.3) |
| Reply-To | the e-mail address typed in the form, unverified. Replying to a notification writes to that address |
| Subject | `[UMA] New <type> from <name as typed>`. "enquiry" means the contact form or a post with no `type` field (the handler defaults to "enquiry") |
| Duplicate protection | Browser: the submit button is disabled after a valid submit, and the 303 redirect stops a refresh from re-posting. **Server: none.** Each POST that passes validation creates its own record (new ID) and its own email |
| Bot protection | Honeypot field `website`. **In production** the 3-second timing check applies only when the `ts` field is present, so a script posting directly to `/api/enquiry.php` without `ts` skips it. The working branch (29 October) drops posts without the hidden fields, but a script that sends the empty fields still skips the timing check (§8.3). Rate limits: 100 stored submissions per hour site-wide; 5 per hour per visitor **only if** `ip_hash_key` is set in `config.php` |
| Traceability | The last line of every notification is `Record: <id>`, and the record's file name ends in the same id: `YYYYMMDD-HHMMSS-<id>.json` |

### 8.2 Hypotheses (each needs the evidence named)

| # | Hypothesis | Evidence that decides it |
|---|---|---|
| H1 | The repeated notifications are separate submissions (a bot or a person re-sending), not duplicated emails | The `Record:` ids on the repeated notifications: **different ids = separate submissions**; the same id twice = the mail system duplicated one email (unlikely: the code sends once) |
| H2 | The repeated sender is automated form spam that skips the timing check | Several records minutes apart; content unrelated to studying medicine or containing links; an implausible or throwaway email address. Judge this yourself without sharing the content |
| H3 | Spam placement is driven by content (spam-like submissions) rather than authentication | `Authentication-Results` is the same on the inbox notification and on a Spam one. If both pass, the filter is judging content; if both fail, placement is luck and authentication must be fixed |
| H4 | Notifications fail DMARC alignment: the `Return-Path` is a Hostinger domain and there is no DKIM signature for ukrainemedicaladmissions.com | `Authentication-Results`: `spf=pass` for a non-UMA domain or `spf=none`/`softfail`, `dkim=none`, `dmarc=fail` |
| H5 | The bounce is a reply sent from `info@` to an address typed in the form that does not exist | The bounce's original-message headers: `From: info@…`, `Subject: Re: …`, status `5.1.1` (user unknown) or a domain-not-found error |
| H6 | The bounce is a UMA notification rejected by a receiving server | Original `From: no-reply@…`, `Subject: [UMA] New …`, status `5.7.x` (policy or authentication), or `5.2.2` (mailbox full) |
| H7 | The bounce is backscatter: someone else sent mail forging an `@ukrainemedicaladmissions.com` address | The original was never sent by you or the site (unknown `Message-ID`, foreign `Received:` servers) |
| H8 | Notifications are scored as spam because `Reply-To` (often the applicant's free-mail address) differs from `From: no-reply@…` (a rule such as SpamAssassin's FREEMAIL_FORGED_REPLYTO) | The spam-score header of a Spam notification names that rule (C3). Owner choice if confirmed: an allow-rule for `no-reply@ukrainemedicaladmissions.com` in the `info@` mailbox (a mailbox setting, no release), or dropping `Reply-To` (a code change: the address is already in the body as "Email: …") |

### 8.3 Fixes: application, hosting and DNS (status 29 October)

**Application (code on the working branch, tested, not released; each ships only in a release you approve):**
- **Built, needs a release:** posts that leave out the hidden `website` or `ts` field, or send a `ts` that is not a number, are dropped like the honeypot (thank-you redirect, nothing stored or sent; one fixed line without applicant data in the PHP error log, so a broken form shows up). Both real forms always send both fields, empty without a script, so people browsing with scripts off are not affected. Tests in `tests/enquiry-php.mjs` include a mutation proof (the old handler fails 6 of them), and `tests/journey.mjs` submits both real forms, the contact form also without JavaScript. **What it does not do:** stop a script that copies the form and sends the empty fields (an empty `ts` must be accepted for people without JavaScript). Such posts are limited only by the per-visitor rate limit below, so whether hypothesis H2 is addressed depends on `ip_hash_key`. The earlier commit message (`f8433d4`) said this change "closes the gap"; that overstated it.
- **Built, needs a release (review findings, 29 October):** a honeypot filled with "0" is now caught (PHP's `empty()` had treated "0" as empty); the timing value now counts from the start of the page load, not from when the page script ran, so a slow script load is not held against the person.
- **Built, needs a release (whole-site audit, 29 October):** the per-visitor limit now holds one lock across read, check and write (30 parallel posts from one visitor: 5 stored, was 31); the site-wide cap counts the last 60 minutes instead of two clock hours; an IPv6 visitor is counted per /64; the handler no longer sends `X-Powered-By`. Tests in `tests/enquiry-php.mjs`, each failing on the old handler.
- **Owner decision (audit SEC-3):** once the site-wide cap (100 in 60 minutes) is reached, everyone gets the "too many submissions" page until the hour passes, so a spam wave can block real applicants. Options: keep it; raise it; or above the cap keep storing but stop the per-record e-mails. Setting `ip_hash_key` (per-visitor limit) makes reaching the cap much harder.
- **Built, off until configured:** `envelope_from` in `config.php` sets the envelope sender (Return-Path) passed to `mail()`. Only a plain address is accepted; anything else is ignored and never reaches the sendmail command line. Turning it on is a server-configuration change that needs your approval, and should follow the header evidence (C3), not precede it.
- **Not built (needs your decision):** notifying only once when the same person sends the same form again within minutes. The privacy notice says each submission is also emailed to the business mailbox, so this changes what the notice describes. Today each repeat is stored with its own id and notified (tested).

**Configuration (server, your approval):** set `ip_hash_key` so the per-visitor limit applies. Whether it is set can be established without revealing it: a recent record whose `ip_hash` is a 64-character code, or a `uma-private/ratelimit/` folder, means it is on; `"ip_hash": null` means it is off.

**Hosting and DNS (your approval; decided by the header evidence, never by guesswork):** SPF covering the server that sends PHP mail; DKIM for the domain; DMARC starting at `p=none` with reports; `no-reply@` as a mailbox or forwarder so bounces are not lost.

### 8.4 Access check, 27 October 2026 (what Claude could and could not inspect)

| Item | Access | Result |
|---|---|---|
| Repository: handler, forms, tests, documents | yes | Read; findings in 8.1 and 8.3 |
| Public DNS (SPF, DKIM, DMARC, MX) | **no** | No `dig`/`nslookup`/`host` in the container; DNS-over-HTTPS (Google, Cloudflare) refused by the network policy; the web-fetch tool cannot resolve DNS hosts; a direct UDP query was refused by the permission system and not retried |
| Mailbox `info@` (headers, Spam, bounce) | **no** | No mail connector installed |
| hPanel (Emails, DNS, mail logs, File Manager, `uma-private/config.php`) | **no** | Hostinger and the live domain refused by the network policy; no connector |

Nothing was changed. The evidence still needed, and the owner's minimum action for each, is in the report of 27 October and in the reply template in §8.2.

### 8.5 Owner's observations, 28 October 2026 (observations, not causes)

Sender names are personal data and are not recorded here; senders are labelled A, B and C.

| # | Observation (owner, live `info@` mailbox) | What it shows | What it does **not** show |
|---|---|---|---|
| O1 | 1 notification `[UMA] New enquiry from <sender C>` in the Inbox | The live handler stored a record and `mail()` delivered a message to `info@` | Whether it passed SPF, DKIM or DMARC |
| O2 | 4 notifications `[UMA] New enquiry from …` in Spam: 3 from sender A, 1 from sender B | Delivery works; the receiving filter scored these 4 as spam | Why: content, authentication or both. Whether A's 3 are separate submissions (needs the `Record:` ids, check 1) |
| O3 | All 5 notifications are `From: no-reply@ukrainemedicaladmissions.com` | The live `from` setting is the handler's default (or `config.php` sets the same value) | Whether `no-reply@` exists as a mailbox or forwarder |
| O4 | 1 "Mail Delivery System — Undelivered Mail Returned to Sender" in the Inbox | Some message failed to reach a recipient, and the failure report came to `info@` | Which message failed, or why (needs check 2) |
| O5 | All 5 subjects say "enquiry", none "application-start" | These came from the contact form, or from posts that named no form type (the handler's default) | Which of the two |

**Status:** spam placement, the repeats and the bounce remain **unexplained**. Checks run one at a time: 1 `Record:` ids, 2 bounce status, 3 authentication headers. Then a proposed fix, for approval.

