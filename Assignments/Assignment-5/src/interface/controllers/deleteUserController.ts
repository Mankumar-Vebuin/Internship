import { UserRepositoryPort } from "../../application/port/repositories/userRepo.port";
import { Request, Response } from "express";
import logger from "../../infrastructure/logger";
import { deleteUserUseCase } from "../../application/use_cases/deleteUserUseCase";

export const deleteUser =
  (UserRepo: UserRepositoryPort) => async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      const isDeleted = await deleteUserUseCase(UserRepo, id);
      if (isDeleted) {
        res.status(200).json({
          message: "user deleted Successfully",
        });
      } else {
        res.status(404).json({
          message: "User not Found",
        });
      }
    } catch (e) {
      logger.error("Error while deleting the user", e);
      res.status(500).json({
        message: "Error While Deleting the user",
      });
    }
  };
