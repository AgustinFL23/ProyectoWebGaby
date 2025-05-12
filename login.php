<?php
include 'conexion.php';

$usuario = $_POST['usuario'];
$correo = $_POST['correo'];
$contrasena = $_POST['contrasena'];

// Consulta
$sql = "SELECT * FROM usuarios WHERE usuario=? AND correo=? AND contrasena=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $usuario, $correo, $contrasena);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $datos = $resultado->fetch_assoc();
    $tipo = $datos['tipo'];

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
