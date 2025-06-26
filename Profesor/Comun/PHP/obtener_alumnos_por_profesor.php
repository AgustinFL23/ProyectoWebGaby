<?php
session_start();
require_once '../../../Comun/PHP/conexion.php'; 

header('Content-Type: application/json');


if (!isset($_SESSION["correo"])) {
    echo json_encode(["success" => false, "error" => "Sesión no activa"]);
    exit;
}

$correo = $_SESSION["correo"];


$sql_profesor = "SELECT id_profesor FROM profesores WHERE correo = ?";
$stmt = $conn->prepare($sql_profesor);
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    echo json_encode(["success" => false, "error" => "Profesor no encontrado"]);
    exit;
}
$row = $result->fetch_assoc();
$id_profesor = $row["id_profesor"];


$sql_alumnos = "
    SELECT alumnos.id_alumno, alumnos.nombre AS nombre_alumno, grupos.nombre_grupo
    FROM alumnos
    INNER JOIN grupos ON alumnos.id_grupo = grupos.id_grupo
    WHERE grupos.id_profesor = ?
";

$stmt2 = $conn->prepare($sql_alumnos);
$stmt2->bind_param("i", $id_profesor);
$stmt2->execute();
$result2 = $stmt2->get_result();

$alumnos = [];
while ($fila = $result2->fetch_assoc()) {
    $alumnos[] = $fila;
}


echo json_encode(["success" => true, "alumnos" => $alumnos]);
?>
