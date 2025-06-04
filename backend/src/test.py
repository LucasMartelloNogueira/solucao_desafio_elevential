from persistence import get_session

from sqlmodel import select
from domain.Pokemon import Pokemon

session = get_session()
pokemons = list(session.exec(select(Pokemon)).all())

for p in pokemons:
    print(p.model_dump())