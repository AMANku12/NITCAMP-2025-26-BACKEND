import { Request, Response } from "express";
import User from "../models/User.model";

export const unholdAccountController = async(req: Request, res:Response)=>{
    const user = req.user;
    if(!user){
        res.status(401).json({message: "Something went wrong"});
        return ;
    }
    try {
        const updatedUser = await User.update(
            {is_active: true},
            {where: {id : user.id}}
        );
        if(updatedUser[0]===0){
            console.log("User not found");
            res.status(404).json({message: "User not found"});
            return;
        }
        console.log("User is set as active");

        res.clearCookie("token");

        res.status(200).json({message: "SUCCESS"}); // make him login again
        return ;

    } catch (error) {
        console.log("Error in hold account controller:", error);
        res.status(500).json({message: "Internal Server Error"});
        return ;
    }
}