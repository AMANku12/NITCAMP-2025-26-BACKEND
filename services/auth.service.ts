import { Model } from "sequelize";
import User from "../models/User.model";
import Mentee from "../models/mentee.model";
import Mentor from "../models/mentor.model";
import Branch_Codes from "../models/branch_codes.model";
import Degree_Codes from "../models/degree_codes.model";


export const findUserByEmail = async (email: string)=>{
    return await User.findOne({ where: { email } });
}

export const searchDB = async (userId: number, role: string): Promise<{ roleData: any }> => {
    switch (role) {
        case "mentee":
            const mentee = await Mentee.findOne({ 
                where: { user_id: userId }
            });
            
            if (!mentee) {
                return { roleData: null };
            }
            
            const menteeData = mentee.toJSON();
            
            // Manually fetch branch and degree information
            return {roleData: menteeData};
            break;
        case "mentor":
            const mentor = await Mentor.findOne({ where: { user_id: userId } });
            if (mentor) return { roleData: mentor.toJSON() };
            else return {roleData: null};
            break;
        default:
            console.log("Unknown role:", role);
    }
    return { roleData: {} };
}

export const createNewUser = async (fullname: string, email: string, photo: string) => {
    const newUser = await User.create({
            fullname,
            email,
            photo_url: photo
        });
    return newUser;
}
