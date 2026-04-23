import os
import pytest
from io import BytesIO
from app import create_app
from extensions import db
from models import AnalysisLog, TransformationLog

@pytest.fixture
def app():
    # Use an in-memory SQLite database for testing
    app = create_app({'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:', 'TESTING': True})
    
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

def test_health_check(client):
    response = client.get('/api/health')
    assert response.status_code == 200
    assert response.json == {"status": "ok", "message": "Backend is running!"}

def test_analyze_url_missing(client):
    response = client.post('/api/analyze', json={})
    assert response.status_code == 400
    assert "error" in response.json

def test_analyze_url_success(client, mocker, app):
    # Mock the groq service to prevent actual API calls during tests
    mock_analyze = mocker.patch('routes.groq_service.analyze_url', return_value={"score": 85, "feedback": "Good job."})
    
    response = client.post('/api/analyze', json={'url': 'https://example.com'})
    
    assert response.status_code == 200
    assert response.json['score'] == 85
    assert response.json['feedback'] == "Good job."
    mock_analyze.assert_called_once_with('https://example.com')
    
    # Verify database log
    with app.app_context():
        log = AnalysisLog.query.first()
        assert log is not None
        assert log.url == 'https://example.com'
        assert log.score == 85
        assert log.success == True

def test_transform_doc_no_file(client):
    response = client.post('/api/transform')
    assert response.status_code == 400
    assert "error" in response.json

def test_transform_doc_invalid_extension(client):
    data = {
        'file': (BytesIO(b"dummy content"), 'test.pdf')
    }
    response = client.post('/api/transform', data=data, content_type='multipart/form-data')
    assert response.status_code == 400
    assert "error" in response.json

def test_transform_doc_success(client, mocker, app):
    mock_transform = mocker.patch('routes.groq_service.transform_document', return_value="# Mocked Markdown\n\nContent")
    
    data = {
        'file': (BytesIO(b"dummy markdown content"), 'test.md')
    }
    response = client.post('/api/transform', data=data, content_type='multipart/form-data')
    
    assert response.status_code == 200
    assert response.json['markdown'] == "# Mocked Markdown\n\nContent"
    mock_transform.assert_called_once_with("dummy markdown content")
    
    # Verify database log
    with app.app_context():
        log = TransformationLog.query.first()
        assert log is not None
        assert log.filename == 'test.md'
        assert log.success == True
        assert log.original_size == len(b"dummy markdown content")

def test_optimize_tool_success(client, mocker, app):
    mock_response = {
        "optimized_description": "Test description",
        "tool_schema": "{}",
        "suggestions": "[]"
    }
    mock_optimize = mocker.patch('routes.groq_service.optimize_tool', return_value=mock_response)
    
    response = client.post('/api/optimize_tool', json={'input_text': 'Make a tool for X'})
    
    assert response.status_code == 200
    assert response.json['optimized_description'] == "Test description"
    mock_optimize.assert_called_once_with('Make a tool for X')

def test_history_success(client, app):
    response = client.get('/api/history')
    assert response.status_code == 200
    assert isinstance(response.json, list)
