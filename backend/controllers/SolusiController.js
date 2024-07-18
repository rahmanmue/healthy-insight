import {
  getAllSolusi,
  getSolusiById,
  createSolusi,
  updateSolusi,
  deleteSolusi,
} from "../services/SolusiService.js";

export const getAllSolusiController = async (req, res) => {
  try {
    const solusi = await getAllSolusi();
    res.status(200).json(solusi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSolusiByIdController = async (req, res) => {
  try {
    const solusi = await getSolusiById(req.params.id);
    res.status(200).json(solusi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSolusiController = async (req, res) => {
  try {
    const solusi = await createSolusi(req.body);
    res.status(200).json(solusi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSolusiController = async (req, res) => {
  try {
    const solusi = await updateSolusi(req.body);
    res.status(200).json(solusi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSolusiController = async (req, res) => {
  try {
    const solusi = await deleteSolusi(req.params.id);
    res.status(200).json(solusi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
