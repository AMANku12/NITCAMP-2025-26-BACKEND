import sequelize from "../db/db";
import { DataTypes } from "sequelize";

const Feedback = sequelize.define(
  "feedback",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE" 
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
  },
  {
    tableName: "feedback",
    timestamps: true, 
  }
);

export default Feedback;