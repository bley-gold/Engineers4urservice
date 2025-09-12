<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$name    = isset($_POST['name']) ? trim($_POST['name']) : '';
$email   = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Load PHPMailer via Composer
require_once __DIR__ . '/vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    // Test basic connectivity first
    error_log('Attempting to connect to SMTP server...');
    
    // SMTP settings
    $mail->isSMTP();
    $mail->Host       = 'da11.domains.co.za';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'support@engineers4urservice.co.za';
    $mail->Password   = 'Engineers@95';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // If fails, try ENCRYPTION_SMTPS with port 465
    $mail->Port       = 587;

    // Enable detailed SMTP debugging
    $mail->SMTPDebug  = SMTP::DEBUG_OFF; 
    $mail->Debugoutput = 'error_log';

    // Email headers
    $mail->setFrom('support@engineers4urservice.co.za', 'ENGINEERS4URSERVICE Contact Form');
    $mail->addAddress('support@engineers4urservice.co.za');
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'New Contact Form Submission from ' . $name;

    $mail->Body = "
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 4px solid #dc2626; }
        .footer { background-color: #1f2937; color: white; padding: 15px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class='container'>
        <div class='header'>
          <h2>New Contact Form Submission</h2>
          <p>ENGINEERS4URSERVICE Website</p>
        </div>
        <div class='content'>
          <div class='field'>
            <div class='label'>Name:</div>
            <div class='value'>{$name}</div>
          </div>
          <div class='field'>
            <div class='label'>Email:</div>
            <div class='value'><a href='mailto:{$email}'>{$email}</a></div>
          </div>
          <div class='field'>
            <div class='label'>Message:</div>
            <div class='value'>" . nl2br($message) . "</div>
          </div>
          <div class='field'>
            <div class='label'>Submitted:</div>
            <div class='value'>" . date('Y-m-d H:i:s T') . "</div>
          </div>
        </div>
        <div class='footer'>
          <p>This email was sent from the ENGINEERS4URSERVICE contact form.</p>
          <p>Reply directly to this email to respond to the inquiry.</p>
          <p>Phone: 064 617 1074 | Email: info@engineers4urservice.co.za</p>
        </div>
      </div>
    </body>
    </html>
    ";

    $mail->AltBody = "
    New Contact Form Submission - ENGINEERS4URSERVICE

    Name: {$name}
    Email: {$email}
    Message: {$message}
    Submitted: " . date('Y-m-d H:i:s T') . "
    ";

    $mail->send();
    
    // Log successful send for debugging
    error_log('Email sent successfully to: support@engineers4urservice.co.za');
    error_log('From: ' . $email . ' (' . $name . ')');
    error_log('Subject: New Contact Form Submission from ' . $name);

    echo json_encode(['success' => true, 'message' => 'Thank you for your message! We will get back to you within 24 hours.']);
} catch (Exception $e) {
    // Log the full error for debugging
    error_log('PHPMailer Error: ' . $e->getMessage());
    error_log('Mail ErrorInfo: ' . $mail->ErrorInfo);
    
    // Return detailed error message for debugging
    echo json_encode([
        'success' => false, 
        'message' => 'Email sending failed: ' . $e->getMessage(),
        'debug' => $mail->ErrorInfo
    ]);
}
?>
