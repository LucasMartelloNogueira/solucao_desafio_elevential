from src.pokemon import pokemon_router
from src.tipos import tipos_router
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI

app = FastAPI()
app.include_router(pokemon_router)
app.include_router(tipos_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello")
def health_check():
    return {"msg": "Hello world"}