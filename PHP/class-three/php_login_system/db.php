<?php

// connection to the database

$host = "localhost";       // localhost means the database is on the same server as the PHP code
$dbname = "login_system";  // database we created in phpMyAdmin
$username = "root";        // MySQL username (default "root" in XAMPP)
$password = "";            // MySQL password ( default "" empty in XAMPP)

// Try to connect using PDO(PHP Data Object)
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

    // Throw an exception if there is an error to catch it in the catch block
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    // If connection fails, stop everything and show the error
    die("Connection failed: " . $e->getMessage());
}
?>
