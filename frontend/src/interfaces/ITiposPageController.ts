import type { Tipo } from "../../types/Tipo";
import type { TipoCreate } from "../../types/TipoCreate";
import type { TipoUpdate } from "../../types/TipoUpdate";

export interface ITiposPageController {
    getAllTipos(): Promise<Tipo[] | null>;
    deleteTipo(codigo: number): Promise<Tipo | null>;
    createTipo(tipo: TipoCreate): Promise<Tipo | null>;
    editTipo(tipo: TipoUpdate): Promise<Tipo | null>;
}