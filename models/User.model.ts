import { DataTypes } from "sequelize";
import sequelize from "../db/db";

const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'newuser',
        validate:{
            isIn: [['mentee', 'mentor', 'admin', 'newuser']]
        }
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [3,60]}
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {len: [4,50]}
    },
    photo_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, { timestamps: true});


export default User;