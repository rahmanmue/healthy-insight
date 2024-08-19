import Solusi from "../models/SolusiModel.js";
import Penyakit from "../models/PenyakitModel.js";
import { Op } from "sequelize";

export const getAllSolusi = async (page = 1, pageSize = 10) => {
  try {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const solusi = await Solusi.findAll({
      attributes: [
        "id",
        "id_penyakit",
        "persentase_awal",
        "persentase_akhir",
        "solusi",
      ],
      include: [
        {
          model: Penyakit,
          attributes: ["penyakit"],
        },
      ],
      offset: offset,
      limit: limit,
    });

    const totalItems = await Solusi.count();

    const dataFormatted = solusi.map((item) => {
      return {
        id: item.id,
        id_penyakit: item.id_penyakit,
        penyakit: item.penyakit.penyakit,
        persentase_awal: item.persentase_awal,
        persentase_akhir: item.persentase_akhir,
        solusi: item.solusi,
      };
    });

    return {
      status: 200,
      data: dataFormatted,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / parseInt(pageSize)),
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const getSolusiById = async (id) => {
  const solusi = await Solusi.findOne({
    attributes: [
      "id",
      "id_penyakit",
      "persentase_awal",
      "persentase_akhir",
      "solusi",
    ],

    where: {
      id,
    },
  });
  return {
    status: 200,
    data: solusi,
  };
};

export const getSolusiByData = async (data, page = 1, pageSize = 10) => {
  try {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const solusi = await Solusi.findAll({
      attributes: [
        "id",
        "id_penyakit",
        "persentase_awal",
        "persentase_akhir",
        "solusi",
      ],
      include: [
        {
          model: Penyakit,
          attributes: ["penyakit"],
        },
      ],
      where: {
        [Op.or]: [
          {
            solusi: {
              [Op.iLike]: `%${data}%`,
            },
          },
          {
            "$penyakit.penyakit$": {
              [Op.iLike]: `%${data}%`,
            },
          },
        ],
      },
      offset: offset,
      limit: limit,
    });

    const totalItems = await Solusi.count({
      include: [
        {
          model: Penyakit,
          attributes: ["penyakit"],
        },
      ],
      where: {
        [Op.or]: [
          {
            solusi: {
              [Op.iLike]: `%${data}%`,
            },
          },
          {
            "$penyakit.penyakit$": {
              [Op.iLike]: `%${data}%`,
            },
          },
        ],
      },
    });

    const dataFormatted = solusi.map((item) => {
      return {
        id: item.id,
        id_penyakit: item.id_penyakit,
        penyakit: item.penyakit.penyakit,
        persentase_awal: item.persentase_awal,
        persentase_akhir: item.persentase_akhir,
        solusi: item.solusi,
      };
    });

    return {
      status: 200,
      data: dataFormatted,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / parseInt(pageSize)),
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const createSolusi = async (data) => {
  await Solusi.create(data);
  return {
    status: 201,
    message: "Data successfully created",
  };
};

export const updateSolusi = async (data) => {
  await Solusi.update(data, {
    where: {
      id: data.id,
    },
  });
  return {
    status: 200,
    message: "Data successfully updated",
  };
};

export const deleteSolusi = async (id) => {
  await Solusi.destroy({
    where: {
      id: id,
    },
  });
  return {
    status: 204,
    message: "Data successfully deleted",
  };
};
