import { Sequelize } from "sequelize";
import db from "../config/database";
import User from "./user";

const Mesurments = db.define(
  "mesurments",
  {
    mesurmentId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    height: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    chest: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    waistWidth: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    hip: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    legLength: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    shoulderWidth: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Mesurments.belongsTo(User, { foreignKey: "userId" });

module.exports = Mesurments;
