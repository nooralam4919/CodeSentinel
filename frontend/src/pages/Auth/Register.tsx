import RegisterForm from "../../components/auth/RegisterForm.tsx";

export default function Register() {
    const handleRegister = async (
        name: string,
        email: string,
        password: string
    ) => {
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Password:", password);

        const response = await fetch("http://localhost:4000/api/v1/user/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            }
        );
        const data = await response.json();
        console.log("this is comming from the backend()", data)
        console.log("this is comming from the backend()", data.statusCode)
        console.log("this is comming from the backend()", data.message)
        console.log("this is comming from the backend()", data.error[0])
        
        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }

        console.log("fuckyour")

        console.log("Registration successful:", data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <RegisterForm registerFunction={handleRegister} />
        </div>
    );
}

