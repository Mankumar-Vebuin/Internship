import express from "express";
import registerUser  from "../controllers/registerUser.ts";
import { loginUser } from "../controllers/loginUser.ts";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
