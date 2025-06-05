import type { Pokemon } from "../../types/Pokemon";
import type { PokemonCreate } from "../../types/PokemonCreate";
import type { Tipo } from "../../types/Tipo";

export interface IPokemonCreatePageController {
    createPokemon(pokemon: PokemonCreate): Promise<Pokemon | null>;
    getAllTipos(): Promise<Tipo[] | null>;
}