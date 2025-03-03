import React, { useEffect, useState } from "react";
import AppLayout from "./AppLayout";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(!!authStatus);
      setIsLoading(false);
    };

    // Check auth status initially
    checkAuthStatus();

    // Add event listener for storage changes
    window.addEventListener("storage", checkAuthStatus);

    window.addEventListener("authChange", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("authChange", checkAuthStatus);
    };
  }, []);

  if (isLoading) {
    return null;
  }

  return <AppLayout />;
}

export default App;
