-- ============================================
-- SISTEMA DE GESTIÓN DE CONTACTOS (LEADS TRACKER)
-- Base de Datos: eads_db
-- ============================================

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS eads_db;

-- Usar la base de datos
USE eads_db;

-- ============================================
-- TABLA: LEADS
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    interes VARCHAR(50) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_fecha (fecha_registro)
);

-- ============================================
-- OPERACIONES CRUD
-- ============================================

-- CREATE: Insertar un nuevo lead
-- INSERT INTO leads (nombre, email, telefono, interes) 
-- VALUES ('Juan Pérez', 'juan@ejemplo.com', '+34 123 456 789', 'Consultoría');

-- READ: Seleccionar todos los leads
SELECT * FROM leads;

-- READ: Seleccionar leads por interés
-- SELECT * FROM leads WHERE interes = 'Consultoría';

-- READ: Seleccionar leads registrados en los últimos 7 días
-- SELECT * FROM leads WHERE fecha_registro >= DATE_SUB(NOW(), INTERVAL 7 DAY) ORDER BY fecha_registro DESC;

-- READ: Contar total de leads
-- SELECT COUNT(*) as total_leads FROM leads;

-- READ: Seleccionar un lead específico por email
-- SELECT * FROM leads WHERE email = 'juan@ejemplo.com';

-- UPDATE: Actualizar información de un lead
-- UPDATE leads SET nombre = 'Juan Carlos Pérez', telefono = '+34 987 654 321' 
-- WHERE email = 'juan@ejemplo.com';

-- UPDATE: Cambiar el interés de un lead
-- UPDATE leads SET interes = 'Desarrollo' 
-- WHERE id = 1;

-- DELETE: Eliminar un lead específico
-- DELETE FROM leads WHERE email = 'juan@ejemplo.com';

-- DELETE: Eliminar leads más antiguos de 30 días
-- DELETE FROM leads WHERE fecha_registro < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- ============================================
-- CONSULTAS ÚTILES
-- ============================================

-- Agrupar leads por tipo de interés
-- SELECT interes, COUNT(*) as cantidad FROM leads GROUP BY interes;

-- Leads más recientes (últimos 10)
-- SELECT * FROM leads ORDER BY fecha_registro DESC LIMIT 10;

-- Búsqueda de leads por nombre (contiene)
-- SELECT * FROM leads WHERE nombre LIKE '%Juan%' ORDER BY fecha_registro DESC;

-- Verificar estructura de la tabla
-- DESCRIBE leads;

-- ============================================
-- FIN DEL SCRIPT
-- ============================================
