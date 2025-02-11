import { Request, Response } from "express";
import { Orm_User } from "../models/orm_user.ts";

export async function addOrmUser(req: Request, res: Response) {
  try {
    const { firstName, lastName } = req.body;

    const user = await Orm_User.create({ firstName, lastName });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getOrmUser(req: Request, res: Response) {
  try {
    const users = await Orm_User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getOrmUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await Orm_User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateOrmUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body;

    const user = await Orm_User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    await user.update({ firstName, lastName });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteOrmUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await Orm_User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
