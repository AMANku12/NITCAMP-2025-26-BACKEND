import { Response, Request } from "express";
import Mentor from "../../models/mentor.model";
import User from "../../models/User.model";

export const mentorDBController = async (req: Request, res: Response) => {

    try {
        const mentors = await Mentor.findAll({ 
            include:[
                {
                    model: User,
                    as: 'user',
                    where: {is_active: true}
                }
            ],
            order: [["createdAt", "DESC"]] 
        });
        
        if (!mentors || mentors.length === 0) {
            res.status(404).json({ error: "No mentors found" });
            return;
        }
        console.log("Fetched mentors:", mentors.map(user => user.toJSON()) );

        res.status(200).json({ message: "SUCCESS", mentors });
        return;
        
    } catch (error) {
        console.error("Error in mentorDBController:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
        
    }
}