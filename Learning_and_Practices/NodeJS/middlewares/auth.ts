import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY ?? "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

export default function authenticateJWT(
  req: any,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
    return;
  }
}
