# 🛡️ CodeSentinel

### AI-Powered Agentic RAG Platform for Codebase Intelligence

CodeSentinel is an **AI-powered codebase intelligence platform** that combines **Agentic RAG, LangChain, LangGraph, vector search, embeddings, LLM reasoning, document intelligence, and automated repository processing** to understand real-world software repositories.

Instead of manually navigating hundreds of files, developers can ask questions about their codebase and receive **context-aware, repository-grounded answers**.

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

## 🧠 AI & RAG

* 🤖 **Agentic RAG** for multi-step repository reasoning
* 🧩 **LangGraph** for stateful agent orchestration and workflows
* 🔗 **LangChain** for LLM integration, retrieval, prompts, and tools
* 🔎 **Semantic vector search** for repository-aware retrieval
* 🧠 **Embeddings** for source code and documentation
* 🛠️ **Tool-augmented agents** for repository exploration
* 📚 **Context-aware generation** using retrieved evidence
* 📄 **Docling + FastAPI** for document intelligence
* 🔗 **Multi-step reasoning** across related files and modules

## 🧩 Agent Architecture

```text
                              ┌───────────────────┐
                              │    User Query     │
                              └─────────┬─────────┘
                                        │
                                        ▼
                              ┌───────────────────┐
                              │   LangGraph       │
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
                             │    LangChain      │
                             │ Tools + Retrieval │
                             └─────────┬─────────┘
                                       │
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

## 🔥 Complex End-to-End Architecture

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                CODE SENTINEL                                     │
└──────────────────────────────────────────────────────────────────────────────────┘

          ┌───────────────────┐                  ┌────────────────────┐
          │   React Client    │                  │ GitHub Repository  │
          │  TypeScript UI    │                  │ Webhook Events     │
          └─────────┬─────────┘                  └──────────┬─────────┘
                    │                                       │
                    └──────────────────┬────────────────────┘
                                       │
                                       ▼
                           ┌──────────────────────┐
                           │     REST API         │
                           │ Node.js + Express    │
                           └──────────┬───────────┘
                                      │
                    ┌─────────────────┼──────────────────┐
                    │                 │                  │
                    ▼                 ▼                  ▼
             ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
             │   Prisma     │  │    Redis     │  │   Docling    │
             │   ORM        │  │ Cache / State│  │ FastAPI / Py │
             └──────┬───────┘  └──────────────┘  └──────┬───────┘
                    │                                   │
                    ▼                                   ▼
             ┌──────────────┐                  ┌────────────────┐
             │ PostgreSQL   │                  │    Document    │
             │   Database   │                  │   Processing   │
             └──────────────┘                  └───────┬────────┘
                                                       │
                                                       ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                              KNOWLEDGE PIPELINE                                   │
│                                                                                  │
│ Repository → Discovery → Parsing → Chunking → Metadata → Embeddings             │
│                                                                    │             │
│                                                                    ▼             │
│                                                               Vector Store        │
└──────────────────────────────────────────────────────────────────────────────────┘
                                                                    │
                                                                    ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                               AGENTIC AI LAYER                                   │
│                                                                                  │
│                          ┌─────────────────────┐                                 │
│                          │      LangGraph      │                                 │
│                          │  Agent Orchestrator │                                 │
│                          └──────────┬──────────┘                                 │
│                                     │                                            │
│             ┌───────────────────────┼────────────────────────┐                   │
│             │                       │                        │                   │
│             ▼                       ▼                        ▼                   │
│      ┌─────────────┐         ┌─────────────┐          ┌─────────────┐            │
│      │ Retrieval   │         │    Code     │          │Architecture │            │
│      │    Agent    │         │    Agent    │          │    Agent    │            │
│      └──────┬──────┘         └──────┬──────┘          └──────┬──────┘            │
│             │                       │                        │                    │
│             └───────────────────────┼────────────────────────┘                    │
│                                     ▼                                            │
│                           ┌──────────────────┐                                   │
│                           │    LangChain     │                                   │
│                           │ Tools + Retrieval│                                   │
│                           └────────┬─────────┘                                   │
│                                    │                                             │
│              ┌─────────────────────┼─────────────────────┐                       │
│              ▼                     ▼                     ▼                       │
│        File Search          Vector Search          Code Retrieval                │
│              │                     │                     │                       │
│              └─────────────────────┼─────────────────────┘                       │
│                                    ▼                                             │
│                           Context Aggregation                                    │
└────────────────────────────────────┬─────────────────────────────────────────────┘
                                     │
                                     ▼
                           ┌──────────────────────┐
                           │     LLM / Gemini     │
                           │    Reasoning Layer   │
                           └──────────┬───────────┘
                                      │
                                      ▼
                           ┌──────────────────────┐
                           │ Evidence-Grounded    │
                           │     AI Response      │
                           └──────────┬───────────┘
                                      │
                                      ▼
                           ┌──────────────────────┐
                           │     React Client     │
                           │   Analysis Results   │
                           └──────────────────────┘


        ┌────────────────────────────────────────────────────────────┐
        │                    DEVOPS PIPELINE                         │
        │                                                            │
        │  Git Push → CI → Build → Test → Docker Build → Deploy    │
        │                                                            │
        └────────────────────────────────────────────────────────────┘
```

## 🔍 RAG Pipeline

```text
┌──────────────┐
│ Source Code  │
└──────┬───────┘
       ▼
┌──────────────┐
│    Parsing   │
└──────┬───────┘
       ▼
┌──────────────┐
│   Chunking   │
└──────┬───────┘
       ▼
┌──────────────┐
│  Embeddings  │
└──────┬───────┘
       ▼
┌──────────────┐
│ Vector Store │
└──────┬───────┘
       │
       │
       │          ┌──────────────┐
       └─────────►│  User Query  │
                  └──────┬───────┘
                         ▼
                  ┌──────────────┐
                  │ Query Embed  │
                  └──────┬───────┘
                         ▼
                  ┌──────────────┐
                  │ Vector Search│
                  └──────┬───────┘
                         ▼
                  ┌──────────────┐
                  │ Top-K Context │
                  └──────┬───────┘
                         ▼
                  ┌──────────────┐
                  │Context Assembly│
                  └──────┬───────┘
                         ▼
                  ┌──────────────┐
                  │     LLM      │
                  └──────┬───────┘
                         ▼
                  ┌──────────────┐
                  │ Grounded AI  │
                  │    Answer    │
                  └──────────────┘
```

## 🔗 Webhook-Driven Repository Updates

CodeSentinel can integrate repository events through webhooks.

```text
┌─────────────────┐
│ GitHub Repository│
└────────┬────────┘
         │
         │ Push / PR Event
         ▼
┌─────────────────┐
│ Webhook Endpoint│
└────────┬────────┘
         ▼
┌─────────────────┐
│ Event Validation│
└────────┬────────┘
         ▼
┌─────────────────┐
│ Redis / Job Flow │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Repository Sync │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Re-index / RAG  │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Updated Knowledge│
└─────────────────┘
```

## 💻 Frontend

A modern **React + TypeScript interface** provides an interactive workspace for repository intelligence.

### Highlights

* 🔗 Repository URL submission
* 📄 Document upload
* 💬 AI-powered interaction
* 🧠 RAG-generated insights
* 📊 Analysis visualization
* ⚡ Responsive API-driven experience

```text
┌──────────────────────┐
│ React + TypeScript   │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ REST API             │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ Agentic RAG Backend  │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ Repository Intelligence│
└──────────────────────┘
```

## ⚡ Example

### Ask

> **"Where is JWT authentication implemented?"**

### Agentic Workflow

```text
┌──────────────┐
│  User Query  │
└──────┬───────┘
       ▼
┌──────────────────────┐
│ Query Understanding  │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│ LangGraph Routing    │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│ Retrieval Agent      │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│ LangChain Retrieval  │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│ Auth Context         │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│ LLM Reasoning        │
└──────┬───────────────┘
       ▼
┌──────────────────────┐
│  Grounded Answer     │
└──────────────────────┘
```

> The LLM doesn't need the entire repository in its context window. **CodeSentinel retrieves the most relevant information first, then uses it to generate a grounded response.**

## 🧰 Tech Stack

| Layer                 | Technologies                                             |
| --------------------- | -------------------------------------------------------- |
| 🤖 **AI / LLM**       | Gemini, LLMs, Agentic AI, Tool Calling                   |
| 🧠 **RAG**            | LangChain, Embeddings, Vector Search, Semantic Retrieval |
| 🕸️ **Agents**        | LangGraph, Multi-Agent Workflows, Agent Orchestration    |
| 💻 **Frontend**       | React, TypeScript                                        |
| ⚙️ **Backend**        | Node.js, Express.js, TypeScript                          |
| 🐍 **AI Services**    | Python, FastAPI, Docling                                 |
| 🗄️ **Database**      | PostgreSQL, Prisma ORM                                   |
| ⚡ **Caching / State** | Redis                                                    |
| 🔗 **Integration**    | GitHub Webhooks, REST APIs                               |
| 🐳 **Infrastructure** | Docker, Docker Compose                                   |
| 🔄 **CI/CD**          | Automated Build, Test & Deployment Pipeline              |
| 🔧 **Development**    | Git, GitHub, Postman                                     |

## 🔥 Why CodeSentinel?

CodeSentinel brings together modern **AI engineering and production backend architecture**:

**Repository → Ingestion → Processing → Embeddings → Vector Search → LangGraph Agents → LangChain Tools → LLM Reasoning → Grounded Response**

### AI Engineering

**Agentic RAG • LangGraph • LangChain • LLMs • Embeddings • Vector Search • Tool Calling • Code Intelligence • Document AI**

### Backend & Infrastructure

**Node.js • TypeScript • Python • FastAPI • Prisma • PostgreSQL • Redis • Docker • CI/CD • Webhooks**

### Frontend

**React • TypeScript • REST APIs • Interactive AI Workspace**

## 🔮 Roadmap

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

## 👨‍💻 Author

### Noor Alam

**Software Developer | AI & Backend Engineering**

`C++` · `Python` · `TypeScript` · `RAG` · `Agentic AI` · `LangChain` · `LangGraph` · `Backend Systems`

<p align="center">

## 🛡️ CodeSentinel

### Turn any codebase into an AI-understandable knowledge base.

</p>
