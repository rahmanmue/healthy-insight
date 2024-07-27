import axiosInstance from "./api";

class PenyakitService {
  async getAll() {
    const response = await axiosInstance.get("/penyakit");
    return response.data;
  }

  async getPenyakitById(id) {
    const response = await axiosInstance.get(`/penyakit/${id}`);
    return response.data;
  }

  async searhPenyakit(data) {
    const response = await axiosInstance.get(`/penyakit/search?data=${data}`);
    return response.data;
  }

  async createPenyakit(data) {
    const response = await axiosInstance.post("/penyakit", data);
    return response.data;
  }

  async updatePenyakit(data) {
    const response = await axiosInstance.put("/penyakit", data);
    return response.data;
  }

  async deletePenyakit(id) {
    const response = await axiosInstance.delete(`/penyakit/${id}`);
    return response.data;
  }
}

export default PenyakitService;
