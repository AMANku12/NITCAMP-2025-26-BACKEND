import sequelize from "../db/db";
import { DataTypes } from "sequelize";


const BroadAreas = sequelize.define("broadareas", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    broad_area:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: "broadareas",
}); 

export default BroadAreas;