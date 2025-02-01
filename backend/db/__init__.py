from sqlmodel import SQLModel
from db.confdb import engine
from .seasons import Season


SQLModel.metadata.clear()
SQLModel.metadata.tables["seasons"] = Season.__table__
SQLModel.metadata.create_all(engine)
