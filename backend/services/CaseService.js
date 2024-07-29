import Case from "../models/CaseModel.js";
import Gejala from "../models/GejalaModel.js";
import { getHasilPerhitunganKNN } from "./HitungKNNService.js";
import { Op } from "sequelize";

export const getAllCase = async () => {
  const cases = await Case.findAll({
    attributes: ["kode_case", "name", "umur", "jenis_kelamin", "id_gejala"],
    include: [
      {
        model: Gejala,
        attributes: ["gejala"],
      },
    ],
  });

  const data = cases.reduce((acc, curr) => {
    if (!acc[curr.kode_case]) {
      acc[curr.kode_case] = {
        kode_case: curr.kode_case,
        name: curr.name,
        umur: curr.umur,
        jenis_kelamin: curr.jenis_kelamin,
        gejala: [],
      };
    }

    if (
      !acc[curr.kode_case].gejala.some((d) => d.id_gejala === curr.id_gejala)
    ) {
      acc[curr.kode_case].gejala.push({
        id_gejala: curr.id_gejala,
        gejala: curr.gejala.gejala,
      });
    }
    return acc;
  }, {});

  const formattedData = Object.values(data);

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
    attributes: ["kode_case", "name", "umur", "jenis_kelamin", "id_gejala"],
    where: {
      kode_case: kode_case,
    },
    include: [
      {
        model: Gejala,
        attributes: ["gejala"],
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

    return acc;
  }, {});

  return {
    status: 200,
    data: results[kode_case],
  };
};

export const getCaseByData = async (name) => {
  const data = await Case.findAll({
    attributes: ["kode_case", "name", "umur", "jenis_kelamin", "id_gejala"],
    where: {
      name: { [Op.like]: `%${name}%` },
    },
    include: [
      {
        model: Gejala,
        attributes: ["gejala"],
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
  });

  const { calculationResults } = await getHasilPerhitunganKNN(gejala);

  return calculationResults;
};

export const createCase = async (data) => {
  const { dataCreatedCase } = await getHasilPerhitunganKNN(data.gejala, data);
  const cases_data = await Case.bulkCreate(dataCreatedCase);
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
