/* eslint-disable no-useless-catch */
import { createContext, useState } from "react";
import AuthService from "../services/auth";
import axiosInstance from "../services/api";
import { jwtDecode } from "jwt-decode";

const AuthContenxt = createContext();

const auth = new AuthService();

const AuthContextProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const login = async ({ email, password }) => {
    try {
      const { accessToken } = await auth.login(email, password);

      localStorage.setItem("token", accessToken);
      setToken(accessToken);
      console.log(token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      // decode token
      const decoded = jwtDecode(accessToken);
      localStorage.setItem("role", decoded.role);
      setRole(decoded.role);

      return decoded.role;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    axiosInstance.defaults.headers.common["Authorization"] = null;
    localStorage.removeItem("token");
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
    <AuthContenxt.Provider value={{ login, logout, register, role }}>
      {children}
    </AuthContenxt.Provider>
  );
};

export { AuthContenxt, AuthContextProvider };
