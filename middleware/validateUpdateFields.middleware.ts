import { NextFunction, Request, Response } from "express";


export const validateUpdateFeilds = (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.user;
    if (user && user.role === "mentee") {
        const restricted_feilds = [
            "id", "user_id", "roll_no", "year_of_admission",
            "degree_code", "branch_code", "createdAt", "updatedAt"
        ];

        const requestFeilds = Object.keys(req.body);
        const forbidden_feilds = requestFeilds.filter((feild) => restricted_feilds.includes(feild));

        if (forbidden_feilds.length > 0) {
            console.log("update route error, tried to update unwanted fields (mentee)");
            res.status(400).json({
                error: `The following fields are not allowed: ${forbidden_feilds.join(", ")}`,
            });
            return;
        }

        return next();
    } else if (user && user.role === "mentor") {
        const restricted_feilds = [
            "id", "user_id", "createdAt", "updatedAt"
        ];

        const requestFeilds = Object.keys(req.body);
        const forbidden_feilds = requestFeilds.filter((feild) => restricted_feilds.includes(feild));

        if (forbidden_feilds.length > 0) {
            console.log("update route error, tried to update unwanted fields (mentor)");
            res.status(400).json({
                error: `The following fields are not allowed: ${forbidden_feilds.join(", ")}`,
            });
            return;
        }

        return next();
    } else {
        res.status(403).json({ message: "Forbidden" });
        return;
    }
};