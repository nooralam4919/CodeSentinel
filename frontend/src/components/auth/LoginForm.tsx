import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import GithubLogin from "../../pages/Auth/GithubLogIn";

interface LoginFormProps {
    loginFunction: (email: string, password: string) => Promise<void>;
}
interface LoginFormData { email: string; password: string; }

export default function LoginForm({ loginFunction }: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        setError("");
        try { await loginFunction(data.email, data.password); }
        catch (err: unknown) { setError(err instanceof Error ? err.message : "Login failed."); }
    };

    return (
        <div className="mx-auto w-full max-w-[400px]">
            <div className="mb-8">
                <h1 style={{ color: "var(--text-primary)", fontSize: "1.375rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
                    Sign in to CodeSentinel
                </h1>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.375rem" }}>
                    Welcome back. Enter your credentials to continue.
                </p>
            </div>

            {error && <div className="cs-alert-error mb-5">{error}</div>}

            <GithubLogin />

            <div className="cs-divider">
                <span>or continue with email</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="login-email" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "0.375rem" }}>
                        Email address
                    </label>
                    <input
                        id="login-email"
                        type="email"
                        placeholder="you@company.com"
                        autoComplete="email"
                        className="cs-input"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p style={{ color: "var(--danger)", fontSize: "0.75rem", marginTop: "0.25rem" }}>{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="mb-6">
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                        <label htmlFor="login-password" style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-secondary)" }}>
                            Password
                        </label>
                        <Link to="/forgot-password" style={{ fontSize: "0.75rem", color: "var(--blue)", fontWeight: 500 }}>
                            Forgot password?
                        </Link>
                    </div>
                    <div
                        style={{ display: "flex", alignItems: "center", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "0.5rem", overflow: "hidden" }}
                        className="focus-within:ring-2"
                    >
                        <input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            style={{ flex: 1, background: "transparent", border: "none", padding: "0.625rem 0.875rem", fontSize: "0.875rem", color: "var(--text-primary)", outline: "none" }}
                            {...register("password", { required: "Password is required" })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ padding: "0 0.875rem", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {errors.password && <p style={{ color: "var(--danger)", fontSize: "0.75rem", marginTop: "0.25rem" }}>{errors.password.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="cs-btn-primary w-full justify-center">
                    {isSubmitting ? "Signing in…" : "Sign In"}
                </button>
            </form>

            <div className="mt-5">
                <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                    Don't have an account?
                </p>
                <Link
                    to="/register"
                    className="cs-btn-secondary w-full justify-center"
                    style={{ textDecoration: "none", display: "flex" }}
                >
                    Create a free account
                </Link>
            </div>
        </div>
    );
}
