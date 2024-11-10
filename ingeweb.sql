-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-11-2024 a las 02:43:36
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
-- Base de datos: `ingeweb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alojamiento`
--

CREATE TABLE `alojamiento` (
  `id_alojamiento` int(11) NOT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `nombre_alojamiento` varchar(255) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `tiene_lavanderia` bit(1) DEFAULT NULL,
  `tiene_parqueadero_bicicleta` bit(1) DEFAULT NULL,
  `tiene_roomie` bit(1) DEFAULT NULL,
  `id_estado` int(11) DEFAULT NULL,
  `id_propietario` bigint(20) DEFAULT NULL,
  `tipo_alojamientoid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alojamiento`
--

INSERT INTO `alojamiento` (`id_alojamiento`, `ciudad`, `descripcion`, `direccion`, `nombre_alojamiento`, `precio`, `tiene_lavanderia`, `tiene_parqueadero_bicicleta`, `tiene_roomie`, `id_estado`, `id_propietario`, `tipo_alojamientoid`) VALUES
(1, 'Bogotá', 'Cómoda habitación en el centro de la ciudad.', 'Calle 123 #45-67', 'Habitación Estudio', 500000, b'1', b'1', b'0', 2, 1027150257, 1),
(2, 'Bogotá', 'Es un alojamiento pequeño', 'Sede carrera 48', 'Alojamiento en Sede el claustro', 102563, b'1', b'1', b'1', 1, 1027150257, 1),
(4, 'Bogotá', 'Un apartamento para dos estudiantes cerca a la calle 13, sede de la universidad catolica', 'Carrera 13 con calle 45', 'Apartamento La Guaria', 523695, b'0', b'1', b'1', 1, 1027150257, 1),
(9, 'Bogotá', 'CARRERA 13', 'CARRERA 13 -48', 'HABITACIÒN EN CARRERA 13', 459863, b'0', b'1', b'1', 2, 1027150257, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

CREATE TABLE `comentario` (
  `id_comentario` int(11) NOT NULL,
  `comentario` text DEFAULT NULL,
  `id_alojamiento` int(11) DEFAULT NULL,
  `id_estudiante` binary(16) DEFAULT NULL,
  `email` binary(16) DEFAULT NULL,
  `email_estudiante` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comportamiento_de_busqueda`
--

CREATE TABLE `comportamiento_de_busqueda` (
  `id_busqueda` int(11) NOT NULL,
  `criterios_busqueda` text NOT NULL,
  `favoritos` text DEFAULT NULL,
  `fecha_hora` datetime(6) NOT NULL,
  `resultados_vistos` text DEFAULT NULL,
  `id_estudiante` binary(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_estudiante`
--

CREATE TABLE `estado_estudiante` (
  `id_estado_estudiante` int(11) NOT NULL,
  `estado_estudiante` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_estudiante`
--

INSERT INTO `estado_estudiante` (`id_estado_estudiante`, `estado_estudiante`) VALUES
(1, 'Activo'),
(2, 'Inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_habitacion`
--

CREATE TABLE `estado_habitacion` (
  `id_estado_habitacion` int(11) NOT NULL,
  `estado_habitacion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_habitacion`
--

INSERT INTO `estado_habitacion` (`id_estado_habitacion`, `estado_habitacion`) VALUES
(1, 'Desocupada'),
(2, 'Ocupada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_propietario`
--

CREATE TABLE `estado_propietario` (
  `id_estado_propietario` int(11) NOT NULL,
  `estado_propietario` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_propietario`
--

INSERT INTO `estado_propietario` (`id_estado_propietario`, `estado_propietario`) VALUES
(1, 'Activo'),
(2, 'Inactivo'),
(3, 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_reserva`
--

CREATE TABLE `estado_reserva` (
  `id_estado_reserva` int(11) NOT NULL,
  `estado_reserva` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_reserva`
--

INSERT INTO `estado_reserva` (`id_estado_reserva`, `estado_reserva`) VALUES
(1, 'Activa'),
(2, 'Cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `id_estudiante` binary(16) NOT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `activo` bit(1) NOT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `id_estado` int(11) DEFAULT NULL,
  `id_universidad` int(11) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`id_estudiante`, `codigo`, `activo`, `contraseña`, `edad`, `email`, `nombre`, `telefono`, `id_estado`, `id_universidad`, `role`) VALUES
(0x284bc3f0e82d4c9ba48882f3f6a9eb00, '67000771', b'1', '$2a$10$8e9hUMrGA2uqrYH61hqx3Oie/egFvT3WUIvLqYkNcyEo1AeYbSgue', 22, 'sfroncancio71@ucatolica.edu.co', 'Sergio Roncancio', '3004760608', 1, 1, NULL),
(0x937170b4d7f2433090fb4c91a96240cd, 'EST12345', b'1', '$2a$10$GVhjkV2iocgNCbU.foYzw.U4q.VEJWvZbF7FW0jlWSYe/o6Hiq4ta', 22, 'juan.perez@example.com', 'Juan Pérez', '1234567890', 1, 1, 'Rol(id=0, nombre=ESTUDIANTE)'),
(0xe3fdbc87e0874cc4944d2b8036ceb09e, '67000771', b'1', '$2a$10$JwDd1TjG/CV79db6H16DYe3PWltwXB58qq1pBUPDINmuxNDp77cSq', 22, 'afbarrios18@ucatolica.edu.co', 'ANDRES BARRIOS', '3123245896', 1, 1, 'Rol(id=0, nombre=ESTUDIANTE)');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante_reserva`
--

CREATE TABLE `estudiante_reserva` (
  `id_estudiante` int(11) NOT NULL,
  `id_reserva` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `event_publication`
--

CREATE TABLE `event_publication` (
  `id` binary(16) NOT NULL,
  `completion_date` datetime(6) DEFAULT NULL,
  `event_type` varchar(255) DEFAULT NULL,
  `listener_id` varchar(255) DEFAULT NULL,
  `publication_date` datetime(6) DEFAULT NULL,
  `serialized_event` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foto`
--

CREATE TABLE `foto` (
  `id_foto` int(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `id_alojamiento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `foto`
--

INSERT INTO `foto` (`id_foto`, `url`, `id_alojamiento`) VALUES
(8, '/image1.jpeg', 1),
(9, '/image3.webp', 2),
(11, '/image5.png', 4),
(22, '/descarga.jpeg', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id_historial` int(11) NOT NULL,
  `fecha_hora_cambio` datetime(6) DEFAULT NULL,
  `id_entidad_afectada` int(11) DEFAULT NULL,
  `id_estado_anterior` int(11) DEFAULT NULL,
  `id_estado_nuevo` int(11) DEFAULT NULL,
  `tipo_entidad` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_recomendaciones`
--

CREATE TABLE `historial_recomendaciones` (
  `id_historial_recomendacion` int(11) NOT NULL,
  `alojamientos_recomendados` text NOT NULL,
  `fecha_recomendacion` date NOT NULL,
  `id_estudiante` binary(16) DEFAULT NULL,
  `id_recomendacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preferencia_estudiante`
--

CREATE TABLE `preferencia_estudiante` (
  `id_preferencia` int(11) NOT NULL,
  `desea_lavanderia` bit(1) DEFAULT NULL,
  `desea_roomie` bit(1) DEFAULT NULL,
  `necesita_parqueadero_bicicleta` bit(1) DEFAULT NULL,
  `presupuesto_maximo` double DEFAULT NULL,
  `id_estudiante` binary(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propietario`
--

CREATE TABLE `propietario` (
  `id_propietario` bigint(20) NOT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `id_estado` int(11) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `propietario`
--

INSERT INTO `propietario` (`id_propietario`, `contraseña`, `email`, `nombre`, `telefono`, `id_estado`, `role`) VALUES
(1003687413, '$2a$10$Yy9DoBDFldLwE4Q3I3NwdORB5Ew0WaPsYWfKZanrLCV2C9dP4VMSK', '8ufhl3ajg@mozmail.com', 'cristian ramirez', '3152353171', 3, NULL),
(1003687414, '$2a$10$WDPnW2xoj61vGh4wiFetJ.fKim/AxrmKShMpa0/JG4CE55IGr5joG', 'pipe292011@gmail.com', 'cristian ramirez', '22222', 1, NULL),
(1027150257, '$2a$10$nelUx3gB6wNPJQ.UpRh4Ze16wRZziFHIYMCvBxmZU8rXJM41Ld7Gi', 'sesaso3113@adosnan.com', 'Sergio Fernando Roncancio Carrero', '3004760608', 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recomendaciones`
--

CREATE TABLE `recomendaciones` (
  `id_recomendacion` int(11) NOT NULL,
  `alojamientos_recomendados` text NOT NULL,
  `fecha` date NOT NULL,
  `razon` varchar(255) DEFAULT NULL,
  `visto` tinyint(1) DEFAULT 0,
  `id_estudiante` binary(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id_reserva` int(11) NOT NULL,
  `correo_estudiante` varchar(255) DEFAULT NULL,
  `fecha_fin` datetime(6) DEFAULT NULL,
  `fecha_inicio` datetime(6) DEFAULT NULL,
  `id_alojamiento` int(11) DEFAULT NULL,
  `id_estado` int(11) DEFAULT NULL,
  `id_estudiante` binary(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`id_reserva`, `correo_estudiante`, `fecha_fin`, `fecha_inicio`, `id_alojamiento`, `id_estado`, `id_estudiante`) VALUES
(14, 'sfroncancio71@ucatolica.edu.co', '2024-11-28 19:00:00.000000', '2024-11-07 19:00:00.000000', 9, 1, NULL),
(23, 'sfroncancio71@ucatolica.edu.co', '2025-06-10 19:00:00.000000', '2025-01-10 19:00:00.000000', 1, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `nombre`) VALUES
(0, 'ESTUDIANTE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_alojamiento`
--

CREATE TABLE `tipo_alojamiento` (
  `tipo_alojamientoid` int(11) NOT NULL,
  `nombre_tipo_alojamiento` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_alojamiento`
--

INSERT INTO `tipo_alojamiento` (`tipo_alojamientoid`, `nombre_tipo_alojamiento`) VALUES
(1, 'Habitación'),
(2, 'Apartamentos'),
(3, 'Apartaestudio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `universidad`
--

CREATE TABLE `universidad` (
  `id_universidad` int(11) NOT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `nombre_universidad` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `universidad`
--

INSERT INTO `universidad` (`id_universidad`, `ciudad`, `direccion`, `nombre_universidad`) VALUES
(1, 'Bogotá', 'Av. Caracas #46-72', 'Universidad Católica de Colombia');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alojamiento`
--
ALTER TABLE `alojamiento`
  ADD PRIMARY KEY (`id_alojamiento`),
  ADD KEY `FK3j9tdtdlvxy1oiin4v68blopk` (`id_estado`),
  ADD KEY `FKcmv5pg5sr9sdyjpsxch9lv0vd` (`id_propietario`),
  ADD KEY `FKfvun0jbwohhou631n6asoo89p` (`tipo_alojamientoid`);

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id_comentario`),
  ADD KEY `FKnyxnu0updrcfcx5u3k3sbsan` (`id_alojamiento`),
  ADD KEY `FKofyu3ki2b291n9waqf8qe7i2f` (`id_estudiante`),
  ADD KEY `FKav4ral8wuw010qdje6c22b27g` (`email`);

--
-- Indices de la tabla `comportamiento_de_busqueda`
--
ALTER TABLE `comportamiento_de_busqueda`
  ADD PRIMARY KEY (`id_busqueda`),
  ADD KEY `FK8csj8ybqcjyeoatqt7i4pte7e` (`id_estudiante`);

--
-- Indices de la tabla `estado_estudiante`
--
ALTER TABLE `estado_estudiante`
  ADD PRIMARY KEY (`id_estado_estudiante`);

--
-- Indices de la tabla `estado_habitacion`
--
ALTER TABLE `estado_habitacion`
  ADD PRIMARY KEY (`id_estado_habitacion`);

--
-- Indices de la tabla `estado_propietario`
--
ALTER TABLE `estado_propietario`
  ADD PRIMARY KEY (`id_estado_propietario`);

--
-- Indices de la tabla `estado_reserva`
--
ALTER TABLE `estado_reserva`
  ADD PRIMARY KEY (`id_estado_reserva`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id_estudiante`),
  ADD KEY `FKnljt7ytcyteldf1spng9wo6o5` (`id_estado`),
  ADD KEY `FK2pr7hxn6v3c4mcpxticrk9h4c` (`id_universidad`);

--
-- Indices de la tabla `estudiante_reserva`
--
ALTER TABLE `estudiante_reserva`
  ADD PRIMARY KEY (`id_estudiante`,`id_reserva`),
  ADD KEY `FK4cq2uv3d7jpfmholwh9yo2e6p` (`id_reserva`);

--
-- Indices de la tabla `event_publication`
--
ALTER TABLE `event_publication`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `foto`
--
ALTER TABLE `foto`
  ADD PRIMARY KEY (`id_foto`),
  ADD KEY `FKiurw7yms4x25s71wl3o35512q` (`id_alojamiento`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `FKh69f5igadifyepkjo5kjpa9p2` (`id_estado_anterior`),
  ADD KEY `FKojd3qublfg5ibi7y7h49w9vi5` (`id_estado_nuevo`);

--
-- Indices de la tabla `historial_recomendaciones`
--
ALTER TABLE `historial_recomendaciones`
  ADD PRIMARY KEY (`id_historial_recomendacion`),
  ADD KEY `FKg4fk63iiij0owbf77exg6pd6i` (`id_estudiante`),
  ADD KEY `FKhw71h0gf2wy1i0341wvjxfv22` (`id_recomendacion`);

--
-- Indices de la tabla `preferencia_estudiante`
--
ALTER TABLE `preferencia_estudiante`
  ADD PRIMARY KEY (`id_preferencia`),
  ADD KEY `FKh2mu8eos2dlvlq0xttr4hy03r` (`id_estudiante`);

--
-- Indices de la tabla `propietario`
--
ALTER TABLE `propietario`
  ADD PRIMARY KEY (`id_propietario`),
  ADD KEY `FK4jd0utw6kaj6hlu4k150ohxaa` (`id_estado`);

--
-- Indices de la tabla `recomendaciones`
--
ALTER TABLE `recomendaciones`
  ADD PRIMARY KEY (`id_recomendacion`),
  ADD KEY `FKqitgy2qiuq41dgxexv1lg8ytj` (`id_estudiante`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `FK8w7sgdqp0knoixh384avjsvme` (`id_alojamiento`),
  ADD KEY `FKqgocme87g8s6itaw80cvfwmu3` (`id_estado`),
  ADD KEY `FKm1pecdg7ep2a25x5449ir9n4x` (`id_estudiante`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_alojamiento`
--
ALTER TABLE `tipo_alojamiento`
  ADD PRIMARY KEY (`tipo_alojamientoid`);

--
-- Indices de la tabla `universidad`
--
ALTER TABLE `universidad`
  ADD PRIMARY KEY (`id_universidad`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alojamiento`
--
ALTER TABLE `alojamiento`
  MODIFY `id_alojamiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `comportamiento_de_busqueda`
--
ALTER TABLE `comportamiento_de_busqueda`
  MODIFY `id_busqueda` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado_estudiante`
--
ALTER TABLE `estado_estudiante`
  MODIFY `id_estado_estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estado_habitacion`
--
ALTER TABLE `estado_habitacion`
  MODIFY `id_estado_habitacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estado_reserva`
--
ALTER TABLE `estado_reserva`
  MODIFY `id_estado_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `foto`
--
ALTER TABLE `foto`
  MODIFY `id_foto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial_recomendaciones`
--
ALTER TABLE `historial_recomendaciones`
  MODIFY `id_historial_recomendacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `preferencia_estudiante`
--
ALTER TABLE `preferencia_estudiante`
  MODIFY `id_preferencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `recomendaciones`
--
ALTER TABLE `recomendaciones`
  MODIFY `id_recomendacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alojamiento`
--
ALTER TABLE `alojamiento`
  ADD CONSTRAINT `FK3j9tdtdlvxy1oiin4v68blopk` FOREIGN KEY (`id_estado`) REFERENCES `estado_habitacion` (`id_estado_habitacion`),
  ADD CONSTRAINT `FKcmv5pg5sr9sdyjpsxch9lv0vd` FOREIGN KEY (`id_propietario`) REFERENCES `propietario` (`id_propietario`),
  ADD CONSTRAINT `FKfvun0jbwohhou631n6asoo89p` FOREIGN KEY (`tipo_alojamientoid`) REFERENCES `tipo_alojamiento` (`tipo_alojamientoid`);

--
-- Filtros para la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `FKav4ral8wuw010qdje6c22b27g` FOREIGN KEY (`email`) REFERENCES `estudiante` (`id_estudiante`),
  ADD CONSTRAINT `FKnyxnu0updrcfcx5u3k3sbsan` FOREIGN KEY (`id_alojamiento`) REFERENCES `alojamiento` (`id_alojamiento`),
  ADD CONSTRAINT `FKofyu3ki2b291n9waqf8qe7i2f` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id_estudiante`);

--
-- Filtros para la tabla `comportamiento_de_busqueda`
--
ALTER TABLE `comportamiento_de_busqueda`
  ADD CONSTRAINT `FK8csj8ybqcjyeoatqt7i4pte7e` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id_estudiante`);

--
-- Filtros para la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD CONSTRAINT `FK2pr7hxn6v3c4mcpxticrk9h4c` FOREIGN KEY (`id_universidad`) REFERENCES `universidad` (`id_universidad`),
  ADD CONSTRAINT `FKnljt7ytcyteldf1spng9wo6o5` FOREIGN KEY (`id_estado`) REFERENCES `estado_estudiante` (`id_estado_estudiante`);

--
-- Filtros para la tabla `estudiante_reserva`
--
ALTER TABLE `estudiante_reserva`
  ADD CONSTRAINT `FK4cq2uv3d7jpfmholwh9yo2e6p` FOREIGN KEY (`id_reserva`) REFERENCES `reserva` (`id_reserva`);

--
-- Filtros para la tabla `foto`
--
ALTER TABLE `foto`
  ADD CONSTRAINT `FKiurw7yms4x25s71wl3o35512q` FOREIGN KEY (`id_alojamiento`) REFERENCES `alojamiento` (`id_alojamiento`);

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `FKh69f5igadifyepkjo5kjpa9p2` FOREIGN KEY (`id_estado_anterior`) REFERENCES `estado_estudiante` (`id_estado_estudiante`),
  ADD CONSTRAINT `FKojd3qublfg5ibi7y7h49w9vi5` FOREIGN KEY (`id_estado_nuevo`) REFERENCES `estado_estudiante` (`id_estado_estudiante`);

--
-- Filtros para la tabla `historial_recomendaciones`
--
ALTER TABLE `historial_recomendaciones`
  ADD CONSTRAINT `FKg4fk63iiij0owbf77exg6pd6i` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id_estudiante`),
  ADD CONSTRAINT `FKhw71h0gf2wy1i0341wvjxfv22` FOREIGN KEY (`id_recomendacion`) REFERENCES `recomendaciones` (`id_recomendacion`);

--
-- Filtros para la tabla `preferencia_estudiante`
--
ALTER TABLE `preferencia_estudiante`
  ADD CONSTRAINT `FKh2mu8eos2dlvlq0xttr4hy03r` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id_estudiante`);

--
-- Filtros para la tabla `propietario`
--
ALTER TABLE `propietario`
  ADD CONSTRAINT `FK4jd0utw6kaj6hlu4k150ohxaa` FOREIGN KEY (`id_estado`) REFERENCES `estado_propietario` (`id_estado_propietario`);

--
-- Filtros para la tabla `recomendaciones`
--
ALTER TABLE `recomendaciones`
  ADD CONSTRAINT `FKqitgy2qiuq41dgxexv1lg8ytj` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id_estudiante`);

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `FK8w7sgdqp0knoixh384avjsvme` FOREIGN KEY (`id_alojamiento`) REFERENCES `alojamiento` (`id_alojamiento`),
  ADD CONSTRAINT `FKm1pecdg7ep2a25x5449ir9n4x` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id_estudiante`),
  ADD CONSTRAINT `FKqgocme87g8s6itaw80cvfwmu3` FOREIGN KEY (`id_estado`) REFERENCES `estado_reserva` (`id_estado_reserva`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
