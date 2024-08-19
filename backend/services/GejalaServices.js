import Gejala from "../models/GejalaModel.js";
import { Sequelize, Op } from "sequelize";

export const getAllGejala = async (page = 1, pageSize = 8) => {
  try {
    let gejala;
    if (pageSize != 0) {
      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      gejala = await Gejala.findAll({
        attributes: ["id", "gejala", "nilai_bobot"],
        offset: offset,
        limit: limit,
      });
    } else {
      gejala = await Gejala.findAll({
        attributes: ["id", "gejala", "nilai_bobot"],
      });
    }

    const totalItems = await Gejala.count();

    return {
      status: 200,
      data: gejala,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / parseInt(pageSize)),
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const getGejalaById = async (id) => {
  const gejala = await Gejala.findOne({
    attributes: ["id", "gejala", "nilai_bobot"],
    where: {
      id,
    },
  });
  return {
    status: 200,
    data: gejala,
  };
};

export const getGejalaByData = async (data, page = 1, pageSize = 8) => {
  try {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const gejala = await Gejala.findAll({
      attributes: ["id", "gejala", "nilai_bobot"],
      where: {
        [Op.or]: {
          gejala: {
            [Op.like]: `%${data}%`,
          },
          [Op.or]: [
            Sequelize.literal(`CAST(nilai_bobot AS TEXT) LIKE '%${data}%'`),
            {
              gejala: {
                [Op.iLike]: `%${data}%`,
              },
            },
          ],
        },
      },
      offset: offset,
      limit: limit,
    });

    const totalItems = await Gejala.count({
      where: {
        [Op.or]: {
          gejala: {
            [Op.like]: `%${data}%`,
          },
          [Op.or]: [
            Sequelize.literal(`CAST(nilai_bobot AS TEXT) LIKE '%${data}%'`),
            {
              gejala: {
                [Op.iLike]: `%${data}%`,
              },
            },
          ],
        },
      },
    });

    return {
      status: 200,
      data: gejala,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / parseInt(pageSize)),
    };
  } catch (error) {
    throw new Error(error);
  }
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
