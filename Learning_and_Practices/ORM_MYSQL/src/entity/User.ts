import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Contact } from "./Contact";
import { IsEmail, IsNotEmpty, IsString, Length, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  @Length(3, 50, { message: "Name must be between 3 and 50 characters" })
  name!: string;

  @Column()
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @Column({ nullable: true }) // Store file path
  filepath!: string;

  @OneToOne(() => Contact, { cascade: true }) // Cascade ensures Contact is saved with User
  @JoinColumn()
  @ValidateNested() // Ensures Contact is also validated
  @Type(() => Contact) // Required for nested validation
  contact!: Contact;
}
