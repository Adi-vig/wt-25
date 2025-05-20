<?php
include 'db.php';

$query = "SELECT * FROM crud_form";
$result = mysqli_query($conn, $query);

if (!$result) {
    die("Query Failed: " . mysqli_error($conn));
}

if (mysqli_num_rows($result) == 0) {
    echo "<tr><td colspan='13'>No records found!</td></tr>";
} else {
    while ($row = mysqli_fetch_assoc($result)) {
        echo "<tr>
                <td>{$row['id']}</td>
                <td>{$row['name']}</td>
                <td>{$row['prn']}</td>
                <td>{$row['cgpa']}</td>
                <td>{$row['college']}</td>
                <td>{$row['email']}</td>    
                <td>{$row['phone']}</td>
                <td>{$row['address']}</td>
                <td>{$row['department']}</td>
                <td>{$row['gender']}</td>
                <td>{$row['dob']}</td>
          		<td>
                	<a href='uploads/{$row['resume']}' target='_blank' class='btn view-btn'>View Resume</a>
            	</td>
            	<td>
                	<a href='edit.php?id={$row['id']}' class='btn edit-btn'>Edit</a>
                	<a href='delete.php?id={$row['id']}' class='btn delete-btn' onclick=\"return confirm('Are you sure?')\">Delete</a>
            	</td>
                
            </tr>";
    }
}
?>
