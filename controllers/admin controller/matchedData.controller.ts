import { Request, Response } from "express";
import MatchedUsers from "../../models/matched_users.model";
import sqllogger from "../../utility/sqllogger";

const MODE = process.env.MODE;

export const getMatchedDataController = async( req: Request, res: Response)=>{
    const admin = req.session.user;
    try {
        const matchedUsers = await MatchedUsers.findAll({ order: [["createdAt", "DESC"]] });

        if(!matchedUsers || matchedUsers.length==0){
            console.log("No users are matched yet");
            res.status(404).json({error: "No matched users"});
            if(MODE==="production"){
                sqllogger.error("No users are matched yet");
            }
            return;
        }

        console.log("Fetched matched data:", matchedUsers.map(user => user.toJSON()));

        res.status(200).json({message: "SUCCESS", matchedUsers});
        
        if(MODE==="production"){
            sqllogger.info("Fetched and sent matched users data to the admin",admin?.email);
        }
        return;
    } catch (error) {
        console.log("Error in fetching matched users data:",error);
        res.status(500).json({error: "Internal server error"});
        if(MODE==="production"){
            sqllogger.error("Error in fetching matched users data",error);
        }
        return;
    }
}