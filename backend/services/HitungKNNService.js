import BasisPengetahuan from "../models/BasisPengetahuanModel.js";
import Gejala from "../models/GejalaModel.js";
import Solusi from "../models/SolusiModel.js";
import Penyakit from "../models/PenyakitModel.js";
import crypto from "crypto";

const getInputData = async (data) => {
  for (const item of data) {
    const gejala = await Gejala.findOne({
      attributes: ["nilai_bobot"],
      where: {
        id: item.id_gejala,
      },
    });

    item.nilai_bobot = gejala.nilai_bobot;
  }
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
    include: [
      {
        model: Gejala,
        attributes: ["nilai_bobot"],
      },
    ],
  });

  return gejalaPenyakit;
};

export const getHasilPerhitunganKNN = async (dataGejala, dataInput = {}) => {
  try {
    // setiap gejala dicocokan dengan basis pengetahuan
    const dataInputGejala = await getInputData(dataGejala);

    // 1. mencari basis pengetahuan penyakit
    const basis_pengetahuan = await getBasisPengetahuanPenyakit();

    const kode_case = `CS-${crypto
      .randomBytes(2)
      .toString("hex")}`.toUpperCase();

    const dataCreatedCase = dataInputGejala.map((item) => {
      return {
        kode_case: kode_case,
        name: dataInput.name ?? null,
        umur: dataInput.umur ?? null,
        jenis_kelamin: dataInput.jenis_kelamin ?? null,
        id_gejala: item.id_gejala,
      };
    });

    // 2. perhitungan similarity
    const calculationResults = await Promise.all(
      basis_pengetahuan.map(async (item) => {
        const gejala_penyakit = await getBasisPengetahuanGejalaByPenyakit(item);
        const total_gejala = gejala_penyakit.length;

        const { total_bobot, total_similarity_gejala, match_count } =
          await gejala_penyakit.reduce(
            async (accPromise, gejala) => {
              const acc = await accPromise;

              dataInputGejala.forEach((element) => {
                if (element.id_gejala === gejala.id_gejala) {
                  acc.total_similarity_gejala += element.nilai_bobot;
                  acc.match_count += 1;
                }
              });

              acc.total_bobot += gejala.gejala.nilai_bobot;

              return acc;
            },
            Promise.resolve({
              total_bobot: 0,
              total_similarity_gejala: 0,
              match_count: 0,
            })
          );

        const nilai_diagnosis = parseFloat(
          (total_similarity_gejala / total_bobot).toFixed(2)
        );
        return {
          penyakit: item.penyakit,
          kode_basis_pengetahuan: item.kode_basis_pengetahuan,
          total_similarity_gejala: total_similarity_gejala,
          total_bobot: total_bobot,
          match_count: match_count,
          total_gejala: total_gejala,
          nilai_diagnosis: nilai_diagnosis,
        };
      })
    );

    // 3. mencari solusi berdasarkan nilai diagnosis
    for (const item of calculationResults) {
      const filter_solusi = await Solusi.findAll({
        where: {
          id_penyakit: item.penyakit.id,
        },
      });
      const diagnosis = parseInt(item.nilai_diagnosis * 100);
      item.id_solusi = null;
      item.solusi = null;

      filter_solusi.forEach((element) => {
        if (
          diagnosis >= parseInt(element.persentase_awal) &&
          diagnosis <= parseInt(element.persentase_akhir)
        ) {
          item.id_solusi = element.id;
          item.solusi = element.solusi;
        }
      });
    }

    // 4. sorting data
    calculationResults.sort((a, b) => b.nilai_diagnosis - a.nilai_diagnosis);

    return { dataCreatedCase, calculationResults };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
