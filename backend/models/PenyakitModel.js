import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Penyakit = db.define(
  "penyakit",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    penyakit: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

export default Penyakit;
