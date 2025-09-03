<?php
// Email sending script for contact form
header('Content-Type: application/json');

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuration
$to_email = "info@engineers4urservice.co.za"; // Change this to your email
$from_email = "noreply@engineers4urservice.co.za"; // Change this to your domain email
$subject_prefix = "Contact Form - ENGINEERS4URSERVICE";

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

// Sanitize and validate input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Get form data
$first_name = sanitize_input($_POST['first_name'] ?? '');
$last_name = sanitize_input($_POST['last_name'] ?? '');
$email = sanitize_input($_POST['email'] ?? '');
$phone = sanitize_input($_POST['phone'] ?? '');
$company = sanitize_input($_POST['company'] ?? '');
$service = sanitize_input($_POST['service'] ?? '');
$message = sanitize_input($_POST['message'] ?? '');

// Validation
$errors = [];

if (empty($first_name)) {
    $errors[] = "First name is required";
}

if (empty($last_name)) {
    $errors[] = "Last name is required";
}

if (empty($email)) {
    $errors[] = "Email is required";
} elseif (!validate_email($email)) {
    $errors[] = "Invalid email format";
}

if (empty($message)) {
    $errors[] = "Message is required";
}

// If there are validation errors, return them
if (!empty($errors)) {
    echo json_encode(["success" => false, "message" => implode(", ", $errors)]);
    exit;
}

// Prepare email content
$full_name = $first_name . ' ' . $last_name;
$subject = $subject_prefix . " - " . $full_name;

// Email body
$email_body = "
New contact form submission from ENGINEERS4URSERVICE website

Name: $full_name
Email: $email
Phone: $phone
Company: $company
Service Interest: $service

Message:
$message

---
This email was sent from the contact form on your website.
Sent on: " . date('Y-m-d H:i:s') . "
IP Address: " . $_SERVER['REMOTE_ADDR'] . "
";

// Email headers
$headers = [
    'From: ' . $from_email,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Send email
$mail_sent = mail($to_email, $subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Log successful submission (optional)
    $log_entry = date('Y-m-d H:i:s') . " - Contact form submitted by: $full_name ($email)\n";
    file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
} else {
    // Log error (optional)
    $error_entry = date('Y-m-d H:i:s') . " - Failed to send email for: $full_name ($email)\n";
    file_put_contents('contact_errors.txt', $error_entry, FILE_APPEND | LOCK_EX);
    
    echo json_encode(["success" => false, "message" => "Failed to send email"]);
}
?>
