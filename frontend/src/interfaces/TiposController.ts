import type { Tipo } from "../../types/Tipo";

export interface ItiposController {
    getAllTipos(): Promise<Tipo[] | null>
}