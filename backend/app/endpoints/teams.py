from fastapi import APIRouter, Depends, HTTPException
from db.models import Team, Season
from db.interface import get_session
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select

router = APIRouter()


@router.post("/teams", response_model=Team, tags=["teams"])
async def create_team(team: Team, db: AsyncSession = Depends(get_session)) -> Team:
    """
    Creates a new team.

    Args:
        team (Team): The team object to create.
        db (AsyncSession): The database session.

    Returns:
        Team: The newly created team.
    """
    if team.id is not None:
        raise HTTPException(status_code=400, detail="ID must be None")
    if team.name is None:
        raise HTTPException(status_code=400, detail="Name must be provided")
    if team.season_id is None:
        raise HTTPException(status_code=400, detail="Season ID must be provided")
    season = await db.get(Season, team.season_id)
    if season is None:
        raise HTTPException(status_code=404, detail="Season not found")
    db.add(team)
    await db.commit()
    await db.refresh(team)
    return team


@router.get("/teams/{id}", response_model=Team, tags=["teams"])
async def get_team(id: int, db: AsyncSession = Depends(get_session)) -> Team:
    """
    Retrieves a team by its ID.

    Args:
        id (int): The ID of the team to retrieve.
        db (AsyncSession): The database session.

    Returns:
        Team: The team object with the specified ID.
    """
    team = await db.get(Team, id)
    if team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    return team


@router.patch("/teams/{id}", response_model=Team, tags=["teams"])
async def update_team(
    id: int, team: Team, db: AsyncSession = Depends(get_session)
) -> Team:
    """
    Updates a team by its ID.

    Args:
        id (int): The ID of the team to update.
        team (Team): The updated team object.
        db (AsyncSession): The database session.

    Returns:
        Team: The updated team object.
    """
    existing_team = await db.get(Team, id)
    if existing_team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    existing_team.update_from_dict(team.model_dump(exclude_unset=True))
    await db.commit()
    await db.refresh(existing_team)
    return existing_team


@router.delete("/teams/{id}", tags=["teams"])
async def delete_team(id: int, db: AsyncSession = Depends(get_session)):
    """
    Deletes a team by its ID.

    Args:
        id (int): The ID of the team to delete.
        db (AsyncSession): The database session.
    """
    team = await db.get(Team, id)
    if team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    await db.delete(team)
    await db.commit()
