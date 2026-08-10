import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import Layout from "./components/HeaderFooterLayout/Layout";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Auth routes — no Header / Footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Public routes — with Header and Footer */}
      <Route path="/" element={<Layout />}>
        {/* add public pages here, e.g. <Route index element={<Home />} /> */}
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
