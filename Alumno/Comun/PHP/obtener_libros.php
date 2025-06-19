<?php
require_once '../../../Comun/PHP/conexion.php'; 
header('Content-Type: application/json');

$sql = "
    SELECT 
        l.id_libro,
        l.formato,
        r.id_recursos,
        r.direccion,
        r.peso,
        c.id_contenido,
        c.tema AS contenido_tema,
        b.id_bloque,
        b.nombre_bloque
    FROM libro l
    LEFT JOIN recursos r ON l.id_libro = r.id_recursos
    LEFT JOIN contenido c ON r.id_contenido = c.id_contenido
    LEFT JOIN bloque b ON c.id_bloque = b.id_bloque
";

$result = $conn->query($sql);
$libros = [];

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $libros[] = [
            "id_libro" => $row["id_libro"],
            "formato" => $row["formato"],
            "direccion" => $row["direccion"],
            "peso" => $row["peso"],
            "contenido" => [
                "id_contenido" => $row["id_contenido"],
                "tema" => $row["contenido_tema"]
            ],
            "bloque" => [
                "id_bloque" => $row["id_bloque"],
                "nombre_bloque" => $row["nombre_bloque"]
            ]
        ];
    }
}

$response = [
    "cantidad" => count($libros),
    "libros" => $libros
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
