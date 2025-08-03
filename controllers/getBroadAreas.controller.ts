import { Request, Response } from "express";
import BroadAreas from "../models/broadAreas.model";

export const getBroadAreasController = async (req: Request, res: Response) => {
    try {
        const broadAreas = await BroadAreas.findAll();
        const broadAreasJson = broadAreas.map((broadArea) => broadArea.toJSON().broad_area);
        res.status(200).json({ message: "SUCCESS", broadAreasJson   });
        return;
    } catch (error) {
        console.error("Error in getBroadAreasController:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
}   