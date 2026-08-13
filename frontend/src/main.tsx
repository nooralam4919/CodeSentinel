import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import store from "./store/store.tsx";
import App from "./App.tsx";
import HomePage from "./pages/Home/HomePage.tsx";
import Login from "./pages/Auth/Login.tsx";
import Register from "./pages/Auth/Register.tsx";
import Protection from "./components/AuthtProtection.tsx";
import Dashboard from "./components/layout/DashboardLayout.tsx";

// BUG FIX: Provider must wrap the entire app here so that App.tsx can safely
// call useDispatch() — hooks only work inside descendants of <Provider>.
// Having Provider inside App.tsx's return() was too late; the hook ran first.

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <Protection authentication={true}>
                        <HomePage />
                    </Protection>
                ),
            },
            {
                path: "/login",
                element: (
                    <Protection authentication={false}>
                        <Login />
                    </Protection>
                ),
            },
            {
                path: "/register",
                element: (
                    <Protection authentication={false}>
                        <Register />
                    </Protection>
                ),
            },
            {
                path: '/dashboard',
                element: (
                    <Protection authentication={true}>
                        <Dashboard />
                    </Protection>
                )
            }
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
