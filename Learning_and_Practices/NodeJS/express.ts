import express from 'express';
import userRouter from './Routes/userRoute'

const app = express();

app.use('/api/v1/', userRouter)

app.listen(3000, () => {
    console.log("server is running");
})