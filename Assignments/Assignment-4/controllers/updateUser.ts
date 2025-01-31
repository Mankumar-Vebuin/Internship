import { Request, Response } from "express";
import DB from "../db/dbConnection.ts";

export default async function updateUser(req: Request, res: Response) {
  const data = req.body;
  const id = req.params.id;
  if (!data.name) {
    res.status(400).json({ error: "Name cannot be empty" });
    return;
  }
  if (!data.email) {
    res.status(400).json({ error: "Email cannot be empty" });
    return;
  }
  if (!id) {
    res.status(400).json({ error: "ID cannot be empty" });
    return;
  }

  try {
    const [result] = await DB.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [data.name, data.email, id]
    );
    res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
}