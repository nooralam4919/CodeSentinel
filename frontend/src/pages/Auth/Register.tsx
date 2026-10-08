import RegisterForm from "../../components/auth/RegisterForm";
import { ShieldLogo } from "../../components/layout/Header";
import { useAuth } from "../../services/auth.service.ts";

const CHECKLIST = [
    "Automated PR security reviews",
    "Real-time vulnerability alerts",
    "GitHub & GitLab integration",
    "Dependency & SAST scanning",
    "Team dashboards & reporting",
];

export default function Register() {
    const { registerUser } = useAuth();

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
                <div aria-hidden="true" className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div aria-hidden="true" className="pointer-events-none absolute"
                    style={{ top: "-10%", right: "-10%", width: "50%", height: "50%", borderRadius: "9999px", background: "rgba(139,124,246,0.06)", filter: "blur(80px)" }} />

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
                    <h2 style={{ fontSize: "1.875rem", fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                        Your code's first<br />line of defense.
                    </h2>
                    <p style={{ marginTop: "1rem", fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                        Join engineers who catch vulnerabilities before they reach production.
                    </p>

                    <ul style={{ marginTop: "1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {CHECKLIST.map((item) => (
                            <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                <span style={{ color: "var(--success)", fontSize: "0.875rem", flexShrink: 0 }}>✓</span>
                                <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{item}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Social proof */}
                    <div
                        style={{
                            marginTop: "2rem", display: "flex", alignItems: "center", gap: "1rem",
                            borderRadius: "0.75rem", border: "1px solid var(--border)",
                            background: "rgba(255,255,255,0.02)", padding: "0.875rem 1rem",
                        }}
                    >
                        <div style={{ display: "flex" }}>
                            {["var(--blue)", "var(--violet)", "var(--success)", "#F2B84B"].map((c, i) => (
                                <span key={i}
                                    style={{
                                        display: "flex", height: "1.75rem", width: "1.75rem", alignItems: "center", justifyContent: "center",
                                        borderRadius: "9999px", border: "2px solid var(--bg-secondary)",
                                        background: c, fontSize: "0.5625rem", fontWeight: 700, color: "white",
                                        marginLeft: i === 0 ? 0 : "-0.625rem",
                                    }}>
                                    {["JD","AS","MK","RL"][i]}
                                </span>
                            ))}
                        </div>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>10,000+</span> developers already securing their code
                        </p>
                    </div>
                </div>

                <div className="relative" style={{ display: "flex", gap: "1.25rem", fontSize: "0.75rem", color: "var(--text-muted)", flexWrap: "wrap" }}>
                    {["SOC 2 Type II", "GDPR Compliant", "End-to-end encrypted"].map((t) => (
                        <span key={t}>{t}</span>
                    ))}
                </div>
            </section>

            {/* ── Right form panel ── */}
            <section style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3.5rem 1.5rem" }}>
                <div className="mb-8 flex w-full max-w-[400px] items-center gap-2.5 lg:hidden">
                    <span style={{ background: "var(--blue)", display: "flex", height: "2rem", width: "2rem", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem", color: "white" }}>
                        <ShieldLogo size={14} />
                    </span>
                    <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>CodeSentinel</span>
                </div>
                <RegisterForm registerFunction={async (name, email, password) => { await registerUser(name, email, password); }} />
            </section>
        </main>
    );
}
