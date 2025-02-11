import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import {DBConnection} from './db/dbOrm.ts'

import userRouter from "./Routes/userRoute.ts";
import authRoutes from "./Routes/authRoute.ts";
import { CustomError } from "./types/interfaces.ts";

import { errorHandling } from "./middlewares/errorHandling.ts";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/user", userRouter);
app.use("/auth", authRoutes);

app.all("*", (req, res, next) => {
  const err: CustomError = new Error("Can't find this Route");
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  DBConnection()
    .then(() => {})
    .catch((e) => {
      console.error("error in database connection", e);
    });
});
