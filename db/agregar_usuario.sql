INSERT INTO USUARIO 
(
    tipo_usuario, 
    password_hash, 
    email, 
    nombre_completo, 
    nombre_usuario
) 
VALUES
(
    'ponente', 
    '$argon2id$v=19$m=65536,t=3,p=4$aN8YuM77cVEbZQma6CmviA$GSSG4wqt5FKNiINs19ZVnUiMteJNtIpXjuEe0HfkcK4', 
    'alvirelwapo@alvir.com', 
    'Andrés Alvir Guzmán',
    'AlvirElWapo'
);

