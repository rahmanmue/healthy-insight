import {
  getAllPenyakit,
  getPenyakitById,
  createPenyakit,
  updatePenyakit,
  deletePenyakit,
} from "../services/PenyakitService.js";

export const getPenyakit = async (req, res) => {
  try {
    const penyakit = await getAllPenyakit();
    res.status(penyakit.status).json(penyakit.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPenyakitByIdController = async (req, res) => {
  try {
    const penyakit = await getPenyakitById(req.params.id);
    res.status(penyakit.status).json(penyakit.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPenyakitController = async (req, res) => {
  try {
    const penyakit = await createPenyakit(req.body);
    res.status(penyakit.status).json(penyakit.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePenyakitController = async (req, res) => {
  try {
    const penyakit = await updatePenyakit(req.body);
    res.status(penyakit.status).json(penyakit.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePenyakitController = async (req, res) => {
  try {
    const penyakit = await deletePenyakit(req.params.id);
    res.status(penyakit.status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
