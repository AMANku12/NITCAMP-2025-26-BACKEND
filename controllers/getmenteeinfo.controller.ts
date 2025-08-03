import { Request, Response } from "express";
import { menteeInitailInfo } from "../services/menteeInitailnfo.service";

export const getMenteeExtraInfoController = async(req: Request, res: Response)=>{
    console.log("✅ Get Mentee Extra Info Controller Hit");
    try {
        const user = req.session.user;
        if(!user){
            res.status(401).json({error: "User not found"});
            return;
        }

        const menteeExtraInfo = await menteeInitailInfo(user.email);
        res.status(201).json({message:"SUCCESS", menteeExtraInfo});
        return;
        
    } catch (error) {
        console.log("Error in getting mentee info:", error);
        res.status(500).json({error: "Internal Server Error"});
        return;
    }    
}
