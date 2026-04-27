<?php
// Start the session so we can destroy it
session_start();

// Remove all the data saved in the session
session_unset();

// Completely destroy the session
session_destroy();

// Send the user back to the login page
header("Location: login.php");
exit();
?>
