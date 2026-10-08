import { useSelector } from "react-redux";
import { useState } from "react";
import SelectRepository from "../Repository/RepositoryDetails.tsx";

function StatCard({ label, value, icon, color, bg }: {
    label: string; value: string; icon: string; color: string; bg: string;
}) {
    return (
        <div className="cs-card" style={{ padding: "1.5rem", cursor: "default" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <p style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                    {label}
                </p>
                <div style={{ height: "2rem", width: "2rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem", background: bg, fontSize: "0.9375rem" }}>
                    {icon}
                </div>
            </div>
            <p style={{ fontSize: "2.25rem", fontWeight: 700, letterSpacing: "-0.03em", color }}>
                {value}
            </p>
        </div>
    );
}

export default function Dashboard() {
    const user = useSelector((state: any) => state.auth.userData);
    const [showRepo, setShowRepo] = useState(false);

    return (
        <main className="cs-page" style={{ background: "var(--bg-base)", minHeight: "100vh", color: "var(--text-primary)" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

                {/* ── Top bar ── */}
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
                    <div>
                        <h1 style={{ fontSize: "1.625rem", fontWeight: 700, letterSpacing: "-0.025em" }}>
                            Dashboard
                        </h1>
                        <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                            {user?.name ? `Welcome back, ${user.name}` : "Welcome back"}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowRepo(true)}
                        className="cs-btn-primary"
                        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                        <span>+</span>
                        Scan Repository
                    </button>
                </div>

                {/* ── Stats ── */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
                    <StatCard label="Total Scans"     value="—" icon="🔍" color="var(--text-blue)"    bg="var(--blue-soft)"    />
                    <StatCard label="Repositories"    value="—" icon="📦" color="var(--text-violet)"  bg="var(--violet-soft)"  />
                    <StatCard label="Open Findings"   value="—" icon="⚠️"  color="var(--text-warning)" bg="var(--warning-soft)" />
                    <StatCard label="Critical Issues" value="—" icon="🔴" color="var(--text-danger)"  bg="var(--danger-soft)"  />
                </div>

                {/* ── Quick actions ── */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
                    {/* Scan card */}
                    <div className="cs-card" style={{ padding: "1.75rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
                            <div style={{ height: "2.75rem", width: "2.75rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.75rem", background: "var(--blue-soft)", fontSize: "1.25rem", border: "1px solid rgba(37,99,235,0.2)", flexShrink: 0 }}>
                                🔗
                            </div>
                            <div>
                                <h2 style={{ fontSize: "0.9375rem", fontWeight: 600 }}>Start a Scan</h2>
                                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.125rem" }}>Clone, chunk, embed, and index a repo</p>
                            </div>
                        </div>
                        <p style={{ fontSize: "0.8125rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                            Connect any GitHub repository. CodeSentinel scans every file and builds a searchable vector index for AI review.
                        </p>
                        <button onClick={() => setShowRepo(true)} className="cs-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                            Select Repository →
                        </button>
                    </div>

                    {/* AI Review card */}
                    <div className="cs-card" style={{ padding: "1.75rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
                            <div style={{ height: "2.75rem", width: "2.75rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.75rem", background: "var(--violet-soft)", fontSize: "1.25rem", border: "1px solid rgba(139,92,246,0.2)", flexShrink: 0 }}>
                                🤖
                            </div>
                            <div>
                                <h2 style={{ fontSize: "0.9375rem", fontWeight: 600 }}>AI Code Review</h2>
                                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.125rem" }}>6 specialist agents in one query</p>
                            </div>
                        </div>
                        <p style={{ fontSize: "0.8125rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                            Scan a repo first, then ask anything. Security vulnerabilities, architecture issues, missing tests — all covered.
                        </p>
                        <button onClick={() => setShowRepo(true)} className="cs-btn-secondary" style={{ width: "100%", justifyContent: "center", color: "var(--text-violet)", borderColor: "rgba(139,92,246,0.25)", background: "var(--violet-soft)" }}>
                            Start AI Review →
                        </button>
                    </div>
                </div>

                {/* ── Account info ── */}
                {user && (
                    <div className="cs-card" style={{ padding: "1.75rem" }}>
                        <h2 style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                            Account
                        </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
                            {[
                                { label: "Name",            value: user.name,                 icon: "👤" },
                                { label: "Email",           value: user.email,                icon: "✉️" },
                                { label: "Auth Provider",   value: user.provider ?? "LOCAL",  icon: "🔑" },
                                { label: "GitHub Username", value: user.githubUsername ?? "—", icon: "🐙" },
                            ].map(({ label, value, icon }) => (
                                <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                                    <span style={{ fontSize: "1.125rem", marginTop: "0.1rem", flexShrink: 0 }}>{icon}</span>
                                    <div>
                                        <p style={{ fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-muted)" }}>{label}</p>
                                        <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 500 }}>{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Getting started tip ── */}
                <div className="cs-alert-info" style={{ marginTop: "1.5rem", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1rem", flexShrink: 0 }}>💡</span>
                    <p>
                        <strong>Tip:</strong> Click <strong>Scan Repository</strong> above to get started. After scanning completes, you'll be taken straight to the AI review panel where you can ask questions about your code.
                    </p>
                </div>

            </div>

            {showRepo && <SelectRepository onClose={() => setShowRepo(false)} />}
        </main>
    );
}
