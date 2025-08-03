import sequelize from "../db/db";
import { DataTypes } from "sequelize";


const Domains = sequelize.define("domains",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    domain_name:{
        type: DataTypes.STRING,
        validate: {len:[1,100]},
        allowNull: false
    },
    code:{
        type: DataTypes.STRING,
        validate: { len: [1,8]},
        unique: true,
        allowNull: false
    },
    value:{
        type: DataTypes.STRING,
        validate: {len: [1,100]},
        unique: true,
        allowNull: false
    },
    default:{
        type: DataTypes.STRING,
        allowNull: true
    } 

});

export default Domains;