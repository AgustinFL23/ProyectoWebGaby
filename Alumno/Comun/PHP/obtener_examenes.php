<?php
require_once '../../../Comun/PHP/conexion.php'; 
header('Content-Type: application/json');

$sql = "
    SELECT 
        e.id_examen,
        e.nombreExamen,
        e.id_contenido,
        e.cantidad_preguntas,
        c.tema AS contenido_tema,
        b.id_bloque,
        b.nombre_bloque
    FROM examen e
    LEFT JOIN contenido c ON e.id_contenido = c.id_contenido
    LEFT JOIN bloque b ON c.id_bloque = b.id_bloque
";

$result = $conn->query($sql);
$examenes = [];

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $examenes[] = [
            "id_examen" => $row["id_examen"],
            "nombreExamen" => $row["nombreExamen"],
            "id_contenido" => $row["id_contenido"],
            "cantidad_preguntas" => $row["cantidad_preguntas"],
            "contenido_tema" => $row["contenido_tema"],
            "bloque" => [
                "id_bloque" => $row["id_bloque"],
                "nombre_bloque" => $row["nombre_bloque"]
            ]
        ];
    }
}

$response = [
    "cantidad" => count($examenes),
    "examenes" => $examenes
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
