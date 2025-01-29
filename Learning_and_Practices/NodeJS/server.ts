import express from "express";
import dotenv from "dotenv";

import userRouter from './Routes/userRoute.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Move this above routes
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
