import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../config/consts";
import dotenv from "dotenv";
dotenv.config();


const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// console.log("Google OAuth2 client initialized with client ID:", GOOGLE_CLIENT_ID);

export const googleTokenValidation = async (token: string): Promise<any> => {
    try {
        if(process.env.MODE==="testing"){
            const payload = {
                email: "demomentee_b220789ch@nitc.ac.in",
                name: "Demo mentee",
                picture: "https://lh3.googleusercontent.com/a/ACg8ocKC9RGHSQ5zRpo6BuF8jRexEXbdapN-JAWLDzdJ0s67EVwoO8E=s96-c"
            }
            return payload;
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();

        if (!payload) {
            return null;
        }

        return {
            email: payload.email,
            name: payload.name,
            picture: payload.picture
        };

    } catch (error) {
        throw error;
    }
}