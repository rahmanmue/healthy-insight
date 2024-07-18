import BasisPengetahuan from "../models/BasisPengetahuanModel.js";
import Gejala from "../models/GejalaModel.js";
import Solusi from "../models/SolusiModel.js";
import crypto from "crypto";

const getBasisPengetahuanPenyakit = async () => {
  const penyakit = await BasisPengetahuan.findAll({
    attributes: ["kode_basis_pengetahuan", "id_penyakit"],
    group: ["id_penyakit"],
  });
  return penyakit;
};

const getBasisPengetahuanByPenyakit = async (data) => {
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
  const diagnosis = parseInt(data[0].nilai_diagnosis * 100);
  const solusi = await Solusi.findAll({
    where: {
      id_penyakit: data[0].id_penyakit,
    },
  });

  let id_solusi;
  for (let i = 0; i < solusi.length; i++) {
    if (
      diagnosis >= solusi[i].persentase_awal &&
      diagnosis <= solusi[i].persentase_akhir
    ) {
      id_solusi = solusi[i].id;
    }
  }

  return id_solusi;
};

export const getHasilPerhitunganKNN = async (data) => {
  // 1. mencari basis pengetahuan untuk penyakit
  const knowledge = await getBasisPengetahuanPenyakit();

  // 2. buat array results untuk menampung hasil setiap diagnosis
  const results = [];
  const kode_case = `CE-${crypto.randomBytes(2).toString("hex")}`;

  // 3. melakukan perulangan pada setiap penyakit di basis pengetahuan
  // tujuannya untuk mencari basis pengetahuan yang cocok dengan penyakit yang dimasukan user
  for (let i = 0; i < knowledge.length; i++) {
    // 4. mengambil setiap gejala sesuai dengan penyakit di tabel database basis pengetahuan
    const get_gejala = await getBasisPengetahuanByPenyakit(knowledge[i]);

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

    // 10. simpan data ke array results
    results.push({
      id_penyakit: knowledge[i].id_penyakit,
      kode_case: kode_case,
      kode_basis_pengetahuan: knowledge[i].kode_basis_pengetahuan,
      total_similarity_gejala: total_similarity_gejala,
      total_bobot: total_bobot,
      match_count: match_count,
      total_gejala: total_gejala,
      nilai_diagnosis: nilai_diagnosis,
    });
  }

  // 11. mengurutkan data berdasarkan nilai diagnosis
  results.sort((a, b) => b.nilai_diagnosis - a.nilai_diagnosis);

  // 12. filtering data
  const id_solusi = await getIdSolusi(results);
  const final_result_case = [];
  for (let i = 0; i < knowledge.length; i++) {
    for (let j = 0; j < data.length; j++) {
      const filteredResult = {
        kode_case: kode_case,
        kode_basis_pengetahuan: results[i].kode_basis_pengetahuan,
        id_gejala: data[j].id_gejala,
        nilai_bobot: data[j].nilai_bobot,
        nilai_diagnosis: results[i].nilai_diagnosis,
        id_solusi,
      };
      final_result_case.push(filteredResult);
    }
  }
  // return results;
  return { results, final_result_case };
};
