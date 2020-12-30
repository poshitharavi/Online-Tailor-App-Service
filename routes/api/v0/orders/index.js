import express from "express";
import {
  saveOrderController,
  getOrdersByUserIdController,
  getOrdersByOrderIdController,
  getOrdersByUserAndStatusController,
  updateOrderDetailsController,
  getOrderByTailorController,
  getOrderOfCompletedToTailorController,
  updateStatusOfOrderController,
  updatePaymentStatusOfOrderController,
} from "./order-controller";

const orders = express.Router();

orders.post("/save", saveOrderController);
orders.get("/user/:id", getOrdersByUserIdController);
orders.get("/:id", getOrdersByOrderIdController);
orders.get("/user-status/:id/:status", getOrdersByUserAndStatusController);
orders.put("/update/:id", updateOrderDetailsController);
orders.get("/tailor/:id", getOrderByTailorController);
orders.get("/tailor-completed/:id", getOrderOfCompletedToTailorController);
orders.put("/status-update/:id", updateStatusOfOrderController);
orders.put("/payment-status-update/:id", updatePaymentStatusOfOrderController);

export default orders;
