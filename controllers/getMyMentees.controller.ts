import { Request, Response } from "express";
import MatchedUsers from "../models/matched_users.model";
import Mentee from "../models/mentee.model";
import User from "../models/User.model";
import { getDomainsValues } from "../services/getDomainsValues.service";

const MODE = process.env.MODE;

export const getMyMenteesController = async(req: Request, res: Response)=>{
    const user = req.session.user;
    if(!user){
        res.status(401).json({error: "Something went wrong"});
        return ;
    }
    try {
        const matchedMentees = await MatchedUsers.findAll({where: {mentor_user_id: user.id}});

        if(!matchedMentees){
            res.status(200).json({message: "FAILED",mentees: null});
            return;
        }        
        const matchedMenteesJson = matchedMentees.map((matchedMentee) => matchedMentee.toJSON());
        const mentees = await Mentee.findAll({
            include:[{
                model: User,
                as: 'user',
                where: {is_active: true}
            }],
            where: {user_id: matchedMenteesJson.map((matchedMentee) => matchedMentee.mentee_user_id)}
            });
        if(!mentees){
            res.status(200).json({message: "FAILED",mentees: null});
            return;
        }

        const menteesJson = mentees.map((mentee) => mentee.toJSON());
        for(let mentee of menteesJson){
            const degree = await getDomainsValues("degree", mentee.degree_code); 
            const branch = await getDomainsValues("department", mentee.branch_code); 
            delete mentee.degree_code;
            delete mentee.branch_code;
            mentee.degree = degree;
            mentee.branch = branch;
        }

        console.log("Mentees found:", menteesJson);
        res.status(200).json({message: "SUCCESS", mentees: menteesJson}); // mentees will be an array of objects in which user info will be inside each object
        return;
    } catch (error) {
        console.log("Error in getMyMenteesController:", error);
        res.status(500).json({error: "Internal Server Error"});
        return;
    }
}