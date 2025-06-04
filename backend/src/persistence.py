import json
import os

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
    with open("dados_pokemons_tipos.json") as file:
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

# Para criar e popular o banco de dados:
# 1) instalar uv
# 2) descomentar as linhas seguintes
# 3) rodar uv pip install -e . (vai baixar o diretorio atual como dependencia e acabar com problemas de import to python)
# 4) dentro do diretorio "backend" rodar uv run src/persistence.py

# create_db_and_tables()
# populate_database()