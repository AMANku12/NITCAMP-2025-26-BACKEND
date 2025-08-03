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
  console.log("✅ Google Auth Controller Hit");
  console.log("Request body:", req.body);
  const { googletoken } = req.body;

  try {
    console.log("Validating Google token...");
    const payload = await googleTokenValidation(googletoken);

    if (!payload) {
      console.log("Invalid Google token payload");
      res.status(401).json({ error: "INVALID GOOGLE TOKEN" });
      console.log("Responded with 401 due to invalid token");
      if(MODE==="production"){
        sqllogger.error("User login failed", {error: "Invalid google token"});
      }
      return;
    }

    const { email, name, picture } = payload;
    console.log("Google payload received:", {email, name, picture} );
    console.log("Checking if user exists in DB for email:", email);
    const existingUser = await findUserByEmail(email);

    async function storeSessionData(id: number, email: string, role: string) {
      console.log("Storing session data:", { id, email, role });
      req.session.user = { id, email, role };
      req.session.save((err) => {
        if (err) {
          console.error("Error saving session:", err);
        } else {
          console.log("Session saved for user", email);
        }
      });
      return;
    }

    // 🔹 If user exists
    if (existingUser) {
      const userId = parseInt(existingUser.get("id") as string);
      const userEmail = existingUser.get("email") as string;
      const userRole = existingUser.get("role") as string;
      console.log("Existing user found:", {userEmail, userRole, userId});

      if (existingUser.get("is_active") === false) {
        console.log("User has inactivated his account", userEmail);
        const token = generateToken(userId, userEmail, userRole);
        console.log("Generated token for inactive user:", token);
        // if his account is inactivated give him option to activate his account, if he does not, clear the cookie and log him out
        res.status(200).cookie("token", token, COOKIE_OPTIONS).json({ message: "Account deactivated by the user", user: existingUser.toJSON() }); // fullname , email, is_active, role
        console.log("Responded with 200 for inactive user");
        if(MODE==="production"){
          sqllogger.warn("Inactive user login", userEmail);
        }
        return;
      }

      // 🔸 If user has no role yet (user logged in but did not fill his details)
      if (userRole === "newuser") {
        console.log("Existing user but no role data");
        storeSessionData(userId, userEmail, userRole);
        console.log("Responding with 200 for user with no role");
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
        console.log("Responding with 200 for admin login");
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
        console.log("Updated user role to newuser in DB");
        storeSessionData(userId, userEmail, "newuser");
        console.log("Responding with 200 for user with missing role data");
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
      console.log("User role data found:", roleData);
      storeSessionData(userId, userEmail, userRole);
      console.log("Responding with 200 for mentee/mentor login");
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
    console.log("User not found, creating new user...");
    const newUser = await createNewUser(name, email, picture);
    console.log("New user created:", newUser);
    storeSessionData(newUser.get("id") as number, email, "newuser");
    console.log("Responding with 201 for new user");
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
    console.log("Responded with 500 due to error");
    if(MODE==="production"){
      sqllogger.error("Error in google authentication", error);
    }
    return;
  }
};

export default gAuthController;
