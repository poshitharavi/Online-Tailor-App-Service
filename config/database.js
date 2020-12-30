import { Sequelize } from "sequelize";
require("dotenv").config(); //adding environmental variables

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
  }
);

// sequelize.sync({ force: true });
sequelize.sync();

module.exports = sequelize;
