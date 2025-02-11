import express, { urlencoded } from "express";
import { env } from "../../env/env";
import morgan from "morgan";
import logger from "../../logger";
import UserRouter from "../../../interface/routes/user.route";
import { AppDataSource } from "../../orm/typeorm/config/ormconfig";

const morganFormat = ":method :url :status :response-time ms";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan Configuration for Logger.
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use("/user", UserRouter);

AppDataSource.initialize()
  .then(() => {
    app.listen(env.PORT, () => {
      logger.info(`Server is running on http://localhost:${env.PORT}`);
      logger.info("Database connected successfully!");
    });
  })
  .catch((error) => logger.error("Database connection error:", error));
