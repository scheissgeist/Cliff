<?php
// save-config.php
// Simple PHP backend for saving workshop configuration

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Simple password authentication
// CHANGE THIS PASSWORD!
$ADMIN_PASSWORD = 'cliff2025';

// Check authentication
$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

if ($authHeader !== 'Bearer ' . $ADMIN_PASSWORD) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

// Get the JSON data
$json = file_get_contents('php://input');
$config = json_decode($json, true);

// Validate the configuration structure
if (!isset($config['workshops']) || !isset($config['combos']) || !isset($config['settings'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid configuration structure']);
    exit();
}

// Save to file
$filename = 'workshop-config.json';
$result = file_put_contents($filename, json_encode($config, JSON_PRETTY_PRINT));

if ($result === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save configuration. Check file permissions.']);
    exit();
}

// Success
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Configuration saved successfully'
]);
?>

