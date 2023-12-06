import re

input_file = "outputPonenciasPRB.sql"
output_file = "outputPonenciasPRB_fixed.sql"

# Abre el archivo SQL
with open(input_file, "r", encoding="utf-8") as f:
    data = f.read()

# Encuentra y reemplaza las comillas no deseadas alrededor de campos específicos
data = re.sub(r'("[^"]*"\s*:\s*)("[^"]+"|true|false|null|\d+|{\s*[^}]+\s*})', r'\1\2', data)

# Escribe el archivo SQL de salida
with open(output_file, "w", encoding="utf-8") as f:
    f.write(data)
