import { Request, Response } from "express";
import User from "../models/User.model";
import jwt from "jsonwebtoken";
import Mentee from "../models/mentee.model";
import Mentor from "../models/mentor.model";
import { googleTokenValidation } from "../services/google.service";
import { createNewUser, findUserByEmail, searchDB } from "../services/auth.service";
import { generateToken } from "../services/tokengenerator.service";
import { COOKIE_OPTIONS } from "../config/consts";
import sqllogger from "../utility/sqllogger";

const MODE = process.env.MODE;

// harsh laudu

const gAuthController = async (req: Request, res: Response) => {
  console.log("✅ Google Auth Controller Hit"); // 👈 Add this line
  const { googletoken } = req.body;

  try {
    const payload = await googleTokenValidation(googletoken);

    if (!payload) {
      console.log("Invalid Google token payload");
      res.status(401).json({ error: "INVALID GOOGLE TOKEN" });

      if(MODE==="production"){
        sqllogger.error("User login failed", {error: "Invalid google token"});
      }
      return;
    }

    const { email, name, picture } = payload;
    console.log("Google payload received:", {email, name} );

    const existingUser = await findUserByEmail(email);

    async function storeSessionData(id: number, email: string, role: string) {
      req.session.user = { id, email, role };
      req.session.save(); // Make sure to save the session
      return;
    }

    // 🔹 If user exists
    if (existingUser) {
      const userId = parseInt(existingUser.get("id") as string);
      const userEmail = existingUser.get("email") as string;
      const userRole = existingUser.get("role") as string;

      console.log("Existing user",{userEmail, userRole} );

      if (existingUser.get("is_active") === false) {
        console.log("User has inactivated his account", userEmail);
        const token = generateToken(userId, userEmail, userRole);
        // if his account is inactivated give him option to activate his account, if he does not, clear the cookie and log him out
        res.status(200).cookie("token", token, COOKIE_OPTIONS).json({ message: "Account deactivated by the user", user: existingUser.toJSON() }); // fullname , email, is_active, role
        if(MODE==="production"){
          sqllogger.warn("Inactive user login", userEmail);
        }
        return;
      }

      // 🔸 If user has no role yet (user logged in but did not fill his details)
      if (userRole === "newuser") {
        console.log("Existing user but no role data");
        storeSessionData(userId, userEmail, userRole);
        res.status(200)
          .json({
            message: "SUCCESS",
            user: existingUser,
            exist: true,
            role: userRole,
          });
          if(MODE==="production"){
            sqllogger.info("Existing user login with no role", userEmail);
          }
        return;
      }

      // admin login
      if(userRole === "admin"){
        console.log("Admin login");
        storeSessionData(userId, userEmail, userRole);
        res.status(200)
          .json({
            message: "SUCCESS",
            user: existingUser,
            exist: true,
            role: userRole,
          });
        if(MODE==="production"){
          sqllogger.info("Admin logged in", {userEmail});
        }
        return;
      }

      // 🔸 If user has a role (mentee/mentor)
      const roleData = await searchDB(userId, userRole);

      // when user exists and his role is not found in the database (maybe got deleted somehow) then we set his role in the user table back to "newuser"
      if(!roleData){
        console.log(`${userRole} data not found, setting his role as newuser`);
            const updatedUser = await User.update(
                {role: "newuser"},
                {where: {id: userId}, returning: true}
            );

            storeSessionData(userId, userEmail, "newuser");
            res.status(200).json({
              message: "User login success but role data was not found",
              user: updatedUser[1][0],
              exist: true,
              role: "newuser",
              roleData: {}
            })
            if(MODE==="production"){
              sqllogger.warn("Existing user login with no role data found due to some error", {userEmail, previous_role: userRole, new_role: "newuser"});
            }
            return;
      }

// ----------------------------------------------------------------------------------------------------
  
      // existing mentee or mentor login
      storeSessionData(userId, userEmail, userRole);

      res.status(200)
        .json({
          message: "SUCCESS",
          user: existingUser,
          exist: true,
          role: userRole,
          roleData
        });
      if(MODE==="production"){
        sqllogger.info("Existing user login", {email, userRole});
      }
      return;
    }

// ----------------------------------------------------------------------------------------------------

    // 🔹 If user does not exist, create a new user
    const newUser = await createNewUser(name, email, picture);

    storeSessionData(newUser.get("id") as number, email, "newuser");
    res.status(201)
      .json({
        message: "SUCCESS",
        user: newUser,
        exist: false,
        role: "newuser"
      });
    if(MODE==="production"){
      sqllogger.info("New user login", {email});
    }
    return; 

  } catch (error) {
    console.log(`Error in google auth: ${error}`);
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });

    if(MODE==="production"){
      sqllogger.error("Error in google authentication", error);
    }
    return;
  }
};

export default gAuthController;
