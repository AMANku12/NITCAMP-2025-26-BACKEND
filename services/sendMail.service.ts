import transporter from "../utility/nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendMail = async(email: string, subject: string, text: string)=>{
    try {
        const mailOptions = {
            from: `"NITC Mentorship Program" <${process.env.EMAIL_SENDER}>`,
            to: email,
            bcc: process.env.BCC_EMAIL?.split(",") || [], // Fallback to empty array
            subject: subject,
            text: text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent:", info);
        return ;
    } catch (error) {
        console.log("Error in sending mail:", error);
        return ;
    }    
}
