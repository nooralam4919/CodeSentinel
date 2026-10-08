import React from "react";

// Zero-dependency markdown renderer — no external package needed.
// Handles: headings, bold, inline code, code blocks, lists, hr, blockquote, paragraphs.

function MarkdownContent({ content }: { content: string }) {
    const lines = content.split("\n");
    const nodes: React.ReactNode[] = [];
    let i = 0;

    // Inline: bold (**text**) and code (`text`)
    function renderInline(text: string): React.ReactNode[] {
        const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
        return parts.map((p, idx) => {
            if (p.startsWith("**") && p.endsWith("**"))
                return <strong key={idx} style={{ fontWeight: 600, color: "var(--text-primary)" }}>{p.slice(2,-2)}</strong>;
            if (p.startsWith("`") && p.endsWith("`"))
                return <code key={idx} style={{ fontFamily: "monospace", fontSize: "0.75rem", background: "var(--bg-elevated)", color: "var(--text-blue)", padding: "0.125rem 0.375rem", borderRadius: "0.25rem", border: "1px solid var(--border)" }}>{p.slice(1,-1)}</code>;
            return p;
        });
    }

    while (i < lines.length) {
        const line = lines[i];

        // Code block
        if (line.startsWith("```")) {
            const codeLines: string[] = [];
            i++;
            while (i < lines.length && !lines[i].startsWith("```")) {
                codeLines.push(lines[i]);
                i++;
            }
            nodes.push(
                <pre key={nodes.length} style={{ background: "var(--bg-base)", border: "1px solid var(--border)", borderRadius: "0.5rem", margin: "0.75rem 0", overflow: "hidden" }}>
                    <code style={{ display: "block", fontFamily: "monospace", fontSize: "0.75rem", lineHeight: 1.7, color: "var(--text-primary)", padding: "1rem", overflowX: "auto", whiteSpace: "pre" }}>
                        {codeLines.join("\n")}
                    </code>
                </pre>
            );
            i++;
            continue;
        }

        // Headings
        if (line.startsWith("### "))  { nodes.push(<h3 key={nodes.length} style={{ fontSize: "0.875rem",   fontWeight: 600, color: "var(--text-primary)", margin: "1rem 0 0.25rem" }}>{renderInline(line.slice(4))}</h3>); i++; continue; }
        if (line.startsWith("## "))   { nodes.push(<h2 key={nodes.length} style={{ fontSize: "0.9375rem",  fontWeight: 700, color: "var(--text-primary)", margin: "1.25rem 0 0.375rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.25rem" }}>{renderInline(line.slice(3))}</h2>); i++; continue; }
        if (line.startsWith("# "))    { nodes.push(<h1 key={nodes.length} style={{ fontSize: "1rem",       fontWeight: 700, color: "var(--text-primary)", margin: "1.5rem 0 0.5rem" }}>{renderInline(line.slice(2))}</h1>); i++; continue; }

        // HR
        if (/^---+$/.test(line.trim())) { nodes.push(<hr key={nodes.length} style={{ border: "none", borderTop: "1px solid var(--border-subtle)", margin: "1rem 0" }} />); i++; continue; }

        // Blockquote
        if (line.startsWith("> ")) { nodes.push(<blockquote key={nodes.length} style={{ borderLeft: "3px solid var(--blue)", paddingLeft: "0.875rem", margin: "0.5rem 0", color: "var(--text-secondary)", fontStyle: "italic", fontSize: "0.8125rem" }}>{renderInline(line.slice(2))}</blockquote>); i++; continue; }

        // List item
        if (/^[-*] /.test(line) || /^\d+\. /.test(line)) {
            const items: string[] = [];
            const ordered = /^\d+\. /.test(line);
            while (i < lines.length && (/^[-*] /.test(lines[i]) || /^\d+\. /.test(lines[i]))) {
                items.push(lines[i].replace(/^[-*] /, "").replace(/^\d+\. /, ""));
                i++;
            }
            const Tag = ordered ? "ol" : "ul";
            nodes.push(
                <Tag key={nodes.length} style={{ paddingLeft: "1.25rem", margin: "0.375rem 0", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                    {items.map((it, idx) => (
                        <li key={idx} style={{ fontSize: "0.8125rem", lineHeight: 1.7, color: "var(--text-reading)" }}>{renderInline(it)}</li>
                    ))}
                </Tag>
            );
            continue;
        }

        // Empty line
        if (line.trim() === "") { i++; continue; }

        // Paragraph
        nodes.push(<p key={nodes.length} style={{ fontSize: "0.8125rem", lineHeight: 1.8, color: "var(--text-reading)", margin: "0.375rem 0" }}>{renderInline(line)}</p>);
        i++;
    }

    return <div>{nodes}</div>;
}

// ── Severity colour map ───────────────────────────────────────────
const SEVERITY_COLOR: Record<string, string> = {
    CRITICAL: "var(--danger)",
    HIGH:     "#f97316",          // orange-500
    MEDIUM:   "var(--warning)",
    LOW:      "var(--blue)",
    INFO:     "var(--text-muted)",
    CLEAN:    "var(--success)",
};

const SEVERITY_BG: Record<string, string> = {
    CRITICAL: "rgba(239,68,68,0.12)",
    HIGH:     "rgba(249,115,22,0.12)",
    MEDIUM:   "rgba(245,158,11,0.12)",
    LOW:      "rgba(37,99,235,0.12)",
    INFO:     "rgba(113,113,122,0.1)",
    CLEAN:    "rgba(16,185,129,0.12)",
};

// ── Agent badge colours ───────────────────────────────────────────
const AGENT_COLOR: Record<string, string> = {
    SecurityAgent:     "var(--danger)",
    ArchitectureAgent: "var(--blue)",
    LogicAgent:        "var(--violet)",
    PerformanceAgent:  "var(--warning)",
    TestingAgent:      "var(--success)",
    SynthesizerAgent:  "var(--text-secondary)",
};

function agentLabel(name: string) {
    return name.replace("Agent", "");
}

// ── Main component ────────────────────────────────────────────────
interface ReviewCodeProps {
    outPut: any;
}

export default function ReviewCode({ outPut }: ReviewCodeProps) {
    // outPut is the full API response — unwrap the data layer
    const data       = outPut?.data ?? outPut;
    const answer     = data?.answer ?? data?.response ?? "";
    const agentsUsed = data?.agentsUsed  as string[] | undefined;
    const severity   = data?.severity    as Record<string, any> | undefined;
    const mode       = data?.plannerMode as string | undefined;
    const reason     = data?.plannerReason as string | undefined;

    if (!answer) {
        return (
            <div style={{
                borderRadius: "0.75rem", border: "1px solid var(--border)",
                background: "var(--bg-card)", padding: "2rem",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem",
            }}>
                <span style={{ fontSize: "1.5rem", color: "var(--text-muted)" }}>◈</span>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>Waiting for AI review…</p>
            </div>
        );
    }

    const overallSeverity = severity?.overall ?? "INFO";

    return (
        <div style={{
            borderRadius: "0.75rem", border: "1px solid var(--border)",
            background: "var(--bg-card)", overflow: "hidden",
        }}>
            {/* ── Header ── */}
            <div style={{
                padding: "0.875rem 1.125rem",
                borderBottom: "1px solid var(--border-subtle)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: "0.625rem",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    <span style={{ color: "var(--violet)", fontSize: "1rem" }}>◈</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
                        AI Code Review
                    </span>
                </div>

                {/* Overall severity badge */}
                {severity && (
                    <span style={{
                        fontSize: "0.6875rem", fontWeight: 600,
                        padding: "0.1875rem 0.625rem", borderRadius: "9999px",
                        background: SEVERITY_BG[overallSeverity] ?? "transparent",
                        color: SEVERITY_COLOR[overallSeverity] ?? "var(--text-muted)",
                        border: `1px solid ${SEVERITY_COLOR[overallSeverity] ?? "var(--border)"}40`,
                    }}>
                        {overallSeverity}
                    </span>
                )}
            </div>

            {/* ── Agent badges ── */}
            {agentsUsed && agentsUsed.length > 0 && (
                <div style={{
                    padding: "0.625rem 1.125rem",
                    borderBottom: "1px solid var(--border-subtle)",
                    display: "flex", flexWrap: "wrap", gap: "0.375rem", alignItems: "center",
                }}>
                    <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginRight: "0.25rem" }}>
                        Agents:
                    </span>
                    {agentsUsed.map((agent) => (
                        <span key={agent} style={{
                            fontSize: "0.625rem", fontWeight: 500,
                            padding: "0.125rem 0.5rem", borderRadius: "0.25rem",
                            background: "var(--bg-elevated)",
                            color: AGENT_COLOR[agent] ?? "var(--text-secondary)",
                            border: "1px solid var(--border)",
                        }}>
                            {agentLabel(agent)}
                        </span>
                    ))}
                    {mode && (
                        <span style={{
                            marginLeft: "auto", fontSize: "0.625rem",
                            color: "var(--text-muted)",
                            fontStyle: "italic",
                        }}>
                            {mode} mode
                        </span>
                    )}
                </div>
            )}

            {/* ── Severity counts ── */}
            {severity && (severity.critical > 0 || severity.high > 0 || severity.medium > 0 || severity.low > 0) && (
                <div style={{
                    padding: "0.625rem 1.125rem",
                    borderBottom: "1px solid var(--border-subtle)",
                    display: "flex", gap: "1rem",
                }}>
                    {[
                        { key: "critical", label: "Critical", color: SEVERITY_COLOR.CRITICAL },
                        { key: "high",     label: "High",     color: SEVERITY_COLOR.HIGH     },
                        { key: "medium",   label: "Medium",   color: SEVERITY_COLOR.MEDIUM   },
                        { key: "low",      label: "Low",      color: SEVERITY_COLOR.LOW      },
                    ].filter(({ key }) => severity[key] > 0).map(({ key, label, color }) => (
                        <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                            <span style={{ fontSize: "0.875rem", fontWeight: 700, color }}>{severity[key]}</span>
                            <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>{label}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Answer ── */}
            <div style={{ padding: "1.5rem" }}>
                <MarkdownContent content={answer} />
            </div>

            {/* ── Footer ── */}
            {reason && (
                <div style={{
                    padding: "0.5rem 1.125rem",
                    borderTop: "1px solid var(--border-subtle)",
                    fontSize: "0.625rem", color: "var(--text-muted)",
                    fontStyle: "italic",
                }}>
                    {reason}
                </div>
            )}
        </div>
    );
}
