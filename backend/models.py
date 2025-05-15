from sqlalchemy from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from sqlalchemy.sql import func
from db import Base

class SleepEntry(Base):
    __tablename__ = "sleep_entries"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True, nullable=False)
    sleep_duration = Column(Float, nullable=False)
    sleep_efficiency = Column(Float)
    sleep_quality = Column(String)
    rem_percentage = Column(Float, nullable=False)
    deep_percentage = Column(Float, nullable=False)
    light_percentage = Column(Float, nullable=False)
    awakenings = Column(Integer, nullable=False)
    caffeine = Column(Boolean, default=False)
    alcohol = Column(Boolean, default=False)
    smoker = Column(Boolean, default=False)
    exercise = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
