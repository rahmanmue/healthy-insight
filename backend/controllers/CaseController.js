import {
  getAllCase,
  getCaseByKodeCase,
  getCaseByData,
  createCase,
  deleteCase,
} from "../services/CaseService.js";

export const getAllCases = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const cases = await getAllCase(page, pageSize);
    res.status(cases.status).json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCaseByKodeCaseController = async (req, res) => {
  try {
    const cases = await getCaseByKodeCase(req.params.kode_case);
    res.status(cases.status).json(cases.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchCase = async (req, res) => {
  try {
    const data = req.query.name;
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const cases = await getCaseByData(data, page, pageSize);
    res.status(cases.status).json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCaseController = async (req, res) => {
  try {
    const cases = await createCase(req.body);
    res.status(cases.status).json(cases.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const deleteCaseController = async (req, res) => {
  try {
    const cases = await deleteCase(req.params.kode_case);
    res.sendStatus(cases.status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
