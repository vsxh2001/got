from fastapi import FastAPI
from app.endpoints.seasons import router as seasons_router
from app.endpoints.matches import router as matches_router
from app.endpoints.teams import router as teams_router
from db.interface import create_database
from fastapi.middleware.cors import CORSMiddleware


async def lifespan(app: FastAPI) -> None:
    await create_database(hard=True)
    yield


origins = [
    "http://localhost:5173",  # Vite Dev Server
    "http://127.0.0.1:5173",  # Sometimes needed
    "http://localhost:8000",  # FastAPI Dev Server
    "http://127.0.0.1:8000",  # Sometimes needed
]

tags_metadata = [
    {"name": "seasons", "description": "Seasons management"},
    {"name": "matches", "description": "Matches management"},
    {"name": "teams", "description": "Teams management"},
]

app = FastAPI(
    title="Got API",
    description="API for Got tournament management",
    version="1.0.0",
    lifespan=lifespan,
    openapi_tags=tags_metadata,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)
app.include_router(seasons_router)
app.include_router(matches_router)
app.include_router(teams_router)
