from fastapi import FastAPI
from app.endpoints.seasons import router as seasons_router
from db.interface import create_database


async def lifespan(app: FastAPI) -> None:
    await create_database(hard=True)
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(seasons_router)
