import { Op } from "sequelize";
import BasisPengetahuan from "../models/BasisPengetahuanModel.js";
import Gejala from "../models/GejalaModel.js";
import Penyakit from "../models/PenyakitModel.js";

export const getAllBasisPengetahuan = async () => {
  const basisPengetahuan = await BasisPengetahuan.findAll({
    attributes: ["id", "kode_basis_pengetahuan", "id_penyakit", "id_gejala"],
    include: [
      {
        model: Penyakit,
        attributes: ["penyakit"],
      },
      {
        model: Gejala,
        attributes: ["id", "gejala"],
      },
    ],
  });

  // Mengelompokkan data berdasarkan kode_basis_pengetahuan
  const groupedData = basisPengetahuan.reduce((acc, item) => {
    // Jika kode_basis_pengetahuan belum ada di accumulator, tambahkan
    if (!acc[item.kode_basis_pengetahuan]) {
      acc[item.kode_basis_pengetahuan] = {
        kode_basis_pengetahuan: item.kode_basis_pengetahuan,
        penyakit: item.penyakit.penyakit,
        gejala: [],
      };
    }

    // Tambahkan gejala ke dalam array gejala untuk kode_basis_pengetahuan yang sesuai
    acc[item.kode_basis_pengetahuan].gejala.push({
      id: item.gejala.id,
      id_gejala: item.id_gejala,
      gejala: item.gejala.gejala,
    });

    return acc;
  }, {});

  // Mengubah objek groupedData menjadi array
  const formattedData = Object.values(groupedData);

  // Return response
  return {
    status: 200,
    data: formattedData,
  };
};

export const getBasisPengetahuanByKode = async (kode) => {
  const basisPengetahuan = await BasisPengetahuan.findAll({
    attributes: ["id", "kode_basis_pengetahuan", "id_penyakit", "id_gejala"],
    where: { kode_basis_pengetahuan: kode },
    include: [
      {
        model: Penyakit,
        attributes: ["id", "penyakit"],
      },
      {
        model: Gejala,
        attributes: ["id", "gejala"],
      },
    ],
  });

  // Ambil penyakit dari data BasisPengetahuan
  const penyakit = basisPengetahuan[0].penyakit;

  // Format gejala berdasarkan data BasisPengetahuan
  const gejala = basisPengetahuan.map((item) => ({
    id: item.id,
    id_gejala: item.id_gejala,
    gejala: item.gejala.gejala,
  }));

  const data = {
    id_penyakit: penyakit.id,
    penyakit: penyakit.penyakit,
    gejala: gejala,
  };

  return {
    status: 200,
    data: data,
  };
};

export const getBasisPengetahuanByData = async (data) => {
  const basisPengetahuan = await BasisPengetahuan.findAll({
    attributes: ["id", "kode_basis_pengetahuan", "id_penyakit", "id_gejala"],
    include: [
      {
        model: Penyakit,
        attributes: ["penyakit"],
      },
      {
        model: Gejala,
        attributes: ["id", "gejala"],
      },
    ],
    where: {
      [Op.or]: [
        { kode_basis_pengetahuan: { [Op.like]: `%${data}%` } },
        { "$penyakit.penyakit$": { [Op.like]: `%${data}%` } },
        { "$gejala.gejala$": { [Op.like]: `%${data}%` } },
      ],
    },
  });

  // Mengelompokkan data berdasarkan kode_basis_pengetahuan
  const groupedData = basisPengetahuan.reduce((acc, item) => {
    // Jika kode_basis_pengetahuan belum ada di accumulator, tambahkan
    if (!acc[item.kode_basis_pengetahuan]) {
      acc[item.kode_basis_pengetahuan] = {
        kode_basis_pengetahuan: item.kode_basis_pengetahuan,
        penyakit: item.penyakit.penyakit,
        gejala: [],
      };
    }

    // Tambahkan gejala ke dalam array gejala untuk kode_basis_pengetahuan yang sesuai
    acc[item.kode_basis_pengetahuan].gejala.push({
      id: item.gejala.id,
      id_gejala: item.id_gejala,
      gejala: item.gejala.gejala,
    });

    return acc;
  }, {});

  // Mengubah objek groupedData menjadi array
  const formattedData = Object.values(groupedData);
  return {
    status: 200,
    data: formattedData,
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

export const updateBasisPengetahuanPenyakit = async (data) => {
  await BasisPengetahuan.update(data, {
    where: {
      kode_basis_pengetahuan: data.kode_basis_pengetahuan,
    },
  });
  return {
    status: 200,
    message: "Data successfully updated",
  };
};

export const updateBasisPengetahuanGejala = async (data) => {
  // const getKodeBp = await BasisPengetahuan.findOne({
  //   where: {
  //     id: data.id,
  //   },
  // });

  // const check = await BasisPengetahuan.findOne({
  //   where: {
  //     kode_basis_pengetahuan: getKodeBp.kode_basis_pengetahuan,
  //     id_gejala: data.id_gejala,
  //   },
  // });

  // if (check) throw new Error("Gejala sudah ada di basis pengetahuan ini");

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
