from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.pool import QueuePool  # Add connection pooling
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is missing!")

# Configure engine with connection pooling and timeouts
engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=5,
    max_overflow=10,
    pool_timeout=30,
    pool_pre_ping=True,  # Test connections for liveness
    pool_recycle=3600    # Recycle connections after 1 hour
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False  # Better for web apps
)

Base = declarative_base()

def get_db():
    """Dependency for getting database session with proper cleanup"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
