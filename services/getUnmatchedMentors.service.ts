import Mentor from "../models/mentor.model";
import User from "../models/User.model";
import { Op } from "sequelize";

export const getUnmatchedMentors = async() => {
    try {
        const unmatchedMentors = await Mentor.findAll({
            attributes: ['user_id', 'mentee_capacity', 'broad_area_of_expertise', 'narrow_area_of_expertise'],

            include: [
                {
                    model: User,
                    as: 'user', // use the correct alias if defined in association
                    attributes: [],
                    where: { is_active: true }
                },
            ],
            where: { mentee_capacity: { [Op.gt]: 0 } },
        });

        if(unmatchedMentors.length === 0){
            return null;
        }
        const unmatchedMentorsJson = unmatchedMentors.map((unmatchedMentor) => unmatchedMentor.toJSON());
        return unmatchedMentorsJson;

    } catch (error) {
        throw error;
    }    
}
