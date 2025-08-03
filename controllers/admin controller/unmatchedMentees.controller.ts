import { Request, Response } from "express";
import { getUnmatchedMentees } from "../../services/getUnmatchedMentees.service";


export const unmatchedMenteesController = async (req: Request, res: Response) => {
    try {
        const unmatchedMentees = await getUnmatchedMentees();

        if(unmatchedMentees === null){
            res.status(404).json({ error: "No unmatched mentees found" });
            return;
        }

        res.status(200).json({ message: "SUCCESS", unmatchedMentees });
        return;
    } catch (error) {
        console.error("Error in unmatchedMenteesController:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
}
