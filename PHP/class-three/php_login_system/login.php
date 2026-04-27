<?php
// Start the session
session_start();

// If already logged in, go to welcome page
if (isset($_SESSION['user_id'])) {
    header("Location: welcome.php");
    exit();
}

require 'db.php';

$error = "";

// This runs when the login form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get the typed values and remove extra spaces
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Make sure both fields are filled in
    if (empty($username) || empty($password)) {
        $error = "Please enter your username and password.";
    } else {
        // Look for the user in the database by username
        $query = $pdo->prepare("SELECT * FROM users WHERE username = ?");
        $query->execute([$username]);
        // Fetch the first row in form of an associative array (column names as keys)
        $user = $query->fetch();
        // example of $user: ['id' => 1, 'username' => 'sandhya', 'password' => '$2y$10$...']

        // Check if user exists and the password matches the stored hash
        // password_verify checks if the provided plain password matches the hashed password in the database
        if ($user && password_verify($password, $user['password'])) {
            // Login is correct then, save user info in the session
            $_SESSION['user_id']  = $user['id'];
            $_SESSION['username'] = $user['username'];

            // Send the user to the welcome page
            header("Location: welcome.php");
            exit();
        } else {
            // Username or password was wrong
            $error = "Incorrect username or password.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="card">
    <div class="card-header">
        <h1>Welcome Back</h1>
        <p>Log in to your account</p>
    </div>

    <!-- Show error if login failed -->
    <?php if ($error): ?>
        <div class="alert alert-error"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <form method="POST" action="login.php">

        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Your username"
                   value="<?php echo isset($_POST['username']) ? htmlspecialchars($_POST['username']) : ''; ?>">
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Your password">
        </div>

        <button type="submit" class="btn">Log In</button>
    </form>

    <div class="card-footer">
        Don't have an account? <a href="register.php">Register here</a>
    </div>
</div>

</body>
</html>
