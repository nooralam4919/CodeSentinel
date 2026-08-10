import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

type RegisterFormProps = {
    registerFunction: (name: string, email: string, password: string) => Promise<void>;
};

export default function RegisterForm({ registerFunction }: RegisterFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /* ── Inline validation ── */
    const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword;
    const passwordWeak = password.length > 0 && password.length < 8;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError("Please fill in all fields.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            await registerFunction(name, email, password);
        } catch (err: any) {
            setError(err?.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-[400px]">

            {/* ── Heading ── */}
            <div className="mb-8">
                <h1 className="text-[22px] font-semibold tracking-tight text-white">
                    Create your account
                </h1>
                <p className="mt-1.5 text-sm text-slate-500">
                    Start securing your code. Free forever, no credit card required.
                </p>
            </div>

            {/* ── GitHub OAuth ── */}
            <button
                type="button"
                className="mb-6 flex w-full items-center justify-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white active:scale-[0.99]"
            >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                </svg>
                Continue with GitHub
            </button>

            {/* ── Divider ── */}
            <div className="mb-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/[0.06]" />
                <span className="text-xs text-slate-600">or register with email</span>
                <span className="h-px flex-1 bg-white/[0.06]" />
            </div>

            {/* ── Error banner ── */}
            {error && (
                <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/8 px-3.5 py-3 text-sm text-red-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="mt-0.5 shrink-0" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>

                {/* Full name */}
                <div className="mb-4">
                    <label htmlFor="reg-name" className="mb-1.5 block text-sm font-medium text-slate-300">
                        Full name
                    </label>
                    <input
                        id="reg-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-slate-300">
                        Email address
                    </label>
                    <input
                        id="reg-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="reg-password" className="mb-1.5 block text-sm font-medium text-slate-300">
                        Password
                    </label>
                    <div className={`flex items-center overflow-hidden rounded-lg border bg-white/[0.03] transition focus-within:ring-2 ${
                        passwordWeak
                            ? "border-red-500/40 focus-within:border-red-500/50 focus-within:ring-red-500/15"
                            : "border-white/10 focus-within:border-indigo-500/50 focus-within:ring-indigo-500/20"
                    }`}>
                        <input
                            id="reg-password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Min. 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex-1 bg-transparent px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="px-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-slate-200">
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {passwordWeak && (
                        <p className="mt-1.5 text-xs text-red-400">Password must be at least 8 characters.</p>
                    )}
                </div>

                {/* Confirm password */}
                <div className="mb-6">
                    <label htmlFor="reg-confirm" className="mb-1.5 block text-sm font-medium text-slate-300">
                        Confirm password
                    </label>
                    <div className={`flex items-center overflow-hidden rounded-lg border bg-white/[0.03] transition focus-within:ring-2 ${
                        passwordMismatch
                            ? "border-red-500/40 focus-within:border-red-500/50 focus-within:ring-red-500/15"
                            : "border-white/10 focus-within:border-indigo-500/50 focus-within:ring-indigo-500/20"
                    }`}>
                        <input
                            id="reg-confirm"
                            type={showConfirm ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="flex-1 bg-transparent px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none"
                        />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                            aria-label={showConfirm ? "Hide password" : "Show password"}
                            className="px-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-slate-200">
                            {showConfirm ? "Hide" : "Show"}
                        </button>
                    </div>
                    {passwordMismatch && (
                        <p className="mt-1.5 text-xs text-red-400">Passwords do not match.</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading || passwordMismatch || passwordWeak}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading && (
                        <span aria-hidden="true"
                            className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    )}
                    {loading ? "Creating Account…" : "Create Account"}
                </button>
            </form>

            {/* Terms */}
            <p className="mt-4 text-center text-xs text-slate-600">
                By creating an account you agree to our{" "}
                <Link to="/terms" className="text-slate-500 underline underline-offset-2 hover:text-slate-300">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-slate-500 underline underline-offset-2 hover:text-slate-300">
                    Privacy Policy
                </Link>.
            </p>

            {/* Switch to login */}
            <div className="mt-4">
                <p className="mb-3 text-center text-xs text-slate-600">Already have an account?</p>
                <Link
                    to="/login"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
                >
                    Sign in instead
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
