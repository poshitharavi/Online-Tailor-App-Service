import to from "await-to-js";
import {
  savePredictedBodyMesuremnt,
  getPredictedTotalDetailsByHeight,
  updatePredictDetailsByUserId,
  updateMesurments,
  getPredictedAverageDetailsByHeight,
} from "./predictmesurment-service";

export const savePredictedBodyMesuremntController = async (req, res) => {
  const { body } = req;
  const [err, predictedmesurment] = await to(savePredictedBodyMesuremnt(body));

  if (!err) {
    return res.json(predictedmesurment);
  }
  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const getPredictedTotalDetailsByHeightController = async (req, res) => {
  const { height } = req.params;

  const [err, response] = await to(getPredictedTotalDetailsByHeight(height));

  if (!err) {
    return res.json(response);
  }
  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const getPredictedAverageDetailsByHeightController = async (
  req,
  res
) => {
  const { height } = req.params;

  const [err, response] = await to(getPredictedAverageDetailsByHeight(height));

  if (!err) {
    return res.json(response);
  }
  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const updatePredictDetailsByUserIdController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const [err, updatedPrediction] = await to(
    updatePredictDetailsByUserId(id, body)
  );

  if (!err) {
    return res.json(updatedPrediction[0]);
  }

  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const updateMesurmentsController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const [err, updatedMesurments] = await to(updateMesurments(id, body));

  if (!err) {
    return res.json(updatedMesurments[0]);
  }

  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};
