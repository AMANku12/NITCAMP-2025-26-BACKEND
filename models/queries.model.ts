import sequelize from "../db/db";

import { DataTypes } from "sequelize";

const Queries = sequelize.define(
  "queries",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: "users",
        key: "id"
      }
    },
    
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 500] 
      }
    }
  },
  {
    tableName: "queries",
    timestamps: true,
  }
);

export default Queries;