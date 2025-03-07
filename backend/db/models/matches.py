from .event import EventStatus
from typing import Optional, TYPE_CHECKING
from sqlmodel import Field, Relationship, Column, DateTime, SQLModel
from datetime import datetime

if TYPE_CHECKING:
    from .seasons import Season


class Match(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: Optional[str] = Field(index=True)
    start: Optional[datetime] = Field(
        default=None, sa_column=Column(DateTime(timezone=True))
    )
    end: Optional[datetime] = Field(
        default=None, sa_column=Column(DateTime(timezone=True))
    )
    status: Optional[EventStatus] = Field(default=EventStatus.PENDING)
    season_id: Optional[int] = Field(default=None, foreign_key="season.id")
    season: Optional["Season"] = Relationship(back_populates="matches")
