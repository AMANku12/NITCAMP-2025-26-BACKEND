import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_MODE = process.env.DATABASE_MODE;

const DATABASE_URL = DATABASE_MODE === "supabase" ? process.env.SUPABASE_URL : process.env.LOCAL_DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL || "",{
    dialect: "postgres",
    logging: false
});
    
export default sequelize;

