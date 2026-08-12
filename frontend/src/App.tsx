import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/reducerSlice";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/user/me", {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("User is not authenticated");
        }

        return res.json();
      })
      .then((userInfo) => {
        dispatch(login(userInfo.data));
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;