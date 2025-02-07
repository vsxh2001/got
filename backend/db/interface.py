from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel import SQLModel
from db.confdb import DATABASE_URL
from db.models.seasons import Season

engine = create_async_engine(DATABASE_URL)


async def create_database(hard: bool = False):
    async with engine.begin() as conn:
        if hard:
            await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)


async def get_session() -> AsyncSession:
    async with AsyncSession(engine) as session:
        yield session
