import express from "express";
import {
  getAntrian,
  getAntrianUser,
  pembatalanAntrian,
  selesaiAntrian,
  tambahAntrian,
} from "../controllers/AntrianAdmin.js";

const router = express.Router();

router.get("/antrian", getAntrian);
router.post("/tambahantrian", tambahAntrian);
router.get("/antrianuser/:id", getAntrianUser);
router.put("/pembatalan/:id", pembatalanAntrian);
router.put("/selesai/:id", selesaiAntrian);

export default router;
