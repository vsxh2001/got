from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel import SQLModel
from db.confdb import DATABASE_URL
from log_utils import DB_LOGGER
import db.models

engine = create_async_engine(DATABASE_URL)


async def create_database(hard: bool = False):
    async with engine.begin() as conn:
        if hard:
            await conn.run_sync(SQLModel.metadata.drop_all)
            DB_LOGGER.info("Database dropped")
        await conn.run_sync(SQLModel.metadata.create_all)
    DB_LOGGER.info("Database created")


async def get_session() -> AsyncSession:
    async with AsyncSession(engine) as session:
        yield session
