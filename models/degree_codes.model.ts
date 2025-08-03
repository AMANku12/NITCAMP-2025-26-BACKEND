import sequelize from "../db/db";
import { DataTypes } from "sequelize";

const Degree_Codes = sequelize.define(
    "degree",{
    code:{
        type: DataTypes.STRING(2),
        unique: true,
        allowNull: false,
        primaryKey: true 
    },
    value:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});

export default Degree_Codes;