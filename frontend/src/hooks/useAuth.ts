import { useDispatch } from "react-redux";
import { login } from "../store/reducerSlice";

export function useAuth() {
    const dispatch = useDispatch();

    // Login
    const loginUser = async (
        email: string,
        password: string
    ) => {
        const response = await fetch(
            "http://localhost:4000/api/v1/user/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        dispatch(login(data));

        return data;
    };

    // Register
    const registerUser = async (
        name: string,
        email: string,
        password: string
    ) => {
        const response = await fetch(
            "http://localhost:4000/api/v1/user/register",
            {
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

        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }
        dispatch(login(data));
        return data;
    };

    return {
        loginUser,
        registerUser,
    };
}