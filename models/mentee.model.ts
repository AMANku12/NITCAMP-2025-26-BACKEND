import sequelize from "../db/db";
import { DataTypes } from "sequelize";
import User from "./User.model";
import Branch_Codes from "./branch_codes.model";
import Degree_Codes from "./degree_codes.model";

const Mentee = sequelize.define("mentee", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE" 
  },


  roll_no: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  year_of_admission: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {len: [0,4]}
  },

  personal_email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
        isEmail: true,
        len: [4,60]
    }
  },
  phone_no:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{ len: [4,20]}
  },

  degree_code:{
    type: DataTypes.STRING(1),
    allowNull: false,
  },

  branch_code:{
    type: DataTypes.STRING(2),
    allowNull: false,
  },

  broad_area_of_interest:{
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true
  },

  narrow_area_of_interest:{
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true
  },

}, {timestamps: true});

Mentee.belongsTo(User, { foreignKey: 'user_id', as: 'user' });


export default Mentee;
