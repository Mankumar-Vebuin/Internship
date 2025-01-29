import { Request, Response } from "express";
import DB from "../db/dbConnection.ts";

export async function addUser(req: Request, res: Response) {
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

    const [result]: any = await DB.query(insertQuery, values);

    if (result.affectedRows === 1) {
      res
        .status(201)
        .json({
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

// export async function getUsers(req: Request, res: Response) {
//     try {
//         let data = await axios.get("https://dummyjson.com/users");
//         if(data && data.data.users !== null){
//             res.json(data.data.users);
//         }else {
//             throw new Error("Not Data found");
//         }
//       } catch (e) {
//         res.status(500).json({ error: "Failed to fetch Data" });
//       }
// }

export async function getUsers(req: Request, res: Response) {
  try {
    const [rows] = await DB.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

// export function getUserById(req: Request, res:Response) {
//     const id = req.params.id;
//     res.json(id);
// }

export async function getUserById(req: Request, res: Response) {
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

// export function editUserProfile(req: Request, res: Response) {
//     res.send("Edit User Success");
// }

export async function updateUser(req: Request, res: Response) {
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

export function getUserByName(req: Request, res: Response) {
  const name = req.query.name;
  res.send(name);
  console.log(name);
}

export async function deleteUser(req: Request, res: Response){
    const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "User ID is required" });
    return;
  }

  try {
    const deleteQuery = "DELETE FROM users WHERE id = ?";
    const [result]: any = await DB.query(deleteQuery, [id]);

    if (result.affectedRows === 0) {
    res.status(404).json({ error: "User not found" });
    }

   res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Database error occurred" });
  }
}