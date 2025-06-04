import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Pokemon } from "../../types/Pokemon"
import type { IPokemonPageController } from "../interfaces/PokemonPageController";

type props = {
    controller: IPokemonPageController
}

export default function PokemonsPage({ controller }: props) {

    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)


    useEffect(() => {
        setIsLoading(true)
        const getPokemons = async () => {
            const pokemons: Pokemon[] | null = await controller.getPokemons();
            if (pokemons !== null) {
                setPokemons(pokemons)
            } else {
                console.log("IPokemonPageController.getPokemons returns null")
                setPokemons([])
            }
            setIsLoading(false);
        }

        getPokemons();
    }, [])

    // console.log(pokemons)
    // console.log(typeof pokemons)

    if (isLoading) {
        return (
            <Typography variant="h1">Loading...</Typography>
        )
    }

    return (
        <Box>
            <Typography> Pagina de pokemons</Typography>
            {pokemons && pokemons.map((pokemon) => {
                return (
                    <div key={pokemon.codigo}>
                        <div>{pokemon.codigo}</div>
                        <div>{pokemon.nome}</div>
                        <div>{pokemon.tipo_primario.nome}</div>
                        <div>{pokemon.tipo_secundario === null ? "-" : pokemon.tipo_secundario.nome}</div>
                    </ div>

                )
            })}
        </Box>
    )
}