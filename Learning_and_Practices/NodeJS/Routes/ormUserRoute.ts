import { Router } from "express";
import {
  addOrmUser,
  getOrmUser,
  getOrmUserById,
  updateOrmUser,
  deleteOrmUser,
} from "../controllers/ormUserController.ts";

const router = Router();

router.get("/:id", getOrmUserById);
router.patch("/:id", updateOrmUser);
router.delete("/:id", deleteOrmUser);
router.get("/", getOrmUser);
router.post("/", addOrmUser);

export default router;
