import {Request, Response} from 'express';
import Queries from '../models/queries.model';


export const queriesController = async (req: Request, res: Response) => {
    const user = req.session.user;
    const {content} = req.body;

    try {
        const query = await Queries.create({
            userId: user?.id,
            content: content
        });

        console.log("Query created:", query.toJSON());

        res.status(201).json({message: "Query submitted successfully", query: query});
        return;
        
    } catch (error) {
        console.error("Error processing query:", error);
        res.status(500).json({error: "Internal Server Error"});
        return;
    }
}