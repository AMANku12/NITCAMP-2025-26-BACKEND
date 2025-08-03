import dotenv from "dotenv";
dotenv.config();

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export const JWT_SECRET = process.env.JWT_SECRET;

export const COOKIE_OPTIONS: import("express").CookieOptions = {
  httpOnly: true,
  secure: process.env.MODE === "production",
  sameSite: process.env.MODE === "production" ? "none" : "lax",
  maxAge: 24 * 24 * 60 * 60 * 1000 // 24 days
};