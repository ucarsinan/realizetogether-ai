import os
from dotenv import load_dotenv
import google.generativeai as genai

# 1. Key laden
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    print("Kein Key gefunden!")
    exit()

# 2. Google konfigurieren
genai.configure(api_key=api_key)

print("🔍 Frage Google nach verfügbaren Modellen...\n")

try:
    # 3. Alle Modelle auflisten
    found_any = False
    for m in genai.list_models():
        # Wir suchen nur Modelle, die Text generieren können (generateContent)
        if 'generateContent' in m.supported_generation_methods:
            print(f"👉 {m.name}")
            found_any = True
    
    if not found_any:
        print("❌ Keine Modelle mit 'generateContent' gefunden.")

except Exception as e:
    print(f"❌ Kritisches Problem: {e}")