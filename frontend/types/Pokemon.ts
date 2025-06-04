import type { Tipo } from "./Tipo";

export type Pokemon = {
    codigo: number;
    nome: string;
    tipo_primario: Tipo;
    tipo_secundario: Tipo | null
}