import { Request, Response } from "express";
import DB from "../db/dbConnection.ts";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export default async function getUsers(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const name = req.query.name as string;
    const start = (page - 1) * limit;
  
    try {
      if (!name) {
        const [countResult] = await DB.query<RowDataPacket[]>(
          "SELECT COUNT(*) as total FROM users"
        );
        const totalUsers = countResult[0].total;
  
        const [rows] = await DB.query("SELECT * FROM users LIMIT ? OFFSET ?", [
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
          return;
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