import { Request, Response } from 'express';
import User from '../../models/User.model';
import Mentor from '../../models/mentor.model';
import Mentee from '../../models/mentee.model';
import MatchedUsers from '../../models/matched_users.model';

export const homepageController = async (req: Request, res: Response) => {
    const user = req.session.user;

    try {
        const noOfUsers = await User.count({where: {is_active: true}});
        
        const noOfMentors = await Mentor.count({
            include:[
                {
                    model: User,
                    as: 'user',
                    where: {is_active: true}
                }
            ]
        });

        const noOfMentees = await Mentee.count({
            include:[
                {
                    model: User,
                    as: 'user',
                    where: {is_active: true}
                }
            ]
        });

        // add no of matched users

        const matchedUsers = await MatchedUsers.count();

        const unmatchedMentees = noOfMentees- matchedUsers;

        res.status(200).json({
            message: "SUCCESS",
            data: {noOfUsers, noOfMentors, noOfMentees, matchedUsers, unmatchedMentees}
        });
        
        return;

    } catch (error) {
        console.error("Error fetching homepage data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

