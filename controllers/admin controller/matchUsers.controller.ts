import { Request, Response } from "express";
import { getUnmatchedMentees } from "../../services/getUnmatchedMentees.service";
import { getUnmatchedMentors } from "../../services/getUnmatchedMentors.service";
import { matchUsers } from "../../services/matchUsers.service";
import MatchedUsers from "../../models/matched_users.model";
import { emailMatchedMentees } from "../../services/emailMatchedMentees.service";
import { emailMatchedMentors } from "../../services/emailMatchedMentors.service";

export const matchUsersController = async (req: Request, res: Response) => {
    
    try {
        const menteesArray = await getUnmatchedMentees();

        if(menteesArray === null){
            res.status(404).json({ error: "No mentees found to be matched" });
            return;
        }

        const mentorsArray = await getUnmatchedMentors();

        if(mentorsArray === null){
            res.status(404).json({ error: "No mentors found to be matched" });
            return;
        }

        const matchedUsers = await matchUsers(menteesArray, mentorsArray);

        if(matchedUsers === null){
            res.status(404).json({ error: "No user matched" });
            return;
        }

        // store matched users in database
        const responseData = [];
        for(const user of matchedUsers){
            const matchedUser = await MatchedUsers.create(user);
            responseData.push(matchedUser.toJSON());
        }

        res.status(200).json({ message: "SUCCESS", matchedUsers: responseData });  
        
        // send each user an email
        await emailMatchedMentees(matchedUsers);
        await emailMatchedMentors(matchedUsers);
        
        return;
        
    } catch (error) {
        console.error("Error matching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
}