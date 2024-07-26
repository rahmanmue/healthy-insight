import Case from "../models/CaseModel.js";
import Gejala from "../models/GejalaModel.js";
import { getHasilPerhitunganKNN } from "./HitungKNNService.js";

export const getGejalaFromCase = async (kode_case) => {
  const one_case = await Case.findOne({
    where: {
      kode_case: kode_case,
    },
  });

  const cases = await Case.findAll({
    where: {
      kode_case: kode_case,
      kode_basis_pengetahuan: one_case.kode_basis_pengetahuan,
    },
  });

  const gejala = cases.map((item) => {
    return {
      id_gejala: item.id_gejala,
    };
  });

  return gejala;
};

export const getAllCase = async () => {
  const kode_case = await Case.findAll({
    attributes: ["kode_case", "name"],
    group: ["kode_case"],
  });

  let cases = [];
  for (let i = 0; i < kode_case.length; i++) {
    const { data } = await getCaseByKodeCase(kode_case[i].kode_case);
    cases.push({
      kode_case: kode_case[i].kode_case,
      name: kode_case[i].name,
      diagnosis: data.diagnosis,
    });
  }

  return {
    status: 200,
    data: cases,
  };
};

export const getCaseByKodeCase = async (kode_case) => {
  const case_data = await Case.findOne({
    attributes: ["kode_case", "name", "umur", "jenis_kelamin"],
    where: {
      kode_case: kode_case,
    },
  });

  const kode_basis_pengetahuan = await Case.findAll({
    attributes: ["kode_basis_pengetahuan", "nilai_diagnosis", "id_solusi"],
    group: ["kode_basis_pengetahuan"],
    where: {
      kode_case: kode_case,
    },
  });

  const allGejala = await Gejala.findAll({
    attributes: ["id", "gejala"],
  });

  const id_all_gejala = await getGejalaFromCase(kode_case);

  const gejala = id_all_gejala.map((item) => {
    const gejala = allGejala.find((gejala) => gejala.id === item.id_gejala);
    return {
      id_gejala: gejala.id,
      gejala: gejala.gejala,
    };
  });

  let results = [];
  for (let j = 0; j < kode_basis_pengetahuan.length; j++) {
    results.push({
      kode_basis_pengetahuan: kode_basis_pengetahuan[j].kode_basis_pengetahuan,
      nilai_diagnosis: kode_basis_pengetahuan[j].nilai_diagnosis,
      id_solusi: kode_basis_pengetahuan[j].id_solusi,
    });
  }

  return {
    status: 200,
    data: {
      kode_case: case_data.kode_case,
      name: case_data.name,
      umur: case_data.umur,
      jenis_kelamin: case_data.jenis_kelamin,
      gejala: gejala,
      diagnosis: results,
    },
  };
};

export const getKodeBpUniqueByKodeCase = async (kode_case) => {
  const result = await Case.findAll({
    attributes: ["kode_basis_pengetahuan"],
    where: {
      kode_case: kode_case,
    },
    group: ["kode_basis_pengetahuan"],
  });
  return result;
};

export const createCase = async (data, dataGejala) => {
  const { final_result_case } = await getHasilPerhitunganKNN(data, dataGejala);
  const cases_data = await Case.bulkCreate(final_result_case);
  const kode_case = cases_data[0].kode_case;

  return {
    status: 201,
    data: kode_case,
    message: "Data successfully created",
  };
};

export const deleteCase = async (kode) => {
  await Case.destroy({
    where: {
      kode_case: kode,
    },
  });
  return {
    status: 204,
  };
};
