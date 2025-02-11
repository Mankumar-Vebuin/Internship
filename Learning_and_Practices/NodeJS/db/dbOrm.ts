import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { Orm_User, Contact } from "../models/associations.ts";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.HOST,
    dialect: "mysql",
    logging: false,
  }
);

const DBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connection established successfully.");

    // Sync all models with associations
    await sequelize.sync({ alter: true });

    console.log("All models synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { DBConnection, sequelize };
