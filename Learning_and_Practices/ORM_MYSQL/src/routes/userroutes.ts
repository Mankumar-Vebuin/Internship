import { Router } from "express";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { AppDataSource } from "../database.ts";
import { Not } from "typeorm";
import { User } from "../entity/User.ts";
import { Contact } from "../entity/Contact.ts";
import logger from "../../logger.ts";
import { upload } from "../multer.ts";

const router = Router();

router.post(
  "/users",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { name, email, contact } = req.body;

      if (!req.file) {
        await queryRunner.rollbackTransaction();
        res.status(400).json({ message: "File is required" });
        return;
      }

      // Trim and validate input
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();

      if (trimmedName.length > 50 || trimmedEmail.length > 50) {
        await queryRunner.rollbackTransaction();
        res
          .status(400)
          .json({ message: "Name and email must be less than 50 characters" });
        return;
      }

      // Check if user already exists
      const existingUser = await queryRunner.manager.findOne(User, {
        where: { email: trimmedEmail },
      });
      if (existingUser) {
        await queryRunner.rollbackTransaction();
        res
          .status(400)
          .json({ message: "User with this email already exists" });
        return;
      }

      // Create new Contact
      const newContact = new Contact();
      newContact.name = contact.name.trim();
      newContact.email = contact.email.trim();
      newContact.phone = contact.phone.trim();

      // Create new User
      const newUser = new User();
      newUser.name = trimmedName;
      newUser.email = trimmedEmail;
      newUser.contact = newContact;
      newUser.filepath = req.file.path;

      // Validate User (including Contact)
      const userErrors = await validate(newUser);
      if (userErrors.length > 0) {
        await queryRunner.rollbackTransaction();
        res
          .status(400)
          .json({ message: "Validation failed", errors: userErrors });
        return;
      }

      // Save User and Contact
      const result = await queryRunner.manager.save(newUser);
      await queryRunner.commitTransaction();

      res
        .status(201)
        .json({ message: "User created successfully", user: result });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      logger.error("Error in Creating User", error);
      res.status(500).json({ message: "Internal Server Error", error });
    } finally {
      await queryRunner.release();
    }
  }
);

router.get("/", async (_, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find();
  res.json(users);
});

// READ a single user by ID
router.get("/:id", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: parseInt(req.params.id) });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
});

// UPDATE a user by ID
router.patch(
  "/:id",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userRepo = queryRunner.manager.getRepository(User);
      const user = await userRepo.findOne({
        where: { id: parseInt(req.params.id) },
        relations: ["contact"], // Ensure we fetch the contact details
      });

      if (!user) {
        await queryRunner.rollbackTransaction();
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Extract updates from request body
      const { name, email, contact } = req.body;

      // Trim and validate input fields
      if (name) {
        const trimmedName = name.trim();
        if (trimmedName.length > 50) {
          await queryRunner.rollbackTransaction();
          res
            .status(400)
            .json({ message: "Name must be less than 50 characters" });
          return;
        }
        user.name = trimmedName;
      }

      if (email) {
        const trimmedEmail = email.trim();
        if (trimmedEmail.length > 50) {
          await queryRunner.rollbackTransaction();
          res
            .status(400)
            .json({ message: "Email must be less than 50 characters" });
          return;
        }

        // Check if email already exists but not for the same user
        const existingUser = await queryRunner.manager.findOne(User, {
          where: { email: trimmedEmail, id: Not(user.id) },
        });

        if (existingUser) {
          await queryRunner.rollbackTransaction();
          res
            .status(400)
            .json({ message: "Email already in use by another user" });
          return;
        }

        user.email = trimmedEmail;
      }

      // Update Contact details
      if (contact) {
        if (contact.name) user.contact.name = contact.name.trim();
        if (contact.email) user.contact.email = contact.email.trim();
        if (contact.phone) user.contact.phone = contact.phone.trim();
      }

      // Handle file update
      if (req.file) {
        user.filepath = req.file.path;
      }

      // Validate updated User object
      const userErrors = await validate(user);
      if (userErrors.length > 0) {
        await queryRunner.rollbackTransaction();
        res
          .status(400)
          .json({
            message: "Validation failed",
            errors: userErrors[0].constraints,
          });
        return;
      }

      // Save updated User object
      const result = await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();

      res
        .status(200)
        .json({ message: "User updated successfully", user: result });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      logger.error("Error updating user", error);
      res.status(500).json({ message: "Internal Server Error", error });
    } finally {
      await queryRunner.release();
    }
  }
);

// DELETE a user by ID
router.delete("/:id", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const result = await userRepo.delete(req.params.id);
  res.json(result);
});

export default router;
