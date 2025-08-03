import sequelize from "../db/db";
import { DataTypes } from "sequelize";

const Branch_Codes = sequelize.define(
    "branch",{
    code:{
        type: DataTypes.STRING(2),
        unique: true,
        allowNull: false ,
        primaryKey: true
    },
    value:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});

export default Branch_Codes;