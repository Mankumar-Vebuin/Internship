import express from "express";
import logger from "../logger.ts";
import morgan from "morgan";
import UserRouter from "./routes/userroutes.ts";
import swaggerDocument from '../swagger/swagger.json'
import swaggerUi from "swagger-ui-express";

const morganFormat = ":method :url :status :response-time ms";
const app = express();

app.use(express.json());
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
app.use(express.static("./public"));
app.use("/user-api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/user", UserRouter);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
