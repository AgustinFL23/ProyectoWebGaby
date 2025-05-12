<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';
include 'conexion.php';

$correo = $_POST['correo'];

$sql = "SELECT usuario, contrasena FROM usuarios WHERE correo=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';  
        $mail->SMTPAuth = true;
        $mail->Username = 'proyectowebgaby@gmail.com';
        $mail->Password = 'nice wptk wbku nqwk';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('proyectowebgaby@gmail.com', 'Soporte');
        $mail->addAddress($correo);

        $mail->isHTML(true);
        
$mail->Subject = 'Recuperacion de Contrasenia';
        $mail->Body    = "Tu usuario es: <b>{$data['usuario']}</b><br>Tu contraseña es: <b>{$data['contrasena']}</b>";

        $mail->send();
        echo "<script>alert('Correo enviado');window.location.href='index.html';</script>";
    } catch (Exception $e) {
        echo "Error al enviar: {$mail->ErrorInfo}";
    }
} else {
    echo "<script>alert('Correo no encontrado');window.location.href='recuperar.php';</script>";
}
?>
