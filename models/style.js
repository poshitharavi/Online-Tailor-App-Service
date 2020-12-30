import { Sequelize } from "sequelize";
import db from "../config/database";

const Style = db.define(
  "style",
  {
    styleId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    styleName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Style;
