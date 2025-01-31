import { Request, Response } from "express";
import DB from "../db/dbConnection.ts";
import { ResultSetHeader } from "mysql2/promise";

export default async function addUser(req: Request, res: Response) {
  const { name, email } = req.body;

  if (!name) {
    res.status(400).json({ error: "Name cannot be empty" });
    return;
  }
  if (!email) {
    res.status(400).json({ error: "Email cannot be empty" });
    return;
  }

  try {
    const insertQuery = "INSERT INTO users (name, email) VALUES (?, ?)";
    const values = [name, email];

    const [result] = await DB.query<ResultSetHeader>(insertQuery, values);

    if (result.affectedRows === 1) {
      res.status(201).json({
        message: "User Created Successfully",
        userId: result.insertId,
      });
    } else {
      res.status(500).json({ error: "Failed to create user" });
    }
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ error: "Database error occurred" });
  }
}
