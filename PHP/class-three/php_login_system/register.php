<?php
// Start the session so we can use session variables
session_start();

// If the user is already logged in, send them to the welcome page
if (isset($_SESSION['user_id'])) {
    header("Location: welcome.php");
    exit();
}

// Include the database connection
require 'db.php';

$error = "";
$success = "";

// This runs only when the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get what the user typed in and remove extra spaces from before and after the text
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $confirm  = trim($_POST['confirm_password']);

    // Check if any field is empty
    if (empty($username) || empty($password) || empty($confirm)) {
        $error = "Please fill in all the fields.";

    // Username should only have letters, numbers, or underscores
    } elseif (!preg_match('/^[a-zA-Z0-9_]+$/', $username)) {
        $error = "Username can only have letters, numbers, and underscores.";

    // Username should not be too short or too long
    } elseif (strlen($username) < 3 || strlen($username) > 20) {
        $error = "Username must be between 3 and 20 characters.";

    // Password should be at least 6 characters
    } elseif (strlen($password) < 6) {
        $error = "Password must be at least 6 characters long.";

    // Both password fields must match
    } elseif ($password !== $confirm) {
        $error = "Passwords do not match.";

    } else {
        // Check if this username is already taken in the database
        // Create a SELECT query to find users with the same username
        $query = $pdo->prepare("SELECT id FROM users WHERE username = ?");
        // Run the query with the provided username
        $query->execute([$username]);

        // If we found any rows(>0), it means the username is already taken
        if ($query->rowCount() > 0) {
            $error = "That username is already taken. Please choose another one.";
        } else {
            // Hash the password so we don't store it as plain text
            $hashed_password = password_hash($password, PASSWORD_DEFAULT); //PASSWORD_DEFAULT means it will use the best available hashing algorithm (currently bcrypt)

            // Save the new user into the database
            // Create an INSERT query to add the new user with the provided username and hashed password
            $insert_user = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
            // Run the query with the provided username and the hashed password
            $insert_user->execute([$username, $hashed_password]);

            $success = "Account created! You can now log in.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="card">
    <div class="card-header">
        <h1>Create Account</h1>
        <p>Sign up</p>
    </div>

    <!-- Show error message if something went wrong -->
    <?php if ($error): ?>
        <!-- htmlspecialchars converts special characters into plain text to prevent HTML/JS execution -->
        <div class="alert alert-error"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <!-- Show success message if registration worked -->
    <?php if ($success): ?>
        <div class="alert alert-success"><?php echo htmlspecialchars($success); ?></div>
    <?php endif; ?>

    <form method="POST" action="register.php">

        <div class="form-group">
            <label for="username">Username</label>
            <!-- // This keeps the username in the input field if there was an error, so the user doesn't have to type it again -->
            <input type="text" id="username" name="username" placeholder="Pick a username"
                   value="<?php echo isset($_POST['username']) ? htmlspecialchars($_POST['username']) : ''; ?>">
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="At least 6 characters">
        </div>

        <div class="form-group">
            <label for="confirm_password">Confirm Password</label>
            <input type="password" id="confirm_password" name="confirm_password" placeholder="Repeat your password">
        </div>

        <button type="submit" class="btn">Register</button>
    </form>

    <div class="card-footer">
        Already have an account? <a href="login.php">Log in</a>
    </div>
</div>

</body>
</html>
