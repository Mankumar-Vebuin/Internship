import { Response, Request } from "express";
import { UserRepositoryPort } from "../../application/port/repositories/userRepo.port";
import { getAllUserUseCase } from "../../application/use_cases/getAllUserUseCase";
import logger from "../../infrastructure/logger";

export const getAllUser =
  (userRepo: UserRepositoryPort) => async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const response = await getAllUserUseCase(userRepo, page, limit);

      return res.status(200).json(response);
    } catch (e) {
      logger.error("Error fetching users", e);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
