from db.models.seasons import Season
from app.main import app
from db.interface import get_session
from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from typing import List

@app.get("/seasons", response_model=List[Season])
async def list_seasons(
    db: AsyncSession = Depends(get_session)
) -> List[Season]:
    """
    Lists all seasons.

    Args:
        db (AsyncSession): The database session.

    Returns:
        List[Season]: A list of all existing seasons.
    """
    result = await db.exec(select(Season))
    return result.scalars().all()

@app.get("/seasons/{id}", response_model=Season)
async def get_season(id: int, db: AsyncSession = Depends(get_session)) -> Season:
    """
    Retrieves a season by its ID.

    Args:
        id (int): The ID of the season to retrieve.
        db (AsyncSession): The database session.

    Returns:
        Season: The season object with the specified ID.
    """
    result = await db.exec(select(Season).filter_by(id=id))
    return result.scalars().first()