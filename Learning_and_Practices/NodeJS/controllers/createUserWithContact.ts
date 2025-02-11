import { Request, Response } from "express";
import { Orm_User } from "../models/orm_user.ts";
import { Contact } from "../models/contact.ts";

export async function createUserWithContact(req: Request, res: Response) {
  const { firstName, lastName, phoneNumber, email } = req.body;

  try {
    // Create User
    const user = await Orm_User.create({ firstName, lastName });

    // Create Contact and associate with User
    const contact = await Contact.create({
      phoneNumber,
      email,
      user_id: user.id,
    });

    res.status(201).json({ user, contact });
  } catch (error) {
    console.error("Error creating user with contact:", error);
    res.status(500).json({ error: "Database error" });
  }
}
