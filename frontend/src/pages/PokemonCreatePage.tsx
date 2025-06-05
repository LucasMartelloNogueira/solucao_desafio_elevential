import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography, type SelectChangeEvent } from "@mui/material"
import type { IPokemonCreatePageController } from "../interfaces/IPokemonCreatePageController"
import { useEffect, useState } from "react"
import { indigo } from "@mui/material/colors";
import type { Tipo } from "../../types/Tipo";
import type { PokemonCreate } from "../../types/PokemonCreate";

type props = {
    controller: IPokemonCreatePageController
}

export default function PokemonCreatePage({ controller }: props) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tiposMap, setTiposMap] = useState<{ [key: string]: number }>({})
    const [successUpdateOP, setSuccessUpdateOP] = useState<boolean>(false)


    const [formData, setFormData] = useState<{ [key: string]: any }>({
        "nome": "",
        "tipo_primario": 0,
        "tipo_secundario": 0
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
            <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h1">Loading...</Typography>
            </Box>
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

                <Typography variant="h4" >Criar Pokemon</Typography>

                {successUpdateOP && (
                    <Typography variant="h3" color="success.main">
                        Pokémon atualizado com sucesso!
                    </Typography>
                )}

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
                    sx={{ marginTop: "8px" }}
                    variant="outlined"
                    onClick={() => {

                        setIsLoading(true)

                        const createPokemon = async () => {
                            const newPokemon: PokemonCreate = {
                                nome: formData["nome"],
                                codigo_tipo_primario: formData["tipo_primario"],
                                codigo_tipo_secundario: formData["tipo_secundario"]
                            }

                            const createdPokemon = await controller.createPokemon(newPokemon)

                            if (createdPokemon !== null) {
                                alert("pokemon criado com sucesso")
                                // editPokemon(updatedPokemon)
                            }

                            setIsLoading(false)
                        }

                        createPokemon()

                    }}
                >
                    Salvar edições
                </Button>

            </Paper>
        </Box>
    )
}