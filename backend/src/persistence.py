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


if __name__ == "__main__":
    print(os.getcwd())

    database_file = os.path.join(os.getcwd(), "src", "database.db")
    print(database_file)
    print(os.path.exists(database_file))

    f = open(database_file, "w")
    f.close()

    create_db_and_tables()
    populate_database()
    print("banco criado e restaurando ao estado original")