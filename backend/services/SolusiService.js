import Solusi from "../models/SolusiModel.js";

export const getAllSolusi = async () => {
  const solusi = await Solusi.findAll({
    attributes: [
      "id",
      "id_penyakit",
      "persentase_awal",
      "persentase_akhir",
      "solusi",
    ],
  });
  return {
    status: 200,
    data: solusi,
  };
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
