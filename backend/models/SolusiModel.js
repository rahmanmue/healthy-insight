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
    id_penyakit: {
      type: DataTypes.INTEGER,
      references: {
        model: Penyakit,
        key: "id",
      },
    },
    persentase_awal: {
      type: DataTypes.FLOAT,
    },
    persentase_akhir: {
      type: DataTypes.FLOAT,
    },
    solusi: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

export default Solusi;
