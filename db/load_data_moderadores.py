import pandas as pd
import re
import json

excel_file = './db/moderadores.xlsx'
df = pd.read_excel(excel_file)

 #   _____      _                                 
 #  / ____|    | |                                
 # | |     ___ | |_   _ _ __ ___  _ __   __ _ ___ 
 # | |    / _ \| | | | | '_ ` _ \| '_ \ / _` / __|
 # | |___| (_) | | |_| | | | | | | | | | (_| \__ \
 #  \_____\___/|_|\__,_|_| |_| |_|_| |_|\__,_|___/

PAIS_data = df["País"]
INSTITUCION_data= df["Institución"]
MODALIDAD_data = df["Modalidad"]
AREA_data = df["Área"]
ID_MOD_data = df["ID_Mod"]
MODERADOR_data = df["Moderador"]
SEXO_data = df["Sexo"]
CORREO_data = df["Correo"]
CELULAR_data = df["Celular"]
SALA_data = df["Sala"]
CORREO_ALTERNATIVO_data = df["correo alternativo"]
SALA2_data = df["sala 2"]



 #                               _           
 #     /\                       | |          
 #    /  \   _ __ _ __ ___  __ _| | ___  ___ 
 #   / /\ \ | '__| '__/ _ \/ _` | |/ _ \/ __|
 #  / ____ \| |  | | |  __/ (_| | | (_) \__ \
 # /_/    \_\_|  |_|  \___|\__, |_|\___/|___/
 #                          __/ |            
 #                         |___/             
PAIS = []
INSTITUCION = []
MODALIDAD = []
AREA = []
RAMA = []
ID_MOD = []
MODERADOR = []
SEXO = []
CORREO = []
CELULAR = []
SALA = []
CORREO_ALTERNATIVO = []
SALA2 = []

 #  ______                _                       
 # |  ____|              (_)                      
 # | |__ _   _ _ __   ___ _  ___  _ __   ___  ___ 
 # |  __| | | | '_ \ / __| |/ _ \| '_ \ / _ \/ __|
 # | |  | |_| | | | | (__| | (_) | | | |  __/\__ \
 # |_|   \__,_|_| |_|\___|_|\___/|_| |_|\___||___/
 #                                                
 
def separar_opciones(cadena):
    parts = re.split(r',|\s{1}y\s{1}', cadena)
    result = [part.strip() for part in parts if part.strip()]
    return result

def limpiar_numero(celular):
    # Eliminar cualquier carácter que no sea un dígito
    solo_digitos = re.sub(r'\D', '', str(celular))
    
    # Tomar solo los primeros 10 dígitos
    return solo_digitos[-10:]

def Creacion_Archivo_SQL(data_en_conjunto, n, output_file):

    fields_to_print_in_order = [
        "Pais", "Institucion", "Modalidad", "Area", "Rama", "ID_Mod",
        "Moderador", "Sexo", "Correo", "Celular", "Sala", "Correo_Alternativo", "Sala2"
    ]

    sql_template = "INSERT INTO MODERADORES ({}) VALUES ({});"

    with open(output_file, "w", encoding="utf-8") as file:
        for i in range(n):
            values = []

            for field in fields_to_print_in_order:
                if field in data_en_conjunto:
                    value = data_en_conjunto[field]
                    if isinstance(value, list):
                        values.append(f"'{json.dumps(value[i], ensure_ascii=False)}'")
                    else:
                        values.append(f"'{value}'")

            sql_statement = sql_template.format(", ".join(fields_to_print_in_order), ", ".join(values))

            file.write(sql_statement)
            file.write("\n")


 #  pais

for field in PAIS_data:
    PAIS.append(field)

#  institucion

for field in INSTITUCION_data:
    INSTITUCION.append(field)

 #  modalidad

for field in MODALIDAD_data:
    MODALIDAD.append(field)


#  area y rama
for column in AREA_data:
    split_column = column.split(":")
    split_ramas = separar_opciones(split_column[1])
    AREA.append(split_column[0])
    RAMA.append(split_ramas)


# id_mod
for field in ID_MOD_data:
    ID_MOD.append(field)


 #  moderador

for field in MODERADOR_data:
    MODERADOR.append(field)

 # sexo                                               

for field in SEXO_data:
    SEXO.append(field)

 #  correo
for field in CORREO_data:
    CORREO.append(field)
    
 #  celular                   
for field in CELULAR_data:
    cleaned_celular = limpiar_numero(field)
    CELULAR.append(cleaned_celular)

 #  sala                                           

for field in SALA_data:
    SALA.append(field)

  #  correo alternativo
for field in CORREO_ALTERNATIVO_data:
    CORREO_ALTERNATIVO.append(field)
    
 #  sala 2                                          

for field in SALA2_data:
    SALA2.append(field)
 #                                    _             _                          _     _            
 #     /\                            | |           | |          /\            | |   (_)           
 #    /  \   _ __ _ __ ___   __ _  __| | ___     __| | ___     /  \   _ __ ___| |__  ___   _____  
 #   / /\ \ | '__| '_ ` _ \ / _` |/ _` |/ _ \   / _` |/ _ \   / /\ \ | '__/ __| '_ \| \ \ / / _ \ 
 #  / ____ \| |  | | | | | | (_| | (_| | (_) | | (_| |  __/  / ____ \| | | (__| | | | |\ V / (_) |
 # /_/    \_\_|  |_| |_| |_|\__,_|\__,_|\___/   \__,_|\___| /_/    \_\_|  \___|_| |_|_| \_/ \___/ 
 #                                                                                                
                                                                                                

data_en_conjunto = {
        "Pais":PAIS ,
        "Institucion":INSTITUCION,
        "Modalidad":MODALIDAD ,
        "Area":AREA ,
        "Rama":RAMA ,
        "ID_Mod":ID_MOD ,
        "Moderador":MODERADOR ,
        "Sexo":SEXO ,
        "Correo":CORREO ,
        "Celular":CELULAR ,
        "Sala":SALA ,
        "Correo_Alternativo":CORREO_ALTERNATIVO ,
        "Sala2":SALA2
}


output_file = "output_mods.sql"
Creacion_Archivo_SQL(data_en_conjunto, 100, output_file)
