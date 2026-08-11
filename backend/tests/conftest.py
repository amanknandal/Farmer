import os

os.environ["DATABASE_URL"] = "sqlite:///:memory:"
os.environ["SECRET_KEY"] = "test-secret"
os.environ["JWT_SECRET_KEY"] = "test-secret"
os.environ["FLASK_ENV"] = "development"

import pytest
from app import create_app
from database.db import db
from utils import cache


@pytest.fixture(autouse=True)
def clear_cache():
    cache._store.clear()
    yield
    cache._store.clear()


@pytest.fixture
def app():
    test_app = create_app()
    test_app.config.update({"TESTING": True})

    with test_app.app_context():
        db.create_all()
        yield test_app
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()
