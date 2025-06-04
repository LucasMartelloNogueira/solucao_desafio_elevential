import type { Tipo } from "../../types/Tipo";
import type { Response } from "../../types/Response";
import { BASE_URL } from "../constants";
import type { ItiposController } from "../interfaces/TiposController";

class TiposController implements ItiposController {

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

export const tiposController: ItiposController = new TiposController();