import { Router } from "express";
import { login } from "../Controladores/login.controladores.js";

const router = Router();

router.get('/login/', login);

export default router;