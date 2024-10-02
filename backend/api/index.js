import express from "express";
import db from "../config/db.js"; // Sesuaikan dengan path file config
import cors from "cors";
import router from "../routes/index.js"; // Sesuaikan dengan path file routes
import dotenv from "dotenv";

import Gejala from "../models/GejalaModel.js";
import Penyakit from "../models/PenyakitModel.js";
import BasisPengetahuan from "../models/BasisPengetahuanModel.js";
import Case from "../models/CaseModel.js";
import User from "../models/UserModel.js";
import Solusi from "../models/SolusiModel.js";
import "../models/Association.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(router);

export default async (req, res) => {
  try {
    console.log("Attempting to sync database...");
    await db.sync();
    console.log("Database sync successful");
    app(req, res);
  } catch (err) {
    console.error("Error during database sync or request handling:", err);
    res.status(500).send("Internal server error");
  }
};
