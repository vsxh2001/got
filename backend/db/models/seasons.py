from .event import EventStatus
from typing import Optional, TYPE_CHECKING, List, Self
from sqlmodel import Relationship, DateTime, Field, Column, SQLModel
from pydantic import model_validator
from datetime import datetime

if TYPE_CHECKING:
    from .matches import Match
    from .teams import Team


class Season(SQLModel, table=True):
    """
    A season of the tournament.
    """

    id: Optional[int] = Field(
        default=None, primary_key=True, description="ID of the season"
    )
    name: Optional[str] = Field(index=True, description="Name of the season")
    start: Optional[datetime] = Field(
        default=None,
        sa_column=Column(DateTime(timezone=True)),
        description="Start date of the season",
    )
    end: Optional[datetime] = Field(
        default=None,
        sa_column=Column(DateTime(timezone=True)),
        description="End date of the season",
    )
    status: Optional[EventStatus] = Field(
        default=EventStatus.PENDING, description="Status of the season"
    )
    matches: Optional[List["Match"]] = Relationship(
        back_populates="season", cascade_delete=True
    )
    teams: Optional[List["Team"]] = Relationship(
        back_populates="season", cascade_delete=True
    )

    @model_validator(mode="after")
    def check_time_order(self) -> Self:
        if self.start and self.end and self.start > self.end:
            raise ValueError("Start date must be before end date")
        return self
