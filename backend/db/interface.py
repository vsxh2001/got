from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel.ext.asyncio import create_async_engine
from sqlmodel import SQLModel
from db.confdb import DATABASE_URL
from models.seasons import Season

engine = create_async_engine(DATABASE_URL)

async def create_database(hard: bool = False):
    SQLModel.metadata.clear()
    SQLModel.metadata.tables["seasons"] = Season.__table__
    if hard:
        SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)

async def get_session() -> AsyncSession:
    async with AsyncSession(engine) as session:
        yield session
