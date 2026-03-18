import pytest
import io

@pytest.mark.asyncio
async def test_vision_endpoint(client):
    # Create a small dummy image
    image_content = b"fake-image-binary-content"
    files = {"file": ("test.jpg", io.BytesIO(image_content), "image/jpeg")}
    data = {"language": "en"}
    
    response = await client.post("/api/vision", data=data, files=files)
    # Even if it fails downstream (API keys), it should reach the vision logic
    assert response.status_code == 200
