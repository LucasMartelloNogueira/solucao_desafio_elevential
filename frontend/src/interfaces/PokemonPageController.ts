import type { Pokemon } from "../../types/Pokemon";
import type { Tipo } from "../../types/Tipo";

export interface IPokemonPageController {
    getPokemons(): Promise<Pokemon[] | null>;
    getAllTipos(): Promise<Tipo[] | null>;
    deletePokemon(codigo: number): Promise<Pokemon | null>;  
} 