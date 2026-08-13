import { useDispatch } from "react-redux";
import { login } from "../store/reducerSlice";
import { useNavigate } from "react-router-dom";

export function useAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

        console.log(data);

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        // data.data.user is the user object returned by the backend
        // Passing the full `data` object would store the entire API
        // response shape in Redux instead of just the user
        dispatch(login(data.data.user));

        navigate("/");

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

        console.log("user is trying to register", data);

        if (!response.ok) {
            throw new Error(
                data.message || "Registration failed"
            );
        }

        // same as login — dispatch only the user object, not the full response
        dispatch(login(data.data));

        navigate("/");

        return data;
    };

    return {
        loginUser,
        registerUser,
    };
}