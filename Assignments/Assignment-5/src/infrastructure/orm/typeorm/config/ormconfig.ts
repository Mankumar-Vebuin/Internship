import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "../../../env/env";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB,
  synchronize: true,
  logging: true,
  entities: [User],
});
