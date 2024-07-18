import express from "express";
import db from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import User from "./models/UserModel.js";
import Penyakit from "./models/PenyakitModel.js";
import Gejala from "./models/GejalaModel.js";
import Solusi from "./models/SolusiModel.js";
import Case from "./models/CaseModel.js";
import BasisPengetahuan from "./models/BasisPengetahuanModel.js";
import PerhitunganKNN from "./models/PerhitunganKNNModel.js";

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
app.use(router);

const connectDB = async () => {
  try {
    await db.sync();
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
};

const main = async () => {
  try {
    await connectDB();
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

main();
