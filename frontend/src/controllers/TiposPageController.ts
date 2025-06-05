import { BASE_URL } from "../constants";
import type { Response } from "../../types/Response";
import type { ITiposPageController } from "../interfaces/ITiposPageController";
import type { Tipo } from "../../types/Tipo";
import type { TipoCreate } from "../../types/TipoCreate";
import type { TipoUpdate } from "../../types/TipoUpdate";

class TiposPageController implements ITiposPageController {

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

    async deleteTipo(codigo: number): Promise<Tipo | null> {
        const endpoint = `${BASE_URL}/tipos/${codigo}`

        try {
            const response = await fetch(endpoint, {
                method: "DELETE"
            })

            if (!response.ok) {
                throw new Error(`endpoint ${endpoint} / status = ${response.status}`)
            }

            const body: Response<{ [key: string]: Tipo }> | undefined = await response.json()
            if (body) {
                return body.data["tipo"]
            }

            return null;

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async createTipo(tipo: TipoCreate): Promise<Tipo | null> {
        const endpoint = `${BASE_URL}/tipos`

        try {
            const response = await fetch(endpoint,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(tipo)
                }
            );

            if (!response.ok) {
                throw new Error(`endpoint ${endpoint} / status = ${response.status}`)
            }

            const body: Response<{ [key: string]: Tipo }> | undefined = await response.json()
            if (body) {
                return body.data["tipo"]
            }

            return null;

        } catch (error) {
            console.log(error);
            return null
        }
    }

    async editTipo(tipo: TipoUpdate): Promise<Tipo | null> {
        const endpoint = `${BASE_URL}/tipos`

        try {
            const response = await fetch(endpoint,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(tipo)
                }
            );

            if (!response.ok) {
                throw new Error(`endpoint ${endpoint} / status = ${response.status}`)
            }

            const body: Response<{ [key: string]: Tipo }> | undefined = await response.json()
            if (body) {
                return body.data["tipo"]
            }

            return null;

        } catch (error) {
            console.log(error);
            return null
        }
    }


}

export const tiposPageController: ITiposPageController = new TiposPageController