from sqlmodel import SQLModel, Field

class Tipo(SQLModel, table=True):
    codigo: int | None = Field(default=None, primary_key=True)
    nome: str = Field()
