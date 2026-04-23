# AI Visibility & Document Transformer

This repository is a full-stack SaaS application that transforms raw documentation (Markdown) into dense, AI-optimized Markdown structures, and provides an AI Search Visibility score.

## Assessment Compliance Summary

This project was built and refactored explicitly to comply with strict software engineering assessment criteria:

- **Stack**: Backend (Python + Flask), Frontend (Vite + React), Database (SQLite).
- **Structure**: Clean Architecture. The Flask backend is heavily modularized using an Application Factory pattern. Concerns are strictly separated (`app.py`, `models.py`, `services.py`, `routes.py`).

  ```mermaid
  graph LR
      Client["Frontend (React/Vite)"] -->|"POST /api/analyze"| API["Backend (Flask)"]
      API -->|"Query LLM"| Groq["Groq (Llama 3.3)"]
      API <-->|"Save/Load History"| DB[("SQLite")]
  ```

- **Simplicity**: Code is straightforward. SQLite was chosen to avoid complex Docker setups, making evaluation effortless.
- **Correctness & Interface Safety**: API inputs are explicitly validated (e.g., checking file extensions). External API failures from the LLM provider are caught and securely logged to the database.
- **Verification**: The project includes robust automated test suites.
  - `backend/tests/test_api.py` (Pytest): Tests API endpoints and mocks the Groq LLM service.
  - `frontend/src/components/Hero.test.tsx` (Vitest): Verifies UI logic and component rendering.
- **Observability**: `print()` statements were replaced with Python's `logging` module to track system behavior.
- **AI Guidance**: See `AI_GUIDANCE.md` for explicit constraints and guidelines provided to AI agents working on this codebase.

## Key Technical Decisions

1. **Groq Llama 3.3 70B**: The project utilizes Groq's high-speed inference. Llama 3.3 70B was specifically chosen for its massive 128k context window, which is ideal for large documentation transformation tasks.
2. **Flask Application Factory**: Prevents circular imports and makes testing significantly easier by allowing us to spin up temporary SQLite in-memory databases per test execution.
3. **Framer Motion**: Used on the frontend to provide immediate, satisfying visual feedback during the latency period while the LLM parses the document.

## Running the Project

### Backend

```bash
cd backend
# using uv for fast package management
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
# Set GROQ_API_KEY in backend/.env
uv run app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Running Tests

```bash
# Backend tests
cd backend && uv run pytest

# Frontend tests
cd frontend && npx vitest run
```
# assignment
