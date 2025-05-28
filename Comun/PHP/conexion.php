<?php
<<<<<<< HEAD

$host = "localhost";
$user = "root";
$pass = "";
$db = "sistema_academico";
=======
$host = "localhost";
$user = "root";
$pass = "";
$db = "proyecto_web";
>>>>>>> master

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
