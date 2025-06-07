<?php
require_once '../../../Comun/PHP/conexion.php'; 
header('Content-Type: application/json');

$sql = "SELECT * FROM examen";
$result = $conn->query($sql);

$examenes = [];

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $examenes[] = $row;
    }
}

$response = [
    "cantidad" => count($examenes),
    "examenes" => $examenes
];

echo json_encode($response);
?>
