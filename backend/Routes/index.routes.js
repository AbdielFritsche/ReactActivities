import { Router } from "express";
import { getIndex,getPong } from "../Controladores/index.controladores.js";

const router = Router();    
router.get('/', getIndex);

router.get('/ping', getPong);

export default router;