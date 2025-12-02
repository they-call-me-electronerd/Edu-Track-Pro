<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: text/html; charset=utf-8');

echo "<h1>Password Reset Script</h1>";
echo "<style>body{font-family:monospace;padding:20px;background:#1a1a1a;color:#0f0;} h1,h2{color:#0ff;} .success{color:#0f0;} .error{color:#f00;} .info{color:#ff0;}</style>";

// Database configuration
$host = 'localhost';
$dbname = 'edutrack';
$username = 'root';
$password = '';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("<p class='error'>Connection failed: " . $conn->connect_error . "</p>");
}

echo "<p class='success'>✓ Connected to database</p>";

// Generate password hashes
$studentPassword = 'student123';
$adminPassword = 'admin123';

$studentHash = password_hash($studentPassword, PASSWORD_BCRYPT);
$adminHash = password_hash($adminPassword, PASSWORD_BCRYPT);

echo "<h2>Generated Hashes:</h2>";
echo "<p class='info'>Student password hash: " . substr($studentHash, 0, 30) . "...</p>";
echo "<p class='info'>Admin password hash: " . substr($adminHash, 0, 30) . "...</p>";

// Update all student passwords
echo "<h2>Updating Student Passwords...</h2>";
$updateStudents = "UPDATE students SET password = '$studentHash'";
if ($conn->query($updateStudents)) {
    echo "<p class='success'>✓ Updated all student passwords to 'student123'</p>";
} else {
    echo "<p class='error'>✗ Error updating student passwords: " . $conn->error . "</p>";
}

// Update admin password
echo "<h2>Updating Admin Password...</h2>";
$updateAdmin = "UPDATE users SET password = '$adminHash' WHERE username = 'admin'";
if ($conn->query($updateAdmin)) {
    echo "<p class='success'>✓ Updated admin password to 'admin123'</p>";
} else {
    echo "<p class='error'>✗ Error updating admin password: " . $conn->error . "</p>";
}

// Verify updates
echo "<h2>Verification:</h2>";

// Check a sample student
$testRoll = '87638915';
$sql = "SELECT Roll, Name, password FROM students WHERE Roll = '$testRoll'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $student = $result->fetch_assoc();
    if (password_verify($studentPassword, $student['password'])) {
        echo "<p class='success'>✓ Student login verified: Roll {$student['Roll']} / Password: student123</p>";
    } else {
        echo "<p class='error'>✗ Student password verification failed</p>";
    }
}

// Check admin
$sql = "SELECT username, password FROM users WHERE username = 'admin'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $admin = $result->fetch_assoc();
    if (password_verify($adminPassword, $admin['password'])) {
        echo "<p class='success'>✓ Admin login verified: Username admin / Password: admin123</p>";
    } else {
        echo "<p class='error'>✗ Admin password verification failed</p>";
    }
}

$conn->close();

echo "<br><hr>";
echo "<h2 class='success'>Password Reset Complete!</h2>";
echo "<p class='info'>You can now login with:</p>";
echo "<p>Student: Roll Number (e.g., 87638915) / Password: student123</p>";
echo "<p>Admin: Username (admin) / Password: admin123</p>";
echo "<br><p><a href='../login.html' style='color:#0ff; font-size:18px;'>→ Go to Login Page</a></p>";
?>
