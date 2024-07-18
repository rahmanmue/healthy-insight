import Solusi from "../models/SolusiModel.js";

export const getAllSolusi = async () => {
  const solusi = await Solusi.findAll();
  return {
    status: 200,
    data: solusi,
  };
};

export const getSolusiById = async (id) => {
  const solusi = await Solusi.findOne({
    where: {
      id,
    },
  });
  return {
    status: 200,
    data: solusi,
  };
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
      id,
    },
  });
  return {
    status: 204,
    message: "Data successfully deleted",
  };
};
