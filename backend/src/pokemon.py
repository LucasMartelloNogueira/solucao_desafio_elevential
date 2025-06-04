from domain.Pokemon import Pokemon
from domain.Tipo import Tipo
from domain.dto.PokemonCreate import PokemonCreate
from domain.dto.PokemonUpdate import PokemonUpdate
from src.utils import get_success_response
from src.persistence import get_session

from fastapi import APIRouter, HTTPException
from sqlmodel import select

pokemon_router = APIRouter(prefix="/pokemons", tags=["pokemons"])


@pokemon_router.get("/")
def get_all():
    session = get_session()
    pokemons: list[Pokemon] = list(session.exec(select(Pokemon)).all())

    return get_success_response({
        "pokemons": pokemons
    })


@pokemon_router.get("/{id}")
def get_pokemon_by_id(id: int):
    session = get_session()
    pokemon: Pokemon = session.get(Pokemon, id)
    
    if not pokemon:
        raise HTTPException(status_code=404, detail="Not Found")
    
    return get_success_response({
        "pokemon": pokemon
    })


@pokemon_router.get("/filter")
def get_pokemons_with_filter(id: int, name: str | None = None, primary_type: int | None = None, secondary_type: int | None = None):
    session = get_session()

    pokemons: list[Pokemon] = list(session.exec(select(Pokemon).where(
        Pokemon.nome == name |
        Pokemon.codigo_tipo_primario == primary_type |
        Pokemon.codigo_tipo_secundario == secondary_type
    )).all())

    return get_success_response({
        "pokemons": pokemons
    })


@pokemon_router.post("/")
def create_pokemon(pokemon: PokemonCreate):
    session = get_session()
    
    tipo_primario: Tipo = session.exec(select(Tipo).where(Tipo.codigo == pokemon.codigo_tipo_primario)).one_or_none()
    if not tipo_primario:
        raise HTTPException(status_code=404, detail="cod. tipo primario Not Found")
    
    if pokemon.codigo_tipo_secundario is not None:
        tipo_secundario: Tipo = session.exec(select(Tipo).where(Tipo.codigo == pokemon.codigo_tipo_secundario)).one_or_none()
        if not tipo_secundario:
            raise HTTPException(status_code=404, detail="código tipo secundário Not Found")
        
    new_pokemon: Pokemon = Pokemon(
        codigo=None,
        nome=pokemon.nome,
        codigo_tipo_primario=pokemon.codigo_tipo_primario,
        codigo_tipo_secundario=pokemon.codigo_tipo_secundario
    )
    
    session.add(new_pokemon)
    session.commit()
    session.refresh(new_pokemon)

    return get_success_response({
        "pokemon": new_pokemon
    })


@pokemon_router.put("/")
def update_pokemon(pokemon: PokemonUpdate):
    session = get_session()
    pokemon_db: Pokemon = session.get(Pokemon, pokemon.codigo)

    if not pokemon_db:
        raise HTTPException(status_code=404, detail="código pokemon Not Found")
    
    tipo_primario = session.exec(select(Tipo).where(Tipo.codigo == pokemon.codigo_tipo_primario)).one_or_none()
    if not tipo_primario:
        raise HTTPException(status_code=404, detail="código tipo primario Not Found")
    
    if pokemon.codigo_tipo_secundario is not None:
        tipo_secundario = session.exec(select(Tipo).where(Tipo.codigo == pokemon.codigo_tipo_secundario)).one_or_none()
        if not tipo_secundario:
            raise HTTPException(status_code=404, detail="código tipo secundário Not Found")
        
    
    pokemon_data = pokemon.model_dump(exclude_unset=True)
    pokemon_db.sqlmodel_update(pokemon_data)
    session.add(pokemon_db)
    session.commit()
    session.refresh(pokemon_db)
    return get_success_response({
        "pokemon": pokemon_db
    })


@pokemon_router.delete("/{id}")
def delete_pokemon(id: int):
    session = get_session()
    pokemon = session.get(Pokemon, id)
    
    if not pokemon:
        raise HTTPException(status_code=404, detail="pokemon Not Found")
    
    session.delete(pokemon)
    session.commit()
    return get_success_response({
        "pokemon": pokemon
    })
