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
    title: 'The Latency Trap: Why Sequential Code Fails in AI Integration',
    publishedAt: new Date('2026-03-19'),
    tags: ['AI Engineering', 'Python', 'AsyncIO', 'Performance'],
    excerpt:
      'When connecting core systems to LLMs today, my CPU barely computes – it just waits. Sequential code becomes a fatal bottleneck. The solution: AsyncIO and the principle of concurrency on a single thread.',
    content: `As a computer science graduate, I learned to think in clear sequences: code is executed line by line. This is safe and deterministic, but in AI Engineering it quickly becomes a fatal bottleneck.

The problem: when connecting core systems to Large Language Models (LLMs) today, my CPU barely computes. It sends HTTP requests and waits for external servers. This is called **I/O-Bound**. If I send 100 documents to an AI one after another and each response takes two seconds, my system freezes completely for over three minutes. Classic multithreading is often too expensive and inefficient for this.

The architectural solution in Python is called **AsyncIO**. Instead of blindly blocking, I use the principle of concurrency on a single thread. Like a good waiter who takes 100 orders and lets the kitchen work instead of standing at the oven waiting for the first pizza, the *Event Loop* delegates the waiting. With \`asyncio.gather()\` I fire hundreds of API calls in quasi-parallel. The wait times overlap, the system never blocks, and minutes turn into seconds.

**Conclusion:** Anyone connecting external AI models or vector databases today can no longer afford sequential waiting. Asynchronous programming is the essential foundation for scalable AI systems.`
  },
  {
    slug: 'typescript-zu-pydantic',
    title: 'From TypeScript to Pydantic: My Journey from Deterministic Software to Probabilistic AI',
    publishedAt: new Date('2026-03-18'),
    tags: ['AI Engineering', 'Python', 'Pydantic', 'TypeScript'],
    excerpt:
      'As a computer science graduate, my journey started deterministically: object-oriented design, fixed contracts, predictable systems. On my current path into AI Engineering, I face a new architectural break – and Pydantic is the bridge.',
    content: `As a computer science graduate, my journey started deterministically: object-oriented design, fixed contracts, predictable systems. With JavaScript and the principle of "Duck Typing", the dynamic freedom of web development arrived – along with cascading runtime errors from missing type safety. The industry responded with **TypeScript**: Compile-time safety brought back control. Contracts in code became reliable again.

On my current path into AI Engineering with Python, I now face a new architectural break: deterministic core systems (databases, APIs) collide with **probabilistic** Large Language Models (LLMs).

An LLM has no fixed data types; it generates free text based on probabilities. Static compiler checks like those in TypeScript miss the mark here, since the data is only generated at runtime by the AI (and potentially hallucinated). Anyone who blindly routes unvalidated LLM output into their systems risks fatal data corruption.

The architectural bridge for this problem is called **Pydantic**. It translates Python's static type hints into relentless runtime validation. If the LLM fails to meet the defined data schema, the system does not crash. Instead, Pydantic throws a structured \`ValidationError\`. I use this architecturally to send it back to the model as an automated correction prompt (*Self-Correction Loop*).

**Conclusion:** The most important lesson from the evolution of JavaScript to TypeScript remains: robust systems need strict contracts. Pydantic is that contract for the AI era – it makes the unpredictable predictable.`
  },

].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
