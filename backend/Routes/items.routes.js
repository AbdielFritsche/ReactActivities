import { Router } from "express";
import { getItems } from "../Controladores/items.controladores.js";

const router = Router();    
router.get('/items/', getItems);


export default router;