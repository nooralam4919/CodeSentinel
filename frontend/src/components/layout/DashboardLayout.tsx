import { useState } from "react";

type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

type Vulnerability = {
    id: number;
    severity: Severity;
    title: string;
    file: string;
    line: number;
    description: string;
};

type Scan = {
    repository: string;
    branch: string;
    score: number;
    issues: number;
    time: string;
    status: "COMPLETED" | "SCANNING";
};

const vulnerabilities: Vulnerability[] = [
    {
        id: 1,
        severity: "CRITICAL",
        title: "Hardcoded Database Credentials",
        file: "src/config/database.ts",
        line: 18,
        description:
            "Database credentials appear to be directly embedded inside the source code.",
    },
    {
        id: 2,
        severity: "HIGH",
        title: "Potential SQL Injection",
        file: "src/controllers/user.controller.ts",
        line: 74,
        description:
            "User-controlled input is used directly inside a database query.",
    },
    {
        id: 3,
        severity: "HIGH",
        title: "Insecure JWT Configuration",
        file: "src/middleware/auth.ts",
        line: 32,
        description:
            "JWT configuration may allow tokens with insufficient security.",
    },
    {
        id: 4,
        severity: "MEDIUM",
        title: "Unsafe Dependency",
        file: "package.json",
        line: 24,
        description:
            "A dependency with a known security vulnerability was detected.",
    },
];

const recentScans: Scan[] = [
    {
        repository: "codesentinel-api",
        branch: "main",
        score: 86,
        issues: 12,
        time: "2 min ago",
        status: "COMPLETED",
    },
    {
        repository: "frontend-dashboard",
        branch: "develop",
        score: 94,
        issues: 5,
        time: "18 min ago",
        status: "COMPLETED",
    },
    {
        repository: "authentication-service",
        branch: "main",
        score: 72,
        issues: 24,
        time: "1 hour ago",
        status: "COMPLETED",
    },
];

function Dashboard() {
    const [scanning, setScanning] = useState(false);

    const startScan = () => {
        setScanning(true);

        setTimeout(() => {
            setScanning(false);
        }, 3000);
    };

    const severityStyle = (severity: Severity) => {
        switch (severity) {
            case "CRITICAL":
                return "border-red-400/25 bg-red-400/[0.07] text-red-400";

            case "HIGH":
                return "border-orange-400/25 bg-orange-400/[0.07] text-orange-400";

            case "MEDIUM":
                return "border-yellow-400/25 bg-yellow-400/[0.07] text-yellow-400";

            default:
                return "border-cyan-400/25 bg-cyan-400/[0.07] text-cyan-400";
        }
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#020504] text-white">

            {/* ====================================================== */}
            {/* BACKGROUND LIGHT */}
            {/* ====================================================== */}

            <div className="pointer-events-none fixed inset-0 overflow-hidden">

                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0,255,170,0.055) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,255,170,0.055) 1px, transparent 1px)
                        `,
                        backgroundSize: "50px 50px",
                    }}
                />

                {/* Top emerald light */}
                <div className="absolute left-1/2 top-[-280px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-400/[0.10] blur-[160px]" />

                {/* Center light */}
                <div className="absolute left-[35%] top-[30%] h-[500px] w-[500px] rounded-full bg-emerald-500/[0.045] blur-[150px]" />

                {/* Left cyan light */}
                <div className="absolute left-[-220px] top-[35%] h-[550px] w-[550px] rounded-full bg-cyan-400/[0.07] blur-[150px]" />

                {/* Right purple light */}
                <div className="absolute right-[-250px] top-[55%] h-[550px] w-[550px] rounded-full bg-purple-400/[0.065] blur-[150px]" />

                {/* Bottom light */}
                <div className="absolute bottom-[-250px] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-400/[0.04] blur-[160px]" />

            </div>


            {/* ====================================================== */}
            {/* CONTENT */}
            {/* ====================================================== */}

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-12">

                {/* ================================================== */}
                {/* TOP BAR */}
                {/* ================================================== */}

                <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

                    <div>

                        <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-emerald-400/60">

                            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(0,255,170,0.9)]" />

                            SENTINEL // COMMAND CENTER

                        </div>

                        <h1 className="font-mono text-4xl font-bold uppercase tracking-tight sm:text-5xl">

                            Security{" "}

                            <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(0,255,170,0.25)]">
                                Dashboard
                            </span>

                        </h1>

                        <p className="mt-4 max-w-2xl font-mono text-sm leading-7 text-white/40 sm:text-base">

                            Monitor your codebase, detect vulnerabilities,
                            and track security posture in real time.

                        </p>

                    </div>


                    {/* Scan Button */}

                    <button
                        onClick={startScan}
                        disabled={scanning}
                        className="group relative overflow-hidden rounded-lg border border-emerald-400/40 bg-emerald-400/[0.08] px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-emerald-300 transition hover:border-emerald-300/60 hover:bg-emerald-400/[0.14] disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <span className="relative z-10 flex items-center gap-3">

                            <span className={scanning ? "animate-spin" : ""}>
                                ◈
                            </span>

                            {scanning
                                ? "Scanning..."
                                : "Initialize Scan"}

                        </span>

                        <span className="absolute inset-0 -translate-x-full bg-emerald-400/10 transition group-hover:translate-x-0" />

                    </button>

                </div>


                {/* ================================================== */}
                {/* SECURITY SCORE */}
                {/* ================================================== */}

                <section className="mb-7 grid gap-5 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">

                    {/* Main Score */}

                    <div className="relative overflow-hidden rounded-2xl border border-emerald-400/[0.15] bg-[#030806]/85 p-7 backdrop-blur-sm">

                        <div className="absolute right-[-60px] top-[-60px] h-48 w-48 rounded-full bg-emerald-400/[0.09] blur-[80px]" />

                        <div className="relative">

                            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                                Security Index
                            </p>

                            <div className="mt-6 flex items-center gap-7">

                                {/* Circle */}

                                <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border border-emerald-400/25 shadow-[0_0_30px_rgba(0,255,170,0.05)]">

                                    <div className="absolute inset-2 rounded-full border border-dashed border-emerald-400/20" />

                                    <div className="text-center">

                                        <div className="font-mono text-4xl font-bold text-emerald-400">
                                            86
                                        </div>

                                        <div className="font-mono text-[9px] tracking-widest text-white/25">
                                            /100
                                        </div>

                                    </div>

                                </div>


                                <div>

                                    <div className="font-mono text-sm uppercase text-emerald-300">
                                        Good Security
                                    </div>

                                    <p className="mt-3 max-w-[200px] font-mono text-xs leading-6 text-white/30">
                                        Your security posture is stronger
                                        than 82% of scanned repositories.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    <StatCard
                        symbol="!"
                        label="Critical"
                        value="02"
                        description="Immediate action"
                        color="red"
                    />

                    <StatCard
                        symbol="∆"
                        label="High Risk"
                        value="07"
                        description="Requires attention"
                        color="orange"
                    />

                    <StatCard
                        symbol="⌁"
                        label="Secrets"
                        value="03"
                        description="Exposed credentials"
                        color="purple"
                    />

                </section>


                {/* ================================================== */}
                {/* SECONDARY STATS */}
                {/* ================================================== */}

                <section className="mb-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <MiniStat
                        label="Files Analyzed"
                        value="12,482"
                        icon="⌘"
                    />

                    <MiniStat
                        label="Dependencies"
                        value="847"
                        icon="◇"
                    />

                    <MiniStat
                        label="Vulnerabilities"
                        value="31"
                        icon="∆"
                    />

                    <MiniStat
                        label="Last Scan"
                        value="2 min"
                        icon="◷"
                    />

                </section>


                {/* ================================================== */}
                {/* MAIN GRID */}
                {/* ================================================== */}

                <section className="grid gap-7 lg:grid-cols-[1.4fr_0.8fr]">

                    {/* ================================================= */}
                    {/* VULNERABILITIES */}
                    {/* ================================================= */}

                    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#030806]/85 backdrop-blur-sm">

                        <div className="flex items-center justify-between border-b border-white/[0.07] px-7 py-6">

                            <div>

                                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/50">
                                    Threat Intelligence
                                </p>

                                <h2 className="mt-2 font-mono text-base font-semibold uppercase">
                                    Recent Vulnerabilities
                                </h2>

                            </div>

                            <button className="font-mono text-[10px] uppercase tracking-widest text-emerald-400/60 transition hover:text-emerald-300">
                                View all →
                            </button>

                        </div>


                        <div className="divide-y divide-white/[0.05]">

                            {vulnerabilities.map((item) => (

                                <div
                                    key={item.id}
                                    className="group p-6 transition hover:bg-emerald-400/[0.025]"
                                >

                                    <div className="flex gap-5">

                                        <div className="mt-1">

                                            <span
                                                className={`flex h-9 w-9 items-center justify-center rounded-md border font-mono text-sm font-bold ${severityStyle(
                                                    item.severity
                                                )}`}
                                            >
                                                {item.severity === "CRITICAL"
                                                    ? "!"
                                                    : item.severity === "HIGH"
                                                    ? "∆"
                                                    : "⌁"}
                                            </span>

                                        </div>


                                        <div className="min-w-0 flex-1">

                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                                <h3 className="font-mono text-sm font-semibold text-white/85">
                                                    {item.title}
                                                </h3>

                                                <span
                                                    className={`w-fit rounded border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider ${severityStyle(
                                                        item.severity
                                                    )}`}
                                                >
                                                    {item.severity}
                                                </span>

                                            </div>


                                            <p className="mt-3 font-mono text-xs leading-6 text-white/30">
                                                {item.description}
                                            </p>


                                            <div className="mt-4 flex flex-wrap gap-5 font-mono text-[10px] text-white/25">

                                                <span>
                                                    FILE{" "}
                                                    <span className="text-emerald-400/60">
                                                        {item.file}
                                                    </span>
                                                </span>

                                                <span>
                                                    LINE{" "}
                                                    <span className="text-white/50">
                                                        {item.line}
                                                    </span>
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* RIGHT SIDE */}
                    {/* ================================================= */}

                    <div className="space-y-7">

                        {/* Repository */}

                        <div className="rounded-2xl border border-white/[0.08] bg-[#030806]/85 p-7 backdrop-blur-sm">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                                        Active Repository
                                    </p>

                                    <h2 className="mt-3 font-mono text-base font-semibold">
                                        codesentinel-api
                                    </h2>

                                </div>

                                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-emerald-400">

                                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                                    Connected

                                </span>

                            </div>


                            <div className="mt-7 rounded-lg border border-white/[0.06] bg-black/25 p-5">

                                <div className="flex items-center justify-between font-mono text-[10px]">

                                    <span className="text-white/30">
                                        BRANCH
                                    </span>

                                    <span className="text-emerald-400/70">
                                        main
                                    </span>

                                </div>

                                <div className="mt-5 flex items-center justify-between font-mono text-[10px]">

                                    <span className="text-white/30">
                                        LAST COMMIT
                                    </span>

                                    <span className="text-white/45">
                                        a81f92c
                                    </span>

                                </div>

                                <div className="mt-5 flex items-center justify-between font-mono text-[10px]">

                                    <span className="text-white/30">
                                        LAST SCAN
                                    </span>

                                    <span className="text-white/45">
                                        2 minutes ago
                                    </span>

                                </div>

                            </div>


                            <button className="mt-6 w-full rounded-lg border border-white/[0.08] bg-white/[0.02] py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 transition hover:border-emerald-400/25 hover:text-emerald-300">
                                Repository Settings
                            </button>

                        </div>


                        {/* AI Recommendation */}

                        <div className="relative overflow-hidden rounded-2xl border border-purple-400/[0.15] bg-[#030806]/85 p-7 backdrop-blur-sm">

                            <div className="absolute right-[-50px] top-[-50px] h-48 w-48 rounded-full bg-purple-400/[0.08] blur-[80px]" />

                            <div className="relative">

                                <div className="flex items-center gap-3">

                                    <span className="font-mono text-xl text-purple-400/80">
                                        ◈
                                    </span>

                                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-purple-400/60">
                                        AI Intelligence
                                    </span>

                                </div>

                                <h3 className="mt-6 font-mono text-base font-semibold">
                                    Security Recommendation
                                </h3>

                                <p className="mt-4 font-mono text-xs leading-6 text-white/35">
                                    Three exposed credentials were detected.
                                    Move sensitive configuration into
                                    environment variables before deploying
                                    this repository.
                                </p>

                                <button className="mt-6 font-mono text-[10px] uppercase tracking-widest text-purple-300/80 transition hover:text-purple-200">
                                    Analyze issue →
                                </button>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================================================== */}
                {/* RECENT SCANS */}
                {/* ================================================== */}

                <section className="mt-9 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#030806]/85 backdrop-blur-sm">

                    <div className="border-b border-white/[0.07] px-7 py-6">

                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/50">
                            Scan History
                        </p>

                        <h2 className="mt-2 font-mono text-base font-semibold uppercase">
                            Recent Repository Scans
                        </h2>

                    </div>


                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[700px] text-left">

                            <thead className="border-b border-white/[0.05]">

                                <tr className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">

                                    <th className="px-7 py-5 font-normal">
                                        Repository
                                    </th>

                                    <th className="px-7 py-5 font-normal">
                                        Branch
                                    </th>

                                    <th className="px-7 py-5 font-normal">
                                        Score
                                    </th>

                                    <th className="px-7 py-5 font-normal">
                                        Issues
                                    </th>

                                    <th className="px-7 py-5 font-normal">
                                        Status
                                    </th>

                                    <th className="px-7 py-5 font-normal">
                                        Scanned
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-white/[0.05]">

                                {recentScans.map((scan) => (

                                    <tr
                                        key={scan.repository}
                                        className="font-mono text-xs transition hover:bg-emerald-400/[0.025]"
                                    >

                                        <td className="px-7 py-6 text-white/65">
                                            {scan.repository}
                                        </td>

                                        <td className="px-7 py-6 text-white/35">
                                            {scan.branch}
                                        </td>

                                        <td className="px-7 py-6">

                                            <span
                                                className={
                                                    scan.score >= 90
                                                        ? "text-emerald-400"
                                                        : scan.score >= 80
                                                        ? "text-yellow-400"
                                                        : "text-red-400"
                                                }
                                            >
                                                {scan.score}/100
                                            </span>

                                        </td>

                                        <td className="px-7 py-6 text-white/45">
                                            {scan.issues}
                                        </td>

                                        <td className="px-7 py-6">

                                            <span className="rounded border border-emerald-400/15 bg-emerald-400/[0.05] px-2.5 py-1 text-[9px] text-emerald-400/75">
                                                {scan.status}
                                            </span>

                                        </td>

                                        <td className="px-7 py-6 text-white/30">
                                            {scan.time}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </section>


                {/* ================================================== */}
                {/* FOOTER STATUS */}
                {/* ================================================== */}

                <div className="mt-9 flex flex-col justify-between gap-4 border-t border-white/[0.05] pt-6 font-mono text-[9px] uppercase tracking-[0.25em] text-white/20 sm:flex-row">

                    <span>
                        SENTINEL NETWORK // CORE-01
                    </span>

                    <span className="flex items-center gap-2">

                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(0,255,170,0.7)]" />

                        All systems operational

                    </span>

                </div>

            </div>

        </main>
    );
}


/* ================================================================ */
/* STAT CARD */
/* ================================================================ */

type StatCardProps = {
    symbol: string;
    label: string;
    value: string;
    description: string;
    color: "red" | "orange" | "purple";
};

function StatCard({
    symbol,
    label,
    value,
    description,
    color,
}: StatCardProps) {

    const colors = {
        red: {
            border: "border-red-400/[0.15]",
            text: "text-red-400",
            glow: "bg-red-400/[0.07]",
        },

        orange: {
            border: "border-orange-400/[0.15]",
            text: "text-orange-400",
            glow: "bg-orange-400/[0.07]",
        },

        purple: {
            border: "border-purple-400/[0.15]",
            text: "text-purple-400",
            glow: "bg-purple-400/[0.07]",
        },
    };

    const style = colors[color];

    return (
        <div
            className={`relative overflow-hidden rounded-2xl border ${style.border} bg-[#030806]/85 p-7 backdrop-blur-sm`}
        >

            <div
                className={`absolute right-[-40px] top-[-40px] h-36 w-36 rounded-full ${style.glow} blur-[70px]`}
            />

            <div className="relative">

                <div className={`font-mono text-2xl ${style.text}`}>
                    {symbol}
                </div>

                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
                    {label}
                </p>

                <div className={`mt-2 font-mono text-4xl font-bold ${style.text}`}>
                    {value}
                </div>

                <p className="mt-3 font-mono text-[10px] text-white/25">
                    {description}
                </p>

            </div>

        </div>
    );
}


/* ================================================================ */
/* MINI STAT */
/* ================================================================ */

type MiniStatProps = {
    label: string;
    value: string;
    icon: string;
};

function MiniStat({
    label,
    value,
    icon,
}: MiniStatProps) {

    return (
        <div className="group rounded-xl border border-white/[0.07] bg-[#030806]/75 p-6 backdrop-blur-sm transition hover:border-emerald-400/[0.15] hover:bg-emerald-400/[0.025]">

            <div className="flex items-center justify-between">

                <span className="font-mono text-xl text-emerald-400/35 transition group-hover:text-emerald-400/70">
                    {icon}
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
                    LIVE
                </span>

            </div>

            <div className="mt-6 font-mono text-2xl font-semibold text-white/75">
                {value}
            </div>

            <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-white/25">
                {label}
            </p>

        </div>
    );
}

export default Dashboard;