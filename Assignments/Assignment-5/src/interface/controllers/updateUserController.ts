import { Request, Response } from "express";
import { UserRepositoryPort } from "../../application/port/repositories/userRepo.port";
import { updateUserUseCase } from "../../application/use_cases/updateUserUseCase";

export const updateUser =
  (UserRepo: UserRepositoryPort) => async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      const { name, email } = req.body;
      const filepath = req.file?.path;

      const isUpdated = await updateUserUseCase(UserRepo, id, {
        name: name,
        email: email,
        filepath: filepath,
      });

      if (isUpdated) {
        return res.status(200).json({ message: "Update Successfully" });
      } else {
        return res.status(404).json({ message: "User not Found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error while updating the user" });
    }
  };
