import { Request, Response } from "express";
import MatchedUsers from "../models/matched_users.model";
import Mentor from "../models/mentor.model";
import User from "../models/User.model";
import { getDomainsValues } from "../services/getDomainsValues.service";

const MODE = process.env.MODE;

export const getMyMentorController = async(req: Request, res: Response)=>{
    const user = req.session.user;
    if(!user){
        res.status(401).json({error: "Something went wrong"});
        return ;
    }
    try {
        const matchedMentor = await MatchedUsers.findOne({where: {mentee_user_id: user.id}});
        // incomplete
        if(!matchedMentor){
            res.status(200).json({message: "FAILED",mentor: null});
            return;
        }        
        const matchedMentorJson = matchedMentor.toJSON();

        const mentor = await Mentor.findOne({
            include:[{
                model: User,
                as: 'user',
                where: {is_active: true}
            }],
            where: {user_id: matchedMentorJson.mentor_user_id}
            });
        if(!mentor){
            res.status(200).json({message: "FAILED",mentor: null});
            return;
        }

        // remove degree code and department code and combine their names instead
        const mentorJson = mentor.toJSON();
        const highest_degree_at_nitc = await getDomainsValues("degree", mentorJson.highest_degree_at_nitc_code);
        const department = await getDomainsValues("department", mentorJson.department_code);
        delete mentorJson.highest_degree_at_nitc_code;
        delete mentorJson.department_code;
        mentorJson.highest_degree_at_nitc = highest_degree_at_nitc;
        mentorJson.department = department;

        console.log("Mentor found:", mentorJson);
        res.status(200).json({message: "SUCCESS", mentor: mentorJson});  // user info will be inside mentor object

        return;
    } catch (error) {
        console.log("Error in getMyMentorController:", error);
        res.status(500).json({error: "Internal Server Error"});
        return;
    }
}