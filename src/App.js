import { useState, useEffect } from "react";
import AppRoutes from "./routes";
import './App.css';

function App() {
  const [userObject, setUserObject] = useState({});

  const getItemFromLocalStorage = () => {
    const localUser = localStorage.getItem("user") ?? {};
    setUserObject(JSON.parse(localUser));
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({ name: "username", password: 12345 }));
    getItemFromLocalStorage();
  }, [])

  return (
    <div className="App">
      <AppRoutes userObject={userObject} />
    </div>
  );
}

export default App;
