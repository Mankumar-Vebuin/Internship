import express, { urlencoded } from "express";
import dotenv from "dotenv";
import path from 'path'
import cors from 'cors'

import userRouter from './Routes/userRoute.ts';
import authRoutes from './Routes/authRoute.ts'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/user', userRouter);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
