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
  tipo_usuario ENUM('moderador', 'administrador') NOT NULL,
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
    Sede TEXT,
    Asistencia JSON DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS MODERADORES (
    Pais TEXT,
    Institucion TEXT,
    Modalidad TEXT,
    Area TEXT,
    Rama JSON,
    ID_Mod VARCHAR(5),
    Moderador TEXT,
    Sexo TEXT,
    Correo TEXT,
    Celular TEXT,
    Sala TEXT,
    Correo_Alternativo TEXT,
    Sala2 TEXT,
    Asistencia VARCHAR(2) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS Usuarios (
    ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Correo VARCHAR(100) NOT NULL UNIQUE,
    Contrasenia VARCHAR(255) NOT NULL,
    Rol ENUM('moderador', 'auxiliar', 'coordinador', 'administrador') NOT NULL
);


CREATE TABLE IF NOT EXISTS MODERADORES2 (
    ID_Mod INT AUTO_INCREMENT PRIMARY KEY,
    Pais TEXT,
    Institucion TEXT,
    Tipo TEXT,
    Area_Deseada TEXT,
    Area_Alternativa TEXT,
    Nombre TEXT,
    Sexo TEXT,
    Correo TEXT,
    Celular TEXT,
    Asistencia JSON DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS PONENCIAS2(
    ID_Pon INT AUTO_INCREMENT PRIMARY KEY,
    Area TEXT,
    Campo TEXT,
    Disciplina TEXT,
    Titulo TEXT,
    Compartido VARCHAR(4),
    NoPonentes INT,
    ID_Pons JSON,
    Ponentes JSON,
    Instituciones JSON
    Asistencia JSON DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS SALAS2(
    ID_Sala INT AUTO_INCREMENT PRIMARY KEY,
    Edificio TEXT,
    Salon TEXT,
    Fecha DATE,
    Dia VARCHAR(20),
    Turno VARCHAR(20),
    Horario TEXT,
    Estado TEXT,
    Cambios Boolean,
);

CREATE TABLE IF NOT EXISTS SALA_PONENCIAS (
  ID_SalaPon INT PRIMARY KEY AUTO_INCREMENT,
  ID_Sala INT,
  ID_Ponencia INT,
  FOREIGN KEY (ID_Sala) REFERENCES SALAS2(ID_Sala),
  FOREIGN KEY (ID_Ponencia) REFERENCES PONENCIAS2(ID_Pon)
);

CREATE TABLE IF NOT EXISTS SALAS_MODERADORES (
    ID_SalaMod INT AUTO_INCREMENT PRIMARY KEY,
    ID_Sala INT,
    ID_Mod INT,
    FOREIGN KEY (ID_Sala) REFERENCES SALAS2(ID_Sala),
    FOREIGN KEY (ID_Mod) REFERENCES MODERADORES2(ID_Mod)
);

CREATE TABLE parametros (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre_parametro VARCHAR(255) NOT NULL,
  valor_parametro INT NOT NULL
);

INSERT INTO parametros (nombre_parametro, valor_parametro) VALUES
  ('numero_edificios', 3),
  ('salas_por_edificio', 10),
  ('capacidad_sala', 26),
  ('minutos_ponencia', 10),
  ('minutos_bloque', 60),
  ('numero_minimo_bloque_sala', 3),
  ('numero_minimo_ponencias_sala', 15),
  ('minutos_asistencia_valida_ponencia', 3);


CREATE TABLE Areas (
    AreaID INT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL
);

CREATE TABLE Campos (
    CampoID INT PRIMARY KEY,
    AreaID INT,
    Nombre VARCHAR(255) NOT NULL,
    FOREIGN KEY (AreaID) REFERENCES Areas(AreaID)
);

CREATE TABLE Disciplinas (
    DisciplinaID INT PRIMARY KEY,
    CampoID INT,
    Nombre VARCHAR(255) NOT NULL,
    FOREIGN KEY (CampoID) REFERENCES Campos(CampoID)
);



--//////////////////////////////////////////////////////////--
--∙∙·▫▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ  CREACION DE VISTAS  ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫▫·∙∙--
--//////////////////////////////////////////////////////////--

CREATE VIEW Ring_Graph AS
SELECT AREA, COUNT(AREA) AS NoDeAreas 
FROM PONENCIAS GROUP BY AREA;

CREATE VIEW RG_Fechas AS
SELECT Dia, COUNT(Dia) AS NoDias
FROM PONENCIAS 
GROUP BY Dia;

CREATE VIEW TABLA_USUARIOS AS 
SELECT ID_Tra ,NoPonentes,Ponentes,ID_Pons FROM PONENCIAS;

CREATE VIEW RG_x_Sedes AS 
SELECT SEDE, COUNT(SEDE) AS NoDeSedes 
FROM PONENCIAS GROUP BY SEDE; 

CREATE VIEW USUARIOS_POR_SALAS AS 
SELECT ID_Tra, NoPonentes, Ponentes, ID_Pons, Salon FROM PONENCIAS;

--//////////////////////////////////////////////////////////--
--∙∙·▫▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ ADICIÓN DE OBJETOS TEMPORALES ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫▫·∙∙--
--//////////////////////////////////////////////////////////--


