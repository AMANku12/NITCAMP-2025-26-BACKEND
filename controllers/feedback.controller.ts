import {Request, Response} from 'express';
import Feedback from '../models/feedback.model';


export const feedbackController = async (req: Request, res: Response) => {
    const user = req.session.user;
    if(!user){
        console.log("No user found");
        res.status(401).json({error: "No user found"});
        return;
    }
    const {content} = req.body;

    try {
        const feedback = await Feedback.create({
            user_id: user.id,
            content: content
        });

        console.log("Feedback created:", feedback.toJSON());

        res.status(201).json({message: "Feedback submitted successfully", feedback: feedback});
        return;

    } catch (error) {
        console.error("Error processing feedback:", error);
        res.status(500).json({error: "Internal Server Error"});
        return;
        
    }
}