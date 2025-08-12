from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Database credentials (support both DB_* and generic names; provide safe defaults)
DB_NAME = os.getenv("DB_NAME", "medsynk_db")
PORT = int(os.getenv("DB_PORT") or os.getenv("PORT", "5432"))
HOST = os.getenv("DB_HOST") or os.getenv("HOST", "localhost")
USER = os.getenv("DB_USER") or os.getenv("USER")
PASSWORD = os.getenv("DB_PASSWORD") or os.getenv("PASSWORD")

# Optional schema (defaults to public)
SCHEMA_NAME = os.getenv("DB_SCHEMA", "public")

# Create DB if not exists
def create_database():
    try:
        conn = psycopg2.connect(
            dbname="postgres",  # connect to default DB to create new one
            host=HOST,
            user=USER,
            password=PASSWORD,
            port=PORT
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()

        cur.execute(f"SELECT 1 FROM pg_database WHERE datname = '{DB_NAME}'")
        exists = cur.fetchone()

        if exists:
            print("✅ Database already exists")
        else:
            cur.execute(f"CREATE DATABASE {DB_NAME}")
            print(f"✅ Database '{DB_NAME}' created successfully!")

        cur.close()
        conn.close()
    except Exception as e:
        print("❌ Unable to connect or create the database:", e)


def create_schema_if_not_exists():
    """Create the PostgreSQL schema if it doesn't exist and it's not 'public'."""
    if not SCHEMA_NAME or SCHEMA_NAME == "public":
        return
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            host=HOST,
            user=USER,
            password=PASSWORD,
            port=PORT,
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()
        cur.execute(f"CREATE SCHEMA IF NOT EXISTS {SCHEMA_NAME}")
        print(f"✅ Schema '{SCHEMA_NAME}' is ready")
        cur.close()
        conn.close()
    except Exception as e:
        print("❌ Unable to create the schema:", e)

# Run DB creation (and schema creation if requested)
create_database()
create_schema_if_not_exists()

# SQLAlchemy DB URL
DATABASE_URL = f"postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB_NAME}"

# SQLAlchemy setup with default schema for metadata
default_metadata = MetaData(schema=SCHEMA_NAME if SCHEMA_NAME else None)
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base(metadata=default_metadata)

# Base.metadata.create_all(bind=engine)


# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
