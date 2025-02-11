import express from "express";
import { userReposetory } from "../../infrastructure/repositories/userRepo";
import { getAllUser } from "../controllers/getAllUserController";
import { getUserById } from "../controllers/getUserByIdController";
import { createUser } from "../controllers/createUserController";
import { updateUser } from "../controllers/updateUserController";
import { deleteUser } from "../controllers/deleteUserController";
import { userValidation } from "../../infrastructure/helpers/createUserValidation";
import { updateUserValidator } from "../../infrastructure/helpers/updateUserValidation";
import { upload } from "../../infrastructure/helpers/multer";

const router = express.Router();

router.get("/", getAllUser(userReposetory));
router.get("/:id", getUserById(userReposetory));
router.post(
  "/",
  upload.single("file"),
  userValidation,
  createUser(userReposetory)
);
router.patch(
  "/:id",
  upload.single("file"),
  updateUserValidator,
  updateUser(userReposetory)
);
router.delete("/:id", deleteUser(userReposetory));

export default router;
