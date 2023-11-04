--//////////////////////////////////////////////////////////--
--∙∙·▫▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ 𝘾𝙍𝙀𝘼𝘾𝙄Ó𝙉 𝘿𝙀 𝘽𝘿𝘿 ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫▫·∙∙--
--//////////////////////////////////////////////////////////--

DROP DATABASE SALAS_DB;
CREATE DATABASE IF NOT EXISTS SALAS_DB; 
USE SALAS_DB;
--//////////////////////////////////////////////////////////--
-- ♪ღ♪*•.¸¸.•*¨¨*•.♪ ℂℝ𝔼𝔸ℂ𝕀Óℕ 𝔻𝔼 𝕋𝔸𝔹𝕃𝔸𝕊 ♪ღ♪*•.¸¸.•*¨¨*•.♪ღ♪ --
--//////////////////////////////////////////////////////////--

CREATE TABLE IF NOT EXISTS USUARIO 
(
  usuario_id INT AUTO_INCREMENT PRIMARY KEY,
  tipo_usuario ENUM('alumno', 'ponente', 'administrador') NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  nombre_completo VARCHAR(100) NOT NULL,
  nombre_usuario VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS SALA 
(
  id_Sala INT AUTO_INCREMENT PRIMARY KEY,
  Ubicacion_Fisica VARCHAR(3),
  Cupo INT
);

CREATE TABLE IF NOT EXISTS PONENCIAS(
    ID_Tra VARCHAR(5),
    Area TEXT,
    Rama JSON,
    Linea TEXT,
    Compartido VARCHAR(2),
    NoPonentes INT,
    Titulo TEXT,
    ID_Pons JSON,
    Ponentes JSON,
    Instituciones JSON,
    Investigador VARCHAR(255),
    Fecha DATE,
    Dia VARCHAR(20),
    Turno VARCHAR(20),
    Bloque TEXT,
    Salon TEXT,
    Ubicacion TEXT,
    Sede TEXT
);

--//////////////////////////////////////////////////////////--
--∙∙·▫▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ ADICIÓN DE OBJETOS TEMPORALES ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫▫·∙∙--
--//////////////////////////////////////////////////////////--


