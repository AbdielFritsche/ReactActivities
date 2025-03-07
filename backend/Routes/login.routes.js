import { Router } from "express";
import { login } from "../Controladores/login.controladores.js";

const router = Router();

router.post('/login/', login);

export default router;