<?php
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

// Fetch player scores
$sql = "SELECT username, score FROM player_scores ORDER BY score DESC";
$result = $conn->query($sql);

$players = array();
if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        $players[] = $row;
    }
} else {
    echo "0 results";
}
$conn->close();

// Return JSON response
header('Content-Type: application/json');
echo json_encode($players);
?>
