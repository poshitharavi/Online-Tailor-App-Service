import to from "await-to-js";
import fs from "fs";
import {
  saveBodyMesurments,
  getBodyMesurmentsByUserId,
  updateMesurments,
  getActualAverageDetailsByHeight,
} from "./mesurment-service";
import {
  savePredictedBodyMesuremnt,
  getPredictedAverageDetailsByHeight,
} from "../predictmesurment/predictmesurment-service";
import automl from "@google-cloud/automl";
const { Parser } = require("json2csv");

export const predictBodyMesurments = async (req, res) => {
  const { body } = req;

  //google vison implimentation
  try {
    const client = new automl.PredictionServiceClient({
      keyFilename: "rare-signer-292308-05ea3b787ae4.json", // add configuration file downloaded from google console
    });

    const projectId = `rare-signer-292308`;
    const computeRegion = `us-central1`;
    const modelId = `ICN6631886901861154816`;
    const filePath = "IMG_20201012_180153.jpg";
    const scoreThreshold = 0.5;
    const modelFullId = client.modelPath(projectId, computeRegion, modelId);
    const content = fs.readFileSync(filePath, "base64");

    const payload = {};
    const params = {};

    if (scoreThreshold) {
      params.score_threshold = scoreThreshold;
    }
    payload.image = { imageBytes: body.baseCode };

    // params is additional domain-specific parameters.
    // currently there is no additional parameters supported.
    const [response] = await client.predict({
      name: modelFullId,
      payload: payload,
      params: params,
    });
    console.log(response);
    let height = response.payload[0].displayName;
    // const randomN = Math.floor(Math.random() * 5) - 5;
    // height = parseInt(height) + parseInt(randomN);
    // console.log(height);
    // const [err, mesutment] = await to(getMesurmentByBodySize(id));

    const chest = 0.72 * height;
    const shoulderWidth = 0.84 * height - 100;
    const waistWidth = 0.61 * height;
    const hip = 0.53 * height;
    const legLength = 0.41 * height;

    const output = {
      height: height,
      chest: chest.toFixed(2),
      waistWidth: waistWidth.toFixed(2),
      hip: hip.toFixed(2),
      legLength: legLength.toFixed(2),
      shoulderWidth: shoulderWidth.toFixed(2),
      userId: body.userId,
    };
    // const predictedmesurment = {
    //   height: height,
    //   chest: chest.toFixed(2),
    //   waistWidth: waistWidth.toFixed(2),
    //   hip: hip.toFixed(2),
    //   legLength: legLength.toFixed(2),
    //   shoulderWidth: shoulderWidth.toFixed(2),
    //   userId: body.userId,
    // };
    const [err, predictedmesurment] = await to(
      savePredictedBodyMesuremnt(output)
    );

    if (!err) {
      const [errPredictAvg, predictedAvg] = await to(
        getPredictedAverageDetailsByHeight(output.height)
      );

      const [errActualAvg, actualAvg] = await to(
        getActualAverageDetailsByHeight(output.height)
      );

      const heightDiffer = output.height * 0.05;

      const chestDiffer = Math.abs(
        output.chest *
          (((actualAvg.dataValues.chestTotal -
            predictedAvg.dataValues.chestTotal) /
            actualAvg.dataValues.chestTotal) *
            100)
      );

      const waistDiffer = Math.abs(
        output.waistWidth *
          (((actualAvg.dataValues.waistWidthTotal -
            predictedAvg.dataValues.waistWidthTotal) /
            actualAvg.dataValues.waistWidthTotal) *
            100)
      );

      const hipDiffer = Math.abs(
        output.hip *
          (((actualAvg.dataValues.hipTotal - predictedAvg.dataValues.hipTotal) /
            actualAvg.dataValues.hipTotal) *
            100)
      );

      const legDiffer = Math.abs(
        output.legLength *
          (((actualAvg.dataValues.legLengthTotal -
            predictedAvg.dataValues.legLengthTotal) /
            actualAvg.dataValues.legLengthTotal) *
            100)
      );

      const shoulderDiffer = Math.abs(
        output.shoulderWidth *
          (((actualAvg.dataValues.shoulderWidthTotal -
            predictedAvg.dataValues.shoulderWidthTotal) /
            actualAvg.dataValues.shoulderWidthTotal) *
            100)
      );

      const heightValues = {
        max:
          parseInt(predictedmesurment.height) +
          parseInt(heightDiffer.toFixed(2)),
        min:
          parseInt(predictedmesurment.height) -
          parseInt(heightDiffer.toFixed(2)),
      };
      const chestValues = {
        max: predictedmesurment.chest + parseInt(chestDiffer.toFixed(2)),
        min: Math.max(
          0,
          predictedmesurment.chest - parseInt(chestDiffer.toFixed(2))
        ),
      };
      const wasitWidthValues = {
        max: predictedmesurment.waistWidth + parseInt(waistDiffer.toFixed(2)),
        min: Math.max(
          0,
          predictedmesurment.waistWidth - parseInt(waistDiffer.toFixed(2))
        ),
      };
      const hipValues = {
        max: predictedmesurment.hip + parseInt(hipDiffer.toFixed(2)),
        min: Math.max(
          0,
          predictedmesurment.hip - parseInt(hipDiffer.toFixed(2))
        ),
      };
      const legLengthValues = {
        max: predictedmesurment.legLength + parseInt(legDiffer.toFixed(2)),
        min: Math.max(
          0,
          predictedmesurment.legLength - parseInt(legDiffer.toFixed(2))
        ),
      };
      const shoulderWidthValues = {
        max:
          predictedmesurment.shoulderWidth +
          parseInt(shoulderDiffer.toFixed(2)),
        min: Math.max(
          0,
          predictedmesurment.shoulderWidth - parseInt(shoulderDiffer.toFixed(2))
        ),
      };

      const returnValue = {
        height: predictedmesurment.height,
        chest: predictedmesurment.chest,
        wasitWidth: predictedmesurment.waistWidth,
        hip: predictedmesurment.hip,
        legLength: predictedmesurment.legLength,
        shoulderWidth: predictedmesurment.shoulderWidth,
        heightDiffer: heightDiffer,
        chestDiffer: chestDiffer,
        waistWidthDiffer: waistDiffer,
        hipDiffer: hipDiffer,
        legLengthDiffer: legDiffer,
        shoulderWidthDiffer: shoulderDiffer,
        heightPrediction:
          "Height prediction variation \n " +
          parseInt(heightValues.max).toFixed(2) +
          "cm - " +
          parseInt(heightValues.min).toFixed(2) +
          "cm",
        chestPrediction:
          "Chest prediction variation \n " +
          parseInt(chestValues.max).toFixed(2) +
          "cm - " +
          parseInt(chestValues.min).toFixed(2) +
          "cm",
        wasitWidthPrediction:
          "Waist prediction variation \n " +
          parseInt(wasitWidthValues.max).toFixed(2) +
          "cm - " +
          parseInt(wasitWidthValues.min).toFixed(2) +
          "cm",
        hipPrediction:
          "Hip prediction variation \n " +
          parseInt(hipValues.max).toFixed(2) +
          "cm - " +
          parseInt(hipValues.min).toFixed(2) +
          "cm",
        legLengthPrediction:
          "Leg Length prediction variation \n " +
          parseInt(legLengthValues.max).toFixed(2) +
          "cm - " +
          parseInt(legLengthValues.min).toFixed(2) +
          "cm",
        shoulderWidthPrediction:
          "Shouder prediction variation \n " +
          parseInt(shoulderWidthValues.max).toFixed(2) +
          "cm - " +
          parseInt(shoulderWidthValues.min).toFixed(2) +
          "cm",
      };
      console.log(returnValue);
      return res.json(returnValue);
    }
    return res.status(400).json({
      status: 2,
      error: err.message,
    });
  } catch (error) {
    console.log(error);
  }
};

export const saveBodyMesurmentsConstoller = async (req, res) => {
  const { body } = req;
  const [err, mesurments] = await to(saveBodyMesurments(body));

  if (!err) {
    return res.json(mesurments);
  }
  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const getBodyMesurmentsByUserIdController = async (req, res) => {
  const { id } = req.params;
  const [err, mesurment] = await to(getBodyMesurmentsByUserId(id));

  if (!err) res.json(mesurment);

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
