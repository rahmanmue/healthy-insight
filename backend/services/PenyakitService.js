import Penyakit from "../models/PenyakitModel.js";
import { Op } from "sequelize";

export const getAllPenyakit = async () => {
  const penyakit = await Penyakit.findAll({
    attributes: ["id", "penyakit"],
  });
  return {
    status: 200,
    data: penyakit,
  };
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

export const getPenyakitByData = async (data) => {
  const penyakit = await Penyakit.findAll({
    attributes: ["id", "penyakit"],
    where: {
      penyakit: {
        [Op.like]: `%${data}%`,
      },
    },
  });
  return {
    status: 200,
    data: penyakit,
  };
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
