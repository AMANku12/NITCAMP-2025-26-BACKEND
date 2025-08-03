import { Request, Response } from "express";
import User from "../models/User.model";

export const holdAccountController = async(req: Request, res:Response)=>{
    const user = req.user;
    if(!user){
        res.status(401).json({error: "Something went wrong"});
        return ;
    }
    try {
        const updatedUser = await User.update(
            {is_active: false},
            {where: {id : user.id}}
        );
        if(updatedUser[0]===0){
            console.log("User not found");
            res.status(404).json({error: "User not found"});
            return;
        }
        console.log("User is set as inactive");
        // delete cookie
        res.clearCookie("token");
        res.status(200).json({message: "SUCCESS"}); // log him out once you get success message
        return ;

    } catch (error) {
        console.log("Error in hold account controller:", error);
        res.status(500).json({error: "Internal Server Error"});
        return ;
    }
}