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

BasisPengetahuan.belongsToMany(Penyakit, {
  through: "basispengetahuan_penyakit",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
BasisPengetahuan.belongsToMany(Gejala, {
  through: "basispengetahuan_gejala",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default BasisPengetahuan;
