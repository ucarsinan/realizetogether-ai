import io
import pytest
from main import calculator, _safe_eval_node
import ast


# ==========================================
# INPUT VALIDATION
# ==========================================

@pytest.mark.asyncio
async def test_chat_message_too_long(client):
    """Nachrichten über 2000 Zeichen sollen mit 422 abgelehnt werden."""
    response = await client.post("/api/chat", json={"message": "A" * 2001, "language": "de"})
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_chat_empty_message(client):
    """Leere Nachrichten sollen mit 422 abgelehnt werden."""
    response = await client.post("/api/chat", json={"message": "", "language": "de"})
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_chat_invalid_language(client):
    """Nicht erlaubte Sprachen sollen mit 422 abgelehnt werden."""
    response = await client.post("/api/chat", json={"message": "Hallo", "language": "fr"})
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_analyze_text_too_long(client):
    """Texte über 2000 Zeichen sollen mit 422 abgelehnt werden."""
    response = await client.post("/api/analyze", json={"text": "B" * 2001, "language": "de"})
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_analyze_empty_text(client):
    """Leere Texte sollen mit 422 abgelehnt werden."""
    response = await client.post("/api/analyze", json={"text": "", "language": "de"})
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_analyze_invalid_language(client):
    """Nicht erlaubte Sprachen sollen mit 422 abgelehnt werden."""
    response = await client.post("/api/analyze", json={"text": "Test", "language": "es"})
    assert response.status_code == 422


# ==========================================
# CALCULATOR: KEIN CODE-EXECUTION (RCE)
# ==========================================

def test_calculator_no_import():
    """__import__ soll nicht ausgeführt werden können."""
    result = calculator.invoke("__import__('os').system('echo pwned')")
    assert "Fehler" in result or "Ungültiger" in result


def test_calculator_no_builtins():
    """Zugriff auf __builtins__ soll fehlschlagen."""
    result = calculator.invoke("__builtins__")
    assert "Fehler" in result or "Ungültiger" in result


def test_calculator_no_attribute_access():
    """Attributzugriffe sollen nicht möglich sein."""
    result = calculator.invoke("().__class__.__bases__")
    assert "Fehler" in result or "Ungültiger" in result


def test_calculator_no_string_literals():
    """String-Literale sollen nicht erlaubt sein."""
    result = calculator.invoke("'test'")
    assert "Fehler" in result or "Ungültiger" in result


def test_calculator_division_by_zero():
    """Division durch Null soll sauber abgefangen werden."""
    result = calculator.invoke("1/0")
    assert "Fehler" in result


def test_calculator_safe_expressions():
    """Normale Ausdrücke sollen korrekt berechnet werden."""
    assert calculator.invoke("2 + 2") == "4"
    assert calculator.invoke("10 * 5") == "50"
    assert calculator.invoke("2 ** 8") == "256"
    assert calculator.invoke("10 / 4") == "2.5"
    assert calculator.invoke("-5 + 3") == "-2"


def test_safe_eval_node_rejects_unknown():
    """_safe_eval_node soll bei unbekannten AST-Knoten ValueError werfen."""
    call_node = ast.parse("print('x')", mode="eval").body
    with pytest.raises((ValueError, TypeError, KeyError)):
        _safe_eval_node(call_node)


# ==========================================
# FILE UPLOAD SECURITY
# ==========================================

@pytest.mark.asyncio
async def test_vision_wrong_mime_type(client):
    """Nicht-Bild-Dateitypen sollen mit 400 abgelehnt werden."""
    fake_text = io.BytesIO(b"this is not an image")
    response = await client.post(
        "/api/vision",
        files={"file": ("test.txt", fake_text, "text/plain")},
        data={"language": "de"},
    )
    assert response.status_code == 400


@pytest.mark.asyncio
async def test_vision_file_too_large(client):
    """Dateien über 4MB sollen mit 400 abgelehnt werden."""
    large_file = io.BytesIO(b"X" * (5 * 1024 * 1024))  # 5 MB
    response = await client.post(
        "/api/vision",
        files={"file": ("big.jpg", large_file, "image/jpeg")},
        data={"language": "de"},
    )
    assert response.status_code == 400


@pytest.mark.asyncio
async def test_vision_no_file(client):
    """Anfragen ohne Datei sollen mit 422 abgelehnt werden."""
    response = await client.post("/api/vision", data={"language": "de"})
    assert response.status_code == 422


# ==========================================
# ERROR HANDLING: KEINE DETAILS AN CLIENT
# ==========================================

@pytest.mark.asyncio
async def test_error_response_no_stack_trace(client):
    """500-Fehler sollen keine Stack-Traces oder Exception-Details enthalten."""
    # Sende ungültigen JSON-Body direkt
    response = await client.post(
        "/api/chat",
        content=b"not-json",
        headers={"Content-Type": "application/json"},
    )
    # Entweder 422 (Pydantic) oder 500 — in beiden Fällen kein traceback
    body = response.text
    assert "Traceback" not in body
    assert "File \"" not in body


# ==========================================
# HEALTH ENDPOINT
# ==========================================

@pytest.mark.asyncio
async def test_health_endpoint(client):
    """Health-Endpoint soll 200 zurückgeben."""
    response = await client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


@pytest.mark.asyncio
async def test_root_endpoint(client):
    """Root-Endpoint soll 200 zurückgeben."""
    response = await client.get("/")
    assert response.status_code == 200
