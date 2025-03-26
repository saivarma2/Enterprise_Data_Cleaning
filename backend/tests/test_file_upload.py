# Enterprise_Data_Cleaning/backend/tests/test_file_upload.py
import pytest
from backend.app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_upload_no_file(client):
    response = client.post('/file/upload')
    json_data = response.get_json()
    assert response.status_code == 400
    assert 'error' in json_data
