import Gejala from "../models/GejalaModel.js";

export const getAllGejala = async () => {
  const gejala = await Gejala.findAll({
    attributes: ["id", "gejala", "nilai_bobot"],
  });
  return {
    status: 200,
    data: gejala,
  };
};

export const getGejalaById = async (id) => {
  const gejala = await Gejala.findOne({
    where: {
      id,
    },
  });
  return {
    status: 200,
    data: gejala,
  };
};

export const createGejala = async (data) => {
  await Gejala.bulkCreate(data);
  return {
    status: 201,
    message: "Data successfully created",
  };
};

export const updateGejala = async (data) => {
  await Gejala.update(data, {
    where: {
      id: data.id,
    },
  });
  return {
    status: 200,
    message: "Data successfully updated",
  };
};

export const deleteGejala = async (id) => {
  await Gejala.destroy({
    where: {
      id,
    },
  });
  return {
    status: 204,
    message: "Data successfully deleted",
  };
};
