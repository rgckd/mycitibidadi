<?php
/**
 * Security Helper Functions
 * CSRF protection and rate limiting
 */

session_start();

/**
 * Generate CSRF token
 */
function generateCSRFToken() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Validate CSRF token
 */
function validateCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Rate limiting - prevents form spam
 * Returns true if rate limit exceeded
 */
function isRateLimited($identifier, $maxAttempts = 3, $timeWindow = 300) {
    $key = 'rate_limit_' . md5($identifier);
    
    if (!isset($_SESSION[$key])) {
        $_SESSION[$key] = ['count' => 1, 'first_attempt' => time()];
        return false;
    }
    
    $data = $_SESSION[$key];
    $timePassed = time() - $data['first_attempt'];
    
    // Reset if time window expired
    if ($timePassed > $timeWindow) {
        $_SESSION[$key] = ['count' => 1, 'first_attempt' => time()];
        return false;
    }
    
    // Check if limit exceeded
    if ($data['count'] >= $maxAttempts) {
        return true;
    }
    
    // Increment counter
    $_SESSION[$key]['count']++;
    return false;
}

/**
 * Validate email to prevent header injection
 */
function validateEmail($email) {
    // Basic format validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }
    
    // Check for header injection attempts
    $forbidden = ["\r", "\n", "%0a", "%0d", "Content-Type:", "bcc:", "cc:", "to:"];
    foreach ($forbidden as $string) {
        if (stripos($email, $string) !== false) {
            return false;
        }
    }
    
    return true;
}

/**
 * Sanitize phone number - only allow valid characters
 */
function sanitizePhone($phone) {
    // Only allow numbers, +, -, (, ), and spaces
    return preg_replace('/[^0-9+\-() ]/', '', $phone);
}

/**
 * Validate and sanitize text input
 */
function sanitizeText($input, $maxLength = 255) {
    $sanitized = htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
    return substr($sanitized, 0, $maxLength);
}

/**
 * Validate and sanitize message/textarea input
 */
function sanitizeMessage($input, $maxLength = 5000) {
    // Remove header injection attempts
    $forbidden = ['Content-Type:', 'MIME-Version:', 'Content-Transfer-Encoding:', 'bcc:', 'cc:'];
    $cleaned = str_ireplace($forbidden, '', $input);
    
    $sanitized = htmlspecialchars(trim($cleaned), ENT_QUOTES, 'UTF-8');
    return substr($sanitized, 0, $maxLength);
}

/**
 * Set security headers
 */
function setSecurityHeaders() {
    header("X-Content-Type-Options: nosniff");
    header("X-Frame-Options: SAMEORIGIN");
    header("X-XSS-Protection: 1; mode=block");
    header("Referrer-Policy: strict-origin-when-cross-origin");
}
?>
