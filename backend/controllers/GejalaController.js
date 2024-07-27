import {
  getAllGejala,
  getGejalaById,
  getGejalaByData,
  updateGejala,
  deleteGejala,
  createGejala,
} from "../services/GejalaServices.js";

export const getGejala = async (req, res) => {
  try {
    const gejala = await getAllGejala();
    res.status(gejala.status).json(gejala.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGejalaByIdController = async (req, res) => {
  try {
    const gejala = await getGejalaById(req.params.id);
    res.status(gejala.status).json(gejala.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchGejala = async (req, res) => {
  try {
    const gejala = await getGejalaByData(req.query.data);
    res.status(gejala.status).json(gejala.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGejalaController = async (req, res) => {
  try {
    const gejala = await createGejala(req.body);
    res.status(gejala.status).json(gejala.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGejalaController = async (req, res) => {
  try {
    const gejala = await updateGejala(req.body);
    res.status(gejala.status).json(gejala.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGejalaController = async (req, res) => {
  try {
    const gejala = await deleteGejala(req.params.id);
    res.sendStatus(gejala.status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
