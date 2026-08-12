import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
// import { Provider } from "react-redux";

import store from "./store/store.tsx";
import "./index.css";

import App from "./App.tsx";
import HomePage from "./pages/Home/HomePage.tsx";
import Login from "./pages/Auth/Login.tsx";
import Register from "./pages/Auth/Register.tsx";
import AuthLayoutProtection from "./components/AuthtProtection.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <AuthLayoutProtection authentication={true}>
                        <HomePage />
                    </AuthLayoutProtection>
                ),
            },
            {
                path: "/login",
                element: (
                    <AuthLayoutProtection authentication={false}>
                        <Login />
                    </AuthLayoutProtection>
                ),
            },
            {
                path: "/register",
                element: (
                    <AuthLayoutProtection authentication={false}>
                        <Register />
                    </AuthLayoutProtection>
                ),
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {/* <Provider store={store}> */}
            <RouterProvider router={router} />
        {/* </Provider> */}
    </StrictMode>
);