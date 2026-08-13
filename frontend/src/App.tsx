import { useEffect, useState } from "react";
import "./App.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/reducerSlice";

const AUTH_ROUTES = ["/login", "/register"];

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(
                    "http://localhost:4000/api/v1/user/me",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const data = await response.json();

                console.log("ME RESPONSE:", response.status, data);

                if (!response.ok) {
                    throw new Error(
                        data.message || "Not authenticated"
                    );
                }

                // User is authenticated
                dispatch(login(data.data));

                // If user is on login/register,
                // redirect to home
                if (AUTH_ROUTES.includes(location.pathname)) {
                    navigate("/");
                }
            } catch (error) {
                console.log("Authentication failed:", error);

                dispatch(logout());

                // Only redirect if user is on a protected route
                if (!AUTH_ROUTES.includes(location.pathname)) {
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

        // IMPORTANT:
        // Do not put location.pathname in dependency array.
    }, [dispatch, navigate]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0a0d17]">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-indigo-400" />
            </div>
        );
    }

    const isAuthRoute = AUTH_ROUTES.includes(location.pathname);

    return (
        <>
            {!isAuthRoute && <Header />}

            <main>
                <Outlet />
            </main>

            {!isAuthRoute && <Footer />}
        </>
    );
}

export default App;