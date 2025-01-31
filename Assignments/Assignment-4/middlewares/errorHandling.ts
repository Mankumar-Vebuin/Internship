import { Request, Response, NextFunction } from "express";
import { CustomError } from "../types/interfaces.ts";

export function errorHandling(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.statusCode = parseInt(err.status as string) || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message || "Internal Server Error",
  });
}
