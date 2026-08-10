import { Link } from "react-router-dom";
import { ShieldLogo } from "./Header";

const footerLinks = {
    Product: [
        { label: "Features",   to: "/features" },
        { label: "Pricing",    to: "/pricing" },
        { label: "Changelog",  to: "/changelog" },
        { label: "Roadmap",    to: "/roadmap" },
        { label: "Security",   to: "/security" },
    ],
    Developers: [
        { label: "Documentation", to: "/docs" },
        { label: "API Reference", to: "/docs/api" },
        { label: "GitHub",        to: "https://github.com" },
        { label: "Status",        to: "/status" },
    ],
    Company: [
        { label: "About",   to: "/about" },
        { label: "Blog",    to: "/blog" },
        { label: "Careers", to: "/careers" },
        { label: "Contact", to: "/contact" },
    ],
    Legal: [
        { label: "Privacy Policy",   to: "/privacy" },
        { label: "Terms of Service", to: "/terms" },
        { label: "Cookie Policy",    to: "/cookies" },
    ],
};

const socials = [
    {
        label: "GitHub",
        href: "https://github.com",
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
        ),
    },
    {
        label: "Twitter",
        href: "https://twitter.com",
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com",
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/[0.06] bg-[#0a0d17]">

            {/* ── Main grid ── */}
            <div className="mx-auto max-w-screen-xl px-6 py-16">
                <div className="grid grid-cols-2 gap-10 md:grid-cols-6 lg:gap-12">

                    {/* ── Brand column ── */}
                    <div className="col-span-2">
                        <Link to="/" className="inline-flex items-center gap-2.5">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/30">
                                <ShieldLogo size={16} />
                            </span>
                            <span className="text-[15px] font-semibold tracking-tight text-white">
                                CodeSentinel
                            </span>
                        </Link>

                        <p className="mt-4 max-w-[240px] text-sm leading-relaxed text-slate-500">
                            Automated security scanning and vulnerability management
                            for engineering teams that ship fast.
                        </p>

                        {/* Trust badges */}
                        <div className="mt-5 flex flex-wrap gap-2">
                            {["SOC 2", "GDPR", "ISO 27001"].map((badge) => (
                                <span key={badge}
                                    className="rounded-md border border-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                                    {badge}
                                </span>
                            ))}
                        </div>

                        {/* Social icons */}
                        <div className="mt-5 flex items-center gap-2">
                            {socials.map(({ label, href, icon }) => (
                                <a key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-500 transition hover:border-white/20 hover:text-slate-300"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── Link columns ── */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group}>
                            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                                {group}
                            </h3>
                            <ul className="space-y-2.5">
                                {links.map(({ label, to }) => {
                                    const isExternal = to.startsWith("http");
                                    return (
                                        <li key={label}>
                                            {isExternal ? (
                                                <a href={to} target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-200">
                                                    {label}
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                        <path d="M7 17 17 7M7 7h10v10" />
                                                    </svg>
                                                </a>
                                            ) : (
                                                <Link to={to}
                                                    className="text-sm text-slate-500 transition hover:text-slate-200">
                                                    {label}
                                                </Link>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="border-t border-white/[0.06]">
                <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
                    <p className="text-xs text-slate-600">
                        © {new Date().getFullYear()} CodeSentinel, Inc. All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-600">
                        {/* System status */}
                        <span className="flex items-center gap-1.5">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </span>
                            All systems operational
                        </span>

                        <span className="hidden h-3 w-px bg-white/10 sm:inline-block" />

                        {/* Security highlights */}
                        <span className="flex items-center gap-1.5">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            End-to-end encrypted
                        </span>

                        <span className="hidden h-3 w-px bg-white/10 sm:inline-block" />

                        <span>Built for developers</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
