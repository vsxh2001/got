from db.models import Season, EventStatus
from db.models.matches import Match
from db.interface import get_session
from fastapi import Depends, HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from typing import List, Optional
from fastapi import APIRouter
from datetime import datetime

router = APIRouter()


@router.get("/matches", response_model=List[Match], tags=["matches"])
async def list_matches(
    season_id: Optional[int] = None, db: AsyncSession = Depends(get_session)
) -> List[Match]:
    """
    Lists all matches, optionally filtered by season_id.

    Args:
        season_id (Optional[int]): The ID of the season to filter matches by.
        db (AsyncSession): The database session.

    Returns:
        List[Match]: A list of all existing matches, filtered by season_id if provided.
    """
    if season_id is not None:
        query = select(Match).where(Match.season_id == season_id)
    else:
        query = select(Match)

    result = await db.scalars(query)
    return result.all()


@router.get("/matches/{id}", response_model=Match, tags=["matches"])
async def get_match(id: int, db: AsyncSession = Depends(get_session)) -> Match:
    """
    Retrieves a match by its ID.

    Args:
        id (int): The ID of the match to retrieve.
        db (AsyncSession): The database session.

    Returns:
        Match: The match object with the specified ID.
    """
    match = await db.get(Match, id)
    if match is None:
        raise HTTPException(status_code=404, detail="Match not found")
    return match


@router.post("/matches", response_model=Match, tags=["matches"])
async def create_match(match: Match, db: AsyncSession = Depends(get_session)) -> Match:
    """
    Creates a new match.

    Args:
        match (Match): The match object to create.
        db (AsyncSession): The database session.

    Returns:
        Match: The newly created match.
    """
    match = Match.model_validate(match.model_dump())
    if match.id is not None:
        raise HTTPException(status_code=400, detail="ID must be None")
    if match.name is None:
        raise HTTPException(status_code=400, detail="Name must be provided")

    # Validate season_id if provided
    if match.season_id is not None:
        season = await db.get(Season, match.season_id)
        if season is None:
            raise HTTPException(status_code=404, detail="Season not found")

    season.matches.append(match)
    await db.commit()
    await db.refresh(match)
    return match


@router.patch("/matches/{id}", response_model=Match, tags=["matches"])
async def update_match(
    id: int, match: Match, db: AsyncSession = Depends(get_session)
) -> Match:
    """
    Updates a match by its ID.

    Args:
        id (int): The ID of the match to update.
        match (Match): The updated match object.
        db (AsyncSession): The database session.

    Returns:
        Match: The updated match object.
    """
    match_data = match.model_dump(exclude_unset=True)
    existing_match = await db.get(Match, id)

    if existing_match is None:
        raise HTTPException(status_code=404, detail="Match not found")

    # Validate season_id if it's being updated
    if "season_id" in match_data and match_data["season_id"] is not None:
        season = await db.get(Season, match_data["season_id"])
        if season is None:
            raise HTTPException(status_code=404, detail="Season not found")

    # Update the match with the new data
    for key, value in match_data.items():
        setattr(existing_match, key, value)

    await db.commit()
    await db.refresh(existing_match)
    return existing_match


@router.delete("/matches/{id}", tags=["matches"])
async def delete_match(id: int, db: AsyncSession = Depends(get_session)):
    """
    Deletes a match by its ID.

    Args:
        id (int): The ID of the match to delete.
        db (AsyncSession): The database session.
    """
    match = await db.get(Match, id)
    if match is None:
        raise HTTPException(status_code=404, detail="Match not found")

    await db.delete(match)
    await db.commit()


@router.post("/matches/{id}/start", tags=["matches"])
async def start_match(id: int, db: AsyncSession = Depends(get_session)):
    """
    Starts a match by its ID.

    Args:
        id (int): The ID of the match to start.
        db (AsyncSession): The database session.

    Returns:
        Match: The updated match object.
    """
    match = await db.get(Match, id)
    if match is None:
        raise HTTPException(status_code=404, detail="Match not found")

    if match.status != EventStatus.PENDING:
        raise HTTPException(status_code=400, detail="Match is not pending")

    match.status = EventStatus.ONGOING
    match.start = datetime.now()
    await db.commit()
    await db.refresh(match)
    return match


@router.post("/matches/{id}/end", tags=["matches"])
async def end_match(id: int, db: AsyncSession = Depends(get_session)):
    """
    Ends a match by its ID.

    Args:
        id (int): The ID of the match to end.
        db (AsyncSession): The database session.

    Returns:
        Match: The updated match object.
    """
    match = await db.get(Match, id)
    if match is None:
        raise HTTPException(status_code=404, detail="Match not found")

    if match.status != EventStatus.ONGOING:
        raise HTTPException(status_code=400, detail="Match is not active")

    match.status = EventStatus.COMPLETED
    match.end = datetime.now()
    await db.commit()
    await db.refresh(match)
    return match
