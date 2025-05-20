<?php
include 'db.php';

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $prn = $_POST['prn'];
    $cgpa = $_POST['cgpa'];
    $college = $_POST['college'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $department = $_POST['department'];
    $gender = $_POST['gender'];
    $dob = $_POST['dob'];

    // File Upload Handling
    $resume_name = $_FILES['resume']['name'];
    $resume_tmp = $_FILES['resume']['tmp_name'];
    $resume_size = $_FILES['resume']['size'];
   	$resume_ext = pathinfo($resume_name, PATHINFO_EXTENSION);
    
    $allowed_ext = ['pdf']; // Only allow PDFs

    // Debugging output
    echo "Allowed Extensions: " . implode(", ", $allowed_ext) . "<br>";
    echo "Uploaded File Extension: " . $resume_ext . "<br>";
    

   
   if (!in_array(strtolower($resume_ext), $allowed_ext)) {
       die("Invalid file type! Allowed: " . implode(", ", $allowed_ext) . " | Uploaded: " . $resume_ext);
   }

    if ($resume_size > 2 * 1024 * 1024) { // 2MB size limit
        die("Error: File size exceeds 2MB.");
    }

    // Generate unique filename
    $new_resume_name = time() . "_" . $resume_name; 
    $upload_path = "uploads/" . $new_resume_name;

    if (move_uploaded_file($resume_tmp, $upload_path)) {
        // Insert data into the database
        $query = "INSERT INTO crud_form (name, prn, cgpa, college, email, phone, address, department, gender, dob, resume)
                  VALUES ('$name', '$prn', '$cgpa', '$college', '$email', '$phone', '$address', '$department', '$gender', '$dob', '$new_resume_name')";

        if (mysqli_query($conn, $query)) {
            echo "Record added successfully!";
            header("Location: index.php"); // Redirect to the main page
            exit();
        } else {
            echo "Error: " . mysqli_error($conn);
        }
    } else {
        echo "Failed to upload file.";
    }
}
?>
