<?php
require_once "dbaccess.php"; 
session_start(); 

$conn = mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME); 

if($conn->connect_error){
    die("Connection failed: " . $conn->connect_error); 
}

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data["username"];
    $password = $data["password"];

    $query = $conn->prepare("SELECT user_id, email, username, password FROM users WHERE username = ?"); 
    $query->bind_param("s", $username); 
    $query->execute(); 

    $result = $query->get_result(); 

    if($result->num_rows > 0){
        $user = $result->fetch_assoc(); 

        if(password_verify($password, $user["password"])){
            $token = bin2hex(random_bytes(32)); 
            $_SESSION["user_id"] = $user["user_id"]; 
            $_SESSION["token"] = $token; 

            setcookie("session_token", $token, time() + 3600, "/", "", false, true); 

            $boards_query = $conn->prepare("SELECT board_id, name, repr, creation_timestamp FROM boards WHERE user_id = ?");
            $boards_query->bind_param("i", $user["user_id"]);
            $boards_query->execute(); 
            $boards_result = $boards_query->get_result(); 

            $boards = []; 

            while($board = $boards_result->fetch_assoc()){
                $boards[] = [
                    "board_id" => $board["board_id"],
                    "name" => $board["name"],
                    "repr" => $board["repr"],
                    "timestamp" => $board["creation_timestamp"],
                ];
            }

            echo json_encode([
                "status" => "success",
                "message" => "Login successful!",
                "user" => [
                    "user_id" => $user["user_id"], 
                    "username" => $user["username"],
                    "email" => $user["email"],
                    "boards" => $boards
                ],
                "token" => $token
            ]); 
        } 
        else{
            echo json_encode([
                "status" => "error",
                "message" => "Invalid password!"
            ]); 
        }
    }
    else{
        echo json_encode([
            "status" => "error",
            "message" => "User not registered!"
        ]); 
    }
}
?>