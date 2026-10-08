export default function Footer() {
    return (
        <footer
            style={{
                background: "var(--bg-base)",
                borderTop: "1px solid var(--border-subtle)",
            }}
            className="px-6 py-5"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <p style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                    © 2026 CodeSentinel. All rights reserved.
                </p>
                <div className="flex gap-5">
                    {["Privacy", "Terms"].map((t) => (
                        <a
                            key={t}
                            href={`/${t.toLowerCase()}`}
                            style={{
                                color: "var(--text-muted)",
                                fontSize: "0.75rem",
                                transition: "color 150ms",
                            }}
                            onMouseEnter={(e) =>
                                ((e.target as HTMLElement).style.color = "var(--text-secondary)")
                            }
                            onMouseLeave={(e) =>
                                ((e.target as HTMLElement).style.color = "var(--text-muted)")
                            }
                        >
                            {t}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
