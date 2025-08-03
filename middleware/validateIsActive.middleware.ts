import { Request, Response, NextFunction } from "express";
import sqllogger from "../utility/sqllogger";
import User from "../models/User.model";

const MODE = process.env.MODE;

export const validateIsActive = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.user;
    if(!user){
        res.status(401).json({error: "Something went wrong"});
        return ;
    }
    try {
        const dbUser = await User.findOne({ where: { id: user.id } });
        if (!dbUser?.toJSON().is_active) {
            res.status(403).json({ error: "User is inactive" });
            return;
        }
        next();
    } catch (error) {
        console.log("Error in validateIsActive middleware:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
}
