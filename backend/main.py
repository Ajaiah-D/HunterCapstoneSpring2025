from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from db import SessionLocal, engine
import models
import pickle
import numpy as np
import firebase_admin
from firebase_admin import auth, credentials
from fastapi.middleware.cors import CORSMiddleware
import os

# Initialize Firebase Admin
if not firebase_admin._apps:
    cred = credentials.Certificate(os.path.join(os.path.dirname(__file__), "firebase-admin.json"))
    firebase_admin.initialize_app(cred)

# Load ML model
with open("sleep_model.pkl", "rb") as f:
    model = pickle.load(f)

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] to be specific
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB session dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Token verification dependency
security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token["email"]  # return user email
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

@app.post("/predict")
async def predict_sleep(
    request: Request,
    user_email: str = "test@gmail.com",  #put this back later -> Depends(verify_token)
    db: Session = Depends(get_db)
):
    try:
        data = await request.json()
        print("[Incoming Data]", data)
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

        entry = models.SleepEntry(
            user_email=user_email,
            sleep_duration=data['sleep_duration'],
            sleep_efficiency=sleep_efficiency,
            sleep_quality="Good" if sleep_efficiency >= 85 else "Poor",
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

        return {"sleep_efficiency": sleep_efficiency, "message": "Prediction saved successfully."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
