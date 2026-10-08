import { useEffect, useState } from "react";
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
                    { method: "GET", credentials: "include" }
                );
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || "Not authenticated");
                dispatch(login(data.data));
                if (AUTH_ROUTES.includes(location.pathname)) navigate("/");
            } catch {
                dispatch(logout());
                if (!AUTH_ROUTES.includes(location.pathname)) navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [dispatch, navigate]);

    if (loading) {
        return (
            <div
                style={{ background: "var(--bg-base)" }}
                className="flex min-h-screen items-center justify-center"
            >
                <span className="cs-spinner" />
            </div>
        );
    }

    const isAuthRoute = AUTH_ROUTES.includes(location.pathname);

    return (
        <>
            {!isAuthRoute && <Header />}
            <main><Outlet /></main>
            {!isAuthRoute && <Footer />}
        </>
    );
}

export default App;
