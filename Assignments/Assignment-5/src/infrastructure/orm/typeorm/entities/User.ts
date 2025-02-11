import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

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
  @Length(3, 50, { message: "Name must be between 3 and 50 characters" })
  email!: string;

  @Column({ nullable: true })
  filepath?: string;
}
