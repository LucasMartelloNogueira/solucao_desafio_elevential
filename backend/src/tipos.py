from typing import Any

from src.persistence import get_session
from domain.Tipo import Tipo
from domain.dto.TipoCreate import TipoCreate
from domain.dto.TipoUpdate import TipoUpdate
from domain.Pokemon import Pokemon
from src.utils import get_success_response

from fastapi import APIRouter, HTTPException
from sqlmodel import select

tipos_router = APIRouter(prefix="/tipos", tags=["tipos"])


@tipos_router.get("/")
def get_all_types():
    session = get_session()
    types = list(session.exec(select(Tipo)).all())
    return get_success_response({
        "tipos": types
    })


@tipos_router.get("/{id}")
def get_type_by_id(id: int):
    session = get_session()
    type_db = session.get(Tipo, id)
    if not type_db:
        raise HTTPException(status_code=404, detail="Tipo Not Found")
    return get_success_response({
        "tipo": type_db
    })


@tipos_router.post("/")
def create_type(tipo: TipoCreate):
    session = get_session()
    new_type: Tipo = Tipo(
        codigo=None,
        nome=tipo.nome
    )

    session.add(new_type)
    session.commit()
    session.refresh(new_type)
    return get_success_response({
        "tipo": new_type
    })


@tipos_router.put("/")
def udpate_type(tipo: TipoUpdate):
    session = get_session()
    type_db = session.get(Tipo, tipo.codigo)
    if not type_db:
        raise HTTPException(status_code=404, detail="Tipo Not Found")
    
    type_data: dict[str, Any] = tipo.model_dump(exclude_unset=True)
    type_db.sqlmodel_update(type_data)
    session.add(type_db)
    session.commit()
    session.refresh(type_db)
    
    return get_success_response({
        "tipo": type_db
    })


@tipos_router.delete("/{id}")
def delete_type(id: int):
    session = get_session()
    type_db: Tipo = session.get(Tipo, id)
    if not type_db:
        raise HTTPException(status_code=404, detail="Tipo Not Found")
    
    
    pokemons: list[Pokemon] = list(session.exec(select(Pokemon)).all())
    filtered_pokemon: list[Pokemon] = []

    for pokemon in pokemons:
        if pokemon.codigo_tipo_primario == type_db.codigo:
            filtered_pokemon.append(pokemon)
            continue

        if pokemon.tipo_secundario != None:
            if pokemon.tipo_secundario.codigo == type_db.codigo:
                filtered_pokemon.append(pokemon)

    
    # delete cascaded pokemons com tipo que vai ser deletado
    for pokemon in filtered_pokemon:
        session.delete(pokemon)
    
    session.delete(type_db)
    session.commit()
    return get_success_response({
        "tipo": type_db
    })