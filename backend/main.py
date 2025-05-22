from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import models
import pickle
import numpy as np
import firebase_admin
from firebase_admin import auth, credentials
import os
from datetime import datetime
from db import Base, engine, get_db

# Initialize Firebase Admin
if not firebase_admin._apps:
    cred_path = os.path.join(os.path.dirname(__file__), "firebase-admin.json")
    if not os.path.exists(cred_path):
        raise RuntimeError("Firebase credentials file not found")
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)

# Load ML model with error handling
try:
    with open("sleep_model.pkl", "rb") as f:
        model = pickle.load(f)
except Exception as e:
    raise RuntimeError(f"Failed to load ML model: {str(e)}")

# Create tables with schema versioning
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    raise RuntimeError(f"Database initialization failed: {str(e)}")

app = FastAPI(
    title="Sleep Efficiency API",
    description="API for predicting and tracking sleep efficiency",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models for request/response validation
class SleepDataInput(BaseModel):
    age: int
    sleep_duration: float
    rem_sleep_percentage: float
    light_sleep_percentage: float
    awakenings: int
    caffeine_consumption: int
    alcohol_consumption: int
    smoking_status: bool
    exercise_frequency: int

class SleepEfficiencyOutput(BaseModel):
    sleep_efficiency: float
    sleep_quality: str
    message: str

class SleepEntryResponse(BaseModel):
    id: int
    user_email: str
    date: datetime
    sleep_duration: float
    sleep_efficiency: float
    sleep_quality: str
    rem_percentage: float
    deep_percentage: float
    light_percentage: float
    awakenings: int
    caffeine: int
    alcohol: int
    smoker: bool
    exercise: int

# Token verification dependency
security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token["email"]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

@app.post("/predict", response_model=SleepEfficiencyOutput)
async def predict_sleep(
    request: Request,
    user_email: str = Depends(verify_token),  # Enable actual auth
    db: Session = Depends(get_db)
):
    try:
        data = await request.json()
        # Validate input data
        if not all(key in data for key in [
            'age', 'sleep_duration', 'rem_sleep_percentage', 
            'light_sleep_percentage', 'awakenings', 
            'caffeine_consumption', 'alcohol_consumption',
            'smoking_status', 'exercise_frequency'
        ]):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Missing required fields"
            )

        deepsleep = 100 - data['rem_sleep_percentage'] - data['light_sleep_percentage']
        input_features = np.array([
            data['age'],
            data['sleep_duration'],
            data['rem_sleep_percentage'],
            deepsleep,
            data['light_sleep_percentage'],
            data['awakenings'],
            data['caffeine_consumption'],
            data['alcohol_consumption'],
            int(data['smoking_status']),
            data['exercise_frequency']
        ]).reshape(1, -1)

        prediction = model.predict(input_features)[0]
        sleep_efficiency = float(round(prediction, 2))
        sleep_quality = "Good" if sleep_efficiency >= 85 else "Poor"

        entry = models.SleepEntry(
            user_email=user_email,
            sleep_duration=data['sleep_duration'],
            sleep_efficiency=sleep_efficiency,
            sleep_quality=sleep_quality,
            rem_percentage=data['rem_sleep_percentage'],
            deep_percentage=deepsleep,
            light_percentage=data['light_sleep_percentage'],
            awakenings=data['awakenings'],
            caffeine=data['caffeine_consumption'],
            alcohol=data['alcohol_consumption'],
            smoker=bool(data['smoking_status']),
            exercise=data['exercise_frequency']
        )

        db.add(entry)
        db.commit()
        db.refresh(entry)

        return {
            "sleep_efficiency": sleep_efficiency,
            "sleep_quality": sleep_quality,
            "message": "Prediction saved successfully."
        }

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid input data: {str(e)}"
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )

@app.get("/history", response_model=List[SleepEntryResponse])
async def get_sleep_history(
    user_email: str = Depends(verify_token),
    db: Session = Depends(get_db),
    limit: int = 10,
    offset: int = 0
):
    """Retrieve user's sleep history with pagination"""
    try:
        entries = db.query(models.SleepEntry)\
            .filter(models.SleepEntry.user_email == user_email)\
            .order_by(models.SleepEntry.date.desc())\
            .limit(limit)\
            .offset(offset)\
            .all()
        return entries
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve history: {str(e)}"
        )
