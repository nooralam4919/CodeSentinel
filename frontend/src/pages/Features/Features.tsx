import { useState } from "react";
import { Link } from "react-router-dom";

const AGENTS = [
    {
        icon: "🔒", color: "var(--text-danger)", bg: "rgba(239,68,68,0.1)",
        name: "Security Agent",
        desc: "Finds OWASP vulnerabilities, injection flaws, hardcoded secrets, auth bypass, and CSRF. Quotes the exact vulnerable code and gives a copy-paste fix.",
        examples: ["SQL injection in query params", "JWT with weak secret", "Missing CORS headers"],
    },
    {
        icon: "🏗️", color: "var(--text-blue)", bg: "var(--blue-soft)",
        name: "Architecture Agent",
        desc: "Reviews code structure, SOLID principles, design patterns, coupling, and layer separation. Identifies god classes and missing abstractions.",
        examples: ["Business logic in routes", "Circular dependencies", "Missing repository pattern"],
    },
    {
        icon: "🐛", color: "var(--text-violet)", bg: "var(--violet-soft)",
        name: "Logic Agent",
        desc: "Hunts for bugs, incorrect edge-case handling, null/undefined errors, race conditions, and silent failures hiding in empty catch blocks.",
        examples: ["Off-by-one in pagination", "Missing null guard", "Fire-and-forget async"],
    },
    {
        icon: "⚡", color: "var(--text-warning)", bg: "var(--warning-soft)",
        name: "Performance Agent",
        desc: "Detects N+1 queries, sequential awaits that should be parallel, missing database indexes, and unbounded data fetching.",
        examples: ["DB query inside for-loop", "Sequential instead of Promise.all", "SELECT * without LIMIT"],
    },
    {
        icon: "🧪", color: "var(--text-success)", bg: "var(--success-soft)",
        name: "Testing Agent",
        desc: "Estimates test coverage, identifies untested critical paths, and generates real, runnable Jest/Vitest test cases for your code.",
        examples: ["No tests for auth middleware", "Missing edge-case tests", "Generates 3 missing unit tests"],
    },
    {
        icon: "📋", color: "#fb923c", bg: "rgba(251,146,60,0.1)",
        name: "Synthesizer Agent",
        desc: "When multiple agents run, the Synthesizer merges all findings into one prioritized, de-duplicated report ordered by business impact.",
        examples: ["Merges security + logic findings", "Removes duplicate issues", "Ranks by severity"],
    },
];

const HOW = [
    { step: "01", title: "Connect your repo",  text: "Sign in with GitHub and select any repository. CodeSentinel clones it and builds a searchable vector index." },
    { step: "02", title: "Ask a question",      text: "Type anything — 'find security vulnerabilities', 'review the architecture', or 'generate missing tests'." },
    { step: "03", title: "Planner routes it",   text: "The AI Planner reads your question and decides which specialist agents are needed. Most questions route to 1–2 agents." },
    { step: "04", title: "Agents run in parallel", text: "Selected agents run simultaneously against your code context. No waiting in sequence." },
    { step: "05", title: "Get a structured report", text: "Results are synthesized into one clear report with severity levels, file locations, and actionable fixes." },
];

export default function Features() {
    const [activeAgent, setActiveAgent] = useState(0);

    return (
        <main className="cs-page" style={{ background: "var(--bg-base)", minHeight: "100vh", color: "var(--text-primary)" }}>

            {/* ── Hero ── */}
            <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 1.5rem 4rem", textAlign: "center" }}>
                <p className="cs-section-label animate-fade-in">Multi-Agent AI Platform</p>
                <h1 className="animate-fade-in-up stagger-2" style={{ marginTop: "1rem", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                    Six AI agents.<br />
                    <span style={{ background: "linear-gradient(135deg, var(--blue), var(--violet))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        One complete review.
                    </span>
                </h1>
                <p className="animate-fade-in-up stagger-3" style={{ marginTop: "1.25rem", fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--text-secondary)", maxWidth: "520px", margin: "1.25rem auto 0" }}>
                    CodeSentinel's planner agent routes every question to the right specialists automatically.
                    No configuration. No manual selection.
                </p>
            </section>

            {/* ── Agent explorer ── */}
            <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "2rem", alignItems: "start" }} className="md:grid-cols-2">

                    {/* Agent list */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {AGENTS.map((agent, i) => (
                            <button
                                key={agent.name}
                                onClick={() => setActiveAgent(i)}
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.875rem",
                                    padding: "0.875rem 1rem", borderRadius: "0.625rem",
                                    border: `1px solid ${activeAgent === i ? agent.color + "40" : "var(--border)"}`,
                                    background: activeAgent === i ? agent.bg : "var(--bg-card)",
                                    cursor: "pointer", textAlign: "left",
                                    transition: "all 200ms",
                                }}
                            >
                                <span style={{ fontSize: "1.25rem", flexShrink: 0, width: "2rem", textAlign: "center" }}>{agent.icon}</span>
                                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: activeAgent === i ? agent.color : "var(--text-primary)" }}>
                                    {agent.name}
                                </span>
                                <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                    {activeAgent === i ? "▼" : "›"}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Agent detail */}
                    <div
                        key={activeAgent}
                        className="cs-card animate-fade-in"
                        style={{ padding: "2rem", position: "sticky", top: "5rem" }}
                    >
                        <div style={{
                            display: "inline-flex", height: "3.5rem", width: "3.5rem",
                            alignItems: "center", justifyContent: "center",
                            borderRadius: "1rem", background: AGENTS[activeAgent].bg,
                            fontSize: "1.75rem", marginBottom: "1.25rem",
                            border: `1px solid ${AGENTS[activeAgent].color}30`,
                        }}>
                            {AGENTS[activeAgent].icon}
                        </div>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                            {AGENTS[activeAgent].name}
                        </h2>
                        <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                            {AGENTS[activeAgent].desc}
                        </p>
                        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem" }}>
                            <p style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                                Example findings
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                {AGENTS[activeAgent].examples.map((ex) => (
                                    <div key={ex} style={{
                                        display: "flex", alignItems: "center", gap: "0.625rem",
                                        padding: "0.5rem 0.75rem", borderRadius: "0.375rem",
                                        background: "var(--bg-elevated)", border: "1px solid var(--border)",
                                    }}>
                                        <span style={{ color: AGENTS[activeAgent].color, fontSize: "0.75rem" }}>→</span>
                                        <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{ex}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ── How it works ── */}
            <section style={{ background: "var(--bg-secondary)", padding: "5rem 1.5rem" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <p className="cs-section-label">Workflow</p>
                        <h2 style={{ marginTop: "0.875rem", fontSize: "1.875rem", fontWeight: 700, letterSpacing: "-0.025em" }}>How a review works</h2>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "680px", margin: "0 auto" }}>
                        {HOW.map(({ step, title, text }, i) => (
                            <div key={step} className={`animate-fade-in-up stagger-${Math.min(i+1,6)}`} style={{
                                display: "flex", gap: "1.25rem", alignItems: "flex-start",
                                padding: "1.25rem", borderRadius: "0.75rem",
                                border: "1px solid var(--border)", background: "var(--bg-card)",
                                transition: "border-color 200ms",
                            }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--blue)")}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                            >
                                <span style={{
                                    flexShrink: 0, fontFamily: "monospace", fontSize: "0.6875rem", fontWeight: 700,
                                    color: "var(--text-blue)", background: "var(--blue-soft)",
                                    padding: "0.25rem 0.5rem", borderRadius: "0.25rem",
                                    border: "1px solid rgba(37,99,235,0.2)", marginTop: "0.1rem",
                                }}>{step}</span>
                                <div>
                                    <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>{title}</p>
                                    <p style={{ marginTop: "0.25rem", fontSize: "0.8125rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 1.5rem" }}>
                <div style={{
                    borderRadius: "1rem", padding: "3.5rem 2rem", textAlign: "center",
                    background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(139,92,246,0.07))",
                    border: "1px solid rgba(37,99,235,0.2)",
                }}>
                    <h2 style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em" }}>Try it on your codebase</h2>
                    <p style={{ marginTop: "0.875rem", color: "var(--text-secondary)", maxWidth: "400px", margin: "0.875rem auto 0", lineHeight: 1.7 }}>
                        Free to use. No credit card. Connect GitHub and scan any repo in under 2 minutes.
                    </p>
                    <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link to="/register" className="cs-btn-primary" style={{ fontSize: "0.9375rem", padding: "0.75rem 1.5rem" }}>
                            Get Started Free
                        </Link>
                        <Link to="/docs" className="cs-btn-secondary" style={{ fontSize: "0.9375rem", padding: "0.75rem 1.5rem" }}>
                            Read the Docs
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
