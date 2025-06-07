<?php
session_start();
include 'conexion.php';

$usuario = $_POST['usuario'];
$correo = $_POST['correo'];
$contrasena = $_POST['contrasena'];

$sql = "SELECT * FROM usuarios WHERE usuario=? AND correo=? AND contrasena=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $usuario, $correo, $contrasena);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $datos = $resultado->fetch_assoc();
    $tipo = $datos['tipo'];
    $id_usuario = $datos['id'];

    // Generar token de sesión único
    $token = bin2hex(random_bytes(32));

    // Guardar token en la BD
    $update = $conn->prepare("UPDATE usuarios SET token_sesion=? WHERE id=?");
    $update->bind_param("si", $token, $id_usuario);
    $update->execute();

    // Guardar en sesión
    $_SESSION['id_usuario'] = $id_usuario;
    $_SESSION['token'] = $token;

    // Redirigir
    if ($tipo === 'alumno') {
        header("Location: vistas/alumno.php");
    } elseif ($tipo === 'profesor') {
        header("Location: vistas/profesor.php");
    } elseif ($tipo === 'administrador') {
        header("Location: vistas/administrador.php");
    }
    exit();
} else {
    echo "<script>alert('Datos incorrectos');window.location.href='index.html';</script>";
}
?>
