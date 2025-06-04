from pydantic import BaseModel

class PokemonUpdate(BaseModel):
    codigo: int
    nome: str
    codigo_tipo_primario: int
    codigo_tipo_secundario: int | None