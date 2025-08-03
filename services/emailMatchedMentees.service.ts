import { sendMail } from "./sendMail.service";
import User from "../models/User.model";
import { matchedMenteeEmail } from "../config/emailcontent";

export const emailMatchedMentees =async (matchedUsers: any)=>{
    for(let matchedUser of matchedUsers){
        try {
            // get the mentee
            const mentee = await User.findOne({where: {id: matchedUser.mentee_user_id}});
            if(!mentee){
                console.log("Mentee not found");
                continue;
            }

            // get the mentor
            const mentor = await User.findOne({where: {id: matchedUser.mentor_user_id}});
            if(!mentor){
                console.log("Mentor not found");
                continue;
            }
            const menteeEmail = mentee.toJSON().email; // mentee email

            const emailContent = matchedMenteeEmail(mentee.toJSON().fullname, mentor.toJSON().fullname); // email content

            await sendMail(menteeEmail, emailContent.subject, emailContent.text); 
        } catch (error) {
            console.log(error);
            continue;
        }
    }
    return;
}