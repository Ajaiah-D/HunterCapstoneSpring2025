# This folder contains the backend for the Sleep Analyzer project. 

## It handles:

- Sleep entry submissions via API
- Storing user-specific sleep data in `PostgreSQL` (hosted on Render)
- Running a trained machine learning model `sleep_model.pkl` to analyze and classify sleep quality

### Setup Instructions
1. Clone the Project & Install Dependencies <br />  
  `git clone https://github.com/Ajaiah-D/HunterCapstoneSpring2025.git`  
  `cd HunterCapstoneSpring2025/backend`  
  `pip install -r requirements.txt`

2. Create a .env File <br /><br />
Use the provided example.env to create your own .env file:  
`cp example.env .env` <br /><br />
Then paste your PostgreSQL URL (from Render) into .env:  
`DATABASE_URL=postgresql://your_user:your_password@your_host/your_dbname`

4. Run the API Server <br /><br />
From the backend directory:
`uvicorn main:app --reload` <- If you're running from backend folder, which you should be. <br />
This starts the FastAPI backend at http://127.0.0.1:8000.

### Files Explained
main.py: Entry point for the FastAPI server
db.py: Handles SQLAlchemy engine + session setup
models.py: SQLAlchemy model for the sleep_entries table
.env / example.env: Stores PostgreSQL connection info **PLEASE READ INSTRUCTIONS ON EXAMPLE.ENV AS WELL**
sleep_model.pkl: Pre-trained model used for predictions
Sleep_Efficiency.csv / cleaned_kaggle_sleep.csv: Datasets used during model training
kaggle_sleep.ipynb: Notebook for data cleaning & model creation

### How to Check the Database
- Open `pgAdmin` and connect to the `Render-hosted PostgreSQL` using the same credentials in `.env`
- Navigate to the sleep_entries table under your schema
- View or query user submissions and model predictions
