import express from "express";
import {
  getPenyakit,
  getPenyakitByIdController,
  searchPenyakit,
  createPenyakitController,
  updatePenyakitController,
  deletePenyakitController,
} from "../controllers/PenyakitController.js";

import {
  getGejala,
  getGejalaByIdController,
  searchGejala,
  createGejalaController,
  updateGejalaController,
  deleteGejalaController,
} from "../controllers/GejalaController.js";

import {
  getAllBasisPengetahuanController,
  getAllBasisPengetahuanByKode,
  createBasisPengetahuanController,
  updateBasisPengetahuanPenyakitController,
  updateBasisPengetahuanGejalaController,
  deleteBasisPengetahuanController,
  deleteGejalaFromBasisPengetahuanController,
  searchBasisPengetahun,
} from "../controllers/BasisPengetahuanController.js";

import {
  getAllCases,
  getCaseByKodeCaseController,
  createCaseController,
  deleteCaseController,
  searchCase,
} from "../controllers/CaseController.js";

import { getHasilHitungKNN } from "../controllers/HitungKNNController.js";

import {
  getAllSolusiController,
  getSolusiByIdController,
  createSolusiController,
  updateSolusiController,
  deleteSolusiController,
  searchSolusi,
} from "../controllers/SolusiController.js";

import {
  getAllUsers,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controllers/UserController.js";

import { loginUser, registerUser } from "../controllers/AuthController.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/auth/login", loginUser);
router.post("/auth/register", registerUser);

router.get("/user", getAllUsers);
router.get("/user/:id", getUserByIdController);
router.patch("/user", verifyToken, updateUserController);
router.delete("/user/:id", verifyToken, deleteUserController);

router.get("/penyakit", getPenyakit);
router.get("/penyakit/search", searchPenyakit);
router.get("/penyakit/:id", getPenyakitByIdController);
router.post("/penyakit", verifyToken, verifyAdmin, createPenyakitController);
router.put("/penyakit", verifyToken, verifyAdmin, updatePenyakitController);
router.delete(
  "/penyakit/:id",
  verifyToken,
  verifyAdmin,
  deletePenyakitController
);

router.get("/gejala", getGejala);
router.get("/gejala/search", searchGejala);
router.get("/gejala/:id", getGejalaByIdController);
router.post("/gejala", verifyToken, verifyAdmin, createGejalaController);
router.put("/gejala", verifyToken, verifyAdmin, updateGejalaController);
router.delete("/gejala/:id", verifyToken, verifyAdmin, deleteGejalaController);

router.get("/basis-pengetahuan", getAllBasisPengetahuanController);
router.get("/basis-pengetahuan/search", searchBasisPengetahun);
router.get("/basis-pengetahuan/:kode", getAllBasisPengetahuanByKode);
router.post(
  "/basis-pengetahuan",
  verifyToken,
  verifyAdmin,
  createBasisPengetahuanController
);
router.patch(
  "/basis-pengetahuan/gejala",
  verifyToken,
  verifyAdmin,
  updateBasisPengetahuanGejalaController
);
router.patch(
  "/basis-pengetahuan/penyakit",
  verifyToken,
  verifyAdmin,
  updateBasisPengetahuanPenyakitController
);
router.delete(
  "/basis-pengetahuan/:kode_bp",
  verifyToken,
  verifyAdmin,
  deleteBasisPengetahuanController
);
router.delete(
  "/basis-pengetahuan/gejala/:id",
  verifyToken,
  verifyAdmin,
  deleteGejalaFromBasisPengetahuanController
);

router.get("/cases", getAllCases);
router.get("/cases/search", searchCase);
router.get("/cases/:kode_case", getCaseByKodeCaseController);
router.post("/cases", createCaseController);
router.delete(
  "/cases/:kode_case",
  verifyToken,
  verifyAdmin,
  deleteCaseController
);

router.get("/solusi", getAllSolusiController);
router.get("/solusi/search", searchSolusi);
router.get("/solusi/:id", getSolusiByIdController);
router.post("/solusi", verifyToken, verifyAdmin, createSolusiController);
router.put("/solusi", verifyToken, verifyAdmin, updateSolusiController);
router.delete("/solusi/:id", verifyToken, verifyAdmin, deleteSolusiController);

router.get("/case/knn/:kode_case", getHasilHitungKNN);

export default router;
