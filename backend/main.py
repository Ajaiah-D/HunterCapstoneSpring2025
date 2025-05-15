from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from db import SessionLocal, get_db, Base
import models
import pickle
import numpy as np
import firebase_admin
from firebase_admin import auth, credentials
import os
from typing import List
from pydantic import BaseModel
from datetime import datetime


# Initialize Firebase Admin
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase-admin.json")
    firebase_admin.initialize_app(cred)


# Load your model
with open('sleep_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Create tables if they don't exist yet
models.Base.metadata.create_all(bind=engine)

# Create tables (async version)
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app = FastAPI()
# Token verification dependency
security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token["email"]
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
# Dependency to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models for request/response validation
class SleepEntryCreate(BaseModel):
    sleep_duration: float
    rem_percentage: float
    deep_percentage: float
    light_percentage: float
    awakenings: int
    caffeine_consumption: bool
    alcohol_consumption: bool
    smoking_status: bool
    exercise_frequency: int

class SleepEntryResponse(SleepEntryCreate):
    id: int
    user_email: str
    sleep_efficiency: float
    sleep_quality: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


@app.post("/predict")
async def predict_sleep(data: dict, db: Session = Depends(get_db)):
    try:
        # Prepare input for model
        input_features = np.array([
            data['age'],
            data['gender'],
            data['sleep_duration'],
            data['rem_sleep_percentage'],
            data['light_sleep_percentage'],
            data['awakenings'],
            data['caffeine_consumption'],
            data['alcohol_consumption'],
            data['smoking_status'],
            data['exercise_frequency']
        ]).reshape(1, -1)

        # Predict
        prediction = model.predict(input_features)[0]
        sleep_efficiency = round(prediction, 2)

        # Save to database
        new_entry = models.UserSleepEntry(
            age=data['age'],
            gender=data['gender'],
            sleep_duration=data['sleep_duration'],
            rem_sleep_percentage=data['rem_sleep_percentage'],
            light_sleep_percentage=data['light_sleep_percentage'],
            awakenings=data['awakenings'],
            caffeine_consumption=data['caffeine_consumption'],
            alcohol_consumption=data['alcohol_consumption'],
            smoking_status=data['smoking_status'],
            exercise_frequency=data['exercise_frequency'],
            predicted_sleep_efficiency=sleep_efficiency
        )

        db.add(new_entry)
        db.commit()
        db.refresh(new_entry)

        return {"sleep_efficiency": sleep_efficiency, "message": "Prediction saved successfully."}
    
    except Exception as e:
        return {"error": str(e)}

# NEW CRUD ENDPOINTS

# Create entry (alternative to predict endpoint)
@app.post("/entries/", response_model=SleepEntryResponse, status_code=status.HTTP_201_CREATED)
async def create_entry(
    entry: SleepEntryCreate,
    user_email: str = Depends(verify_token),
    db: AsyncSession = Depends(get_db)
):
    db_entry = models.SleepEntry(
        user_email=user_email,
        **entry.dict(),
        sleep_efficiency=0.0,  # Will be calculated if needed
        sleep_quality="Unknown"
    )
    db.add(db_entry)
    await db.commit()
    await db.refresh(db_entry)
    return db_entry

# Get all entries for user
@app.get("/entries/", response_model=List[SleepEntryResponse])
async def read_entries(
    skip: int = 0,
    limit: int = 100,
    user_email: str = Depends(verify_token),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(models.SleepEntry)
        .where(models.SleepEntry.user_email == user_email)
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()

# Get single entry
@app.get("/entries/{entry_id}", response_model=SleepEntryResponse)
async def read_entry(
    entry_id: int,
    user_email: str = Depends(verify_token),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(models.SleepEntry)
        .where(models.SleepEntry.id == entry_id)
        .where(models.SleepEntry.user_email == user_email)
    )
    entry = result.scalars().first()
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    return entry

# Update entry
@app.put("/entries/{entry_id}", response_model=SleepEntryResponse)
async def update_entry(
    entry_id: int,
    entry_update: SleepEntryCreate,
    user_email: str = Depends(verify_token),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(models.SleepEntry)
        .where(models.SleepEntry.id == entry_id)
        .where(models.SleepEntry.user_email == user_email)
    )
    db_entry = result.scalars().first()
    if not db_entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    
    for key, value in entry_update.dict().items():
        setattr(db_entry, key, value)
    
    await db.commit()
    await db.refresh(db_entry)
    return db_entry

# Delete entry
@app.delete("/entries/{entry_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_entry(
    entry_id: int,
    user_email: str = Depends(verify_token),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(models.SleepEntry)
        .where(models.SleepEntry.id == entry_id)
        .where(models.SleepEntry.user_email == user_email)
    )
    db_entry = result.scalars().first()
    if not db_entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    
    await db.delete(db_entry)
    await db.commit()
    return None

# Startup event to create tables
@app.on_event("startup")
async def on_startup():
    await init_db()
