import type { Pokemon } from "../../types/Pokemon";
import type { PokemonUpdate } from "../../types/PokemonUpdate";
import type { Tipo } from "../../types/Tipo";

export interface IPokemonDetailsPageController {
    getAllTipos(): Promise<Tipo[] | null>;
    editPokemon(pokemonUpdate: PokemonUpdate): Promise<Pokemon | null>;
}