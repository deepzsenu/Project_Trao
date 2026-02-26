import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setLoading(true);
    const res = await loginUser(data);
    localStorage.setItem("token", res.token);
    setToken(res.token);
    setLoading(false);
  };

  const register = async (data) => {
    setLoading(true);
    await registerUser(data);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);