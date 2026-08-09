import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Auth/Login.tsx";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, []);

  return ( 
     <>
     <Login />
     </>
  );
}

export default App;