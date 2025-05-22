CREATE DATABASE IF NOT EXISTS proyecto_web;
USE proyecto_web;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
<<<<<<< HEAD
<<<<<<< HEAD
    correo VARCHAR(50) NOT NULL UNIQUE,
=======
    usuario VARCHAR(50) NOT NULL UNIQUE,
>>>>>>> 23c40b5 (aplicado)
=======
    correo VARCHAR(50) NOT NULL UNIQUE,
>>>>>>> c5bc234 (cookie iniciada)
    contrasena VARCHAR(100) NOT NULL,
    tipo ENUM('alumno', 'profesor', 'administrador') NOT NULL
);

-- Ejemplo de datos
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c5bc234 (cookie iniciada)
INSERT INTO usuarios (correo, contrasena, tipo) VALUES
('joshua@gmail.com', '1234', 'alumno'),
('maria@gmail.com', 'abcd', 'profesor'),
('admin@gmail.com', 'adminpass', 'administrador');
<<<<<<< HEAD
=======
INSERT INTO usuarios (usuario, contrasena, tipo) VALUES
('joshua', '1234', 'alumno'),
('maria', 'abcd', 'profesor'),
('admin', 'adminpass', 'administrador');
>>>>>>> 23c40b5 (aplicado)
=======
>>>>>>> c5bc234 (cookie iniciada)
