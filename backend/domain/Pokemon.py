from typing import Optional

from domain.Tipo import Tipo

from sqlmodel import SQLModel, Field, Relationship

class Pokemon(SQLModel, table=True):
    codigo: Optional[int] = Field(default=None, primary_key=True)
    nome: str

    codigo_tipo_primario: int = Field(foreign_key="tipo.codigo", alias="codigo_tipo_primario")
    codigo_tipo_secundario: Optional[int] = Field(default=None, foreign_key="tipo.codigo", alias="codigo_tipo_secundario")

    tipo_primario: Optional[Tipo] = Relationship(sa_relationship_kwargs={"foreign_keys": "[Pokemon.codigo_tipo_primario]"})
    tipo_secundario: Optional[Tipo] = Relationship(sa_relationship_kwargs={"foreign_keys": "[Pokemon.codigo_tipo_secundario]"})

