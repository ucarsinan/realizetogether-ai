import pytest

@pytest.mark.asyncio
async def test_chat_endpoint_exists(client):
    response = await client.post("/api/chat", json={"message": "Hello", "language": "en"})
    assert response.status_code == 200
    assert "reply" in response.json()

@pytest.mark.asyncio
async def test_analyze_sentiment_exists(client):
    response = await client.post("/api/analyze", json={"text": "I am happy", "language": "en"})
    assert response.status_code == 200
    assert "score" in response.json() or "error" in response.json()

@pytest.mark.asyncio
async def test_agent_endpoint_exists(client):
    response = await client.post("/api/agent", json={"message": "What time is it?", "language": "en"})
    assert response.status_code == 200
    assert "reply" in response.json()

@pytest.mark.asyncio
async def test_chat_missing_message_field(client):
    """Fehlende Pflichtfelder sollen 422 zurückgeben."""
    response = await client.post("/api/chat", json={"language": "de"})
    assert response.status_code == 422

@pytest.mark.asyncio
async def test_analyze_missing_text_field(client):
    """Fehlende Pflichtfelder sollen 422 zurückgeben."""
    response = await client.post("/api/analyze", json={"language": "de"})
    assert response.status_code == 422

@pytest.mark.asyncio
async def test_chat_response_structure(client):
    """Chat-Response muss immer ein 'reply'-Feld enthalten."""
    response = await client.post("/api/chat", json={"message": "Hallo", "language": "de"})
    assert response.status_code == 200
    data = response.json()
    assert "reply" in data
    assert isinstance(data["reply"], str)
