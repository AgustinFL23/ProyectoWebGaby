<?php
session_start();
include 'conexion.php';

$usuario = $_POST['usuario'] ?? '';
$contrasena = $_POST['contrasena'] ?? '';
$tipo = $_POST['tipo'] ?? '';

$sql = "SELECT * FROM usuarios WHERE usuario=? AND contrasena=? AND tipo=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $usuario, $contrasena, $tipo);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $_SESSION['usuario'] = $usuario;
    $_SESSION['tipo'] = $tipo;
    $_SESSION['last_interaction'] = time();

    $redirect = "HTML/$tipo.html";

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
