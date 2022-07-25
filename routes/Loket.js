import express from "express";
import {
  AktifkanLoket,
  getLoket,
  getStatusLoket,
} from "../controllers/LoketAntrian.js";
const router = express.Router();

router.post("/loket", AktifkanLoket);
router.get("/loket", getLoket);
router.get("/statusloket/:id", getStatusLoket);

export default router;
