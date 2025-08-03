import { Request, Response } from "express";
import User from "../../models/User.model";
import Mentee from "../../models/mentee.model";
import Branch_Codes from "../../models/branch_codes.model";
import Degree_Codes from "../../models/degree_codes.model";
import { getDomainsValues } from "../../services/getDomainsValues.service";

export const getMenteeDataController = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.user_id;
        const user = await User.findByPk(user_id);
        if(user === null){
            res.status(404).json({ error: "User not found" });
            return;
        }

        const mentee = await Mentee.findOne({ where: { user_id } });
        if(mentee === null){
            res.status(404).json({ error: "No mentee data found" });
            return;
        }

        const menteeJson = mentee.toJSON();
        
        const degree = await getDomainsValues("degree", menteeJson.degree_code); 
        const branch = await getDomainsValues("department", menteeJson.branch_code); 
        delete menteeJson.degree_code;
        delete menteeJson.branch_code;
        menteeJson.degree = degree;
        menteeJson.branch = branch;

        res.status(200).json({ message: "SUCCESS", user, mentee: menteeJson });
        return;
    } catch (error) {
        console.error("Error fetching mentee data:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
}