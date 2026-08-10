import LoginForm from "../../components/auth/LoginForm";
import { ShieldLogo } from "../../components/layout/Header";

export default function Login() {
    const handleLogin = async (email: string, password: string) => {
        const response = await fetch("http://localhost:4000/api/v1/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }
    };

    return (
        <main className="flex min-h-screen w-full bg-[#0a0d17] text-white">

            {/* ══ Left — Brand panel ══ */}
            <section className="relative hidden w-[52%] shrink-0 overflow-hidden border-r border-white/[0.06] lg:flex lg:flex-col lg:justify-between lg:p-14">

                {/* Dot-grid texture */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                        maskImage: "radial-gradient(ellipse 70% 70% at 40% 30%, black 40%, transparent 100%)",
                    }}
                />
                {/* Glow */}
                <div aria-hidden="true"
                    className="pointer-events-none absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.12] blur-[100px]" />
                <div aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violet-600/[0.08] blur-[80px]" />

                {/* Logo */}
                <div className="relative flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/30">
                        <ShieldLogo size={18} />
                    </span>
                    <span className="text-lg font-semibold tracking-tight">CodeSentinel</span>
                </div>

                {/* Main copy */}
                <div className="relative max-w-[420px]">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                        Trusted by 10,000+ developers
                    </div>

                    <h2 className="text-3xl font-semibold leading-snug tracking-tight text-white">
                        Ship secure code<br />with confidence.
                    </h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-slate-400">
                        Continuous code analysis, dependency scanning, and vulnerability
                        management — built for engineering teams that move fast.
                    </p>

                    {/* Terminal mockup */}
                    <div className="mt-8 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d1020]">
                        {/* Title bar */}
                        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                            <span className="ml-3 text-[11px] text-slate-600">codesentinel — scan.log</span>
                        </div>
                        {/* Log output */}
                        <div className="space-y-1.5 px-4 py-4 font-mono text-[12px] leading-relaxed">
                            <p className="text-slate-500">$ codesentinel scan --repo my-app</p>
                            <p><span className="text-emerald-400">✓</span> <span className="text-slate-400">Repository cloned</span></p>
                            <p><span className="text-emerald-400">✓</span> <span className="text-slate-400">1,247 files detected</span></p>
                            <p><span className="text-emerald-400">✓</span> <span className="text-slate-400">Dependencies analyzed</span></p>
                            <p><span className="text-indigo-300">●</span> <span className="text-slate-400">Running security checks…</span></p>
                            <div className="mt-3 flex items-center justify-between rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                                <span className="text-slate-500">Security score</span>
                                <span className="font-semibold text-emerald-400">86 / 100</span>
                            </div>
                            <div className="flex gap-3 pt-1 text-[11px]">
                                <span className="text-red-400">● 2 critical</span>
                                <span className="text-orange-400">● 5 high</span>
                                <span className="text-yellow-400">● 8 medium</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer badges */}
                <div className="relative flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600">
                    {["SOC 2 Type II", "GDPR Compliant", "End-to-end encrypted"].map((t, i, arr) => (
                        <span key={t} className="flex items-center gap-2">
                            {t}
                            {i < arr.length - 1 && <span className="h-1 w-1 rounded-full bg-slate-700" />}
                        </span>
                    ))}
                </div>
            </section>

            {/* ══ Right — Form panel ══ */}
            <section className="flex w-full flex-col items-center justify-center px-6 py-14 sm:px-12 lg:w-[48%]">
                {/* Mobile logo */} 
                <div className="mb-10 flex w-full max-w-[400px] items-center gap-2.5 lg:hidden">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/30">
                        <ShieldLogo size={16} />
                    </span>
                    <span className="text-base font-semibold tracking-tight">CodeSentinel</span>
                </div>

                <LoginForm loginFunction={handleLogin} />
            </section>
        </main>
    );
}
