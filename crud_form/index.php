<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STUDENT RESUME CRUD</title>
    <link rel="stylesheet" href="style.css">
   	
</head>
<body>
    <h2>CRUD Form Application</h2>
    <form action="process.php" method="POST" enctype="multipart/form-data">
        <input type="text" name="name" placeholder="Enter Name" required>
        <input type="text" name="prn" placeholder="Enter PRN" required>
        <input type="number" step="0.01" name="cgpa" placeholder="Enter CGPA" required>
        <input type="text" name="college" placeholder="Enter College" required>
        <input type="email" name="email" placeholder="Enter Email" required>
        <input type="tel" name="phone" placeholder="Enter Phone Number" required>
        <textarea name="address" placeholder="Enter Address" required></textarea>
        <input type="text" name="department" placeholder="Enter Department" required>
        <select name="gender" required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
        <input type="date" name="dob" required>
        <input type="file" name="resume" accept="application/pdf" required>
        <button type="submit" name="submit">Add Record</button>
    </form>
    
    <h3>Records</h3>
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>PRN</th>
            <th>CGPA</th>
            <th>College</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Department</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Resume</th>
            <th>Actions</th>
        </tr>
        <?php 
        include 'fetch.php'; 
        ?>
        
    </table>
</body>
</html>
