import to from "await-to-js";
import {
  saveTailor,
  getTailorDetailsByEmail,
  getAllTailors,
} from "./tailor-service";
import passwordHash from "password-hash";

export const saveTailorController = async (req, res) => {
  const { body } = req;

  const [err, tailor] = await to(saveTailor(body));

  if (!err) {
    return res.json(tailor);
  }
  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const authTailorController = async (req, res) => {
  const { body } = req;

  const [err, tailor] = await to(getTailorDetailsByEmail(body.email));

  if (!err) {
    if (tailor) {
      const verifyPassword = passwordHash.verify(
        body.password,
        tailor.password
      );

      if (verifyPassword) {
        return res.json(tailor);
      }

      //username not found
      return res.status(200).json({
        status: 2,
        error: "Password is invalid",
      });
    }

    //username not found
    return res.status(200).json({
      status: 2,
      error: "Email is not found",
    });
  }
  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const getAllTailorsController = async (req, res) => {
  const [err, tailors] = await to(getAllTailors());

  if (!err) res.json(tailors);

  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};
