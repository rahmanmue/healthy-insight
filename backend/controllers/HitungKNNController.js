import { getHasilPerhitunganKNN } from "../services/HitungKNNService.js";
import { getGejalaFromCase } from "../services/CaseService.js";
import { getKodeBpUniqueByKodeCase } from "../services/CaseService.js";

export const getHasilHitungKNN = async (req, res) => {
  try {
    const gejala = await getGejalaFromCase(req.params.kode_case);
    const all_kode_case = await getKodeBpUniqueByKodeCase(req.params.kode_case);
    const { results } = await getHasilPerhitunganKNN(gejala);

    //filter results by all_kode_case
    let data = [];
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < all_kode_case.length; j++) {
        if (
          results[i].kode_basis_pengetahuan ===
          all_kode_case[j].kode_basis_pengetahuan
        ) {
          data.push(results[i]);
        }
      }
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
