from enum import Enum
from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional

class EventStatus(Enum):
    PENDING = "pending"
    ONGOING = "ongoing"
    COMPLETED = "completed"

class Event(SQLModel, table=False):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: Optional[str] = Field(index=True)
    start: Optional[datetime]
    end: Optional[datetime]
    status: Optional[EventStatus] = Field(default=EventStatus.PENDING)
