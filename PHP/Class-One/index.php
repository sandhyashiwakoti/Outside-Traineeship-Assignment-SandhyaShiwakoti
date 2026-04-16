<?php
// Start session to store errors
session_start();

// saves error in session
if (isset($_SESSION["errors"])) {
    $errors = $_SESSION["errors"];
} 
// no errors then empty array
else {
    $errors = [];
} 

// saves old values in session
if (isset($_SESSION["old"])) {
    $old = $_SESSION["old"];
} else {
    $old = [];
}

// deletes errors from session after refreshing 
unset($_SESSION["errors"], $_SESSION["old"]);
?>  


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Information Form</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h1>User Information Form</h1>

    <?php
        foreach ($errors as $error) {
            echo "<p class='error'>$error</p>";
        }
    ?>

    <form action="result.php" method="POST">

        <!-- Different Form Fields -->
        <div class="form-field">
            <label>Name</label>
            <input type="text" name="name" value="<?= isset($old['name']) ? htmlspecialchars($old['name']) : '' ?>">
        </div>

        <div class="form-field">
            <label>Age</label>
            <input type="number" name="age" value="<?= isset($old['age']) ? htmlspecialchars($old['age']) : '' ?>">
        </div>

        <div class="form-field">
            <label>Favorite Color</label>
            <select name="color">
                <option value="">Select a color</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="purple">Purple</option>
            </select>
        </div>

        <div class="form-field">
            <label>Hobbies</label>
            <div class="checkbox-group">
                <label><input type="checkbox" name="hobbies[]" > Reading</label>
                <label><input type="checkbox" name="hobbies[]" > Traveling</label>
                <label><input type="checkbox" name="hobbies[]" > Cooking</label>
                <label><input type="checkbox" name="hobbies[]" > Swimming</label>
                <label><input type="checkbox" name="hobbies[]" > Dancing</label>
            </div>
        </div>

        <!-- Submit button takes us to result.php -->
        <button type="submit">Submit</button>

    </form>
</div>

</body>
</html>