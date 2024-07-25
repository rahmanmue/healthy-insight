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
  getAllBasisPengetahuanController,
  getAllBasisPengetahuanByKode,
  createBasisPengetahuanController,
  updateBasisPengetahuanController,
  deleteBasisPengetahuanController,
  deleteGejalaFromBasisPengetahuanController,
} from "../controllers/BasisPengetahuanController.js";

import {
  getAllCases,
  getCaseByNoKasusController,
  createCaseController,
  deleteCaseController,
} from "../controllers/CaseController.js";

import { getHasilHitungKNN } from "../controllers/HitungKNNController.js";

import {
  getAllSolusiController,
  getSolusiByIdController,
  createSolusiController,
  updateSolusiController,
  deleteSolusiController,
} from "../controllers/SolusiController.js";

import {
  getAllUsers,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controllers/UserController.js";

import { loginUser, registerUser } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/auth/login", loginUser);
router.post("/auth/register", registerUser);

router.get("/user", getAllUsers);
router.get("/user/:id", getUserByIdController);
router.patch("/user", updateUserController);
router.delete("/user/:id", deleteUserController);

router.get("/penyakit", getPenyakit);
router.get("/penyakit/:id", getPenyakitByIdController);
router.post("/penyakit", createPenyakitController);
router.put("/penyakit", updatePenyakitController);
router.delete("/penyakit/:id", deletePenyakitController);

router.get("/gejala", getGejala);
router.get("/gejala/:id", getGejalaByIdController);
router.post("/gejala", createGejalaController);
router.put("/gejala", updateGejalaController);
router.delete("/gejala/:id", deleteGejalaController);

router.get("/basis-pengetahuan", getAllBasisPengetahuanController);
router.get("/basis-pengetahuan/:kode", getAllBasisPengetahuanByKode);
router.post("/basis-pengetahuan", createBasisPengetahuanController);
router.patch("/basis-pengetahuan/gejala", updateBasisPengetahuanController);
router.delete("/basis-pengetahuan/:kode_bp", deleteBasisPengetahuanController);
router.delete(
  "/basis-pengetahuan/gejala/:id",
  deleteGejalaFromBasisPengetahuanController
);

router.get("/cases", getAllCases);
router.get("/cases/:kode_case", getCaseByNoKasusController);
router.post("/cases", createCaseController);
router.delete("/cases/:kode_case", deleteCaseController);

router.get("/solusi", getAllSolusiController);
router.get("/solusi/:id", getSolusiByIdController);
router.post("/solusi", createSolusiController);
router.put("/solusi", updateSolusiController);
router.delete("/solusi/:id", deleteSolusiController);

router.get("/case/knn/:kode_case", getHasilHitungKNN);

export default router;
