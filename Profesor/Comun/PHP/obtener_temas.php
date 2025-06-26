<?php
require_once '../../../Comun/PHP/conexion.php'; 
header('Content-Type: application/json');
$sql= "select * from contenido";
$result = $conn->query($sql);
$datos = [];
if ($result && $result->num_rows > 0) {
while ($fila = $result->fetch_assoc()) {
        $datos[] = $fila;
    }
    echo json_encode(["success" => true, "contenidos" => $datos]);
}
else{
	echo json_encode(["success" => false, "mensaje" => "No se encontraron resultados"]);
}
?>