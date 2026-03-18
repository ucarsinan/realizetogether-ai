import pytest
from main import calculator, search_projects, get_current_time

def test_calculator_basic():
    assert calculator.invoke("2 + 2") == "4"
    assert calculator.invoke("10 * 5") == "50"

def test_calculator_error():
    result = calculator.invoke("invalid")
    assert "Fehler" in result

def test_search_projects():
    # Based on the PROJECTS list in main.py
    res = search_projects.invoke("Astro")
    assert "RealizeTogether" in res
    
    res_none = search_projects.invoke("NonExistent")
    assert "Keine passenden Projekte gefunden" in res_none

def test_get_current_time():
    res = get_current_time.invoke({})
    assert ":" in res # Basic check for time format
