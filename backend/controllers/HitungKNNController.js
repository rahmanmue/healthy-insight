import { getHasilPerhitunganByKodeCase } from "../services/CaseService.js";

export const getHasilHitungKNN = async (req, res) => {
  try {
    const data = await getHasilPerhitunganByKodeCase(req.params.kode_case);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
