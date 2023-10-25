docker run -d --name **nombre del contenedor** -v "orígen local":"Orígen en contenedor"  alvirelwapo/proyecto_salas_bdd
                                                    #SIN COMILLAS; SOLO LAS USO PARA EJEMPLIFICAR
docker image ls 
docker container ls 


#Acceder a la shell de mariadb
docker exec -ti **nombre contenedor** bash

#Contraseña root contenedor por default: 6327

#Después de su creación, el estado de éste se guarda, debemos activarlo con:
docker container start **nombre del contenedor** 






