<?php
session_start();
require_once '../../../Comun/PHP/conexion.php'; 
header('Content-Type: application/json');

if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(["success" => false, "error" => "No ha iniciado sesión"]);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];
$input = json_decode(file_get_contents("php://input"), true);

$id_examen = intval($input['id_examen']);
$respuestas = $input['respuestas'];

// Obtener el id del alumno
$sql = "SELECT id_alumno FROM alumno WHERE id_usuario = $id_usuario";
$result = $conn->query($sql);
if (!$result || $result->num_rows === 0) {
    echo json_encode(["success" => false, "error" => "Usuario no es alumno"]);
    exit;
}
$id_alumno = $result->fetch_assoc()['id_alumno'];

// Obtener respuestas correctas desde la BD
$sql = "SELECT id_pregunta, respuesta_correcta FROM pregunta WHERE id_examen = $id_examen";
$resp_correctas = [];
$result = $conn->query($sql);
while ($row = $result->fetch_assoc()) {
    $resp_correctas[$row['id_pregunta']] = $row['respuesta_correcta'];
}

// Calcular calificación
$total = count($resp_correctas);
$aciertos = 0;
foreach ($resp_correctas as $id => $correcta) {
    if (isset($respuestas[$id]) && $respuestas[$id] === $correcta) {
        $aciertos++;
    }
}
$calificacion = round(($aciertos / $total) * 10, 2); // de 0 a 10

// Guardar en BD
$fecha = date("Y-m-d");
$stmt = $conn->prepare("INSERT INTO calificacion_examen (id_alumno, id_examen, calificacion, fecha)
                        VALUES (?, ?, ?, ?)
                        ON DUPLICATE KEY UPDATE calificacion = VALUES(calificacion), fecha = VALUES(fecha)");
$stmt->bind_param("iids", $id_alumno, $id_examen, $calificacion, $fecha);
$stmt->execute();

echo json_encode(["success" => true, "calificacion" => $calificacion]);
?>
