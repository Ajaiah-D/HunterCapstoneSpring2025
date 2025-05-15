from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("postgresql://capstone_1xb4_user:qc5JDTjIj7s77n2cTWBcwwOzOnYelzSh@dpg-cvp7v0k9c44c73bv67dg-a/capstone_1xb4")

ASYNC_DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base = declarative_base()
print("DATABASE_URL:", DATABASE_URL)

async def get_db():
    async with SessionLocal() as db:
        yield db
