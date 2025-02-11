import { UserRepositoryPort } from "../../application/port/repositories/userRepo.port";
import { Request, response, Response } from "express";
import logger from "../../infrastructure/logger";
import { getUserByIdUseCase } from "../../application/use_cases/getUserByIdUseCase";

export const getUserById =
  (userRepo: UserRepositoryPort) => async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id) as number;
      const user = await getUserByIdUseCase(userRepo, id);
      res.status(200).json(user);
    } catch (e) {
      logger.error("Error", e);
      response.status(500).json({
        message: "Error",
      });
    }
  };
