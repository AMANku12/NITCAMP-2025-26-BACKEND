import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/consts';

export const generateToken = (id: number, email: string, role: string): string => {
    const secret = JWT_SECRET;
    
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({ id, email, role }, secret, { expiresIn: "24d" });
};
