import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

/* ── Shield logo — reused across auth pages and header ── */
export function ShieldLogo({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

const navLinks = [
    { to: "/",          label: "Home" },
    { to: "/features",  label: "Features" },
    { to: "/pricing",   label: "Pricing" },
    { to: "/docs",      label: "Docs" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#0a0d17]/90 backdrop-blur-md">
            <nav className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">

                {/* ── Logo ── */}
                <Link to="/" className="flex shrink-0 items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/30">
                        <ShieldLogo size={16} />
                    </span>
                    <span className="text-[15px] font-semibold tracking-tight text-white">
                        CodeSentinel
                    </span>
                    {/* Beta badge */}
                    <span className="hidden rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-indigo-400 sm:inline-flex">
                        Beta
                    </span>
                </Link>

                {/* ── Desktop nav ── */}
                <ul className="hidden items-center gap-0.5 lg:flex">
                    {navLinks.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                                        isActive
                                            ? "bg-white/[0.07] text-white"
                                            : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* ── Desktop CTA ── */}
                <div className="hidden items-center gap-2 lg:flex">
                    {/* GitHub star CTA */}
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:border-white/20 hover:text-white"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                        </svg>
                        Star on GitHub
                    </a>

                    <div className="mx-1 h-4 w-px bg-white/10" />

                    <Link
                        to="/login"
                        className="rounded-md px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
                    >
                        Sign in
                    </Link>
                    <Link
                        to="/register"
                        className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 active:scale-[0.98]"
                    >
                        Get Started Free
                    </Link>
                </div>

                {/* ── Mobile hamburger ── */}
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/[0.06] hover:text-white lg:hidden"
                >
                    {menuOpen ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </nav>

            {/* ── Mobile menu drawer ── */}
            {menuOpen && (
                <div className="border-t border-white/[0.06] bg-[#0a0d17] px-6 pb-6 pt-4 lg:hidden">
                    <ul className="mb-5 space-y-0.5">
                        {navLinks.map(({ to, label }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block rounded-md px-3.5 py-2.5 text-sm font-medium transition ${
                                            isActive
                                                ? "bg-white/[0.07] text-white"
                                                : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                                        }`
                                    }
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col gap-2.5 border-t border-white/[0.06] pt-5">
                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                            className="rounded-lg border border-white/10 py-2.5 text-center text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/register"
                            onClick={() => setMenuOpen(false)}
                            className="rounded-lg bg-indigo-500 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-indigo-400"
                        >
                            Get Started Free
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
