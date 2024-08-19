import axiosInstance from "./api";

class CaseService {
  async getAll(page = 1, pageSize = 5) {
    const response = await axiosInstance.get(
      `/cases?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }

  async getCaseByKodeCase(code) {
    const response = await axiosInstance.get(`/cases/${code}`);
    return response.data;
  }

  async searchCase(name, page = 1, pageSize = 5) {
    const response = await axiosInstance.get(
      `/cases/search?name=${name}&page=${page}&pageSize=${pageSize}`
    );
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
