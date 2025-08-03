import { Request, Response } from "express";
import Mentee from "../../models/mentee.model";
import User from "../../models/User.model";

export const menteeDBController = async (req: Request, res: Response) => {
  try {
    const mentees = await Mentee.findAll({
      include: [
        {
          model: User,
          as: "user",
          where: { is_active: true },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!mentees || mentees.length === 0) {
      res.status(404).json({ error: "No mentees found" });
      return;
    }

    res.status(200).json({ message: "SUCCESS", mentees });
    return;
  } catch (error: any) {
    console.error("Error in menteeDBController:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
    return;
  }
};