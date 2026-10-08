import { useState } from "react";

const SECTIONS = [
    {
        id: "quickstart",
        title: "Quick Start",
        icon: "🚀",
        content: [
            {
                heading: "1. Sign in",
                body: "Go to /register or /login. You can use email + password or click **Continue with GitHub** for one-click OAuth. GitHub OAuth is required if you want to scan your private repositories.",
            },
            {
                heading: "2. Select a repository",
                body: "Click the **+** button in the header or the **Scan a Repository** button on the home page. Choose any GitHub repository from your account list.",
            },
            {
                heading: "3. Wait for scanning",
                body: "CodeSentinel clones the repo, reads every source file, splits them into chunks, and stores vector embeddings in the database. This takes 30–90 seconds depending on repo size. It only runs once per repository — repeat visits return instantly from cache.",
            },
            {
                heading: "4. Ask the AI",
                body: "Once scanning completes, the review panel opens on the right. Type any question or click one of the quick-start buttons. The AI planner routes your question to the right specialist agents automatically.",
            },
        ],
    },
    {
        id: "agents",
        title: "AI Agents",
        icon: "🤖",
        content: [
            {
                heading: "Planner Agent",
                body: "Reads your question and decides which specialist agents to run. It classifies intent using LLM routing with a keyword fallback. You never have to pick an agent manually.",
            },
            {
                heading: "Security Agent",
                body: "Finds OWASP Top 10 vulnerabilities, injection flaws, hardcoded credentials, insecure JWT configuration, IDOR, SSRF, and missing authentication. Always returns: What / Where / Why / How to fix / Severity.",
            },
            {
                heading: "Architecture Agent",
                body: "Reviews code structure, SOLID principles, design patterns, coupling between modules, and separation of concerns. Identifies god classes, circular dependencies, and missing abstraction layers.",
            },
            {
                heading: "Logic Agent",
                body: "Finds runtime bugs, off-by-one errors, null/undefined errors, incorrect async/await usage, silent error swallowing, and missing edge-case handling.",
            },
            {
                heading: "Performance Agent",
                body: "Detects N+1 database query patterns, sequential async calls that should be parallel, missing indexes, unbounded queries, and algorithmic complexity issues.",
            },
            {
                heading: "Testing Agent",
                body: "Estimates test coverage, identifies untested critical paths, and generates runnable Jest/Vitest test cases. Points out code that is hard to test and explains how to make it testable.",
            },
            {
                heading: "Synthesizer Agent",
                body: "When multiple specialist agents run, the Synthesizer merges all findings into one de-duplicated, prioritized report. It adds an overall risk level and an action plan.",
            },
        ],
    },
    {
        id: "api",
        title: "API Reference",
        icon: "⚙️",
        content: [
            {
                heading: "POST /api/v1/github/repository",
                body: "Triggers a full repository scan. Body: `{ cloneUrl: string }`. Returns `{ projectId, scanId, filesProcessed, chunksProcessed }`. If the repo was already scanned, returns the cached `projectId` immediately without re-scanning.",
            },
            {
                heading: "POST /api/v1/review/multi",
                body: "Runs the multi-agent review pipeline. Body: `{ question: string, projectId?: string }`. The `projectId` scopes the vector search to a specific repo. Without it, all scanned repos are searched. Returns `{ answer, agentsUsed, plannerMode, severity }`.",
            },
            {
                heading: "GET /api/v1/github/repos",
                body: "Returns the authenticated user's GitHub repositories. Requires the user to have logged in via GitHub OAuth so an access token is stored. Returns up to 100 repos sorted by last updated.",
            },
            {
                heading: "GET /api/v1/user/me",
                body: "Returns the current authenticated user's profile. Used by the frontend on every page load to check auth state.",
            },
        ],
    },
    {
        id: "faq",
        title: "FAQ",
        icon: "❓",
        content: [
            {
                heading: "Does CodeSentinel store my code?",
                body: "CodeSentinel stores vector embeddings of your code chunks, not the raw source files. The cloned repository is deleted from disk after scanning. Embeddings are mathematical representations — they cannot be reversed to reconstruct your original code.",
            },
            {
                heading: "Why does the first scan take so long?",
                body: "Each file is chunked and embedded individually. For a 100-file repo this means ~100 embedding API calls. Subsequent questions on the same repo are fast because the embeddings are cached in the database.",
            },
            {
                heading: "Can I scan the same repo twice?",
                body: "If a completed scan exists for that repository URL and user, CodeSentinel returns the cached result immediately. To force a rescan, the existing project record would need to be deleted from the database.",
            },
            {
                heading: "Which LLM does CodeSentinel use?",
                body: "The review engine uses Groq (openai/gpt-oss-120b) with LangGraph for the agentic workflow, and Google Gemini (gemini-embedding-001) for generating code embeddings. Tavily Search is available as a tool for web lookups.",
            },
        ],
    },
];

export default function Docs() {
    const [activeSection, setActiveSection] = useState("quickstart");
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

    const toggleItem = (key: string) => {
        setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const current = SECTIONS.find((s) => s.id === activeSection)!;

    return (
        <main className="cs-page" style={{ background: "var(--bg-base)", minHeight: "100vh", color: "var(--text-primary)" }}>

            {/* ── Header ── */}
            <div style={{ borderBottom: "1px solid var(--border-subtle)", padding: "3rem 1.5rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
                <p className="cs-section-label">Documentation</p>
                <h1 style={{ marginTop: "0.75rem", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.025em" }}>
                    CodeSentinel Docs
                </h1>
                <p style={{ marginTop: "0.5rem", fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "480px" }}>
                    Everything you need to scan repositories and get AI-powered code reviews.
                </p>
            </div>

            <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "220px 1fr", gap: "3rem", padding: "2.5rem 1.5rem 5rem", alignItems: "start" }} className="md:grid-cols-2">

                {/* ── Sidebar ── */}
                <nav style={{ position: "sticky", top: "5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    {SECTIONS.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setActiveSection(s.id)}
                            style={{
                                display: "flex", alignItems: "center", gap: "0.75rem",
                                padding: "0.625rem 0.875rem", borderRadius: "0.5rem",
                                border: "1px solid transparent",
                                background: activeSection === s.id ? "var(--blue-soft)" : "transparent",
                                borderColor: activeSection === s.id ? "rgba(37,99,235,0.2)" : "transparent",
                                color: activeSection === s.id ? "var(--text-blue)" : "var(--text-muted)",
                                cursor: "pointer", textAlign: "left",
                                fontSize: "0.875rem", fontWeight: activeSection === s.id ? 600 : 400,
                                transition: "all 150ms",
                            }}
                            onMouseEnter={(e) => { if (activeSection !== s.id) (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                            onMouseLeave={(e) => { if (activeSection !== s.id) (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                        >
                            <span style={{ fontSize: "1rem" }}>{s.icon}</span>
                            {s.title}
                        </button>
                    ))}
                </nav>

                {/* ── Content ── */}
                <div key={activeSection} className="animate-fade-in">
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span>{current.icon}</span>
                        {current.title}
                    </h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                        {current.content.map((item, i) => {
                            const key = `${activeSection}-${i}`;
                            const isOpen = openItems[key] !== false; // open by default

                            return (
                                <div key={key} style={{
                                    borderRadius: "0.75rem", border: "1px solid var(--border)",
                                    background: "var(--bg-card)", overflow: "hidden",
                                    transition: "border-color 150ms",
                                }}>
                                    <button
                                        onClick={() => toggleItem(key)}
                                        style={{
                                            width: "100%", display: "flex", alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "1rem 1.25rem", background: "none", border: "none",
                                            cursor: "pointer", textAlign: "left",
                                        }}
                                    >
                                        <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>
                                            {item.heading}
                                        </span>
                                        <span style={{
                                            color: "var(--text-muted)", fontSize: "0.75rem",
                                            transition: "transform 200ms",
                                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                            display: "inline-block",
                                        }}>
                                            ▼
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="animate-slide-down" style={{ padding: "0 1.25rem 1.25rem", borderTop: "1px solid var(--border-subtle)" }}>
                                            <p style={{
                                                marginTop: "0.875rem",
                                                fontSize: "0.875rem", lineHeight: 1.8,
                                                color: "var(--text-secondary)",
                                            }}>
                                                {item.body.split(/(\*\*[^*]+\*\*|`[^`]+`)/).map((part, j) => {
                                                    if (part.startsWith("**") && part.endsWith("**")) {
                                                        return <strong key={j} style={{ color: "var(--text-primary)", fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
                                                    }
                                                    if (part.startsWith("`") && part.endsWith("`")) {
                                                        return <code key={j} style={{ fontFamily: "monospace", fontSize: "0.8125rem", background: "var(--bg-elevated)", color: "var(--text-blue)", padding: "0.125rem 0.375rem", borderRadius: "0.25rem", border: "1px solid var(--border)" }}>{part.slice(1, -1)}</code>;
                                                    }
                                                    return part;
                                                })}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}
