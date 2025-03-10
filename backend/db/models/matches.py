from .event import EventStatus
from typing import Optional, TYPE_CHECKING, Self
from sqlmodel import Field, Relationship, Column, DateTime, SQLModel
from pydantic import model_validator
from datetime import datetime

if TYPE_CHECKING:
    from .seasons import Season


class Match(SQLModel, table=True):
    id: Optional[int] = Field(
        default=None, primary_key=True, description="ID of the match"
    )
    name: Optional[str] = Field(index=True, description="Name of the match")
    start: Optional[datetime] = Field(
        default=None,
        sa_column=Column(DateTime(timezone=True)),
        description="Start date of the match",
    )
    end: Optional[datetime] = Field(
        default=None,
        sa_column=Column(DateTime(timezone=True)),
        description="End date of the match",
    )
    status: Optional[EventStatus] = Field(
        default=EventStatus.PENDING, description="Status of the match"
    )
    season_id: Optional[int] = Field(
        default=None, foreign_key="season.id", description="ID of the season"
    )
    season: Optional["Season"] = Relationship(back_populates="matches")

    @model_validator(mode="after")
    def check_time_order(self) -> Self:
        if self.start and self.end and self.start > self.end:
            raise ValueError("Start date must be before end date")
        return self
