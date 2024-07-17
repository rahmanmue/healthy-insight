import express from "express";
import db from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/UserModel.js";
import Penyakit from "./models/PenyakitModel.js";
import Gejala from "./models/GejalaModel.js";
import Solusi from "./models/SolusiModel.js";
import Revise from "./models/ReviseModel.js";
import BasisPengetahuan from "./models/BasisPengetahuanModel.js";

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
  res.send("Hello World!");
});

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
