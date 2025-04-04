import { Router } from "express";
import { getItems, getItem, postItem, putItem, deleteItem } from "../Controladores/items.controladores.js";
import { validateJWT } from "../Utils/tokens.js";

const router = Router(); 
router.get("/items/",validateJWT, getItems);

router.get("/items/:item_id",validateJWT, getItem);

router.post('/items/',validateJWT, postItem);

router.put('/items/:item_id',validateJWT, putItem);

router.delete("/items/:item_id",validateJWT, deleteItem);


export default router;