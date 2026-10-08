import { useEffect, useState, useMemo } from "react";
import { useRepository } from "../../services/useRepository.service.ts";
import { GithubReository } from "../../services/repository.service.ts";
import { ReviewRequest } from "../Reviews/ReviewRequest.tsx";

interface SelectRepositoryProps {
    onClose: () => void;
}

function GithubIcon({ size = 18 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.01c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18A10.9 10.9 0 0 1 12 6.08c.97 0 1.94.13 2.85.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.35.78 1.04.78 2.1v3.12c0 .3.21.65.79.54A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
    );
}

const LANG_COLOR: Record<string, string> = {
    TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
    Java: "#b07219", Go: "#00ADD8", Rust: "#dea584", "C++": "#f34b7d",
    C: "#888", Ruby: "#701516", PHP: "#4F5D95", Swift: "#F05138",
    Kotlin: "#A97BFF", HTML: "#e34c26", CSS: "#563d7c",
    Shell: "#89e051", Dockerfile: "#384d54",
};

export default function SelectRepository({ onClose }: SelectRepositoryProps) {
    const { repositories, loading, error, getRepositories } = useRepository();
    const { getRepValue } = GithubReository();

    const [selectedRepo,  setSelectedRepo]  = useState<any | null>(null);
    const [uploading,     setUploading]     = useState(false);
    const [uploadError,   setUploadError]   = useState("");
    const [reviewSection, setReviewSection] = useState(false);
    const [projectId,     setProjectId]     = useState<string>("");
    const [search,        setSearch]        = useState("");

    useEffect(() => { getRepositories(); }, []);

    const filtered = useMemo(() =>
        repositories.filter((r) =>
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            (r.description ?? "").toLowerCase().includes(search.toLowerCase())
        ), [repositories, search]
    );

    const sendRepoToBackend = async (repo: any) => {
        try {
            setUploading(true);
            setUploadError("");
            const result = await getRepValue(repo.clone_url);
            // Store projectId so the AI review queries only this repo's chunks
            if (result?.data?.projectId) {
                setProjectId(result.data.projectId);
            }
            setReviewSection(true);
        } catch (err: any) {
            setUploadError(err.message || "Failed to process repository. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    if (reviewSection && selectedRepo) {
        return <ReviewRequest repository={selectedRepo} projectId={projectId} onClose={onClose} />;
    }

    return (
        /* ── Overlay ── */
        <div
            onClick={onClose}
            style={{
                position: "fixed", inset: 0, zIndex: 50,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(0,0,0,0.72)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                padding: "1rem",
            }}
        >
            {/* ── Modal ── */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: "100%", maxWidth: "640px", maxHeight: "88vh",
                    display: "flex", flexDirection: "column",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.875rem",
                    boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
                    overflow: "hidden",
                }}
            >
                {/* ── Header ── */}
                <div style={{
                    flexShrink: 0, display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.125rem 1.5rem",
                    borderBottom: "1px solid var(--border-subtle)",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                        <div style={{
                            display: "flex", height: "2.25rem", width: "2.25rem",
                            alignItems: "center", justifyContent: "center",
                            borderRadius: "0.5rem",
                            background: "var(--bg-elevated)",
                            border: "1px solid var(--border)",
                            color: "var(--text-secondary)",
                        }}>
                            <GithubIcon size={16} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>
                                Select Repository
                            </h2>
                            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.125rem" }}>
                                Choose a GitHub repository to scan
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        disabled={uploading}
                        style={{
                            display: "flex", height: "2rem", width: "2rem",
                            alignItems: "center", justifyContent: "center",
                            borderRadius: "0.375rem", border: "1px solid var(--border)",
                            background: "none", color: "var(--text-muted)",
                            cursor: "pointer", transition: "color 150ms",
                            fontSize: "0.875rem",
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* ── Search ── */}
                <div style={{
                    flexShrink: 0, padding: "0.75rem 1.5rem",
                    borderBottom: "1px solid var(--border-subtle)",
                }}>
                    <div style={{ position: "relative" }}>
                        <svg
                            style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}
                            width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                        </svg>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search repositories…"
                            style={{
                                width: "100%", background: "var(--bg-elevated)",
                                border: "1px solid var(--border)", borderRadius: "0.5rem",
                                padding: "0.5rem 0.875rem 0.5rem 2.25rem",
                                fontSize: "0.875rem", color: "var(--text-primary)", outline: "none",
                                transition: "border-color 150ms",
                            }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--blue)")}
                            onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border)")}
                        />
                    </div>
                </div>

                {/* ── List ── */}
                <div style={{ flex: 1, overflowY: "auto", padding: "0.875rem 1rem" }}>

                    {/* Loading */}
                    {loading && (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4rem 0", gap: "0.875rem" }}>
                            <span className="cs-spinner" />
                            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>Loading repositories…</p>
                        </div>
                    )}

                    {/* Error */}
                    {error && !loading && (
                        <div className="cs-alert-error">
                            <strong>Failed to load repositories</strong>
                            <p style={{ marginTop: "0.25rem", fontSize: "0.75rem", opacity: 0.8 }}>{error}</p>
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && !error && filtered.length === 0 && (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4rem 0", textAlign: "center" }}>
                            <div style={{
                                display: "flex", height: "3.5rem", width: "3.5rem",
                                alignItems: "center", justifyContent: "center",
                                borderRadius: "9999px", border: "1px solid var(--border)",
                                background: "var(--bg-elevated)", color: "var(--text-muted)",
                                marginBottom: "1rem",
                            }}>
                                <GithubIcon size={22} />
                            </div>
                            <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-secondary)" }}>
                                {search ? "No repositories match your search" : "No repositories found"}
                            </p>
                            <p style={{ marginTop: "0.375rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                {search ? "Try a different keyword" : "Connect your GitHub account first"}
                            </p>
                        </div>
                    )}

                    {/* Cards */}
                    {!loading && !error && filtered.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {filtered.map((repo) => {
                                const isSelected = selectedRepo?.id === repo.id;
                                const langColor  = repo.language ? (LANG_COLOR[repo.language] ?? "#6366f1") : null;

                                return (
                                    <button
                                        key={repo.id}
                                        type="button"
                                        onClick={() => setSelectedRepo(repo)}
                                        style={{
                                            width: "100%", textAlign: "left", cursor: "pointer",
                                            padding: "0.875rem 1rem", borderRadius: "0.625rem",
                                            border: `1px solid ${isSelected ? "var(--blue)" : "var(--border)"}`,
                                            background: isSelected ? "var(--blue-soft)" : "var(--bg-elevated)",
                                            transition: "border-color 150ms, background 150ms",
                                            display: "flex", alignItems: "center", gap: "0.875rem",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isSelected) {
                                                (e.currentTarget as HTMLElement).style.borderColor = "rgba(79,140,255,0.4)";
                                                (e.currentTarget as HTMLElement).style.background   = "var(--bg-card)";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isSelected) {
                                                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                                                (e.currentTarget as HTMLElement).style.background   = "var(--bg-elevated)";
                                            }
                                        }}
                                    >
                                        {/* GitHub icon */}
                                        <div style={{
                                            flexShrink: 0, display: "flex", height: "2.25rem", width: "2.25rem",
                                            alignItems: "center", justifyContent: "center", borderRadius: "0.5rem",
                                            background: isSelected ? "var(--blue-soft)" : "var(--bg-card)",
                                            color: isSelected ? "var(--blue)" : "var(--text-muted)",
                                            border: "1px solid var(--border)",
                                        }}>
                                            <GithubIcon size={15} />
                                        </div>

                                        {/* Info */}
                                        <div style={{ minWidth: 0, flex: 1 }}>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                                                <span style={{
                                                    fontSize: "0.875rem", fontWeight: 600,
                                                    color: isSelected ? "var(--blue)" : "var(--text-primary)",
                                                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                                }}>
                                                    {repo.name}
                                                </span>
                                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                                                    <span style={{
                                                        fontSize: "0.6875rem", padding: "0.125rem 0.5rem",
                                                        borderRadius: "9999px", border: "1px solid var(--border)",
                                                        color: "var(--text-muted)",
                                                    }}>
                                                        {repo.private ? "Private" : "Public"}
                                                    </span>
                                                    {isSelected && (
                                                        <span style={{
                                                            display: "flex", height: "1.25rem", width: "1.25rem",
                                                            alignItems: "center", justifyContent: "center",
                                                            borderRadius: "9999px", background: "var(--blue)",
                                                            fontSize: "0.625rem", color: "#fff", fontWeight: 700,
                                                        }}>✓</span>
                                                    )}
                                                </div>
                                            </div>

                                            {repo.description && (
                                                <p style={{
                                                    marginTop: "0.25rem", fontSize: "0.75rem", color: "var(--text-muted)",
                                                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                                }}>
                                                    {repo.description}
                                                </p>
                                            )}

                                            {/* Meta */}
                                            <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.6875rem", color: "var(--text-muted)" }}>
                                                {langColor && (
                                                    <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                                                        <span style={{ width: "0.5rem", height: "0.5rem", borderRadius: "9999px", background: langColor, flexShrink: 0 }} />
                                                        {repo.language}
                                                    </span>
                                                )}
                                                {typeof repo.stargazers_count === "number" && (
                                                    <span>★ {repo.stargazers_count.toLocaleString()}</span>
                                                )}
                                                {typeof repo.forks_count === "number" && (
                                                    <span>⑂ {repo.forks_count.toLocaleString()}</span>
                                                )}
                                                {repo.default_branch && (
                                                    <span>⎇ {repo.default_branch}</span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* ── Footer ── */}
                <div style={{
                    flexShrink: 0, borderTop: "1px solid var(--border-subtle)",
                    padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem",
                }}>
                    {/* Error banner */}
                    {uploadError && (
                        <div className="cs-alert-error" style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                            <span style={{ flexShrink: 0 }}>⚠</span>
                            <span>{uploadError}</span>
                        </div>
                    )}

                    {/* Scan progress */}
                    {uploading && (
                        <div className="cs-alert-info" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <span className="cs-spinner" style={{ width: "1rem", height: "1rem", flexShrink: 0 }} />
                            <div>
                                <p style={{ fontWeight: 500, fontSize: "0.8125rem" }}>Scanning repository…</p>
                                <p style={{ fontSize: "0.6875rem", opacity: 0.75, marginTop: "0.125rem" }}>
                                    Cloning, chunking and embedding — this takes 30–60 seconds
                                </p>
                            </div>
                        </div>
                    )}

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            {loading ? "Loading…" : `${filtered.length} of ${repositories.length} repositories`}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={uploading}
                                className="cs-btn-secondary"
                                style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                disabled={!selectedRepo || uploading}
                                onClick={() => selectedRepo && sendRepoToBackend(selectedRepo)}
                                className="cs-btn-primary"
                                style={{ padding: "0.5rem 1.125rem", fontSize: "0.875rem" }}
                            >
                                {uploading
                                    ? "Scanning…"
                                    : selectedRepo
                                    ? `Scan "${selectedRepo.name}"`
                                    : "Select a repository"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
