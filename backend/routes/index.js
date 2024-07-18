import express from "express";
import {
  getPenyakit,
  getPenyakitByIdController,
  createPenyakitController,
  updatePenyakitController,
  deletePenyakitController,
} from "../controllers/PenyakitController.js";

import {
  getGejala,
  getGejalaByIdController,
  createGejalaController,
  updateGejalaController,
  deleteGejalaController,
} from "../controllers/GejalaController.js";

import {
  getBasisPengetahuan,
  getBasisPengetahuanByIdController,
  createBasisPengetahuanController,
  updateBasisPengetahuanController,
  deleteBasisPengetahuanController,
} from "../controllers/BasisPengetahuanController.js";

import {
  getAllCases,
  getCaseByNoKasusController,
  createCaseController,
  updateCaseController,
  deleteCaseController,
} from "../controllers/CaseController.js";

import { createHitungKNNController } from "../controllers/HitungKNNController.js";

import {
  getAllSolusiController,
  getSolusiByIdController,
  createSolusiController,
  updateSolusiController,
  deleteSolusiController,
} from "../controllers/SolusiController.js";

const router = express.Router();

router.get("/penyakit", getPenyakit);
router.get("/penyakit/:id", getPenyakitByIdController);
router.post("/penyakit", createPenyakitController);
router.put("/penyakit/:id", updatePenyakitController);
router.delete("/penyakit/:id", deletePenyakitController);

router.get("/gejala", getGejala);
router.get("/gejala/:id", getGejalaByIdController);
router.post("/gejala", createGejalaController);
router.put("/gejala/:id", updateGejalaController);
router.delete("/gejala/:id", deleteGejalaController);

router.get("/basis-pengetahuan", getBasisPengetahuan);
router.get("/basis-pengetahuan/:id", getBasisPengetahuanByIdController);
router.post("/basis-pengetahuan", createBasisPengetahuanController);
router.put("/basis-pengetahuan/:id", updateBasisPengetahuanController);
router.delete("/basis-pengetahuan/:id", deleteBasisPengetahuanController);

router.get("/cases", getAllCases);
router.get("/cases/:id", getCaseByNoKasusController);
router.post("/cases", createCaseController);
router.put("/cases/:id", updateCaseController);
router.delete("/cases/:id", deleteCaseController);

router.get("/solusi", getAllSolusiController);
router.get("/solusi/:id", getSolusiByIdController);
router.post("/solusi", createSolusiController);
router.put("/solusi/:id", updateSolusiController);
router.delete("/solusi/:id", deleteSolusiController);

router.post("/hitung-knn", createHitungKNNController);

export default router;
