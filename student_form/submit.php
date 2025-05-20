<?php
$servername = "localhost";
$username = "root"; // Default XAMPP MySQL username
$password = "aditya"; // Default XAMPP MySQL password (empty)
$dbname = "wt";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve form data
$GRNO = $_POST['GRNO'];
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$CGPA = $_POST['CGPA'];
$os_o1 = $_POST['os_o1'];
$os_o2 = $_POST['os_o2'];
$lang_o1 = $_POST['lang_o1'];

// Prepare SQL statement
$sql = "INSERT INTO student (GRNO, fname, lname, CGPA, os_o1, os_o2, lang_o1) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";

// Prepare statement
$stmt = $conn->prepare($sql);
$stmt->bind_param("issdsss", $GRNO, $fname, $lname, $CGPA, $os_o1, $os_o2, $lang_o1);

// Execute and check
if ($stmt->execute()) {
    echo "<h2>Student registered successfully!</h2>";
    echo "<a href='index.html'>Go Back</a>";
} else {
    echo "Error: " . $stmt->error;
}

// Close connection
$stmt->close();
$conn->close();
?>
