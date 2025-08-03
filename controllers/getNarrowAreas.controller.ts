import { Request, Response } from "express";
import NarrowAreas from "../models/narrowAreas.model";

export const getNarrowAreasController = async (req: Request, res: Response) => {
    try {
        const narrowAreas = await NarrowAreas.findAll();
        const narrowAreasJson = narrowAreas.map((narrowArea) => narrowArea.toJSON().narrow_area);
        res.status(200).json({ message: "SUCCESS", narrowAreasJson });
    } catch (error) {
        console.error("Error in getNarrowAreasController:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}