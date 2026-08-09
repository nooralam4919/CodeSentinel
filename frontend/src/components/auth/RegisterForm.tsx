import { useState } from "react";
import type { FormEvent } from "react";

type RegisterFormProps = {
    registerFunction: (
        name: string,
        email: string,
        password: string
    ) => Promise<void>;
};

export default function RegisterForm({
    registerFunction,
}: RegisterFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setError("");

        if (!name.trim() || !email.trim() || !password.trim()) {
            setError("Please fill in all fields.");
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
        <form onSubmit={handleSubmit}>
            <h1 className="mb-6 text-2xl font-bold">
                Create Account
            </h1>

            {error && (
                <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="mb-4">
                <label className="mb-2 block font-medium">
                    Name
                </label>

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                />
            </div>

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
                        className="flex-1 p-3 outline-none"
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
                {loading ? "Creating Account..." : "Register"}
            </button>
        </form>
    );
}

