import Mentor from "../models/mentor.model";

export const createNewMentor = async (id: number, mentorData: any) =>{
    try {
        const newMentor = await Mentor.create({
            user_id: id,
            phone_no: mentorData.phone_no,
            year_graduated: mentorData.year_graduated,       // in the frontend show this as "yearGraduatedFromNitc"
            highest_degree_at_nitc_code: mentorData.highest_degree_at_nitc_code,
            department_code: mentorData.department_code,
            mentoring_type: mentorData.mentoring_type,
            mentee_capacity: mentorData.mentoring_type === "community-mentoring" ? 1 : mentorData.mentee_capacity,
            broad_area_of_expertise: mentorData.broad_area_of_expertise,
            narrow_area_of_expertise: mentorData.narrow_area_of_expertise,
        });

        return newMentor.toJSON();
        
    } catch (error) {
        throw error;
    }
}
