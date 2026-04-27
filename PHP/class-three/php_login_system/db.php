<?php

// connection to the database

$host = "sql113.infinityfree.com"; 
$dbname = "if0_41677223_login_system"; 
$username = "if0_41677223";        // (default "root" in XAMPP)
$password = "BfiHkAC9GcC";            // (default "" empty in XAMPP)

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
