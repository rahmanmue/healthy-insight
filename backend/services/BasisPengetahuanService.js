import BasisPengetahuan from "../models/BasisPengetahuanModel.js";

export const getAllBasisPengetahuan = async () => {
  const basisPengetahuan = await BasisPengetahuan.findAll({
    attributes: ["id", "kode_basis_pengetahuan", "id_penyakit", "id_gejala"],
  });
  return {
    status: 200,
    data: basisPengetahuan,
  };
};

export const getBasisPengetahuanById = async (id) => {
  const basisPengetahuan = await BasisPengetahuan.findOne({
    where: {
      id,
    },
  });
  return {
    status: 200,
    data: basisPengetahuan,
  };
};

export const createBasisPengetahuan = async (data) => {
  await BasisPengetahuan.bulkCreate(data);
  return {
    status: 201,
    message: "Data successfully created",
  };
};

export const updateBasisPengetahuan = async (data) => {
  await BasisPengetahuan.update(data, {
    where: {
      id: data.id,
    },
  });
  return {
    status: 200,
    message: "Data successfully updated",
  };
};

export const deleteBasisPengetahuan = async (id) => {
  await BasisPengetahuan.destroy({
    where: {
      id,
    },
  });
  return {
    status: 204,
    message: "Data successfully deleted",
  };
};
