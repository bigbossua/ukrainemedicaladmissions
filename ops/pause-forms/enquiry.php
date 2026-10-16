<?php
/**
 * PAUSE HANDLER: a temporary stand-in for public_html/api/enquiry.php on the LIVE site, for the owner to use only
 * if they decide to stop collecting form data until the release (OWNER_ACTION_SHEET.md §6). Not part of the build:
 * this file lives outside site/ and is never deployed by the publish workflow.
 *
 * It stores nothing, sends no e-mail and reads no submitted field: every request gets a short page that asks the
 * person to write to the business address instead. Restore the original file (kept as enquiry.php.original beside
 * it, or from the backup) to undo.
 */
declare(strict_types=1);
ini_set('display_errors', '0');
header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');
header('Retry-After: 86400');
http_response_code(503);
header('Content-Type: text/html; charset=utf-8');
echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
    . '<meta name="robots" content="noindex, nofollow"><title>Online forms paused</title></head><body><main>'
    . '<h1>Our online forms are paused</h1>'
    . '<p>We are updating our privacy notice and have paused the online forms until it is complete. Nothing you entered has been stored or sent.</p>'
    . '<p>To ask a question in the meantime, email <a href="mailto:info@ukrainemedicaladmissions.com">info@ukrainemedicaladmissions.com</a>. Please do not send documents.</p>'
    . '<p><a href="/">Back to the home page</a></p>'
    . '</main></body></html>';
