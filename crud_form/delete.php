<?php
include 'db.php'; // Include database connection

// Check if ID is provided in the URL
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Fetch the record to get the resume filename
    $query = "SELECT resume FROM crud_form WHERE id = $id";
    $result = mysqli_query($conn, $query);
    
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $resume = $row['resume'];

        // Delete the resume file from the server if it exists
        $file_path = "uploads/" . $resume;
        if (file_exists($file_path)) {
            unlink($file_path);
        }

        // Delete the record from the database
        $delete_query = "DELETE FROM crud_form WHERE id = $id";
        if (mysqli_query($conn, $delete_query)) {
            echo "Record deleted successfully!";
            header("Location: index.php");
            exit();
        } else {
            echo "Error deleting record: " . mysqli_error($conn);
        }
    } else {
        echo "Record not found!";
    }
} else {
    echo "Invalid request!";
}
?>
