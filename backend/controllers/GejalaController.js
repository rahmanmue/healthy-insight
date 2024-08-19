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
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const gejala = await getAllGejala(page, pageSize);
    res.status(gejala.status).json(gejala);
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
    const data = req.query.data;
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const gejala = await getGejalaByData(data, page, pageSize);
    res.status(gejala.status).json(gejala);
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
