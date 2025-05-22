<?php
session_start();
include 'conexion.php';

<<<<<<< HEAD
<<<<<<< HEAD
$correo = $_POST['correo'] ?? '';
$contrasena = $_POST['contrasena'] ?? '';
$tipo = $_POST['tipo'] ?? '';

$sql = "SELECT * FROM usuarios WHERE correo=? AND contrasena=? AND tipo=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $correo, $contrasena, $tipo);
=======
$usuario = $_POST['usuario'] ?? '';
=======
$correo = $_POST['correo'] ?? '';
>>>>>>> c5bc234 (cookie iniciada)
$contrasena = $_POST['contrasena'] ?? '';
$tipo = $_POST['tipo'] ?? '';

$sql = "SELECT * FROM usuarios WHERE correo=? AND contrasena=? AND tipo=?";
$stmt = $conn->prepare($sql);
<<<<<<< HEAD
$stmt->bind_param("sss", $usuario, $contrasena, $tipo);
>>>>>>> 23c40b5 (aplicado)
=======
$stmt->bind_param("sss", $correo, $contrasena, $tipo);
>>>>>>> c5bc234 (cookie iniciada)
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c5bc234 (cookie iniciada)
    $_SESSION['correo'] = $correo;
    $_SESSION['tipo'] = $tipo;
    $_SESSION['last_interaction'] = time();

    $redirect = "HTML/$tipo.html";
=======
    $_SESSION['usuario'] = $usuario;
    $_SESSION['tipo'] = $tipo;
    $_SESSION['last_interaction'] = time();

    $redirect = "vistas/$tipo.php";
>>>>>>> 23c40b5 (aplicado)

    echo json_encode([
        "success" => true,
        "redirect" => $redirect
    ]);
} else {
    echo json_encode([
        "success" => false
    ]);
}
?>
