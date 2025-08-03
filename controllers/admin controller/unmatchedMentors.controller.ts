import { Request, Response } from "express";
import { getUnmatchedMentors } from "../../services/getUnmatchedMentors.service";


export const unmatchedMentorsController = async (req: Request, res: Response) => {
    try {
        const unmatchedMentors = await getUnmatchedMentors();

        if(unmatchedMentors === null){
            res.status(404).json({ error: "No unmatched mentors found" });
            return;
        }

        res.status(200).json({ message: "SUCCESS", unmatchedMentors });
        return;
    } catch (error) {
        console.error("Error in unmatchedMentorsController:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
}
