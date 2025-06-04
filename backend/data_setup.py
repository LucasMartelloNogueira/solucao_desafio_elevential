# transformar os dados iniciais para um formato mais parecido com o schema do banco
import json

pokemons = []
tipos = {}
tipos_counter = 0
tipos_data = []


with open("dados_iniciais.json") as f:
    pokemon_list = json.load(f)
    for pokemon in pokemon_list:
        print(pokemon)
        nome_tipo = None
        codigo_tipo = None
        nome_tipos = ["tipo_primario", "tipo_secundario"]

        for t in nome_tipos:
            if pokemon[t] in tipos:
                nome_tipo = pokemon[t]
                codigo_tipo = tipos[nome_tipo]
            else:
                nome_tipo = pokemon[t]

                if nome_tipo is not None:
                    tipos_counter += 1
                    codigo_tipo = tipos_counter
                    tipos[nome_tipo] = codigo_tipo
                    tipos_data.append({
                    "codigo": codigo_tipo,
                    "nome": nome_tipo
                    })
        
        cod_tipo_primario = None
        cod_tipo_secundario = None

        if pokemon["tipo_primario"] is not None and pokemon["tipo_primario"] in tipos:
            cod_tipo_primario = tipos[pokemon["tipo_primario"]]

        if pokemon["tipo_secundario"] is not None and pokemon["tipo_secundario"] in tipos:
            cod_tipo_secundario = tipos[pokemon["tipo_secundario"]]

        pokemons.append({
            "codigo": pokemon["codigo"],
            "nome": pokemon["nome"],
            "codigo_tipo_primario": cod_tipo_primario,
            "codigo_tipo_secundario": cod_tipo_secundario
        })
    
    with open("dados_pokemons_tipos.json", "w") as out:
        out_data = {
            "pokemons": pokemons,
            "tipos": tipos_data
        }
        json.dump(out_data, out, indent=4)