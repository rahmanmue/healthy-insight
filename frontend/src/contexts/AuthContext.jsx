/* eslint-disable no-useless-catch */
import { createContext, useState } from "react";
import AuthService from "../services/auth";
import axiosInstance from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContenxt = createContext();

const auth = new AuthService();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const login = async ({ email, password }) => {
    try {
      const { accessToken } = await auth.login(email, password);
      localStorage.setItem("token", accessToken);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      // decode token
      const decoded = jwtDecode(accessToken);
      localStorage.setItem("role", decoded.role);
      setRole(decoded.role);

      localStorage.setItem("userId", decoded.userId);
      setUserId(decoded.userId);

      return decoded.role;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    axiosInstance.defaults.headers.common["Authorization"] = null;
    setRole(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const register = async (data) => {
    try {
      const response = await auth.register(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContenxt.Provider value={{ login, logout, register, role, userId }}>
      {children}
    </AuthContenxt.Provider>
  );
};

export { AuthContenxt, AuthContextProvider };
