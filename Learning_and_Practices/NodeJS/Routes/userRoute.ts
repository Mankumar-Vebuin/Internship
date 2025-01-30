import { Router } from "express";
import {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUsersPaginatedByMiddleware,
} from "../controllers/userController.ts";
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
