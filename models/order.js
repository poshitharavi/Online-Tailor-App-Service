import { Sequelize } from "sequelize";
import db from "../config/database";
import Mesurment from "./mesurment";
import User from "./user";
import Tailor from "./tailor";
import Style from "./style";

const Order = db.define(
  "order",
  {
    orderId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    orderDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    paymentStatus: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Order.belongsTo(Mesurment, { foreignKey: "mesurmentId" });
Order.belongsTo(User, { foreignKey: "userId" });
Order.belongsTo(Tailor, { foreignKey: "tailorId" });
Order.belongsTo(Style, { foreignKey: "styleId" });

module.exports = Order;
