CREATE DATABASE IF NOT EXISTS proyecto_web;
USE proyecto_web;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    tipo ENUM('alumno', 'profesor', 'administrador') NOT NULL
);

-- Ejemplo de datos
INSERT INTO usuarios (correo, contrasena, tipo) VALUES
('joshua@gmail.com', '1234', 'alumno'),
('maria@gmail.com', 'abcd', 'profesor'),
('admin@gmail.com', 'adminpass', 'administrador');
