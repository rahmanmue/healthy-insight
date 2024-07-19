import {
  getAllBasisPengetahuan,
  getBasisPengetahuanByKode,
  getBasisPengetahuanById,
  createBasisPengetahuan,
  updateBasisPengetahuan,
  deleteBasisPengetahuan,
} from "../services/BasisPengetahuanService.js";

export const getBasisPengetahuan = async (req, res) => {
  try {
    const basisPengetahuan = await getAllBasisPengetahuan();
    res.status(basisPengetahuan.status).json(basisPengetahuan.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBasisPengetahuanByKode = async (req, res) => {
  try {
    const basisPengetahuan = await getBasisPengetahuanByKode(req.params.kode);
    res.status(basisPengetahuan.status).json(basisPengetahuan.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBasisPengetahuanByIdController = async (req, res) => {
  try {
    const basisPengetahuan = await getBasisPengetahuanById(req.params.id);
    res.status(basisPengetahuan.status).json(basisPengetahuan.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBasisPengetahuanController = async (req, res) => {
  try {
    const basisPengetahuan = await createBasisPengetahuan(req.body);
    res.status(basisPengetahuan.status).json(basisPengetahuan.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBasisPengetahuanController = async (req, res) => {
  try {
    const basisPengetahuan = await updateBasisPengetahuan(req.body);
    res.status(basisPengetahuan.status).json(basisPengetahuan.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBasisPengetahuanController = async (req, res) => {
  try {
    const basisPengetahuan = await deleteBasisPengetahuan(req.params.id);
    res.status(basisPengetahuan.status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
