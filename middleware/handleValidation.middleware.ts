import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const handleValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    console.log("Feild validation errors in google auth:",errors.array());
    return;
  }
  next();
};
