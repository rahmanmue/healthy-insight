import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Penyakit from "./PenyakitModel.js";
import Gejala from "./GejalaModel.js";

const BasisPengetahuan = db.define(
  "basis_pengetahuan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kode_basis_pengetahuan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_penyakit: {
      type: DataTypes.INTEGER,
      references: {
        model: Penyakit,
        key: "id",
      },
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

export default BasisPengetahuan;
