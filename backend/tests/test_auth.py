# Enterprise_Data_Cleaning/backend/tests/test_auth.py
import pytest
from backend.app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_login_success(client):
    response = client.post('/auth/login', json={"username": "admin", "password": "admin"})
    data = response.get_json()
    assert response.status_code == 200
    assert "token" in data

def test_login_failure(client):
    response = client.post('/auth/login', json={"username": "user", "password": "wrong"})
    data = response.get_json()
    assert response.status_code == 401
    assert "error" in data
