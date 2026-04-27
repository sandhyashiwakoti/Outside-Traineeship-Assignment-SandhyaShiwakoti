<?php
// Start the session to check if user is logged in
session_start();

// If the user is not logged in, send them back to login page
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// Get the username from the session to display it
$username = $_SESSION['username'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="welcome-page">

<div class="card welcome-card">
    <div class="card-header">
        <div class="icon-circle">✓</div>
        <h1>Welcome, <?php echo htmlspecialchars($username); ?>!</h1>
        <p>You are logged in successfully.</p>
    </div>

    <div class="welcome-message">Your account is active and ready to use.</div>

    <a href="logout.php" class="btn btn-logout">Log Out</a>
</div>

</body>
</html>
