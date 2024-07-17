import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Gejala from "./GejalaModel.js";
import Penyakit from "./PenyakitModel.js";

const Revise = db.define(
  "revise",
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
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

export default Revise;
