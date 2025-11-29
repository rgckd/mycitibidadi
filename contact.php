<?php
/**
 * Contact Form Handler with Security Enhancements
 * CSRF protection, rate limiting, improved validation
 */

require_once 'includes/security.php';

// Set security headers
setSecurityHeaders();

// Define constants
define("RECIPIENT_NAME", "MyCiti Owners Association");
define("RECIPIENT_EMAIL", "mycitiownersassociation@gmail.com");

// Validate CSRF token
if (!isset($_POST['csrf_token']) || !validateCSRFToken($_POST['csrf_token'])) {
    header('Location: index.html?message=Failed&error=invalid_request');
    exit;
}

// Rate limiting - max 3 submissions per 5 minutes per IP
$clientIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (isRateLimited($clientIP, 3, 300)) {
    header('Location: index.html?message=Failed&error=too_many_attempts');
    exit;
}

// Read and validate form values
$userName = isset($_POST['name']) ? sanitizeText($_POST['name'], 100) : "";
$senderEmail = isset($_POST['email']) ? trim($_POST['email']) : "";
$senderPhone = isset($_POST['phone']) ? sanitizePhone($_POST['phone']) : "";
$isOwner = isset($_POST['is_owner']) ? sanitizeText($_POST['is_owner'], 10) : "";
$plotNumbers = isset($_POST['plot_numbers']) ? sanitizeText($_POST['plot_numbers'], 200) : "";
$phases = isset($_POST['phases']) ? sanitizeText($_POST['phases'], 200) : "";
$userSubject = isset($_POST['subject']) ? sanitizeText($_POST['subject'], 200) : "";
$message = isset($_POST['message']) ? sanitizeMessage($_POST['message'], 5000) : "";

// Validate email format and prevent header injection
if (!validateEmail($senderEmail)) {
    header('Location: index.html?message=Failed&error=invalid_email');
    exit;
}

// Validate required fields
if (empty($userName) || empty($senderEmail) || empty($senderPhone) || empty($isOwner) || empty($userSubject) || empty($message)) {
    header('Location: index.html?message=Failed&error=missing_fields');
    exit;
}

// Send the email
$recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
// Use safe headers with validated email
$headers = "From: contact@mycitibidadi.com\r\n";
$headers .= "Reply-To: " . filter_var($senderEmail, FILTER_SANITIZE_EMAIL) . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();
$subject = "New Contact Form: " . $userSubject;
  
  // Build message body with owner information
  $msgBody = "Name: ". $userName . "\nEmail: ". $senderEmail . "\nPhone: ". $senderPhone . "\n";
  $msgBody .= "Site Owner at MyCiti Layout: " . $isOwner . "\n";
  
  if ($isOwner === "Yes" && ($plotNumbers || $phases)) {
    if ($plotNumbers) {
      $msgBody .= "Plot Number(s): " . $plotNumbers . "\n";
    }
    if ($phases) {
      $msgBody .= "Phase(s): " . $phases . "\n";
    }
  }
  
  $msgBody .= "Subject: ". $userSubject . "\n\nMessage:\n" . $message;

// Add submission metadata for security tracking
$msgBody .= "\n\n---\nSubmission Details:\n";
$msgBody .= "IP: " . $clientIP . "\n";
$msgBody .= "User Agent: " . htmlspecialchars($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown', ENT_QUOTES, 'UTF-8') . "\n";
$msgBody .= "Date: " . date('Y-m-d H:i:s') . "\n";

$success = mail($recipient, $subject, $msgBody, $headers);

// Set Location After Submission
if ($success) {
    header('Location: index.html?message=Successfull');
} else {
    // Log error for debugging (without exposing details to user)
    error_log("Contact form: Mail send failed for " . $senderEmail);
    header('Location: index.html?message=Failed&error=smtp');
}

exit;
?>