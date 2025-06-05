import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography, type SelectChangeEvent } from "@mui/material";
import type { Pokemon } from "../../types/Pokemon";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { indigo } from "@mui/material/colors";
import type { ItiposController } from "../interfaces/TiposController";
import type { Tipo } from "../../types/Tipo";
import type { IPokemonDetailsPageController } from "../interfaces/IPokemonDetailsPageController";
import type { PokemonUpdate } from "../../types/PokemonUpdate";

// TODO: mudar controller, botar endpoint de pegar tipos em outro controle
type props = {
    controller: IPokemonDetailsPageController
}

export default function PokemonDetailsPage({ controller }: props) {

    const location = useLocation()
    const { currPokemon } = location.state || {}

    const [pokemon, setPokemon] = useState<Pokemon>(currPokemon)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tiposMap, setTiposMap] = useState<{ [key: string]: number }>({})
    const [successUpdateOP, setSuccessUpdateOP] = useState<boolean>(false)


    const [formData, setFormData] = useState<{ [key: string]: any }>({
        "codigo": pokemon.codigo,
        "nome": pokemon.nome,
        "tipo_primario": pokemon.tipo_primario.codigo,
        "tipo_secundario": pokemon.tipo_secundario === null ? null : pokemon.tipo_secundario.codigo
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(JSON.stringify(formData, null, 2))
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(JSON.stringify(formData, null, 2))
    };

    useEffect(() => {
        setIsLoading(true);

        const getTipos = async () => {
            const tipos: Tipo[] | null = await controller.getAllTipos();
            const newMap: { [key: string]: number } = {}

            if (tipos !== null) {
                for (let tipo of tipos) {
                    newMap[tipo.nome] = tipo.codigo
                }
            }

            setTiposMap(newMap)
            setIsLoading(false)
        };

        getTipos();
    }, []);

    console.log(`tiposMap = ${tiposMap}`)
    console.log(`formData = ${JSON.stringify(formData, null, 2)}`)


    if (isLoading) {
        return (
            <Typography>Loading...</Typography>
        )
    }

    return (

        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <Paper elevation={2} component="form" sx={{
                width: 400,
                height: 600,
                backgroundColor: indigo[100],
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>

                <Typography variant="h4" >Detalhes pokemon</Typography>

                {successUpdateOP && (
                    <Typography variant="h3" color="success.main">
                        Pokémon atualizado com sucesso!
                    </Typography>
                )}

                <TextField
                    sx={{ marginTop: "8px", width: "50%" }}
                    disabled
                    id="codigo"
                    name="codigo"
                    label="codigo"
                    defaultValue={formData["codigo"]}
                    onChange={handleChange}
                />

                <TextField
                    sx={{ marginTop: "8px", width: "50%" }}
                    id="nome"
                    name="nome"
                    label="nome"
                    defaultValue={formData["nome"]}
                    onChange={handleChange}
                />

                <FormControl sx={{ marginTop: "8px", width: "50%" }}>
                    <InputLabel id="id-tipo-primario">tipo primario</InputLabel>
                    <Select
                        labelId="id-tipo-primario"
                        name="tipo_primario"
                        value={formData["tipo_primario"]}
                        onChange={handleSelectChange}
                    >
                        {Object.entries(tiposMap).map(([nome, codigo]) => {
                            return (
                                <MenuItem value={codigo}>{nome}</MenuItem>
                            )
                        })}

                    </Select>
                </FormControl>

                <FormControl sx={{ marginTop: "8px", width: "50%" }}>
                    <InputLabel id="id-tipo-secundario" >tipo secundário</InputLabel>
                    <Select
                        labelId="id-tipo-secundario"
                        name="tipo_secundario"
                        value={formData["tipo_secundario"]}
                        onChange={handleSelectChange}
                    >
                        {Object.entries(tiposMap).map(([nome, codigo]) => {
                            return (
                                <MenuItem value={codigo}>{nome}</MenuItem>
                            )
                        })}

                    </Select>
                </FormControl>

                <Button
                    sx={{marginTop: "8px"}}
                    variant="outlined"
                    onClick={() => {

                        setIsLoading(true)

                        const updatePokemon = async () => {
                            const pokemonUpdate: PokemonUpdate = {
                                codigo: formData["codigo"],
                                nome: formData["nome"],
                                codigo_tipo_primario: formData["tipo_primario"],
                                codigo_tipo_secundario: formData["tipo_secundario"]
                            }

                            const updatedPokemon = await controller.editPokemon(pokemonUpdate)

                            if (updatedPokemon !== null) {
                                setSuccessUpdateOP(true)
                                setPokemon(updatedPokemon)
                                // editPokemon(updatedPokemon)
                            }

                            setIsLoading(false)
                        }

                        updatePokemon()

                    }}
                >
                    Salvar edições
                </Button>

            </Paper>
        </Box>
    )

}