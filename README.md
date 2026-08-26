# 🛡️ CodeSentinel

### AI-Powered Agentic RAG Platform for Codebase Intelligence

CodeSentinel is an **AI-powered codebase intelligence platform** that combines **RAG, multi-agent workflows, vector search, LLMs, and document intelligence** to understand and analyze real-world software repositories.

Instead of manually navigating hundreds of files, developers can ask questions about their codebase and receive **context-aware, repository-grounded answers**.


## 🚀 What It Does


GitHub Repository
       ↓
Repository Ingestion
       ↓
Code + Documentation Processing
       ↓
Chunking + Embeddings
       ↓
Vector Database
       ↓
Agentic RAG
       ↓
LLM Reasoning
       ↓
Grounded AI Insights


### 🤖 AI & RAG

* **Agentic RAG** for multi-step repository reasoning
* **Specialized AI agents** for retrieval, code analysis, and architecture
* **Semantic vector search** for relevant code/context retrieval
* **Embeddings** for code and documentation
* **Tool-augmented agents** for repository exploration
* **Grounded generation** using retrieved repository context
* **Docling + FastAPI** for intelligent document extraction



## 🧠 Agent Architecture


                    User Query
                        ↓
                Agent Orchestrator
                        ↓
        ┌───────────────┼───────────────┐
        ↓               ↓               ↓
   Retrieval        Code Analysis   Architecture
     Agent             Agent           Agent
        └───────────────┼───────────────┘
                        ↓
                  RAG Retrieval
                        ↓
                  LLM Reasoning
                        ↓
                Grounded Response


Agents can perform multi-step tasks such as:

> **"Explain how authentication works in this repository."**


Find Auth Routes
      ↓
Find Middleware
      ↓
Find JWT Logic
      ↓
Trace Dependencies
      ↓
Analyze Context
      ↓
Generate Explanation




# 💻 Frontend

A modern **React + TypeScript interface** provides an interactive workspace for repository analysis.

### Key UI capabilities

* 🔗 Submit repository URLs
* 📄 Upload documents
* 💬 Interact with AI analysis
* 🧠 View RAG-powered insights
* 📊 Explore analysis results
* ⚡ Real-time API-driven experience


React + TypeScript
        ↓
REST API
        ↓
AI / RAG Backend
        ↓
Repository Intelligence



🏗️ Architecture


                       React + TypeScript
                              │
                              ▼
                       Node.js + Express
                              │
                    ┌─────────┼─────────┐
                    ↓         ↓         ↓
                AI Agents    RAG     Docling
                    │         │         │
                    └────┬────┴─────────┘
                         ↓
                  Vector Database
                         │
                         ↓
                       LLM
                         │
                         ↓
                  AI Insights
                         
        PostgreSQL + Redis + Docker




# 🧰 Tech Stack

| Layer              | Technologies                                  |
| ------------------ | --------------------------------------------- |
| **AI**             | LLMs, Agentic AI, RAG, Tool Calling           |
| **RAG**            | Embeddings, Vector Search, Semantic Retrieval |
| **Frontend**       | React, TypeScript                             |
| **Backend**        | Node.js, Express.js, TypeScript               |
| **AI Service**     | Python, FastAPI, Docling                      |
| **Database**       | PostgreSQL, Redis                             |
| **Infrastructure** | Docker, Docker Compose                        |
| **Development**    | Git, GitHub, Postman                          |


# ⚡ Example

### Ask:

> **"Where is JWT authentication implemented?"**

### CodeSentinel:


User Query
    ↓
Agent determines retrieval strategy
    ↓
Semantic Search
    ↓
Relevant authentication files
    ↓
Context aggregation
    ↓
LLM reasoning
    ↓
Repository-grounded answer


The system doesn't need the entire repository in the prompt — **RAG retrieves the relevant context first.**



# 🔥 Why CodeSentinel?

CodeSentinel demonstrates practical experience with modern AI engineering:

**RAG • Agentic AI • Vector Search • Embeddings • LLMs • Tool Calling • Code Intelligence • Document AI**

Combined with:

**React • TypeScript • Node.js • Python • PostgreSQL • Redis • Docker**



# 🔮 Roadmap

* [ ] Multi-agent collaboration
* [ ] Code-review agent
* [ ] Security/vulnerability agent
* [ ] Dependency analysis agent
* [ ] AST-aware retrieval
* [ ] Hybrid search + reranking
* [ ] GitHub App integration
* [ ] Streaming agent responses
* [ ] RAG evaluation & observability


# 👨‍💻 Author

**Noor Alam**

Software Developer | AI & Backend Engineering

**C++ • Python • TypeScript • RAG • Agentic AI • Backend Systems**


<p align="center">

### 🛡️ CodeSentinel

**Turn any codebase into an AI-understandable knowledge base.**

</p>
