import { Request, Response } from "express";
import DB from "../db/dbConnection.ts";

export default async function getUserById(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const [rows] = await DB.query(`SELECT * FROM users where id=${id}`);
    if (!rows) {
      res.status(404).json({ error: "user not Found" });
      return;
    }
    res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
}