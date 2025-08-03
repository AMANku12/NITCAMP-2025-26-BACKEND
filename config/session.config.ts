import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { Pool } from 'pg';
import dotenv from 'dotenv';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number;
      email: string;
      role: string;
    };
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: string;
      }
    }
  }
}

dotenv.config();

const PgSession = connectPgSimple(session);

// Create a separate pg pool for sessions
const DATABASE_MODE = process.env.DATABASE_MODE;
const DATABASE_URL = DATABASE_MODE === "supabase" ? process.env.SUPABASE_URL : process.env.LOCAL_DATABASE_URL;

const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const sessionConfig = {
  store: new PgSession({
    pool: pool,
    tableName: "sessions",
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET || "session",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  },
};

export default sessionConfig;
