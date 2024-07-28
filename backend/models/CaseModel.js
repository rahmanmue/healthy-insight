import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Gejala from "./GejalaModel.js";
import Solusi from "./SolusiModel.js";

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
    kode_basis_pengetahuan: {
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
    nilai_diagnosis: {
      type: DataTypes.FLOAT,
    },
    id_solusi: {
      type: DataTypes.INTEGER,
      references: {
        model: Solusi,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

export default Case;
