import {
  getAllBasisPengetahuan,
  getBasisPengetahuanByKode,
  checkBasisPengetahuan,
  getBasisPengetahuanByData,
  createBasisPengetahuan,
  updateBasisPengetahuanPenyakit,
  updateBasisPengetahuanGejala,
  deleteBasisPengetahuan,
  deleteBasisPengetahuanById,
} from "../services/BasisPengetahuanService.js";

export const getAllBasisPengetahuanController = async (req, res) => {
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

export const searchBasisPengetahun = async (req, res) => {
  try {
    const basisPengetahuan = await getBasisPengetahuanByData(req.query.data);
    res.status(basisPengetahuan.status).json(basisPengetahuan.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBasisPengetahuanController = async (req, res) => {
  try {
    const data = req.body;
    const { check } = req.query;

    const checkBp = await checkBasisPengetahuan(data[0].kode_basis_pengetahuan);

    if (checkBp && check === "true") {
      res.status(400).json({ message: "Kode Basis Pengetahuan sudah Ada" });
      return;
    }

    const basisPengetahuan = await createBasisPengetahuan(data);
    res
      .status(basisPengetahuan.status)
      .json({ message: basisPengetahuan.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBasisPengetahuanPenyakitController = async (req, res) => {
  try {
    const data = req.body;
    const basisPengetahuan = await updateBasisPengetahuanPenyakit(data);
    res
      .status(basisPengetahuan.status)
      .json({ message: basisPengetahuan.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBasisPengetahuanGejalaController = async (req, res) => {
  try {
    const data = req.body;
    const basisPengetahuan = await updateBasisPengetahuanGejala(data);
    res
      .status(basisPengetahuan.status)
      .json({ message: basisPengetahuan.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBasisPengetahuanController = async (req, res) => {
  try {
    let kode_bp = req.params.kode_bp;
    await deleteBasisPengetahuan(kode_bp);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGejalaFromBasisPengetahuanController = async (req, res) => {
  try {
    let id = req.params.id;
    await deleteBasisPengetahuanById(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
