import sequelize from "../db/db";
import { DataType, DataTypes } from "sequelize";
import User from "./User.model";

const MatchedUsers = sequelize.define("matchedusers",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mentor_user_id:{
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    mentee_user_id:{
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },

    common_areas:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }

}, {timestamps: true});

export default MatchedUsers;
