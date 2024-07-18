import db from "../config/db.js";
import { DataTypes } from "sequelize";

const PerhitunganKNN = db.define(
  "hasil_perhitungan",
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
    id_penyakit: {
      type: DataTypes.INTEGER,
    },
    total_similarity_gejala: {
      type: DataTypes.INTEGER,
    },
    total_bobot: {
      type: DataTypes.INTEGER,
    },
    total_gejala: {
      type: DataTypes.INTEGER,
    },
    match_count: {
      type: DataTypes.INTEGER,
    },
    nilai_diagnosis: {
      type: DataTypes.FLOAT,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

export default PerhitunganKNN;
