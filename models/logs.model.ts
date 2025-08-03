
import { DataTypes } from "sequelize";
import sequelize from "../db/db";

const Log = sequelize.define("logs", {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  meta: {
    type: DataTypes.JSONB, // or JSON if you're using MySQL
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Log;
