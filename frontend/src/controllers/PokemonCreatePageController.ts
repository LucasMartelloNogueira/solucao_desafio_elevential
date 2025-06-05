import type { Pokemon } from "../../types/Pokemon";
import type { PokemonCreate } from "../../types/PokemonCreate";
import type { Response } from "../../types/Response";
import type { Tipo } from "../../types/Tipo";
import { BASE_URL } from "../constants";
import type { IPokemonCreatePageController } from "../interfaces/IPokemonCreatePageController";

class PokemonCreatePageController implements IPokemonCreatePageController {

    async createPokemon(pokemon: PokemonCreate): Promise<Pokemon | null> {
        const endpoint = `${BASE_URL}/pokemons`

        try {
            const response = await fetch(endpoint,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(pokemon)
                }
            );

            if (!response.ok) {
                throw new Error(`endpoint ${endpoint} / status = ${response.status}`)
            }

            const body: Response<{ [key: string]: Pokemon }> | undefined = await response.json()
            if (body) {
                return body.data["pokemon"]
            }

            return null;

        } catch (error) {
            console.log(error);
            return null
        }
    }

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

}

export const pokemonCreatePageController = new PokemonCreatePageController();