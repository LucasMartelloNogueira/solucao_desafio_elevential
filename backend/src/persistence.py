import json

from domain.Pokemon import Pokemon
from domain.Tipo import Tipo

from sqlmodel import Session, SQLModel, create_engine

sqlite_file_name = "src/database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)
session = Session(engine)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    return session


def populate_database():
    with open("../dados_pokemons_tipos.json") as file:
        data = json.load(file)
        pokemons = [Pokemon(**p) for p in data["pokemons"]]
        tipos = [Tipo(**t) for t in data["tipos"]]
        session = get_session()

        for t in tipos:
            t.codigo = None
            session.add(t)
            session.commit()

        for p in pokemons:
            p.codigo = None
            session.add(p)
            session.commit()

# create_db_and_tables()
# populate_database()