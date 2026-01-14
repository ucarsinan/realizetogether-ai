import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

# 1. Umgebungsvariablen laden (.env)
load_dotenv()

# Check ob Key da ist
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    print("❌ FEHLER: Kein GOOGLE_API_KEY in der .env Datei gefunden!")
    exit()

print("✅ Key gefunden. Rufe Gemini an...")

try:
    # 2. Das LLM initialisieren (Wir nutzen Gemini 1.5 Flash - schnell & effizient)
    llm = ChatGoogleGenerativeAI(model="gemini-flash-latest", google_api_key=api_key)

    # 3. Eine einfache Frage stellen
    response = llm.invoke("Hallo Gemini! Ich bin Sinan. Bestätige kurz, dass unsere Verbindung steht.")

    print("-" * 30)
    print("ANTWORT VON GEMINI:")
    print(response.content)
    print("-" * 30)
    print("✅ SUCCESS: Dein Backend steht!")

except Exception as e:
    print(f"❌ FEHLER bei der Verbindung: {e}")