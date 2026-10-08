import { useState } from "react";
import ReviewCode from "../Reviews/ReviewCode.tsx";
import { submitMultiAgentReview } from "../../services/MultiAgentReview.service.ts";

interface ReviewRequestProps {
    repository: any;
    projectId?: string;
    onClose: () => void;
}

const QUICK_PROMPTS = [
    { label: "Security audit",      icon: "🔒", text: "Analyze this code for security vulnerabilities" },
    { label: "Architecture review", icon: "🏗️",  text: "Review the architecture and design patterns" },
    { label: "Find bugs",           icon: "🐛", text: "Find logic bugs and edge cases in this code" },
    { label: "Performance issues",  icon: "⚡", text: "Identify performance bottlenecks and optimizations" },
    { label: "Test coverage",       icon: "🧪", text: "What tests are missing? Generate test cases" },
    { label: "Full review",         icon: "✦",  text: "Do a full code review covering security, architecture, performance, and testing" },
];

export const ReviewRequest = ({
    repository,
    projectId,
    onClose,
}: ReviewRequestProps) => {
    const [question,      setQuestion]      = useState("");
    const [reviewSection, setReviewSection] = useState<any | null>(null);
    const [loading,       setLoading]       = useState(false);
    const [error,         setError]         = useState<string>("");

    const handleSubmit = async (q?: string) => {
        const finalQ = (q ?? question).trim();
        if (!finalQ) return;
        try {
            setLoading(true);
            setError("");
            setReviewSection(null);
            const result = await submitMultiAgentReview(finalQ, projectId);
            setReviewSection({ data: result });
        } catch (err: any) {
            setError(err.message ?? "Failed to get AI review. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        // Full-screen overlay
        <div style={{
            position: "fixed", inset: 0, zIndex: 50,
            background: "var(--bg-base)",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
        }}>

            {/* ══ TOP BAR ══════════════════════════════════════════ */}
            <div style={{
                flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: "1px solid var(--border-subtle)",
                padding: "0.75rem 1.5rem",
                background: "var(--bg-secondary)",
                gap: "1rem",
            }}>
                {/* Logo + title */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                    <div style={{
                        display: "flex", height: "2rem", width: "2rem",
                        alignItems: "center", justifyContent: "center",
                        borderRadius: "0.5rem",
                        background: "var(--violet-soft)", color: "var(--violet)",
                        fontSize: "0.9375rem",
                    }}>◈</div>
                    <div>
                        <h1 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1 }}>
                            AI Code Review
                        </h1>
                        <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                            Multi-agent · CodeSentinel
                        </p>
                    </div>
                </div>

                {/* Repo pill */}
                <div style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.3125rem 0.875rem",
                    borderRadius: "9999px",
                    border: "1px solid var(--border)",
                    background: "var(--bg-card)",
                    minWidth: 0, overflow: "hidden",
                }}>
                    <span style={{ fontSize: "0.75rem", flexShrink: 0 }}>📦</span>
                    <span style={{
                        fontSize: "0.8125rem", fontWeight: 500, color: "var(--text-primary)",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                        {repository?.name}
                    </span>
                </div>

                {/* Close */}
                <button
                    type="button"
                    onClick={onClose}
                    style={{
                        flexShrink: 0,
                        display: "flex", height: "2rem", width: "2rem",
                        alignItems: "center", justifyContent: "center",
                        borderRadius: "0.375rem", border: "1px solid var(--border)",
                        background: "none", color: "var(--text-muted)",
                        cursor: "pointer", fontSize: "0.9375rem",
                        transition: "background 150ms, color 150ms",
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.1)";
                        (e.currentTarget as HTMLElement).style.color      = "var(--text-danger)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(239,68,68,0.3)";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background  = "none";
                        (e.currentTarget as HTMLElement).style.color       = "var(--text-muted)";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    }}
                >
                    ✕
                </button>
            </div>

            {/* ══ BODY — two columns ═══════════════════════════════ */}
            <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>

                {/* ── LEFT: AI output ────────────────────────────── */}
                <div style={{
                    flex: 1, minWidth: 0,
                    overflowY: "auto",
                    padding: "2rem 2.5rem",
                    borderRight: "1px solid var(--border-subtle)",
                }}>

                    {/* Placeholder */}
                    {!reviewSection && !loading && !error && (
                        <div style={{
                            height: "100%", minHeight: "300px",
                            display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center",
                            gap: "1rem",
                        }}>
                            <span style={{ fontSize: "3.5rem", opacity: 0.25 }}>◈</span>
                            <p style={{ fontSize: "1rem", color: "var(--text-muted)", textAlign: "center", maxWidth: "320px", lineHeight: 1.6 }}>
                                Select a quick prompt or type a question on the right to start the AI review
                            </p>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="cs-alert-error" style={{ marginBottom: "1.5rem" }}>
                            {error}
                        </div>
                    )}

                    {/* Loading */}
                    {loading && (
                        <div style={{
                            display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center",
                            gap: "1.5rem", minHeight: "300px",
                        }}>
                            <span className="cs-spinner cs-spinner-lg" />
                            <div style={{ textAlign: "center" }}>
                                <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>
                                    Running AI agents…
                                </p>
                                <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                                    Planner → Specialist agents → Synthesizer
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Result */}
                    {reviewSection && !loading && (
                        <div style={{ animation: "fadeInUp 0.35s cubic-bezier(0.16,1,0.3,1) both" }}>
                            <ReviewCode outPut={reviewSection} />
                        </div>
                    )}
                </div>

                {/* ── RIGHT: Controls ────────────────────────────── */}
                <div style={{
                    width: "320px", flexShrink: 0,
                    display: "flex", flexDirection: "column",
                    background: "var(--bg-secondary)",
                    borderLeft: "1px solid var(--border-subtle)",
                }}>

                    {/* Quick prompts */}
                    <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem" }}>
                        <p style={{
                            fontSize: "0.625rem", fontWeight: 600,
                            textTransform: "uppercase", letterSpacing: "0.08em",
                            color: "var(--text-muted)", marginBottom: "0.625rem",
                        }}>
                            Quick prompts
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                            {QUICK_PROMPTS.map(({ label, icon, text }) => (
                                <button
                                    key={label}
                                    type="button"
                                    disabled={loading}
                                    onClick={() => { setQuestion(text); handleSubmit(text); }}
                                    style={{
                                        display: "flex", alignItems: "center", gap: "0.625rem",
                                        padding: "0.5625rem 0.875rem", textAlign: "left",
                                        borderRadius: "0.5rem", border: "1px solid var(--border)",
                                        background: "var(--bg-card)", cursor: "pointer",
                                        color: "var(--text-secondary)", fontSize: "0.8125rem",
                                        transition: "all 120ms", width: "100%",
                                    }}
                                    onMouseEnter={(e) => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.borderColor = "var(--blue)";
                                        el.style.background  = "var(--blue-soft)";
                                        el.style.color       = "var(--text-primary)";
                                    }}
                                    onMouseLeave={(e) => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.borderColor = "var(--border)";
                                        el.style.background  = "var(--bg-card)";
                                        el.style.color       = "var(--text-secondary)";
                                    }}
                                >
                                    <span style={{ fontSize: "1rem", flexShrink: 0, width: "1.25rem", textAlign: "center" }}>
                                        {icon}
                                    </span>
                                    <span>{label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Clear result */}
                        {reviewSection && (
                            <button
                                type="button"
                                onClick={() => { setReviewSection(null); setQuestion(""); setError(""); }}
                                style={{
                                    marginTop: "0.875rem", width: "100%",
                                    padding: "0.5rem", borderRadius: "0.5rem",
                                    border: "1px solid var(--border)", background: "none",
                                    color: "var(--text-muted)", fontSize: "0.8125rem",
                                    cursor: "pointer", transition: "color 150ms, border-color 150ms",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.color       = "var(--text-primary)";
                                    (e.currentTarget as HTMLElement).style.borderColor = "#52525b";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.color       = "var(--text-muted)";
                                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                                }}
                            >
                                ← Clear result
                            </button>
                        )}
                    </div>

                    {/* ── Input bar pinned to bottom ── */}
                    <div style={{
                        flexShrink: 0,
                        padding: "1.25rem",
                        borderTop: "1px solid var(--border-subtle)",
                        background: "var(--bg-base)",
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                            <label htmlFor="review-q" style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-secondary)" }}>
                                Ask the AI
                            </label>
                            <span style={{ fontSize: "0.625rem", color: "var(--text-muted)" }}>
                                {question.length}/500
                            </span>
                        </div>

                        <div
                            style={{
                                borderRadius: "0.5rem",
                                border: "1px solid var(--border)",
                                background: "var(--bg-secondary)",
                                overflow: "hidden",
                                transition: "border-color 150ms",
                            }}
                            onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--blue)")}
                            onBlur={(e)  => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                        >
                            <textarea
                                id="review-q"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                                        e.preventDefault();
                                        handleSubmit();
                                    }
                                }}
                                placeholder="e.g. Find SQL injection vulnerabilities…"
                                rows={3}
                                maxLength={500}
                                disabled={loading}
                                style={{
                                    width: "100%", resize: "none", background: "transparent",
                                    border: "none", padding: "0.625rem 0.875rem",
                                    fontSize: "0.8125rem", color: "var(--text-primary)", outline: "none",
                                }}
                            />
                        </div>

                        <button
                            type="button"
                            disabled={!question.trim() || loading}
                            onClick={() => handleSubmit()}
                            className="cs-btn-primary"
                            style={{ marginTop: "0.625rem", width: "100%", justifyContent: "center" }}
                        >
                            {loading ? "Analyzing…" : "Start AI Review"}
                        </button>

                        <p style={{
                            marginTop: "0.375rem", textAlign: "center",
                            fontSize: "0.625rem", color: "var(--text-muted)",
                        }}>
                            Ctrl+Enter to submit
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
