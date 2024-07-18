import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Gejala = db.define(
  "gejala",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gejala: {
      type: DataTypes.STRING,
    },
    nilai_bobot: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

export default Gejala;
