<?php
/**
 * Enquiry / application-start handler (Stage 1 of the application journey).
 *
 * - Validates and sanitises input; honeypot + minimum-time check against bots.
 * - Stores each record as JSON OUTSIDE the web root (never inside public_html).
 * - Emails a notification to the business address (no applicant documents).
 * - Redirects to /apply/thank-you/. Never claims a university submission.
 *
 * Configuration: copy private.example.php to <storage>/config.php (outside
 * the web root) to override defaults. No secrets live in this file.
 */
declare(strict_types=1);

header('X-Robots-Tag: noindex, nofollow');
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit('Method not allowed');
}

// ---- Storage location: a sibling of the document root, not inside it. ----
$docRoot = rtrim((string)($_SERVER['DOCUMENT_ROOT'] ?? __DIR__ . '/..'), '/');
$storage = getenv('UMA_PRIVATE_DIR') ?: dirname($docRoot) . '/uma-private';
$config  = ['notify_to' => 'info@ukrainemedicaladmissions.com', 'from' => 'no-reply@ukrainemedicaladmissions.com', 'send_mail' => true];
if (is_file($storage . '/config.php')) {
    $override = include $storage . '/config.php';
    if (is_array($override)) $config = array_merge($config, $override);
}

// ---- Bot checks --------------------------------------------------------
if (!empty($_POST['website'])) {            // honeypot filled
    header('Location: /apply/thank-you/', true, 303);
    exit;
}

// ---- Validation --------------------------------------------------------
$clean = static fn(string $k, int $max = 500): string => mb_substr(trim(strip_tags((string)($_POST[$k] ?? ''))), 0, $max);
$type    = in_array($_POST['type'] ?? '', ['enquiry', 'application-start'], true) ? $_POST['type'] : 'enquiry';
$name    = $clean('name', 120);
$email   = filter_var($clean('email', 200), FILTER_VALIDATE_EMAIL) ?: '';
$message = $clean('message', 4000);
$country = $clean('country', 100);
$course  = preg_match('/^[a-z-]{0,40}$/', (string)($_POST['course'] ?? '')) ? (string)$_POST['course'] : '';
$univ    = preg_match('/^[a-z0-9-]{0,80}$/', (string)($_POST['university'] ?? '')) ? (string)$_POST['university'] : '';
$consent = ($_POST['consent'] ?? '') === 'yes';

$errors = [];
if ($name === '')    $errors[] = 'name';
if ($email === '')   $errors[] = 'email';
if (!$consent)       $errors[] = 'consent';
if ($type === 'enquiry' && $message === '') $errors[] = 'message';
if ($type === 'application-start') {
    if ($course === '')  $errors[] = 'course';
    if ($country === '') $errors[] = 'country';
}
if ($errors) {
    http_response_code(422);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!doctype html><meta charset="utf-8"><title>Please check the form</title><p>Please go back and complete: ' . htmlspecialchars(implode(', ', $errors)) . '.</p><p><a href="javascript:history.back()">Back</a></p>';
    exit;
}

// ---- Persist (outside web root) ---------------------------------------
$record = [
    'id'        => bin2hex(random_bytes(8)),
    'type'      => $type,                       // enquiry | application-start  (stage 1 only)
    'stage'     => 'enquiry',                   // never 'submitted-to-university' from this handler
    'received'  => gmdate('c'),
    'name'      => $name,
    'email'     => $email,
    'country'   => $country,
    'course'    => $course,
    'university'=> $univ,
    'startYear' => $clean('startYear', 4),
    'qualification' => $clean('qualification', 200),
    'message'   => $message,
    'consent'   => true,
    'consentText' => 'Stored to respond to enquiry; not an application to a university.',
    'ip_hash'   => hash('sha256', (string)($_SERVER['REMOTE_ADDR'] ?? '') . date('Y-m')), // pseudonymised, rotates monthly
];
$dir = $storage . '/enquiries';
if (!is_dir($dir) && !mkdir($dir, 0700, true) && !is_dir($dir)) {
    error_log('UMA enquiry: cannot create storage dir');
    http_response_code(500);
    exit('Sorry, we could not record your enquiry. Please email info@ukrainemedicaladmissions.com.');
}
file_put_contents($dir . '/' . gmdate('Ymd-His') . '-' . $record['id'] . '.json', json_encode($record, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

// ---- Notify (no documents, no card data) ------------------------------
if (!empty($config['send_mail'])) {
    $subject = '[UMA] New ' . $type . ' from ' . $name;
    $body = "Type: $type\nName: $name\nEmail: $email\nCountry: $country\nCourse: $course\nUniversity: $univ\n\n$message\n\nRecord: {$record['id']}";
    $headers = 'From: ' . $config['from'] . "\r\nReply-To: $email\r\nContent-Type: text/plain; charset=utf-8";
    @mail($config['notify_to'], $subject, $body, $headers);
}

header('Location: /apply/thank-you/', true, 303);
exit;
