import axiosInstance from "./api";

class Auth {
  async login(email, password) {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  }

  async register(data) {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  }
}

export default Auth;
