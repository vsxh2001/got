from db.models.seasons import Season
from app.main import app
from db.interface import get_session
from fastapi import Depends, HTTPException
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

@app.post("/seasons", response_model=Season)
async def create_season(
    season: Season, db: AsyncSession = Depends(get_session)
) -> Season:
    """
    Creates a new season.

    Args:
        season (Season): The season object to create.
        db (AsyncSession): The database session.

    Returns:
        Season: The newly created season.
    """
    if season.id is not None:
        raise HTTPException(status_code=400, detail="ID must be None")
    if season.name is None:
        raise HTTPException(status_code=400, detail="Name must be provided")
    db.add(season)
    await db.commit()
    await db.refresh(season)
    return season

@app.patch("/seasons/{id}", response_model=Season)
async def update_season(
    id: int, season: Season, db: AsyncSession = Depends(get_session)
) -> Season:
    """
    Updates a season by its ID.

    Args:
        id (int): The ID of the season to update.
        season (Season): The updated season object.
        db (AsyncSession): The database session.

    Returns:
        Season: The updated season object.
    """
    result = await db.exec(select(Season).filter_by(id=id))
    existing_season = result.scalars().first()
    if existing_season is None:
        raise HTTPException(status_code=404, detail="Season not found")        
    existing_season.update_from_dict(season.model_dump(exclude_unset=True))
    await db.commit()
    await db.refresh(existing_season)
    return existing_season

@app.delete("/seasons/{id}")
async def delete_season(id: int, db: AsyncSession = Depends(get_session)):
    """
    Deletes a season by its ID.

    Args:
        id (int): The ID of the season to delete.
        db (AsyncSession): The database session.
    """
    result = await db.exec(select(Season).filter_by(id=id))
    season = result.scalars().first()
    if season is None:
        raise HTTPException(status_code=404, detail="Season not found")
    db.delete(season)
    await db.commit()