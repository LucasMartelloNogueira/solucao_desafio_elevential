from src.pokemon import pokemon_router
from src.tipos import tipos_router

from fastapi import FastAPI

app = FastAPI()
app.include_router(pokemon_router)
app.include_router(tipos_router)



@app.get("/hello")
def health_check():
    return {"msg": "Hello world"}