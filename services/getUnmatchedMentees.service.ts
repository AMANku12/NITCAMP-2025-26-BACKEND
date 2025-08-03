import MatchedUsers from "../models/matched_users.model";
import Mentee from "../models/mentee.model";
import User from "../models/User.model";
import { Op } from "sequelize";

export const getUnmatchedMentees = async () => {
    try {
        const matched = await MatchedUsers.findAll({ attributes: ['mentee_user_id'] });
        const matchedIds = matched.map(m => m.get('mentee_user_id'));

        // Step 2: Query mentees who are NOT in matchedIds
        const unmatchedMentees = await Mentee.findAll({
            attributes: ['user_id', 'broad_area_of_interest', 'narrow_area_of_interest'],
            where: {
                user_id: { [Op.notIn]: matchedIds.length > 0 ? matchedIds : [0] }
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: [],
                    where: { is_active: true }
                }
            ],
        });

        if (unmatchedMentees.length === 0) {
            return null;
        }
        const unmatchedMenteesJson = unmatchedMentees.map(( unmatchedMentee) => unmatchedMentee.toJSON());
        return unmatchedMenteesJson;
    } catch (error) {
        throw error;
    }
}