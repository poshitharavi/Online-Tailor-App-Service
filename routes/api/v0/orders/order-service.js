import Order from "../../../../models/order";
import Tailor from "../../../../models/tailor";
import User from "../../../../models/user";
import Mesurment from "../../../../models/mesurment";
import Style from "../../../../models/style";
import { nowDateTime } from "../../../../util/currentdatetime";
const { Op } = require("sequelize");

export const saveOrder = async (data, measurmentId) => {
  return await Order.create({
    status: data.status,
    orderDate: nowDateTime(),
    paymentStatus: data.paymentStatus,
    mesurmentId: measurmentId,
    userId: data.userId,
    tailorId: data.tailorId,
    styleId: data.styleId,
  });
};

export const getOrdersByUserId = async (id) => {
  return await Order.findAll({
    where: { userId: id },
    include: [
      {
        model: Tailor,
      },
      {
        model: Style,
      },
      {
        model: User,
      },
      {
        model: Mesurment,
      },
    ],
  });
};

export const getOrdersByOrderId = async (id) => {
  return await Order.findOne({ where: { orderId: id } });
};

export const getOrdersByUserAndStatus = async (id, status) => {
  return await Order.findAll({
    where: {
      userId: id,
      // status: {
      //   [Op.ne]: "completed",
      // },'
    },
    order: [["orderDate", "DESC"]],
    include: [
      {
        model: Tailor,
      },
      {
        model: Style,
      },
      {
        model: User,
      },
      {
        model: Mesurment,
      },
    ],
  });
};

export const updateOrderDetails = async (id, data) => {
  const updateStatus = await Order.update(
    {
      status: data.status,
      paymentStatus: data.paymentStatus,
      tailorId: data.tailorId,
      styleId: data.styleId,
    },
    {
      where: {
        orderId: id,
      },
    }
  );

  if (updateStatus[0] === 1)
    return await Order.findAll({ where: { orderId: id } });

  throw new Error("area id is not found");
};

export const getOrderByTailor = async (id) => {
  return await Order.findAll({
    where: {
      tailorId: id,
      status: {
        [Op.ne]: "completed",
      },
    },
    include: [
      {
        model: Tailor,
      },
      {
        model: Style,
      },
      {
        model: User,
      },
      {
        model: Mesurment,
      },
    ],
  });
};

export const getOrderOfCompletedToTailor = async (id) => {
  return await Order.findAll({
    where: { tailorId: id, status: "completed" },
    include: [
      {
        model: Tailor,
      },
      {
        model: Style,
      },
      {
        model: User,
      },
      {
        model: Mesurment,
      },
    ],
  });
};

export const updateStatusOfOrder = async (id, data) => {
  const updateStatus = await Order.update(
    {
      status: data.status,
    },
    {
      where: {
        orderId: id,
      },
    }
  );

  if (updateStatus[0] === 1)
    return await Order.findAll({ where: { orderId: id } });

  throw new Error("area id is not found");
};

export const updatePaymentStatusOfOrder = async (id, data) => {
  const updateStatus = await Order.update(
    {
      paymentStatus: data.paymentStatus,
    },
    {
      where: {
        orderId: id,
      },
    }
  );

  if (updateStatus[0] === 1)
    return await Order.findAll({ where: { orderId: id } });

  throw new Error("area id is not found");
};
