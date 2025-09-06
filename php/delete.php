<?php
require_once "dbaccess.php";
session_start();

$connection = mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $board_id = $data["board_id"];
    $user_id = $_SESSION["user_id"];

    if (!isset($_SESSION["user_id"]) || !isset($_SESSION["token"])) {
        header("HTTP/1.1 401 Unauthorized");
        exit("You must log in to delete a board.");
    }

    if ($_SESSION["token"] !== $_COOKIE["session_token"]) {
        header("HTTP/1.1 401 Unauthorized");
        exit("Invalid session token");
    }

    $query = $connection->prepare("DELETE FROM boards WHERE board_id = ? AND user_id = ?");
    $query->bind_param("ii", $board_id, $_SESSION["user_id"]);
    $query->execute();

    if ($query->affected_rows > 0) {
        echo json_encode(["status" => "ok"]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to delete board!",
        ]);
    }
}
?>
