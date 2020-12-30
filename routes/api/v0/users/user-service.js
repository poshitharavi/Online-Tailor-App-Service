import User from "../../../../models/user";
import { Sequelize } from "sequelize";
import passwordHash from "password-hash";

export const saveUser = async (data) => {
  return await User.create({
    name: data.name,
    password: passwordHash.generate(data.password),
    email: data.email,
  });
};

export const getUserDetailsByEmail = async (email) => {
  return await User.findOne({ where: { email: email } });
};
