import axiosInstance from "./api";

class GejalaService {
  async getAll(page, pageSize = 0) {
    const response = await axiosInstance.get(
      `/gejala?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }

  async getGejalaById(id) {
    const response = await axiosInstance.get(`/gejala/${id}`);
    return response.data;
  }

  async searchGejala(data, page = 1, pageSize = 5) {
    const response = await axiosInstance.get(
      `/gejala/search?data=${data}&page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }

  async createGejala(data) {
    const response = await axiosInstance.post("/gejala", data);
    return response.data;
  }

  async updateGejala(data) {
    const response = await axiosInstance.put("/gejala", data);
    return response.data;
  }

  async deleteGejala(id) {
    const response = await axiosInstance.delete(`/gejala/${id}`);
    return response.data;
  }
}

export default GejalaService;
