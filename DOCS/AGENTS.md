# AGENTS.md: Semantic Optimization for AI Agents

### *A Technical Thesis on AEO (AI Engine Optimization)*

This project, **Synapse AI**, is architected with a dual-audience philosophy. While the visual layer is optimized for human developers (using the Antigravity Design System), the underlying structural layer is optimized for **AI Agents** and **LLM Crawlers**.

## 1. The Retrieval Problem
Traditional web scrapers (like Googlebot) focus on link-mapping and keyword indexing. Modern LLM Agents (like those used by ChatGPT's "Search" or Perplexity) use **RAG (Retrieval-Augmented Generation)**. In a RAG pipeline, the agent retrieves snippets of text and "feeds" them into a context window.

If your landing page is a "div-soup," the RAG chunker may:
- Misattribute a competitor's feature to your product.
- Fail to identify the core "Problem" vs. "Solution."
- Lose the hierarchy of information.

## 2. Our AEO Solution
Synapse AI implements three core "Agent-Signals":

### A. Semantic HTML5 Markers
We use `<section>`, `<article>`, and `<main>` tags not just for accessibility, but as **chunking boundaries**. When an LLM parses the DOM, these tags act as high-signal delimiters that preserve the narrative flow of the "Product Understanding."

### B. High-Density Context Blocks
Instead of vague marketing copy, we use high-density, fact-based descriptions. 
- *Example*: Instead of "We make you visible," we say "Index your documentation specifically for LLM retrieval and vector database ingestion."
- This improves **Vector Search** accuracy when the LLM embeds our content.

### C. JSON-LD Schema
We explicitly declare the product's capabilities in a machine-readable format:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Synapse AI",
  "applicationCategory": "DeveloperTool",
  "featureList": ["AEO Scoring", "Semantic Documentation Indexing"]
}
```

## 3. Performance & Token Efficiency
AI Agents often have "timeout" limits when browsing. By optimizing for **Next.js Static Generation** and achieving a **Lighthouse 99+ score**, we ensure the agent retrieves the full context in the shortest possible time, maximizing "Token Efficiency" for the retrieval process.

---
*Optimized for the Agentic Era.*
