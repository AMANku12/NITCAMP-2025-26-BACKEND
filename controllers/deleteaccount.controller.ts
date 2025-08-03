import { Response, Request } from "express";
import User from "../models/User.model";
import { searchDB } from "../services/auth.service";
import Deleted_Account from "../models/deleted_accounts.model";
import {omit} from "lodash";
import MatchedUsers from "../models/matched_users.model";
import Mentor from "../models/mentor.model";

export const deleteAccountController = async( req: Request, res: Response)=>{
    console.log("deleteAccountController called");
    const user = req.session.user;
    console.log("Session user:", user);
    if(!user){
        console.log("No user found in session");
        res.status(401).json({error: "something wrong with the token"});
        return ;
    }

    try {
        // const tempUser = omit(user.toJSON(), ["id", "createdAt", "updatedAt", "is_active"]);

        // const roleData = await searchDB(userId, user.toJSON().role);

        // if(!roleData){
        //     await Deleted_Account.create({user_info: user.toJSON})
        //     .then(()=>{
        //         console.log("Deleted account save successfully, but no roleDatafound");
        //     }).catch((err)=>{
        //         throw err;
        //     });
        // }
        // else{
        //     const tempRoleData = omit(roleData, ["id", "user_Id", "createdAt", "updatedAt"])
        //     await Deleted_Account.create({user_info: tempUser, role_data: tempRoleData})
        //     .then(()=>{
        //         console.log("account deleted successfully");
        //     }).catch((err)=>{
        //         throw err;
        //     })
        // }
        let matchedData : any = null;
        console.log("Checking user role for matched data");
        if(user.role === "mentee"){
            console.log("User is a mentee, searching for matched mentor");
            const matchedDataRaw = await MatchedUsers.findOne({where: {mentee_user_id: user.id}, attributes: ["mentor_user_id"]});

            if(matchedDataRaw){
                matchedData = matchedDataRaw.toJSON();
                console.log("Matched mentor found:", matchedData);
            }else{
                matchedData = null;
                console.log("No matched mentor found for this mentee");
            }
        }
       
        console.log("Attempting to delete user with id:", user.id);
        await User.destroy({where: {id: user.id}})
            .then(async ()=>{
                console.log("Account deleted successfully");
                res.status(204).json({message: "SUCCESS"});
                if (matchedData && matchedData.mentor_user_id) {
                    console.log("Incrementing mentor's mentee capacity for mentor_user_id:", matchedData.mentor_user_id);
                    await Mentor.increment(
                        { mentee_capacity: 1 },
                        { where: { user_id: matchedData.mentor_user_id } }
                    ).then(() => {
                        console.log("Mentor's mentee capacity incremented successfully");
                    }).catch((err) => {
                        console.error("Error incrementing mentor's mentee capacity:", err);
                    });
                }
                return;
            }).catch((err)=>{
                console.error("Error deleting user:", err);
                throw err;
            });
        
        console.log("deleteAccountController completed successfully");
        return;
        
    } catch (error) {
        console.error("error in deleting the account:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
}
