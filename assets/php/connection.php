<?php
$host = 'localhost'; 
$database = 'calcDatabase'; 
$user = 'root'; 
$password = '';

$connection = new mysqli($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($connection));
?>