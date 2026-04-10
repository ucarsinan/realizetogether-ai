export type ProjectStatus = 'live' | 'in-development' | 'prototype';

export interface Project {
  id: string;
  number: string;
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  status: ProjectStatus;
  problem: string;
  problemEn: string;
  solution: string;
  solutionEn: string;
  result: string;
  resultEn: string;
  stack: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'logopaedie-report-agent',
    number: '01',
    title: 'Logopädie Report Agent',
    titleEn: 'Speech Therapy Report Agent',
    tagline: 'Audio → KI-Berichte für Sprachtherapeuten',
    taglineEn: 'Audio → AI reports for speech therapists',
    status: 'live',
    problem:
      'Logopäden verbringen Stunden mit dem Schreiben von Therapieberichten — Zeit, die Patienten fehlt. Strukturierte Dokumentation ist Pflicht, aber manuell aufwändig.',
    problemEn:
      'Speech therapists spend hours writing therapy reports — time taken away from patients. Structured documentation is mandatory but manually time-consuming.',
    solution:
      'Audio-Aufnahme der Therapiesitzung → automatische Transkription via Whisper (Groq) → strukturierter, formatierter KI-Bericht in Sekunden. Der Therapeut korrigiert statt zu schreiben.',
    solutionEn:
      'Audio recording of the therapy session → automatic transcription via Whisper (Groq) → structured, formatted AI report in seconds. The therapist corrects instead of writing from scratch.',
    result:
      'Vollständig funktionsfähiger Prototyp: Audio-Upload → fertig formatierter Therapiebericht mit Pydantic-validierter Struktur. Demonstriert End-to-End-AI-Pipeline mit echtem Praxisbezug.',
    resultEn:
      'Fully functional prototype: audio upload → formatted therapy report with Pydantic-validated structure. Demonstrates an end-to-end AI pipeline with real-world application.',
    stack: ['Next.js', 'FastAPI', 'Groq (Whisper + LLaMA)', 'Pydantic', 'Python'],
    demoUrl: 'https://github.com/ucarsinan/logopaedie-report-agent',
  },
  {
    id: 'realize-together',
    number: '02',
    title: 'RealizeTogether',
    titleEn: 'RealizeTogether',
    tagline: 'KI-Plattform für kollaborative Workflows',
    taglineEn: 'AI platform for collaborative workflows',
    status: 'in-development',
    problem:
      'Enterprise-Teams brauchen KI-Features, die sicher, deterministisch und in bestehende Systemlandschaften integrierbar sind — nicht nur Chatbots.',
    problemEn:
      'Enterprise teams need AI features that are secure, deterministic and integrable into existing system landscapes — not just chatbots.',
    solution:
      'Production-grade Architektur mit Next.js Frontend, FastAPI Backend und Supabase als Datenbasis. KI-Integration über LangChain mit Pydantic Structured Output — kein "Fire and Hope", sondern validierte Outputs.',
    solutionEn:
      'Production-grade architecture with Next.js frontend, FastAPI backend and Supabase as data layer. AI integration via LangChain with Pydantic Structured Output — no "fire and hope", but validated outputs.',
    result:
      'Laufende R&D-Plattform als Testbed für Production-grade AI-Architekturmuster. Authentifizierung, Datenschicht und KI-Pipeline vollständig integriert.',
    resultEn:
      'Ongoing R&D platform as testbed for production-grade AI architecture patterns. Authentication, data layer and AI pipeline fully integrated.',
    stack: ['Next.js 16', 'Supabase', 'FastAPI', 'LangChain', 'TypeScript', 'Python'],
  },
  {
    id: 'portfolio-backend',
    number: '03',
    title: 'Dieses Portfolio',
    titleEn: 'This Portfolio',
    tagline: 'Multi-Provider AI Backend mit Fallback-Resilienz',
    taglineEn: 'Multi-provider AI backend with fallback resilience',
    status: 'live',
    problem:
      'Ein Portfolio-Backend das AI-Capabilities demonstriert, darf nicht ausfallen wenn ein Anbieter Quota-Limits erreicht oder down ist.',
    problemEn:
      "A portfolio backend demonstrating AI capabilities can't fail when a provider hits quota limits or goes down.",
    solution:
      'FastAPI mit LangChain Multi-Fallback: 4 Provider (Google Gemini, OpenAI, Groq, Anthropic) werden der Reihe nach probiert. Pydantic Structured Output für alle Endpunkte — kein manuelles JSON-Parsing.',
    solutionEn:
      'FastAPI with LangChain multi-fallback: 4 providers (Google Gemini, OpenAI, Groq, Anthropic) tried in sequence. Pydantic Structured Output for all endpoints — no manual JSON parsing.',
    result:
      'CV-Assistent, Vision-Analyse, Sentiment-Analyse und Agentic Chat live unter sinanucar.com. Resilienter Betrieb auch bei Provider-Ausfällen.',
    resultEn:
      'CV assistant, vision analysis, sentiment analysis and agentic chat live at sinanucar.com. Resilient operation even during provider outages.',
    stack: ['FastAPI', 'LangChain', 'Pydantic', 'Astro', 'Tailwind CSS', 'Render'],
    demoUrl: 'https://sinanucar.com/en/ai',
  },
];
