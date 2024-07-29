import {
  getAllCase,
  getCaseByKodeCase,
  getCaseByData,
  createCase,
  deleteCase,
} from "../services/CaseService.js";

export const getAllCases = async (req, res) => {
  try {
    const cases = await getAllCase();
    res.status(cases.status).json(cases.data);
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
    const cases = await getCaseByData(req.query.name);
    res.status(cases.status).json(cases.data);
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
