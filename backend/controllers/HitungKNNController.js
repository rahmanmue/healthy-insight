import { getHasilPerhitunganKNN } from "../services/HitungKNNService.js";

export const createHitungKNNController = async (req, res) => {
  try {
    const result = await getHasilPerhitunganKNN(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
