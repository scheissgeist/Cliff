<?php
// Save Registration API
// Handles registration submissions

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$registrationsFile = '../registrations.json';

// Handle GET requests (fetch registrations)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($registrationsFile)) {
        $data = file_get_contents($registrationsFile);
        echo $data;
    } else {
        echo json_encode(['registrations' => []]);
    }
    exit();
}

// Handle POST requests (save registration)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $registrationData = json_decode($input, true);
    
    if (!$registrationData) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid registration data']);
        exit();
    }
    
    // Load existing registrations
    $registrations = ['registrations' => []];
    if (file_exists($registrationsFile)) {
        $data = file_get_contents($registrationsFile);
        $registrations = json_decode($data, true);
        if (!isset($registrations['registrations'])) {
            $registrations = ['registrations' => []];
        }
    }
    
    // Add new registration
    $registrations['registrations'][] = $registrationData;
    
    // Save to file
    if (file_put_contents($registrationsFile, json_encode($registrations, JSON_PRETTY_PRINT))) {
        http_response_code(200);
        echo json_encode(['success' => true, 'registration' => $registrationData]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save registration']);
    }
    exit();
}

// Handle DELETE requests (delete registration)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $registrationId = $_GET['id'] ?? '';
    
    if (!$registrationId) {
        http_response_code(400);
        echo json_encode(['error' => 'Registration ID required']);
        exit();
    }
    
    if (file_exists($registrationsFile)) {
        $data = file_get_contents($registrationsFile);
        $registrations = json_decode($data, true);
        
        // Filter out the registration to delete
        $registrations['registrations'] = array_filter(
            $registrations['registrations'],
            function($reg) use ($registrationId) {
                return $reg['id'] !== $registrationId;
            }
        );
        
        // Re-index array
        $registrations['registrations'] = array_values($registrations['registrations']);
        
        // Save back to file
        if (file_put_contents($registrationsFile, json_encode($registrations, JSON_PRETTY_PRINT))) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete registration']);
        }
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Registrations file not found']);
    }
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
?>

