import { Request, Response, NextFunction } from "express";

export const validateMentor = (req: Request, res: Response, next: NextFunction)=>{
    if(req.user && req.user.role !== "mentor"){
        console.log("Not a mentor", req.user.email);
        res.status(403).json({error: "Not a mentor"});
        return ;
    }
    next();
}