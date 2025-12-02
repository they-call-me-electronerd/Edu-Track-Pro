<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: text/html; charset=utf-8');

echo "<h1>Login Debug Information</h1>";
echo "<style>body{font-family:monospace;padding:20px;background:#1a1a1a;color:#0f0;} h1,h2{color:#0ff;} .success{color:#0f0;} .error{color:#f00;} .info{color:#ff0;}</style>";

// Database configuration
$host = 'localhost';
$dbname = 'edutrack';
$username = 'root';
$password = '';

echo "<h2>1. Database Connection</h2>";

// Create connection
$conn = new mysqli($host, $username, $password);

if ($conn->connect_error) {
    echo "<p class='error'>✗ MySQL Connection failed: " . $conn->connect_error . "</p>";
    die();
}
echo "<p class='success'>✓ Connected to MySQL server</p>";

// Check if database exists
$result = $conn->query("SHOW DATABASES LIKE '$dbname'");
if ($result->num_rows == 0) {
    echo "<p class='error'>✗ Database '$dbname' does not exist!</p>";
    echo "<p class='info'>→ You need to import the schema.sql file from /docs/ folder</p>";
    die();
}
echo "<p class='success'>✓ Database '$dbname' exists</p>";

// Select database
$conn->select_db($dbname);

echo "<h2>2. Tables Check</h2>";
$tables = ['students', 'users', 'attendance'];
foreach ($tables as $table) {
    $result = $conn->query("SHOW TABLES LIKE '$table'");
    if ($result->num_rows == 0) {
        echo "<p class='error'>✗ Table '$table' missing</p>";
    } else {
        echo "<p class='success'>✓ Table '$table' exists</p>";
    }
}

echo "<h2>3. Student Records</h2>";
$studentQuery = "SELECT ID, Roll, Name, Class FROM students LIMIT 5";
$studentResult = $conn->query($studentQuery);

if ($studentResult && $studentResult->num_rows > 0) {
    echo "<p class='success'>✓ Found " . $studentResult->num_rows . " student records:</p>";
    echo "<table border='1' cellpadding='5' style='border-color:#0f0;'>";
    echo "<tr><th>Roll</th><th>Name</th><th>Class</th></tr>";
    while ($row = $studentResult->fetch_assoc()) {
        echo "<tr><td>{$row['Roll']}</td><td>{$row['Name']}</td><td>{$row['Class']}</td></tr>";
    }
    echo "</table>";
} else {
    echo "<p class='error'>✗ No student records found</p>";
}

echo "<h2>4. Test Student Login</h2>";
$testRoll = '87638915';
$testPassword = 'student123';

$sql = "SELECT ID, Roll, Name, password FROM students WHERE Roll = '$testRoll'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $student = $result->fetch_assoc();
    echo "<p class='success'>✓ Found student: {$student['Name']} (Roll: {$student['Roll']})</p>";
    echo "<p class='info'>Stored Hash: " . substr($student['password'], 0, 20) . "...</p>";
    
    // Test password verification
    if (password_verify($testPassword, $student['password'])) {
        echo "<p class='success'>✓ Password verification WORKS! 'student123' is correct</p>";
    } else {
        echo "<p class='error'>✗ Password verification FAILED</p>";
        echo "<p class='info'>→ Testing if hash needs regeneration...</p>";
        
        // Generate new hash
        $newHash = password_hash($testPassword, PASSWORD_BCRYPT);
        echo "<p class='info'>New hash generated: " . substr($newHash, 0, 30) . "...</p>";
        echo "<p class='info'>→ You may need to update passwords in database</p>";
    }
} else {
    echo "<p class='error'>✗ Student with Roll $testRoll not found</p>";
}

echo "<h2>5. Admin Login Test</h2>";
$adminUser = 'admin';
$adminPass = 'admin123';

$sql = "SELECT ID, username, password FROM users WHERE username = '$adminUser'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $admin = $result->fetch_assoc();
    echo "<p class='success'>✓ Found admin user: {$admin['username']}</p>";
    
    if (password_verify($adminPass, $admin['password'])) {
        echo "<p class='success'>✓ Admin password verification WORKS!</p>";
    } else {
        echo "<p class='error'>✗ Admin password verification FAILED</p>";
    }
} else {
    echo "<p class='error'>✗ Admin user not found</p>";
}

echo "<h2>6. API Endpoint Test</h2>";
$apiUrl = "http://localhost/Edu-Track-Pro/API/login.php";
echo "<p class='info'>API URL: $apiUrl</p>";
echo "<p class='info'>→ Try accessing: <a href='$apiUrl' style='color:#0ff;'>$apiUrl</a></p>";

$conn->close();
echo "<br><hr><p class='success'><strong>Debug completed!</strong></p>";
?>
