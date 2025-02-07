from fastapi import FastAPI
from app.endpoints.seasons import router as seasons_router

app = FastAPI()

app.include_router(seasons_router)
