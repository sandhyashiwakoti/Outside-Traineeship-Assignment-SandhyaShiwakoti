<?php
// Class to convert numbers into Roman form
class RomanConverter {
    
    // Mapping Roman values to their Arabic values
    private $map = [
        'M' => 1000, 'CM' => 900, 'D' => 500, 'CD' => 400,
        'C' => 100,  'XC' => 90,  'L' => 50,  'XL' => 40,
        'X' => 10,   'IX' => 9,   'V' => 5,   'IV' => 4, 'I' => 1
    ];

    public function generateRoman($num) {
        // Check if number is within the valid range (1-3999)
        if ($num < 1 || $num > 3999) {
            return "Error: Please enter a number between 1 and 3999.";
        }

        $result = "";

        // Iterate through mapping
        foreach ($this->map as $roman => $arabic) {
            while ($num >= $arabic) {
                $result .= $roman; // Append Roman to result
                $num -= $arabic; 
            }
        }
        return $result;
    }
}

// Handles the data from the form submission on index.html
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userValue = (int)$_POST['number'];

    // instance of RomanConverter class
    $rom = new RomanConverter();
    $output = $rom->generateRoman($userValue);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Result</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h2>Conversion Result</h2>
        <p>Number: <?php echo $userValue; ?></p>
        <div class="result"> Roman: <?php echo $output; ?></div>
        <br>
        <input type="submit" value="Go Back" class="btn" onclick="window.location.href='index.html'">
    </div>
</body>
</html>