# 🛡️ CodeSentinel

### AI-Powered Agentic RAG Platform for Codebase Intelligence

CodeSentinel is an **AI-powered codebase intelligence platform** that combines **Agentic RAG, multi-agent workflows, vector search, embeddings, LLM reasoning, and document intelligence** to understand real-world software repositories.

Instead of manually navigating hundreds of files, developers can ask questions about their codebase and receive **context-aware, repository-grounded answers**.

---

## 🚀 What It Does

```text
                         ┌──────────────────────┐
                         │    GitHub Repository │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Repository Ingestion │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
             ┌──────────────┐               ┌──────────────┐
             │ Source Code  │               │ Documents    │
             └──────┬───────┘               └──────┬───────┘
                    │                               │
                    ▼                               ▼
             ┌──────────────┐               ┌──────────────┐
             │ Code Parsing │               │   Docling    │
             └──────┬───────┘               └──────┬───────┘
                    │                               │
                    └───────────────┬───────────────┘
                                    ▼
                         ┌──────────────────────┐
                         │ Chunking + Metadata  │
                         └──────────┬───────────┘
                                    ▼
                         ┌──────────────────────┐
                         │      Embeddings      │
                         └──────────┬───────────┘
                                    ▼
                         ┌──────────────────────┐
                         │    Vector Database   │
                         └──────────┬───────────┘
                                    ▼
                         ┌──────────────────────┐
                         │    Agentic RAG       │
                         └──────────┬───────────┘
                                    ▼
                         ┌──────────────────────┐
                         │    LLM Reasoning     │
                         └──────────┬───────────┘
                                    ▼
                         ┌──────────────────────┐
                         │ Grounded AI Insights │
                         └──────────────────────┘
```

---

# 🧠 AI & RAG

* 🤖 **Agentic RAG** for multi-step repository reasoning
* 🧩 **Specialized AI agents** for retrieval, code analysis, and architecture
* 🔎 **Semantic vector search** for repository-aware retrieval
* 🧠 **Embeddings** for source code and documentation
* 🛠️ **Tool-augmented agents** for repository exploration
* 📚 **Context-aware generation** using retrieved evidence
* 📄 **Docling + FastAPI** for document intelligence
* 🔗 **Multi-step reasoning** across related files and modules

---

# 🧩 Agent Architecture

```text
                              ┌───────────────────┐
                              │    User Query     │
                              └─────────┬─────────┘
                                        │
                                        ▼
                              ┌───────────────────┐
                              │ Agent Orchestrator│
                              └─────────┬─────────┘
                                        │
                ┌───────────────────────┼───────────────────────┐
                │                       │                       │
                ▼                       ▼                       ▼
       ┌────────────────┐     ┌────────────────┐     ┌────────────────┐
       │ Retrieval Agent│     │  Code Agent    │     │Architecture    │
       │                │     │                │     │Agent           │
       └───────┬────────┘     └───────┬────────┘     └───────┬────────┘
               │                      │                      │
               └──────────────────────┼──────────────────────┘
                                      ▼
                             ┌───────────────────┐
                             │   RAG Retrieval   │
                             └─────────┬─────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │ Context Assembly  │
                             └─────────┬─────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │   LLM Reasoning   │
                             └─────────┬─────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │ Grounded Response │
                             └───────────────────┘
```

---

# 🔥 Complex End-to-End Architecture

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                              CODE SENTINEL                                   │
└──────────────────────────────────────────────────────────────────────────────┘

        ┌──────────────────┐                    ┌──────────────────┐
        │   React Client   │                    │  Repository URL  │
        │  TypeScript UI   │                    │  Document Upload │
        └────────┬─────────┘                    └────────┬─────────┘
                 │                                       │
                 └───────────────────┬───────────────────┘
                                     │
                                     ▼
                         ┌──────────────────────┐
                         │     REST API         │
                         │ Node.js + Express    │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
             ┌────────────┐  ┌────────────┐  ┌──────────────┐
             │ PostgreSQL │  │   Redis    │  │  Docling     │
             │            │  │            │  │ FastAPI/Py   │
             └────────────┘  └────────────┘  └──────┬───────┘
                                                    │
                                                    ▼
                                            ┌───────────────┐
                                            │ Document      │
                                            │ Processing    │
                                            └───────┬───────┘
                                                    │
                                                    ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                            KNOWLEDGE PIPELINE                                │
│                                                                              │
│   Repository ──► File Discovery ──► Parsing ──► Chunking ──► Metadata       │
│                                                               │              │
│                                                               ▼              │
│                                                         Embeddings           │
│                                                               │              │
│                                                               ▼              │
│                                                        Vector Store          │
└──────────────────────────────────────────────────────────────────────────────┘
                                                               │
                                                               ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                              AGENT LAYER                                     │
│                                                                              │
│                         ┌────────────────────┐                               │
│                         │ Agent Orchestrator │                               │
│                         └─────────┬──────────┘                               │
│                                   │                                          │
│          ┌────────────────────────┼────────────────────────┐                 │
│          │                        │                        │                 │
│          ▼                        ▼                        ▼                 │
│   ┌──────────────┐        ┌──────────────┐        ┌──────────────┐          │
│   │  Retrieval   │        │     Code     │        │ Architecture │          │
│   │    Agent     │        │    Agent     │        │    Agent     │          │
│   └──────┬───────┘        └──────┬───────┘        └──────┬───────┘          │
│          │                        │                        │                  │
│          └────────────────────────┼────────────────────────┘                  │
│                                   ▼                                          │
│                         ┌────────────────────┐                               │
│                         │ Tool Execution     │                               │
│                         └─────────┬──────────┘                               │
│                                   │                                          │
│                    ┌──────────────┼──────────────┐                           │
│                    │              │              │                           │
│                    ▼              ▼              ▼                           │
│               File Search   Vector Search   Code Retrieval                   │
│                    │              │              │                           │
│                    └──────────────┼──────────────┘                           │
│                                   ▼                                          │
│                          Context Aggregation                                 │
└───────────────────────────────────┬──────────────────────────────────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    LLM / Gemini      │
                         │   Reasoning Layer    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Evidence-Grounded    │
                         │ AI Response          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     React Client     │
                         │   Analysis Results   │
                         └──────────────────────┘
```

---

# 🔍 RAG Pipeline

```text
┌──────────────┐
│ Source Code  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Parsing    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Chunking   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Embeddings  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Vector Store │
└──────┬───────┘
       │
       │
       │          ┌──────────────┐
       └─────────►│ User Query   │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ Query Embed  │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ Vector Search│
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ Top-K Context │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ Context      │
                  │ Assembly     │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │     LLM      │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ Grounded AI  │
                  │   Answer     │
                  └──────────────┘
```

---

# 🧑‍💻 Frontend

A modern **React + TypeScript interface** provides an interactive workspace for repository intelligence.

### Highlights

* 🔗 Repository URL submission
* 📄 Document upload
* 💬 AI-powered interaction
* 🧠 RAG-generated insights
* 📊 Analysis result visualization
* ⚡ Responsive API-driven experience

```text
┌──────────────────────┐
│ React + TypeScript   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ REST API             │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Agentic RAG Backend  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Repository Intelligence│
└──────────────────────┘
```

---

# ⚡ Example

### Ask

> **"Where is JWT authentication implemented?"**

### Agentic Workflow

```text
┌──────────────┐
│ User Query   │
└──────┬───────┘
       ▼
┌──────────────────────┐
│ Query Understanding  │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│ Agent Selection      │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│ Semantic Retrieval   │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│ Auth Files Retrieved │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│ Context Aggregation  │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│ LLM Reasoning        │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│ Grounded Answer      │
└──────────────────────┘
```

> The LLM doesn't need the entire repository in its context window. **CodeSentinel retrieves the most relevant information first, then uses it to generate a grounded response.**

---

# 🧰 Tech Stack

| Layer                 | Technologies                                  |
| --------------------- | --------------------------------------------- |
| 🤖 **AI**             | LLMs, Agentic AI, Tool Calling                |
| 🧠 **RAG**            | Embeddings, Vector Search, Semantic Retrieval |
| 💻 **Frontend**       | React, TypeScript                             |
| ⚙️ **Backend**        | Node.js, Express.js, TypeScript               |
| 🐍 **AI Services**    | Python, FastAPI, Docling                      |
| 🗄️ **Data**          | PostgreSQL, Redis, Vector Database            |
| 🐳 **Infrastructure** | Docker, Docker Compose                        |
| 🔧 **Development**    | Git, GitHub, Postman                          |

---

# 🔥 Why CodeSentinel?

CodeSentinel demonstrates practical AI engineering across the complete lifecycle:

**Repository → Ingestion → Processing → Embeddings → Vector Search → Agent Orchestration → Retrieval → LLM Reasoning → Grounded Response**

### Core Technologies

**RAG • Agentic AI • LLMs • Embeddings • Vector Search • Tool Calling • Code Intelligence • Document AI**

### Engineering Stack

**React • TypeScript • Node.js • Python • FastAPI • PostgreSQL • Redis • Docker**

---

# 🔮 Roadmap

* [ ] Multi-agent collaboration
* [ ] Code-review agent
* [ ] Security analysis agent
* [ ] Dependency analysis agent
* [ ] AST-aware code retrieval
* [ ] Hybrid search + reranking
* [ ] GitHub App integration
* [ ] Streaming agent responses
* [ ] RAG evaluation framework
* [ ] Agent observability
* [ ] Repository dependency graphs

---

# 👨‍💻 Author

### Noor Alam

**Software Developer | AI & Backend Engineering**

`C++` · `Python` · `TypeScript` · `RAG` · `Agentic AI` · `Backend Systems`

---

<p align="center">

## 🛡️ CodeSentinel

### Turn any codebase into an AI-understandable knowledge base.

</p>
