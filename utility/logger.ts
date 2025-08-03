import winston from "winston";
import util from "util";
import dotenv from "dotenv";
import SQLTransport from "./sqlTransports";
dotenv.config();

const {transports , format} = winston;

const logger = winston.createLogger({
    level: "http",
    format: format.combine(
        format.timestamp({format: "YYYY-MM-DD HH-mm"}),
        format.printf(({timestamp, level, message})=>{
            const formattedMessage = typeof message === "object" ? util.inspect(message, {depth: null, colors: true}) : message;
            return `${timestamp} [${level.toUpperCase()}] - ${formattedMessage}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: "logs/combined.log",
            level: "info"
        }),
        new transports.File({
            filename: "logs/http_requests.log",
            level: "http",
            format: format.combine(
                format((info) => info.level === "http" ? info : false)()
            )
        }),
    ]
})

export default logger;
