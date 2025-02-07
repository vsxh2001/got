from enum import Enum
from sqlmodel import SQLModel, Field, Column, DateTime
from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class EventStatus(str, Enum):
    PENDING = "pending"
    ONGOING = "ongoing"
    COMPLETED = "completed"


class Event(SQLModel, table=False):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: Optional[str] = Field(index=True)
    start: Optional[datetime] = Field(
        default=None, sa_column=Column(DateTime(timezone=True))
    )
    end: Optional[datetime] = Field(
        default=None, sa_column=Column(DateTime(timezone=True))
    )
    status: Optional[EventStatus] = Field(default=EventStatus.PENDING)
