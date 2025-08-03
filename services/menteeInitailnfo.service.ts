import { getDomainsValues } from "./getDomainsValues.service";

export const menteeExtraInfo = (email: string)=>{

    const roll = email.toLocaleLowerCase().split("_")[1].split("@")[0];

    const extraInfo = {
        rollNo: roll,
        yearOfAdd: parseInt("20" + roll.substring(1, 3)),
        degree_code: roll[0],
        branch_code: roll.slice(-2)
    };
    return extraInfo;
}

export const menteeInitailInfo = async(email: string)=>{
    const extraInfo = menteeExtraInfo(email);
    const branch = await getDomainsValues("department", extraInfo.branch_code);
    const degree = await getDomainsValues("degree", extraInfo.degree_code);
    return {
        roll_no: extraInfo.rollNo,
        year_of_admission: extraInfo.yearOfAdd,
        degree: degree,
        branch: branch
    };
}

