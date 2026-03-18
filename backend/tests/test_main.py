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
    # Note: result might be a mock or real depending on API keys
    assert "score" in response.json() or "error" in response.json()

@pytest.mark.asyncio
async def test_agent_endpoint_exists(client):
    response = await client.post("/api/agent", json={"message": "What time is it?", "language": "en"})
    assert response.status_code == 200
    assert "reply" in response.json()
