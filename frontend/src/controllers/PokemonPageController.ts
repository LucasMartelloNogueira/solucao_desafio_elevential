import type { Pokemon } from "../../types/Pokemon";
import type { Response } from "../../types/Response";
import type { Tipo } from "../../types/Tipo";
import { BASE_URL } from "../constants"
import type { IPokemonPageController } from "../interfaces/PokemonPageController";

class PokemonPageController implements IPokemonPageController {

    async getPokemons(): Promise<Pokemon[] | null>{
        const endpoint = `${BASE_URL}/pokemons`

        try {
            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error(`endpoint ${endpoint} / status = ${response.status}`)
            }

            const body: Response<{[key: string] : Pokemon[]}> | undefined = await response.json()
            if (body) {
                return body.data["pokemons"]
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

export const pokemonPageController: IPokemonPageController = new PokemonPageController()