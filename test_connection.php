<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "35.129.160.91";
$username = "root";
$password = "Fantaman123";
$dbname = "minecraft";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully<br>";

// Fetch player scores
$sql = "SELECT username, score FROM player_scores ORDER BY score DESC LIMIT 10";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        echo "Username: " . $row["username"]. " - Score: " . $row["score"]. "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>
