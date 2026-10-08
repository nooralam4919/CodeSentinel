import useGithub from "../../services/github.service";
import { ShieldLogo } from "../../components/layout/Header";

const BENEFITS = [
    { icon: "🔒", text: "Read-only access — we never modify your code" },
    { icon: "⚡", text: "Scan any public or private repository" },
    { icon: "🤖", text: "Full AI multi-agent review after scanning" },
    { icon: "🗑️", text: "Cloned files deleted immediately after indexing" },
];

export default function ConnectGithub() {
    const { gitlogin } = useGithub();

    return (
        <main className="cs-page" style={{
            background: "var(--bg-base)", minHeight: "100vh",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "2rem 1rem",
        }}>
            {/* Background */}
            <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "50%", height: "50%", borderRadius: "9999px", background: "rgba(37,99,235,0.05)", filter: "blur(100px)" }} />
            </div>

            <div style={{ width: "100%", maxWidth: "420px", position: "relative" }}>

                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem", justifyContent: "center" }}>
                    <div style={{ height: "2.5rem", width: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.625rem", background: "var(--blue)", color: "white" }}>
                        <ShieldLogo size={18} />
                    </div>
                    <span style={{ fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.01em" }}>CodeSentinel</span>
                </div>

                {/* Card */}
                <div className="cs-card animate-slide-up" style={{ padding: "2.25rem" }}>
                    {/* GitHub icon */}
                    <div style={{
                        width: "4rem", height: "4rem", borderRadius: "1rem",
                        border: "1px solid var(--border)", background: "var(--bg-elevated)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 1.5rem", color: "var(--text-primary)",
                    }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.01c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18A10.9 10.9 0 0 1 12 6.08c.97 0 1.94.13 2.85.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.35.78 1.04.78 2.1v3.12c0 .3.21.65.79.54A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                        </svg>
                    </div>

                    <h1 style={{ fontSize: "1.375rem", fontWeight: 700, letterSpacing: "-0.02em", textAlign: "center", marginBottom: "0.5rem" }}>
                        Connect GitHub
                    </h1>
                    <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--text-secondary)", textAlign: "center", marginBottom: "1.75rem" }}>
                        Authorize CodeSentinel to read your repositories for AI-powered security analysis.
                    </p>

                    {/* Benefits */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.75rem", padding: "1rem", borderRadius: "0.625rem", background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                        {BENEFITS.map(({ icon, text }) => (
                            <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                <span style={{ fontSize: "0.9375rem", flexShrink: 0 }}>{icon}</span>
                                <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{text}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <button
                        onClick={gitlogin}
                        className="cs-btn-primary w-full justify-center"
                        style={{ width: "100%", padding: "0.8125rem", fontSize: "0.9375rem", gap: "0.75rem" }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.01c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18A10.9 10.9 0 0 1 12 6.08c.97 0 1.94.13 2.85.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.35.78 1.04.78 2.1v3.12c0 .3.21.65.79.54A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                        </svg>
                        Continue with GitHub
                    </button>

                    <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        By connecting you agree to our Terms of Service.
                    </p>
                </div>
            </div>
        </main>
    );
}
