import { UserRepositoryPort } from "../../application/port/repositories/userRepo.port";
import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use_cases/createUserUseCase";
import logger from "../../infrastructure/logger";

export const createUser =
  (UserRepo: UserRepositoryPort) => async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;

      const filepath = req.file?.path;

      const isCreated = await CreateUserUseCase(UserRepo, {
        name: name.trim(),
        email: email.trim(),
        filepath: filepath,
      });

      if (isCreated) {
        return res.status(200).json({ message: "User Created Successfully" });
      } else {
        return res
          .status(409)
          .json({ message: "User with this email already exist" });
      }
    } catch (error: any) {
      logger.error(`Error while creating user: ${error.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
