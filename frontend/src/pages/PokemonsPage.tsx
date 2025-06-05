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
    const [tipos, setTipos] = useState<Tipo[]>([])
    const [codigoTipo, setCodigoTipo] = useState<number>(0)

    
    // const editPokemon = (newPokemon: Pokemon) => {
    //     setPokemons((currentPokemons) => {
    //        return currentPokemons.map((pokemon) => {
    //         if (pokemon.codigo === newPokemon.codigo) {
    //             return newPokemon
    //         }
    //         return pokemon
    //        })
    //     })
    // }

    const deletePokemon = async (codigo: number) => {

        setIsLoading(true)

        const delPokemon = async (codigo: number) => {
            const deletedPokemon = await controller.deletePokemon(codigo)
    
            if (deletedPokemon !== null) {
                setPokemons((currentPokemons) => {
                    return currentPokemons.filter((pokemon) => pokemon.codigo !== codigo)
                })
            } else {
                console.log("erro ao deletar pokemon")
            }

            setIsLoading(false)
        }

        delPokemon(codigo)
    }


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

        const getTipos = async () => {
            const tipos: Tipo[] | null = await controller.getAllTipos();
           
            if (tipos !== null) {
                const todos: Tipo = {codigo: 0, nome: "Todos os tipos"}
                const todosOsTipos = [todos].concat(tipos)
                setTipos(todosOsTipos)
            }

            setIsLoading(false)
        };

        getPokemons();
        getTipos();
    }, [])

    useEffect(() => {
        const filtered = pokemons.filter((pokemon) => {
            const containsName = pokemon.nome.includes(searchQuery);

            let containsPrimaryType = false;
            let containsSecundaryType = false;

            if (codigoTipo !== 0) {
                containsPrimaryType = pokemon.tipo_primario.codigo === codigoTipo;

                if (pokemon.tipo_secundario !== null) {
                    containsSecundaryType = pokemon.tipo_secundario.codigo === codigoTipo;
                }
            }

            if (searchQuery === "" && codigoTipo === 0) return true;

            return containsName && (containsPrimaryType || containsSecundaryType || codigoTipo === 0);
        });

        setFilteredPokemon(filtered);
    }, [searchQuery, codigoTipo, pokemons]);


    if (isLoading) {
        return (

            <Box sx={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Typography variant="h1">Loading...</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h1"> Pagina de pokemons</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <SearchIcon />
                <input
                    type="text"
                    value={searchQuery}
                    placeholder="buscar por nome"
                    onChange={(e) => { setSearchQuery(e.target.value) }}
                />
                <FormControl sx={{ marginLeft: "5px", marginTop: "8px", width: "200px" }}>
                    <InputLabel id="id-tipo">tipo</InputLabel>
                    <Select
                        labelId="id-tipo"
                        name="tipo"
                        value={codigoTipo}
                        onChange={(e) => {
                            setCodigoTipo(Number(e.target.value))
                        }}
                    >
                        {tipos.map((tipo) => {
                            return (
                                <MenuItem key={tipo.codigo} value={tipo.codigo}>{tipo.nome}</MenuItem>
                            )
                        })}

                    </Select>
                </FormControl>
            </Box>
            <PokemonTable pokemons={filteredPokemons} deletePokemon={deletePokemon}/>
        </Box>
    )
}