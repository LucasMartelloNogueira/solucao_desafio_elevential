import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Pokemon } from "../../types/Pokemon"
import type { IPokemonPageController } from "../interfaces/PokemonPageController";
import PokemonTable from "../components/PokemonTable";

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
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Typography> Pagina de pokemons</Typography>
            <PokemonTable pokemons={pokemons}/>
        </Box>
    )
}