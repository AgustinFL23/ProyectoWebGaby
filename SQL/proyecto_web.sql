-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 18-05-2025 a las 07:32:24
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto_web`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes`
--

CREATE TABLE `examenes` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `preguntas_por_alumno` int(11) DEFAULT NULL,
  `creado_por` varchar(50) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `examenes`
--

INSERT INTO `examenes` (`id`, `titulo`, `preguntas_por_alumno`, `creado_por`, `fecha_creacion`) VALUES
(1, 'Examen de Historia', 5, 'Clau', '2025-05-16 23:50:30'),
(2, 'Examen de Matemáticas', 5, 'Clau', '2025-05-16 23:50:30'),
(3, 'Examen de Biología', 5, 'Clau', '2025-05-16 23:50:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `id` int(11) NOT NULL,
  `id_examen` int(11) DEFAULT NULL,
  `enunciado` text DEFAULT NULL,
  `opcion1` text DEFAULT NULL,
  `opcion2` text DEFAULT NULL,
  `opcion3` text DEFAULT NULL,
  `opcion4` text DEFAULT NULL,
  `respuesta_correcta` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`id`, `id_examen`, `enunciado`, `opcion1`, `opcion2`, `opcion3`, `opcion4`, `respuesta_correcta`) VALUES
(1, 1, '¿Quién descubrió América?', 'Cristóbal Colón', 'Hernán Cortés', 'Simón Bolívar', 'Miguel Hidalgo', 1),
(2, 1, '¿En qué año fue la Revolución Francesa?', '1789', '1776', '1492', '1810', 1),
(3, 1, '¿Qué civilización construyó las pirámides?', 'Griegos', 'Romanos', 'Egipcios', 'Mayas', 3),
(4, 1, '¿Quién fue el primer presidente de México?', 'Benito Juárez', 'Guadalupe Victoria', 'Porfirio Díaz', 'Vicente Guerrero', 2),
(5, 1, '¿Qué guerra terminó en 1945?', 'Primera Guerra Mundial', 'Guerra Fría', 'Segunda Guerra Mundial', 'Guerra Civil Española', 3),
(6, 1, '¿Qué imperio cayó en 476 d.C.?', 'Imperio Bizantino', 'Imperio Romano de Occidente', 'Imperio Persa', 'Imperio Mongol', 2),
(7, 1, '¿Qué país lanzó la bomba atómica?', 'Alemania', 'Italia', 'Estados Unidos', 'Japón', 3),
(8, 1, '¿Quién fue Napoleón Bonaparte?', 'Filósofo', 'Conquistador español', 'Emperador francés', 'Presidente americano', 3),
(9, 2, '¿Cuánto es 7 x 8?', '56', '64', '48', '58', 1),
(10, 2, '¿Qué es un número primo?', 'Número par', 'Número divisible solo entre 1 y sí mismo', 'Número negativo', 'Número decimal', 2),
(11, 2, '¿Cuál es la raíz cuadrada de 81?', '8', '9', '7', '6', 2),
(12, 2, '¿Cuánto es 12²?', '124', '142', '144', '132', 3),
(13, 2, '¿Qué representa \"?\"?', 'Radio', 'Área', 'Circunferencia', 'Relación entre diámetro y circunferencia', 4),
(14, 2, '¿Cuánto es 5 + (3 x 2)?', '11', '16', '13', '10', 1),
(15, 2, '¿Cuál es el resultado de 15 ÷ 3?', '5', '6', '3', '4', 1),
(16, 2, '¿Cuántos lados tiene un hexágono?', '6', '5', '8', '7', 1),
(17, 3, '¿Cuál es la unidad básica de la vida?', 'Célula', 'Átomo', 'Tejido', 'Órgano', 1),
(18, 3, '¿Qué tipo de sangre es donador universal?', 'A', 'B', 'AB', 'O-', 4),
(19, 3, '¿Dónde ocurre la fotosíntesis?', 'Raíz', 'Tallo', 'Hojas', 'Flores', 3),
(20, 3, '¿Qué órgano filtra la sangre?', 'Pulmón', 'Hígado', 'Riñón', 'Corazón', 3),
(21, 3, '¿Cuál es el órgano principal del sistema nervioso?', 'Cerebro', 'Estómago', 'Corazón', 'Pulmón', 1),
(22, 3, '¿Qué animales ponen huevos?', 'Mamíferos', 'Ovovivíparos', 'Ovíparos', 'Vivíparos', 3),
(23, 3, '¿Cuál es el gas que exhalamos?', 'Oxígeno', 'Dióxido de carbono', 'Nitrógeno', 'Hidrógeno', 2),
(24, 3, '¿Qué contiene el ADN?', 'Proteínas', 'Genes', 'Vitaminas', 'Hormonas', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `tipo` enum('alumno','profesor','administrador') NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `correo`, `contrasena`, `tipo`) VALUES
(1, 'IDinoMikeI', 'karlasanchez251004@gmail.com', 'Dino123', 'administrador'),
(2, 'Gus', 'afl231001@gmail.com', 'Gus123', 'alumno'),
(3, 'Clau', 'mezosandovalclaudia130@gmail.com', 'Clau123', 'profesor'),
(4, 'joshua', '', '1234', 'alumno');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `examenes`
--
ALTER TABLE `examenes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_examen` (`id_examen`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `examenes`
--
ALTER TABLE `examenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
