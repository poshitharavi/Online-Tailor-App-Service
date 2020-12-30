import to from "await-to-js";
import {
  saveOrder,
  getOrdersByUserId,
  getOrdersByOrderId,
  getOrdersByUserAndStatus,
  updateOrderDetails,
  getOrderByTailor,
  getOrderOfCompletedToTailor,
  updateStatusOfOrder,
  updatePaymentStatusOfOrder,
} from "./order-service";
import { getBodyMesurmentsByUserId } from "../mesurments/mesurment-service";

export const saveOrderController = async (req, res) => {
  const { body } = req;

  const [errMesurement, mesurment] = await to(
    getBodyMesurmentsByUserId(body.userId)
  );

  if (!errMesurement) {
    const [err, order] = await to(saveOrder(body, mesurment.mesurmentId));

    if (!err) {
      return res.json(order);
    }
    return res.status(400).json({
      status: 2,
      error: err.message,
    });
  }

  return res.status(400).json({
    status: 2,
    error: errMesurement.message,
  });
};

export const getOrdersByUserIdController = async (req, res) => {
  const { id } = req.params;

  const [err, orders] = await to(getOrdersByUserId(id));
  if (!err) res.json(orders);

  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const getOrdersByOrderIdController = async (req, res) => {
  const { id } = req.params;

  const [err, order] = await to(getOrdersByOrderId(id));
  if (!err) {
    if (order) res.json(order);

    return res.status(400).json({
      status: 2,
      error: "Order not found",
    });
  }

  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const getOrdersByUserAndStatusController = async (req, res) => {
  const { id, status } = req.params;

  const [err, orders] = await to(getOrdersByUserAndStatus(id, status));
  if (!err) {
    return res.json(orders);

    // return res.status(400).json({
    //   status: 2,
    //   error: "No orders found",
    // });
  }

  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const updateOrderDetailsController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const [err, updatedOrderDetails] = await to(updateOrderDetails(id, body));

  if (!err) {
    return res.json(updatedOrderDetails[0]);
  }

  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const getOrderByTailorController = async (req, res) => {
  const { id } = req.params;

  const [err, orders] = await to(getOrderByTailor(id));
  if (!err) res.json(orders);

  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const getOrderOfCompletedToTailorController = async (req, res) => {
  const { id } = req.params;

  const [err, orders] = await to(getOrderOfCompletedToTailor(id));
  if (!err) res.json(orders);

  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const updateStatusOfOrderController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const [err, updatedOrderDetails] = await to(updateStatusOfOrder(id, body));

  if (!err) {
    return res.json(updatedOrderDetails[0]);
  }

  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const updatePaymentStatusOfOrderController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const [err, updatedOrderDetails] = await to(
    updatePaymentStatusOfOrder(id, body)
  );

  if (!err) {
    return res.json(updatedOrderDetails[0]);
  }

  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};
