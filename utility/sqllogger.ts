import winston from "winston";
import util from "util";
import dotenv from "dotenv";
import SQLTransport from "./sqlTransports";
dotenv.config();

const {transports , format} = winston;

const sqllogger = winston.createLogger({
    level: "http",
    transports: [
        new SQLTransport(),
    ]
})

export default sqllogger;
