import { Request, Response } from "express";
import DB from "../db/dbConnection.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export async function registerUser(req: Request, res: Response) {
  const { email, password } = req.body;
    
  if (!email || !password) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [result]: any = await DB.query(
      "INSERT INTO consumers ( email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Database error" });
  }
}

// Login user and generate JWT
export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const SECRET_KEY =
    process.env.SECRET_KEY ?? "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

  if (!email || !password) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const [rows]: any = await DB.query(
      "SELECT * FROM consumers WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Database error" });
  }
}
