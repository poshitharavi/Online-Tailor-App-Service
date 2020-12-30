import Mesurment from "../../../../models/mesurment";
import { Sequelize } from "sequelize";

export const saveBodyMesurments = async (data) => {
  return await Mesurment.create({
    height: data.height,
    chest: data.chest,
    waistWidth: data.waistWidth,
    hip: data.hip,
    legLength: data.legLength,
    shoulderWidth: data.shoulderWidth,
    userId: data.userId,
  });
};

export const getBodyMesurmentsByUserId = async (id) => {
  return await Mesurment.findOne({ where: { userId: id } });
};

export const updateMesurments = async (id, data) => {
  const updateStatus = await Mesurment.update(
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
        mesurmentId: id,
      },
    }
  );

  if (updateStatus[0] === 1)
    return await Mesurment.findAll({ where: { mesurmentId: id } });

  throw new Error("Mesurment id is not found");
};

export const getActualTotalDetailsByHeight = async (height) => {
  return await Mesurment.findOne({
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

export const getActualAverageDetailsByHeight = async (height) => {
  return await Mesurment.findOne({
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
