from pydantic import BaseModel

class TipoCreate(BaseModel):
    nome: str