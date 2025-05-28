<?php

session_start();
include 'conexion.php';

$correo = $_POST['correo'] ?? '';
$contraseña = $_POST['contraseña'] ?? '';
$tipo = $_POST['tipo'] ?? '';

$sql = "SELECT * FROM usuario WHERE correo=? AND contraseña=? /*AND tipo=?*/";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $correo, $contraseña /*,$tipo*/);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $_SESSION['correo'] = $correo;
    $_SESSION['tipo'] = $tipo;
    $_SESSION['last_interaction'] = time();

    $redirect = "$tipo";

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
