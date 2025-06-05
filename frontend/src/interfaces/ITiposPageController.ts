import type { Tipo } from "../../types/Tipo";
import type { TipoCreate } from "../../types/TipoCreate";

export interface ITiposPageController {
    getAllTipos(): Promise<Tipo[] | null>;
    deleteTipo(codigo: number): Promise<Tipo | null>;
    createTipo(tipo: TipoCreate): Promise<Tipo | null>;
}