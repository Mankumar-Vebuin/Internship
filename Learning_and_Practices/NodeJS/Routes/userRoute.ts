import { Router } from "express";

import getUsers from "../controllers/getUser.ts";
import getUserById from "../controllers/getUserById.ts";
import addUser from "../controllers/createUser.ts";
import updateUser from "../controllers/updateUser.ts";
import deleteUser from "../controllers/deleteUser.ts";
import getUsersPaginatedByMiddleware from "../controllers/getUserPaginatedByMiddleware.ts";

import paginationMiddleware from "../middlewares/pagenation.ts";
import authenticateJWT from "../middlewares/auth.ts";

const router = Router();

router.get("/middleware", authenticateJWT,paginationMiddleware, getUsersPaginatedByMiddleware);
router.get("/:id", authenticateJWT,getUserById);
router.patch("/:id", authenticateJWT,updateUser);
router.delete("/:id", authenticateJWT,deleteUser);
router.get("/", authenticateJWT, getUsers);
router.post("/", authenticateJWT, addUser);

export default router;
