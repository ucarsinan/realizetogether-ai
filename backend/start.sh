#!/bin/bash
# 1. Sicherstellen, dass wir im richtigen Ordner sind
cd ~/realizetogether-ai/backend

# 2. Umgebung aktivieren (falls noch nicht passiert)
source venv/bin/activate

# 3. Server starten
echo "🚀 Starte Sinan.AI Backend..."
uvicorn main:app --reload --port 8000 --host 0.0.0.0
