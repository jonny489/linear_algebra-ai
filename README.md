    # Linear Algebra AI Tutor

    An AI-powered chatbot for learning linear algebra. Upload PDF textbooks and ask questions — the app retrieves relevant sections and generates explanations using RAG (Retrieval-Augmented Generation).

    ## Tech Stack

    **Backend**
    - FastAPI (Python 3.12)
    - Google Gemini — embeddings (`gemini-embedding-2-preview`) + text generation (`gemini-3-flash-preview`)
    - ChromaDB — in-memory vector store
    - PyPDF — PDF text extraction
    - LangChain — embedding integration

    **Frontend**
    - React 19 (Create React App)
    - ReactMarkdown + KaTeX for LaTeX math rendering

    ## How It Works

    1. Upload a PDF textbook via the UI
    2. The backend extracts text page-by-page, generates embeddings, and stores them in ChromaDB
    3. When you ask a question, it embeds your query, searches for the most relevant chunks, and passes them as context to Gemini
    4. The AI responds with an answer grounded in your uploaded material, with sources listed

    ## Setup

    ### Backend
    ```bash
    cd backend
    python -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    # Add your GEMINI_API_KEY to backend/.env
    uvicorn main:app --reload

    Frontend

    cd frontend
    npm install
    npm start

    The frontend runs on localhost:3000 and the backend on localhost:8000.

    Project Structure

    backend/
    ├── main.py                 # FastAPI app + CORS config
    ├── routes/
    │   ├── upload.py           # PDF upload + chunking + embedding
    │   └── query.py            # Question → RAG pipeline → response
    ├── services/
    │   ├── embeddings.py       # Google Gemini embedding wrapper
    │   ├── vector_store.py     # ChromaDB add/search operations
    │   └── llm.py              # Gemini text generation
    └── models/
        └── schemas.py          # Pydantic request/response models

    frontend/
    └── src/
        ├── App.js              # Top-level state + API calls
        └── components/
            ├── Header.js       # Title bar + PDF upload
            ├── ChatContainer.js # Message list / empty state
            ├── Message.js      # Chat bubble with LaTeX rendering
            ├── InputBar.js     # Question input
            ├── LoadingDots.js  # Loading animation
            └── Icons.js        # Shared SVG icons