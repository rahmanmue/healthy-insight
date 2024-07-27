import axiosInstance from "./api";

class BasisPengetahuanService {
  async getAll() {
    const response = await axiosInstance.get("/basis-pengetahuan");
    return response.data;
  }

  async getDetailBasisPengetahuan(code) {
    const response = await axiosInstance.get(`/basis-pengetahuan/${code}`);
    return response.data;
  }

  async searchBasisPengetahuan(data) {
    const response = await axiosInstance.get(
      `/basis-pengetahuan/search?data=${data}`
    );
    return response.data;
  }

  async createBasisPengetahuan(data, check = true) {
    const response = await axiosInstance.post(
      `/basis-pengetahuan?check=${check}`,
      data
    );
    return response.data;
  }

  async updatePenyakitBp(data) {
    const response = await axiosInstance.patch(
      "/basis-pengetahuan/penyakit",
      data
    );
    return response.data;
  }

  async updateGejalaBp(data) {
    const response = await axiosInstance.patch(
      "/basis-pengetahuan/gejala",
      data
    );
    return response.data;
  }

  async deleteGejalaBp(id) {
    const response = await axiosInstance.delete(
      `/basis-pengetahuan/gejala/${id}`
    );
    return response.data;
  }

  async deleteBpByKodeBp(code) {
    const response = await axiosInstance.delete(`/basis-pengetahuan/${code}`);
    return response.data;
  }
}

export default BasisPengetahuanService;
