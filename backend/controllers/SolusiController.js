import {
  getAllSolusi,
  getSolusiById,
  getSolusiByData,
  createSolusi,
  updateSolusi,
  deleteSolusi,
} from "../services/SolusiService.js";

export const getAllSolusiController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const solusi = await getAllSolusi(page, pageSize);
    res.status(solusi.status).json(solusi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSolusiByIdController = async (req, res) => {
  try {
    const solusi = await getSolusiById(req.params.id);
    res.status(solusi.status).json(solusi.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchSolusi = async (req, res) => {
  try {
    const data = req.query.data;
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const solusi = await getSolusiByData(data, page, pageSize);
    res.status(solusi.status).json(solusi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSolusiController = async (req, res) => {
  try {
    const solusi = await createSolusi(req.body);
    res.status(solusi.status).json({ message: solusi.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSolusiController = async (req, res) => {
  try {
    const solusi = await updateSolusi(req.body);
    res.status(solusi.status).json({ message: solusi.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSolusiController = async (req, res) => {
  try {
    const solusi = await deleteSolusi(req.params.id);
    res.sendStatus(solusi.status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
