import { Sequelize } from "sequelize";
import db from "../config/database";

const BodyMesurment = db.define(
  "bodymesurment",
  {
    bodySize: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    bodyHeight: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    chest: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    waist: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    leg: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    frontSleeve: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = BodyMesurment;
