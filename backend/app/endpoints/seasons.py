from db.models import Season, EventStatus, Match
from db.interface import get_session
from fastapi import Depends, HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from sqlalchemy.orm import selectinload
from typing import List
from fastapi import APIRouter
from datetime import datetime

router = APIRouter()


@router.get("/seasons", response_model=List[Season], tags=["seasons"])
async def list_seasons(db: AsyncSession = Depends(get_session)) -> List[Season]:
    """
    Lists all seasons.

    Args:
        db (AsyncSession): The database session.

    Returns:
        List[Season]: A list of all existing seasons.
    """
    result = await db.scalars(select(Season))
    return result.all()


@router.get("/seasons/{id}", response_model=Season, tags=["seasons"])
async def get_season(id: int, db: AsyncSession = Depends(get_session)) -> Season:
    """
    Retrieves a season by its ID.

    Args:
        id (int): The ID of the season to retrieve.
        db (AsyncSession): The database session.

    Returns:
        Season: The season object with the specified ID.
    """
    season = await db.get(Season, id)
    return season


@router.post("/seasons", response_model=Season, tags=["seasons"])
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
    season = Season.model_validate(season.model_dump())
    if season.id is not None:
        raise HTTPException(status_code=400, detail="ID must be None")
    if season.name is None:
        raise HTTPException(status_code=400, detail="Name must be provided")
    db.add(season)
    await db.commit()
    await db.refresh(season)
    return season


@router.patch("/seasons/{id}", response_model=Season, tags=["seasons"])
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
    season = Season.model_validate(season.model_dump())
    existing_season = await db.get(Season, id)
    if existing_season is None:
        raise HTTPException(status_code=404, detail="Season not found")
    existing_season.update_from_dict(season.model_dump(exclude_unset=True))
    await db.commit()
    await db.refresh(existing_season)
    return existing_season


@router.delete("/seasons/{id}", tags=["seasons"])
async def delete_season(id: int, db: AsyncSession = Depends(get_session)):
    """
    Deletes a season by its ID.

    Args:
        id (int): The ID of the season to delete.
        db (AsyncSession): The database session.
    """
    season = await db.get(Season, id)
    if season is None:
        raise HTTPException(status_code=404, detail="Season not found")
    await db.delete(season)
    await db.commit()


@router.post("/seasons/{id}/start", tags=["seasons"])
async def start_season(id: int, db: AsyncSession = Depends(get_session)):
    """
    Starts a season by its ID.

    Args:
        id (int): The ID of the season to start.
        db (AsyncSession): The database session.

    Returns:
        Season: The updated season object.
    """
    season = await db.get(Season, id)
    if season is None:
        raise HTTPException(status_code=404, detail="Season not found")
    if season.status != EventStatus.PENDING:
        raise HTTPException(status_code=400, detail="Season is not pending")
    season.status = EventStatus.ONGOING
    season.start = datetime.now()
    await db.commit()
    await db.refresh(season)
    return season


@router.post("/seasons/{id}/end", tags=["seasons"])
async def end_season(id: int, db: AsyncSession = Depends(get_session)):
    """
    Ends a season by its ID.

    Args:
        id (int): The ID of the season to end.
        db (AsyncSession): The database session.

    Returns:
        Season: The updated season object.
    """

    season = await db.get(Season, id)
    if season is None:
        raise HTTPException(status_code=404, detail="Season not found")
    if season.status != EventStatus.ONGOING:
        raise HTTPException(status_code=400, detail="Season is not active")
    season.status = EventStatus.COMPLETED
    season.end = datetime.now()
    await db.commit()
    await db.refresh(season)
    return season


@router.get("/seasons/{id}/matches", tags=["seasons"])
async def list_matches_for_season(id: int, db: AsyncSession = Depends(get_session)):
    """
    Lists all matches for a season by its ID.

    Args:
        id (int): The ID of the season.
        db (AsyncSession): The database session.

    Returns:
        List[Match]: A list of all matches for the specified season.
    """
    season = await db.get(Season, id, options=[selectinload(Season.matches)])
    if season is None:
        raise HTTPException(status_code=404, detail="Season not found")
    return season.matches


@router.get("/seasons/{id}/teams", tags=["seasons"])
async def list_teams_for_season(id: int, db: AsyncSession = Depends(get_session)):
    """
    Lists all teams for a season by its ID.

    Args:
        id (int): The ID of the season.
        db (AsyncSession): The database session.

    Returns:
        List[Team]: A list of all teams for the specified season.
    """
    season = await db.get(Season, id, options=[selectinload(Season.teams)])
    if season is None:
        raise HTTPException(status_code=404, detail="Season not found")
    return season.teams
