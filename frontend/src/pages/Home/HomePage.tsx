import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import SelectRepository from "../Repository/RepositoryDetails.tsx";

// ── Animated terminal lines ───────────────────────────────────────
const TERMINAL_LINES = [
    { delay: 0,    color: "var(--text-muted)",    text: "$ codesentinel scan --repo github.com/acme/api" },
    { delay: 600,  color: "var(--text-success)",  text: "✓  Repository cloned — 1,247 files" },
    { delay: 1200, color: "var(--text-success)",  text: "✓  Dependencies resolved — 342 packages" },
    { delay: 1800, color: "var(--text-success)",  text: "✓  Secrets scan complete — 0 exposed" },
    { delay: 2400, color: "var(--text-blue)",     text: "●  Running SAST analysis…" },
    { delay: 3200, color: "var(--text-warning)",  text: "⚠  2 critical findings detected" },
    { delay: 3800, color: "var(--text-success)",  text: "✓  Report generated in 1.8s" },
];

function AnimatedTerminal() {
    const [visibleLines, setVisibleLines] = useState<number>(0);

    useEffect(() => {
        TERMINAL_LINES.forEach((_, i) => {
            setTimeout(() => setVisibleLines(i + 1), TERMINAL_LINES[i].delay);
        });
    }, []);

    return (
        <div style={{
            overflow: "hidden", borderRadius: "0.875rem",
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
            boxShadow: "0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)",
        }}>
            {/* Title bar */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: "1px solid var(--border-subtle)",
                padding: "0.75rem 1.25rem",
                background: "rgba(255,255,255,0.02)",
            }}>
                <div style={{ display: "flex", gap: "0.4rem" }}>
                    {["#ef6461","#f2b84b","#4fb286"].map((c) => (
                        <span key={c} style={{ width: "0.625rem", height: "0.625rem", borderRadius: "9999px", background: c, opacity: 0.8 }} />
                    ))}
                </div>
                <span style={{ fontFamily: "monospace", fontSize: "0.6875rem", color: "var(--text-muted)" }}>
                    codesentinel — scan
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.6875rem", color: "var(--text-success)" }}>
                    <span style={{ width: "0.375rem", height: "0.375rem", borderRadius: "9999px", background: "var(--success)", display: "inline-block", animation: "pulse-ring 1.5s ease-out infinite" }} />
                    LIVE
                </span>
            </div>

            {/* Lines */}
            <div style={{ padding: "1.25rem 1.5rem", fontFamily: "monospace", fontSize: "0.75rem", lineHeight: 1.9, minHeight: "9rem" }}>
                {TERMINAL_LINES.slice(0, visibleLines).map(({ color, text }, i) => (
                    <div
                        key={i}
                        style={{
                            color,
                            animation: "fadeInUp 0.3s ease both",
                        }}
                    >
                        {text}
                        {i === visibleLines - 1 && <span className="cs-cursor" />}
                    </div>
                ))}
            </div>

            {/* Scores — shown after all lines */}
            {visibleLines >= TERMINAL_LINES.length && (
                <div style={{
                    borderTop: "1px solid var(--border-subtle)",
                    padding: "1rem 1.5rem",
                    display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.75rem",
                    animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1) both",
                }}>
                    {[
                        { label: "Critical", val: "2",   color: "var(--text-danger)"  },
                        { label: "High",     val: "5",   color: "#fca5a5"              },
                        { label: "Medium",   val: "8",   color: "var(--text-warning)"  },
                        { label: "Score",    val: "86%", color: "var(--text-success)"  },
                    ].map(({ label, val, color }) => (
                        <div key={label} style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "1.125rem", fontWeight: 700, color, fontFamily: "monospace" }}>{val}</p>
                            <p style={{ fontSize: "0.625rem", color: "var(--text-muted)", marginTop: "0.125rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Feature cards ────────────────────────────────────────────────
const FEATURES = [
    {
        icon: "🔒",
        color: "var(--text-danger)",
        bg:    "rgba(239,68,68,0.1)",
        title: "Code Intelligence",
        text:  "Detect dangerous patterns before they reach production.",
    },
    {
        icon: "📦",
        color: "var(--text-warning)",
        bg:    "rgba(245,158,11,0.1)",
        title: "Dependency Scan",
        text:  "Identify vulnerable packages across your entire tree.",
    },
    {
        icon: "🔑",
        color: "var(--text-violet)",
        bg:    "var(--violet-soft)",
        title: "Secret Detection",
        text:  "Find leaked API keys and tokens before attackers do.",
    },
    {
        icon: "🤖",
        color: "var(--text-blue)",
        bg:    "var(--blue-soft)",
        title: "AI Agent Review",
        text:  "Multi-agent AI analyzes security, logic, and architecture simultaneously.",
    },
    {
        icon: "⚡",
        color: "var(--text-success)",
        bg:    "var(--success-soft)",
        title: "Performance Analysis",
        text:  "Spot N+1 queries, memory leaks, and bottlenecks automatically.",
    },
    {
        icon: "🧪",
        color: "#fb923c",
        bg:    "rgba(251,146,60,0.1)",
        title: "Test Coverage",
        text:  "Generate missing test cases and identify untested critical paths.",
    },
];

const STATS = [
    { value: "10k+",  label: "Developers",    color: "var(--text-blue)"    },
    { value: "2.4M+", label: "Scans run",      color: "var(--text-violet)"  },
    { value: "98%",   label: "Detection rate", color: "var(--text-success)" },
    { value: "<2min", label: "Avg. scan time", color: "var(--text-warning)" },
];

export default function HomePage() {
    const [showRepoModal, setShowRepoModal] = useState(false);
    const isLoggedIn = useSelector((state: any) => state.auth.status);

    return (
        <main className="cs-page" style={{ background: "var(--bg-base)", minHeight: "100vh", color: "var(--text-primary)", position: "relative", overflow: "hidden" }}>

            {/* ── Background ── */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }} />
                <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "70%", height: "70%", borderRadius: "9999px", background: "rgba(37,99,235,0.05)", filter: "blur(120px)", animation: "glow-pulse 4s ease-in-out infinite" }} />
                <div style={{ position: "absolute", bottom: "0%", right: "-10%", width: "40%", height: "40%", borderRadius: "9999px", background: "rgba(139,92,246,0.04)", filter: "blur(100px)" }} />
            </div>

            {/* ══ HERO ══════════════════════════════════════════════ */}
            <section style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>
                <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>

                    {/* Live pill */}
                    <div
                        className="animate-fade-in stagger-1"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "0.5rem",
                            background: "var(--blue-soft)", border: "1px solid rgba(37,99,235,0.25)",
                            borderRadius: "9999px", padding: "0.375rem 1rem",
                            fontSize: "0.75rem", fontWeight: 500, color: "var(--text-blue)",
                            marginBottom: "2rem", cursor: "default",
                        }}
                    >
                        <span style={{ position: "relative", width: "0.5rem", height: "0.5rem", flexShrink: 0 }}>
                            <span style={{ position: "absolute", inset: 0, borderRadius: "9999px", background: "var(--blue)", animation: "pulse-ring 1.5s ease-out infinite" }} />
                            <span style={{ position: "absolute", inset: "1px", borderRadius: "9999px", background: "var(--blue)" }} />
                        </span>
                        AI-powered · Multi-agent · Real-time scanning
                    </div>

                    {/* Heading */}
                    <h1
                        className="animate-fade-in-up stagger-2"
                        style={{
                            fontSize: "clamp(2.5rem,5.5vw,4rem)", fontWeight: 700,
                            lineHeight: 1.08, letterSpacing: "-0.035em",
                            color: "var(--text-primary)",
                        }}
                    >
                        Secure your code
                        <br />
                        <span style={{
                            background: "linear-gradient(135deg, var(--blue) 0%, var(--violet) 100%)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}>
                            before it ships.
                        </span>
                    </h1>

                    <p
                        className="animate-fade-in-up stagger-3"
                        style={{
                            marginTop: "1.5rem", fontSize: "1.125rem", lineHeight: 1.75,
                            color: "var(--text-secondary)", maxWidth: "560px", margin: "1.5rem auto 0",
                        }}
                    >
                        CodeSentinel uses a multi-agent AI system to scan your repositories for
                        vulnerabilities, logic bugs, performance issues, and missing tests —
                        all at once.
                    </p>

                    {/* CTAs */}
                    <div className="animate-fade-in-up stagger-4" style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "0.875rem", justifyContent: "center" }}>
                        {isLoggedIn ? (
                            <button
                                onClick={() => setShowRepoModal(true)}
                                className="cs-btn-primary"
                                style={{ fontSize: "1rem", padding: "0.8125rem 1.75rem", borderRadius: "0.625rem", boxShadow: "0 0 32px rgba(37,99,235,0.3)" }}
                            >
                                <span>Scan a Repository</span>
                                <span style={{ opacity: 0.7 }}>→</span>
                            </button>
                        ) : (
                            <Link
                                to="/register"
                                className="cs-btn-primary"
                                style={{ fontSize: "1rem", padding: "0.8125rem 1.75rem", borderRadius: "0.625rem", boxShadow: "0 0 32px rgba(37,99,235,0.3)" }}
                            >
                                Get Started Free
                            </Link>
                        )}
                        <Link
                            to="/docs"
                            className="cs-btn-secondary"
                            style={{ fontSize: "1rem", padding: "0.8125rem 1.75rem", borderRadius: "0.625rem" }}
                        >
                            View Docs
                        </Link>
                    </div>

                    <p className="animate-fade-in stagger-5" style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        Free forever · No credit card · Works with any GitHub repo
                    </p>
                </div>

                {/* Terminal */}
                <div className="animate-fade-in-up stagger-5" style={{ maxWidth: "640px", margin: "3.5rem auto 0" }}>
                    <AnimatedTerminal />
                </div>
            </section>

            {/* ══ STATS ═════════════════════════════════════════════ */}
            <section style={{ borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2rem" }} className="lg:grid-cols-4">
                        {STATS.map(({ value, label, color }, i) => (
                            <div key={label} className={`animate-fade-in-up stagger-${i + 1}`} style={{ textAlign: "center" }}>
                                <p style={{ fontSize: "2.25rem", fontWeight: 700, letterSpacing: "-0.03em", color }}>{value}</p>
                                <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ FEATURES ══════════════════════════════════════════ */}
            <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 1.5rem" }}>
                <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                    <p className="cs-section-label">Capabilities</p>
                    <h2 style={{ marginTop: "0.875rem", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
                        Six AI agents working together
                    </h2>
                    <p style={{ marginTop: "0.75rem", fontSize: "1rem", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "480px", margin: "0.75rem auto 0" }}>
                        Each agent specializes in one domain. The planner routes your question to the right ones automatically.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
                    {FEATURES.map((f, i) => (
                        <div
                            key={f.title}
                            className={`cs-card animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
                            style={{ padding: "1.5rem" }}
                        >
                            <div style={{
                                display: "inline-flex", height: "2.75rem", width: "2.75rem",
                                alignItems: "center", justifyContent: "center",
                                borderRadius: "0.75rem", background: f.bg,
                                fontSize: "1.25rem", marginBottom: "1rem",
                                border: `1px solid ${f.color}30`,
                            }}>
                                {f.icon}
                            </div>
                            <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                                {f.title}
                            </h3>
                            <p style={{ fontSize: "0.8125rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                                {f.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ HOW IT WORKS ══════════════════════════════════════ */}
            <section style={{ background: "var(--bg-secondary)", padding: "5rem 1.5rem" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                        <p className="cs-section-label">Workflow</p>
                        <h2 style={{ marginTop: "0.875rem", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
                            How it works
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
                        {[
                            { step: "01", icon: "🔗", title: "Connect",  text: "Sign in with GitHub and select any repository from your account." },
                            { step: "02", icon: "⚙️",  title: "Scan",     text: "CodeSentinel clones the repo, chunks the code, and builds a vector index." },
                            { step: "03", icon: "🤖", title: "Analyze",  text: "Ask any question. The AI planner routes it to the right specialist agents." },
                            { step: "04", icon: "📋", title: "Review",   text: "Get a structured report with findings, severity levels, and actionable fixes." },
                        ].map(({ step, icon, title, text }, i) => (
                            <div key={step} className={`animate-fade-in-up stagger-${i + 1}`} style={{ position: "relative" }}>
                                <div style={{
                                    padding: "1.5rem", borderRadius: "0.875rem",
                                    border: "1px solid var(--border)", background: "var(--bg-card)",
                                    height: "100%", transition: "border-color 200ms",
                                }}
                                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                                >
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                                        <span style={{
                                            fontSize: "0.6875rem", fontWeight: 700, fontFamily: "monospace",
                                            color: "var(--blue)", background: "var(--blue-soft)",
                                            padding: "0.25rem 0.5rem", borderRadius: "0.25rem",
                                            flexShrink: 0, border: "1px solid rgba(37,99,235,0.2)",
                                        }}>{step}</span>
                                        <span style={{ fontSize: "1.25rem" }}>{icon}</span>
                                    </div>
                                    <h3 style={{ marginTop: "1rem", fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>{title}</h3>
                                    <p style={{ marginTop: "0.375rem", fontSize: "0.8125rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ CTA ═══════════════════════════════════════════════ */}
            <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 1.5rem" }}>
                <div style={{
                    borderRadius: "1rem", padding: "4rem 2rem", textAlign: "center",
                    background: "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(139,92,246,0.08) 100%)",
                    border: "1px solid rgba(37,99,235,0.2)",
                    position: "relative", overflow: "hidden",
                }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "24px 24px" }} aria-hidden="true" />
                    <div style={{ position: "relative" }}>
                        <p className="cs-section-label">Start today</p>
                        <h2 style={{ marginTop: "1rem", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
                            Find vulnerabilities before attackers do.
                        </h2>
                        <p style={{ margin: "1rem auto 0", maxWidth: "440px", fontSize: "1rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                            Set up in under 2 minutes. Works with any public or private GitHub repository.
                        </p>
                        <div style={{ marginTop: "2.25rem", display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
                            {isLoggedIn ? (
                                <button
                                    onClick={() => setShowRepoModal(true)}
                                    className="cs-btn-primary"
                                    style={{ fontSize: "1rem", padding: "0.8125rem 1.75rem" }}
                                >
                                    Scan a Repository →
                                </button>
                            ) : (
                                <Link to="/register" className="cs-btn-primary" style={{ fontSize: "1rem", padding: "0.8125rem 1.75rem" }}>
                                    Get Started Free
                                </Link>
                            )}
                            <Link to="/login" className="cs-btn-secondary" style={{ fontSize: "1rem", padding: "0.8125rem 1.75rem" }}>
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {showRepoModal && <SelectRepository onClose={() => setShowRepoModal(false)} />}
        </main>
    );
}
