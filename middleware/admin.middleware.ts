import { Request, Response, NextFunction } from "express";
import sqllogger from "../utility/sqllogger";

const MODE = process.env.MODE;

export const adminValidation = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        if (req.user.role === "admin") {
            return next();
        } else {
            res.status(403).json({ error: "Forbidden: Admins only" }); // 403 for authenticated but not allowed
            if(MODE==="production"){
                sqllogger.error("Unauthorized user tried accessing admin route", { email: req.user.email, role: req.user.role });
            }
            return;
        }
    } else {
        res.status(401).json({ error: "Unauthorized: No user found" }); // 401 for not authenticated
        if(MODE==="production"){
            sqllogger.error("Unauthenticated user tried accessing admin route");
        }
        return;
    }
}