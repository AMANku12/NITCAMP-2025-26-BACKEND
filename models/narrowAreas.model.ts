import sequelize from "../db/db";
import { DataTypes } from "sequelize";


const NarrowAreas = sequelize.define("narrowareas", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    narrow_area:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: "narrowareas",
}); 

export default NarrowAreas;