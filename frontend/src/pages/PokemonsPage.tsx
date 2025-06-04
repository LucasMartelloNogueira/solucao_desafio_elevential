import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Pokemon } from "../../types/Pokemon"
import type { IPokemonPageController } from "../interfaces/PokemonPageController";
import PokemonTable from "../components/PokemonTable";
import SearchIcon from '@mui/icons-material/Search';
import type { Tipo } from "../../types/Tipo";

type props = {
    controller: IPokemonPageController
}

export default function PokemonsPage({ controller }: props) {

    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [filteredPokemons, setFilteredPokemon] = useState<Pokemon[]>([])
    const [searchQuery, setSearchQuery] = useState<string>("")
    // const [tiposMap, setTiposMap] = useState<{ [key: string]: number }>({})
    // const [codigoTipo, setCodigoTipo] = useState<number|null>(null)


    useEffect(() => {
        setIsLoading(true)
        const getPokemons = async () => {
            const pokemons: Pokemon[] | null = await controller.getPokemons();
            if (pokemons !== null) {
                setPokemons(pokemons)
                setFilteredPokemon(pokemons)
            } else {
                console.log("IPokemonPageController.getPokemons returns null")
                setPokemons([])
            }
            setIsLoading(false);
        }

        // const getTipos = async () => {
        //     const tipos: Tipo[] | null = await controller.getAllTipos();
        //     const newMap: { [key: string]: number } = {}

        //     if (tipos !== null) {
        //         for (let tipo of tipos) {
        //             newMap[tipo.nome] = tipo.codigo
        //         }
        //     }

        //     setTiposMap(newMap)
        //     setIsLoading(false)
        // };

        getPokemons();
        // getTipos();
    }, [])

    // console.log(pokemons)
    // console.log(typeof pokemons)

    if (isLoading) {
        return (
            <Typography variant="h1">Loading...</Typography>
        )
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography> Pagina de pokemons</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <SearchIcon />
                <input
                    type="text"
                    value={searchQuery}
                    placeholder="buscar por nome"
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearchQuery(value);
                        setFilteredPokemon(
                            pokemons.filter((pokemon: Pokemon) =>
                                pokemon.nome.toLowerCase().includes(value.toLowerCase())
                            )
                        );
                    }}
                />
                {/* <FormControl sx={{ marginTop: "8px", width: "50%" }}>
                    <InputLabel id="id-tipo-primario">tipo primario</InputLabel>
                    <Select
                        labelId="id-tipo-primario"
                        name="tipo_primario"
                        value={codigoTipo}
                        onChange={(e) => {
                            const value: number | null = e.target.value;
                            setCodigoTipo(value)
                            setFilteredPokemon(
                                pokemons.filter((pokemon: Pokemon) => {
                                    pokemon.tipo_primario.codigo === tipos
                                })
                            )
                        }}
                    >
                        {Object.entries(tiposMap).map(([nome, codigo]) => {
                            return (
                                <MenuItem value={codigo}>{nome}</MenuItem>
                            )
                        })}
                        
                    </Select>
                </FormControl> */}
            </Box>
            <PokemonTable pokemons={searchQuery === "" ? pokemons : filteredPokemons} />
        </Box>
    )
}