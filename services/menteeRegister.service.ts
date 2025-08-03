import Mentee  from "../models/mentee.model";
import User from "../models/User.model";
import { menteeExtraInfo } from "./menteeInitailnfo.service";
import { getDomainsValues } from "./getDomainsValues.service";

export const createNewMentee = async (user: any, menteeData: any) => {
    try {
        const extraInfo = menteeExtraInfo(user.email);

        const newMentee = await Mentee.create({ 
            user_id: user?.id,
            roll_no: extraInfo.rollNo,
            year_of_admission: extraInfo.yearOfAdd,
            personal_email: menteeData.personal_email,
            phone_no: menteeData.phone_no,
            degree_code: extraInfo.degree_code,
            branch_code: extraInfo.branch_code,
            broad_area_of_interest: menteeData.broad_area_of_interest,
            narrow_area_of_interest: menteeData.narrow_area_of_interest
        });

        const branch = await getDomainsValues("department", extraInfo.branch_code);
        const degree = await getDomainsValues("degree", extraInfo.degree_code);

        const menteeJson = newMentee.toJSON();
        delete menteeJson.degree_code;
        delete menteeJson.branch_code;
        return {
            ...menteeJson,
            degree: degree,
            branch: branch
        };

    } catch (error) {
        throw error;
    }
}


