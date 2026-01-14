from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
# WICHTIG: Dieser Import hat gefehlt
from langchain_community.document_loaders import PyPDFLoader 
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import os

# 1. Setup
load_dotenv()
app = FastAPI()

# 2. Sicherheit (CORS für IDX)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex="https://.*\.cloudworkstations\.dev",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Globale Variable für das "Gehirn"
CV_CONTEXT = ""

def load_cv():
    """Liest das PDF aus dem data-Ordner ein."""
    global CV_CONTEXT
    
    # NEU: Der Pfad zeigt jetzt in den Unterordner 'data'
    file_path = os.path.join("data", "cv.pdf")

    try:
        # Prüfen ob Datei existiert
        if not os.path.exists(file_path):
            print(f"⚠️ WARNUNG: Datei unter '{file_path}' nicht gefunden!")
            CV_CONTEXT = "Kein Lebenslauf hinterlegt."
            return

        print(f"📂 Lade Lebenslauf von: {file_path} ...")
        loader = PyPDFLoader(file_path)
        pages = loader.load()
        
        # Alle Seiten zusammenfügen
        CV_CONTEXT = "\n".join([p.page_content for p in pages])
        print(f"✅ Lebenslauf geladen! ({len(CV_CONTEXT)} Zeichen)")
        
    except Exception as e:
        print(f"❌ Fehler beim Laden des PDFs: {e}")
        CV_CONTEXT = "Fehler beim Laden des Lebenslaufs."

# Beim Starten einmal ausführen
load_cv()

# 4. AI Setup
api_key = os.getenv("GOOGLE_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-flash-latest", google_api_key=api_key)

# 5. Der Prompt (Hier geben wir der AI die Persönlichkeit)
prompt_template = ChatPromptTemplate.from_template("""
Du bist der professionelle AI-Assistent von Sinan. 
Nutze den folgenden Lebenslauf, um Fragen zu beantworten:

LEBENSLAUF DATEN:
{cv_text}

REGELN:
- Antworte kurz, professionell und hilfreich.
- Wenn die Info nicht im Lebenslauf steht, sag ehrlich, dass du es nicht weißt.
- Du sprichst als Assistent ("Sinan hat...", "Er hat...").

FRAGE DES USERS: 
{user_message}
""")

class ChatRequest(BaseModel):
    message: str

# 6. Der Endpunkt
@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    print(f"📩 Frage: {request.message}")
    
    # Hier verbinden wir Prompt + CV + Frage
    chain = prompt_template | llm
    
    try:
        response = chain.invoke({
            "cv_text": CV_CONTEXT,      # Das Wissen aus dem PDF
            "user_message": request.message # Die Frage vom Frontend
        })
        return {"reply": response.content}
    except Exception as e:
        return {"reply": f"Fehler im System: {str(e)}"}

@app.get("/")
def read_root():
    return {"status": "AI Recruiter Online", "data_loaded": len(CV_CONTEXT) > 0}