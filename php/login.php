<?php
require_once "dbaccess.php"; 
session_start(); 

$conn = mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME); 

if($conn->connect_error){
    die("Connection failed: " . $conn->connect_error); 
}

if($_SERVER["REQUEST_METHOD"] === "POST"){
    
}



?>