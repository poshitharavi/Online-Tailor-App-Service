import Tailor from "../../../../models/tailor";
import passwordHash from "password-hash";

export const saveTailor = async (data) => {
  return await Tailor.create({
    name: data.name,
    password: passwordHash.generate(data.password),
    email: data.email,
  });
};

export const getTailorDetailsByEmail = async (email) => {
  return await Tailor.findOne({ where: { email: email } });
};

export const getAllTailors = async () => {
  return await Tailor.findAll({
    attributes: ["name", "tailorId"],
  });
};
