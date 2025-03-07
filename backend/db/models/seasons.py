from .event import EventStatus
from typing import Optional, TYPE_CHECKING, List
from sqlmodel import Relationship, DateTime, Field, Column, SQLModel
from datetime import datetime

if TYPE_CHECKING:
    from .matches import Match


class Season(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: Optional[str] = Field(index=True)
    start: Optional[datetime] = Field(
        default=None, sa_column=Column(DateTime(timezone=True))
    )
    end: Optional[datetime] = Field(
        default=None, sa_column=Column(DateTime(timezone=True))
    )
    status: Optional[EventStatus] = Field(default=EventStatus.PENDING)
    matches: Optional[List["Match"]] = Relationship(
        back_populates="season", cascade_delete=True
    )
