import axiosInstance from "./api";

class SolusiService {
  async getAll() {
    const response = await axiosInstance.get("/solusi");
    return response.data;
  }

  async getSolusiById(id) {
    const response = await axiosInstance.get(`/solusi/${id}`);
    return response.data;
  }

  async searchSolusi(data) {
    const response = await axiosInstance.get(`/solusi/search?data=${data}`);
    return response.data;
  }

  async createSolusi(data) {
    const response = await axiosInstance.post("/solusi", data);
    return response.data;
  }

  async updateSolusi(data) {
    const response = await axiosInstance.put("/solusi", data);
    return response.data;
  }

  async deleteSolusi(id) {
    const response = await axiosInstance.delete(`/solusi/${id}`);
    return response.data;
  }
}

export default SolusiService;
