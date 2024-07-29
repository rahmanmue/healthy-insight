import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Gejala from "./GejalaModel.js";

const Case = db.define(
  "case",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kode_case: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    umur: {
      type: DataTypes.FLOAT,
    },
    jenis_kelamin: {
      type: DataTypes.ENUM("Laki-laki", "Perempuan"),
    },
    id_gejala: {
      type: DataTypes.INTEGER,
      references: {
        model: Gejala,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

export default Case;
