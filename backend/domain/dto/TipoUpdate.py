from pydantic import BaseModel

class TipoUpdate(BaseModel):
    codigo: int
    nome: str