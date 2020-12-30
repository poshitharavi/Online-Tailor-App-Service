import PredictedMesurment from "../../../../models/predictedmesurments";
import { Sequelize } from "sequelize";

export const savePredictedBodyMesuremnt = async (data) => {
  return await PredictedMesurment.create({
    height: data.height,
    chest: data.chest,
    waistWidth: data.waistWidth,
    hip: data.hip,
    legLength: data.legLength,
    shoulderWidth: data.shoulderWidth,
    userId: data.userId,
  });
};

export const getPredictedTotalDetailsByHeight = async (height) => {
  return await PredictedMesurment.findOne({
    attributes: [
      [Sequelize.fn("sum", Sequelize.col("chest")), "chestTotal"],
      [Sequelize.fn("sum", Sequelize.col("waistWidth")), "waistWidthTotal"],
      [Sequelize.fn("sum", Sequelize.col("hip")), "hipTotal"],
      [Sequelize.fn("sum", Sequelize.col("legLength")), "legLengthTotal"],
      [
        Sequelize.fn("sum", Sequelize.col("shoulderWidth")),
        "shoulderWidthTotal",
      ],
    ],
    where: {
      height: height,
    },
  });
};

export const getPredictedAverageDetailsByHeight = async (height) => {
  return await PredictedMesurment.findOne({
    attributes: [
      [Sequelize.fn("AVG", Sequelize.col("chest")), "chestTotal"],
      [Sequelize.fn("AVG", Sequelize.col("waistWidth")), "waistWidthTotal"],
      [Sequelize.fn("AVG", Sequelize.col("hip")), "hipTotal"],
      [Sequelize.fn("AVG", Sequelize.col("legLength")), "legLengthTotal"],
      [
        Sequelize.fn("AVG", Sequelize.col("shoulderWidth")),
        "shoulderWidthTotal",
      ],
    ],
    where: {
      height: height,
    },
  });
};

export const updatePredictDetailsByUserId = async (id, data) => {
  const updateStatus = await PredictedMesurment.update(
    {
      height: data.height,
      chest: data.chest,
      waistWidth: data.waistWidth,
      hip: data.hip,
      legLength: data.legLength,
      shoulderWidth: data.shoulderWidth,
    },
    {
      where: {
        userId: id,
      },
    }
  );

  if (updateStatus[0] === 1)
    return await PredictedMesurment.findAll({ where: { userId: id } });

  throw new Error("area id is not found");
};

export const updateMesurments = async (id, data) => {
  const updateStatus = await PredictedMesurment.update(
    {
      height: data.height,
      chest: data.chest,
      waistWidth: data.waistWidth,
      hip: data.hip,
      legLength: data.legLength,
      shoulderWidth: data.shoulderWidth,
      userId: data.userId,
    },
    {
      where: {
        mesurmentId: id,
      },
    }
  );

  if (updateStatus[0] === 1)
    return await PredictedMesurment.findAll({ where: { mesurmentId: id } });

  throw new Error("Mesurment id is not found");
};
