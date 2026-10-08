import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import GithubLogin from "../../pages/Auth/GithubLogIn.tsx";

type RegisterFormData = { name: string; email: string; password: string; confirmPassword: string; };
type RegisterFormProps = { registerFunction: (name: string, email: string, password: string) => Promise<void>; };

export default function RegisterForm({ registerFunction }: RegisterFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm,  setShowConfirm]  = useState(false);
    const [error, setError] = useState("");
    const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm<RegisterFormData>();
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");
    const passwordWeak    = password?.length > 0 && password.length < 8;
    const passwordMismatch = confirmPassword?.length > 0 && password !== confirmPassword;

    const onSubmit = async (data: RegisterFormData) => {
        setError("");
        if (data.password.length < 8) { setError("Password must be at least 8 characters."); return; }
        if (data.password !== data.confirmPassword) { setError("Passwords do not match."); return; }
        try { await registerFunction(data.name, data.email, data.password); }
        catch (err: unknown) { setError(err instanceof Error ? err.message : "Registration failed."); }
    };

    const fieldLabel = (text: string) => (
        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "0.375rem" }}>
            {text}
        </label>
    );

    return (
        <div className="mx-auto w-full max-w-[400px]">
            <div className="mb-8">
                <h1 style={{ color: "var(--text-primary)", fontSize: "1.375rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
                    Create your account
                </h1>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.375rem" }}>
                    Start securing your code. Free forever, no credit card required.
                </p>
            </div>

            {error && <div className="cs-alert-error mb-5">{error}</div>}

            <GithubLogin />

            <div className="cs-divider"><span>or register with email</span></div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Name */}
                <div className="mb-4">
                    {fieldLabel("Full name")}
                    <input id="reg-name" type="text" placeholder="Jane Smith" autoComplete="name"
                        className="cs-input" {...register("name", { required: "Name is required" })} />
                </div>

                {/* Email */}
                <div className="mb-4">
                    {fieldLabel("Email address")}
                    <input id="reg-email" type="email" placeholder="you@company.com" autoComplete="email"
                        className="cs-input" {...register("email", { required: "Email is required" })} />
                </div>

                {/* Password */}
                <div className="mb-4">
                    {fieldLabel("Password")}
                    <div
                        style={{
                            display: "flex", alignItems: "center", overflow: "hidden", borderRadius: "0.5rem",
                            border: `1px solid ${passwordWeak ? "var(--danger)" : "var(--border)"}`,
                            background: "var(--bg-secondary)",
                        }}
                    >
                        <input id="reg-password" type={showPassword ? "text" : "password"}
                            placeholder="Min. 8 characters" autoComplete="new-password"
                            style={{ flex: 1, background: "transparent", border: "none", padding: "0.625rem 0.875rem", fontSize: "0.875rem", color: "var(--text-primary)", outline: "none" }}
                            {...register("password", { required: true, minLength: 8 })} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                            style={{ padding: "0 0.875rem", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {passwordWeak && <p style={{ color: "var(--danger)", fontSize: "0.75rem", marginTop: "0.25rem" }}>Password must be at least 8 characters.</p>}
                </div>

                {/* Confirm */}
                <div className="mb-6">
                    {fieldLabel("Confirm password")}
                    <div
                        style={{
                            display: "flex", alignItems: "center", overflow: "hidden", borderRadius: "0.5rem",
                            border: `1px solid ${passwordMismatch ? "var(--danger)" : "var(--border)"}`,
                            background: "var(--bg-secondary)",
                        }}
                    >
                        <input id="reg-confirm" type={showConfirm ? "text" : "password"}
                            placeholder="Re-enter your password" autoComplete="new-password"
                            style={{ flex: 1, background: "transparent", border: "none", padding: "0.625rem 0.875rem", fontSize: "0.875rem", color: "var(--text-primary)", outline: "none" }}
                            {...register("confirmPassword", { required: true })} />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                            style={{ padding: "0 0.875rem", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}>
                            {showConfirm ? "Hide" : "Show"}
                        </button>
                    </div>
                    {passwordMismatch && <p style={{ color: "var(--danger)", fontSize: "0.75rem", marginTop: "0.25rem" }}>Passwords do not match.</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="cs-btn-primary w-full justify-center">
                    {isSubmitting ? "Creating Account…" : "Create Account"}
                </button>
            </form>

            <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                By creating an account you agree to our{" "}
                <Link to="/terms" style={{ color: "var(--text-secondary)", textDecoration: "underline" }}>Terms</Link>
                {" "}and{" "}
                <Link to="/privacy" style={{ color: "var(--text-secondary)", textDecoration: "underline" }}>Privacy Policy</Link>.
            </p>

            <div className="mt-4">
                <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                    Already have an account?
                </p>
                <Link to="/login" className="cs-btn-secondary w-full justify-center" style={{ textDecoration: "none", display: "flex" }}>
                    Sign in instead
                </Link>
            </div>
        </div>
    );
}
