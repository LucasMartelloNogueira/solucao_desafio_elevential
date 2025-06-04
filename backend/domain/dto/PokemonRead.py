from typing import Optional

from domain.Tipo import Tipo
from domain.Pokemon import Pokemon

from pydantic import BaseModel

class PokemonRead(BaseModel):
    codigo: int
    nome: str
    tipo_primario: Tipo
    tipo_secundario: Optional[Tipo]

    @classmethod
    def from_pokemon(cls, pokemon: Pokemon):
        return PokemonRead(
            codigo=pokemon.codigo,
            nome=pokemon.nome,
            tipo_primario=pokemon.tipo_primario,
            tipo_secundario=pokemon.tipo_secundario
        )