<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
require_once "dbaccess.php";
session_start();

$conn = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME); 

if($conn->connect_error){
    die("Connection failed" . $conn->connect_error); 
}

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data["username"];
    $email = $data["email"];
    $password = $data["password"];

    $hashed_password = password_hash($password, PASSWORD_DEFAULT); 

    $query = $conn->prepare("SELECT user_id FROM users WHERE email = ?"); 
    $query->bind_param("s", $email); 
    $query->execute(); 
    $result = $query->get_result(); 

    if($result->num_rows > 0){
        echo json_encode([
            "status" => "error", 
            "message" => "There is already an account with this email!"
        ]);
        exit(); 
    }

    $query = $conn->prepare("SELECT user_id FROM users WHERE username = ?"); 
    $query->bind_param("s", $username); 
    $query->execute(); 
    $result = $query->get_result(); 

    if($result->num_rows > 0){
        echo json_encode([
            "status" => "error", 
            "message" => "There is already an account with this username!"
        ]); 
        exit(); 
    }

    $query = $conn->prepare("INSERT INTO users (username, email, password) VALUES(?, ?, ?)"); 
    $query->bind_param("sss", $username, $email, $hashed_password); 

    if($query->execute()){
        $user_id = $conn->insert_id; 
        $boards = []; 

        $token = bin2hex(random_bytes(32)); 
        $_SESSION["user_id"] = $user_id; 
        $_SESSION["token"] = $token; 

        setcookie("session_token", $token, time() + 3600, "/", "", false, true); 

        echo json_encode([
            "status" => "success",
            "message" => "User registered successfully!",
            "user" => [
                "user_id" => $user_id,
                "username" => $username,
                "email" => $email,
                "boards" => $boards
            ], 
            "token" => $token
        ]); 
    }
    else{
        echo json_encode([
            "status" => "error",
            "message" => "Error: " . $query->error
        ]); 
    }
} // in longer scripts you should close connection query etc
?> 
