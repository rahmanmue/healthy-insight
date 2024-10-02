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
    await db.sync(); // Setup connection tiap request
    app(req, res); // Jalankan Express app per request
  } catch (err) {
    res.status(500).send("Database connection error");
  }
};
