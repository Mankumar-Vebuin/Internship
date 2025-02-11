import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "./User";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

@Entity()
export class Contact {
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

  @Column()
  @IsNotEmpty({ message: "Phone number is required" })
  @Matches(/^[0-9]{10}$/, { message: "Phone must be a 10-digit number" })
  phone!: string;

  @OneToOne(() => User, (user) => user.contact)
  user!: User;
}
