import { Request, Response, NextFunction } from "express";

export const validateMentee = (req: Request, res: Response, next: NextFunction)=>{
    if(req.user && req.user.role !== "mentee"){
        console.log("Not a mentee", req.user.email);
        res.status(403).json({error: "Not a mentee"});
        return ;
    }
    next();
}