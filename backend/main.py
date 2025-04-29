from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from backend.db import SessionLocal, engine
from backend import models
import pickle
import numpy as np

# Load your model
with open('sleep_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Create tables if they don't exist yet
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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
