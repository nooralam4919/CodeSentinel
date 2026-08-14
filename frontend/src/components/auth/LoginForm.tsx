import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../common/Button";
import Input from "../common/Input";
import GithubLogin from "../../pages/Auth/GithubLogIn";

interface LoginFormProps {
    loginFunction: (email: string, password: string) => Promise<void>;
}

interface LoginFormData {
    email: string;
    password: string;
}

export default function LoginForm({ loginFunction }: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const { register, handleSubmit, formState: { errors, isSubmitting },} = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        setError("");

        try {
            await loginFunction(data.email, data.password);
        } catch (err: unknown) {
            setError(
                err instanceof Error ? err.message : "Login failed."
            );
        }
    };

    return (
        <div className="mx-auto w-full max-w-[400px]">

            {/* Heading */}
            <div className="mb-8">
                <h1 className="text-[22px] font-semibold tracking-tight text-white">
                    Sign in to CodeSentinel
                </h1>

                <p className="mt-1.5 text-sm text-slate-500">
                    Welcome back. Enter your credentials to continue.
                </p>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            {/* GitHub OAuth */}
            <GithubLogin />

            {/* Divider */}
            <div className="mb-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/[0.06]" />
                <span className="text-xs text-slate-600">or continue with email</span>
                <span className="h-px flex-1 bg-white/[0.06]" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                {/* Email */}
                <div className="mb-4">
                    <Input
                        id="login-email"
                        label="Email address"
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />

                    {errors.email && (
                        <p className="mt-1 text-xs text-red-400">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="mb-6">

                    <div className="mb-1.5 flex items-center justify-between">
                        <label
                            htmlFor="login-password"
                            className="text-sm font-medium text-slate-300"
                        >
                            Password
                        </label>

                        <Link
                            to="/forgot-password"
                            className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <div className="flex items-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20">

                        <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            className="flex-1 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-slate-600"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />

                        <Button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="px-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-200"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </Button>

                    </div>

                    {errors.password && (
                        <p className="mt-1 text-xs text-red-400">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting
                        ? "Signing in..."
                        : "Sign In"}
                </Button>

            </form>

            {/* Register */}
            <div className="mt-4">
                <p className="mb-3 text-center text-xs text-slate-600">
                    Don't have an account?
                </p>

                <Link
                    to="/register"
                    className="flex w-full items-center justify-center rounded-lg border border-white/10 py-2.5 text-sm font-medium text-slate-300 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
                >
                    Create a free account
                </Link>
            </div>

        </div>
    );
}