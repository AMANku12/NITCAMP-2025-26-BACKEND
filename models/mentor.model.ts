import sequelize from "../db/db";
import { DataTypes } from "sequelize";
import User from "./User.model";

const Mentor = sequelize.define("mentor", {
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

  year_graduated: {
    type: DataTypes.INTEGER(),
    allowNull: false,
    validate: {len: [4,4]}
  },

  phone_no:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{ len: [4,20]}
  },
  
  highest_degree_at_nitc_code:{
    type: DataTypes.STRING(30),
    allowNull: false,
  },

  department_code:{
    type: DataTypes.STRING(30),
    allowNull: false,
  },

  mentoring_type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['one-on-one', 'community-mentoring']]
    }
  },

  mentee_capacity:{
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {len: [1,5]}
  },

  broad_area_of_expertise:{
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true
  },

  narrow_area_of_expertise: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true
  },

}, {timestamps: true});

Mentor.belongsTo(User, { foreignKey: 'user_id', as: 'user' });


export default Mentor;
