import { getHasilPerhitunganKNN } from "../services/HitungKNNService.js";
import { getGejalaFromCase } from "../services/CaseService.js";

export const getHasilHitungKNN = async (req, res) => {
  try {
    const gejala = await getGejalaFromCase(req.params.kode_case);
    const { results } = await getHasilPerhitunganKNN(gejala);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
