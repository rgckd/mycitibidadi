<?php
/**
 * CSRF Token Generator Endpoint
 * Returns JSON with CSRF token for AJAX requests
 */

require_once 'includes/security.php';

header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');

echo json_encode([
    'token' => generateCSRFToken()
]);
?>
