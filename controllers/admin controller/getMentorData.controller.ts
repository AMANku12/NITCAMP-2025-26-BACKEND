import { Request, Response } from "express";
import User from "../../models/User.model";
import Mentor from "../../models/mentor.model";
import Domain from "../../models/domains.model";

export const getMentorDataController = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.user_id;
        const user = await User.findByPk(user_id);
        if(user === null){
            res.status(404).json({ error: "User not found" });
            return;
        }

        const mentor = await Mentor.findOne({ where: { user_id } });
        if(mentor === null){
            res.status(404).json({ error: "No mentor data found" });
            return;
        }

        const mentorJson = mentor.toJSON();
        
        const branchObj = await Domain.findOne({ where: {  domain_name:"department", code: mentorJson.department_code } });
        const degreeObj = await Domain.findOne({ where: { domain_name:"degree", code: mentorJson.highest_degree_at_nitc_code } });

        const branchName = branchObj ? branchObj.get("value") : "unknown";
        const degreeName = degreeObj ? degreeObj.get("value") : "unknown";

        delete mentorJson.highest_degree_at_nitc_code;
        delete mentorJson.department_code;
        
        const mentorData = {
            ...mentorJson,
            degree: degreeName,
            department: branchName
        }

        res.status(200).json({ message: "SUCCESS", user, mentor: mentorData });
        return;
    } catch (error) {
        console.error("Error fetching mentor data:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
}