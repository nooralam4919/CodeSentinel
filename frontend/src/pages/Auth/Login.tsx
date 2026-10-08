import LoginForm from "../../components/auth/LoginForm";
import { ShieldLogo } from "../../components/layout/Header";
import { useAuth } from "../../services/auth.service";

export default function Login() {
    const { loginUser } = useAuth();

    return (
        <main
            className="cs-page"
            style={{ background: "var(--bg-base)", minHeight: "100vh", display: "flex", width: "100%" }}
        >
            {/* ── Left brand panel ── */}
            <section
                className="relative hidden lg:flex lg:flex-col lg:justify-between lg:p-14"
                style={{
                    width: "52%",
                    flexShrink: 0,
                    background: "var(--bg-secondary)",
                    borderRight: "1px solid var(--border-subtle)",
                    overflow: "hidden",
                }}
            >
                {/* Subtle dot grid */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                {/* Soft glow — not aggressive */}
                <div aria-hidden="true" className="pointer-events-none absolute"
                    style={{ top: "-10%", left: "-15%", width: "55%", height: "55%", borderRadius: "9999px", background: "rgba(79,140,255,0.06)", filter: "blur(80px)" }} />

                {/* Logo */}
                <div className="relative flex items-center gap-2.5">
                    <span style={{ background: "var(--blue)", display: "flex", height: "2.25rem", width: "2.25rem", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem", color: "white" }}>
                        <ShieldLogo size={16} />
                    </span>
                    <span style={{ fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
                        CodeSentinel
                    </span>
                </div>

                {/* Main copy */}
                <div className="relative" style={{ maxWidth: "420px" }}>
                    <div
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "0.5rem",
                            background: "var(--blue-soft)", border: "1px solid rgba(79,140,255,0.2)",
                            borderRadius: "9999px", padding: "0.25rem 0.75rem",
                            fontSize: "0.75rem", fontWeight: 500, color: "var(--blue)",
                            marginBottom: "1.25rem",
                        }}
                    >
                        <span style={{ width: "0.375rem", height: "0.375rem", borderRadius: "9999px", background: "var(--blue)" }} />
                        Trusted by 10,000+ developers
                    </div>

                    <h2 style={{ fontSize: "1.875rem", fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                        Ship secure code<br />with confidence.
                    </h2>
                    <p style={{ marginTop: "1rem", fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                        Continuous code analysis, dependency scanning, and vulnerability management — built for engineering teams that move fast.
                    </p>

                    {/* Terminal */}
                    <div
                        style={{
                            marginTop: "2rem", overflow: "hidden", borderRadius: "0.625rem",
                            border: "1px solid var(--border)", background: "var(--bg-card)",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", borderBottom: "1px solid var(--border-subtle)", padding: "0.625rem 1rem" }}>
                            {["#EF6461", "#F2B84B", "#4FB286"].map((c) => (
                                <span key={c} style={{ width: "0.625rem", height: "0.625rem", borderRadius: "9999px", background: c, opacity: 0.7 }} />
                            ))}
                            <span style={{ marginLeft: "0.75rem", fontSize: "0.6875rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
                                codesentinel — scan.log
                            </span>
                        </div>
                        <div style={{ padding: "1rem", fontFamily: "monospace", fontSize: "0.75rem", lineHeight: 1.8 }}>
                            <p style={{ color: "var(--text-muted)" }}>$ codesentinel scan --repo my-app</p>
                            {[
                                ["var(--success)", "✓", "Repository cloned"],
                                ["var(--success)", "✓", "1,247 files detected"],
                                ["var(--success)", "✓", "Dependencies analyzed"],
                                ["var(--blue)",    "●", "Running security checks…"],
                            ].map(([color, sym, text]) => (
                                <p key={text}>
                                    <span style={{ color }}>{sym}</span>{" "}
                                    <span style={{ color: "var(--text-secondary)" }}>{text}</span>
                                </p>
                            ))}
                            <div style={{ marginTop: "0.75rem", display: "flex", justifyContent: "space-between", borderRadius: "0.375rem", border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,0.02)", padding: "0.5rem 0.75rem" }}>
                                <span style={{ color: "var(--text-muted)" }}>Security score</span>
                                <span style={{ fontWeight: 600, color: "var(--success)" }}>86 / 100</span>
                            </div>
                        </div>
                    </div>
                </div>

                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }} className="relative">
                    SOC 2 Type II · GDPR Compliant · End-to-end encrypted
                </p>
            </section>

            {/* ── Right form panel ── */}
            <section
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3.5rem 1.5rem" }}
            >
                {/* Mobile logo */}
                <div className="mb-8 flex w-full max-w-[400px] items-center gap-2.5 lg:hidden">
                    <span style={{ background: "var(--blue)", display: "flex", height: "2rem", width: "2rem", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem", color: "white" }}>
                        <ShieldLogo size={14} />
                    </span>
                    <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>CodeSentinel</span>
                </div>
                <LoginForm loginFunction={async (email, password) => { await loginUser(email, password); }} />
            </section>
        </main>
    );
}
