<?php
include 'conexion.php';

$correo = $_POST['correo'];


$sql = "SELECT usuario, contrasena FROM usuarios WHERE correo=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $datos = $result->fetch_assoc();
    $usuario = $datos['usuario'];
    $contrasena = $datos['contrasena'];

    $asunto = "Recuperación de contraseña";
    $mensaje = "Hola, tu usuario es: $usuario\nTu contraseña es: $contrasena";
    $cabeceras = "From: proyectowebgaby@gmail.com";

    // Enviar el correo
    if (mail($correo, $asunto, $mensaje, $cabeceras)) {
        echo "<script>alert('Correo enviado correctamente');window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('Error al enviar el correo');window.location.href='recuperar.php';</script>";
    }

} else {
    echo "<script>alert('Correo no encontrado');window.location.href='recuperar.php';</script>";
}
?>