import BasisPengetahuan from "../models/BasisPengetahuanModel.js";
import Gejala from "../models/GejalaModel.js";
import Solusi from "../models/SolusiModel.js";
import Penyakit from "../models/PenyakitModel.js";
import crypto from "crypto";

const getInputData = async (data) => {
  const gejalaX = await Gejala.findAll({
    attributes: ["id", "nilai_bobot"],
  });

  const newData = data.map((item) => {
    const filtered = gejalaX.find((gejala) => {
      if (gejala.id === item.id_gejala) {
        return gejala;
      }
    });
    return {
      id_gejala: item.id_gejala,
      nilai_bobot: filtered.nilai_bobot,
    };
  });

  return newData;
};

const getBasisPengetahuanPenyakit = async () => {
  const penyakit = await BasisPengetahuan.findAll({
    attributes: ["kode_basis_pengetahuan", "id_penyakit"],
    group: ["kode_basis_pengetahuan"],
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
  const diagnosis = parseInt(data.nilai_diagnosis * 100);
  const { penyakit } = data;
  const solusi_by_penyakit = await Solusi.findAll({
    where: {
      id_penyakit: penyakit.id,
    },
  });

  let id_solusi;
  let solusi;
  for (let i = 0; i < solusi_by_penyakit.length; i++) {
    if (
      diagnosis >= solusi_by_penyakit[i].persentase_awal &&
      diagnosis <= solusi_by_penyakit[i].persentase_akhir
    ) {
      id_solusi = solusi_by_penyakit[i].id;
      solusi = solusi_by_penyakit[i].solusi;
    }
  }

  return { id_solusi, solusi };
};

export const getHasilPerhitunganKNN = async (dataInput) => {
  // setiap gejala dicocokan dengan basis pengetahuan
  const data = await getInputData(dataInput);

  // 1. mencari basis pengetahuan untuk penyakit
  const basis_pengetahuan = await getBasisPengetahuanPenyakit();

  // 2. buat array results untuk menampung hasil setiap diagnosis
  const results = [];
  const kode_case = `CS-${crypto.randomBytes(2).toString("hex")}`.toUpperCase();

  // 3. melakukan perulangan pada setiap penyakit di basis pengetahuan
  // tujuannya untuk mencari basis pengetahuan yang cocok dengan penyakit yang dimasukan user
  for (let i = 0; i < basis_pengetahuan.length; i++) {
    // 4. mengambil setiap gejala sesuai dengan penyakit di tabel database basis pengetahuan
    const get_gejala = await getBasisPengetahuanGejalaByPenyakit(
      basis_pengetahuan[i]
    );

    // dan menghitung total gejala sesuai dengan penyakit di tabel database basis pengetahuan
    const total_gejala = get_gejala.length;

    // membuat variabel untuk menampung :
    let nilai_diagnosis = 0;
    let total_similarity_gejala = 0;
    let total_bobot = 0;
    let match_count = 0;

    // 5. melakukan perulangan untuk setiap gejala pada tabel database basis pengetahuan
    // dan dibandingkan dengan data yang dimasukan user
    for (let j = 0; j < total_gejala; j++) {
      // 6. hitung total bobot
      total_bobot += await getNilaiBobotGejala(get_gejala[j]);

      // 7. mencari dan menghitung kecocokan data
      // berdasarkan gejala yang dipilih user dengan setiap gejala pada tabel basis pengetahuan
      for (let k = 0; k < data.length; k++) {
        // 8. jika gejala pada basis pengetahuan sesuai dengan gejala yang dipilih user
        if (data[k].id_gejala === get_gejala[j].id_gejala) {
          // hitung total bobot yang cocok dengan menambahkan nilai bobot
          total_similarity_gejala += data[k].nilai_bobot;
          // hitung jumlah kecocokan gejala
          match_count += 1;
        }
      }
    }

    // 9. setelah selesai menemukan total similarity dan total bobot
    // hitung nilai diagnosis
    nilai_diagnosis = total_similarity_gejala / total_bobot;
    const penyakit = await Penyakit.findOne({
      attributes: ["id", "penyakit"],
      where: {
        id: basis_pengetahuan[i].id_penyakit,
      },
    });

    // 10. simpan data ke array results
    results.push({
      penyakit: penyakit,
      kode_basis_pengetahuan: basis_pengetahuan[i].kode_basis_pengetahuan,
      total_similarity_gejala: total_similarity_gejala,
      total_bobot: total_bobot,
      match_count: match_count,
      total_gejala: total_gejala,
      nilai_diagnosis: nilai_diagnosis,
    });
  }

  // 11. mengurutkan data berdasarkan nilai diagnosis
  results.sort((a, b) => b.nilai_diagnosis - a.nilai_diagnosis);
  results[0].solusi = await getIdSolusi(results[0]);

  // 12. filtering data
  const final_result_case = [];
  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < data.length; j++) {
      // solusi null jika id penyakit berbeda
      // dengan hasil tertinggi setelah perhitungan dengan id penyakit pada basis pengetahuan
      let solusi = await getIdSolusi(results[i]);

      const filtered_result = {
        kode_case: kode_case,
        kode_basis_pengetahuan: results[i].kode_basis_pengetahuan,
        id_gejala: data[j].id_gejala,
        nilai_diagnosis: results[i].nilai_diagnosis,
        id_solusi: solusi.id_solusi ?? null,
      };
      final_result_case.push(filtered_result);
    }
  }

  return { results, final_result_case };
};
