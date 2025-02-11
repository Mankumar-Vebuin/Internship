import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/interfaces.ts";

export default function paginationMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const start = (page - 1) * limit;

  req.pagination = { page, limit, start }; 

  next();
}
