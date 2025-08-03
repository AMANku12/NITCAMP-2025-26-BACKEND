import { DataTypes } from "sequelize";
import sequelize from "../db/db";

const Deleted_Account = sequelize.define("deleted_account", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_info:{
        type: DataTypes.JSON,
    },
    role_data:{
        type: DataTypes.JSON
    }
}, { timestamps: true});


export default Deleted_Account;