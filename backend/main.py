from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np
from pydantic import BaseModel
from db import Base, engine
from models import SleepEntry
Base.metadata.create_all(bind=engine)
#load trained model

with open("sleep_model.pkl", "rb") as f:
    model = pickle.load(f)

#initialize FastAPI app
app = FastAPI()

#Fix CORS issue
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Only allow your React app
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (POST, GET, etc.)
    allow_headers=["*"],  # Allow all headers
)

#define request structure
class SleepData(BaseModel):
    age: int
    gender: int
    sleep_duration: float
    rem_sleep_percentage: float
    light_sleep_percentage: float
    awakenings: int
    caffeine_consumption: float
    alcohol_consumption: float
    smoking_status: int
    exercise_frequency: int

#API endpoint for predictions
@app.post("/predict")
def predict_sleep(data: SleepData):
    input_data = np.array([[data.age, data.gender, data.sleep_duration, 
                            data.rem_sleep_percentage, data.light_sleep_percentage,
                            data.awakenings, data.caffeine_consumption, 
                            data.alcohol_consumption, data.smoking_status, data.exercise_frequency]])

    sleep_efficiency = model.predict(input_data)[0]

    #add recommendations Based on Model Output
    recommendations = []
    if sleep_efficiency < 75:
        recommendations.append("Your sleep efficiency is low. Try improving bedtime consistency.")
    if data.sleep_duration < 6:
        recommendations.append("Consider increasing your total sleep time.")
    if data.caffeine_consumption > 2:
        recommendations.append("Try reducing caffeine intake before bedtime.")
    if data.alcohol_consumption > 1:
        recommendations.append("Consider reducing alcohol consumption before sleep.")
    if data.awakenings > 2:
        recommendations.append("Frequent awakenings might indicate sleep disturbances. Try a relaxing bedtime routine.")
    if data.exercise_frequency < 2:
        recommendations.append("Exercising regularly can improve sleep quality.")

    return {"sleep_efficiency": round(sleep_efficiency, 2), "recommendations": recommendations}