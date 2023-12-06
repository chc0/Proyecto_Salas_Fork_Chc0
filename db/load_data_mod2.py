import pandas as pd
import re
import json
import math

excel_file = './ModeradoresPRB.xlsx'
df = pd.read_excel(excel_file)

 #   _____      _                                 
 #  / ____|    | |                                
 # | |     ___ | |_   _ _ __ ___  _ __   __ _ ___ 
 # | |    / _ \| | | | | '_ ` _ \| '_ \ / _` / __|
 # | |___| (_) | | |_| | | | | | | | | | (_| \__ \
 #  \_____\___/|_|\__,_|_| |_| |_|_| |_|\__,_|___/

ID_MOD_data = df["ID_Mod"]
PAIS_data = df["País"]
INSTITUCION_data= df["Institución"]
TIPO_data = df["Tipo"]
AREA_DESEADA_data = df["Area_Deseada"]
AREA_ALTERNATIVA_data = df["Area_Alternativa"]
MODERADOR_data = df["Moderador"]
SEXO_data = df["Sexo"]
CORREO_data = df["Correo"]
CELULAR_data = df["Celular"]



 #                               _           
 #     /\                       | |          
 #    /  \   _ __ _ __ ___  __ _| | ___  ___ 
 #   / /\ \ | '__| '__/ _ \/ _` | |/ _ \/ __|
 #  / ____ \| |  | | |  __/ (_| | | (_) \__ \
 # /_/    \_\_|  |_|  \___|\__, |_|\___/|___/
 #                          __/ |            
 #                         |___/             
ID_MOD = []
PAIS = []
INSTITUCION = []
TIPO = []
AREA_DESEADA = []
AREA_ALTERNATIVA = []
MODERADOR = []
SEXO = []
CORREO = []
CELULAR = []

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
        "ID_Mod", "Pais", "Institucion", "Tipo", "Area_Deseada", "Area_Alternativa",
        "Nombre", "Sexo", "Correo", "Celular"
    ]

    sql_template = "INSERT INTO MODERADORES2 ({}) VALUES ({});"

    with open(output_file, "w", encoding="utf-8") as file:
        for i in range(n):
            values = []

            for field in fields_to_print_in_order:
                if field in data_en_conjunto:
                    value = data_en_conjunto[field]
                    if isinstance(value, list):
                        values.append(json.dumps(value[i], ensure_ascii=False))
                    else:
                        values.append(str(value))  

            sql_statement = sql_template.format(", ".join(fields_to_print_in_order), ", ".join(values))

            file.write(sql_statement + "\n")


# Calcular el mayor ID_Mod existente
max_existing_id_mod = df["ID_Mod"].max()


# id_mod
for field in ID_MOD_data:
    if math.isnan(field):
        max_existing_id_mod += 1
        formatted_field = int(max_existing_id_mod)
    else:
        formatted_field = int(field)
    ID_MOD.append(formatted_field)


 #  pais
for field in PAIS_data:
    PAIS.append(field)


#  institucion
for field in INSTITUCION_data:
    INSTITUCION.append(field)


 #  tipo
for field in TIPO_data:
    TIPO.append(field)


#  area deseada
for field in AREA_DESEADA_data:
    AREA_DESEADA.append(field)


#  area alternativa
for field in AREA_ALTERNATIVA_data:
    AREA_ALTERNATIVA.append(field)


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


 #                                    _             _                          _     _            
 #     /\                            | |           | |          /\            | |   (_)           
 #    /  \   _ __ _ __ ___   __ _  __| | ___     __| | ___     /  \   _ __ ___| |__  ___   _____  
 #   / /\ \ | '__| '_ ` _ \ / _` |/ _` |/ _ \   / _` |/ _ \   / /\ \ | '__/ __| '_ \| \ \ / / _ \ 
 #  / ____ \| |  | | | | | | (_| | (_| | (_) | | (_| |  __/  / ____ \| | | (__| | | | |\ V / (_) |
 # /_/    \_\_|  |_| |_| |_|\__,_|\__,_|\___/   \__,_|\___| /_/    \_\_|  \___|_| |_|_| \_/ \___/ 
 #                                                                                                
                                                                                                

data_en_conjunto = {
        "ID_Mod":ID_MOD ,
        "Pais":PAIS ,
        "Institucion":INSTITUCION,
        "Tipo":TIPO ,
        "Area_Deseada":AREA_DESEADA ,
        "Area_Alternativa":AREA_ALTERNATIVA ,
        "Nombre":MODERADOR ,
        "Sexo":SEXO ,
        "Correo":CORREO ,
        "Celular":CELULAR 
}


output_file = "output_mod2.sql"
Creacion_Archivo_SQL(data_en_conjunto, 215, output_file)
