import { Request, Response } from "express";
import DB from "../db/dbConnection.ts";
import { ResultSetHeader } from "mysql2/promise";

export default async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "User ID is required" });
    return;
  }

  try {
    const deleteQuery = "DELETE FROM users WHERE id = ?";
    const [result] = await DB.query<ResultSetHeader>(deleteQuery, [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Database error occurred" });
  }
}