<?php
require_once "dbaccess.php"; 
session_start(); 

$conn = mysqli_connect(DBHOST, DBNAME, DBUSER, DBPASS); 

if($conn->connect_error){
    die("Connection failed" . $conn->connect_error); 
}

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $username = $_POST["username"]; 
    $email = $_POST["email"]; 
    $password = $_POST["password"]; 

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
    $query->bind_param("sss", $username, $email, $password); 

    if($query->execute()){
        $user_id = $conn->insert_id; 
        
    }
    else{
        echo json_encode([
            "status" => "error",
            "message" => "Error: " . $query->error
        ]); 
    }

    $query->close(); 
}

$conn->close(); 
?>