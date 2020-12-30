import express from "express";
import {
  savePredictedBodyMesuremntController,
  getPredictedTotalDetailsByHeightController,
  getPredictedAverageDetailsByHeightController,
  updatePredictDetailsByUserIdController,
  updateMesurmentsController,
} from "./predictmesurment-controller";

const predictmesurment = express.Router();

predictmesurment.post("/save", savePredictedBodyMesuremntController);
predictmesurment.get(
  "/get-sumMesurmets-by-height/:height",
  getPredictedTotalDetailsByHeightController
);
predictmesurment.get(
  "/get-avgMesurmets-by-height/:height",
  getPredictedAverageDetailsByHeightController
);
predictmesurment.put(
  "/update-by-userid/:id",
  updatePredictDetailsByUserIdController
);
predictmesurment.put("/update/:id", updateMesurmentsController);
export default predictmesurment;
