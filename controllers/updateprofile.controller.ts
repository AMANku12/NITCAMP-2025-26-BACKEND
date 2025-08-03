import { Request, Response } from "express";
import Mentee from "../models/mentee.model";
import Mentor from "../models/mentor.model";
import User from "../models/User.model";

export const updateProfileController = async( req: Request, res: Response) => {
    const user = req.session.user;
    const updateFields = req.body;

    if (!user) {
        res.status(401).json({ error: "Unauthorized: No user data found in token" });
        return;
    }

    try {

        if (user.role === "mentee") {

            const updatedMentee = await Mentee.update(
                { ...updateFields },
                { where: { user_id: user.id }, returning: true }
            );

            if (updatedMentee[0] === 0) {
                res.status(404).json({ error: "Mentee not found" });
                return;
            }
            
            console.log("Updated mentee profile:", updatedMentee[1][0]?.toJSON());

            res.status(200).json({ message: "Mentee profile updated successfully", updateFields: updatedMentee[1][0]?.toJSON() });

            return;

        } else if (user.role === "mentor") {

            const updatedMentor = await Mentor.update(
                { ...updateFields },
                { where: { user_id: user.id }, returning: true }
            );

            if (updatedMentor[0] === 0) {
                res.status(404).json({ error: "Mentor not found" });
                
                return;
            }

            console.log("Updated mentor profile:", updatedMentor[1][0]?.toJSON());

            res.status(200).json({ message: "Mentor profile updated successfully", updateFields: updatedMentor[1][0] });

            return;

        } 
        res.status(400).json({ message: "Invalid user role" });

        return;

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
}