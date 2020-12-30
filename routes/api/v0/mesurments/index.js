import express from "express";
import {
  predictBodyMesurments,
  saveBodyMesurmentsConstoller,
  getBodyMesurmentsByUserIdController,
  updateMesurmentsController,
} from "./mesurment-controller";

const mesurment = express.Router();

mesurment.post("/predict", predictBodyMesurments);
mesurment.post("/save", saveBodyMesurmentsConstoller);
mesurment.get("/user/:id", getBodyMesurmentsByUserIdController);
mesurment.put("/update/:id", updateMesurmentsController);
export default mesurment;
