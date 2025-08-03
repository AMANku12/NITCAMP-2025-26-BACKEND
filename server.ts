import express, {Request, Response} from "express";
import cors from "cors";
import sequelize from "./db/db";
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import logger from "./utility/logger";
// server.ts
// import swaggerUi from 'swagger-ui-express';
// import swaggerSpec from './utility/swagger'; // Adjust path to your swagger.js file
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { sessionConfig } from "./config/session.config";


// Import models
import User from "./models/User.model";
import Mentee from "./models/mentee.model";
import Mentor from "./models/mentor.model";
import Feedback from "./models/feedback.model";
// import Queries from "./models/queries.model";
// import Log from "./models/logs.model";
import Domains from "./models/domains.model";
import MatchedUsers from "./models/matched_users.model";


// Import routes
import gAuthRouter from "./routes/gauth.route";
import updateProfileRouter from "./routes/updateprofile.route";
import feedbackRouter from "./routes/feedback.route";
// import queriesRouter from "./routes/queries.route";
import adminHomepageRouter from "./routes/admin routes/homepage.route";
import menteeDBRouter from "./routes/admin routes/menteeDB.route";
import mentorDBRouter from "./routes/admin routes/mentorDB.route";
// import holdAccountRouter from "./routes/holdaccount.route";
// import activateAccountRouter from "./routes/unholdaccount.route";
import deleteAccountRouter from "./routes/deleteaccount.route";
import getMatchedUsers from "./routes/admin routes/matchedData.route"
import menteeRegisterRouter from "./routes/registerMentee.route";
import mentorRegisterRouter from "./routes/registerMentor.route";
import getMenteeExtraInfoRouter from "./routes/getmenteeinfo.route";
import matchUsersRouter from "./routes/admin routes/matchUsers.route";
import unmatchedMenteesRouter from "./routes/admin routes/unmatchedMentees.route";
import unmatchedMentorsRouter from "./routes/admin routes/unmatchedMentors.route";
import getMenteeDataRouter from "./routes/admin routes/getMenteeData.route";
import getMentorDataRouter from "./routes/admin routes/getMentorData.route";
import getBroadAreasRouter from "./routes/getBroadAreas.route";
import getNarrowAreasRouter from "./routes/getNarrowAreas.route";
import getMyMentorRouter from "./routes/getMyMentor.route";
import getMyMenteesRouter from "./routes/getMyMentees.route";
import getDomainsRouter from "./routes/getDomains.route";
import logoutRouter from "./routes/logout.route";
import verifySessionRouter from "./routes/verifysession.route";

import sqllogger from "./utility/sqllogger";

dotenv.config();

const MODE = process.env.MODE;

const app = express();

const allowedOrigins = process.env.FRONTEND_URL?.split(',') || [];

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

// Session middleware - MUST be before routes that use sessions
app.use(session(sessionConfig));

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send("Server is running");
});

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/googleauth", gAuthRouter); // login

app.use("/api/logout", logoutRouter);  // logout

app.use("/api/verify-session", verifySessionRouter);

app.use("/api/menteeinitialinfo", getMenteeExtraInfoRouter);

app.use("/api/register/mentee", menteeRegisterRouter);

app.use("/api/register/mentor", mentorRegisterRouter);

app.use("/api/updateprofile", updateProfileRouter);

app.use("/api/getmymentors", getMyMentorRouter);

app.use("/api/getmymentees", getMyMenteesRouter);

// app.use("/api/holdmyaccount", holdAccountRouter);  // to set user as inactive and then log him out 

// app.use("/api/activatemyaccount", activateAccountRouter); // to set user as active and then log him out 

app.use("/api/deletemyaccount",deleteAccountRouter);

app.use("/api/feedback", feedbackRouter);

// app.use("/api/queries", queriesRouter);

// admin routes

app.use("/api/admin/homepage", adminHomepageRouter);

app.use("/api/admin/menteedb", menteeDBRouter);

app.use("/api/admin/mentordb", mentorDBRouter);

app.use("/api/admin/getmatchedusers", getMatchedUsers);

app.use("/api/admin/getunmatchedmentees", unmatchedMenteesRouter); 

app.use("/api/admin/getunmatchedmentors", unmatchedMentorsRouter);  // whose mentee_capacity is greater than 0

app.use("/api/admin/matchusers", matchUsersRouter);

// no authorization required routes   

app.use("/api/getdomains", getDomainsRouter);

app.use("/api/getbroadareas", getBroadAreasRouter);

app.use("/api/getnarrowareas", getNarrowAreasRouter);

app.use("/api/getmenteedata", getMenteeDataRouter);  // to get a specific mentee data using user_id

app.use("/api/getmentordata", getMentorDataRouter);  // to get a specific mentor data using user_id

sequelize.sync({alter: true})
.then(()=> {
  logger.info("All models synced");
  if(MODE==="production"){
    sqllogger.info("All models synced");
  }
}).catch((error)=>{
  logger.error(`Sync Failed: ${error}`)
  if(MODE==="production"){
    sqllogger.error("Models sync failed", error);
  }
});


// Start server
const PORT = 3001;
app.listen(PORT, async() => {
  logger.info(`Server is running on port ${PORT}`);
  if(MODE==="production"){
    sqllogger.info("Server started at port", PORT);
  }
  try {
    await sequelize.authenticate();
    logger.info("Database connected successfully");
    if(MODE==="production"){
      sqllogger.info("Database connected successfully");
    }
  } catch (error) {
    logger.error(`Database connection failed: ${error}`);
    if(MODE==="production"){
      sqllogger.error("Database connection failed", error);
    }
  }
});
