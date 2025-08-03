import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.EMAIL_SENDER);
console.log(process.env.GOOGLE_APP_PASSWORD);


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.GOOGLE_APP_PASSWORD
    }
})

export default transporter;
