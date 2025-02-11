import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Contact } from "./entity/Contact";
import logger from "../logger";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "0360",
  database: "demo",
  synchronize: true,
  logging: true,
  entities: [User,Contact],
});

AppDataSource.initialize()
  .then(() => {
    logger.info("Database connected successfully!");
  })
  .catch((error) => logger.error("Database connection error:", error));
