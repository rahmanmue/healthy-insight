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
    kode_basis_pengetahuan: {
      type: DataTypes.STRING,
    },
    id_gejala: {
      type: DataTypes.INTEGER,
      references: {
        model: Gejala,
        key: "id",
      },
    },
    nilai_bobot: {
      type: DataTypes.INTEGER,
    },
    nilai_diagnosis: {
      type: DataTypes.FLOAT,
    },
    id_solusi: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Case.belongsToMany(Gejala, { through: "case_gejala" });

export default Case;
