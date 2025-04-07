from sqlalchemy import Column, Integer, String, Float, Boolean
from db import Base

class SleepEntry(Base):
    __tablename__ = "sleep_entries"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    sleep_duration = Column(Float)
    sleep_efficiency = Column(Float)
    sleep_quality = Column(String)
    rem_percentage = Column(Float)
    deep_percentage = Column(Float)
    light_percentage = Column(Float)
    awakenings = Column(Integer)
    caffeine = Column(Float)
    alcohol = Column(Float)
    smoker = Column(Boolean)
    exercise = Column(Float)
