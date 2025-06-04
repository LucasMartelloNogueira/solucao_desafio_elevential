import type { Pokemon } from "../../types/Pokemon";

export interface IPokemonPageController {
    getPokemons(): Promise<Pokemon[] | null>  
} 