import axiosInstance from "./api";

class UserService {
  async getAll() {
    const response = await axiosInstance.get("/user");
    return response.data;
  }

  async getUserById(id) {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
  }

  async updateUser(data) {
    const response = await axiosInstance.patch(`/user`, data);
    return response.data;
  }

  async deleteUser(id) {
    const response = await axiosInstance.delete(`/user/${id}`);
    return response.data;
  }
}

export default UserService;
