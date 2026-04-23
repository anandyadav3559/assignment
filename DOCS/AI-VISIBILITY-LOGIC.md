# Technical Logic: AI Visibility Scoring

This document outlines the technical architecture and logic behind the **Synapse AI** visibility scan, detailing how the current frontend mock translates to a production-ready AEO (AI Engine Optimization) pipeline.

## 1. The Frontend Mock (Current State)
In the current implementation (`Hero.tsx`), the "Analyze" feature simulates a deep documentation scan:
- **Input Validation**: Ensures a valid documentation URL is provided.
- **Simulation Interval**: Increments a loading bar using `setInterval` to mimic the latency of a real-world scraping and indexing process.
- **Probabilistic Scoring**: Generates a randomized score between 15 and 45 to reflect a "Critically Low" state—a common psychological design choice in SaaS to emphasize the need for the product.

## 2. Production Pipeline (Planned)
If fully implemented, the scoring logic would follow these steps:

### A. Discovery & Scraping
- **Context Extraction**: A Go-based worker (utilizing `Colly` or `Playwright`) scrapes the provided URL.
- **Semantic Mapping**: It parses the docs not just for HTML, but for **Semantic Intent**. It identifies code blocks, API endpoints, and architectural concepts.

### B. LLM Pattern Matching
- **Training Data Comparison**: The system compares the scraped content against public knowledge cutoffs for major models (GPT-4o, Claude 3.5 Sonnet).
- **RAG Readiness Check**: Analyzes if the documentation is structured in a way that typical RAG (Retrieval-Augmented Generation) pipelines can easily chunk and index (e.g., presence of clear H1/H2 tags, descriptive code comments, and metadata).

### C. Scoring Algorithm
The **AI Visibility Score** is calculated as a weighted average:
- **Indexability (40%)**: How easily an AI crawler can parse the site.
- **Context Depth (30%)**: Does the content explain "why" and "how," or just "what"?
- **Authority (30%)**: GitHub stars, forum mentions, and community citations (scraped via social APIs).

## 3. Future Scope: High-Concurrency Scaling
To handle thousands of scans per second:
- **Go-based Workers**: Leverage Go's goroutines to handle concurrent scraping tasks without blocking the main event loop.
- **Distributed Task Queues**: Use Redis or RabbitMQ to manage scan jobs.
- **Synapse Index**: Store processed documentation embeddings in a vector database (e.g., Pinecone or Weaviate) to provide real-time AEO feedback.
