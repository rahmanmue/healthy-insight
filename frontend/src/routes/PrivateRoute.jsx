import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContenxt } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ roles }) => {
  const { role } = useContext(AuthContenxt);
  try {
    const isAuthenticated = localStorage.getItem("token");
    if (isAuthenticated) {
      const decoded = jwtDecode(isAuthenticated);
      if (decoded.exp * 1000 < Date.now() || !roles.includes(role)) {
        localStorage.removeItem("token");
        return <Navigate to="/login" />;
      }

      return <Outlet />;
    }
    return <Navigate to="/login" />;
  } catch (error) {
    console.log(error);
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
