import { useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducerSlice";
import SelectRepository from "../../pages/Repository/RepositoryDetails";

export function ShieldLogo({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

const NAV = [
    { name: "Home",     slug: "/"         },
    { name: "Features", slug: "/features" },
    { name: "Docs",     slug: "/docs"     },
];

export default function Header() {
    const [menuOpen,      setMenuOpen]      = useState(false);
    const [showRepoModal, setShowRepoModal] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: any) => state.auth.status);

    const handleLogout = () => { dispatch(logout()); navigate("/login"); };

    return (
        <header
            style={{
                background: "rgba(15,17,21,0.92)",
                borderBottom: "1px solid var(--border-subtle)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                position: "sticky",
                top: 0,
                zIndex: 50,
                width: "100%",
            }}
        >
            <nav className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-5 sm:px-8">

                {/* Logo */}
                <Link to="/" className="flex shrink-0 items-center gap-2.5">
                    <span
                        style={{ background: "var(--blue)" }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                    >
                        <ShieldLogo size={14} />
                    </span>
                    <span
                        style={{ color: "var(--text-primary)", fontSize: "0.9375rem", fontWeight: 600, letterSpacing: "-0.01em" }}
                    >
                        CodeSentinel
                    </span>
                </Link>

                {/* Desktop nav */}
                <ul className="hidden items-center gap-0.5 lg:flex">
                    {NAV.map(({ name, slug }) => (
                        <li key={slug}>
                            <NavLink
                                to={slug}
                                className={({ isActive }) =>
                                    `block rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
                                        isActive
                                            ? "text-[#F1F3F5] bg-white/[0.07]"
                                            : "text-[#737C8C] hover:text-[#A7AFBC] hover:bg-white/[0.04]"
                                    }`
                                }
                            >
                                {name}
                            </NavLink>
                        </li>
                    ))}

                    {isLoggedIn && (
                        <li>
                            <button
                                onClick={() => setShowRepoModal(true)}
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.375rem",
                                    background: "var(--blue)", color: "#fff",
                                    padding: "0.375rem 0.875rem", borderRadius: "0.5rem",
                                    border: "none", cursor: "pointer", fontSize: "0.8125rem",
                                    fontWeight: 600, marginLeft: "0.5rem",
                                    transition: "background-color 150ms, box-shadow 150ms",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--blue-hover)";
                                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(37,99,235,0.35)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--blue)";
                                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                                }}
                                title="Scan a repository"
                            >
                                <span style={{ fontSize: "1rem", lineHeight: 1 }}>+</span>
                                Scan Repo
                            </button>
                        </li>
                    )}
                </ul>

                {/* Desktop right actions */}
                <div className="hidden items-center gap-2 lg:flex">
                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="rounded-md px-3.5 py-1.5 text-sm font-medium transition"
                                style={{ color: "var(--text-secondary)" }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="cs-btn-secondary text-sm"
                                style={{ padding: "0.375rem 0.875rem" }}
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="rounded-md px-3.5 py-1.5 text-sm font-medium transition"
                                style={{ color: "var(--text-secondary)" }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
                            >
                                Sign In
                            </Link>
                            <Link to="/register" className="cs-btn-primary text-sm" style={{ padding: "0.375rem 0.875rem", textDecoration: "none" }}>
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    className="flex h-9 w-9 items-center justify-center rounded-lg lg:hidden transition"
                    style={{ color: "var(--text-muted)" }}
                >
                    {menuOpen ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div
                    style={{ background: "var(--bg-base)", borderTop: "1px solid var(--border-subtle)" }}
                    className="px-5 pb-5 pt-3 lg:hidden"
                >
                    <ul className="mb-4 space-y-0.5">
                        {NAV.map(({ name, slug }) => (
                            <li key={slug}>
                                <NavLink
                                    to={slug}
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block rounded-md px-3.5 py-2.5 text-sm font-medium transition ${
                                            isActive
                                                ? "text-[#F1F3F5] bg-white/[0.07]"
                                                : "text-[#737C8C] hover:text-[#A7AFBC] hover:bg-white/[0.04]"
                                        }`
                                    }
                                >
                                    {name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {isLoggedIn && (
                        <button
                            onClick={() => { setMenuOpen(false); setShowRepoModal(true); }}
                            className="cs-btn-primary mb-3 w-full justify-center"
                        >
                            + Select Repository
                        </button>
                    )}

                    <div style={{ borderTop: "1px solid var(--border-subtle)" }} className="flex flex-col gap-2 pt-4">
                        {isLoggedIn ? (
                            <>
                                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="cs-btn-secondary w-full justify-center" style={{ textDecoration: "none" }}>
                                    Dashboard
                                </Link>
                                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="cs-btn-secondary w-full justify-center">
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setMenuOpen(false)} className="cs-btn-secondary w-full justify-center" style={{ textDecoration: "none" }}>
                                    Sign In
                                </Link>
                                <Link to="/register" onClick={() => setMenuOpen(false)} className="cs-btn-primary w-full justify-center" style={{ textDecoration: "none" }}>
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Select Repository modal — rendered in document.body via portal so it isn't clipped by the sticky header */}
            {showRepoModal && createPortal(
                <SelectRepository onClose={() => setShowRepoModal(false)} />,
                document.body
            )}
        </header>
    );
}
