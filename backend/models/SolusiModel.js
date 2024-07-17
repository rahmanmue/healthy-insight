import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Penyakit from "./PenyakitModel.js";

const Solusi = db.define(
  "solusi",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    solusi: {
      type: DataTypes.STRING,
    },
    id_penyakit: {
      type: DataTypes.INTEGER,
    },
    persentase_awal: {
      type: DataTypes.FLOAT,
    },
    persentase_akhir: {
      type: DataTypes.FLOAT,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Penyakit.hasMany(Solusi, {
  foreignKey: "id_penyakit",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Solusi;
