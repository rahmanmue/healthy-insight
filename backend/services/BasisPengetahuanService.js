import BasisPengetahuan from "../models/BasisPengetahuanModel.js";
import Gejala from "../models/GejalaModel.js";
import Penyakit from "../models/PenyakitModel.js";

export const getAllBasisPengetahuan = async () => {
  const kode_basis_pengetahuan = await BasisPengetahuan.findAll({
    attributes: ["id", "kode_basis_pengetahuan", "id_penyakit", "id_gejala"],
    group: ["kode_basis_pengetahuan"],
  });

  let z = [];
  for (let i = 0; i < kode_basis_pengetahuan.length; i++) {
    let kode_bp = kode_basis_pengetahuan[i].kode_basis_pengetahuan;
    const { data } = await getBasisPengetahuanByKode(kode_bp);
    z.push({
      kode_basis_Pengetahuan: kode_bp,
      penyakit: data.penyakit,
      gejala: data.gejala,
    });
  }

  return {
    status: 200,
    data: z,
  };
};

export const getBasisPengetahuanByKode = async (kode) => {
  const allGejala = await Gejala.findAll({
    attributes: ["id", "gejala"],
  });

  const kode_basis_Pengetahuan = await BasisPengetahuan.findAll({
    attributes: ["id", "kode_basis_pengetahuan", "id_penyakit", "id_gejala"],
    where: {
      kode_basis_pengetahuan: kode,
    },
  });

  const penyakit = await Penyakit.findOne({
    attributes: ["id", "penyakit"],
    where: {
      id: kode_basis_Pengetahuan[0].id_penyakit,
    },
  });

  const gejala = kode_basis_Pengetahuan.map((item) => {
    const gejala_item = allGejala.find((x) => x.id === item.id_gejala);
    return gejala_item;
  });

  return {
    status: 200,
    data: {
      penyakit,
      gejala,
    },
  };
};

export const getBasisPengetahuanById = async (id) => {
  const basisPengetahuan = await BasisPengetahuan.findOne({
    where: {
      id: id,
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
