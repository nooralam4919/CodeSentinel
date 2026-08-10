import RegisterForm from "../../components/auth/RegisterForm";
import { ShieldLogo } from "../../components/layout/Header";

export default function Register() {
    const handleRegister = async (name: string, email: string, password: string) => {
        const response = await fetch("http://localhost:4000/api/v1/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        // console.log("this the register data ", data);

        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
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
                    className="pointer-events-none absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/[0.12] blur-[100px]" />
                <div aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-indigo-600/[0.08] blur-[80px]" />

                {/* Logo */}
                <div className="relative flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/30">
                        <ShieldLogo size={18} />
                    </span>
                    <span className="text-lg font-semibold tracking-tight">CodeSentinel</span>
                </div>

                {/* Main copy */}
                <div className="relative max-w-[420px]">
                    <h2 className="text-3xl font-semibold leading-snug tracking-tight text-white">
                        Your code's first<br />line of defense.
                    </h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-slate-400">
                        Join engineers who catch vulnerabilities before they reach
                        production. Free forever, no credit card required.
                    </p>

                    {/* Feature checklist */}
                    <ul className="mt-8 space-y-3">
                        {[
                            { label: "Automated PR security reviews",    color: "text-emerald-400" },
                            { label: "Real-time vulnerability alerts",   color: "text-emerald-400" },
                            { label: "GitHub & GitLab integration",      color: "text-emerald-400" },
                            { label: "Dependency & SAST scanning",       color: "text-emerald-400" },
                            { label: "Team dashboards & reporting",      color: "text-emerald-400" },
                        ].map(({ label, color }) => (
                            <li key={label} className="flex items-center gap-3">
                                <span className={`${color} text-sm`}>✓</span>
                                <span className="text-sm text-slate-300">{label}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Social proof */}
                    <div className="mt-8 flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
                        {/* Avatar stack */}
                        <div className="flex -space-x-2.5">
                            {["bg-indigo-500", "bg-violet-500", "bg-emerald-500", "bg-orange-500"].map((c, i) => (
                                <span key={i}
                                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0a0d17] ${c} text-[10px] font-bold text-white`}>
                                    {["JD", "AS", "MK", "RL"][i]}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-slate-400">
                            <span className="font-semibold text-white">10,000+</span> developers already securing their code
                        </p>
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

                <RegisterForm registerFunction={handleRegister} />
            </section>
        </main>
    );
}
