from typing import Optional, TYPE_CHECKING, Self
from sqlmodel import Field, Relationship, Column, DateTime, SQLModel
from pydantic import model_validator
from datetime import datetime

if TYPE_CHECKING:
    from .seasons import Season


class Team(SQLModel, table=True):
    id: Optional[int] = Field(
        default=None, primary_key=True, description="ID of the team"
    )
    name: Optional[str] = Field(index=True, unique=True, description="Name of the team")
    color: Optional[str] = Field(description="Color of the team")
    season_id: Optional[int] = Field(
        foreign_key="seasons.id", description="ID of the season"
    )
    season: Optional["Season"] = Relationship(back_populates="teams")
