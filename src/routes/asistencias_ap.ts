import { Router } from "express";
import { createAsistencia, deleteAsistencia, deleteAsistencias, findAsistencia, findAsistencias, updateAsistencia } from "../controllers/asistencias_ap.controller";

const router = Router();

router.post("/", createAsistencia);
router.get("/:id", findAsistencia);
router.get("/", findAsistencias);
router.patch("/:id", updateAsistencia);
router.delete("/:id", deleteAsistencia);
router.delete("/", deleteAsistencias);

export { router };
