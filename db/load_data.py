import pandas as pd
from datetime import datetime
import re
import json

ponencias_documento = './Programa_Delfín_bdd.xlsx'
df = pd.read_excel(ponencias_documento)

 #   _____      _                                 
 #  / ____|    | |                                
 # | |     ___ | |_   _ _ __ ___  _ __   __ _ ___ 
 # | |    / _ \| | | | | '_ ` _ \| '_ \ / _` / __|
 # | |___| (_) | | |_| | | | | | | | | | (_| \__ \
 #  \_____\___/|_|\__,_|_| |_| |_|_| |_|\__,_|___/

#  /$$$$$$$                                                   /$$                    
# | $$__  $$                                                 |__/                    
# | $$  \ $$ /$$$$$$  /$$$$$$$   /$$$$$$  /$$$$$$$   /$$$$$$$ /$$  /$$$$$$   /$$$$$$$
# | $$$$$$$//$$__  $$| $$__  $$ /$$__  $$| $$__  $$ /$$_____/| $$ |____  $$ /$$_____/
# | $$____/| $$  \ $$| $$  \ $$| $$$$$$$$| $$  \ $$| $$      | $$  /$$$$$$$|  $$$$$$ 
# | $$     | $$  | $$| $$  | $$| $$_____/| $$  | $$| $$      | $$ /$$__  $$ \____  $$
# | $$     |  $$$$$$/| $$  | $$|  $$$$$$$| $$  | $$|  $$$$$$$| $$|  $$$$$$$ /$$$$$$$/
# |__/      \______/ |__/  |__/ \_______/|__/  |__/ \_______/|__/ \_______/|_______/ 
#                                                                                    
ID_TRA_data = df["ID_Tra"]
AREA_data= df["Area"]
LINEA_data = df["Linea"]
COMPARTIDO_data = df["Compartido"]
NO_PONENTES_data = df["NoPonentes"]
TITULO_data = df["Titulo"]
ID_PONENTES_data = df["ID_Pon(s)"]
NOMBRE_PONENTES_data = df["Ponente(s)"]
INSTITUCIONES_data = df["Institucion(es)"]
INVESTIGADOR_data = df["Investigador"]
FECHA_data = df["Fecha"]
DIA_data = df["Dia"]
TURNO_data = df["Turno"]
BLOQUE_data = df["Bloque"]
SALON_data = df["Salon"]
UBICACION_data = df["Ubicacion"]
SEDE_data = df["Sede"]

#  /$$      /$$                 /$$                                    /$$                                        
# | $$$    /$$$                | $$                                   | $$                                        
# | $$$$  /$$$$  /$$$$$$   /$$$$$$$  /$$$$$$   /$$$$$$  /$$$$$$   /$$$$$$$  /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$$
# | $$ $$/$$ $$ /$$__  $$ /$$__  $$ /$$__  $$ /$$__  $$|____  $$ /$$__  $$ /$$__  $$ /$$__  $$ /$$__  $$ /$$_____/
# | $$  $$$| $$| $$  \ $$| $$  | $$| $$$$$$$$| $$  \__/ /$$$$$$$| $$  | $$| $$  \ $$| $$  \__/| $$$$$$$$|  $$$$$$ 
# | $$\  $ | $$| $$  | $$| $$  | $$| $$_____/| $$      /$$__  $$| $$  | $$| $$  | $$| $$      | $$_____/ \____  $$
# | $$ \/  | $$|  $$$$$$/|  $$$$$$$|  $$$$$$$| $$     |  $$$$$$$|  $$$$$$$|  $$$$$$/| $$      |  $$$$$$$ /$$$$$$$/
# |__/     |__/ \______/  \_______/ \_______/|__/      \_______/ \_______/ \______/ |__/       \_______/|_______/ 
#                                                                                                                 

# PAIS_data = df["País"]
# INSTITUCION_data = df["Institución"]
# MODALIDAD_data = df["Modalidad"]
# AREA_data = df["Área"]
# ID_MOD_data = df["ID_Mod"]
# MODERADOR_data = df["Moderador"]
# SEXO_data = df["Sexo"]
# CORREO_data = df["Correo"]
# CELULAR_data = df["Celular"]
# SALA_data = df["Sala"]
#
 #                               _           
 #     /\                       | |          
 #    /  \   _ __ _ __ ___  __ _| | ___  ___ 
 #   / /\ \ | '__| '__/ _ \/ _` | |/ _ \/ __|
 #  / ____ \| |  | | |  __/ (_| | | (_) \__ \
 # /_/    \_\_|  |_|  \___|\__, |_|\___/|___/
 #                          __/ |            
 #                         |___/             

#  /$$$$$$$                                                   /$$                    
# | $$__  $$                                                 |__/                    
# | $$  \ $$ /$$$$$$  /$$$$$$$   /$$$$$$  /$$$$$$$   /$$$$$$$ /$$  /$$$$$$   /$$$$$$$
# | $$$$$$$//$$__  $$| $$__  $$ /$$__  $$| $$__  $$ /$$_____/| $$ |____  $$ /$$_____/
# | $$____/| $$  \ $$| $$  \ $$| $$$$$$$$| $$  \ $$| $$      | $$  /$$$$$$$|  $$$$$$ 
# | $$     | $$  | $$| $$  | $$| $$_____/| $$  | $$| $$      | $$ /$$__  $$ \____  $$
# | $$     |  $$$$$$/| $$  | $$|  $$$$$$$| $$  | $$|  $$$$$$$| $$|  $$$$$$$ /$$$$$$$/
# |__/      \______/ |__/  |__/ \_______/|__/  |__/ \_______/|__/ \_______/|_______/ 
#                                                                                    

ID_TRA = []
AREA = []
RAMA = []
LINEA = []
COMPARTIDO = []
NO_PONENTES = []
TITULO = []
ID_PONENTES = []
NOMBRE_PONENTES = []
INSTITUCIONES = []
INVESTIGADOR = []
FECHA = []
DIA = []
TURNO = []
BLOQUE = [] 
SALON = [] 
UBICACION = [] 
SEDE = [] 

#  /$$      /$$                 /$$                                    /$$                                        
# | $$$    /$$$                | $$                                   | $$                                        
# | $$$$  /$$$$  /$$$$$$   /$$$$$$$  /$$$$$$   /$$$$$$  /$$$$$$   /$$$$$$$  /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$$
# | $$ $$/$$ $$ /$$__  $$ /$$__  $$ /$$__  $$ /$$__  $$|____  $$ /$$__  $$ /$$__  $$ /$$__  $$ /$$__  $$ /$$_____/
# | $$  $$$| $$| $$  \ $$| $$  | $$| $$$$$$$$| $$  \__/ /$$$$$$$| $$  | $$| $$  \ $$| $$  \__/| $$$$$$$$|  $$$$$$ 
# | $$\  $ | $$| $$  | $$| $$  | $$| $$_____/| $$      /$$__  $$| $$  | $$| $$  | $$| $$      | $$_____/ \____  $$
# | $$ \/  | $$|  $$$$$$/|  $$$$$$$|  $$$$$$$| $$     |  $$$$$$$|  $$$$$$$|  $$$$$$/| $$      |  $$$$$$$ /$$$$$$$/
# |__/     |__/ \______/  \_______/ \_______/|__/      \_______/ \_______/ \______/ |__/       \_______/|_______/ 
#                                                                                                                 

PAIS = []
INSTITUCION = []
MODALIDAD = []
AREA = []
ID_MOD = []
MODERADOR = []
SEXO = []
CORREO = []
CELULAR = []
SALA = []
#Correo Alternativo
#Sala 2


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

def separar_instituciones(cadena):
    return re.split(r'[,]', cadena)


import json

def Creacion_Archivo_SQL(data_en_conjunto, n, output_file):
    fields_to_print_in_order = [
        "ID_Tra",
        "Area",
        "Rama",
        "Linea",
        "Compartido",
        "NoPonentes",
        "Titulo",        
        "ID_Pons",
        "Ponentes",
        "Instituciones",
        "Investigador",
        "Fecha",
        "Dia",
        "Turno",
        "Bloque",
        "Salon",
        "Ubicacion",
        "Sede"]

    sql_template = "INSERT INTO PONENCIAS ({}) VALUES ({});"

    with open(output_file, "w") as file:
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


 #  _____ _____ _______        
 # |_   _|  __ \__   __|       
 #   | | | |  | | | |_ __ __ _ 
 #   | | | |  | | | | '__/ _` |
 #  _| |_| |__| | | | | | (_| |
 # |_____|_____/  |_|_|  \__,_|
 #           ______            
 #          |______|           
 #

for field in ID_TRA_data:
    ID_TRA.append(field)

 #     /\                   
 #    /  \   _ __ ___  __ _ 
 #   / /\ \ | '__/ _ \/ _` |
 #  / ____ \| | |  __/ (_| |
 # /_/    \_\_|  \___|\__,_|

for column in AREA_data:
    split_column = column.split(":")
    split_ramas = separar_opciones(split_column[1])
    AREA.append(split_column[0])
    RAMA.append(split_ramas)

 #  _      __                 
 # | |    /_/                 
 # | |     _ _ __   ___  __ _ 
 # | |    | | '_ \ / _ \/ _` |
 # | |____| | | | |  __/ (_| |
 # |______|_|_| |_|\___|\__,_|
                            

for field in LINEA_data:
    LINEA.append(field)

 #   _____                                 _   _     _       
 #  / ____|                               | | (_)   | |      
 # | |     ___  _ __ ___  _ __   __ _ _ __| |_ _  __| | ___  
 # | |    / _ \| '_ ` _ \| '_ \ / _` | '__| __| |/ _` |/ _ \ 
 # | |___| (_) | | | | | | |_) | (_| | |  | |_| | (_| | (_) |
 #  \_____\___/|_| |_| |_| .__/ \__,_|_|   \__|_|\__,_|\___/ 
 #                       | |                                 
 #                       |_|                                 
 #

for field in COMPARTIDO_data:
    COMPARTIDO.append(field)

 #  _   _       _____                       _            
 # | \ | |     |  __ \                     | |           
 # |  \| | ___ | |__) |__  _ __   ___ _ __ | |_ ___  ___ 
 # | . ` |/ _ \|  ___/ _ \| '_ \ / _ \ '_ \| __/ _ \/ __|
 # | |\  | (_) | |  | (_) | | | |  __/ | | | ||  __/\__ \
 # |_| \_|\___/|_|   \___/|_| |_|\___|_| |_|\__\___||___/
                                                       

for field in NO_PONENTES_data:
    NO_PONENTES.append(field)

 #  _______ _ _         _       
 # |__   __(_) |       | |      
 #    | |   _| |_ _   _| | ___  
 #    | |  | | __| | | | |/ _ \ 
 #    | |  | | |_| |_| | | (_) |
 #    |_|  |_|\__|\__,_|_|\___/ 
                              
for field in TITULO_data:
    TITULO.append(field)
    
 #  _____ _____   _____             __ __  
 # |_   _|  __ \ |  __ \           / / \ \ 
 #   | | | |  | || |__) |__  _ __ | |___| |
 #   | | | |  | ||  ___/ _ \| '_ \| / __| |
 #  _| |_| |__| || |  | (_) | | | | \__ \ |
 # |_____|_____/ |_|   \___/|_| |_| |___/ |
 #           ______                \_\ /_/ 
 #          |______|                       


for column in ID_PONENTES_data:
    split_PONENTES = separar_opciones(str(column))
    ID_PONENTES.append(split_PONENTES)

 #  _____                       _        __ __  
 # |  __ \                     | |      / / \ \ 
 # | |__) |__  _ __   ___ _ __ | |_ ___| |___| |
 # |  ___/ _ \| '_ \ / _ \ '_ \| __/ _ \ / __| |
 # | |  | (_) | | | |  __/ | | | ||  __/ \__ \ |
 # |_|   \___/|_| |_|\___|_| |_|\__\___| |___/ |
 #                                      \_\ /_/ 
 #                                              

for column in NOMBRE_PONENTES_data:
    split_NOMBRES = separar_opciones(str(column))
    NOMBRE_PONENTES.append(split_NOMBRES)

 #  _____           _   _ _              _              __       __  
 # |_   _|         | | (_) |            (_)            / /       \ \ 
 #   | |  _ __  ___| |_ _| |_ _   _  ___ _  ___  _ __ | | ___  ___| |
 #   | | | '_ \/ __| __| | __| | | |/ __| |/ _ \| '_ \| |/ _ \/ __| |
 #  _| |_| | | \__ \ |_| | |_| |_| | (__| | (_) | | | | |  __/\__ \ |
 # |_____|_| |_|___/\__|_|\__|\__,_|\___|_|\___/|_| |_| |\___||___/ |
 #                                                     \_\       /_/ 



for column in INSTITUCIONES_data:
    split_INSTITUCIONES = separar_instituciones(str(column))
    INSTITUCIONES.append(split_INSTITUCIONES)


 #  _____                     _   _                 _            
 # |_   _|                   | | (_)               | |           
 #   | |  _ ____   _____  ___| |_ _  __ _  __ _  __| | ___  _ __ 
 #   | | | '_ \ \ / / _ \/ __| __| |/ _` |/ _` |/ _` |/ _ \| '__|
 #  _| |_| | | \ V /  __/\__ \ |_| | (_| | (_| | (_| | (_) | |   
 # |_____|_| |_|\_/ \___||___/\__|_|\__, |\__,_|\__,_|\___/|_|   
 #                                   __/ |                       
 #                                  |___/                        
 #

for field in INVESTIGADOR_data:
    INVESTIGADOR.append(field)

 #  ______        _                         _    _ _     _                _   __        
 # |  ____|      | |                       | |  | | |   (_)              (_) /_/        
 # | |__ ___  ___| |__   __ _ ___   _   _  | |  | | |__  _  ___ __ _  ___ _  ___  _ __  
 # |  __/ _ \/ __| '_ \ / _` / __| | | | | | |  | | '_ \| |/ __/ _` |/ __| |/ _ \| '_ \ 
 # | | |  __/ (__| | | | (_| \__ \ | |_| | | |__| | |_) | | (_| (_| | (__| | (_) | | | |
 # |_|  \___|\___|_| |_|\__,_|___/  \__, |  \____/|_.__/|_|\___\__,_|\___|_|\___/|_| |_|
 #                                   __/ |                                              
 #                                  |___/                                               
 #

for field in FECHA_data:
    parts = [part for part in field.split() if part.lower() != 'de']
    day, month, year = parts[0:3]
    month_mapping = {
        'Enero': '01',
        'Febrero': '02',
        'Marzo': '03',
        'Abril': '04',
        'Mayo': '05',
        'Junio': '06',
        'Julio': '07',
        'Agosto': '08',
        'Septiembre': '09',
        'Octubre': '10',
        'Noviembre': '11',
        'Diciembre': '12'
    }

    formatted_date = f"{year}-{month_mapping[month]}-{day}"
    FECHA.append(formatted_date)

# for field in FECHA_data:
#     FECHA.append(field)

for field in DIA_data:
    DIA.append(field)
for field in TURNO_data:
    TURNO.append(field)
for field in BLOQUE_data:
    BLOQUE.append(field)
for field in SALON_data:
    SALON.append(field)
for field in UBICACION_data:
    UBICACION.append(field)
for field in SEDE_data:
    SEDE.append(field)

 #                                    _             _                          _     _            
 #     /\                            | |           | |          /\            | |   (_)           
 #    /  \   _ __ _ __ ___   __ _  __| | ___     __| | ___     /  \   _ __ ___| |__  ___   _____  
 #   / /\ \ | '__| '_ ` _ \ / _` |/ _` |/ _ \   / _` |/ _ \   / /\ \ | '__/ __| '_ \| \ \ / / _ \ 
 #  / ____ \| |  | | | | | | (_| | (_| | (_) | | (_| |  __/  / ____ \| | | (__| | | | |\ V / (_) |
 # /_/    \_\_|  |_| |_| |_|\__,_|\__,_|\___/   \__,_|\___| /_/    \_\_|  \___|_| |_|_| \_/ \___/ 
 #                                                                                                
                                                                                                

data_en_conjunto = {
        "ID_Tra":ID_TRA ,
        "Area":AREA ,
        "Rama":RAMA ,
        "Linea":LINEA,
        "Compartido":COMPARTIDO,
        "NoPonentes":NO_PONENTES ,
        "Titulo":TITULO ,
        "ID_Pons":ID_PONENTES ,
        "Ponentes":NOMBRE_PONENTES ,
        "Instituciones":INSTITUCIONES ,
        "Investigador":INVESTIGADOR ,
        "Fecha":FECHA ,
        "Dia":DIA ,
        "Turno":TURNO ,
        "Bloque":BLOQUE ,
        "Salon":SALON ,
        "Ubicacion":UBICACION ,
        "Sede":SEDE
}


output_file = "output.sql"
Creacion_Archivo_SQL(data_en_conjunto, 1743, output_file)


