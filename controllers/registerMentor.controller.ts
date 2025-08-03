import { Request, Response } from "express";
import Mentor from "../models/mentor.model";
import User from "../models/User.model";
import { generateToken } from "../services/tokengenerator.service";
import { updateUser } from "../services/updateUserRole.service";
import { COOKIE_OPTIONS } from "../config/consts";
import { createNewMentor } from "../services/mentorRegister.service";
import { newMentorRegistered } from "../config/emailcontent";
import { sendMail } from "../services/sendMail.service";

export const mentorController = async(req: Request, res: Response)=>{
    const user = req.session.user;
    const {role, mentorData} = req.body;

    if(!user || user.role!=="newuser"){
        console.log("Not a newuser");
        res.status(401).json({error: "Not a new user"});
        return ;
    }

    if(role!=="mentor"){
        res.status(401).json({error: "Wrong api called"});
        return;
    }

    try {

        const newMentor = await createNewMentor(user.id, mentorData);

        console.log("New mentor added:", newMentor);

        user.role = "mentor";

        const updatedUser = await updateUser(user, "mentor");

        req.session.user = { id: updatedUser.id, email: updatedUser.email, role: updatedUser.role };
        req.session.save();

        res.status(201).json({message: "SUCCESS", user: updatedUser, newMentor});

        // send email to the mentor
        process.nextTick(async () => {
            try {
                console.log("Sending email");
                const emailContent = newMentorRegistered(updatedUser.fullname);
                await sendMail(updatedUser.email, emailContent.subject, emailContent.text);
            } catch (error) {
                console.log("Error in sending email to the mentor:", error);
            }
        });
        return;

    } catch (error) {
        console.log("Error in creating mentor:", error);
        res.status(500).json({error: "Internal Server Error"});
        return ;
    }
}
    