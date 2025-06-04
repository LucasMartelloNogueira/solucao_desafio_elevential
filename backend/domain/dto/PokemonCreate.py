from pydantic import BaseModel

class PokemonCreate(BaseModel):
    nome: str
    codigo_tipo_primario: int
    codigo_tipo_secundario: int | None