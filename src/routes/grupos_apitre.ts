import { Router } from "express";
import { createGrupo, deleteGrupo, deleteGrupos, findGrupo, findGrupos, updateGrupo } from "../controllers/grupos_apitre.controller";

const router = Router();

router.post("/", createGrupo);
router.get("/:id", findGrupo);
router.get("/", findGrupos);
router.patch("/:id", updateGrupo);
router.delete("/:id", deleteGrupo);
router.delete("/", deleteGrupos);

export { router };
