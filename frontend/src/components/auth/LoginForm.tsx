import { useState } from "react";
import type { FormEvent } from "react";

type LoginFormProps = {
    loginFunction: (email: string, password: string) => Promise<void>;
};

export default function LoginForm({ loginFunction }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            await loginFunction(email, password);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Login failed.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md">
            <h1 className="mb-6 text-3xl font-bold">
                Sign In
            </h1>

            {error && (
                <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="mb-4">
                <label className="mb-2 block font-medium">
                    Email
                </label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                />
            </div>

            <div className="mb-6">
                <label className="mb-2 block font-medium">
                    Password
                </label>

                <div className="flex rounded-lg border">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex-1 rounded-lg p-3 outline-none"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="px-4 text-sm font-medium"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-900 disabled:opacity-60"
            >
                {loading ? "Signing In..." : "Sign In"}
            </button>
        </form>
    );
}