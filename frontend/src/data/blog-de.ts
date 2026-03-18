export interface Article {
  slug: string;
  title: string;
  publishedAt: Date;
  tags: string[];
  excerpt: string;
  content: string | null;
}

export const articles: Article[] = [
  {
    slug: 'latenz-falle-asyncio',
    title: 'Die Latenz-Falle: Warum sequenzieller Code in der KI-Integration scheitert',
    publishedAt: new Date('2026-03-19'),
    tags: ['AI Engineering', 'Python', 'AsyncIO', 'Performance'],
    excerpt:
      'Wenn ich heute Kernsysteme mit LLMs verbinde, rechnet meine CPU kaum noch – sie wartet. Sequenzieller Code wird zum fatalen Flaschenhals. Die Lösung: AsyncIO und das Prinzip der Nebenläufigkeit auf einem einzigen Thread.',
    content: `Als Diplom-Informatiker habe ich gelernt, in klaren Sequenzen zu denken: Der Code wird Zeile für Zeile abgearbeitet. Das ist sicher und deterministisch, wird im AI Engineering aber schnell zum fatalen Flaschenhals.

Das Problem: Wenn ich heute Kernsysteme mit Large Language Models (LLMs) verbinde, rechnet meine CPU kaum noch. Sie sendet HTTP-Requests und wartet auf externe Server. Das nennt man **I/O-Bound**. Sende ich 100 Dokumente nacheinander an eine KI und jede Antwort dauert zwei Sekunden, friert mein System für über drei Minuten komplett ein. Klassisches Multithreading ist hierfür oft zu teuer und ineffizient.

Die architektonische Lösung in Python heißt **AsyncIO**. Statt blind zu blockieren, nutze ich das Prinzip der Nebenläufigkeit (Concurrency) auf einem einzigen Thread. Wie ein guter Kellner, der 100 Bestellungen aufnimmt und die Küche arbeiten lässt, anstatt vor dem Ofen auf die erste Pizza zu warten, delegiert die *Event Loop* das Warten. Mit \`asyncio.gather()\` feuere ich hunderte API-Aufrufe quasi-parallel ab. Die Wartezeiten überlappen sich, das System blockiert nie, und aus Minuten werden Sekunden.

**Fazit:** Wer heute externe KI-Modelle oder Vektordatenbanken anbindet, kann sich sequenzielles Warten nicht mehr leisten. Asynchrone Programmierung ist das zwingende Fundament für skalierbare KI-Systeme.`
  },
  {
    slug: 'typescript-zu-pydantic',
    title: 'Von TypeScript zu Pydantic: Meine Reise von deterministischer Software zu probabilistischer KI',
    publishedAt: new Date('2026-03-18'),
    tags: ['AI Engineering', 'Python', 'Pydantic', 'TypeScript'],
    excerpt:
      'Als Diplom-Informatiker begann mein Weg deterministisch: Objektorientierung, feste Verträge, vorhersehbare Systeme. Auf meinem aktuellen Weg in das AI Engineering stehe ich vor einem neuen Architektur-Bruch – und Pydantic ist die Brücke.',
    content: `Als Diplom-Informatiker begann mein Weg deterministisch: Objektorientierung, feste Verträge, vorhersehbare Systeme. Mit JavaScript und dem Prinzip des "Duck Typing" kam später die dynamische Freiheit in der Webentwicklung – und mit ihr kaskadierende Laufzeitfehler durch fehlende Typensicherheit. Die Industrie reagierte mit **TypeScript**: Compile-Time Safety brachte die Kontrolle zurück. Verträge im Code wurden wieder verlässlich.

Auf meinem aktuellen Weg in das AI Engineering mit Python stehe ich nun vor einem neuen Architektur-Bruch: Deterministische Kernsysteme (Datenbanken, APIs) kollidieren mit **probabilistischen** Large Language Models (LLMs).

Ein LLM kennt keine festen Datentypen; es generiert Fließtext auf Basis von Wahrscheinlichkeiten. Statische Compiler-Checks wie in TypeScript greifen hier ins Leere, da die Daten erst zur Laufzeit von der KI erzeugt (und potenziell halluziniert) werden. Wer unvalidierte LLM-Outputs blind in seine Systeme leitet, riskiert fatale Datenkorruption.

Die architektonische Brücke für dieses Problem heißt **Pydantic**. Es übersetzt Pythons statische Type Hints in eine unerbittliche Laufzeit-Validierung (Runtime Validation). Scheitert das LLM an dem definierten Daten-Schema, stürzt das System nicht ab. Pydantic wirft stattdessen eine strukturierte \`ValidationError\`. Diese nutze ich architektonisch, um sie als automatisierten Korrektur-Prompt an das Modell zurückzusenden (*Self-Correction Loop*).

**Fazit:** Die wichtigste Lektion aus der Evolution von JavaScript zu TypeScript bleibt bestehen: Robuste Systeme brauchen strikte Verträge. Pydantic ist dieser Vertrag für das KI-Zeitalter – es macht das Unberechenbare berechenbar.`
  },

].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
