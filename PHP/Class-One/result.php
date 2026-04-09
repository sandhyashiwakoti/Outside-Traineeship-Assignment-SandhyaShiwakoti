<?php
// Start session to store error messages
session_start();

$name    = $_POST["name"];
$age     = $_POST["age"];
$color   = $_POST["color"];
$hobbies = $_POST["hobbies"] ?? []; // Null when no hobbies are selected

$errors = [];


if (empty($name)) {
    $errors[] = "Name is required.";
}

// Check if age is number and between range of 1 and 120
if (empty($age) || !is_numeric($age) || $age < 1 || $age > 120) {
    $errors[] = "Enter a valid age.";
}

if (empty($color)) {
    $errors[] = "Please pick a color.";
}

// If there are errors then store them in session and go back to index.php
if (!empty($errors)) {
    $_SESSION["errors"] = $errors;
    header("Location: index.php");
    exit;
}

if ($age >= 18){
    $ageType = "an adult";
}
else{
    $ageType = "a minor";
}

if (empty($hobbies)) {
    $hobbiesList = "None";
} else {
    $hobbiesList = implode(", ", $hobbies); //implode changes array to string 
}

$yearsLived = "";
for ($i = 1; $i <= $age; $i++) {
    $yearsLived .= "$i ";
}

switch ($color) {
    case "red":   
        $colorMsg = "Red is a bold choice.";         
        break;
    case "blue":  
        $colorMsg = "Blue is calming.";              
        break;
    case "green": 
        $colorMsg = "Green represents nature.";      
        break;
    default:      
        $colorMsg = "That's an interesting choice."; 
        break;
}
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
    <h1>Results</h1>
    <div>
        <p>Hello, <?= $name ?>!</p>
        <p>You are <?= $ageType ?>.</p>
        <p><?= $colorMsg ?></p>
        <p>Hobbies: <?= $hobbiesList ?></p>
        <p>Years lived:</p>
        <div><?= $yearsLived ?></div>
    </div>
    <br>
    <a href="index.php">Submit Another</a>
</div>

</body>
</html>