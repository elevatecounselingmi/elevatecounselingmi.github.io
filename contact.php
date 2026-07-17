<?php
// Elevate Counseling & Wellness — contact form handler
// Requires PHP with mail() configured on the Apache server (or swap in SMTP via PHPMailer).
// Edit $to_email below before going live.

header('Content-Type: text/plain');

$to_email = "a@a.com";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

function clean($v) {
    return htmlspecialchars(trim($v ?? ''), ENT_QUOTES, 'UTF-8');
}

$name    = clean($_POST['name'] ?? '');
$email   = clean($_POST['email'] ?? '');
$phone   = clean($_POST['phone'] ?? '');
$service = clean($_POST['service'] ?? '');
$message = clean($_POST['message'] ?? '');

if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    exit('Please provide a valid name and email.');
}

$subject = "New inquiry from $name — Elevate Counseling & Wellness site";
$body = "Name: $name\nEmail: $email\nPhone: $phone\nInterested in: $service\n\nMessage:\n$message\n";
$headers = "From: no-reply@" . ($_SERVER['SERVER_NAME'] ?? 'localhost') . "\r\nReply-To: $email";

$sent = @mail($to_email, $subject, $body, $headers);

if ($sent) {
    http_response_code(200);
    echo 'ok';
} else {
    http_response_code(500);
    echo 'Mail could not be sent. Check server mail configuration.';
}
