import jwt from "jsonwebtoken";
import { Router } from "express"


export const validateJWT = Router()

validateJWT.use((req,res,next) => {
    let token = req.headers.authorization;

    if (!token) {
        res.status(401).json({
            msg:"Se require un token"
        })
        return
    }

    if (token.startsWith("Bearer")){
        token = token.split(" ")[1]
    }
    jwt.verify(token,process.env.JWT,(err,decode) => {
        if(err){
            res.status(401).json({
                msg:"Token no autorizado",
                error: err.msg
            })
            return
        }

        req.decode = decode;
        next();

    })

});