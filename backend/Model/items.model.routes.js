import { Router } from "express";
import { getItems, getItem, postItem, putItem, deleteItem } from "./item.model.controladores.js";

const router = Router(); 
router.get("/items_mongo/", getItems);

router.get("/items_mongo/:item_id", getItem);

router.post('/items_mongo/', postItem);

router.put('/items_mongo/:item_id', putItem);

router.delete("/items_mongo/:item_id", deleteItem);


export default router;