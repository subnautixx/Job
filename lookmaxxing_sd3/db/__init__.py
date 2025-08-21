import os
from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .models import Base


def _default_db_url() -> str:
	base_dir = os.getenv("WORKSPACE_DIR", os.getcwd())
	db_path = os.path.abspath(os.path.join(base_dir, "outputs", "lookmaxxing.db"))
	os.makedirs(os.path.dirname(db_path), exist_ok=True)
	return f"sqlite:///{db_path}"


DB_URL = os.getenv("DATABASE_URL", _default_db_url())
engine = create_engine(DB_URL, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)


def init_db() -> None:
	Base.metadata.create_all(bind=engine)


@contextmanager
def get_session():
	session = SessionLocal()
	try:
		yield session
		session.commit()
	except Exception:
		session.rollback()
		raise
	finally:
		session.close()