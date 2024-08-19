import axiosInstance from "./api";

class SolusiService {
  async getAll(page = 1, pageSize = 5) {
    const response = await axiosInstance.get(
      `/solusi?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }

  async getSolusiById(id) {
    const response = await axiosInstance.get(`/solusi/${id}`);
    return response.data;
  }

  async searchSolusi(data, page = 1, pageSize = 5) {
    const response = await axiosInstance.get(
      `/solusi/search?data=${data}&page=${page}&pageSize=${pageSize}`
    );
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
