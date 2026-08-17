import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import { useState } from "react";
import ImportFileModal from "../ImportFIle/ImportFileModal.tsx"
import { useNavigate } from "react-router-dom";

const features = [
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                <path d="m9 12 2 2 4-4" />
            </svg>
        ),
        title: "Code Intelligence",
        text: "Detect dangerous patterns hidden inside your source code before they reach production.",
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
        ),
        title: "Dependency Scan",
        text: "Identify vulnerable or malicious packages across your entire dependency tree.",
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
        title: "Secret Detection",
        text: "Find API keys, tokens and credentials accidentally committed to your repository.",
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
        title: "Threat Analysis",
        text: "Turn complex vulnerabilities into clear, actionable remediation steps.",
    },
];

const stats = [
    { value: "10k+", label: "Developers" },
    { value: "2.4M+", label: "Scans run" },
    { value: "98%", label: "Detection rate" },
    { value: "<2min", label: "Avg. scan time" },
];

export default function HomePage() {
    const [showuploadModel, setShowuploadModel] = useState(true);
    const navigatin = useNavigate();
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#0a0d17] text-white">

            {/* ── Background ── */}
            <div className="pointer-events-none absolute inset-0">
                {/* Hero image */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('/alien-bg.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                        backgroundRepeat: "no-repeat",
                        opacity: 0.08,
                    }}
                />
                {/* Gradient fade */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d17]/50 via-transparent to-[#0a0d17]" />
                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />
                {/* Glow blobs */}
                <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/[0.10] blur-[120px]" />
                <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-violet-600/[0.07] blur-[100px]" />
                <div className="absolute -right-40 top-1/2 h-96 w-96 rounded-full bg-indigo-500/[0.06] blur-[100px]" />
            </div>


            {/* ══════════════════════════════════════════ */}
            {/* HERO                                       */}
            {/* ══════════════════════════════════════════ */}
            <section className="relative mx-auto max-w-screen-xl px-6 pb-32 pt-28 sm:px-10 lg:pt-36">
                <div className="mx-auto max-w-3xl text-center">

                    {/* Status pill */}
                    <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/[0.07] px-4 py-1.5 text-xs font-medium text-indigo-300">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-70" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" />
                        </span>
                        Live security scanning — no setup required
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Secure your code
                        <br />
                        <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                            before it ships.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-slate-400">
                        CodeSentinel automatically scans every pull request for
                        vulnerabilities, exposed secrets, and dependency risks —
                        so your team can move fast without breaking things.
                    </p>

                    {/* CTA buttons */}
                    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link to="/register">
                            <Button className="rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 active:scale-[0.98]">
                                Get Started Free
                            </Button>
                        </Link>
                        <Link to="/docs">
                            <Button className="rounded-lg border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white">
                                View Documentation
                            </Button>
                        </Link>
                    </div>

                    {/* Trust line */}
                    <p className="mt-5 text-xs text-slate-600">
                        Free forever · No credit card · SOC 2 Type II
                    </p>
                </div>


                {/* ── Terminal mockup ── */}
                <div className="relative mx-auto mt-20 max-w-3xl">
                    <div className="absolute inset-x-0 -top-10 mx-auto h-40 w-2/3 rounded-full bg-indigo-500/10 blur-[60px]" />

                    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1020]/80 shadow-2xl backdrop-blur-sm">
                        {/* Title bar */}
                        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
                            <div className="flex items-center gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-red-400/50" />
                                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/50" />
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                            </div>
                            <span className="font-mono text-[10px] text-slate-600">codesentinel — scan.log</span>
                            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                </span>
                                LIVE
                            </span>
                        </div>

                        {/* Log body */}
                        <div className="space-y-2 px-5 py-5 font-mono text-[12px] leading-relaxed">
                            <p className="text-slate-600">$ codesentinel scan --repo github.com/acme/api</p>
                            <p><span className="text-emerald-400">✓</span> <span className="text-slate-400">Repository cloned — 1,247 files</span></p>
                            <p><span className="text-emerald-400">✓</span> <span className="text-slate-400">Dependencies resolved — 342 packages</span></p>
                            <p><span className="text-emerald-400">✓</span> <span className="text-slate-400">Secrets scan complete — 0 exposed</span></p>
                            <p><span className="text-indigo-400">●</span> <span className="text-slate-400">Running SAST analysis…</span></p>

                            {/* Result row */}
                            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:grid-cols-4">
                                {[
                                    { label: "Critical", count: "2", color: "text-red-400" },
                                    { label: "High",     count: "5", color: "text-orange-400" },
                                    { label: "Medium",   count: "8", color: "text-yellow-400" },
                                    { label: "Score",    count: "86%", color: "text-emerald-400" },
                                ].map(({ label, count, color }) => (
                                    <div key={label} className="text-center">
                                        <p className={`text-base font-semibold ${color}`}>{count}</p>
                                        <p className="mt-0.5 text-[10px] text-slate-600">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>




            {/* ══════════════════════════════════════════ */}
            {/* STATS                                      */}
            {/* ══════════════════════════════════════════ */}
            <section className="relative border-y border-white/[0.05]">
                <div className="mx-auto max-w-screen-xl px-6 py-14 sm:px-10">
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                        {stats.map(({ value, label }) => (
                            <div key={label} className="text-center">
                                <p className="text-3xl font-semibold tracking-tight text-white">{value}</p>
                                <p className="mt-1 text-sm text-slate-500">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════ */}
            {/* FEATURES                                   */}
            {/* ══════════════════════════════════════════ */}
            <section className="relative mx-auto max-w-screen-xl px-6 py-28 sm:px-10">

                <div className="mb-14 max-w-xl">
                    <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                        Capabilities
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                        Everything you need to ship securely.
                    </h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-slate-500">
                        One platform for all your application security needs — from
                        first commit to production.
                    </p>
                </div>

                <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((f) => (
                        <div key={f.title} className="group bg-[#0a0d17] p-7 transition duration-200 hover:bg-white/[0.02]">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 transition group-hover:border-indigo-500/30 group-hover:text-indigo-400">
                                {f.icon}
                            </span>
                            <h3 className="mt-5 text-sm font-semibold text-white">{f.title}</h3>
                            <p className="mt-2 text-[13px] leading-relaxed text-slate-500">{f.text}</p>
                        </div>
                    ))}
                </div>
            </section>


            {/* ══════════════════════════════════════════ */}
            {/* CTA BANNER                                 */}
            {/* ══════════════════════════════════════════ */}
            <section className="relative mx-auto max-w-screen-xl px-6 pb-28 sm:px-10">
                <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.05] px-8 py-16 text-center">
                    {/* Glow */}
                    <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[80px]" />

                    <div className="relative">
                        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                            Start today
                        </p>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                            Find vulnerabilities before attackers do.
                        </h2>
                        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-slate-400">
                            Set up in under 2 minutes. Works with GitHub, GitLab
                            and Bitbucket. No agents, no configuration files.
                        </p>

                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link to="/register">
                                <Button className="rounded-lg bg-indigo-500 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 active:scale-[0.98]">
                                    Get Started Free
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button className="rounded-lg border border-white/10 px-7 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {showuploadModel && (
        <ImportFileModal
          onClose={() => setShowuploadModel(false)}
        />
      )}

        </main>
    );
}
