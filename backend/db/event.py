from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional

class Event(SQLModel, table=False):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: Optional[str] = Field(index=True)
    start: Optional[datetime]
    end: Optional[datetime]
