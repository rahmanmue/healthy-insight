import BasisPengetahuan from "../models/BasisPengetahuanModel.js";
import Gejala from "../models/GejalaModel.js";
import Solusi from "../models/SolusiModel.js";
import Penyakit from "../models/PenyakitModel.js";
import crypto from "crypto";

const getInputData = async (data) => {
  data.forEach(async (item) => {
    const nilai_bobot = await getNilaiBobotGejala(item);
    item.nilai_bobot = nilai_bobot;
  });
  return data;
};

const getBasisPengetahuanPenyakit = async () => {
  const penyakit = await BasisPengetahuan.findAll({
    attributes: ["kode_basis_pengetahuan", "id_penyakit"],
    group: ["kode_basis_pengetahuan"],
    include: [
      {
        model: Penyakit,
        attributes: ["id", "penyakit"],
      },
    ],
  });
  return penyakit;
};

const getBasisPengetahuanGejalaByPenyakit = async (data) => {
  const gejalaPenyakit = await BasisPengetahuan.findAll({
    attributes: ["id_gejala"],
    where: {
      id_penyakit: data.id_penyakit,
    },
  });

  return gejalaPenyakit;
};

const getNilaiBobotGejala = async (data) => {
  const gejala = await Gejala.findOne({
    where: {
      id: data.id_gejala,
    },
    attributes: ["nilai_bobot"],
  });
  return gejala.nilai_bobot;
};

const getIdSolusi = async (data) => {
  const { penyakit } = data;
  const solusi_by_penyakit = await Solusi.findAll({
    where: {
      id_penyakit: penyakit.id,
    },
  });

  const diagnosis = parseInt(data.nilai_diagnosis * 100);
  let id_solusi;
  let solusi;
  solusi_by_penyakit.forEach((item) => {
    if (
      diagnosis >= item.persentase_awal &&
      diagnosis <= item.persentase_akhir
    ) {
      id_solusi = item.id;
      solusi = item.solusi;
    }
  });

  return { id_solusi, solusi };
};

export const getHasilPerhitunganKNN = async (dataGejala, dataInput = {}) => {
  try {
    // setiap gejala dicocokan dengan basis pengetahuan
    const data = await getInputData(dataGejala);

    // 1. mencari basis pengetahuan penyakit
    const basis_pengetahuan = await getBasisPengetahuanPenyakit();

    const kode_case = `CS-${crypto
      .randomBytes(2)
      .toString("hex")}`.toUpperCase();

    const results = await Promise.all(
      basis_pengetahuan.map(async (item) => {
        const gejala_penyakit = await getBasisPengetahuanGejalaByPenyakit(item);
        const total_gejala = gejala_penyakit.length;

        const { total_bobot, total_similarity_gejala, match_count } =
          await gejala_penyakit.reduce(
            async (accPromise, gejala) => {
              const acc = await accPromise;
              acc.total_bobot += await getNilaiBobotGejala(gejala);

              data.forEach((element) => {
                if (element.id_gejala === gejala.id_gejala) {
                  acc.total_similarity_gejala += element.nilai_bobot;
                  acc.match_count += 1;
                }
              });

              return acc;
            },
            Promise.resolve({
              total_bobot: 0,
              total_similarity_gejala: 0,
              match_count: 0,
            })
          );

        const nilai_diagnosis = total_similarity_gejala / total_bobot;
        return {
          penyakit: item.penyakit,
          kode_basis_pengetahuan: item.kode_basis_pengetahuan,
          total_similarity_gejala,
          total_bobot,
          match_count,
          total_gejala,
          nilai_diagnosis,
        };
      })
    );

    // 10. mengurutkan data berdasarkan nilai diagnosis
    results.sort((a, b) => b.nilai_diagnosis - a.nilai_diagnosis);
    results.forEach(async (item) => {
      item.solusi = await getIdSolusi(item);
    });

    // 12. filtering data
    const final = await Promise.all(
      results.map(async (item) => {
        let solusi = await getIdSolusi(item);
        return data.map((element) => ({
          kode_case: kode_case,
          kode_basis_pengetahuan: item.kode_basis_pengetahuan,
          name: dataInput.name ?? null,
          umur: dataInput.umur ?? null,
          jenis_kelamin: dataInput.jenis_kelamin ?? null,
          id_gejala: element.id_gejala,
          nilai_diagnosis: item.nilai_diagnosis,
          id_solusi: solusi.id_solusi ?? null,
        }));
      })
    );

    const final_result_case = final.flat();

    return { results, final_result_case };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
