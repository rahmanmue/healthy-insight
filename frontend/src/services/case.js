import axiosInstance from "./api";

class CaseService {
  async getAll() {
    const response = await axiosInstance.get("/cases");
    return response.data;
  }

  async getCaseByKodeCase(code) {
    const response = await axiosInstance.get(`/cases/${code}`);
    return response.data;
  }

  async searchCase(name) {
    const response = await axiosInstance.get(`/cases/search?name=${name}`);
    return response.data;
  }

  async getKnnByKodeCase(code) {
    const response = await axiosInstance.get(`/case/knn/${code}`);
    return response.data;
  }

  async createCase(data) {
    const response = await axiosInstance.post("/cases", data);
    return response.data;
  }

  async deleteCaseByKodeCase(code) {
    const response = await axiosInstance.delete(`/cases/${code}`);
    return response.data;
  }
}

export default CaseService;
