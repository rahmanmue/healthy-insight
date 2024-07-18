import {
  getAllCase,
  getCaseByNoKasus,
  createCase,
  updateCase,
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

export const getCaseByNoKasusController = async (req, res) => {
  try {
    const cases = await getCaseByNoKasus(req.params.noKasus);
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
  }
};

export const updateCaseController = async (req, res) => {
  try {
    const cases = await updateCase(req.body);
    res.status(cases.status).json(cases.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCaseController = async (req, res) => {
  try {
    const cases = await deleteCase(req.params.id);
    res.status(cases.status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
