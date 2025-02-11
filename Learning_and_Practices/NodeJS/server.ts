import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { DBConnection } from "./db/dbOrm.ts";

import userRouter from "./Routes/userRoute.ts";
import authRoutes from "./Routes/authRoute.ts";
import ormUserRoutes from "./Routes/ormUserRoute.ts";

import { CustomError } from "./types/interfaces.ts";
import { errorHandling } from "./middlewares/errorHandling.ts"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/user", userRouter);
app.use("/auth", authRoutes);
app.use("/orm_user", ormUserRoutes);

app.all("*", (req, res, next) => {
  const err: CustomError = new Error("Can't find this Route");
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});

app.use(errorHandling);

DBConnection()
  .then(async () => {
    console.log("Connected to the database.");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.error("Error in database connection", e);
  });
