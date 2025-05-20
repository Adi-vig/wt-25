<?php
include 'db.php'; // Include database connection

// Check if ID is provided in the URL
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    
    // Fetch existing record
    $query = "SELECT * FROM crud_form WHERE id = $id";
    $result = mysqli_query($conn, $query);
    
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
    } else {
        echo "Record not found!";
        exit();
    }
} else {
    echo "Invalid Request!";
    exit();
}

// Handle update form submission
if (isset($_POST['update'])) {
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

    // Handle file upload if new resume is provided
    if (!empty($_FILES['resume']['name'])) {
        $resume = $_FILES['resume']['name'];
        $resume_tmp = $_FILES['resume']['tmp_name'];
        $resume_path = "uploads/" . basename($resume);
        move_uploaded_file($resume_tmp, $resume_path);

        // Update query including resume
        $query = "UPDATE crud_form SET 
                  name='$name', prn='$prn', cgpa='$cgpa', college='$college', email='$email',
                  phone='$phone', address='$address', department='$department', gender='$gender',
                  dob='$dob', resume='$resume' WHERE id=$id";
    } else {
        // Update query without changing resume
        $query = "UPDATE crud_form SET 
                  name='$name', prn='$prn', cgpa='$cgpa', college='$college', email='$email',
                  phone='$phone', address='$address', department='$department', gender='$gender',
                  dob='$dob' WHERE id=$id";
    }

    if (mysqli_query($conn, $query)) {
        echo "Record updated successfully!";
        header("Location: index.php");
        exit();
    } else {
        echo "Error updating record: " . mysqli_error($conn);
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Record</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h2>Edit Record</h2>
    <form action="" method="POST" enctype="multipart/form-data">
        <input type="text" name="name" value="<?= $row['name'] ?>" required>
        <input type="text" name="prn" value="<?= $row['prn'] ?>" required>
        <input type="number" step="0.01" name="cgpa" value="<?= $row['cgpa'] ?>" required>
        <input type="text" name="college" value="<?= $row['college'] ?>" required>
        <input type="email" name="email" value="<?= $row['email'] ?>" required>
        <input type="tel" name="phone" value="<?= $row['phone'] ?>" required>
        <textarea name="address" required><?= $row['address'] ?></textarea>
        <input type="text" name="department" value="<?= $row['department'] ?>" required>
        <select name="gender" required>
            <option value="Male" <?= ($row['gender'] == 'Male') ? 'selected' : '' ?>>Male</option>
            <option value="Female" <?= ($row['gender'] == 'Female') ? 'selected' : '' ?>>Female</option>
            <option value="Other" <?= ($row['gender'] == 'Other') ? 'selected' : '' ?>>Other</option>
        </select>
        <input type="date" name="dob" value="<?= $row['dob'] ?>" required>
        
        <label>Current Resume: <a href="uploads/<?= $row['resume'] ?>" target="_blank">View</a></label>
        <input type="file" name="resume" accept="application/pdf">
        
        <button type="submit" name="update">Update Record</button>
    </form>
</body>
</html>
