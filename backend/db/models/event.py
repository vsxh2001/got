from enum import Enum
from sqlmodel import SQLModel, Field, Column, DateTime, table
from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class EventStatus(str, Enum):
    PENDING = "pending"
    ONGOING = "ongoing"
    COMPLETED = "completed"
