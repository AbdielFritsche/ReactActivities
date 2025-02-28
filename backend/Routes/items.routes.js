import { Router } from "express";
import { getItems, getItem, postItem, putItem, deleteItem } from "../Controladores/items.controladores.js";

const router = Router(); 
router.get("/items/", getItems);

router.get("/items/:item_id", getItem);

router.post('/items/', postItem);

router.put('/items/:item_id', putItem);

router.delete("/items/:item_id", deleteItem);


export default router;