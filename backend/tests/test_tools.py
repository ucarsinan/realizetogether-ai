import pytest
from main import calculator, search_projects, get_current_time

def test_calculator_basic():
    assert calculator.invoke("2 + 2") == "4"
    assert calculator.invoke("10 * 5") == "50"

def test_calculator_error():
    result = calculator.invoke("invalid")
    assert "Fehler" in result

def test_calculator_power():
    assert calculator.invoke("2 ** 10") == "1024"

def test_calculator_float_division():
    assert calculator.invoke("7 / 2") == "3.5"

def test_calculator_negative():
    assert calculator.invoke("-3 + 1") == "-2"

def test_calculator_division_by_zero():
    result = calculator.invoke("1 / 0")
    assert "Fehler" in result

def test_search_projects():
    res = search_projects.invoke("Supabase")
    assert "RealizeTogether" in res

    res_none = search_projects.invoke("NonExistent")
    assert "Keine passenden Projekte gefunden" in res_none

def test_search_projects_case_insensitive():
    """Suche soll unabhängig von Groß-/Kleinschreibung funktionieren."""
    res_upper = search_projects.invoke("SUPABASE")
    res_lower = search_projects.invoke("supabase")
    assert res_upper == res_lower

def test_search_projects_empty_query():
    """Leere Suche soll alle Projekte zurückgeben (da '' in jedem String)."""
    res = search_projects.invoke("")
    assert "RealizeTogether" in res

def test_get_current_time():
    res = get_current_time.invoke({})
    assert ":" in res

def test_get_current_time_format():
    """Zeitformat soll YYYY-MM-DD HH:MM:SS sein."""
    res = get_current_time.invoke({})
    parts = res.split(" ")
    assert len(parts) == 2
    date_part, time_part = parts
    assert len(date_part.split("-")) == 3
    assert len(time_part.split(":")) == 3
