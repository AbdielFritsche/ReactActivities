import { Router } from "express"
import { validateJWT } from "../Utils/tokens";
import { getUser,getUsers,deleteUser } from "../Controladores/users.controladores";

const router = Router();

router.get('/users/',validateJWT, getUsers);

router.get('/users/:user_id',validateJWT,getUser);

router.delete("/users/:user_id",validateJWT, deleteUser);