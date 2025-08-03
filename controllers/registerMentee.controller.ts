import { Request, Response } from "express";
import Mentee from "../models/mentee.model";
import Mentor from "../models/mentor.model";
import User from "../models/User.model";
import { generateToken } from "../services/tokengenerator.service";
import { createNewMentee } from "../services/menteeRegister.service";
import { COOKIE_OPTIONS } from "../config/consts";
import { newMenteeRegistered } from "../config/emailcontent";
import { sendMail } from "../services/sendMail.service";
import { updateUser } from "../services/updateUserRole.service";

export const menteeController = async (req: Request, res: Response) => {
    const user = req.session.user;
    const { role, menteeData } = req.body;

    console.log("Starting menteeController");

    if (role !== "mentee") {
        console.log("Sending 401: Wrong API called");
        res.status(401).json({ error: "Wrong API called" });
        return;
    }

    if (!user?.id || !user?.email || !user?.role) {
        console.log("Sending 400: Invalid token information");
        res.status(400).json({ error: "Invalid token information" });
        return;
    }

    try {
        console.log("Creating new mentee");
        const newMentee = await createNewMentee(user, menteeData);
        console.log("New mentee added:", newMentee);

        console.log("Updating user role");
        user.role = "mentee";
        const updatedUser = await updateUser(user, "mentee");

        console.log("Updating session");
        req.session.user = { id: updatedUser.id, email: updatedUser.email, role: updatedUser.role };
        req.session.save();

        console.log("Sending 201: Success response");
        res.status(201).json({ message: "SUCCESS", user: updatedUser, newMentee });

        // Send email in background - completely isolated from main flow
        process.nextTick(() => {
            (async () => {
                try {
                    console.log("Sending email");
                    const emailContent = newMenteeRegistered(updatedUser.fullname);
                    await sendMail(updatedUser.email, emailContent.subject, emailContent.text);
                    console.log("Email sent successfully");
                } catch (error) {
                    console.log("Error in sending email to the mentee:", error);
                }
            })().catch((error) => {
                console.log("Unhandled error in email sending:", error);
            });
        });
        return;

    } catch (error) {
        console.log("Caught error in menteeController:", error);
        if (!res.headersSent) {
            console.log("Sending 500: Internal Server Error");
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            console.log("Headers already sent, skipping response");
        }
        return;
    }
};