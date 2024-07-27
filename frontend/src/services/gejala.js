import axiosInstance from "./api";

class GejalaService {
  async getAll() {
    const response = await axiosInstance.get("/gejala");
    return response.data;
  }

  async getGejalaById(id) {
    const response = await axiosInstance.get(`/gejala/${id}`);
    return response.data;
  }

  async searchGejala(data) {
    const response = await axiosInstance.get(`/gejala/search?data=${data}`);
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
