import { Request, Response } from "express";
import DB from "../db/dbConnection.ts";
import bcrypt from "bcryptjs";
import { ResultSetHeader } from "mysql2/promise";

/**
 *  Register user
 * @param req 
 * @param res 
 * @returns 
 */
export default async function registerUser(req: Request, res: Response) {
  const { email, password } = req.body;
    
  if (!email || !password) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [result] = await DB.query<ResultSetHeader>(
      "INSERT INTO consumers ( email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Database error" });
  }
}
