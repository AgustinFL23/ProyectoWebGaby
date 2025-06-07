<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; 
    $mail->SMTPAuth = true;
    $mail->Username = 'tucorreo@gmail.com';     // Tu correo
    $mail->Password = 'tu_contraseña';          // Tu contraseña o App Password
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('tucorreo@gmail.com', 'Nombre del sistema');
    $mail->addAddress('correo@destino.com', 'Nombre del destinatario');

    $mail->isHTML(true);
    $mail->Subject = 'Recuperación de contraseña';
    $mail->Body    = 'Hola, tu nueva contraseña es: <b>123456</b>';

    $mail->send();
    echo 'Mensaje enviado correctamente';
} catch (Exception $e) {
    echo "El mensaje no pudo ser enviado. Error: {$mail->ErrorInfo}";
}
?>
