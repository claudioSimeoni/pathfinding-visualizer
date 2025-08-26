<?php
header('Content-Type: application/json');
require_once "dbaccess.php";

session_start(); 

$conn = mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME); 

if($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}

if($_SERVER["REQUEST_METHOD"] === "POST"){

    $data = json_decode(file_get_contents("php://input"), true); // true makes it an associative array, you are getting stuff sent with fetch

    $board = $data["board"]; 
    $board_name = $data["name"]; 
    $user_id = $_SESSION["user_id"]; 

    if (!isset($_SESSION["user_id"]) || !isset($_SESSION["token"])) {
        header("HTTP/1.1 401 Unauthorized");
        exit("You must log in to save a board.");
    }

    if ($_SESSION["token"] !== $_COOKIE["session_token"]) {
        header("HTTP/1.1 401 Unauthorized");
        exit("Invalid session token");
    }

    $query = $conn->prepare("INSERT INTO boards (repr, name, user_id) VALUES (?, ?, ?)");
    $query->bind_param("ssi", $board, $board_name, $user_id); 
    $query->execute(); 

    if($query->affected_rows){
        $board_id = $query->insert_id;

        // Fetch the creation timestamp
        $timestamp_query = $conn->prepare(
            "SELECT creation_timestamp FROM boards WHERE board_id = ?"
        );
        $timestamp_query->bind_param("i", $board_id);
        $timestamp_query->execute();
        $timestamp_result = $timestamp_query->get_result();
        $timestamp_row = $timestamp_result->fetch_assoc();

        echo json_encode([
            "status" => "ok",
            "data" => [
                "board_name" => $board_name,
                "user_id" => $_SESSION["user_id"],
                "board" => $board,
                "board_id" => $board_id,
                "timestamp" => $timestamp_row["creation_timestamp"],
            ],
        ]);
    }
    else{
        echo json_encode([
            "status" => "error",
            "message" => "Failed to save board",        
        ]);
    }
}
?>