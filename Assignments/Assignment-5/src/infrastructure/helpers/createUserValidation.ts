import { NextFunction, Request, Response } from "express";
import { UserValidator } from "../../domain/Schemas/createUserValidationSchema";
import { validate } from "class-validator";

export const userValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, filepath } = req.body;
  const id = req.params.id;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email are required" });
  }

  const newUser = new UserValidator();
  newUser.name = name.trim();
  newUser.email = email.trim();
  newUser.filepath = filepath;

  const userErrors = await validate(newUser);
  if (userErrors.length > 0) {
    res.status(400).json({
      message: "Validation failed",
      errors: userErrors[userErrors.length - 1].constraints,
    });
    return;
  }

  next();
};
