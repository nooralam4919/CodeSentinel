import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { Provider } from "react-redux";

import "./index.css";

import store from "./store/store";
import App from "./App";

import HomePage from "./pages/Home/HomePage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import Protection from "./components/AuthtProtection";
import Dashboard from "./components/layout/DashboardLayout";

import Features from "./pages/Features/Features";
import Docs from "./pages/Docs/Docs";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,

        children: [

            // HOME
            {
                path: "/",
                element: (
                    <Protection authentication={true}>
                        <HomePage />
                    </Protection>
                ),
            },

            // FEATURES
            {
                path: "/features",
                element: <Features />,
            },

            // DOCS
            {
                path: "/docs",
                element: <Docs />,
            },

            // LOGIN
            {
                path: "/login",
                element: (
                    <Protection authentication={false}>
                        <Login />
                    </Protection>
                ),
            },

            // REGISTER
            {
                path: "/register",
                element: (
                    <Protection authentication={false}>
                        <Register />
                    </Protection>
                ),
            },

            // DASHBOARD
            {
                path: "/dashboard",
                element: (
                    <Protection authentication={true}>
                        <Dashboard />
                    </Protection>
                ),
            },

        ],
    },
]);


createRoot(
    document.getElementById("root")!
).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);