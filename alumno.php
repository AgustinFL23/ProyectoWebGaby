<?php include '../validar.php'; ?>

<?php
session_start();
include '../conexion.php';

$id_usuario = $_SESSION['id_usuario'] ?? null;
$token = $_SESSION['token'] ?? null;

if (!$id_usuario || !$token) {
    header("Location: ../index.html");
    exit();
}

// Verificar token válido
$stmt = $conn->prepare("SELECT token_sesion FROM usuarios WHERE id=?");
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$stmt->bind_result($token_bd);
$stmt->fetch();

if ($token !== $token_bd) {
    session_destroy();
    header("Location: ../index.html");
    exit();
}


