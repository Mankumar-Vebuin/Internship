import { Response } from "express";
import DB from "../db/dbConnection.ts";
import { CustomRequest } from "../types/interfaces.ts";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export default async function getUsersPaginatedByMiddleware(
  req: CustomRequest,
  res: Response
) {
  const { page, limit, start } = req.pagination!;
  const name = req.query.name as string;
  try {
    if (!name) {
      const [countResult] = await DB.query<RowDataPacket[]>(
        "SELECT COUNT(*) as total FROM users"
      );
      const totalUsers = countResult[0].total;

      const [rows] = await DB.query<ResultSetHeader>("SELECT * FROM users LIMIT ? OFFSET ?", [
        limit,
        start,
      ]);

      res.json({
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        users: rows,
      });
    } else {
      const [countResult] = await DB.query<RowDataPacket[]>(
        "SELECT COUNT(*) as total FROM users WHERE name = ?",
        [name]
      );
      const totalUsers = countResult[0].total;

      if (totalUsers === 0) {
        res.status(404).json({ error: "User not found" });
      }

      const [rows] = await DB.query<ResultSetHeader>(
        "SELECT * FROM users WHERE name = ? LIMIT ? OFFSET ?",
        [name, limit, start]
      );

      res.json({
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        users: rows,
      });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}