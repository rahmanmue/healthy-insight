import express from "express";
import dotenv from "dotenv";
import db from "../config/db.js";
import cors from "cors";
import router from "../routes/index.js";
import Gejala from "../models/GejalaModel.js";
import Penyakit from "../models/PenyakitModel.js";
import BasisPengetahuan from "../models/BasisPengetahuanModel.js";
import Case from "../models/CaseModel.js";
import User from "../models/UserModel.js";
import Solusi from "../models/SolusiModel.js";
import "../models/Association.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is where it all begins 🪄✨");
});

app.use(router);

// Wrap the async code inside an IIFE (Immediately Invoked Function Expression)
(async () => {
  try {
    await db.sync();
    console.log("Database connected");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();

export default app;
