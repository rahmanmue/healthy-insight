import BasisPengetahuan from "../models/BasisPengetahuanModel.js";
import Gejala from "../models/GejalaModel.js";
import Penyakit from "../models/PenyakitModel.js";

export const getAllBasisPengetahuan = async () => {
  const kode_basis_pengetahuan = await BasisPengetahuan.findAll({
    attributes: ["id", "kode_basis_pengetahuan", "id_penyakit", "id_gejala"],
    group: ["kode_basis_pengetahuan"],
  });

  let results = [];
  for (let i = 0; i < kode_basis_pengetahuan.length; i++) {
    let kode_bp = kode_basis_pengetahuan[i].kode_basis_pengetahuan;
    const { data } = await getBasisPengetahuanByKode(kode_bp);
    results.push({
      kode_basis_Pengetahuan: kode_bp,
      penyakit: data.penyakit.penyakit,
      gejala: data.gejala,
    });
  }

  return {
    status: 200,
    data: results,
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
    return {
      id: item.id,
      id_gejala: item.id_gejala,
      gejala: gejala_item.gejala,
    };
  });

  return {
    status: 200,
    data: {
      penyakit: penyakit,
      gejala,
    },
  };
};

export const checkBasisPengetahuan = async (kode_bp) => {
  const basisPengetahuan = await BasisPengetahuan.findOne({
    where: {
      kode_basis_pengetahuan: kode_bp,
    },
  });
  return basisPengetahuan;
};

export const createBasisPengetahuan = async (data) => {
  await BasisPengetahuan.bulkCreate(data);
  return {
    status: 201,
    message: "Data successfully created",
  };
};

export const deleteBasisPengetahuan = async (kode) => {
  await BasisPengetahuan.destroy({
    where: {
      kode_basis_pengetahuan: kode,
    },
  });
  return {
    status: 204,
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

export const deleteBasisPengetahuanById = async (id) => {
  await BasisPengetahuan.destroy({
    where: {
      id: id,
    },
  });
  return {
    status: 204,
  };
};
