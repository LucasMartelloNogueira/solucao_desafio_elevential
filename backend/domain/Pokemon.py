from sqlmodel import SQLModel, Field

class Pokemon(SQLModel, table=True):
    codigo: int | None = Field(default=None, primary_key=True)
    nome: str = Field()
    codigo_tipo_primario: int = Field()
    codigo_tipo_secundario: int | None = Field(default=None)

