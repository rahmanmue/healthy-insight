import Case from "../models/CaseModel.js";
import Gejala from "../models/GejalaModel.js";
import { getHasilPerhitunganKNN } from "./HitungKNNService.js";
import { Op } from "sequelize";

export const getAllCase = async () => {
  const cases = await Case.findAll({
    attributes: [
      "kode_case",
      "name",
      "umur",
      "jenis_kelamin",
      "kode_basis_pengetahuan",
      "nilai_diagnosis",
      "id_solusi",
    ],
  });

  const data = cases.reduce((acc, curr) => {
    if (!acc[curr.kode_case]) {
      acc[curr.kode_case] = {
        kode_case: curr.kode_case,
        name: curr.name,
        umur: curr.umur,
        jenis_kelamin: curr.jenis_kelamin,
        diagnosis: [],
      };
    }

    if (
      !acc[curr.kode_case].diagnosis.some(
        (d) => d.kode_basis_pengetahuan === curr.kode_basis_pengetahuan
      )
    ) {
      acc[curr.kode_case].diagnosis.push({
        kode_basis_pengetahuan: curr.kode_basis_pengetahuan,
        nilai_diagnosis: curr.nilai_diagnosis,
        id_solusi: curr.id_solusi,
      });
    }
    return acc;
  }, {});

  const formattedData = Object.values(data);

  formattedData.forEach((item) => {
    item.diagnosis.sort((a, b) => b.nilai_diagnosis - a.nilai_diagnosis);
  });

  return {
    status: 200,
    data: formattedData,
  };
};

export const getCaseByKodeCase = async (kode_case) => {
  const checkCase = await Case.findOne({
    where: {
      kode_case: kode_case,
    },
  });

  if (!checkCase) {
    throw new Error("Case not found");
  }

  const data = await Case.findAll({
    attributes: [
      "kode_case",
      "kode_basis_pengetahuan",
      "name",
      "umur",
      "jenis_kelamin",
      "nilai_diagnosis",
      "id_gejala",
      "id_solusi",
    ],
    where: {
      kode_case: kode_case,
    },
    include: [
      {
        model: Gejala,
        attributes: ["id", "gejala"],
      },
    ],
  });

  const results = data.reduce((acc, item) => {
    if (!acc[item.kode_case]) {
      acc[item.kode_case] = {
        kode_case: item.kode_case,
        name: item.name,
        umur: item.umur,
        jenis_kelamin: item.jenis_kelamin,
        gejala: [],
        diagnosis: [],
      };
    }

    if (
      !acc[item.kode_case].gejala.some((g) => g.id_gejala === item.id_gejala)
    ) {
      acc[item.kode_case].gejala.push({
        id_gejala: item.id_gejala,
        gejala: item.gejala.gejala,
      });
    }

    if (
      !acc[item.kode_case].diagnosis.some(
        (d) => d.kode_basis_pengetahuan === item.kode_basis_pengetahuan
      )
    ) {
      acc[item.kode_case].diagnosis.push({
        kode_basis_pengetahuan: item.kode_basis_pengetahuan,
        nilai_diagnosis: item.nilai_diagnosis,
        id_solusi: item.id_solusi,
      });
    }

    return acc;
  }, {});

  return {
    status: 200,
    data: results[kode_case],
  };
};

export const getCaseByData = async (name) => {
  const data = await Case.findAll({
    attributes: [
      "kode_case",
      "kode_basis_pengetahuan",
      "name",
      "umur",
      "jenis_kelamin",
      "nilai_diagnosis",
      "id_gejala",
      "id_solusi",
    ],
    where: {
      name: { [Op.like]: `%${name}%` },
    },
    include: [
      {
        model: Gejala,
        attributes: ["id", "gejala"],
      },
    ],
  });

  const results = data.reduce((acc, item) => {
    if (!acc[item.kode_case]) {
      acc[item.kode_case] = {
        kode_case: item.kode_case,
        name: item.name,
        umur: item.umur,
        jenis_kelamin: item.jenis_kelamin,
        gejala: [],
        diagnosis: [],
      };
    }

    if (
      !acc[item.kode_case].gejala.some((g) => g.id_gejala === item.id_gejala)
    ) {
      acc[item.kode_case].gejala.push({
        id_gejala: item.id_gejala,
        gejala: item.gejala.gejala,
      });
    }

    if (
      !acc[item.kode_case].diagnosis.some(
        (d) => d.kode_basis_pengetahuan === item.kode_basis_pengetahuan
      )
    ) {
      acc[item.kode_case].diagnosis.push({
        kode_basis_pengetahuan: item.kode_basis_pengetahuan,
        nilai_diagnosis: item.nilai_diagnosis,
        id_solusi: item.id_solusi,
      });
    }

    return acc;
  }, {});

  const formattedData = Object.values(results);

  return {
    status: 200,
    data: formattedData,
  };
};

export const getHasilPerhitunganByKodeCase = async (kode_case) => {
  const gejala = await Case.findAll({
    attributes: ["id_gejala"],
    where: {
      kode_case: kode_case,
    },
    group: ["id_gejala"],
  });

  const { results } = await getHasilPerhitunganKNN(gejala);

  const kode_bp = await Case.findAll({
    attributes: ["kode_basis_pengetahuan"],
    where: {
      kode_case: kode_case,
    },
    group: ["kode_basis_pengetahuan"],
  });

  const filteredData = results.filter((item) => {
    return kode_bp.some((bp) => {
      return bp.kode_basis_pengetahuan === item.kode_basis_pengetahuan;
    });
  });

  return filteredData;
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
