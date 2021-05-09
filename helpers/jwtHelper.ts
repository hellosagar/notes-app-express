import { NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verfyToken =  function auth(
    req: any,
    res: any,
    next: NextFunction
    ) {
    const token = req.header("auth-token")
    if (!token) return res.status(401).send("Access Denied")

    try{
        const verified = jwt.verify(token, "asjkdgjasgdkgasjdgjhafgsdjhasfgdjasgdjgasd")
        console.log(verified);
        
        req.user = verified;
        next()
    }catch(err){    
        res.send(400).send("Invalid Token")
    }
}