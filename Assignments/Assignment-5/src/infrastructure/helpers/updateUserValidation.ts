import { NextFunction, Request, Response } from "express";
import { UserUpdateValidator } from "../../domain/Schemas/updateUserValidationSchema";
import { validate } from "class-validator";

export const updateUserValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const { name, email } = req.body;
  const filepath: string | undefined = req.file?.path;

  const updateData = new UserUpdateValidator();
  updateData.name = name?.trim();
  updateData.email = email?.trim();
  updateData.filepath = filepath;

  const errors = await validate(updateData);
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors[errors.length - 1].constraints,
    });
  }

  next();
};
