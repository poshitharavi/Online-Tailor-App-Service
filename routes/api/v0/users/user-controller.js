import to from "await-to-js";
import { saveUser, getUserDetailsByEmail } from "./user-service";
import passwordHash from "password-hash";

export const saveUserController = async (req, res) => {
  const { body } = req;

  const [err, user] = await to(saveUser(body));

  if (!err) {
    return res.json(user);
  }
  return res.status(400).json({
    status: 2,
    error: err.message,
  });
};

export const authUserController = async (req, res) => {
  const { body } = req;

  const [err, user] = await to(getUserDetailsByEmail(body.email));

  if (!err) {
    if (user) {
      const verifyPassword = passwordHash.verify(body.password, user.password);

      if (verifyPassword) {
        return res.json(user);
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
