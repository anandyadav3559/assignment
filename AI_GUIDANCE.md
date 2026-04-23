# AI Guidance & Constraints

This file outlines strict rules and architectural constraints for any AI agent interacting with or extending this codebase.

## 1. Architectural Constraints
- **Separation of Concerns**: The backend is built on a modular Flask architecture (Application Factory pattern). Do NOT put logic in `app.py`. Use `routes.py`, `models.py`, and `services.py`.
- **Database**: We use `Flask-SQLAlchemy` with SQLite for simplicity. All data mutations MUST be modeled in `models.py`.
- **Frontend**: Vite + React + Tailwind CSS v4. Do NOT use external CSS-in-JS libraries.

## 2. Interface Safety
- All API inputs must be validated explicitly before processing.
- Error messages returned to the client should be structured as `{"error": "string"}`.
- Do NOT expose raw exception strings to the frontend unless it is safe to do so.

## 3. Automated Verification
- Any new backend functionality MUST be accompanied by a `pytest` test.
- Any new frontend component MUST have a basic `vitest` suite checking DOM elements.

## 4. Change Resilience & Simplicity
- Prefer simple code over clever code.
- If a dependency is not strictly necessary, do NOT add it.
- Logging must be done via the standard Python `logging` module, not `print()`.

## Prompting Rules
When asked to build a new feature, follow this checklist:
1. Propose the model/schema change.
2. Outline the service/business logic.
3. Define the route.
4. Implement the frontend component.
5. Add automated tests.
