import type { Pokemon } from "../../types/Pokemon";
import type { PokemonUpdate } from "../../types/PokemonUpdate";
import type { Response } from "../../types/Response";
import type { Tipo } from "../../types/Tipo";
import { BASE_URL } from "../constants";
import type { IPokemonDetailsPageController } from "../interfaces/IPokemonDetailsPageController";

class PokemonDetailsPageController implements IPokemonDetailsPageController {

    async getAllTipos(): Promise<Tipo[] | null> {
        const endpoint = `${BASE_URL}/tipos`

        try {
            const response = await fetch(endpoint)
            if (!response.ok) {
                throw new Error(`endpoint ${endpoint} / status = ${response.status}`)
            }

            const body: Response<{ [key: string]: Tipo[] }> | undefined = await response.json()
            if (body) {
                return body.data["tipos"]
            }

            return null;

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async editPokemon(pokemonUpdate: PokemonUpdate): Promise<Pokemon | null> {
        const endpoint = `${BASE_URL}/pokemons`

        try {
            const response = await fetch(endpoint,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(pokemonUpdate)
                }
            );

            if (!response.ok) {
                throw new Error(`endpoint ${endpoint} / status = ${response.status}`)
            }

            const body: Response<{ [key: string]: Pokemon[] }> | undefined = await response.json()
            if (body) {

            }

            return null;

        } catch (error) {
            console.log(error);
            return null
        }
    }
}

export const pokemonDetailsPageController: IPokemonDetailsPageController = new PokemonDetailsPageController()