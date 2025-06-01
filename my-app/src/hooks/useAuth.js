import { useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");

  const login = async (user) => {
    const res = await fetch("https://backenddeployreactactivities-production.up.railway.app/mongo/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    const data = await res.json();
    setToken(data.token);
    setIsAuthenticated(data.isLogin);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
  };

  const register = async (user) => {
    const res = await fetch("https://backenddeployreactactivities-production.up.railway.app/mongo/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (data.success) alert("Registro exitoso");
    else alert("Error: " + data.message);
  };

  return { isAuthenticated, token, login, logout, register };
};
