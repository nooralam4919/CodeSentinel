import LoginForm from "../../components/auth/LoginForm.tsx";

export default function Login() {
    const handleLogin = async (email: string, password: string) => {
        console.log("Email:", email);
        console.log("Password:", password);

        const response = await fetch("http://localhost:4000//api/v1/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        console.log("Login successful:", data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <LoginForm loginFunction={handleLogin} />
        </div>
    );
}