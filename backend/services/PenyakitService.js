import Penyakit from "../models/PenyakitModel.js";
import { Op } from "sequelize";

export const getAllPenyakit = async (page = 1, pageSize = 10) => {
  try {
    let penyakit;
    if (pageSize != 0) {
      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      penyakit = await Penyakit.findAll({
        attributes: ["id", "penyakit"],
        offset: offset,
        limit: limit,
      });
    } else {
      penyakit = await Penyakit.findAll({
        attributes: ["id", "penyakit"],
      });
    }

    const totalItems = await Penyakit.count();

    return {
      status: 200,
      data: penyakit,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / parseInt(pageSize)),
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const getPenyakitById = async (id) => {
  const penyakit = await Penyakit.findOne({
    attributes: ["id", "penyakit"],
    where: {
      id,
    },
  });
  return {
    status: 200,
    data: penyakit,
  };
};

export const getPenyakitByData = async (data, page = 1, pageSize = 10) => {
  try {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const penyakit = await Penyakit.findAll({
      attributes: ["id", "penyakit"],
      where: {
        penyakit: {
          [Op.iLike]: `%${data}%`,
        },
      },
      offset: offset,
      limit: limit,
    });

    const totalItems = penyakit.length;

    return {
      status: 200,
      data: penyakit,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / parseInt(pageSize)),
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const createPenyakit = async (data) => {
  await Penyakit.create(data);
  return {
    status: 201,
    message: "Data successfully created",
  };
};

export const updatePenyakit = async (data) => {
  await Penyakit.update(data, {
    where: {
      id: data.id,
    },
  });
  return {
    status: 200,
    message: "Data successfully updated",
  };
};

export const deletePenyakit = async (id) => {
  await Penyakit.destroy({
    where: {
      id,
    },
  });
  return {
    status: 204,
    message: "Data successfully deleted",
  };
};
