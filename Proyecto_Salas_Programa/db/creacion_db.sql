--//////////////////////////////////////////////////////////--
--∙∙·▫▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ 𝘾𝙍𝙀𝘼𝘾𝙄Ó𝙉 𝘿𝙀 𝘽𝘿𝘿 ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫▫·∙∙--
--//////////////////////////////////////////////////////////--

DROP DATABASE SALAS_DB;
CREATE DATABASE IF NOT EXISTS SALAS_DB; 
USE SALAS_DB;
--//////////////////////////////////////////////////////////--
-- ♪ღ♪*•.¸¸.•*¨¨*•.♪ ℂℝ𝔼𝔸ℂ𝕀Óℕ 𝔻𝔼 𝕋𝔸𝔹𝕃𝔸𝕊 ♪ღ♪*•.¸¸.•*¨¨*•.♪ღ♪ --
--//////////////////////////////////////////////////////////--

CREATE TABLE USUARIO 
(
  usuario_id INT AUTO_INCREMENT PRIMARY KEY,
  tipo_usuario ENUM('alumno', 'ponente', 'administrador') NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  nombre_completo VARCHAR(100) NOT NULL,
  nombre_usuario VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE SALA 
(
  id_Sala INT AUTO_INCREMENT PRIMARY KEY,
  Ubicacion_Fisica VARCHAR(3),
  Cupo INT
);

CREATE TABLE PONENCIA 
(
  id_Ponencia INT AUTO_INCREMENT PRIMARY KEY,
  id_Ponente INT, 
  id_Sala INT,
  Horario DATETIME,
  FOREIGN KEY (id_Sala) REFERENCES SALA(id_Sala),
  FOREIGN KEY (id_Ponente) REFERENCES USUARIO(usuario_id)
);

CREATE TABLE USUARIO_PONENCIA 
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_Usuario INT,
  id_Ponencia INT,
  FOREIGN KEY (id_Usuario) REFERENCES USUARIO(usuario_id),
  FOREIGN KEY (id_Ponencia) REFERENCES PONENCIA(id_Ponencia)
);

CREATE TABLE REGISTRO 
(
  id_ponencia INT,
  id_alumno INT,
  asistencia BOOLEAN,
  FOREIGN KEY (id_ponencia) REFERENCES PONENCIA(id_Ponencia),
  FOREIGN KEY (id_alumno) REFERENCES USUARIO(usuario_id)
);

--//////////////////////////////////////////////////////////--
--∙∙·▫▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ ADICIÓN DE OBJETOS TEMPORALES ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫▫·∙∙--
--//////////////////////////////////////////////////////////--

