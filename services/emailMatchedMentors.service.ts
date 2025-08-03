import User from "../models/User.model";
import { matchedMentorEmail } from "../config/emailcontent";
import { sendMail } from "./sendMail.service";

export const emailMatchedMentors =async (matchedUsers: any)=>{
    const mentorIds = matchedUsers.map((matchedUser: any)=> matchedUser.mentor_user_id);
    const uniqueMentorIds = [...new Set(mentorIds)]; 

    for(let mentorId of uniqueMentorIds){
        try {
            // get the mentor
            const mentor = await User.findOne({where: {id: mentorId}});
            if(!mentor){
                console.log("Mentor not found");
                continue;
            }

            const mentorEmail = mentor.toJSON().email; 

            // get email content
            const emailContent = matchedMentorEmail(mentor.toJSON().fullname); 

            // send email
            await sendMail(mentorEmail, emailContent.subject, emailContent.text); 
            
        } catch (error) {
            console.log(error);
            continue;
        }
    }
    return;
}